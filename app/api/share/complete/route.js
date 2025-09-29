// app/api/share/complete/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseadmin';

export async function POST(req) {
  try {
    const { linkId, files } = await req.json();

    if (!linkId || !Array.isArray(files) || !files.length) {
      return NextResponse.json({ ok: false, error: 'payload inválido' }, { status: 400 });
    }

    const { data: link, error: linkErr } = await supabaseAdmin
      .from('share_links')
      .select('id, slug, is_active, expiry_at')
      .eq('id', linkId)
      .single();

    if (linkErr || !link || !link.is_active) {
      return NextResponse.json({ ok: false, error: 'link inválido/expirado' }, { status: 400 });
    }

    const toInsert = files.map(f => ({
      link_id: linkId,
      name: f.name,
      mime_type: f.mime_type,
      size_bytes: f.size_bytes ?? null,
      storage_path: f.storage_path
    }));

    const { error: insErr } = await supabaseAdmin.from('share_link_files').insert(toInsert);
    if (insErr) throw insErr;

    // Construye base confiable
    const envBase = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
    const origin = req.headers.get('origin') || envBase || '';
    const base = origin.replace(/\/$/, '');

    // 👇 tu página es /s/[slug]
    const url = `${base}/s/${link.slug}`;

    // Incluye también slug por si el cliente prefiere construir
    return NextResponse.json({ ok: true, url, slug: link.slug });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
