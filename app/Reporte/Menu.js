"use client";
import Image from "next/image";

export default function Perfil() {
  return (
    <div className="Conteiner">
      {/*Menú 1 */}
      <div className="lg:w-2/3 bg-orange-500 md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
        <div className="flex flex-wrap">
          <div className="Description w-full md:w-1/2">
            {/*Titulo */}
            <h2 className="title text-3xl font-semibold text-white mb-4">
              Sistema Nervioso
            </h2>
            <hr className="bg-white h-0.5" />
            {/*Grid of buttons*/}
            <div className="grid rid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <a href="./Reporte/Tipos/Neuronopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Neuronopatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Radiculopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Radiculopatía
                </button>
              </a>
            
              <a href="./Reporte/Tipos/Plexopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Plexopatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Neuropatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Neuropatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Polineuropatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Polineuropatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Union_Neuromuscular">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Unión Neuromuscular
                </button>
              </a>
              <a href="./Reporte/Tipos/Miopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Miopatía
                </button>
              </a>
              {/* <a href="./Reporte/Tipos/Dermatomas">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Dermatomas
                </button>
              </a> */}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            {/*Imagen */}
            <Image
              src="/mEDX_128_SNP.svg"
              alt="Radiolopatia"
              width={250}
              height={300}
              className="rounded-tr-lg rounded-bl-lg grayscale mt-6"
            />
          </div>
        </div>
      </div>

      {/*Menú 2 */}
      <div className="lg:w-2/3 bg-[#5F5F5F] md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
        <div className="flex flex-wrap">
          <div className="Description w-full md:w-1/2">
            {/* Titulo */}
            <h2 className="title text-3xl font-semibold text-white mb-4">
              Vías Neurológicas
            </h2>
            <hr className="bg-white h-0.5" />

            {/* Boton con ruta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <a href="./Reporte/Tipos/Visual">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Visual
                </button>
              </a>
              <a href="./Reporte/Tipos/Auditiva">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Auditiva
                </button>
              </a>
              <a href="./Reporte/Tipos/Somatosensorial">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Somatosensorial
                </button>
              </a>
              <a href="./Reporte/Tipos/Motores">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Motora Corticoespinal
                </button>
              </a>
              {/* <a href="./Reporte/Tipos/TrigeminoFacial"> */}
              <a >
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Trigémino-Facial
                </button>
              </a>
             
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            {/* Imagen */}
            <Image
              src="/mEDX_128_VN.svg"
              alt="Radiolopatia"
              width={250}
              height={300}
              className="rounded-tr-lg rounded-bl-lg  grayscale mx-2 mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
