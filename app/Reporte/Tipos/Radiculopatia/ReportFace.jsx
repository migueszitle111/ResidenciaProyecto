
import { CheckboxContext, ReportContextR, useButtonContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { ConclusionCanvasR } from '../../../components/ReportTemplate/Conclusions/CanvasRadiculopatia';
import './EstilosCruz.css';
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Load user data
  const { data: session, status } = useSession();
  const { name, lastname, cedula, especialidad } = session?.user || {};  
  const [isPageVisible, setPageVisibility] = useState(true); // State for page visibility
  const [selectedImages, setSelectedImages] = useState([]); // State for selected images
  // States for image history
  const [history, setHistory] = useState([]); 
  const [future, setFuture] = useState([]); 
  const { checkedStateLeft, checkedStateRight } = useContext(CheckboxContext);
  
  const { conclusions } = useContext(ReportContextR);
  const [copyConclusions, setCopyConclusions] = useState('n ');  // State for conclusion textbox
  const { activeButtons } = useButtonContext();

  const defaultImage1 = '/assets/RadiculopatiaImg/Columna/RA_Columna_1_FondoB.png';
  const defaultImage2 = '/assets/RadiculopatiaImg/Columna/RA_Columna_2_FondoB.png';
  const newImage1 = '/assets/RadiculopatiaImg/Columna/BASE ANTERIOR.png';
  const newImage2 = '/assets/RadiculopatiaImg/Columna/BASE POSTERIOR.png';

  // Change image based on active buttons
  const imageSrc1 = (activeButtons && (activeButtons['c6s_i'] || activeButtons['c6s_d'] || activeButtons['c6s_bi'] || activeButtons['c7s_i'] || activeButtons['c7s_d'] || activeButtons['c7s_bi'] || activeButtons['s1s_i'] || activeButtons['s1s_d'] || activeButtons['s1s_bi'])) ? newImage1 : defaultImage1;
  const imageSrc2 = (activeButtons && (activeButtons['c6s_i'] || activeButtons['c6s_d'] || activeButtons['c6s_bi'] || activeButtons['c7s_i'] || activeButtons['c7s_d'] || activeButtons['c7s_bi'] || activeButtons['s1s_i'] || activeButtons['s1s_d'] || activeButtons['s1s_bi'])) ? newImage2 : defaultImage2;
  
  // Mapa de checkbox y rutas de imágenes
  const imageMap = {
    left: {
      A1: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz1'   },
      A2: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz2'   },
      A3: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz3'   },
      A4: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz4'   },

      A9: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz9'   },
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

      A97: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz97' },
      A98: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz98' },
      A99: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz99' },
      A100: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz100'},

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

      A89: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz89' },
      A90: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz90' },
      A91: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz91' },
      A92: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz92' },

    },
    right: {
      A5: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz5'   },
      A6: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz6'   },
      A7: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz7'   },
      A8: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz8'   },

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

      A101: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz101'},
      A102: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz102'},
      A103: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz103'},
      A104: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz104'},

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
    }
  };


  useEffect(() => {
    if (!hasMounted) return;
  
    // 1) Texto que viene de los botones ConclusionButtonR
    const conclusionText = conclusions.map(cl => cl.title).join(' ');
  
    // 2) Función para saber si en un grupo hay algo a la izquierda/derecha
    const checkGroup = (leftKeys, rightKeys) => {
      let isLeftMarked = leftKeys.some(k => checkedStateLeft[k]);
      let isRightMarked = rightKeys.some(k => checkedStateRight[k]);
  
      if (isLeftMarked && isRightMarked) return 'BILATERAL';
      if (isLeftMarked) return 'IZQUIERDA';
      if (isRightMarked) return 'DERECHA';
      return null;
    };
  
    // 3) Grupos de niveles
    const groups = [
      { name: 'C4', left: ['A1','A2','A3','A4'], right: ['A5','A6','A7','A8'] },
      { name: 'C5', left: ['A9','A10','A11','A12'], right: ['A13','A14','A15','A16'] },
      { name: 'C6', left: ['A17','A18','A19','A20'], right: ['A21','A22','A23','A24'] },
      { name: 'C7', left: ['A25','A26','A27','A28'], right: ['A29','A30','A31','A32'] },
      { name: 'C8', left: ['A33','A34','A35','A36'], right: ['A37','A38','A39','A40'] },
      { name: 'T1', left: ['A41','A42','A43','A44'], right: ['A45','A46','A47','A48'] },
      { name: 'L1', left: ['A97','A98','A99','A100'], right: ['A101','A102','A103','A104'] },
      { name: 'L2', left: ['A49','A50','A51','A52'], right: ['A53','A54','A55','A56'] },
      { name: 'L3', left: ['A57','A58','A59','A60'], right: ['A61','A62','A63','A64'] },
      { name: 'L4', left: ['A65','A66','A67','A68'], right: ['A69','A70','A71','A72'] },
      { name: 'L5', left: ['A73','A74','A75','A76'], right: ['A77','A78','A79','A80'] },
      { name: 'S1', left: ['A81','A82','A83','A84'], right: ['A85','A86','A87','A88'] },
      { name: 'S2', left: ['A89','A90','A91','A92'], right: ['A93','A94','A95','A96'] },
    ];
  
    // 4) Agrupar qué lados están marcados
    const groupedStatus = groups.reduce((acc, group) => {
      const status = checkGroup(group.left, group.right);
      if (status) {
        if (!acc[status]) acc[status] = [];
        acc[status].push(group.name);
      }
      return acc;
    }, {});
  
    // 5) Ajustar plural de IZQUIERDA / IZQUIERDAS, etc.
    const translateStatus = (status, count) => {
      if (count > 1) {
        switch (status) {
          case 'BILATERAL':  return 'BILATERALES';
          case 'IZQUIERDA':  return 'IZQUIERDAS';
          case 'DERECHA':    return 'DERECHAS';
          default:           return status;
        }
      }
      return status;
    };
  
    // 6) Construir el texto adicional
    const additionalText = Object.entries(groupedStatus)
      .map(([status, groupNames]) =>
        `${groupNames.join(', ')} ${translateStatus(status, groupNames.length)}`)
      .join(', ');  // p.e. "C4 IZQUIERDA, C5 BILATERALES, L4 DERECHA"
  
    // 7) Lógica para combinar 'conclusionText' y 'additionalText'
    let combinedText = conclusionText.trim();
    const words = combinedText.split(' ');
  
    // Si hay 'RADICULOPATIA' como primer palabra y hay 'additionalText', 
    // la insertamos después de "RADICULOPATIA ...".
    if (additionalText) {
      if (words.length >= 2 && words[0].toUpperCase() === "RADICULOPATIA") {
        // Por ej: RADICULOPATIA AGUDA => [ "RADICULOPATIA", "AGUDA" ]
        const firstTwoWords = words.slice(0, 2).join(' ');
        const remainingText = words.slice(2).join(' ');
        
        // Si no hay texto "remainingText", pues es solo RADICULOPATIA ...
        combinedText = remainingText
          ? `${firstTwoWords} ${additionalText}, ${remainingText}`
          : `${firstTwoWords} ${additionalText}`;
        
      } else {
        // Caso: no empieza con "RADICULOPATIA ...", 
        // => agregamos al final o lo ponemos solo.
        if (!combinedText) {
          // Si 'conclusionText' está vacío
          combinedText = additionalText;
        } else {
          // Si había algo => lo unimos con coma
          combinedText = `${combinedText} , ${additionalText}`;
        }
      }
    }
  
    // 8) Ajuste específico para “radiculopatía crónica + fase activa/inactiva/antigua”
    const isCronica = words[1]?.toUpperCase() === "CRONICA";
    const phases = ["activa", "inactiva", "antigua"];
    const selectedPhase = conclusions.find(c => phases.includes(c.value));
    // Por ej. si hay {value:'activa', title:'ACTIVA'}
  
    if (isCronica && selectedPhase) {
      const phaseWord = selectedPhase.title; // "ACTIVA" / "INACTIVA" / "ANTIGUA"
      const ctWords = combinedText.split(' ');
      const cronicaIndex = ctWords.findIndex(w => w.toUpperCase() === "CRONICA");
      const phaseIndex = ctWords.findIndex(w => w.toUpperCase() === phaseWord.toUpperCase());
  
      if (cronicaIndex !== -1 && phaseIndex !== -1 && phaseIndex > cronicaIndex) {
        // Removemos la fase de su posición actual
        const [extractedPhase] = ctWords.splice(phaseIndex, 1);
        // La insertamos justo después de "CRONICA" con una coma
        ctWords.splice(cronicaIndex + 1, 0, "", extractedPhase);
        combinedText = ctWords.join(' ');
      }
    }
  
    // 9) Finalmente, actualizar tu 'copyConclusions'
    setCopyConclusions(combinedText.trim());
  
  }, [hasMounted, conclusions, checkedStateLeft, checkedStateRight]);
  
  


  const handleTextareaChange = (event) => {
    setCopyConclusions(event.target.value)
  };

  // Functions for image history
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
              style={{ display: 'none' }}
            />
          </div>
          <div className={'vertical-container dont-print'}>
            <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
              <SimpleMultiStepForm showStepNumber={true} />
            </div>
          </div>
        </div>
        <div>
          <div className='con-img'>
            {/* Conditionally render selected images */}
            {hasMounted && selectedImages.map((image, index) => {
              if (Array.isArray(image)) {
                return image.map((img, imgIndex) => (
                  <Rnd
                    className="rnd-image"
                    key={`${index}-${imgIndex}`}
                    size={img.size}
                    position={img.position}
                    onDragStop={(e, d) => handleDragStop(index, e, d)}
                    onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(index, e, direction, ref, delta, position)}
                    lockAspectRatio={true}
                    style={{ zIndex: 2 }} 
                  >
                    <img src={img.src} draggable="false" alt={img.alt} />
                  </Rnd>
                ));
              } else {
                return (
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
                );
              }
            })}
            
            <div className='conclusion-container'>
              {/* Conditionally render the table and content */}
              {hasMounted && (
                <table cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                      <ConclusionCanvasR 
                    //Imagen 1
                      img={{
                        src: imageSrc1 ,
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
                          expectedValue: 'c6s_i', 
                          image: {
                            src: 'RadiculopatiaImg/C6-C7s anterior izquierdo.png',
                            alt: 'Modelo',
                          }
                        },
                        
                        {
                          expectedValue: 'c6s_d', 
                          image: {
                            src: 'RadiculopatiaImg/C6-C7s anterior derecho.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'c6s_bi', 
                          image: [
                            {
                              src: 'RadiculopatiaImg/C6-C7s anterior izquierdo.png',
                              alt: 'Modelo',
                            },
                            {
                              src: 'RadiculopatiaImg/C6-C7s anterior derecho.png',
                              alt: 'Modelo',
                            }
                      ]
                        },
                        {
                          expectedValue: 'c7s_i', 
                          image: {
                            src: 'RadiculopatiaImg/C6-C7s anterior izquierdo.png',
                            alt: 'Modelo',
                          }
                        },
                        
                        {
                          expectedValue: 'c7s_d', 
                          image: {
                            src: 'RadiculopatiaImg/C6-C7s anterior derecho.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'c7s_bi', 
                          image: [
                          {
                            src: 'RadiculopatiaImg/C6-C7s anterior izquierdo.png',
                            alt: 'Modelo',
                          },
                          {
                            src: 'RadiculopatiaImg/C6-C7s anterior derecho.png',
                            alt: 'Modelo',
                          }
                        ],
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
                        {
                          expectedValue: 's1s_i', 
                          image: {
                            src: 'RadiculopatiaImg/S1s anterior izquierdo.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 's1s_d', 
                          image: {
                            src: 'RadiculopatiaImg/S1s anterior derecho.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 's1s_bi', 
                          image:[ {
                            src: 'RadiculopatiaImg/S1s anterior izquierdo.png',
                            alt: 'Modelo',
                           
                          },{
                            src: 'RadiculopatiaImg/S1s anterior derecho.png',
                            alt: 'Modelo',
                          }
                        
                        ],                        
                        },
                        {
                          expectedValue: 'cervical_multinivel', 
                          image: {
                            src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
                            alt: 'Modelo',
                          }
                        },

                        {
                          expectedValue: 'lumbrosaca_multinivel', 
                          image: {
                            src: 'RadiculopatiaImg/Multinivel/Columna_Lumbar_I.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'toracica_multinivel', 
                          image: {
                            src: 'RadiculopatiaImg/Multinivel/Columna_Toracica_I.png',
                            alt: 'Modelo',
                          }
                        },

                      ]}
                    />

                      </td>
                      <td>
                      <ConclusionCanvasR 
                    //Imagen 2
                      img={{
                        src: imageSrc2,
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
                          expectedValue: 'c6_ds', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/C5-C6 derecho posterior.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'c6_is', 
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
                          expectedValue: 'c6s_i', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'c6s_d', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior derecho.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'c6s_bi', 
                          image:[ {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
                            alt: 'Modelo',
                          },
                          {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior derecho.png',
                            alt: 'Modelo',
                          }
                        
                        
                        ],
                        },
                        {
                          expectedValue: 'c7s_i', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
                            alt: 'Modelo',
                          }
                        },
                        
                        {
                          expectedValue: 'c7s_d', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior derecho.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'c7s_bi', 
                          image:[{
                            src: 'RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
                            alt: 'Modelo',
                          },
                          {
                            src: 'RadiculopatiaPosteriorImg/C6s posterior derecho.png',
                            alt: 'Modelo',
                          }
                        
                        ],
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
                        {
                          expectedValue: 's1s_i', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/s1s posterior izquierdo.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 's1s_d', 
                          image: {
                            src: 'RadiculopatiaPosteriorImg/s1s posterior derecho.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 's1s_bi', 
                          image: [{
                            src: 'RadiculopatiaPosteriorImg/s1s posterior izquierdo.png',
                           alt: 'Modelo',
                          },
                        {
                          src: 'RadiculopatiaPosteriorImg/s1s posterior derecho.png',
                          alt: 'Modelo',

                        }
                        ],
                        },
                        {
                          expectedValue: 'cervical_multinivel', 
                          image: {
                            src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'lumbrosaca_multinivel', 
                          image: {
                            src: 'RadiculopatiaImg/Multinivel/Columna_Lumbar_D.png',
                            alt: 'Modelo',
                          }
                        },
                        {
                          expectedValue: 'toracica_multinivel', 
                          image: {
                            src: 'RadiculopatiaImg/Multinivel/Columna_Toracica_D.png',
                            alt: 'Modelo',
                          }
                        },


                      ]}
                    />

                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
             
              <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
                {/* Conditionally render content that depends on client-only data */}
                {hasMounted && (
                  <>
                    <textarea
                      value={copyConclusions}
                      onChange={handleTextareaChange}
                    />
                    {/* Render images based on 'checkedStateLeft' */}
                    {Object.keys(checkedStateLeft || {}).map((key) => (
                      checkedStateLeft[key] && (
                        <img 
                          key={key}
                          src={imageMap.left[key]?.src} 
                          className={imageMap.left[key]?.className} 
                          alt={`Cruz ${key}`} 
                        />
                      )
                    ))}
                    {/* Render images based on 'checkedStateRight' */}
                    {Object.keys(checkedStateRight || {}).map((key) => (
                      checkedStateRight[key] && (
                        <img 
                          key={key}
                          src={imageMap.right[key]?.src} 
                          className={imageMap.right[key]?.className} 
                          alt={`Cruz ${key}`} 
                        />
                      )
                    ))}
                  </>
                )}
                
              </div>
              <div><DropArea /> </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Reporte;