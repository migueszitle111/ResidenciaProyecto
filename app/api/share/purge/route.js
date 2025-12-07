// app/api/share/purge/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin, SHARE_BUCKET, getBucketFromPath, getPathWithoutBucket } from '@/lib/supabaseadmin';

export async function POST(req) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: 'slug requerido' }, { status: 400 });

    const { data: link } = await supabaseAdmin
      .from('share_links')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (!link) return NextResponse.json({ ok: true });

    const { data: files } = await supabaseAdmin
      .from('share_link_files')
      .select('storage_path')
      .eq('link_id', link.id);

    if (files?.length) {
      // Agrupar archivos por bucket para eliminarlos correctamente
      const filesByBucket = files.reduce((acc, file) => {
        const bucket = getBucketFromPath(file.storage_path);
        const pathInBucket = getPathWithoutBucket(file.storage_path);
        if (!acc[bucket]) acc[bucket] = [];
        acc[bucket].push(pathInBucket);
        return acc;
      }, {});

      // Eliminar archivos de cada bucket
      for (const [bucket, paths] of Object.entries(filesByBucket)) {
        await supabaseAdmin.storage.from(bucket).remove(paths);
      }
    }

    await supabaseAdmin.from('share_link_files').delete().eq('link_id', link.id);
    await supabaseAdmin.from('share_links').delete().eq('id', link.id);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 400 });
  }
}
