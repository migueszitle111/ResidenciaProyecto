"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cloudinary } from "cloudinary-core";
import "./style.css";

export default function AgregarTopics() {
  const [title, setTitle] = useState(""); // Estado para el título
  const [description, setDescription] = useState(""); // Estado para la descripción
  const [newImage, setNewImage] = useState(null); // Estado para la imagen
  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa de la imagen
  const router = useRouter(); // Hook para redireccionar a otra página
  const [charCount, setCharCount] = useState(0);
  const maxChars = 80;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxChars) {
      setDescription(inputValue);
      setCharCount(inputValue.length);
    }
  };

  const cloudinary = new Cloudinary({
    cloud_name: "dgpzqbgz6", // Reemplaza con tu cloud_name de Cloudinary
    api_key: "435159313488559", // Reemplaza con tu api_key de Cloudinary
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el título y la descripción no estén vacíos
    if (!title || !description) {
      alert("Por favor, rellene todos los campos");
      return;
    }

    try {
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", newImage); // Agrega la imagen al formData
      formData.append("upload_preset", "o4nui5gs"); // Reemplaza con tu upload_preset de Cloudinary

      // Realiza una petición POST a la API de Cloudinary para subir la imagen  y obtener la URL
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${
          cloudinary.config().cloud_name
        }/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json(); // Obtiene la respuesta de Cloudinary
      const imageUrl = cloudinaryData.secure_url; // Obtiene la URL de la imagen subida a Cloudinary

      // Luego puedes almacenar la URL de la imagen en tu base de datos junto con el título y descripción
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Convierte los datos a un string JSON
        body: JSON.stringify({ title, description, imageUrl }),
      });

      // Si la petición fue exitosa, redirecciona a la página principal
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Fallo al crear el topico");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio de la imagen
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

  return (
    <>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="Conteiner">
        <SubMenu />
        {/*Cartas editables */}
        <div className="max-w-3xl mx-auto p-4">
          <Navbar />
        </div>
        <>
          <div className="Conteiner flex flex-wrap lg:w-2/3 bg-[#8f3400] md:p-10 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Titulo"
                className="Conteiner title text-3xl font-semibold text-black mb-6"
              />
              <hr className="bg-white h-0.5" />
              <div className="flex flex-wrap">
                <div className="Description w-1/2 pr-4">
                  <textarea
                    onChange={handleChange}
                    value={description}
                    placeholder="Descripción"
                    className=" Conteiner text-black text-justify mt-5 w-full p-2"
                    rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                  />
                  <p>
                    Caracteres restantes: {maxChars - charCount}/{maxChars}
                  </p>
                </div>
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
              >
                Agregar Tema
              </button>
            </form>
          </div>
        </>
      </div>
    </>
  );
}
