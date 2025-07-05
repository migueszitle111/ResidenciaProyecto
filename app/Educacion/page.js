'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Overhead from '../components/Overhead';
import OverheadMenu from '../components/OverheadMenu';
import SubMenu from '../components/Submenu';
import Footer from '../components/Footer';
import TemaList from './TemaList';
import PdfFlipbook from '../components/PdfFlipbook';

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

        {/* Lista de documentos */}
        <TemaList onSelect={setPdfUrl} />
      </section>

      <hr className="bg-white h-0.5" />
      <Footer />

      {/* ---- Overlay flip-book ---- */}
     {pdfUrl && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
    <div className="relative">
      <button
        onClick={() => setPdfUrl(null)}
        className="absolute -top-4 -right-4 bg-white rounded-full px-2 shadow"
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
