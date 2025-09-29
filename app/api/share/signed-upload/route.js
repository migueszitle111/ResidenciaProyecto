// app/api/share/signed-upload/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

export async function POST(req) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { path, upsert } = await req.json();
    if (!path) return NextResponse.json({ ok: false, error: 'path requerido' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .storage.from(SHARE_BUCKET)
      .createSignedUploadUrl(path, { upsert: !!upsert });

    if (error) throw error;

    return NextResponse.json({ ok: true, path, token: data.token, signedUrl: data.signedUrl });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
