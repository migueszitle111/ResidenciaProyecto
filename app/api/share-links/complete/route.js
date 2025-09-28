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

export async function POST(req) {
  try {
    const { linkId } = await req.json();
    if (!linkId) {
      return withCors(NextResponse.json({ error: 'linkId es requerido' }, { status: 400 }));
    }

    // 1) Traer link
    const { data: link, error: linkErr } = await supabaseAdmin
      .from('share_links')
      .select('id, slug, is_active, expiry_at')
      .eq('id', linkId)
      .maybeSingle();

    if (linkErr || !link) {
      throw linkErr || new Error('Link no existe');
    }

    // 2) Debe tener archivos en la tabla
    const { data: files, error: filesErr } = await supabaseAdmin
      .from('share_link_files')
      .select('id, storage_path')
      .eq('link_id', linkId);

    if (filesErr) throw filesErr;
    if (!files || !files.length) {
      return withCors(NextResponse.json(
        { error: 'El paquete no contiene archivos.' },
        { status: 400 }
      ));
    }

    // 3) Best-effort: verificar que al menos 1 objeto ya está en Storage
    try {
      const folder = link.slug; // tus paths son `${slug}/...`
      let { data: objs } = await supabaseAdmin.storage.from(SHARE_BUCKET).list(folder, { limit: 1 });
      if (!objs || !objs.length) {
        await new Promise(r => setTimeout(r, 350)); // pequeño reintento
        const again = await supabaseAdmin.storage.from(SHARE_BUCKET).list(folder, { limit: 1 });
        objs = again.data;
      }
      if (!objs || !objs.length) {
        return withCors(NextResponse.json(
          { error: 'Los archivos aún no aparecen en el bucket. Intenta nuevamente en unos segundos.' },
          { status: 425 } // Too Early
        ));
      }
    } catch (e) {
      // si falla el check de lista, no bloqueamos; seguimos (no crítico)
      // console.warn('Check bucket falló:', e);
    }

    // 4) Activar el link (idempotente)
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
