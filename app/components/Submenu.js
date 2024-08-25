import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../globals.css";

const Submenu = () => {
  const allpages = [
    {
      name: "Valores",
      imagen: "/assets/SubmenuSvg/Valores.svg",
      path: "/Valores",
    },
    {
      name: "Protocolos",
      imagen: "/assets/SubmenuSvg/Protocolos.svg",
      path: "/Protocolos",
    },
    {
      name: "Videos",
      imagen: "/assets/SubmenuSvg/Videos.svg",
      path: "/NoDisponible",
    },
    {
      name: "Podcast",
      imagen: "/assets/SubmenuSvg/Podcast.svg",
      path: "/NoDisponible",
    },
    {
      name: "Perlas",
      imagen: "/assets/SubmenuSvg/Perlas.svg",
      path: "/Perlas",
    },
    {
      name: "Ultrasonidos",
      imagen: "/assets/SubmenuSvg/Ultrasonido.svg",
      path: "/Ultrasonido",
    },
    {
      name: "Monitoreo",
      imagen: "/assets/SubmenuSvg/Monitoreo.svg",
      path: "/Monitoreo",
    },
    {
      name: "Patrocinio",
      imagen: "/assets/SubmenuSvg/Patrocinio.svg",
      path: "/Patrocinio",
    },
  ];
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024, // Ajusta el número de elementos para pantallas más grandes (1024px y superiores)
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768, // Ajusta el número de elementos para tabletas y dispositivos más pequeños (768px y superiores)
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // Ajusta el número de elementos para dispositivos móviles (480px y superiores)
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div>
      <nav className="p-8 text-white">
        <Slider {...settings}>
          {allpages.map((page) => (
            <li key={page.name} flex space-x-20 justify-center aling-center>
              <a href={page.path}>
                <button className="buttonSmenu flex items-center space-x-2">
                  <Image
                    src={page.imagen}
                    alt={page.name}
                    width={50}
                    height={50}
                  />
                  {page.name}
                </button>
              </a>
            </li>
          ))}
        </Slider>
      </nav>
    </div>
  );
};

export default Submenu;
