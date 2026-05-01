// app/Registro/page.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";

export default function Registro() {
  const [name, setName]                   = useState("");
  const [lastname, setLastname]           = useState("");
  const [email, setEmail]                 = useState("");
  const [idprofessional, setIdprofessional] = useState("");
  const [specialty, setSpecialty]         = useState("");
  const [password, setPassword]           = useState("");
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState("");
  const [newImage, setNewImage]           = useState(null);
  const [imagePreview, setImagePreview]   = useState(null);
  const [loading, setLoading]             = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![name, lastname, idprofessional, specialty, email, password].every(Boolean)) {
      return setError("Todos los campos son obligatorios");
    }

    setLoading(true);

    try {
      // 1) Subir imagen al servidor (opcional)
      let imageUrl = "";
      if (newImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", newImage);

        const uploadRes = await fetch("/api/assets/upload", {
          method: "POST",
          body: imageFormData,
        });

        const uploadData = await uploadRes.json().catch(() => ({}));

        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "No se pudo subir la imagen");
        }

        imageUrl = uploadData.imageUrl || "";
      }

      // 2) Llamar a /api/register (que llama al backend Express)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          idprofessional,
          specialty,
          email,
          password,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      setSuccess("Cuenta creada correctamente. Iniciando sesión...");

      // 3) Iniciar sesión automáticamente
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        router.push("/Login");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al registrar");
    } finally {
      setLoading(false);
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

      <div
        className="
          ContEducacion
          min-h-screen
          flex flex-col items-center justify-center text-center
          bg-black bg-opacity-90
          px-4 sm:px-6 lg:px-8 py-6
        "
      >
        <div className="mb-4">
          <Image src="/L_B_Blanco.svg" width={75} height={75} alt="Logo" />
        </div>

        <h2 className="text-3xl text-white mb-2">Crea una nueva cuenta.</h2>
        <p className="text-white mb-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/Login" className="text-orange-300 hover:underline">
            Inicia sesión
          </a>
        </p>

        <form onSubmit={handleSubmit} className="w-3/4 max-w-4xl space-y-4">
          <div className="flex gap-4">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
              className="flex-1 p-2 rounded text-xs"
            />
            <input
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Apellido"
              required
              className="flex-1 p-2 rounded text-xs"
            />
          </div>

          <input
            onChange={(e) => setIdprofessional(e.target.value)}
            placeholder="Cédula profesional"
            required
            className="w-full p-2 rounded text-xs"
          />
          <input
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Especialidad"
            required
            className="w-full p-2 rounded text-xs"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Correo electrónico"
            required
            className="w-full p-2 rounded text-xs"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            required
            className="w-full p-2 rounded text-xs"
          />

          <div className="flex flex-col items-center">
            <p className="text-xs text-white mb-1">
              Foto de perfil (opcional):
            </p>
            <input type="file" onChange={handleImageChange} className="text-xs" />
            {imagePreview && (
              <div className="relative w-32 h-32 mt-2 overflow-hidden rounded border border-white">
                <Image
                  src={imagePreview}
                  alt="Vista previa"
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500 text-white p-2 rounded text-xs">{error}</div>
          )}
          {success && (
            <div className="bg-green-600 text-white p-2 rounded text-xs">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-700 transition text-sm disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
