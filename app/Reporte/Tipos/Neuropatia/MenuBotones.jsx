import { useState } from 'react';
import Draggable from 'react-draggable';
import { Accordion } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';


// Numero de pasos 
//const stepsArray = ['A', 'B', 'B1', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

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
    else if (step === 'C') setStep('CD');
    else if (step === 'CD') setStep('D');
    else if (step === 'D') setStep('E');
    else if (step === 'E') setStep('F');
    else if (step === 'F') setStep('G');
    else if (step === 'G') setStep('H');
    else if (step === 'H') setStep('I');
  };


  const handleNextStep2 = () => {
    if (step === 'CD') setStep('D');
    else if (step === 'D') setStep('E1');
    else if (step === 'E1') setStep('F1');
    else if (step === 'F1') setStep('H1');
    else if (step === 'H1') setStep('I1');
  };

  //------generalizada
  const handleNextStep4 = () => {  //h3 derecha
    if (step === 'B1') setStep('C');
    else if (step === 'C') setStep('C1');
    else if (step === 'C1') setStep('C2');
    else if (step === 'C2') setStep('Dd');
    else if (step === 'Dd') setStep('Ed');
    else if (step === 'Ed') setStep('Fd');
    else if (step === 'Fd') setStep('Gd');
    else if (step === 'Gd') setStep('Hd');
    else if (step === 'Hd') setStep('Id');
  };
  const handleNextStep8 = () => {
    if (step === 'C2') setStep('Dd');
    else if (step === 'Dd') setStep('E1d');
    else if (step === 'E1d') setStep('F1d');
    else if (step === 'F1d') setStep('H1d');
    else if (step === 'H1d') setStep('I1d');
  };


  const handleNextStep3 = () => {
    if (step === 'B1') setStep('C');
    else if (step === 'C') setStep('C1');
    else if (step === 'C1') setStep('C3'); //H4 DERE
    else if (step === 'C3') setStep('Di');
    else if (step === 'Di') setStep('Ei');
    else if (step === 'Ei') setStep('Fi');
    else if (step === 'Fi') setStep('Gi');
    else if (step === 'Gi') setStep('Hi');
    else if (step === 'Hi') setStep('Ii');
  };

  const handleNextStep6 = () => {
    if (step === 'CD') setStep('D');
    else if (step === 'D') setStep('E1i');
    else if (step === 'E1i') setStep('F1i');
    else if (step === 'F1i') setStep('H1i');
    else if (step === 'H1i') setStep('I1i');
  };



  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'I') setStep('H');
    else if (step === 'H') setStep('G');
    else if (step === 'G') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('CD');
    else if (step === 'CD') setStep('C');
    else if (step === 'C') setStep('B1');
    else if (step === 'B1') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep2 = () => {
    if (step === 'I1') setStep('H1');
    else if (step === 'H1') setStep('F1');
    else if (step === 'F1') setStep('E1');
    else if (step === 'E1') setStep('D');
    else if (step === 'D') setStep('CD');
  };



  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep3 = () => {
    if (step === 'Id') setStep('Hd');
    else if (step === 'Hd') setStep('Gd');
    else if (step === 'Gd') setStep('Fd');
    else if (step === 'Fd') setStep('Ed');
    else if (step === 'Ed') setStep('Dd');
    else if (step === 'Dd') setStep('C2');
    else if (step === 'C2') setStep('C1');
    else if (step === 'C1') setStep('C');
    else if (step === 'C') setStep('B1');
  };
  const handlePrevStep6 = () => {
    if (step === 'I1d') setStep('H1d');
    else if (step === 'H1d') setStep('F1d');
    else if (step === 'F1d') setStep('E1d');
    else if (step === 'E1d') setStep('Dd');
    else if (step === 'Dd') setStep('C2');
  };


  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep4 = () => {
    if (step === 'I1i') setStep('H1i');
    else if (step === 'H1i') setStep('G1i');
    else if (step === 'G1i') setStep('F1i');
    else if (step === 'F1i') setStep('E1i');
    else if (step === 'E1i') setStep('Di');
    else if (step === 'Di') setStep('C3');
    else if (step === 'C3') setStep('C1');
    else if (step === 'C1') setStep('C');
    else if (step === 'C') setStep('B1');
  };
  const handlePrevStep8 = () => {
    if (step === 'I1i') setStep('H1i');
    else if (step === 'H1i') setStep('F1i');
    else if (step === 'F1i') setStep('E1i');
    else if (step === 'E1i') setStep('Di');
    else if (step === 'Di') setStep('C2');
  };

  // --------------------------------------------------------------------------------------------------------------
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
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${item === step ? 'bg-orange-500' : ''
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
          handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'CD' ? (
        <StepCD
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'C1' ? (
        <StepC1
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
          handleNextStep4={handleNextStep4}
        />
      ) : null}

      {step === 'C2' ? (
        <StepC2
          handlePrevStep4={handlePrevStep4}
          handleNextStep4={handleNextStep4}

        />
      ) : null}

      {step === 'C3' ? (
        <StepC3
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
        />
      ) : null}


      {step === 'D' ? (
        <StepD
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'Dd' ? (
        <StepDd
          handlePrevStep4={handlePrevStep4}
          handleNextStep4={handleNextStep4}
          handleNextStep8={handleNextStep8}
        />
      ) : null}
      {step === 'Di' ? (
        <StepDi
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
          handleNextStep6={handleNextStep6}
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
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
        />
      ) : null}


      {step === 'Ed' ? (
        <StepEd
          handlePrevStep4={handlePrevStep4}
          handleNextStep4={handleNextStep4}
        />
      ) : null}

      {step === 'E1d' ? (
        <StepE1d
          handlePrevStep8={handlePrevStep8}
          handleNextStep8={handleNextStep8}
        />
      ) : null}


      {step === 'Ei' ? (
        <StepEi
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'E1i' ? (
        <StepE1i
          handlePrevStep6={handlePrevStep6}
          handleNextStep6={handleNextStep6}
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
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
        />
      ) : null}


      {step === 'Fd' ? (
        <StepFd
          handlePrevStep4={handlePrevStep4}
          handleNextStep4={handleNextStep4}
        />
      ) : null}


      {step === 'F1d' ? (
        <StepF1d
          handlePrevStep8={handlePrevStep8}
          handleNextStep8={handleNextStep8}
        />
      ) : null}

      {step === 'Fi' ? (
        <StepFi
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
        />
      ) : null}


      {step === 'F1i' ? (
        <StepF1i
          handlePrevStep6={handlePrevStep6}
          handleNextStep6={handleNextStep6}
        />
      ) : null}


      {step === 'G' ? (
        <StepG
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}



      {step === 'G1' ? (
        <StepG1
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
        />
      ) : null}


      {step === 'Gd' ? (
        <StepGd
          handlePrevStep4={handlePrevStep4}
          handleNextStep4={handleNextStep4}
        />
      ) : null}



      {step === 'G1d' ? (
        <StepG1d
          handlePrevStep8={handlePrevStep8}
          handleNextStep8={handleNextStep8}
        />
      ) : null}
      {step === 'Gi' ? (
        <StepGi
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
        />
      ) : null}

      {step === 'G1i' ? (
        <StepG1i
          handlePrevStep6={handlePrevStep6}
          handleNextStep6={handleNextStep6}
        />
      ) : null}



      {step === 'H' ? (
        <StepH
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}


      {step === 'H1' ? (
        <StepH1
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'Hd' ? (
        <StepHd
          handlePrevStep4={handlePrevStep4}
          handleNextStep4={handleNextStep4}
        />
      ) : null}


      {step === 'H1d' ? (
        <StepH1d
          handlePrevStep8={handlePrevStep8}
          handleNextStep8={handleNextStep8}
        />
      ) : null}
      {step === 'Hi' ? (
        <StepHi
          handlePrevStep3={handlePrevStep3}
          handleNextStep3={handleNextStep3}
        />
      ) : null}


      {step === 'H1i' ? (
        <StepH1i
          handlePrevStep6={handlePrevStep6}
          handleNextStep6={handleNextStep6}
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

      {step === 'I1' ? (
        <StepI1
          handlePrevStep2={handlePrevStep2}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'Id' ? (
        <StepId
          handlePrevStep4={handlePrevStep4}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'I1d' ? (
        <StepI1d
          handlePrevStep8={handlePrevStep8}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'Ii' ? (
        <StepIi
          handlePrevStep3={handlePrevStep3}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'I1i' ? (
        <StepI1i
          handlePrevStep6={handlePrevStep6}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}


    </div>
  );
};
/*     {step === 'G' ? ( <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} /> ) : null}  */
///////////////// Menu de cada paso /////////////////

const StepA = ({ handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button className={`print-button`}>
          <img src="" style={{ filter: 'invert(0.5)' }} />
        </button>

        <button className={`print-button`}>
          <img src="" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EVOLUCION
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value='evolucion_aguda' title='MONO NEUROPATÍA AGUDA' />
        <ConclusionButton value='evolucion_subaguda' title='MONO NEUROPATÍA SUBAGUDA' />
        <ConclusionButton value='evolucion_cronica' title='MONO NEUROPATÍA CRÓNICA ' />
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
        <div onClick={handleNextStep}>
          <ConclusionButton value='MEDIANO' title=' DE NERVIO MEDIANO' displayText='MEDIANO' />
          <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' />
          <ConclusionButton value='AXILAR' title=' DE NERVIO AXILAR' displayText='AXILAR' />
          <ConclusionButton value='MUSCULOCUTANEO' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' />
          <ConclusionButton value='RADIAL' title=' DE NERVIO RADIAL' displayText='RADIAL' />
          <ConclusionButton value='SUPRAESCAPULAR' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' />
          <ConclusionButton value='ULNAR' title=' DE NERVIO ULNAR' displayText='ULNAR' />
          <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' />

          <ConclusionButton value='TORACODORSAL' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' />
          <ConclusionButton value='TORACICO_LARGO' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' />
        </div>
      </Accordion>

      <Accordion title='NERVIOS INFERIORES'>
        <div onClick={handleNextStep}>
          <ConclusionButton value='CIATICO' title=' DE NERVIO CIATICO' displayText='CIATICO' />
          <ConclusionButton value='FEMORAL' title=' DE NERVIO FEMORAL' displayText='FEMORAL' />
          <ConclusionButton value='OBTURADOR' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' />
          <ConclusionButton value='NERVIO_PERONEO' title=' DE NERVIO PERONEO' displayText='PERONEO' />
          <ConclusionButton value='TIBIAL' title=' DE NERVIO TIBIAL' displayText='TIBIAL' />
          <ConclusionButton value='PUDENDO' title=' DE NERVIO PUDENDO' displayText='PUDENDO' />
        </div>
      </Accordion>

      <div onClick={handleNextStep}>
        <ConclusionButton value='FACIAL' title=' DE NERVIO FACIAL' displayText='FACIAL' />
      </div>
    </div>
  );
};

//<ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL CUTÁNEO' displayText='ANTEBRAQUIAL CUTÁNEO' />

// <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' />
//<ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' />

const StepB1 = ({ handleNextStep, handlePrevStep }) => {
  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value='izquierda' title=' IZQUIERDO,' displayText={'IZQUIERDO'} />
        <ConclusionButton value='derecha' title=' DERECHO,' displayText={'DERECHO'} />
      </div>
      <Accordion title='BILATERIAL'>
        <div onClick={handleNextStep}>
          <ConclusionButton value='derecha' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} />
          <ConclusionButton value='izquierda' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} />
          <ConclusionButton value='bilateral' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} />
        </div>
      </Accordion>
    </div>
  );
};

const StepC = ({ handleNextStep, handlePrevStep, handleNextStep3 }) => { ///GENERALIZADA ?

  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value='focalizada' title=' FOCALIZADA A NIVEL DE ' displayText={'FOCALIZADA'} />
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL DE ' displayText={'SEGMENTARIA'} />

      </div>
      <div onClick={handleNextStep3}>
        <ConclusionButton value='generalizada' title=' GENERALIZADA, ' displayText={'GENERALIZADA'} />

      </div>

    </div>
  );
};





const StepC1 = ({ handleNextStep3, handlePrevStep3, handleNextStep4 }) => { //    escoger izq o der
  return (
    <div>
      <div className='button-bar'>
        
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        LADO
      </h1>

      <div onClick={handleNextStep4}>
        <ConclusionButton value='izquierda' title=' IZQUIERDO,' displayText={'IZQUIERDO'} />
      </div>
      <div onClick={handleNextStep3}>
        <ConclusionButton value='derecha' title=' DERECHO,' displayText={'DERECHO'} />
      </div>

    </div>
  );
};





const StepCD = ({ handleNextStep, handlePrevStep }) => {
  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value='seguir' displayText={'LISTO'} />
      </div>

    </div>
  );
};

const StepD = ({ handleNextStep, handlePrevStep, handleNextStep2 }) => {
  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value='AXONAL COMPLETA ' title=' TIPO AXONAL COMPLETA ' displayText={'AXONAL COMPLETA'} />
        <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} />
        <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA '} />
      </div>
      <Accordion title='AXONAL INCOMPLETA'>
        <div onClick={handleNextStep}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} />
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} />
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} />
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} />
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} />
        </div>


      </Accordion>

      <Accordion title='DESMIELINIZANTE '>
        <div onClick={handleNextStep2}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} />
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} />
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} />
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
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={handleNextStep}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} />
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} />
      </div>

    </div>
  );
};

const StepF = ({ handlePrevStep, handleNextStep }) => {
  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} />
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} />
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} />
      </div>


    </div>
  );
};

const StepG = ({ handleNextStep, handlePrevStep }) => {
  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' />
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' />
      </div>


    </div>
  );
};

const StepH = ({ handlePrevStep, handleNextStep }) => {
  return (
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

      <div onClick={handleNextStep}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} />
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div>
    </div>
  );
};

const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {
  return (
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
};

// -------------------------------------------------------------------------------------------------      SIN REINERVACION 
const StepE1 = ({ handleNextStep2, handlePrevStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={handleNextStep2}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} />
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} />
      </div>

    </div>
  );
};

const StepF1 = ({ handlePrevStep2, handleNextStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={handleNextStep2}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} />
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} />
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} />
      </div>


    </div>
  );
};

const StepG1 = ({ handleNextStep2, handlePrevStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={handleNextStep2}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' />
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' />
      </div>


    </div>
  );
};

const StepH1 = ({ handlePrevStep2, handleNextStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep2}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} />
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div>
    </div>
  );
};

const StepI1 = ({ handlePrevStep2, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep2} className={`print-button`}>
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
};





/// 3 ------------------------Generalizada dere


const StepC2 = ({ handleNextStep4, handlePrevStep4 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        NERVIO
      </h1>

      <Accordion title='NERVIOS SUPERIORES'>
        <div onClick={handleNextStep4}>
          <ConclusionButton value='MEDIANO_DERECHA' title='' displayText='MEDIANO' />
          <ConclusionButton value='ACCE_DERECHA' title='' displayText='ACCESORIO' />
          <ConclusionButton value='AXILAR_DERECHA' title='' displayText='AXILAR' />
          <ConclusionButton value='MUSCUTANEO_DERECHA' title='' displayText='MUSCULOCUTÁNEO' />
          <ConclusionButton value='RADIAL_DERECHA' title='' displayText='RADIAL' />
          <ConclusionButton value='SUPRAESCAPULAR_DERECHA' title='' displayText='SUPRAESCAPULAR' />
          <ConclusionButton value='ULNAR_DERECHA' title='' displayText='ULNAR' />
          <ConclusionButton value='FRENICO_DERECHA' title='' displayText='FRÉNICO' />

          <ConclusionButton value='TORACODORSAL_DERECHA' title='' displayText='TORACODORSAL' />
          <ConclusionButton value='TORACICO_DERECHA' title='' displayText='TORÁCICO LARGO' />
        </div>
      </Accordion>

      <Accordion title='NERVIOS INFERIORES'>
        <div onClick={handleNextStep4}>
          <ConclusionButton value='CIATICO_DERECHA' title='' displayText='CIATICO' />
          <ConclusionButton value='FEMORAL_DERECHA' title='' displayText='FEMORAL' />
          <ConclusionButton value='OBTUUADOR_DERECHA' title='' displayText='OBTURADOR' />
          <ConclusionButton value='PERONEO_DERECHA' title='' displayText='PERONEO' />
          <ConclusionButton value='TIBIAL_DERECHA' title='' displayText='TIBIAL' />
          <ConclusionButton value='PUDENDO_DERECHA' title='' displayText='PUDENDO' />
        </div>
      </Accordion>

      <div onClick={handleNextStep4}>
        <ConclusionButton value='FACIAL' title=' DE NERVIO FACIAL' displayText='FACIAL' />
      </div>
    </div>
  );
};

const StepDd = ({ handleNextStep4, handlePrevStep4, handleNextStep8 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TIPO
      </h1>

      <div onClick={handleNextStep4}>
        <ConclusionButton value='AXONAL COMPLETA ' title=' TIPO AXONAL COMPLETA ' displayText={'AXONAL COMPLETA'} />
        <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} />
        <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA '} />
      </div>
      <Accordion title='AXONAL INCOMPLETA'>
        <div onClick={handleNextStep4}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} />
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} />
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} />
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} />
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} />
        </div>


      </Accordion>

      <Accordion title='DESMIELINIZANTE '>
        <div onClick={handleNextStep8}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} />
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} />
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} />
        </div>
      </Accordion>

    </div>
  );
};

const StepEd = ({ handleNextStep4, handlePrevStep4 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={handleNextStep4}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} />
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} />
      </div>

    </div>
  );
};

const StepFd = ({ handlePrevStep4, handleNextStep4 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={handleNextStep4}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} />
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} />
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} />
      </div>


    </div>
  );
};

const StepGd = ({ handleNextStep4, handlePrevStep4 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={handleNextStep4}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' />
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' />
      </div>


    </div>
  );
};

const StepHd = ({ handlePrevStep4, handleNextStep4 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep4} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep4}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} />
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div>
    </div>
  );
};

const StepId = ({ handlePrevStep4, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep4} className={`print-button`}>
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
};

// -------------------------------------------------------------------------------------------------      SIN REINERVACION 
const StepE1d = ({ handleNextStep8, handlePrevStep8 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={handleNextStep8}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} />
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} />
      </div>

    </div>
  );
};

const StepF1d = ({ handlePrevStep8, handleNextStep8 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={handleNextStep8}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} />
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} />
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} />
      </div>


    </div>
  );
};

const StepG1d = ({ handleNextStep8, handlePrevStep8 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={handleNextStep8}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' />
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' />
      </div>


    </div>
  );
};

const StepH1d = ({ handlePrevStep8, handleNextStep8 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep8} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep8}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} />
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div>
    </div>
  );
};

const StepI1d = ({ handlePrevStep8, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep8} className={`print-button`}>
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
};










const StepC3 = ({ handleNextStep3, handlePrevStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        NERVIO
      </h1>

      <Accordion title='NERVIOS SUPERIORES'>
        <div onClick={handleNextStep3}>
          <ConclusionButton value='MEDIANO' title=' DE NERVIO MEDIANO' displayText='MEDIANO' />
          <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' />
          <ConclusionButton value='AXILAR' title=' DE NERVIO AXILAR' displayText='AXILAR' />
          <ConclusionButton value='MUSCULOCUTANEO' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' />
          <ConclusionButton value='RADIAL' title=' DE NERVIO RADIAL' displayText='RADIAL' />
          <ConclusionButton value='SUPRAESCAPULAR' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' />
          <ConclusionButton value='ULNAR' title=' DE NERVIO ULNAR' displayText='ULNAR' />
          <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' />

          <ConclusionButton value='TORACODORSAL' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' />
          <ConclusionButton value='TORACICO_LARGO' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' />
        </div>
      </Accordion>

      <Accordion title='NERVIOS INFERIORES'>
        <div onClick={handleNextStep3}>
          <ConclusionButton value='CIATICO' title=' DE NERVIO CIATICO' displayText='CIATICO' />
          <ConclusionButton value='FEMORAL' title=' DE NERVIO FEMORAL' displayText='FEMORAL' />
          <ConclusionButton value='OBTURADOR' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' />
          <ConclusionButton value='NERVIO_PERONEO' title=' DE NERVIO PERONEO' displayText='PERONEO' />
          <ConclusionButton value='TIBIAL' title=' DE NERVIO TIBIAL' displayText='TIBIAL' />
          <ConclusionButton value='PUDENDO' title=' DE NERVIO PUDENDO' displayText='PUDENDO' />
        </div>
      </Accordion>

      <div onClick={handleNextStep3}>
        <ConclusionButton value='FACIAL' title=' DE NERVIO FACIAL' displayText='FACIAL' />
      </div>
    </div>
  );
};

const StepDi = ({ handleNextStep3, handlePrevStep3, handleNextStep6 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TIPO
      </h1>

      <div onClick={handleNextStep3}>
        <ConclusionButton value='AXONAL COMPLETA ' title=' TIPO AXONAL COMPLETA ' displayText={'AXONAL COMPLETA'} />
        <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} />
        <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA '} />
      </div>
      <Accordion title='AXONAL INCOMPLETA'>
        <div onClick={handleNextStep3}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} />
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} />
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} />
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} />
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN ACTIVA' displayText={'SIN DENERVACIÓN ACTIVA'} />
        </div>


      </Accordion>

      <Accordion title='DESMIELINIZANTE '>
        <div onClick={handleNextStep6}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} />
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} />
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} />
        </div>
      </Accordion>

    </div>
  );
};

const StepEi = ({ handleNextStep3, handlePrevStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={handleNextStep3}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} />
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} />
      </div>

    </div>
  );
};

const StepFi = ({ handlePrevStep3, handleNextStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={handleNextStep3}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} />
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} />
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} />
      </div>


    </div>
  );
};

const StepGi = ({ handleNextStep3, handlePrevStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={handleNextStep3}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' />
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' />
      </div>


    </div>
  );
};

const StepHi = ({ handlePrevStep3, handleNextStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep3}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} />
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div>
    </div>
  );
};

const StepIi = ({ handlePrevStep3, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} className={`print-button`}>
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
};

// -------------------------------------------------------------------------------------------------      SIN REINERVACION 
const StepE1i = ({ handleNextStep6, handlePrevStep6 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FIBRAS
      </h1>
      <div onClick={handleNextStep6}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS '} />
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTOTA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTOTA), ' displayText={' MIXTAS (SENSITIVO-MOTOTA) '} />
      </div>

    </div>
  );
};

const StepF1i = ({ handlePrevStep6, handleNextStep6 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={handleNextStep6}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title='INTENSIDAD LEVE ' displayText={' LEVE (NEUROAPRAXIA)'} />
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title='INTENSIDAD MODERADA ' displayText={' MODERADA (AXONOTMESIS INCOMPLETA)'} />
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title='INTENSIDAD SEVERA ' displayText={' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)'} />
      </div>


    </div>
  );
};

const StepG1i = ({ handleNextStep6, handlePrevStep6 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={handleNextStep6}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' CON REINERVACIÓN ACTIVA ' />
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' SIN REINERVACIÓN ACTIVA ' />
      </div>


    </div>
  );
};

const StepH1i = ({ handlePrevStep6, handleNextStep6 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep6} id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep6}>
        <ConclusionButton value='completo' title='Y PRONÓSTICO DE RECUPERACIÓN COMPLETA' displayText={'RECUPERACIÓN COMPLETA'} />
        <ConclusionButton value='parcial_funcional' title='Y PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
        <ConclusionButton value='pobre' title='Y PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
        <ConclusionButton value='nulo' title='Y PRONÓSTICO DE RECUPERACIÓN NULA' displayText={'RECUPERACION NULA'} /></div>
    </div>
  );
};

const StepI1i = ({ handlePrevStep6, handleUndo, handleImageChange, handlePrint }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep6} className={`print-button`}>
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
};

export default SimpleMultiStepForm;