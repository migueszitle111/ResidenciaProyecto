// app/api/monitoreo/upload/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";
import { requireAuthenticatedUser } from "@/lib/api/security";
import {
  ALLOWED_STORAGE_BUCKETS,
  DEFAULT_STORAGE_BUCKET,
  MAX_UPLOAD_BYTES,
  isAllowedUploadMimeType,
  safeToken,
} from "@/lib/api/storage";

export async function POST(req) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if (auth.error) {
      return auth.error;
    }

    const supabase = getSupabaseAdmin();
    const formData = await req.formData();

    const file = formData.get("file");
    const bucketInput = formData.get("bucket") || DEFAULT_STORAGE_BUCKET;
    const bucket = ALLOWED_STORAGE_BUCKETS.has(bucketInput)
      ? bucketInput
      : DEFAULT_STORAGE_BUCKET;
    const folder = safeToken(formData.get("folder") || "monitoreo");

    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "No se recibió archivo" }, { status: 400 });
    }

    if ((file.size ?? 0) > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: "El archivo es demasiado grande" },
        { status: 413 }
      );
    }

    if (!isAllowedUploadMimeType(file.type || "")) {
      return NextResponse.json(
        { ok: false, error: "Tipo de archivo no permitido" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const rawName = file.name || `archivo_${Date.now()}.pdf`;
    const dotIndex = rawName.lastIndexOf(".");
    const extension = dotIndex >= 0 ? rawName.slice(dotIndex) : "";
    const baseName = dotIndex >= 0 ? rawName.slice(0, dotIndex) : rawName;
    const safeName = `${safeToken(baseName)}${extension}`;
    const storagePath = `${folder}/${Date.now()}_${safeName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, uint8, {
        contentType: file.type || "application/pdf",
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      path: `${bucket}/${storagePath}`,
      name: safeName,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
