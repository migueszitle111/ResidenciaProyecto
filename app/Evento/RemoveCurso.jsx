import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveCurso({ id }) {
  const removeCurso = async () => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este curso?');
    if (confirmed) {
      await fetch(`http://localhost:3000/api/cursos?id=${id}`, {
        method: 'DELETE',
      });
      
      // Reload the page after deletion
      window.location.reload();
    }
  };

  return (
    <button onClick={removeCurso} className="text-white">
      <HiOutlineTrash size={24} title="Eliminar" />
    </button>
  );
}