export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

export async function POST(req) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: 'slug requerido' }, { status: 400 });

    // buscar link
    const { data: link } = await supabaseAdmin
      .from('share_links')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (!link) return NextResponse.json({ ok: true });

    // paths
    const { data: files } = await supabaseAdmin
      .from('share_link_files')
      .select('storage_path')
      .eq('link_id', link.id);

    if (files?.length) {
      await supabaseAdmin.storage.from(SHARE_BUCKET).remove(files.map(f => f.storage_path));
    }

    await supabaseAdmin.from('share_link_files').delete().eq('link_id', link.id);
    await supabaseAdmin.from('share_links').delete().eq('id', link.id);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 400 });
  }
}
