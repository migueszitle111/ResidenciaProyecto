//app/registro/page.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";

import "./Style.css";
import "../globals.css";

export default function Registro() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setMail] = useState("");
  const [cedula, setCedula] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [roles] = useState("user");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !lastname || !cedula || !especialidad || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      // Subida de imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("upload_preset", "o4nui5gs");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dgpzqbgz6/upload",
        { method: "POST", body: formData }
      );
      const { secure_url: imageUrl } = await uploadRes.json();

      // Verificar existencia de usuario
      const existsRes = await fetch("/api/userExits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await existsRes.json();
      if (user) {
        setError("El usuario ya existe");
        return;
      }

      // Crear usuario
      const regRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          cedula,
          especialidad,
          email,
          password,
          roles,
          imageUrl,
        }),
      });

      if (regRes.ok) {
        e.target.reset();
        router.push("/Login");
      } else {
        setError("Error en la creación del usuario");
      }
    } catch (err) {
      console.error(err);
      setError("Error en la creación del usuario");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />

      <div className="ContEducacion bg-opacity-90 bg-black p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="LogoRegistro mb-4">
          <Image src="/L_B_Blanco.svg" width={75} height={75} alt="Logo" />
        </div>
        <h1 className="text-lg text-white">EMPIEZA GRATIS</h1>
        <h2 className="text-3xl text-white mt-2">Crea una nueva cuenta.</h2>
        <p className="text-base text-white mt-1">
          ¿Ya eres usuario?{" "}
          <a href="/Login" className="text-orange-300">
            Inicia sesión
          </a>
        </p>

        <form onSubmit={handleSubmit} className="w-full sm:w-2/3 mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              name="name"
              required
              className="flex-1 p-2 h-12 rounded text-xs"
            />
            <input
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Apellido"
              name="lastname"
              required
              className="flex-1 p-2 h-12 rounded text-xs"
            />
          </div>

          <input
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Cédula profesional"
            name="cedula"
            required
            className="w-full p-2 h-12 rounded text-xs"
          />
          <input
            onChange={(e) => setEspecialidad(e.target.value)}
            placeholder="Especialidad"
            name="especialidad"
            required
            className="w-full p-2 h-12 rounded text-xs"
          />
          <input
            onChange={(e) => setMail(e.target.value)}
            type="email"
            placeholder="Correo electrónico"
            name="email"
            required
            className="w-full p-2 h-12 rounded text-xs"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            name="password"
            required
            className="w-full p-2 h-12 rounded text-xs"
          />

          <div>
            <p className="text-xs text-white mb-1">Logo de tu empresa:</p>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && (
              <div className="w-full h-40 mt-2">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-700 transition"
          >
            Crear Cuenta
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded text-white bg-red-600 hover:bg-red-800 transition"
          >
            {/* Icono Google */}
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5h-2.2v-.1H24v7.1h11.3c-1.5
                   4.2-5.4 7.2-10.3 7.2-6 0-11-4.9-11-11s4.9-11
                   11-11c2.8 0 5.4 1 7.3 2.8l5-4.8C33.4 7.4
                   28.9 5.4 24 5.4 13.6 5.4 5 14 5 24.4S13.6
                   43.3 24 43.3c10.8 0 19.6-8.7 19.6-19.4
                   0-1.4-.1-2.5-.3-3.4z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5h-2.2v-.1H24v7.1h11.3c-1.2
                   3.4-4.3 6-8.3 6.7l.1.1 5.9 4.8c-.3.3-.7.5-1
                   .8 4.8-2.9 8-8.2 8-14.5 0-1.4-.1-2.5-.3-3.4z"
              />
            </svg>
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  );
}
