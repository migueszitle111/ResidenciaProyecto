import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Blog() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [mediaURL, setMediaURL] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleString("es-MX", options);
      setCurrentDate(formattedDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Para mostrar la imagen o video seleccionado antes de subirlo
    const url = URL.createObjectURL(file);
    setMediaURL(url);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Nombre del archivo:", selectedFile.name);
      console.log("Tipo de archivo:", selectedFile.type);
      console.log("Tamaño del archivo:", selectedFile.size, "bytes");
    } else {
      console.log("No se ha seleccionado ningún archivo.");
    }
  };

  return (
    <div className="w-2/3 lg:w-2/3 md:w-2/3 sm:w-2/3 mx-auto mb-5 ">
      <div className="items-center px-2 py-2 m-3">
        <div className="BannerTitlepageReporte">
          <div>Perlas</div>
        </div>
      </div>

      <div className="w-full bg-black flex border-2 border-orange-500/50 rounded-tr-lg rounded-bl-lg">
        {/* Div izquierdo foto redonda */}
        <div className="ml-2">
          <Image
            src="/L_B_Blanco.svg"
            width={70}
            height={70}
            alt="Logo"
            className="rounded-full"
          />
        </div>
        {/* Div derecho */}
        <div className="flex flex-col w-5/6 p-2">
          {/* Nombre y fecha */}
          <div className="w-full">
            <h1 className="text-[#FFFFFF]">mEDXpro</h1>
            <p className="text-xs italic text-orange-700">{currentDate}</p>
          </div>
          <hr className="bg-gray-500 h-0.5 my-4" />
          {/* Textera descripción */}
          <div className="w-full">
            <textarea
              className="w-full border p-2"
              placeholder="Escribe aquí..."
            ></textarea>
          </div>
          {/* Contenido multimedia */}
          <div>
            {selectedFile &&
              // Mostrar la imagen o video seleccionado
              (selectedFile.type.startsWith("image/") ? (
                <Image
                  src={mediaURL}
                  alt="Preview"
                  className="max-w-full rounded-tr-lg rounded-bl-lg"
                  width={150}
                  height={150}
                />
              ) : (
                <video controls src={mediaURL} className="max-w-full" />
              ))}
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Subir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
