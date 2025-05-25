// components/HeadComponents.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Overhead from "./Overhead";
import OverheadMenu from "./OverheadMenu";

export default function HeadComponents() {
  const { data: session, status } = useSession();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Mientras NextAuth está comprobando la sesión no tocamos el loader
    if (status === "loading") return;

    if (session) {
      // Si ya hay sesión, oculta inmediatamente
      setShowLoader(false);
    } else {
      // Si no hay sesión, espera 3s antes de ocultar el loader
      const timer = setTimeout(() => setShowLoader(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, session]);

  // Mientras showLoader = true solo mostramos un placeholder (o nada)
  if (showLoader) {
    return null; // o un spinner, etc.
  }

  return (
    <div>
      {/* Esto siempre sale tras el loader */}
      <Overhead />

      {/* Esto solo si hay sesión */}
      {session && <OverheadMenu />}

      <hr className="bg-white h-[0.2px]" />
    </div>
  );
}
