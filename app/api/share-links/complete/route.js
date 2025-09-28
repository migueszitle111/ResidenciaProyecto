export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseadmin';

export async function POST(req) {
  try {
    const { linkId } = await req.json();
    if (!linkId) return NextResponse.json({ error: 'linkId es requerido' }, { status: 400 });

    const { data: link, error: getErr } = await supabaseAdmin
      .from('share_links')
      .select('id, slug')
      .eq('id', linkId)
      .single();
    if (getErr || !link) throw getErr || new Error('Link no existe');

    const { error: upErr } = await supabaseAdmin
      .from('share_links')
      .update({ is_active: true })
      .eq('id', linkId);
    if (upErr) throw upErr;

    return NextResponse.json({
      ok: true,
      shareUrl: `${process.env.SHARE_BASE_URL}/s/${link.slug}`
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 400 });
  }
}
