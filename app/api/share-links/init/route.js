export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';
import { nanoid8, sanitizeFileName, addInterval } from '@/lib/utils';

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
    const { title, message, expiry, files } = await req.json();

    if (!title || !Array.isArray(files) || files.length === 0) {
      return withCors(NextResponse.json({ error: 'title y files son requeridos' }, { status: 400 }));
    }

    const expiryOpts = ['24h', '5d', 'unlimited'];
    if (!expiryOpts.includes(expiry)) {
      return withCors(NextResponse.json({ error: 'expiry inválido' }, { status: 400 }));
    }

    // slug y expiración
    const slug = nanoid8();
    const now = new Date();
    const expiryAt = addInterval(now, expiry); // null si "unlimited"

    // 1) crear share_links (inactivo hasta complete)
    const { data: linkRow, error: linkErr } = await supabaseAdmin
      .from('share_links')
      .insert({
        slug,
        title: String(title).trim(),
        message: message?.trim?.() || null,
        expiry_at: expiryAt,
        is_active: false
      })
      .select('id, slug')
      .single();
    if (linkErr || !linkRow) throw linkErr || new Error('No se pudo crear link');

    // 2) preparar filas y generar signed upload para cada archivo
    const rows = [];
    const uploadTargets = [];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f?.id || !f?.name || !f?.mimeType) {
        return withCors(NextResponse.json({ error: 'cada file requiere id, name, mimeType' }, { status: 400 }));
      }

      const cleanName = sanitizeFileName(f.name);               // nombre "safe" para path
      const storagePath = `${slug}/${i}-${cleanName}`;          // ej: hd060ewu/0-archivo.pdf

      // pre-registro en tabla (enlazado al link)
      rows.push({
        link_id: linkRow.id,
        name: f.name,                                           // nombre original para UI
        mime_type: f.mimeType,
        size_bytes: f.size ?? null,
        storage_path: storagePath
      });

      // signed upload (POST multipart: token + file)
      const { data: signed, error: signErr } = await supabaseAdmin
        .storage.from(SHARE_BUCKET)
        .createSignedUploadUrl(storagePath);
      if (signErr || !signed) throw signErr || new Error('No se pudo firmar upload');

      // devolvemos método + url + token (el cliente añade Authorization/apikey)
      uploadTargets.push({
        fileId: f.id,
        path: storagePath,
        method: 'POST',
        signedUrl: signed.signedUrl,
        token: signed.token,
        // headers opcionales para el cliente (tu RN ya los añade solo; aquí por claridad)
        headers: {
          // En React Native usa la ANON KEY en ambos headers (muchos bridges normalizan el casing)
          // El cliente debe poner: Authorization: Bearer <SUPABASE_ANON_KEY> y apikey: <SUPABASE_ANON_KEY>
          // 'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          // 'apikey': process.env.SUPABASE_ANON_KEY
        }
      });
    }

    // 3) insertar filas de archivos
    const { error: insErr } = await supabaseAdmin.from('share_link_files').insert(rows);
    if (insErr) throw insErr;

    // 4) respuesta
    const shareUrl = `${process.env.SHARE_BASE_URL}/s/${slug}`;
    return withCors(NextResponse.json({
      linkId: linkRow.id,
      slug,
      shareUrl,
      uploadTargets
    }, { status: 200 }));
  } catch (e) {
    console.error('[share-links/init]', e);
    return withCors(NextResponse.json({ error: e?.message || 'Error' }, { status: 400 }));
  }
}
