import { ReportContext, DropContext} from '@/src/context';
import { useContext, useState } from 'react';
import { useSession } from "next-auth/react";
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

// Numero de pasos 
const stepsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I1', 'I2', 'J', 'K', 'L', 'M', 'N'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber,conclusionDivRef, elementRef, handleImageChange,droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs }) => {
  const [step, setStep] = useState('A');

  const {
    selectedImages,
    history,
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
    else if (step === 'H') setStep('I1');
    else if (step === 'I1') setStep('J');
    else if (step === 'J') setStep('K');
    else if (step === 'K') setStep('N');
  };



  const handlePrevStep5 = () => {
    if (step === 'N') setStep('K2');
    else if (step === 'K2') setStep('I3');
    else if (step === 'I3') setStep('H2');
    else if (step === 'H2') setStep('G2');
    else if (step === 'G2') setStep('F2');
    else if (step === 'F2') setStep('E2');
    else if (step === 'E2') setStep('D2');
    else if (step === 'D2') setStep('C');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'N') setStep('K');
    else if (step === 'K') setStep('J');
    else if (step === 'J') setStep('I1');
    else if (step === 'I1') setStep('H');
    else if (step === 'H') setStep('G');
    else if (step === 'G') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // Metodos de movimiento entre menus custom
  const handleNextStep1 = () => {
    if (step === 'H') setStep('I2');
    else if (step === 'I2') setStep('J');
    else if (step === 'J') setStep('K');
  };

  const handlePrevStep1 = () => {
    if (step === 'I2') setStep('H');
  };

  const handleNextStep2 = () => {
    if (step === 'F') setStep('L');
    else if (step === 'L') setStep('G');
  };

  const handlePrevStep2 = () => {
    if (step === 'L') setStep('F');
  };

  const handleNextStep3 = () => {
    if (step === 'G') setStep('M');
    else if (step === 'M') setStep('H');
  };

  const handlePrevStep3 = () => {
    if (step === 'M') setStep('G');
  };

  const handleNextStep4 = () => {
    if (step === 'F') setStep('F2');
    else if (step === 'F2') setStep('G');
  };

  const handlePrevStep4 = () => {
    if (step === 'G') setStep('F2');
    else if (step === 'F2') setStep('F');
  };

  const handleNextStep6 = () => {
    if (step === 'F3') setStep('F4');
    else if (step === 'F4') setStep('G2');
  };

  const handlePrevStep6 = () => {
    if (step === 'G2') setStep('F4');
    else if (step === 'F4') setStep('F3');
  };

  const handleNextStep5 = () => {
    if (step === 'C') setStep('D2');
    else if (step === 'D2') setStep('E2');
    else if (step === 'E2') setStep('F3');
    else if (step === 'F3') setStep('G2');
    else if (step === 'G2') setStep('H2');
    else if (step === 'H2') setStep('I3');
    else if (step === 'I3') setStep('K2');
    else if (step === 'K2') setStep('N');
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
      {/* Metodos que toman cada paso
      {renderTopStepNumbers()}*/}
      {step === 'A' ? (
        <StepA
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'B' ? (
        <StepB
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'C' ? (
        <StepC
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
          handleNextStep5={handleNextStep5}
        />
      ) : null}

      {step === 'D' ? (
        <StepD
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        />
      ) : null}

      {step === 'D2' ? (
        <StepD2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'E' ? (
        <StepE
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        
        />
      ) : null}

      {step === 'E2' ? (
        <StepE2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'F' ? (
        <StepF
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep4={handleNextStep4}
        />
      ) : null}

      {step === 'F2' ? (
        <StepF2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep4={handleNextStep4}
        handlePrevStep4={handlePrevStep4}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'F3' ? (
        <StepF3
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleNextStep4={handleNextStep4}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        handleNextStep6={handleNextStep6}
        />
      ) : null}

      {step === 'F4' ? (
        <StepF4
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleNextStep4={handleNextStep4}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        handleNextStep6={handleNextStep6}
        />
      ) : null}

      {step === 'G' ? (
        <StepG
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        
        />
      ) : null}

      {step === 'G2' ? (
        <StepG2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'H' ? (
        <StepH
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'H2' ? (
        <StepH2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'I1' ? (
        <StepI1
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'I2' ? (
        <StepI2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'I3' ? (
        <StepI3
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'J' ? (
        <StepJ
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        
        />
      ) : null}


      {step === 'K' ? (
        <StepK
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'K2' ? (
        <StepK2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'L' ? (
        <StepL
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'L2' ? (
        <StepL2
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        handleNextStep5={handleNextStep5}
        handlePrevStep5={handlePrevStep5}
        />
      ) : null}

      {step === 'M' ? (
        <StepM
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handlePrevStep3={handlePrevStep3}
        handleNextStep3={handleNextStep3}
        />
      ) : null} 

      {step === 'N' ? (
        <StepN
          handlePrevStep={handlePrevStep}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
          conclusionDivRef={conclusionDivRef}
          elementRef={elementRef}
          droppedItems={droppedItems}
          topLeftText={topLeftText}
          setTopLeftText={setTopLeftText}
          copyConclusions={copyConclusions}
          expandedDivs={expandedDivs}
          setExpandedDivs={setExpandedDivs}
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
        EVOLUCIÓN
      </h1>

        <div onClick={ handleNextStep }>
          <ConclusionButton value='aguda' title='POLINEUROPATÍA AGUDA' displayText={'AGUDA'}/>                
          <ConclusionButton value='subaguda' title='POLINEUROPATÍA SUBAGUDA' displayText={'SUBAGUDA'}/>
          <ConclusionButton value='cronica' title='POLINEUROPATÍA CRÓNICA' displayText={'CRÓNICA'}/>
          <ConclusionButton value='antigua' title='POLINEUROPATÍA ANTIGUA' displayText={'ANTIGUA'}/>
        </div>

        <div className='my-2 flex justify-end items-center'>
      </div>
    </div>
  );
};

const StepB = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('aguda')
            removeConclusion('subaguda')
            removeConclusion('cronica')
            removeConclusion('antigua')
            removeConclusion('hereditaria');
            removeConclusion('adquirida');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACION
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value='hereditaria' title=' HEREDITARIA,' displayText={'HEREDITARIA'}/>                
        <ConclusionButton value='adquirida' title=' ADQUIRIDA,' displayText={'ADQUIRIDA'}/>
      </div>
      
      
    </div>
  );
};

const StepC = ({ handleNextStep, handlePrevStep, handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('aximal');
            removeConclusion('desmielinizante')
            removeConclusion('aximal2')
            removeConclusion('desmielinizante2')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>



        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TIPO
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='aximal' title=' TIPO AXONAL' displayText={'AXONAL'}/>
      </div>
      <div onClick={ handleNextStep5 }>
        <ConclusionButton value='desmielinizante' title=' TIPO DESMIELINIZANTE' displayText={'DESMIELINIZANTE'}/>
      </div>
      <div onClick={ handleNextStep }>
        <ConclusionButton value='aximal2' title=' PRIMARIAMENTE AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'AXONAL > DESMIELINIZANTE'}/>                
        <ConclusionButton value='desmielinizante2' title=' PRIMARIAMENTE DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA' displayText={'DESMIELINIZANTE > AXONAL'}/>
      </div>

      
      
    </div>
  );
};

const StepD = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('activa_abundante_difusa');
            removeConclusion('activa_moderada_progresiva');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        AGREGADO (opcional)
      </h1>

      <div onClick={ handleNextStep }>
      <ConclusionButton value='activa_abundante_difusa' title=' (DISFUNCIÓN AUTONÓMICA POSITIVA)' displayText={'DISFUNCIÓN AUTONÓMICA +'}/>
      <ConclusionButton value='activa_moderada_progresiva' title=' (DISFUNCIÓN AUTONÓMICA NEGATIVA)' displayText={'DISFUNCIÓN AUTONÓMICA -'}/>
      </div>

      
    </div>
  );
};

const StepD2 = ({ handleNextStep, handlePrevStep5, handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('activa_abundante_difusa');
            removeConclusion('activa_moderada_progresiva');

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep5} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        AGREGADO (opcional)
      </h1>

      <div onClick={ handleNextStep5 }>
      <ConclusionButton value='activa_abundante_difusa' title=' (DISFUNCIÓN AUTONÓMICA POSITIVA)' displayText={' DISFUNCIÓN AUTONÓMICA +'}/>
      <ConclusionButton value='activa_moderada_progresiva' title=' (DISFUNCIÓN AUTONÓMICA NEGATIVA)' displayText={'DISFUNCIÓN AUTONÓMICA -'}/>
      </div>

      
    </div>
  );
};

const StepE = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
          removeConclusion('rapidamente_progresiva');
          removeConclusion('lentamente_progresiva');
          removeConclusion('recidivante_recurrente');
          removeConclusion('remitente_regresiva');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FASE
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value='rapidamente_progresiva' title=' RÁPIDAMENTE PROGRESIVA' displayText={'RÁPIDAMENTE PROGRESIVA'}/>
        <ConclusionButton value='lentamente_progresiva' title=' LENTAMENTE PROGRESIVA' displayText={'LENTAMENTE PROGRESIVA'}/>
        <ConclusionButton value='recidivante_recurrente' title=' RECIDIVANTE/RECURRENTE' displayText={'RECIDIVANTE/RECURRENTE'}/>
        <ConclusionButton value='remitente_regresiva' title=' REMITENTE/REGRESIVA' displayText={'REMITENTE/REGRESIVA'}/>
      </div>

      
    </div>
  );
};

const StepE2 = ({ handleNextStep, handlePrevStep5, handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
          removeConclusion('rapidamente_progresiva');
          removeConclusion('lentamente_progresiva');
          removeConclusion('recidivante_recurrente');
          removeConclusion('remitente_regresiva');

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FASE
      </h1>

      <div onClick={handleNextStep5}>
        <ConclusionButton value='rapidamente_progresiva' title=' RAPIDAMENTE PROGRESIVA' displayText={'RAPIDAMENTE PROGRESIVA'}/>
        <ConclusionButton value='lentamente_progresiva' title=' LENTAMENTE PROGRESIVA' displayText={'LENTAMENTE PROGRESIVA'}/>
        <ConclusionButton value='recidivante_recurrente' title=' RECIDIVANTE/RECURRENTE' displayText={'RECIDIVANTE/RECURRENTE'}/>
        <ConclusionButton value='remitente_regresiva' title=' REMITENTE/REGRESIVA' displayText={'REMITENTE/REGRESIVA'}/>
      </div>

      
    </div>
  );
};

const StepF = ({ handleNextStep, handlePrevStep, handleNextStep4 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('motora')
            removeConclusion('sensitiva')
            removeConclusion('mixta')
            removeConclusion('predominio_sentitivo');
            removeConclusion('predominio_motor');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value='motora' title=' DE FIBRAS MOTORAS,' displayText={'MOTORA'}/>
        <ConclusionButton value='sensitiva' title=' DE FIBRAS SENSITIVAS' displayText={'SENSITIVA'}/>
      </div>

      
      <div onClick={handleNextStep4}>
        <ConclusionButton value='mixta' title=' DE FIBRAS MIXTAS ' displayText={'MIXTA'} />
      </div>


        {/* <Accordion title='MIXTA' >
          <div onClick={handleNextStep}>
            <ConclusionButton value = 'predominio_sentitivo' title = ' DE FIBRAS MIXTAS PREDOMINIO SENSITIVO,' displayText={'PREDOMINIO SENSITIVO'}/>
            <ConclusionButton value = 'predominio_motor' title = ' DE FIBRAS MIXTAS PREDOMINIO MOTOR,'displayText={'PREDOMINIO MOTOR'} />
          </div>
        </Accordion> */}
    </div>
  );
};

const StepF2 = ({ handleNextStep, handlePrevStep4, handleNextStep4}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('predominio_sentitivo');
            removeConclusion('predominio_motor');


            handlePrevStep4()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>


      <div onClick={handleNextStep4}>
            <ConclusionButton value = 'predominio_sentitivo' title = ' PREDOMINIO SENSITIVO,' displayText={'PREDOMINIO SENSITIVO'}/>
            <ConclusionButton value = 'predominio_motor' title = ' PREDOMINIO MOTOR,'displayText={'PREDOMINIO MOTOR'} />
      </div>
    </div>
  );
};


const StepF3 = ({handleNextStep5, handleNextStep6}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('motora')
            removeConclusion('sensitiva')
            removeConclusion('mixta')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep5} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>

      <div onClick={handleNextStep5}>
        <ConclusionButton value='motora' title=' DE FIBRAS MOTORAS,' displayText={'MOTORA'}/>
        <ConclusionButton value='sensitiva' title=' DE FIBRAS SENSITIVAS' displayText={'SENSITIVA'}/>
      </div>

      
      <div onClick={handleNextStep6}>
        <ConclusionButton value='mixta' title=' DE FIBRAS MIXTAS ' displayText={'MIXTA'} />
      </div>

    </div>
  );
};

const StepF4 = ({ handleNextStep, handlePrevStep, handleNextStep6 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('predominio_sentitivo')
            removeConclusion('predominio_motor')

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>


      <div onClick={handleNextStep6}>
            <ConclusionButton value = 'predominio_sentitivo' title = ' PREDOMINIO SENSITIVO,' displayText={'PREDOMINIO SENSITIVO'}/>
            <ConclusionButton value = 'predominio_motor' title = ' PREDOMINIO MOTOR,'displayText={'PREDOMINIO MOTOR'} />
      </div>
    </div>
  );
};

const StepG = ({ handleNextStep, handlePrevStep, handleNextStep3 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('intensidad_leve');
            removeConclusion('intensidad_moderada');
            removeConclusion('intensidad_severa');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep3 }>
      <ConclusionButton value = 'intensidad_leve' title = ' INTENSIDAD LEVE' displayText={'LEVE'}/>
      <ConclusionButton value = 'intensidad_moderada' title = ' INTENSIDAD MODERADA' displayText={'MODERADA'}/>
      </div>

      <div onClick={ handleNextStep3 }>
      <ConclusionButton value = 'intensidad_severa' title = ' INTENSIDAD SEVERA' displayText={'SEVERA'}/>
      </div>

      
    </div>
  );
};

const StepG2 = ({ handleNextStep, handlePrevStep5, handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('intensidad_leve');
            removeConclusion('intensidad_moderada');
            removeConclusion('intensidad_severa');
            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep5 }>
      <ConclusionButton value = 'intensidad_leve' title = ' INTENSIDAD LEVE' displayText={'LEVE'}/>
      <ConclusionButton value = 'intensidad_moderada' title = ' INTENSIDAD MODERADA' displayText={'MODERADA'}/>
      </div>

      <div onClick={ handleNextStep5 }>
      <ConclusionButton value = 'intensidad_severa' title = ' INTENSIDAD SEVERA' displayText={'SEVERA'}/>
      </div>

      
    </div>
  );
};


const StepH = ({ handleNextStep, handleNextStep1, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('topografia_simetrica');
            removeConclusion('topografia_asimetrica');
            removeConclusion('topografia_multi');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>
      
      <div onClick={ handleNextStep }>
      <ConclusionButton value = 'topografia_simetrica' title = ' TOPOGRAFÍA SIMÉTRICA' displayText={'SIMÉTRICA'}/>
      <ConclusionButton value = 'topografia_asimetrica' title = ' TOPOGRAFÍA ASIMÉTRICA' displayText={'ASIMÉTRICA'}/>
      <ConclusionButton value = 'topografia_multi' title = ' TOPOGRAFÍA MULTIFOCAL' displayText={'MULTIFOCAL'}/>
      </div>

      
    </div>
  );
};

const StepH2 = ({handlePrevStep5, handleNextStep5}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('topografia_simetrica');
            removeConclusion('topografia_asimetrica');
            removeConclusion('topografia_multi');

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>
      
      <div onClick={ handleNextStep5 }>
      <ConclusionButton value = 'topografia_simetrica' title = ' TOPOGRAFÍA SIMÉTRICA' displayText={'SIMÉTRICA'}/>
      <ConclusionButton value = 'topografia_asimetrica' title = ' TOPOGRAFÍA ASIMÉTRICA' displayText={'ASIMÉTRICA'}/>
      <ConclusionButton value = 'topografia_multi' title = ' TOPOGRAFÍA MULTIFOCAL' displayText={'MULTIFOCAL'}/>
      </div>

      
    </div>
  );
};

const StepI1 = ({ handlePrevStep,handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('proximal')
            removeConclusion('distal')
            removeConclusion('segmentaria')
            removeConclusion('generalizada')
            removeConclusion('proximal')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EXTENSIÓN
      </h1>
      <div onClick={handleNextStep}>
      <ConclusionButton value = 'proximal' title = ' PROXIMAL.' displayText={'PROXIMAL'}/>
      <ConclusionButton value = 'distal' title = ' DISTAL.' displayText={'DISTAL'} />
      <ConclusionButton value = 'proximal'title = ' SEGMENTARIA.' displayText={'SEGMENTARIA'}/>
      <ConclusionButton value = 'proximal' title = ' GENERALIZADA.' displayText={'GENERALIZADA'}/>
      </div>
      
    </div>
  );
};

const StepI2 = ({ handlePrevStep1,handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('proximal')
            removeConclusion('distal')
            removeConclusion('segmentaria')
            removeConclusion('generalizada')
            removeConclusion('proximal')

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EXTENSIÓN
      </h1>
      <div onClick={handleNextStep1}>
      <ConclusionButton value = 'proximal' title = ' PROXIMAL.' displayText={'PROXIMAL'}/>
      <ConclusionButton value = 'distal' title = ' DISTAL.' displayText={'DISTAL'} />
      <ConclusionButton value = 'proximal'title = ' SEGMENTARIA.' displayText={'SEGMENTARIA'}/>
      <ConclusionButton value = 'proximal' title = ' GENERALIZADA.' displayText={'GENERALIZADA'}/>
      </div>

      
    </div>
  );
};

const StepI3 = ({ handlePrevStep5,handleNextStep1, handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('proximal')
            removeConclusion('distal')
            removeConclusion('segmentaria')
            removeConclusion('generalizada')
            removeConclusion('proximal')

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EXTENSIÓN
      </h1>
      <div onClick={handleNextStep5}>
      <ConclusionButton value = 'proximal' title = ' PROXIMAL' displayText={'PROXIMAL'}/>
      <ConclusionButton value = 'distal' title = ' DISTAL' displayText={'DISTAL'} />
      <ConclusionButton value = 'proximal'title = ' SEGMENTARIA' displayText={'SEGMENTARIA'}/>
      <ConclusionButton value = 'proximal' title = ' GENERALIZADA' displayText={'GENERALIZADA'}/>
      </div>

      
    </div>
  );
};

const StepJ = ({ handlePrevStep,handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('con_presencia_reinervacion')
            removeConclusion('sin_presencia_reinervacion')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>
      <div onClick={handleNextStep}>
      <ConclusionButton value = 'con_presencia_reinervacion' title = ' REINERVACIÓN ACTIVA;' displayText={'ACTIVA'}/>
      <ConclusionButton value = 'sin_presencia_reinervacion' title = ' REINERVACIÓN INACTIVA;' displayText={'INACTIVA'}/>
      </div>

      
    </div>
  );
};

const StepK = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('pronostico_recuperacion_completa')
            removeConclusion('pronostico_recuperacion_funcional')
            removeConclusion('pronostico_recuperacion_no_funcional')
            removeConclusion('pronostico_recuperacion_nulo')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO DE RECUPERACIÓN
      </h1>
      <div onClick={handleNextStep}>
      <ConclusionButton value = 'pronostico_recuperacion_completa' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'COMPLETA'}/>
      <ConclusionButton value = 'pronostico_recuperacion_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'PARCIAL FUNCIONAL'}/>
      <ConclusionButton value = 'pronostico_recuperacion_no_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'POBRE NO FUNCIONAL'}/>
      <ConclusionButton value = 'pronostico_recuperacion_nulo' title = ' PRONÓSTICO DE RECUPERACIÓN NULO' displayText={'NULO'}/></div>

      
    </div>
  );
};

const StepK2 = ({ handlePrevStep5, handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('pronostico_recuperacion_completa')
            removeConclusion('pronostico_recuperacion_funcional')
            removeConclusion('pronostico_recuperacion_no_funcional')
            removeConclusion('pronostico_recuperacion_nulo')

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO DE RECUPERACIÓN
      </h1>
      <div onClick={handleNextStep5}>
      <ConclusionButton value = 'pronostico_recuperacion_completa' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'COMPLETA'}/>
      <ConclusionButton value = 'pronostico_recuperacion_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'PARCIAL FUNCIONAL'}/>
      <ConclusionButton value = 'pronostico_recuperacion_no_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'POBRE NO FUNCIONAL'}/>
      <ConclusionButton value = 'pronostico_recuperacion_nulo' title = ' PRONÓSTICO DE RECUPERACIÓN NULO' displayText={'NULO'}/></div>

      
    </div>
  );
};

const StepL = ({ handlePrevStep2,handleNextStep2 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('predominio_sentitivo');
            removeConclusion('predominio_motor');

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      
      <div onClick={handleNextStep2}>
      <ConclusionButton value = 'predominio_sentitivo' title = 'PREDOMINIO SENSITIVO,' />
      <ConclusionButton value = 'predominio_motor' title = 'PREDOMINIO MOTOR,' />
      </div>

      
    </div>
  );
};

const StepL2 = ({ handlePrevStep5,handleNextStep5 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
            removeConclusion('predominio_sentitivo');
            removeConclusion('predominio_motor');

            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      
      <div onClick={handleNextStep5}>
      <ConclusionButton value = 'predominio_sentitivo' title = 'PREDOMINIO SENSITIVO,' />
      <ConclusionButton value = 'predominio_motor' title = 'PREDOMINIO MOTOR,' />
      </div>

      
    </div>
  );
};


const StepM = ({ handlePrevStep3,handleNextStep3 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button button  onClick={() => {
          removeConclusion('denervacion_difusa');
          removeConclusion('denervacion_abundante');
          removeConclusion('denervacion_progresiva');
          removeConclusion('denervacion_discreta');
          removeConclusion('sin_denervacion_activa');

            handlePrevStep3()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INESTABILIDAD DE MEMBRANA
      </h1>
      
      <div onClick={handleNextStep3}>
      <ConclusionButton value = 'denervacion_difusa' title = ' CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
      <ConclusionButton value = 'denervacion_abundante' title = ' CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
      <ConclusionButton value = 'denervacion_progresiva' title = ' CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
      <ConclusionButton value = 'denervacion_discreta' title = ' CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
      <ConclusionButton value = 'sin_denervacion_activa' title = ' SIN DENERVACIÓN ACTIVA,' displayText={'AUSENTE'}/>
      </div>

      
    </div>
  );
};


const StepN = ({handlePrevStep, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs }) => {
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
      const response = await fetch('/api/pdf/generate-pdf/polineuropatia?route', {
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
        <button button  onClick={() => {
          removeConclusion('denervacion_difusa');
          removeConclusion('denervacion_abundante');
          removeConclusion('denervacion_progresiva');
          removeConclusion('denervacion_discreta');
          removeConclusion('sin_denervacion_activa');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>


        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      </div>

      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />

    </div>
  );
};

export default SimpleMultiStepForm;