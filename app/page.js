// page.js
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeadComponents from "./components/HeadComponents";
import SubMenu from "./components/Submenu";
import Navbar from "./components/Navbar";
import CardsList from "./components/CardsList";
import BannerPublicitarios from "./components/BannerPublicitario";
import FooterComponents from "./components/FooterComponents";
import LandingPage from "./components/LandingPage";

const Home = () => {
  const { data: session } = useSession();

  // -------------------------
  // Estado para el loader
  // -------------------------
  const [isClient, setIsClient] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // -------------------------
  // Estado para el modal
  // -------------------------
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Clave de localStorage que incluye el email del usuario
  const userKey = session?.user?.email
    ? `hidePrivacyModal_${session.user.email}`
    : null;

  // Inicializar AOS
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (!session) {
      const t = setTimeout(() => {
        setShowLoader(false);
      }, 3000);
      return () => clearTimeout(t);
    } else {
      setShowLoader(false);
    }
  }, [session]);

  // Mostrar el modal sólo si el usuario inició sesión y no tiene la bandera en localStorage
  useEffect(() => {
    if (session && userKey) {
      const hideFlag = localStorage.getItem(userKey);
      if (hideFlag !== "true") {
        setShowPrivacyModal(true);
      }
    }
  }, [session, userKey]);

  // Refrescar AOS cuando aparece el modal
  useEffect(() => {
    if (showPrivacyModal) AOS.refresh();
  }, [showPrivacyModal]);

  // Función que guarda en localStorage y cierra modal
  const handleAcceptPrivacy = () => {
    if (userKey) {
      localStorage.setItem(userKey, "true");
    }
    setShowPrivacyModal(false);
  };

  if (!isClient) return null;

  // 🚀 Mostrar video inicial si no hay sesión
  if (showLoader && !session) {
    return (
      <>
        <HeadComponents />
        <div className="fixed top-0 left-0 w-full h-full z-[9999]">
          <video
            src="/assets/LandingPage/Videos/cierrevoz.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </>
    );
  }

  const isAdmin = session?.user?.roles === "admin";

  return (
    <>
      <HeadComponents />

      {/* ==============================
          Modal de aviso de privacidad (solo si hay sesión)
         ============================== */}
      {session && showPrivacyModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-80">
          <div className="flex flex-col items-center" data-aos="zoom-in">
            {/* GIF de aviso de privacidad (centrado y grande) */}
            <img
              src="/assets/Gifs/AVISO DE PRIVACIDAD2.gif"
              alt="Aviso de Privacidad"
              className="w-[700px] h-auto object-contain"
            />

            {/* Botón “Aceptar” justo debajo del GIF */}
            <button
              onClick={handleAcceptPrivacy}
              className="
                mt-4
                bg-orange-600
                hover:bg-orange-700
                text-white
                px-8
                py-1
                rounded-md
                shadow-md
                transition-colors
              "
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
      {/* ============================== */}

      <div className="Conteiner">
        {!session ? (
          <LandingPage />
        ) : (
          <>
            <SubMenu />
            {isAdmin && (
              <div className="max-w-3xl mx-auto p-4">
                <Navbar />
              </div>
            )}
            {/* <CardsList /> */}
            <BannerPublicitarios />
          </>
        )}
        <FooterComponents />
      </div>
    </>
  );
};

export default Home;
