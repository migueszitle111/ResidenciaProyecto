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
import CardsList from "../components/CardsList";

export default function Evento() {
  // Obtiene la sesión actual del usuario
  const { data: session } = useSession();
  // Verifica si el usuario es administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <div className="Conteiner w-full">
      <Overhead />
      <OverheadMenu />
      <div className="Conteiner">
        <CardsList />
      </div>
        
      <Footer />
    </div>
  );
}
