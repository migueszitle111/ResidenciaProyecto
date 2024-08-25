"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBoton from "./RemoveBoton";
import { useEffect } from "react";

const TemaList = () => {
  // Obtiene la sesión actual del usuario
  const { data: session } = useSession();
  // Verifica si el usuario es administrador
  const isAdmin = session && session.user && session.user.roles === "admin";
  // Define un estado local para almacenar los temas
  const [temarios, setTemarios] = useState([]);

  // useEffect para realizar la carga de temas al montar el componente
  useEffect(() => {
    // Función asincrónica para obtener los temas
    const fetchTemarios = async () => {
      try {
        // Realiza la solicitud a la API para obtener los temas
        const res = await fetch("http://localhost:3000/api/temarios", {
          cache: "no-store",
        });

        // Verifica si la solicitud fue exitosa
        if (!res.ok) {
          throw new Error("Failed to fetch temarios");
        }

        // Parsea la respuesta a formato JSON
        const data = await res.json();
        // Actualiza el estado local con los temas obtenidos
        setTemarios(data.temarios || []); // Asegúrate de acceder a la propiedad correcta
      } catch (error) {
        // Maneja cualquier error durante la obtención de temas
        console.error("Error loading temarios: ", error);
      }
    };

    // Llama a la función de carga de temas
    fetchTemarios();
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Renderiza la lista de temas

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {Array.isArray(temarios) &&
        temarios.map((t, index) => (
          <div
            key={t._id}
            className="bg-[#000000cc] m-9 rounded-tr-lg rounded-bl-lg"
          >
            <div className="flex flex-col md:flex-row items-center mb-4">
              {/* Imagen */}
              <div className="p-2">
                <img
                  src={t.imageUrl}
                  alt={t.title}
                  width={150}
                  height={150}
                  className="rounded-tr-lg rounded-bl-lg"
                />
              </div>

              {/* Tabla */}
              <div className="border-collapse w-2/3 table-fixed justify-center box2">
                <h3 className="Edutitle px-4 py-2 bg-orange-800 text-white text-center text-lg rounded-tr-lg ">
                  {t.title}
                </h3>
                <p className="px-4 py-2 bg-orange-800 text-white text-justify text-lg rounded-bl-lg Edubody">
                  {t.description}
                </p>
                {isAdmin && (
                  <div className="flex gap-2 mt-7">
                    <RemoveBoton id={t._id} className="text-white" size={24} />
                    <Link href={`/Educacion/EditarTemas/${t._id}`}>
                      <HiPencilAlt
                        className="text-white"
                        size={24}
                        title="Modificar"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default TemaList;
