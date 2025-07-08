'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

export default function PdfFlipbook({ url }) {
  const [pages, setPages] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!url) return;
    let alive = true;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/build/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

        const buffer = await (await fetch(url)).arrayBuffer();
        const pdf    = await pdfjs.getDocument({ data: buffer }).promise;

        const imgs = [];
        for (let n = 1; n <= pdf.numPages; n++) {
          const page   = await pdf.getPage(n);
          const vp     = page.getViewport({ scale: 1.4 }); // más zoom
          const canvas = document.createElement('canvas');
          canvas.width  = vp.width;
          canvas.height = vp.height;
          await page.render({
            canvasContext: canvas.getContext('2d'),
            viewport: vp,
          }).promise;
          imgs.push(canvas.toDataURL('image/png'));   // 🔑 convertimos a <img>
        }
        if (alive) setPages(imgs);
      } catch (e) {
        console.error(e);
        if (alive) setErr('No se pudo cargar el PDF');
      }
    })();

    return () => { alive = false; };
  }, [url]);

  if (err)           return <p className="text-red-500">{err}</p>;
  if (!pages.length) return <p className="text-white">Cargando…</p>;

  /* ------------ visor ------------- */
  return (
  <div className="
   w-[90vw]                 /* mismo ancho máximo */
   max-h-[85vh]             /* deja 15 % libre arriba/abajo            */
   flex items-center justify-center
   my-8                     /* margen externo (8 × 4 = 32 px)          */
              */
 ">
        <HTMLFlipBook
        width={550}     // ← ancho de UNA página
        height={740}    // ← alto de UNA página
        size="fixed"    // ← NO se escalará
        showCover
        className="flip-book"
        mobileScrollSupport
      >
        {pages.map((src, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
   style={{ width: '100%', height: '100%' }}
          >
            <img src={src} alt={`página ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
