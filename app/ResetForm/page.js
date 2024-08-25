"use client"; // Indica que este archivo es del lado del cliente
import Image from "next/image"; // Importa el componente Image de Next.js
import Overhead from "../components/Overhead"; // Importa el componente Overhead
import OverheadMenu from "../components/OverheadMenu"; // Importa el componente OverheadMenu
import { useState, useEffect } from "react"; // Importa los hooks useState y useEffect de React
import { useRouter } from "next/navigation"; // Importa el hook useRouter de Next.js
import "../Login/Style.css"; // Importa el archivo de estilos CSS

export default function ResetForm() {
  const [email, setEmail] = useState(""); // Estado para manejar el correo electrónico
  const [newPassword, setNewPassword] = useState(""); // Estado para manejar la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para manejar la confirmación de la contraseña
  const [token, setToken] = useState(""); // Estado para manejar el token
  const [error, setError] = useState(""); // Estado para manejar errores
  const [successMessage, setSuccessMessage] = useState(""); // Estado para manejar mensajes de éxito
  const router = useRouter(); // Hook para manejar la navegación


  // Efecto para manejar el tiempo de visibilidad del mensaje de error
  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError('');
      }, 2000); // Establece el tiempo que deseas que el mensaje de error sea visible (en milisegundos)

      return () => clearTimeout(timerId);
    }
  }, [error]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de campos obligatorios
    try {
      if (!email || !token || !newPassword || newPassword !== confirmPassword) { 
        setError("Correo electrónico, token y contraseñas son requeridos, y las contraseñas deben coincidir");
        return;
      }
      
      // Crear un objeto con los campos del formulario
      const existingUser = {
        newPassword,
        confirmPassword,
        email,
        token,
        // Agrega otros campos según sea necesario
      };
  
      // Enviar solicitud PUT para restablecer la contraseña
      const response = await fetch("http://localhost:3000/api/resetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar el objeto con los campos del formulario al servidor
        body: JSON.stringify(existingUser),
      });
  
      if (response.ok) {
        // Contraseña actualizada con éxito
        const result = await response.json();
        setSuccessMessage(result.message);
  
        // Esperar 5 segundos y luego redirigir
        setTimeout(() => {
          // Redirecciona al login 
          router.push("/Login");
        }, 2000);
      } else {
        // Maneja el error de la solicitud PUT
        const result = await response.json();
        setError(result.message || "Hubo un error al procesar la solicitud PUT.");
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
      {/*Contenido del formulario*/}
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
              <h1>Restablecer Contraseña</h1>
            </div>
          </div>

          <div className="Formulario pt-5 text-3xl">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="TituloTexto3Login">
                  <h1>Correo Electrónico</h1>
                </div>
                <div className="form_group_login">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form__field_login"
                    placeholder="Ingrese el correo electrónico"
                    name="email"
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="form__label"></label>
                </div>
              </div>
              <div>
                <div className="TituloTexto3Login mt-1">
                  <h1>Token</h1>
                </div>
                <div className="form_group_login">
                  <input
                    onChange={(e) => setToken(e.target.value)}
                    type="text"
                    className="form__field_login"
                    placeholder="Ingrese el token"
                    value={token}
                    id="token"
                    required
                  />
                  <label htmlFor="token" className="form__label"></label>
                </div>
              </div>
              <div>
                <div className="TituloTexto3Login mt-1">
                  <h1>Nueva Contraseña</h1>
                </div>
                <div className="form_group_login">
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="form__field_login"
                    placeholder="Ingrese la nueva contraseña"
                    value = {newPassword}
                    id="password"
                    required
                  />
                  <label htmlFor="password" className="form__label"></label>
                </div>
              </div>
              <div>
                <div className="TituloTexto3Login mt-1">
                  <h1>Confirmar Contraseña</h1>
                </div>
                <div className="form_group_login">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="form__field_login"
                    placeholder="Confirme la nueva contraseña"
                    value = {confirmPassword}
                    id="confirmPassword"
                    required
                  />
                  <label htmlFor="confirmPassword" className="form__label"></label>
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
                      onClick={() => setError('')}
                      className="w-6 h-6 fill-current cursor-pointer"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8zm4.5 12.3c.4.4.4 1 0 1.4s-1 .4-1.4 0L10 11.4l-3.1 3.1c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L8.6 10 5.5 6.9c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L10 8.6l3.1-3.1c.4-.4 1-.4 1.4 0s.4 1 0 1.4L11.4 10l3.1 3.1z" />
                    </svg>
                  </div>
                )}
                {/* Mensaje de éxito */}
                {successMessage && (
                  <div className="alertg bg-green-500 p-4 rounded-md flex items-center space-x-2">
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
                  Restablecer Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

