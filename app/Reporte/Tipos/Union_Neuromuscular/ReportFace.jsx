import { ReportContext } from '@/src/context';
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd'; // Libreria para el arrastre y redimension de las imagenes
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
import SimpleMultiStepForm from './MenuBotones';
import './Style.css';
import NextImage from 'next/image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPdf = (
  elementRef,
  conclusionDivRef,
  fileName = 'reporte.pdf',
  userData = {},
) => {
  const input = elementRef?.current;
  if (!input) return;

  document.body.classList.add('pdf-export-mode');

  html2canvas(input, {
    scale: 4, // Aumenta la resolución
    useCORS: true,
    backgroundColor: '#FFFFFF'
  }).then((canvas) => {
    document.body.classList.remove('pdf-export-mode');

    // Crear el PDF en formato A4
    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' es para orientación vertical
    const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Ajustar tamaño de la imagen para ocupar el ancho completo
    const imgWidth = pageWidth - 40; // Margen de 10mm a cada lado
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Centrar la imagen en el PDF
    const xPos = (pageWidth - imgWidth) / 2;
    const yPos = (pageHeight - imgHeight) / 2; // Para centrar también en vertical

    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      xPos,
      yPos,
      imgWidth,
      imgHeight
    );

    // Agregar la información del usuario en el pie de página
    const {
      name = '',
      lastname = '',
      email = '',
      especialidad = '',
      cedula = '',
    } = userData;

    pdf.setFont('times');
    pdf.setFontSize(8);
    pdf.setTextColor(156, 156, 156);

    // pdf.text(
    //   `${name} ${lastname} | ${email} | ${especialidad} | Cédula: ${cedula} `,
    //   60,
    //   pageHeight - 10
    // );
    // Guardar el PDF
    pdf.save(fileName || 'reporte.pdf');
  });
};


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
  const { name, lastname, cedula,email, especialidad, imageUrl } = session?.user || {};  const { conclusions } = useContext(ReportContext)

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
      setCopyConclusions(formattedConclusions );
  }, [conclusions]);
  useEffect(() => {
    const node = conclusionDivRef.current;
    if (node && node.innerText !== copyConclusions) {
      // Guardar posición del cursor
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const { startOffset, startContainer } = range || {};
      
      // Actualizar contenido
      node.innerText = copyConclusions;
      
      // Restaurar posición del cursor
      if (range && startContainer) {
        const newRange = document.createRange();
        const childNodes = node.childNodes;
        const textNode = childNodes.length > 0 ? childNodes[0] : document.createTextNode("");
        if (!childNodes.length) node.appendChild(textNode);
        
        newRange.setStart(textNode, Math.min(startOffset, textNode.length));
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [copyConclusions]);
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

    const conclusionDivRef = useRef(null);
    const elementRef = useRef(null);


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

  const moveCaretToEnd = (element) => {
    if (!element) return;
    element.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false); // Colapsa el rango al final del contenido
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
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
            <SimpleMultiStepForm 
              conclusionDivRef={conclusionDivRef}
              elementRef={elementRef}
            showStepNumber={true}/>
          </div>
          
          
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
        <div ref={elementRef} className='conclusion-container '>
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
          footertext={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                fontSize: '12px',
                color: '#9C9C9C'
              }}
            >
              {/* Nombre */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NextImage 
                  src="/assets/IconSVG/I_Profile.svg" 
                  alt="Usuario" 
                  width={16} 
                  height={16} 
                  style={{ marginRight: '4px' }}
                />
                <span>{name} {lastname}</span>
              </div>
             
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NextImage 
                  src="/assets/IconSVG/I_Email.svg" 
                  alt="Email" 
                  width={16} 
                  height={16} 
                  style={{ marginRight: '4px' }}
                />
                <span>{email}</span>
              </div>
            
              {/* Especialidad */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NextImage 
                  src="/assets/IconSVG/I_Brain.svg" 
                  alt="Especialidad" 
                  width={16} 
                  height={16} 
                  style={{ marginRight: '4px' }}
                />
                <span>{especialidad}</span>
              </div>
             
              {/* Cédula */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NextImage 
                  src="/assets/IconSVG/I_Test.svg" 
                  alt="Cédula" 
                  width={16} 
                  height={16} 
                  style={{ marginRight: '4px' }}
                />
                <span>Cédula: {cedula}</span>
              </div>
            </div>
          }
          userImageUrl={imageUrl}  // Aquí se pasa la URL de la imagen del usuario

        />
  
<div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}>
<div
  ref={conclusionDivRef}
  contentEditable
  style={{
    position: 'absolute',
    width: '95%',
    height: '100%',
    outline: 'none',
    resize: 'none',
    fontSize: '12px',
    paddingTop: '8px',
    marginLeft: '10px',
  }}
  onInput={(e) => {
    setCopyConclusions(e.currentTarget.innerText);
  }}
  onFocus={(e) => {
    // Mover el cursor al final del contenido
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(e.target);
    range.collapse(false); // Colapsar al final
    selection.removeAllRanges();
    selection.addRange(range);
  }}
  suppressContentEditableWarning={true}
/>
</div>
      </div>
      <div><DropArea /> </div>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Reporte