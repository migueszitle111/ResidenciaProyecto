// app/s/[slug]/page.js
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { supabaseAdmin, SHARE_BUCKET } from '@/lib/supabaseadmin';

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

async function fetchData(slug) {
  const { data: link } = await supabaseAdmin
    .from('share_links')
    .select('id, title, message, expiry_at, is_active')
    .eq('slug', slug)
    .maybeSingle();

  const now = new Date();
  const expired =
    !link || !link.is_active || (link.expiry_at && new Date(link.expiry_at) <= now);
  if (expired) return { expired: true };

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
    <main style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>{link.title}</h1>
        </header>

        {link.message ? <p style={styles.message}>{link.message}</p> : null}

        <ul style={styles.list}>
          {items.map((it) => (
            <li key={it.id} style={styles.item}>
              <div style={styles.itemInfo}>
                <div style={styles.itemName}>{it.name}</div>
                <div style={styles.itemMeta}>
                  {it.mime_type} · {bytes(it.size_bytes)}
                </div>
              </div>

              <div style={styles.itemActions}>
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.actionBtn}
                >
                  Descargar
                </a>
                {it.previewable && (
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.actionBtn, ...styles.secondaryBtn }}
                  >
                    Ver
                  </a>
                )}
              </div>
            </li>
          ))}

          {!items.length && (
            <li style={{ padding: 16, color: '#6b7280' }}>
              No hay archivos en este paquete.
            </li>
          )}
        </ul>

        <footer style={styles.footer}>
          Este enlace expira{' '}
          {link.expiry_at
            ? new Date(link.expiry_at).toLocaleString()
            : 'cuando el autor lo desactive'}
          .
        </footer>
      </div>
    </main>
  );
}

/* ====== estilos inline (tema claro) ====== */
const styles = {
  page: {
    minHeight: '100vh',
    background: '#f6f8fb',
    padding: 24,
    colorScheme: 'light',
  },
  card: {
    maxWidth: 820,
    margin: '0 auto',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 14,
    padding: 20,
    boxShadow:
      '0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04)',
  },
  header: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: { margin: 0, fontSize: 22, lineHeight: 1.25, color: '#111827' },
  message: {
    whiteSpace: 'pre-wrap',
    color: '#374151',
    marginTop: 6,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '8px 0 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
    padding: '12px 14px',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    marginBottom: 10,
    background: '#fafafa',
  },
  itemInfo: { minWidth: 0 },
  itemName: {
    fontWeight: 600,
    color: '#111827',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  itemActions: { display: 'flex', gap: 8, flexShrink: 0 },
  actionBtn: {
    textDecoration: 'none',
    background: '#2563eb',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 8,
    fontSize: 13,
  },
  secondaryBtn: { background: '#6b7280' },
  footer: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 14,
    textAlign: 'right',
  },
};
