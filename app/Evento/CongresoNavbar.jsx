import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CongresoNavbar() {
  const router = useRouter();

  const handleNavigate = (href) => {
    router.push(href);
  };

  return (
    <nav className="flex justify-between items-center bg-[#1c1c1c] px-8 py-3">
      <div
        className="block px-3 py-2 text-white cursor-pointer"
        onClick={() => handleNavigate("/Evento")}
      >
        Congresos
      </div>
      <div
        className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md cursor-pointer"
        onClick={() => handleNavigate("/Evento/AgregarCongresos")}
      >
        Agregar Congresos
      </div>
    </nav>
  );
}
