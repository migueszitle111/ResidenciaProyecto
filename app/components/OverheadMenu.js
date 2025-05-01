"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Componente OverheadMenu
const OverheadMenu = () => {
  // Obtiene la sesión actual del usuario y su estado
  const { data: session, status } = useSession();

  // Estado de carga para gestionar la interacción durante la redirección
  const [loading, setLoading] = useState(true);

  // Router de Next.js para la navegación
  const router = useRouter();

  // Efecto para cambiar el estado de carga cuando cambia el estado de la sesión
  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  // Manejador del clic en el botón de perfil
  const handleProfileClick = () => {
    if (loading) {
      return; // Evitar interacciones durante la carga
    }

    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    if (!session) {
      const confirmResult = window.confirm(
        "Debes iniciar sesión para ver tu perfil. ¿Quieres iniciar sesión?"
      );
      if (confirmResult) {
        setLoading(true); // Desactiva la interactividad durante la redirección
        router.push("/Login");
      }
    } else {
      // Redirige a la página de perfil si el usuario está autenticado
      router.push("/Perfil");
    }
  };

  // Renderiza el menú de navegación
  return (
    <div>
      <nav className="bg-[#000000] text-white">
        <ul className="flex space-x-4 md:space-x-20 justify-center items-center py-2">
          <li>
            <a href="/">
              <button className="buttommenu  inline-block hover:border-b hover:border-gray-500">
                Inicio
              </button>
            </a>
          </li>
          <li>
            {/* <a href="/Educacion"> */}
            <a href="/NoDisponible">

              <button className="buttommenu inline-block hover:border-b hover:border-gray-500">
                Educación
              </button>
            </a>
          </li>
          <li>
            <a href="/Reporte">
              <button className="buttommenu  inline-block hover:border-b hover:border-gray-500">
                Reporte
              </button>
            </a>
          </li>
          <li>
            {/* <a href="/Evento"> */}
            <a href="/NoDisponible">

              <button className="buttommenu inline-block hover:border-b hover:border-gray-500">
                Evento
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Exporta el componente OverheadMenu
export default OverheadMenu;
