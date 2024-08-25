"use client";
import { useSession } from "next-auth/react";
import RemoveDiplomado from "./RemoveDiplomado";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const DiplomadoList = () => {
  const [diplomados, setDiplomados] = useState([]);
  // Obtiene la sesión actual del usuario
  const { data: session } = useSession();
  // Verifica si el usuario es administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  useEffect(() => {
    const fetchDiplomados = async () => {
      try {
        const response = await axios.get("/api/diplomados");
        setDiplomados(response.data.diplomados || []);
      } catch (error) {
        console.error("Error fetching diplomados:", error);
        // Puedes manejar el error según tus necesidades
      }
    };

    fetchDiplomados();
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap justify-center">
      {/* PDF */}
      {diplomados.map((diplomado) => (
        <div
          key={diplomado._id}
          className="flex flex-col md:flex-row items-start md:items-center mb-4 mx-auto"
        >
          {/* PDF */}
          <div className="mr-4 flex-shrink-0">
            <embed
              src={diplomado.pdfContent}
              type="application/pdf"
              width="500px" // Ajusta el ancho según tus necesidades
              height="600px" // Ajusta la altura según tus necesidades
            />
          </div>
          {/* Descripcion */}

          {isAdmin && (
            <div className="flex  mt-2 md:mt-0">
              <RemoveDiplomado
                id={diplomado._id}
                className="text-white"
                size={24}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiplomadoList;
