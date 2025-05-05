import { useState,useContext} from 'react';
import {Accordion,AccordionContainer,InternalAccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useSession } from "next-auth/react";
import { useImageState } from '../../MetodosBotones';
import { ReportContext,DropContext } from '@/src/context'
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import './Style.css';

import { Inter } from 'next/font/google';
const stepsArray = ['A', 'B1', 'B2'];
// Componente principal
const SimpleMultiStepForm = ({ showStepNumber,conclusionDivRef, elementRef, droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs }) => {
  const [step, setStep] = useState('A'); // Inicia en A (nuevo)
  const [selectedSide, setSelectedSide] = useState('');
  // Métodos del último paso (StepH)
  const {selectedImages, history, handleUndo, handlePrint } = useImageState();

  // Botón "Siguiente"
  const handleNextStep = () => {
    const currentIndex = stepsArray.indexOf(step);
    if (currentIndex < stepsArray.length - 1) {
      setStep(stepsArray[currentIndex + 1]);
    }
  };
  // Botón "Anterior"
  const handlePrevStep = () => {
    const currentIndex = stepsArray.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepsArray[currentIndex - 1]);
    }
  };
  return (
    <div>
      {/* Renderizado condicional de cada paso */}
      {/* StepA (nuevo), que antes era StepF */}
      {step === 'A' && (<StepA handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} /> )}
      {step === 'B1' && (<StepB1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}/> )}
      {step === 'C1' && ( <StepC1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
      {/* {step === 'C2' && (<StepC2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)} */}
      {step === 'D1' && (<StepD1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'D2' && ( <StepD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'E1' && ( <StepE1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'E2' && ( <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'F1' && (<StepF1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide} />)}
      {step === 'F2' && (<StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
      {step === 'F3' && (<StepF3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide}   />)}
      {step === 'F4' && (<StepF4 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide} />)}
      {step === 'G1' && (<StepG1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G2' && (<StepG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G3' && (<StepG3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'H1' && (<StepH1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>)}
      {step === 'H2' && (<StepH2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>)}
      {step === 'H3' && (<StepH3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>)}
      {step === 'H4' && (<StepH4 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} />)}
      {/*Inferiores */}
      {step === 'B2' && (<StepB2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}/>)}
      {step === 'C1_i' && (<StepC1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
      {/* {step === 'C2_i' && (<StepC2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)} */}
      {step === 'D1_i' && (<StepD1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'D2_i' && (<StepD2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'E1_i' && (<StepE1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'E2_i' && (<StepE2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'F1_i' && (<StepF1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide} />)}
      {step === 'F2_i' && (<StepF2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
      {step === 'F3_i' && (<StepF3_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide}   />)}
      {step === 'F4_i' && (<StepF4_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
      {step === 'G1_i' && (<StepG1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G2_i' && (<StepG2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G3_i' && (<StepG3_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'H1_i' && (<StepH1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} />)}
      {step === 'H2_i' && (<StepH2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>)}
      {step === 'H3_i' && (<StepH3_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>)}
      {step === 'H4_i' && (<StepH4_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} />)}
      {/*trigemino*/}
      {step === 'AT' && ( <StepAT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide} selectedSide={selectedSide}/>)}
       {step === 'CDIT' && (<StepCDIT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'DDAT' && (<StepDDAT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
       {/* {step === 'DDIT' && (<StepDDIT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} /> )} */}
       {step === 'D1AT' && (<StepD1AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
       {step === 'D2AT' && (<StepD2AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
       {step === 'E1AT' && (<StepE1AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'E2AT' && (<StepE2AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'F1AT' && (<StepF1AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide} />)}
       {step === 'F2AT' && (<StepF2AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
       {step === 'F3AT' && (<StepF3AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide}   />)}
       {/* {step === 'G1AT' && (<StepG1AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
       {step === 'G2AT' && (<StepG2AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
       {step === 'G3AT' && (<StepG3AT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)} */}
      {step === 'BT' && ( <StepBT handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} selectedSide={selectedSide}/>)}
       {/*Dermatomas*/}
       {/*Inicia en el paso StepA para seleccionar los dermatomas*/}
       {step === 'BD' && (<StepBD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}/> )}
       {step === 'CDI' && (<StepCDI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'CDA' && (<StepCDA handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'DDA' && (<StepDDA handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
       {step === 'DDI' && (<StepDDI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} /> )}
       {step === 'D1A' && (<StepD1A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
       {step === 'D2A' && ( <StepD2A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
       {step === 'F3A' && (<StepF3A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide}   />)}
       {step === 'E1A' && ( <StepE1A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'E2A' && ( <StepE2A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
       {step === 'F1A' && (<StepF1A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide} />)}
       {step === 'F2A' && (<StepF2A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
       {step === 'G1A' && (<StepG1A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}selectedSide={selectedSide}/>)}
       {step === 'G2A' && (<StepG2A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}selectedSide={selectedSide}/>)}
       {step === 'G3A' && (<StepG3A handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}


    </div>
  );
};

// 1) StepA (antes StepF) => Menú de Estímulo
const StepA = ({handleNextStep,handlePrevStep,setStep,selectedSide,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('A')} id='prev' className={`print-button dont-print `}>
      </button>
      <button onClick={() => setStep('BD')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>VÍA SOMATOSENSORIAL </h1>
    <AccordionContainer>
    <Accordion  title='SUPERIORES' value='superiores' type='external'>
      <div onClick={() => setStep('B1')} >
      <ConclusionButton value="mediano" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO MEDIANO.' displayText="NERVIO MEDIANO"></ConclusionButton>
      <ConclusionButton value="ulnar" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO ULNAR.' displayText="NERVIO ULNAR"></ConclusionButton>
      <ConclusionButton value="radial_superficial" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO RADIAL SUPERFICIAL.' displayText="NERVIO RADIAL SUPERFICIAL"></ConclusionButton>
      <ConclusionButton value="antebraqueal_cutaneo_lateral" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO ANTEBRAQUEAL CUTANEO lATERAL.' displayText="NERVIO ANTEBRAQUEAL CUTANEO lATERAL"></ConclusionButton>
      </div>
   </Accordion>
   </AccordionContainer>
   <AccordionContainer>
     <Accordion  title='INFERIORES' value="inferiores" type='external'>
      <div onClick={() => setStep('B2')} >
     <ConclusionButton value="tibial" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO TIBIAL.' displayText="NERVIO TIBIAL"></ConclusionButton>
     <ConclusionButton value="peroneo" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO PERONEO.' displayText="NERVIO PERONEO"></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO PERONEO SUPERFICIAL.' displayText="NERVIO PERONEO SUPERFICIAL"></ConclusionButton>
     <ConclusionButton value="sural" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO SURAL.' displayText="NERVIO SURAL"></ConclusionButton>
     <ConclusionButton value="safeno" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO SAFENO.' displayText="NERVIO SAFENO"></ConclusionButton>
     <ConclusionButton value="femorocutaneo_lateral" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO FEMOROCUTÁNEO LATERAL.' displayText="NERVIO FEMOROCUTANEO LATERAL"></ConclusionButton>
     <ConclusionButton value="pudendo" title=', A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE NERVIO PUDENDO.' displayText="NERVIO PUDENDO"></ConclusionButton>
    </div>
    </Accordion>
    <div onClick={() => setStep('BD')} >
    <ConclusionButton value='dermatomas'title="VÍA SOMATOSENSORIAL" displayText="DERMATOMAS" />
    </div>
    </AccordionContainer>
    <div onClick={() => setStep('AT')} >
    <ConclusionButton value='tri'title="VÍA SOMATOSENSORIAL, A TRAVÉS DEL TRACTO Y NÚCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGÉMINO" />
    </div>
</div>
);

const StepB1 = ({ handlePrevStep, handleNextStep, setStep ,selectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
        removeConclusion('superior_indemne')
        removeConclusion('superior_alterada')
        removeConclusion('mediano')
        removeConclusion('ulnar')
        removeConclusion('radial_superficial')
        removeConclusion('antebraqueal_cutaneo_lateral')
        removeConclusion('superior_izquierdoindemne')
        removeConclusion('superior_derechoindemne')
        removeConclusion('superior_bilateralindemne')
        removeConclusion(`${selectedSide}c4di`)
        removeConclusion(`${selectedSide}c5di`)
        removeConclusion(`${selectedSide}c6di`)
        removeConclusion(`${selectedSide}c7di`)
        removeConclusion(`${selectedSide}c8di`)
        removeConclusion(`${selectedSide}t1di`)
        removeConclusion(`${selectedSide}t2di`)
        removeConclusion(`${selectedSide}t3di`)
        removeConclusion(`${selectedSide}t4di`)
        removeConclusion(`${selectedSide}t5di`)
        removeConclusion(`${selectedSide}t6di`)
        removeConclusion(`${selectedSide}t7di`)
        removeConclusion(`${selectedSide}t8di`)
        removeConclusion(`${selectedSide}t9di`)
        removeConclusion(`${selectedSide}t10di`)
        removeConclusion(`${selectedSide}t11di`)
        removeConclusion(`${selectedSide}t12di`)
        removeConclusion(`${selectedSide}l2di`)
        removeConclusion(`${selectedSide}l3di`)
        removeConclusion(`${selectedSide}l4di`)
        removeConclusion(`${selectedSide}l5di`)
        removeConclusion(`${selectedSide}s1di`)
        removeConclusion(`${selectedSide}s2di`)

        removeConclusion(`${selectedSide}c4da`)
        removeConclusion(`${selectedSide}c5da`)
        removeConclusion(`${selectedSide}c6da`)
        removeConclusion(`${selectedSide}c7da`)
        removeConclusion(`${selectedSide}c8da`)
        removeConclusion(`${selectedSide}t1da`)
        removeConclusion(`${selectedSide}t2da`)
        removeConclusion(`${selectedSide}t3da`)
        removeConclusion(`${selectedSide}t4da`)
        removeConclusion(`${selectedSide}t5da`)
        removeConclusion(`${selectedSide}t6da`)
        removeConclusion(`${selectedSide}t7da`)
        removeConclusion(`${selectedSide}t8da`)
        removeConclusion(`${selectedSide}t9da`)
        removeConclusion(`${selectedSide}t10da`)
        removeConclusion(`${selectedSide}t11da`)
        removeConclusion(`${selectedSide}t12da`)
        removeConclusion(`${selectedSide}l2da`)
        removeConclusion(`${selectedSide}l3da`)
        removeConclusion(`${selectedSide}l4da`)
        removeConclusion(`${selectedSide}l5da`)
        removeConclusion(`${selectedSide}s1da`)
        removeConclusion(`${selectedSide}s2da`)

       removeConclusion('izquierdo_trigemino')
       removeConclusion('derecho_trigemino')
       removeConclusion('bilateral_trigemino')
       removeConclusion('izquierdo_trigeminoindemne')
       removeConclusion('derecho_trigeminoindemne')
       removeConclusion('bilateral_trigeminoindemne')
       removeConclusion('izquierdo_trigeminoalterada')
       removeConclusion('derecho_trigeminoalterada')
       removeConclusion('bilateral_trigeminoalterada')
       removeConclusion('izquierdo_trigeminoindemne')

       removeConclusion('derecho_der')
       removeConclusion('izquierdo_der')
       removeConclusion('bilateral_der')

       removeConclusion('dermatomas')
       removeConclusion('izquierdo_dermatomas')
       removeConclusion('derecho_dermatomas')
       removeConclusion('bilateral_dermatomas')
       removeConclusion('dermatomas_indemne')
       removeConclusion('dermatomas_alterada')
       removeConclusion('trigemino_indemne')
       removeConclusion('trigemino_alterada')
       removeConclusion('retardo_en_la_conduccion')
       removeConclusion('bloqueo_en_la_conduccion')
       removeConclusion('deficit_neuronal')
       removeConclusion('sin_respuesta')
       removeConclusion('leve')
       removeConclusion('moderado')
       removeConclusion('severo')
       removeConclusion('perdida_axonal_secundaria')
       removeConclusion('retardo_secundario_en_la_conduccion')
       removeConclusion('izquierdo_trigemino')
       removeConclusion('derecho_trigemino')
       removeConclusion('bilateral_trigemino')
       removeConclusion('tri')

        
        setStep('A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">SUPERIORES </h1>
    <div onClick={() => setStep('F4')}>
      <ConclusionButton value="superior_indemne" title="VÍA SOMATOSENSORIAL CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
    </div>
    <div onClick={() => setStep('C1')}>
      <ConclusionButton value="superior_alterada" title="VÍA SOMATOSENSORIAL CON DEFECTO" displayText="ALTERADA " />
    </div>
  </div>

);
}

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        setStep('B1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('D1')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN" displayText=" RETARDO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('F3')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title=" POR BLOQUEO EN LA CONDUCCIÓN" displayText=" BLOQUEO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('D2')}>
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" DÉFICIT AXONAL" />
    </div>
    <div onClick={() => setStep('F3')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);
}


const StepD1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)

  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('C1')} }className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E1')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title=" MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title=" SEVERO " displayText="SEVERO " />

    </div>
  </div>
);}

const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) =>{
  const { removeConclusion } = useContext(ReportContext)

  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('C1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E2')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title=" MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title=" SEVERO " displayText=" SEVERO" />

    </div>
  </div>
);}

const StepE1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
         removeConclusion('perdida_axonal_secundaria')
         removeConclusion('dermatomas_izquierdo')
         removeConclusion('dermatomas_derecho')
         removeConclusion('dermatomas_bilateral')
        setStep('D1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('F1')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('F1')}>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PÉRDIDA AXONAL SECUNDARIA " displayText="+ PÉRDIDA AXONAL" />
  </div>
  </div>
);}

const StepE2 = ({ handlePrevStep, handleNextStep, setStep }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('dermatomas_izquierdo')
        removeConclusion('dermatomas_derecho')
        removeConclusion('dermatomas_bilateral')
        setStep('D2')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('F2')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
    <div onClick={() => setStep('F2')}>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="+ RETARDO EN LA CONDUCCIÓN" />
  </div>
  </div>
);}

const StepF1 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('superior_izquierdo')
        removeConclusion('superior_derecho')
        removeConclusion('superior_bilateral')
        removeConclusion('superior_indemne')
        removeConclusion('superior_alterada')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        removeConclusion('izquierdo_trigeminoalterada')
        removeConclusion('derecho_trigeminoalterada')
        removeConclusion('bilateral_trigeminoalterada')
        removeConclusion('izquierdo_trigeminoindemne')
 
        removeConclusion('derecho_der')
        removeConclusion('izquierdo_der')
        removeConclusion('bilateral_der')
 
        removeConclusion('dermatomas')
        removeConclusion('izquierdo_dermatomas')
        removeConclusion('derecho_dermatomas')
        removeConclusion('bilateral_dermatomas')
        removeConclusion('dermatomas_indemne')
        removeConclusion('dermatomas_alterada')
        removeConclusion('trigemino_indemne')
        removeConclusion('trigemino_alterada')
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        
        setStep('E1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G1');
        }}>
      <ConclusionButton
        value="superior_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G1');
        }}>
      <ConclusionButton
        value="superior_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G1');
        }}>
      <ConclusionButton
        value="superior_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}

const StepF2 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('superior_izquierdo')
        removeConclusion('superior_derecho')
        removeConclusion('superior_bilateral')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        removeConclusion('izquierdo_trigeminoalterada')
        removeConclusion('derecho_trigeminoalterada')
        removeConclusion('bilateral_trigeminoalterada')
        removeConclusion('izquierdo_trigeminoindemne')
 
        removeConclusion('derecho_der')
        removeConclusion('izquierdo_der')
        removeConclusion('bilateral_der')
 
        removeConclusion('dermatomas')
        removeConclusion('izquierdo_dermatomas')
        removeConclusion('derecho_dermatomas')
        removeConclusion('bilateral_dermatomas')
        removeConclusion('dermatomas_indemne')
        removeConclusion('dermatomas_alterada')
        removeConclusion('trigemino_indemne')
        removeConclusion('trigemino_alterada')
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        setStep('E2')}
        } className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G2');
        }}>
      <ConclusionButton
        value="superior_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G2');
        }}>
      <ConclusionButton
        value="superior_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G2');
        }}>
      <ConclusionButton
        value="superior_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}

const StepF3 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('superior_izquierdo')
        removeConclusion('superior_derecho')
        removeConclusion('superior_bilateral')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        removeConclusion('izquierdo_trigeminoalterada')
        removeConclusion('derecho_trigeminoalterada')
        removeConclusion('bilateral_trigeminoalterada')
        removeConclusion('izquierdo_trigeminoindemne')
 
        removeConclusion('derecho_der')
        removeConclusion('izquierdo_der')
        removeConclusion('bilateral_der')
 
        removeConclusion('dermatomas')
        removeConclusion('izquierdo_dermatomas')
        removeConclusion('derecho_dermatomas')
        removeConclusion('bilateral_dermatomas')
        removeConclusion('dermatomas_indemne')
        removeConclusion('dermatomas_alterada')
        removeConclusion('trigemino_indemne')
        removeConclusion('trigemino_alterada')
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        setStep('C1')}}className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G3');
        }}>
      <ConclusionButton
        value="superior_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G3');
        }}>
      <ConclusionButton
        value="superior_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G3');
        }}>
      <ConclusionButton
        value="superior_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
      />
    </div>
  </div>
);}

const StepF4 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('superior_izquierdoindemne')
        removeConclusion('superior_derechoindemne')
        removeConclusion('superior_bilateralindemne')
        removeConclusion('superior_indemne')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        removeConclusion('izquierdo_trigeminoalterada')
        removeConclusion('derecho_trigeminoalterada')
        removeConclusion('bilateral_trigeminoalterada')
        removeConclusion('izquierdo_trigeminoindemne')
 
        removeConclusion('derecho_der')
        removeConclusion('izquierdo_der')
        removeConclusion('bilateral_der')
 
        removeConclusion('dermatomas')
        removeConclusion('izquierdo_dermatomas')
        removeConclusion('derecho_dermatomas')
        removeConclusion('bilateral_dermatomas')
        removeConclusion('dermatomas_indemne')
        removeConclusion('dermatomas_alterada')
        removeConclusion('trigemino_indemne')
        removeConclusion('trigemino_alterada')
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        setStep('B1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('H4');
        }}>
      <ConclusionButton
        value="superior_izquierdoindemne"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('H4');
        }}>
      <ConclusionButton
        value="superior_derechoindemne"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('H4');
        }}>
      <ConclusionButton
        value="superior_bilateralindemne"
        title=" DE FORMA BILATERAL"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);}

const StepG1 = ({ setStep, selectedSide /*, otras props si quieres*/ }) => {
  const { removeConclusion } = useContext(ReportContext)
  const { updateConclusions } = useContext(ReportContext);
  // Array de niveles en orden (de CORTICAL a PERIFÉRICO)
  const levels = [
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico - Área somestésica primaria).',
      value: `${selectedSide}corticals`,
      displayText: 'CORTICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medial - Núcleo tectal).',
      value: `${selectedSide}subcorticals`,
      displayText: 'SUBCORTICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsales - Tracto cuneatus).',
      value: `${selectedSide}cervicals`,
      displayText: 'CERVICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas mielínicas - Plexo braquial).',
      value: `${selectedSide}perifericos`,
      displayText: 'PERIFÉRICO',
    },
  ];
  // Función para manejar el clic en cualquiera de los 4 niveles
  const handleConclusionClick = (clickedTitle, clickedValue) => {
    const index = levels.findIndex((item) => item.value === clickedValue);
    if (index === -1) return;
    // Activamos todos los niveles desde 0 hasta `index`.
    // Para que solo se muestre el texto del botón que se pulsó,
    // en los demás niveles ponemos title: ''.
    for (let i = 0; i <= index; i++) {
      updateConclusions({
        title: i === index ? levels[i].title : '', // Solo el clicado conserva su texto
        value: levels[i].value,
      });
    }
  };
  return (
    <div>
      <div className='button-bar'>
        {/* Botón de Anterior */}
        <button onClick={() =>{
          removeConclusion(`${selectedSide}corticals`)
          removeConclusion(`${selectedSide}subcorticals`)
          removeConclusion(`${selectedSide}cervicals`)
          removeConclusion(`${selectedSide}perifericos`)
          setStep('F1')}} id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Botón de Siguiente */}
        <button onClick={() => setStep('H1')} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL:</h1>
      {/* Renderizamos cada botón en base al array */}
      {levels.map((item) => (
        <ConclusionButton
          key={item.value}
          value={item.value}
          title={item.title}
          displayText={item.displayText}
          onClick={() => handleConclusionClick(item.title, item.value)}
        />
      ))}
    </div>
  );
};


const StepG2 = ({ setStep, selectedSide /*, otras props si quieres*/ }) => {
  const { removeConclusion } = useContext(ReportContext)
  const { updateConclusions } = useContext(ReportContext);
  // Array de niveles en orden (de CORTICAL a PERIFÉRICO)
  const levels = [
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico - Área somestésica primaria).',
      value: `${selectedSide}corticals`,
      displayText: 'CORTICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medial - Núcleo tectal).',
      value: `${selectedSide}subcorticals`,
      displayText: 'SUBCORTICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsales - Tracto cuneatus).',
      value: `${selectedSide}cervicals`,
      displayText: 'CERVICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas mielínicas - Plexo braquial).',
      value: `${selectedSide}perifericos`,
      displayText: 'PERIFÉRICO',
    },
  ];
  // Función para manejar el clic en cualquiera de los 4 niveles
  const handleConclusionClick = (clickedTitle, clickedValue) => {
    const index = levels.findIndex((item) => item.value === clickedValue);
    if (index === -1) return;
    // Activamos todos los niveles desde 0 hasta `index`.
    // Para que solo se muestre el texto del botón que se pulsó,
    // en los demás niveles ponemos title: ''.
    for (let i = 0; i <= index; i++) {
      updateConclusions({
        title: i === index ? levels[i].title : '', // Solo el clicado conserva su texto
        value: levels[i].value,
      });
    }
  };
  return (
    <div>
      <div className='button-bar'>
        {/* Botón de Anterior */}
        <button onClick={() => {
          removeConclusion(`${selectedSide}corticals`)
          removeConclusion(`${selectedSide}subcorticals`)
          removeConclusion(`${selectedSide}cervicals`)
          removeConclusion(`${selectedSide}perifericos`)
          setStep('F2')}}id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Botón de Siguiente */}
        <button onClick={() => setStep('H2')} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL:</h1>
      {/* Renderizamos cada botón en base al array */}
      {levels.map((item) => (
        <ConclusionButton
          key={item.value}
          value={item.value}
          title={item.title}
          displayText={item.displayText}
          onClick={() => handleConclusionClick(item.title, item.value)}
        />
      ))}
    </div>
  );
};


const StepG3 = ({ setStep, selectedSide /*, otras props si quieres*/ }) => {
  const { removeConclusion } = useContext(ReportContext)
  const { updateConclusions } = useContext(ReportContext);
  // Array de niveles en orden (de CORTICAL a PERIFÉRICO)
  const levels = [
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico - Área somestésica primaria).',
      value: `${selectedSide}corticals`,
      displayText: 'CORTICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medial - Núcleo tectal).',
      value: `${selectedSide}subcorticals`,
      displayText: 'SUBCORTICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsales - Tracto cuneatus).',
      value: `${selectedSide}cervicals`,
      displayText: 'CERVICAL',
    },
    {
      title: 'TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas mielínicas - Plexo braquial).',
      value: `${selectedSide}perifericos`,
      displayText: 'PERIFÉRICO',
    },
  ];
  // Función para manejar el clic en cualquiera de los 4 niveles
  const handleConclusionClick = (clickedTitle, clickedValue) => {
    const index = levels.findIndex((item) => item.value === clickedValue);
    if (index === -1) return;
    // Activamos todos los niveles desde 0 hasta `index`.
    // Para que solo se muestre el texto del botón que se pulsó,
    // en los demás niveles ponemos title: ''.
    for (let i = 0; i <= index; i++) {
      updateConclusions({
        title: i === index ? levels[i].title : '', // Solo el clicado conserva su texto
        value: levels[i].value,
      });
    }
  };
  return (
    <div>
      <div className='button-bar'>
        {/* Botón de Anterior */}
        <button onClick={() => {
          removeConclusion(`${selectedSide}corticals`)
          removeConclusion(`${selectedSide}subcorticals`)
          removeConclusion(`${selectedSide}cervicals`)
          removeConclusion(`${selectedSide}perifericos`)
          setStep('F3')}} id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Botón de Siguiente */}
        <button onClick={() => setStep('H3')} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL:</h1>
      {/* Renderizamos cada botón en base al array */}
      {levels.map((item) => (
        <ConclusionButton
          key={item.value}
          value={item.value}
          title={item.title}
          displayText={item.displayText}
          onClick={() => handleConclusionClick(item.title, item.value)}
        />
      ))}
    </div>
  );
};

const StepH1 = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
    const { conclusions } = useContext(ReportContext)
    const { droppedItems } = useContext(DropContext);
    const [isLoading, setIsLoading] = useState(false);

  
    const handleExportPdf = async () => {
      try {
        setIsLoading(true); // ⌛ Mostrar overlay
         // 1) conclusiones (array con {value, title})
      const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
  
      const conclusiones = conclusions;
  
  
        const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            finalConclusion: conclusionFinal, // Envías la cadena final
            conclusiones, // <--- envías el array de conclusiones
            userData: {
              name: session?.user?.name,
              lastname: session?.user?.lastname,
              email: session?.user?.email,
              cedula: session?.user?.cedula,
              especialidad: session?.user?.especialidad,
              imageUrl: session?.user?.imageUrl,
            },
            droppedItems, // <--- envía también el array de items arrastrados
            topLeftText, 
  
          }),
        });
    
        if (!response.ok) {
          throw new Error("Error al generar PDF");
        }
    
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reporte-completo.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    
      } catch (error) {
        console.error('Error:', error);
        alert('Error al generar PDF: ' + error.message);
      } finally {
        document.body.style.cursor = 'default';
        setIsLoading(false); // ✅ Ocultar overlay
      }
    };
    if (isLoading) {
      return (
        <div className="loading-overlay">
          <div className="hourglass">
          <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
          </div>
        </div>
      );
    }

  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G1')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

     
        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
const StepH2 = ({ setStep, selectedImages, handleUndo, handlePrint }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay
       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend

    const conclusiones = conclusions;


      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
    if (isLoading) {
      return (
        <div className="loading-overlay">
          <div className="hourglass">
          <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G2')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

      
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>


        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
const StepH3 = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay
       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
    if (isLoading) {
      return (
        <div className="loading-overlay">
          <div className="hourglass">
          <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G3')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
       
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
const StepH4 = ({ setStep, selectedImages, handleUndo,  handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  
  const { removeConclusion } = useContext(ReportContext)
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay

       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend

    const conclusiones = conclusions;


      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
  };
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="hourglass">
        <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => {
        removeConclusion('superior_izquierdoindemne')
        removeConclusion('superior_derechoindemne')
          removeConclusion('superior_bilateralindemne')
          setStep('F4')} }className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
       
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>


        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
//Inferiores 
const StepB2 = ({ handlePrevStep, handleNextStep, setStep,selectedSide }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
        removeConclusion('peroneo_superficial')
        removeConclusion('peroneo')
        removeConclusion('sural')
        removeConclusion('safeno')
        removeConclusion('femorocutaneo_lateral')
        removeConclusion('pudendo')
        removeConclusion('tibial') 
        removeConclusion('inferior_indemne')
        removeConclusion('interior_alterada')
        removeConclusion('inferior_izquierdoindemne')
        removeConclusion('inferior_derechoindemne')
        removeConclusion('inferior_bilateralindemne')
        removeConclusion(`${selectedSide}c4di`)
        removeConclusion(`${selectedSide}c5di`)
        removeConclusion(`${selectedSide}c6di`)
        removeConclusion(`${selectedSide}c7di`)
        removeConclusion(`${selectedSide}c8di`)
        removeConclusion(`${selectedSide}t1di`)
        removeConclusion(`${selectedSide}t2di`)
        removeConclusion(`${selectedSide}t3di`)
        removeConclusion(`${selectedSide}t4di`)
        removeConclusion(`${selectedSide}t5di`)
        removeConclusion(`${selectedSide}t6di`)
        removeConclusion(`${selectedSide}t7di`)
        removeConclusion(`${selectedSide}t8di`)
        removeConclusion(`${selectedSide}t9di`)
        removeConclusion(`${selectedSide}t10di`)
        removeConclusion(`${selectedSide}t11di`)
        removeConclusion(`${selectedSide}t12di`)
        removeConclusion(`${selectedSide}l2di`)
        removeConclusion(`${selectedSide}l3di`)
        removeConclusion(`${selectedSide}l4di`)
        removeConclusion(`${selectedSide}l5di`)
        removeConclusion(`${selectedSide}s1di`)
        removeConclusion(`${selectedSide}s2di`)

        removeConclusion(`${selectedSide}c4da`)
        removeConclusion(`${selectedSide}c5da`)
        removeConclusion(`${selectedSide}c6da`)
        removeConclusion(`${selectedSide}c7da`)
        removeConclusion(`${selectedSide}c8da`)
        removeConclusion(`${selectedSide}t1da`)
        removeConclusion(`${selectedSide}t2da`)
        removeConclusion(`${selectedSide}t3da`)
        removeConclusion(`${selectedSide}t4da`)
        removeConclusion(`${selectedSide}t5da`)
        removeConclusion(`${selectedSide}t6da`)
        removeConclusion(`${selectedSide}t7da`)
        removeConclusion(`${selectedSide}t8da`)
        removeConclusion(`${selectedSide}t9da`)
        removeConclusion(`${selectedSide}t10da`)
        removeConclusion(`${selectedSide}t11da`)
        removeConclusion(`${selectedSide}t12da`)
        removeConclusion(`${selectedSide}l2da`)
        removeConclusion(`${selectedSide}l3da`)
        removeConclusion(`${selectedSide}l4da`)
        removeConclusion(`${selectedSide}l5da`)
        removeConclusion(`${selectedSide}s1da`)
        removeConclusion(`${selectedSide}s2da`)

       removeConclusion('izquierdo_trigemino')
       removeConclusion('derecho_trigemino')
       removeConclusion('bilateral_trigemino')
       removeConclusion('izquierdo_trigeminoindemne')
       removeConclusion('derecho_trigeminoindemne')
       removeConclusion('bilateral_trigeminoindemne')
       removeConclusion('izquierdo_trigeminoalterada')
       removeConclusion('derecho_trigeminoalterada')
       removeConclusion('bilateral_trigeminoalterada')
       removeConclusion('izquierdo_trigeminoindemne')

       removeConclusion('derecho_der')
       removeConclusion('izquierdo_der')
       removeConclusion('bilateral_der')

       removeConclusion('dermatomas')
       removeConclusion('izquierdo_dermatomas')
       removeConclusion('derecho_dermatomas')
       removeConclusion('bilateral_dermatomas')
       removeConclusion('dermatomas_indemne')
       removeConclusion('dermatomas_alterada')
       removeConclusion('trigemino_indemne')
       removeConclusion('trigemino_alterada')
       removeConclusion('retardo_en_la_conduccion')
       removeConclusion('bloqueo_en_la_conduccion')
       removeConclusion('deficit_neuronal')
       removeConclusion('sin_respuesta')
       removeConclusion('leve')
       removeConclusion('moderado')
       removeConclusion('severo')
       removeConclusion('perdida_axonal_secundaria')
       removeConclusion('retardo_secundario_en_la_conduccion')
       removeConclusion('izquierdo_trigemino')
       removeConclusion('derecho_trigemino')
       removeConclusion('bilateral_trigemino')
       removeConclusion('tri')
        setStep('A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">INFERIORES</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('F4_i')}>
      <ConclusionButton value="inferior_indemne" title="VÍA SOMATOSENSORIAL CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
       </div>
    <div onClick={() => setStep('C1_i')}>
      <ConclusionButton value="interior_alterada" title="VÍA SOMATOSENSORIAL CON DEFECTO" displayText="ALTERADA " />
    </div>
  </div>
);}
const StepC1_i = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{
          removeConclusion('retardo_en_la_conduccion')
          removeConclusion('bloqueo_en_la_conduccion')
          removeConclusion('deficit_neuronal')
          removeConclusion('sin_respuesta')
          setStep('B2')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('D1_i')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN" displayText=" RETARDO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('F3_i')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title=" POR BLOQUEO EN LA CONDUCCIÓN" displayText=" BLOQUEO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('D2_i')}>
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" DÉFICIT AXONAL" />
    </div>
    <div onClick={() => setStep('F3_i')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);}
const StepD1_i = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('C1_i')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E1_i')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title=" MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title=" SEVERO " displayText="SEVERO " />
    </div>
  </div>
);}
const StepD2_i = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
         removeConclusion('leve')
         removeConclusion('moderado')
         removeConclusion('severo')
        setStep('C1_i')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E2_i')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title=" MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title=" SEVERO " displayText=" SEVERO" />

    </div>
  </div>
);}
const StepE1_i = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('superior_izquierdo')
        removeConclusion('superior_derecho')
        removeConclusion('superior_bilateral')
        setStep('D1_i')} }className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('F1_i')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('F1_i')}>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PÉRDIDA AXONAL SECUNDARIA " displayText="+ PÉRDIDA AXONAL" />
      </div>
  </div>
);}
const StepE2_i = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('superior_izquierdo')
        removeConclusion('superior_derecho')
        removeConclusion('superior_bilateral')
        setStep('D2_i')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('F2_i')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="+ RETARDO EN LA CONDUCCIÓN" />
  </div>
);}
const StepF1_i= ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('inferior_izquierdo')
        removeConclusion('inferior_derecho')
        removeConclusion('inferior_bilateral')
        setStep('E1_i')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G1_i');
        }}>
      <ConclusionButton
        value="inferior_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G1_i');
        }}>
      <ConclusionButton
        value="inferior_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G1_i');
        }}>
      <ConclusionButton
        value="inferior_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "      
      />
    </div>
  </div>
);}
const StepF2_i = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) =>{ 
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
         removeConclusion('inferior_izquierdo')
         removeConclusion('inferior_derecho')
         removeConclusion('inferior_bilateral')
        setStep('E2_i')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G2_i');
        }}>
      <ConclusionButton
        value="inferior_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G2_i');
        }}>
      <ConclusionButton
        value="inferior_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G2_i');
        }}>
      <ConclusionButton
        value="inferior_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
      />
    </div>
  </div>
);}
const StepF3_i = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('inferior_izquierdo')
        removeConclusion('inferior_derecho')
        removeConclusion('inferior_bilateral')
        setStep('C1_i')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G3_i');
        }}>
      <ConclusionButton
        value="inferior_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G3_i');
        }}>
      <ConclusionButton
        value="inferior_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G3_i');
        }}>
      <ConclusionButton
        value="inferior_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);}
const StepF4_i = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)

  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('inferior_izquierdoindemne')
        removeConclusion('inferior_derechoindemne')
        removeConclusion('inferior_bilateralindemne')
        removeConclusion('inferior_indemne')
        removeConclusion('interior_alterada')
        setStep('B2')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('H4_i');
        }}>
      <ConclusionButton
        value="inferior_izquierdoindemne"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('H4_i');
        }}>
      <ConclusionButton
        value="inferior_derechoindemne"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('H4_i');
        }}>
      <ConclusionButton
        value="inferior_bilateralindemne"
        title=" DE FORMA BILATERAL"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);}

const StepG1_i = ({setStep,selectedSide,// otras props que necesites (por ejemplo selectedImages, handleUndo, etc.)
}) => {
  const { removeConclusion } = useContext(ReportContext)
  // Usamos el contexto para actualizar conclusiones
  const { updateConclusions } = useContext(ReportContext);

  // Array de los 5 niveles, en el orden que desees "acumular".
  const levels = [
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico - Área somestésica primaria). ',
      value: `${selectedSide}corticali`,
      displayText: 'CORTICAL',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilis - Lemnisco medial).',
      value: `${selectedSide}subcorticali`,
      displayText: 'SUBCORTICAL',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales - Tracto gracilis). ',
      value: `${selectedSide}toracicoi`,
      displayText: 'TORÁCICO',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular - Raíces dorsales).',
      value: `${selectedSide}lumbosacroi`,
      displayText: 'LUMBOSACRO',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas mielínicas - Plexo sacro).',
      value: `${selectedSide}perifericoi`,
      displayText: 'PERIFÉRICO',
    },
  ];

  /**
   * handleConclusionClick
   * - Encuentra el índice del nivel clicado.
   * - “Activa” desde 0 hasta ese índice, pero
   *   solo deja el `title` en el clicado (i === index).
   */
  const handleConclusionClick = (clickedTitle, clickedValue) => {
    const index = levels.findIndex(item => item.value === clickedValue);
    if (index === -1) return;

    for (let i = 0; i <= index; i++) {
      updateConclusions({
        title: i === index ? levels[i].title : '', // Solo el clicado conserva título
        value: levels[i].value,
      });
    }
  };

  return (
    <div>
      <div className='button-bar'>
        {/* Botón de "Anterior" */}
        <button onClick={() => {
          removeConclusion(`${selectedSide}corticali`)
          removeConclusion(`${selectedSide}subcorticali`)
          removeConclusion(`${selectedSide}toracicoi`)
          removeConclusion(`${selectedSide}lumbosacroi`)
          removeConclusion(`${selectedSide}perifericoi`)
        

          setStep('F1_i')}} id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Botón de "Siguiente" */}
        <button onClick={() => setStep('H1_i')} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" alt="Siguiente" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className='text-xl font-bold text-white'>NIVEL INFERIOR:</h1>

      {/* Render de los 5 niveles como botones */}
      {levels.map(item => (
        <ConclusionButton
          key={item.value}
          value={item.value}
          title={item.title}
          displayText={item.displayText}
          onClick={() => handleConclusionClick(item.title, item.value)}
        />
      ))}
    </div>
  );
};
const StepG2_i = ({
  setStep,
  selectedSide,
  // otras props que necesites (por ejemplo selectedImages, handleUndo, , etc.)
}) => {
  const { removeConclusion } = useContext(ReportContext)

  // Usamos el contexto para actualizar conclusiones
  const { updateConclusions } = useContext(ReportContext);

  // Array de los 5 niveles, en el orden que desees "acumular".
  const levels = [
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico - Área somestésica primaria). ',
      value: `${selectedSide}corticali`,
      displayText: 'CORTICAL',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilis - Lemnisco medial).',
      value: `${selectedSide}subcorticali`,
      displayText: 'SUBCORTICAL',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales - Tracto gracilis). ',
      value: `${selectedSide}toracicoi`,
      displayText: 'TORÁCICO',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular - Raíces dorsales).',
      value: `${selectedSide}lumbosacroi`,
      displayText: 'LUMBOSACRO',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas mielínicas - Plexo sacro).',
      value: `${selectedSide}perifericoi`,
      displayText: 'PERIFÉRICO',
    },
  ];

  /**
   * handleConclusionClick
   * - Encuentra el índice del nivel clicado.
   * - “Activa” desde 0 hasta ese índice, pero
   *   solo deja el `title` en el clicado (i === index).
   */
  const handleConclusionClick = (clickedTitle, clickedValue) => {
    const index = levels.findIndex(item => item.value === clickedValue);
    if (index === -1) return;

    for (let i = 0; i <= index; i++) {
      updateConclusions({
        title: i === index ? levels[i].title : '', // Solo el clicado conserva título
        value: levels[i].value,
      });
    }
  };

  return (
    <div>
      <div className='button-bar'>
        {/* Botón de "Anterior" */}
        <button onClick={() => {
          removeConclusion(`${selectedSide}corticali`);
          removeConclusion(`${selectedSide}subcorticali`);
          removeConclusion(`${selectedSide}toracicoi`);
          removeConclusion(`${selectedSide}lumbosacroi`);
          removeConclusion(`${selectedSide}perifericoi`);

          setStep('F2_i')}} id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Botón de "Siguiente" */}
        <button onClick={() => setStep('H2_i')} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" alt="Siguiente" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className='text-xl font-bold text-white'>NIVEL INFERIOR:</h1>

      {/* Render de los 5 niveles como botones */}
      {levels.map(item => (
        <ConclusionButton
          key={item.value}
          value={item.value}
          title={item.title}
          displayText={item.displayText}
          onClick={() => handleConclusionClick(item.title, item.value)}
        />
      ))}
    </div>
  );
};

const StepG3_i = ({
  setStep,
  selectedSide,
  // otras props que necesites (por ejemplo selectedImages, handleUndo, , etc.)
}) => {
  const { removeConclusion } = useContext(ReportContext)
  // Usamos el contexto para actualizar conclusiones
  const { updateConclusions } = useContext(ReportContext);

  // Array de los 5 niveles, en el orden que desees "acumular".
  const levels = [
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). ',
      value: `${selectedSide}corticali`,
      displayText: 'CORTICAL',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilis - Lemnisco medial).',
      value: `${selectedSide}subcorticali`,
      displayText: 'SUBCORTICAL',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales - Tracto gracilis). ',
      value: `${selectedSide}toracicoi`,
      displayText: 'TORÁCICO',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular - Raíces dorsales).',
      value: `${selectedSide}lumbosacroi`,
      displayText: 'LUMBOSACRO',
    },
    {
      title: ', TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas mielínicas - Plexo sacro).',
      value: `${selectedSide}perifericoi`,
      displayText: 'PERIFÉRICO',
    },
  ];

  /**

   */
  const handleConclusionClick = (clickedTitle, clickedValue) => {
    const index = levels.findIndex(item => item.value === clickedValue);
    if (index === -1) return;

    for (let i = 0; i <= index; i++) {
      updateConclusions({
        title: i === index ? levels[i].title : '', // Solo el clicado conserva título
        value: levels[i].value,
      });
    }
  };

  return (
    <div>
      <div className='button-bar'>
        {/* Botón de "Anterior" */}
        <button onClick={() => {
          removeConclusion(`${selectedSide}corticali`)
          removeConclusion(`${selectedSide}subcorticali`)
          removeConclusion(`${selectedSide}toracicoi`)
          removeConclusion(`${selectedSide}lumbosacroi`)
          removeConclusion(`${selectedSide}perifericoi`)
        
          setStep('F3_i')} }id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Botón de "Siguiente" */}
        <button onClick={() => setStep('H3_i')} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" alt="Siguiente" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className='text-xl font-bold text-white'>NIVEL INFERIOR:</h1>

      {/* Render de los 5 niveles como botones */}
      {levels.map(item => (
        <ConclusionButton
          key={item.value}
          value={item.value}
          title={item.title}
          displayText={item.displayText}
          onClick={() => handleConclusionClick(item.title, item.value)}
        />
      ))}
    </div>
  );
};

const StepH1_i = ({ setStep, selectedImages, handleUndo,handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay

       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
  };
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="hourglass">
        <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G1_i')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

      
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
const StepH2_i = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay

       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
  };
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="hourglass">
        <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G2_i')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

       
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
const StepH3_i = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay
       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
  };
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="hourglass">
        <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G3_i')} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
const StepH4_i = ({ setStep, selectedImages, handleUndo,  handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { removeConclusion } = useContext(ReportContext)
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay
       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
  };
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="hourglass">
        <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => {
          removeConclusion('inferior_izquierdoindemne')
          removeConclusion('inferior_derechoindemne')
            removeConclusion('inferior_bilateralindemne')
          setStep('F4_i')} }className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

     
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id='prev' onClick={() => window.print()} className={`print-button dont-print `}>
          <img src="/I_Print.svg " alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};



//Dermatomas
const StepBD = ({ handlePrevStep, handleNextStep, setStep,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
      removeConclusion('dermatomas_indemne')
      removeConclusion('dermatomas_alterada')
      removeConclusion('dermatomas')
      removeConclusion('retardo_en_la_conduccion')
      removeConclusion('bloqueo_en_la_conduccion')
      removeConclusion('deficit_neuronal')
      removeConclusion('sin_respuesta')
      removeConclusion('leve')
      removeConclusion('moderado')
      removeConclusion('severo')
      removeConclusion('perdida_axonal_secundaria')
      removeConclusion('retardo_secundario_en_la_conduccion')
      removeConclusion('dermatomas_izquierdo')
      removeConclusion('dermatomas_derecho')
      removeConclusion('dermatomas_bilateral')
      removeConclusion(`${selectedSide}c4di`)
      removeConclusion(`${selectedSide}c5di`)
      removeConclusion(`${selectedSide}c6di`)
      removeConclusion(`${selectedSide}c7di`)
      removeConclusion(`${selectedSide}c8di`)
      removeConclusion(`${selectedSide}t1di`)
      removeConclusion(`${selectedSide}t2di`)
      removeConclusion(`${selectedSide}t3di`)
      removeConclusion(`${selectedSide}t4di`)
      removeConclusion(`${selectedSide}t5di`)
      removeConclusion(`${selectedSide}t6di`)
      removeConclusion(`${selectedSide}t7di`)
      removeConclusion(`${selectedSide}t8di`)
      removeConclusion(`${selectedSide}t9di`)
      removeConclusion(`${selectedSide}t10di`)
      removeConclusion(`${selectedSide}t11di`)
      removeConclusion(`${selectedSide}t12di`)
      removeConclusion(`${selectedSide}l2di`)
      removeConclusion(`${selectedSide}l3di`)
      removeConclusion(`${selectedSide}l4di`)
      removeConclusion(`${selectedSide}l5di`)
      removeConclusion(`${selectedSide}s1di`)
      removeConclusion(`${selectedSide}s2di`)

      removeConclusion(`${selectedSide}c4da`)
      removeConclusion(`${selectedSide}c5da`)
      removeConclusion(`${selectedSide}c6da`)
      removeConclusion(`${selectedSide}c7da`)
      removeConclusion(`${selectedSide}c8da`)
      removeConclusion(`${selectedSide}t1da`)
      removeConclusion(`${selectedSide}t2da`)
      removeConclusion(`${selectedSide}t3da`)
      removeConclusion(`${selectedSide}t4da`)
      removeConclusion(`${selectedSide}t5da`)
      removeConclusion(`${selectedSide}t6da`)
      removeConclusion(`${selectedSide}t7da`)
      removeConclusion(`${selectedSide}t8da`)
      removeConclusion(`${selectedSide}t9da`)
      removeConclusion(`${selectedSide}t10da`)
      removeConclusion(`${selectedSide}t11da`)
      removeConclusion(`${selectedSide}t12da`)
      removeConclusion(`${selectedSide}l2da`)
      removeConclusion(`${selectedSide}l3da`)
      removeConclusion(`${selectedSide}l4da`)
      removeConclusion(`${selectedSide}l5da`)
      removeConclusion(`${selectedSide}s1da`)
      removeConclusion(`${selectedSide}s2da`)

     removeConclusion('izquierdo_trigemino')
     removeConclusion('derecho_trigemino')
     removeConclusion('bilateral_trigemino')
     removeConclusion('izquierdo_trigeminoindemne')
     removeConclusion('derecho_trigeminoindemne')
     removeConclusion('bilateral_trigeminoindemne')
     removeConclusion('izquierdo_trigeminoalterada')
     removeConclusion('derecho_trigeminoalterada')
     removeConclusion('bilateral_trigeminoalterada')
     removeConclusion('izquierdo_trigeminoindemne')

     removeConclusion('derecho_der')
     removeConclusion('izquierdo_der')
     removeConclusion('bilateral_der')

     removeConclusion('dermatomas')
     removeConclusion('izquierdo_dermatomas')
     removeConclusion('derecho_dermatomas')
     removeConclusion('bilateral_dermatomas')
     removeConclusion('dermatomas_indemne')
     removeConclusion('dermatomas_alterada')
     removeConclusion('trigemino_indemne')
     removeConclusion('trigemino_alterada')
     removeConclusion('retardo_en_la_conduccion')
     removeConclusion('bloqueo_en_la_conduccion')
     removeConclusion('deficit_neuronal')
     removeConclusion('sin_respuesta')
     removeConclusion('leve')
     removeConclusion('moderado')
     removeConclusion('severo')
     removeConclusion('perdida_axonal_secundaria')
     removeConclusion('retardo_secundario_en_la_conduccion')
     removeConclusion('izquierdo_trigemino')
     removeConclusion('derecho_trigemino')
     removeConclusion('bilateral_trigemino')
     removeConclusion('tri')

        setStep('A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white"> </h1>
    <div onClick={() => setStep('CDI')}>
      <ConclusionButton value="dermatomas_indemne" title="CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
    </div>
    <div onClick={() => setStep('CDA')}>
      <ConclusionButton value="dermatomas_alterada" title="CON DEFECTO" displayText="ALTERADA " />
    </div>
  </div>

);
}

const StepCDI = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
      removeConclusion('izquierdo_dermatomas')
      removeConclusion('derecho_dermatomas')
      removeConclusion('bilateral_dermatomas')
        setStep('BD')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('DDI');
          setSelectedSide('izquierdo');
        }}>
      <ConclusionButton
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('DDI');
          setSelectedSide('derecho');

        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('DDI');
          setSelectedSide('bilateral');

        }}>
      <ConclusionButton
        value="bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}

const StepCDA = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
      removeConclusion('izquierdo_dermatomas')
      removeConclusion('derecho_dermatomas')
      removeConclusion('bilateral_dermatomas')
        setStep('BD')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('DDA');
          setSelectedSide('izquierdo');

        }}>
      <ConclusionButton
        value="izquierdo_der"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('DDA');
          setSelectedSide('derecho');

        }}>
      <ConclusionButton
        value="derecho_der"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('DDA');
          setSelectedSide('bilateral');

        }}>
      <ConclusionButton
        value="bilateral_der"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}





const StepDDI = ({handleNextStep,handlePrevStep,setStep,selectedSide,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
        removeConclusion(`${selectedSide}c4di`)
        removeConclusion(`${selectedSide}c5di`)
        removeConclusion(`${selectedSide}c6di`)
        removeConclusion(`${selectedSide}c7di`)
        removeConclusion(`${selectedSide}c8di`)
        removeConclusion(`${selectedSide}t1di`)
        removeConclusion(`${selectedSide}t2di`)
        removeConclusion(`${selectedSide}t3di`)
        removeConclusion(`${selectedSide}t4di`)
        removeConclusion(`${selectedSide}t5di`)
        removeConclusion(`${selectedSide}t6di`)
        removeConclusion(`${selectedSide}t7di`)
        removeConclusion(`${selectedSide}t8di`)
        removeConclusion(`${selectedSide}t9di`)
        removeConclusion(`${selectedSide}t10di`)
        removeConclusion(`${selectedSide}t11di`)
        removeConclusion(`${selectedSide}t12di`)
        removeConclusion(`${selectedSide}l2di`)
        removeConclusion(`${selectedSide}l3di`)
        removeConclusion(`${selectedSide}l4di`)
        removeConclusion(`${selectedSide}l5di`)
        removeConclusion(`${selectedSide}s1di`)
        removeConclusion(`${selectedSide}s2di`)


      
        setStep('CDI')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('BT')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>DERMATOMAS</h1>
   <AccordionContainer>
    <InternalAccordionContainer> 
    <Accordion  title='DERMATOMAS' type='internal'>
     <InternalAccordionContainer> 
     <Accordion title='CERVICAL' type='internal'> 
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value={`${selectedSide}c4di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value={`${selectedSide}c5di`}  title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value={`${selectedSide}c6di`}  title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value={`${selectedSide}c7di`}  title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value={`${selectedSide}c8di`}  title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
         <ConclusionButton value={`${selectedSide}t1di`}  title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"   /> 
      </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='TORACICO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t2di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T2" displayText="T2"   />
        <ConclusionButton value={`${selectedSide}t3di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T3" displayText="T3"   />
        <ConclusionButton value={`${selectedSide}t4di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T4" displayText="T4"   />
        <ConclusionButton value={`${selectedSide}t5di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T5" displayText="T5"   />   
        <ConclusionButton value={`${selectedSide}t6di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T6" displayText="T6"   />   
        </div>
        < div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t7di`} title= "A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T7" displayText="T7" />   
        <ConclusionButton value={`${selectedSide}t8di`} title= "A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T8" displayText="T8"  />   
        <ConclusionButton value={`${selectedSide}t9di`} title= "A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T9" displayText="T9"  />   
        <ConclusionButton value={`${selectedSide}t10di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T10" displayText="T10"  />   
        <ConclusionButton value={`${selectedSide}t11di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T11" displayText="T11"  />   
        <ConclusionButton value={`${selectedSide}t12di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T12" displayText="T12"  />   
        </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='LUMBOSACRO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}l1di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value={`${selectedSide}l2di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value={`${selectedSide}l3di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value={`${selectedSide}l4di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value={`${selectedSide}l5di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/> 
        <ConclusionButton value={`${selectedSide}s1di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value={`${selectedSide}s2di`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />      
        </div>
      </Accordion>
      </InternalAccordionContainer> 
    </Accordion>
    </InternalAccordionContainer> 
    </AccordionContainer>
    
</div>
)};

const StepDDA = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        removeConclusion('dermatomas')
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('dermatomas_izquierdo')
        removeConclusion('dermatomas_derecho')
        removeConclusion('dermatomas_bilateral')
        setStep('BD')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('D1A')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN" displayText=" RETARDO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('G3A')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title=" POR BLOQUEO EN LA CONDUCCIÓN" displayText=" BLOQUEO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('D2A')}>
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" DÉFICIT AXONAL" />
    </div>
    <div onClick={() => setStep('G3A')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);
}

const StepD1A = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)

  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('DDA')} }className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E1A')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title=" MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title=" SEVERO " displayText="SEVERO " />

    </div>
  </div>
);}


const StepD2A = ({ handlePrevStep, handleNextStep, setStep }) =>{
  const { removeConclusion } = useContext(ReportContext)

  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('DDA')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E2A')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title=" MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title=" SEVERO " displayText=" SEVERO" />

    </div>
  </div>
);}

const StepE1A = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
         removeConclusion('superior_izquierdo')
         removeConclusion('superior_derecho')
         removeConclusion('superior_bilateral')
         removeConclusion('perdida_axonal_secundaria')
         removeConclusion('dermatomas_izquierdo')
         removeConclusion('dermatomas_derecho')
         removeConclusion('dermatomas_bilateral')
         
        setStep('D1A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('G1A')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('G1A')}>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PÉRDIDA AXONAL SECUNDARIA " displayText="+ PÉRDIDA AXONAL" />
      </div>
  </div>
);}

const StepE2A = ({ handlePrevStep, handleNextStep, setStep }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
         removeConclusion('superior_izquierdo')
         removeConclusion('superior_derecho')
         removeConclusion('superior_bilateral')
         removeConclusion('dermatomas_izquierdo')
         removeConclusion('dermatomas_derecho')
         removeConclusion('dermatomas_bilateral')
        removeConclusion('retardo_secundario_en_la_conduccion')
        setStep('D2A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('G2A')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('G2A')}>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="+ RETARDO EN LA CONDUCCIÓN" />
      </div>

  </div>
);}


const StepF1A = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('dermatomas_izquierdo')
        removeConclusion('dermatomas_derecho')
        removeConclusion('dermatomas_bilateral')
        setStep('E1A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G1A');
        }}>
      <ConclusionButton
        value="dermatomas_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G1A');
        }}>
      <ConclusionButton
        value="dermatomas_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G1A');
        }}>
      <ConclusionButton
        value="dermatomas_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}

const StepF2A = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('dermatomas_izquierdo')
        removeConclusion('dermatomas_derecho')
        removeConclusion('dermatomas_bilateral')
        setStep('E2A')}
        } className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G2A');
        }}>
      <ConclusionButton
        value="dermatomas_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G2A');
        }}>
      <ConclusionButton
        value="dermatomas_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G2A');
        }}>
      <ConclusionButton
        value="dermatomas_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}


const StepF3A = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('dermatomas_izquierdo')
        removeConclusion('dermatomas_derecho')
        removeConclusion('dermatomas_bilateral')
        setStep('E2A')}
        } className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('G3A');
        }}>
      <ConclusionButton
        value="dermatomas_izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G3A');
        }}>
      <ConclusionButton
        value="dermatomas_derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G3A');
        }}>
      <ConclusionButton
        value="dermatomas_bilateral"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>

);}





const StepG1A = ({handleNextStep,handlePrevStep,setStep,selectedSide,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
         removeConclusion('c4')
         removeConclusion('c5')
         removeConclusion('c6')
         removeConclusion('c7')
         removeConclusion('c8')
         removeConclusion('t1')
         removeConclusion('t2')
         removeConclusion('t3')
         removeConclusion('t4')
         removeConclusion('t5')
         removeConclusion('t6')
         removeConclusion('t7')
         removeConclusion('t8')
         removeConclusion('t9')
         removeConclusion('t10')
         removeConclusion('t11')
         removeConclusion('t12')
         removeConclusion('l1')
         removeConclusion('l2')
         removeConclusion('l3')
         removeConclusion('l4')
         removeConclusion('l5')
         removeConclusion('s1')
         removeConclusion('s2')
         removeConclusion('dermatomas')
        setStep('F1A')}} id='prev' className={`print-button dont-print `}>
      </button>
      <button onClick={() => setStep('BT')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>DERMATOMAS</h1>
    <AccordionContainer>
   </AccordionContainer>
   <AccordionContainer>
    <InternalAccordionContainer> 
    <Accordion  title='DERMATOMAS' type='internal'>
     <InternalAccordionContainer> 
     <Accordion title='CERVICAL' type='internal'> 
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value={`${selectedSide}c4da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value={`${selectedSide}c5da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value={`${selectedSide}c6da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value={`${selectedSide}c7da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value={`${selectedSide}c8da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
         <ConclusionButton value={`${selectedSide}t1da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"   /> 
      </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='TORACICO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t2da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T2" displayText="T2"   />
        <ConclusionButton value={`${selectedSide}t3da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T3" displayText="T3"   />
        <ConclusionButton value={`${selectedSide}t4da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T4" displayText="T4"   />
        <ConclusionButton value={`${selectedSide}t5da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T5" displayText="T5"   />   
        <ConclusionButton value={`${selectedSide}t6da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T6" displayText="T6"   />   
        </div>
        < div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t7da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T7" displayText="T7" />   
        <ConclusionButton value={`${selectedSide}t8da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T8" displayText="T8"  />   
        <ConclusionButton value={`${selectedSide}t9da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T9" displayText="T9"  />   
        <ConclusionButton value={`${selectedSide}t10da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T10" displayText="T10"  />   
        <ConclusionButton value={`${selectedSide}t11da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T11" displayText="T11"  />   
        <ConclusionButton value={`${selectedSide}t12da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T12" displayText="T12"  />   
        </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='LUMBOSACRO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}l1da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value={`${selectedSide}l2da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value={`${selectedSide}l3da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value={`${selectedSide}l4da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value={`${selectedSide}l5da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/> 
        <ConclusionButton value={`${selectedSide}s1da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value={`${selectedSide}s2da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />      
        </div>
      </Accordion>
      </InternalAccordionContainer> 
    </Accordion>
    </InternalAccordionContainer> 
    </AccordionContainer>
</div>
)};

const StepG2A = ({handleNextStep,handlePrevStep,setStep,selectedSide,setSelectedSide }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => 
        {
          removeConclusion('c4')
          removeConclusion('c5')
          removeConclusion('c6')
          removeConclusion('c7')
          removeConclusion('c8')
          removeConclusion('t1')
          removeConclusion('t2')
          removeConclusion('t3')
          removeConclusion('t4')
          removeConclusion('t5')
          removeConclusion('t6')
          removeConclusion('t7')
          removeConclusion('t8')
          removeConclusion('t9')
          removeConclusion('t10')
          removeConclusion('t11')
          removeConclusion('t12')
          removeConclusion('l1')
          removeConclusion('l2')
          removeConclusion('l3')
          removeConclusion('l4')
          removeConclusion('l5')
          removeConclusion('s1')
          removeConclusion('s2')
          removeConclusion('dermatomas')
        setStep('F2A')}} id='prev' className={`print-button dont-print `}>
      </button>
      <button onClick={() => setStep('BT')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>DERMATOMAS</h1>
    <AccordionContainer>
   </AccordionContainer>
   <AccordionContainer>
    <InternalAccordionContainer> 
    <Accordion  title='DERMATOMAS' type='internal'>
     <InternalAccordionContainer> 
     <Accordion title='CERVICAL' type='internal'> 
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value={`${selectedSide}c4da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value={`${selectedSide}c5da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value={`${selectedSide}c6da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value={`${selectedSide}c7da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value={`${selectedSide}c8da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
         <ConclusionButton value={`${selectedSide}t1da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"   /> 
      </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='TORACICO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t2da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T2" displayText="T2"   />
        <ConclusionButton value={`${selectedSide}t3da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T3" displayText="T3"   />
        <ConclusionButton value={`${selectedSide}t4da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T4" displayText="T4"   />
        <ConclusionButton value={`${selectedSide}t5da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T5" displayText="T5"   />   
        <ConclusionButton value={`${selectedSide}t6da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T6" displayText="T6"   />   
        </div>
        < div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t7da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T7" displayText="T7" />   
        <ConclusionButton value={`${selectedSide}t8da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T8" displayText="T8"  />   
        <ConclusionButton value={`${selectedSide}t9da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T9" displayText="T9"  />   
        <ConclusionButton value={`${selectedSide}t10da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T10" displayText="T10"  />   
        <ConclusionButton value={`${selectedSide}t11da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T11" displayText="T11"  />   
        <ConclusionButton value={`${selectedSide}t12da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T12" displayText="T12"  />   
        </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='LUMBOSACRO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}l1da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value={`${selectedSide}l2da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value={`${selectedSide}l3da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value={`${selectedSide}l4da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value={`${selectedSide}l5da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/> 
        <ConclusionButton value={`${selectedSide}s1da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value={`${selectedSide}s2da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />      
        </div>
      </Accordion>
      </InternalAccordionContainer> 
    </Accordion>
    </InternalAccordionContainer> 
    </AccordionContainer>
</div>
)};

const StepG3A = ({handleNextStep,handlePrevStep,setStep,selectedSide,setSelectedSide }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => 
        {
          removeConclusion('c4')
          removeConclusion('c5')
          removeConclusion('c6')
          removeConclusion('c7')
          removeConclusion('c8')
          removeConclusion('t1')
          removeConclusion('t2')
          removeConclusion('t3')
          removeConclusion('t4')
          removeConclusion('t5')
          removeConclusion('t6')
          removeConclusion('t7')
          removeConclusion('t8')
          removeConclusion('t9')
          removeConclusion('t10')
          removeConclusion('t11')
          removeConclusion('t12')
          removeConclusion('l1')
          removeConclusion('l2')
          removeConclusion('l3')
          removeConclusion('l4')
          removeConclusion('l5')
          removeConclusion('s1')
          removeConclusion('s2')
          removeConclusion('dermatomas')
        setStep('F3A')}} id='prev' className={`print-button dont-print `}>
      </button>
      <button onClick={() => setStep('BT')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>DERMATOMAS</h1>
    <AccordionContainer>
   </AccordionContainer>
   <AccordionContainer>
    <InternalAccordionContainer> 
    <Accordion  title='DERMATOMAS' type='internal'>
     <InternalAccordionContainer> 
     <Accordion title='CERVICAL' type='internal'> 
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value={`${selectedSide}c4da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value={`${selectedSide}c5da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value={`${selectedSide}c6da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value={`${selectedSide}c7da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value={`${selectedSide}c8da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
         <ConclusionButton value={`${selectedSide}t1da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"   /> 
      </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='TORACICO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t2da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T2" displayText="T2"   />
        <ConclusionButton value={`${selectedSide}t3da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T3" displayText="T3"   />
        <ConclusionButton value={`${selectedSide}t4da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T4" displayText="T4"   />
        <ConclusionButton value={`${selectedSide}t5da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T5" displayText="T5"   />   
        <ConclusionButton value={`${selectedSide}t6da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T6" displayText="T6"   />   
        </div>
        < div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}t7da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T7" displayText="T7" />   
        <ConclusionButton value={`${selectedSide}t8da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T8" displayText="T8"  />   
        <ConclusionButton value={`${selectedSide}t9da`} title= "VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T9" displayText="T9"  />   
        <ConclusionButton value={`${selectedSide}t10da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T10" displayText="T10"  />   
        <ConclusionButton value={`${selectedSide}t11da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T11" displayText="T11"  />   
        <ConclusionButton value={`${selectedSide}t12da`} title="VÍA SOMATOSENSORIAL A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T12" displayText="T12"  />   
        </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='LUMBOSACRO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value={`${selectedSide}l1da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value={`${selectedSide}l2da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value={`${selectedSide}l3da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value={`${selectedSide}l4da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value={`${selectedSide}l5da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/> 
        <ConclusionButton value={`${selectedSide}s1da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value={`${selectedSide}s2da`} title="A TRAVÉS DE REGIÓN MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />      
        </div>
      </Accordion>
      </InternalAccordionContainer> 
    </Accordion>
    </InternalAccordionContainer> 
    </AccordionContainer>
</div>
)};


//Trigemino

const StepAT = ({ handlePrevStep, handleNextStep, setStep,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
      removeConclusion('dermatomas_indemne')
      removeConclusion('dermatomas_alterada')
      removeConclusion('dermatomas')
      removeConclusion('retardo_en_la_conduccion')
      removeConclusion('bloqueo_en_la_conduccion')
      removeConclusion('deficit_neuronal')
      removeConclusion('sin_respuesta')
      removeConclusion('leve')
      removeConclusion('moderado')
      removeConclusion('severo')
      removeConclusion('perdida_axonal_secundaria')
      removeConclusion('retardo_secundario_en_la_conduccion')
      removeConclusion('tri')
      removeConclusion('izquierdo_trigemino')
      removeConclusion('derecho_trigemino')
      removeConclusion('bilateral_trigemino')
      removeConclusion('trigemino_indemne')
      removeConclusion('trigemino_alterada')
      removeConclusion(`${selectedSide}c4di`)
      removeConclusion(`${selectedSide}c5di`)
      removeConclusion(`${selectedSide}c6di`)
      removeConclusion(`${selectedSide}c7di`)
      removeConclusion(`${selectedSide}c8di`)
      removeConclusion(`${selectedSide}t1di`)
      removeConclusion(`${selectedSide}t2di`)
      removeConclusion(`${selectedSide}t3di`)
      removeConclusion(`${selectedSide}t4di`)
      removeConclusion(`${selectedSide}t5di`)
      removeConclusion(`${selectedSide}t6di`)
      removeConclusion(`${selectedSide}t7di`)
      removeConclusion(`${selectedSide}t8di`)
      removeConclusion(`${selectedSide}t9di`)
      removeConclusion(`${selectedSide}t10di`)
      removeConclusion(`${selectedSide}t11di`)
      removeConclusion(`${selectedSide}t12di`)
      removeConclusion(`${selectedSide}l2di`)
      removeConclusion(`${selectedSide}l3di`)
      removeConclusion(`${selectedSide}l4di`)
      removeConclusion(`${selectedSide}l5di`)
      removeConclusion(`${selectedSide}s1di`)
      removeConclusion(`${selectedSide}s2di`)

      removeConclusion(`${selectedSide}c4da`)
      removeConclusion(`${selectedSide}c5da`)
      removeConclusion(`${selectedSide}c6da`)
      removeConclusion(`${selectedSide}c7da`)
      removeConclusion(`${selectedSide}c8da`)
      removeConclusion(`${selectedSide}t1da`)
      removeConclusion(`${selectedSide}t2da`)
      removeConclusion(`${selectedSide}t3da`)
      removeConclusion(`${selectedSide}t4da`)
      removeConclusion(`${selectedSide}t5da`)
      removeConclusion(`${selectedSide}t6da`)
      removeConclusion(`${selectedSide}t7da`)
      removeConclusion(`${selectedSide}t8da`)
      removeConclusion(`${selectedSide}t9da`)
      removeConclusion(`${selectedSide}t10da`)
      removeConclusion(`${selectedSide}t11da`)
      removeConclusion(`${selectedSide}t12da`)
      removeConclusion(`${selectedSide}l2da`)
      removeConclusion(`${selectedSide}l3da`)
      removeConclusion(`${selectedSide}l4da`)
      removeConclusion(`${selectedSide}l5da`)
      removeConclusion(`${selectedSide}s1da`)
      removeConclusion(`${selectedSide}s2da`)

     removeConclusion('izquierdo_trigemino')
     removeConclusion('derecho_trigemino')
     removeConclusion('bilateral_trigemino')
     removeConclusion('izquierdo_trigeminoindemne')
     removeConclusion('derecho_trigeminoindemne')
     removeConclusion('bilateral_trigeminoindemne')
     removeConclusion('izquierdo_trigeminoalterada')
     removeConclusion('derecho_trigeminoalterada')
     removeConclusion('bilateral_trigeminoalterada')
     removeConclusion('izquierdo_trigeminoindemne')

     removeConclusion('derecho_der')
     removeConclusion('izquierdo_der')
     removeConclusion('bilateral_der')

     removeConclusion('dermatomas')
     removeConclusion('izquierdo_dermatomas')
     removeConclusion('derecho_dermatomas')
     removeConclusion('bilateral_dermatomas')
     removeConclusion('dermatomas_indemne')
     removeConclusion('dermatomas_alterada')
     removeConclusion('trigemino_indemne')
     removeConclusion('trigemino_alterada')
     removeConclusion('retardo_en_la_conduccion')
     removeConclusion('bloqueo_en_la_conduccion')
     removeConclusion('deficit_neuronal')
     removeConclusion('sin_respuesta')
     removeConclusion('leve')
     removeConclusion('moderado')
     removeConclusion('severo')
     removeConclusion('perdida_axonal_secundaria')
     removeConclusion('retardo_secundario_en_la_conduccion')
     removeConclusion('izquierdo_trigemino')
     removeConclusion('derecho_trigemino')
     removeConclusion('bilateral_trigemino')
     removeConclusion('tri')

        setStep('A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white"> </h1>
    <div onClick={() => setStep('CDIT')}>
      <ConclusionButton value="trigemino_indemne" title="CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
    </div>
    <div onClick={() => setStep('DDAT')}>
      <ConclusionButton value="trigemino_alterada" title="CON DEFECTO" displayText="ALTERADA " />
    </div>
  </div>

);
}

const StepCDIT = ({ handlePrevStep, handleNextStep, setStep}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')

       
        setStep('A')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('BT')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="izquierdo_trigeminoindemne"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="derecho_trigeminoindemne"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="bilateral_trigeminoindemne"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
)
}



const StepDDAT = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        removeConclusion('tri')
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        removeConclusion('perdida_axonal_secundaria')
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        setStep('BD')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('D1AT')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN" displayText=" RETARDO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('F3AT')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title=" POR BLOQUEO EN LA CONDUCCIÓN" displayText=" BLOQUEO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('D2AT')}>
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" DÉFICIT AXONAL" />
    </div>
    <div onClick={() => setStep('F3AT')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);
}

const StepD1AT = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)

  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('DDAT')} }className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E1AT')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title=" MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title=" SEVERO " displayText="SEVERO " />

    </div>
  </div>
);}


const StepD2AT = ({ handlePrevStep, handleNextStep, setStep }) =>{
  const { removeConclusion } = useContext(ReportContext)

  return (
  <div>
    <div className='button-bar'>
    <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('DDAT')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button  className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('E2AT')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title=" MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title=" SEVERO " displayText=" SEVERO" />

    </div>
  </div>
);}

const StepE1AT = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
         removeConclusion('perdida_axonal_secundaria')
         removeConclusion('dermatomas_izquierdo')
         removeConclusion('dermatomas_derecho')
         removeConclusion('dermatomas_bilateral')
        setStep('D1AT')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('F1AT')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('F1AT')}>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PÉRDIDA AXONAL SECUNDARIA " displayText="+ PÉRDIDA AXONAL" />
      </div>
  </div>
);}

const StepE2AT = ({ handlePrevStep, handleNextStep, setStep }) =>{
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('retardo_secundario_en_la_conduccion')
        removeConclusion('dermatomas_izquierdo')
        removeConclusion('dermatomas_derecho')
        removeConclusion('dermatomas_bilateral')
        setStep('D2AT')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('F2AT')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="+ RETARDO EN LA CONDUCCIÓN" />
  </div>
);}


const StepF1AT = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        
       
        setStep('E1AT')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('BT')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="izquierdo_trigemino"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="derecho_trigemino"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="bilateral_trigemino"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

}

const StepF2AT = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        
        removeConclusion('tri')
        setStep('E2AT')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('BT')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="izquierdo_trigemino"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="derecho_trigemino"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="bilateral_trigemino"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
}



const StepF3AT = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('izquierdo_trigemino')
        removeConclusion('derecho_trigemino')
        removeConclusion('bilateral_trigemino')
        removeConclusion('tri')
       
        removeConclusion('izquierdo_trigeminoindemne')
        removeConclusion('derecho_trigeminoindemne')
        removeConclusion('bilateral_trigeminoindemne')
        
       
        setStep('E1AT')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('BT')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="izquierdo_trigemino"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="derecho_trigemino"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('BT');
        }}>
      <ConclusionButton
        value="bilateral_trigemino"
        title=" DE FORMA BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

}







const StepBT = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs ,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay

       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/somatosensorial?route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal, // Envías la cadena final
          conclusiones, // <--- envías el array de conclusiones
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems, // <--- envía también el array de items arrastrados
          topLeftText, 

        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar PDF");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte-completo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF: ' + error.message);
    } finally {
      document.body.style.cursor = 'default';
      setIsLoading(false); // ✅ Ocultar overlay
    }
  };
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="hourglass">
        <img src="/assets/Extras/I_Time2.svg" alt="Cargando..." />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
           removeConclusion(`${selectedSide}c4di`)
           removeConclusion(`${selectedSide}c5di`)
           removeConclusion(`${selectedSide}c6di`)
           removeConclusion(`${selectedSide}c7di`)
           removeConclusion(`${selectedSide}c8di`)
           removeConclusion(`${selectedSide}t1di`)
           removeConclusion(`${selectedSide}t2di`)
           removeConclusion(`${selectedSide}t3di`)
           removeConclusion(`${selectedSide}t4di`)
           removeConclusion(`${selectedSide}t5di`)
           removeConclusion(`${selectedSide}t6di`)
           removeConclusion(`${selectedSide}t7di`)
           removeConclusion(`${selectedSide}t8di`)
           removeConclusion(`${selectedSide}t9di`)
           removeConclusion(`${selectedSide}t10di`)
           removeConclusion(`${selectedSide}t11di`)
           removeConclusion(`${selectedSide}t12di`)
           removeConclusion(`${selectedSide}l2di`)
           removeConclusion(`${selectedSide}l3di`)
           removeConclusion(`${selectedSide}l4di`)
           removeConclusion(`${selectedSide}l5di`)
           removeConclusion(`${selectedSide}s1di`)
           removeConclusion(`${selectedSide}s2di`)

           removeConclusion(`${selectedSide}c4da`)
           removeConclusion(`${selectedSide}c5da`)
           removeConclusion(`${selectedSide}c6da`)
           removeConclusion(`${selectedSide}c7da`)
           removeConclusion(`${selectedSide}c8da`)
           removeConclusion(`${selectedSide}t1da`)
           removeConclusion(`${selectedSide}t2da`)
           removeConclusion(`${selectedSide}t3da`)
           removeConclusion(`${selectedSide}t4da`)
           removeConclusion(`${selectedSide}t5da`)
           removeConclusion(`${selectedSide}t6da`)
           removeConclusion(`${selectedSide}t7da`)
           removeConclusion(`${selectedSide}t8da`)
           removeConclusion(`${selectedSide}t9da`)
           removeConclusion(`${selectedSide}t10da`)
           removeConclusion(`${selectedSide}t11da`)
           removeConclusion(`${selectedSide}t12da`)
           removeConclusion(`${selectedSide}l2da`)
           removeConclusion(`${selectedSide}l3da`)
           removeConclusion(`${selectedSide}l4da`)
           removeConclusion(`${selectedSide}l5da`)
           removeConclusion(`${selectedSide}s1da`)
           removeConclusion(`${selectedSide}s2da`)
   
          removeConclusion('izquierdo_trigemino')
          removeConclusion('derecho_trigemino')
          removeConclusion('bilateral_trigemino')
          removeConclusion('izquierdo_trigeminoindemne')
          removeConclusion('derecho_trigeminoindemne')
          removeConclusion('bilateral_trigeminoindemne')
          removeConclusion('izquierdo_trigeminoalterada')
          removeConclusion('derecho_trigeminoalterada')
          removeConclusion('bilateral_trigeminoalterada')
          removeConclusion('izquierdo_trigeminoindemne')
 
          removeConclusion('derecho_der')
          removeConclusion('izquierdo_der')
          removeConclusion('bilateral_der')

          removeConclusion('dermatomas')
          removeConclusion('izquierdo_dermatomas')
          removeConclusion('derecho_dermatomas')
          removeConclusion('bilateral_dermatomas')
          removeConclusion('dermatomas_indemne')
          removeConclusion('dermatomas_alterada')
          removeConclusion('trigemino_indemne')
          removeConclusion('trigemino_alterada')
          removeConclusion('retardo_en_la_conduccion')
          removeConclusion('bloqueo_en_la_conduccion')
          removeConclusion('deficit_neuronal')
          removeConclusion('sin_respuesta')
          removeConclusion('leve')
          removeConclusion('moderado')
          removeConclusion('severo')
          removeConclusion('perdida_axonal_secundaria')
          removeConclusion('retardo_secundario_en_la_conduccion')
          removeConclusion('izquierdo_trigemino')
          removeConclusion('derecho_trigemino')
          removeConclusion('bilateral_trigemino')
          removeConclusion('tri')

          setStep('AT')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button id='prev' onClick={() => window.print()} className={`print-button dont-print `}>
          <img src="/I_Print.svg " alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
        </div>
  );
};
export default SimpleMultiStepForm;
