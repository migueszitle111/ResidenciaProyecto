"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import "../../Style.css";
import Navbar from "../../Navbar";
import { useSession } from "next-auth/react";
import { Cloudinary } from "cloudinary-core";

const EditarTemas = ({ params }) => {
  // Desestructurar los datos de sesión y verificar si el usuario es un administrador
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";

  // Extraer el ID del tema de los parámetros (asegurarse de que los parámetros estén definidos)
  const { id } = params || {};

  // Variables de estado para almacenar el título y la descripción modificados
  const [modifiedTitle, setModifiedTitle] = useState("");
  const [modifiedDescription, setModifiedDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updating, setUpdating] = useState(false); // Nueva variable de estado

  // Hook useRouter para la navegación
  const router = useRouter();

  const cloudinary = new Cloudinary({
    cloud_name: "dgpzqbgz6", // Reemplaza con tu cloud_name de Cloudinary
    api_key: "435159313488559", // Reemplaza con tu api_key de Cloudinary
  });

  // useEffect para obtener los detalles del tema cuando el componente se monta
  useEffect(() => {
    // Asegurarse de que el ID esté definido antes de obtener los detalles del tema
    if (id) {
      const fetchTemasDetails = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/temarios/${id}`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Error al obtener los detalles del tema");
          }

          const data = await res.json();
          const { title, description, imageUrl } = data.temarios;

          setModifiedTitle(title);
          setModifiedDescription(description);
          setNewImage(imageUrl);
          setImagePreview(imageUrl); // Cambiado de setImagePreview a setNewImage
        } catch (error) {
          console.error("Error al obtener los detalles del tema: ", error);
        }
      };

      fetchTemasDetails();
    }
  }, [id]);

  // Función handleImageChange para actualizar la imagen
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

  // Función handleModification para actualizar el tema
  const handleModification = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      // Verificar si hay una nueva imagen
      if (newImage) {
        // Subir la nueva imagen a Cloudinary
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

      // Actualizar el tema con la nueva información, incluida la URL de la imagen
      setUpdating(true); // Establecer updating en true al iniciar la actualización
      const res = await fetch(`http://localhost:3000/api/temarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: modifiedTitle,
          description: modifiedDescription,
          imageUrl: imageUrl,
        }),
      });

      if (res.ok) {
        console.log("Tema modificado exitosamente");
        router.push("/Educacion");
      } else {
        throw new Error("Error al modificar el tema");
      }
    } catch (error) {
      console.error("Error al modificar el tema: ", error);
    } finally {
      setUpdating(false); // Establecer updating en false después de finalizar la actualización, ya sea con éxito o error
    }
  };

  // Renderizar el componente
  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="">
        <SubMenu />
        <div className="ContEducacion flex flex-col items-center p-4 relative z-1">
          <div className="Conteiner text-white p-1">
            <h3>Temario</h3>
          </div>

          {isAdmin && (
            <div className="max-w-3xl mx-auto p-4 mb-4">
              <Navbar />
            </div>
          )}
          <div className="flex flex-col items-center mb-4">
            <form onSubmit={handleModification} className="box2">
              <div className="Edutitle px-2 py-1 bg-orange-800 text-white text-center text-sm">
                <input
                  type="text"
                  placeholder="Titulo"
                  value={modifiedTitle || ""}
                  onChange={(e) => setModifiedTitle(e.target.value)}
                  className="text-black px-2 py-1 text-sm"
                />
              </div>
              <div className="px-2 py-1 bg-orange-800 text-white text-justify text-sm Edubody">
                <textarea
                  placeholder="Descripción"
                  value={modifiedDescription || ""}
                  maxLength={250}
                  onChange={(e) => setModifiedDescription(e.target.value)}
                  className="resize-none w-full min-h-[30px] max-h-[100px] border rounded-md p-1 text-sm"
                ></textarea>
                <p className="text-black-500 text-xs mt-1">
                  {" "}
                  Caracteres restantes: {250 - modifiedDescription.length}
                </p>
              </div>
              <div className="w-1/2 mt-5">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {imagePreview && (
                  <div className="w-full h-40 mb-2">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                disabled={updating} // Deshabilitar el botón mientras la actualización está en curso
              >
                {updating ? "Actualizando..." : "Actualizar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportar el componente Temas
export default EditarTemas;
