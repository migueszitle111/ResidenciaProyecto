"use client";
import React, { useState } from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FormularioReporte from "./components/FormularioReporte";

const tipos = [
  { label: "Craneal",  href: "/Monitoreo/Tipos/Craneal" },
  { label: "Cervical", href: "/Monitoreo/Tipos/Cervical" },
  { label: "Lumbar",   href: "/Monitoreo/Tipos/Lumbar" },
  { label: "Otros",    href: "/Monitoreo/Tipos/Otros" },
];

export default function Monitoreo() {
  const router = useRouter();
  const [showReporteGeneral, setShowReporteGeneral] = useState(false);

  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-3xl bg-orange-500 rounded-tr-3xl rounded-bl-3xl p-8 md:p-12">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">
                Tipos de Monitoreo
              </h2>
              <hr className="bg-white h-0.5 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {tipos.map(({ label, href }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push(href)}
                    className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-sm transition-colors"
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
              <Image
                src="/L_B_Blanco.svg"
                alt="Monitoreo"
                width={200}
                height={200}
                className="grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón "..." — Reporte de Monitoreo General */}
      <div className="flex justify-end max-w-3xl mx-auto px-4 mb-10">
        <button
          onClick={() => setShowReporteGeneral(true)}
          className="bg-black text-white px-4 py-3 rounded-lg border border-white/20 hover:border-orange-500/60 hover:bg-[#111] transition-colors text-sm font-semibold tracking-widest"
        >
          •••
        </button>
      </div>

      <hr className="bg-white h-0.5" />
      <Footer />

      {/* Modal — Reporte de Monitoreo General */}
      {showReporteGeneral && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-orange-400 font-bold text-lg">Reporte de Monitoreo General</h2>
              <button
                onClick={() => setShowReporteGeneral(false)}
                className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 text-white flex items-center justify-center hover:bg-[#2a2a2a] transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-5 py-4">
              <FormularioReporte nombreCirugia="REPORTE_GENERICO" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
