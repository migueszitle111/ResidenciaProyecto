"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import Footer from "../components/Footer";
import "./Style.css";
import Navbar from "../Educacion/Navbar";
import { useSession } from "next-auth/react";
import TemaList from "./TemaList";

const Educacion = () => {
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="">
        <SubMenu />
        {/* */}
        {/*Contenedor de la pagina educacion */}
        <div className=" items-center px-5 xl:px-24 lg:px-5 py-5 ">
          <div className="BannerTitlepage ">
            <div>Educación</div>
          </div>
        </div>

        {/* Contenedor de la página educación */}
        <div className=" flex min-h-screen flex-col items-center p-5">
          {isAdmin && (
            <div className="max-w-3xl mx-auto p-4 mb-8">
              <Navbar />
            </div>
          )}

          {/*Item 1 */}
          <div className=" bg-[#1c1c1ccc] w-full rounded-tr-lg rounded-bl-lg border border-orange-800">
            <div className="Titulo flex items-center justify-center text-white p-1">
              <p>Temario</p>
            </div>
            <TemaList />
          </div>
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
};
export default Educacion;
