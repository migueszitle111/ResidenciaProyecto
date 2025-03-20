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
    <div className="w-2/3 lg:w-2/3 md:w-2/3 sm:w-2/3 mb-5 md:p-10 flex flex-col mx-auto m-5 ">
      {/* Renderiza cada publicación del blog */}
      {Array.isArray(temarios) &&
        temarios.map((t) => (
          <div
            key={t._id}
            className="w-full bg-black flex rounded-tr-3xl rounded-bl-3xl mb-5"
          >
            
            <div className="w-full bg-black flex rounded-tr-3xl rounded-bl-3xl mb-5 relative">
              <div className="flex flex-col p-2">
                {/*descripción de la publicación */}
                <a
                  href={t.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 underline"
                >
                  <div>
                    {t.videoUrl && (
                      <div className="mt-2 relative">
                        <button
                          className="absolute bg-orange-500 px-12 py-10 rounded rounded-tr-3xl rounded-bl-3xl "
                          style={{
                            backgroundImage: 'url("/assets/SubmenuSvg/Videos.svg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            top: 0, // Posiciona el botón en la parte inferior
                            left: 0,   // Posiciona el botón en la parte izquierda
                          }}
                        >
                        </button>
                      </div>
                    )}
                    {/* imagen de la publicación si está disponible */}
                    {t.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={t.imageUrl}
                          width={1000}
                          height={100}
                          alt="Imagen"
                          style={{ filter: 'grayscale(100%)' }}
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
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blog;
