'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const BG = '#dfdfdf';

function VisorContent() {
  const params          = useSearchParams();
  const router          = useRouter();
  const pdfSrc          = params.get('pdf');
  const [ready, setReady] = useState(false);

  /* Inyectar CSS dflip una sola vez */
  useEffect(() => {
    const addLink = (href, id) => {
      if (id && document.getElementById(id)) return;
      const el = document.createElement('link');
      if (id) el.id = id;
      el.rel  = 'stylesheet';
      el.href = href;
      document.head.appendChild(el);
    };
    addLink('/dflip/css/themify-icons.min.css', 'dflip-icons-css');
    addLink('/dflip/css/dflip.min.css', 'dflip-css');
  }, []);

  /* Inicializar flipBook cuando dflip.min.js haya cargado (onLoad) */
  useEffect(() => {
    if (!pdfSrc || !ready) return;

    /* API real de dflip: jQuery(el).flipBook(source, options) */
    const id = setInterval(() => {
      if (window.jQuery && typeof window.jQuery.fn?.flipBook === 'function') {
        clearInterval(id);
        const el = document.getElementById('df-viewer');
        if (!el) return;
        window.jQuery(el).flipBook(pdfSrc, {
          pdfRenderQuality : 3,
          zoomRatio        : 4,
          webgl            : false,
          backgroundColor  : BG,
          controlsPosition : 'bottom',
          paddingTop       : 20,
          paddingBottom    : 20,
          paddingLeft      : 20,
          paddingRight     : 20,
          enableDownload   : false,
        });
      }
    }, 100);

    return () => clearInterval(id);
  }, [pdfSrc, ready]);

  if (!pdfSrc) {
    return (
      <div style={{ background: BG, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fff', textAlign: 'center' }}>
          <p style={{ marginBottom: 16 }}>PDF no especificado.</p>
          <button
            onClick={() => router.push('/Educacion')}
            style={btnStyle}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b85c2a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#D06D33'}
          >
            Ir a Educacion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Config ANTES de jquery/dflip */}
      <Script id="df-preconfig" strategy="beforeInteractive">{`
        window.DFLIP = window.DFLIP || {};
        window.DFLIP.defaults = {
          autoCreate       : false,
          skin             : 'light',
          webgl            : false,
          pdfRenderQuality : 3,
          zoomRatio        : 4,
          backgroundColor  : '${BG}',
          controlsPosition : 'bottom',
          enableDownload   : false,
        };
      `}</Script>
      <Script src="/dflip/js/libs/jquery.min.js" strategy="afterInteractive" />
      <Script
        src="/dflip/js/dflip.min.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />

      {/* Boton X flotante */}
      <button
        onClick={() => router.push('/Educacion')}
        title="Regresar a Educacion"
        style={{
          position  : 'fixed',
          top       : 16,
          right     : 20,
          zIndex    : 9999,
          width     : 36,
          height    : 36,
          borderRadius : '50%',
          border    : '1px solid rgba(255,255,255,0.4)',
          background: 'rgba(0,0,0,0.55)',
          color     : '#fff',
          fontSize  : 18,
          lineHeight: '1',
          cursor    : 'pointer',
          display   : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#D06D33'; e.currentTarget.style.borderColor = '#D06D33'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
      >
        ✕
      </button>

      {/* Visor */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 0' }}>
        <div
          id="df-viewer"
          style={{ width: '100%', maxWidth: 1100, height: 720 }}
        />
      </div>
    </div>
  );
}

const btnStyle = {
  padding         : '6px 20px',
  borderRadius    : '9999px',
  border          : '1px solid #D06D33',
  cursor          : 'pointer',
  background      : '#D06D33',
  color           : '#fff',
  fontWeight      : 400,
  fontSize        : '0.875rem',
  letterSpacing   : '0.02em',
  transition      : 'background-color 0.2s',
};

function VisorPage() {
  return (
    <Suspense fallback={<div style={{ background: '#6b7280', minHeight: '100vh' }} />}>
      <VisorContent />
    </Suspense>
  );
}

export default dynamic(() => Promise.resolve(VisorPage), { ssr: false });
