import React, { useState,useContext} from 'react';
import { ReportContext } from '@/src/context'
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { useImageState } from '../../MetodosBotones';
import Draggable from 'react-draggable';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C1','C2','D1','D2', 'E','E2', 'F','F2','G1','G2','G12','G22','H'];

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
      {step === 'B' && <StepB handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  />}
      {step === 'C1' && <StepC1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'C2' && <StepC2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'D1' && <StepD1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'D2' && <StepD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>}
      {step === 'E2' && <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'F2' && <StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'G1' && <StepG1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'G2' && <StepG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'G12' && <StepG12 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'G22' && <StepG22 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}

    </div>
  );
};
///////////////// Menu de cada paso /////////////////
const StepA = ({ handleNextStep ,setStep, setSelectedConclusions}) => (
  <div>
    <div className='button-bar'>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">VÍA VISUAL</h1>
    <div > 
    </div>
    <div onClick={() => setStep('E2')}>
      <ConclusionButton value="indenme" title="VÍA VISUAL CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA VISUAL CON DEFECTO FUNCIONAL " displayText="ALTERADA " />
    </div>
  </div>
);

const StepB = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('indenme')
            removeConclusion('alterada')
            removeConclusion('retardo_en_la_conduccion')
            removeConclusion('bloqueo_en_la_conduccion')
            removeConclusion('deficit_neuronal')
            removeConclusion('sin_respuesta')
            // 2) Regresamos a StepA
            setStep('A')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button  className="print-button dont-print">
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
  </div>);
};

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            // Al volver a B, borramos lo que StepC1 pudo agregar
            removeConclusion('leve')
            removeConclusion('moderado')
            removeConclusion('severo')
            setStep('B')
          }} className="print-button dont-print">
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
      <button onClick={() => {
            // Al volver a B, borramos lo que StepC2 pudo agregar
            removeConclusion('leve')
            removeConclusion('moderado')
            removeConclusion('severo')
            setStep('B')
          }} className="print-button dont-print">
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
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            // Al volver a C1, borramos lo que StepD1 pudo agregar
            removeConclusion('perdida_axonal_secundaria')
            setStep('C1')
          }} className="print-button dont-print">
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
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>  {
            // Al volver a C2, borramos lo que StepD2 pudo agregar
            removeConclusion('retardo_secundario_en_la_conduccion')
            setStep('C2')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
     <div >
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
     </div>
  </div>
);
};

const StepE = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            // Al volver a B, borramos conclusiones que StepE pudo agregar
            removeConclusion('perdida_axonal_secundaria')
            removeConclusion('retardo_secundario_en_la_conduccion')
            removeConclusion('leve')
            removeConclusion('moderado')
            removeConclusion('severo')
            removeConclusion('izquierdo')
            removeConclusion('derecho')
            removeConclusion('bilateral')
            setStep('B')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('F')} className="print-button dont-print">
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
        title="PARA LADO IZQUIERDO,"
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('F');
        }}>
      <ConclusionButton
        value="derecho"
        title="PARA LADO DERECHO,"
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
        displayText="BILATERAL"
        
      />
    </div>
  </div>
);
};


const StepE2 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            removeConclusion('indenme')
            removeConclusion('izquierdo')
            removeConclusion('derecho')
            removeConclusion('bilateral')
            setStep('A')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('F2');
        }}>
      <ConclusionButton
        value="izquierdo"
        title="PARA LADO IZQUIERDO,"
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('F2');
        }}>
      <ConclusionButton
        value="derecho"
        title="PARA LADO DERECHO,"
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('F2');
        }}>
      <ConclusionButton
        value="bilateral"
        title="BILATERAL,"
        displayText="BILATERAL"
        
      />
    </div>
  </div>
);
};



const StepF = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            // Al volver a E, quita lo que StepF pudo haber agregado
            removeConclusion(`${selectedSide}led_flash`)
            removeConclusion(`${selectedSide}nervio_optico`)
            removeConclusion(`${selectedSide}quiasma_optico`)
            removeConclusion(`${selectedSide}tracto_optico`)
            removeConclusion(`${selectedSide}nucleo_geniculado`)
            removeConclusion('damero_total')
            removeConclusion('damero_hemicampos')
            setStep('E')
          }} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <div onClick={() => setStep('H')}>
    <ConclusionButton
            value={`${selectedSide}led_flash`}
            title=' AL ESTIMULO LUMINOSO DE LAS FIBRAS RETINO-TÁLAMOCORTICALES.' displayText='LED FLASH'
          />
    </div>
    <div onClick={() => setStep('G1')}>
      <ConclusionButton value='damero_total' title=' AL ESTÍMULAR ÁREA PREQUIASMÁTICA' displayText='DAMERO TOTAL' />
    </div>
    <div onClick={() => setStep('G2')}>
    <ConclusionButton value='damero_hemicampos' title=' AL ESTÍMULAR ÁREA RETROQUIASMATICA' displayText='DAMERO HEMICAMPOS' />
    </div>
  </div>
);
};

const StepF2 = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            removeConclusion(`${selectedSide}led_flash`)
            removeConclusion(`${selectedSide}nervio_optico`)
            removeConclusion(`${selectedSide}quiasma_optico`)
            removeConclusion(`${selectedSide}tracto_optico`)
            removeConclusion(`${selectedSide}nucleo_geniculado`)
            removeConclusion('damero_total')
            removeConclusion('damero_hemicampos')
            setStep('E2')
          }} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <div onClick={() => setStep('H')}>
    <ConclusionButton
            value={``}
            title=' AL ESTIMULO LUMINOSO DE LAS FIBRAS RETINO-TÁLAMOCORTICALES.' displayText='LED FLASH'
          />
    </div>
    <div onClick={() => setStep('G12')}>
      <ConclusionButton value='damero_total' title=' AL ESTÍMULAR ÁREA PREQUIASMÁTICA' displayText='DAMERO TOTAL' />
    </div>
    <div onClick={() => setStep('G22')}>
    <ConclusionButton value='damero_hemicampos' title=' AL ESTÍMULAR ÁREA RETROQUIASMATICA' displayText='DAMERO HEMICAMPOS' />
    </div>
  </div>
);
};




const StepG1 = ({ handleNextStep, handlePrevStep, setStep,selectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            // Al volver a F, quitamos lo que StepG1 pudo agregar
            removeConclusion(`${selectedSide}nervio_optico`)
            removeConclusion(`${selectedSide}quiasma_optico`)
            setStep('F')
          }} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL PREQUIASMATICA: </h1>
    <div onClick={() => setStep('H')}>
      <ConclusionButton
            value={`${selectedSide}nervio_optico`}
            title=' TOPOGRÁFICAMENTE A NIVEL DE NERVIO ÓPTICO.' displayText='NERVIO ÓPTICO'
            
          />
      <ConclusionButton
            value={`${selectedSide}quiasma_optico`}
            title=' TOPOGRÁFICAMENTE A NIVEL DE QUIASMA ÓPTICO.' displayText='QUIASMA ÓPTICO'
            
         />
    </div>
  </div>
);
};


const StepG2 = ({ handleNextStep, handlePrevStep, setStep,selectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
  <div className='button-bar'>
    <button onClick={() => {
            removeConclusion(`${selectedSide}tracto_optico`)
            removeConclusion(`${selectedSide}nucleo_geniculado`)
            setStep('F')
          }} id='prev' className={`print-button dont-print `}>
      <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
    </button>
    <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
      <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
    </button>
  </div>
  <h1 className='text-xl font-bold text-white'>NIVEL RETROQUIASMATICA: </h1>
  <div onClick={() => setStep('H')}>
  <ConclusionButton
            value={`${selectedSide}tracto_optico`}
            title=' TOPOGRÁFICAMENTE A NIVEL DE TRACTO ÓPTICO.' displayText='TRACTO ÓPTICO'
            
         />
  <ConclusionButton
          value={`${selectedSide}nucleo_geniculado`}
          title=' TOPOGRÁFICAMENTE A NIVEL DE NÚCLEO GENICULADO.' displayText='NÚCLEO GENICULADO' 
         />
  </div>
</div>
);};

const StepG12 = ({ handleNextStep, handlePrevStep, setStep,selectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
            removeConclusion(`${selectedSide}tracto_optico`)
            removeConclusion(`${selectedSide}quiasma_optico`)
            setStep('F2')
          }} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL PREQUIASMATICA: </h1>
    <div onClick={() => setStep('H')}>
      <ConclusionButton
            value={`${selectedSide}tracto_optico`}
            title=' TOPOGRÁFICAMENTE A NIVEL DE NERVIO ÓPTICO.' displayText='NERVIO ÓPTICO'
            
          />
      <ConclusionButton
            value={`${selectedSide}quiasma_optico`}
            title=' TOPOGRÁFICAMENTE A NIVEL DE QUIASMA ÓPTICO.' displayText='QUIASMA ÓPTICO'
            
         />
    </div>
  </div>
);
};


const StepG22 = ({ handleNextStep, handlePrevStep, setStep,selectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
  <div className='button-bar'>
    <button onClick={() => {
           
            removeConclusion(`${selectedSide}tracto_optico`)
            removeConclusion(`${selectedSide}nucleo_geniculado`)
            setStep('F2')
          }} id='prev' className={`print-button dont-print `}>
      <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
    </button>
    <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
      <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
    </button>
  </div>
  <h1 className='text-xl font-bold text-white'>NIVEL RETROQUIASMATICA: </h1>
  <div onClick={() => setStep('H')}>
  <ConclusionButton
            value={`${selectedSide}tracto_optico`}
            title=' TOPOGRÁFICAMENTE A NIVEL DE DE TRACTO ÓPTICO.' displayText='TRACTO ÓPTICO'
            
         />
  <ConclusionButton
          value={`${selectedSide}nucleo_geniculado`}
          title=' TOPOGRÁFICAMENTE A NIVEL DE NÚCLEO GENICULADO.' displayText='NÚCLEO GENICULADO' 
         />
  </div>
</div>
);
};


const StepH = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>  { 
                                setStep('F')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={() => window.location.reload()} className={`print-button dont-print`}>
        <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
      </button>
     
      <button onClick={handlePrint} className={`print-button dont-print`}>
        <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
      </button>
    </div>
    
  </div>
);
};




export default SimpleMultiStepForm;