// app/registro/page.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";

export default function Registro() {
  const [name, setName]                 = useState("");
  const [lastname, setLastname]         = useState("");
  const [email, setMail]                = useState("");
  const [cedula, setCedula]             = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [password, setPassword]         = useState("");
  const [error, setError]               = useState("");
  const [newImage, setNewImage]         = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![name, lastname, cedula, especialidad, email, password].every(Boolean)) {
      return setError("Todos los campos son obligatorios");
    }

    try {
      // 1) Subir logo a Cloudinary (opcional)
      let imageUrl = "";
      if (newImage) {
        const fd = new FormData();
        fd.append("file", newImage);
        fd.append("upload_preset", "o4nui5gs");
        const upl = await fetch(
          "https://api.cloudinary.com/v1_1/dgpzqbgz6/upload",
          { method: "POST", body: fd }
        );
        imageUrl = (await upl.json()).secure_url;
      }

      // 2) Llamar a nuestro endpoint /api/register → obtenemos url de Stripe
      const res = await fetch("/api/register", {
        method:  "POST",
        headers: {"Content-Type":"application/json"},
        body:    JSON.stringify({
          name,
          lastname,
          cedula,
          especialidad,
          email,
          password,
          roles: "user",
          imageUrl,
        }),
      });

      const { url } = await res.json();
      if (!url) throw new Error("No se pudo iniciar el pago");
      window.location.href = url;

    } catch (err) {
      console.error(err);
      setError(err.message || "Error iniciando el pago");
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
      <hr className="bg-white h-0.5 mb-1" />

      {/* Contenedor centrado con padding lateral responsivo */}
      <div
        className="
          ContEducacion
          min-h-screen
          flex flex-col items-center justify-center text-center
          bg-black bg-opacity-90
          px-4 sm:px-6 lg:px-8 py-6
        "
      >
        {/* Logo de la app */}
        <div className="mb-4">
          <Image src="/L_B_Blanco.svg" width={75} height={75} alt="Logo"/>
        </div>

        <h2 className="text-3xl text-white mb-2">Crea una nueva cuenta.</h2>
        <p className="text-white mb-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/Login" className="text-orange-300 hover:underline">
            Inicia sesión
          </a>
        </p>

        {/* Formulario con ancho máximo mayor */}
        <form
          onSubmit={handleSubmit}
          className="w-3/4 max-w-4xl space-y-4"
        >
          <div className="flex gap-4">
            <input
              onChange={e => setName(e.target.value)}
              placeholder="Nombre"
              required
              className="flex-1 p-2 rounded text-xs"
            />
            <input
              onChange={e => setLastname(e.target.value)}
              placeholder="Apellido"
              required
              className="flex-1 p-2 rounded text-xs"
            />
          </div>

          <input
            onChange={e => setCedula(e.target.value)}
            placeholder="Cédula profesional"
            required
            className="w-full p-2 rounded text-xs"
          />
          <input
            onChange={e => setEspecialidad(e.target.value)}
            placeholder="Especialidad"
            required
            className="w-full p-2 rounded text-xs"
          />
          <input
            onChange={e => setMail(e.target.value)}
            type="email"
            placeholder="Correo electrónico"
            required
            className="w-full p-2 rounded text-xs"
          />
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            required
            className="w-full p-2 rounded text-xs"
          />

          {/* Logo de empresa */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-white mb-1">
              Logo de tu empresa (opcional):
            </p>
            <input type="file" onChange={handleImageChange} className="text-xs"/>

            {imagePreview && (
              <div className="relative w-32 h-32 mt-2 overflow-hidden rounded border border-white">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-500 text-white p-2 rounded text-xs">
              {error}
            </div>
          )}

          {/* Botones */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-700 transition text-sm"
          >
            Continuar al pago
          </button>

          <button
            type="button"
            onClick={() => signIn("google", {
              callbackUrl: "/payment/success"
            })}
            className="w-full flex items-center justify-center gap-2 py-3 rounded text-white bg-red-600 hover:bg-red-800 transition text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5h-2.2v-.1H24v7.1h11.3c-1.5…"/>
              <path fill="#1976D2" d="M43.6 20.5h-2.2v-.1H24v7.1h11.3c-1.2…"/>
            </svg>
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  );
}
