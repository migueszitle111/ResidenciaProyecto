"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import images from "../exports";

const EventRoulette = () => {
  // Estado del componente
  const { data: session } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newImage, setNewImage] = useState(null);

  // Animaciones
  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  // Cambia a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 1000);
    return () => clearInterval(interval);
  }, []);

  // Seleccion de una imagen por parte del usuario
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Agrega una nueva imagen al arreglo "images"
  const addNewImage = () => {
    if (newImage) {
      images.push({ src: newImage });
      setCurrentIndex(images.length - 1);
      setNewImage(null);
    }
  };

  // Remueve una imagen del arreglo "images" basado en su indice
  const removeImage = (indexToRemove) => {
    if (indexToRemove >= 0 && indexToRemove < images.length) {
      images.splice(indexToRemove, 1);
      if (currentIndex === images.length) {
        setCurrentIndex(0);
      }
    }
  };

  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <div className="pt-5 py-5 flex flex-row justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex items-center justify-center relative">
        {" "}
        {/* Ajusta el ancho del contenedor */}
        <div className="">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${index === currentIndex ? "block" : "hidden"}`}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 2 }}
            >
              {isAdmin && (
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 m-2 md:m-5 bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Eliminar
              </button>
              )}
              <Image
                src={image.src}
                alt=""
                width={600} // Ajusta el ancho de la imagen
                height={250} // Ajusta el alto de la imagen
                style={{ width: "800px", height: "300px" }}
                className="rounded-tr-lg rounded-bl-lg "
              />
            </div>
          ))}
          
          {isAdmin && (
          <input
            type="file"
            onChange={handleImageChange}
            className="bg-[#FFFFFF] absolute bottom-0 left-0 m-2 md:m-5"
          />
          )}
          {isAdmin && (
          <button
            onClick={addNewImage}
            className="absolute bottom-0 right-0 m-2 md:m-5 bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Agregar Imagen
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRoulette;