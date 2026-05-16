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
  const parsed  = useRef(false);
  const timerRef = useRef(null);
  /* mountKey fuerza re-montaje de los thumbs al volver a la página */
  const [mountKey, setMountKey] = useState(0);

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

  /* Re-montar + re-parsear cuando el usuario vuelve a esta pestaña */
  useEffect(() => {
    const tryParse = () => {
      if (parsed.current) return;
      const ok = parseThumbs();
      if (!ok) {
        timerRef.current = setTimeout(tryParse, 200);
      } else {
        parsed.current = true;
      }
    };

    const reParse = () => {
      if (document.visibilityState !== 'visible') return;
      clearTimeout(timerRef.current);
      parsed.current = false;
      /* Incrementar key obliga a React a desmontar y remontar los thumbs,
         limpiando cualquier mutación que dflip haya hecho al DOM */
      setMountKey(k => k + 1);
      tryParse();
    };

    /* Primera carga */
    tryParse();

    document.addEventListener('visibilitychange', reParse);
    window.addEventListener('focus', reParse);

    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('visibilitychange', reParse);
      window.removeEventListener('focus', reParse);
    };
  }, []);

  /* Interceptar click antes de que dflip abra el visor inline */
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

      <div key={mountKey} className="mt-8 flex flex-wrap justify-center gap-8">
        {BOOKS.map(({ pdf, label }) => (
          /* El wrapper captura el click y muestra el label debajo del thumb */
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
