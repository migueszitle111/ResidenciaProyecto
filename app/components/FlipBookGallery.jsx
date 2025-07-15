'use client';
import { useState,useEffect } from 'react';
import dynamic from 'next/dynamic';
import Script  from 'next/script';
import { useRouter } from 'next/navigation';   // 👈 nuevo


function FlipBookGallery() {
  /* ───── estado: null = galería, string = PDF embebido ───── */
  const [activePdf, setActivePdf] = useState(null);
  const router = useRouter();                  // 👈 instancia del router


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

   const scripts = (
    <>
      <Script id="df-preconfig" strategy="beforeInteractive">
        {preConfig}
      </Script>
      <Script src="/dflip/js/libs/jquery.min.js" strategy="afterInteractive" />
      <Script src="/dflip/js/dflip.min.js" strategy="afterInteractive" />
    </>
  );

  /* ─── Historial: “Atrás/Adelante” cierra el visor ─── */
  useEffect(() => {
    if (activePdf) {
      const urlWithFlag = `${window.location.pathname}?pdf=${encodeURIComponent(
        activePdf,
      )}`;
      window.history.pushState({ pdf: activePdf }, '', urlWithFlag);
    }

    const onPop = () => {
      if (activePdf) {
        setActivePdf(null);      // desmonta visor
        window.location.reload(); // recarga limpia
        // o router.refresh();   // si prefieres un soft‑reload
      }
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [activePdf]);

  /* ─── Render ─── */
  if (activePdf) {
    return (
      <>
        {scripts}
        {/* sin botón: usa la barra del navegador */}
        <div
          id="df-viewer"
          className="_df_book"
          source={activePdf}
          height="600"
          style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}
        />
      </>
    );
  }

  /* Galería de miniaturas */
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
          Potenciales Evocados
        </div>

        <div
          className="_df_thumb cursor-pointer"
          onClick={() =>
            setActivePdf('/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf')
          }
          source="/pdfs/ESTUDIOSDECONDUCCIONNERVIOSAmEDXpro.pdf"
          thumb="/dflip/images/book-template.png"
        >
          Conducción Nerviosa
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(FlipBookGallery), { ssr: false });