import { useContext, useState } from 'react';
import { ReportContext } from '@/src/context';
import { Accordion, AccordionContainer, InternalAccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';

import './Style.css';

import { checkDivsBILATERAL } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERAL';
import { NerviusButton } from '@/app/components/ReportTemplate/Conclusions/Botton-Nervius';
import { checkDivsSegmentarBilateral } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosSegmenBILATERAL';

function Reporte({ copyConclusions }) {
  return (
    <div>
      {checkDivsBILATERAL(copyConclusions)}
      {checkDivsSegmentarBilateral(copyConclusions)}
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

      {step === 'CGI' && <StepCGI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'CDI' && <StepCDI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'D' && <StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E1' && <StepE1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'F1' && <StepF1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'R' && <StepR handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'I' && <StepI handlePrevStep={handlePrevStep} selectedImages={selectedImages} handleNextStep={handleNextStep} setStep={setStep} handleUndo={handleUndo} handleImageChange={handleImageChange} handlePrint={handlePrint} />}


      {step === 'A2' && <StepA2 handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'B2' && <StepB2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide} />}

      {step === 'B12' && <StepB12 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'C2' && <StepC2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} />}

      {step === 'CL2' && <StepCL2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} />}

      {step === 'CG2' && <StepCG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} />}

      {step === 'CD2' && <StepCD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'CDD2' && <StepCDD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'CGI2' && <StepCGI2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'CDI2' && <StepCDI2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'D2' && <StepD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E2' && <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'E12' && <StepE12 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'F12' && <StepF12 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'F2' && <StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'G2' && <StepG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}

      {step === 'H2' && <StepH2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}


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

const StepB = ({ handleNextStep, handlePrevStep, setStep, setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
    <div>
      <div className='button-bar'>
      <button  onClick={() => {

            removeConclusion('evolucion_aguda');
            removeConclusion('evolucion_subaguda');
            removeConclusion('evolucion_cronica');
            
            removeConclusion('MEDIANO');
            removeConclusion('INTEROSEOANTERIOR');
            removeConclusion('ACCESORIO');
            removeConclusion('AXILAR');
            removeConclusion('MUSCULOCUTANEO');
            removeConclusion('RADIAL');
            removeConclusion('RADIAL_SUPERFICIAL');
            removeConclusion('INTEROSEO_POSTERIOR');
            removeConclusion('SUPRAESCAPULAR');
            removeConclusion('ULNAR');
            removeConclusion('DORSAL_CUTANEO');
            removeConclusion('FRENICO');
            removeConclusion('TORACODORSAL');
            removeConclusion('TORACICO_LARGO');
            removeConclusion('CIATICO');
            removeConclusion('GLUTEO_INFERIOR');
            removeConclusion('GLUTEO_MEDIO');
            removeConclusion('FEMORAL');
            removeConclusion('SAFENO');
            removeConclusion('OBTURADOR');
            removeConclusion('NERVIO_PERONEO');
            removeConclusion('PERONEO_SUPERFICIAL');
            removeConclusion('PERONEO_PROFUNDO');
            removeConclusion('TIBIAL');
            removeConclusion('SURAL');
            removeConclusion('PLANTAR_MEDIAL');
            removeConclusion('PLANTAR_LATERAL');
            removeConclusion('PUDENDO');
            removeConclusion('FACIAL');

            setStep('A')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        NERVIO
      </h1>
  <AccordionContainer>
      <Accordion title='MIEMBROS SUPERIORES' value='NERVIOS SUPERIORES' type='external'>
        <div onClick={() => { setSelectedSide('MEDIANO'); setStep('B1'); }}>
          <ConclusionButton value='MEDIANO' title=' DE NERVIO MEDIANO' displayText='MEDIANO' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEOANTERIOR'); setStep('B1'); }}>
          <ConclusionButton value='INTEROSEOANTERIOR' title=' DE NERVIO INTEROSEO ANTERIOR' displayText='INTEROSEO ANTERIOR' /></div>
        {/* <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B1'); }}>
          <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div> */}
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
        {/* <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
          <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div> */}
        <div onClick={() => { setSelectedSide('TORACODORSAL'); setStep('B1'); }}>
          <ConclusionButton value='TORACODORSAL' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' /></div>
        <div onClick={() => { setSelectedSide('TORACICO_LARGO'); setStep('B1'); }}>
          <ConclusionButton value='TORACICO_LARGO' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' /></div>
      </Accordion>

      <Accordion title='CRANEALES' value='CRANEALES' type='external'>
        <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
            <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div>
        <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B1'); }}>
            <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div>
        <div onClick={() => { setSelectedSide('FACIAL'); setStep('B1'); }}>
            <ConclusionButton value='FACIAL' title=' DE NERVIO FACIAL' displayText='FACIAL' /></div>
      </Accordion>

      <Accordion title='MIEMBROS INFERIORES' value='NERVIOS INFERIORES' type='external'>

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

      </Accordion>

      <Accordion title='SACRO' value='SACRO' type='external'>
        <div onClick={() => { setSelectedSide('CIATICO'); setStep('B1'); }}>
          <ConclusionButton value='CIATICO' title=' DE NERVIO CIATICO' displayText='CIATICO' /></div>
        <div onClick={() => { setSelectedSide('PUDENDO'); setStep('B1'); }}>
          <ConclusionButton value='PUDENDO' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
      </Accordion>
      </AccordionContainer>

    </div>
  );
};

//<ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO' />

// <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' />
//<ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' />

const StepB1 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('IZQUIERDO')
              removeConclusion('DERECHO')
              removeConclusion('BILATERAL')

              // 2) Regresamos 
              setStep('B')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
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
        <div onClick={() => setStep('CGI')}>
          <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} /></div>
        <div onClick={() => setStep('CG')}>
          <ConclusionButton value='IZQUIERDO' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} /></div>
      </Accordion>
      </InternalAccordionContainer>
      </AccordionContainer>
    </div>
  );
};

const StepCG = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_COMPgeneralizada`)

              // 2) Regresamos 
              setStep('B1')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>
      <div onClick={() => setStep('CDD')}>
        <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL ' displayText={'FOCALIZADA '} /></div>
      <div onClick={() => setStep('CDD')}>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} /></div>
      <div onClick={() => setStep('D')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>
    </div>
  );
};




const StepCGI = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('focalizada')
            removeConclusion('segmentaria')
            removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
            removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
            removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
            removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
            removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
            removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
            removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
            removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
            removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
            removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
            removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
            
            removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
            removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
            removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
            removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
            removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
            removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
            removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
            removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
            removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
            removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

            removeConclusion(`${selectedSide}_COMPgeneralizada`)

            // 2) Regresamos 
            setStep('B1')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>
      <div onClick={() => setStep('CDI')}>
        <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL ' displayText={'FOCALIZADA'} /></div>
      <div onClick={() => setStep('CDI')}>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} /></div>
      <div onClick={() => setStep('D')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>
    </div>
  );
};


const StepC = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              // removeConclusion('car', 'cari1', 'car2', 'car3', 'car4', 'car5', 'car6', 'car7', 'car8', 'cari1', 'cari2', 'cari3', 'cari4', 'cari5', 'cari6', 'cari7', 'cari8')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_IZQgeneralizada`)

              // 2) Regresamos 
              setStep('B1')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
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
};

const StepCL = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_DERgeneralizada`)

              // 2) Regresamos 
              setStep('B1')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

      <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
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
};

const StepCD = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledSegm } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('seguir')

              // 2) Regresamos 
              setStep('C')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button
          onClick={() => {
            setButtonsDisabled(true);
            setbuttonsDisabledSegm(true); 
            setStep('D');            
          }}
          className={`print-button`}
        >
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>

      </div> <br></br><br></br><br></br><br></br>
      <h1 className=' text-xs font-bold text-white py-40 text-center'>
        SELECCIONAR EL NIVEL DE LESION CON EL PUNTERO
      </h1>

    </div>
  );
};

const StepCDD = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledBILT, setbuttonsDisabledBITSeg } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('seguir')

              // 2) Regresamos 
              setStep('CG')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button
          onClick={() => {
            setbuttonsDisabledBILT(true); 
            setbuttonsDisabledBITSeg(true); 
            setStep('D');            
          }}
          className={`print-button`}
        >
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>

      </div> <br></br><br></br><br></br><br></br>
      <h1 className=' text-xs font-bold text-white py-40 text-center'>
        SELECCIONAR EL NIVEL DE LESION DEL LADO DERECHO CON EL PUNTERO
      </h1>
      <div onClick={() => setStep('D')}>
        
      </div>
    </div>
  );
};

const StepCDI = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledBILT, setbuttonsDisabledBITSeg } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('seguir')

              // 2) Regresamos 
              setStep('CGI')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button
          onClick={() => {
            
            setbuttonsDisabledBILT(true); 
            setbuttonsDisabledBITSeg(true); 
            setStep('D');             
          }}
          className={`print-button`}
        >
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>

      </div> <br></br><br></br><br></br><br></br>
      <h1 className=' text-xs font-bold text-white py-40 text-center'>
      SELECCIONAR EL NIVEL DE LESION DEL LADO IZQUIERDO CON EL PUNTERO
      </h1>
      <div onClick={() => setStep('D')}>
        
      </div>
    </div>
  );
};
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

const StepD = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
              removeConclusion('SIN DENERVACIÓN ACTIVA');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
              removeConclusion('SIN DENERVACIÓN ACTIVA');
              removeConclusion('RETARDO EN LA CONDUCCIÓN');
              removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN');
              removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN');
              removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA');
              removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA');

              // 2) Regresamos 
              setStep('CD')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
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
};

const StepE = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' MOTORAS ');
              removeConclusion(' SENSITIVAS ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTOTA)');

              // 2) Regresamos 
              setStep('D')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} /></div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} /></div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} /></div>
    </div>
  );
};

const StepE1 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' MOTORAS ');
              removeConclusion(' SENSITIVAS ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTOTA)');

              // 2) Regresamos 
              setStep('D')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={() => setStep('F1')}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} /></div>
      <div onClick={() => setStep('F1')}>
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} /></div>
      <div onClick={() => setStep('F1')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} /></div>
    </div>
  );
};

const StepF = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' LEVE (NEUROAPRAXIA)');
              removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)');
              removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)');

              // 2) Regresamos 
              setStep('E')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={() => setStep('G')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE'} /></div>
      <div onClick={() => setStep('G')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA '} /></div>
      <div onClick={() => setStep('G')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA '} /></div>
    </div>
  );
};

const StepF1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' LEVE (NEUROAPRAXIA)');
              removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)');
              removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)');

              // 2) Regresamos 
              setStep('E1')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE'} /></div>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA '} /></div>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA '} /></div>
    </div>
  );
};

const StepG = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' CON REINERVACIÓN ACTIVA ');
              removeConclusion('  REINERVACIÓN ACTIVA ');

              // 2) Regresamos 
              setStep('F')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
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
};

const StepH = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('completo');
              removeConclusion('parcial_funcional');
              removeConclusion('pobre');
              removeConclusion('nulo');

              // 2) Regresamos 
              setStep('G')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>
      <div onClick={() => setStep('R')}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'} /></div>
      <div onClick={() => setStep('R')}>
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} /></div>
      <div onClick={() => setStep('R')}>
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} /></div>
      <div onClick={() => setStep('R')}>
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA.' displayText={'RECUPERACION NULA'} /></div>
      </div>
        
  );
};

const StepR = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
22

              // 2) Regresamos 
              setStep('H')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-base font-bold text-white pt-40 text-center'>
        DESEAS AGREGAR UN NUEVO NERVIO?
      </h1>
      <div className='text-center pt-5' onClick={() => setStep('A2')}>
      <ConclusionButton value='salto' title='' displayText={'AGREGAR NUEVO'} /></div>  

      <div className='text-center py-10' onClick={() => setStep('I')}>
        <ConclusionButton value='nulo' title=' ' displayText={'FINALIZAR'} /></div>

      </div>
        
  );
};




const StepA2 = ({ handleNextStep, setStep }) => (
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
    <div onClick={() => setStep('B2')}>
      <ConclusionButton value='evolucion_aguda2' title='MONO NEUROPATÍA AGUDA' displayText="MONO NEUROPATÍA AGUDA" /></div>
    <div onClick={() => setStep('B2')}>
      <ConclusionButton value='evolucion_subaguda2' title='MONO NEUROPATÍA SUBAGUDA' displayText="MONO NEUROPATÍA SUBAGUDA" /></div>
    <div onClick={() => setStep('B2')}>
      <ConclusionButton value='evolucion_cronica2' title='MONO NEUROPATÍA CRÓNICA ' displayText="MONO NEUROPATÍA CRÓNICA" />
    </div>
    <div className='my-2 flex justify-end items-center'>
    </div>
  </div>

);

const StepB2 = ({ handleNextStep, handlePrevStep, setStep, setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
    <div>
      <div className='button-bar'>
      <button  onClick={() => {

        removeConclusion('evolucion_aguda2');
        removeConclusion('evolucion_subaguda2');
        removeConclusion('evolucion_cronica2');
        removeConclusion('MEDIANO2');
        removeConclusion('INTEROSEOANTERIOR2');
        removeConclusion('ACCESORIO2');
        removeConclusion('AXILAR2');
        removeConclusion('MUSCULOCUTANEO2');
        removeConclusion('RADIAL2');
        removeConclusion('RADIAL_SUPERFICIAL2');
        removeConclusion('INTEROSEO_POSTERIOR2');
        removeConclusion('SUPRAESCAPULAR2');
        removeConclusion('ULNAR2');
        removeConclusion('DORSAL_CUTANEO2');
        removeConclusion('FRENICO2');
        removeConclusion('TORACODORSAL2');
        removeConclusion('TORACICO_LARGO2');
        removeConclusion('CIATICO2');
        removeConclusion('GLUTEO_INFERIOR2');
        removeConclusion('GLUTEO_MEDIO2');
        removeConclusion('FEMORAL2');
        removeConclusion('SAFENO2');
        removeConclusion('OBTURADOR2');
        removeConclusion('NERVIO_PERONEO2');
        removeConclusion('PERONEO_SUPERFICIAL2');
        removeConclusion('PERONEO_PROFUNDO2');
        removeConclusion('TIBIAL2');
        removeConclusion('SURAL2');
        removeConclusion('PLANTAR_MEDIAL2');
        removeConclusion('PLANTAR_LATERAL2');
        removeConclusion('PUDENDO2');
        removeConclusion('FACIAL2');

            setStep('A2')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        NERVIO
      </h1>
  <AccordionContainer>
      <Accordion title='MIEMBROS SUPERIORES' value='NERVIOS SUPERIORES2' type='external'>
        <div onClick={() => { setSelectedSide('MEDIANO2'); setStep('B12'); }}>
          <ConclusionButton value='MEDIANO2' title=' DE NERVIO MEDIANO' displayText='MEDIANO' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEOANTERIOR2'); setStep('B12'); }}>
          <ConclusionButton value='INTEROSEOANTERIOR2' title=' DE NERVIO INTEROSEO ANTERIOR' displayText='INTEROSEO ANTERIOR' /></div>
        {/* <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B12'); }}>
          <ConclusionButton value='ACCESORIO2' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div> */}
        <div onClick={() => { setSelectedSide('AXILAR2'); setStep('B12'); }}>
          <ConclusionButton value='AXILAR2' title=' DE NERVIO AXILAR' displayText='AXILAR' /></div>
        <div onClick={() => { setSelectedSide('MUSCULOCUTANEO2'); setStep('B12'); }}>
          <ConclusionButton value='MUSCULOCUTANEO2' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' /></div>
        <div onClick={() => { setSelectedSide('RADIAL2'); setStep('B12'); }}>
          <ConclusionButton value='RADIAL2' title=' DE NERVIO RADIAL' displayText='RADIAL' /></div>
        <div onClick={() => { setSelectedSide('RADIAL_SUPERFICIAL2'); setStep('B12'); }}>
          <ConclusionButton value='RADIAL_SUPERFICIAL2' title=' DE NERVIO RADIAL SUPERFICIAL' displayText='RADIAL SUPERFICIAL' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEO_POSTERIOR2'); setStep('B12'); }}>
          <ConclusionButton value='INTEROSEO_POSTERIOR2' title=' DE NERVIO INTEROSEO POSTERIOR' displayText='INTEROSEO POSTERIOR' /></div>
        <div onClick={() => { setSelectedSide('SUPRAESCAPULAR2'); setStep('B12'); }}>
          <ConclusionButton value='SUPRAESCAPULAR2' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' /></div>
        <div onClick={() => { setSelectedSide('ULNAR2'); setStep('B12'); }}>
          <ConclusionButton value='ULNAR2' title=' DE NERVIO ULNAR' displayText='ULNAR' /></div>
        <div onClick={() => { setSelectedSide('DORSAL_CUTANEO2'); setStep('B12'); }}>
          <ConclusionButton value='DORSAL_CUTANEO2' title=' DE NERVIO DORSAL CUTANEO' displayText='DORSAL CUTANEO' /></div>
        {/* <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
          <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div> */}
        <div onClick={() => { setSelectedSide('TORACODORSAL2'); setStep('B12'); }}>
          <ConclusionButton value='TORACODORSAL2' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' /></div>
        <div onClick={() => { setSelectedSide('TORACICO_LARGO2'); setStep('B12'); }}>
          <ConclusionButton value='TORACICO_LARGO2' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' /></div>
      </Accordion>

      <Accordion title='CRANEALES' value='CRANEALES2' type='external'>
        <div onClick={() => { setSelectedSide('FRENICO2'); setStep('B12'); }}>
          <ConclusionButton value='FRENICO2' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div>
        <div onClick={() => { setSelectedSide('ACCESORIO2'); setStep('B12'); }}>
          <ConclusionButton value='ACCESORIO2' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div>
        <div onClick={() => { setSelectedSide('FACIAL2'); setStep('B12'); }}>
            <ConclusionButton value='FACIAL2' title=' DE NERVIO FACIAL' displayText='FACIAL' /></div>
      </Accordion>

      <Accordion title='MIEMBROS INFERIORES' value='NERVIOS INFERIORES2' type='external'>
        <div onClick={() => { setSelectedSide('CIATICO2'); setStep('B12'); }}>
          <ConclusionButton value='CIATICO2' title=' DE NERVIO CIATICO' displayText='CIATICO' /></div>
        <div onClick={() => { setSelectedSide('GLUTEO_INFERIOR'); setStep('B12'); }}>
          <ConclusionButton value='GLUTEO_INFERIOR2' title=' DE NERVIO GLUTEO INFERIOR' displayText='GLUTEO INFERIOR' /></div>
        <div onClick={() => { setSelectedSide('GLUTEO_MEDIO2'); setStep('B12'); }}>
          <ConclusionButton value='GLUTEO_MEDIO2' title=' DE NERVIO GLUTEO SUPERIOR' displayText='GLUTEO SUPERIOR' /></div>
        <div onClick={() => { setSelectedSide('FEMORAL2'); setStep('B12'); }}>
          <ConclusionButton value='FEMORAL2' title=' DE NERVIO FEMORAL' displayText='FEMORAL' /></div>
        <div onClick={() => { setSelectedSide('SAFENO2'); setStep('B12'); }}>
          <ConclusionButton value='SAFENO2' title=' DE NERVIO SAFENO' displayText='SAFENO' /></div>
        <div onClick={() => { setSelectedSide('OBTURADOR2'); setStep('B12'); }}>
          <ConclusionButton value='OBTURADOR2' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' /></div>
        <div onClick={() => { setSelectedSide('NERVIO_PERONEO2'); setStep('B12'); }}>
          <ConclusionButton value='NERVIO_PERONEO2' title=' DE NERVIO PERONEO' displayText='PERONEO' /></div>
        <div onClick={() => { setSelectedSide('PERONEO_SUPERFICIAL2'); setStep('B12'); }}>
          <ConclusionButton value='PERONEO_SUPERFICIAL2' title=' DE NERVIO PERONEO SUPERFICIAL' displayText='PERONEO SUPERFICIAL' /></div>
        <div onClick={() => { setSelectedSide('PERONEO_PROFUNDO2'); setStep('B12'); }}>
          <ConclusionButton value='PERONEO_PROFUNDO2' title=' DE NERVIO PERONEO PROFUNDO' displayText='PERONEO PROFUNDO' /></div>
        <div onClick={() => { setSelectedSide('TIBIAL2'); setStep('B12'); }}>
          <ConclusionButton value='TIBIAL2' title=' DE NERVIO TIBIAL' displayText='TIBIAL' /></div>
        <div onClick={() => { setSelectedSide('SURAL2'); setStep('B12'); }}>
          <ConclusionButton value='SURAL2' title=' DE NERVIO SURAL' displayText='SURAL' /></div>
        <div onClick={() => { setSelectedSide('PLANTAR_MEDIAL2'); setStep('B12'); }}>
          <ConclusionButton value='PLANTAR_MEDIAL2' title=' DE NERVIO PLANTAR MEDIAL' displayText='PLANTAR MEDIAL' /></div>
        <div onClick={() => { setSelectedSide('PLANTAR_LATERAL2'); setStep('B12'); }}>
          <ConclusionButton value='PLANTAR_LATERAL2' title=' DE NERVIO PLANTAR LATERAL' displayText='PLANTAR LATERAL' /></div>
        <div onClick={() => { setSelectedSide('PUDENDO2'); setStep('B12'); }}>
          <ConclusionButton value='PUDENDO2' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
      </Accordion>

      <Accordion title='SACRO' value='SACRO2' type='external'>
        <div onClick={() => { setSelectedSide('CIATICO2'); setStep('B12'); }}>
          <ConclusionButton value='CIATICO2' title=' DE NERVIO CIATICO' displayText='CIATICO' /></div>
        <div onClick={() => { setSelectedSide('PUDENDO2'); setStep('B12'); }}>
          <ConclusionButton value='PUDENDO2' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

//<ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO' />

// <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' />
//<ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' />

const StepB12 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('IZQUIERDO2')
              removeConclusion('DERECHO2')
              removeConclusion('BILATERAL2')

              // 2) Regresamos 
              setStep('B2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        LADO
      </h1>
      <div onClick={() => setStep('C2')}>
        <ConclusionButton value='IZQUIERDO2' title=' IZQUIERDO,' displayText='IZQUIERDO' /></div>
      <div onClick={() => setStep('CL2')}>
        <ConclusionButton value='DERECHO2' title=' DERECHO,' displayText='DERECHO' /></div>
      <AccordionContainer>
      <InternalAccordionContainer>
      <Accordion title='BILATERIAL' value={'BILATERAL'} type='internal'>
        <div onClick={() => setStep('CG2')}>
          <ConclusionButton value='IZQUIERDO2' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} /></div>
        <div onClick={() => setStep('CGI2')}>
          <ConclusionButton value='IZQUIERDO2' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} /></div>
        <div onClick={() => setStep('CG2')}>
          <ConclusionButton value='IZQUIERDO2' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} /></div>
      </Accordion>
      </InternalAccordionContainer>
      </AccordionContainer>
    </div>
  );
};

const StepCG2 = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('focalizada2')
              removeConclusion('segmentaria2')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_COMPgeneralizada2`)

              // 2) Regresamos 
              setStep('B12')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>
      <div onClick={() => setStep('CDD2')}>
        <ConclusionButton value='focalizada2' title=' FOCAL A NIVEL ' displayText={'FOCALIZADA '} /></div>
      <div onClick={() => setStep('CDD2')}>
        <ConclusionButton value='segmentaria2' title=' DEL SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} /></div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada2`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>
    </div>
  );
};




const StepCGI2 = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('focalizada2')
            removeConclusion('segmentaria2')
            removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
            removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
            removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
            removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
            removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
            removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
            removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
            removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
            removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
            removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
            removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
            
            removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
            removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
            removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
            removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
            removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
            removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
            removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
            removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
            removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
            removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

            removeConclusion(`${selectedSide}_COMPgeneralizada2`)

            // 2) Regresamos 
            setStep('B12')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>
      <div onClick={() => setStep('CDI2')}>
        <ConclusionButton value='focalizada2' title=' FOCAL A NIVEL ' displayText={'FOCALIZADA '} /></div>
      <div onClick={() => setStep('CDI2')}>
        <ConclusionButton value='segmentaria2' title=' DEL SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} /></div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>
    </div>
  );
};


const StepC2 = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('focalizada2')
              removeConclusion('segmentaria2')
              // removeConclusion('car', 'cari1', 'car2', 'car3', 'car4', 'car5', 'car6', 'car7', 'car8', 'cari1', 'cari2', 'cari3', 'cari4', 'cari5', 'cari6', 'cari7', 'cari8')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_IZQgeneralizada2`)

              // 2) Regresamos 
              setStep('B12')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='focalizada2' title=' FOCAL A NIVEL ' displayText={'FOCALIZADA'} /></div>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='segmentaria2' title=' DEL SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} /></div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_IZQgeneralizada2`} title=' GENERALIZADA, ' displayText={'GENERALIZADA'} /></div>
    </div>
  );
};

const StepCL2 = ({ handleNextStep, handlePrevStep, setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('focalizada2')
              removeConclusion('segmentaria2')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_DERgeneralizada2`)

              // 2) Regresamos 
              setStep('B12')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

      <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>

      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='focalizada2' title=' FOCAL A NIVEL ' displayText={'FOCALIZADA'} /></div>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='segmentaria2' title=' DEL SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} /></div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_DERgeneralizada2`} title=' GENERALIZADA, ' displayText='GENERALIZADA' /></div>

    </div>

  );
};

const StepCD2 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion, setButtonsDisabled2, setbuttonsDisabledSegm2 } = useContext(ReportContext);


  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('seguir2')

              // 2) Regresamos 
              setStep('C2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>


        <button
          onClick={() => {
            setButtonsDisabled2(true); // 🔒 Desactiva los NerviusButton
            setbuttonsDisabledSegm2(true);
            setStep('D2');            // ➡️ Avanza de paso
          }}
          className={`print-button`}
        >
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>

      </div> <br></br><br></br><br></br><br></br>
      <h1 className=' text-xs font-bold text-white py-40 text-center'>
        SELECCIONAR EL NIVEL DE LESION CON EL PUNTERO 
      </h1>
      <div onClick={() => setStep('D2')}>
        
      </div>
    </div>
  );
};

const StepCDD2 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledBILT2,setbuttonsDisabledBITSeg2 } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('seguir2')

              // 2) Regresamos 
              setStep('CG2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button
          onClick={() => {
            
            setbuttonsDisabledBILT2(true); 
            setbuttonsDisabledBITSeg2(true); 
            setStep('D2');            
          }}
          className={`print-button`}
        >
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>

      </div> <br></br><br></br><br></br><br></br>
      <h1 className=' text-xs font-bold text-white py-40 text-center'>
        SELECCIONAR EL NIVEL DE LESION DEL LADO DERECHO CON EL PUNTERO 
      </h1>
      <div onClick={() => setStep('D2')}>
        
      </div>
    </div>
  );
};

const StepCDI2 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion, setButtonsDisabled } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('seguir2')

              // 2) Regresamos 
              setStep('CGI2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button
          onClick={() => {
            setbuttonsDisabledBILT2(true); 
            setbuttonsDisabledBITSeg2(true); 
            setStep('D2');            
          }}
          className={`print-button`}
        >
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>

      </div> <br></br><br></br><br></br><br></br>
      <h1 className=' text-xs font-bold text-white py-40 text-center'>
      SELECCIONAR EL NIVEL DE LESION DEL LADO IZQUIERDO CON EL PUNTERO
      </h1>
      <div onClick={() => setStep('D2')}>
        
      </div>
    </div>
  );
};


const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
              removeConclusion('SIN DENERVACIÓN ACTIVA2');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
              removeConclusion('SIN DENERVACIÓN ACTIVA2');
              removeConclusion('RETARDO EN LA CONDUCCIÓN2');
              removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN2');
              removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN2');
              removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA2');
              removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA2');

              // 2) Regresamos 
              setStep('CD2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TIPO
      </h1>
  <AccordionContainer>
      <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA2' type='external'>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)2' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)2' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)2' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)2' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F2')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA2' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA2' type='external'>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)2' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)2' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)2' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)2' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F2')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA2' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='DESMIELINIZANTE ' value='DESMIELINIZANTE2' type='external'>
        <div onClick={() => setStep('E12')}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN 2' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} /></div>
        <div onClick={() => setStep('E12')}>
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN2' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} /></div>
        <div onClick={() => setStep('E12')}>
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN2' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} /></div>
      </Accordion>
      </AccordionContainer>

      <AccordionContainer>
      <Accordion title='MIXTA' value='MIXTA' type='external'>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA2' title=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA '} /></div>
        <div onClick={() => setStep('E2')}>
          <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA2' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepE2 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' MOTORAS2 ');
              removeConclusion(' SENSITIVAS2 ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTOTA)2');

              // 2) Regresamos 
              setStep('D2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={() => setStep('F2')}>
        <ConclusionButton value=' MOTORAS2' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} /></div>
      <div onClick={() => setStep('F2')}>
        <ConclusionButton value=' SENSITIVAS2' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} /></div>
      <div onClick={() => setStep('F2')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)2' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} /></div>
    </div>
  );
};

const StepE12 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' MOTORAS2 ');
              removeConclusion(' SENSITIVAS2 ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTOTA)2');

              // 2) Regresamos 
              setStep('D')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={() => setStep('F12')}>
        <ConclusionButton value=' MOTORAS2' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} /></div>
      <div onClick={() => setStep('F12')}>
        <ConclusionButton value=' SENSITIVAS2' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} /></div>
      <div onClick={() => setStep('F12')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)2' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} /></div>
    </div>
  );
};

const StepF2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' LEVE (NEUROAPRAXIA)2');
              removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)2');
              removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2');

              // 2) Regresamos 
              setStep('E2')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={() => setStep('G2')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)2' title='INTENSIDAD LEVE ' displayText={' LEVE'} /></div>
      <div onClick={() => setStep('G2')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)2' title='INTENSIDAD MODERADA ' displayText={' MODERADA '} /></div>
      <div onClick={() => setStep('G2')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2' title='INTENSIDAD SEVERA ' displayText={' SEVERA '} /></div>
    </div>
  );
};

const StepF12 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' LEVE (NEUROAPRAXIA)2');
              removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)2');
              removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2');

              // 2) Regresamos 
              setStep('E12')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)2' title='INTENSIDAD LEVE ' displayText={' LEVE'} /></div>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)2' title='INTENSIDAD MODERADA ' displayText={' MODERADA '} /></div>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2' title='INTENSIDAD SEVERA ' displayText={' SEVERA '} /></div>
    </div>
  );
};

const StepG2 = ({ handleNextStep, handlePrevStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion(' CON REINERVACIÓN ACTIVA2 ');
              removeConclusion('  REINERVACIÓN ACTIVA2 ');

              // 2) Regresamos 
              setStep('F')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA2' title=' CON REINERVACIÓN ACTIVA ' /></div>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value='  REINERVACIÓN ACTIVA2' title=' SIN REINERVACIÓN ACTIVA ' /></div>
    </div>
  );
};

const StepH2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
              // 1) Quitamos las conclusiones que StepA pudo haber agregado
              removeConclusion('completo2');
              removeConclusion('parcial_funcional2');
              removeConclusion('pobre2');
              removeConclusion('nulo2');

              // 2) Regresamos 
              setStep('G')
            }} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='completo2' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'} /></div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='parcial_funcional2' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} /></div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='pobre2' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} /></div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='nulo2' title='Y PRONÓSTICO DE RECUPERACIÓN NULA.' displayText={'RECUPERACION NULA'} /></div>
      </div>
        
  );
};



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



const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint, setStep }) => {

  const [expandedDivs, setExpandedDivs] = useState({}); // Estado para manejar el tamaño de cada div

  const [imageSrc, setImageSrc] = useState(null);
  const [isUploadAllowed, setIsUploadAllowed] = useState(false); // Estado para controlar si la carga está permitida
  const { removeConclusion } = useContext(ReportContext)

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
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion(' ');


            // 2) Regresamos 
            setStep('H')
          }} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
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

