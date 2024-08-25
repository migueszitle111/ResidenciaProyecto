import React, { use, useState } from "react";
import Image from "next/image";
import EditorNervioFrenico from "./Submenu/Cervical/EditorNervioFrenico";
import EditorNervioAccesorio from "./Submenu/Craneales/EditorNervioAccesorio";
import EditorAxilar from "./Submenu/Braquial/EditorAxilar";
import Editorcervicales from "./Submenu/Braquial/Editorcervicales";
import EditorCutaneo from "./Submenu/Braquial/EditorCutaneo";
import EditorMediano from "./Submenu/Braquial/EditorMediano";
import EditorMusculocutaneo from "./Submenu/Braquial/EditorMusculocutaneo";
import EditorNervioDorsalEscapula from "./Submenu/Braquial/EditorNervioDorsalEscapula";
import EditorNerviotoracicolargo from "./Submenu/Braquial/EditorNerviotoracicolargo";
import EditorRadial from "./Submenu/Braquial/EditorRadial";
import EditorSupraescapular from "./Submenu/Braquial/EditorSupraescapular";
import EditorToracordorsal from "./Submenu/Braquial/EditorToracordorsal";
import EditorUlnar from "./Submenu/Braquial/EditorUlnar";
import EditorIntercostales from "./Submenu/Toracico/EditorIntercostales";
import EditorFemoLateral from "./Submenu/Lumbar/EditorFemoLateral";
import EditorFemoral from "./Submenu/Lumbar/EditorFemoral";
import EditorSafeno from "./Submenu/Lumbar/EditorSafeno";
import Editorcutaneoposterior from "./Submenu/Sacro/Editorcutaneoposterior";
import EditorRaicesLumbosacro from "./Submenu/Lumbasacro/EditorRaicesLumbosacro";
import EditorCiatico from "./Submenu/Lumbasacro/EditorCiatico";
import EditorPeroneo from "./Submenu/Lumbasacro/EditoPeroneo";
import EditorTibial from "./Submenu/Lumbasacro/EditorTibial";
import EditorPlantar from "./Submenu/Lumbasacro/EditorPlantar";
import EditorSural from "./Submenu/Lumbasacro/EditorSural";
import EditorInterdigital from "./Submenu/Lumbasacro/EditorInterdigital";

const MenuUltrasonido = () => {
  /*Presentacion */
  const [selectedOption, setSelectedOption] = useState(null);
  //BtnCraneales
  const [showCranealesMap, setShowCranealesMap] = useState(false);
  //btnCervical
  const [showCervicalMap, setShowCervicalMap] = useState(false);
  //btnBraquial
  const [showBraquialMap, setShowBraquialMap] = useState(false);
  //btnToracico
  const [showToracicoMap, setShowToracicoMap] = useState(false);
  //btnLumbar
  const [showLumbarMap, setShowLumbarMap] = useState(false);
  //btnLumbosacro
  const [showLumbosacroMap, setShowLumbosacroMap] = useState(false);
  //btnSacro
  const [showSacroMap, setShowSacroMap] = useState(false);

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  //BtnRegreso
  const RegresarMenu = () => {
    setSelectedOption(null);
    setShowCranealesMap(false);
    setShowCervicalMap(false);
    setShowBraquialMap(false);
    setShowToracicoMap(false);
    setShowLumbarMap(false);
    setShowLumbosacroMap(false);
    setShowSacroMap(false);
  };

  //Submenús
  // Craneales
  const Craneales = ["Nervio accesorio (Espinal)"];

  // Cervical
  const Cervical = ["Nervio frénico"];

  // Braquial
  const Braquial = [
    "Raíces cervicales",
    "Nervio torácico largo",
    "Nervio dorsal de la escápula",
    "Nervio supraescapular",
    "Nervio toracodorsal",
    "Nervio musculocutáneo",
    "Nervio cutáneo antebraquial",
    "Nervio axilar",
    "Nervio radial",
    "Nervio mediano",
    "Nervio ulnar",
  ];

  // Torácico
  const Toracico = ["Nervios intercostales"];

  // Lumbar
  const Lumbar = [
    "Nervio femorocutáneo lateral",
    "Nervio femoral",
    "Nervio safeno",
  ];

  // Lumbosacro
  const Lumbosacro = [
    "Raíces lumbosacras",
    "Nervio ciático",
    "Nervio peroneo",
    "Nervio tibial",
    "Nervio plantar",
    "Nervio sural",
    "Nervio interdigital",
  ];

  // Sacro
  const Sacro = ["Nervio femoral cutáneo posterior"];

  //Control de visibilidad
  //Craneales
  const ShowCraneales = () => {
    setShowCranealesMap(!showCranealesMap);
  };
  //Cervical
  const ShowCervical = () => {
    setShowCervicalMap(!showCervicalMap);
  };
  //Branquial
  const showBraquial = () => {
    setShowBraquialMap(!showBraquialMap);
  };
  //Toracico
  const showToracico = () => {
    setShowToracicoMap(!showToracicoMap);
  };
  //Lumbar
  const ShowLumbar = () => {
    setShowLumbarMap(!showLumbarMap);
  };
  //Lumbosacro
  const showLumbosacro = () => {
    setShowLumbosacroMap(!showLumbosacroMap);
  };
  //Sacro
  const ShowSacro = () => {
    setShowSacroMap(!showSacroMap);
  };

  return (
    <div className="">
      <div className="flex ">
        {/* Contenido del div izquierdo */}
        <div className=" w-1/3">
          {/*Botones */}
          <div className="BTN flex item-center justify-center">
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
                style={{
                  filter:
                    "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(200deg)",
                }}
              />
            </button>
            {/* 
            <button
              id="print"
              className="bg-black m-2 p-2 text-white rounded-full"
            >
              <Image
                src="/assets/IconSVG/I_Print.svg"
                alt="Logo de la empresa"
                width={25}
                height={25}
                style={{
                  filter:
                    "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(200deg)",
                }}
              />
            </button>*/}
          </div>

          <div className="p-1">
            <div className="p-1">
              {/*Menú */}
              {/* Botones para mostrar/ocultar divs */}
              <div className="flex flex-wrap mt-4">
                {/* btn Neurografia */}
                <button className="flex-1 bg-black text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2">
                  Menú Principal
                </button>
              </div>
            </div>

            {/* Divs ocultos/mostrados */}
            <div className="bg-[#404040] p-2 rounded-tr-lg rounded-bl-lg text-white text-justify flex flex-col">
              {/*Craneales */}
              {/* Botón para mostrar los segmentos craneales */}
              <button
                className="w-full lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-black text-white py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={ShowCraneales} // Manejador de clics para mostrar los segmentos craneales
              >
                ➤ Craneales{" "}
                {/* Texto del botón para mostrar los segmentos craneales */}
              </button>

              {/* Sección para mostrar los segmentos craneales si showCranealesMap es verdadero */}
              {showCranealesMap && (
                <div className="pl-6">
                  {" "}
                  {/* Div para el contenido de los segmentos craneales */}
                  {/* Mapeo de opciones de segmentos craneales */}
                  {Craneales.map((option, index) => (
                    <button
                      key={index} // Clave única para cada botón
                      className={`w-full lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-black text-white py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : "" // Estilos condicionales si la opción está seleccionada
                      }`}
                      onClick={() => handleClick(option)} // Manejador de clics para seleccionar la opción
                    >
                      {option} {/* Texto de la opción */}
                    </button>
                  ))}
                </div>
              )}

              {/*Cervical */}
              <button
                className="w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={ShowCervical}
              >
                ➤ Cervical
              </button>
              {showCervicalMap && (
                <div className="pl-6 flex flex-col">
                  {Cervical.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/*Branquial*/}
              <button
                className="w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={showBraquial}
              >
                ➤ Branquial
              </button>
              {showBraquialMap && (
                <div className="pl-6 flex flex-col">
                  {Braquial.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/*Toracico */}
              <button
                className="w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={showToracico}
              >
                ➤ Torácico
              </button>
              {showToracicoMap && (
                <div className="pl-6">
                  {Toracico.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/*Lumbar */}
              <button
                className="w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={ShowLumbar}
              >
                ➤ Lumbar
              </button>
              {showLumbarMap && (
                <div className="pl-6 flex flex-col">
                  {Lumbar.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/*Lumbarsacro */}
              <button
                className="w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={showLumbosacro}
              >
                ➤ LumboSacro
              </button>
              {showLumbosacroMap && (
                <div className="pl-6 flex flex-col">
                  {Lumbosacro.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/*Sacro*/}
              <button
                className="w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate"
                onClick={ShowSacro}
              >
                ➤ Sacro
              </button>
              {showSacroMap && (
                <div className="pl-6">
                  {Sacro.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === option ? "bg-opacity-50" : ""
                      }`}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido del div derecho */}
        <div className="w-2/3">
          <div>
            <div className="BannerTitlepageReporte">
              <div>Ultrasonido</div>
            </div>

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
                <h1 className=" text-white text-4xl">Ultrasonido</h1>
                <p className="pt-16 text-white text-center text-xl italic">
                  Bienvenido a la sección de ultrasonido, donde tendrás acceso a
                  toda la información disponible en nuestra plataforma.
                </p>
              </div>
            )}

            {/* Contenido de edición */}
            {selectedOption && (
              <div className="rounded p-2 m-4">
                {/*Craneales*/}
                {selectedOption === "Nervio accesorio (Espinal)" && (
                  <EditorNervioAccesorio />
                )}
                {/*Cervical */}
                {selectedOption === "Nervio frénico" && <EditorNervioFrenico />}

                {/*Branquial*/}
                {selectedOption === "Raíces cervicales" && <Editorcervicales />}
                {selectedOption === "Nervio dorsal de la escápula" && (
                  <EditorNervioDorsalEscapula />
                )}
                {selectedOption === "Nervio torácico largo" && (
                  <EditorNerviotoracicolargo />
                )}
                {selectedOption === "Nervio supraescapular" && (
                  <EditorSupraescapular />
                )}
                {selectedOption === "Nervio toracodorsal" && (
                  <EditorToracordorsal />
                )}
                {selectedOption === "Nervio musculocutáneo" && (
                  <EditorMusculocutaneo />
                )}
                {selectedOption === "Nervio cutáneo antebraquial" && (
                  <EditorCutaneo />
                )}
                {selectedOption === "Nervio axilar" && <EditorAxilar />}
                {selectedOption === "Nervio radial" && <EditorRadial />}
                {selectedOption === "Nervio mediano" && <EditorMediano />}
                {selectedOption === "Nervio ulnar" && <EditorUlnar />}
                {/*Toracico*/}
                {selectedOption === "Nervios intercostales" && (
                  <EditorIntercostales />
                )}
                {/*Lumbar*/}
                {selectedOption === "Nervio femorocutáneo lateral" && (
                  <EditorFemoLateral />
                )}
                {selectedOption === "Nervio femoral" && <EditorFemoral />}
                {selectedOption === "Nervio safeno" && <EditorSafeno />}
                {/*LumbarSacro*/}
                {selectedOption === "Raíces lumbosacras" && (
                  <EditorRaicesLumbosacro />
                )}
                {selectedOption === "Nervio ciático" && <EditorCiatico />}
                {selectedOption === "Nervio peroneo" && <EditorPeroneo />}
                {selectedOption === "Nervio tibial" && <EditorTibial />}
                {selectedOption === "Nervio plantar" && <EditorPlantar />}
                {selectedOption === "Nervio sural" && <EditorSural />}
                {selectedOption === "Nervio interdigital" && (
                  <EditorInterdigital />
                )}
                {/*Sacro*/}
                {selectedOption === "Nervio femoral cutáneo posterior" && (
                  <Editorcutaneoposterior />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUltrasonido;
