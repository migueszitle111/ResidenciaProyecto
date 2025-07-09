'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Overhead       from '../components/Overhead';
import OverheadMenu   from '../components/OverheadMenu';
import SubMenu        from '../components/Submenu';
import Footer         from '../components/Footer';
import PdfFlipbook    from '../components/PdfFlipbook';

import PdfMenu        from './PdfMenu';
import './Style.css';

export default function Educacion() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.roles === 'admin';

  // Antes: useState<string|null>(null)
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
        <PdfMenu onSelect={(url) => setPdfUrl(url)} />
      </section>

      <hr className="bg-white h-0.5" />
      <Footer />

      {/* ---- Overlay flip-book ---- */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-10">
          <div className="relative">
            <PdfFlipbook
              url={pdfUrl}
              onClose={() => setPdfUrl(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
