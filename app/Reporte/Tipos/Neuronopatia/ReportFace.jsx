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

  // Función para formatear las conclusiones: tiene como objetivo insertar comas y conjunciones en las conclusiones
  function formatConclusions(copyConclusions) {
    const keywords = ["BULBAR", "CERVICAL", "TORÁCICA", "LUMBAR"];
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
//console.log(formattedConclusions);



  //console.log(copyConclusions)
  const [isPageVisible, setPageVisibility] = useState(true) // Estado para la visibilidad de la pagina
  const [selectedImages, setSelectedImages] = useState([]); // Estado para las imagenes seleccionadas
  // Estados para el historial de imagenes
  const [history, setHistory] = useState([]); 
  const [Future,setFuture] = useState([]); 

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

  return (
    <div >
      {/* Wrapper que encapsula la image, conclusión y lista de botones */}
      <div className="wrapper">
        
        {/* Componente de la caja de conclusión junto con la caja de notas */}
          {/* Se especifica dont-print para no ser incluidos en la vista de impresión */}
          <div className='vertical-orientation dont-print'>
              <div className='button-bar'>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print`} style={{display: 'none'}}/>
              </div>

            <div className={'vertical-container dont-print'}>

          {/* Menu de opciones */}
        
          <div className={`mx-4 dont-print ${isPageVisible ? 'visible' : 'hidden'}`}>
          
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
        <ConclusionCanvas 
        
          img={{
            src: '/assets/NeuronoImg/BP_Neuronopatia.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: isPageVisible ? '600' : '800',
            height: isPageVisible ? '600' : '800'
          }}
          rules={[
            {
              expectedValue: 'bulbar',
              image: {
                src: 'NeuronoImg/NE_Bulbar.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'cervical_miembros_superiores',
              image: {
                src: 'NeuronoImg/NE_Cervical.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'toracico',
              image: {
                src: 'NeuronoImg/NE_Toracico.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'sentitiva_ganglio_de_la_raiz_dorsal',
              image: {
                src: 'NeuronoImg/NE_Sensitiva.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'lumbar_miembros_inferiores',
              image: {
                src: 'NeuronoImg/NE_Lumbar.png',
                alt: 'Modelo',
              }
            },
          ]}
        />
        <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}><textarea
          value={copyConclusions}
          defaultValue=""
          onChange={handleTextareaChange}
        /></div>
        <div><DropArea /> </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}



export default Reporte