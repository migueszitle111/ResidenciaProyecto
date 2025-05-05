import { ReportContext,DropContext} from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvasV } from '../../../components/ReportTemplate/Conclusions/CanvasViasVisual';
import SimpleMultiStepForm from './MenuBotones';
import './Style.css';


const DropArea = ({ topLeftText, expandedDivs, setExpandedDivs }) => {
  const { droppedItems, setDroppedItems } = useContext(DropContext);
  const dropAreaRef = useRef(null);

  useEffect(() => {
    if (dropAreaRef.current) {
      const rect = dropAreaRef.current.getBoundingClientRect();
      console.log('DropArea dimensions:', rect.width, rect.height);
    }
  }, []);

  const handleDragStop = (e, d, item) => {
    const dropAreaRect = dropAreaRef.current.getBoundingClientRect();
    const itemRect = e.target.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top + itemRect.height / 2;

    if (
      itemCenterX < dropAreaRect.left ||
      itemCenterX > dropAreaRect.right ||
      itemCenterY < dropAreaRect.top ||
      itemCenterY > dropAreaRect.bottom
    ) {
      setDroppedItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      updatePosition(item.id, d.x, d.y);
    }
  };

  // EJEMPLO COMPLETO
const handleDrop = (e) => {
  e.preventDefault();

  // 1) Recuperamos ID como string
  const draggedId = e.dataTransfer.getData('app-id');
  // 2) Convertimos a número
  const numericId = parseInt(draggedId, 10);

  if (!isNaN(numericId)) {
    // 3) Colapsar sólo el ítem arrastrado
    setExpandedDivs(prev => ({
      ...prev,
      [numericId]: false
    }));
  }

  // 3) Leer el HTML del ítem y añadirlo a droppedItems
  const data = e.dataTransfer.getData('text/html');
  if (data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const element = doc.body.firstChild;
    if (element) {
      setDroppedItems((prev) => [
        ...prev,
        { id: Date.now(), content: element.outerHTML, x: 0, y: 0 },
      ]);
    }
  }
};

 
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updatePosition = (id, x, y) => {
    setDroppedItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  const removeItem = (id) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className="dropArea"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      ref={dropAreaRef}
    >
      {topLeftText && (
        <p style={{ marginLeft: 'auto', textAlign: 'left', paddingLeft: '15px', fontSize: '19px', paddingTop:'10px' }}>
          {topLeftText}
        </p>
      )}
      {droppedItems.length === 0 ? (
        <p></p>
      ) : (
        droppedItems.map((item) => (
          <Rnd
            key={item.id}
            default={{
              x: item.x,
              y: item.y,
              width: 200,
              height: 200
            }}
            onDragStop={(e, d) => handleDragStop(e, d, item)}
            style={{ position: 'absolute' }}
          >
            <div className="item-container" style={{ width: '100%', height: '100%' }}>
              <button
                className="delete-button"
                onClick={() => removeItem(item.id)}
              >
                X
              </button>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </Rnd>
        ))
      )}
    </div>
  );
};
const Reporte = () => {
     const { data: session, status } = useSession();
     const { name, lastname, cedula,email, especialidad, imageUrl } = session?.user || {};  const { conclusions } = useContext(ReportContext)
     const [copyConclusions, setCopyConclusions] = useState('')  // Estado para la caja de conclusiones
     const [isPageVisible, setPageVisibility] = useState(true) // Estado para la visibilidad de la pagina
     const [selectedImages, setSelectedImages] = useState([]); // Estado para las imagenes seleccionadas
     // Estados para el historial de imagenes
     const [history, setHistory] = useState([]); 
     const [Future,setFuture] = useState([]); 
      // Aquí manejamos la expansión/colapso de símbolos en MenuImagenes
     const [expandedDivs, setExpandedDivs] = useState({});
     
     const { droppedItems } = useContext(DropContext);
     const [topLeftText, setTopLeftText] = useState('');
     const imgRef = useRef(null);

    // Actualizar las conclusiones
    useEffect(() => {
      setCopyConclusions(conclusions.map(cl => cl.title).join(''))
    }, [conclusions])
    

    //funcion que agreaga comas y conjunciones a las conclusiones
    function formatConclusions(copyConclusions) {
      const keywords2 = ["POSTGANGLIONAR PARCIAL A NIVEL DE TROCO"];
      const keywords3 = ["POSTGANGLIONAR PARCIAL A NIVEL DE CORDON"];
      const keywords4 = ["INTENSIDAD LEVE.", "INTENSIDAD MODERADA.", "INTENSIDAD SEVERA."];
      const keywords = ["C5", "C6", "C7", "C8", "T1", "SUPERIOR", "MEDIO", "INFERIOR", "LATERAL", "POSTERIOR", "MEDIAL", "L2", "L3", "L4", "L5", "S1", "S2"];
      const specificKeywords = ["C5", "C6", "C7", "C8", "T1"]; // Nueva condición específica
      let words = copyConclusions.split(' ');
  
      // Verificar la palabra clave específica en keywords2 (TROCO)
      for (let i = 0; i < words.length; i++) {
          if (keywords2.includes(words.slice(i, i + 6).join(' '))) {
              let countAfterKeyword = 0;
              for (let j = i + 6; j < words.length; j++) {
                  if (keywords.includes(words[j])) {
                      countAfterKeyword++;
                  }
              }
  
              if (countAfterKeyword > 1) {
                  words[i + 5] += 'S'; // Agregar 'S' al final de 'TROCO' si hay más de dos palabras
              }
              break; // Salir del bucle una vez que se ha encontrado y procesado la palabra clave
          }
      }
  
      // Verificar la palabra clave específica en keywords3 (CORDON)
      for (let i = 0; i < words.length; i++) {
          if (keywords3.includes(words.slice(i, i + 6).join(' '))) {
              let countAfterKeyword = 0;
              for (let j = i + 6; j < words.length; j++) {
                  if (keywords.includes(words[j])) {
                      countAfterKeyword++;
                  }
              }
  
              if (countAfterKeyword > 1) {
                  words[i + 5] += 'ES'; // Agregar 'ES' al final de 'CORDON' si hay más de dos palabras
              }
  
              break; // Salir del bucle una vez que se ha encontrado y procesado la palabra clave
          }
      }
  
      // Verificar las palabras clave específicas en keywords4 (INTENSIDAD) y agregar doble salto de línea
      for (let i = 0; i < words.length; i++) {
          if (keywords4.includes(words.slice(i, i + 2).join(' '))) { // Comparar con las palabras clave de 2 palabras
              words[i + 1] += '\n\n'; // Agregar doble salto de línea después de la palabra clave
          }
      }
  
      // Nueva condición para "PREGANGLIONAR PARCIAL"
      let firstKeywordIndex = words.findIndex(word => specificKeywords.includes(word));
      if (firstKeywordIndex !== -1) {
          words.splice(firstKeywordIndex, 0, "PREGANGLIONAR PARCIAL A NIVEL DE");
      }
  
      // Verificar y formatear las palabras clave generales (C5, C6, T1, etc.)
      let keywordPositions = [];
      for (let i = 0; i < words.length; i++) {
          if (keywords.includes(words[i])) {
              keywordPositions.push(i);
          }
      }
  
      if (keywordPositions.length > 1) {
          // Formatear las palabras clave con comas, excepto antes de la conjunción
          for (let i = 0; i < keywordPositions.length - 2; i++) {
              words[keywordPositions[i]] += ',';
          }
  
          // Verificar si la última palabra clave empieza con "I"
          let lastKeywordIndex = keywordPositions[keywordPositions.length - 1];
          let conjunction = 'Y';
  
          if (words[lastKeywordIndex][0].toUpperCase() === 'I') {
              conjunction = 'E';
          }
  
          // Insertar la conjunción antes de la última palabra clave
          words.splice(lastKeywordIndex, 0, conjunction);
      }
  
      // Unir las palabras con espacios
      let formattedConclusions = words.join(' ');
  
      // Eliminar espacio en blanco antes de la palabra 'REINERVACIÓN'
      formattedConclusions = formattedConclusions.replace(/\sREINERVACIÓN/g, 'REINERVACIÓN');
  
      return formattedConclusions;
  }
  
  
  const formattedConclusions = formatConclusions(copyConclusions);

    
    // Actualizar las conclusiones
    useEffect(() => {
      const newConclusions = conclusions.map(cl => cl.title).join('');
      const formattedConclusions = formatConclusions(newConclusions);
      setCopyConclusions(formattedConclusions );
  }, [conclusions]);
  
  useEffect(() => {
    const node = conclusionDivRef.current;
    if (node && node.innerText !== copyConclusions) {
      // Guardar posición del cursor
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const { startOffset, startContainer } = range || {};
      
      // Actualizar contenido
      node.innerText = copyConclusions;
      
      // Restaurar posición del cursor
      if (range && startContainer) {
        const newRange = document.createRange();
        const childNodes = node.childNodes;
        const textNode = childNodes.length > 0 ? childNodes[0] : document.createTextNode("");
        if (!childNodes.length) node.appendChild(textNode);
        
        newRange.setStart(textNode, Math.min(startOffset, textNode.length));
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [copyConclusions]);
    // Para mantener constante la conclusione
    const handleTextareaChange = (event) => {
      setCopyConclusions(event.target.value)
    }
    // Funciones para el historial de imagenes, en caso de usar Undo te regresa a la imagen anterior
    const handleImageChange = useCallback((event) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result; // Keep the full data URL
          setSelectedImages((prevImages) => [
            ...prevImages,
            {
              src: base64, // Full data URL
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              size: { width: 200, height: 200 },
            },
          ]);
          setHistory((prevHistory) => [...prevHistory, selectedImages]);
          setFuture([]);
        };
        reader.readAsDataURL(file);
      }
    }, [selectedImages]);
    
    const handleUndo = useCallback(() => {
      if (history.length > 0) {
        setFuture((prevFuture) => [selectedImages, ...prevFuture]);
        setSelectedImages(history[history.length - 1]);
        setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
      }
    }, [history, selectedImages]);
    
    // Funciones para el arrastre y redimension de las imagenes
    const handleDragStop = useCallback((index, e, d) => {
      setSelectedImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index].position = { x: d.x, y: d.y };
        return newImages;
      });
    }, []);
    
    const handleResizeStop = useCallback((index, e, direction, ref, delta, position) => {
      setSelectedImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index].size = { width: ref.style.width, height: ref.style.height };
        return newImages;
      });
    }, []);

    const conclusionDivRef = useRef(null);
    const elementRef = useRef(null);

  const moveCaretToEnd = (element) => {
    if (!element) return;
    element.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false); // Colapsa el rango al final del contenido
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };


  return (
    <div >
      {/* Clase que encapzula la información y el titulo de la pagina */}
      {/* Wrapper que encapsula la image, conclusión y lista de botones */}
      <div className="wrapper">
        {/* Componente de la caja de conclusión junto con la caja de notas */}
          {/* Se especifica dont-print para no ser incluidos en la vista de impresión */}
          <div className='vertical-orientation dont-print'>
          {/* Lista de botones */}
          <div className='button-bar'>
          <button 
            id='unhide' 
            className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`} 
            onClick={() => {
              setPageVisibility(true);
              setSelectedImages([]);
            }}
          >
          <img src="/I_Out.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
          </button>
          <button id='print' className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
          <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          
          <button onClick={handleUndo} className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
          <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
          </button>
          <label htmlFor="file-upload" className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
          <img src="/I_Folder.svg" alt="Subir" style={{filter: 'invert(1)'}} />
          </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} style={{display: 'none'}}/>          </div>

        <div className={'vertical-container dont-print'}>
          <div className={`dont-print ${isPageVisible ? 'visible' : 'hidden'}`}>
            {/*
          <ConclusionBox />
            */}
          </div>

{/* Menu de opciones */}

<div className={`mx-4 z-10  `}>
            <SimpleMultiStepForm 
              showStepNumber={true}
              conclusionDivRef={conclusionDivRef}
              elementRef={elementRef}
              handleImageChange={handleImageChange}
              topLeftText={topLeftText}
              setTopLeftText={setTopLeftText}
              copyConclusions={copyConclusions}  
              ref={imgRef.current}
              expandedDivs={expandedDivs}
              setExpandedDivs={setExpandedDivs}
            />
          </div>
        
          </div>
        </div>
        {/* Componente que contiene las imagenes y sus valores que se utilizaran */}
               <div>
                 <div className='con-img'> 
               
               {/* Codigo para desplegar las imagenes dentro de un array */}
               {selectedImages.map((image, index) => (
                 <Rnd
                   className="rnd-image"
                   key={index}
                   size={image.size}
                   position={image.position}
                   onDragStop={(e, d) => handleDragStop(index, e, d)}
                   onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(index, e, direction, ref, delta, position)}
                   lockAspectRatio={true}
                   style={{ zIndex: 2 }} 
       
                 >
                   <img src={image.src} draggable="false" />
                 </Rnd>
               ))}
       
               {/* Despliego de las imagenes dentro del array */}
               <div ref={elementRef} className='conclusion-container '>
       
               <div id="dropArea"><DropArea topLeftText={topLeftText}  expandedDivs={expandedDivs}
                       setExpandedDivs={setExpandedDivs}  />
       
               </div>
        <ConclusionCanvasV 
        
          img={{
            src: '/assets/PlexoImg/BP_Plexopatia.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: '600', 
            height: '776'
          }}
          
          rules={[
            {
              expectedValue: 'pre_total', 
              image: {
                src: 'PlexoImg/PLE_T superior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c5s', 
              image: {
                src: 'PlexoImg/PLE_T superior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c6s', 
              image: {
                src: 'PlexoImg/PLE_T superior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c7m',
              image: {
                src: 'PlexoImg/PLE_T. Medio.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c8f',
              image: {
                src: 'PlexoImg/PLE_T. inferior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 't1f',
              image: {
                src: 'PlexoImg/PLE_T. inferior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'post_total',
              image: {
                src: 'PlexoImg/PLE_T superior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'sup',
              image: {
                src: 'PlexoImg/PLE_T superior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'medio',
              image: {
                src: 'PlexoImg/PLE_T. Medio.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'inf',
              image: {
                src: 'PlexoImg/PLE_T. inferior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'divi',
              image: {
                src: 'PlexoImg/PLE_Cordon Posterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'lateral',
              image: {
                src: 'PlexoImg/PLE_Lateral.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'posterior',
              image: {
                src: 'PlexoImg/PLE_Cordon Posterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'medial',
              image: {
                src: 'PlexoImg/PLE_Cordon Medial.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'salida',
              image: {
                src: 'PlexoImg/PLE_T. Inferior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'preganglionar_total',
              image: {
                src: 'PlexoImg/PLE_P. Lumbosacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L2',
              image: {
                src: 'PlexoImg/PLE_P. Lumbar.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L3',
              image: {
                src: 'PlexoImg/PLE_P. Lumbar.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L4',
              image: {
                src: 'PlexoImg/PLE_T. Lumbosacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L5',
              image: {
                src: 'PlexoImg/PLE_T. Lumbosacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'S1',
              image: {
                src: 'PlexoImg/PLE_P. Sacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'S2',
              image: {
                src: 'PlexoImg/PLE_P. Sacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'postganglionar_total',
              image: {
                src: 'PlexoImg/PLE_P. Lumbosacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'ilihipogastrico_e_ilinguinal',
              image: {
                src: 'PlexoImg/NO_Ilioinguinal-genitofemoral.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'genitocrural_y_femorocutáneo_lateral',
              image: {
                src: 'PlexoImg/NO_Femorocutáneo femoral.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_lumbar',
              image: {
                src: 'PlexoImg/PLE_P. Lumbar.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_lumbosacro',
              image: {
                src: 'PlexoImg/PLE_T. Lumbosacro.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_sacro',
              image: {
                src: 'PlexoImg/PLE_P. Sacro.png',
                alt: 'Modelo',
              }
            },

            {
              expectedValue: 'plexo_pudendo',
              image: [
              {
                src: 'PlexoImg/Plexo pudendo derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Plexo pudendo izquierdo.png',
                alt: 'Modelo',
              },
            ],
            },


            {
              expectedValue: 'pre_totald', 
              image: {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c5sd', 
              image: {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c6sd', 
              image: {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c7md',
              image: {
                src: 'PlexoImg/Tronco medio derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c8fd',
              image: {
                src: 'PlexoImg/Tronco inferior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 't1fd',
              image: {
                src: 'PlexoImg/Tronco inferior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'post_totald',
              image: {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'supd',
              image: {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'mediod',
              image: {
                src: 'PlexoImg/Tronco medio derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'infd',
              image: {
                src: 'PlexoImg/Tronco inferior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'divid',
              image: {
                src: 'PlexoImg/Cordon lateral derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'laterald',
              image: {
                src: 'PlexoImg/Cordon lateral derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'posteriord',
              image: {
                src: 'PlexoImg/Cordon posterior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'mediald',
              image: {
                src: 'PlexoImg/Cordon medial derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'salidad',
              image: {
                src: 'PlexoImg/Tronco inferior derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'preganglionar_totald',
              image: {
                src: 'PlexoImg/Plexo lumbosacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L2d',
              image: {
                src: 'PlexoImg/Plexo lumbar derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L3d',
              image: {
                src: 'PlexoImg/Plexo lumbar derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L4d',
              image: {
                src: 'PlexoImg/Tronco lumbosacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L5d',
              image: {
                src: 'PlexoImg/Tronco lumbosacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'S1d',
              image: {
                src: 'PlexoImg/Plexo sacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'S2d',
              image: {
                src: 'PlexoImg/Plexo sacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'postganglionar_totald',
              image: {
                src: 'PlexoImg/Plexo lumbosacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'ilihipogastrico_e_ilinguinald',
              image: {
                src: 'PlexoImg/ILIOHIPOGASTRICO DERECHO.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'genitocrural_y_femorocutáneo_laterald',
              image: {
                src: 'PlexoImg/FEMOROCUTANEO DERECHO.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_lumbard',
              image: {
                src: 'PlexoImg/Plexo lumbar derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_lumbosacrod',
              image: {
                src: 'PlexoImg/Tronco lumbosacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_sacrod',
              image: {
                src: 'PlexoImg/Plexo sacro derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_pudendod',
              image: {
                src: 'PlexoImg/Plexo pudendo derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'pre_totali', 
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c5si', 
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c6si', 
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c7mi',
              image: {
                src: 'PlexoImg/Tronco medio izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c8fi',
              image: {
                src: 'PlexoImg/Tronco inferior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 't1fi',
              image: {
                src: 'PlexoImg/Tronco inferior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'post_totali',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'supi',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'medioi',
              image: {
                src: 'PlexoImg/Tronco medio izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'infi',
              image: {
                src: 'PlexoImg/Tronco inferior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'divii',
              image: {
                src: 'PlexoImg/Cordon lateral izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'laterali',
              image: {
                src: 'PlexoImg/Cordon lateral izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'posteriori',
              image: {
                src: 'PlexoImg/Cordon posterior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'mediali',
              image: {
                src: 'PlexoImg/Cordon medial izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'salidai',
              image: {
                src: 'PlexoImg/Tronco inferior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'preganglionar_totali',
              image: {
                src: 'PlexoImg/Plexo lumbosacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L2i',
              image: {
                src: 'PlexoImg/Plexo lumbar izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L3i',
              image: {
                src: 'PlexoImg/Plexo lumbar izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L4i',
              image: {
                src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'L5i',
              image: {
                src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'S1i',
              image: {
                src: 'PlexoImg/Plexo sacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'S2i',
              image: {
                src: 'PlexoImg/Plexo sacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'postganglionar_totali',
              image: {
                src: 'PlexoImg/Plexo lumbosacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'ilihipogastrico_e_ilinguinali',
              image: {
                src: 'PlexoImg/ILIOHIPOGASTRICO IZQUIERDO.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'genitocrural_y_femorocutáneo_laterali',
              image: {
                src: 'PlexoImg/FEMOROCUTANEO IZQUIERDO.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_lumbari',
              image: {
                src: 'PlexoImg/Plexo lumbar izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_lumbosacroi',
              image: {
                src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_sacroi',
              image: {
                src: 'PlexoImg/Plexo sacro izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'plexo_pudendoi',
              image: {
                src: 'PlexoImg/Plexo pudendo izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'uid',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'mid',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'umd',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'umid',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'uii',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'mii',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'umi',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'umii',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'ui',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'mi',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'um',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'umi',
              image: {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'izquierda_C',
              image: {
                src: 'PlexoImg/Plexo cervical izquierdo.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'derecha_C',
              image: {
                src: 'PlexoImg/Plexo cervical derecho.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'bilateral_C',
              image: {
                src: 'PlexoImg/PLEXO CERVICAL BILATERAL.png',
                alt: 'Modelo',
              }
            },

            {
              expectedValue: 'troncosD',
              image: [
              {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco medio derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco inferior derecho.png',
                alt: 'Modelo',
              }
            ],
            },

            {
              expectedValue: 'troncosI',
              image: [
              {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco medio izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco inferior izquierdo.png',
                alt: 'Modelo',
              }
            ],
            },

            {
              expectedValue: 'troncosB',
              image: [
              {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco medio derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco inferior derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco medio izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco inferior izquierdo.png',
                alt: 'Modelo',
              }
            ],
            },


            {
              expectedValue: 'CordonI',
              image: [
              {
                src: 'PlexoImg/Cordon lateral izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon posterior izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon medial izquierdo.png',
                alt: 'Modelo',
              }
            ],
            },
            
            {
              expectedValue: 'CordonD',
              image: [
              {
                src: 'PlexoImg/Cordon lateral derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon posterior derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon medial derecho.png',
                alt: 'Modelo',
              }
            ],
            },

            {
              expectedValue: 'CordonB',
              image: [
              {
                src: 'PlexoImg/Cordon lateral derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon posterior derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon medial derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon lateral izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon posterior izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Cordon medial izquierdo.png',
                alt: 'Modelo',
              }
            ],
            },

            
            {
              expectedValue: 'pre_totalN',
              image: [
              {
                src: 'PlexoImg/PLE_T superior.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco superior derecho.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Tronco superior izquierdo.png',
                alt: 'Modelo',
              }
            ],
            },

            {
              expectedValue: 'pre_Sacroi',
              image: [
              {
                src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
                alt: 'Modelo',
              },
              {
                src: 'PlexoImg/Plexo pudendo izquierdo.png',
                alt: 'Modelo',
              },
            ],
            },



          ]}

          const footertext = {
            <>
            {session && (
            <>
              {/* Bloque Nombre */}
              <div id="footerName"style={{ display: 'inline-flex' , alignItems: 'center' ,paddingLeft: '65px' }}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ marginRight: '4px' }}
                  aria-label="Usuario"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                           0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>{name} {lastname}</span>
              </div>
              {/* Bloque Email */}
              <div id="footerEmail" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ marginRight: '4px' }}
                  aria-label="Email"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 
                           2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>{email}</span>
              </div>
              {/* Bloque Especialidad */}
              <div  id="footerEspecialidad" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg
                  version="1.1"
                  id="ICONOS"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 90 90"
                  style={{ enableBackground: 'new 0 0 90 90', marginRight: '4px' }}
                  xmlSpace="preserve"
                  width="8"
                  height="8"
                  aria-label="Especialidad"
                >
                  <style type="text/css">
                    {`
                      .st0 { fill: none; stroke: #000000; stroke-width: 2; stroke-miterlimit: 10; }
                      .st1 { fill: none; stroke: #000000; stroke-width: 2; stroke-linecap: square; stroke-miterlimit: 10; }
                      .st2 { fill: #FFFFFF; }
                    `}
                  </style>
                  <g id="brain">
                    <g>
                      <path className="st0" d="M45.12,61.02c0,0,0,7.32-4.79,7.32h-8.68c-1.82,0-3.29-1.47-3.29-3.29c0,0-2.39-8.68-2.65-8.68l-2.88-1.21
                        c-1.57-0.66-2.31-2.46-1.66-4.03l4.8-9.65v-0.67c0-11.9,9.65-21.55,21.55-21.55s21.55,9.65,21.55,21.55
                        c0,5.12-1.8,9.84-4.79,13.54v16.39"/>
                      <path className="st0" d="M39.05,43.72c-0.14,0.42-0.11,0.49-0.11,0.96c0,2.25,1.83,4.08,4.09,4.08c1.2,0,2.11-0.7,2.91-1.49"/>
                      <path className="st0" d="M53.85,30.98c0.14-0.01,0.29-0.02,0.43-0.02c2.25,0,4.08,1.83,4.08,4.09c0,1.17-0.63,2.49-1.42,3.22"/>
                      <path className="st0" d="M53.85,30.98c-0.99-2.77-3.64-4.73-6.74-4.73c-3.78,0-6.59,3.01-7.48,6.5"/>
                      <path className="st1" d="M45.94,47.17l1.2,1.01c1.92,1.34,3.08,3.52,3.09,5.87c0.01,2.61,0.02,5.66,0.02,5.66"/>
                      <path className="st1" d="M43.93,39.98c-3.68,0-4.76,3.36-4.76,3.36l-1.19,0.13c-3.03,0-5.48-2.45-5.48-5.48
                        c0-3.03,2.45-5.48,5.48-5.48c0.71,0,1.05,0.04,1.67,0.22"/>
                      <path className="st0" d="M57.6,37.99c2.26,0,4.09,1.83,4.09,4.09c0,2.25-1.83,4.08-4.09,4.08c-2.25,0-4.08-1.83-4.08-4.08
                        c0,0-3.2,1.39-4.54-1.53"/>
                      <path className="st0" d="M47.56,33.37c2.89,3.66,8.31-1.32,4.69-4.94"/>
                    </g>
                  </g>
                </svg>
                <span>{especialidad}</span>
              </div>
              {/* Bloque Cédula */}
              <div  id="footerCedula" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg
                  version="1.1"
                  id="ICONOS"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 90 90"
                  style={{ enableBackground: 'new 0 0 90 90', marginRight: '4px' }}
                  xmlSpace="preserve"
                  width="8"
                  height="8"
                  aria-label="Cédula"
                >
                  <style type="text/css">
                    {`
                      .st0 { fill: none; stroke: #000000; stroke-width: 2; stroke-miterlimit: 10; }
                      .st1 { fill: none; stroke: #000000; stroke-width: 2; stroke-linecap: square; stroke-miterlimit: 10; }
                      .st2 { fill: #FFFFFF; }
                    `}
                  </style>
                  <g id="test">
                    <g>
                      <rect x="20.72" y="16.5" className="st0" width="48.56" height="57" />
                      <g>
                        <path d="M38.39,28.69c0-0.87,0.7-1.57,1.57-1.57h2.68c0.87,0,1.57,0.7,1.57,1.57v3.71c0,0.34-0.11,0.68-0.32,0.95l-2.8,3.67
                          c-0.3,0.39-0.76,0.62-1.25,0.62h-1.06l2.33-4.71h-1.15c-0.87,0-1.57-0.7-1.57-1.57V28.69z M47.37,27.12h2.67
                          c0.87,0,1.57,0.7,1.57,1.57v3.71c0,0.34-0.11,0.68-0.32,0.95l-2.8,3.67c-0.3,0.39-0.76,0.62-1.25,0.62h-1.06l2.33-4.71h-1.15
                          c-0.87,0-1.57-0.7-1.57-1.57v-2.68C45.8,27.83,46.51,27.12,47.37,27.12z" />
                      </g>
                      <line className="st0" x1="35.23" y1="47.02" x2="54.77" y2="47.02" />
                      <line className="st0" x1="35.23" y1="55.73" x2="54.77" y2="55.73" />
                      <line className="st0" x1="35.23" y1="64.45" x2="54.77" y2="64.45" />
                    </g>
                  </g>
                </svg>
                <span>Cédula: {cedula}</span>
              </div>
            </>
          )}
          </>
          }
          userImageUrl={imageUrl}  // Aquí se pasa la URL de la imagen del usuario
          

        />
        
<div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
<div
  id="conclusionDiv"
  ref={conclusionDivRef}
  contentEditable
  style={{
    position: 'absolute',
    width: '95%',
    height: 'auto',
    outline: 'none',
    resize: 'none',
    fontSize: '12px',
    paddingTop: '8px',
    marginLeft: '10px',
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: '1',
  }}
  onInput={(e) => {
    setCopyConclusions(e.currentTarget.innerText);
  }}
  onFocus={(e) => {
    // Mover el cursor al final del contenido
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(e.target);
    range.collapse(false); // Colapsar al final
    selection.removeAllRanges();
    selection.addRange(range);
  }}
  suppressContentEditableWarning={true}
  /></div>
        </div>
        </div>
        <div> </div>
        </div>
      </div>
    </div>
  )
}

export default Reporte