import { useState, useEffect, useContext, useRef } from 'react'
import React, { useCallback } from 'react';
import { useSession } from "next-auth/react";
import { Accordion, AccordionContainer } from '../../../components/ReportTemplate/Accordion'   
import { ReportContext } from '@/src/context'
import { ConclusionButton, ConclusionBox } from '../../../components/ReportTemplate/Conclusions'
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas'
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import './Style.css';
import SimpleMultiStepForm from './MenuBotones';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { NerviusButton } from '@/app/components/ReportTemplate/Conclusions/Botton-Nervius';

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
    borderradius:'100%',
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
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} style={{display: 'none'}}/>        </div>

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
        <div className = 'conclusion-container'>

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
              expectedValue: 'MEDIANO', 
              image: {
                src: 'NeuropatiaImg/NO_1_Mediano.png',
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
              expectedValue: 'ANTEBRAQUIAL_CUTANEO',
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
              expectedValue: 'MUSCULOCUTANEO',
              image: {
                src: 'NeuropatiaImg/NO_Musculocutaneo.png',
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
              expectedValue: 'SUPRAESCAPULAR',
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
              expectedValue: 'FACIAL',
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
              expectedValue: 'TORACICO_LARGO',
              image: {
                src: 'NeuropatiaImg/NO_Torácico largo.png',
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
              expectedValue: 'CIATICO',
              image: {
                src: 'NeuropatiaImg/NO_Ciatico.png',
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
              expectedValue: 'FEMOROCUTÁNEO_LATERAL',
              image: {
                src: 'NeuropatiaImg/NO_Femorocutáneo femoral.png',
                alt: 'Modelo',
              }
            },
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
              expectedValue: 'NERVIO_PERONEO',
              image: {
                src: 'NeuropatiaImg/NO_Peroneo.png',
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
              expectedValue: 'PUDENDO',
              image: {
                src: 'NeuropatiaImg/NO_Pudendo.png',
                alt: 'Modelo',
              }
            },
          ]}
        />
        <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}><textarea
                value={copyConclusions} defaultValue="" onChange={handleTextareaChange} />

              </div><div
                style={{
                  position: 'absolute',
                  top: '18.9%',
                  left: '68.9%', borderRadius: 100,
                }} className={`dont-print-Nervius`}>
                <NerviusButton value='car' title='(CARPO),' displayText=' ' /></div>
                <div
                style={{
                  position: 'absolute',
                  top: '18.9%',
                  left: '58.9%', borderRadius: 100,
                }} className={`dont-print-Nervius`}>
                <NerviusButton value='car' title='(CARPO),' displayText=' ' />
                </div>

              
            </div>*
          </div>
        </div>
      </div>
    </div>
  )
}


export default Reporte 