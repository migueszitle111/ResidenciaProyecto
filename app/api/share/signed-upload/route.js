export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin, SHARE_BUCKET } from "@/lib/supabaseadmin";
import { signedUploadSchema } from "@/lib/api/schemas";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
} from "@/lib/api/security";

function isSafeRelativePath(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= 1024 &&
    !value.startsWith("/") &&
    !value.includes("..") &&
    !value.includes("\\") &&
    /^[A-Za-z0-9._\-\/ ]+$/.test(value)
  );
}

export async function POST(req) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if (auth.error) {
      return auth.error;
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { path, upsert } = await parseJsonBody(req, signedUploadSchema);

    if (!isSafeRelativePath(path)) {
      return NextResponse.json(
        { ok: false, error: "path inválido" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .storage
      .from(SHARE_BUCKET)
      .createSignedUploadUrl(path, { upsert: !!upsert });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      path,
      token: data.token,
      signedUrl: data.signedUrl,
    });
  } catch (error) {
    return handleApiError(error, "No se pudo crear la URL de carga firmada");
  }
}
