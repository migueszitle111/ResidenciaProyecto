import Image from "next/image";
import { useState } from "react";
import Medianos from "./Medianos/Medianos";




const MenuBotonesPt = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [subMenuVisibility, setSubMenuVisibility] = useState({});
    const [visibleSubMenu, setVisibleSubMenu] = useState(null);



    const Potenciales = [
    {
        Menu: "Somatosensoriales",
        Submenu: [
        "Nervios Medianos",
        "Nervios Ulnar",
        "Tibial",
        "Peroneo",
        "Nervios Trigéminos",
        "Pudendo",
        "Radial Superficial",
        "Nervios Musculocutáneo",
        "Femorocutáneo o lateral",
        "Safeno",
        "Peroneo superficial",
        "Sural",
        "Plantar",
        "Calcáneo",
        "Segmentarios Dermatomales",
    ],
    },
    {
        Menu: "Auditivos",
        Submenu: [
        "Latencia Corta Tallo Cerebral",
        "Latencia Mediana",
        "Latencia Larga",
    ],
    },
    { Menu: "Visuales", Submenu: ["Damero", "Leds"] },
    { Menu: "Motores", Submenu: ["Superiores", "Inferiores", "Faciales"] },
    {
        Menu: "Cognitivos Relacionados a Eventos",
        Submenu: ["P300 Visual", "P300 Auditivo"],
    },
    ];
    //Matriz de opciones de Pruebas especiales  y submenús


    const handleClick = (option) => {
        setSelectedOption(option);
    };

    const toggleSubMenuVisibility = (menuOption) => {
        setVisibleSubMenu((prevMenu) =>
        prevMenu === menuOption ? null : menuOption
        );
    };

    return (
        <div>
        <div className="BannerTitlepage">
            <div>Potenciales Evocados</div>
        </div>
        <div className="flex">
            <div className="w-1/4 max-h-full">
            <div className="p-1">
                <div className="p-1">
                <div className="bg-[#3f3c3c] mt-1 p-2 rounded-bl-lg rounded-2xl text-white text-justify flex flex-col truncate lg:truncate xl:truncate">
                    <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                    Potenciales Evocados
                    </h2>
                    {Potenciales.map((menuOption, menuIndex) => (
                    <div key={menuIndex} className="ml-4">
                        <button
                        className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-[#404040] text-white py-2 lg:py-3 rounded truncate lg:truncate xl:truncate ${
                            visibleSubMenu === menuOption.Menu ? "bg-opacity-50" : ""
                        }`}
                        onClick={() => toggleSubMenuVisibility(menuOption.Menu)}
                        >
                        › {menuOption.Menu}
                        </button>
                        {visibleSubMenu === menuOption.Menu && (
                        <div>
                            {menuOption.Submenu.map((submenuOption, submenuIndex) => (
                            <button
                                key={submenuIndex}
                                className={`w-full flex flex-col text-sm lg:w-auto text-left lg:text-justify py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                                selectedOption === submenuOption
                                    ? "text-orange-600"
                                    : "text-white"
                                } hover:text-orange-600`}
                                onClick={() => handleClick(submenuOption)}
                            >
                                {submenuOption}
                            </button>
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>

            <div className="w-3/4 max-h-full">
            {!selectedOption && (
                <div className="flex min-h-screen flex-col items-center p-10">
                <Image
                    src="/L_B_Blanco.svg"
                    alt="Logo de la empresa"
                    width={120}
                    height={120}
                    className="w-52 h-52"
                />
                <h1 className="text-white text-4xl">Valores</h1>
                <p className="pt-16 text-white text-center text-xl italic">
                    Bienvenido a la sección de Técnicas en donde podrá contar a
                    disposición de la información que se encuentran disponibles en
                    nuestra plataforma.
                </p>
                </div>
            )}
            {selectedOption && (
                <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
                {selectedOption === "Nervios Medianos" && <Medianos />}
                
                </div>
            )}
            </div>
        </div>
        </div>
    );
};

export default MenuBotonesPt;
