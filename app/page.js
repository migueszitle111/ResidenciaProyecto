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

  // Mostrar el modal cuando haya sesión y no se haya marcado “no volver a mostrar”
  useEffect(() => {
    if (session) {
      const hideFlag = localStorage.getItem("hidePrivacyModal");
      if (hideFlag !== "true") {
        setShowPrivacyModal(true);
      }
    }
  }, [session]);

  // Refrescar AOS cuando aparece el modal
  useEffect(() => {
    if (showPrivacyModal) AOS.refresh();
  }, [showPrivacyModal]);

  // Cierra solo esta vez
  const handleCloseModal = () => {
    setShowPrivacyModal(false);
  };

  // “No volver a mostrar”
  const handleDontShowAgain = () => {
    localStorage.setItem("hidePrivacyModal", "true");
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
          <div
            className="relative max-w-3xl w-[90%] mx-4"
            data-aos="zoom-in"
          >
            {/* GIF de aviso de privacidad */}
            <img
              src="/assets/Gifs/AVISO DE PRIVACIDAD2.gif"
              alt="Aviso de Privacidad"
              className="w-full h-auto object-contain"
            />

             {/* Botón “✕” con diseño sobre la imagen */}
            <button
              onClick={handleCloseModal}
              className="
                absolute top-1 right-2 
                bg-red-600 bg-opacity-80 
                hover:bg-red-700 
                text-white 
                rounded-full 
                w-10 h-5 
                flex items-center justify-center 
                shadow-lg 
                transition-colors
              "
              aria-label="Cerrar"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            {/* Botón “No volver a mostrar” con diseño sobre la imagen */}
            <button
              onClick={handleDontShowAgain}
              className="
                absolute bottom-2 right-12
                bg-red-600 bg-opacity-70
                hover:bg-red-700 
                text-white 
                px-3 py-0
                rounded-md 
                shadow-md 
                transition-colors
              "
            >
              No volver a mostrar
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
