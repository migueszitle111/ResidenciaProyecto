"use client";
import React, { useState } from "react";
import Image from "next/image";
import Overhead from "../../components/Overhead";
import OverheadMenu from "../../components/OverheadMenu";
import SubMenu from "../../components/Submenu";
import Footer from "../../components/Footer";
import { useSession } from "next-auth/react";
import Navbar from "../Navbar";
import { useRouter } from "next/navigation";

export default function Perlas() {
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

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
  

  const handleSubmit = async () => {
    if (!title || !description) {
      console.log("Por favor, complete todos los campos.");
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
      
      // Envia la información del tema a la API
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, videoUrl, imageUrl }),
      });

      if (res.ok) {
        console.log("Tema creado exitosamente.");
        // Redirige a la página de Perlas después de enviar
        router.push("/Perlas");
      } else {
        console.error("Fallo al crear el tema.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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

            <div className="w-full bg-black flex border-2 border-orange-500/50 rounded-tr-lg rounded-bl-lg">
              <div className="flex flex-col w-full p-2">
                <div className="w-full">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-[#000000] px-2 py-1 w-full"
                    placeholder="Título del tema"
                  />
                  <textarea
                    className="w-full border p-2 mt-2 text-[#000000]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escribe aquí la descripción..."
                  ></textarea>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
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
                  {/* Vista previa de la imagen */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="mt-2 max-w-full rounded-lg"
                    />
                  )}
                  <button
                    onClick={handleSubmit}
                    className="bg-black text-white mt-2 px-6 py-3 rounded-md hover:bg-gray-900"
                  >
                    Agregar Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-grey h-0.5" />
      <Footer />
    </div>
  );
}
