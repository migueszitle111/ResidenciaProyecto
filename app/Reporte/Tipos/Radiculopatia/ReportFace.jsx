import { useState, useEffect, useContext } from 'react'
import React, { useCallback } from 'react';
import { useSession } from "next-auth/react";
import { Accordion, AccordionContainer } from '../../../components/ReportTemplate/Accordion'   
import { ReportContext } from '@/src/context'
import { ConclusionButton, ConclusionBox } from '../../../components/ReportTemplate/Conclusions'
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas'
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import './Style.css';
import './EstilosCruz.css';
import SimpleMultiStepForm from './MenuBotones';

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


  return (
    <div>
      {/* Wrapper que encapsula la image, conclusión y lista de botones */}
      <div className="wrapper">
      
          {/* Se especifica dont-print para no ser incluidos en la vista de impresión */}
          <div className='vertical-orientation dont-print'>

          {/* Lista de botones */}
            <div className='button-bar'>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} style={{display: 'none'}}/>
            </div>

            <div className={'vertical-container dont-print'}>

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
        <table cellpadding="0" cellspacing="0">
        <tr>
          <td>
          

        <ConclusionCanvas 
        
          img={{
            src: '/assets/RadiculopatiaImg/Columna/RA_Columna_1_FondoB.png',
            alt: 'Modelo',
            useMap: '#image-map',
            width: isPageVisible ? '600' : '800',
            height: isPageVisible ? '600' : '800'
          }}
          
          rules={[
            {
              expectedValue: 'c5_i', 
              image: {
                src: 'RadiculopatiaImg/C5 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c5_d', 
              image: {
                src: 'RadiculopatiaImg/C5 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c6_i', 
              image: {
                src: 'RadiculopatiaImg/C6 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c6_d', 
              image: {
                src: 'RadiculopatiaImg/C6 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c7_i', 
              image: {
                src: 'RadiculopatiaImg/C7 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c7_d', 
              image: {
                src: 'RadiculopatiaImg/C7 derecho anterior.png',
                alt: 'Modelo' 
              }
            },
            {
              expectedValue: 'c8_i', 
              image: {
                src: 'RadiculopatiaImg/C8 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'c8_d', 
              image: {
                src: 'RadiculopatiaImg/C8 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 't1_i', 
              image: {
                src: 'RadiculopatiaImg/T1 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 't1_d', 
              image: {
                src: 'RadiculopatiaImg/T1 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l2_i', 
              image: {
                src: 'RadiculopatiaImg/L1-L2 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l2_d', 
              image: {
                src: 'RadiculopatiaImg/L1-L2 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l3_i', 
              image: {
                src: 'RadiculopatiaImg/L1-L2 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l3_d', 
              image: {
                src: 'RadiculopatiaImg/L1-L2 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l4_i', 
              image: {
                src: 'RadiculopatiaImg/L3-L4 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l4_d', 
              image: {
                src: 'RadiculopatiaImg/L3-L4 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l5_i', 
              image: {
                src: 'RadiculopatiaImg/L5 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 'l5_d', 
              image: {
                src: 'RadiculopatiaImg/L5 derecho anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 's1_i', 
              image: {
                src: 'RadiculopatiaImg/S1 izquierdo anterior.png',
                alt: 'Modelo',
              }
            },
            {
              expectedValue: 's1_d', 
              image: {
                src: 'RadiculopatiaImg/S1 derechoanterior.png',
                alt: 'Modelo',
              }
            },
          ]}
        />

        </td>
        <td>

        <ConclusionCanvas 
        
        img={{
          src: '/assets/RadiculopatiaImg/Columna/RA_Columna_2_FondoB.png',
          alt: 'Modelo',
          useMap: '#image-map',
          width: isPageVisible ? '600' : '800',
          height: isPageVisible ? '600' : '800'
        }}

        rules={[
          {
            expectedValue: 'c5_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C5-C6 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c5_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C5-C6 izquierdo posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c5_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_C5,C6.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c6_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C5-C6 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c6_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C5-C6 izquierdo posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c6_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_C5-C6-C7.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c7_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C7 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c7_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C7 izquierdo posterior.png',
              alt: 'Modelo' 
            }
          },
          {
            expectedValue: 'c7_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_C7.png',
              alt: 'Modelo' 
            }
          },
          {
            expectedValue: 'c8_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C8 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c8_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C8 izquierdo posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'c8_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_C8-T1.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 't1_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C8 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 't1_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/C8 izquierdo posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 't1_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_C8-T1.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'l5_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/L5 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'l5_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/L5 izquierdo posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 'l5_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_L5.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 's1_d', 
            image: {
              src: 'RadiculopatiaPosteriorImg/L5 S1 S2 derecho posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 's1_i', 
            image: {
              src: 'RadiculopatiaPosteriorImg/L5 S1 S2 izquierdo posterior.png',
              alt: 'Modelo',
            }
          },
          {
            expectedValue: 's1_b', 
            image: {
              src: 'RadiculopatiaPosteriorImg/RA_P_L5-S1-S2.png',
              alt: 'Modelo',
            }
          },
        ]}
      />
        </td>
      </tr>
      </table>
      <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
      <textarea
        value={copyConclusions}
        onChange={handleTextareaChange}
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