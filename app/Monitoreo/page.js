"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import MenuMonitoreo from "./MenuMonitoreo";
import Footer from "../components/Footer";

export default function Monitoreo() {
  return (
    <div className="Conteiner bg-[#1c1c1cCC]">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="Conteiner">
        {/*Menú Monitoreo */}
        <div className="p-2">
          <MenuMonitoreo />
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
