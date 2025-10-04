// app/api/share/init/route.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseadmin';
import { nanoid } from 'nanoid';

const SLUG_LEN = 12;            // slug corto tipo "pc8r4muia7..."
const MAX_RETRIES = 3;          // por si choca el unique(slug)

const asStr = (v) => (v ?? '').toString();
const safeMeta = (m, patient, doctor, studyType) => {
  const meta = (m && typeof m === 'object') ? m : {};
  return {
    ...meta,
    // la página /s/[slug] usa meta.study
    ...(patient   != null ? { patient }   : {}),
    ...(doctor    != null ? { doctor }    : {}),
    ...(studyType ? { study: studyType }  : {}),
    ...(studyType ? { studyType }         : {}),
  };
};

export async function POST(req) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const title   = asStr(body.title).slice(0, 140);
    const message = asStr(body.message);
    const metaIn  = body.meta;

    // permiten venir en raíz o dentro de meta
    const patient   = body.patient   ?? metaIn?.patient   ?? null;
    const doctor    = body.doctor    ?? metaIn?.doctor    ?? null;
    const studyType = body.studyType ?? metaIn?.studyType ?? metaIn?.study ?? null;

    const expiresInSeconds = Number(body.expiresInSeconds) || 0;
    const expiry_at = expiresInSeconds > 0
      ? new Date(Date.now() + expiresInSeconds * 1000).toISOString()
      : null;

    const meta = safeMeta(metaIn, patient, doctor, studyType);

    // intentos por si hay colisión de slug (unique)
    for (let i = 0; i < MAX_RETRIES; i++) {
      const slug = nanoid(SLUG_LEN);

      const { data, error } = await supabase
        .from('share_links')
        .insert({
          slug,
          title,
          message,
          expiry_at,
          // columnas "planas" para búsquedas
          patient,
          doctor,
          study_type: studyType,
          // JSONB para la UI
          meta,
          // se activará en /api/share/complete
          is_active: false,
        })
        .select('id, slug')
        .single();

      if (!error) {
        return NextResponse.json({ ok: true, linkId: data.id, slug: data.slug });
      }

      // 23505 = unique_violation (Postgres). Reintenta con otro slug.
      if (error.code !== '23505') {
        return NextResponse.json({ ok: false, error: error.message || String(error) }, { status: 400 });
      }
      // si fue colisión, vuelve al loop y genera otro slug
    }

    // si agotó reintentos
    return NextResponse.json({ ok: false, error: 'No se pudo generar un slug único' }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 400 });
  }
}
