"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Overhead from "../../components/Overhead";
import OverheadMenu from "../../components/OverheadMenu";
import SubMenu from "../../components/Submenu";
import "../Style.css";
import CursoNavbar from "../CursoNavbar";
import { useRouter } from "next/navigation";

export default function AgregarCursos() {
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [charCount, setCharCount] = useState(description.length);
  const maxChars = 150;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Por favor, rellene todos los campos");
      return;
    }

    try {
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("upload_preset", "o4nui5gs"); // Reemplaza con tu upload_preset de Cloudinary

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dgpzqbgz6/upload`, // Reemplaza con tu cloud_name de Cloudinary
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      // Luego puedes almacenar la URL de la imagen en tu base de datos junto con el título y descripción
      const res = await fetch("http://localhost:3000/api/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      if (res.ok) {
        router.push("/Evento");
      } else {
        throw new Error("Fallo al crear el topico");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <h1>Cursos</h1> <hr className="bg-[#c44900] h-1 m-1" />
          </div>
          <CursoNavbar />
          <div className="mb-8 ">
            {/*Contenedor de cartas */}
            <div className="flex flex-wrap justify-center items-center mb-8">
              {/*Carta 1 hacer que sea editable con form*/}
              <form
                onSubmit={handleSubmit}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="card-title text-black"
                  />
                  <hr className="bg-[#8f3400]" />
                  <textarea
                    value={description}
                    placeholder="Descripción"
                    className="bg-gray-900 text-white rounded mt-3 p-2 w-full h-32"
                    onChange={(e) => {
                      const value = e.target.value;
                      setDescription(value);
                      setCharCount(value.length);
                    }}
                    maxLength={maxChars}
                  ></textarea>
                  <p className="text-gray-500 text-sm mt-1">
                    {charCount}/{maxChars}
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                >
                  Agregar Curso
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
