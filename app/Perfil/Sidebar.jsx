// Importa las funciones y componentes necesarios
"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import "./Style.css";

// Componente funcional Sidebar
const Sidebar = () => {
  // Manejador para cerrar Sesión
  const logoutHandler = async () => {
    try {
      const response = await signOut({
        redirect: false,
        callbackUrl: "/?logout=1",
      });

      window.location.replace(response?.url || "/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      window.location.replace("/");
    }
  };

  return (
    <aside>
      {/* Lista de enlaces en la barra lateral */}
      <ul className="sidebar">
        <li>
          {/* Enlace a la pÃ¡gina de perfil */}
          <Link href="/Perfil" passHref scroll={false} className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md">
            Tu Perfil
          </Link>
        </li>
        <li>
          {/* Enlace a la pÃ¡gina de modificaciÃ³n de perfil */}
          <Link href="/Perfil/Perfil_Actualizar" passHref scroll={false} className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md">
            Modificar Perfil
          </Link>
        </li>
        <li>
          {/* Enlace a la pÃ¡gina de cambio de contraseÃ±a */}
          <Link href="/Perfil/Perfil_Contra" passHref scroll={false} className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md">
            Cambiar ContraseÃ±a
          </Link>
        </li>
        <hr />
        <li>
          {/* Enlace para cerrar Sesión */}
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-white hover:bg-orange-900 hover:text-white rounded-md"
            onClick={logoutHandler}
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </aside>
  );
};

// Exporta el componente Sidebar
export default Sidebar;
