"use client";
// Evento/AgregarDiplomados/page.jsx
import React, { useState } from "react";
import Overhead from "../../components/Overhead";
import OverheadMenu from "../../components/OverheadMenu";
import SubMenu from "../../components/Submenu";
import DiplomadosNavbar from "../DiplomaNavbar";
import PDFLoader from "../PdfUploader";
import { useRouter } from "next/navigation";

const AgregarDiplomadosPage = () => {
  const router = useRouter();

  const handlePdfUpload = async ({ title, pdfContent }) => {
    try {
      const res = await fetch("http://localhost:3000/api/diplomados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, pdfContent }),
      });

      if (res.status === 201) {
        // Otras acciones después de subir el PDF, como redireccionar
        router.push("/Evento");
      } else {
        console.error("Error:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores, si es necesario
    }
  };

  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="bg-[#000000CC]">
        <SubMenu />
        <div className="ContEventos flex min-h-screen flex-col items-center p-10">
          <div className="BannerTitlepage">
            <div>Evento</div>
          </div>
          <div className="Conteiner text-white p-1 mt-9">
            <h1>Diplomados</h1>
            <hr className="bg-[#c44900] h-1 m-1" />
          </div>
          <DiplomadosNavbar />
          <PDFLoader onSubmit={handlePdfUpload} />
          {/* Otras secciones de la página */}
        </div>
      </div>
    </div>
  );
};

export default AgregarDiplomadosPage;
