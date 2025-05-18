// components/LandingPage.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Parallax,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/parallax";

import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ once: false, mirror: false, duration: 1000 });
  }, []);

     // 1) Define tus slides con un array de objetos
// components/LandingPage.jsx
// …
const bannerSlides = [
  {
    img: "/assets/LandingPage/laptop.png",    // antes: laptop.png
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
    img: "/assets/LandingPage/movil.png",    // antes: movil.png
    title: "Versión",
    highlight: "App",
    highlightBg: "bg-[#B54B00]",
    caption: "A partir del 16 Septiembre 2025",
    descriptionParts: [
       { text: "Disponible en México", bold: true, block: true },
      { text: "con todo el contenido.", bold: false, block: true }
    ]
  }
];
  // Imágenes para el collage (marquee)
  const marqueeImages = [
    "/assets/LandingPage/reporte1.png",
    "/assets/LandingPage/reporte2.png",
    "/assets/LandingPage/fondo.png",
    "/assets/LandingPage/movil.png",
    "/assets/LandingPage/laptop.png",
  ];

  const fashionSlides = [
    { title: "card1", img: "/assets/LandingPage/fondo.png", bg: "#9FA051" },
    { title: "card2", img: "/assets/LandingPage/fondo.png", bg: "#9B89C5" },
    { title: "card3", img: "/assets/LandingPage/fondo.png", bg: "#D7A594" },
    { title: "card4", img: "/assets/LandingPage/fondo.png", bg: "#7AB894" },
    { title: "card5", img: "/assets/LandingPage/fondo.png", bg: "#C57A94" },
  ];

  const infoCards = [
    { img: "/assets/LandingPage/Page/LP-11.png", label: "Podcasts", title: "Información Médica" },
    { img: "/assets/LandingPage/Page/LP-12.png", label: "Videos", title: "Información Médica" },
    { img: "/assets/LandingPage/Page/LP-13.png", label: "Reportes", title: "Información Médica" },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <div
        className="w-full bg-black bg-center bg-fixed text-white"
       
      >
              {/* ===== Vídeo al inicio ===== */}
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

    {/* ===== Herramientas de diagnóstico ===== */}
<section
  className="max-w-screen-xl mx-auto px-4 py-12"
  data-aos="fade-up"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* 1) Imagen full width (baja desde arriba) */}
    <div
      className="bg-black col-span-2 overflow-hidden rounded-3xl shadow-lg"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <Image
        src="/assets/LandingPage/Page/LP-02.png"
        alt="Banner top"
        width={1200}
        height={400}
        className="w-full h-auto object-cover"
      />
    </div>

    {/* 2a) Imagen izquierda (entra desde la derecha) */}
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

    {/* 2b) Imagen derecha (entra desde la izquierda) */}
    <div
      className="overflow-hidden rounded-3xl shadow-lg"
      data-aos="fade-left"
      data-aos-duration="600"
      data-aos-delay="400"
    >
      <Image
        src="/assets/LandingPage/Page/LP-04.png"
        alt="Diagnóstico neuromuscular B"
        width={600}
        height={400}
        className="w-full h-auto object-cover"
      />
    </div>

    {/* 3) Imagen full width final (zoom-in) */}
    <div
      className="bg-black col-span-2 overflow-hidden rounded-3xl shadow-lg"
      data-aos="zoom-in"
      data-aos-duration="800"
      data-aos-delay="200"
    >
      <Image
        src="/assets/LandingPage/Page/LP-05.png"
        alt="Banner bottom"
        width={1200}
        height={400}
        className="w-full h-auto object-cover"
      />
    </div>
  </div>
</section>

{/* ===== Otras secciones interactivos ===== */}
<section
  className="max-w-screen-xl mx-auto px-4 py-1"
  data-aos="fade-up"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* ───────── Columna IZQUIERDA ───────── */}
    <div className="flex flex-col gap-5">
      {/* Manuales interactivos */}
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
        <Image
          src="/assets/LandingPage/Page/LP-09.png"
          alt="Potenciales Evocados"
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-3xl"
        />
      </div>
    </div>

    {/* ───────── Columna DERECHA ───────── */}
    <div className="flex flex-col gap-5">
      {/* Estudios de Conducción Nerviosa */}
      <div
        className="bg-white overflow-hidden rounded-3xl shadow-lg"
        data-aos="fade-left"
        data-aos-duration="800"
      >
        <Image
          src="/assets/LandingPage/Page/LP-08.png"
          alt="Estudios de Conducción Nerviosa"
          width={600}
          height={350}
          className="w-full h-auto object-cover rounded-3xl"
        />
      </div>
      {/* Monitoreo Trasquirúrgico */}
      <div
        className="bg-white overflow-hidden rounded-3xl shadow-lg"
        data-aos="flip-up"
        data-aos-duration="800"
      >
        <Image
          src="/assets/LandingPage/Page/LP-07.png"
          alt="Monitoreo Trasquirúrgico"
          width={600}
          height={250}
          className="w-full h-auto object-cover rounded-3xl"
        />
      </div>
    </div>
  </div>
</section>
 
        {/* ===== Banner Slider ===== */}
        <div className="max-w-screen-xl mx-auto px-4 -mt-5">
       <Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={30}
  centeredSlides
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  className="h-screen"
>
  {bannerSlides.map((slide, idx) => (
   <SwiperSlide key={idx} className="cursor-pointer">
  <div className="h-full flex items-center">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
      {/* TEXTO */}
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white" data-aos="fade-right">
          {slide.title}{" "}
          <span
            className={`inline-block px-4 py-2 text-5xl md:text-7xl text-white rounded ${slide.highlightBg}`}
          >
            {slide.highlight}
          </span>
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-[#B54B00]" data-aos="fade-right" data-aos-delay="200">
          {slide.caption}
        </p>
        <p className="max-w-lg text-base md:text-lg text-white leading-relaxed" data-aos="fade-right" data-aos-delay="400">
         
  {slide.descriptionParts.map((part, i) => {
    // 1) Si es un string, lo sacamos literal
    if (typeof part === "string") {
      return <span key={i}>{part}</span>;
    }
    // 2) Si es objeto, aplicamos font-bold y/o block según las flags
    const classes = [
      part.bold ? "font-bold" : "",
      part.block ? "block" : ""
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span key={i} className={classes}>
        {part.text}
      </span>
    );
  })}
        </p>
      </div>
      {/* IMAGEN */}
      <div className="flex items-center justify-center" data-aos="fade-left">
        <Image
          src={slide.img}
          width={600}
          height={400}
          alt={`${slide.title} view`}
          className="object-contain"
        />
      </div>
    </div>
  </div>
</SwiperSlide>

  ))}
</Swiper>


        </div>
         {/* ===== Info Cards ===== */}
        <section className="max-w-screen-xl mx-auto px-4  pt-8 pb-4" data-aos="fade-up">
          
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {infoCards.map((card, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-700"
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
    ))}
  </div>
        </section>

{ /* ===== Masonry a 2 columnas (3 imágenes c/u) ===== */ }
<section
  className="max-w-screen-xl mx-auto px-4 py-10"
  data-aos="fade-up"
>
  <div className="flex flex-col md:flex-row md:space-x-8">
    { /* — Columna 1 — */ }
    <div className="flex flex-col space-y-8 md:w-1/2">
      {/* 1 */}
      <div
        className="relative h-96 overflow-hidden rounded-3xl shadow-lg"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <Image
          src="/assets/LandingPage/Page/LP-17.png"
          alt="Campo total"
          fill
          className="object-cover"
        />
      </div>

      {/* 2 */}
      <div
        className="relative h-48 overflow-hidden rounded-3xl shadow-lg"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-delay="150"
      >
        <Image
          src="/assets/LandingPage/Page/LP-19.png"
          alt="Potenciales Evocados"
          fill
          className="object-cover"
        />
      </div>

      {/* 3 */}
      <div
        className="relative h-96 overflow-hidden rounded-3xl shadow-lg"
        data-aos="zoom-in"
        data-aos-duration="800"
        data-aos-delay="300"
      >
        <Image
          src="/assets/LandingPage/Page/LP-21.png"
          alt="MEDXpro SHOP"
          fill
          className="object-cover"
        />
      </div>
    </div>

    { /* — Columna 2 — */ }
    <div className="flex flex-col space-y-8 md:w-1/2">
      {/* 4 */}
      <div
        className="relative h-96 overflow-hidden rounded-3xl shadow-lg"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-delay="450"
      >
        <Image
          src="/assets/LandingPage/Page/LP-18.png"
          alt="Ya Disponible"
          fill
          className="object-cover"
        />
      </div>

      {/* 5 */}
      <div
        className="relative h-96 overflow-hidden rounded-3xl shadow-lg"
        data-aos="flip-up"
        data-aos-duration="800"
        data-aos-delay="600"
      >
        <Image
          src="/assets/LandingPage/Page/LP-20.png"
          alt="Próximamente"
          fill
          className="object-cover"
        />
      </div>

      {/* 6 */}
      <div
        className="relative h-48 overflow-hidden rounded-3xl shadow-lg"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="750"
      >
        <Image
          src="/assets/LandingPage/Page/LP-22.png"
          alt="Manuales Físicos"
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
</section>

        {/* ===== Scroll-Triggered Sections ===== */}
        <section className="max-w-screen-xl mx-auto px-4 my-20">

          {/* ===== Collage Marquee ===== */}
          {/* <div data-aos="fade-up" className="overflow-hidden py-8">
            <div className="inline-flex marquee gap-4"> */}
              {/* duplicamos el array para scroll infinito */}
              {/* {[...marqueeImages, ...marqueeImages].map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 h-72 relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Collage ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div> */}

        

          {/* ===== Fashion Slider ===== */}
          
        </section>

      
      </div>

      {/* ==== estilos globales override ==== */}
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
