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
        </ul>
      </nav>
    </div>
  );
};

export default OverheadMenu;
