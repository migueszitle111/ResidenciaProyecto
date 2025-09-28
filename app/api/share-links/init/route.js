export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';
import { nanoid8, sanitizeFileName, addInterval } from '@/lib/utils';

export async function POST(req) {
  try {
    const { title, message, expiry, files } = await req.json();

    if (!title || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'title y files son requeridos' }, { status: 400 });
    }
    const expiryOpts = ['24h', '5d', 'unlimited'];
    if (!expiryOpts.includes(expiry)) {
      return NextResponse.json({ error: 'expiry inválido' }, { status: 400 });
    }

    const slug = nanoid8();
    const now = new Date();
    const expiryAt = addInterval(now, expiry);

    // 1) crear share_links
    const { data: linkRow, error: linkErr } = await supabaseAdmin
      .from('share_links')
      .insert({
        slug,
        title,
        message: message || null,
        expiry_at: expiryAt,
        is_active: false
      })
      .select()
      .single();

    if (linkErr || !linkRow) {
      throw linkErr || new Error('No se pudo crear link');
    }

    // 2) crear filas de archivos + firmar upload (POST multipart con token)
    const uploadTargets = [];
    const rows = [];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f?.id || !f?.name || !f?.mimeType) {
        return NextResponse.json({ error: 'cada file requiere id, name, mimeType' }, { status: 400 });
      }

      const clean = sanitizeFileName(f.name);
      const path = `${slug}/${i}-${clean}`;

      rows.push({
        link_id: linkRow.id,
        name: f.name,
        mime_type: f.mimeType,
        size_bytes: f.size ?? null,
        storage_path: path
      });

      const { data: signed, error: suErr } = await supabaseAdmin
        .storage.from(SHARE_BUCKET)
        .createSignedUploadUrl(path);
      if (suErr || !signed) throw suErr || new Error('No se pudo firmar upload');

     uploadTargets.push({
        fileId: f.id,
        path,
        method: 'POST',
        signedUrl: signed.signedUrl,
        token: signed.token
        // ✅ sin headers: el cliente manejará Content-Type/boundary
      });
    }

    const { error: insErr } = await supabaseAdmin.from('share_link_files').insert(rows);
    if (insErr) throw insErr;

    return NextResponse.json({
      linkId: linkRow.id,
      slug,
      shareUrl: `${process.env.SHARE_BASE_URL}/s/${slug}`,
      uploadTargets
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 400 });
  }
}
