import Image from "next/image";
import { useState } from "react";
import EditorCervicalCrani from "./Componentes/Miografia/Craniobulbar/EditorCervicalCrani";
import EditorFacialCraniobulbar from "./Componentes/Miografia/Craniobulbar/EditorFacialCraniomulbar";
import EditorFrenicoCrani from "./Componentes/Miografia/Craniobulbar/EditorFrenicoCrani";
import EditorLingualCrani from "./Componentes/Miografia/Craniobulbar/EditorLingualCrani";
import EditorTrigeminoCrani from "./Componentes/Miografia/Craniobulbar/EditorTrigeminoCrani";
import EditorCiaticoIdferior from "./Componentes/Miografia/Inferior/EditorCiaticoibferior";
import EditorFemoralInferior from "./Componentes/Miografia/Inferior/EditorFemoralinferior";
import EditorGluetoinferior from "./Componentes/Miografia/Inferior/EditorGluteoinferior";
import EditorGluteosuperior from "./Componentes/Miografia/Inferior/EditorGluteosuperior";
import EditorObturador from "./Componentes/Miografia/Inferior/EditorObturador";
import EditorPeroneoComunInferior from "./Componentes/Miografia/Inferior/EditorPeroneoComunInferior";
import EditorPudendo from "./Componentes/Miografia/Inferior/EditorPudendo";
import EditorTibialInferior from "./Componentes/Miografia/Inferior/EditorTibialInferior";
import EditorAxilarSuperior from "./Componentes/Miografia/Superior/EditorAxilarSuperior";
import EditorDorsalSuperior from "./Componentes/Miografia/Superior/EditorDorsalSuperior";
import EditorMedianoSuperior from "./Componentes/Miografia/Superior/EditorMedianoSuperior";
import EditorMusculocutaneoSuperior from "./Componentes/Miografia/Superior/EditorMusculocutaneoSuperior";
import EditorPectoral from "./Componentes/Miografia/Superior/EditorPectoral";
import EditorRadialSuperior from "./Componentes/Miografia/Superior/EditorRadialSuperior";
import EditorSupraescapularSuperior from "./Componentes/Miografia/Superior/EditorSupraescapularSuperior";
import EditorToracicoLargo from "./Componentes/Miografia/Superior/EditorToracicoLargo";
import EditorUlnarSuperior from "./Componentes/Miografia/Superior/EditorUlnarSuperior";
import EditorSubescapular from "./Componentes/Miografia/Superior/EditrSubescapular";
import EditorParaespinalesTronco from "./Componentes/Miografia/Tronco/EditorParaespinalesTronco";
import EditorAxilar from "./Componentes/Neurolografia/Braquial/EditorAxilar";
import EditorCervicales from "./Componentes/Neurolografia/Braquial/EditorCervicales";
import EditorCutaneoBranquial from "./Componentes/Neurolografia/Braquial/EditorCutaneoBranquial";
import EditorDorsalEsca from "./Componentes/Neurolografia/Braquial/EditorDorsalEsca";
import EditorDorsalEscapula from "./Componentes/Neurolografia/Braquial/EditorDorsalEscapula";
import EditorMediano from "./Componentes/Neurolografia/Braquial/EditorMediano";
import EditorMusculocutaneo from "./Componentes/Neurolografia/Braquial/EditorMusculocutaneo";
import EditorRadial from "./Componentes/Neurolografia/Braquial/EditorRadial";
import EditorSupaescapular from "./Componentes/Neurolografia/Braquial/EditorSupaescapular";
import EditorToracodorsal from "./Componentes/Neurolografia/Braquial/EditorToracodorsal";
import EditorUlnar from "./Componentes/Neurolografia/Braquial/EditorUlnar";
import EditorAuricular from "./Componentes/Neurolografia/Cervical/EditorAuricular";
import EditorFrenico from "./Componentes/Neurolografia/Cervical/EditorFrenico";
import EditorAccesorioEspinal from "./Componentes/Neurolografia/Craneales/EditorAccesorioEspinal";
import EditorFacial from "./Componentes/Neurolografia/Craneales/EditorFacial";
import EditorTrigemino from "./Componentes/Neurolografia/Craneales/EditorTrigemino";
import EditorFemoral from "./Componentes/Neurolografia/Lumbar/EditorFemoral";
import EditorFemorocutaneo from "./Componentes/Neurolografia/Lumbar/EditorFemorocutaneo";
import EditorSafeno from "./Componentes/Neurolografia/Lumbar/EditorSafeno";
import EditorCiatico from "./Componentes/Neurolografia/Lumbosacro/EditorCiatico";
import EditorInterdigital from "./Componentes/Neurolografia/Lumbosacro/EditorInterdigital";
import EditorLumbosacras from "./Componentes/Neurolografia/Lumbosacro/EditorLumbosacras";
import EditorPeroneo from "./Componentes/Neurolografia/Lumbosacro/EditorPeroneo";
import EditorPlantar from "./Componentes/Neurolografia/Lumbosacro/EditorPlantar";
import EditorSural from "./Componentes/Neurolografia/Lumbosacro/EditorSural";
import EditorTibial from "./Componentes/Neurolografia/Lumbosacro/EditorTibial";
import EditorCutaneaPosterior from "./Componentes/Neurolografia/Sacro/EditorCutaneaPosterior";
import EditorDorsaPene from "./Componentes/Neurolografia/Sacro/EditorDorsaPene";
import EditorIntercostales from "./Componentes/Neurolografia/Toracico/EditorIntercostales";
import EditorLatenciaMediana from "./Componentes/PotencialesProvocados/Auditivos/EditorLatenciaMediana";
import EditorLatenciaLarga from "./Componentes/PotencialesProvocados/Auditivos/EditorLetenciaLarga";
import EditorTalloCerebral from "./Componentes/PotencialesProvocados/Auditivos/EditorTalloCerebral";
import EditorPAuditivo from "./Componentes/PotencialesProvocados/CognitivosRelacionados/EditorPAuditivo";
import EditorPVisual from "./Componentes/PotencialesProvocados/CognitivosRelacionados/EditorPVisual";
import EditorFacialMotores from "./Componentes/PotencialesProvocados/Motores/EditorFacialMotores";
import EditorInferioresMotores from "./Componentes/PotencialesProvocados/Motores/EditorInferiorMotores";
import EditorSuperiorMotores from "./Componentes/PotencialesProvocados/Motores/EditorSuperiorMotores";
import EditorCalcaneoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorCalcaneoSoma";
import EditorDermatomales from "./Componentes/PotencialesProvocados/Somatosensores/EditorDermatomalesSoma";
import EditorFemorocutaneoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorFemorocutaneoSoma";
import EditorMedianoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorMedianoSoma";
import EditorMusculocutaneoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorMusculocutaneoSoma";
import EditorPeroneoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorPeroneoSoma";
import EditorPeroneoSuperficialSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorPeroneoSuperficialSoma";
import EditorPlantarSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorPlantarSoma";
import EditorPudendoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorPudendoSoma";
import EditorRadialSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorRadialSoma";
import EditorSafenoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorSafenoSoma";
import EditorTibialSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorTibialSoma";
import EditorTrigeminoSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorTrigeminoSoma";
import EditorUlrnaSoma from "./Componentes/PotencialesProvocados/Somatosensores/EditorUlrnaSoma";
import EditorSuralSomatosensores from "./Componentes/PotencialesProvocados/Somatosensores/NervioSuralSomatosensores";
import EditorDamero from "./Componentes/PotencialesProvocados/Visuales/EditorDamero";
import EditorLeds from "./Componentes/PotencialesProvocados/Visuales/EditorLeds";
import EditorPeriodoPrueba from "./Componentes/PruebasEspeciales/Autonomicos/EditorPeriodoPrueba";
import EditorPupilasPruebas from "./Componentes/PruebasEspeciales/Autonomicos/EditorPupilarPruebas";
import EditorSinapticaPrueba from "./Componentes/PruebasEspeciales/Autonomicos/EditorSinapticaPrueba";
import EditorVariabilidadPruebas from "./Componentes/PruebasEspeciales/Autonomicos/EditorVariabilidadPruebas";
import EditorGluteoEsotericas from "./Componentes/PruebasEspeciales/Esotericas/EditorGluteoEsotericas";
import EditorIntercostalesEsotericas from "./Componentes/PruebasEspeciales/Esotericas/EditorIntercostalesEsotericas";
import EditorLaringeoEsotericas from "./Componentes/PruebasEspeciales/Esotericas/EditorLaringeoEsotericas";
import EditorMasateroEsotericas from "./Componentes/PruebasEspeciales/Esotericas/EditorMaseteroEsotericas";
import EditorPalmoEsotericas from "./Componentes/PruebasEspeciales/Esotericas/EditorPalmoEsotericas";
import EditorPudendoEsotericas from "./Componentes/PruebasEspeciales/Esotericas/EditorPudendoEsotericas";
import EditorRaicesNerviosasEso from "./Componentes/PruebasEspeciales/Esotericas/EditorRaicesNerviosasEso";
import EditorAltasEstimulacion from "./Componentes/PruebasEspeciales/EstilumacionRepetitiva/EditorAltasEstimulacion";
import EditorDistalEstimulacion from "./Componentes/PruebasEspeciales/EstilumacionRepetitiva/EditorDistalEstimulacion";
import EditorEjercicioEstimulacion from "./Componentes/PruebasEspeciales/EstilumacionRepetitiva/EditorEjercicioEstimulacion";
import EditorFacialEstimulacion from "./Componentes/PruebasEspeciales/EstilumacionRepetitiva/EditorFacialEstimulacion";
import EditorProvocativosEstimulacion from "./Componentes/PruebasEspeciales/EstilumacionRepetitiva/EditorProvocativosEstimulacion";
import EditorProximalEstimulacion from "./Componentes/PruebasEspeciales/EstilumacionRepetitiva/EditorProximalEstimulacion";
import EditorDensidadFibras from "./Componentes/PruebasEspeciales/FibraUnica/EditorDensidadFibras";
import EditorFibraUnica from "./Componentes/PruebasEspeciales/FibraUnica/EditorFibraUnica";
import EditorMacroEstimulacion from "./Componentes/PruebasEspeciales/FibraUnica/EditorMacroEstimulacion";
import EditorTremorMovimiento from "./Componentes/PruebasEspeciales/Movimiento/EditorTremorMovimiento";
import EditorBulbocavernoso from "./Componentes/PruebasEspeciales/RespuestasTardias/EditorBulbocavernoso";
import EditorOndaF from "./Componentes/PruebasEspeciales/RespuestasTardias/EditorOndaF";
import EditorReflejoH from "./Componentes/PruebasEspeciales/RespuestasTardias/EditorReflejoH";
import EditorReflejoTardias from "./Componentes/PruebasEspeciales/RespuestasTardias/EditorReflejoTardias";

const MenuValores = () => {
  // Estado para almacenar la opción seleccionada en el menú
  const [selectedOption, setSelectedOption] = useState(null);

  // Estado para controlar la visibilidad de los submenús
  const [subMenuVisibility, setSubMenuVisibility] = useState({});

  // Estado para controlar la visibilidad del mapa de Neurolografía
  const [ShowNeurolografiaMap, setShowNeurolografiaMap] = useState(false);

  // Estado para controlar la visibilidad del mapa de Miografía
  const [ShowMiografiaMap, setShowMiografiaMap] = useState(false);

  // Estado para controlar la visibilidad del mapa de Potenciales Provocados
  const [ShowPotencialesProvocadosMap, setShowPotencialesProvocadosMap] =
    useState(false);

  // Estado para controlar la visibilidad del mapa de Pruebas Especiales
  const [ShowPruebasEspecialesMap, setShowPruebasEspecialesMap] =
    useState(false);

  // Función para manejar el clic en una opción del menú
  const handleClick = (option) => {
    setSelectedOption(option);
  };

  // Función para regresar al menú principal
  const RegresarMenu = () => {
    setSelectedOption(null);
    setShowNeurolografiaMap(false);
    setSubMenuVisibility(false);
    setShowMiografiaMap(false);
    setShowPotencialesProvocadosMap(false);
    setShowPruebasEspecialesMap(false);
  };

  //Matriz de opciones de neurografia  y submenús

  const Neurolografia = [
    {
      Menu: "Craneales",
      Submenu: ["Facial", "Trigémino", "Accesorio Espinal"],
    },
    {
      Menu: "Cervical",
      Submenu: ["Auricular", "Frénico"],
    },
    {
      Menu: "Braquial",
      Submenu: [
        "Raíces Cervicales",
        "Torácico Largo",
        "Dorsal de la Escápula",
        "Supraescapular",
        "Toracodorsal",
        "Musculocutáneo",
        "Cutáneo Antebraquial",
        "Axilar",
        "Radial",
        "Mediano",
        "Ulnar",
      ],
    },
    {
      Menu: "Torácico",
      Submenu: ["Intercostales"],
    },
    {
      Menu: "Lumbar",
      Submenu: [
        "Femorocutáneo Lateral",
        "Femoral",
        "Nervios Safeno",
      ],
    },
    {
      Menu: "Lumbosacro",
      Submenu: [
        "Raíces Lumbosacras",
        "Ciático",
        "Nervios Peroneo",
        "Nervios Tibial",
        "Nervios Plantar",
        "Nervios Sural",
        "Interdigital",
      ],
    },
    {
      Menu: "Sacro",
      Submenu: ["Femoral Cutánea Posterior", "Dorsal del pene"],
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

  //Control de visibilidad
  const toggleSubMenuVisibility = (menuOption) => {
    setSubMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [menuOption]: !prevVisibility[menuOption],
    }));
  };
  //Neurolografia
  const ShowNeurolografia = () => {
    setShowNeurolografiaMap(!ShowNeurolografiaMap);
    setShowMiografiaMap(false);
    setShowPotencialesProvocadosMap(false);
    setShowPruebasEspecialesMap(false);
  };
  //Miografia
  const ShowMiografia = () => {
    setShowMiografiaMap(!ShowMiografiaMap);
    setShowNeurolografiaMap(false);
    setShowPotencialesProvocadosMap(false);
    setShowPruebasEspecialesMap(false);
  };
  //Potenciales Provocados
  const ShowPotencialesProvocados = () => {
    setShowPotencialesProvocadosMap(!ShowPotencialesProvocadosMap);
    setShowNeurolografiaMap(false);
    setShowMiografiaMap(false);
    setShowPruebasEspecialesMap(false);
  };
  //Pruebas Especiales
  const ShowPruebasEspeciales = () => {
    setShowPruebasEspecialesMap(!ShowPruebasEspecialesMap);
    setShowNeurolografiaMap(false);
    setShowMiografiaMap(false);
    setShowPotencialesProvocadosMap(false);
  };

  return (
    <div>
      <div className="BannerTitlepage">
        <div>
          Valores
        </div>
    </div>
    <div className="flex">
      {/*Contenido del div izquierdo */}
      <div className="w-1/4 max-h-full">

        {/*Botones fijos */}
{/*      <div className="flex item-center justify-center">
          <button
            id="Retur"
            className="bg-black m-2 p-2 text-white rounded-full border border-orange-500 hover:border-black hover:bg-[#8F3400cc]"
            onClick={RegresarMenu}
          >
            <Image
              src="/assets/IconSVG/I_Repeat.svg"
              alt="Logo de la empresa"
              width={25}
              height={25}
              className="filter brightness-0 invert sepia saturate-5 hue-rotate-200"
            />
          </button>
        </div>
*/}

        <div className="p-1">
          <div className="p-1">
            <div className="flex flex-wrap mt-4">
              {/* btn Neurografía  */}
              <button
                className={`flex-1 bg-${
                  ShowNeurolografiaMap ? "[#8F3400]" : "[#1c1c1c]"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowNeurolografia}
              >
                Neurografía
              </button>

              {/* btn Miografia */}
              <button
                className={`flex-1 bg-${
                  ShowMiografiaMap ? "[#8F3400]" : "[#1c1c1c]"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowMiografia}
              >
                Miografía
              </button>
            </div>

            <div className="flex flex-wrap ">
              {/* btn Potenciales Provocados */}
              <button
                className={`flex-1 bg-${
                  ShowPotencialesProvocadosMap ? "[#8F3400]" : "[#1c1c1c]"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowPotencialesProvocados}
              >
                Potenciales Provocados
              </button>

              {/* btn Pruebas Especiales */}
              <button
                className={`flex-1 bg-${
                  ShowPruebasEspecialesMap ? "[#8F3400]" : "[#1c1c1c]"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowPruebasEspeciales}
              >
                Pruebas Especiales
              </button>

              {/* btn Pruebas Especiales */}
              <button
                className={`flex-1 bg-${
                  ShowPruebasEspecialesMap ? "[#8F3400]" : "[#1c1c1c]"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowPruebasEspeciales}
              >
                Valores
              </button>


              {/* btn Pruebas Especiales */}
              <button
                className={`flex-1 bg-${
                  ShowPruebasEspecialesMap ? "[#8F3400]" : "[#1c1c1c]"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowPruebasEspeciales}
              >
                Protocolo
              </button>

            </div>

            {/*Divs Ocultos/mostrados */}
            {/*Neurografía  */}
            {ShowNeurolografiaMap && ( // Verifica si ShowNeurolografiaMap es verdadero
              <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col truncate lg:truncate xl:truncate">
                <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                  Neurografía {/* Título del menú */}
                </h2>
                {Neurolografia.map(
                  (
                    menuOption,
                    menuIndex // Itera sobre las opciones de menú de Neurografía
                  ) => (
                    <div key={menuIndex} className="ml-4">
                      <button
                        className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-black active:bg-[#404040] text-white py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate  ${
                          selectedOption === menuOption.Menu
                            ? "bg-opacity-50" // Aplica estilo si la opción está seleccionada
                            : ""
                        }`}
                        onClick={() => {
                          handleClick(menuOption.Menu); // Maneja el clic en la opción de menú
                          toggleSubMenuVisibility(menuOption.Menu); // Muestra u oculta el submenú
                        }}
                      >
                        ➤ {menuOption.Menu}{" "}
                        {/* Muestra el nombre de la opción de menú */}
                      </button>

                      {subMenuVisibility[menuOption.Menu] && ( // Verifica si el submenú está visible
                        <div>
                          {menuOption.Submenu.map(
                            (
                              submenuOption,
                              submenuIndex // Itera sobre las opciones de submenú
                            ) => (
                              <button
                                key={submenuIndex}
                                className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-black active:bg-[#404040] text-white py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                                  selectedOption === submenuOption
                                    ? "bg-opacity-50" // Aplica estilo si la opción está seleccionada
                                    : ""
                                }`}
                                onClick={() => handleClick(submenuOption)} // Maneja el clic en la opción de submenú
                              >
                                {submenuOption}{" "}
                                {/* Muestra el nombre de la opción de submenú */}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}

            {/*Miograia */}
            {ShowMiografiaMap && ( // Verifica si ShowMiografiaMap es verdadero
              <div className="bg-[#2c2c2c] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
                <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                  Miografía {/* Título del menú */}
                </h2>
                {Miografia.map(
                  (
                    menuOption,
                    menuIndex // Itera sobre las opciones de menú de Miografia
                  ) => (
                    <div key={menuIndex} className="ml-4">
                      <button
                        className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate  ${
                          selectedOption === menuOption.Menu
                            ? "bg-opacity-50" // Aplica estilo si la opción está seleccionada
                            : ""
                        }`}
                        onClick={() => {
                          handleClick(menuOption.Menu); // Maneja el clic en la opción de menú
                          toggleSubMenuVisibility(menuOption.Menu); // Muestra u oculta el submenú
                        }}
                      >
                        ▷ {menuOption.Menu}
                        {/* Muestra el nombre de la opción de menú */}
                      </button>

                      {subMenuVisibility[menuOption.Menu] && ( // Verifica si el submenú está visible
                        <div>
                          {menuOption.Submenu.map(
                            (
                              submenuOption,
                              submenuIndex // Itera sobre las opciones de submenú
                            ) => (
                              <button
                                key={submenuIndex}
                                className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                                  selectedOption === submenuOption
                                    ? "bg-opacity-50" // Aplica estilo si la opción está seleccionada
                                    : ""
                                }`}
                                onClick={() => handleClick(submenuOption)} // Maneja el clic en la opción de submenú
                              >
                                {submenuOption}{" "}
                                {/* Muestra el nombre de la opción de submenú */}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
            {/*Potenciales Provocados*/}
            {ShowPotencialesProvocadosMap && (
              <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
                <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                  Potenciales Provocados
                </h2>
                {PotencialesProvocados.map((menuOption, menuIndex) => (
                  <div key={menuIndex} className="ml-4">
                    <button
                      className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate  ${
                        selectedOption === menuOption.Menu
                          ? "bg-opacity-50"
                          : ""
                      }`}
                      onClick={() => {
                        handleClick(menuOption.Menu);
                        toggleSubMenuVisibility(menuOption.Menu);
                      }}
                    >
                      ➢ {menuOption.Menu}
                    </button>

                    {subMenuVisibility[menuOption.Menu] && (
                      <div>
                        {menuOption.Submenu.map(
                          (submenuOption, submenuIndex) => (
                            <button
                              key={submenuIndex}
                              className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                                selectedOption === submenuOption
                                  ? "bg-opacity-50"
                                  : ""
                              }`}
                              onClick={() => handleClick(submenuOption)}
                            >
                              {submenuOption}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/*Pruebas protenciales */}
            {ShowPruebasEspecialesMap && (
              <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
                <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                  Pruebas especiales
                </h2>
                {PruebasEspeciales.map((menuOption, menuIndex) => (
                  <div key={menuIndex} className="ml-4">
                    <button
                      className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-black active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === menuOption.Menu
                          ? "bg-opacity-50"
                          : ""
                      }`}
                      onClick={() => {
                        handleClick(menuOption.Menu);
                        toggleSubMenuVisibility(menuOption.Menu);
                      }}
                    >
                      ➢ {menuOption.Menu}
                    </button>

                    {subMenuVisibility[menuOption.Menu] && (
                      <div>
                        {menuOption.Submenu.map(
                          (submenuOption, submenuIndex) => (
                            <button
                              key={submenuIndex}
                              className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-black active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                                selectedOption === submenuOption
                                  ? "bg-opacity-50"
                                  : ""
                              }`}
                              onClick={() => handleClick(submenuOption)}
                            >
                              {submenuOption}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Contenido del div derecho */}
      <div className= "w-3/4 max-h-full">
          {/* Página disponible */}
          {!selectedOption && (
            <div className="flex min-h-screen flex-col items-center p-10">
              <Image
                src="/L_B_Blanco.svg"
                alt="Logo de la empresa"
                width={120}
                height={120}
                className="w-52 h-52"
              />
              <h1 className=" text-white text-4xl">Valores</h1>
              <p className="pt-16 text-white text-center text-xl italic">
                Bienvenido a la sección de Valores en donde podrá contar a
                disposición de la información que se encuentran disponibles en
                nuestra plataforma.
              </p>
            </div>
          )}
          {/*Div con el contenido de los pdf NOTA: Se manejo componente separado de forma temporal*/}
          {selectedOption && (
            <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
              {/*Neurografía  */}
              {/*Craneales*/}
              {selectedOption === "Nevio Facial" && <EditorFacial />}
              {selectedOption === "Trigémino" && <EditorTrigemino />}
              {selectedOption === "Accesorio Espinal" && (
                <EditorAccesorioEspinal />
              )}
              {/*Cervical*/}
              {selectedOption === "Auricular" && <EditorAuricular />}
              {selectedOption === "Frénico" && <EditorFrenico />}
              {/*Braquial*/}
              {selectedOption === "Raíces Cervicales" && <EditorCervicales />}
              {selectedOption === "Torácico Largo" && (
                <EditorDorsalEscapula />
              )}
              {/**Falta  Dorsal de la Escapula*/}
              {selectedOption === "Dorsal de la Escapula" && (
                <EditorDorsalEsca />
              )}
              {selectedOption === "Supraescapular" && <EditorSupaescapular />}
              {selectedOption === "Toracodorsal" && (
                <EditorToracodorsal />
              )}
              {selectedOption === "Musculocutáneo" && (
                <EditorMusculocutaneo />
              )}
              {/*Falta Cutáneo Antebraquial*/}
              {selectedOption === "Cutáneo Antebraquial" && (
                <EditorCutaneoBranquial />
              )}
              {selectedOption === "Axilar" && <EditorAxilar />}
              {selectedOption === "Radial" && <EditorRadial />}
              {selectedOption === "Mediano" && <EditorMediano />}
              {selectedOption === "Ulnar" && <EditorUlnar />}
              {/*Toracico*/}
              {selectedOption === "Intercostales" && (
                <EditorIntercostales />
              )}
              {/*Lumbar*/}
              {selectedOption === "Femorocutáneo Lateral" && (
                <EditorFemorocutaneo />
              )}
              {selectedOption === "Femoral" && <EditorFemoral />}
              {selectedOption === "Nervios Safeno" && <EditorSafeno />}
              {/*Lumbosacro*/}
              {selectedOption === "Raíces Lumbosacras" && <EditorLumbosacras />}
              {selectedOption === "Ciático" && <EditorCiatico />}
              {selectedOption === "Nervios Peroneo" && <EditorPeroneo />}
              {selectedOption === "Nervios Tibial" && <EditorTibial />}
              {selectedOption === "Nervios Plantar" && <EditorPlantar />}
              {selectedOption === "Nervios Sural" && <EditorSural />}
              {selectedOption === "Interdigital" && (
                <EditorInterdigital />
              )}
              {/*Sacro*/}
              {selectedOption === "Femoral Cutánea Posterior" && (
                <EditorCutaneaPosterior />
              )}
              {selectedOption === "dorsal del pene" && (
                <EditorDorsaPene />
              )}

              {/*Miografia*/}
              {/*Craniobulbar*/}
              {selectedOption === "Facial Craniobulbar" && (
                <EditorFacialCraniobulbar />
              )}
              {selectedOption === "Trigémino" && <EditorTrigeminoCrani />}
              {selectedOption === "Lingual" && <EditorLingualCrani />}
              {selectedOption === "Cervical" && <EditorCervicalCrani />}
              {selectedOption === "Frénico" && <EditorFrenicoCrani />}
              {/*Superior*/}
              {selectedOption === "Mediano" && <EditorMedianoSuperior />}
              {selectedOption === "Ulnar" && <EditorUlnarSuperior />}
              {selectedOption === "Radial" && <EditorRadialSuperior />}
              {selectedOption === "Axilar" && <EditorAxilarSuperior />}
              {selectedOption === "Musculocutáneo" && (
                <EditorMusculocutaneoSuperior />
              )}
              {selectedOption === "Supraescapular Superior" && (
                <EditorSupraescapularSuperior />
              )}
              {selectedOption === "Dorsal Escapular" && (
                <EditorDorsalSuperior />
              )}
              {selectedOption === "Torácico Largo" && <EditorToracicoLargo />}
              {selectedOption === "Subescapular y Toracodorsal" && (
                <EditorSubescapular />
              )}
              {selectedOption === "Pectoral" && <EditorPectoral />}
              {/*Inferio */}
              {selectedOption === "Ciático" && <EditorCiaticoIdferior />}
              {selectedOption === "Tibial" && <EditorTibialInferior />}
              {selectedOption === "Peroneo Común" && (
                <EditorPeroneoComunInferior />
              )}
              {selectedOption === "Glúteo Superior" && <EditorGluteosuperior />}
              {selectedOption === "Glúteo Inferior" && <EditorGluetoinferior />}
              {selectedOption === "Pudendo" && <EditorPudendo />}
              {selectedOption === "Femoral" && <EditorFemoralInferior />}
              {selectedOption === "Obturador" && <EditorObturador />}
              {/*Tronco*/}
              {selectedOption === "Paraespinales" && (
                <EditorParaespinalesTronco />
              )}
              {/*PotencialesProvocados*/}
              {/*Somatosensores*/}
              {selectedOption === "Nervios Medianos" && <EditorMedianoSoma />}
              {selectedOption === "Nervios Ulnar" && <EditorUlrnaSoma />}
              {selectedOption === "Tibial" && <EditorTibialSoma />}
              {selectedOption === "Peroneo" && <EditorPeroneoSoma />}
              {selectedOption === "Nervios Trigéminos" && (
                <EditorTrigeminoSoma />
              )}
              {selectedOption === "Pudendo" && <EditorPudendoSoma />}
              {selectedOption === "Radial Superficial" && (
                <EditorRadialSoma />
              )}
              {selectedOption === "Nervios Musculocutáneo" && (
                <EditorMusculocutaneoSoma />
              )}
              {selectedOption === "Femorocutáneo o lateral" && (
                <EditorFemorocutaneoSoma />
              )}
              {selectedOption === "Safeno" && <EditorSafenoSoma />}
              {selectedOption === "Peroneo superficial" && (
                <EditorPeroneoSuperficialSoma />
              )}
              {selectedOption === "Sural" && (
                <EditorSuralSomatosensores />
              )}
              {selectedOption === "Plantar" && <EditorPlantarSoma />}
              {selectedOption === "Calcáneo" && <EditorCalcaneoSoma />}
              {selectedOption === "Segmentarios Dermatomales" && (
                <EditorDermatomales />
              )}
              {/*Auditivos*/}
              {selectedOption === "Latencia Corta Tallo Cerebral" && (
                <EditorTalloCerebral />
              )}
              {selectedOption === "Latencia Mediana" && (
                <EditorLatenciaMediana />
              )}
              {selectedOption === "Latencia Larga" && <EditorLatenciaLarga />}
              {/*Visuales*/}
              {selectedOption === "Damero" && <EditorDamero />}
              {selectedOption === "Leds" && <EditorLeds />}
              {/*Motores*/}
              {selectedOption === "Superiores" && <EditorSuperiorMotores />}
              {selectedOption === "Inferiores" && <EditorInferioresMotores />}
              {selectedOption === "Faciales" && <EditorFacialMotores />}
              {/*Cognitivos Relacionados a Eventos*/}
              {selectedOption === "P300 Visual" && <EditorPVisual />}
              {selectedOption === "P300 Auditivo" && <EditorPAuditivo />}
              {/*PruebasEspeciales*/}
              {/*Estimulacion Repetitiva*/}
              {selectedOption === "Facial" && <EditorFacialEstimulacion />}
              {selectedOption === "Distal" && <EditorDistalEstimulacion />}
              {selectedOption === "Proximal" && <EditorProximalEstimulacion />}
              {selectedOption === "Tests Provocativos" && (
                <EditorProvocativosEstimulacion />
              )}
              {selectedOption === "Altas Frecuencias" && (
                <EditorAltasEstimulacion />
              )}
              {selectedOption === "Test de Ejercicio" && (
                <EditorEjercicioEstimulacion />
              )}
              {/*Fibra Unica*/}
              {selectedOption === "Fibra Única" && <EditorFibraUnica />}
              {selectedOption === "Densidad de Fibra" && (
                <EditorDensidadFibras />
              )}
              {selectedOption === "Macro y Escaneo" && (
                <EditorMacroEstimulacion />
              )}
              {/*Autonomicos*/}
              {selectedOption === "Respuesta sináptica de la Piel" && (
                <EditorSinapticaPrueba />
              )}
              {selectedOption === "Reflejo pupilar" && <EditorPupilasPruebas />}
              {selectedOption === "Variabilidad R-R" && (
                <EditorVariabilidadPruebas />
              )}
              {selectedOption === "Periodo Silente" && <EditorPeriodoPrueba />}
              {/*Respuestas Tardias*/}
              {selectedOption === "Reflejo del parpadeo" && (
                <EditorReflejoTardias />
              )}
              {selectedOption === "Onda F" && <EditorOndaF />}
              {selectedOption === "Reflejo H" && <EditorReflejoH />}
              {selectedOption === "Reflejo bulbocavernoso" && (
                <EditorBulbocavernoso />
              )}
              {/*Esotericas*/}
              {selectedOption === "Reflejo Masetero" && (
                <EditorMasateroEsotericas />
              )}
              {selectedOption === "Reflejo Palmo Mentoniano" && (
                <EditorPalmoEsotericas />
              )}
              {selectedOption === "Laríngeo Recurrente" && (
                <EditorLaringeoEsotericas />
              )}
              {selectedOption === "Raíces Nerviosas" && (
                <EditorRaicesNerviosasEso />
              )}
              {selectedOption === "Nervios Intercostales" && (
                <EditorIntercostalesEsotericas />
              )}
              {selectedOption === "Glúteo Superior" && (
                <EditorGluteoEsotericas />
              )}
              {selectedOption === "Reflejos Pudendos Sexuales" && (
                <EditorPudendoEsotericas />
              )}
              {/*Movimiento*/}
              {selectedOption === "Tremor" && <EditorTremorMovimiento />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuValores;