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

  // Imagen por defecto
  const defaultImage1 = '/assets/MioImg/MO_BASE_BLANCO_MOTORES.png';
  // Imagen si “trigemino” está seleccionado
  const newImage1     = '/assets/MioImg/Base_Cerebro.png';

  // Verifica si en las conclusiones existe la de “trigemino”
  const isTrigeminoSelected = conclusions.some((cl) => cl.value === 'trigemino');

  // Condiciona la imagen
  const imageSrc1 = isTrigeminoSelected ? newImage1 : defaultImage1;

  


  // Estados para el historial de imagenes
  const [history, setHistory] = useState([]); 
  const [Future,setFuture] = useState([]); 

  useEffect(() => {
    // Regex para detectar dermatomas
    const dermatomaRegex = /^A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS\s?(.*)$/i;
    // Regex para detectar topografía
    const topografiaRegex = /^TOPOGRÁFICAMENTE A NIVEL/i;
  
    const rest = [];
    const dermatomes = [];
    const topografia = [];
  
    conclusions.forEach((cl) => {
      const titleTrimmed = cl.title.trim();
  
      // Detectar si es dermatoma
      const matchDerma = dermatomaRegex.exec(titleTrimmed);
      if (matchDerma) {
        dermatomes.push(matchDerma[1]); // p.ej. "C4"
        return;
      }
  
      // Detectar si es topografía
      if (topografiaRegex.test(titleTrimmed)) {
        topografia.push(titleTrimmed);
        return;
      }
  
      // Si no es dermatoma ni topografía, va a "rest"
      rest.push(titleTrimmed);
    });
  
    // 1) Unimos "rest" en un solo string
    const textRest = rest.join(' ');
  
    // 2) Si hay dermatomas, construimos la frase única
    let textDermatomes = '';
    if (dermatomes.length > 0) {
      textDermatomes = 'A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS ' 
        + dermatomes.join('-') + '.';
    }
  
    // 3) Unimos topografía (puede haber una o varias)
    const textTopografia = topografia.join(', ');
  
    // 4) Finalmente, ensamblamos en el orden: rest -> dermatomas -> topografia
    //    usando un array de partes, para NO agregar comas extra.
    const parts = [];
    if (textRest) parts.push(textRest);          // p.ej. "VÍA SOMATOSENSORIAL..."
    if (textDermatomes) parts.push(textDermatomes);
    if (textTopografia) parts.push(textTopografia);
  
    // 5) Unimos con comas
    const finalConclusion = parts.join(', ');
  
    // 6) Guardamos
    setCopyConclusions(finalConclusion);
  
  }, [conclusions]);
  
  
  
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
            src: imageSrc1,
            alt: 'Modelo',
            useMap: '#image-map',
            width: isPageVisible ? '600' : '800',
            height: isPageVisible ? '600' : '800'
          }}
          
          rules={[

            {
              expectedValue: 'radial_superficial', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORES.png',
                    alt: 'Modelo',
                  },
            },
            {
              expectedValue: 'antebraqueal_cutaneo_lateral', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },
            {
              expectedValue: 'mediano', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },

            {
              expectedValue: 'ulnar', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },

            {
              expectedValue: 'tibial', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },

            {
              expectedValue: 'peroneo_superficial', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },
            {
              expectedValue: 'sural', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },
            {
              expectedValue: 'safeno', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },
            {
              expectedValue: 'femorocutaneo_lateral', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },
            {
              expectedValue: 'pudendo', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORES.png',
                    alt: 'Modelo',
                  },
                 
            },           
            {
              expectedValue: 'derechotrigemino',  
             
                image: [
                  {
                    src: 'MioImg/Base_Cerebro.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'SomatosensorialImg/TR_1.png',
                    alt: 'Modelo',
                  }]
            },

            {
              expectedValue: 'izquierdotrigemino',  
             
                image: [
                  {
                    src: 'MioImg/Base_Cerebro.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'SomatosensorialImg/TR_2.png',
                    alt: 'Modelo',
                  }]
            },

            {
              expectedValue: 'bilateraltrigemino', 
              image: [
              {
                src: 'MioImg/Base_Cerebro.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/imagen_combinadaTRI.png',
                alt: 'Modelo',
              }
            ],
            },
            {
              expectedValue: 'trigemino',  
             
                image: 
                  {
                    src: 'MioImg/Base_Cerebro.png',
                    alt: 'Modelo',
                  },
               
            },

            /*cortical superior*/
            {
              expectedValue: 'izquierdocorticals', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CORTICAL D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechocorticals', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR CORTICAL I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralcorticals', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CORTICAL D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR CORTICAL I.png',
                alt: 'Modelo',
              }
            ],
            },
             /*subcortical superior*/
             {
              expectedValue: 'izquierdosubcorticals', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR SUBCORTICAL D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechosubcorticals', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR SUBCORTICAL I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralsubcorticals', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR SUBCORTICAL D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR SUBCORTICAL I.png',
                alt: 'Modelo',
              }
            ],
            },
             /*cervical superior*/
             {
              expectedValue: 'izquierdocervicals', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CERVICAL D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechocervicals', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR CERVICAL I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralcervicals', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CERVICAL D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR CERVICAL I.png',
                alt: 'Modelo',
              }
            ],
            },
             /*periferico superior*/
             {
              expectedValue: 'izquierdoperifericos', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR PERIFERICO D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechoperifericos', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR PERIFERICO I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralperifericos', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR PERIFERICO D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/SUPERIOR PERIFERICO I.png',
                alt: 'Modelo',
              }
            ],
            },

            /*cortical inferior*/
            {
              expectedValue: 'izquierdocorticali', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR CORTICAL D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechocorticali', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR CORTICAL I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralcorticali', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR CORTICAL D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR CORTICAL I.png',
                alt: 'Modelo',
              }
            ],
            },
            /*subcortical inferior*/
            {
              expectedValue: 'izquierdosubcorticali', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR SUBCORTICAL D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechosubcorticali', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR SUBCORTICAL I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralsubcorticali', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR SUBCORTICAL D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR SUBCORTICAL I.png',
                alt: 'Modelo',
              }
            ],
            },

            /*cervical inferior*/


            /*toracico inferior*/
            {
              expectedValue: 'izquierdotoracicoi', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR TORACICO D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechotoracicoi', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR TORACICO I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateraltoracicoi', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR TORACICO D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR TORACICO I.png',
                alt: 'Modelo',
              }
            ],
            },

            /*lumbosacro inferior*/
            {
              expectedValue: 'izquierdolumbosacroi', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR LUMBAR D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derecholumbosacroi', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR LUMBAR I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilaterallumbosacroi', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR LUMBAR D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR LUMBAR I.png',
                alt: 'Modelo',
              }
            ],
            },

            /*periferico inferior*/

            {
              expectedValue: 'izquierdoperifericoi', 
              image: 
                {
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR PERIFERICO D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechoperifericoi', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR PERIFERICO I.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralperifericoi', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR PERIFERICO D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/INFERIOR PERIFERICO I.png',
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