import { ReportContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
import './EstilosCruz.css';
import SimpleMultiStepForm, { CheckboxContext } from './MenuBotones';
import './Style.css';

const Reporte = () => {
  const { checkedStateLeft, checkedStateRight } = useContext(CheckboxContext);

  // Mapa de checkbox y rutas de imágenes
  const imageMap = {
    left: {
      A1: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz1' },
      A2: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz2' },
      A3: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz3' },
      A4: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz4' },

      A9: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz9' },
      A10: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz10' },
      A11: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz11' },
      A12: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz12' },

      A17: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz17' },
      A18: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz18' },
      A19: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz19' },
      A20: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz20' },

      A25: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz25' },
      A26: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz26' },
      A27: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz27' },
      A28: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz28' },

      A33: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz33' },
      A34: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz34' },
      A35: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz35' },
      A36: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz36' },

      A41: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz41' },
      A42: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz42' },
      A43: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz43' },
      A44: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz44' },

      A49: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz49' },
      A50: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz50' },
      A51: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz51' },
      A52: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz52' },

      A57: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz57' },
      A58: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz58' },
      A59: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz59' },
      A60: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz60' },

      A65: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz65' },
      A66: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz66' },
      A67: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz67' },
      A68: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz68' },

      A73: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz73' },
      A74: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz74' },
      A75: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz75' },
      A76: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz76' },

      A81: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz81' },
      A82: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz82' },
      A83: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz83' },
      A84: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz84' },


      //Torácica
      A89: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz89' },
      A90: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz90' },
      A91: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz91' },
      A92: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz92' },

      A97: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz97' },
      A98: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz98' },
      A99: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz99' },
      A100: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz100' },

      A105: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz105' },
      A106: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz106' },
      A107: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz107' },
      A108: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz108' },

      A113: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz113' },
      A114: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz114' },
      A115: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz115' },
      A116: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz116' },
      
      A121: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz121' },
      A122: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz122' },
      A123: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz123' },
      A124: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz124' },

      A129: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz129' },
      A130: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz130' },
      A131: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz131' },
      A132: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz132' },

      A137: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz137' },
      A138: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz138' },
      A139: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz139' },
      A140: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz140' },

      A145: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz145' },
      A146: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz146' },
      A147: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz147' },
      A148: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz148' },

      A153: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz153' },
      A154: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz154' },
      A155: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz155' },
      A156: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz156' },

      A161: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz161' },
      A162: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz162' },
      A163: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz163' },
      A164: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz164' },

      A169: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz169' },
      A170: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz170' },
      A171: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz171' },
      A172: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz172' },

    },
    right: {
      A5: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz5' },
      A6: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz6' },
      A7: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz7' },
      A8: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz8' },

      A13: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz13' },
      A14: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz14' },
      A15: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz15' },
      A16: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz16' },

      A21: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz21' },
      A22: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz22' },
      A23: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz23' },
      A24: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz24' },

      A29: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz29' },
      A30: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz30' },
      A31: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz31' },
      A32: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz32' },

      A37: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz37' },
      A38: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz38' },
      A39: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz39' },
      A40: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz40' },

      A45: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz45' },
      A46: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz46' },
      A47: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz47' },
      A48: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz48' },

      A53: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz53' },
      A54: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz54' },
      A55: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz55' },
      A56: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz56' },

      A61: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz61' },
      A62: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz62' },
      A63: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz63' },
      A64: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz64' },

      A69: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz69' },
      A70: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz70' },
      A71: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz71' },
      A72: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz72' },

      A77: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz77' },
      A78: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz78' },
      A79: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz79' },
      A80: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz80' },


      A85: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz85' },
      A86: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz86' },
      A87: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz87' },
      A88: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz88' },


      A93: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz93' },
      A94: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz94' },
      A95: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz95' },
      A96: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz96' },

      A101: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz101' },
      A102: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz102' },
      A103: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz103' },
      A104: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz104' },

      A109: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz109' },
      A110: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz110' },
      A111: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz111' },
      A112: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz112' },

      A117: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz117' },
      A118: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz118' },
      A119: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz119' },
      A120: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz120' },

      A125: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz125' },
      A126: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz126' },
      A127: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz127' },
      A128: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz128' },

      A133: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz133' },
      A134: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz134' },
      A135: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz135' },
      A136: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz136' },

      A141: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz141' },
      A142: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz142' },
      A143: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz143' },
      A144: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz144' },

      A149: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz149' },
      A150: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz150' },
      A151: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz151' },
      A152: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz152' },

      A157: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz157' },
      A158: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz158' },
      A159: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz159' },
      A160: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz160' },

      A165: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz165' },
      A166: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz166' },
      A167: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz167' },
      A168: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz168' },

      A173: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz173' },
      A174: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz174' },
      A175: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz175' },
      A176: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz176' },

    }
  };

  // Carga datos de usuario
  const { data: session, status } = useSession();
  const { name, lastname, cedula, especialidad } = session?.user || {};  
  const { conclusions } = useContext(ReportContext)
  const [copyConclusions, setCopyConclusions] = useState('');  // Estado para la caja de conclusiones
  const [isPageVisible, setPageVisibility] = useState(true); // Estado para la visibilidad de la página
  const [selectedImages, setSelectedImages] = useState([]); // Estado para las imágenes seleccionadas
  
  // Estados para el historial de imágenes
  const [history, setHistory] = useState([]); 
  const [future, setFuture] = useState([]); 
  
  // Actualizar las conclusiones
  useEffect(() => {
    setCopyConclusions(conclusions.map(cl => cl.title).join(''))
  }, [conclusions]);

  const handleTextareaChange = (event) => {
    setCopyConclusions(event.target.value)
  }

  

  // Funciones para el historial de imágenes
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
      <div className="wrapper">
        <div className='vertical-orientation dont-print'>
          <div className='button-bar'>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} 
              style={{display: 'none'}}
            />
          </div>
          <div className={'vertical-container dont-print'}>
            <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
              <SimpleMultiStepForm showStepNumber={true}/>
            </div>
          </div>
        </div>
        <div>
          <div className='con-img'> 
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
                <img src={image.src} draggable="false" alt="Selected" />
              </Rnd>
            ))}
            <div className='conclusion-container'>
              <table cellPadding="0" cellSpacing="0">
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
                        // Agrega tus reglas aquí
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
                        // Agrega tus reglas aquí
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
              {/* Mostrar imágenes dinámicas según el estado de los checkboxes en 'checkedStateLeft' */}
          {Object.keys(checkedStateLeft).map((key) => (
            checkedStateLeft[key] && (
              <img 
                key={key}
                src={imageMap.left[key]?.src} 
                className={imageMap.left[key]?.className} 
                alt={`Cruz ${key}`} 
              />
            )
          ))}

          {/* Mostrar imágenes dinámicas según el estado de los checkboxes en 'checkedStateRight' */}
          {Object.keys(checkedStateRight).map((key) => (
            checkedStateRight[key] && (
              <img 
                key={key}
                src={imageMap.right[key]?.src} 
                className={imageMap.right[key]?.className} 
                alt={`Cruz ${key}`} 
              />
            )
          ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reporte;
