"use client";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import "./Style.css";
import Footer from "../components/Footer";
import PdfUploader from "./PdfUploader";
import CongresoNavbar from "./CongresoNavbar";
import CursoNavbar from "./CursoNavbar";
import CursoList from "./CursoList";
import CongresoList from "./CongresoList";
import DiplomadosNavbar from "./DiplomaNavbar";
import DiplomadoList from "./DiplomadoList";
import { useSession } from "next-auth/react";

export default function Evento() {
  // Obtiene la sesión actual del usuario
  const { data: session } = useSession();
  // Verifica si el usuario es administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <div className="Conteiner w-full">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="bg-[#000000CC]">
        <SubMenu />
        {/*Contenedor de la pagina evento */}
        <div className=" items-center px-5 xl:px-24 lg:px-5 py-5 ">
          <div className="BannerTitlepage ">
            <div>Evento</div>
          </div>
        </div>

        {/*Contenedor de la pagina eventos */}
        <div className="  flex min-h-screen flex-col items-center">
          {/*Contenedor de congresos */}
          <div className="Titutlo text-white  p-1 mt-9">
            <h1>Congresos</h1> <hr className="bg-[#c44900] h-1 m-1" />
          </div>
          {isAdmin && <CongresoNavbar />}
          <div className="mb-8 ">
            {/*Contenedor de cartas */}
            <div className="flex flex-wrap justify-center items-center mb-8">
              {/*Carta 1 hacer que sea editable con form*/}
              <CongresoList />
            </div>
          </div>

          {/*Contenedor de cursos */}
          <div className="Titutlo text-white  p-1 ">
            <h1>Cursos</h1> <hr className="bg-[#c44900] h-1 m-1" />
          </div>
          {isAdmin && <CursoNavbar />}
          <div className="mb-8">
            {/*Contenedor de cartas */}
            <div className="flex flex-wrap justify-center items-center mb-10">
              {/*Carta 1 hacer que sea editable con form*/}
              <CursoList />
            </div>
          </div>

          {/*Contenedor de temario */}

          {/*Titulo de los temario */}
          <div className="Titutlo text-white  p-1 ">
            <h1>Temario</h1> <hr className="bg-[#c44900] h-1 m-1" />
          </div>
          {isAdmin && <DiplomadosNavbar />}
          {/*Contenedor de los diplomas pdf y descarga */}
          <div className="contDiplomas">
            <DiplomadoList />
          </div>
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
