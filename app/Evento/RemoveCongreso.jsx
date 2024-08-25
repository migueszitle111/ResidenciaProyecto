import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveCongreso({ id }) {
  const removeCongreso = async () => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este congreso?');
    if (confirmed) {
      await fetch(`http://localhost:3000/api/congresos?id=${id}`, {
        method: 'DELETE',
      });
      
      // Reload the page after deletion
      window.location.reload();
    }
  };

  return (
    <button onClick={removeCongreso} className="text-white">
      <HiOutlineTrash size={24} title="Eliminar"/>
    </button>
  );
}