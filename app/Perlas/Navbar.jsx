import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleNavigate = (href) => {
    router.push(href);
  };

  return (
    <nav className="bg-[#1c1c1c] flex justify-between items-center px-2 py-2">
      <div
        className="block px-3 py-2 text-white cursor-pointer"
        onClick={() => handleNavigate("/Perlas")}
      >
        Post
      </div>
      <div
        className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md cursor-pointer"
        onClick={() => handleNavigate("/Perlas/AgregarPerlas")}
      >
        Agregar Posts
      </div>
    </nav>
  );
}