import Image from "next/image";
import Link from "next/link";

const pages = [
 
  {
    name: "Reporte",
    imagen: "/assets/SubmenuSvg/mEDX_Reporte.svg",
    path: "/Reporte",
  },
  {
    name: "Tecnicas",
    imagen: "/assets/SubmenuSvg/Protocolos.svg",
    path: "/Tecnicas",
  },
  {
    name: "Monitoreo",
    imagen: "/assets/SubmenuSvg/Monitoreo.svg",
    path: "/Monitoreo",
  },
   {
     name: "Educacion",
     imagen: "/assets/IconSVG/Educacion.png",
     path: "/Educacion",
   },
];

const Submenu = () => {
  return (
    <div className="w-full">
      <nav className="flex justify-center p-2 text-white">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {pages.map((page) => (
            <Link key={page.name} href={page.path} className="block">
              <div className="buttonSmenu">
                <Image
                  src={page.imagen}
                  alt={page.name}
                  width={50}
                  height={50}
                />
                {page.name}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Submenu;
