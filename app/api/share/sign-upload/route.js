export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

// Espera { "path": "slug/0-archivo.ext" } y devuelve { signedUrl, token }
export async function POST(req) {
  try {
    const { path } = await req.json();
    if (!path) return NextResponse.json({ error: 'path requerido' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .storage.from(SHARE_BUCKET)
      .createSignedUploadUrl(path); // expira ~60s

    if (error) {
      console.error('createSignedUploadUrl error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ signedUrl: data.signedUrl, token: data.token });
  } catch (e) {
    console.error('sign-upload error:', e);
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 400 });
  }
}
