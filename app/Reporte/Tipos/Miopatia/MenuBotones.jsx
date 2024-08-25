import React, { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '../../../components/ReportTemplate/Accordion' 
import { useImageState } from '../../MetodosBotones';
import Draggable from 'react-draggable';
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        AGREGADO (opcional)
      </h1>

      <ConclusionButton value = 'descargas_miotonicas' title = ' Y DESCARGAS MIOTÓNICAS' displayText={'DESCARGAS MIOTÓNICAS'}/>
      <ConclusionButton value = 'descargas_repetitivas_complejas' title = ' Y DESCARGAS REPETITIVAS COMPLEJAS' displayText={'DESCARGAS REPETITIVAS COMPLEJAS'}/>

      
    </div>
  );
};

const StepF = ({ handlePrevStep, handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
        <ConclusionButton value='distribucion_generalizada' title=' DE DISTRIBUCIÓN GENERALIZADA,' displayText={'GENERALIZADA'}/>
      </div>
        <Accordion title='DISTROFIA'>
          <div onClick={ handleNextStep }>
            <ConclusionButton value='anillo_oseo' title=' POR DISTROFIA DE CINTURAS,' displayText={'CINTURAS'}/>
            <ConclusionButton value='duchenne_becker' title=' POR DISTROFIA DE DUCHENNE/BECKER,' displayText={'DUCHENNE/BECKER'}/>
            <ConclusionButton value='emery_dreifuss' title=' POR DISTROFIA DE EMERY-DREIFUSS,' displayText={'EMERY-DREIFUSS'}/>
            <ConclusionButton value='facioescapulohumeral' title=' POR DISTROFIA FACIOESCAPULOHUMERAL,' displayText={'FACIOESCAPULOHUMERAL'}/>
            <ConclusionButton value='oculofaringea' title=' POR DISTROFIA OCULOFARINGEA,' displayText={'OCULOFARINGEA'}/>
          </div>
        </Accordion>

      
    </div>
  );
};

const StepG = ({ handleNextStep, handlePrevStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
         <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`}>
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleUndo} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <label htmlFor="file-upload" className={`print-button`}>
          <img src="/I_Folder.svg" style={{filter: 'invert(1)'}}/>
        </label>

        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}}/>
      </div>

      <Draggable>
        <div className='imagen'>
          <img src="/assets/Simbolos/S_Circulo 1.png" width="175" height="175" alt="Circulo 1"/>
        </div>
      </Draggable>
      <Draggable>
        <div className='imagen'>
          <img src="/assets/Simbolos/S_Circulo 2.png" width="175" height="175" alt="Circulo 2"/>
        </div>
      </Draggable>
      <Draggable>
        <div className='imagen'>
          <img src="/assets/Simbolos/S_Circulo 3.png" width="175" height="175" alt="Circulo 3"/>
        </div>
      </Draggable>

    </div>
  );
};

export default SimpleMultiStepForm;