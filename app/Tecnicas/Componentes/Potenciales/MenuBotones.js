import Image from "next/image";
import { useState } from "react";
import mostrarMenuIcon from "/public/assets/IconSVG/I_Crop.svg"; // Reemplaza con la ruta real
import ocultarMenuIcon from "/public/assets/IconSVG/I_Expand.svg"; // Reemplaza con la ruta real

import Medianos from "./Medianos/Medianos";
import Ulnar from "./Ulnar/Ulnar";
import UlnarSt from "./UlnarSt/UlnarSt";
import RadialSp from "./RadialSp/RadialSp";
import Antebraquial from "./Antebraquial/Antebraquial";
import MiembrosInf from "./MiembrosInf/MiembrosInf";
import Femorocutaneo from "./Femorocutaneo/Femorocutaneo";
import Segmentarios from "./Segmentarios/Segmentarios";
import DermatomasC from "./DermatomasC/DermatomasC";
import DermatomasL from "./DermatomasL/DermatomasL";
import DermatomasT from "./DermatomasT/DermatomasT";
import Trigemino from "./Trigemino/Trigemino";
import Pudendos from "./Pudendos/Pudendos";
import MedianoFmx from "./MedianoFmx/MedianoFmx";
import TripleRespuesta from "./TripleRespuesta/TripleRespuesta";
import MiembrosSup from "./MiembrosSup/MiembrosSup";
import Tibial from "./Tibial/Tibial";
import TibialPx from "./TibialPx/TibialPx";
import Peroneo from "./Peroneo/Peroneo";
import Plantares from "./Plantares/Plantares";
import CapoTotal from "./CapoTotal/CapoTotal";
import Hemicampos from "./Hemicampos/Hemicampos";
import Cuadrantes from "./Cuadrantes/Cuadrantes";
import Goggles from "./Goggles/Goggles";
import TalloC from "./TalloC/TalloC";
import Latencia from "./Latencia/Latencia";


import "/app/Tecnicas/Componentes/Potenciales/StyleMp.css"


const MenuBotonesPt = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [visibleSubMenu, setVisibleSubMenu] = useState(null);
    const [menuVisible, setMenuVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const Potenciales = [
        {
            Menu: "Somatosensoriales",
            Submenu: [
                "Nervio Mediano (fibras mixtas)",
                "Nervio Mediano (fibras sensitivas)",
                "Nervios Ulnar (fibras mixtas)",
                "Nervios Ulnar (fibras sensitivas)",
                "Radial Superficial",
                "Antebraquial cutáneo lateral",
                "Nervio Tibial",
                "Nervio Tibial proximal",
                "Nervio Peroneo",
                "Femorocutáneo lateral",
                "Segmentarios",
                "Plantares",
                "Dermatomas cervicales",
                "Dermatomas torácicos",
                "Dermatomas lumbosacros",
                "Nervios Trigéminos",
                "Pudendos",

            ],
        },
        {
            Menu: "Evocados motores ",
            Submenu: [
                "Miembros superiores",
                "Miembros inferiores",
                "Triple respuesta", 

            ],
        },
        { Menu: "Evocados visuales", 
            Submenu: [
                "Campo total",
                "Hemicampos",
                "Cuadrantes",
                "Goggles Led",

        ] },


        { Menu: "Evocados motores", 
            Submenu: [
                "Tallo cerebral", 
                "Latencia media",
        ] },
        // {
        //     Menu: "Cognitivos Relacionados a Eventos",
        //     Submenu: ["P300 Visual", "P300 Auditivo"],
        // },
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

    // Combinar todos los submenús en un solo arreglo
    const allOptions = [
      ...Potenciales.flatMap((item) => item.Submenu),
      // ...Miografia.flatMap((item) => item.Submenu),
      // ...PotencialesProvocados.flatMap((item) => item.Submenu),
      // ...PruebasEspeciales.flatMap((item) => item.Submenu),
    ];

    const filteredOptions = allOptions.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="BannerTitlepage">
                <div>Neurografía</div>
            </div>

            {/* Botón para ocultar/mostrar menú */}
            <button
                className="bg-black px-4 py-2 m-2 flex items-center  border border-orange-500 round-button"
                style={{ borderRadius: '100%' }}
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
                {menuVisible && (
                    <div className="w-1/5 max-h-full bg-[#3f3c3c] text-white p-4 rounded-2xl">
                        <h2 className="text-lg mb-4">Neurografía</h2>

                        {/* Buscador con autocompletado */}
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full mb-4 p-2 text-black rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <ul className="bg-white text-black rounded shadow max-h-48 overflow-y-auto">
                                {filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-orange-200 cursor-pointer"
                                        onClick={() => handleClick(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                                {filteredOptions.length === 0 && (
                                    <li className="p-2 text-gray-500">Sin resultados</li>
                                )}
                            </ul>
                        )}

                        {/* Menú original */}
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
                            <h1 className="text-white text-4xl">Técnicas</h1>
                            <p className="pt-16 text-white text-center text-xl italic">
                              Bienvenido a la sección de Técnicas en donde podrá contar a
                              disposición de la información que se encuentran disponibles en
                              nuestra plataforma.
                            </p>
                        </div>
                    ) : (
                        <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
                            {selectedOption === "Nervio Mediano (fibras mixtas)" && <MedianoFmx />}
                            {selectedOption === "Nervio Mediano (fibras sensitivas)" && <Medianos />}
                            {selectedOption === "Nervios Ulnar (fibras mixtas)" && <Ulnar />}
                            {selectedOption === "Nervios Ulnar (fibras sensitivas)" && <UlnarSt />}
                            {selectedOption === "Radial Superficial" && <RadialSp />}
                            {selectedOption === "Antebraquial cutáneo lateral" && <Antebraquial />}
                            {selectedOption === "Miembros inferiores" && <MiembrosInf />}
                            {selectedOption === "Miembros superiores" && <MiembrosSup />}
                            {selectedOption === "Femorocutáneo lateral" && <Femorocutaneo />}
                            {selectedOption === "Segmentarios" && <Segmentarios />}
                            {selectedOption === "Dermatomas cervicales" && <DermatomasC />}
                            {selectedOption === "Dermatomas lumbosacros" && <DermatomasL />}
                            {selectedOption === "Dermatomas torácicos" && <DermatomasT />}
                            {selectedOption === "Nervios Trigéminos" && <Trigemino />}
                            {selectedOption === "Pudendos" && <Pudendos />}
                            {selectedOption === "Triple respuesta" && <TripleRespuesta />}
                            {selectedOption === "Nervio Tibial" && <Tibial />}
                            {selectedOption === "Nervio Tibial proximal" && <TibialPx />}
                            {selectedOption === "Nervio Peroneo" && <Peroneo />}
                            {selectedOption === "Plantares" && <Plantares />}
                            {selectedOption === "Campo total" && <CapoTotal />}
                            {selectedOption === "Hemicampos" && <Hemicampos />}
                            {selectedOption === "Cuadrantes" && <Cuadrantes />}
                            {selectedOption === "Goggles Led" && <Goggles />}
                            {selectedOption === "Tallo cerebral" && <TalloC />}
                            {selectedOption === "Latencia media" && <Latencia />}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuBotonesPt;
