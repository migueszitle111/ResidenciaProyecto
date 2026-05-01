// app/api/share/signed/[slug]/[fileId]/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  getBucketFromPath,
  getPathWithoutBucket,
} from "@/lib/supabaseadmin";
import { isValidStoragePath } from "@/lib/api/storage";

const MAX_TTL = 60 * 60 * 24 * 7 - 60;
const MIN_TTL = 60;
const SAFE_SLUG = /^[A-Za-z0-9_-]{8,64}$/;
const SAFE_UUID = /^[0-9a-fA-F-]{36}$/;

function ttlForLink(link) {
  if (!link?.expiry_at) return MAX_TTL;
  const seconds = Math.ceil((new Date(link.expiry_at).getTime() - Date.now()) / 1000);
  return Math.max(MIN_TTL, Math.min(MAX_TTL, seconds));
}

export async function GET(req, { params }) {
  try {
    const supabase = getSupabaseAdmin();
    const { slug, fileId } = params || {};
    const url = new URL(req.url);
    const modeParam = (url.searchParams.get("mode") || "").toLowerCase();
    const inlineModes = new Set(["inline", "preview", "view"]);
    const mode = inlineModes.has(modeParam) ? "inline" : "download";

    if (!SAFE_SLUG.test(slug || "") || !SAFE_UUID.test(fileId || "")) {
      return NextResponse.json(
        { ok: false, error: "Parámetros inválidos" },
        { status: 400 }
      );
    }

    const { data: link, error: linkError } = await supabase
      .from("share_links")
      .select("id, is_active, expiry_at")
      .eq("slug", slug)
      .maybeSingle();

    if (linkError) {
      return NextResponse.json(
        { ok: false, error: "No se pudo validar el link" },
        { status: 500 }
      );
    }

    if (!link || !link.is_active || (link.expiry_at && new Date(link.expiry_at) <= new Date())) {
      return NextResponse.json(
        { ok: false, error: "Link expirado o inválido" },
        { status: 410 }
      );
    }

    const { data: file, error: fileError } = await supabase
      .from("share_link_files")
      .select("id, storage_path, name, mime_type")
      .eq("link_id", link.id)
      .eq("id", fileId)
      .maybeSingle();

    if (fileError) {
      return NextResponse.json(
        { ok: false, error: "No se pudo recuperar el archivo" },
        { status: 500 }
      );
    }

    if (!file || !isValidStoragePath(file.storage_path)) {
      return NextResponse.json(
        { ok: false, error: "Archivo no encontrado" },
        { status: 404 }
      );
    }

    const ttl = ttlForLink(link);
    if (ttl <= 0) {
      return NextResponse.json(
        { ok: false, error: "Link expirado" },
        { status: 410 }
      );
    }

    const bucket = getBucketFromPath(file.storage_path);
    const pathInBucket = getPathWithoutBucket(file.storage_path);

    const { data: signed, error: signError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(
        pathInBucket,
        ttl,
        mode === "download" ? { download: file.name || "file" } : undefined
      );

    if (signError || !signed?.signedUrl) {
      return NextResponse.json(
        { ok: false, error: "No se pudo firmar el acceso al archivo" },
        { status: 500 }
      );
    }

    const response = NextResponse.redirect(signed.signedUrl);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
