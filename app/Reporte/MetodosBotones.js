import { useState, useCallback } from 'react';

export function useImageState() {
  // Estado para las imagenes seleccionadas
  const [selectedImages, setSelectedImages] = useState([]);
    // Estados para el historial de imagenes
  const [history, setHistory] = useState([]);
  const [Future, setFuture] = useState([]); 

  // Funciones para el historial de imagenes, en caso de usar Undo te regresa a la imagen anterior
  const handleImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setHistory((prevHistory) => [...prevHistory, selectedImages]);
      setSelectedImages((prevImages) => [
        ...prevImages,
        {
          src: URL.createObjectURL(event.target.files[0]),
          position: { x: Math.random() * 200, y: Math.random() * 200 },
          size: { width: 200, height: 200 },
        },
      ]);
      setFuture([]);
    }
  }, [selectedImages]);

  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      setFuture((prevFuture) => [selectedImages, ...prevFuture]);
      setSelectedImages(history[history.length - 1]);
      setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
    }
  }, [history, selectedImages]);

  const handlePrint = () => {
    window.print();
  };

  return {
    selectedImages,
    history,
    handleImageChange,
    handleUndo,
    handlePrint
  };
}
