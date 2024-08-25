"use client";
import Image from "next/image";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import "../Login/Style.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError('');
      }, 3000); // Establece el tiempo que deseas que el mensaje de error sea visible (en milisegundos)

      return () => clearTimeout(timerId);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!email) {
        setError("Ingrese un correo electrónico");
        return;
      }
  
      // Enviar solicitud para verificar la existencia del correo en el servidor
      const response = await fetch("http://localhost:3000/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });
  
      const result = await response.json();
  
      setSuccessMessage(result.message);
      setToken(result.token); // Almacena el token
  
      if (result.redirectUrl) {
        // Espera 5 segundos y luego redirige
        setTimeout(() => {
          // Pasa el correo electrónico y el token al componente ResetForm
          router.push("/ResetForm");
        }, 2000);
      }
    } catch (error) {
      setError(error.message || "Hubo un error al procesar la solicitud.");
    }
  };
  
  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="flex flex-col items-center p-5 md:flex-row justify-center">
        <div className="flex items-center content-center m-4">
          <Image
            src="/assets/L_V_Blanco.png"
            width={350}
            height={350}
            alt="Logo"
            className="max-w-full"
          />
        </div>
        <div className="flex-1 text-white text-center md:text-left md:ml-8">
          <div className="ContTituloLogin pt-9 pl-4 md:pl-0 pb-4 md:pb-0">
            <div className="text-6xl">
              <h1>Resetear Contraseña</h1>
            </div>
          </div>

          <div className="Formulario pt-5 text-3xl">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="TituloTexto3Login">
                  <h1>Correo</h1>
                </div>
                <div className="form_group_login">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form__field_login"
                    placeholder="Ingrese el correo electrónico"
                    name="mail"
                    id="mail"
                    required
                  />
                  <label htmlFor="mail" className="form__label"></label>
                </div>
              </div>

              {error && (
                <div className="alertb bg-red-500 text-white p-4 rounded-md flex items-center space-x-2">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm-.4-10h-1.2c-.3 0-.5.2-.5.5v5c0 .3.2.5.5.5h1.2c.3 0 .5-.2.5-.5v-5c0-.3-.2-.5-.5-.5zm0 7h-1.2c-.3 0-.5.2-.5.5s.2.5.5.5h1.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z" />
                </svg>
                <span className="msg">{error}</span>
                <svg
                  onClick={() => setError('')}
                  className="w-6 h-6 fill-current cursor-pointer"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm4.5 12.3c.4.4.4 1 0 1.4s-1 .4-1.4 0L10 11.4l-3.1 3.1c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L8.6 10 5.5 6.9c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L10 8.6l3.1-3.1c.4-.4 1-.4 1.4 0s.4 1 0 1.4L11.4 10l3.1 3.1z" />
                </svg>
              </div>
              )}

              {successMessage && (
                <div className="alertg bg-green-500 text-white p-4 rounded-md flex items-center space-x-2">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm-.4-10h-1.2c-.3 0-.5.2-.5.5v5c0 .3.2.5.5.5h1.2c.3 0 .5-.2.5-.5v-5c0-.3-.2-.5-.5-.5zm0 7h-1.2c-.3 0-.5.2-.5.5s.2.5.5.5h1.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z" />
                  </svg>
                  <span className="msg">{successMessage}</span>
                  <svg
                    onClick={() => setSuccessMessage('')}
                    className="w-6 h-6 fill-current cursor-pointer"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm4.5 12.3c.4.4.4 1 0 1.4s-1 .4-1.4 0L10 11.4l-3.1 3.1c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L8.6 10 5.5 6.9c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L10 8.6l3.1-3.1c.4-.4 1-.4 1.4 0s.4 1 0 1.4L11.4 10l3.1 3.1z" />
                  </svg>
                </div>
              )}



              <div className="mt-6 pt-8">
                <button className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-orange-500 text-xl text-white px-6 py-4 rounded-md hover:bg-orange-900 md:text-lg">
                  Resetear Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

