import { useRouter } from 'next/navigation';

export default function CursoNavbar() {
  const router = useRouter();

  const handleNavigate = (href) => {
    router.push(href);
  };

  return (
    <nav className="flex justify-between items-center bg-black px-8 py-3">
      <div className="block px-3 py-2 text-white cursor-pointer" onClick={() => handleNavigate('/Evento')}>
        Cursos
      </div>
      <div
        className="block px-3 py-2 text-white hover:bg-orange-900 hover:text-white rounded-md cursor-pointer"
        onClick={() => handleNavigate('/Evento/AgregarCursos')}
      >
        Agregar Cursos
      </div>
    </nav>
  );
}
