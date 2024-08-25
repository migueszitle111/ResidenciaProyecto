"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import BannerPublicitarios from "../components/BannerPublicitario";
import BP from "./BP";
import FooterComponents from "../components/FooterComponents";

export default function Patrocinio() {
  return (
    <div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white " />
      <SubMenu />
      <div className="mr-10 ml-10">
        <div className="BannerTitlepage ">
          <div>Patrocinio</div>
        </div>
      </div>

      <div className="bg-[#000000CC]  items-center">
        <BP />
        {/* Funcion para mandar un mensaje al correo*/}
        <p className="text-white mt-4 pl-6">
          Para patrocinio, contáctanos en{" "}
          <a href="mailto:residencia@medxproapp.com">
            residencia@medxproapp.com
          </a>
        </p>
        <BannerPublicitarios />
      </div>
      <FooterComponents />
    </div>
  );
}
