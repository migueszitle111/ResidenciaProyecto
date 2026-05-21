export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";
import { shareCompleteSchema } from "@/lib/api/schemas";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
} from "@/lib/api/security";
import { isValidStoragePath } from "@/lib/api/storage";

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
    const { linkId, files } = await parseJsonBody(req, shareCompleteSchema);

    if (!files.every((file) => isValidStoragePath(file.storage_path))) {
      return NextResponse.json(
        { ok: false, error: "Alguna ruta de archivo es inválida" },
        { status: 400 }
      );
    }

    const { data: link, error: linkErr } = await supabaseAdmin
      .from("share_links")
      .select("id, slug, is_active, expiry_at, meta")
      .eq("id", linkId)
      .single();

    if (linkErr || !link) {
      return NextResponse.json({ ok: false, error: "link inexistente" }, { status: 400 });
    }

    if (!canManageLink(auth.user, link)) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 403 });
    }

    if (link.expiry_at && new Date(link.expiry_at) <= new Date()) {
      return NextResponse.json({ ok: false, error: "link expirado" }, { status: 400 });
    }

    const toInsert = files.map((file) => ({
      link_id: linkId,
      name: file.name,
      mime_type: file.mime_type,
      size_bytes: file.size_bytes ?? null,
      storage_path: file.storage_path,
    }));

    const { error: insertError } = await supabaseAdmin
      .from("share_link_files")
      .insert(toInsert);

    if (insertError) {
      throw insertError;
    }

    await supabaseAdmin
      .from("share_links")
      .update({ is_active: true })
      .eq("id", linkId);

    const envBase =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

    const base = (envBase || "").replace(/\/$/, "");
    const v = Date.now();
    const url = `${base}/s/${link.slug}?v=${v}`;

    return NextResponse.json({ ok: true, url, slug: link.slug });
  } catch (error) {
    return handleApiError(error, "No se pudo completar el link compartido");
  }
}
