// Importa la dependencia de cliente para NextAuth
"use client";
// Importa los componentes y estilos necesarios
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import "./Style.css";
import "../globals.css";
import Footer from "../components/Footer";
// Importa el hook useSession de next-auth/react
import { useSession } from "next-auth/react";
import React from "react";
// Importa el componente Sidebar, Image de Next y el hook useState
import Sidebar from "./Sidebar.jsx";
import Image from "next/image";

// Componente funcional para la página de perfil
export default function Perfil() {
  // Obtiene la sesión y el estado de autenticación usando useSession
  const { data: session, status } = useSession();

  return (
    <div className="Conteiner">
      {/* Renderiza los componentes de encabezado */}
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="bg-[#000000CC]">
        {/* Renderiza el menú lateral */}
        <SubMenu />
        <div className="flex min-h-screen flex-col md: flex-row items-center justify-between p-24">
          <div className="BannerTitlepage">
            {/* Título de la página */}
            <div>Perfil</div>
          </div>
          <div className="Profile_Container">
            {/* Renderiza el componente Sidebar */}
            <Sidebar />
            <div className="info_profile">
              {/* Renderiza un mensaje de carga si la sesión está en proceso */}
              {status === "loading" && <p>Cargando...</p>}
              {/* Renderiza la información del perfil si el usuario está autenticado */}
              {status === "authenticated" && session && (
                <figure className="flex items-start sm:items-center">
                  <figcaption>
                    {/* Título del bloque de información del perfil */}
                    <h5 className="font-semibold text-lg">Datos del Perfil</h5>
                    <hr />
                    {/* Renderiza la imagen de perfil*/}
                    <img
                      src={session.user?.imageUrl}
                      alt={session.user?.name}
                      width={70}
                      height={70}
                      className="w-14 h-14 rounded-full"
                    />
                    {/* Bloque de información detallada del perfil */}
                    <p>
                      <b>Nombre:</b>{" "}
                      {<p className="mr-2">{session.user?.name}</p>}
                      <b>Apellidos:</b>{" "}
                      {<p className="mr-2">{session.user?.lastname}</p>}
                      <b>Email:</b>{" "}
                      {<p className="mr-2">{session.user?.email}</p>}
                      <b>Especialidad:</b>{" "}
                      {<p className="mr-2">{session.user?.especialidad}</p>}
                      <b>Cedula:</b>{" "}
                      {<p className="mr-2">{session.user?.cedula}</p>}
                    </p>
                  </figcaption>
                </figure>
              )}
              {/* Renderiza un mensaje si el usuario no está autenticado */}
              {status === "unauthenticated" && <p>No autenticado</p>}
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
