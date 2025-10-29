// components/LandingPage.jsx
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Link from 'next/link';

import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  
  useEffect(() => {
    AOS.init({ once: false, mirror: false, duration: 1000 });
  }, []);

  // Intercepta clics a Stripe y muestra aviso de facturación
  const handlePaymentClick = (e, url) => {
    e.preventDefault();
    alert(
      "Descarga politicas de privacidad\n\n" 
      
    );
    window.location.href = url;
  };

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
        { text: "Disponible en México", bold: true, block: true },
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
    href: "https://f.io/S6WK6rOL", // o tu .mp4
    action: "video"               // <- clave para mostrar modal
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
    title: "Información Médica"
  }
];



  return (
    <>
      <div className="w-full bg-black bg-center bg-fixed text-white">
        {/* Vídeo introductorio */}
        <div className="max-w-screen-xl mx-auto px-4 pt-12" data-aos="fade-up">
          <video
            src="/assets/LandingPage/Videos/medx-texto_cambios.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full mx-auto rounded-2xl shadow-lg"
          />
        </div>

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
                  //href="pdfs/POLÍTICASDEPRIVACIDADmEDXpro.pdf"
                  // onClick={e => handlePaymentClick(e, "pdfs/POLÍTICASDEPRIVACIDADmEDXpro.pdf")}
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
              <a
                  // href="https://buy.stripe.com/6oU4gzg9ugvufgO5uYafS0c"
                  // onClick={e => handlePaymentClick(e, "https://buy.stripe.com/6oU4gzg9ugvufgO5uYafS0c")}
                >

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
              className="bg-black col-span-2 overflow-hidden rounded-3xl shadow-lg"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <a href="">
                <Image
                  src="/assets/LandingPage/Page/LP-05.png"
                  alt="Banner bottom"
                  width={1200}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </a>
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
                  // onClick={e => handlePaymentClick(e, "https://buy.stripe.com/00w3cv9L63II8SqbTmafS0b")}
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
                  // onClick={e => handlePaymentClick(e, "https://buy.stripe.com/28EdR95uQbbad8G8HaafS0a")}
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

{/* Info cards */}
<section className="max-w-screen-xl mx-auto px-4 pt-4 pb-4" data-aos="fade-up">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {infoCards.map((card, i) => {
      const content = (
        <div
          className="overflow-hidden rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-700 cursor-pointer"
          data-aos="zoom-in"
          data-aos-delay={i * 200}
          data-aos-duration="1000"
        >
          <Image
            src={card.img}
            alt={card.title}
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
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

      if (card.href) {
        const isExternal = card.href.startsWith("http");
        const downloadAttr = card.download ? { download: card.download } : {};

        return isExternal ? (
          <a
            key={i}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
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
        <video src={"assets/LandingPage/Videos/VideoSeccion.mp4"} controls autoPlay className="w-full h-[70vh] rounded-xl" />

      </div>
    </div>
  </div>
)}


      </div>

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
