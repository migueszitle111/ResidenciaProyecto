import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveBtn({ id }) {
  const removeTopic = async () => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este tema?');
    if (confirmed) {
      await fetch(`https://www.medxproapp.com/api/topics?id=${id}`, {
        method: 'DELETE',
      });
      
      // Reload the page after deletion
      window.location.reload();
    }
  };

  return (
    <button onClick={removeTopic} className="text-white">
      <HiOutlineTrash size={24} title="Eliminar"/>
    </button>
  );
}
