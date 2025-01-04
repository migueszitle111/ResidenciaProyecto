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

    // Funcion para el arrastre de imagenes
    

    //funcion que agreaga comas y conjunciones a las conclusiones
    function formatConclusions(copyConclusions) {
      const keywords2 = ["POSTGANGLIONAR PACIAL A NIVEL DE TROCO"];
      const keywords3 = ["POSTGANGLIONAR PARCIAL A NIVEL DE CORDON"];
      const keywords4 = ["INTENSIDAD LEVE.", "INTENSIDAD MODERADA.", "INTENSIDAD SEVERA."];
      const keywords = ["C5", "C6", "C7", "C8", "T1", "SUPERIOR", "MEDIO", "INFERIOR", "LATERAL", "POSTERIOR", "MEDIAL"];
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
            src: '/assets/PlexoImg/BP_Plexopatia.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: isPageVisible ? '600' : '800',
            height: isPageVisible ? '600' : '800'
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
              image: {
                src: 'PlexoImg/PLE_P. Lumbosacro.png',
                alt: 'Modelo',
              }
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



          ]}
        /><div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}><textarea
        value={copyConclusions}
        defaultValue="PLEXOPATIA  "
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