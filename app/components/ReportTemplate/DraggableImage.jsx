import { useState } from 'react';

export const DraggableDiv = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true); // Expande el div al comenzar el arrastre
  };

  const handleDragEnd = () => {
    setIsDragging(false); // Vuelve al tamaño pequeño cuando termina el arrastre
  };

  return (
    <div
      className={`draggableDiv ${isDragging ? 'expanded' : ''}`}
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