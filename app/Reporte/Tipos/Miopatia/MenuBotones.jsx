import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';
import { Accordion, AccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {

  //Se da el valor en donde se inicie el primer paso
  const [step, setStep] = useState('A');

  // Metodos del ultimo paso
  const {
    selectedImages,
    history,
    handleImageChange,
    handleUndo,
    handlePrint
  } = useImageState();

  // Siguiente paso, se ponen los pasos de arriba hacia abajo
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
    else if (step === 'D') setStep('E');
    else if (step === 'E') setStep('F');
    else if (step === 'F') setStep('G');
    else if (step === 'G') setStep('H');
    else if (step === 'H') setStep('I');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'I') setStep('H');
    else if (step === 'H') setStep('G');
    else if (step === 'G') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  return (
    <div>
      {/* Se crean los objetos paso y se le dan los metodos que necesitan*/}
      {step === 'A' ? (
        <StepA
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'B' ? (
        <StepB
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'C' ? (
        <StepC
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'D' ? (
        <StepD
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'E' ? (
        <StepE
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'F' ? (
        <StepF
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'G' ? (
        <StepG
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'H' ? (
        <StepH
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'I' ? (
        <StepI
          handlePrevStep={handlePrevStep}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

    </div>
    
  );
};

const saveFile = () => {
  const blob = new Blob(["Contenido del archivo"], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "archivo.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


///////////////// Menu de cada paso /////////////////

const StepA = ({ handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button className={`print-button`}>
          <img src="" style={{filter: 'invert(0.5)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="" style={{filter: 'invert(0.5)'}}/>
        </button>

        </div>
          <h1 className=' text-xl font-bold text-white'>
            EVOLUCION
          </h1>

          <div onClick={ handleNextStep }>
            <ConclusionButton value='evolucion_aguda' title='MIOPATIA AGUDA' displayText={'AGUDA'}/>
            <ConclusionButton value='evolucion_subaguda' title='MIOPATIA SUBAGUDA' displayText={'SUBAGUDA'}/>
            <ConclusionButton value='evolucion_cronica' title='MIOPATIA CRÓNICA' displayText={'CRÓNICA'}/>
            <ConclusionButton value='evolucion_antigua' title='MIOPATIA ANTIGUA' displayText={'ANTIGUA'}/>
          </div>

        <div className='my-2 flex justify-end items-center'>
      </div>
    </div>
  );
};

const StepB = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('evolucion_aguda')
            removeConclusion('evolucion_subaguda')
            removeConclusion('evolucion_cronica')
            removeConclusion('evolucion_antigua')
            removeConclusion('adquirida')
            removeConclusion('hereditaria')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>



        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACION
      </h1>
      <div onClick={ handleNextStep }>
        <ConclusionButton value='adquirida' title=' ADQUIRIDA,' displayText={'ADQUIRIDA'}/>
        <ConclusionButton value='hereditaria' title=' HEREDITARIA,' displayText={'HEREDITARIA'}/>                
      </div>
    </div>
  );
};

const StepC = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('intensidad_leve')
            removeConclusion('intensidad_moderada')
            removeConclusion('intensidad_severa')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep }>
      <ConclusionButton value='intensidad_leve' title=' INTENSIDAD LEVE' displayText={'LEVE'}/>
      <ConclusionButton value='intensidad_moderada' title=' INTENSIDAD MODERADA' displayText={'MODERADA'}/>
      <ConclusionButton value='intensidad_severa' title=' INTENSIDAD SEVERA' displayText={'SEVERA'}/>
      </div>

      
    </div>
  );
};

const StepD = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('denervacion_severa')
            removeConclusion('denervacion_abundante')
            removeConclusion('denervacion_progresiva')
            removeConclusion('denervacion_discreta')
            removeConclusion('denervacion_ausente')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DENERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='denervacion_severa' title=' CON DENERVACIÓN DIFUSA (++++)' displayText={'DIFUSA (++++)'}/>
        <ConclusionButton value='denervacion_abundante' title=' CON DENERVACIÓN ABUNDANTE (+++)' displayText={'ABUNDANTE (+++)'}/>
        <ConclusionButton value='denervacion_progresiva' title=' CON DENERVACIÓN PROGRESIVA (++)' displayText={'PROGRESIVA (++)'}/>
        <ConclusionButton value='denervacion_discreta' title=' CON DENERVACIÓN DISCRETA (+)' displayText={'DISCRETA (+/+)'}/>
        <ConclusionButton value='denervacion_ausente' title=' CON DENERVACIÓN AUSENTE' displayText={'AUSENTE'}/>
      </div>

      
    </div>
  );
};

const StepE = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('descargas_miotonicas');
            removeConclusion('descargas_repetitivas_complejas');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        AGREGADO (opcional)
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value = 'descargas_miotonicas' title = ' Y DESCARGAS MIOTÓNICAS' displayText={'DESCARGAS MIOTÓNICAS'}/>
        <ConclusionButton value = 'descargas_repetitivas_complejas' title = ' Y DESCARGAS REPETITIVAS COMPLEJAS' displayText={'DESCARGAS REPETITIVAS COMPLEJAS'}/>
      </div>
      
    </div>
  );
};

const StepF = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('distribucion_proximal')
            removeConclusion('distribucion_distal')
            removeConclusion('distribucion_generalizada')
            removeConclusion('generalizada1')
            removeConclusion('anillo_oseo')
            removeConclusion('duchenne_becker')
            removeConclusion('emery_dreifuss')
            removeConclusion('facioescapulohumeral')
            removeConclusion('oculofaringea')
          
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>
      
      <div onClick={ handleNextStep }>
        <ConclusionButton value='distribucion_proximal' title=' DE DISTRIBUCIÓN PROXIMAL,' displayText={'PROXIMAL'}/>
        <ConclusionButton value='distribucion_distal' title=' DE DISTRIBUCIÓN DISTAL,' displayText={'DISTAL'}/>
        <ConclusionButton value='generalizada1' title=' DE DISTRIBUCIÓN GENERALIZADA,' displayText={'GENERALIZADA'}/>
      </div>
      
        <AccordionContainer>
          <Accordion title='DISTROFIA' value='DISTROFIA' type='external'>
            <div onClick={ handleNextStep }>
              <ConclusionButton value='anillo_oseo' title=' POR DISTROFIA DE CINTURAS,' displayText={'CINTURAS'}/>
              <ConclusionButton value='duchenne_becker' title=' POR DISTROFIA DE DUCHENNE/BECKER,' displayText={'DUCHENNE/BECKER'}/>
              <ConclusionButton value='emery_dreifuss' title=' POR DISTROFIA DE EMERY-DREIFUSS,' displayText={'EMERY-DREIFUSS'}/>
              <ConclusionButton value='facioescapulohumeral' title=' POR DISTROFIA FACIOESCAPULOHUMERAL,' displayText={'FACIOESCAPULOHUMERAL'}/>
              <ConclusionButton value='oculofaringea' title=' POR DISTROFIA OCULOFARINGEA,' displayText={'OCULOFARINGEA'}/>
            </div>
          </Accordion>
        </AccordionContainer>
      
    </div>
  );
};

const StepG = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('con_reinervacion')
            removeConclusion('sin_reinervacion')
          
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REGENERARCION
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='con_reinervacion' title=' PRESENCIA DE REINERVACIÓN DISCRETA;' displayText={'DISCRETA (+)'}/>    
        <ConclusionButton value='con_reinervacion' title=' PRESENCIA DE REINERVACIÓN ABUNDANTE;' displayText={'ABUNDANTE (+++)'}/>               
        <ConclusionButton value='sin_reinervacion' title=' SIN PRESENCIA DE REINERVACIÓN;' displayText={'AUSENTE (-)'}/>
      </div>
      
      
    </div>
  );
};

const StepH = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('completo')
            removeConclusion('parcial_funcional')
            removeConclusion('pobre')
            removeConclusion('nulo')
          
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO
      </h1>
      <div onClick={ handleNextStep }>
        <ConclusionButton value = 'completo' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'COMPLETA'}/>
        <ConclusionButton value = 'parcial_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'PARCIAL FUNCIONAL'}/>
        <ConclusionButton value = 'pobre' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'POBRE NO FUNCIONAL'}/>
        <ConclusionButton value = 'nulo' title = ' PRONÓSTICO DE RECUPERACIÓN NULO' displayText={'NULO'}/>
      </div>
      
    </div>
  );
};


  // Función para manejar la carga de la imagen
  const DropArea2 = ({ isExpanded }) => {
    const [imageSrc, setImageSrc] = useState(null); // Estado para la imagen cargada
  
    const handleDrop = (e) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    };
  
    const handleFileSelect = (files) => {
      if (files && files.length > 0) {
        const fileArray = Array.from(files);
        const imageFiles = fileArray.filter((file) => file.type.startsWith('image/'));
  
        if (imageFiles.length > 0) {
          const file = imageFiles[0]; // Solo tomamos la primera imagen
          const reader = new FileReader();
          reader.onload = (event) => {
            setImageSrc(event.target.result); // Reemplaza la imagen anterior
          };
          reader.readAsDataURL(file); // Lee el archivo como URL de datos
        }
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault(); // Necesario para permitir el "drop"
    };
  
    const handleInputChange = (e) => {
      handleFileSelect(e.target.files);
    };
  
    return (
      <div
        className={`dropArea2 ${isExpanded ? 'dropArea2-expanded' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: isExpanded ? '96px' : '40px', // Ajusta el tamaño basado en el estado de expansión
          height: isExpanded ? '90px' : '40px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.3s ease, height 0.3s ease', // Transiciones suaves
          overflow: 'hidden', // Evita que el contenido se desborde
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
        {!imageSrc ? (
          <p></p>
        ) : (
          <img
            src={imageSrc}
            alt="Cargada"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover', // Ajusta la imagen dentro del contenedor
              pointerEvents: 'none', // Evita interacciones con la imagen
              userSelect: 'none', // Evita que la imagen sea seleccionable
            }}
          />
        )}
      </div>
    );
  };


const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {
  
  const [expandedDivs, setExpandedDivs] = useState({}); // Estado para manejar el tamaño de cada div
    
    const [imageSrc, setImageSrc] = useState(null);
    const [isUploadAllowed, setIsUploadAllowed] = useState(false); // Estado para controlar si la carga está permitida
    const toggleDivSize = (index) => {
      // Cambiar el estado del tamaño del div al hacer clic
      setExpandedDivs((prevState) => ({
        ...prevState,
        [index]: !prevState[index], // Alterna entre true/false para expandir o contraer
      }));
    };

    // Función para habilitar la carga de la imagen (puede estar vinculada a algún evento)
    const allowImageUpload = () => {
      setIsUploadAllowed(true); // Habilita la carga
    };
    
    // Función para manejar la carga de la imagen
    const handleImageUpload = (event) => {
      if (!isUploadAllowed) {
        alert("Arrastre la imagen dentro una figura .");
        return; // Si la carga no está permitida, evita que la imagen se cargue
      }
    
      const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
      if (file) {
        const reader = new FileReader(); // Crea un lector de archivos
        reader.onloadend = () => {
          setImageSrc(reader.result); // Almacena la imagen en formato base64
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
      }
    };
  
    // Función para simular el clic en el input file
    const triggerFileInput = () => {
      document.getElementById('imageInput').click();
    };

    const resetStep = () => {
      setExpandedDivs({});
      setImageSrc(null);
      setIsUploadAllowed(false);
  };
  
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
         <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`}>
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={saveFile} className={`print-button`}>
          <img src="/I_Folder.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}}/>
      </div>

      <div className='container-grid'>
            {[1].map((index) => (
              <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`}>
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 2.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro2 ${expandedDivs[index] ? 'cuadro2-expanded' : ''}`}>
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}


            {[2].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 4.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro3 ${expandedDivs[index] ? 'cuadro3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}
            

            {[3].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 3.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`}// Aplicar estilo a la imagen
                    />
                    <div className={`cuadro2 ${expandedDivs[index] ? 'cuadro2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[4].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 2.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro3 ${expandedDivs[index] ? 'cuadro3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[5].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 1.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro2 ${expandedDivs[index] ? 'cuadro2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}
            

            {[6].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 5.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro3 ${expandedDivs[index] ? 'cuadro3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[7].map((index) => (
              <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                  <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                    <div
                      className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                      onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                    >
                      <img
                        src="/assets/Simbolos/S_Linea 2.png"
                        className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                      />
                      <div className={`circulo2 ${expandedDivs[index] ? 'circulo2-expanded' : ''}`}> 
                        <DropArea2 isExpanded={expandedDivs[index]} />
                      </div>
                    </div>
                  </DraggableDiv>
              </div>
              ))}
            
            
            {[8].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 4.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo3 ${expandedDivs[index] ? 'circulo3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            

            {[9].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 3.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo2 ${expandedDivs[index] ? 'circulo2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[10].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 2.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo3 ${expandedDivs[index] ? 'circulo3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[11].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 1.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo2 ${expandedDivs[index] ? 'circulo2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]}  />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}
            

            {[12].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 5.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo3 ${expandedDivs[index] ? 'circulo3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}


            {[13].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 1.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}
      
            {[14].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 2.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[15].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 3.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[16].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 4.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[17].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Circulo Rojo XXS (3.5px).png"
                      className='PuntoRojo' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[18].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Circulo Rojo XS (4px).png"
                      className='PuntoRojo' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

        </div>

          {/* <div className='DivPanel'>

            <div>
                <button onClick={triggerFileInput} className='btnInsert'>Cargar imagen</button>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }} // Oculta el input file
                  />
                  
                  {imageSrc && <img src={imageSrc} alt="Imagen cargada" style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }} />}
            </div>

          </div> */}
    </div>
  );
};

const StepI1 = ({ handlePrevStep1, handleUndo, handleImageChange, handlePrint }) => {
  const [expandedDivs, setExpandedDivs] = useState({}); // Estado para manejar el tamaño de cada div

  const toggleDivSize = (index) => {
    // Cambiar el estado del tamaño del div al hacer clic
    setExpandedDivs((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre true/false para expandir o contraer
    }));
  };


    const [imageSrc, setImageSrc] = useState(null);

    // Función para manejar la carga de la imagen
    const handleImageUpload = (event) => {
      const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
      if (file) {
        const reader = new FileReader(); // Crea un lector de archivos
        reader.onloadend = () => {
          setImageSrc(reader.result); // Almacena la imagen en formato base64
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
      }
    };
  
    // Función para simular el clic en el input file
    const triggerFileInput = () => {
      document.getElementById('imageInput').click();
    };

  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep1} className={`print-button`}>
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`}>
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`}>
          <img src="/I_Folder.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={saveFile} className={`print-button`}>
          <img src="/I_Folder.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}}/>
      </div>
      <div className='container-grid'>
            {[1].map((index) => (
              <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`}>
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 2.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro2 ${expandedDivs[index] ? 'cuadro2-expanded' : ''}`}>
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}


            {[2].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 4.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro3 ${expandedDivs[index] ? 'cuadro3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}
            

            {[3].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 3.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`}// Aplicar estilo a la imagen
                    />
                    <div className={`cuadro2 ${expandedDivs[index] ? 'cuadro2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[4].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 2.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro3 ${expandedDivs[index] ? 'cuadro3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[5].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 1.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro2 ${expandedDivs[index] ? 'cuadro2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}
            

            {[6].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadro ${expandedDivs[index] ? 'cuadro-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 5.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`cuadro3 ${expandedDivs[index] ? 'cuadro3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[7].map((index) => (
              <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                  <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                    <div
                      className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                      onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                    >
                      <img
                        src="/assets/Simbolos/S_Linea 2.png"
                        className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                      />
                      <div className={`circulo2 ${expandedDivs[index] ? 'circulo2-expanded' : ''}`}> 
                        <DropArea2 isExpanded={expandedDivs[index]} />
                      </div>
                    </div>
                  </DraggableDiv>
              </div>
              ))}
            
            
            {[8].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 4.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo3 ${expandedDivs[index] ? 'circulo3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            

            {[9].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 3.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo2 ${expandedDivs[index] ? 'circulo2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[10].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 2.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo3 ${expandedDivs[index] ? 'circulo3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[11].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 1.png"
                      className={`lineaImg ${expandedDivs[index] ? 'lineaImg-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo2 ${expandedDivs[index] ? 'circulo2-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]}  />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}
            

            {[12].map((index) => (
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`circulo ${expandedDivs[index] ? 'circulo-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Linea 5.png"
                      className={`lineaImg2 ${expandedDivs[index] ? 'lineaImg2-expanded' : ''}`} // Aplicar estilo a la imagen
                    />
                    <div className={`circulo3 ${expandedDivs[index] ? 'circulo3-expanded' : ''}`}> 
                      <DropArea2 isExpanded={expandedDivs[index]} />
                    </div>
                  </div>
                </DraggableDiv>
              </div>
            ))}


            {[13].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 1.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}
      
            {[14].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 2.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[15].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 3.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[16].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Cruz 4.png"
                      className='cruzImg' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[17].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Circulo Rojo XXS (3.5px).png"
                      className='PuntoRojo' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}

            {[18].map((index) => (
                <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
                <DraggableDiv key={index} isDraggable={expandedDivs[index]}>
                  <div
                    className={`cuadroIMG2 ${expandedDivs[index] ? 'cuadroIMG2-expanded' : ''}`} // Aplica clase para expandir
                    onClick={() => toggleDivSize(index)} // Cambia el tamaño al hacer clic
                  >
                    <img
                      src="/assets/Simbolos/S_Circulo Rojo XS (4px).png"
                      className='PuntoRojo' // Aplicar estilo a la imagen
                    />
                  </div>
                </DraggableDiv>
              </div>
            ))}
        </div>
    </div>
  );
};

export default SimpleMultiStepForm;