export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseadmin';

export async function GET(req) {
  const slug = new URL(req.url).searchParams.get('slug');
  const supaUrl = process.env.SUPABASE_URL;
  const { data, error } = await getSupabaseAdmin()
    .from('share_links')
    .select('id, slug, is_active, expiry_at')
    .eq('slug', slug)
    .maybeSingle();

  return NextResponse.json({
    env: {
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      SUPABASE_URL: supaUrl,
    },
    query: { slug, found: !!data, error: error?.message || null, row: data || null },
  });
}
