import React, { useState, useEffect } from "react";
import Image from "next/image";
import RemoveBoton from "./RemoveBoton";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";

const Blog = () => {
  // Obtiene la sesión del usuario
  const { data: session } = useSession();

  // Verifica si el usuario es un administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  // Estado local para almacenar las publicaciones del blog
  const [temarios, setTemarios] = useState([]);

  // Efecto para cargar las publicaciones del blog al cargar el componente
  useEffect(() => {
    const fetchTemarios = async () => {
      try {
        // Realiza una solicitud para obtener las publicaciones del blog desde la API
        const res = await fetch("http://localhost:3000/api/posts", {
          cache: "no-store",
        });

        // Verifica si la solicitud fue exitosa
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        // Obtiene los datos de la respuesta y los establece en el estado local
        const data = await res.json();
        setTemarios(data.posts || []);
      } catch (error) {
        console.error("Error loading posts: ", error);
      }
    };

    // Llama a la función para cargar las publicaciones del blog
    fetchTemarios();
  }, []); // Se ejecuta solo una vez al cargar el componente

  return (
    <div className="w-2/3 lg:w-2/3 md:w-2/3 sm:w-2/3 mx-auto mb-5">
      {/* Renderiza cada publicación del blog */}
      {Array.isArray(temarios) &&
        temarios.map((t) => (
          <div
            key={t._id}
            className="w-full bg-black flex border-2 border-orange-500/50 rounded-tr-lg rounded-bl-lg mb-5"
          >
            <div className="ml-2">
              {/* logo de la publicación */}
              <Image
                src="/L_B_Blanco.svg"
                width={70}
                height={70}
                alt="Logo"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col w-5/6 p-2">
              <div className="w-full">
                {/*título de la publicación */}
                <h1 className="text-[#FFFFFF]">mEDXpro</h1>
              </div>
              {/* fecha de creación de la publicación */}
              <p className="text-gray-500">
                Fecha: {new Date(t.createdAt).toLocaleDateString()}
              </p>
              {/*título de la publicación */}
              <h3 className="text-white">{t.title}</h3>
              {/*descripción de la publicación */}
              <hr className="bg-gray-500 h-0.5 my-4" />
              <div>
                <p className="text-gray-400">{t.description}</p>
                {/*enlace para ver el video de la publicación si está disponible */}
                {t.videoUrl && (
                  <div className="mt-2">
                    <a
                      href={t.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 underline"
                    >
                      Ver video
                    </a>
                  </div>
                )}
                {/* imagen de la publicación si está disponible */}
                {t.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={t.imageUrl}
                      width={200}
                      height={200}
                      alt="Imagen"
                    />
                  </div>
                )}
                {/*acciones de administrador si el usuario es un administrador */}
                {isAdmin && (
                  <div className="flex gap-2 mt-7">
                    {/*botón para eliminar la publicación */}
                    <RemoveBoton id={t._id} className="text-white" size={24} />
                    {/*enlace para editar la publicación */}
                    <Link href={`/Perlas/EditarPerlas/${t._id}`}>
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
    </div>
  );
};

export default Blog;
