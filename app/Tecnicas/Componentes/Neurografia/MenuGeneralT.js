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


const MenuGeneralT = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [subMenuVisibility, setSubMenuVisibility] = useState({});
  const [visibleSubMenu, setVisibleSubMenu] = useState(null);

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
  const Miografia = [
    {
      Menu: "Craniobulbar",
      Submenu: [
        "Facial Cranio Bulbar",
        "Trigémino",
        "Lingual",
        "Cervical",
        "Frénico",
      ],
    },
    {
      Menu: "Superior",
      Submenu: [
        "Mediano",
        "Ulnar",
        "Radial",
        "Axilar",
        "Musculocutáneo",
        "Supraescapular Superior",
        "Dorsal Escapular",
        "Torácico Largo",
        "Subescapular y Toracodorsal",
        "Pectoral",
      ],
    },
    {
      Menu: "Inferior",
      Submenu: [
        "Ciático",
        "Tibial",
        "Peroneo Común",
        "Glúteo Superior",
        "Glúteo Inferior",
        "Pudendo",
        "Femoral",
        "Obturador",
      ],
    },
    { Menu: "Tronco", Submenu: ["Paraespinales"] },
  ];

  //Matriz de opciones de Potenciales Provocados  y submenús

  const PotencialesProvocados = [
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

  const PruebasEspeciales = [
    {
      Menu: "Estimulación Repetitiva",
      Submenu: [
        "Facial",
        "Distal",
        "Proximal",
        "Tests Provocativos",
        "Altas Frecuencias",
        "Test de Ejercicio",
      ],
    },
    {
      Menu: "Fibra Única",
      Submenu: ["Fibra Única", "Densidad de Fibra", "Macro y Escaneo"],
    },
    {
      Menu: "Autonómicos",
      Submenu: [
        "Respuesta sináptica de la Piel",
        "Reflejo pupilar",
        "Variabilidad R-R",
        "Periodo Silente",
      ],
    },
    {
      Menu: "Respuestas Tardías",
      Submenu: [
        "Reflejo del parpadeo",
        "Onda F",
        "Reflejo H",
        "Reflejo bulbocavernoso",
      ],
    },
    {
      Menu: "Esotéricas",
      Submenu: [
        "Reflejo Masetero",
        "Reflejo Palmo Mentoniano",
        "Laríngeo Recurrente",
        "Raíces Nerviosas",
        "Nervios Intercostales",
        "Glúteo Superior",
        "Reflejos Pudendos Sexuales",
      ],
    },
    { Menu: "Movimiento", Submenu: ["Tremor"] },
  ];

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
        <div>Neurografía</div>
      </div>
      <div className="flex">
        <div className="w-1/4 max-h-full">
          <div className="p-1">
            <div className="p-1">
              <div className="bg-[#3f3c3c] mt-1 p-2 rounded-bl-lg rounded-2xl text-white text-justify flex flex-col truncate lg:truncate xl:truncate">
                <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                  Neurografía
                </h2>
                {Neurolografia.map((menuOption, menuIndex) => (
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
                Bienvenido a la sección de Valores en donde podrá contar a
                disposición de la información que se encuentran disponibles en
                nuestra plataforma.
              </p>
            </div>
          )}
          {selectedOption && (
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

export default MenuGeneralT;
