import { ReportContext ,DropContext} from '@/src/context';
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
    /* ---------- PRIORIDADES ---------- */
    const priority = {
     /* 1. Eje principal */
  'VÍA SOMATOSENSORIAL': 1,

  /* 2. Estado funcional */
  'CON INTEGRIDAD FUNCIONAL': 2,
  'CON DEFECTO': 2,

  /* 3. Fisiopatología primaria */
  'POR RETARDO EN LA CONDUCCIÓN': 3,
  'POR BLOQUEO EN LA CONDUCCIÓN': 3,
  'AXONAL': 3,
  'POR AUSENCIA DE RESPUESTA EVOCABLE': 3,

  /* 4. ⬅️  Grado (antes era 5) */
  'LEVE': 4,
  'MODERADO': 4,
  'SEVERO': 4,

  /* 5. ⬅️  Fisiopatología secundaria (antes era 4) */
  'Y PÉRDIDA AXONAL SECUNDARIA': 5,
  'Y RETARDO SECUNDARIO EN LA CONDUCCIÓN': 5,
  
      // 6- Lado
      'PARA LADO IZQUIERDO': 6,
      'PARA LADO DERECHO': 6,
      'DE FORMA BILATERAL': 6,
  
      // 7- Frase dermatomas
      'A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS': 7,

        };
  
    /* ---------- TOPOS SE QUEDAN AL FINAL ---------- */
    const priorityTopo = {
      'CORTICAL (N20-P25': 1,  'SUBCORTICAL (P14': 2,  'CERVICAL (N11-N13': 3,  'PERIFÉRICO (N4-N9': 4,
      'CORTICAL (P37-N45': 5,  'SUBCORTICAL (P31': 6,  'TORÁCICO (N24': 7,
      'LUMBOSACRO (N20': 8,    'PERIFÉRICO (P9-N18': 9
    };
  
    /* ---------- CLASIFICAMOS ---------- */
    const normal   = [];
    const topos    = [];
    const dermas   = [];           // C4, C5, …
  
    const dermaRe  = /DERMATOMAS\s+([A-Z0-9]+)/i;
  
    conclusions.forEach(({ title }) => {
      const txt = title.trim();
      const up  = txt.toUpperCase();
  
      // ➊ ¿Topografía?
      const tk = Object.keys(priorityTopo).find(k => up.includes(k));
      if (tk) { topos.push({ p: priorityTopo[tk], t: txt }); return; }
  
      // ➋ ¿Dermatoma individual?
      const m = up.match(dermaRe);
      if (m)   { dermas.push(m[1]); return; }
  
      // ➌ Todo lo demás
      const pk = Object.keys(priority).find(k => up.includes(k)) || '';
      normal.push({ p: priority[pk] ?? 99, t: txt });
    });
  
    /* ---------- FRASE UNIFICADA PARA DERMATOMAS ---------- */
    if (dermas.length) {
      const ord = dermas
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map(d => d.toUpperCase());
  
      // C7 y C8  /  C6-C7 y C8
      const list =
        ord.length === 1 ? ord[0] :
        ord.length === 2 ? `${ord[0]}-${ord[1]}` :
        `${ord.slice(0, -1).join('-')}-${ord.slice(-1)}`;
  
      normal.push({
        p: priority['A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS'],
        t: `A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS ${list}.`
      });
    }
  
   /* ---------- ORDEN Y CONCATENACIÓN ---------- */
let finalTxt = [
  ...normal.sort((a, b) => a.p - b.p),
  ...topos .sort((a, b) => a.p - b.p)
]
  .map(({ t }) => t.replace(/^,\s*/, ''))   // limpia coma inicial
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim();
/* --- NUEVO BLOQUE: mueve el grado delante del secundario --- */
const gradoRE   = '(LEVE|MODERADO|SEVERO)';

finalTxt = finalTxt
  // “…SECUNDARIA MODERADO” → “MODERADO …SECUNDARIA”
  .replace(
    new RegExp(`Y\\s+PÉRDIDA\\s+AXONAL\\s+SECUNDARIA\\s+${gradoRE}`, 'i'),
    '$1 Y PÉRDIDA AXONAL SECUNDARIA'
  )
  // “…CONDUCCIÓN MODERADO” → “MODERADO …CONDUCCIÓN”
  .replace(
    new RegExp(`Y\\s+RETARDO\\s+SECUNDARIO\\s+EN\\s+LA\\s+CONDUCCIÓN\\s+${gradoRE}`, 'i'),
    '$1 Y RETARDO SECUNDARIO EN LA CONDUCCIÓN'
  );
  
/* ---------- REORDENA SOLO TRIGÉMINO ---------- */
const TRIG_PATH =
  'A TRAVÉS DEL TRACTO Y NÚCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO.';

if (finalTxt.toUpperCase().includes(TRIG_PATH.toUpperCase())) {
  // 1) quita el bloque (con o sin coma delante)
  finalTxt = finalTxt.replace(
    new RegExp(',?\\s*' + TRIG_PATH.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    ''
  )
  // 2) quita punto final (si quedó) y agrega el bloque al final
  .replace(/\.\s*$/, '')
  .trim() + ' ' + TRIG_PATH;
}

setCopyConclusions(finalTxt);

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
        <div className={`mx-4 z-10 `}>
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

                       /*indemne*/
///////////////////////////c4di
{
  expectedValue: 'bilateralc4di', 
 
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
  expectedValue: 'derechoc4di',  
    image: [
      {
        src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc4di', 
 
    image: 
      {
        src: 'SomatosensorialImg/SUPERIORDERECHA.png',
        alt: 'Modelo',
      },
   
},
////////////////////////////////c5di
{
  expectedValue: 'bilateralc5di', 
 
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
  expectedValue: 'derechoc5di',  
    image: [
      {
        src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc5di', 
 
    image: 
      {
        src: 'SomatosensorialImg/SUPERIORDERECHA.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////c6di
{
  expectedValue: 'bilateralc6di', 
 
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
  expectedValue: 'derechoc6di',  
    image: [
      {
        src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc6di', 
 
    image: 
      {
        src: 'SomatosensorialImg/SUPERIORDERECHA.png',
        alt: 'Modelo',
      },
   
},
////////////////////////////////////////////////////////////
{
  expectedValue: 'bilateralc7di', 
 
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
  expectedValue: 'derechoc7di',  
    image: [
      {
        src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc7di', 
 
    image: 
      {
        src: 'SomatosensorialImg/SUPERIORDERECHA.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////////////c8di

{
  expectedValue: 'bilateralc8di', 
 
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
  expectedValue: 'derechoc8di',  
    image: [
      {
        src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc8di', 
 
    image: 
      {
        src: 'SomatosensorialImg/SUPERIORDERECHA.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t1di
{
  expectedValue: 'bilateralt1di', 
 
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
  expectedValue: 'derechot1di',  
    image: [
      {
        src: 'SomatosensorialImg/SUPERIORIZQUIERDA.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot1di', 
 
    image: 
      {
        src: 'SomatosensorialImg/SUPERIORDERECHA.png',
        alt: 'Modelo',
      }, 
},
//////////////////////////////////////////////t2di
{
  expectedValue: 'derechot2di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot2di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt2di', 
 
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
//////////////////////////////////////////////t3di
{
  expectedValue: 'derechot3di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot3di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt3di', 
 
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
//////////////////////////////////////////////t4di
{
  expectedValue: 'derechot4di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot4di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt4di', 
 
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
//////////////////////////////////////////////t5di
{
  expectedValue: 'derechot5di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot5di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt5di', 
 
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
//////////////////////////////////////////////t6di
{
  expectedValue: 'derechot6di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot6di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt6di', 
 
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
//////////////////////////////////////////////t7di
{
  expectedValue: 'derechot7di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot7di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt7di', 
 
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

//////////////////////////////////////////////t8di
{
  expectedValue: 'derechot8di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot8di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt8di', 
 
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

//////////////////////////////////////////////t9di
{
  expectedValue: 'derechot9di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot9di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt9di', 
 
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
//////////////////////////////////////////////t10di
{
  expectedValue: 'derechot10di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot10di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt10di', 
 
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
//////////////////////////////////////////////t11di
{
  expectedValue: 'derechot11di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot11di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt11di', 
 
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
//////////////////////////////////////////////t12di
{
  expectedValue: 'derechot12di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdot12di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilateralt12di', 
 
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
//////////////////////////////////////////////l1di
{
  expectedValue: 'derechotl1di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdol1di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterall1di', 
 
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
//////////////////////////////////////////////l2di
{
  expectedValue: 'derechol2di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdol2di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterall2di', 
 
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
//////////////////////////////////////////////l3di
{
  expectedValue: 'derechol3di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdol3di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterall3di', 
 
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
////////////////////////////////////////////////l4di
{
  expectedValue: 'derechol4di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdol4di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterall4di', 
 
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
//////////////////////////////////////////////l5di
{
  expectedValue: 'derechol5di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdol5di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterall5di', 
 
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
//////////////////////////////////////////////s1di
{
  expectedValue: 'derechos1di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdos1di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterals1di', 
 
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
/////////////////////////////////////////////////////////s2di
{
  expectedValue: 'derechos2di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'izquierdos2di', 
 
    image: 
      {
        src: 'SomatosensorialImg/INFERIORDERECHA.png',
        alt: 'Modelo',
      },
},
{
  expectedValue: 'bilaterals2di', 
 
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


//alteradasdermatomas
/////////////////////////////////////////////////////////////////////////////c4da


// {
//   expectedValue: 'derecho_der', 
 
//     image: 
//       {
//         src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
//         alt: 'Modelo',
//       },
// },
// {
//   expectedValue: 'izquierdo_der', 
 
//     image: 
//       {
//         src: 'SomatosensorialImg/INFERIORDERECHA.png',
//         alt: 'Modelo',
//       },
// },
// {
//   expectedValue: 'bilateral_der', 
 
//     image: [
//       {
//         src: 'SomatosensorialImg/INFERIORDERECHA.png',
//         alt: 'Modelo',
//       },
//       {
//         src: 'SomatosensorialImg/INFERIORIZQUIERDA.png',
//         alt: 'Modelo',
//       }
//     ]
// },






{
  expectedValue: 'bilateralc4da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechoc4da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc4da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      },
   
},
////////////////////////////////c5da
{
  expectedValue: 'bilateralc5da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechoc5da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc5da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////c6da

{
  expectedValue: 'bilateralc6da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechoc6da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc6da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////////////////c7da
{
  expectedValue: 'bilateralc7da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechoc7da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc7da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      },
   
},

////////////////////////////////////////////c8da
{
  expectedValue: 'bilateralc8da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechoc8da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdoc8da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t1da
{
  expectedValue: 'bilateralt1da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot1da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot1da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t2da
{
  expectedValue: 'bilateralt2da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot2da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot2da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////////////////t3da
{
  expectedValue: 'bilateralt3da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot3da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot3da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t4da
{
  expectedValue: 'bilateralt4da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot4da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot4da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t5da
{
  expectedValue: 'bilateralt5da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot5da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot5da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t6da
{
  expectedValue: 'bilateralt6da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot6da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot6da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t7da
{
  expectedValue: 'bilateralt7da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot7da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot7da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t8da
{
  expectedValue: 'bilateralt8da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot8da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot8da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////////////////t9da
{
  expectedValue: 'bilateralt9da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot9da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot9da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t10da
{
  expectedValue: 'bilateralt10da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot10da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot10da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t11da
{
  expectedValue: 'bilateralt11da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot11da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot11da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////t12da
{
  expectedValue: 'bilateralt12da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechot12da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdot12da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////l1da
{
  expectedValue: 'bilaterall1da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechol1da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdol1da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
///////////////////////////////////////////////l2da
{
  expectedValue: 'bilaterall2da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechol2da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdol2da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////l3da
{
  expectedValue: 'bilaterall3da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechol3da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdol3da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////l4da
{
  expectedValue: 'bilaterall4da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechol4da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdol4da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
},
//////////////////////////////////////////////l5da
{
  expectedValue: 'bilaterall5da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechol5da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdol5da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }, 
},
//////////////////////////////////////////////s1da
{
  expectedValue: 'bilaterals1da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechos1da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdos1da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      },
   
},
//////////////////////////////////////////////s2da
{
  expectedValue: 'bilaterals2da', 
 
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      },
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'derechos2da',  
    image: [
      {
        src: 'SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
        alt: 'Modelo',
      }
    ]
},
{
  expectedValue: 'izquierdos2da', 
 
    image: 
      {
        src: 'SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
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
  expectedValue: 'derecho_trigeminoindemne',  
 
    image: 
    [

      {
        
        src: 'MioImg/Base_Cerebro.png',
        alt: 'Modelo',
      },
      {
        
        src: 'SomatosensorialImg/TRI_1.png',
        alt: 'Modelo',
      },
    
    ]
},

{
  expectedValue: "izquierdo_trigeminoindemne",  
 
    image: 
    [
       {
      src: 'MioImg/Base_Cerebro.png',
      alt: 'Modelo',

       },
      {
        src: 'SomatosensorialImg/TRI_2.png',
        alt: 'Modelo',
      }
    
   ]
},

{
  expectedValue: 'bilateral_trigeminoindemne', 
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