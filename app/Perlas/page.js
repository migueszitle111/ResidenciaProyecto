"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import Footer from "../components/Footer";
import BlogList from "./BlogList";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function Perlas() {
  // Obteniendo la sesión del usuario
  const { data: session } = useSession();
  // Verificando si el usuario es administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  // Renderizado de la interfaz de usuario
  return (
    <div className="Conteiner bg-[#1c1c1cCC]">
      {/* Componentes comunes a todas las páginas */}
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="Conteiner">
        <div className="p-2">
          {/*Navbar solo si el usuario es administrador */}
          {isAdmin && (
            <div className="max-w-3xl mx-auto p-4 mb-8">
              <Navbar />
            </div>
          )}

          <div className="items-center px-2 py-2 m-3">
            <div className="BannerTitlepageReporte">
              <div>Perlas</div>
            </div>
          </div>

          {/* lista de publicaciones del blog */}
          <BlogList />
        </div>
      </div>

      <hr className="bg-grey h-0.5" />
      {/* Componente Footer */}
      <Footer />
    </div>
  );
}
