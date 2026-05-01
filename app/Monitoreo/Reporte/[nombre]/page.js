"use client";
import { useParams, useRouter } from "next/navigation";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import FormularioReporte from "../../components/FormularioReporte";

export default function ReportePage() {
  const { nombre } = useParams();
  const router = useRouter();
  const nombreCirugia = decodeURIComponent(nombre);

  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Regresar
        </button>
        <FormularioReporte nombreCirugia={nombreCirugia} />
      </div>

      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
