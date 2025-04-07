import React, { useState, useEffect } from 'react';
import '/app/components/ReportTemplate/DinamicImagesMenu.css';

// ----------------------------------------------------
// Componente para arrastrar (igual que antes):
// ----------------------------------------------------
const DraggableDiv = ({ children, isDraggable,itemId}) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (e) => {
    if (!isDraggable) return;
     // Aquí guardas el "itemId" en dataTransfer
     e.dataTransfer.setData('app-id', String(itemId))
     
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';

    // Imagen invisible que sigue el mouse durante el drag:
    const dragImage = document.createElement('div');
    dragImage.style.width = '0px';
    dragImage.style.height = '0px';
    dragImage.style.opacity = '0';
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    setIsDragging(true);
  };

  const handleDragEnd = () => {
    if (!isDraggable) return;
    setIsDragging(false);
  };

  return (
    <div
      className={`draggableDiv ${isDragging ? 'dragging' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: isDraggable ? 'move' : 'default' }}
    >
      {children}
    </div>
  );
};

// ----------------------------------------------------
// Área donde se suelta una imagen (igual que antes):
// ----------------------------------------------------
const DropArea2 = ({ isExpanded, setExpandedDivs }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    // 1) Ver si viene un "app-id" arrastrado:
    const draggedId = e.dataTransfer.getData('app-id'); 
    if (draggedId) {
      // Conviértelo a número y colapsa el div:
      const numericId = parseInt(draggedId, 10);
      if (!isNaN(numericId)) {
        setExpandedDivs(prev => ({
          ...prev,
          [numericId]: false
        }));
      }
    }

    // 2) También admitir archivos de imagen (como ya tenías):
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (files) => {
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        const file = imageFiles[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageSrc(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleInputChange = (e) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div
      className={`dropArea2 ${isExpanded ? 'dropArea2-expanded' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: isExpanded ? '96px' : '40px',
        height: isExpanded ? '90px' : '40px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'width 0.3s ease, height 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
        }}
      />
      {!imageSrc ? (
        <p style={{ pointerEvents: 'none' }}></p>
      ) : (
        <img
          src={imageSrc}
          alt="Cargada"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      )}
    </div>
  );
};

// ----------------------------------------------------
// Componente principal con todos los símbolos
// ----------------------------------------------------
const MenuImagenes = ({ expandedDivs, setExpandedDivs, topLeftText, setTopLeftText }) => {
  // 1. Manejo del textarea (acordeón)
  const [showInput, setShowInput] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    if (showInput) {
      const timer = setTimeout(() => {
        setInputVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setInputVisible(false);
    }
  }, [showInput]);

  const toggleAccordion = () => {
    setShowInput(prev => !prev);
  };

  const handleTextChange = (e) => {
    setTopLeftText(e.target.value);
  };

  // 2. Función para expandir/colapsar un ítem
  const toggleDivSize = (id) => {
    setExpandedDivs(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ----------------------------------------------------
  // Definimos los datos de cada símbolo en un array:
  // ----------------------------------------------------
  const itemsData = [
    // Ejemplo item (id = 1)
    {
      id: 1,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'cuadro',
      containerClassExpanded: 'cuadro-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 2.png',
      imageClass: 'lineaImg',
      imageClassExpanded: 'lineaImg-expanded',
      subContainerClass: 'cuadro2',
      subContainerClassExpanded: 'cuadro2-expanded',
      hasDropArea: true,
    },
    {
      id: 2,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'cuadro',
      containerClassExpanded: 'cuadro-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 4.png',
      imageClass: 'lineaImg2',
      imageClassExpanded: 'lineaImg2-expanded',
      subContainerClass: 'cuadro3',
      subContainerClassExpanded: 'cuadro3-expanded',
      hasDropArea: true,
    },
    {
      id: 3,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'cuadro',
      containerClassExpanded: 'cuadro-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 3.png',
      imageClass: 'lineaImg',
      imageClassExpanded: 'lineaImg-expanded',
      subContainerClass: 'cuadro2',
      subContainerClassExpanded: 'cuadro2-expanded',
      hasDropArea: true,
    },
    {
      id: 4,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'cuadro',
      containerClassExpanded: 'cuadro-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 2.png',
      imageClass: 'lineaImg2',
      imageClassExpanded: 'lineaImg2-expanded',
      subContainerClass: 'cuadro3',
      subContainerClassExpanded: 'cuadro3-expanded',
      hasDropArea: true,
    },
    {
      id: 5,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'cuadro',
      containerClassExpanded: 'cuadro-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 1.png',
      imageClass: 'lineaImg',
      imageClassExpanded: 'lineaImg-expanded',
      subContainerClass: 'cuadro2',
      subContainerClassExpanded: 'cuadro2-expanded',
      hasDropArea: true,
    },
    {
      id: 6,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'cuadro',
      containerClassExpanded: 'cuadro-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 5.png',
      imageClass: 'lineaImg2',
      imageClassExpanded: 'lineaImg2-expanded',
      subContainerClass: 'cuadro3',
      subContainerClassExpanded: 'cuadro3-expanded',
      hasDropArea: true,
    },
    {
      id: 7,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'circulo',
      containerClassExpanded: 'circulo-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 2.png',
      imageClass: 'lineaImg',
      imageClassExpanded: 'lineaImg-expanded',
      subContainerClass: 'circulo2',
      subContainerClassExpanded: 'circulo2-expanded',
      hasDropArea: true,
    },
    {
      id: 8,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'circulo',
      containerClassExpanded: 'circulo-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 4.png',
      imageClass: 'lineaImg2',
      imageClassExpanded: 'lineaImg2-expanded',
      subContainerClass: 'circulo3',
      subContainerClassExpanded: 'circulo3-expanded',
      hasDropArea: true,
    },
    {
      id: 9,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'circulo',
      containerClassExpanded: 'circulo-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 3.png',
      imageClass: 'lineaImg',
      imageClassExpanded: 'lineaImg-expanded',
      subContainerClass: 'circulo2',
      subContainerClassExpanded: 'circulo2-expanded',
      hasDropArea: true,
    },
    {
      id: 10,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'circulo',
      containerClassExpanded: 'circulo-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 2.png',
      imageClass: 'lineaImg2',
      imageClassExpanded: 'lineaImg2-expanded',
      subContainerClass: 'circulo3',
      subContainerClassExpanded: 'circulo3-expanded',
      hasDropArea: true,
    },
    {
      id: 11,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'circulo',
      containerClassExpanded: 'circulo-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 1.png',
      imageClass: 'lineaImg',
      imageClassExpanded: 'lineaImg-expanded',
      subContainerClass: 'circulo2',
      subContainerClassExpanded: 'circulo2-expanded',
      hasDropArea: true,
    },
    {
      id: 12,
      panelClass: 'DivPanel2',
      panelClassExpanded: 'DivPanel2-expanded',
      containerClass: 'circulo',
      containerClassExpanded: 'circulo-expanded',
      imageSrc: '/assets/Simbolos/S_Linea 5.png',
      imageClass: 'lineaImg2',
      imageClassExpanded: 'lineaImg2-expanded',
      subContainerClass: 'circulo3',
      subContainerClassExpanded: 'circulo3-expanded',
      hasDropArea: true,
    },
    // Cruces (sin sub-container ni DropArea)
    {
      id: 13,
      panelClass: 'DivPanel3',
      panelClassExpanded: 'DivPanel3-expanded',
      containerClass: 'cuadroIMG2',
      containerClassExpanded: 'cuadroIMG2-expanded',
      imageSrc: '/assets/Simbolos/S_Cruz 1.png',
      imageClass: 'cruzImg',
      hasDropArea: false,
    },
    {
      id: 14,
      panelClass: 'DivPanel3',
      panelClassExpanded: 'DivPanel3-expanded',
      containerClass: 'cuadroIMG2',
      containerClassExpanded: 'cuadroIMG2-expanded',
      imageSrc: '/assets/Simbolos/S_Cruz 2.png',
      imageClass: 'cruzImg',
      hasDropArea: false,
    },
    {
      id: 15,
      panelClass: 'DivPanel3',
      panelClassExpanded: 'DivPanel3-expanded',
      containerClass: 'cuadroIMG2',
      containerClassExpanded: 'cuadroIMG2-expanded',
      imageSrc: '/assets/Simbolos/S_Cruz 3.png',
      imageClass: 'cruzImg',
      hasDropArea: false,
    },
    {
      id: 16,
      panelClass: 'DivPanel3',
      panelClassExpanded: 'DivPanel3-expanded',
      containerClass: 'cuadroIMG2',
      containerClassExpanded: 'cuadroIMG2-expanded',
      imageSrc: '/assets/Simbolos/S_Cruz 4.png',
      imageClass: 'cruzImg',
      hasDropArea: false,
    },
    // Puntos rojos
    {
      id: 17,
      panelClass: 'DivPanel3',
      panelClassExpanded: 'DivPanel3-expanded',
      containerClass: 'cuadroIMG3',
      containerClassExpanded: 'cuadroIMG3-expanded',
      imageSrc: '/assets/Simbolos/S_Circulo Rojo XXS (3.5px).png',
      imageClass: 'PuntoRojo',
      hasDropArea: false,
    },
    {
      id: 18,
      panelClass: 'DivPanel3',
      panelClassExpanded: 'DivPanel3-expanded',
      containerClass: 'cuadroIMG3',
      containerClassExpanded: 'cuadroIMG3-expanded',
      imageSrc: '/assets/Simbolos/S_Circulo Rojo XS (4px).png',
      imageClass: 'PuntoRojo',
      hasDropArea: false,
    },
  ];

  // ----------------------------------------------------
  // Render de cada ítem:
  // ----------------------------------------------------
  const renderItem = (item) => {
    const isExpanded = !!expandedDivs[item.id];
    return (
      <div
        key={item.id}
        data-item-id={item.id}  // <- le agregamos este data-attribute
        className={`${item.panelClass} ${isExpanded ? item.panelClassExpanded : ''}`}
      >
        <DraggableDiv isDraggable={isExpanded} itemId={item.id}>
          <div
            className={`${item.containerClass} ${isExpanded ? item.containerClassExpanded : ''}`}
            onClick={() => toggleDivSize(item.id)}
          >
            {/* Imagen principal */}
            <img
              src={item.imageSrc}
              className={`
                ${item.imageClass || ''} 
                ${isExpanded && item.imageClassExpanded ? item.imageClassExpanded : ''}
              `}
            />

            {/* Sub-contenedor para el DropArea (solo si hasDropArea = true) */}
            {item.hasDropArea && item.subContainerClass && (
              <div
                className={`
                  ${item.subContainerClass} 
                  ${isExpanded ? item.subContainerClassExpanded : ''}
                `}
              >
                <DropArea2 isExpanded={isExpanded}
                setExpandedDivs={setExpandedDivs} />
              </div>
            )}
          </div>
        </DraggableDiv>
      </div>
    );
  };

  // ----------------------------------------------------
  // Retorno principal
  // ----------------------------------------------------
  return (
    <>
      {/* Contenedor principal: ítems con dos columnas */}
      <div className="container-grid">
        {itemsData.map(renderItem)}
      </div>
  
      {/* Fuera del container-grid, tu panel para el input */}
      <div className={`DivInput ${showInput ? 'DivInput' : ''}`}>
        <div className="w-full">
          <div className="accordion-button" onClick={toggleAccordion}>
            Ingresar Paciente
          </div>
          {showInput && (
            <div className={`fade-in ${inputVisible ? 'visible' : ''}`}>
              <div className="input-with-placeholder">
                <textarea
                  id="username"
                  value={topLeftText}
                  onChange={handleTextChange}
                  required
                />
                <label htmlFor="username">Nombre</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
  
  

export default MenuImagenes;
