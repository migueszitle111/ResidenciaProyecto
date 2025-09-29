// app/api/share/init/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseadmin';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijkmnpqrstuvwxyz23456789', 10);

export async function POST(req) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { title, message, expiresInSeconds } = await req.json();

    const slug = nanoid();
    const expiry_at = expiresInSeconds
      ? new Date(Date.now() + expiresInSeconds * 1000).toISOString()
      : null;

    const { data, error } = await supabaseAdmin
      .from('share_links')
      .insert({ slug, title, message: message || '', expiry_at })
      .select('id, slug')
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, linkId: data.id, slug: data.slug });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
