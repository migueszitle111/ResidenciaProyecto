import { ReportContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
import SimpleMultiStepForm from './MenuBotones';
import './Style.css';

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
        </div>
        
        
        <Draggable>
        <div>
          <img src='/assets/Simbolos/S_Circulo 1.png' width={50} height={50} />
      </div>
      </Draggable>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Reporte