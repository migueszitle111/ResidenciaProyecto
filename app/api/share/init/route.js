export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";
import { shareInitSchema } from "@/lib/api/schemas";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
} from "@/lib/api/security";

const SLUG_LEN = 12;
const MAX_RETRIES = 3;

const safeMeta = (meta, patient, doctor, studyType, doctorLogo, createdByEmail) => ({
  ...(meta && typeof meta === "object" ? meta : {}),
  ...(patient != null ? { patient } : {}),
  ...(doctor != null ? { doctor } : {}),
  ...(studyType ? { study: studyType, studyType } : {}),
  ...(doctorLogo ? { doctorLogo } : {}),
  createdByEmail,
});

export async function POST(req) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if (auth.error) {
      return auth.error;
    }

    const body = await parseJsonBody(req, shareInitSchema);
    const supabase = getSupabaseAdmin();

    const title = body.title.slice(0, 140);
    const message = body.message;
    const expiresInSeconds = Number(body.expiresInSeconds) || 0;
    const expiryAt = expiresInSeconds > 0
      ? new Date(Date.now() + expiresInSeconds * 1000).toISOString()
      : null;

    const meta = safeMeta(
      body.meta,
      body.patient ?? null,
      body.doctor ?? null,
      body.studyType ?? null,
      body.doctorLogo ?? null,
      auth.user.email
    );

    for (let i = 0; i < MAX_RETRIES; i += 1) {
      const slug = nanoid(SLUG_LEN);

      const { data, error } = await supabase
        .from("share_links")
        .insert({
          slug,
          title,
          message,
          expiry_at: expiryAt,
          patient: body.patient ?? null,
          doctor: body.doctor ?? null,
          study_type: body.studyType ?? null,
          meta,
          is_active: false,
        })
        .select("id, slug")
        .single();

      if (!error) {
        return NextResponse.json({ ok: true, linkId: data.id, slug: data.slug });
      }

      if (error.code !== "23505") {
        return NextResponse.json(
          { ok: false, error: error.message || String(error) },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { ok: false, error: "No se pudo generar un slug único" },
      { status: 500 }
    );
  } catch (error) {
    return handleApiError(error, "No se pudo crear el link compartido");
  }
}
