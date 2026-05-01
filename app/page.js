// page.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import HeadComponents from "./components/HeadComponents";
import SubMenu from "./components/Submenu";
import BannerPublicitarios from "./components/BannerPublicitario";
import FooterComponents from "./components/FooterComponents";
import LandingPage from "./components/LandingPage";

const Home = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const skipLoader = searchParams.get("logout") === "1";

  const [isClient, setIsClient] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const loaderVideoRef = useRef(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const userKey = session?.user?.email
    ? `hidePrivacyModal_${session.user.email}`
    : null;

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    if (loaderVideoRef.current) {
      loaderVideoRef.current.muted = true;
      loaderVideoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    setIsClient(true);

    if (skipLoader) {
      setShowLoader(false);
      return;
    }

    if (!session) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    setShowLoader(false);
  }, [session, skipLoader]);

  useEffect(() => {
    if (session && userKey) {
      const hideFlag = localStorage.getItem(userKey);
      if (hideFlag !== "true") {
        setShowPrivacyModal(true);
      }
    }
  }, [session, userKey]);

  useEffect(() => {
    if (showPrivacyModal) AOS.refresh();
  }, [showPrivacyModal]);

  const handleAcceptPrivacy = () => {
    if (userKey) {
      localStorage.setItem(userKey, "true");
    }
    setShowPrivacyModal(false);
  };

  if (!isClient) return null;

  if (showLoader && !session && !skipLoader) {
    return (
      <>
        <HeadComponents />
        <div className="fixed top-0 left-0 w-full h-full z-[9999]">
          <video
            ref={loaderVideoRef}
            src="/assets/LandingPage/Videos/cierrevoz.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <HeadComponents />

      {session && showPrivacyModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-80">
          <div className="flex flex-col items-center" data-aos="zoom-in">
            <Image
              src="/assets/Gifs/LP-02.png"
              alt="Aviso de Privacidad"
              width={1000}
              height={1414}
              className="w-[1000px] h-auto object-contain"
            />

            <button
              onClick={handleAcceptPrivacy}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-8 py-1 rounded-md shadow-md transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <div className="Conteiner">
        {!session ? (
          <LandingPage />
        ) : (
          <>
            <SubMenu />
            <BannerPublicitarios />
          </>
        )}
        <FooterComponents />
      </div>
    </>
  );
};

export default Home;
