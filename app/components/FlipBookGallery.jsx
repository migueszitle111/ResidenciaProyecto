'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const BOOKS = [
  { pdf: '/pdfs/POTENCIALESEVOCADOSmEDXpro.pdf',          label: 'Potenciales Evocados' },
  { pdf: '/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf', label: 'Conduccion Nerviosa'  },
];

const preConfig = `
  window.DFLIP = window.DFLIP || {};
  window.DFLIP.defaults = {
    autoCreate       : false,
    skin             : 'light',
    webgl            : false,
    pdfRenderQuality : 3,
    zoomRatio        : 4,
    backgroundColor  : '#bdbdbd',
    controlsPosition : 'bottom',
    enableDownload   : false,
  };
`;

function FlipBookGallery() {
  const [mountKey, setMountKey] = useState(0);
  const timerRef  = useRef(null);

  /* Inyectar CSS dflip una sola vez */
  useEffect(() => {
    const addLink = (href, id) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id; link.rel = 'stylesheet'; link.href = href;
      document.head.appendChild(link);
    };
    addLink('/dflip/css/themify-icons.min.css', 'dflip-icons-css');
    addLink('/dflip/css/dflip.min.css',         'dflip-css');
  }, []);

  /* Parsear thumbs después de cada re-montaje */
  useEffect(() => {
    const tryParse = () => {
      if (!window.jQuery || !window.DFLIP?.parseBooks) {
        timerRef.current = setTimeout(tryParse, 200);
        return;
      }
      /* Limpiar cualquier elemento que dflip haya inyectado dentro
         de los wrappers _df_book-cover que genera al parsear thumbs */
      document.querySelectorAll('._df_thumb').forEach(el => {
        /* Eliminar hijos generados por dflip, dejar solo el div vacío */
        while (el.firstChild) el.removeChild(el.firstChild);
        el.removeAttribute('df-parsed');
        el.removeAttribute('parsed');
        el.style.cssText = '';
      });
      window.DFLIP.parseBooks();
    };

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(tryParse, 100);
    return () => clearTimeout(timerRef.current);
  }, [mountKey]);

  /* Recuperar foco → re-montar thumbs desde cero */
  useEffect(() => {
    const onFocus = () => {
      if (document.visibilityState !== 'visible') return;
      setMountKey(k => k + 1);
    };
    document.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  /* Interceptar click para abrir Visor en nueva pestaña */
  useEffect(() => {
    const handler = (e) => {
      const thumb = e.target.closest('[data-pdf]');
      if (!thumb) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      window.open(`/Educacion/Visor?pdf=${encodeURIComponent(thumb.getAttribute('data-pdf'))}`, '_blank');
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return (
    <>
      <Script id="df-preconfig" strategy="beforeInteractive">{preConfig}</Script>
      <Script src="/dflip/js/libs/jquery.min.js" strategy="afterInteractive" />
      <Script src="/dflip/js/dflip.min.js" strategy="afterInteractive"
        onLoad={() => setMountKey(k => k + 1)} />

      <div key={mountKey} className="mt-8 flex flex-wrap justify-center gap-8">
        {BOOKS.map(({ pdf, label }) => (
          <div key={pdf} data-pdf={pdf} className="cursor-pointer flex flex-col items-center gap-2">
            <div
              className="_df_thumb"
              source={pdf}
              thumb="/dflip/images/book-template.png"
            />
            <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(FlipBookGallery), { ssr: false });
