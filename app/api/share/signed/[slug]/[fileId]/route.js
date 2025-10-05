// app/api/share/signed/[slug]/[fileId]/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

const SHORT_TTL = 90; // 90s por seguridad

 function ttlForLink(link) {
   if (!link?.expiry_at) return SHORT_TTL;
   const rem = Math.ceil((new Date(link.expiry_at).getTime() - Date.now()) / 1000);
   if (rem <= 0) return 0; // ya venció
   // Capamos por seguridad: no emitimos firmas > 90s
   return Math.min(SHORT_TTL, rem, 60 * 60 * 24 * 7); // (límite Supabase: 7 días)
 }
export async function GET(req, { params }) {
  try {
    const supabase = getSupabaseAdmin();
    const { slug, fileId } = params || {};
    const url = new URL(req.url);
    const qpMode = url.searchParams.get('mode');
    const mode = qpMode === 'inline' ? 'inline' : 'download'; // sanitizado

    if (!slug || !fileId) {
      return NextResponse.json({ ok: false, error: 'Parámetros faltantes' }, { status: 400 });
    }

    // 1) Valida link
    const { data: link, error: linkErr } = await supabase
      .from('share_links')
      .select('id, is_active, expiry_at, revoked_at')
      .eq('slug', slug)
      .maybeSingle();

    if (linkErr) return NextResponse.json({ ok: false, error: linkErr.message }, { status: 500 });
    if (!link || !link.is_active || link.revoked_at || (link.expiry_at && new Date(link.expiry_at) <= new Date())) {
      return NextResponse.json({ ok: false, error: 'Link expirado o inválido' }, { status: 410 });
    }

    // 2) Busca archivo
    const { data: file, error: fileErr } = await supabase
      .from('share_link_files')
      .select('id, storage_path, name, mime_type')
      .eq('link_id', link.id)
      .eq('id', fileId)
      .maybeSingle();

    if (fileErr) return NextResponse.json({ ok: false, error: fileErr.message }, { status: 500 });
    if (!file)   return NextResponse.json({ ok: false, error: 'Archivo no encontrado' }, { status: 404 });

    // 3) TTL corto (90s) y nunca mayor al tiempo remanente del link
    const ttl = ttlForLink(link);
    if (ttl <= 0) return NextResponse.json({ ok: false, error: 'Link expirado' }, { status: 410 });

    const { data: signed, error: signErr } = await supabase
      .storage.from(SHARE_BUCKET)
      .createSignedUrl(file.storage_path, ttl, opts);

    if (signErr || !signed?.signedUrl) {
      return NextResponse.json({ ok: false, error: signErr?.message || 'No se pudo firmar' }, { status: 500 });
    }

    const res = NextResponse.redirect(signed.signedUrl);
    // Evita que caches intermedios guarden el redirect
    res.headers.set('Cache-Control', 'no-store');
    return res;  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
