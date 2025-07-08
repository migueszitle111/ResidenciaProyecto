'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

  export default function PdfFlipbook({ url, onReady }) {
  const [pages, setPages] = useState([]);
  const [err,   setErr]   = useState(null);

  /* ───────── carga del PDF ───────── */
  useEffect(() => {
    if (!url) return;
    let alive = true;
    setPages([]);                           // fuerza estado “cargando”

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/build/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

        const buffer = await (await fetch(url)).arrayBuffer();
        const pdf    = await pdfjs.getDocument({ data: buffer }).promise;

        const imgs = [];
        for (let p = 1; p <= pdf.numPages; p++) {
          const page   = await pdf.getPage(p);
          const vp     = page.getViewport({ scale: 1.4 });
          const canvas = document.createElement('canvas');
          canvas.width  = vp.width;
          canvas.height = vp.height;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
          imgs.push(canvas.toDataURL('image/png'));
        }
        if (alive) setPages(imgs);
         onReady?.();
      } catch (e) {
        console.error(e);
        if (alive) setErr('No se pudo cargar el PDF');
      }
    })();

    return () => { alive = false; };
  }, [url]);

  /* ───────── estados intermedios ───────── */
  if (err) return <p className="text-red-500">{err}</p>;

  // Overlay de carga (mientras pages está vacío Y hay un URL procesándose)
  if (!pages.length && url) {
    return (
      <>
        <div className="loading-overlay">
          <div className="hourglass">
            <img src="/assets/Extras/I_Time2.svg" alt="Cargando…" />
          </div>
        </div>

        {/*  estilos globales  */}
        <style jsx global>{`
          .loading-overlay{
            position:fixed; inset:0;
            background:rgba(20,20,20,0.5);
            display:flex; justify-content:center; align-items:center;
            z-index:9999;
          }
          .hourglass{
            animation:pulse 1s ease-in-out infinite;
          }
          .hourglass img{
            width:90px; height:90px;
            animation:rotate 4s linear infinite;
          }
          @keyframes pulse{
            0%{transform:scale(1);opacity:.7;}
            50%{transform:scale(1.2);opacity:1;}
            100%{transform:scale(1);opacity:.7;}
          }
          @keyframes rotate{
            0%{transform:rotate(0deg);}
            100%{transform:rotate(360deg);}
          }
        `}</style>
      </>
    );
  }

  // Nada seleccionado aún
  if (!url) return null;

  /* ───────── visor flip-book ───────── */
  return (
    <>
      <div className="w-[90vw] max-h-[85vh] flex items-center justify-center my-8">
        <HTMLFlipBook
          width={550} height={740} size="fixed" showCover
          className="flip-book" mobileScrollSupport
        >
          {pages.map((src, i) => (
            <div key={i}
                 className="flex items-center justify-center"
                 style={{ width:'100%', height:'100%' }}>
              <img src={src} alt={`página ${i+1}`}
                   className="w-full h-full object-cover" />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/*  los mismos estilos para el resto de la página  */}
      <style jsx global>{`
        .loading-overlay{
          position:fixed; inset:0;
          background:rgba(20,20,20,0.5);
          display:flex; justify-content:center; align-items:center;
          z-index:9999;
        }
        .hourglass{
          animation:pulse 1s ease-in-out infinite;
        }
        .hourglass img{
          width:90px; height:90px;
          animation:rotate 4s linear infinite;
        }
        @keyframes pulse{
          0%{transform:scale(1);opacity:.7;}
          50%{transform:scale(1.2);opacity:1;}
          100%{transform:scale(1);opacity:.7;}
        }
        @keyframes rotate{
          0%{transform:rotate(0deg);}
          100%{transform:rotate(360deg);}
        }
      `}</style>
    </>
  );
}
