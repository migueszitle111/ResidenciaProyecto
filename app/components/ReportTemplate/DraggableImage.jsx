export const DraggableDiv = ({ children }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggableDiv"
      draggable="true"
      onDragStart={handleDragStart}
      style={{ cursor: 'move' }}
    >
      {children}
    </div>
  );
};
export default DraggableDiv;