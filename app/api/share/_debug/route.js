export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseadmin';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug') || '';

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('share_links')
      .select('id, slug, is_active, expiry_at')
      .eq('slug', slug)
      .maybeSingle();

    return NextResponse.json({
      env: {
        VERCEL_ENV: process.env.VERCEL_ENV,
        VERCEL_URL: process.env.VERCEL_URL,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        SUPABASE_URL: process.env.SUPABASE_URL,
      },
      query: { slug, found: !!data, row: data || null, error: error?.message || null },
    });
  } catch (e) {
    return NextResponse.json(
      { error: String(e) },
      { status: 500 }
    );
  }
}
