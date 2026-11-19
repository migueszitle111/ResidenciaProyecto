// app/api/cron/purge-expired-links/route.js
//
// Limpieza automática de Storage (Vercel Cron, 1 vez al día — ver vercel.json).
//
// 1) Links vencidos: borra de Storage los archivos de los share_links cuyo
//    expiry_at pasó hace más de EXPIRED_GRACE_DAYS, y luego sus filas en
//    share_link_files y share_links. Un archivo que también usa otro link
//    todavía vigente (p. ej. un link renovado) NO se borra.
// 2) Huérfanos: borra archivos de los buckets que no están referenciados por
//    ningún share_link_files y tienen más de ORPHAN_MIN_AGE_HOURS (uploads que
//    nunca se completaron, links borrados a medias, etc.).
//
// Auth: header `Authorization: Bearer <CRON_SECRET>` (Vercel lo manda solo).
// Prueba sin borrar nada: GET /api/cron/purge-expired-links?dryRun=1
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const maxDuration = 60;

import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  getSupabaseAdmin,
  getBucketFromPath,
  getPathWithoutBucket,
} from "@/lib/supabaseadmin";
import { enforceRateLimit, handleApiError } from "@/lib/api/security";

const KNOWN_BUCKETS = ["report-packages", "monitoreo-packages", "reportesnormales-packages"];
const EXPIRED_GRACE_DAYS = 7;      // margen para renovar un link recién vencido
const ORPHAN_MIN_AGE_HOURS = 24;   // no tocar uploads en curso
const MAX_LINKS_PER_RUN = 300;
const MAX_ORPHAN_DEPTH = 3;
const PAGE = 1000;
const REMOVE_CHUNK = 100;

function isAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const got = Buffer.from(req.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

// "bucket/carpeta/archivo" — forma canónica para comparar referencias
function canonical(storagePath) {
  return `${getBucketFromPath(storagePath)}/${getPathWithoutBucket(storagePath)}`;
}

async function selectAll(supabase, table, columns, applyFilters = (q) => q) {
  const rows = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await applyFilters(
      supabase.from(table).select(columns)
    ).range(from, from + PAGE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < PAGE) return rows;
  }
}

async function removePaths(supabase, bucket, paths, dryRun, summary) {
  for (let i = 0; i < paths.length; i += REMOVE_CHUNK) {
    const chunk = paths.slice(i, i + REMOVE_CHUNK);
    if (dryRun) {
      summary.filesDeleted += chunk.length;
      continue;
    }
    const { data, error } = await supabase.storage.from(bucket).remove(chunk);
    if (error) summary.errors.push(`${bucket}: ${error.message}`);
    else summary.filesDeleted += data?.length ?? 0;
  }
}

async function listFilesRecursive(supabase, bucket, prefix, depth, out) {
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, { limit: PAGE, offset });
    if (error || !data?.length) return;
    for (const item of data) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) {
        if (depth < MAX_ORPHAN_DEPTH) {
          await listFilesRecursive(supabase, bucket, path, depth + 1, out);
        }
      } else if (item.name !== ".emptyFolderPlaceholder") {
        out.push({ path, createdAt: item.created_at, size: item.metadata?.size ?? 0 });
      }
    }
    if (data.length < PAGE) return;
  }
}

export async function GET(req) {
  try {
    const rateErr = enforceRateLimit(req, {
      key: "cron-purge-expired-links",
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });
    if (rateErr) return rateErr;

    if (!isAuthorized(req)) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    }

    const dryRun = new URL(req.url).searchParams.get("dryRun") === "1";
    const supabase = getSupabaseAdmin();
    const summary = {
      dryRun,
      expiredLinks: 0,
      filesDeleted: 0,
      filesKeptSharedWithActiveLink: 0,
      orphanFiles: 0,
      orphanBytes: 0,
      errors: [],
    };

    // ---------- 1) Links vencidos ----------
    const cutoff = new Date(Date.now() - EXPIRED_GRACE_DAYS * 86400 * 1000).toISOString();
    const { data: expired, error: expErr } = await supabase
      .from("share_links")
      .select("id")
      .not("expiry_at", "is", null)
      .lt("expiry_at", cutoff)
      .order("expiry_at", { ascending: true })
      .limit(MAX_LINKS_PER_RUN);
    if (expErr) throw new Error(`share_links: ${expErr.message}`);

    const expiredIds = (expired || []).map((l) => l.id);
    summary.expiredLinks = expiredIds.length;

    // Todas las referencias (se usan para links vencidos y para huérfanos)
    const allRefs = await selectAll(supabase, "share_link_files", "link_id, storage_path");
    const expiredSet = new Set(expiredIds);
    const stillUsed = new Set(
      allRefs.filter((r) => !expiredSet.has(r.link_id)).map((r) => canonical(r.storage_path))
    );
    // Para huérfanos se compara contra TODAS las referencias: los archivos de
    // links vencidos ya se manejan en el paso 1 (y no se cuentan dos veces).
    const anyReference = new Set(
      allRefs.filter((r) => r.storage_path).map((r) => canonical(r.storage_path))
    );

    if (expiredIds.length) {
      const byBucket = {};
      const seen = new Set();
      for (const ref of allRefs) {
        if (!expiredSet.has(ref.link_id) || !ref.storage_path) continue;
        const key = canonical(ref.storage_path);
        if (seen.has(key)) continue;
        seen.add(key);
        if (stillUsed.has(key)) {
          summary.filesKeptSharedWithActiveLink += 1;
          continue;
        }
        const bucket = getBucketFromPath(ref.storage_path);
        (byBucket[bucket] ||= []).push(getPathWithoutBucket(ref.storage_path));
      }

      for (const [bucket, paths] of Object.entries(byBucket)) {
        await removePaths(supabase, bucket, paths, dryRun, summary);
      }

      if (!dryRun) {
        for (let i = 0; i < expiredIds.length; i += REMOVE_CHUNK) {
          const ids = expiredIds.slice(i, i + REMOVE_CHUNK);
          const { error: fErr } = await supabase.from("share_link_files").delete().in("link_id", ids);
          if (fErr) {
            summary.errors.push(`share_link_files: ${fErr.message}`);
            continue; // no borrar el link si sus filas de archivos siguen ahí
          }
          const { error: lErr } = await supabase.from("share_links").delete().in("id", ids);
          if (lErr) summary.errors.push(`share_links: ${lErr.message}`);
        }
      }
    }

    // ---------- 2) Huérfanos ----------
    const orphanCutoff = Date.now() - ORPHAN_MIN_AGE_HOURS * 3600 * 1000;
    for (const bucket of KNOWN_BUCKETS) {
      const files = [];
      await listFilesRecursive(supabase, bucket, "", 0, files);
      const orphans = files.filter((f) => {
        if (anyReference.has(`${bucket}/${f.path}`)) return false;
        const created = f.createdAt ? new Date(f.createdAt).getTime() : 0;
        return created && created < orphanCutoff;
      });
      if (!orphans.length) continue;
      summary.orphanFiles += orphans.length;
      summary.orphanBytes += orphans.reduce((s, f) => s + (f.size || 0), 0);
      await removePaths(supabase, bucket, orphans.map((f) => f.path), dryRun, summary);
    }

    console.log("[cron purge-expired-links]", JSON.stringify(summary));
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    console.error("[cron purge-expired-links] error:", error?.message);
    return handleApiError(error, "No se pudo ejecutar la limpieza");
  }
}
