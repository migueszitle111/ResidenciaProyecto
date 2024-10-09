import { useState } from 'react';

export const DraggableDiv = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';

    // Crear un "drag preview" vacío para evitar que el fondo de la página sea visible
    const dragImage = document.createElement('div');
    dragImage.style.width = '0px';
    dragImage.style.height = '0px';
    dragImage.style.opacity = '0';
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    setIsDragging(true); // Expande el div al comenzar el arrastre
  };

  const handleDragEnd = () => {
    setIsDragging(false); // Vuelve al estado original al terminar el arrastre
  };

  return (
    <div
      className={`draggableDiv ${isDragging ? 'dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: 'move' }}
    >
      {children}
    </div>
  );
};

export default DraggableDiv;
