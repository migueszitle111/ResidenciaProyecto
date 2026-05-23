"use client";
import { useParams, useRouter } from "next/navigation";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";

const opciones = [
  {
    numero: "1",
    label: "Protocolo",
    descripcion: "Consulta el protocolo de esta cirugía",
    tipo: "protocolo",
    color: "bg-[#1a1a1a] border border-orange-500/40",
  },
  {
    numero: "2",
    label: "Procedimiento",
    descripcion: "Revisa el procedimiento paso a paso",
    tipo: "procedimiento",
    color: "bg-[#1a1a1a] border border-orange-500/40",
  },
  {
    numero: "3",
    label: "Modalidades Neurofisiológicas",
    descripcion: "Modalidades NF utilizadas en esta cirugía",
    tipo: "modalidades",
    color: "bg-[#1a1a1a] border border-orange-500/40",
  },
  {
    numero: "4",
    label: "Reporte",
    descripcion: "Generar reporte de monitoreo",
    tipo: "reporte",
    color: "bg-orange-500",
  },
];

export default function CirugiaDetalle() {
  const { nombre } = useParams();
  const router = useRouter();
  const nombreCirugia = decodeURIComponent(nombre);

  const handleOpcion = (tipo) => {
    const encoded = encodeURIComponent(nombreCirugia);
    if (tipo === "reporte") {
      router.push(`/Monitoreo/Reporte/${encoded}`);
    } else {
      router.push(`/Monitoreo/Visor/${encoded}?tipo=${tipo}`);
    }
  };

  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Título */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', width:38, height:38, borderRadius:'50%', background:'#1C1C1C', border:'2px solid #c44900', cursor:'pointer', padding:8, transition:'background 0.15s', marginBottom:16 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c44900'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1C1C1C'; }}
          >
            <img src="/assets/IconSVG/I_Crop.svg" alt="Regresar" style={{ width:18, height:18, filter:'invert(1)' }} />
          </button>
          <h1 className="text-2xl font-bold text-white leading-tight">
            {nombreCirugia}
          </h1>
        </div>

        {/* Opciones */}
        <div className="flex flex-col gap-4">
          {opciones.map((op) => (
            <motion.button
              key={op.tipo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpcion(op.tipo)}
              className={`${op.color} w-full text-left px-6 py-5 rounded-xl flex items-center gap-5 transition-colors`}
            >
              <span className="text-orange-400 text-2xl font-bold w-8 shrink-0">
                {op.numero}
              </span>
              <div>
                <p className="text-white font-semibold text-base">{op.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{op.descripcion}</p>
              </div>
              <svg className="ml-auto text-slate-500" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          ))}
        </div>
      </div>

      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
