"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import Footer from "../components/Footer";
import MenuUltrasonido from "./MenuUltrasonido";

export default function Ultrasonido() {
  return (
    <div className="Conteiner bg-[#1c1c1cCC]">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="Conteiner">
        {/*Menú Ultrasonido */}
        <div className="p-2">
          <MenuUltrasonido />
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
