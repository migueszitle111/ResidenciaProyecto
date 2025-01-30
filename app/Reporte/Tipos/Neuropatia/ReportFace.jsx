import { checkDivsBILATERAL } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERAL';
import { checkDivsBILATERALIZQ } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERALIZQ';
import { checkDivs } from '@/app/Reporte/Tipos/Neuropatia/SelecNervios';
import { checkDivsSegmentar } from '@/app/Reporte/Tipos/Neuropatia/SelecSegmentariaNerv';
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
  const { name, lastname, cedula, especialidad } = session?.user || {}; const { conclusions } = useContext(ReportContext)

  const [copyConclusions, setCopyConclusions] = useState('') // Estado para la caja de conclusiones
  const [isPageVisible, setPageVisibility] = useState(true) // Estado para la visibilidad de la pagina
  const [selectedImages, setSelectedImages] = useState([]); // Estado para las imagenes seleccionadas
  // Estados para el historial de imagenes
  const [history, setHistory] = useState([]);
  const [Future, setFuture] = useState([]);

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
    borderradius: '100%',
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
              <img src="/I_Out.svg" alt="Deshacer" style={{ filter: 'invert(1)' }} />
            </button>
            <button id='print' className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
              <img src="/I_Print.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
            </button>
            <button onClick={handleUndo} className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
              <img src="/I_Repeat.svg" alt="Deshacer" style={{ filter: 'invert(1)' }} />
            </button>
            <label htmlFor="file-upload" className={`print-button dont-print ${isPageVisible ? 'hidden' : 'visible'}`}>
              <img src="/I_Folder.svg" alt="Subir" style={{ filter: 'invert(1)' }} />
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print ${isPageVisible ? 'hidden' : 'visible'}`} style={{ display: 'none' }} />        </div>

          <div className={'vertical-container dont-print'}>
            <div className={`dont-print ${isPageVisible ? 'visible' : 'hidden'}`}>

              {/*
          <ConclusionBox />
            */}
            </div>
            {/* Menu de opciones */}

            <div className={`mx-4 dont-print ${isPageVisible ? '' : 'hidden'}`}>
              <SimpleMultiStepForm showStepNumber={true} />
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
                    expectedValue: 'MEDIANO',
                    image: {
                      src: 'NeuropatiaImg/NO_1_Mediano.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'INTEROSEOANTERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Anterior.png',
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
                    expectedValue: 'RADIAL_SUPERFICIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Posterior.png',
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
                    expectedValue: 'DORSAL_CUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Dorsal Cutaneo.png',
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
                      src: 'NeuropatiaImg/NO_Toracico_largo.png',
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
                    expectedValue: 'GLUTEO_MEDIO',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Medio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Sup.Inf FC.png',
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
                    expectedValue: 'SAFENO',
                    image: {
                      src: 'NeuropatiaImg/NO_Safeno.png',
                      alt: 'Modelo',
                    }
                  },
                  //{
                  //  expectedValue: 'FEMOROCUTÁNEO_LATERAL',
                  //  image: {
                  //    src: 'NeuropatiaImg/NO_Femorocutáneo femoral.png',
                  //    alt: 'Modelo',
                  //  }
                  // },
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
                    expectedValue: 'PERONEO_SUPERFICIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Profundo.png',
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
                    expectedValue: 'SURAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Sural.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Lateral.png',
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

                  {
                    expectedValue: 'MED_IZQUIERDA',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },


                  // Imagenes de Generalizada DERECHA

                  {
                    expectedValue: 'MEDIANO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                // FALTA EL NERVIO 
                  {
                    expectedValue: 'INTEROSEO_ANTERIOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  // FALTA EL NERVIO 
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MEDIANO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  
                  {
                    expectedValue: 'SUPRAESCAPULAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Ulnar.png',
                      alt: 'Modelo',
                    }
                  },


                  // Imagenes de Generalizada IZQUIERDA
                  {
                    expectedValue: 'MEDIANO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MEDIANO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Ulnar.png',
                      alt: 'Modelo',
                    }
                  },

                  // Imagenes de Generalizada NERVIO COMPLETO

                  {
                    expectedValue: 'MEDIANO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_12_Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  //C:\Users\Estefanny Cruz.B\Documents\RESIDENCIA\ResidenciaProyecto\public\assets\NeuropatiaImg\NervioRojo\COMPLETO\NO_Interoseo-Anterior(1).png
                  {
                    expectedValue: 'INTEROSEOANTERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Anterior(1).png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'MUSCULOCUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Musculocutaneo.png',
                      alt: 'Modelo2',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Posterior (1).png',
                      alt: 'Modelo',
                    }
                  },

                //FALTA NERVIO
                  {
                    expectedValue: 'DORSAL_CUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Safeno(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Sural-(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Medial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Lateral(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Superficial (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Profundo (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Sup.Inf (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Medio (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },



                ]}
              />
              <div className={`info-container ${isPageVisible ? 'hidden' : 'visible'}`}><textarea
                value={copyConclusions} defaultValue="" onChange={handleTextareaChange} />

              </div>
              <div><DropArea /> </div>
              <div>{checkDivsBILATERAL(copyConclusions)}</div>
              <div>{checkDivsBILATERALIZQ(copyConclusions)}</div>
              <div>{checkDivs(copyConclusions)}</div>
              <div>{checkDivsSegmentar(copyConclusions)}</div>
              
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}


export default Reporte