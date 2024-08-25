import React, { use, useState, useRef } from "react";
import Image from "next/image";
import EditorReseccionTumorCerebral from "./MonitoreoEditores/EditorReseccionTumorCerebral";
import EditorDisectomiaLumbar from "./MonitoreoEditores/EditorDisectomiaLumbar";
import EditorDisectomiayForaminotomiaCervical from "./MonitoreoEditores/EditorDisectomiayForaminotomiaCervical";
import EditorFusionCervicalAnterio from "./MonitoreoEditores/EditorFusionCervicalAnterior";
import EditorIntrumentaciónToracolumar from "./MonitoreoEditores/EditorInstrumentacionToracolumar";
import EditorLiberacionEstenosisMedular from "./MonitoreoEditores/EditorLiberacionEstenosisMedular";
import EditorNeurorrafiayTransposicionPeriferica from "./MonitoreoEditores/EditorNeurorrafiayTransposicionPeriferica";
import EditorNeurrofiaenPlexopatia from "./MonitoreoEditores/EditorNeurrografiaenPlexopatia";
import EditorTeracotomia from "./MonitoreoEditores/EditorTeracotomia";
import EditorLiberaciónNeural from "./MonitoreoEditores/EditorLiberacionNeural";
import EditorTumorFosaPosterior from "./MonitoreoEditores/EditorTumorFosaPosterior";

const MenuMonitoreo = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  // const contentRef = useRef(null);

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  const RegresarMenu = () => {
    setSelectedOption(null);
  };

  /**const handlePrint = () => {
    const content = contentRef.current;
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(content.innerHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };*/

  const Monitoreo = [
    "Resección de tumor cerebral",
    "Tumor de fosa posterior",
    "Fusión cervical anterior",
    "Discectomía y foraminotomía cervical",
    "Instrumentación toracolumbar",
    "Discectomía lumbar",
    "Liberación de estenosis medular",
    "Toracotomía",
    "Neurorrafia y transposición periférica",
    "Liberación neural",
    "Neurorrafia en plexopatía",
  ];

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
            {/* <button
              id="print"
              className="bg-black m-2 p-2 text-white rounded-full"
            >
             onClick={handlePrint}
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
              {Monitoreo.map((option, index) => (
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
          </div>
        </div>

        {/* Contenido del div derecho */}
        <div className="w-2/3">
          <div>
            <div className="BannerTitlepageReporte">
              <div>Monitoreo</div>
            </div>

            {/* Página disponible */}
            {!selectedOption && (
              <div className="flex h-full flex-col items-center p-10">
                <Image
                  src="/L_B_Blanco.svg"
                  alt="Logo de la empresa"
                  width={120}
                  height={120}
                  className="w-52 h-52"
                />
                <h1 className=" text-white text-4xl">Monitoreo</h1>
                <p className="pt-16 text-white text-center text-xl italic">
                  Bienvenido a la sección de monitoreo, donde tendrás acceso a
                  toda la información disponible en nuestra plataforma.
                </p>
              </div>
            )}

            {/* Contenido de edición ref={contentRef}*/}
            {selectedOption && (
              <div className=" rounded p-2 m-4">
                {selectedOption === "Resección de tumor cerebral" && (
                  <EditorReseccionTumorCerebral />
                )}
                {selectedOption === "Tumor de fosa posterior" && (
                  <EditorTumorFosaPosterior />
                )}
                {selectedOption === "Fusión cervical anterior" && (
                  <EditorFusionCervicalAnterio />
                )}
                {selectedOption === "Discectomía y foraminotomía cervical" && (
                  <EditorDisectomiayForaminotomiaCervical />
                )}
                {selectedOption === "Instrumentación toracolumbar" && (
                  <EditorIntrumentaciónToracolumar />
                )}
                {selectedOption === "Discectomía lumbar" && (
                  <EditorDisectomiaLumbar />
                )}
                {selectedOption === "Liberación de estenosis medular" && (
                  <EditorLiberacionEstenosisMedular />
                )}
                {selectedOption ===
                  "Neurorrafia y transposición periférica" && (
                  <EditorNeurorrafiayTransposicionPeriferica />
                )}
                {selectedOption === "Toracotomía" && <EditorTeracotomia />}
                {selectedOption === "Liberación neural" && (
                  <EditorLiberaciónNeural />
                )}
                {selectedOption === "Neurorrafia en plexopatía" && (
                  <EditorNeurrofiaenPlexopatia />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMonitoreo;
