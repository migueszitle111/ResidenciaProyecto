// app/registro/page.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Overhead     from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";

export default function Registro() {
  const [name, setName]             = useState("");
  const [lastname, setLastname]     = useState("");
  const [email, setMail]            = useState("");
  const [cedula, setCedula]         = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");
  const [roles]                     = useState("user");
  const [newImage, setNewImage]     = useState(null);
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
      // 1) Subida de imagen a Cloudinary
      let imageUrl = "";
      if (newImage) {
        const fd = new FormData();
        fd.append("file", newImage);
        fd.append("upload_preset", "o4nui5gs");
        const upl = await fetch("https://api.cloudinary.com/v1_1/dgpzqbgz6/upload", {
          method: "POST", body: fd
        });
        imageUrl = (await upl.json()).secure_url;
      }

      // 2) Llamamos a nuestro endpoint de registro → recibe la URL de Checkout
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          name, lastname, cedula, especialidad,
          email, password, roles, imageUrl
        }),
      });

      const { url } = await res.json();
      if (url) window.location.href = url;
      else setError("No se pudo iniciar el pago");

    } catch (err) {
      console.error(err);
      setError("Error iniciando el pago");
    }
  };

  return (
    <div>
      <Overhead /><OverheadMenu />
      <hr className="bg-white h-0.5"/>

      <div className="ContEducacion …">
        <Image src="/L_B_Blanco.svg" width={75} height={75} alt="Logo"/>
        <h2 className="text-3xl text-white mt-2">Crea una nueva cuenta.</h2>
        <p className="text-white">
          ¿Ya eres usuario? <a href="/Login" className="text-orange-300">Inicia sesión</a>
        </p>

        <form onSubmit={handleSubmit} className="…">
          {/* campos name, lastname, cedula… igual que antes */}
          {/* input type="file" → setNewImage / setImagePreview */}
          {imagePreview && (
            <img src={imagePreview} className="…"/>
          )}

          {error && <div className="bg-red-500 …">{error}</div>}

          <button
            type="submit"
            className="w-full bg-orange-500 …"
          >
            Continuar al pago
          </button>
        </form>
      </div>
    </div>
  );
}
