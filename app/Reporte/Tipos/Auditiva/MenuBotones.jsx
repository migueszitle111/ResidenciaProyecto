import React, { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { useImageState } from '../../MetodosBotones';
import Draggable from 'react-draggable';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C1','C2','D1','D2', 'E', 'F','G','H','I','J'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {

  // Se da el valor en donde se inicie el primer paso
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
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'I' && <StepI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'J' && <StepJ handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}

    </div>
  );
};
///////////////// Menu de cada paso /////////////////
const StepA = ({ handleNextStep ,setStep}) => (
  <div>
    <div className='button-bar'>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">VÍA AUDITIVA</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('J')}>
      <ConclusionButton value="indenme" title="VÍA AUDITIVA INDEMNE CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA AUDITIVA ALTERADA CON DEFECTO FUNCIONAL " displayText="ALTERADA " />
    </div>
  </div>
);

const StepB = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('C1')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="RETARDO EN LA CONDUCCIÓN" displayText="RETARDO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title="BLOQUEO EN LA CONDUCCIÓN" displayText="BLOQUEO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('C2')}>
      <ConclusionButton value="deficit_neuronal" title="AXONAL" displayText="DÉFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="sin_respuesta" title="POR AUSENCIA DE RESPUESTA EVOCABLE" displayText="SIN RESPUETA" />
    </div>
  </div>
);

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('D1')}>
      <ConclusionButton value="leve_moderado_severo" title=" LEVE MODERADO SEVERO " displayText="LEVE MODERADO SEVERO" />
    </div>
  </div>
);

const StepC2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('D2')}>
      <ConclusionButton value="leve_moderado_severo" title=" LEVE MODERADO SEVERO " displayText="LEVE MODERADO SEVERO" />
    </div>
  </div>
);

const StepD1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="perdida_axonal_secundaria" title=" Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
    </div>
  </div>
);

const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
    </div>
  </div>
);

const StepE = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div onClick={() => setStep('F')}>
      <ConclusionButton value="izquierdo" title="PARA LADO IZQUIERDO" displayText="IZQUIERDO" />
      <ConclusionButton value="derecho" title="PARA LADO DERECHO" displayText="DERECHO" />
      <ConclusionButton value="bilateral" title="BILATERAL" displayText="BILATERAL" />

    
    </div>
  </div>
);


const StepF = ({ handleNextStep, handlePrevStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>REGION: </h1>
  
    <div onClick={() => setStep('G')}>
      <ConclusionButton value='rostral' title=' A TRAVÉS DE REGION ROSTRAL (III-V) DEL TALLO CEREBRAL ' displayText='ROSTRAL' />
      <ConclusionButton value='caudal' title=' A TRAVÉS DE REGION CAUDAL (I-III) DEL TALLO CEREBERAL' displayText='CAUDAL' />
      <ConclusionButton value='tallo_cerebral' title=' A TRAVES DE TODO EL TRAYECTO DEL TALLO CEREBERAL (I-V)' displayText='TALLO CEREBRAL' />
    </div>
   
  </div>
);

const StepG = ({ handleNextStep, handlePrevStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL: </h1>
    <div onClick={() => setStep('H')}>
    <ConclusionButton value='coliculo_inferior' title=' TOPOGRÁFICAMENTE A EXPENSAS DE COLÍCULO INFERIOR.' displayText='COLÍCULO INFERIOR (V)'/> 
    <ConclusionButton value='lemnisco_lateral' title=' TOPOGRÁFICAMENTE A NIVEL DE LEMNISCO LATERAL.' displayText='LEMNISCO LATERAL (IV)'/> 
    <ConclusionButton value='completo_olivar_trapezoide' title=' TOPOGRÁFICAMENTE A NIVEL DE COMPLETO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE..' displayText='COMPLETO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE (III)'/> 
    <ConclusionButton value='nucleo_coclear' title=' TOPOGRÁFICAMENTE A NIVEL DE NUCLEO COCLEAR' displayText='NUCLEO COCLEAR (II)'/> 
    <ConclusionButton value='nervio_auditivo' title=' TOPOGRÁFICAMENTE A NIVEL DE NERVIO AUDITIVO' displayText='NERVIO AUDITIVO (I)'/> 

    </div>
  </div>
);

const StepH = ({ handleNextStep, handlePrevStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
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

const StepI = ({ handleNextStep, handlePrevStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>TIPO: </h1>
    <div onClick={() => setStep('J')}>
    <ConclusionButton value='neurosensorial' title=' DE TIPO NEUROSENSORIAL.' displayText='NEUROSENSORIAL'/> 
    <ConclusionButton value='conductiva' title=' DE TIPO CONDUCTIVA.' displayText='CONDUCTIVA'/> 
    </div>
  </div>
);

const StepJ = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('F')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
     
      <img  src="" alt="" style={{ filter: 'invert(1)' }} />
      <button onClick={handlePrint} className="print-button dont-print">
        Imprimir
      </button>
    </div>
    
  </div>
);

export default SimpleMultiStepForm;
