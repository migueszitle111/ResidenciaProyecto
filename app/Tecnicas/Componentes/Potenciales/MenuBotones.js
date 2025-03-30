import Image from "next/image";
import { useState } from "react";
import Medianos from "./Medianos/Medianos";
import Ulnar from "./Ulnar/Ulnar";

import mostrarMenuIcon from "/public/I_In.svg"; // Reemplaza con la ruta real
import ocultarMenuIcon from "/public/I_Out.svg"; // Reemplaza con la ruta real

const MenuBotonesPt = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [visibleSubMenu, setVisibleSubMenu] = useState(null);
    const [menuVisible, setMenuVisible] = useState(true);

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

    const handleClick = (option) => {
        setSelectedOption(option);
        setMenuVisible(false); // Ocultar el menú al seleccionar una opción
    };

    const toggleSubMenuVisibility = (menuOption) => {
        setVisibleSubMenu((prevMenu) =>
            prevMenu === menuOption ? null : menuOption
        );
    };

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div>
            <div className="BannerTitlepage">
                <div>Potenciales Evocados</div>
            </div>

            {/* Botón para ocultar/mostrar menú con imagen */}
            <button
                className="bg-orange-500 text-white px-4 py-2 m-2 rounded-full flex items-center gap-2 "
                onClick={toggleMenuVisibility}
            >
                <Image
                    src={menuVisible ? ocultarMenuIcon : mostrarMenuIcon}
                    alt={menuVisible ? "Ocultar Menú" : "Mostrar Menú"}
                    width={34}
                    height={34}
                    style={{ filter: 'invert(1)' }}
                />
                {menuVisible ? " " : " "}
            </button>

            <div className="flex">
                {/* Menú desplegable */}
                {menuVisible && (
                    <div className="w-1/5 max-h-full bg-[#3f3c3c] text-white p-4 rounded-2xl">
                        <h2 className="text-lg mb-4">Potenciales Evocados</h2>
                        {Potenciales.map((menuOption, menuIndex) => (
                            <div key={menuIndex} className="ml-2">
                                <button
                                    className="w-full text-left py-2 hover:text-orange-600"
                                    onClick={() => toggleSubMenuVisibility(menuOption.Menu)}
                                >
                                    › {menuOption.Menu}
                                </button>
                                {visibleSubMenu === menuOption.Menu && (
                                    <div className="ml-4">
                                        {menuOption.Submenu.map((submenuOption, submenuIndex) => (
                                            <button
                                                key={submenuIndex}
                                                className={`w-full text-sm text-left py-1 hover:text-orange-600 ${
                                                    selectedOption === submenuOption ? "text-orange-600" : ""
                                                }`}
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
                )}

                {/* Contenido Principal */}
                <div className="w-4/5 max-h-full">
                    {!selectedOption ? (
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
                    ) : (
                        <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
                            {selectedOption === "Nervios Medianos" && <Medianos />}
                            {selectedOption === "Nervios Ulnar" && <Ulnar />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuBotonesPt;
