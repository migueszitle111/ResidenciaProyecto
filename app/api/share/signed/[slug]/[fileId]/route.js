// app/api/share/signed/[slug]/[fileId]/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

const MAX_TTL = 60 * 60 * 24 * 7 - 60; // ~7 días menos 1 min (límite supabase)
const MIN_TTL = 60;                    // 1 min: margen de seguridad

function ttlForLink(link) {
  // link.expiry_at null => ilimitado -> usamos el máximo permitido
  if (!link?.expiry_at) return MAX_TTL;
  const secs = Math.ceil((new Date(link.expiry_at).getTime() - Date.now()) / 1000);
  return Math.max(MIN_TTL, Math.min(MAX_TTL, secs));
}

export async function GET(req, { params }) {
  try {
    const supabase = getSupabaseAdmin();
    const { slug, fileId } = params || {};
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode') || 'download';

    if (!slug || !fileId) {
      return NextResponse.json({ ok: false, error: 'Parámetros faltantes' }, { status: 400 });
    }

    // 1) Valida link
    const { data: link, error: linkErr } = await supabase
      .from('share_links')
      .select('id, is_active, expiry_at')
      .eq('slug', slug)
      .maybeSingle();

    if (linkErr) return NextResponse.json({ ok: false, error: linkErr.message }, { status: 500 });
    if (!link || !link.is_active || (link.expiry_at && new Date(link.expiry_at) <= new Date())) {
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

    // 3) TTL = tiempo restante del link (capado a 7 días). ¡Adiós InvalidJWT!
    const ttl = ttlForLink(link);
    const opts = mode === 'download' ? { download: file.name } : undefined;

    const { data: signed, error: signErr } = await supabase
      .storage.from(SHARE_BUCKET)
      .createSignedUrl(file.storage_path, ttl, opts);

    if (signErr || !signed?.signedUrl) {
      return NextResponse.json({ ok: false, error: signErr?.message || 'No se pudo firmar' }, { status: 500 });
    }

    return NextResponse.redirect(signed.signedUrl);
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
