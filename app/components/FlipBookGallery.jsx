'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Script  from 'next/script';

function FlipBookGallery() {
  /* ───── estado: null = galería, string = PDF embebido ───── */
  const [activePdf, setActivePdf] = useState(null);

  /* Config global ANTES de cargar dflip.min.js */
  const preConfig = `
    window.DFLIP = window.DFLIP || {};
    window.DFLIP.defaults = {
      autoCreate: false,
      skin: 'light',
      maxTextureSize: 4096,
      pdfRenderQuality: 2,
      zoomRatio: 3,
      webgl: true
    };
  `;

  const onDearFlipLoaded = () => {
  };

  /* Scripts (compartidos) */
  const scripts = (
    <>
      <Script id="df-preconfig" strategy="beforeInteractive">
        {preConfig}
      </Script>
      <Script src="/dflip/js/libs/jquery.min.js" strategy="afterInteractive" />
      <Script
        src="/dflip/js/dflip.min.js"
        strategy="afterInteractive"
        onLoad={onDearFlipLoaded}
      />
    </>
  );

  /* ───── 1. VISOR EMBEBIDO ───── */
  if (activePdf) {
    return (
      <>
        {scripts}

        <button
          onClick={() => setActivePdf(null)}
          className="mb-4 rounded bg-slate-800 px-4 py-2 text-white"
        >
          ← Regresar
        </button>

        <div
          className="_df_book"
          source={activePdf}
          height="600"
          backgroundcolor="teal"
          webgl="true"
          style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
        />
      </>
    );
  }

  /* ───── 2. GALERÍA DE MINIATURAS ───── */
  return (
    <>
      {scripts}

      <div className="mt-8 flex flex-wrap justify-center gap-8">
        <div
          className="_df_thumb cursor-pointer"
          onClick={() =>
            setActivePdf('/pdfs/POTENCIALESEVOCADOSmEDXpro.pdf')
          }
          source="/pdfs/POTENCIALESEVOCADOSmEDXpro.pdf"
          thumb="/dflip/images/book-template.png"
        >
          Potenciales Evocados
        </div>

        <div
          className="_df_thumb cursor-pointer"
          onClick={() =>
            setActivePdf('/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf')
          }
          source="/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf"
          thumb="/dflip/images/book-template.png"
        >
          Conducción Nerviosa
        </div>
      </div>
    </>
  );
}

/* sin SSR para que haya window */
export default dynamic(() => Promise.resolve(FlipBookGallery), { ssr: false });
