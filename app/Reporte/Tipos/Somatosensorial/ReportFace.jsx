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
    // 1) Define prioridades para las frases "normales".
    const priorityNormal = {
      "VÍA SOMATOSENSORIAL": 1,
      "CON INTEGRIDAD FUNCIONAL AFERENTE": 2,
      "CON DEFECTO FUNCIONAL AFERENTE": 3,
      "POR RETARDO EN LA CONDUCCIÓN": 4,
      "POR BLOQUEO EN LA CONDUCCIÓN": 5,
      "AXONAL": 6,
      "POR AUSENCIA DE RESPUESTA EVOCABLE": 7,
      "LEVE": 8,
      "MODERADO": 9,
      "SEVERO": 10,
      "Y PERDIDA AXONAL SECUNDARIA": 11,
      "Y RETARDO SECUNDARIO EN LA CONDUCCIÓN": 12,
      "PARA LADO IZQUIERDO": 13,
      "PARA LADO DERECHO": 14,
      "BILATERAL": 15,
      "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO": 16,
      "DERMATOMAS": 17,
      "TOPOGRÁFICAMENTE A NIVEL": 18
    };
  
    // 2) Define prioridades para topografías finales (todas al final).
    //    Nota: El "orden" de estos determina cómo aparecen *entre sí*.
    //    (p.ej., 1 < 2 < 3...) dentro del bloque final.
    const priorityTopos = {
      // SUPERIORES
      "CORTICAL (N20-P25": 1,
      "SUBCORTICAL (P14": 2,
      "CERVICAL (N11-N13": 3,
      "PERIFÉRICO (N4-N9": 4,
  
      // INFERIORES
      "CORTICAL (P37-N45": 5,
      "SUBCORTICAL (P31": 6,
      "CERVICAL (N26": 7,
      "TORÁCICO (N24": 8,
      "LUMBOSACRO (N20": 9,
      "PERIFÉRICO (P9-N18": 10
    };
  
    // Expresión regular para detectar si la conclusión es un DERMATOMA.
    // Busca algo como:
    //   "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS <derma>"
    // Y captura ese <derma> (C4, T1, etc.).
    const dermatomaRegex = /DERMATOMAS\s+([A-Z0-9]+)/i;
  
    // Arrays provisionales
    const normalArray = [];
    const topoArray = [];
    const dermatomas = []; // aquí guardaremos, por ejemplo, C4, T1, L5...
  
    // 3) Separamos las conclusiones
    conclusions.forEach((cl) => {
      const raw = cl.title.trim();
      const up = raw.toUpperCase();
  
      // --- 3.1) Revisa si es topográfico final (priorityTopos) ---
      let foundTopoKey = null;
      Object.keys(priorityTopos).forEach((key) => {
        if (up.includes(key)) {
          foundTopoKey = key;
        }
      });
      if (foundTopoKey) {
        topoArray.push({
          text: raw,
          priority: priorityTopos[foundTopoKey] || 999
        });
        return;
      }
  
      // --- 3.2) Revisa si es un dermatoma ---
      const matchDerma = raw.match(dermatomaRegex);
      if (matchDerma) {
        // matchDerma[1] es lo que está después de "DERMATOMAS"
        dermatomas.push(matchDerma[1]); // p.ej. "C4"
        return; // no lo añadimos a normalArray (para que no repita)
      }
  
      // --- 3.3) Si no es topográfico ni dermatoma, es "normal" ---
      let prio = 999;
      Object.keys(priorityNormal).forEach((key) => {
        if (up.includes(key)) {
          prio = priorityNormal[key];
        }
      });
  
      normalArray.push({
        text: raw,
        priority: prio
      });
    });
  
    // 4) Si hemos acumulado dermatomas, creamos una sola frase
    //    Ej: "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4-T1-L5."
    if (dermatomas.length > 0) {
      const joined = dermatomas.join('-'); // los une con guion
      normalArray.push({
        text: `VÍA SOMATOSENSORIAL A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS ${joined}.`,
        priority: priorityNormal["DERMATOMAS"] || 17 // usa la prioridad 17
      });
    }
  
    // 5) Ordenamos normalArray y topoArray según su priority
    normalArray.sort((a, b) => a.priority - b.priority);
    topoArray.sort((a, b) => a.priority - b.priority);
  
    // 6) Concatenamos: primero normales, luego topográficos
    const finalArray = [...normalArray, ...topoArray];
  
    // 7) Convertimos a un solo párrafo
    const finalParagraph = finalArray
      .map((item) => item.text.replace(/^,\s*/, "")) // Quita coma inicial, si existiera
      .join(" ");
  
    // 8) Guardamos el resultado en tu state
    setCopyConclusions(finalParagraph);
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
            //Superiores 
            {
              expectedValue: 'superior_derecho', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  },
            },
            {
              expectedValue: 'superior_izquierdo', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORDERECHA.png',
                    alt: 'Modelo',
                  },
            },

            {
              expectedValue: 'superior_bilateral', 
             
                image: [
                  {
                    src: 'SomatosensorialImg/SUPERIORDERECHA.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  }
                ]
            },
            {
              expectedValue: 'superior_bilateralindemne', 
             
                image: [
                  {
                    src: 'SomatosensorialImg/SUPERIORDERECHA.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  }
                ]
            },

            {
              expectedValue: 'superior_derechoindemne', 
             
                image: [
                 
                  {
                    src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  }
                ]
            },
            {
              expectedValue: 'superior_izquierdoindemne', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/SUPERIORDERECHA.png',
                    alt: 'Modelo',
                  },
                 
                
            },
            //inferiores
            {
              expectedValue: 'inferior_derecho', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  },
            },
            {
              expectedValue: 'inferior_izquierdo', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORDERECHA.png',
                    alt: 'Modelo',
                  },
            },

            {
              expectedValue: 'inferior_bilateral', 
             
                image: [
                  {
                    src: 'SomatosensorialImg/INFERIORDERECHA.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  }
                ]
            },
            {
              expectedValue: 'inferior_bilateralindemne', 
             
                image: [
                  {
                    src: 'SomatosensorialImg/INFERIORDERECHA.png',
                    alt: 'Modelo',
                  },
                  {
                    src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  }
                ]
            },

            {
              expectedValue: 'inferior_derechoindemne', 
             
                image: 
                  
                  {
                    src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
                    alt: 'Modelo',
                  }
                
            },
            {
              expectedValue: 'inferior_izquierdoindemne', 
             
                image: 
                  {
                    src: 'SomatosensorialImg/INFERIORDERECHA.png',
                    alt: 'Modelo',
                  }
                
                
            },
//trigemino
            {
              expectedValue: 'derecho_trigemino',  
             
                image: 
                [
            
                  {
                    
                    src: 'MioImg/Base_Cerebro.png',
                    alt: 'Modelo',
                  },
                  {
                    
                    src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/TR_1.png',
                    alt: 'Modelo',
                  },
                
                ]
            },

            {
              expectedValue: "izquierdo_trigemino",  
             
                image: 
                [
                   {
                  src: 'MioImg/Base_Cerebro.png',
                  alt: 'Modelo',

                   },
                  {
                    src: 'SomatosensorialImg/Vía Afectada/TR_2.png',
                    alt: 'Modelo',
                  }
                
               ]
            },

            {
              expectedValue: 'bilateral_trigemino', 
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
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_6-D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechoperifericos', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/SO_R_6.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralperifericos', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_6-D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/SO_R_6.png',
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
                  src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_1-D.png',
                  alt: 'Modelo',
                },
            },

            {
              expectedValue: 'derechoperifericoi', 
              image: 
              {
                src: 'SomatosensorialImg/Vía Afectada/SO_R_1.png',
                alt: 'Modelo',
              }
              
            },
            {
              expectedValue: 'bilateralperifericoi', 
              image: [
              {
                src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_1-D.png',
                alt: 'Modelo',
              },
              {
                src: 'SomatosensorialImg/Vía Afectada/SO_R_1.png',
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