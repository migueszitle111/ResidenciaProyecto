import { useState } from 'react';
import Draggable from 'react-draggable';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
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

const StepB = ({ handleNextStep, handlePrevStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>
        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        DENERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='4' title=' CON DENERVACIÓN DIFUSA SEVERA (++++) (' displayText='DIFUSA SEVERA (++++)'/>
        <ConclusionButton value='5' title=' CON DENERVACIÓN ABUNDANTE PROGRESIVA (+++) (' displayText='ABUNDANTE PROGRESIVA (+++)'/>
        <ConclusionButton value='6' title=' CON DENERVACIÓN ACTIVA MODERADA (++) (' displayText='ACTIVA MODERADA (++)'/>
        <ConclusionButton value='7' title=' CON DENERVACIÓN LEVE (+/+) (' displayText='LEVE (+/+)'/>
        <ConclusionButton value='8' title=' SIN DENERVACIÓN ACTIVA (' displayText='INACTIVA'/>
      </div>
    </div>
  );
};

const StepD = ({ handleNextStep, handlePrevStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>
      <ConclusionButton value='bulbar' title='BULBAR ' displayText='BULBAR'/>
      <ConclusionButton value='cervical_miembros_superiores' title='CERVICAL ' displayText='CERVICAL/MIEMBROS SUPERIORES'/>
      <ConclusionButton value='toracico' title='TORÁCICA ' displayText='TORÁCICA'/>
      <ConclusionButton value='lumbar_miembros_inferiores' title='LUMBAR ' displayText='LUMBAR/MIEMBROS INFERIORES'/>
    </div>
  );
};

const StepD1 = ({ handleNextStep1, handlePrevStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}} />
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value = '9' title = ') SIMÉTRICA;' displayText = 'SIMÉTRICA'/>
        <ConclusionButton value = '10' title = ') ASIMÉTRICA;'  displayText = 'ASIMÉTRICA'/>
      </div>
    </div>
  );
};

const StepE1 = ({ handlePrevStep1, handleNextStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg"  style={{filter: 'invert(1)'}}/>
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
const StepH = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {
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

    <Accordion title = 'Imagenes 1'>
      <table>
        <tr>
          <td>
            <Draggable>
                <img src="/assets/Simbolos/S_Circulo 1.png" width="175" height="175" alt="Circulo 1" style={{display: 'invert(1)'}}/>
            </Draggable>
          </td>
          <td>
            <Draggable>
                <img src="/assets/Simbolos/S_Circulo 1.png" width="175" height="175" alt="Circulo 1"/>
            </Draggable>
          </td>
        </tr>
      </table>
    </Accordion>
    </div>
  );
};

const StepG1 = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {
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
        <img src="/assets/Simbolos/S_Circulo 1.png" width={100} length={100} alt="Circulo 1"/>
      </Draggable>
    </div>
    
    
  );
};
export default SimpleMultiStepForm;