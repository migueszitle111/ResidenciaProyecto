// Importa las funciones y componentes necesarios
"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import "./Style.css";

// Componente funcional Sidebar
const Sidebar = () => {
  // Manejador para cerrar sesión
  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside>
      {/* Lista de enlaces en la barra lateral */}
      <ul className="sidebar">
        <li>
          {/* Enlace a la página de perfil */}
          <Link href="/Perfil" passHref scroll={false} className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md">
            Tu Perfil
          </Link>
        </li>
        <li>
          {/* Enlace a la página de modificación de perfil */}
          <Link href="/Perfil/Perfil_Actualizar" passHref scroll={false} className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md">
            Modificar Perfil
          </Link>
        </li>
        <li>
          {/* Enlace a la página de cambio de contraseña */}
          <Link href="/Perfil/Perfil_Contra" passHref scroll={false} className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md">
            Cambiar Contraseña
          </Link>
        </li>
        <hr />
        <li>
          {/* Enlace para cerrar sesión */}
          <a
            className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md"
            onClick={logoutHandler}
          >
            Cerrar Sesión
          </a>
        </li>
      </ul>
    </aside>
  );
};

// Exporta el componente Sidebar
export default Sidebar;
