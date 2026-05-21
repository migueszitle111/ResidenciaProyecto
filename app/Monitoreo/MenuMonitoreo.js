import React, { useState } from "react";
import Image from "next/image";
import FormularioReporte from "./components/FormularioReporte";
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
  const [showReporteGeneral, setShowReporteGeneral] = useState(false);
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

      {/* Tarjeta principal — estilo Reporte */}
      {!selectedOption && (
        <div className="lg:w-2/3 bg-orange-500 md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Tipos de Monitoreo
              </h2>
              <hr className="bg-white h-0.5 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {["Craneal", "Cervical", "Lumbar", "Otros"].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => handleClick(
                      tipo === "Craneal" ? "Resección de tumor cerebral" :
                      tipo === "Cervical" ? "Fusión cervical anterior" :
                      tipo === "Lumbar" ? "Discectomía lumbar" :
                      "Toracotomía"
                    )}
                    className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-sm transition-colors"
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
              <Image
                src="/L_B_Blanco.svg"
                alt="Monitoreo"
                width={200}
                height={200}
                className="grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      )}

      {/* Botón "..." — Reporte de Monitoreo General */}
      {!selectedOption && (
        <div className="lg:w-2/3 mx-auto flex justify-end px-5 mb-2">
          <button
            onClick={() => setShowReporteGeneral(true)}
            className="bg-black text-white px-4 py-3 rounded-lg border border-white/20 hover:border-orange-500/60 hover:bg-[#111] transition-colors text-sm font-semibold tracking-widest"
          >
            •••
          </button>
        </div>
      )}

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
      {/* Modal — Reporte de Monitoreo General */}
      {showReporteGeneral && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-orange-400 font-bold text-lg">Reporte de Monitoreo General</h2>
              <button
                onClick={() => setShowReporteGeneral(false)}
                className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 text-white flex items-center justify-center hover:bg-[#2a2a2a] transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-5 py-4">
              <FormularioReporte nombreCirugia="REPORTE_GENERICO" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuMonitoreo;
