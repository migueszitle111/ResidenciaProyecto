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

    const { searchParams } = new URL(req.url);
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("share_links")
      .select("id, slug, title, patient, doctor, study_type, created_at, expiry_at, is_active, meta")
      .filter("meta->>createdByEmail", "eq", email)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      console.error("[share/history] Supabase error:", error.message);
      return NextResponse.json({ ok: false, error: "Error al obtener historial" }, { status: 500 });
    }

    const now = new Date();
    const items = (data || []).map((row) => {
      const expired = row.expiry_at ? new Date(row.expiry_at) <= now : false;
      return {
        id: row.id,
        slug: row.slug,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.medxproapp.com"}/s/${row.slug}`,
        title: row.title || "",
        patient: row.patient ?? row.meta?.patient ?? null,
        doctor: row.doctor ?? row.meta?.doctor ?? null,
        studyType: row.study_type ?? row.meta?.studyType ?? row.meta?.study ?? null,
        createdAt: row.created_at,
        expiryAt: row.expiry_at ?? null,
        expired,
      };
    });

    return NextResponse.json({ ok: true, items, offset, pageSize: PAGE_SIZE });
  } catch (err) {
    return handleApiError(err, "Error al obtener historial de links");
  }
}
