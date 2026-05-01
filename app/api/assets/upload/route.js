export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";
import {
  PUBLIC_ASSETS_BUCKET,
  safeToken,
} from "@/lib/api/storage";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function isAllowedImageType(value) {
  return typeof value === "string" && value.startsWith("image/");
}

export async function POST(req) {
  try {
    const supabase = getSupabaseAdmin();
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { ok: false, error: "No se recibio archivo" },
        { status: 400 }
      );
    }

    if ((file.size ?? 0) > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "La imagen es demasiado grande" },
        { status: 413 }
      );
    }

    if (!isAllowedImageType(file.type || "")) {
      return NextResponse.json(
        { ok: false, error: "Tipo de archivo no permitido" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const rawName = file.name || `logo_${Date.now()}.png`;
    const dotIndex = rawName.lastIndexOf(".");
    const extension = dotIndex >= 0 ? rawName.slice(dotIndex) : "";
    const baseName = dotIndex >= 0 ? rawName.slice(0, dotIndex) : rawName;
    const safeName = `${safeToken(baseName)}${extension}`;
    const storagePath = `logos/${Date.now()}_${safeName}`;

    const { error } = await supabase.storage
      .from(PUBLIC_ASSETS_BUCKET)
      .upload(storagePath, uint8, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from(PUBLIC_ASSETS_BUCKET)
      .getPublicUrl(storagePath);

    return NextResponse.json({
      ok: true,
      imageUrl: data.publicUrl,
      path: `${PUBLIC_ASSETS_BUCKET}/${storagePath}`,
      name: safeName,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
