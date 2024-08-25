// Importa las bibliotecas y componentes necesarios
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import { useRouter } from "next/navigation";
import "./Style.css";
import "../globals.css";

// Componente de Registro
export default function Registro() {
  // Estados para los campos del formulario y manejo de errores
  const [name, setName] = useState(""); // Estado para manejar el nombre
  const [lastname, setLastname] = useState(""); // Estado para manejar el apellido
  const [email, setMail] = useState(""); // Estado para manejar el correo electrónico
  const [cedula, setCedula] = useState(""); // Estado para manejar la cédula
  const [especialidad, setEspecialidad] = useState(""); // Estado para manejar la especialidad
  const [password, setPassword] = useState(""); // Estado para manejar la contraseña
  const [error, setError] = useState(""); // Estado para manejar errores
  const [roles, setRole] = useState("user"); // EL rol por defecto es "user"
  const [newImage, setNewImage] = useState(null); // Estado para manejar la imagen
  const [imagePreview, setImagePreview] = useState(null); // Estado para manejar la vista previa de la imagen

  const router = useRouter(); // Hook para manejar la navegación

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError("");
      }, 3000); // Establece el tiempo que deseas que el mensaje de error sea visible (en milisegundos)

      return () => clearTimeout(timerId);
    }
  }, [error]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!name || !lastname || !cedula || !especialidad || !email || !password) {
      setError("Todos los campos son obligatorios");
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

      const cloudinaryData = await cloudinaryResponse.json(); // Datos de la imagen subida
      const imageUrl = cloudinaryData.secure_url; // URL de la imagen subida

      // Verificar si el usuario ya existe
      const resUserExits = await fetch("/api/userExits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar el correo electrónico al servidor
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExits.json(); // Datos del usuario

      // Si el usuario ya existe, muestra un mensaje de error
      if (user) {
        setError("El usuario ya existe");
        return;
      }

      // Crear un nuevo usuario
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar los datos del usuario al servidor
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

      // Redireccionar al usuario a la página de inicio de sesión si el registro es exitoso
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/Login");
      } else {
        console.log("Error en la creación del usuario");
      }
    } catch (error) {
      console.log("Error en la creación del usuario: " + error);
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
    <div>
      {/* Componentes de la parte superior */}
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />

      <div className="ContEducacion bg-opacity-90 bg-black p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="LogoRegistro">
          <Image src="/L_B_Blanco.svg" width={75} height={75} alt="Logo" />
        </div>

        <div className="ContTitulo text-lg justify-left items-left flex flex-col">
          <h1>EMPIEZA GRATIS</h1>
        </div>
        <div className="TituloTexto1 text-3xl justify-left items-left flex flex-col">
          <h1>Crea una nueva cuenta.</h1>
        </div>
        <div className="TituloTexto2 text-base justify-left items-left flex flex-col">
          <h1>
            ¿Ya eres usuario? <a href="/Login">Inicia sesión</a>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full sm:w-2/3">
          <div className="Formulario_nombres flex flex-col sm:flex-row">
            <div className="form__nombres p-2 mt-2 w-full sm:w-1/2">
              <input
                onChange={(e) => setName(e.target.value)}
                type="input"
                className="nombres__field p-2 h-12 border-0 outline-none text-xs w-full transition duration-200 rounded"
                placeholder="Nombre"
                name="name"
                id="name"
              />
              <label for="name" class="form__label"></label>
            </div>
            <div className="form__nombres p-2 mt-2 w-full sm:w-1/2">
              <input
                onChange={(e) => setLastname(e.target.value)}
                type="input"
                className="nombres__field p-2 h-12 border-0 outline-none text-xs w-full transition duration-200 rounded"
                placeholder="Apellido"
                name="lastname"
                id="lastname"
              />
              <label for="lastname" class="form__label"></label>
            </div>
          </div>

          {/* Campos de cédula, correo electrónico y contraseña */}
          <div className="Formulario flex flex-col">
            <div className="form__group p-2 field">
              <input
                onChange={(e) => setCedula(e.target.value)}
                type="input"
                className="form__field w-full h-12 p-2 border-0 outline-none text-xs flex-1 transition duration-200 rounded"
                placeholder="Cedula profesional"
                name="cedula"
                id="cedula"
              />
              <label for="cedula" class="form__label"></label>
            </div>
            <div className="form__group p-2 field">
              <input
                onChange={(e) => setEspecialidad(e.target.value)}
                type="input"
                class="form__field w-full h-12 p-2 border-0 outline-none text-xs flex-1 row flex  transition duration-200 rounded"
                placeholder="Especialidad"
                name="especialidad"
                id="especialidad"
              />
              <label for="cedula" class="form__label"></label>
            </div>
            <div className="form__group p-2 field">
              <input
                onChange={(e) => setMail(e.target.value)}
                type="input"
                class="form__field w-full h-12 p-2 border-0 outline-none text-xs flex-1 row flex  transition duration-200 roundedd"
                placeholder="Correo electrónico"
                name="email"
                id="email"
              />
              <label for="email" class="form__label"></label>
            </div>
            <div class="form__group p-2 field">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="form__field w-full h-12 p-2 border-0 outline-none text-xs flex-1 row flex  transition duration-200 rounded"
                placeholder="Contraseña"
                name="password"
                id="password"
              />
              <label for="password" class="form__label"></label>
            </div>

            <div className="TituloTexto3 text-xs justify-left items-left flex flex-col mt-2">
              <h1>Logo de tu empresa:</h1>
            </div>
            <div className="text-lg">
              <input
                type="file"
                onChange={handleImageChange}
                className="p-2 border-0 outline-none text-xs flex-1 row flex  transition duration-200 rounded"
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
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="alertb bg-red-500 text-white p-4 rounded-md flex items-center space-x-2">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm-.4-10h-1.2c-.3 0-.5.2-.5.5v5c0 .3.2.5.5.5h1.2c.3 0 .5-.2.5-.5v-5c0-.3-.2-.5-.5-.5zm0 7h-1.2c-.3 0-.5.2-.5.5s.2.5.5.5h1.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z" />
              </svg>
              <span className="msg">{error}</span>
              <svg
                onClick={() => setError("")}
                className="w-6 h-6 fill-current cursor-pointer"
                viewBox="0 0 20 20"
              >
                <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm4.5 12.3c.4.4.4 1 0 1.4s-1 .4-1.4 0L10 11.4l-3.1 3.1c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L8.6 10 5.5 6.9c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L10 8.6l3.1-3.1c.4-.4 1-.4 1.4 0s.4 1 0 1.4L11.4 10l3.1 3.1z" />
              </svg>
            </div>
          )}

          {/* Botón de registro */}
          <div className="ContBotonRegistro text-xs">
            <button
              type="submit"
              style={{ width: "100%" }}
              className="bg-orange-500 text-white mt-10 px-6 py-4 rounded-md hover:bg-orange-900"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
