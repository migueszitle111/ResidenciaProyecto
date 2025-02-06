"use client";
// Importa las dependencias necesarias
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Overhead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const { data: session, status } = useSession();
  const [showSignInMessage, setShowSignInMessage] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [hoveredResult, setHoveredResult] = useState(null);
  const router = useRouter();

  // Definir las opciones de autocompletado
  const searchOptions = [
    "Educacion",
    "Evento",
    "Reporte Anatomico",
    "Perfil",
    "Videos",
    "Protocolos",
    "Perlas",
    "Podcast",
    "Ultrasonidos",
    "Monitoreo",
    "Patrocinio",
    "Valores",
    // Agrega más opciones según sea necesario
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filtra los resultados que coinciden con la consulta
    const matchingResults = searchOptions.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );

    // Actualiza los resultados de autocompletado
    setAutocompleteResults(matchingResults);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      performSearch(searchQuery);
    }
  };

  const performSearch = (query) => {
    console.log("Realizar búsqueda con:", query);

    switch (query.toLowerCase()) {
      case "educacion":
        router.push("/Educacion");
        break;
      case "evento":
        router.push("/Evento");
        break;
      case "reporte anatomico":
        router.push("/Reporte");
        break;
      case "perfil":
        router.push("/Perfil");
        break;
      case "videos":
        router.push("/NoDisponible");
        break;
      case "protocolos":
        router.push("/Protocolos");
        break;
      case "perlas":
        router.push("/Perlas");
        break;
      case "podcast":
        router.push("/NoDisponible");
        break;
      case "ultrasonidos":
        router.push("/Ultrasonido");
        break;
      case "monitoreo":
        router.push("/Monitoreo");
        break;
      case "patrocinio":
        router.push("/Patrocinio");
        break;
      case "Tecnicas":
        router.push("/Tecnicas");
        break;

      default:
      // Implementa la lógica real de búsqueda aquí
      // setSearchResults(...);
    }
  };

  const handleResultClick = (result) => {
    performSearch(result);
    setSelectedResult(result);
  };

  const handleResultMouseEnter = (result) => {
    setHoveredResult(result);
  };

  const handleResultMouseLeave = () => {
    setHoveredResult(null);
  };

  const handleSignInMouseOver = () => {
    setShowSignInMessage(true);
  };

  const handleSignInMouseLeave = () => {
    setShowSignInMessage(false);
  };

  return (
    <div className="relative z-10 Conteiner text-xs">
      <header className="bg-[#000000] px-1 pt-2 flex items-center justify-between">
          {/*Buscador */}
          <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex items-center">
            <div className="flex items-center relative">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  left: "8px",
                  top: "15%",
                }}
              >
                <Image
                  src="./I_Search.svg"
                  width={25}
                  height={25}
                  alt="Icono de búsqueda"
                  style={{
                    filter:
                      "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(200deg)",
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="    Buscar"
                className="px-4 py-1 bg-[#000000] text-white text-sm rounded-full placeholder-white border border-white focus:outline-none focus:border-[#D06D33] transition-all pr-8 "
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
              />
            </div>

            {/* Muestra los resultados de autocompletado debajo del buscador */}
            {autocompleteResults.length > 0 && (
              <div className="autocomplete-results absolute left-0 right-0 top-full bg-[#1C1C1C] text-white py-2 rounded-md">
                <ul className="border border-orange">
                  {autocompleteResults.map((result) => (
                    <li
                      key={result}
                      onClick={() => handleResultClick(result)}
                      onMouseEnter={() => handleResultMouseEnter(result)}
                      onMouseLeave={handleResultMouseLeave}
                      className={`
                      ${selectedResult === result ? "hover:bg-[#8F3400]" : ""}
                      ${hoveredResult === result ? "bg-[#8F3400]" : ""}
                      p-2
                    `}
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

          {/*Logo */}
          <div className="flex items-center justify-center px-5"> {/* md:justify-end flex-grow */}
          {/* Acomodar a la derecha en pantallas grandes y en el centro en pantallas pequeñas */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/L_H_Blanco.svg"
              alt="Logo de la empresa"
              width={100}
              height={100}
            />
          </a>
        </div>
        
          {/*Inicio y registro */}
          <div className="hidden text-sm md:flex items-center space-x-4">
          {/* Estado de carga durante la autenticación */}
          {status === "loading" ? (
            <button
              className="px-3 py-1 bg-[#D06D33] hover:bg-[#8F3400] text-black rounded"
              disabled
            >
              <Image
                src="/I_Time.svg"
                alt="Icono de cargando"
                width={30}
                height={30}
                style={{
                  filter:
                    "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(200deg)",
                }}
              />
            </button>
          ) : (
            // Mostrar botones dependiendo del estado de la sesión
            <>
              {/* Si hay una sesión activa, muestra datos del usuario y botón de cierre de sesión */}
              {session && session.user ? (
                <div className="flex items-center">
                  <div className="email-container items-center">
                    <button onClick={toggleMenu} className="text-white">
                      <img
                        className="w-8 h-8 rounded-full "
                        src={session.user?.imageUrl}
                        alt="Profile Preview"
                      />
                    </button>
                    {isOpen && (
                      <div className="absolute top-full right-0 mt-0 w-30 bg-[#1C1C1C] py-2 rounded-md shadow-md">
                        <ul className="toggleMenu text-justify">
                          <li>
                            {/* Enlace a la página de perfil */}
                            <Link
                              href="/Perfil"
                              passHref
                              scroll={false}
                              className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md"
                            >
                              Tu Perfil
                            </Link>
                          </li>
                          <li>
                            {/* Enlace para cerrar sesión */}
                            <a
                              className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md"
                              onClick={() => signOut()}
                            >
                              Cerrar Sesión
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Si no hay sesión, muestra botones para registrarse e iniciar sesión
                <>
                  <button className="px-4 py-0.5 bg-[#D06D33] hover:bg-[#8F3400] text-white rounded">
                    <a href="/Registro">Regístrate</a>
                  </button>
                  <a href="/Login">
                    <button
                      onMouseOver={handleSignInMouseOver}
                      onMouseLeave={handleSignInMouseLeave}
                      className="flex items-center justify-center px-1 py-0.5 bg-[#D06D33] hover:bg-[#8F3400] text-white rounded"
                    >
                      {showSignInMessage && (
                        <p className="mr-2">Iniciar Sesión</p>
                      )}
                      <div className="mx-auto">
                        <Image
                          src="/assets/IconSVG/I_In.svg"
                          alt="Icono de iniciar sesión"
                          width={30}
                          height={30}
                          className="filter brightness-0 invert sepia saturate-5 hue-rotate-200"
                        />
                      </div>
                    </button>
                  </a>
                </>
              )}
            </>
          )}
        </div>

        {/*Menú cuando la pantalla es chica */}
        <div className="md:hidden absolute top-0 right-0 z-10 flex justify-center items-center">
          {/* Posiciona el menú en la parte superior y asegúrate de que tenga un z-index superior */}
          <button onClick={toggleMenu} className="text-white">
            <img
              src={session?.user?.imageUrl}
              alt="Logo de la empresa"
              width={20}
              height={20}
              className="w-8 h-8 rounded-full mr-2"
            />
          </button>
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-60 bg-[#1C1C1C] py-2 rounded-md shadow-md">
              <ul className="text-white text-center">
                <li className="pl-2 pb-2">
                  <input
                    type="text"
                    placeholder="  Buscar..."
                    className="p-1 bg-[#1C1C1C] text-white text-sm rounded-full placeholder-white border border-white focus:outline-none focus:border-[#D06D33] transition-all pr-8"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchKeyPress}
                  />
                </li>
                <li className="pl-2 pb-2">
                  <a href="/Perfil">Ver Perfil</a>
                </li>
                <li className="pl-2 pb-2">
                  <a href="/Perfil">Cerrar</a>
                </li>
                <li className="pl-2 pb-2">
                  <button className="px-4 py-1 bg-[#D06D33] hover:bg-[#8F3400] text-black rounded text-sm">
                    <a href="/Registro">Regístrate</a>
                  </button>
                </li>
                {/* Agregar más opciones de menú según sea necesario */}
              </ul>
            </div>
          )}
       </div>
      </header>
    </div>
  );
};

// Exporta el componente Overhead
export default Overhead;
