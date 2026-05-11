'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const BG = '#dfdfdf';

function VisorContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const pdfSrc  = params.get('pdf');

  const [scriptReady, setScriptReady] = useState(false);
  const [blobUrl,     setBlobUrl]     = useState(null);   // PDF completo en memoria
  const [loadPct,     setLoadPct]     = useState(0);      // progreso de descarga

  /* Inyectar CSS dflip */
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

  /* Descargar el PDF COMPLETO antes de pasárselo a dflip.
     Así dflip recibe un blob:// local — sin streaming parcial. */
  useEffect(() => {
    if (!pdfSrc) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(pdfSrc);
        const total = Number(res.headers.get('content-length')) || 0;
        const reader = res.body.getReader();
        const chunks = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          chunks.push(value);
          received += value.length;
          if (total > 0) setLoadPct(Math.round((received / total) * 100));
        }

        if (!cancelled) {
          const blob = new Blob(chunks, { type: 'application/pdf' });
          setBlobUrl(URL.createObjectURL(blob));
          setLoadPct(100);
        }
      } catch (e) {
        /* fallback: usar URL directa si la descarga falla */
        if (!cancelled) setBlobUrl(pdfSrc);
      }
    })();

    return () => { cancelled = true; };
  }, [pdfSrc]);

  /* Inicializar dflip cuando el script Y el blob estén listos */
  useEffect(() => {
    if (!blobUrl || !scriptReady) return;

    const id = setInterval(() => {
      if (window.jQuery && typeof window.jQuery.fn?.flipBook === 'function') {
        clearInterval(id);
        const el = document.getElementById('df-viewer');
        if (!el) return;
        window.jQuery(el).flipBook(blobUrl, {
          pdfRenderQuality : 1,
          maxTextureSize   : 3508,  /* A4 a 300 DPI exacto — máxima nitidez tipográfica */
          minTextureSize   : 3508,  /* igual al max: siempre renderiza a 300 DPI */
          pixelRatio       : 1,     /* pixelRatio=1 porque el tamaño ya es el real */
          zoomRatio        : 1.5,
          webgl            : false,
          backgroundColor  : BG,
          controlsPosition : 'bottom',
          paddingTop       : 20,
          paddingBottom    : 20,
          paddingLeft      : 20,
          paddingRight     : 20,
          enableDownload   : false,
          waitPeriod       : 100,
        });
      }
    }, 100);

    return () => clearInterval(id);
  }, [blobUrl, scriptReady]);

  if (!pdfSrc) {
    return (
      <div style={{ background: BG, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#333', textAlign: 'center' }}>
          <p style={{ marginBottom: 16 }}>PDF no especificado.</p>
          <button onClick={() => router.push('/Educacion')} style={btnStyle}>
            Ir a Educacion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: BG, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      <Script id="df-preconfig" strategy="beforeInteractive">{`
        window.DFLIP = window.DFLIP || {};
        window.DFLIP.defaults = {
          autoCreate       : false,
          skin             : 'light',
          webgl            : false,
          pdfRenderQuality : 1,
          maxTextureSize   : 3508,
          minTextureSize   : 3508,
          pixelRatio       : 1,
          zoomRatio        : 1.5,
          backgroundColor  : '${BG}',
          controlsPosition : 'bottom',
          enableDownload   : false,
        };
      `}</Script>
      <Script src="/dflip/js/libs/jquery.min.js" strategy="afterInteractive" />
      <Script
        src="/dflip/js/dflip.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      {/* Boton X flotante */}
      <button
        onClick={() => router.push('/Educacion')}
        title="Regresar a Educacion"
        style={{
          position      : 'fixed',
          top           : 16,
          right         : 20,
          zIndex        : 9999,
          width         : 36,
          height        : 36,
          borderRadius  : '50%',
          border        : '1px solid rgba(255,255,255,0.4)',
          background    : 'rgba(0,0,0,0.55)',
          color         : '#fff',
          fontSize      : 18,
          lineHeight    : '1',
          cursor        : 'pointer',
          display       : 'flex',
          alignItems    : 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#D06D33'; e.currentTarget.style.borderColor = '#D06D33'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
      >
        ✕
      </button>

      {/* Barra de progreso mientras descarga */}
      {!blobUrl && (
        <div style={{
          position      : 'absolute',
          inset         : 0,
          display       : 'flex',
          flexDirection : 'column',
          alignItems    : 'center',
          justifyContent: 'center',
          zIndex        : 10,
          background    : BG,
        }}>
          <p style={{ color: '#333', marginBottom: 16, fontWeight: 500 }}>
            Cargando PDF… {loadPct > 0 ? `${loadPct}%` : ''}
          </p>
          <div style={{ width: 260, height: 6, background: '#ccc', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height     : '100%',
              width      : `${loadPct}%`,
              background : '#D06D33',
              borderRadius: 4,
              transition : 'width 0.2s',
            }} />
          </div>
        </div>
      )}

      {/* Visor */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div id="df-viewer" style={{ position: 'absolute', inset: 0 }} />
      </div>
    </div>
  );
}

const btnStyle = {
  padding      : '6px 20px',
  borderRadius : '9999px',
  border       : '1px solid #D06D33',
  cursor       : 'pointer',
  background   : '#D06D33',
  color        : '#fff',
  fontWeight   : 400,
  fontSize     : '0.875rem',
  letterSpacing: '0.02em',
  transition   : 'background-color 0.2s',
};

function VisorPage() {
  return (
    <Suspense fallback={<div style={{ background: BG, minHeight: '100vh' }} />}>
      <VisorContent />
    </Suspense>
  );
}

export default dynamic(() => Promise.resolve(VisorPage), { ssr: false });
