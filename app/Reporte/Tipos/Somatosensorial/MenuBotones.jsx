import React, { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { useImageState } from '../../MetodosBotones';
import Draggable from 'react-draggable';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C', 'D', 'E', 'F','G'];

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
      {step === 'C' && <StepC handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'C1' && <StepC1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'C2' && <StepC2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'D' && <StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'D1' && <StepD1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}

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
    <h1 className="text-xl font-bold text-white">VÍA SOMATOSENSORIAL</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('D1')}>
      <ConclusionButton value="indenme" title="VÍA SOMATOSENSORIAL INDEMNE CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA SOMATOSENSORIAL ALTERADA CON DEFECTO FUNCIONAL " displayText="ALTERADA " />
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
      <ConclusionButton value="retardo_en_la_conduccion" title="RETARDO EN LA CONDUCCIÓN " displayText="RETARDO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('D')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title="BLOQUEO EN LA CONDUCCIÓN " displayText="BLOQUEO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('C2')}>
      <ConclusionButton value="deficit_neuronal" title="AXONAL " displayText="DÉFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('D')}>
      <ConclusionButton value="sin_respuesta" title="POR AUSENCIA DE RESPUESTA EVOCABLE " displayText="SIN RESPUETA" />
    </div>
  </div>
);

const StepC = ({ handlePrevStep, handleNextStep, setStep }) => (
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
    <div onClick={() => setStep('D')}>
      <ConclusionButton value="leve_moderado_severo" title="LEVE MODERADO SEVERO " displayText="LEVE MODERADO SEVERO" />
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
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('D')}>
      <ConclusionButton value="perdida_axonal_secundaria" title="Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
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
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
    <div onClick={() => setStep('D')}>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
    </div>
  </div>
);

const StepD = ({ handlePrevStep, handleNextStep, setStep }) => (
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
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="izquierdo" title="PARA LADO IZQUIERDO " displayText="IZQUIERDO" />
      <ConclusionButton value="derecho" title="PARA LADO DERECHO " displayText="DERECHO" />
      <ConclusionButton value="bilateral" title="BILATERAL " displayText="BILATERAL" />

    
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
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div onClick={() => setStep('G')}>
      <ConclusionButton value="izquierdo" title="PARA LADO IZQUIERDO." displayText="IZQUIERDO" />
      <ConclusionButton value="derecho" title="PARA LADO DERECHO." displayText="DERECHO" />
      <ConclusionButton value="bilateral" title="BILATERAL. " displayText="BILATERAL" />
    </div>
  </div>
);

const StepE = ({ handleNextStep, handlePrevStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <Accordion  title='SUPERIORES'>
      <Accordion  title='NERVIO MEDIANO'>
      </Accordion>
      <Accordion  title='NERVIO  ULNAR'>  
      </Accordion>
      <Accordion  title='NERVIO  RADIAL'>
      </Accordion>
      <Accordion  title='NERVIO  RADIAL SUPERFICIAL'>
      </Accordion>
      <Accordion  title='NERVIO  ANTEBRAQUEAL CUTANEO lATERAL'>
      </Accordion>
    </Accordion>
     <Accordion  title='INFERIORES'>
      <Accordion  title='NERVIO TIBIAL'>
      </Accordion>
      <Accordion  title='NERVIO  PERONEO SUPERFICIAL'>  
      </Accordion>
      <Accordion  title='NERVIO  SURAL'>
      </Accordion>
      <Accordion  title='NERVIO SAFENO'>
      </Accordion>
      <Accordion  title='NERVIO  FEMOROCUTANEO LATERAL'>
      </Accordion>
       <Accordion  title='NERVIO  PUDENDO'>
      </Accordion>
    </Accordion>
    <div onClick={() => setStep('F')}>
    <ConclusionButton value="trigemino" title="A TRAVÉS DEL TRACTO Y NUCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGEMINO" />
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
    <h1 className='text-xl font-bold text-white'>NIVEL: </h1>
    <Accordion  title='SUPERIORES'>
      <div onClick={() => setStep('G')}>
      <ConclusionButton value="cortical" title="TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value="subcortical" title="TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value="cervical" title="TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value="periferico" title="TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
      </div>
    </Accordion>
    <Accordion  title='INFERIORES'>
      <div onClick={() => setStep('G')}>
      <ConclusionButton value="cortical" title="TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value="subcortical" title="TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilisLemnisco medial)." displayText="SUBCORTICAL" />
      <ConclusionButton value="cervical" title="TOPOGRÁFICAMENTE A NIVEL CERVICAL (N26: Tracto gracilis-sustancia gris medular)." displayText="CERVICAL" />
      <ConclusionButton value="toracico" title="TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales-Tracto gracilis). " displayText="TORÁCICO" />
      <ConclusionButton value="lumbosacro" title="TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular- Raíces dorsales)." displayText="LUMBOSACRO" />
      <ConclusionButton value="periferico" title="TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas (IA-II)- Plexo sacro)." displayText="PERIFERICO" />
      </div>
    </Accordion>
    
    </div>
);



const StepG = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => (
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
