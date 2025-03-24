import { ReportContext,DropContext } from '@/src/context';
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

  const handleDrop = (e) => {
    e.preventDefault();

    // Leer el ID que guardamos en dataTransfer
    const draggedId = e.dataTransfer.getData('app-id');
    if (draggedId) {
      // Colapsar ese ID en el estado global
      setExpandedDivs(prev => ({
        ...prev,
        [draggedId]: false
      }));
    }

    // Leer la parte text/html (nodo)
    const data = e.dataTransfer.getData('text/html');
    if (data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const element = doc.body.firstChild;
      if (element) {
        setDroppedItems([
          ...droppedItems,
          { id: Date.now(), content: element.outerHTML, x: 0, y: 0 }
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

    // Actualizar las conclusiones
    useEffect(() => {
      setCopyConclusions(conclusions.map(cl => cl.title).join(''))
    }, [conclusions])

    // Para mantener constante la conclusione
    const handleTextareaChange = (event) => {
      setCopyConclusions(event.target.value)
    }

    // Funciones para el historial de imagenes, en caso de usar Undo te regresa a la imagen anterior
    const handleImageChange = useCallback((event) => {
      if (event.target.files && event.target.files[0]) {
        setHistory((prevHistory) => [...prevHistory, selectedImages]);
        setSelectedImages((prevImages) => [...prevImages, { 
          src: URL.createObjectURL(event.target.files[0]), 
          position: { x: Math.random() * 200, y: Math.random() * 200 }, 
          size: { width: 200, height: 200 } 
        }]);
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
  


    return (
      <div >
        {/* Clase que encapzula la información y el titulo de la pagina */}
        <div className='head'>
             {/* Titulo de la pagina */}
            <div className='report-container dont-print'>
            </div>
          </div>       
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

          <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
            <SimpleMultiStepForm 
            showStepNumber={true}
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
                          <div className='con-img '> 
                        
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
          src: '/assets/MioImg/MI_Base Gris_Fondo Blanco.png',
          alt: 'Modelo',
          useMap: '#image-map',
          width: isPageVisible ? '600' : '800',
          height: isPageVisible ? '600' : '800'
        }}
        
        rules={[
          {
            expectedValue: 'distribucion_proximal', 
            image: {
              src: 'MioImg/MI_Proximal.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'distribucion_distal',
            image: {
              src: 'MioImg/MI_Distal.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'distribucion_generalizada',
            image: {
              src: 'MioImg/MI_Facial.png',
              // AGREGAR 2 IMAGENES MAS AQUI
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'anillo_oseo',
            image: {
              src: 'MioImg/MI_Distrofia de Anillo Oseo.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'duchenne_becker',
            image: {
              src: 'MioImg/MI_Distrofia de Duchenne e Becker.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'emery_dreifuss',
            image: {
              src: 'MioImg/MI_Distrofia de Emery-Dreifuss.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'facioescapulohumeral',
            image: {
              src: 'MioImg/MI_Distrofia Facioescapulohumeral.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'oculofaringea',
            image: {
              src: 'MioImg/MI_Distrofia Oculofaringea.png',
              alt: 'Modelo',
            }
          },

          {
            expectedValue: 'generalizada1',
            image:[{
              src: 'MioImg/MI_Facial.png',
              alt: 'Modelo',
            },
            {
              src: 'MioImg/MI_Distal.png',
              alt: 'Modelo',
            },
            {
              src: 'MioImg/MI_Proximal.png',
              alt: 'Modelo',
            }
          
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
    zIndex: '1',
  }}
  dangerouslySetInnerHTML={{ __html: copyConclusions }}
  onBlur={(e) => {
    // Cuando terminas de editar, puedes setear copyConclusions
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