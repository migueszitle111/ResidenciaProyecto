'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const BOOKS = [
  { pdf: '/pdfs/POTENCIALESEVOCADOSmEDXpro.pdf',          label: 'Potenciales Evocados' },
  { pdf: '/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf', label: 'Conduccion Nerviosa'  },
];

const preConfig = `
  window.DFLIP = window.DFLIP || {};
  window.DFLIP.defaults = {
    autoCreate       : true,
    skin             : 'light',
    webgl            : false,
    pdfRenderQuality : 3,
    zoomRatio        : 4,
    backgroundColor  : '#bdbdbd',
    controlsPosition : 'bottom',
    enableDownload   : false,
  };
`;

function parseThumbs() {
  if (!window.jQuery || !window.DFLIP?.parseBooks) return false;
  document.querySelectorAll('._df_thumb').forEach(el => {
    el.removeAttribute('df-parsed');
    el.removeAttribute('parsed');
  });
  window.DFLIP.parseBooks();
  return true;
}

function FlipBookGallery() {
  const parsed = useRef(false);

  /* Inyectar CSS dflip */
  useEffect(() => {
    const addLink = (href, id) => {
      if (id && document.getElementById(id)) return;
      const link = document.createElement('link');
      if (id) link.id = id;
      link.rel  = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };
    addLink('/dflip/css/themify-icons.min.css', 'dflip-icons-css');
    addLink('/dflip/css/dflip.min.css', 'dflip-css');
  }, []);

  /* Re-parsear thumbs cada vez que la pestaña vuelve a ser visible
     (el usuario cierra/minimiza la pestaña del visor y regresa aquí) */
  useEffect(() => {
    const reParse = () => {
      if (document.visibilityState === 'visible') {
        parsed.current = false;   // forzar re-parseo
        tryParse();
      }
    };

    const tryParse = () => {
      if (parsed.current) return;
      const ok = parseThumbs();
      if (!ok) {
        /* dflip aún no ha cargado — reintentar */
        setTimeout(tryParse, 200);
      } else {
        parsed.current = true;
      }
    };

    /* Primera carga */
    tryParse();

    /* Al volver de otra pestaña */
    document.addEventListener('visibilitychange', reParse);
    window.addEventListener('focus', reParse);

    return () => {
      document.removeEventListener('visibilitychange', reParse);
      window.removeEventListener('focus', reParse);
    };
  }, []);

  /* Interceptar click en capture antes de que dflip abra el visor inline */
  useEffect(() => {
    const handler = (e) => {
      const thumb = e.target.closest('[data-pdf]');
      if (!thumb) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      const pdf = thumb.getAttribute('data-pdf');
      window.open(`/Educacion/Visor?pdf=${encodeURIComponent(pdf)}`, '_blank');
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return (
    <>
      <Script id="df-preconfig" strategy="beforeInteractive">{preConfig}</Script>
      <Script src="/dflip/js/libs/jquery.min.js" strategy="afterInteractive" />
      <Script src="/dflip/js/dflip.min.js" strategy="afterInteractive" />

      <div className="mt-8 flex flex-wrap justify-center gap-8">
        {BOOKS.map(({ pdf, label }) => (
          <div
            key={pdf}
            data-pdf={pdf}
            className="_df_thumb cursor-pointer"
            source={pdf}
            thumb="/dflip/images/book-template.png"
            style={{ textAlign: 'center' }}
          >
            {label}
          </div>
        ))}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(FlipBookGallery), { ssr: false });
