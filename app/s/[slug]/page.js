// app/s/[slug]/page.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getSupabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

/* ========= Config ========= */
const BRAND = '#B54B00';          // naranja MEDXpro
const TTL_SECONDS = 60 * 10;      // URLs firmadas válidas 10 minutos

/* ========= Metadata para Open Graph (WhatsApp, Facebook, etc.) ========= */
export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await fetchData(slug);

  if (data.expired) {
    return {
      title: 'Enlace expirado - mEDXpro',
      description: 'Este enlace ha expirado o no es válido',
    };
  }

  const { link } = data;
  const title = link.title || 'Compartir Diagnóstico - mEDXpro';
  const description = link.message || 'Reporte médico compartido de forma segura';

  // 🔥 IMPORTANTE: Cambia esta URL por la de tu logo en producción
  // Debe ser una URL pública absoluta (https://...)
  const logoUrl = process.env.NEXT_PUBLIC_OG_IMAGE ||
                  'https://[TU-PROYECTO].supabase.co/storage/v1/object/public/assets/logo-medxpro-og.png';

  // URL completa del link (ajusta el dominio según tu deploy)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tu-dominio.com';
  const shareUrl = `${baseUrl}/s/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: shareUrl,
      siteName: 'mEDXpro',
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: 'mEDXpro - Sistema de Diagnóstico Médico',
        }
      ],
      type: 'website',
      locale: 'es_MX',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logoUrl],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    metadataBase: new URL(baseUrl),
  };
}

/* ========= Utils UI ========= */
function bytes(n) {
  if (!n) return '—';
  const k = 1024;
  const u = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(n) / Math.log(k)), u.length - 1);
  return `${(n / Math.pow(k, i)).toFixed(i ? 1 : 0)} ${u[i]}`;
}
const isPreviewable = (m) => /^image\//.test(m) || m === 'application/pdf';

/* Íconos minimal (PDF / IMG / genérico) */
function iconFor(mime = '', name = '') {
  const isPdf = mime === 'application/pdf' || name.toLowerCase().endsWith('.pdf');
  const isImg = /^image\//.test(mime);
  const common =
    'shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl ' +
    'border border-slate-300 bg-white shadow-sm ring-1 ring-black/5 ' +
    'transition-transform duration-300 group-hover:scale-[1.03]';

  if (isPdf) {
    return (
      <div className={common} aria-hidden>
        <span className="ml-1 text-[10px] font-black tracking-wide" style={{ color: BRAND }}>
          PDF
        </span>
      </div>
    );
  }
  if (isImg) {
    return (
      <div className={common} aria-hidden>
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-600">
          <path
            fill="currentColor"
            d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2zM5 5h14v9l-3.5-3.5-4.5 4.5-2-2L5 16z"
          />
          <circle cx="8" cy="8" r="1.5" className="fill-slate-600" />
        </svg>
      </div>
    );
  }
  return (
    <div className={common} aria-hidden>
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-600">
        <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z" />
        <path fill="currentColor" d="M14 2v6h6" className="opacity-40" />
      </svg>
    </div>
  );
}

/* ========= Helpers para etiqueta de Estudio ========= */
const _clean = (s = '') =>
  s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function deriveStudyLabel(input = {}) {
  const { study, studyType, title } = input;
  const haystack = [_clean(study || ''), _clean(studyType || ''), _clean(title || '')]
    .filter(Boolean)
    .join(' ');

  // Palabras clave que clasifican como Potenciales Evocados
  const isPE =
    /\bevocado(s)?\b/.test(haystack) ||
    /\bpotencial(e|es)\b/.test(haystack) ||
    /\bvisual(es)?\b/.test(haystack) ||
    /\bauditiv(a|o|as|os)\b/.test(haystack) ||
    /\bsomatosensor(i|ia|iales)?\b/.test(haystack) ||
    /\bvia(s)?\s+(visual|auditiv|somatosensor)/.test(haystack);

  // Si no es PE, mostramos Electroneuromiografía (ej. Neuronopatía, Miopatía, etc.)
  return isPE ? 'Potenciales Evocados' : 'Electroneuromiografía';
}

/* ========= Data ========= */
async function fetchData(slug) {
  const supabaseAdmin = getSupabaseAdmin();

  // 1) link + meta si existe
  let { data: link, error } = await supabaseAdmin
    .from('share_links')
    .select('id, title, message, expiry_at, is_active, patient, doctor, study_type, meta')
    .eq('slug', slug)
    .maybeSingle();

  // 2) fallback sin columna meta
  if (error && /column .*meta/i.test(error.message || '')) {
    const r2 = await supabaseAdmin
      .from('share_links')
      .select('id, title, message, expiry_at, is_active, patient, doctor, study_type')
      .eq('slug', slug)
      .maybeSingle();
    link = r2.data;
    error = r2.error;
  }
  if (error) {
    console.error('share_links select failed', { slug, error: error.message });
  }
  if (!link) return { expired: true, _reason: 'not-found-or-error' };

  const now = new Date();
  const expired = !link.is_active || (link.expiry_at && new Date(link.expiry_at) <= now);
  if (expired) {
    // 🔥 Purga best-effort para expiración “dura”
    try {
      const { data: files } = await supabaseAdmin
        .from('share_link_files')
        .select('storage_path')
        .eq('link_id', link.id);
      if (files?.length) {
        await supabaseAdmin.storage.from(SHARE_BUCKET)
          .remove(files.map(f => f.storage_path));
      }
      await supabaseAdmin.from('share_link_files').delete().eq('link_id', link.id);
      await supabaseAdmin.from('share_links').delete().eq('id', link.id);
    } catch (e) {
      console.warn('purge-on-read failed', e);
    }
    return { expired: true, _reason: 'expired-or-inactive' };
  }

  const { data: files } = await supabaseAdmin
    .from('share_link_files')
    .select('id, name, mime_type, size_bytes, storage_path')
    .eq('link_id', link.id)
    .order('created_at', { ascending: true });

  // Dos URLs por archivo: preview (inline) y download (forzada)
  const items = (files || []).map((f) => ({
    ...f,
    previewUrl: `/api/share/signed/${slug}/${f.id}?mode=inline`,
    downloadUrl: `/api/share/signed/${slug}/${f.id}?mode=download`,
    previewable: isPreviewable(f.mime_type),
  }));

  const result = {
    expired: false,
    link: {
      title: link.title,
      message: link.message || '',
      expiry_at: link.expiry_at,
      slug,
      meta: {
        patient: link?.patient ?? null,
        doctor: link?.doctor ?? null,
        study: link?.study_type ?? null,
        ...(link?.meta || {}),
      },
    },
    items,
  };

  // Etiqueta de Estudio derivada para la UI
  result.link.meta.studyLabel = deriveStudyLabel({
    study: result.link.meta.study ?? result.link.meta?.studyType,
    studyType: result.link.meta?.studyType,
    title: result.link.title,
  });

  return result;
}

/* ========= Página ========= */
export default async function Page({ params }) {
  const { slug } = params;
  const data = await fetchData(slug);
  if (data.expired) notFound();

  const { link, items } = data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 selection:bg-[rgba(181,75,0,0.18)] selection:text-slate-900">
      {/* Contenedor */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Card principal */}
        <div
          className="
            rounded-3xl border border-slate-300 bg-white/80 backdrop-blur
            shadow-[0_20px_50px_-20px_rgba(2,6,23,0.12)] p-5 md:p-8
            supports-[backdrop-filter]:bg-white/60
          "
        >
          {/* Encabezado */}
          <header className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {link.title}
            </h1>

            {/* Marca */}
            <div
              className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
              style={{ backgroundColor: BRAND }}
            >
              MEDXpro
            </div>
          </header>

          {/* Meta del paquete */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            <MetaBadge label="Estudio" value={link.meta?.studyLabel || link.meta?.study} />
            <MetaBadge label="Paciente" value={link.meta?.patient} />
            <MetaBadge label="Médico" value={link.meta?.doctor} />
          </section>

          {/* Mensaje opcional */}
          {link.message ? (
            <div className="mb-6">
              <div className="rounded-2xl border border-slate-300 bg-white/70 px-4 py-3 leading-relaxed text-slate-800 shadow-sm">
                {link.message}
              </div>
            </div>
          ) : null}

          {/* Lista de archivos */}
          <ul className="space-y-3">
            {items.map((it) => (
              <li
                key={it.id}
                className="
                  group rounded-2xl border border-slate-300 bg-white/70
                  transition-all duration-300 hover:bg-white hover:-translate-y-[1px]
                  hover:shadow-xl hover:shadow-slate-200/80 hover:border-slate-400
                "
              >
                <div className="p-4 md:p-5 grid grid-cols-[auto,1fr] sm:grid-cols-[auto,1fr,auto] gap-3 md:gap-5 items-start sm:items-center">
                  {iconFor(it.mime_type, it.name)}

                  {/* Nombre + meta */}
                  <div className="min-w-0">
                    <div className="font-semibold truncate text-slate-900">
                      {it.name}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                      <span className="truncate">{it.mime_type}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                      <span>{bytes(it.size_bytes)}</span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="col-span-2 sm:col-span-1 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    {/* Descargar */}
                    <a
                      href={it.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Descargar ${it.name}`}
                      className="
                        relative inline-flex w-full sm:w-auto shrink-0 items-center justify-center rounded-xl
                        px-3.5 py-2 text-sm font-semibold text-white text-center
                        transition-[transform,box-shadow,padding] duration-300
                        md:hover:px-4 hover:shadow-[0_10px_24px_-10px_rgba(181,75,0,.6)]
                        hover:scale-[1.02] active:scale-[0.98]
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        overflow-hidden
                      "
                      style={{ backgroundColor: BRAND, boxShadow: '0 6px 20px -6px rgba(181,75,0,.45)' }}
                    >
                      {/* Pulso sutil */}
                      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="absolute inset-0 bg-white/10" />
                      </span>
                      <svg viewBox="0 0 24 24" className="mr-2 h-[18px] w-[18px] text-white/95" aria-hidden>
                        <path fill="currentColor" d="M12 3v12.17l4.59-4.58L18 12l-6 6-6-6 1.41-1.41L11 15.17V3z" />
                      </svg>
                      Descargar
                    </a>

                    {/* Ver (inline en navegador, NO descarga) */}
                    {it.previewable && (
                      <a
                        href={it.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver ${it.name}`}
                        className="
                          inline-flex w-full sm:w-auto shrink-0 items-center justify-center rounded-xl
                          px-3.5 py-2 text-sm font-semibold text-center
                          border border-slate-300 text-slate-800
                          bg-white hover:bg-slate-50
                          transition-[transform,box-shadow,padding] duration-300
                          md:hover:px-4 hover:shadow-[0_10px_24px_-12px_rgba(2,6,23,0.25)]
                          hover:scale-[1.02] active:scale-[0.98]
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-[18px] w-[18px] text-slate-700"
                          aria-hidden
                        >
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Ver
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}

            {!items.length && (
              <li
                className="
                  rounded-2xl border border-slate-300 bg-white/70 p-8 text-center
                "
              >
                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl border border-slate-300 bg-white flex items-center justify-center shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-500">
                    <path fill="currentColor" d="M19 3H5C3.9 3 3 3.9 3 5v14a2 2 0 0 0 2 2h7v-2H5V5h14v6h2V5a2 2 0 0 0-2-2z" />
                    <path fill="currentColor" d="M21.5 15.5L17 20l-2.5-2.5L13 19l4 4l6-6z" className="opacity-40" />
                  </svg>
                </div>
                <p className="text-slate-600">No hay archivos en este paquete.</p>
              </li>
            )}
          </ul>

          {/* Pie / Expiración */}
          <footer className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-slate-700">
              Este enlace expira{' '}
              <span className="font-medium text-slate-900">
                {link.expiry_at
                  ? new Date(link.expiry_at).toLocaleString()
                  : 'cuando el autor lo desactive'}
              </span>
              .
            </div>

            {/* Chip con el slug */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 shadow-sm">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND }} />
              Código: {link.slug}
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

/* ========= Sub-componentes server-safe ========= */
function MetaBadge({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-slate-900">{value || '—'}</div>
    </div>
  );
}
