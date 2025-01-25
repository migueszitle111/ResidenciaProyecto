import { ReportContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
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
        //position: 'relative'
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
      setCopyConclusions(formattedConclusions);
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
            <SimpleMultiStepForm showStepNumber={true}/>
          </div>
          
          {/*
          <div className={`dont-print ${isPageVisible ? '' : 'hidden'}`}>
          <AccordionContainer>
            <Accordion title='Fibras'>
              <ConclusionButton value='motora_asta_anterior_medular' title='Fibra motora-asta anterior medular' />
              <ConclusionButton value='sentitiva_ganglio_de_la_raiz_dorsal' title='Fibra sensitiva-ganglio de la raiz dorsal' />
            </Accordion>
            <Accordion title='Clasificación'>
              <ConclusionButton value='hereditaria' title='Clasificación hereditaria' />                
              <ConclusionButton value='adquirida' title='Clasificación adquirida' />
            </Accordion>
            <Accordion title='Denervación'>
              <ConclusionButton value='activa_abundante_difusa' title='Denervación activa abundante difusa' />
              <ConclusionButton value='activa_moderada_progresiva ' title='Denervación activa moderada progresiva' />
              <ConclusionButton value='activa_moderada' title='Denervación activa moderada' />
              <ConclusionButton value='activa_leve_en_fase_de_resolucion' title='Denervación activa leve en fase de resolución' />
              <ConclusionButton value='sin_denervacion_activa' title='Sin denervación activa' />
            </Accordion>
            <Accordion title='Distribución'>
              <ConclusionButton value='bulbar' title='Distribución bulbar' />
              <ConclusionButton value='cervical_miembros_superiores' title='Distribución cervical y miembros superiores' />
              <ConclusionButton value='toracico' title='Distribución toracico' />
              <ConclusionButton value='lumbar_miembros_inferiores' title='Distribución lumbar y miembros inferiores' />
            </Accordion>
            <Accordion title='Lateralidad'>
              <ConclusionButton value='simetrica' title='Lateralidad simetrica' />
              <ConclusionButton value='asimetrica' title='Lateralidad asimetrica' />
            </Accordion>
            <Accordion title = 'Reinervación'>
              <Accordion title = '> Activa'>
              <ConclusionButton value = 'abundante' title = 'Con abundantes datos de reinervación' />
              <ConclusionButton value = 'moderada' title = 'Con moderados datos de reinervación' />
              <ConclusionButton value = 'escasa' title = 'Con escasos datos de reinervación' />
              </Accordion>
              <ConclusionButton value = 'nulo' title = 'Sin datos de reinervación' />
            </Accordion>
          </AccordionContainer>
          </div>
          */}

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
        <div className='conclusion-container '>
        <ConclusionCanvas 
        
          img={{
            src: '/assets/UnionMuscularIMG/BP_UnionMuscular.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: isPageVisible ? '600' : '800',
            height: isPageVisible ? '600' : '800'
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
        /><div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
        <textarea
          value={copyConclusions}
          onChange={handleTextareaChange}
        />
      </div>
      <div><DropArea /> </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Reporte
