import { CheckboxContext, ReportContextR, useButtonContext, DropContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useLayoutEffect,useCallback, useContext, useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { ConclusionCanvasR } from '../../../components/ReportTemplate/Conclusions/CanvasRadiculopatia';
import { ConclusionCanvasR2 } from '../../../components/ReportTemplate/Conclusions/CanvasRadiculopatia2';

import './EstilosCruz.css';
import SimpleMultiStepForm from './MenuBotones';
import './Style.css';


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

/**
 * Componente DropArea: maneja la zona en la que se sueltan los elementos arrastrados.
 * Cada DropArea recibe su lista de droppedItems y setDroppedItems para independizar
 * el frontal del posterior.
 */
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
        <p style={{ marginLeft: 'auto', textAlign: 'left', paddingLeft: '15px', fontSize: '15px', paddingTop:'4px' }}>
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
                        <img src="/I_X.webp" style={{filter: 'invert(1)'}}/>

              </button>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </Rnd>
        ))
      )}
    </div>
  );
};
/**
 * Componente principal: Renderiza la interfaz de Radiculopatía con dos imágenes (frontal/posterior),
 * cada una con su propia zona de arrastre (DropArea).
 */
const Reporte = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Estados globales de DropArea frontal y posterior


  // Datos del usuario
  const { data: session } = useSession();
  const { name, lastname, cedula, email, especialidad, imageUrl } = session?.user || {};  

  // Manejo de visibilidad de página, imágenes subidas, etc.
  const [isPageVisible, setPageVisibility] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [history, setHistory] = useState([]); 
  const [future, setFuture] = useState([]); 

  // Estados de checkboxes
  const { checkedStateLeft, checkedStateRight } = useContext(CheckboxContext);

  // Conclusiones
  const { conclusions } = useContext(ReportContextR);

  // Manejo de paneles expandibles en MenuImagenes
  const [expandedDivs, setExpandedDivs] = useState({});
  const [topLeftText, setTopLeftText] = useState('');

  // Para referenciar dom
  const imgRef = useRef(null);
  const conclusionDivRef = useRef(null);
  const elementRef = useRef(null);

  // Texto final a mostrar (que combina conclusiones + niveles)
  const [copyConclusions, setCopyConclusions] = useState('');

  // Botones activos (para cambiar la base de la imagen)
  const { activeButtons } = useButtonContext();

  // Imágenes base
  const defaultImage1 = '/assets/RadiculopatiaImg/Columna/RA_Columna_1_FondoB.png';
  const defaultImage2 = '/assets/RadiculopatiaImg/Columna/RA_Columna_2_FondoB.png';
  const newImage1     = '/assets/RadiculopatiaImg/Columna/BASE ANTERIOR.png';
  const newImage2     = '/assets/RadiculopatiaImg/Columna/BASE POSTERIOR.png';

  // Ejemplo para cambiar la imagen base según botones
  const imageSrc1 = (activeButtons && (
    activeButtons['c6s_i'] || 
    activeButtons['c6s_d'] || 
    activeButtons['c6s_bi']||
    activeButtons['c7s_i'] || 
    activeButtons['c7s_d'] || 
    activeButtons['c7s_bi']||
    activeButtons['s1s_i'] || 
    activeButtons['s1s_d'] || 
    activeButtons['s1s_bi']
  ))
    ? newImage1
    : defaultImage1;

  const imageSrc2 = (activeButtons && (
    activeButtons['c6s_i'] ||
    activeButtons['c6s_d'] ||
    activeButtons['c6s_bi']||
    activeButtons['c7s_i'] ||
    activeButtons['c7s_d'] ||
    activeButtons['c7s_bi']||
    activeButtons['s1s_i'] ||
    activeButtons['s1s_d'] ||
    activeButtons['s1s_bi']
  ))
    ? newImage2
    : defaultImage2;
    const formatSelection = (selected) => {
      if (!selected || selected.length === 0) return '';
      if (selected.length === 1) return selected[0];
      if (selected.length === 2) return selected.join(' Y ');
      return selected.slice(0, -1).join(', ') + ' Y ' + selected[selected.length - 1];
    };
    
  /**********************************************************
   *   LÓGICA PARA COMBINAR CHECKBOXES (NIVELES) + CONCLUSIONES
   **********************************************************/
  useEffect(() => {

    if (!hasMounted) return;

    // (1) Texto base de todas las conclusiones.
    // Aquí se combinan todas las conclusiones registradas.
    let combinedText = conclusions.map(cl => cl.title).join(' ').trim();
  
    // (1b) Opcionalmente, si la parte base siempre es la radiculopatía (ej. "RADICULOPATIA AGUDA"),
    // la puedes separar de la parte multinivel.
    // En este ejemplo, asumiremos que la parte base es la primera conclusión (o la que tenga cierto valor).
    const baseConclusion = conclusions.find(cl => cl.value === "radiculopatia_aguda" || cl.value === "radiculopatia_subaguda" || cl.value === "radiculopatia_cronica" || cl.value === "radiculopatia_sensitiva");
    // También extraemos los niveles de multinivel de los botones:
    const selections = [];
    if (activeButtons["cervical_multinivel"]) selections.push("CERVICAL");
    if (activeButtons["toracica_multinivel"]) selections.push("TORACICA");
    if (activeButtons["lumbrosaca_multinivel"]) selections.push("LUMBROSACRA");
    
    // 1) formatear niveles
    const formattedLevels = formatSelection(selections);
    
    // 2) añadir prefijo POLISEGMENTARIA
    const isPoliseg = selections.length > 0;
    const prefijoPoli = isPoliseg ? "POLISEGMENTARIA " : "";
    const formattedWithPrefix = formattedLevels
      ? prefijoPoli + formattedLevels
      : "";
    
    // 3) construir el encabezado usando el prefijo si aplica
    if (baseConclusion) {
      let head;
      if (formattedWithPrefix) {
        head = `${baseConclusion.title} ${formattedWithPrefix}`;
      } else {
        head = baseConclusion.title;
      }
    
      // luego filtras y unes el resto de conclusiones como ya tenías
      const excluded = [
        baseConclusion.value,
        'cervical_multinivel',
        'toracica_multinivel',
        'lumbrosaca_multinivel'
      ];
      const rest = conclusions
        .filter(cl => !excluded.includes(cl.value))
        .map(cl => cl.title)
        .join(' ');
    
      combinedText = rest
        ? `${head} ${rest}`
        : head;
    }
  
    // (2) Reubicar la fase (ACTIVA/INACTIVA/ANTIGUA) solo si es “RADICULOPATIA CRONICA”
    {
      const words = combinedText.split(' ');
      const isCronica = words[1]?.toUpperCase() === "CRÓNICA";
      const phases = ["activa", "inactiva", "antigua"];
      const selectedPhase = conclusions.find(c => phases.includes(c.value));
  
      if (isCronica && selectedPhase) {
        const phaseWord = selectedPhase.title; // por ejemplo "ACTIVA"
        const cronicaIndex = words.findIndex(w => w.toUpperCase() === "CRÓNICA");
        const phaseIndex = words.findIndex(w => w.toUpperCase() === phaseWord.toUpperCase());
        if (cronicaIndex !== -1 && phaseIndex !== -1 && phaseIndex > cronicaIndex) {
          const [extractedPhase] = words.splice(phaseIndex, 1);
          words.splice(cronicaIndex + 1, 0, extractedPhase);
          combinedText = words.join(' ');
        }
      }
    }
  
    // (3) Construir la cadena de niveles ("L1 IZQUIERDA", etc.)
    const checkGroup = (leftKeys, rightKeys) => {
      const isLeftMarked  = leftKeys.some(k => checkedStateLeft[k]);
      const isRightMarked = rightKeys.some(k => checkedStateRight[k]);
      if (isLeftMarked && isRightMarked) return 'BILATERAL';
      if (isLeftMarked)  return 'IZQUIERDA';
      if (isRightMarked) return 'DERECHA';
      return null;
    };
  
   // (3) grupos
   const groups = [
    { name: 'C4', left: ['A1', 'A2',  'A3', 'A4'],   right: ['A5','A6','A7','A8'] },
    { name: 'C5', left: ['A9','A10', 'A11','A12'],   right: ['A13','A14','A15','A16'] },
    { name: 'C6', left: ['A17','A18','A19','A20'],  right: ['A21','A22','A23','A24'] },
    { name: 'C7', left: ['A25','A26','A27','A28'],  right: ['A29','A30','A31','A32'] },
    { name: 'C8', left: ['A33','A34','A35','A36'],  right: ['A37','A38','A39','A40'] },
    { name: 'T1', left: ['A41','A42','A43','A44'],  right: ['A45','A46','A47','A48'] },
    { name: 'L1', left: ['A97','A98','A99','A100'], right: ['A101','A102','A103','A104'] },
    { name: 'L2', left: ['A49','A50','A51','A52'],  right: ['A53','A54','A55','A56'] },
    { name: 'L3', left: ['A57','A58','A59','A60'],  right: ['A61','A62','A63','A64'] },
    { name: 'L4', left: ['A65','A66','A67','A68'],  right: ['A69','A70','A71','A72'] },
    { name: 'L5', left: ['A73','A74','A75','A76'],  right: ['A77','A78','A79','A80'] },
    { name: 'S1', left: ['A81','A82','A83','A84'],  right: ['A85','A86','A87','A88'] },
    { name: 'S2', left: ['A89','A90','A91','A92'],  right: ['A93','A94','A95','A96'] },
  ];
    const groupedStatus = groups.reduce((acc, g) => {
      const status = checkGroup(g.left, g.right);
      if (status) {
        if (!acc[status]) acc[status] = [];
        acc[status].push(g.name);
      }
      return acc;
    }, {});
  
    const translateStatus = (status, count) => {
      if (count > 1) {
        switch(status) {
          case 'BILATERAL': return 'BILATERAL';
          case 'IZQUIERDA': return 'IZQUIERDA';
          case 'DERECHA':   return 'DERECHA';
        }
      }
      return status; // singular
    };
  
    const additionalTextArray = Object.entries(groupedStatus).map(([status, groupNames]) => {
      return `${groupNames.join(', ')} ${translateStatus(status, groupNames.length)}`;
    });
  
    let additionalText = '';
    if (additionalTextArray.length > 1) {
      additionalText =
        additionalTextArray.slice(0, -1).join(', ') +
        ' Y ' +
        additionalTextArray[additionalTextArray.length - 1];
    } else if (additionalTextArray.length === 1) {
      additionalText = additionalTextArray[0];
    }
  
    // (4) Insertar 'additionalText' si empieza con "RADICULOPATIA" y la 2a palabra
    //     es una de ["AGUDA","SUBAGUDA","CRONICA","SENSITIVA"]
    const words = combinedText.split(' ');
    const allowedEvolutions = ["AGUDA","SUBAGUDA","CRÓNICA","SENSITIVA"];
    const isRadiculo = words[0]?.toUpperCase() === "RADICULOPATÍA";
    const secondWord = words[1]?.toUpperCase();
  
    if (additionalText && isRadiculo && allowedEvolutions.includes(secondWord)) {
      // Buscamos el primer ";" en la frase
      const idxSemi = combinedText.indexOf(';');
      if (idxSemi !== -1) {
        // Insertar justo antes del ";"
        const head = combinedText.slice(0, idxSemi).trimEnd();
        const tail = combinedText.slice(idxSemi); // incluye ";"
        combinedText = `${head} ${additionalText}${tail}`;
      } else {
        // Si no hay ";", lo pegamos al final
        combinedText += `${additionalText}`;
      }
    } else if (additionalText) {
      // Caso normal: no es "RADICULOPATIA" + [AGUDA/SUBAGUDA/CRONICA/SENSITIVA],
      // pegamos al final con espacio (o coma, a gusto)
      combinedText += ` ${additionalText}`;
    }
  
    setCopyConclusions(combinedText.trim());
  }, [
    hasMounted,
    conclusions,
    checkedStateLeft,
    checkedStateRight
  ]);
  


  /****************************************************
   *   MANEJO DE IMÁGENES ARRSTRABLES (upload, undo, etc.)
   ****************************************************/
  const handleImageChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setHistory(prev => [...prev, selectedImages]);
      setSelectedImages(prevImages => [
        ...prevImages,
        {
          src: URL.createObjectURL(e.target.files[0]),
          position: { x: Math.random() * 200, y: Math.random() * 200 },
          size: { width: 200, height: 200 }
        }
      ]);
      setFuture([]);
    }
  }, [selectedImages]);

  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      setFuture(prev => [selectedImages, ...prev]);
      setSelectedImages(history[history.length - 1]);
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  }, [history, selectedImages]);

  const handleDragStop = useCallback((index, e, d) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      newImages[index].position = { x: d.x, y: d.y };
      return newImages;
    });
  }, []);

  const handleResizeStop = useCallback((index, e, direction, ref, delta, position) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      newImages[index].size = { width: ref.style.width, height: ref.style.height };
      return newImages;
    });
  }, []);

  // Para textarea con conclusiones
  const handleTextareaChange = (event) => {
    setCopyConclusions(event.target.value);
  };

  return (
    <div>
      <div className="wrapper">

        {/* Panel lateral con botones y MenuImagenes */}
        <div className="vertical-orientation dont-print">
          <div className="button-bar">
            <button
              id="unhide"
              className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`} 
              onClick={() => {
                setPageVisibility(true);
                setSelectedImages([]);
              }}
            >
              <img src="/I_Out.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
            </button>
            <button 
              id="print"
              className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}
            >
              <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
            </button>
            <button
              onClick={handleUndo}
              className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}
            >
              <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
            </button>

            <label
              htmlFor="file-upload"
              className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}
            >
              <img src="/I_Folder.svg" alt="Subir" style={{filter: 'invert(1)'}} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`}
              style={{ display: 'none' }}
            />
          </div>

          <div className="vertical-container dont-print">
            <div className={`${isPageVisible ? 'visible' : 'hidden'}`}>
              {/* Ejemplo: <ConclusionBox/> si tuvieras algo aquí */}
            </div>

            {/* Aquí va el menú de pasos (MenuImagenes, etc.) */}
            <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
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

        {/* Contenedor grande donde van las dos imágenes + sus drop areas */}
        <div className="con-img">
          {/* (A) Renderizar las imágenes subidas por el usuario (opcional) */}
          {hasMounted && selectedImages.map((image, index) => (
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

          {/* (B) Contenedor principal de las 2 vistas (frente/espalda) */}
          <div ref={elementRef} className="conclusion-container">
            
            {hasMounted && (
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    {/* VISTA FRONTAL */}
                    <td style={{ position:'relative' }}>
                      <ConclusionCanvasR2
                        img={{
                          src: imageSrc1,
                          alt: 'Modelo Frontal',
                          width: isPageVisible ? '450' : '450',
                          height: isPageVisible ? '450' : '450'
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
                            expectedValue: 'CERVICAL', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
                              alt: 'Modelo',
                            }
                          },
                          {
                            expectedValue: 'cervical_multinivel', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
                              alt: 'Modelo',
                            }
                          },
                          {
                            expectedValue: 'cervical_multinivel2', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
                              alt: 'Modelo',
                            }
                          },
                          {
                            expectedValue: 'LUMBOSACRO', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Lumbar_I.png',
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
                            expectedValue: 'lumbrosaca_multinivel2', 
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
                          {
                            expectedValue: 'toracica_input', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Toracica_I.png',
                              alt: 'Modelo',
                            }
                          },
  
                        ]}
                        const footertext={
                          <>
                          {/* Si quisieras usar la info de user en el footer */}
                          </>
                        }
                        userImageUrl={imageUrl}
                      />

                      <div id="dropArea"><DropArea topLeftText={topLeftText}  expandedDivs={expandedDivs}
                      setExpandedDivs={setExpandedDivs}  />
      
              </div>
                    </td>

                    {/* VISTA POSTERIOR */}
                    <td style={{ position:'relative' }}>
                      <ConclusionCanvasR
                        img={{
                          src: imageSrc2,
                          alt: 'Modelo Posterior',
                          width: isPageVisible ? '450' : '450',
                          height: isPageVisible ? '450' : '450'
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
                            expectedValue: 'CERVICAL', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
                              alt: 'Modelo',
                            }
                          },
                          {
                            expectedValue: 'cervical_multinivel', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
                              alt: 'Modelo',
                            }
                          },

                          {
                            expectedValue: 'cervical_multinivel2', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
                              alt: 'Modelo',
                            }
                          },

                          {
                            expectedValue: 'LUMBOSACRO', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Lumbar_D.png',
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
                            expectedValue: 'lumbrosaca_multinivel2', 
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
                          {
                            expectedValue: 'toracica_input', 
                            image: {
                              src: 'RadiculopatiaImg/Multinivel/Columna_Toracica_D.png',
                              alt: 'Modelo',
                            }
                          },
  
                        ]}
                        const footertext={
                          <>
                          {/* Si quisieras usar la info de user en el footer */}
                          </>
                        }
                        userImageUrl={imageUrl}
                      />

                     
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* (C) Caja inferior: textarea con conclusiones y símbolos chequeados */}
            <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
              {hasMounted && (
                <>
                  <textarea
                    value={copyConclusions}
                    onChange={handleTextareaChange}
                    placeholder=""
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporte;
