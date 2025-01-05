import { ReportContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvasV } from '../../../components/ReportTemplate/Conclusions/CanvasViasVisual';
import SimpleMultiStepForm from './MenuBotones';
import './Style.css';


const DropArea = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
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

  return (
    <div
      className="dropArea"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        //border: '2px dashed #ccc',
        position: 'relative'
      }}
    >
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
            onDragStop={(e, d) => updatePosition(item.id, d.x, d.y)}
            style={{ position: 'absolute' }}
          >
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </Rnd>
        ))
      )}
    </div>
  );
};

const Reporte = () => {
  
  // Carga datos de usuario
  const { data: session, status } = useSession();
  const { name, lastname, cedula, especialidad } = session?.user || {};  const { conclusions } = useContext(ReportContext)

  const [copyConclusions, setCopyConclusions] = useState('')  // Estado para la caja de conclusiones
  const [isPageVisible, setPageVisibility] = useState(true) // Estado para la visibilidad de la pagina
  const [selectedImages, setSelectedImages] = useState([]); // Estado para las imagenes seleccionadas
  // Estados para el historial de imagenes
  const [history, setHistory] = useState([]); 
  const [Future,setFuture] = useState([]); 

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


  return (
    <div >
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
          <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} style={{display: 'none'}}/>          
          </div>

          <div className={'vertical-container dont-print'}>
          <div className={`dont-print ${isPageVisible ? 'visible' : 'hidden'}`}>
          
            {/*
          <ConclusionBox />
            */}
          </div>

{/* Menu de opciones */}

          <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
            <SimpleMultiStepForm showStepNumber={true}/>
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
        <div className='conclusion-container'>
        <ConclusionCanvasV
        
          img={{
            src: '/assets/MioImg/VI_BASE_BLANCO_VN_VISUAL.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: isPageVisible ? '600' : '800',
            height: isPageVisible ? '600' : '800'
          }}
          
          rules={[

            {
              expectedValue: 'indenme', 
              image: [
              {
                src: 'VisualImg/VN_VisualGreyLBI.png',
                alt: 'Modelo',
              },
              {
                src: 'VisualImg/VN_VisualGreyRBI.png',
                alt: 'Modelo',
              }
            ],
            },
            {
              expectedValue: 'alterada', 
              image: [
              {
                src: 'VisualImg/VN_VisualGreyLBI.png',
                alt: 'Modelo',
              },
              {
                src: 'VisualImg/VN_VisualGreyRBI.png',
                alt: 'Modelo',
              }
            ],
            },
            

            {
              expectedValue: 'izquierdoled_flash', 

                image: [
                  {
                    src: 'VisualImg/VN_VisualRedRBI.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'VisualImg/Via Afectada/LED IZQUIERDO.png',
                    alt: 'Modelo',
                  }
                
                ],
              
            },
            {
              expectedValue: 'derecholed_flash', 
              image: [
                {
                  src: 'VisualImg/VN_VisualRedLBI.png',
                  alt: 'Modelo',
                },
                {
                  src: 'VisualImg/Via Afectada/LED DERECHO.png',
                  alt: 'Modelo',
                }
              
              ],
            },
            {
              expectedValue: 'bilateralled_flash', 
              image: [
                {
                  src: 'VisualImg/Via Afectada/LED IZQUIERDO.png',
                  alt: 'Modelo',
                },
                {
                  src: 'VisualImg/Via Afectada/LED DERECHO.png',
                  alt: 'Modelo',
                }
            ],
            },
           
            {
              expectedValue: 'izquierdonervio_optico', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/LED IZQUIERDO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechonervio_optico', 
              image: 
              {
                src: 'VisualImg/Via Afectada/LED DERECHO.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralnervio_optico', 
              image: [
              {
                src: 'VisualImg/Via Afectada/LED IZQUIERDO.png',
                alt: 'Modelo',
              },
              {
                src: 'VisualImg/Via Afectada/LED DERECHO.png',
                alt: 'Modelo',
              }
            ],
            },

            {
              expectedValue: 'izquierdoquiasma_optico', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/QUIASMA OPTICO IZQUIERDO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechoquiasma_optico', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/QUIASMA OPTICO DERECHO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'bilateralquiasma_optico', 
              image: [
              {
                src: 'VisualImg/Via Afectada/QUIASMA OPTICO IZQUIERDO.png',
                  alt: 'Modelo',
              },
              {
                src: 'VisualImg/Via Afectada/QUIASMA OPTICO DERECHO.png',
                alt: 'Modelo',
              }
            ],
            },

            {
              expectedValue: 'izquierdotracto_optico', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/TRACTO OPTICO IZQUIERDO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechotracto_optico', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/TRACTO OPTICO DERECHO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'bilateraltracto_optico', 
              image: [
              {
                src: 'VisualImg/Via Afectada/TRACTO OPTICO IZQUIERDO.png',
                alt: 'Modelo',
              },
              {
                src: 'VisualImg/Via Afectada/TRACTO OPTICO DERECHO.png',
                alt: 'Modelo',
              }
            ],
            },
            
            {
              expectedValue: 'izquierdonucleo_geniculado', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/NUCLEO GENICULADO IZQUIERDO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechonucleo_geniculado', 
              image: 
                {
                  src: 'VisualImg/Via Afectada/NUCLEO GENICULADO DERECHO.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'bilateralnucleo_geniculado', 
              image: [
              {
                src: 'VisualImg/Via Afectada/NUCLEO GENICULADO IZQUIERDO.png',
                alt: 'Modelo',
              },
              {
                src: 'VisualImg/Via Afectada/NUCLEO GENICULADO DERECHO.png',
                alt: 'Modelo',
              }
            ],
            },
           




         
          ]}
        /><div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}><textarea
        value={copyConclusions}
        defaultValue=""
        onChange={handleTextareaChange}
      /></div>
        </div>
        </div>
        <div><DropArea /> </div>
        </div>
      </div>
    </div>
  )
}

export default Reporte