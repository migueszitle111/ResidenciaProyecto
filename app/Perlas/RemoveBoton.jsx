import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveBoton({ id }) {
  const removePost = async () => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este post?');
    if (confirmed) {
      await fetch(`http://localhost:3000/api/posts?id=${id}`, {
        method: 'DELETE',
      });
      
      // Reload the page after deletion
      window.location.reload();
    }
  };

  return (
    <button onClick={removePost} className="text-white" title="Eliminar">
      <HiOutlineTrash size={24} />
    </button>
  );
}
