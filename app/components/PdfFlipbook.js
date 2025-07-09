'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

export default function PdfFlipbook({ url, onClose }) {
  const [pages, setPages] = useState([]);
  const [err,   setErr]   = useState(null);
  const [zoom,  setZoom]  = useState(1);
  const [pos,   setPos]   = useState({ x: 0, y: 0 });

  const HiResFactor  = 5;
  const LogicalScale = 1.0;

  /* Carga y render en alta resolución */
  useEffect(() => {
    if (!url) return;
    let alive = true;
    setPages([]); setErr(null);

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/build/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
        const data = await fetch(url).then(r => r.arrayBuffer());
        const pdf  = await pdfjs.getDocument({ data }).promise;
        const imgs = [];

        for (let p = 1; p <= pdf.numPages; p++) {
          const page = await pdf.getPage(p);
          const vp   = page.getViewport({ scale: LogicalScale * HiResFactor });
          const canvas = document.createElement('canvas');
          canvas.width  = vp.width;
          canvas.height = vp.height;
          canvas.style.width  = `${vp.width / HiResFactor}px`;
          canvas.style.height = `${vp.height / HiResFactor}px`;
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: vp }).promise;
          imgs.push(canvas.toDataURL('image/png'));
        }
        if (alive) setPages(imgs);
      } catch (e) {
        console.error(e);
        if (alive) setErr('No se pudo cargar el PDF');
      }
    })();

    return () => { alive = false; };
  }, [url]);

  if (err) return <p className="text-red-500">{err}</p>;

  /* Overlay de carga */
  if (!pages.length && url) {
    return (
      <>
        <div className="loading-overlay">
          <div className="hourglass">
            <img src="/assets/Extras/I_Time2.svg" alt="Cargando…" />
          </div>
        </div>
        <style jsx global>{`
          .loading-overlay{
            position:fixed; inset:0;
            background:rgba(20,20,20,0.5);
            display:flex; justify-content:center; align-items:center;
            z-index:9999;
          }
          .pdf-page img {
  image-rendering: pixelated;
  /* Para compatibilidad extra:
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-pixelated;
  */
}
          .hourglass{ animation:pulse 1s infinite ease-in-out; }
          .hourglass img{
            width:90px; height:90px;
            animation:rotate 4s linear infinite;
          }
          @keyframes pulse {0%{transform:scale(1);opacity:.7;}50%{transform:scale(1.2);opacity:1;}100%{transform:scale(1);opacity:.7;}}
          @keyframes rotate{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}
          /* Tu CSS de crisp-edges: */
          .flip-book img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            image-rendering: pixelated;
          }
        `}</style>
      </>
    );
  }
  if (!url) return null;

  /* Funciones de paneo */
  const panStep = 50;
  const panLeft   = () => setPos(p => ({ ...p, x: p.x + panStep }));
  const panRight  = () => setPos(p => ({ ...p, x: p.x - panStep }));
  const panUp     = () => setPos(p => ({ ...p, y: p.y + panStep }));
  const panDown   = () => setPos(p => ({ ...p, y: p.y - panStep }));

  return (
    <div className="relative w-full h-full flex items-center justify-center my-8">
      {/* Botón cerrar (flotante) */}
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-50 bg-white rounded-full px-2 py-1 shadow`}
        aria-label="Cerrar visor"
      >✕</button>

      {/* Contenedor centrado y escalado, con translate */}
      <div
        className="flex items-center justify-center"
        style={{
          width:  `90vw`,
          height: `85vh`,
          transform: `translate(${pos.x}px,${pos.y}px) scale(${zoom})`,
          transformOrigin: 'center center'
        }}
      >
        <HTMLFlipBook
          width={550 * LogicalScale}
          height={740 * LogicalScale}
          size="fixed"
          showCover
          className="shadow-xl"
          mobileScrollSupport
        >
          {pages.map((src,i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white"
              style={{ width:'100%', height:'100%' }}
            >
              <img
       src={src}
       alt={`página ${i+1}`}
       className="w-full h-full object-contain pdf-page"
     />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Botones de zoom (flotantes abajo-derecha) */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-50">
        <button
          onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
          className="bg-white text-black px-3 py-1 rounded shadow"
        >－</button>
        <span className="text-white select-none">{(zoom*100).toFixed(0)}%</span>
        <button
          onClick={() => setZoom(z => Math.min(2, z + 0.1))}
          className="bg-white text-black px-3 py-1 rounded shadow"
        >＋</button>
      </div>

      {/* Botones de paneo (flotantes abajo-izquierda) */}
      <div className="absolute bottom-4 left-4 flex flex-col space-y-2 z-50">
        <button
          onClick={panUp}
          className="bg-white text-black px-3 py-1 rounded shadow"
        >↑</button>
        <div className="flex space-x-2">
          <button
            onClick={panLeft}
            className="bg-white text-black px-3 py-1 rounded shadow"
          >←</button>
          <button
            onClick={panRight}
            className="bg-white text-black px-3 py-1 rounded shadow"
          >→</button>
        </div>
        <button
          onClick={panDown}
          className="bg-white text-black px-3 py-1 rounded shadow"
        >↓</button>
      </div>
    </div>
  );
}
