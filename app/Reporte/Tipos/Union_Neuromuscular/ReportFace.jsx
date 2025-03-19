//ReportFace.jsx
import { ReportContext ,DropContext} from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
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
    // Carga datos de usuario
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

    useEffect(() => {
      if (imgRef.current) {
        console.log('Imagen offsetWidth:',  imgRef.current.offsetWidth);
        console.log('Imagen offsetHeight:', imgRef.current.offsetHeight);
      }
    }, []);



  function formatConclusions(copyConclusions) {
    const keywords = ["BULBAR", "PROXIMAL", "DISTAL"];
    let words = copyConclusions.split(' ');
    let keywordPositions = [];

    // Identificar las posiciones de las palabras clave
    for (let i = 0; i < words.length; i++) {
        if (keywords.includes(words[i])) {
            keywordPositions.push(i);
        }
    }

    // Si no se encontraron palabras clave, devolver la cadena original
    if (keywordPositions.length === 0) {
        return copyConclusions;
    }

    // Si solo hay una palabra clave, devolver la cadena original
    if (keywordPositions.length === 1) {
        return copyConclusions;
    }

    // Formatear las palabras clave con comas, excepto antes de la conjunción
    for (let i = 0; i < keywordPositions.length - 2; i++) {
        words[keywordPositions[i]] += ',';
    }

    // Verificar si la última palabra clave empieza con "I"
    let lastKeywordIndex = keywordPositions[keywordPositions.length - 1];
    let secondLastKeywordIndex = keywordPositions[keywordPositions.length - 2];
    let conjunction = 'Y';

    if (words[lastKeywordIndex][0].toUpperCase() === 'I') {
        conjunction = 'O';
    }

    // Insertar la conjunción antes de la última palabra clave
    words.splice(lastKeywordIndex, 0, conjunction);

    return words.join(' ');
}

// Ejemplo de uso
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

  // Codigo para imprimir en click
  useEffect(() => {
    const printButton = document.getElementById('print');
    const handlePrint = () => {
      window.print();
    };

    printButton.addEventListener('click', handlePrint);

    return () => {
      printButton.removeEventListener('click', handlePrint);
    };
  }, []); 

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
      <div className='head dont-print'>
           {/* Titulo de la pagina */}
          <div className='report-container dont-print'>
          </div>
        </div>       
      {/* Wrapper que encapsula la image, conclusión y lista de botones */}
      <div className="wrapper " >
        {/* Componente de la caja de conclusión junto con la caja de notas */}
          {/* Se especifica dont-print para no ser incluidos en la vista de impresión */}
          <div className='vertical-orientation'>
          {/* Lista de botones */}
          <div className='button-bar dont-print'>
          <button 
            id='unhide' 
            className={`print-button  ${isPageVisible ? 'hidden' : 'visible'}`} 
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
        <ConclusionCanvas 
        
          img={{
            src: '/assets/UnionMuscularIMG/BP_UnionMuscular.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: '600', 
            height: '776'
            
          }}
          
          rules={[
            {
              expectedValue: 'bulbar', 
              image: {
                src: 'UnionMuscularIMG/UN_Bulbar.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'tipo_presinaptico',
              image: {
                src: 'UnionMuscularIMG/UN_Presinaptico.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'tipo_postsinaptico',
              image: {
                src: 'UnionMuscularIMG/UN_Postsinaptico.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'distal',
              image: {
                src: 'UnionMuscularIMG/UN_Distal.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'proximal',
              image: {
                src: 'UnionMuscularIMG/UN_Proximal.png',
                alt: 'Modelo',
              }
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
  />

      </div>
      </div>

      </div>
        </div>
        </div>
        </div>
  )
}


export default Reporte