"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import { getPdfPath } from "../../utils/cirugiaUtils";

const TIPO_LABEL = {
  protocolo:     "Protocolo",
  procedimiento: "Procedimiento",
  modalidades:   "Modalidades Neurofisiológicas",
};

function proxyUrl(path) {
  return `/api/monitoreopdf?path=${encodeURIComponent(path)}`;
}

function PdfFrame({ src, title }) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-orange-500/20" style={{ height: "85vh" }}>
      <iframe
        src={src}
        className="w-full h-full"
        title={title}
      />
    </div>
  );
}

function VisorContent() {
  const { nombre }    = useParams();
  const searchParams  = useSearchParams();
  const router        = useRouter();

  const nombreCirugia = decodeURIComponent(nombre);
  const tipo          = searchParams.get("tipo") || "protocolo";
  const pdfResult     = getPdfPath(nombreCirugia, tipo);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Navegación */}
      <button
        onClick={() => router.back()}
        style={{ display:'flex', alignItems:'center', justifyContent:'center', width:38, height:38, borderRadius:'50%', background:'#1C1C1C', border:'2px solid #c44900', cursor:'pointer', padding:8, transition:'background 0.15s', marginBottom:16 }}
        onMouseEnter={e => { e.currentTarget.style.background = '#c44900'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1C1C1C'; }}
      >
        <img src="/assets/IconSVG/I_Crop.svg" alt="Regresar" style={{ width:18, height:18, filter:'invert(1)' }} />
      </button>

      <h1 className="text-xl font-bold text-white mb-1 leading-tight">{nombreCirugia}</h1>
      <p className="text-orange-400 text-sm mb-6">{TIPO_LABEL[tipo]}</p>

      {/* Visor */}
      {!pdfResult ? (
        <div className="bg-[#1a1a1a] rounded-xl p-10 text-center text-slate-400">
          PDF no disponible para esta cirugía
        </div>
      ) : pdfResult.combined ? (
        // Cirugías "Otros" → modalidades muestra CERVICAL + LUMBAR
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-white text-sm font-semibold mb-2">Modalidades — Cervical</p>
            <PdfFrame src={proxyUrl(pdfResult.cervical)} title="Modalidades Cervical" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-2">Modalidades — Lumbar</p>
            <PdfFrame src={proxyUrl(pdfResult.lumbar)} title="Modalidades Lumbar" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <PdfFrame src={proxyUrl(pdfResult)} title={`${tipo} - ${nombreCirugia}`} />
          <a
            href={proxyUrl(pdfResult)}
            target="_blank"
            rel="noopener noreferrer"
            className="self-end text-xs text-orange-400 hover:underline"
          >
            Abrir en nueva pestaña ↗
          </a>
        </div>
      )}
    </div>
  );
}

export default function VisorPdf() {
  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />
      <Suspense fallback={
        <div className="flex justify-center items-center py-20 text-white text-sm">
          Cargando PDF...
        </div>
      }>
        <VisorContent />
      </Suspense>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
