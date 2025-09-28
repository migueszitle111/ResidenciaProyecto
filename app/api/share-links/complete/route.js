export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

const ORIGIN = process.env.SHARE_CLIENT_ORIGIN || '*';
const BASE = (process.env.SHARE_BASE_URL || '').replace(/\/$/, ''); // sin slash final

function withCors(res) {
  res.headers.set('Access-Control-Allow-Origin', ORIGIN);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'content-type, authorization, apikey');
  return res;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

// Espera a que al menos 1 objeto exista en Storage (best-effort; no falla si no aparece)
async function waitForAnyObject(paths, maxMs = 7000, stepMs = 350) {
  const deadline = Date.now() + maxMs;

  async function exists(path) {
    try {
      // Si el objeto NO existe, esto suele devolver error.
      const { data, error } = await supabaseAdmin
        .storage
        .from(SHARE_BUCKET)
        .createSignedUrl(path, 60);
      if (error) return false;
      return !!data?.signedUrl;
    } catch (_) {
      return false;
    }
  }

  while (Date.now() < deadline) {
    for (const p of paths) {
      if (await exists(p)) return true;
    }
    await new Promise(r => setTimeout(r, stepMs));
  }
  return false;
}

export async function POST(req) {
  try {
    const { linkId } = await req.json();
    if (!linkId) {
      return withCors(NextResponse.json({ error: 'linkId es requerido' }, { status: 400 }));
    }

    // 1) Link
    const { data: link, error: linkErr } = await supabaseAdmin
      .from('share_links')
      .select('id, slug, is_active')
      .eq('id', linkId)
      .maybeSingle();
    if (linkErr || !link) throw linkErr || new Error('Link no existe');

    // 2) Archivos del paquete
    const { data: files, error: filesErr } = await supabaseAdmin
      .from('share_link_files')
      .select('storage_path')
      .eq('link_id', linkId);
    if (filesErr) throw filesErr;

    // 3) Best-effort: esperar a que al menos 1 objeto ya esté visible
    const paths = (files || []).map(f => f.storage_path).filter(Boolean);
    if (paths.length) {
      await waitForAnyObject(paths); // no lanza error si no aparece a tiempo
    }

    // 4) Activar (idempotente)
    if (!link.is_active) {
      const { error: upErr } = await supabaseAdmin
        .from('share_links')
        .update({ is_active: true })
        .eq('id', linkId);
      if (upErr) throw upErr;
    }

    // 5) URL pública final
    const shareUrl = `${BASE}/s/${link.slug}`;
    return withCors(NextResponse.json({ ok: true, shareUrl }, { status: 200 }));
  } catch (e) {
    console.error('[share-links/complete]', e);
    return withCors(NextResponse.json({ error: e?.message || 'Error' }, { status: 400 }));
  }
}
