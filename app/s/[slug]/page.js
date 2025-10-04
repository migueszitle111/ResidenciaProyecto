// app/s/[slug]/page.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getSupabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

const TTL_SECONDS = 60 * 10; // URLs firmadas válidas 10 minutos

function bytes(n) {
  if (!n) return '—';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(n) / Math.log(k));
  return `${(n / Math.pow(k, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
}

function isPreviewable(mime) {
  return /^image\//.test(mime) || mime === 'application/pdf';
}

function iconFor(mime = '', name = '') {
  const isPdf = mime === 'application/pdf' || name.toLowerCase().endsWith('.pdf');
  const isImg = /^image\//.test(mime);
  const common = 'w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner';

  if (isPdf) {
    return (
      <div className={common} aria-hidden>
        {/* PDF icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z" className="text-white/60"/>
          <path fill="currentColor" d="M14 2v6h6" className="text-white/30"/>
          <text x="7.5" y="16.5" fontSize="7" fontWeight="700" className="fill-[#B54B00]">PDF</text>
        </svg>
      </div>
    );
  }

  if (isImg) {
    return (
      <div className={common} aria-hidden>
        {/* Image icon */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/70">
          <path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2zM5 5h14v9l-3.5-3.5-4.5 4.5-2-2L5 16z"/>
          <circle cx="8" cy="8" r="1.5" className="fill-white/70"/>
        </svg>
      </div>
    );
  }

  return (
    <div className={common} aria-hidden>
      {/* File icon */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/70">
        <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path fill="currentColor" d="M14 2v6h6" className="opacity-40"/>
      </svg>
    </div>
  );
}

async function fetchData(slug) {
  const supabaseAdmin = getSupabaseAdmin();

  // 1) intentar con meta
  let { data: link, error } = await supabaseAdmin
    .from('share_links')
    .select('id, title, message, expiry_at, is_active, patient, doctor, study_type, meta')
    .eq('slug', slug)
    .maybeSingle();

  // 2) si falla por columna meta inexistente, reintenta sin meta
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
  if (expired) return { expired: true, _reason: 'expired-or-inactive' };

  const { data: files } = await supabaseAdmin
    .from('share_link_files')
    .select('id, name, mime_type, size_bytes, storage_path')
    .eq('link_id', link.id)
    .order('created_at', { ascending: true });

  const items = [];
  for (const f of files || []) {
    const { data: signed } = await supabaseAdmin
      .storage.from(SHARE_BUCKET)
      .createSignedUrl(f.storage_path, TTL_SECONDS, { download: f.name });
    items.push({
      ...f,
      url: signed?.signedUrl || '#',
      previewable: isPreviewable(f.mime_type),
    });
  }

  return {
    expired: false,
    link: {
      title: link.title,
      message: link.message || '',
      expiry_at: link.expiry_at,
      slug,
      meta: {
        patient: link?.patient ?? null,
        doctor:  link?.doctor ?? null,
        study:   link?.study_type ?? null,
        ...(link?.meta || {}),
      },
    },
    items,
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  const data = await fetchData(slug);
  if (data.expired) notFound();

  const { link, items } = data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-white">
      {/* Contenedor */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Card principal */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-5 md:p-8">
          {/* Encabezado */}
          <header className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {link.title}
            </h1>

            {/* Badge marca */}
            <div className="rounded-full px-3 py-1 text-xs font-semibold bg-[#B54B00] text-white shadow">
              MEDXpro
            </div>
          </header>

          {/* Meta del paquete */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            <MetaBadge label="Estudio" value={link.meta?.study} />
            <MetaBadge label="Paciente" value={link.meta?.patient} />
            <MetaBadge label="Médico" value={link.meta?.doctor} />
          </section>

          {/* Mensaje opcional */}
          {link.message ? (
            <div className="mb-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 leading-relaxed">
                {link.message}
              </div>
            </div>
          ) : null}

          {/* Lista de archivos */}
          <ul className="space-y-3">
            {items.map((it) => (
              <li
                key={it.id}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors"
              >
                <div className="p-4 md:p-5 flex items-center gap-4 md:gap-5">
                  {iconFor(it.mime_type, it.name)}

                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{it.name}</div>
                    <div className="text-xs text-white/60 mt-1">
                      {it.mime_type} · {bytes(it.size_bytes)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={it.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold bg-[#B54B00] hover:brightness-110 transition"
                    >
                      Descargar
                    </a>

                    {it.previewable && (
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold border border-white/15 bg-white/0 hover:bg-white/[0.06] transition"
                      >
                        Ver
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}

            {!items.length && (
              <li className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/60">
                    <path fill="currentColor" d="M19 3H5C3.9 3 3 3.9 3 5v14a2 2 0 0 0 2 2h7v-2H5V5h14v6h2V5a2 2 0 0 0-2-2z"/>
                    <path fill="currentColor" d="M21.5 15.5L17 20l-2.5-2.5L13 19l4 4l6-6z" className="opacity-40"/>
                  </svg>
                </div>
                <p className="text-white/70">No hay archivos en este paquete.</p>
              </li>
            )}
          </ul>

          {/* Pie / Expiración */}
          <footer className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-white/60">
              Este enlace expira{' '}
              <span className="font-medium text-white/80">
                {link.expiry_at
                  ? new Date(link.expiry_at).toLocaleString()
                  : 'cuando el autor lo desactive'}
              </span>
              .
            </div>

            {/* “Chip” con el slug para referencia */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#B54B00]" />
              Código: {link.slug}
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

/** Sub-componentes server-safe */
function MetaBadge({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-white/50">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white/90">{value || '—'}</div>
    </div>
  );
}
