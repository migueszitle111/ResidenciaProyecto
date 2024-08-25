"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import { useSession } from "next-auth/react";
import Navbar from "../../Navbar";
import { Cloudinary } from "cloudinary-core";

const EditarPerlas = ({ params }) => {
  // Obteniendo la sesión del usuario
  const { data: session } = useSession();
  // Verificando si el usuario es administrador
  const isAdmin = session && session.user && session.user.roles === "admin";

  // Estados para el formulario de edición
  const [modifiedTitle, setModifiedTitle] = useState("");
  const [modifiedDescription, setModifiedDescription] = useState("");
  const [modifiedvideoUrl, setModifiedvideoUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  // Obteniendo el ID de la publicación a editar
  const { id } = params || {};

  // Configuración de Cloudinary
  const cloudinary = new Cloudinary({
    cloud_name: "dgpzqbgz6",
    api_key: "435159313488559",
  });

  // Manejador para el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Efecto para obtener los detalles de la publicación a editar
  useEffect(() => {
    if (id) {
      const fetchTemasDetails = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Error al obtener los detalles del post");
          }

          const data = await res.json();
          const { title, description, videoUrl, imageUrl } = data.post;

          // Actualizando los estados con los detalles de la publicación
          setModifiedTitle(title);
          setModifiedDescription(description);
          setModifiedvideoUrl(videoUrl);
          setNewImage(imageUrl);
          setImagePreview(imageUrl);
        } catch (error) {
          console.error("Error al obtener los detalles del post: ", error);
        }
      };

      fetchTemasDetails();
    }
  }, [id]);

  // Manejador para la modificación de la publicación
  const handleModification = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      if (newImage) {
        // Subiendo la nueva imagen a Cloudinary
        const formData = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", "o4nui5gs");

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${
            cloudinary.config().cloud_name
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url;
      }

      // Enviando la solicitud de modificación de la publicación
      setUpdating(true);
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: modifiedTitle,
          description: modifiedDescription,
          videoUrl: modifiedvideoUrl,
          imageUrl: imageUrl,
        }),
      });

      if (res.ok) {
        console.log("Post modificado exitosamente.");
        router.push("/Perlas");
      } else {
        throw new Error("Fallo al modificar el post.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-[#1c1c1cCC]">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />
      <div className="Conteiner">
        <div className="p-2">
          {isAdmin && (
            <div className="max-w-3xl mx-auto p-4 mb-8">
              <Navbar />
            </div>
          )}
          <div className="w-2/3 lg:w-2/3 md:w-2/3 sm:w-2/3 mx-auto mb-5 ">
            <div className="items-center px-2 py-2 m-3">
              <div className="BannerTitlepageReporte">
                <div>Perlas</div>
              </div>
            </div>
            <form onSubmit={handleModification} className="box2">
              <div className="w-full bg-black flex border-2 border-orange-500/50 rounded-tr-lg rounded-bl-lg">
                <div className="flex flex-col w-full p-2">
                  <div className="w-full">
                    <input
                      type="text"
                      value={modifiedTitle || ""}
                      onChange={(e) => setModifiedTitle(e.target.value)}
                      className="text-[#000000] px-2 py-1 w-full"
                      placeholder="Título"
                    />
                    <textarea
                      className="w-full border p-2 mt-2 text-[#000000]"
                      value={modifiedDescription || ""}
                      onChange={(e) => setModifiedDescription(e.target.value)}
                      placeholder="Descripción"
                    ></textarea>
                    <input
                      type="text"
                      value={modifiedvideoUrl || ""}
                      onChange={(e) => setModifiedvideoUrl(e.target.value)}
                      className="w-full border p-2 mt-2 text-[#000000]"
                      placeholder="URL del video"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border p-2 mt-2 text-[#000000]"
                      placeholder="Seleccionar imagen"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="mt-2 max-w-full rounded-lg"
                      />
                    )}
                    <button
                      type="submit"
                      className="bg-black text-white mt-2 px-6 py-3 rounded-md hover:bg-gray-900"
                      disabled={updating}
                    >
                      {updating ? "Modificando..." : "Modificar Post"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className="bg-grey h-0.5" />
      <Footer />
    </div>
  );
};

export default EditarPerlas;
