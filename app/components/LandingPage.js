// components/LandingPage.jsx
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Link from 'next/link';

import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [showPodcastModal, setShowPodcastModal] = React.useState(false);
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Safari requiere que muted se aplique via JS para que autoPlay funcione
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out'
    });

    // Refrescar AOS cuando se hace scroll
    window.addEventListener('scroll', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('scroll', () => {
        AOS.refresh();
      });
    };
  }, []);

  // Slides para el slider principal
  const bannerSlides = [
    {
      img: "/assets/LandingPage/Page/LP-20.png",
      title: "Versión",
      highlight: "Web",
      highlightBg: "bg-[#B54B00]",
      caption: "Ya disponible",
      descriptionParts: [
        "Elabora tus reportes anatómicos sobre patologías del ",
        { text: "Sistema Nervioso Periférico", bold: true },
        " gracias a la selección de opciones y añade los registros neurofisiológicos de tus casos clínicos."
      ]
    },
    {
      img: "/assets/LandingPage/Page/LP-21.png",
      title: "Versión",
      highlight: "App",
      highlightBg: "bg-[#B54B00]",
      caption: "A partir del 16 Septiembre 2025",
      descriptionParts: [
        { text: "Disponible en Latinoamérica", bold: true, block: true },
        { text: "con todo el contenido.", bold: false, block: true }
      ]
    },

    {
      img: "/assets/LandingPage/Page/LP-16.png",
      title: "Versión",
      highlight: "Web",
      highlightBg: "bg-[#B54B00]",
      caption: "Ya disponible",
      descriptionParts: [
        "Elabora tus reportes anatómicos sobre patologías del ",
        { text: "Sistema Nervioso Periférico", bold: true },
        " gracias a la selección de opciones y añade los registros neurofisiológicos de tus casos clínicos."
      ]
    },
  ];

  // Otras imágenes y cards…
const infoCards = [
  {
    img: "/assets/LandingPage/Page/LP-11.png",
    label: "Videos",
    title: "Información Médica",
    href: "https://www.youtube.com/embed/eI1tOJbnj-E?autoplay=1",
    action: "video"
  },
  {
    img: "/assets/LandingPage/Page/LP-12.png",
    label: "Manuales",
    title: "Información Médica",
    href: "/pdfs/MANUALECNmEDXprocopia.pdf",
    download: "Manuales-MEDX.pdf"
  },
  {
    img: "/assets/LandingPage/Page/LP-13.png",
    label: "Podcast",
    title: "Información Médica",
    href: "assets/LandingPage/Videos/podcast.m4a", 
    action: "podcast" 
  }
];



  return (
    <>
      <motion.div
        className="w-full bg-black bg-center bg-fixed text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Vídeo introductorio */}
        <div className="max-w-screen-xl mx-auto px-4 pt-12" data-aos="fade-up">
          <video
            ref={videoRef}
            src="/assets/LandingPage/Videos/medx-texto_cambios.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full mx-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Sección App Móvil */}
        <section className="max-w-screen-xl mx-auto px-4 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a
              href="https://play.google.com/store/apps/details?id=com.medxproapp"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 block"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="relative w-full transform transition-transform duration-700 hover:scale-105">
                <Image
                  src="/assets/LandingPage/Page/App_Android.png"
                  alt="Disponible en Play Store"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </a>
            <a
              href="https://apps.apple.com/mx/app/medxpro/id6754785855"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 block"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="relative w-full transform transition-transform duration-700 hover:scale-105">
                <Image
                  src="/assets/LandingPage/Page/App_Apple.png"
                  alt="Disponible en App Store"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </a>
          </div>
        </section>

        {/* Herramientas de diagnóstico */}
        <section className="max-w-screen-xl mx-auto px-4 py-12" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="bg-black col-span-2 overflow-hidden rounded-3xl shadow-lg"
              data-aos="fade-down"
              data-aos-duration="800"
            >
             <a
                  href="/AvisoPrivacidad"
                >
              <Image
                src="/assets/LandingPage/Page/LP-02.png"
                alt="Banner top"
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
              />
              </a>
            </div>
            <div
              className="bg-black overflow-hidden rounded-3xl shadow-lg"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              <Image
                src="/assets/LandingPage/Page/LP-03.png"
                alt="Diagnóstico neuromuscular A"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div
              className="overflow-hidden rounded-3xl shadow-lg"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="400"
            >
              <a>

              <Image
                src="/assets/LandingPage/Page/LP-04.png"
                alt="Diagnóstico neuromuscular B"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              </a>
            </div>
            <div
              className="bg-black col-span-2 rounded-3xl shadow-lg relative"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                {infoCards.map((card, i) => {
                  const content = (
                    <div
                      className="relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer transition-all duration-500"
                      style={{ filter: 'drop-shadow(0 0 0px transparent)', transition: 'filter 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 18px rgba(200,200,200,0.5))'}
                      onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)'}
                      data-aos="zoom-in"
                      data-aos-delay={i * 200}
                      data-aos-duration="1000"
                    >
                      <div className="transform transition-transform duration-700 group-hover:scale-105">
                        <Image
                          src={card.img}
                          alt={card.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"
                        />
                      </div>
                    </div>
                  );

                  if (card.action === "video") {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setVideoUrl(card.href);
                          setShowVideoModal(true);
                        }}
                      >
                        {content}
                      </div>
                    );
                  }

                  if (card.action === "podcast") {
                    return (
                      <div key={i} onClick={() => setShowPodcastModal(true)}>
                        {content}
                      </div>
                    );
                  }

                  if (card.href) {
                    const isExternal = card.href.startsWith("http");
                    const downloadAttr = card.download ? { download: card.download } : {};

                    return isExternal ? (
                      <a key={i} href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                        {content}
                      </a>
                    ) : (
                      <a key={i} href={card.href} className="block" {...downloadAttr}>
                        {content}
                      </a>
                    );
                  }

                  return <div key={i}>{content}</div>;
                })}
              </div>
           
            </div>
          </div>
        </section>

        {/* Sección interactiva con enlaces de pago */}
        <section className="max-w-screen-xl mx-auto px-4 py-1" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              {/* Manuales */}
              <div
                className="bg-white overflow-hidden rounded-3xl shadow-lg"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <Image
                  src="/assets/LandingPage/Page/LP-06.png"
                  alt="Manuales Interactivos"
                  width={600}
                  height={200}
                  className="w-full h-auto object-cover rounded-3xl"
                />
              </div>
              {/* Potenciales Evocados */}
              <div
                className="bg-gray-50 overflow-hidden rounded-3xl shadow-lg"
                data-aos="zoom-in"
                data-aos-duration="800"
              >
                <a
                   href="pdfs/mEDXproMANUALPOTENCIALESEVOCADOSPREVIEW.pdf"
                >
                  <Image
                    src="/assets/LandingPage/Page/LP-09.png"
                    alt="Potenciales Evocados"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {/* Estudios de Conducción Nerviosa */}
              <div
                className="bg-white overflow-hidden rounded-3xl shadow-lg"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                <a
                  href="pdfs/mEDXproMANUALESTUDIODECONDUCCIÓNNERVIOSAPREVIEW.pdf"
                >
                  <Image
                    src="/assets/LandingPage/Page/LP-08.png"
                    alt="Estudios de Conducción Nerviosa"
                    width={600}
                    height={350}
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                </a>
              </div>
              {/* Monitoreo Trasquirúrgico */}
              <div
                className="bg-white overflow-hidden rounded-3xl shadow-lg"
                data-aos="flip-up"
                data-aos-duration="800"
              >
                <a
                  href="pdfs/mEDXproMANUALMONITOREOINTRAOPERATORIOPREVIEW.pdf"
                >
                <Image
                  src="/assets/LandingPage/Page/LP-07.png"
                  alt="Monitoreo Trasquirúrgico"
                  width={600}
                  height={250}
                  className="w-full h-auto object-cover rounded-3xl"
                />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Slides - Imagen grande arriba y 2 columnas */}
        <section className="max-w-screen-xl mx-auto px-4 pt-12 pb-6" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primera imagen - Ocupa todo el ancho */}
            <div
              className="md:col-span-2 relative overflow-hidden rounded-3xl shadow-2xl group"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="relative w-full transform transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={bannerSlides[2].img}
                  width={1600}
                  height={800}
                  alt="Banner 1"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Segunda imagen - Columna izquierda */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="relative w-full transform transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={bannerSlides[1].img}
                  width={1200}
                  height={700}
                  alt="Banner 2"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Tercera imagen - Columna derecha */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="relative w-full transform transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={bannerSlides[0].img}
                  width={1200}
                  height={700}
                  alt="Banner 3"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección con imágenes adicionales - Grid Responsivo */}
        <section className="max-w-screen-xl mx-auto px-4 pt-6 pb-6" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                <Image
                  src="/assets/LandingPage/Page/LP-18.png"
                  alt="Imagen 18"
                  width={1000}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                <Image
                  src="/assets/LandingPage/Page/LP-17.png"
                  alt="Imagen 17"
                  width={1000}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              data-aos="fade-up-right"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                <Image
                  src="/assets/LandingPage/Page/LP-22.png"
                  alt="Imagen 22"
                  width={1000}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              data-aos="fade-down-left"
              data-aos-duration="1000"
              data-aos-delay="600"
            >
              <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                <Image
                  src="/assets/LandingPage/Page/LP-19.png"
                  alt="Imagen 19"
                  width={1000}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

{showVideoModal && (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
    <div className="relative w-full max-w-3xl p-4">
      <button
        onClick={() => setShowVideoModal(false)}
        className="absolute top-2 right-4 text-white text-3xl font-bold z-10"
      >
        &times;
      </button>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={videoUrl}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-[70vh] rounded-xl"
        />
      </div>
    </div>
  </div>
)}

{showPodcastModal && (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center px-4">
    <div className="relative w-full max-w-lg bg-[#1a1a1a] rounded-3xl p-8 shadow-2xl">
      <button
        onClick={() => setShowPodcastModal(false)}
        className="absolute top-4 right-5 text-white text-3xl font-bold z-10 hover:text-red-500 transition-colors"
      >
        &times;
      </button>
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/assets/LandingPage/Videos/L_V_S_Gris.png"
          alt="Podcast"
          width={300}
          height={300}
          className="rounded-2xl w-48 h-48 object-cover shadow-lg"
        />
        <div className="text-center">
          <p className="text-[#B54B00] text-sm font-semibold uppercase tracking-widest mb-1">Podcast</p>
          <h3 className="text-white text-xl font-bold">Pronóstico funcional</h3>
          <p className="text-gray-400 text-sm mt-1">mEDXpro</p>
        </div>
        <audio
          src="/assets/LandingPage/Videos/podcast.m4a"
          controls
          autoPlay
          className="w-full rounded-xl"
          style={{ accentColor: '#B54B00' }}
        />
      </div>
    </div>
  </div>
)}


      </motion.div>

      {/* Global overrides for Swiper, marquee, etc. */}
     <style jsx global>{`
        /* Marquee */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }

        /* Fashion slider buttons */
        .fashion-slider-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          z-index: 10;
          cursor: pointer;
        }
        .fashion-slider-button-prev {
          left: 16px;
        }
        .fashion-slider-button-next {
          right: 16px;
        }
        .fashion-slider-button svg {
          display: block;
          width: 100%;
          height: 100%;
          fill: white;
          stroke: white;
        }
        .fashion-slider-button-next .fashion-slider-svg-circle-wrap circle {
          fill: none;
          stroke: white;
          stroke-width: 2;
        }
 .swiper-pagination,
  .swiper-pagination-bullet {
    display: none !important;
  }

      `}</style>

    </>
  );
}
