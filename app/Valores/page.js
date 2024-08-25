"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import MenuValores from "./MenuValores";
import Footer from "../components/Footer";

export default function Valores() {
  return (
    <div className="Conteiner bg-[#000000cc]">
      <Overhead />
        <OverheadMenu />
          <hr className="bg-grey h-0.5" />
          
        <SubMenu />
        <hr className="bg-grey h-0.5" />

      <div className="Conteiner">
        {/*Menú Valores */}
        <div className="p-5">
          <MenuValores />
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
