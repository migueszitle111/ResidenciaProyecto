"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import "../../Style.css";
import CursoNavbar from "../../CursoNavbar";
import { useRouter } from "next/navigation";
import { Cloudinary } from "cloudinary-core";

const EditarCongresos = ({ params }) => {
  // Desestructurar los datos de sesión y verificar si el usuario es un administrador
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";
  const maxChars = 250;
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
          const res = await fetch(`http://localhost:3000/api/congresos/${id}`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Error al obtener los detalles del tema");
          }

          const data = await res.json();
          const { title, description, imageUrl } = data.congresos;

          setModifiedTitle(title);
          setModifiedDescription(description);
          setNewImage(imageUrl);
          setImagePreview(imageUrl); // Cambiado de setImagePreview a setNewImage
        } catch (error) {
          console.error("Error al obtener los detalles del congreso: ", error);
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
      const res = await fetch(`http://localhost:3000/api/congresos/${id}`, {
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
        console.log("Congreso modificado exitosamente");
        router.push("/Evento");
      } else {
        throw new Error("Error al modificar el congreso");
      }
    } catch (error) {
      console.error("Error al modificar el congreso: ", error);
    } finally {
      setUpdating(false); // Establecer updating en false después de finalizar la actualización, ya sea con éxito o error
    }
  };

  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="bg-[#000000CC]">
        <SubMenu />
        {/*Contenedor de la pagina eventos */}
        <div className=" ContEventos flex min-h-screen flex-col items-center p-10">
          {/*Banner del titulo de la pagina */}
          <div className="BannerTitlepage">
            <div>Evento</div>
          </div>

          {/*Contenedor de congresos */}
          <div className="Conteiner text-white  p-1 mt-9">
            <h1>Congresos</h1> <hr className="bg-[#c44900] h-1 m-1" />
          </div>
          <CursoNavbar />
          <div className="mb-8 ">
            {/*Contenedor de cartas */}
            <div className="flex flex-wrap justify-center items-center mb-8">
              {/*Carta 1 hacer que sea editable con form*/}
              <form
                onSubmit={handleModification}
                className="card flex flex-col items-center justify-center "
              >
                <div className="relative w-48 h-48">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-700 flex items-center justify-center w-full h-full"></div>
                  )}
                </div>
                <div className="card-content">
                  <input
                    type="text"
                    placeholder="Titulo"
                    value={modifiedTitle || ""}
                    onChange={(e) => setModifiedTitle(e.target.value)}
                    className="card-title text-black"
                  />
                  <hr className="bg-[#8f3400]" />
                  <textarea
                    value={modifiedDescription || ""}
                    onChange={(e) => setModifiedDescription(e.target.value)}
                    placeholder="Descripción"
                    className="bg-gray-900 text-white rounded mt-3 p-2 w-full h-32"
                    maxLength={maxChars}
                  ></textarea>
                  <p className="text-gray-500 text-sm mt-1"></p>
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
    </div>
  );
};

// Exportar el componente EditarCursos
export default EditarCongresos;
