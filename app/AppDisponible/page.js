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
      <SubMenu />

      {/* Sección donde quieres que la imagen ocupe todo su componente */}
      <div className="w-full h-[500px]"> {/* Altura ajustable */}
        <div className="relative w-full h-full">
          <Image
            src="/assets/LandingPage/Page/LP-15.png"
            alt="Logo de la empresa"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
