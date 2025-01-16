import { useState } from 'react';
import { Accordion,AccordionContainer,InternalAccordionContainer} from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import './Style.css';
import { Inter } from 'next/font/google';

// Numero de pasos
const stepsArray = ['A', 'B', 'C1','C2','D1','D2', 'E','E2', 'F','F2','G','H'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {

  // Se da el valor en donde se inicie el primer paso
  const [step, setStep] = useState('A');
  const [selectedSide, setSelectedSide] = useState('');


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
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>}
      {step === 'E2' && <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}/>}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'F2' && <StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  />}
      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'G2' && <StepG2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} />}
      {step === 'G3' && <StepG3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}
    </div>
  );
};
///////////////// Menu de cada paso /////////////////t
const StepA = ({ handleNextStep ,setStep}) => (
  <div>
    <div className='button-bar'>
      <button className="print-button dont-print">
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">VÍA SOMATOSENSORIAL</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('E2')}>
      <ConclusionButton value="indenme" title="VÍA SOMATOSENSORIAL CON INTEGRIDAD FUNCIONAL" displayText="INDEMNE" />   
       </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA SOMATOSENSORIAL CON DEFECTO FUNCIONAL" displayText="ALTERADA " />
    </div>
  </div>
);

const StepB = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('A')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">FISIOPATOLOGÍA</h1>
    <div onClick={() => setStep('C1')}>
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN" displayText=" RETARDO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title=" POR BLOQUEO EN LA CONDUCCIÓN" displayText=" BLOQUEO EN LA CONDUCCIÓN " />
    </div>
    <div onClick={() => setStep('C2')}>
      <ConclusionButton value="deficit_neuronal" title=" AXONAL" displayText=" POR DEFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="sin_respuesta" title=" POR AUSENCIA DE RESPUESTA EVOCABLE" displayText=" SIN RESPUETA" />
    </div>
  </div>
);

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('D1')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title=" MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title=" SEVERO " displayText="SEVERO " />

    </div>
  </div>
);

const StepC2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">GRADO:</h1>
    <div onClick={() => setStep('D2')}>
      <ConclusionButton value="leve" title=" LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title=" MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title=" SEVERO " displayText=" SEVERO" />

    </div>
  </div>
);

const StepD1 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C1')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
      <ConclusionButton value="perdida_axonal_secundaria" title=", Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
  </div>
);

const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('C2')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title=", Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
  </div>
);

const StepE = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setSelectedSide('izquierdo');
          setStep('F');
        }}>
      <ConclusionButton
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('F');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('F');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL,"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);


const StepE2 = ({ handlePrevStep, handleNextStep, setStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('B')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
    <div  onClick={() => {
          setStep('F2');
        }}>
      <ConclusionButton
        value="izquierdo"
        title=" PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('F2');
        }}>
      <ConclusionButton
        value="derecho"
        title=" PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('F2');
        }}>
      <ConclusionButton
        value="bilateral"
        title=" BILATERAL"
        displayText="BILATERAL "
        
      />
    </div>
  </div>
);

const StepF = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <AccordionContainer>
    <Accordion  title='SUPERIORES' value='superiores' type='external'>
      <div onClick={() => setStep('G')} >
      <ConclusionButton value="mediano" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO MEDIANO' displayText="NERVIO MEDIANO"></ConclusionButton>
      <ConclusionButton value="ulnar" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ULNAR' displayText="NERVIO ULNAR"></ConclusionButton>
      <ConclusionButton value="radial_superficial" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL SUPERFICIAL' displayText="NERVIO RADIAL SUPERFICIAL"></ConclusionButton>
      <ConclusionButton value="antebraqueal_cutaneo_lateral" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ANTEBRAQUEAL CUTANEO lATERAL' displayText="NERVIO ANTEBRAQUEAL CUTANEO lATERAL"></ConclusionButton>
      </div>
   </Accordion>
   </AccordionContainer>
   <AccordionContainer>
     <Accordion  title='INFERIORES' value="inferiores" type='external'>
      <div onClick={() => setStep('G3')} >
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
    <div onClick={() => setStep('H')} >
    <ConclusionButton value={`${selectedSide}trigemino`} title=", A TRAVÉS DEL TRACTO Y NUCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGEMINO" />
    </div>
</div>
);

const StepF2 = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('E2')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <AccordionContainer>
    <Accordion  title='SUPERIORES' value='superiores' type='external'>
      <ConclusionButton value="mediano" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO MEDIANO' displayText="NERVIO MEDIANO"></ConclusionButton>
      <ConclusionButton value="ulnar" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ULNAR' displayText="NERVIO ULNAR"></ConclusionButton>
      <ConclusionButton value="radial_superficial" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL SUPERFICIAL' displayText="NERVIO RADIAL SUPERFICIAL"></ConclusionButton>
      <ConclusionButton value="antebraqueal_cutaneo_lateral" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ANTEBRAQUEAL CUTANEO lATERAL' displayText="NERVIO ANTEBRAQUEAL CUTANEO lATERAL"></ConclusionButton>
   </Accordion>
   </AccordionContainer>
   <AccordionContainer>
     <Accordion  title='INFERIORES' value="inferiores" type='external'>
     <ConclusionButton value="tibial" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO TIBIAL' displayText="NERVIO TIBIAL"></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title=', A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PERONEO' displayText="NERVIO PERONEO "></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PERONEO SUPERFICIAL' displayText="NERVIO PERONEO SUPERFICIAL"></ConclusionButton>
     <ConclusionButton value="sural" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SURAL' displayText="NERVIO SURAL"></ConclusionButton>
     <ConclusionButton value="safeno" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SAFENO' displayText="NERVIO SAFENO"></ConclusionButton>
     <ConclusionButton value="femorocutaneo_lateral" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO FEMOROCUTANEO LATERAL' displayText="NERVIO FEMOROCUTANEO LATERAL"></ConclusionButton>
     <ConclusionButton value="pudendo" title=' A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PUDENDO' displayText="NERVIO PUDENDO"></ConclusionButton>
    </Accordion>
    <InternalAccordionContainer>
    <Accordion  title='DERMATOMAS' type='internal'>
      <InternalAccordionContainer>
     <Accordion title='SUPERIORES' type='internal'>
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value="c4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value="c5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value="c6" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value="c7" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value="c8" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
      </div>
      </Accordion>
      </InternalAccordionContainer>
      <InternalAccordionContainer>
      <Accordion  title='INFERIOR TORACICO' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="t1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"  /> 
        <ConclusionButton value="t2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T2" displayText="T2"  />
        <ConclusionButton value="t3" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T3" displayText="T3"  />
        <ConclusionButton value="t4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T4" displayText="T4"  />
        <ConclusionButton value="t5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T5" displayText="T5"  />   
        <ConclusionButton value="t6" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T6" displayText="T6"  />   
        </div>
        < div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="t7" title= "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T7" displayText="T7" />   
        <ConclusionButton value="t8" title= "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T8" displayText="T8" />   
        <ConclusionButton value="t9" title= "A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T9" displayText="T9" />   
        <ConclusionButton value="t10" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T10" displayText="T10"/>   
        <ConclusionButton value="t11" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T11" displayText="T11"/>   
        <ConclusionButton value="t12" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T12" displayText="T12"/>   
        </div>
      </Accordion>
      </InternalAccordionContainer>
      <InternalAccordionContainer>
      <Accordion  title='INFERIOR' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="l1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value="l2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value="l3" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value="l4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value="l5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/>       
        </div>
      </Accordion>
      </InternalAccordionContainer>
      <InternalAccordionContainer>
      <Accordion  title='INFERIOR' type='internal'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="s1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value="s2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />
        </div>
    </Accordion>
    </InternalAccordionContainer>
    </Accordion>
    </InternalAccordionContainer>
    </AccordionContainer>
    <ConclusionButton value="trigemino" title=", A TRAVÉS DEL TRACTO Y NUCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGEMINO" />  
</div>
);


const StepG3 = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
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

const StepG = ({ setStep, selectedImages, handleUndo, handleImageChange, selectedSide }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
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

const StepG2 = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => (
  <div>
    <div className='button-bar'>
    <button onClick={() => setStep('F2')} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Anterior" style={{filter: 'invert(1)'}} />
      </button>
      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>NIVEL: </h1>
    <AccordionContainer>
    <Accordion  title='SUPERIORES' value={'superiores'} type='external'>
      <div onClick={() => setStep('H')}>
      <ConclusionButton value="cortical" title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value="subcortical" title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value="cervical" title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value="periferico" title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
      </div>
    </Accordion>
    </AccordionContainer>
    <AccordionContainer>
    <Accordion  title='INFERIORES' value={'inferiores'} type='external'>
      <div onClick={() => setStep('H')}>
      <ConclusionButton value="cortical" title=", TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value="subcortical" title=", TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilisLemnisco medial)." displayText="SUBCORTICAL" />
      <ConclusionButton value="cervical" title=", TOPOGRÁFICAMENTE A NIVEL CERVICAL (N26: Tracto gracilis-sustancia gris medular)." displayText="CERVICAL" />
      <ConclusionButton value="toracico" title=", TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales-Tracto gracilis). " displayText="TORÁCICO" />
      <ConclusionButton value="lumbosacro" title=", TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular- Raíces dorsales)." displayText="LUMBOSACRO" />
      <ConclusionButton value="periferico" title=", TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas (IA-II)- Plexo sacro)." displayText="PERIFERICO" />
      </div>
    </Accordion>
    </AccordionContainer>

    
  </div>
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

const StepH = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
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
          <button onClick={() => setStep('I')} className="print-button dont-print">
            <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
          </button>
  
          <button onClick={() => window.location.reload()} className={`print-button dont-print`}>
            <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
          </button>
        
          <button onClick={handlePrint} className={`print-button dont-print`}>
            <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                        <DropArea2 isExpanded={expandedDivs[index]}  />
                      </div>
                    </div>
                  </DraggableDiv>
                </div>
              ))}
              
  
              {[12].map((index) => (
                  <div key={index} className={`DivPanel2 ${expandedDivs[index]? 'DivPanel2-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
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
                  <div key={index} className={`DivPanel3 ${expandedDivs[index]? 'DivPanel3-expanded' : ''}`} >
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
  





export default SimpleMultiStepForm;
