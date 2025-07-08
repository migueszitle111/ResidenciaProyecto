'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Overhead       from '../components/Overhead';
import OverheadMenu   from '../components/OverheadMenu';
import SubMenu        from '../components/Submenu';
import Footer         from '../components/Footer';
import PdfFlipbook    from '../components/PdfFlipbook';

import PdfMenu        from './PdfMenu';          // ⬅️  nuevo
import './Style.css';

export default function Educacion() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.roles === 'admin';

  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />

      <SubMenu />

      {/* ---- Contenido principal ---- */}
      <section className="items-center px-5 xl:px-24 lg:px-5 py-5">
        <h1 className="BannerTitlepage">Educación</h1>

        {/* Menú con estilo SubMenuE */}
        <PdfMenu onSelect={setPdfUrl} />
      </section>

      <hr className="bg-white h-0.5" />
      <Footer />

      {/* ---- Overlay flip-book ---- */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-10">
          <div className="relative">
            <button
              onClick={() => setPdfUrl(null)}
              className="absolute -top-1 -right-1 bg-white rounded-full px-2 shadow"
              aria-label="Cerrar visor"
            >
              ✕
            </button>

            <PdfFlipbook url={pdfUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
