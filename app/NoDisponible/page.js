"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import BannerPublicitarios from "../components/BannerPublicitario";
import Image from "next/image";
import Footer from "../components/Footer";

export default function NoDisplonible() {
  return (
    <div className="Conteiner bg-[#000000cc]">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" /> 
      <div>
        <SubMenu />
          <div className="flex min-h-screen flex-col items-center p-10">
            <div className="BannerTitlepage">
              <div>Pagina no disponible</div>
            </div>
          <h1 className="pt-16 pb-10 text-white text-5xl">Proximamente</h1>
          <Image
            src="/L_B_Blanco.svg"
            alt="Logo de la empresa"
            width={120}
            height={120}
            className="w-52 h-52"
          />
          <p className="pt-16 text-white text-center text-2xl italic">
            Esta sección estará disponible en futuras actualizaciones de la
            aplicación. Estamos trabajando para brindarte la mejor experiencia
            posible.
          </p>
        </div>
        <BannerPublicitarios />
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
