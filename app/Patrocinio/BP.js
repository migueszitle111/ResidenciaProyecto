import React, { useState, useEffect } from "react";
import images from "../exports";
import Image from "next/image";

const BP = () => {
  /*Estado del componente */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newImage, setNewImage] = useState(null);

  /*Animaciones */

  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  /*Cambia a la siguiente imagen */

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 10000);
    return () => clearInterval(interval);
  }, []);

  /*Seleccion de una imagen por parte del usuario */
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

  /*Agrega una nueva imagen al arreglo "images" */

  const addNewImage = () => {
    if (newImage) {
      images.push({ src: newImage });
      setCurrentIndex(images.length - 1);
      setNewImage(null);
    }
  };

  /*Remueve una imagen del arreglo 34images" basado en su indice */
  const removeImage = (indexToRemove) => {
    if (indexToRemove >= 0 && indexToRemove < images.length) {
      images.splice(indexToRemove, 1);
      if (currentIndex === images.length) {
        setCurrentIndex(0);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" relative">
        <div>
          {/*Slick */}
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
              {/*Btn para eliminar la imagen llamando la funcion removeImage */}
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 m-5 bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Eliminar
              </button>

              {/*Imagenes mostradas, muestra el control del tamaño de las imagenes mostradas */}
              <Image
                src={image.src}
                alt=""
                width={1200}
                height={650}
                style={{ width: "1200px", height: "650px" }}
                className="rounded-tr-lg rounded-bl-lg"
              />
            </div>
          ))}

          {/*Opcion para subir la imagen desde el dispositivo */}
          <input
            type="file"
            onChange={handleImageChange}
            className="absolute bottom-0 left-0 m-5"
          />

          {/*Boton para agrega la imagen cargada al slick */}
          <button
            onClick={addNewImage}
            className="absolute bottom-0 right-0 m-5 bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Agregar Imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default BP;
