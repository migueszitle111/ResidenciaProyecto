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

  const [isClient, setIsClient] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setIsClient(true);

    if (!session) {
      const t = setTimeout(() => {
        setShowLoader(false);
      }, 3000); // Solo muestra loader si no hay sesión
      return () => clearTimeout(t);
    } else {
      setShowLoader(false); // Oculta inmediatamente si hay sesión
    }
  }, [session]);

  if (!isClient) return null;

  // 🚀 Mostrar video solo si NO hay sesión
  if (showLoader && !session) {
    return (
      <>
        {/* <HeadComponents /> */}
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
