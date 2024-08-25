"use client";
import Image from "next/image";
import React, { useState } from "react";
import Overhead from "../../components/Overhead";
import OverheadMenu from "../../components/OverheadMenu";
import SubMenu from "../../components/Submenu";
import "../Style.css";
import Navbar from "../Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AgregarTemas() {
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
      const res = await fetch("http://localhost:3000/api/temarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      if (res.ok) {
        router.push("/Educacion");
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

          <div className="flex flex-wrap justify-center mb-4">
            <form onSubmit={handleSubmit} className="box2">
              <div className="Edutitle px-2 py-1 bg-orange-800 text-white text-center text-sm">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-black px-2 py-1 text-sm"
                  placeholder="Titulo"
                />
              </div>
              <div className="px-2 py-1 bg-orange-800 text-white text-justify text-sm Edubody">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={250}
                  className="resize-none w-full min-h-[30px] max-h-[100px] border rounded-md p-1 text-sm"
                  placeholder="Descripción"
                ></textarea>
                <p className="text-black-500 text-xs mt-1">
                  {" "}
                  Caracteres restantes: {250 - description.length}
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
              >
                Agregar Tema
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
