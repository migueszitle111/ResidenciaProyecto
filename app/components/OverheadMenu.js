"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OverheadMenu = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleProtectedRoute = (route) => {
    if (!session) {
      const confirmResult = window.confirm(
        "Debes iniciar sesión para acceder. ¿Quieres iniciar sesión ahora?"
      );
      if (confirmResult) {
        router.push("/Login");
      }
    } else {
      router.push(route);
    }
  };

  return (
    <div>
      <nav className="bg-[#000000] text-white">
        <ul className="flex space-x-4 md:space-x-20 justify-center items-center py-2">
          <li>
            <a href="/">
              <button className="buttommenu inline-block hover:border-b hover:border-gray-500">
                Inicio
              </button>
            </a>
          </li>
          <li>
            <button
              onClick={() => handleProtectedRoute("/Educacion")}
              className="buttommenu inline-block hover:border-b hover:border-gray-500"
            >
              Educación
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedRoute("/Reporte")}
              className="buttommenu inline-block hover:border-b hover:border-gray-500"
            >
              Reporte
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedRoute("/Evento")}
              className="buttommenu inline-block hover:border-b hover:border-gray-500"
            >
              Eventos
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OverheadMenu;
