import React, { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { useImageState } from '../../MetodosBotones';
import Draggable from 'react-draggable';
import './Style.css';

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
      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint}/>}

    </div>
  );
};
///////////////// Menu de cada paso /////////////////
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
      <ConclusionButton value="indenme" title="VÍA SOMATOSENSORIAL INDEMNE CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA SOMATOSENSORIAL ALTERADA CON DEFECTO FUNCIONAL " displayText="ALTERADA " />
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
      <ConclusionButton value="retardo_en_la_conduccion" title="POR RETARDO EN LA CONDUCCIÓN " displayText="RETARDO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="bloqueo_en_la_conduccion" title="POR BLOQUEO EN LA CONDUCCIÓN " displayText="BLOQUEO EN LA CONDUCCIÓN" />
    </div>
    <div onClick={() => setStep('C2')}>
      <ConclusionButton value="deficit_neuronal" title="AXONAL " displayText="POR DEFICIT NEURONAL" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="sin_respuesta" title="POR AUSENCIA DE RESPUESTA EVOCABLE " displayText="SIN RESPUETA" />
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
      <ConclusionButton value="leve" title="LEVE " displayText="LEVE " />
      <ConclusionButton value="moderado" title="MODERADO " displayText=" MODERADO " />
      <ConclusionButton value="severo" title="SEVERO " displayText="SEVERO " />

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
      <ConclusionButton value="leve" title="LEVE " displayText="LEVE" />
      <ConclusionButton value="moderado" title="MODERADO " displayText="MODERADO" />
      <ConclusionButton value="severo" title="SEVERO " displayText=" SEVERO" />

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
      <ConclusionButton value="perdida_axonal_secundaria" title=" Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
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
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
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
        title="PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setSelectedSide('derecho');
          setStep('F');
        }}>
      <ConclusionButton
        value="derecho"
        title="PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setSelectedSide('bilateral');
          setStep('F');
        }}>
      <ConclusionButton
        value="bilateral"
        title="BILATERAL,"
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
        title="PARA LADO IZQUIERDO "
        displayText="IZQUIERDO"
       
      />
    </div>
    <div  onClick={() => {
          setStep('F2');
        }}>
      <ConclusionButton
        value="derecho"
        title="PARA LADO DERECHO "
        displayText="DERECHO"
       
      />
    </div>
    <div onClick={() => {
          setStep('F2');
        }}>
      <ConclusionButton
        value="bilateral"
        title="BILATERAL,"
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
      <button onClick={() => setStep('G')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <Accordion  title='SUPERIORES'>
      <div onClick={() => setStep('G')} >
      <ConclusionButton value="mediano" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO MEDIANO' displayText="NERVIO MEDIANO"></ConclusionButton>
      <ConclusionButton value="ulnar" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ULNAR' displayText="NERVIO ULNAR"></ConclusionButton>
      <ConclusionButton value="radial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL' displayText="NERVIO RADIAL"></ConclusionButton>
      <ConclusionButton value="radial_superficial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL SUPERFICIAL' displayText="NERVIO RADIAL SUPERFICIAL"></ConclusionButton>
      <ConclusionButton value="antebraqueal_cutaneo_lateral" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ANTEBRAQUEAL CUTANEO lATERAL' displayText="NERVIO ANTEBRAQUEAL CUTANEO lATERAL"></ConclusionButton>
      </div>
   </Accordion>
     <Accordion  title='INFERIORES'>
      <div onClick={() => setStep('G')} >
     <ConclusionButton value="tibial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO TIBIAL' displayText="NERVIO TIBIAL"></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PERONEO SUPERFICIAL' displayText="NERVIO PERONEO SUPERFICIAL"></ConclusionButton>
     <ConclusionButton value="sural" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SURAL' displayText="NERVIO SURAL"></ConclusionButton>
     <ConclusionButton value="safeno" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SAFENO' displayText="NERVIO SAFENO"></ConclusionButton>
     <ConclusionButton value="femorocutaneo_lateral" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO FEMOROCUTANEO LATERAL' displayText="NERVIO FEMOROCUTANEO LATERAL"></ConclusionButton>
     <ConclusionButton value="pudendo" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PUDENDO' displayText="NERVIO PUDENDO"></ConclusionButton>
    </div>
    </Accordion>
    <Accordion  title='DERMATOMAS'>
     <Accordion title='SUPERIORES'>
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value="c4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value="c5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value="c6" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value="c7" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value="c8" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
      </div>
      </Accordion>

      <Accordion  title='INFERIOR TORACICO'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="t1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS T1" displayText="T1"   /> 
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
      <Accordion  title='INFERIOR'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="l1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value="l2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value="l3" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value="l4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value="l5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/>       
        </div>
      </Accordion>
      <Accordion  title='INFERIOR'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="s1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value="s2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />
         
        </div>
      </Accordion>
    </Accordion>
    <div onClick={() => setStep('H')} >
    <ConclusionButton value={`${selectedSide}trigemino`} title="A TRAVÉS DEL TRACTO Y NUCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGEMINO" />
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
    <Accordion  title='SUPERIORES'>
     
      <ConclusionButton value="mediano" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO MEDIANO' displayText="NERVIO MEDIANO"></ConclusionButton>
      <ConclusionButton value="ulnar" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ULNAR' displayText="NERVIO ULNAR"></ConclusionButton>
      <ConclusionButton value="radial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL' displayText="NERVIO RADIAL"></ConclusionButton>
      <ConclusionButton value="radial_superficial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO RADIAL SUPERFICIAL' displayText="NERVIO RADIAL SUPERFICIAL"></ConclusionButton>
      <ConclusionButton value="antebraqueal_cutaneo_lateral" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO ANTEBRAQUEAL CUTANEO lATERAL' displayText="NERVIO ANTEBRAQUEAL CUTANEO lATERAL"></ConclusionButton>
    
   </Accordion>
     <Accordion  title='INFERIORES'>
     <ConclusionButton value="tibial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO TIBIAL' displayText="NERVIO TIBIAL"></ConclusionButton>
     <ConclusionButton value="peroneo_superficial" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PERONEO SUPERFICIAL' displayText="NERVIO PERONEO SUPERFICIAL"></ConclusionButton>
     <ConclusionButton value="sural" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SURAL' displayText="NERVIO SURAL"></ConclusionButton>
     <ConclusionButton value="safeno" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO SAFENO' displayText="NERVIO SAFENO"></ConclusionButton>
     <ConclusionButton value="femorocutaneo_lateral" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO FEMOROCUTANEO LATERAL' displayText="NERVIO FEMOROCUTANEO LATERAL"></ConclusionButton>
     <ConclusionButton value="pudendo" title='A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTIMULO DE NERVIO PUDENDO' displayText="NERVIO PUDENDO"></ConclusionButton>
    </Accordion>
    <Accordion  title='DERMATOMAS'>
     <Accordion title='SUPERIORES'>
       <div style={{ display: 'flex', gap: '8px' }}>
         <ConclusionButton value="c4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C4" displayText="C4" /> 
         <ConclusionButton value="c5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C5" displayText="C5" />
         <ConclusionButton value="c6" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C6" displayText="C6" />
         <ConclusionButton value="c7" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C7" displayText="C7" />
         <ConclusionButton value="c8" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS C8" displayText="C8" />
      </div>
      </Accordion>

      <Accordion  title='INFERIOR TORACICO'>
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
      <Accordion  title='INFERIOR'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="l1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L1" displayText="L1"/> 
        <ConclusionButton value="l2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L2" displayText="L2"/>
        <ConclusionButton value="l3" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L3" displayText="L3"/>
        <ConclusionButton value="l4" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L4" displayText="L4"/>
        <ConclusionButton value="l5" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS L5" displayText="L5"/>       
        </div>
      </Accordion>
      <Accordion  title='INFERIOR'>
        <div style={{ display: 'flex', gap: '8px' }}>
        <ConclusionButton value="s1" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S1" displayText="S1" /> 
        <ConclusionButton value="s2" title="A TRAVÉS DE REGION MEDULAR POSTERIOR AL ESTÍMULO DE DERMATOMAS S2" displayText="S2" />
         
        </div>
    </Accordion>
    </Accordion>
    <ConclusionButton value="trigemino" title="A TRAVÉS DEL TRACTO Y NUCLEO MESENCEFÁLICO AL ESTÍMULO DE NERVIO TRIGÉMINO." displayText="TRIGEMINO" />

  
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
    <h1 className='text-xl font-bold text-white'>NIVEL: </h1>
   
    <Accordion  title='SUPERIORES'>
     
      <ConclusionButton value={`${selectedSide}corticals`} title="TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticals`} title="TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicals`} title="TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}perifericos`} title="TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
      
    </Accordion>
    <Accordion  title='INFERIORES'>
     
      <ConclusionButton value={`${selectedSide}corticali`} title="TOPOGRÁFICAMENTE A NIVEL CORTICAL (P37-N45: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value={`${selectedSide}subcorticali`} title="TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P31-N34: Núcleo gracilisLemnisco medial)." displayText="SUBCORTICAL" />
      <ConclusionButton value={`${selectedSide}cervicali`} title="TOPOGRÁFICAMENTE A NIVEL CERVICAL (N26: Tracto gracilis-sustancia gris medular)." displayText="CERVICAL" />
      <ConclusionButton value={`${selectedSide}toracicoi`} title="TOPOGRÁFICAMENTE A NIVEL TORÁCICO (N24: Astas dorsales-Tracto gracilis). " displayText="TORÁCICO" />
      <ConclusionButton value={`${selectedSide}lumbosacroi`} title="TOPOGRÁFICAMENTE A NIVEL LUMBOSACRO (N20: Cono medular- Raíces dorsales)." displayText="LUMBOSACRO" />
      <ConclusionButton value={`${selectedSide}perifericoi`} title="TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (P9-N18: Fibras nerviosas (IA-II)- Plexo sacro)." displayText="PERIFERICO" />
      
    </Accordion>

    
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
    <Accordion  title='SUPERIORES'>
      <div onClick={() => setStep('H')}>
      <ConclusionButton value="cortical" title="TOPOGRÁFICAMENTE A NIVEL CORTICAL (N20-P25: Núcleo talámico-Área somestésica primaria). " displayText="CORTICAL" />
      <ConclusionButton value="subcortical" title="TOPOGRÁFICAMENTE A NIVEL SUBCORTICAL (P14-N18: Lemnisco medialNúcleo tectal). " displayText="SUBCORTICAL" />
      <ConclusionButton value="cervical" title="TOPOGRÁFICAMENTE A NIVEL CERVICAL (N11-N13: Raíces y astas dorsalesTracto cuneatus). " displayText="CERVICAL" />
      <ConclusionButton value="periferico" title="TOPOGRÁFICAMENTE A NIVEL PERIFÉRICO (N4-N9: Fibras nerviosas (IA-II)- Plexo braquial). " displayText="PERIFERICO" />
      </div>
    </Accordion>
    <Accordion  title='INFERIORES'>
      <div onClick={() => setStep('H')}>
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

const StepH = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => (
  <div>
    <div className='button-bar'>
      <button onClick={() => setStep('G')} className="print-button dont-print">
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






export default SimpleMultiStepForm;
