"use client";
// Importa las dependencias necesarias
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./Style.css";

// Componente principal de la página de inicio de sesión
export default function Login() {
  // Estados para el correo electrónico, contraseña y manejo de errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Instancia del router de Next.js
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError("");
      }, 5000); // Establece el tiempo que deseas que el mensaje de error sea visible (en milisegundos)

      return () => clearTimeout(timerId);
    }
  }, [error]);

  // Manejador de envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Intenta iniciar sesión con las credenciales proporcionadas
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Si hay un error en la respuesta, muestra un mensaje de error
      if (res.error) {
        setError("Credenciales inválidas");
        return;
      }

      // Redirige al usuario a la página principal después de iniciar sesión
      router.replace("/");
    } catch (error) {
      // Muestra errores en la consola
      console.log(error);
    }
  };
  return (
    <div className="Conteiner">
      {/* Componentes de encabezado */}
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="flex flex-col items-center p-5 md:flex-row justify-center">
        {/* Contenedor 1 */}
        <div className="flex items-center content-center m-4">
          <Image
            src="/assets/L_V_Blanco.png"
            width={350}
            height={350}
            alt="Logo"
            className="max-w-full"
          />
        </div>

        {/* Contenedor 2 */}
        <div className="flex-1 text-white text-center md:text-left md:ml-8">
          {/* Titulo de bienvenida */}
          <div className="ContTituloLogin pt-9 pl-4 md:pl-0 pb-4 md:pb-0">
            <div className="text-6xl">
              <h1>Bienvenido</h1>
            </div>
            <div className="TituloTexto2Login pt-4 pl-9 text-2xl md:text-2xl flex justify-center md:justify-start items-start">
              <h1>Inicio de sesión</h1>
            </div>
          </div>

          <div className="Formulario pt-5 text-3xl">
            <form onSubmit={handleSubmit}>
              {/* Campos de correo electrónico y contraseña */}
              <div>
                <div className="TituloTexto3Login">
                  <h1>Correo</h1>
                </div>
                <div className="form_group_login">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="input"
                    className="form__field_login"
                    placeholder="Ingrese el correo electrónico"
                    name="mail"
                    id="mail"
                    required
                  />
                  <label htmlFor="mail" className="form__label"></label>
                </div>
                <div className="TituloTexto4Login pt-4">
                  <h1>Contraseña</h1>
                </div>
                <div className="form__group_login">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form__field_login"
                    placeholder="Ingresa la contraseña"
                    name="password"
                    id="password"
                    required
                  />
                  <label htmlFor="password" className="form__label"></label>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="alert bg-red-500 text-white p-4 rounded-md flex items-center space-x-2">
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

              {/* Botón de inicio de sesión */}
              <div className="mt-6 pt-8">
                <button className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-orange-500 text-xl text-white px-6 py-4 rounded-md hover:bg-orange-900 md:text-lg">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <div className="mt-5 pt-8 md:pt-0 pl-0 md:pl-2 pb-2">
            <h1>
              ¿Olvidaste tu contraseña?{" "}
              <a href="/ResetPassword" className="text-orange-500">
                Dale click aqui
              </a>
            </h1>
          </div>
          <div className="mt-5 pt-8 md:pt-0 pl-0 md:pl-2 pb-2">
            <h1>
              ¿No tienes una cuenta con nosotros?{" "}
              <a href="/Registro" className="text-orange-500">
                Regístrate
              </a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
