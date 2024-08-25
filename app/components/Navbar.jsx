import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleNavigate = (href) => {
    router.push(href);
  };

  return (
    <nav className="flex justify-between items-center bg-grey px-8 py-3">
      <div
        className="block px-3 py-2 text-white cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        Temas
      </div>
      <div
        className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md cursor-pointer"
        onClick={() => handleNavigate("/AgregarTopics")}
      >
        Agregar Temas
      </div>
    </nav>
  );
}
