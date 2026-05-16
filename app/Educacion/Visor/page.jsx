'use client';
import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const BG = '#dfdfdf';

function VisorContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const pdfSrc  = params.get('pdf');

  const [scriptReady, setScriptReady] = useState(false);
  const [blobUrl,     setBlobUrl]     = useState(null);
  const [loadPct,     setLoadPct]     = useState(0);
  const [zoomLabel,   setZoomLabel]   = useState(null);
  const zoomTimer  = useRef(null);
  const lastScale  = useRef(null);

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

  /* Descargar el PDF COMPLETO antes de pasárselo a dflip */
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
      } catch {
        if (!cancelled) setBlobUrl(pdfSrc);
      }
    })();

    return () => { cancelled = true; };
  }, [pdfSrc]);

  /* Inicializar dflip + watcher de zoom */
  useEffect(() => {
    if (!blobUrl || !scriptReady) return;

    /* DPI por nivel de zoom:
       100% → minDimension=1240 maxDimension=1240  (~106 DPI, legible en página completa)
       150% → minDimension=2480 maxDimension=2480  (~212 DPI, texto claro)
       225% → minDimension=4961 maxDimension=4961  (~420 DPI, máxima nitidez)           */
    const MAX_ZOOM = 2.25;
    const LEVELS = [
      { maxScale: 1.1,      min: 1400, max: 1400, q: 0.55 },
      { maxScale: 1.7,      min: 2200, max: 2200, q: 0.70 },
      { maxScale: Infinity, min: 4200, max: 4200, q: 0.85 },
    ];

    const showZoom = (scale) => {
      const pct = Math.round(scale * 100);
      setZoomLabel(`${pct}%`);
      clearTimeout(zoomTimer.current);
      zoomTimer.current = setTimeout(() => setZoomLabel(null), 1500);
    };

    const applyQuality = (cp, scale) => {
      const lvl = LEVELS.find(l => scale <= l.maxScale);
      if (!lvl) return;
      if (cp.minDimension === lvl.min) return;
      cp.minDimension     = lvl.min;
      cp.maxDimension     = lvl.max;
      cp.pdfRenderQuality = lvl.q;
      cp.cache            = [];
    };

    const id = setInterval(() => {
      if (window.jQuery && typeof window.jQuery.fn?.flipBook === 'function') {
        clearInterval(id);
        const el = document.getElementById('df-viewer');
        if (!el) return;

        const $ = window.jQuery;
        const book = $(el).flipBook(blobUrl, {
          pdfRenderQuality : 0.55,
          maxTextureSize   : 1400,
          minTextureSize   : 1400,
          pixelRatio       : 1,
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

        /* Parchear book.resize para que MAX_ZOOM se restaure después de
           cada recalculo interno — dflip sobreescribe maxZoom en cada resize */
        const origResize = book.resize.bind(book);
        book.resize = function () {
          origResize();
          const cp = book.contentProvider;
          if (cp) cp.maxZoom = MAX_ZOOM;
        };

        /* Esperar a que dflip cree los botones de zoom en el DOM */
        const uiWaitId = setInterval(() => {
          const zoomInBtn  = el.querySelector('[class*="zoomin"]');
          const zoomOutBtn = el.querySelector('[class*="zoomout"]');
          if (!zoomInBtn || !zoomOutBtn) return;
          clearInterval(uiWaitId);

          /* Interceptar clicks de zoom ANTES de que dflip procese el evento.
             En el handler calculamos el scale futuro y aplicamos la calidad
             correspondiente — así dflip renderiza ya con la textura correcta. */
          const onZoomClick = (e, delta) => {
            const cp = book?.contentProvider;
            if (!cp) return;
            cp.maxZoom = MAX_ZOOM;
            const current = cp.zoomScale ?? 1;
            /* Bloquear zoomIn si ya estamos en el máximo */
            if (delta > 0 && current >= MAX_ZOOM - 0.01) {
              e.stopImmediatePropagation();
              e.preventDefault();
              return;
            }
            const next = delta > 0
              ? Math.min(current * 1.5, MAX_ZOOM)
              : Math.max(current / 1.5, 1);
            applyQuality(cp, next);
            showZoom(next);
            lastScale.current = next;
          };

          zoomInBtn .addEventListener('click', (e) => onZoomClick(e, +1), true);
          zoomOutBtn.addEventListener('click', (e) => onZoomClick(e, -1), true);

          el._zoomInBtn  = zoomInBtn;
          el._zoomOutBtn = zoomOutBtn;

          /* Watcher liviano: solo fija maxZoom y actualiza indicador si
             el zoom cambia por rueda de ratón o pellizco táctil */
          const watchId = setInterval(() => {
            const cp = book?.contentProvider;
            if (!cp) return;
            cp.maxZoom = MAX_ZOOM;
            const scale = cp.zoomScale ?? 1;
            if (scale !== lastScale.current) {
              lastScale.current = scale;
              showZoom(scale);
              applyQuality(cp, scale);
              cp.review('wheel-quality');
            }
          }, 100);

          el._zoomWatchId = watchId;
        }, 100);

        el._uiWaitId = uiWaitId;
      }
    }, 100);

    return () => {
      clearInterval(id);
      const el = document.getElementById('df-viewer');
      if (el?._uiWaitId)   clearInterval(el._uiWaitId);
      if (el?._zoomWatchId) clearInterval(el._zoomWatchId);
      clearTimeout(zoomTimer.current);
    };
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
          pdfRenderQuality : 0.55,
          maxTextureSize   : 1400,
          minTextureSize   : 1400,
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

      {/* Indicador flotante de zoom */}
      {zoomLabel && (
        <div style={{
          position      : 'fixed',
          bottom        : 72,
          left          : '50%',
          transform     : 'translateX(-50%)',
          zIndex        : 9999,
          background    : 'rgba(0,0,0,0.65)',
          color         : '#fff',
          fontSize      : 13,
          fontWeight    : 600,
          letterSpacing : '0.04em',
          padding       : '5px 14px',
          borderRadius  : 20,
          backdropFilter: 'blur(6px)',
          pointerEvents : 'none',
          transition    : 'opacity 0.3s',
        }}>
          {zoomLabel}
        </div>
      )}

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
