import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "../globals.css";

const Submenu = () => {
  const allpages = [
    {
      name: "Reporte",
      imagen: "/assets/SubmenuSvg/mEDX_Reporte.svg",
      path: "/Reporte",
    },
    {
      name: "Técnicas",
      imagen: "/assets/SubmenuSvg/Protocolos.svg",
      path: "/Tecnicas",
    },
    {
      name: "Videos",
      imagen: "/assets/SubmenuSvg/Videos.svg",
      path: "/AppDisponible",
    },
    {
      name: "Podcast",
      imagen: "/assets/SubmenuSvg/Podcast.svg",
      path: "/AppDisponible",
    },
    {
      name: "Perlas",
      imagen: "/assets/SubmenuSvg/Perlas.svg",
      path: "/AppDisponible",
      // path: "/Perlas",

    },
    {
      name: "Ultrasonido",
      imagen: "/assets/SubmenuSvg/Ultrasonido.svg",
      path: "/AppDisponible",
      // path: "/Ultrasonido",

    },
    {
      name: "Monitoreo",
      imagen: "/assets/SubmenuSvg/Monitoreo.svg",
      path: "/AppDisponible",
      // path: "/Monitoreo",

    },
    {
      name: "Patrocinio",
      imagen: "/assets/SubmenuSvg/Patrocinio.svg",
      path: "/AppDisponible",
      // path: "/Patrocinio",

    },
  ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    centerMode: false, // Desactiva el modo centrado
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <nav className="p-2 text-white">
        <Slider {...settings}>
          {allpages.map((page) => (
            <div key={page.name} className="px-1">
              <a href={page.path}>
                <button className="buttonSmenu">
                  <Image
                    src={page.imagen}
                    alt={page.name}
                    width={50}
                    height={50}
                  />
                  {page.name}
                </button>
              </a>
            </div>
          ))}
        </Slider>
      </nav>
    </div>
  );
};


export default Submenu;
