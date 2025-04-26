import Image from "next/image";
import { useState } from "react";
import AuricularM from "./Auricular/AuricularM";
import Axilar from "./Axilar/Axilar";
import Ciatico from "./Ciatico/Ciatico";
import { default as CutaneoFemoral } from "./CutaneoFemoral/CutaneoFemoral";
import CutaneoL from "./CutaneoL/CutaneoL";
import CutaneoM from "./CutaneoM/CutaneoM";
import CutaneoP from "./CutaneoP/CutaneoP";
import DorsalDelPene from "./DorsalDelPene/DorsalDelPene";
import EscapularDorsal from "./EscapularDorsal/EscapularDorsal";
import Espinal from "./Espinal/Espinal";
import Facial from "./Facial/Facial";
import Femoral from "./Femoral/Femoral";
import FemoralcutaneoLt from "./FemorocutaneoLt/FemoralcutaneoLt";
import Frenico from "./Frenico/Frenico";
import MedianoMt from "./MedianoMt/medianoMt";
import MedianoSt from "./MedianoSt/medianoSt";
import Musculocutaneo from "./Musculocutaneo/Musculocutaneo";
import OccipitalM from "./Occipital/OccipitalM";
import Peroneo from "./Peroneo/Peroneo";
import PeroneoProfundo from "./PeroneoProfundo/PeroneoProfundo";
import PeroneoSuperficial from "./PeroneoSuperficial/PeroneoSuperficial";
import Plantar from "./Plantar/Plantar";
import Pudendo from "./Pudendo/Pudendo";
import RadialMt from "./RadialMt/RadialMt";
import RadialSt from "./RadialSt/RadialSt";
import Safeno from "./Safeno/Safeno";
import Supraclavicular from "./Supraclavicular/Supraclavicular";
import Supraescapular from "./Supraescapular/Supraescapular";
import Sural from "./Sural/Sural";
import Tibial from "./Tibial/Tibial";
import ToracicoLargo from "./ToracicoLargo/ToracicoLargo";
import Toracodorsal from "./Toracodorsal/Toracodorsal";
import Trigemino from "./Trigemino/Trigemino";
import UlnarMt from "./UlnarMt/UlnarMt";
import UlnarSt from "./UlnarSt/UlnarSt";
import "/app/Tecnicas/Componentes/Neurografia/StyleM.css"

import mostrarMenuIcon from "/public/assets/IconSVG/I_Crop.svg"; // Reemplaza con la ruta real
import ocultarMenuIcon from "/public/assets/IconSVG/I_Expand.svg"; // Reemplaza con la ruta real


const MenuBotonesPt = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [visibleSubMenu, setVisibleSubMenu] = useState(null);
    const [menuVisible, setMenuVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

  const Neurolografia = [
    {
      Menu: "Miembros superiores",
      Submenu: [
        "Mediano (motor)",
        "Mediano (sensitivo)",
        "Ulnar (motor)",
        "Ulnar (sensitivo)",
        "Radial (motor)",
        "Radial (sensitivo)",
        "Antebraquial cutáneo lateral",
        "Antebraquial cutáneo medial",
        "Antebraquial cutáneo posterior",
        "Axilar",
        "Musculocutáneo",
        "Supraescapular",
        "Escapular dorsal",
        "Torácico largo",
        "Toracodorsal",
      ],
    },
    {
      Menu: "Cervicales/Craneales",
      Submenu: [
        "Frénico",
        "Espinal accesorio",
        "Supraclavicular",
        "Auricular mayor",
        "Occipital mayor",
        "Facial",
        "Trigémino",
      ],
    },
    {
      Menu: "Miembros inferiores",
      Submenu: [
        "Peroneo",
        "Peroneo superficial",
        "Peroneo profundo",
        "Tibial",
        "Sural",
        "Plantar",
        "Femoral",
        "Safeno",
        "Femorocutáneo lateral",
        "Cutáneo femoral",
      ],
    },
    {
      Menu: "Sacros",
      Submenu: ["Ciático", "Pudendo", "Dorsal del pene"],
    },
  ];

  //Matriz de opciones de Miografia  y submenús
  // const Miografia = [
  //   {
  //     Menu: "Craniobulbar",
  //     Submenu: [
  //       "Facial Cranio Bulbar",
  //       "Trigémino",
  //       "Lingual",
  //       "Cervical",
  //       "Frénico",
  //     ],
  //   },
  //   {
  //     Menu: "Superior",
  //     Submenu: [
  //       "Mediano",
  //       "Ulnar",
  //       "Radial",
  //       "Axilar",
  //       "Musculocutáneo",
  //       "Supraescapular Superior",
  //       "Dorsal Escapular",
  //       "Torácico Largo",
  //       "Subescapular y Toracodorsal",
  //       "Pectoral",
  //     ],
  //   },
  //   {
  //     Menu: "Inferior",
  //     Submenu: [
  //       "Ciático",
  //       "Tibial",
  //       "Peroneo Común",
  //       "Glúteo Superior",
  //       "Glúteo Inferior",
  //       "Pudendo",
  //       "Femoral",
  //       "Obturador",
  //     ],
  //   },
  //   { Menu: "Tronco", Submenu: ["Paraespinales"] },
  // ];

  // //Matriz de opciones de Potenciales Provocados  y submenús

  // const PotencialesProvocados = [
  //   {
  //     Menu: "Somatosensoriales",
  //     Submenu: [
  //       "Nervios Medianos",
  //       "Nervios Ulnar",
  //       "Tibial",
  //       "Peroneo",
  //       "Nervios Trigéminos",
  //       "Pudendo",
  //       "Radial Superficial",
  //       "Nervios Musculocutáneo",
  //       "Femorocutáneo o lateral",
  //       "Safeno",
  //       "Peroneo superficial",
  //       "Sural",
  //       "Plantar",
  //       "Calcáneo",
  //       "Segmentarios Dermatomales",
  //     ],
  //   },
  //   {
  //     Menu: "Auditivos",
  //     Submenu: [
  //       "Latencia Corta Tallo Cerebral",
  //       "Latencia Mediana",
  //       "Latencia Larga",
  //     ],
  //   },
  //   { Menu: "Visuales", Submenu: ["Damero", "Leds"] },
  //   { Menu: "Motores", Submenu: ["Superiores", "Inferiores", "Faciales"] },
  //   {
  //     Menu: "Cognitivos Relacionados a Eventos",
  //     Submenu: ["P300 Visual", "P300 Auditivo"],
  //   },
  // ];
  //Matriz de opciones de Pruebas especiales  y submenús

  // const PruebasEspeciales = [
  //   {
  //     Menu: "Estimulación Repetitiva",
  //     Submenu: [
  //       "Facial",
  //       "Distal",
  //       "Proximal",
  //       "Tests Provocativos",
  //       "Altas Frecuencias",
  //       "Test de Ejercicio",
  //     ],
  //   },
  //   {
  //     Menu: "Fibra Única",
  //     Submenu: ["Fibra Única", "Densidad de Fibra", "Macro y Escaneo"],
  //   },
  //   {
  //     Menu: "Autonómicos",
  //     Submenu: [
  //       "Respuesta sináptica de la Piel",
  //       "Reflejo pupilar",
  //       "Variabilidad R-R",
  //       "Periodo Silente",
  //     ],
  //   },
  //   {
  //     Menu: "Respuestas Tardías",
  //     Submenu: [
  //       "Reflejo del parpadeo",
  //       "Onda F",
  //       "Reflejo H",
  //       "Reflejo bulbocavernoso",
  //     ],
  //   },
  //   {
  //     Menu: "Esotéricas",
  //     Submenu: [
  //       "Reflejo Masetero",
  //       "Reflejo Palmo Mentoniano",
  //       "Laríngeo Recurrente",
  //       "Raíces Nerviosas",
  //       "Nervios Intercostales",
  //       "Glúteo Superior",
  //       "Reflejos Pudendos Sexuales",
  //     ],
  //   },
  //   { Menu: "Movimiento", Submenu: ["Tremor"] },
  // ];

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
      ...Neurolografia.flatMap((item) => item.Submenu),
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
                <div>Neurolografia</div>
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
                        <h2 className="text-lg mb-4">Neurolografia</h2>

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
                        {Neurolografia.map((menuOption, menuIndex) => (
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
                              Bienvenido a la sección de Valores en donde podrá contar a
                              disposición de la información que se encuentran disponibles en
                              nuestra plataforma.
                            </p>
                        </div>
                    ) : (
                        <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
                            {selectedOption === "Mediano (motor)" && <MedianoMt />}
                            {selectedOption === "Mediano (sensitivo)" && <MedianoSt />}
                            {selectedOption === "Ulnar (motor)" && <UlnarMt />}
                            {selectedOption === "Ulnar (sensitivo)" && <UlnarSt />}
                            {selectedOption === "Radial (motor)" && <RadialMt />}
                            {selectedOption === "Radial (sensitivo)" && <RadialSt />}
                            {selectedOption === "Antebraquial cutáneo lateral" && <CutaneoL />}
                            {selectedOption === "Antebraquial cutáneo medial" && <CutaneoM />}
                            {selectedOption === "Antebraquial cutáneo posterior" && <CutaneoP />}
                            {selectedOption === "Axilar" && <Axilar />}
                            {selectedOption === "Musculocutáneo" && <Musculocutaneo />}
                            {selectedOption === "Supraescapular" && <Supraescapular />}
                            {selectedOption === "Escapular dorsal" && <EscapularDorsal />}
                            {selectedOption === "Torácico largo" && <ToracicoLargo />}
                            {selectedOption === "Toracodorsal" && <Toracodorsal />}

                            {selectedOption === "Frénico" && <Frenico />}
                            {selectedOption === "Espinal accesorio" && <Espinal />}
                            {selectedOption === "Supraclavicular" && <Supraclavicular />}
                            {selectedOption === "Auricular mayor" && <AuricularM />}
                            {selectedOption === "Occipital mayor" && <OccipitalM />}
                            {selectedOption === "Facial" && <Facial />}
                            {selectedOption === "Trigémino" && <Trigemino />}

                            {selectedOption === "Peroneo" && <Peroneo />}
                            {selectedOption === "Peroneo superficial" && <PeroneoSuperficial />}
                            {selectedOption === "Peroneo profundo" && <PeroneoProfundo />}
                            {selectedOption === "Tibial" && <Tibial />}
                            {selectedOption === "Sural" && <Sural />}
                            {selectedOption === "Plantar" && <Plantar />}
                            {selectedOption === "Femoral" && <Femoral />}
                            {selectedOption === "Safeno" && <Safeno />}
                            {selectedOption === "Femorocutáneo lateral" && <FemoralcutaneoLt />}
                            {selectedOption === "Cutáneo femoral" && <CutaneoFemoral />} 
                            
                            {selectedOption === "Ciático" && <Ciatico />}
                            {selectedOption === "Pudendo" && <Pudendo />}
                            {selectedOption === "Dorsal del pene" && <DorsalDelPene />}
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuBotonesPt;
