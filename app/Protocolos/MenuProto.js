import React, { useState } from "react";
import Image from "next/image";
import EditorSincinesia from "./Componentes/SintomasSignos/EditorSincinesia.jsx";
import EditorFacial from "./Componentes/Patologia/EditorFacial";
import EditorRamsayHunt from "./Componentes/Patologia/EditorRamsayHunt";
import EditorEncefalico from "./Componentes/Patologia/EditorEncefalico";
import EditorCerebral from "./Componentes/Patologia/EditorCerebral";
import EditorRadiculopatia from "./Componentes/Patologia/EditorRadiculopatia";
import EditorEstenosisEspinal from "./Componentes/Patologia/EditorEstenosisEspinal";
import EditorPlexopatia from "./Componentes/Patologia/EditorPlexopatia";
import EditorTunelCarpo from "./Componentes/Patologia/EditorTunelCarpo";
import EditorCanalCubital from "./Componentes/Patologia/EditorCanalCubital";
import EditorSabado from "./Componentes/Patologia/EditorSabado";
import EditorTunelTarso from "./Componentes/Patologia/EditorTunelTarso";
import EditorEsclerosis from "./Componentes/Patologia/EditorEsclerosis";
import EditorAtrofiamuscular from "./Componentes/Patologia/EditorAtrofiamuscular";
import EditorMiopia from "./Componentes/Patologia/EditorMiopia";
import EditorMiastenia from "./Componentes/Patologia/EditorMiastenia";
import EditorLambert from "./Componentes/Patologia/EditorLambert";
import EditorCanalopatia from "./Componentes/Patologia/EditorCanalopatia";
import EditorPolineuropatia from "./Componentes/Patologia/EditorPolineuropatia";
import EditorGuillain from "./Componentes/Patologia/EditorGuillain";
import EditorNeuritis from "./Componentes/Patologia/EditorNeuritis";
import EditorCaraCraneo from "./Componentes/Segmentos/EditorCaraCraneo";
import EditorCuello from "./Componentes/Segmentos/EditorCuello";
import EditorMiembroSuperior from "./Componentes/Segmentos/EditorMiembroSuperior";
import EditorMiembroInferior from "./Componentes/Segmentos/EditorMiembroInferior";
import EditorExtremidades from "./Componentes/Segmentos/EditorExtremidades";
import EditorEspaldaBaja from "./Componentes/Segmentos/EditorEspaldaBaja";
import EditorTronco from "./Componentes/Segmentos/EditorTronco";
import EditorPelvico from "./Componentes/Segmentos/EditorPelvico";
import EditorPotencialesProvocados from "./Componentes/Multimodales/EditorPotencialesProvocados";
import EditorAlada from "./Componentes/Multimodales/EditorAlada";
import EditorManoCaido from "./Componentes/Multimodales/EditorManoCaida";
import EditorPieCaido from "./Componentes/Multimodales/EditorPieCaido";
import EditorHombroDoloroso from "./Componentes/Multimodales/EditorHombroDoloroso";
import EditorCervicalgia from "./Componentes/Multimodales/EditorCervicalgia";
import EditorLumbalgia from "./Componentes/Multimodales/EditorLumbalgia";
import EditorMuscularGeneralizada from "./Componentes/Multimodales/EditorMuscularGeneralizada";
import EditorMuscularSegmentaria from "./Componentes/Multimodales/EditorMuscularSegmentaria";
import EditorIncontinencia from "./Componentes/Multimodales/EditorIncontinencia";
import EditorCafaela from "./Componentes/Multimodales/EditorCafalea";
import EditorNeurogenica from "./Componentes/Multimodales/EditorNeurogenica";
import EditorHipoestesias from "./Componentes/Multimodales/EditorHipoestesias";
import EditorTrigemino from "./Componentes/Patologia/EditorTrigemino.jsx";
import EditorMedular from "./Componentes/Patologia/EditorMedular.jsx";

const MenuProto = () => {
  /*Presentacion */
  const [selectedOption, setSelectedOption] = useState(null);
  //Btn Patologias
  const [showPatologiasMap, setShowPatologiasMap] = useState(false);
  //Btn Segmentos
  const [showSegmentosMap, setShowSegmentosMap] = useState(false);
  //Btn Multimodales
  const [showMultimodalesMap, setShowMultimodalesMap] = useState(false);
  //Signos y sintomas
  const [showSignosSintomasMap, setShowSignosSintomasMap] = useState(false);

  //Btn
  const handleClick = (option) => {
    setSelectedOption(option);
  };

  //BtnRegreso
  const RegresarMenu = () => {
    setSelectedOption(null);
    setShowPatologiasMap(false);
    setShowSegmentosMap(false);
    setShowMultimodalesMap(false);
    setShowSignosSintomasMap(false);
  };
  const Patologias = [
    "Parálisis Facial",
    "Síndrome de Ramsay Hunt",
    "Neuralgia del trigémino",
    "Traumatismo cráneoencefálico",
    "Hipoxia cerebral",
    "Radiculopatía lumbar",
    "Canal medular estrecho o estenosis espinal",
    "Lesión medular",
    "Plexopatía",
    "Síndrome del túnel del carpo",
    "Síndrome del canal cubital",
    "Parálisis del sábado por la noche",
    "Merálgia parestesia",
    "Síndrome del túnel del tarso",
    "Esclerosis lateral amiotrofia y variantes",
    "Atrofia muscular espinal",
    "Miopatía",
    "Miastenia gravis",
    "Eaton Lambert",
    "Canalopatías",
    "Polineuropatía",
    "Síndrome de Guillain Barre",
    "Esclerosis Múltiple",
    "Neuritis herpética",
  ];

  const Segmentos = [
    "Cara y cráneo",
    "Cuello",
    "Miembros superiores",
    "Miembros inferiores",
    "4 extremidades",
    "Espalda baja",
    "Tronco",
    "Piso pélvico",
  ];

  const Multimodales = [
    "Potenciales provocados",
    "Escápula alada",
    "Mano caída",
    "Pie caído",
    "Hombro doloroso",
    "Cervicalgia",
    "Lumbalgia",
    "Atrofia muscular generalizada",
    "Atrofia muscular segmentaria",
    "Incontinencia",
    "Cefalea",
    "Claudicación neurogénica",
    "Hipoestesias/Disestesias",
  ];

  const SignosSintomas = ["Sincinesia escapular"];
  //Control de visibilidad
  //Patologia
  const ShowPatologia = () => {
    setShowPatologiasMap(!showPatologiasMap);
    setShowSegmentosMap(false);
    setShowMultimodalesMap(false);
    setShowSignosSintomasMap(false);
  };
  //Segmentos
  const ShowSegmentos = () => {
    setShowSegmentosMap(!showSegmentosMap);
    setShowPatologiasMap(false);
    setShowMultimodalesMap(false);
    setShowSignosSintomasMap(false);
  };
  //Multimodales
  const ShowMultimodales = () => {
    setShowMultimodalesMap(!showMultimodalesMap);
    setShowPatologiasMap(false);
    setShowSegmentosMap(false);
    setShowSignosSintomasMap(false);
  };
  //SignosSIntomas
  const ShowSignosSintomas = () => {
    setShowSignosSintomasMap(!showSignosSintomasMap);
    setShowPatologiasMap(false);
    setShowSegmentosMap(false);
    setShowMultimodalesMap(false);
  };
  return (
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
              className="filter brightness-0 invert sepia saturate-5 hue-rotate-200"
            />
          </button>
        </div>

        <div className="p-1">
          <div className="p-1">
            {/* Menú */}
            {/* Botones para mostrar/ocultar divs */}
            <div className="flex flex-wrap mt-4">
              {/* btn Patologia */}
              <button
                className={`flex-1 bg-${
                  showPatologiasMap ? "[#8F3400]" : "black"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowPatologia}
              >
                Patología
              </button>

              {/* btn Segmento */}
              <button
                className={`flex-1 bg-${
                  showSegmentosMap ? "[#8F3400]" : "black"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowSegmentos}
              >
                Segmentos
              </button>
            </div>

            <div className="flex flex-wrap">
              {/*btn Multimodales */}
              <button
                className={`flex-1 bg-${
                  showMultimodalesMap ? "[#8F3400]" : "black"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowMultimodales}
              >
                Multimodales
              </button>
              {/*btn Signos Y Sintomas */}
              <button
                className={`flex-1 bg-${
                  showSignosSintomasMap ? "[#8F3400]" : "black"
                } text-white p-2 rounded-tr-lg rounded-bl-lg mr-2 mb-2`}
                onClick={ShowSignosSintomas}
              >
                Signos y Síntomas
              </button>
            </div>
          </div>

          {/* Divs ocultos/mostrados */}
          {/*Patologia */}
          {showPatologiasMap && (
            <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
              <h2 className="text-lg mb-4">Patología</h2>
              {Patologias.map((option, index) => (
                <button
                  key={index}
                  className={`w-full lg:w-auto text-left lg:text-justify  hover:text-black active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                    selectedOption === option ? "bg-opacity-50" : ""
                  }`}
                  onClick={() => handleClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/*Segmento */}
          {showSegmentosMap && ( // Se muestra el segmento del mapa si showSegmentosMap es verdadero
            <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
              <h2 className="text-lg mb-4">Segmento</h2>{" "}
              {/* Título del segmento */}
              {Segmentos.map(
                (
                  option,
                  index // Mapeo de opciones de segmentos
                ) => (
                  <button
                    key={index} // Clave única para cada botón
                    className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-black text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                      selectedOption === option ? "bg-opacity-50" : "" // Aplicación de estilos condicionales si la opción está seleccionada
                    }`}
                    onClick={() => handleClick(option)} // Manejador de clics para seleccionar la opción
                  >
                    {option} {/* Texto de la opción */}
                  </button>
                )
              )}
            </div>
          )}

          {/*Multimodales */}
          {showMultimodalesMap && (
            <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
              <h2 className="text-lg mb-4">Multimodales</h2>
              {Multimodales.map((option, index) => (
                <button
                  key={index}
                  className={`w-full lg:w-auto text-left lg:text-justify  hover:text-orange-600 active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                    selectedOption === option ? "bg-opacity-50" : ""
                  }`}
                  onClick={() => handleClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/*Signos y Sintomas */}
          {showSignosSintomasMap && (
            <div className="bg-[#404040] mt-1 p-2 rounded-bl-lg rounded-tr-lg text-white text-justify flex flex-col">
              <h2 className="text-lg mb-4">Signos y síntomas</h2>
              {SignosSintomas.map((option, index) => (
                <button
                  key={index}
                  className={`w-full lg:w-auto text-left lg:text-justify  hover:text-black active:bg-[#404040] text-white  py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
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

      {/* Contenido del div derecho */}
      <div className="w-2/3">
        <div>
          <div className="BannerTitlepageReporte">
            <div>Protocolos</div>
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
              <h1 className=" text-white text-4xl">Protocolos</h1>
              <p className="pt-16 text-white text-center text-xl italic">
                Bienvenido a la sección de protocolos, donde tendrás acceso a
                toda la información disponible en nuestra plataforma.
              </p>
            </div>
          )}

          {/*Contenido de edicion */}
          {selectedOption && (
            <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
              {/*Patologia*/}
              {selectedOption === "Parálisis Facial" && <EditorFacial />}
              {selectedOption === "Neuralgia del trigémino" && (
                <EditorTrigemino />
              )}
              {selectedOption === "Síndrome de Ramsay Hunt" && (
                <EditorRamsayHunt />
              )}
              {selectedOption === "Traumatismo cráneo encefálico" && (
                <EditorEncefalico />
              )}
              {selectedOption === "Hipoxia cerebral" && <EditorCerebral />}
              {selectedOption === "Radiculopatía lumbar" && (
                <EditorRadiculopatia />
              )}
              {selectedOption ===
                "Canal medular estrecho o estenosis espinal" && (
                <EditorEstenosisEspinal />
              )}
              {selectedOption === "Lesión medular" && <EditorMedular />}
              {selectedOption === "Plexopatía" && <EditorPlexopatia />}
              {selectedOption === "Síndrome del túnel del carpo" && (
                <EditorTunelCarpo />
              )}
              {selectedOption === "Síndrome del canal cubital" && (
                <EditorCanalCubital />
              )}
              {selectedOption === "Parálisis del sábado por la noche" && (
                <EditorSabado />
              )}
              {selectedOption === "Síndrome del túnel del tarso" && (
                <EditorTunelTarso />
              )}
              {selectedOption ===
                "Esclerosis lateral amiotrofia y variantes" && (
                <EditorEsclerosis />
              )}
              {selectedOption === "Atrofia muscular espinal" && (
                <EditorAtrofiamuscular />
              )}
              {selectedOption === "Miopatía" && <EditorMiopia />}
              {selectedOption === "Miastenia gravis" && <EditorMiastenia />}
              {selectedOption === "Eaton Lambert" && <EditorLambert />}
              {selectedOption === "Canalopatías" && <EditorCanalopatia />}
              {selectedOption === "Polineuropatía" && <EditorPolineuropatia />}
              {selectedOption === "Síndrome de Guillain Barre" && (
                <EditorGuillain />
              )}
              {selectedOption === "Esclerosis Múltiple" && <EditorEsclerosis />}
              {selectedOption === "Neuritis herpética" && <EditorNeuritis />}
              {/*Segmento*/}
              {selectedOption === "Cara y cráneo" && <EditorCaraCraneo />}
              {selectedOption === "Cuello" && <EditorCuello />}
              {selectedOption === "Miembros superiores" && (
                <EditorMiembroSuperior />
              )}
              {selectedOption === "Miembros inferiores" && (
                <EditorMiembroInferior />
              )}
              {selectedOption === "4 extremidades" && <EditorExtremidades />}
              {selectedOption === "Espalda baja" && <EditorEspaldaBaja />}
              {selectedOption === "Tronco" && <EditorTronco />}
              {selectedOption === "Piso pélvico" && <EditorPelvico />}
              {/*Multimodales */}
              {selectedOption === "Potenciales provocados" && (
                <EditorPotencialesProvocados />
              )}
              {selectedOption === "Escápula alada" && <EditorAlada />}
              {selectedOption === "Mano caída" && <EditorManoCaido />}
              {selectedOption === "Pie caído" && <EditorPieCaido />}
              {selectedOption === "Hombro doloroso" && <EditorHombroDoloroso />}
              {selectedOption === "Cervicalgia" && <EditorCervicalgia />}
              {selectedOption === "Lumbalgia" && <EditorLumbalgia />}
              {selectedOption === "Atrofia muscular generalizada" && (
                <EditorMuscularGeneralizada />
              )}
              {selectedOption === "Atrofia muscular segmentaria" && (
                <EditorMuscularSegmentaria />
              )}
              {selectedOption === "Incontinencia" && <EditorIncontinencia />}

              {selectedOption === "Cefalea" && <EditorCafaela />}
              {selectedOption === "Claudicación neurogénica" && (
                <EditorNeurogenica />
              )}
              {selectedOption === "Hipoestesias/Disestesias" && (
                <EditorHipoestesias />
              )}
              {/*Signos y sintomas*/}
              {selectedOption === "Sincinesia escapular" && (
                <EditorSincinesia />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuProto;
