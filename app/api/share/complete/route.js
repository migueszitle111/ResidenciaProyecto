// app/api/share/complete/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseadmin';


export async function POST(req) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { linkId, files } = await req.json();
    if (!linkId || !Array.isArray(files) || !files.length) {
      return NextResponse.json({ ok: false, error: 'payload inválido' }, { status: 400 });
    }

    const { data: link, error: linkErr } = await supabaseAdmin
      .from('share_links')
      .select('id, slug, is_active, expiry_at')
      .eq('id', linkId)
      .single();

    if (linkErr || !link) {
      return NextResponse.json({ ok: false, error: 'link inexistente' }, { status: 400 });
    }
    if (link.expiry_at && new Date(link.expiry_at) <= new Date()) {
      return NextResponse.json({ ok: false, error: 'link expirado' }, { status: 400 });
    }

    // (opcional) idempotencia: si ya estaba activo, devuelve la URL y listo
    // const envBase = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
    // const base = (envBase || '').replace(/\/$/, '');
    // if (link.is_active) return NextResponse.json({ ok: true, url: `${base}/s/${link.slug}`, slug: link.slug });

    const toInsert = files.map(f => ({
      link_id: linkId,
      name: f.name,
      mime_type: f.mime_type,
      size_bytes: f.size_bytes ?? null,
      storage_path: f.storage_path,
    }));
    const { error: insErr } = await supabaseAdmin.from('share_link_files').insert(toInsert);
    if (insErr) throw insErr;

    await supabaseAdmin.from('share_links')
      .update({ is_active: true })
      .eq('id', linkId);

 const envBase =
   process.env.NEXT_PUBLIC_SITE_URL ||
   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

const base = (envBase || '').replace(/\/$/, '');
const url = `${base}/s/${link.slug}`;


    return NextResponse.json({ ok: true, url, slug: link.slug });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
