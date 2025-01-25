import { useState } from 'react';
import {Accordion,AccordionContainer,InternalAccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import './Style.css';
import { Inter } from 'next/font/google';
const stepsArray = ['A', 'B1', 'B2'];
// Componente principal
const SimpleMultiStepForm = ({ showStepNumber }) => {
  const [step, setStep] = useState('A'); // Inicia en A (nuevo)
  const [selectedSide, setSelectedSide] = useState('');
  // Métodos del último paso (StepH)
  const {selectedImages, history, handleImageChange, handleUndo, handlePrint } = useImageState();

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
      {step === 'B1' && (<StepB1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
      {step === 'C1' && ( <StepC1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
      {step === 'C2' && (<StepC2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'D1' && (<StepD1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'D2' && ( <StepD2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'E1' && ( <StepE1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'E2' && ( <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'F1' && (<StepF1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide} />)}
      {step === 'F2' && (<StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
      {step === 'F3' && (<StepF3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide}   />)}
      {step === 'F4' && (<StepF4 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}  />)}
      {step === 'G1' && (<StepG1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G2' && (<StepG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G3' && (<StepG3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'H1' && (<StepH1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {step === 'H2' && (<StepH2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {step === 'H3' && (<StepH3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {step === 'H4' && (<StepH4 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {/*Inferiores */}
      {step === 'B2' && (<StepB2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
      {step === 'C1_i' && (<StepC1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>)}
      {step === 'C2_i' && (<StepC2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'D1_i' && (<StepD1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'D2_i' && (<StepD2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />)}
      {step === 'E1_i' && (<StepE1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'E2_i' && (<StepE2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>)}
      {step === 'F1_i' && (<StepF1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide} />)}
      {step === 'F2_i' && (<StepF2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep} setSelectedSide={setSelectedSide}  />)}
      {step === 'F3_i' && (<StepF3_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}setSelectedSide={setSelectedSide}   />)}
      {step === 'F4_i' && (<StepF4_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep}  setStep={setStep}  />)}
      {step === 'G1_i' && (<StepG1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G2_i' && (<StepG2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'G3_i' && (<StepG3_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide}  />)}
      {step === 'H1_i' && (<StepH1_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {step === 'H2_i' && (<StepH2_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {step === 'H3_i' && (<StepH3_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
      {step === 'H4_i' && (<StepH4_i handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} handlePrint={handlePrint} />)}
    </div>
  );
};

// 1) StepA (antes StepF) => Menú de Estímulo
const StepA = ({handleNextStep,handlePrevStep,setStep,selectedSide,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('A')} id='prev' className={`print-button dont-print `}>
      </button>
      <button onClick={() => setStep('')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>VÍA SOMATOSENSORIAL ESTIMULO: </h1>
    <AccordionContainer>
    <Accordion  title='SUPERIORES' value='superiores' type='external'>
      <div onClick={() => setStep('B1')} >
      <ConclusionButton value="mediano" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO MEDIANO' displayText="NERVIO MEDIANO"></ConclusionButton>
      <ConclusionButton value="ulnar" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ULNAR' displayText="NERVIO ULNAR"></ConclusionButton>
      <ConclusionButton value="radial_superficial" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL SUPERFICIAL' displayText="NERVIO RADIAL SUPERFICIAL"></ConclusionButton>
      <ConclusionButton value="antebraqueal_cutaneo_lateral" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ANTEBRAQUEAL CUTANEO lATERAL' displayText="NERVIO ANTEBRAQUEAL CUTANEO lATERAL"></ConclusionButton>
      </div>
   </Accordion>
   </AccordionContainer>
   <AccordionContainer>
     <Accordion  title='INFERIORES' value="inferiores" type='external'>
      <div onClick={() => setStep('B2')} >
     <ConclusionButton value="tibial" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO TIBIAL' displayText="NERVIO TIBIAL"></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PERONEO' displayText="NERVIO PERONEO"></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PERONEO SUPERFICIAL' displayText="NERVIO PERONEO SUPERFICIAL"></ConclusionButton>
     <ConclusionButton value="sural" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SURAL' displayText="NERVIO SURAL"></ConclusionButton>
     <ConclusionButton value="safeno" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SAFENO' displayText="NERVIO SAFENO"></ConclusionButton>
     <ConclusionButton value="femorocutaneo_lateral" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO FEMOROCUTANEO LATERAL' displayText="NERVIO FEMOROCUTANEO LATERAL"></ConclusionButton>
     <ConclusionButton value="pudendo" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PUDENDO' displayText="NERVIO PUDENDO"></ConclusionButton>
    </div>
    </Accordion>
    <InternalAccordionContainer> 
    <Accordion  title='DERMATOMAS' type='internal'>
     <InternalAccordionContainer> 
     <Accordion title='CERVICAL' type='internal'> 
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value="c4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value="c5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value="c6" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value="c7" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value="c8" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
         <ConclusionButton value="t1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"   /> 
      </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='TORACICO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="t2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T2" displayText="T2"   />
        <ConclusionButton value="t3" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T3" displayText="T3"   />
        <ConclusionButton value="t4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T4" displayText="T4"   />
        <ConclusionButton value="t5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T5" displayText="T5"   />   
        <ConclusionButton value="t6" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T6" displayText="T6"   />   
        </div>
        < div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="t7" title= "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T7" displayText="T7" />   
        <ConclusionButton value="t8" title= "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T8" displayText="T8"  />   
        <ConclusionButton value="t9" title= "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T9" displayText="T9"  />   
        <ConclusionButton value="t10" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T10" displayText="T10"  />   
        <ConclusionButton value="t11" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T11" displayText="T11"  />   
        <ConclusionButton value="t12" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T12" displayText="T12"  />   
        </div>
      </Accordion>
      </InternalAccordionContainer> 
      <InternalAccordionContainer> 
      <Accordion  title='LUMBOSACRO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="l1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value="l2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value="l3" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value="l4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value="l5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/> 
        <ConclusionButton value="s1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value="s2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />      
        </div>
      </Accordion>
      </InternalAccordionContainer> 
    </Accordion>
    </InternalAccordionContainer> 
    </AccordionContainer>
    <div onClick={() => setStep('')} >
    <ConclusionButton value={`${selectedSide}trigemino`} title=", A TRAVÉS DEL TRACTO Y NUCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGEMINO" />
    </div>
</div>
);

const StepB1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">SUPERIORES </h1>
    <div onClick={() => setStep('F4')}>
      <ConclusionButton value="superior_indenme" title="VÍA SOMATOSENSORIAL CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
    </div>
    <div onClick={() => setStep('C1')}>
      <ConclusionButton value="superior_alterada" title="VÍA SOMATOSENSORIAL CON DEFECTO FUNCIONAL" displayText="ALTERADA " />
    </div>
  </div>

);

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B1')} className="print-button dont-print">
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
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" POR DEFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('F3')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);


const StepD1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1')} className="print-button dont-print">
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
);

const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1')} className="print-button dont-print">
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
);

const StepE1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('D1')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('F1')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
  </div>
);

const StepE2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('D2')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('F2')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
  </div>
);

const StepF1 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E1')} className="print-button dont-print">
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
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G1');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G1');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF2 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E2')} className="print-button dont-print">
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
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G2');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G2');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF3 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1')} className="print-button dont-print">
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
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G3');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G3');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF4 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B1')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('H4');
        }}>
      <ConclusionButton
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('H4');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('H4');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
const StepG1 = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F1')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H1')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL SUPERIOR: </h1>
   
      <ConclusionButton value={`${selectedSide}corticals`} title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticals`} title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicals`} title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}perifericos`} title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
          
  </div>
);

const StepG2 = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F2')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H2')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL SUPERIOR: </h1>
   
      <ConclusionButton value={`${selectedSide}corticals`} title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticals`} title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicals`} title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}perifericos`} title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
          
  </div>
);
const StepG3 = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F3')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H3')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL SUPERIOR: </h1>
   
      <ConclusionButton value={`${selectedSide}corticals`} title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticals`} title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicals`} title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}perifericos`} title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
          
  </div>
);

const StepH1 = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G1')} className="print-button dont-print">
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
const StepH2 = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G2')} className="print-button dont-print">
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
const StepH3 = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G3')} className="print-button dont-print">
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
const StepH4 = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('F4')} className="print-button dont-print">
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

//Inferiores 
const StepB2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">INFERIORES</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('')}>
      <ConclusionButton value="inferior_indenme" title="VÍA SOMATOSENSORIAL CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
       </div>
    <div onClick={() => setStep('C1_i')}>
      <ConclusionButton value="interior_alterada" title="VÍA SOMATOSENSORIAL CON DEFECTO FUNCIONAL" displayText="ALTERADA " />
    </div>
  </div>

);


const StepC1_i = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B2')} className="print-button dont-print">
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
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" POR DEFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('F3_i')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);


const StepD1_i = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1_i')} className="print-button dont-print">
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
);

const StepD2_i = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1_i')} className="print-button dont-print">
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
);

const StepE1_i = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('D1_i')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('F1_i')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
  </div>
);

const StepE2_i = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('D2_i')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('F2_i')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
  </div>
);

const StepF1_i= ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E1_i')} className="print-button dont-print">
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
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G1_i');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G1_i');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF2_i = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E2_i')} className="print-button dont-print">
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
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G2_i');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G2_i');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF3_i = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1_i')} className="print-button dont-print">
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
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('G3_i');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('G3_i');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF4_i = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B1_i')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('H4_i');
        }}>
      <ConclusionButton
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('H4_i');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('H4_i');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);
const StepG1_i = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F1_i')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H1_i')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL INFERIOR: </h1>
    
      <ConclusionButton value={`${selectedSide}corticali`} title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticali`} title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilisLemnisco medial)." displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicali`} title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N26: Tracto gracilis-sustancia gris medular)." displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}toracicoi`} title=", TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales-Tracto gracilis). " displayText="TORÁCICO" />
      <ConclusionButton value={`${selectedSide}lumbosacroi`} title=", TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular- Raíces dorsales)." displayText="LUMBOSACRO" />
      <ConclusionButton value={`${selectedSide}perifericoi`} title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas (IA-II)- Plexo sacro)." displayText="PERIFERICO" />
       
  </div>
);

const StepG2_i = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F2_i')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H2_i')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL INFERIOR: </h1>
    
      <ConclusionButton value={`${selectedSide}corticali`} title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticali`} title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilisLemnisco medial)." displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicali`} title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N26: Tracto gracilis-sustancia gris medular)." displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}toracicoi`} title=", TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales-Tracto gracilis). " displayText="TORÁCICO" />
      <ConclusionButton value={`${selectedSide}lumbosacroi`} title=", TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular- Raíces dorsales)." displayText="LUMBOSACRO" />
      <ConclusionButton value={`${selectedSide}perifericoi`} title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas (IA-II)- Plexo sacro)." displayText="PERIFERICO" />
       
  </div>
);
const StepG3_i = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F3_i')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H3_i')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL INFERIOR: </h1>
    
      <ConclusionButton value={`${selectedSide}corticali`} title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticali`} title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilisLemnisco medial)." displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicali`} title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N26: Tracto gracilis-sustancia gris medular)." displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}toracicoi`} title=", TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales-Tracto gracilis). " displayText="TORÁCICO" />
      <ConclusionButton value={`${selectedSide}lumbosacroi`} title=", TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular- Raíces dorsales)." displayText="LUMBOSACRO" />
      <ConclusionButton value={`${selectedSide}perifericoi`} title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas (IA-II)- Plexo sacro)." displayText="PERIFERICO" />
       
  </div>
);



const StepH1_i = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G1_i')} className="print-button dont-print">
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
const StepH2_i = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G2_i')} className="print-button dont-print">
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
const StepH3_i = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('G3_i')} className="print-button dont-print">
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
const StepH4_i = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() => setStep('F4')} className="print-button dont-print">
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
