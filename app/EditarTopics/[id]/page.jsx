// Importar la dependencia 'client'
"use client";
// Importar las dependencias necesarias de React y Next.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Overhead from "../../components/Overhead";
import OverheadMenu from "../../components/OverheadMenu";
import SubMenu from "../../components/Submenu";
import Navbar from "../../components/Navbar";
import { useSession } from 'next-auth/react';
import { Cloudinary } from "cloudinary-core";

// Definir el componente EditarTopics
const EditarTopics = ({ params }) => {
  // Desestructurar los datos de sesión y verificar si el usuario es un administrador
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === 'admin';

  // Extraer el ID del tema de los parámetros (asegurarse de que los parámetros estén definidos)
  const { id } = params || {};

  // Variables de estado para almacenar el título, la descripción y la nueva imagen modificados
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
      const fetchTopicDetails = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: 'no-store',
          });

          if (!res.ok) {
            throw new Error("Error al obtener los detalles del tema");
          }

          const data = await res.json();
          const { title, description, imageUrl } = data.topic;

          setModifiedTitle(title);
          setModifiedDescription(description);
          setNewImage(imageUrl);
          setImagePreview(imageUrl); // Cambiado de setImagePreview a setNewImage
        } catch (error) {
          console.error('Error al obtener los detalles del tema: ', error);
        }
      };

      fetchTopicDetails();
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
          `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
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
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Convertir los datos a un string JSON
        body: JSON.stringify({
          title: modifiedTitle,
          description: modifiedDescription,
          imageUrl: imageUrl,
        }),
      });

      // Si la petición fue exitosa, redireccionar a la página principal
      if (res.ok) {
        console.log("Tema modificado exitosamente");
        router.push("/");
      } else {
        throw new Error("Error al modificar el tema");
      }
    } catch (error) {
      console.error("Error al modificar el tema: ", error);
    } finally {
      setUpdating(false); // Establecer updating en false después de finalizar la actualización, ya sea con éxito o error
    }
  };

  // Función handleDescriptionChange para actualizar la descripción
const handleDescriptionChange = (e) => {
  const { value, selectionStart, selectionEnd } = e.target;
  
  // Verificar si la tecla presionada es "Enter"
  if (e.key === "Enter") {
    // Agregar un salto de línea en la posición actual del cursor
    const updatedValue =
      value.substring(0, selectionStart) +
      "\n" +
      value.substring(selectionEnd);

    setModifiedDescription(updatedValue);
  } else {
    // Si la tecla no es "Enter", actualizar la descripción normalmente
    setModifiedDescription(value);
  }
};

  // Renderizar el componente
  return (
    <>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="">
        <SubMenu />
        <div className="max-w-3xl mx-auto p-4">
          <Navbar />
        </div>
        <>
          <div className="flex flex-wrap lg:w-2/3 bg-[#8f3400] md:p-10 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
            <form onSubmit={handleModification}>
              <input
                type="text"
                placeholder="Título"
                value={modifiedTitle}
                onChange={(e) => setModifiedTitle(e.target.value)}
                className="title text-3xl font-semibold text-black mb-6"
              />
              <hr className="bg-white h-0.5" />
              <div className="flex flex-wrap">
                <div className="Description w-1/2 pr-4">
                <textarea
                  placeholder="Descripción"
                  value={modifiedDescription}
                  onChange={handleDescriptionChange}
                  className="text-black text-justify mt-5 w-full p-2 resize-y min-h-[80px]"
                  rows="4"
                />
                </div>
              </div>
              <div className="w-1/2 mt-5">
                <input type="file" onChange={handleImageChange} className="mb-2" />
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
        </>
      </div>
    </>
  );
};

// Exportar el componente EditarTopics
export default EditarTopics;
