// page.js
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import HeadComponents from "./components/HeadComponents";
import SubMenu from "./components/Submenu";
import Navbar from "./components/Navbar";
import CardsList from "./components/CardsList";
import BannerPublicitarios from "./components/BannerPublicitario";
import FooterComponents from "./components/FooterComponents";
import LandingPage from "./components/LandingPage";

const Home = () => {
  const { data: session } = useSession();

  // Solo cliente
  const [isClient, setIsClient] = useState(false);
  // Controla visualización del loader
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Después de 1 segundo, oculta el loader
    const t = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!isClient) return null;

  // 🚀 Loader fijo de 1 segundo
  if (showLoader) {
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

  // 🚀 Aquí va el contenido real de tu app
  const isAdmin = session?.user?.roles === "admin";

  return (
    <>
      <HeadComponents />
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
            <CardsList />
            <BannerPublicitarios />
          </>
        )}
        <FooterComponents />
      </div>
    </>
  );
};

export default Home;
