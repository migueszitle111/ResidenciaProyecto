import React, { useState } from 'react';
import Draggable from 'react-draggable';

import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

// Numero de pasos 
//const stepsArray = ['A', 'B', 'B1', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {
  const [step, setStep] = useState('A');
  const [selectedSide, setSelectedSide] = useState('');

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
      {/* Metodos que toman cada paso*/}
      {step === 'A' && <StepA handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'B' && <StepB handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide} />}

      {step === 'B1' && <StepB1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'C' && <StepC handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} />}

      {step === 'CL' && <StepCL handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} />}

      {step === 'CG' && <StepCG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} />}

      {step === 'CD' && <StepCD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'D' && <StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'I' && <StepI handlePrevStep={handlePrevStep} selectedImages={selectedImages} handleUndo={handleUndo} handleImageChange={handleImageChange} handlePrint={handlePrint} />}

    </div>
  );

};
/*     {step === 'G' ? ( <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} /> ) : null}  */
///////////////// Menu de cada paso /////////////////

const StepA = ({ handleNextStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handleNextStep} className="print-button">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      EVOLUCION
    </h1>
    <div onClick={handleNextStep}>
    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value='evolucion_aguda' title='MONO NEUROPATÍA AGUDA' displayText="MONO NEUROPATÍA AGUDA" /></div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value='evolucion_subaguda' title='MONO NEUROPATÍA SUBAGUDA' displayText="MONO NEUROPATÍA SUBAGUDA" /></div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value='evolucion_cronica' title='MONO NEUROPATÍA CRÓNICA ' displayText="MONO NEUROPATÍA CRÓNICA" />
    </div>

    <div className='my-2 flex justify-end items-center'>
    </div>
  </div>

);

const StepB = ({ handleNextStep, handlePrevStep, setStep, setSelectedSide }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      NERVIO
    </h1>

    <Accordion title='NERVIOS SUPERIORES'>
      <div onClick={() => { setSelectedSide('MEDIANO'); setStep('B1'); }}>
        <ConclusionButton value='MEDIANO' title=' DE NERVIO MEDIANO' displayText='MEDIANO' /></div>
      <div onClick={() => { setSelectedSide('INTEROSEO ANTERIOR'); setStep('B1'); }}>
        <ConclusionButton value='INTEROSEO_ANTERIOR' title=' DE NERVIO INTEROSEO ANTERIOR' displayText='INTEROSEO ANTERIOR' /></div>
      <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B1'); }}>
        <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div>
      <div onClick={() => { setSelectedSide('AXILAR'); setStep('B1'); }}>
        <ConclusionButton value='AXILAR' title=' DE NERVIO AXILAR' displayText='AXILAR' /></div>
      <div onClick={() => { setSelectedSide('MUSCULOCUTANEO'); setStep('B1'); }}>
        <ConclusionButton value='MUSCULOCUTANEO' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' /></div>
      <div onClick={() => { setSelectedSide('RADIAL'); setStep('B1'); }}>
        <ConclusionButton value='RADIAL' title=' DE NERVIO RADIAL' displayText='RADIAL' /></div>
      <div onClick={() => { setSelectedSide('RADIAL SUPERFICIAL'); setStep('B1'); }}>
        <ConclusionButton value='RADIAL_SUPERFICIAL' title=' DE NERVIO RADIAL SUPERFICIAL' displayText='RADIAL SUPERFICIAL' /></div>
      <div onClick={() => { setSelectedSide('INTEROSEO POSTERIOR'); setStep('B1'); }}>
        <ConclusionButton value='INTEROSEO_POSTERIOR' title=' DE NERVIO INTEROSEO POSTERIOR' displayText='INTEROSEO POSTERIOR' /></div>
      <div onClick={() => { setSelectedSide('SUPRAESCAPULAR'); setStep('B1'); }}>
        <ConclusionButton value='SUPRAESCAPULAR' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' /></div>
      <div onClick={() => { setSelectedSide('ULNAR'); setStep('B1'); }}>
        <ConclusionButton value='ULNAR' title=' DE NERVIO ULNAR' displayText='ULNAR' /></div>
      <div onClick={() => { setSelectedSide('DORSAL CUTANEO'); setStep('B1'); }}>
        <ConclusionButton value='DORSAL_CUTANEO' title=' DE NERVIO DORSAL CUTANEO' displayText='DORSAL CUTANEO' /></div>
      <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
        <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div>

      <div onClick={() => { setSelectedSide('TORACODORSAL'); setStep('B1'); }}>
        <ConclusionButton value='TORACODORSAL' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' /></div>
      <div onClick={() => { setSelectedSide('TORACICO_LARGO'); setStep('B1'); }}>
        <ConclusionButton value='TORACICO_LARGO' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' /></div>

    </Accordion>

    <Accordion title='NERVIOS INFERIORES'>
      <div onClick={() => { setSelectedSide('CIATICO'); setStep('B1'); }}>
        <ConclusionButton value='CIATICO' title=' DE NERVIO CIATICO' displayText='CIATICO' /></div>
      <div onClick={() => { setSelectedSide('GLUTEO INFERIOR'); setStep('B1'); }}>
        <ConclusionButton value='GLUTEO_INFERIOR' title=' DE NERVIO GLUTEO INFERIOR' displayText='GLUTEO INFERIOR' /></div>
      <div onClick={() => { setSelectedSide('GLUTEO MEDIO'); setStep('B1'); }}>
        <ConclusionButton value='GLUTEO_MEDIO' title=' DE NERVIO GLUTEO SUPERIOR' displayText='GLUTEO SUPERIOR' /></div>
      <div onClick={() => { setSelectedSide('FEMORAL'); setStep('B1'); }}>
        <ConclusionButton value='FEMORAL' title=' DE NERVIO FEMORAL' displayText='FEMORAL' /></div>
      <div onClick={() => { setSelectedSide('SAFENO'); setStep('B1'); }}>
        <ConclusionButton value='SAFENO' title=' DE NERVIO SAFENO' displayText='SAFENO' /></div>
      <div onClick={() => { setSelectedSide('OBTURADOR'); setStep('B1'); }}>
        <ConclusionButton value='OBTURADOR' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' /></div>
      <div onClick={() => { setSelectedSide('NERVIO_PERONEO'); setStep('B1'); }}>
        <ConclusionButton value='NERVIO_PERONEO' title=' DE NERVIO PERONEO' displayText='PERONEO' /></div>
      <div onClick={() => { setSelectedSide('PERONEO SUPERFICIAL'); setStep('B1'); }}>
        <ConclusionButton value='PERONEO_SUPERFICIAL' title=' DE NERVIO PERONEO SUPERFICIAL' displayText='PERONEO SUPERFICIAL' /></div>
      <div onClick={() => { setSelectedSide('PERONEO PROFUNDO'); setStep('B1'); }}>
        <ConclusionButton value='PERONEO_PROFUNDO' title=' DE NERVIO PERONEO PROFUNDO' displayText='PERONEO PROFUNDO' /></div>
      <div onClick={() => { setSelectedSide('TIBIAL'); setStep('B1'); }}>
        <ConclusionButton value='TIBIAL' title=' DE NERVIO TIBIAL' displayText='TIBIAL' /></div>
      <div onClick={() => { setSelectedSide('SURAL'); setStep('B1'); }}>
        <ConclusionButton value='SURAL' title=' DE NERVIO SURAL' displayText='SURAL' /></div>
      <div onClick={() => { setSelectedSide('PLANTAR MEDIAL'); setStep('B1'); }}>
        <ConclusionButton value='PLANTAR_MEDIAL' title=' DE NERVIO PLANTAR MEDIAL' displayText='PLANTAR MEDIAL' /></div>
      <div onClick={() => { setSelectedSide('PLANTAR LATERAL'); setStep('B1'); }}>
        <ConclusionButton value='PLANTAR_LATERAL' title=' DE NERVIO PLANTAR LATERAL' displayText='PLANTAR LATERAL' /></div>
      <div onClick={() => { setSelectedSide('PUDENDO'); setStep('B1'); }}>
        <ConclusionButton value='PUDENDO' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
    </Accordion>


    <div onClick={() => { setSelectedSide('FACIAL'); setStep('B1'); }}>
      <ConclusionButton value='FACIAL' title=' DE NERVIO FACIAL' displayText='FACIAL' /></div>

  </div>

);

//<ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO' />

// <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' />
//<ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' />

const StepB1 = ({ handleNextStep, handlePrevStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      LADO
    </h1>

    <div onClick={() => setStep('C')}>
      <ConclusionButton value='IZQUIERDO' title=' IZQUIERDO,' displayText='IZQUIERDO' /></div>
    <div onClick={() => setStep('CL')}>
      <ConclusionButton value='DERECHO' title=' DERECHO,' displayText='DERECHO' /></div>

    <Accordion title='BILATERIAL'>
      <div onClick={() => setStep('CG')}>
        <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} /></div>
      <div onClick={() => setStep('CG')}>
        <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} /></div>
      <div onClick={() => setStep('CG')}>
        <ConclusionButton value='IZQUIERDO' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} /></div>

    </Accordion>
  </div>

);
const StepCG = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      UBICACION
    </h1>

    <div onClick={() => setStep('CD')}>
      <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL ' displayText={'FOCALIZADA'} /></div>
    <div onClick={() => setStep('CD')}>
      <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} /></div>


    <div onClick={() => setStep('D')}>
      <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>

  </div>

);


const StepC = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      UBICACION
    </h1>

    <div onClick={() => setStep('CD')}>
      <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL ' displayText={'FOCALIZADA'} /></div>
    <div onClick={() => setStep('CD')}>
      <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} /></div>


    <div onClick={() => setStep('D')}>
      <ConclusionButton value={`${selectedSide}_IZQgeneralizada`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>

  </div>

);

const StepCL = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      UBICACION
    </h1>

    <div onClick={() => setStep('CD')}>
      <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL ' displayText={'FOCALIZADA'} /></div>
    <div onClick={() => setStep('CD')}>
      <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} /></div>


    <div onClick={() => setStep('D')}>
      <ConclusionButton value={`${selectedSide}_DERgeneralizada`} title=' GENERALIZADA, ' displayText='GENERALIZADA' /></div>

  </div>

);




const StepCD = ({ handleNextStep, handlePrevStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div> <br></br><br></br><br></br><br></br>
    <h1 className=' text-xl font-bold text-white '>
      SELECCIONAR EL NIVEL DE LESION CON EL PUNTERO
    </h1>

    <div onClick={() => setStep('D')}>
      <ConclusionButton value='seguir' displayText={'LISTO'} />
    </div>

  </div>

);


const StepD = ({ handlePrevStep, handleNextStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      TIPO
    </h1>

    <div onClick={() => setStep('E')}>
      <ConclusionButton value='AXONAL COMPLETA ' title=' TIPO AXONAL COMPLETA ' displayText={'AXONAL COMPLETA'} /></div>
    

      

    <Accordion title='DESMIELINIZANTE '>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} /></div>

    </Accordion>
    <Accordion title='AXONAL INCOMPLETA'>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} /></div>


     </Accordion>

    
    <div onClick={() => setStep('E')}>
      <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA '} /></div>
      <div onClick={() => setStep('E')}>
      <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} /></div>
  </div>

);

const StepE = ({ handleNextStep, handlePrevStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      FIBRAS
    </h1>
    <div onClick={() => setStep('F')}>
      <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} /></div>
    <div onClick={() => setStep('F')}>
      <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} /></div>
    <div onClick={() => setStep('F')}>
      <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} /></div>
  </div>
);

const StepF = ({ handlePrevStep, handleNextStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      INTENSIDAD
    </h1>

    <div onClick={() => setStep('G')}>
      <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} /></div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} /></div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} /></div>
  </div>
);

const StepG = ({ handleNextStep, handlePrevStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      REINERVACIÓN
    </h1>

    <div onClick={() => setStep('H')}>
      <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' /></div>
    <div onClick={() => setStep('H')}>
      <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' /></div>

  </div>

);

const StepH = ({ handlePrevStep, handleNextStep, setStep }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className=' text-xl font-bold text-white'>
      PRONOSTICO
    </h1>

    <div onClick={() => setStep('I')}>
      <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} /></div>
    <div onClick={() => setStep('I')}>
      <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} /></div>
    <div onClick={() => setStep('I')}>
      <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} /></div>
    <div onClick={() => setStep('I')}>
      <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div></div>


);

const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => (

  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} className={`print-button`}>
        <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={handlePrint} className={`print-button`}>
        <img src="/I_Print.svg" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={handleUndo} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
      </button>

      <label htmlFor="file-upload" className={`print-button`}>
        <img src="/I_Folder.svg" style={{ filter: 'invert(1)' }} />
      </label>

      <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
    </div>

    <Draggable>
      <div className='imagen'>
        <img src="/assets/Simbolos/S_Circulo 1.png" width="175" height="175" alt="Circulo 1" />
      </div>
    </Draggable>
    <Draggable>
      <div className='imagen'>
        <img src="/assets/Simbolos/S_Circulo 2.png" width="175" height="175" alt="Circulo 2" />
      </div>
    </Draggable>
    <Draggable>
      <div className='imagen'>
        <img src="/assets/Simbolos/S_Circulo 3.png" width="175" height="175" alt="Circulo 3" />
      </div>
    </Draggable>

  </div>

);
//<ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO' />

// <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' />
//<ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' />
export default SimpleMultiStepForm;



