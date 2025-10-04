// app/api/share/init/route.js

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseadmin';
import { nanoid } from 'nanoid';


export async function POST(req) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

   const { title, message, expiresInSeconds, meta, patient, doctor, studyType } = await req.json();
   const p  = (patient ?? meta?.patient ?? null) || null;
   const d  = (doctor  ?? meta?.doctor  ?? null) || null;
   const st = (studyType ?? meta?.studyType ?? meta?.study_type ?? null) || null;

    const slug = nanoid();
    const expiry_at = expiresInSeconds
      ? new Date(Date.now() + expiresInSeconds * 1000).toISOString()
      : null;

    const { data, error } = await supabaseAdmin
      .from('share_links')
     .insert({
       slug,
       title,
       message: message || '',
       expiry_at,
       // usa estas 3 líneas si agregaste columnas:
       patient: p,
       doctor: d,
       study_type: st,
       // si en vez de columnas usas JSONB, comenta lo anterior y usa:
       // meta: { patient: p, doctor: d, studyType: st }
     })
     .select('id, slug')
     .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, linkId: data.id, slug: data.slug });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
