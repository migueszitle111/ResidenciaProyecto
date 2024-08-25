"use client";
import React from "react";
import Image from "next/image";

export default function MenuPerlas() {
  return (
    <div className="Conteiner flex flex-col space-y-14 pt-9">
      {/*Menú 1 */}
      <div className=" 2xl:w-full xl:w-full lg:w-1/2 bg-[#8f8f8f] md:p-5 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
        <div className="flex flex-wrap">
          <div className="Description w-1/2">
            {/*Titulo */}
            <h2 className="title text-3xl font-semibold text-white mb-6">
              Opcion 1
            </h2>
            <hr className="bg-white h-0.5" />

            {/*Descrip */}
            <p className="text-white text-justify mt-5">
              lugar donde se podra hacer el reporte de esa cosa
            </p>

            {/*Boton con ruta */}
            <a href="./NoDisponible">
              <button className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900">
                ir
              </button>
            </a>
          </div>
          <div className="w-1/2 flex items-center justify-end relative ">
            {/*Imagen */}
            <Image
              src="/L_H_Blanco.svg"
              alt="Radiolopatia"
              width={250}
              height={300}
              className="rounded-tr-lg rounded-bl-lg border border-gray-400 grayscale mx-2"
            />
          </div>
        </div>
      </div>

      {/*Menú 2 */}
      <div className="2xl:w-full xl:w-full lg:w-1/2 bg-[#8f3400] md:p-5 flex flex-col mx-auto m-5 rounded-tr-lg rounded-bl-lg p-5">
        <div className="flex flex-wrap">
          <div className="Description w-1/2">
            {/*Titulo */}
            <h2 className="title text-3xl font-semibold text-white mb-6">
              Opcion 2
            </h2>
            <hr className="bg-white h-0.5" />

            {/*Descrip */}
            <p className="text-white text-justify mt-5">
              lugar donde se podra hacer el reporte de esa cosa
            </p>

            {/*Boton con ruta */}
            <a href="./NoDisponible">
              <button className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900">
                ir
              </button>
            </a>
          </div>
          <div className="w-1/2 flex items-center justify-end relative ">
            {/*Imagen */}
            <Image
              src="/L_H_Blanco.svg"
              alt="Radiolopatia"
              width={250}
              height={300}
              className="rounded-tr-lg rounded-bl-lg border border-gray-400 grayscale mx-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
