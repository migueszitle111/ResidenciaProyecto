import { useState,useContext} from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import { ReportContext } from '@/src/context'
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C1','C2','D1','D2', 'E','E2', 'F','F2','G','H','I','J'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {

  // Se da el valor en donde se inicie el primer paso
  const [step, setStep] = useState('A');
  const [selectedSide, setSelectedSide] = useState('');


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
    const currentIndex = stepsArray.indexOf(step);
    if (currentIndex < stepsArray.length - 1) {
      setStep(stepsArray[currentIndex + 1]);
    }
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    const currentIndex = stepsArray.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepsArray[currentIndex - 1]);
    }
  };

  return (
    <div>
      {/* Se crean los objetos paso y se le dan los métodos que necesitan */}
      {step === 'A' && <StepA handleNextStep={handleNextStep} setStep={setStep}/>}
      {step === 'B' && <StepB handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'C1' && <StepC1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'C2' && <StepC2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'D1' && <StepD1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'D2' && <StepD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>}
      {step === 'E2' && <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'F2' && <StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  />}
      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'G2' && <StepG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'I' && <StepI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'J' && <StepJ handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}
      {step === 'J2' && <StepJ2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}


    </div>
  );
};
///////////////// Menu de cada paso /////////////////
const StepA = ({ handleNextStep ,setStep}) => (
  <div>
    <div className='button-bar'>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">VÍA AUDITIVA</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('E2')}>
      <ConclusionButton value="indenme" title="VÍA AUDITIVA CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA AUDITIVA CON DEFECTO FUNCIONAL " displayText="ALTERADA " />
    </div>
  </div>
);

const StepB = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        setStep('A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('C1')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN " displayText="RETARDO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title="POR BLOQUEO EN LA CONDUCCIÓN " displayText="BLOQUEO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('C2')}>
      <ConclusionButton value="deficit_neuronal" title="AXONAL " displayText="POR DEFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="sin_respuesta" title="POR AUSENCIA DE RESPUESTA EVOCABLE " displayText="SIN RESPUETA" />
    </div>
  </div>
);
};

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('B')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('D1')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('D1')}>
      <ConclusionButton value="leve" title="LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title="MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title="SEVERO " displayText="SEVERO " />

    </div>
  </div>
);
};

const StepC2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('B')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('D2')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('D2')}>
      <ConclusionButton value="leve" title="LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title="MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title="SEVERO " displayText=" SEVERO" />

    </div>
  </div>
);
};

const StepD1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('perdida_axonal_secundaria')
        setStep('C1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
      <ConclusionButton value="perdida_axonal_secundaria" title=" Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
  </div>
);
};

const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C2')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
  </div>
);
};

const StepE = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={()=>setStep('F')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('F');
        }}>
      <ConclusionButton
        value="izquierdo"
        title="PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('F');
        }}>
      <ConclusionButton
        value="derecho"
        title="PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('F');
        }}>
      <ConclusionButton
        value="bilateral"
        title="BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);


const StepE2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('A')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('J2')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('J2');
        }}>
      <ConclusionButton
        value="izquierdo"
        title="PARA LADO IZQUIERDO, A TRAVES DEL TALLO CEREBERAL."
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('J2');
        }}>
      <ConclusionButton
        value="derecho"
        title="PARA LADO DERECHO, A TRAVES DEL TALLO CEREBERAL. "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('J2');
        }}>
      <ConclusionButton
        value="bilateral"
        title="BILATERAL, A TRAVES DEL TALLO CEREBERAL."
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);



const StepF = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('G')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>REGION: </h1>
  
    <div onClick={() => setStep('G')}>
      <ConclusionButton value='rostral' title=' A TRAVÉS DE REGION ROSTRAL (III-V) DEL TALLO CEREBRAL ' displayText='ROSTRAL' />
      <ConclusionButton value='caudal' title=' A TRAVÉS DE REGION CAUDAL (I-III) DEL TALLO CEREBERAL' displayText='CAUDAL' />
      <ConclusionButton value='tallo_cerebral' title=' A TRAVES DEL TALLO CEREBERAL (I-V)' displayText='TALLO CEREBRAL' />
    </div>

</div>
);

// ...
const StepG = ({
  setStep,
  selectedSide,
  // otras props que necesites
}) => {
  const { updateConclusions } = useContext(ReportContext)

  // Array de los 5 niveles, EN ORDEN.
  // Nota que "value" incluye "selectedSide".
  const levels = [
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL DE NERVIO AUDITIVO',
      value: `${selectedSide}nervio_auditivo`,
      displayText: 'NERVIO AUDITIVO (I)'
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL DE NUCLEO COCLEAR',
      value: `${selectedSide}nucleo_coclear`,
      displayText: 'NUCLEO COCLEAR (II)'
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL DE COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE..',
      value: `${selectedSide}completo_olivar_trapezoide`,
      displayText: 'COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE (III)'
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL DE LEMNISCO LATERAL.',
      value: `${selectedSide}lemnisco_lateral`,
      displayText: 'LEMNISCO LATERAL (IV)'
    },
    {
      title: 'TOPOGRÁFICAMENTE A EXPENSAS DE COLÍCULO INFERIOR.',
      value: `${selectedSide}coliculo_inferior`,
      displayText: 'COLÍCULO INFERIOR (V)'
    },
  ]

  // Cuando clican cualquiera de los 5, seleccionamos
  // a partir de ÉL hasta el final (incluyéndolo).
 const handleConclusionClick = (title, value) => {
  const index = levels.findIndex(item => item.value === value);
  if (index === -1) {
    updateConclusions({ title, value });
    return;
  }

  // Limpia los niveles previos (si tu contexto lo permite),
  // o de lo contrario sobrescribe la conclusión anterior.
  // Luego agregas desde 'index' hasta el final:
  for (let i = index; i < levels.length; i++) {
    updateConclusions({
      title: i === index ? levels[i].title : '', // Solo el clicado conserva su título
      value: levels[i].value,
    });
  }
};


  return (
    <div>
      <div className='button-bar'>
      <button onClick={() => setStep('F')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
       
      </div>

      <h1 className='text-xl font-bold text-white'>NIVEL: </h1>
      
      {/* Botón 1 (especial) */}
      <ConclusionButton
        value={`${selectedSide}nervio_auditivo`}
        title="TOPOGRÁFICAMENTE A NIVEL DE NERVIO AUDITIVO."
        displayText="NERVIO AUDITIVO (I)"
        onClick={handleConclusionClick}   // <--- Pasamos la función
      />

      {/* Botón 2 (normal) */}
      <ConclusionButton
        value={`${selectedSide}nucleo_coclear`}
        title="TOPOGRÁFICAMENTE A NIVEL DE NUCLEO COCLEAR."
        displayText="NUCLEO COCLEAR (II)"
        onClick={handleConclusionClick}   // <--- misma función
      />

      {/* Botón 3 (normal) */}
      <ConclusionButton
        value={`${selectedSide}completo_olivar_trapezoide`}
        title="TOPOGRÁFICAMENTE A NIVEL DE COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE."
        displayText="COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE (III)"
        onClick={handleConclusionClick}
      />

      {/* Botón 4 (normal) */}
      <ConclusionButton
        value={`${selectedSide}lemnisco_lateral`}
        title="TOPOGRÁFICAMENTE A NIVEL DE LEMNISCO LATERAL."
        displayText="LEMNISCO LATERAL (IV)"
        onClick={handleConclusionClick}
      />

      {/* Botón 5 (normal) */}
      <ConclusionButton
        value={`${selectedSide}coliculo_inferior`}
        title="TOPOGRÁFICAMENTE A EXPENSAS DE COLÍCULO INFERIOR."
        displayText="COLÍCULO INFERIOR (V)"
        onClick={handleConclusionClick}
      />
    </div>
  )
}




const StepH = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('G')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('I')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>UMBRAL AUDITIVO: </h1>
    <div onClick={() => setStep('I')}>
    <ConclusionButton value='normoacusia' title=' UMBRAL AUDITIVO PARA TONOS ALTOS COMPATIBLE CON NORMOACUSIA' displayText='NORMOACUSIA '/> 
    <ConclusionButton value='hipoacusia_leve' title=' UMBRAL AUDITIVO PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA LEVE' displayText='HIPOACUSIA LEVE'/> 
    <ConclusionButton value='hipoacusia_moderada' title=' UMBRAL AUDITIVO PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA MODERADA' displayText='HIPOACUSIA MODERADA'/> 
    <ConclusionButton value='hipoacusia_severa' title=' UMBRAL AUDITIVO PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA SEVERA' displayText='HIPOACUSIA SEVERA'/> 
    <ConclusionButton value='hipocusia_profunda' title=' UMBRAL AUDITIVO PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA PROFUNDA' displayText='HIPOACUSIA PROFUNDA'/> 
    </div>

  </div>
);

const StepI = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('H')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('J')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>TIPO: </h1>
    <div onClick={() => setStep('J')}>
    <ConclusionButton value='neurosensorial' title=' DE TIPO NEUROSENSORIAL.' displayText='NEUROSENSORIAL'/> 
    <ConclusionButton value='conductiva' title=' DE TIPO CONDUCTIVA.' displayText='CONDUCTIVA'/> 
    </div>


  </div>
);

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

const StepJ = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
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
        <button onClick={() => setStep('I')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button dont-print`}>
          <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
        </button>
      
        <button onClick={handlePrint} className={`print-button dont-print`}>
          <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
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

const StepJ2 = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
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
      <button onClick={() => setStep('E2')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={() => window.location.reload()} className={`print-button dont-print`}>
        <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
      </button>
    
      <button onClick={handlePrint} className={`print-button dont-print`}>
        <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
      </button>
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
