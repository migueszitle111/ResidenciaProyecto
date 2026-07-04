export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  getBucketFromPath,
  getPathWithoutBucket,
} from "@/lib/supabaseadmin";
import { sharePurgeSchema } from "@/lib/api/schemas";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
} from "@/lib/api/security";

function canManageLink(user, link) {
  return user?.roles === "admin" || link?.meta?.createdByEmail === user?.email;
}

export async function POST(req) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if (auth.error) {
      return auth.error;
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { slug } = await parseJsonBody(req, sharePurgeSchema);

    console.log("[purge] Petición recibida — slug:", slug, "email:", auth.user?.email);
    console.log("[purge] Supabase URL:", (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").slice(0, 40));

    // Verificación cruzada: buscar el slug también con query directa por si acaso
    const { data: allMatches } = await supabaseAdmin
      .from("share_links")
      .select("id, slug, is_active, meta->>createdByEmail")
      .eq("slug", slug);
    console.log("[purge] Búsqueda exhaustiva por slug — encontrados:", allMatches?.length ?? 0, JSON.stringify(allMatches));

    const { data: link, error: linkError } = await supabaseAdmin
      .from("share_links")
      .select("id, meta, slug")
      .eq("slug", slug)
      .maybeSingle();

    if (linkError) {
      console.error("[purge] Error consultando share_links:", linkError.message);
      return NextResponse.json({ ok: false, error: linkError.message }, { status: 500 });
    }

    if (!link) {
      // Idempotente: si no existe, el resultado deseado ya está cumplido
      console.log("[purge] Link no existe en BD (posiblemente ya eliminado) — slug:", slug);
      return NextResponse.json({ ok: true, alreadyDeleted: true });
    }

    console.log("[purge] Link encontrado — id:", link.id, "createdByEmail:", link.meta?.createdByEmail);

    if (!canManageLink(auth.user, link)) {
      console.warn("[purge] No autorizado — user email:", auth.user?.email, "vs link email:", link.meta?.createdByEmail);
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 403 });
    }

    const { data: files, error: filesQueryError } = await supabaseAdmin
      .from("share_link_files")
      .select("storage_path")
      .eq("link_id", link.id);

    if (filesQueryError) {
      console.error("[purge] Error consultando share_link_files:", filesQueryError.message);
    }

    console.log("[purge] Archivos encontrados:", files?.length ?? 0);

    if (files?.length) {
      const KNOWN_BUCKETS = ['report-packages', 'monitoreo-packages', 'reportesnormales-packages'];
      const filesByBucket = files.reduce((acc, file) => {
        const bucket = getBucketFromPath(file.storage_path);
        const pathInBucket = getPathWithoutBucket(file.storage_path);
        if (!acc[bucket]) acc[bucket] = [];
        acc[bucket].push({ pathInBucket, storagePath: file.storage_path });
        return acc;
      }, {});

      for (const [bucket, entries] of Object.entries(filesByBucket)) {
        const paths = entries.map(e => e.pathInBucket);
        console.log(`[purge] Intentando borrar en bucket=${bucket} — paths:`, paths);
        const { data: removed, error: storageError } = await supabaseAdmin.storage.from(bucket).remove(paths);
        if (storageError) {
          console.error(`[purge] Error borrando de storage bucket=${bucket}:`, storageError.message);
        } else {
          console.log(`[purge] Storage borrado bucket=${bucket} archivos_removidos=${removed?.length ?? 0}`);
        }

        // Fallback: si el bucket detectado no tenía los archivos (posible mismatch),
        // intentar en los demás buckets con el path completo original
        if (!removed || removed.length === 0) {
          for (const altBucket of KNOWN_BUCKETS) {
            if (altBucket === bucket) continue;
            // Probar con la ruta completa (por si el storage_path NO tiene prefijo de bucket)
            const altPaths = entries.map(e => e.storagePath);
            const { data: altRemoved } = await supabaseAdmin.storage.from(altBucket).remove(altPaths);
            if (altRemoved?.length) {
              console.log(`[purge] Fallback OK — bucket=${altBucket} archivos=${altRemoved.length}`);
              break;
            }
            // También probar con pathInBucket en el bucket alternativo
            const { data: altRemoved2 } = await supabaseAdmin.storage.from(altBucket).remove(paths);
            if (altRemoved2?.length) {
              console.log(`[purge] Fallback OK — bucket=${altBucket} (pathInBucket) archivos=${altRemoved2.length}`);
              break;
            }
          }
        }
      }
    }

    const { error: delFilesError } = await supabaseAdmin
      .from("share_link_files")
      .delete()
      .eq("link_id", link.id);
    if (delFilesError) {
      console.error("[purge] Error borrando share_link_files:", delFilesError.message);
      return NextResponse.json({ ok: false, error: delFilesError.message }, { status: 500 });
    }

    const { error: delLinkError } = await supabaseAdmin
      .from("share_links")
      .delete()
      .eq("id", link.id);
    if (delLinkError) {
      console.error("[purge] Error borrando share_links:", delLinkError.message);
      return NextResponse.json({ ok: false, error: delLinkError.message }, { status: 500 });
    }

    console.log("[purge] Link eliminado exitosamente — id:", link.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[purge] Excepción no manejada:", error?.message);
    return handleApiError(error, "No se pudo eliminar el link compartido");
  }
}
