import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

// Metodos de movimiento entre menus
const SimpleMultiStepForm = () => {
  const [step, setStep] = useState('A');

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
  };

  const handleNextStep2 = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('D');
    else if (step === 'D') setStep('E');
    else if (step === 'E') setStep('F');
    else if (step === 'F') setStep('G');
    else if (step === 'G') setStep('H');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'H') setStep('G');
    else if (step === 'G') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // Metodos de movimiento entre menus custom
  const handleNextStep1 = () => {
    if (step === 'A') setStep('B1');
    else if (step === 'B1') setStep ('D1')
    else if (step === 'D1') setStep ('E1')
    else if (step === 'E1') setStep ('F1')
    else if (step === 'F1') setStep ('G1')
  };

  const handlePrevStep1 = () => {
    if (step === 'G1') setStep('F1')
    else if (step === 'F1') setStep('E1')
    else if (step === 'E1') setStep('D1')
    else if (step === 'D1') setStep('B1')
    else if (step === 'B1') setStep ('A')
    
  };

  return (
    <div>
      {/* Metodos que toman cada paso*/}
      {step === 'A' ? (
        <StepA
          handleNextStep={handleNextStep}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'B' ? (
        <StepB
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'B1' ? (
        <StepB1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
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

      {step === 'D1' ? (
        <StepD1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'E' ? (
        <StepE
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'E1' ? (
        <StepE1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'F' ? (
        <StepF
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'F1' ? (
        <StepF1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
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
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'G1' ? (
        <StepG1
          handlePrevStep1={handlePrevStep1}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}
    </div>
  );
};

///////////////// Menu de cada paso /////////////////

const StepA = ({ handleNextStep, handleNextStep1 }) => {
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
        FIBRAS
      </h1>
      
      <div onClick={ handleNextStep }>
        <ConclusionButton value='1' title='NEURONOPATÍA MOTORA-ASTA ANTERIOR MEDULAR' displayText='MOTORA-ASTA ANTERIOR MEDULAR'/>
      </div>

      <div onClick={ handleNextStep1 }>
        <ConclusionButton value='sentitiva_ganglio_de_la_raiz_dorsal' title='NEURONOPATÍA SENSITIVA-GANGLIO DE LA RAÍZ DORSAL' displayText='SENSITIVA-GANGLIO DE LA RAÍZ DORSAL'/>
      </div>
    </div>
  );
};

const StepB = ({ handleNextStep, handlePrevStep,handleNextStep2 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('1')
            removeConclusion('sentitiva_ganglio_de_la_raiz_dorsal')
            removeConclusion('2')
            removeConclusion('3')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button>

        {/* <button onClick={handleNextStep2} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button> */}
      </div>

      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='2' title=' HEREDITARIA,' displayText='HEREDITARIA'/>
        <ConclusionButton value='3' title=' ADQUIRIDA,' displayText='ADQUIRIDA'/>
      </div>
    </div>
  );
};

const StepB1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('hereditaria')
            removeConclusion('adquirida')
            removeConclusion('sentitiva_ganglio_de_la_raiz_dorsal')

            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACION
      </h1>

      <div onClick={ handleNextStep1 }>
        <ConclusionButton value='hereditaria' title=' HEREDITARIA,' displayText='HEREDITARIA'/>
        <ConclusionButton value='adquirida' title=' ADQUIRIDA,' displayText='ADQUIRIDA'/>
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
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('4')
            removeConclusion('5')
            removeConclusion('6')
            removeConclusion('7')
            removeConclusion('8')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        DENERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='4' title=' CON DENERVACIÓN DIFUSA SEVERA (++++)  ' displayText='DIFUSA SEVERA (++++)'/>
        <ConclusionButton value='5' title=' CON DENERVACIÓN ABUNDANTE PROGRESIVA (+++) ' displayText='ABUNDANTE PROGRESIVA (+++)'/>
        <ConclusionButton value='6' title=' CON DENERVACIÓN ACTIVA MODERADA (++) ' displayText='ACTIVA MODERADA (++)'/>
        <ConclusionButton value='7' title=' CON DENERVACIÓN LEVE (+/+) ' displayText='LEVE (+/+)'/>
        <ConclusionButton value='8' title=' SIN DENERVACIÓN ACTIVA ' displayText='INACTIVA'/>
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
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('bulbar')
            removeConclusion('cervical_miembros_superiores')
            removeConclusion('toracico')
            removeConclusion('lumbar_miembros_inferiores')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>
      <ConclusionButton value='bulbar' title=' BULBAR ' displayText='BULBAR'/>
      <ConclusionButton value='cervical_miembros_superiores' title=' CERVICAL ' displayText='CERVICAL/MIEMBROS SUPERIORES'/>
      <ConclusionButton value='toracico' title='TORÁCICA ' displayText=' TORÁCICA'/>
      <ConclusionButton value='lumbar_miembros_inferiores' title=' LUMBAR ' displayText='LUMBAR/MIEMBROS INFERIORES'/>
    </div>
  );
};

const StepD1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('generalizada')
            removeConclusion('parcial')
            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>

          <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
          </button>

          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCION
      </h1>

      <div onClick={handleNextStep1}>
      <ConclusionButton value='generalizada' title=' DISTRIBUCION GENERALIZADA' displayText='GENERALIZADA'/>
      <ConclusionButton value='parcial' title=' DISTRIBUCION PARCIAL' displayText='PARCIAL'/>
      </div>

      
    </div>
  );
};

const StepE = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('9')
            removeConclusion('10')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value = '9' title = ' SIMÉTRICA;' displayText = 'SIMÉTRICA'/>
        <ConclusionButton value = '10' title = ' ASIMÉTRICA;'  displayText = 'ASIMÉTRICA'/>
      </div>
    </div>
  );
};

const StepE1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('completo')
            removeConclusion('parcial')
            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>

          <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
          </button>

          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      
      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>

      <div onClick={handleNextStep1}>
      <ConclusionButton value = 'completo' title = ' SIMETRICA;' displayText = 'SIMETRICA'/>
      <ConclusionButton value = 'parcial' title = ' ASIMETRICA;'  displayText = 'ASIMETRICA'/></div>
    </div>
  );
};

const StepF = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('11')
            removeConclusion('12')
            removeConclusion('13')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value = '11' title = ' REINERVACIÓN ABUNDANTE Y' displayText= 'ABUNDANTE'/>
        <ConclusionButton value = '12' title = ' REINERVACIÓN DISCRETA Y' displayText= 'DISCRETA'/>
        <ConclusionButton value = '13' title = ' SIN REINERVACIÓN Y' displayText= 'AUSENTE '/>
      </div>
    </div>
  );
};

const StepF1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('completo1')
            removeConclusion('parcial1')
            removeConclusion('pobre1')
            removeConclusion('nulo1')
            removeConclusion('incierto1')
            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>

          <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
          </button>

          <button className={`print-button dont-print `}>
          <img src="/I_X.webp" alt="Imprimir" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>
      <div onClick={handleNextStep1}>
      <ConclusionButton value = 'completo1' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETO.' displayText = 'COMPLETO'/>
      <ConclusionButton value = 'parcial1' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL.'  displayText = 'PARCIAL'/>
      <ConclusionButton value = 'pobre1' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'  displayText = 'POBRE NO FUNCIONAL'/>
      <ConclusionButton value = 'nulo1' title = ' PRONÓSTICO DE RECUPERACIÓN NULO.'  displayText = 'NULO'/>
      <ConclusionButton value = 'incierto1' title = ' PRONÓSTICO DE RECUPERACIÓN INCIERTO.'  displayText = 'INCIERTO'/>
      </div>
    </div>
  );
};
const StepG = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('14')
            removeConclusion('16')
            removeConclusion('17')
            removeConclusion('18')
            // 2) Regresamos 
            handlePrevStep()
          }}className={`print-button`}>
          <img src="/I_Out.svg"  style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO
      </h1>

      <div onClick={ handleNextStep }>
          <ConclusionButton value = '14' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETO.' displayText = 'COMPLETO'/>
          <ConclusionButton value = '16' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'  displayText = 'POBRE'/>
          <ConclusionButton value = '17' title = ' PRONÓSTICO DE RECUPERACIÓN NULO.'  displayText = 'NULO'/>
          <ConclusionButton value = '18' title = ' PRONÓSTICO DE RECUPERACIÓN INCIERTO.'  displayText = 'INCIERTO'/>
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
  


const StepH = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {
  
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

        <label htmlFor="file-upload" className={`print-button`}>
          <img src="/I_Folder.svg" style={{filter: 'invert(1)'}}/>
        </label>

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

const StepG1 = ({ handlePrevStep1, handleUndo, handleImageChange, handlePrint }) => {
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
      <button onClick={handlePrevStep1} className={`print-button`}>
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
      </button>

      <button onClick={handlePrint} className={`print-button`}>
        <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
      </button>

      <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

      <label htmlFor="file-upload" className={`print-button`}>
        <img src="/I_Folder.svg" style={{filter: 'invert(1)'}}/>
      </label>

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