"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const OverheadMenu = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProtectedRoute = (route) => {
    if (!session) {
      const confirmResult = window.confirm(
        "Debes iniciar sesion para acceder. Quieres iniciar sesion ahora?"
      );

      if (confirmResult) {
        router.push("/Login");
      }

      return;
    }

    router.push(route);
  };

  return (
    <div>
      <nav className="bg-[#000000] text-white">
        <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-12 py-2">
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
              Educacion
            </button>
          </li>
          <li>
            <button
              onClick={() => handleProtectedRoute("/Tecnicas")}
              className="buttommenu inline-block hover:border-b hover:border-gray-500"
            >
              Tecnicas
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
              onClick={() => handleProtectedRoute("/Monitoreo")}
              className="buttommenu inline-block hover:border-b hover:border-gray-500"
            >
              Monitoreo
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OverheadMenu;
