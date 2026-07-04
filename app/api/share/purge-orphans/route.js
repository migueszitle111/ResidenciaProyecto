export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
  enforceRateLimit,
} from "@/lib/api/security";
import { z } from "zod";

const KNOWN_BUCKETS = ["report-packages", "monitoreo-packages", "reportesnormales-packages"];

const bodySchema = z.object({
  patient: z.string().trim().min(1).max(120).optional(),
  all: z.boolean().optional(),
}).strict();

/**
 * POST /api/share/purge-orphans
 *
 * Elimina archivos huérfanos (que ya no tienen fila en share_link_files) de los buckets.
 *
 * Body:
 *  - patient: nombre de paciente exacto → solo limpia la carpeta {patient}/ en cada bucket
 *  - all: true → limpia TODOS los archivos huérfanos vinculables al usuario autenticado
 *         (solo carpetas que tuvieron algún link creado por este usuario en algún momento)
 *
 * Nunca borra archivos que están referenciados en share_link_files.
 */
export async function POST(req) {
  try {
    const rateErr = enforceRateLimit(req, {
      key: "share-purge-orphans",
      limit: 5,
      windowMs: 10 * 60 * 1000,
    });
    if (rateErr) return rateErr;

    const auth = await requireAuthenticatedUser(req);
    if (auth.error) return auth.error;

    const email = auth.user?.email;
    const body = await parseJsonBody(req, bodySchema);
    const supabase = getSupabaseAdmin();

    // 1. Determinar carpetas objetivo
    let carpetasObjetivo = [];

    if (body.patient) {
      carpetasObjetivo = [body.patient];
    } else if (body.all) {
      // Obtener todas las carpetas de pacientes que el usuario ha creado alguna vez
      const { data: linksUsuario, error: linksErr } = await supabase
        .from("share_links")
        .select("patient, meta")
        .filter("meta->>createdByEmail", "eq", email);

      if (linksErr) {
        return NextResponse.json(
          { ok: false, error: "No se pudieron obtener los pacientes del usuario" },
          { status: 500 }
        );
      }

      const carpetasSet = new Set();
      for (const link of linksUsuario ?? []) {
        const patient = link.patient || link.meta?.patient;
        if (patient && typeof patient === "string" && patient.trim()) {
          carpetasSet.add(patient.trim());
        }
      }
      carpetasObjetivo = Array.from(carpetasSet);
    } else {
      return NextResponse.json(
        { ok: false, error: "Debes especificar 'patient' o 'all: true'" },
        { status: 400 }
      );
    }

    if (carpetasObjetivo.length === 0) {
      return NextResponse.json({ ok: true, deleted: 0, buckets: {}, skipped: 0 });
    }

    // 2. Obtener todos los storage_path referenciados en share_link_files (para no borrarlos)
    const { data: refs, error: refsErr } = await supabase
      .from("share_link_files")
      .select("storage_path");

    if (refsErr) {
      return NextResponse.json(
        { ok: false, error: "No se pudieron leer las referencias de archivos" },
        { status: 500 }
      );
    }

    const referenciados = new Set((refs ?? []).map((r) => r.storage_path));
    console.log(`[purge-orphans] Referenciados en BD: ${referenciados.size}, carpetas objetivo: ${carpetasObjetivo.length}`);

    // 3. Para cada bucket + carpeta, listar y eliminar huérfanos
    const resumen = {};
    let totalEliminados = 0;
    let totalSaltados = 0;

    for (const bucket of KNOWN_BUCKETS) {
      resumen[bucket] = { eliminados: 0, saltados: 0, errores: [] };

      for (const carpeta of carpetasObjetivo) {
        const { data: archivos, error: listErr } = await supabase.storage
          .from(bucket)
          .list(carpeta, { limit: 1000 });

        if (listErr) {
          // No es error grave — puede que la carpeta no exista en este bucket
          continue;
        }

        if (!archivos || archivos.length === 0) continue;

        const huerfanos = [];
        for (const archivo of archivos) {
          if (archivo.id === null) continue; // directorio, no archivo
          const pathCompleto = `${bucket}/${carpeta}/${archivo.name}`;
          const pathSinBucket = `${carpeta}/${archivo.name}`;
          // Si NO está en referenciados (con o sin prefijo), es huérfano
          if (!referenciados.has(pathCompleto) && !referenciados.has(pathSinBucket)) {
            huerfanos.push(`${carpeta}/${archivo.name}`);
          } else {
            resumen[bucket].saltados += 1;
            totalSaltados += 1;
          }
        }

        if (huerfanos.length > 0) {
          const { data: removed, error: rmErr } = await supabase.storage
            .from(bucket)
            .remove(huerfanos);

          if (rmErr) {
            console.error(`[purge-orphans] Error borrando bucket=${bucket} carpeta=${carpeta}:`, rmErr.message);
            resumen[bucket].errores.push(rmErr.message);
          } else {
            const n = removed?.length ?? 0;
            resumen[bucket].eliminados += n;
            totalEliminados += n;
            console.log(`[purge-orphans] bucket=${bucket} carpeta=${carpeta} eliminados=${n}`);
          }
        }
      }
    }

    return NextResponse.json({
      ok: true,
      deleted: totalEliminados,
      skipped: totalSaltados,
      buckets: resumen,
      carpetasProcesadas: carpetasObjetivo.length,
    });
  } catch (error) {
    return handleApiError(error, "No se pudieron eliminar los archivos huérfanos");
  }
}
