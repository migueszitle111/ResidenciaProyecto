import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveBoton({ id }) {
  const removeTema = async () => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este tema?');
    if (confirmed) {
      await fetch(`http://localhost:3000/api/temarios?id=${id}`, {
        method: 'DELETE',
      });
      
      // Reload the page after deletion
      window.location.reload();
    }
  };

  return (
    <button onClick={removeTema} className="text-white" title="Eliminar">
      <HiOutlineTrash size={24} />
    </button>
  );
}
