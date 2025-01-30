import { useState } from 'react';
import { Accordion, AccordionContainer, InternalAccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

import { checkDivsBILATERAL } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERAL';

function Reporte({ copyConclusions }) {
  return (
    <div>
      {checkDivsBILATERAL(copyConclusions)}
    </div>
  );
}
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

      {step === 'CDD' && <StepCDD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'CDI' && <StepCDI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'D' && <StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E1' && <StepE1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'F1' && <StepF1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

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
<AccordionContainer>
    <Accordion title='NERVIOS SUPERIORES' value='NERVIOS SUPERIORES' type='external'>
      <div onClick={() => { setSelectedSide('MEDIANO'); setStep('B1'); }}>
        <ConclusionButton value='MEDIANO' title=' DE NERVIO MEDIANO' displayText='MEDIANO' /></div>
      <div onClick={() => { setSelectedSide('INTEROSEOANTERIOR'); setStep('B1'); }}>
        <ConclusionButton value='INTEROSEOANTERIOR' title=' DE NERVIO INTEROSEO ANTERIOR' displayText='INTEROSEO ANTERIOR' /></div>
      <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B1'); }}>
        <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div>
      <div onClick={() => { setSelectedSide('AXILAR'); setStep('B1'); }}>
        <ConclusionButton value='AXILAR' title=' DE NERVIO AXILAR' displayText='AXILAR' /></div>
      <div onClick={() => { setSelectedSide('MUSCULOCUTANEO'); setStep('B1'); }}>
        <ConclusionButton value='MUSCULOCUTANEO' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' /></div>
      <div onClick={() => { setSelectedSide('RADIAL'); setStep('B1'); }}>
        <ConclusionButton value='RADIAL' title=' DE NERVIO RADIAL' displayText='RADIAL' /></div>
      <div onClick={() => { setSelectedSide('RADIAL_SUPERFICIAL'); setStep('B1'); }}>
        <ConclusionButton value='RADIAL_SUPERFICIAL' title=' DE NERVIO RADIAL SUPERFICIAL' displayText='RADIAL SUPERFICIAL' /></div>
      <div onClick={() => { setSelectedSide('INTEROSEO_POSTERIOR'); setStep('B1'); }}>
        <ConclusionButton value='INTEROSEO_POSTERIOR' title=' DE NERVIO INTEROSEO POSTERIOR' displayText='INTEROSEO POSTERIOR' /></div>
      <div onClick={() => { setSelectedSide('SUPRAESCAPULAR'); setStep('B1'); }}>
        <ConclusionButton value='SUPRAESCAPULAR' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' /></div>
      <div onClick={() => { setSelectedSide('ULNAR'); setStep('B1'); }}>
        <ConclusionButton value='ULNAR' title=' DE NERVIO ULNAR' displayText='ULNAR' /></div>
      <div onClick={() => { setSelectedSide('DORSAL_CUTANEO'); setStep('B1'); }}>
        <ConclusionButton value='DORSAL_CUTANEO' title=' DE NERVIO DORSAL CUTANEO' displayText='DORSAL CUTANEO' /></div>
      <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
        <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div>
      <div onClick={() => { setSelectedSide('TORACODORSAL'); setStep('B1'); }}>
        <ConclusionButton value='TORACODORSAL' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' /></div>
      <div onClick={() => { setSelectedSide('TORACICO_LARGO'); setStep('B1'); }}>
        <ConclusionButton value='TORACICO_LARGO' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' /></div>
    </Accordion>
    <Accordion title='NERVIOS INFERIORES' value='NERVIOS INFERIORES' type='external'>
      <div onClick={() => { setSelectedSide('CIATICO'); setStep('B1'); }}>
        <ConclusionButton value='CIATICO' title=' DE NERVIO CIATICO' displayText='CIATICO' /></div>
      <div onClick={() => { setSelectedSide('GLUTEO_INFERIOR'); setStep('B1'); }}>
        <ConclusionButton value='GLUTEO_INFERIOR' title=' DE NERVIO GLUTEO INFERIOR' displayText='GLUTEO INFERIOR' /></div>
      <div onClick={() => { setSelectedSide('GLUTEO_MEDIO'); setStep('B1'); }}>
        <ConclusionButton value='GLUTEO_MEDIO' title=' DE NERVIO GLUTEO SUPERIOR' displayText='GLUTEO SUPERIOR' /></div>
      <div onClick={() => { setSelectedSide('FEMORAL'); setStep('B1'); }}>
        <ConclusionButton value='FEMORAL' title=' DE NERVIO FEMORAL' displayText='FEMORAL' /></div>
      <div onClick={() => { setSelectedSide('SAFENO'); setStep('B1'); }}>
        <ConclusionButton value='SAFENO' title=' DE NERVIO SAFENO' displayText='SAFENO' /></div>
      <div onClick={() => { setSelectedSide('OBTURADOR'); setStep('B1'); }}>
        <ConclusionButton value='OBTURADOR' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' /></div>
      <div onClick={() => { setSelectedSide('NERVIO_PERONEO'); setStep('B1'); }}>
        <ConclusionButton value='NERVIO_PERONEO' title=' DE NERVIO PERONEO' displayText='PERONEO' /></div>
      <div onClick={() => { setSelectedSide('PERONEO_SUPERFICIAL'); setStep('B1'); }}>
        <ConclusionButton value='PERONEO_SUPERFICIAL' title=' DE NERVIO PERONEO SUPERFICIAL' displayText='PERONEO SUPERFICIAL' /></div>
      <div onClick={() => { setSelectedSide('PERONEO_PROFUNDO'); setStep('B1'); }}>
        <ConclusionButton value='PERONEO_PROFUNDO' title=' DE NERVIO PERONEO PROFUNDO' displayText='PERONEO PROFUNDO' /></div>
      <div onClick={() => { setSelectedSide('TIBIAL'); setStep('B1'); }}>
        <ConclusionButton value='TIBIAL' title=' DE NERVIO TIBIAL' displayText='TIBIAL' /></div>
      <div onClick={() => { setSelectedSide('SURAL'); setStep('B1'); }}>
        <ConclusionButton value='SURAL' title=' DE NERVIO SURAL' displayText='SURAL' /></div>
      <div onClick={() => { setSelectedSide('PLANTAR_MEDIAL'); setStep('B1'); }}>
        <ConclusionButton value='PLANTAR_MEDIAL' title=' DE NERVIO PLANTAR MEDIAL' displayText='PLANTAR MEDIAL' /></div>
      <div onClick={() => { setSelectedSide('PLANTAR_LATERAL'); setStep('B1'); }}>
        <ConclusionButton value='PLANTAR_LATERAL' title=' DE NERVIO PLANTAR LATERAL' displayText='PLANTAR LATERAL' /></div>
      <div onClick={() => { setSelectedSide('PUDENDO'); setStep('B1'); }}>
        <ConclusionButton value='PUDENDO' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
    </Accordion>
    </AccordionContainer>
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
    <AccordionContainer>
    <InternalAccordionContainer>
    <Accordion title='BILATERIAL' value={'BILATERAL'} type='internal'>
      <div onClick={() => setStep('CG')}>
        <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} /></div>
      <div onClick={() => setStep('CG')}>
        <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} /></div>
      <div onClick={() => setStep('CG')}>
        <ConclusionButton value='IZQUIERDO' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} /></div>
    </Accordion>
    </InternalAccordionContainer>
    </AccordionContainer>
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
    <div onClick={() => setStep('CDD')}>
      <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL ' displayText={'FOCALIZADA'} /></div>
    <div onClick={() => setStep('CDD')}>
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

const StepCDD = ({ handleNextStep, handlePrevStep, setStep }) => (

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
      SELECCIONAR EL NIVEL DE LESION DEL LADO DERECHO CON EL PUNTERO
    </h1>
    <div onClick={() => setStep('CDI')}>
      <ConclusionButton value='seguir' displayText={'LISTO'} />
    </div>
  </div>
);

const StepCDI = ({ handleNextStep, handlePrevStep, setStep }) => (

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
    SELECCIONAR EL NIVEL DE LESION DEL LADO IZQUIERDO CON EL PUNTERO
    </h1>
    <div onClick={() => setStep('D')}>
      <ConclusionButton value='seguir' displayText={'LISTO'} />
    </div>
  </div>

);
/*
<Accordion title='AXONAL COMPLETA'>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} /></div>


    </Accordion>


    <Accordion title='MIXTA'>
          <div onClick={handleNextStep}>
          <ConclusionButton value='primariamente_desmielinizante_con_perdida_axonal_secundaria' title=' DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,' displayText={'DESMIELINIZANTE-AXONAL'}/>
          <ConclusionButton value='primariamente_axonal_con_desmielinizacion_secundaria' title=' DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,' displayText={'AXONAL-DESMIELINIZANTE'}/>
          </div>
        </Accordion>
*/

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
<AccordionContainer>
    <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type='external'>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} /></div>
    </Accordion>
    </AccordionContainer>
    <AccordionContainer>
    <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type='external'>
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
    </AccordionContainer>
    <AccordionContainer>
    <Accordion title='DESMIELINIZANTE ' value='DESMIELINIZANTE' type='external'>
      <div onClick={() => setStep('E1')}>
        <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} /></div>
      <div onClick={() => setStep('E1')}>
        <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} /></div>
      <div onClick={() => setStep('E1')}>
        <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} /></div>
    </Accordion>
    </AccordionContainer>

    <AccordionContainer>
    <Accordion title='MIXTA' value='MIXTA' type='external'>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA '} /></div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} /></div>
    </Accordion>
    </AccordionContainer>
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
const StepE1 = ({ handleNextStep, handlePrevStep, setStep }) => (

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
    <div onClick={() => setStep('F1')}>
      <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} /></div>
    <div onClick={() => setStep('F1')}>
      <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} /></div>
    <div onClick={() => setStep('F1')}>
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
      <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE '} /></div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA '} /></div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA '} /></div>
  </div>
);
const StepF1 = ({ handlePrevStep, handleNextStep, setStep }) => (

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

    <div onClick={() => setStep('H')}>
      <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE '} /></div>
    <div onClick={() => setStep('H')}>
      <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA '} /></div>
    <div onClick={() => setStep('H')}>
      <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA '} /></div>
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
        <button onClick={handlePrevStep} className={`print-button`} title="Anterior"> 
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`} title="Imprimir">
          <img src="/I_Print.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />

        <label htmlFor="file-upload" className={`print-button`} title="Guardar archivo">
          <img src="/I_Document.svg" style={{ filter: 'invert(1)' }} />
        </label>

        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
                  <DropArea2 isExpanded={expandedDivs[index]} />
                </div>
              </div>
            </DraggableDiv>
          </div>
        ))}


        {[12].map((index) => (
          <div key={index} className={`DivPanel2 ${expandedDivs[index] ? 'DivPanel2-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel3 ${expandedDivs[index] ? 'DivPanel3-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel3 ${expandedDivs[index] ? 'DivPanel3-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel3 ${expandedDivs[index] ? 'DivPanel3-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel3 ${expandedDivs[index] ? 'DivPanel3-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel3 ${expandedDivs[index] ? 'DivPanel3-expanded' : ''}`} >
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
          <div key={index} className={`DivPanel3 ${expandedDivs[index] ? 'DivPanel3-expanded' : ''}`} >
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
//<ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO' />

// <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' />
//<ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' />
export default SimpleMultiStepForm;

