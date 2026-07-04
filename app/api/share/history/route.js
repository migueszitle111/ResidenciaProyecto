export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";
import { handleApiError, requireAuthenticatedUser, enforceRateLimit } from "@/lib/api/security";

const PAGE_SIZE = 30;

export async function GET(req) {
  try {
    const rateLimitError = enforceRateLimit(req, { key: "share-history", limit: 60, windowMs: 10 * 60 * 1000 });
    if (rateLimitError) return rateLimitError;

    const auth = await requireAuthenticatedUser(req);
    if (auth.error) return auth.error;

    const email = auth.user.email;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medxproapp.com";

    const { searchParams } = new URL(req.url);
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));

    const supabase = getSupabaseAdmin();

    // 1. Obtener los links del usuario
    const { data: links, error: linksError } = await supabase
      .from("share_links")
      .select("id, slug, title, patient, doctor, study_type, created_at, expiry_at, is_active, meta")
      .filter("meta->>createdByEmail", "eq", email)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (linksError) {
      console.error("[share/history] Supabase error:", linksError.message);
      return NextResponse.json({ ok: false, error: "Error al obtener historial" }, { status: 500 });
    }

    if (!links || links.length === 0) {
      return NextResponse.json({ ok: true, items: [], offset, pageSize: PAGE_SIZE });
    }

    // 2. Obtener los archivos de todos esos links en una sola consulta
    const linkIds = links.map((l) => l.id);
    const { data: files, error: filesError } = await supabase
      .from("share_link_files")
      .select("id, link_id, name, mime_type, size_bytes, storage_path")
      .in("link_id", linkIds)
      .order("created_at", { ascending: true });

    if (filesError) {
      console.error("[share/history] files error:", filesError.message);
    }

    // Agrupar archivos por link_id
    const filesByLinkId = (files || []).reduce((acc, f) => {
      if (!acc[f.link_id]) acc[f.link_id] = [];
      acc[f.link_id].push(f);
      return acc;
    }, {});

    const now = new Date();
    const items = links.map((row) => {
      const expired = row.expiry_at ? new Date(row.expiry_at) <= now : false;
      const slug = row.slug;
      const rowFiles = (filesByLinkId[row.id] || []).map((f) => ({
        id: f.id,
        name: f.name,
        mimeType: f.mime_type,
        sizeBytes: f.size_bytes ?? null,
        storagePath: f.storage_path ?? null,
        viewUrl: `${baseUrl}/api/share/signed/${slug}/${f.id}?mode=inline`,
        downloadUrl: `${baseUrl}/api/share/signed/${slug}/${f.id}?mode=download`,
      }));

      return {
        id: row.id,
        slug,
        url: `${baseUrl}/s/${slug}`,
        title: row.title || "",
        patient: row.patient ?? row.meta?.patient ?? null,
        doctor: row.doctor ?? row.meta?.doctor ?? null,
        studyType: row.study_type ?? row.meta?.studyType ?? row.meta?.study ?? null,
        createdAt: row.created_at,
        expiryAt: row.expiry_at ?? null,
        expired,
        files: rowFiles,
      };
    });

    const response = NextResponse.json({ ok: true, items, offset, pageSize: PAGE_SIZE });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err) {
    return handleApiError(err, "Error al obtener historial de links");
  }
}
