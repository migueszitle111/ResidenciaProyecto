import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Style.css";

const CardsList = () => {
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";
  const [topics, setTopics] = useState([]);
  const [animationActive, setAnimationActive] = useState(false);
  const firstCardRef = useRef(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/topics", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        console.log(data.topics);
        setTopics(data.topics || []);
        setAnimationActive(true);
      } catch (error) {
        console.error("Error loading topics: ", error);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = firstCardRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight - 50;

        if (isVisible && !animationActive) {
          setAnimationActive(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationActive]);

  return (
    
    <>
      <div style={{
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: "20px",
            }}>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
      {Array.isArray(topics) &&
        topics.map((t, index) => (
          <div
            key={t._id}
            ref={index === 0 ? firstCardRef : null}
            className={`relative  ${
              animationActive ? "animate-slideInRight" : ""
            }`}
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            <div className="Conteiner relative overflow-hidden bg-black text-white rounded-tr-lg rounded-bl-lg ">
              <img
                src={t.imageUrl}
                alt={t.title}
                className="w-full h-64 object-cover rounded-tr-lg rounded-bl-lg grayscale"
              />
              <div
                className="absolute top-0 left-0 p-5 bg-black bg-opacity-95 w-70"
                style={{
                  borderRadius: "0px 0px 20px 0px", // Establecer diferentes esquinas
                }}
              >
                <div>
                  <div className="flex items-center">
                    <img
                      src={"./I_Brain_orange.png"}
                      width={50}
                      height={50}
                      className="rounded-tr-lg rounded-bl-lg"
                    />
                    <h2
                      style={{
                        fontFamily: "Monteserrat-bold, sans-serif",
                        fontSize: "2.5rem",
                        marginLeft: "16px", // Ajusta el margen según tus preferencias
                        marginTop: "8px", // Ajusta la distancia entre la imagen y el título
                        borderBottomRightRadius: 0, // Evita que la esquina circular afecte aquí
                      }}
                      className="title text-3xl mb-6"
                    >
                      {t.title}
                    </h2>
                  </div>
                  <div
                    style={{
                      fontFamily: "Monteserrat, sans-serif",
                      color: "#808080",
                      overflow: "hidden",   // Oculta el exceso de contenido
                      maxWidth: "400px",
                    }}
                    className="text-white text-justify mt-1"
                  >
                    {t.description}
                  </div>

                  {t.title.toLowerCase() === "educacion" && (
                    <Link
                      href={`/Educacion`}
                      className="text-orange-500 mt-4 block hover:underline"
                    >
                      Ver más
                    </Link>
                  )}
                  {t.title.toLowerCase() === "reporte" && (
                    <Link
                      href={`/Reporte`}
                      className="text-orange-500 mt-4 block hover:underline"
                    >
                      Ver más
                    </Link>
                  )}
                   {t.title.toLowerCase() === "evento" && (
                    <Link
                      href={`/Evento`}
                      className="text-orange-500 mt-4 block hover:underline"
                    >
                      Ver más
                    </Link>
                  )}
                </div>

                {isAdmin && (
                  <div className="flex gap-2 mt-7">
                    <RemoveBtn id={t._id} className="text-white" size={24} />
                    <Link href={`/EditarTopics/${t._id}`}>
                      <HiPencilAlt
                        className="text-white"
                        size={24}
                        title="Modificar"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
         </Slider>
      </div>
    </>
  );
};

export default CardsList;
