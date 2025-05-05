
import { ReportContext ,DropContext} from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
import SimpleMultiStepForm from './MenuBotones';
import { checkDivs2 } from './selecNervio2';
import { checkDivsSegmentarBilateral2 } from './SelecNerviosSegmenBILATERAL2';
import { checkDivsBILATERAL2 } from './SelecNerviosBILATERAL2';
import { checkDivsSegmentar2 } from './SelecSegmentariaNerv2';
import { checkDivsSegmentar } from './SelecSegmentariaNerv';
import { checkDivsBILATERAL } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERAL';
import { checkDivsBILATERALIZQ } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERALIZQ';
import { checkDivs } from '@/app/Reporte/Tipos/Neuropatia/SelecNervios';
import { checkDivsSegmentarBilateral } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosSegmenBILATERAL';
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
        <p className="top-left-text" style={{ marginLeft: 'auto', textAlign: 'left', paddingLeft: '15px', fontSize: '19px', paddingTop:'10px' }}>
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
  const [copyConclusions, setCopyConclusions] = useState('') // Estado para la caja de conclusiones
  const [isPageVisible, setPageVisibility] = useState(true) // Estado para la visibilidad de la pagina
  const [selectedImages, setSelectedImages] = useState([]); // Estado para las imagenes seleccionadas
  // Estados para el historial de imagenes
  const [history, setHistory] = useState([]);
  const [Future, setFuture] = useState([]);
  const [topLeftText, setTopLeftText] = useState('');
  const [expandedDivs, setExpandedDivs] = useState({});
  const imgRef = useRef(null);
//Imagen de fondo completa
  const reportRef = useRef(null);          // 👈  este será nuestro “canvas”




  // Actualizar las conclusiones
  useEffect(() => {
    setCopyConclusions(conclusions.map(cl => cl.title).join(''))
  }, [conclusions])


  function formatConclusions(copyConclusions) {

    const keywords2 = ["POSTGANGLIONAR PACIAL A NIVEL DE TROCO"];
    const keywords3 = ["POSTGANGLIONAR PARCIAL A NIVEL DE CORDON"];
    const keywords4 = ["INTENSIDAD LEVE.", "INTENSIDAD MODERADA.", "INTENSIDAD SEVERA."];
    const keywords = ["C5", "C6", "C7", "C8", "T1", "SUPERIOR", "MEDIO", "INFERIOR", "LATERAL", "POSTERIOR", "MEDIAL", "L2", "L3", "L4", "L5", "S1", "S2"];
    const specificKeywords = ["C5", "C6", "C7", "C8", "T1"]; // Nueva condición específica
    const prognosisKeywords = [
        "PRONÓSTICO DE RECUPERACIÓN COMPLETA.",
        "PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.",
        "PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.",
        "PRONÓSTICO DE RECUPERACIÓN NULA."
    ]; // Nuevas palabras clave para el pronóstico

    const keywords5 = ["FOCALIZADA A NIVEL", "FOCAL A NIVEL"];

    // Nueva condición para insertar "MONO" si existe la frase clave
    if (copyConclusions.includes(keywords5[0])) {
        copyConclusions = 'MONO ' + copyConclusions;
    }

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
            words[i + 1] += '\n'; // Agregar doble salto de línea después de la palabra clave
        }
    }

    // Verificar las nuevas frases para "PRONÓSTICO DE RECUPERACIÓN"
    for (let phrase of prognosisKeywords) {
        // Reemplazar las frases con ellas mismas y un salto de línea adicional
        const regex = new RegExp(phrase, 'g');
        copyConclusions = copyConclusions.replace(regex, phrase + '\n\n');
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

     // 1️⃣  Al final de todos los reemplazos junta de nuevo el texto
  let formattedConclusions = words.join(' ');

  /* ⬇️  NUEVO: sustituir el espacio que precede a “REINERVACIÓN” por dos saltos */
  formattedConclusions = formattedConclusions.replace(
    / \bREINERVACIÓN\b/g,          // espacio + palabra
    '\nREINERVACIÓN'             // doble salto + palabra
  );

  /* 3️⃣ salto doble DESPUÉS del pronóstico */
formattedConclusions = formattedConclusions.replace(
  /(PRONÓSTICO DE RECUPERACIÓN (?:COMPLETA|PARCIAL FUNCIONAL|POBRE NO FUNCIONAL|NULA)\.)\s*/gi,
  '$1\n\n'                   // “.…\n\n”
);

/* 4️⃣ salto doble ANTES del siguiente diagnóstico */
formattedConclusions = formattedConclusions.replace(
  /([.;])\s*(MONO NEUROPATÍA|POLI NEUROPATÍA|NEURONOPATÍA|RADICULOPATÍA|PLEXOPATÍA)/gi,
  '$1\n\n$2'                 // “…;\n\nMONO NEUROPATÍA…”
);


    // Finalmente, agregar el formato con los saltos de línea a las frases de pronóstico
    formattedConclusions;

    return formattedConclusions;
}

const formattedConclusions = formatConclusions(copyConclusions);


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

  useEffect(() => {
    const newConclusions = conclusions.map(cl => cl.title).join('');
    const formattedConclusions = formatConclusions(newConclusions);
    setCopyConclusions(formattedConclusions);
}, [conclusions]);



  // Codigo para el cambio de imagen por clics
  const images = ['/assets/Simbolos/S_CirculoRojoIntermedio.png'];
  const [imageIndex, setImageIndex] = useState(0);

  const checkboxToggle = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const containerStyle = {
    position: 'relative',
    width: '100%', // Ajusta el ancho según sea necesario
    height: '100%' // Ajusta la altura según sea necesario
  };

  const imageStyle = {
    position: 'absolute',
    borderradius: '100%',
    top: '16%', // 20% desde la parte superior del contenedor
    left: '53%' // 80% desde el borde izquierdo del contenedor
  };

  //intento de boton 2
  const [buttons, setButtons] = useState([]);

  const handleFigureClick = () => {
    // Generate a unique ID for the new button
    const newButtonId = `button-${buttons.length}`;

    // Add a new button to the state
    setButtons([...buttons, newButtonId]);
  };
  const handleFigureClick1 = () => {
    // Generate a unique ID for the new button
    const newButtonId = `button-${buttons.length}`;

    // Add a new button to the state
    setButtons([...buttons, newButtonId]);
  };
  const handleButtonClick = (buttonId) => {
    // Remove the button with the given ID from the state
    setButtons(buttons.filter(id => id !== buttonId));
  };

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
               reportRef={reportRef}
               showStepNumber={true}
               conclusionDivRef={conclusionDivRef}
               elementRef={elementRef}
               handleImageChange={handleImageChange}
               topLeftText={topLeftText}
               setTopLeftText={setTopLeftText}
               copyConclusions={copyConclusions}  
               ref={imgRef}
               expandedDivs={expandedDivs}
               setExpandedDivs={setExpandedDivs}
               />
               </div>    
               </div>
             </div>
            {/* Componente que contiene las imagenes y sus valores que se utilizaran */}
                 <div>
            <div className='con-img' ref={reportRef} id="reporte-completo"> 
                 
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
                  src: '/assets/NeuronoImg/BP_Neuronopatia.png',
                  alt: 'Modelo',
                  useMap: '#image-map',
                  width: isPageVisible ? '600' : '600',
                  height: isPageVisible ? '600' : '600'
                }}

                rules={[
                  {
                    expectedValue: 'MEDIANO',
                    image: {
                      src: 'NeuropatiaImg/NO_1_Mediano.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'MEDIANO2',
                    image: {
                      src: 'NeuropatiaImg/NO_1_Mediano.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'INTEROSEOANTERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Anterior.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'INTEROSEOANTERIOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Anterior.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'ACCESORIO',
                    image: {
                      src: 'NeuropatiaImg/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ACCESORIO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRAQUIAL_CUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Antebraquial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRAQUIAL_CUTANEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Antebraquial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR',
                    image: {
                      src: 'NeuropatiaImg/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Posterior.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Posterior.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR',
                    image: {
                      src: 'NeuropatiaImg/NO_Supraescapular - Subescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Supraescapular - Subescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR',
                    image: {
                      src: 'NeuropatiaImg/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'DORSAL_CUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Dorsal Cutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'DORSAL_CUTANEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Dorsal Cutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO',
                    image: {
                      src: 'NeuropatiaImg/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_LARGO',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracico_largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_LARGO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracico_largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO',
                    image: {
                      src: 'NeuropatiaImg/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Medio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Medio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Sup.Inf FC.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Sup.Inf FC.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO',
                    image: {
                      src: 'NeuropatiaImg/NO_Safeno.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Safeno.png',
                      alt: 'Modelo',
                    }
                  },
                  //{
                  //  expectedValue: 'FEMOROCUTÁNEO_LATERAL',
                  //  image: {
                  //    src: 'NeuropatiaImg/NO_Femorocutáneo femoral.png',
                  //    alt: 'Modelo',
                  //  }
                  // },
                  {
                    expectedValue: 'ILIOINGUINAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Ilioinguinal-genitofemoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTURADOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTURADOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'NERVIO_PERONEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'NERVIO_PERONEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Profundo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Profundo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Sural.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Sural.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO',
                    image: {
                      src: 'NeuropatiaImg/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'MED_IZQUIERDA',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },


                  // Imagenes de Generalizada DERECHA

                  {
                    expectedValue: 'MEDIANO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                // FALTA EL NERVIO 
                  {
                    expectedValue: 'INTEROSEO_ANTERIOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  // FALTA EL NERVIO 
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MEDIANO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  
                  {
                    expectedValue: 'SUPRAESCAPULAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Ulnar.png',
                      alt: 'Modelo',
                    }
                  },


                  // Imagenes de Generalizada IZQUIERDA
                  {
                    expectedValue: 'MEDIANO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MEDIANO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Ulnar.png',
                      alt: 'Modelo',
                    }
                  },

                  // Imagenes de Generalizada NERVIO COMPLETO

                  {
                    expectedValue: 'MEDIANO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_12_Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  //C:\Users\Estefanny Cruz.B\Documents\RESIDENCIA\ResidenciaProyecto\public\assets\NeuropatiaImg\NervioRojo\COMPLETO\NO_Interoseo-Anterior(1).png
                  {
                    expectedValue: 'INTEROSEOANTERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Anterior(1).png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'MUSCULOCUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Musculocutaneo.png',
                      alt: 'Modelo2',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Posterior (1).png',
                      alt: 'Modelo',
                    }
                  },

                //FALTA NERVIO
                  {
                    expectedValue: 'DORSAL_CUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Safeno(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Sural-(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Medial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Lateral(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Superficial (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Profundo (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Sup.Inf (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Medio (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },



                ]}
                
              />
              <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'} `}><textarea
                value={copyConclusions} defaultValue="" onChange={handleTextareaChange} />

              </div>

              <div>{checkDivsBILATERAL(copyConclusions)}</div>
              <div>{checkDivsBILATERAL2(copyConclusions)}</div>
              {/* <div>{checkDivsBILATERALIZQ(copyConclusions)}</div> */}
              <div>{checkDivs(copyConclusions)}</div>
              <div>{checkDivs2(copyConclusions)}</div>
              <div>{checkDivsSegmentar(copyConclusions)}</div>
              <div>{checkDivsSegmentar2(copyConclusions)}</div>
              <div>{checkDivsSegmentarBilateral(copyConclusions)}</div>
              <div>{checkDivsSegmentarBilateral2(copyConclusions)}</div>
              
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}


export default Reporte