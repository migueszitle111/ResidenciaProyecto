import { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';

// Numero de pasos 
const stepsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I1', 'I2', 'J', 'K', 'L', 'M', 'N'];

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
          <ConclusionButton value='aguda' title='POLINEUROPATIA AGUDA' displayText={'AGUDA'}/>                
          <ConclusionButton value='subaguda' title='POLINEUROPATIA SUBAGUDA' displayText={'SUBAGUDA'}/>
          <ConclusionButton value='cronica' title='POLINEUROPATIA CRÓNICA' displayText={'CRÓNICA'}/>
          <ConclusionButton value='antigua' title='POLINEUROPATIA ANTIGUA' displayText={'ANTIGUA'}/>
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
        <button id='prev' onClick={handleNextStep} className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
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

const StepC = ({ handleNextStep, handlePrevStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
        <ConclusionButton value='desmielinizante' title=' TIPO DESMIELINIZANTE' displayText={'DESMIELINIZANTE'}/>
        <ConclusionButton value='aximal2' title=' PRIMARIAMENTE AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'PRIMARIAMENTE AXONAL CON DESMIELINIZACIÓN SECUNDARIA'}/>                
        <ConclusionButton value='desmielinizante2' title=' PRIMARIAMENTE DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA' displayText={'PRIMARIAMENTE DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA'}/>
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
        <button id='prev' onClick={handleNextStep} className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        AGREGADO (opcional)
      </h1>

      <div onClick={ handleNextStep }>
      <ConclusionButton value='activa_abundante_difusa' title=' (DISFUNCIÓN AUTONÓMICA POSITIVA)' displayText={'(DISFUNCIÓN AUTONÓMICA POSITIVA)'}/>
      <ConclusionButton value='activa_moderada_progresiva ' title=' (DISFUNCIÓN AUTONÓMICA NEGATIVA)' displayText={'(DISFUNCIÓN AUTONÓMICA NEGATIVA)'}/>
      </div>

      
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
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FASE
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value='rapidamente_progresiva' title=' RAPIDAMENTE PROGRESIVA' displayText={'RAPIDAMENTE PROGRESIVA'}/>
        <ConclusionButton value='lentamente_progresiva' title=' LENTAMENTE PROGRESIVA' displayText={'LENTAMENTE PROGRESIVA'}/>
        <ConclusionButton value='recidivante_recurrente' title=' RECIDIVANTE/RECURRENTE' displayText={'RECIDIVANTE/RECURRENTE'}/>
        <ConclusionButton value='remitente_regresiva' title=' REMITENTE/REGRESIVA' displayText={'REMITENTE/REGRESIVA'}/>
      </div>

      
    </div>
  );
};

const StepF = ({ handleNextStep, handlePrevStep, handleNextStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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

<<<<<<< HEAD
      <ConclusionButton value='mixta' title=' FIBRAS' displayText={'MIXTA'} />
=======
      <ConclusionButton value='mixta' title=' DE FIBRAS MIXTAS,' displayText={'MIXTA'} />
>>>>>>> 127ab92c99f17af215cf3ba8f097379edb4bbdbd
      <div onClick={handleNextStep}>
            <ConclusionButton value = 'predominio_sentitivo' title = ' DE FIBRAS MIXTAS PREDOMINIO SENSITIVO,' displayText={'• PREDOMINIO SENSITIVO'}/>
            <ConclusionButton value = 'predominio_motor' title = ' DE FIBRAS MIXTAS PREDOMINIO MOTOR,'displayText={'• PREDOMINIO MOTOR'} />
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

const StepG = ({ handleNextStep, handlePrevStep, handleNextStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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

const StepH = ({ handleNextStep, handleNextStep1, handlePrevStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFIA
      </h1>
      
      <div onClick={ handleNextStep }>
      <ConclusionButton value = 'topografia_simetrica' title = ' TOPOGRAFÍA SIMÉTRICA' displayText={'SIMÉTRICA'}/>
      <ConclusionButton value = 'topografia_asimetrica' title = ' TOPOGRAFÍA ASIMÉTRICA' displayText={'ASIMÉTRICA'}/>
      <ConclusionButton value = 'topografia_multi' title = ' TOPOGRAFÍA MULTIFOCAL' displayText={'MULTIFOCAL'}/>
      </div>

      
    </div>
  );
};

const StepI1 = ({ handlePrevStep,handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EXTENSION
      </h1>
      <div onClick={handleNextStep}>
      <ConclusionButton value = 'proximal' title = ' PROXIMAL' displayText={'PROXIMAL'}/>
      <ConclusionButton value = 'distal' title = ' DISTAL' displayText={'DISTAL'} />
      <ConclusionButton value = 'proximal'title = ' SEGMENTARIA' displayText={'SEGMENTARIA'}/>
      <ConclusionButton value = 'proximal' title = ' GENERALIZADA' displayText={'GENERALIZADA'}/>
      </div>
      
    </div>
  );
};

const StepI2 = ({ handlePrevStep1,handleNextStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EXTENSION
      </h1>
      <div onClick={handleNextStep1}>
      <ConclusionButton value = 'proximal' title = ' PROXIMAL' displayText={'PROXIMAL'}/>
      <ConclusionButton value = 'distal' title = ' DISTAL' displayText={'DISTAL'} />
      <ConclusionButton value = 'proximal'title = ' SEGMENTARIA' displayText={'SEGMENTARIA'}/>
      <ConclusionButton value = 'proximal' title = ' GENERALIZADA' displayText={'GENERALIZADA'}/>
      </div>

      
    </div>
  );
};

const StepJ = ({ handlePrevStep,handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>
      <div onClick={handleNextStep}>
      <ConclusionButton value = 'con_presencia_reinervacion' title = ' CON PRESENCIA DE REINERVACIÓN;' displayText={'ACTIVA'}/>
      <ConclusionButton value = 'sin_presencia_reinervacion' title = ' SIN PRESENCIA DE REINERVACIÓN;' displayText={'INACTIVA'}/>
      </div>

      
    </div>
  );
};

const StepK = ({ handlePrevStep, handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO
      </h1>
      <div onClick={handleNextStep}>
      <ConclusionButton value = 'pronostico_recuperacion_completa' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'COMPLETA'}/>
      <ConclusionButton value = 'pronostico_recuperacion_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'PARCIAL FUNCIONAL'}/>
      <ConclusionButton value = 'pronostico_recuperacion_no_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'POBRE NO FUNCIONAL'}/>
      <ConclusionButton value = 'pronostico_recuperacion_nulo' title = ' PRONÓSTICO DE RECUPERACIÓN NULO' displayText={'NULO'}/></div>

      
    </div>
  );
};

const StepL = ({ handlePrevStep2,handleNextStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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

const StepM = ({ handlePrevStep3,handleNextStep3 }) => {
  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DENERVACION
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


  // Función para manejar la carga de la imagen
  const DropArea2 = ({ isExpanded }) => {
    const [imageSrc, setImageSrc] = useState(null); // Estado para la imagen cargada
  
    const handleDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
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
  
    return (
      <div
        className={`dropArea2 ${isExpanded ? 'dropArea2-expanded' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: isExpanded ? '98px' : '40px', // Ajusta el tamaño basado en el estado de expansión
          height: isExpanded ? '92px' : '40px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.3s ease, height 0.3s ease', // Transiciones suaves
          overflow: 'hidden', // Evita que el contenido se desborde
        }}
      >
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
  

const StepN = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {

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