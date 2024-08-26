import React, { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '../../../components/ReportTemplate/Accordion'  
import { useImageState } from '../../MetodosBotones';
import Draggable from 'react-draggable'; 

// Numero de pasos 
const stepsArray = ['A', 'B', 'B1', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {
  const [step, setStep] = useState('A');

  const {
    selectedImages,
    history,
    handleImageChange,
    handleUndo,
    handlePrint
  } = useImageState();

  // iguiente pao, e ponen los paso de arriba hacia abajo
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('B1');
    else if (step === 'B1') setStep('C')
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
    else if (step === 'C') setStep('B1');
    else if (step === 'B1') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // Renderizado de los pasos en circulos
  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === 'Final') {
      return null;
    }
    return (
      <section className='mt-2 mb-4 flex justify-between'>
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${
              item === step ? 'bg-orange-500' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </section>
    );
  };

  return (
    <div>
      {/* Metodos que toman cada paso*/}
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

      {step === 'B1' ? (
        <StepB1
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
          <ConclusionButton value='evolucion_aguda' title='MONO NEUROPATÍA AGUDA'/>
          <ConclusionButton value='evolucion_subaguda' title='MONO NEUROPATÍA SUBAGUDA'/>
          <ConclusionButton value='evolucion_cronica' title='MONO NEUROPATÍA CRÓNICA '/>
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
        NERVIO
      </h1>

      <Accordion title='NERVIOS SUPERIORES'>
        <div onClick={ handleNextStep }>
          <ConclusionButton value = 'MEDIANO' title = ' DE NERVIO MEDIANO' displayText='MEDIANO' />
          <ConclusionButton value = 'ACCESORIO' title = ' DE NERVIO ACCESORIO' displayText='ACCESORIO'/>
          <ConclusionButton value = 'ANTEBRAQUIAL_CUTANEO' title = ' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO'/>
          <ConclusionButton value = 'AXILAR' title = ' DE NERVIO AXILAR' displayText='AXILAR'/>
          <ConclusionButton value = 'MUSCULOCUTANEO' title = ' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO'/>
          <ConclusionButton value = 'RADIAL' title = ' DE NERVIO RADIAL' displayText='RADIAL'/>
          <ConclusionButton value = 'SUPRAESCAPULAR' title = ' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR'/>
          <ConclusionButton value = 'ULNAR' title = ' DE NERVIO ULNAR' displayText='ULNAR'/>
          <ConclusionButton value = 'FRENICO' title = ' DE NERVIO FRÉNICO' displayText='FRÉNICO'/>
          <ConclusionButton value = 'TORACICO_LARGO ' title = ' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO'/>
          <ConclusionButton value = 'TORACODORSAL' title = ' DE NERVIO TORACODORSAL' displayText='TORACODORSAL'/>
        </div>
      </Accordion>

      <Accordion title='NERVIOS INFERIORES'>
      <div onClick={ handleNextStep }>
        <ConclusionButton value = 'CIATICO' title = ' DE NERVIO CIATICO' displayText='CIATICO'/>
          <ConclusionButton value = 'FEMORAL' title = ' DE NERVIO FEMORAL' displayText='FEMORAL'/>
          <ConclusionButton value = 'FEMOROCUTÁNEO_LATERAL' title = ' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL'/>
          <ConclusionButton value = 'ILIOINGUINAL' title = ' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL'/>
          <ConclusionButton value = 'OBTURADOR' title = ' DE NERVIO OBTURADOR' displayText='OBTURADOR'/>
          <ConclusionButton value = 'NERVIO_PERONEO' title = ' DE NERVIO NERVIO PERONEO' displayText='NERVIO PERONEO'/>
          <ConclusionButton value = 'TIBIAL' title = ' DE NERVIO TIBIAL' displayText='TIBIAL'/>
          <ConclusionButton value = 'PUDENDO' title = ' DE NERVIO PUDENDO' displayText='PUDENDO'/>
      </div>
      </Accordion>
      
        <div onClick={ handleNextStep }>
          <ConclusionButton value = 'FACIAL' title = ' DE NERVIO FACIAL' displayText='FACIAL'/>
        </div>
    </div>
  );
};


const StepB1 = ({ handleNextStep, handlePrevStep }) => {
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
        LADO
      </h1>
      
      <div onClick={handleNextStep}>
        <ConclusionButton value='izquierda' title=' IZQUIERDA,' displayText={'IZQUIERDA'}/>
        <ConclusionButton value='derecha' title=' DERECHA,' displayText={'DERECHA'}/>
      </div>
      <Accordion title='BILATERIAL'>
        <div onClick={ handleNextStep }>
          <ConclusionButton value='derecha' title=' CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'}/>
          <ConclusionButton value='izquierda' title=' CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'}/>
          <ConclusionButton value='bilateral' title=' BILATERAL,' displayText={'SIN PREDOMINIO'}/>
        </div>
      </Accordion>
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
        UBICACION
      </h1>
      
      <div onClick={handleNextStep}>
        <ConclusionButton value='focalizada' title=' FOCALIZADA,' displayText={'FOCALIZADA'}/>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA,' displayText={'SEGMENTARIA'}/>
        <ConclusionButton value='generalizada' title=' GENERALIZADA,' displayText={'GENERALIZADA'}/>
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
        TIPO
      </h1>

      <div onClick={handleNextStep}>
      <ConclusionButton value = 'TIPO AXONAL COMPLETA' title = 'TIPO AXONAL COMPLETA' />
      <ConclusionButton value = 'AXONAL CON DESMIELINIZACIÓN SECUNDARIA' title = 'AXONAL CON DESMIELINIZACIÓN SECUNDARIA' />
      <ConclusionButton value = 'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title = 'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' />
      </div>
      <Accordion title='TIPO AXONAL INCOMPLETA'>
        <ConclusionButton value = 'CON DENERVACIÓN DIFUSA (++++)' title = 'CON DENERVACIÓN DIFUSA (++++)' />
        <ConclusionButton value = 'CON DENERVACIÓN ABUNDANTE (+++)' title = 'CON DENERVACIÓN ABUNDANTE (+++)' />
        <ConclusionButton value = 'CON DENERVACIÓN PROGRESIVA (++)' title = 'CON DENERVACIÓN PROGRESIVA (++)' />
        <ConclusionButton value = 'CON DENERVACIÓN DISCRETA (+/+)' title = 'CON DENERVACIÓN DISCRETA (+/+)' />
        <ConclusionButton value = 'SIN DENERVACIÓN ACTIVA' title = 'SIN DENERVACIÓN ACTIVA' />
      </Accordion>
      
      <Accordion title='TIPO DESMIELINIZANTE '>
          <div onClick={ handleNextStep }>
            <ConclusionButton value = 'POR RETARDO EN LA CONDUCCIÓN ' title = 'POR RETARDO EN LA CONDUCCIÓN ' />
            <ConclusionButton value = 'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' title = 'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' />
            <ConclusionButton value = 'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title = 'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' />
          </div>
      </Accordion>
      
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
        FIBRAS
      </h1>
      <div onClick={handleNextStep}>
        <ConclusionButton value = 'DE FIBRAS MOTORAS' title = 'DE FIBRAS MOTORAS' />
        <ConclusionButton value = 'DE FIBRAS SENSITIVAS' title = 'DE FIBRAS SENSITIVAS' />
        <ConclusionButton value = 'DE FIBRAS MIXTAS (SENSITIVO-MOTOTA)' title = 'DE FIBRAS MIXTAS (SENSITIVO-MOTOTA)' />
      </div>
      
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
        INTENSIDAD
      </h1>

      <div onClick={handleNextStep}>
      <ConclusionButton value = 'INTENSIDAD LEVE (NEUROAPRAXIA)' title = 'INTENSIDAD LEVE (NEUROAPRAXIA)' />
      <ConclusionButton value = 'INTENSIDAD MODERADA (AXONOTMESIS INCOMPLETA)' title = 'INTENSIDAD MODERADA (AXONOTMESIS INCOMPLETA)' />
      <ConclusionButton value = 'INTENSIDAD SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title = 'INTENSIDAD SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' />
      </div>

      
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
        REINERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='CON REINERVACIÓN ACTIVA' title='CON REINERVACIÓN ACTIVA' />                
        <ConclusionButton value='SIN REINERVACIÓN ACTIVA' title='SIN REINERVACIÓN ACTIVA' />
      </div>
      
      
    </div>
  );
};

const StepH = ({handlePrevStep, handleNextStep }) => {
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
        PRONOSTICO
      </h1>
      
      <div onClick={handleNextStep}>
        <ConclusionButton value = 'completo' title = 'Y PRONÓSTICO DE RECUPERACIÓN COMPLETO' />
        <ConclusionButton value = 'parcial_funcional' title = 'Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' />
        <ConclusionButton value = 'pobre' title = 'Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' />
        <ConclusionButton value = 'nulo' title = 'Y PRONÓSTICO DE RECUPERACIÓN NULO' /></div>
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