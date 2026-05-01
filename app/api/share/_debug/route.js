// app/api/share/_debug/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseadmin";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const slug = (url.searchParams.get("slug") || "").trim();

    if (!slug) {
      return NextResponse.json(
        { ok: false, error: "slug requerido" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("share_links")
      .select("id, slug, is_active, expiry_at, meta")
      .eq("slug", slug)
      .maybeSingle();

    return NextResponse.json({
      ok: true,
      query: {
        slug,
        found: !!data,
        row: data || null,
        error: error?.message || null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
