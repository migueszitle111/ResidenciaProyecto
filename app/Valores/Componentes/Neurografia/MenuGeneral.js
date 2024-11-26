import Image from "next/image";
import { useState } from "react";
import MedianoMt from "./MedianoMt/medianoMt";
import MedianoSt from "./MedianoSt/medianoSt";


const MenuGeneral = () => {
  // Estado para almacenar la opción seleccionada en el menú
  const [selectedOption, setSelectedOption] = useState(null);

  // Estado para controlar la visibilidad de los submenús
  const [subMenuVisibility, setSubMenuVisibility] = useState({});

  // Matriz de opciones de neurografía y submenús
  const Neurolografia = [
    {
      Menu: "Miembros superiores",
      Submenu: ["Mediano (motor)", 
        "Mediano (sensitivo)", 
        "Ulnar (motor)",
        "Ulnar (sensitivo)",
        "Radial (motor)",
        "Radial (sensitivo)",
        "Antebraquial cutáneo lateral",
        "Antebraquial cutáneo medial",
        "Antebraquial cutáneo posterior",
        "Axilar",
        "Musculocutáneo",
        "Supraescapular",
        "Escapular dorsal",
        "Torácico largo",
        "Toracodorsal",
        ],
    },
    {
      Menu: "Cervicales/Craneales",
      Submenu: ["Frénico", 
        "Espinal accesorio",
        "Supraclavicular",
        "Auricular mayor",
        "Occipital mayor",
        "Facial",
        "Trigémino",
        ],
    },
    {
      Menu: "Miembros inferiores",
      Submenu: [
        "Peroneo",
        "Peroneo superficial",
        "Peroneo profundo",
        "Tibial",
        "Sural",
        "Plantar",
        "Femoral",
        "Safeno",
        "Femorocutáneo lateral",
        "Cutáneo femoral",
      ],
    },
    {
      Menu: "Sacros",
      Submenu: ["Ciático", "Pudendo", "Dorsal del pene",],
    },
   
  ];

  // Función para manejar el clic en una opción del menú
  const handleClick = (option) => {
    setSelectedOption(option);
  };

  // Función para alternar la visibilidad de los submenús
  const toggleSubMenuVisibility = (menuOption) => {
    setSubMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [menuOption]: !prevVisibility[menuOption],
    }));
  };

  return (
    <div>
      <div className="BannerTitlepage">
        <div>Valores</div>
      </div>
      <div className="flex">
        {/* Contenido del div izquierdo */}
        <div className="w-1/4 max-h-full">
          <div className="p-1">
            <div className="p-1">
              {/* Menú de Neurografía siempre visible */}
              <div className="bg-[#3f3c3c] mt-1 p-2 rounded-bl-lg rounded-2xl text-white text-justify flex flex-col truncate lg:truncate xl:truncate">
                <h2 className="text-lg mb-4 truncate lg:truncate xl:truncate">
                  Neurografía
                </h2>
                {Neurolografia.map((menuOption, menuIndex) => (
                  <div key={menuIndex} className="ml-4">
                    <button
                      className={`w-full flex flex-col lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-[#404040] text-white py-2 lg:py-3 rounded truncate lg:truncate xl:truncate ${
                        selectedOption === menuOption.Menu
                          ? "bg-opacity-50"
                          : ""
                      }`}
                      onClick={() => {
                        handleClick(menuOption.Menu);
                        toggleSubMenuVisibility(menuOption.Menu);
                      }}
                    >
                      › {menuOption.Menu}
                    </button>
                    {subMenuVisibility[menuOption.Menu] && (
                      <div>
                        {menuOption.Submenu.map((submenuOption, submenuIndex) => (
                          <button
                            key={submenuIndex}
                            className={`w-full flex flex-col text-sm lg:w-auto text-left lg:text-justify hover:text-orange-600 active:bg-[#404040] text-white py-2 px-4 lg:py-3 lg:px-6 rounded truncate lg:truncate xl:truncate ${
                              selectedOption === submenuOption
                                ? "bg-opacity-50"
                                : ""
                            }`}
                            onClick={() => handleClick(submenuOption)}
                          >
                            {submenuOption}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del div derecho */}
        <div className="w-3/4 max-h-full">
          {!selectedOption && (
            <div className="flex min-h-screen flex-col items-center p-10">
              <Image
                src="/L_B_Blanco.svg"
                alt="Logo de la empresa"
                width={120}
                height={120}
                className="w-52 h-52"
              />
              <h1 className="text-white text-4xl">Valores</h1>
              <p className="pt-16 text-white text-center text-xl italic">
                Bienvenido a la sección de Valores en donde podrá contar a
                disposición de la información que se encuentran disponibles en
                nuestra plataforma.
              </p>
            </div>
          )}
          {selectedOption && (
            <div className="flex min-h-screen flex-col items-center rounded p-2 m-4">
              {selectedOption === "Mediano (motor)" && <MedianoMt />}
              {selectedOption === "Mediano (sensitivo)" && <MedianoSt />}
              {/* {selectedOption === "Trigémino" && <EditorTrigemino />}
              {selectedOption === "Accesorio Espinal" && (
                <EditorAccesorioEspinal />
              )} */}
              {/* Agrega aquí más componentes según sea necesario */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuGeneral;
