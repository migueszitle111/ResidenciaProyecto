export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseadmin';

const ORIGIN = process.env.SHARE_CLIENT_ORIGIN || '*';

function withCors(res) {
  res.headers.set('Access-Control-Allow-Origin', ORIGIN);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'content-type, authorization, apikey');
  return res;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function POST(req) {
  try {
    const { linkId } = await req.json();
    if (!linkId) {
      return withCors(NextResponse.json({ error: 'linkId es requerido' }, { status: 400 }));
    }

    // existe el link?
    const { data: link, error: getErr } = await supabaseAdmin
      .from('share_links')
      .select('id, slug, is_active')
      .eq('id', linkId)
      .maybeSingle();
    if (getErr || !link) throw getErr || new Error('Link no existe');

    // activar (idempotente)
    if (!link.is_active) {
      const { error: upErr } = await supabaseAdmin
        .from('share_links')
        .update({ is_active: true })
        .eq('id', linkId);
      if (upErr) throw upErr;
    }

    const shareUrl = `${process.env.SHARE_BASE_URL}/s/${link.slug}`;
    return withCors(NextResponse.json({ ok: true, shareUrl }, { status: 200 }));
  } catch (e) {
    console.error('[share-links/complete]', e);
    return withCors(NextResponse.json({ error: e?.message || 'Error' }, { status: 400 }));
  }
}
