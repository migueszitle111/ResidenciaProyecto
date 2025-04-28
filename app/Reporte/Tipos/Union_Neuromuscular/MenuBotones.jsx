//Menubotones.jsx
import { ReportContext,DropContext} from '@/src/context';
import { useSession } from "next-auth/react";
import { useContext, useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import { useImageState } from '../../MetodosBotones';

// Numero de pasos 
const stepsArray = ['A', 'B', 'C', 'D', 'E', 'I'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber,conclusionDivRef, elementRef, handleImageChange,droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs}) => {
  const { data: session } = useSession();
  const [step, setStep] = useState('A');
  const {
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
    else if (step === 'F') setStep('I');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'I') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
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
        ))}+
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
        />
      ) : null}

      {step === 'C' ? (
        <StepC
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'D' ? (
        <StepD
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'E' ? (
        <StepE
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'F' ? (
        <StepF
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'I' ? (
        <StepI
          handlePrevStep={handlePrevStep}
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

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACIÓN
      </h1>
        <div onClick={ handleNextStep }>
          <ConclusionButton value='adquirido' title='BLOQUEO DE LA UNIÓN NEUROMUSCULAR ADQUIRIDO,' displayText={'ADQUIRIDO'}/>
          <ConclusionButton value='hereditario' title='BLOQUEO DE LA UNIÓN NEUROMUSCULAR HEREDITARIO,' displayText={'HEREDITARIO'}/>
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
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('tipo_presinaptico')
            removeConclusion('tipo_postsinaptico')
            removeConclusion('adquirido')
            removeConclusion('hereditario')
            // 2) Regresamos a StepA
            handlePrevStep()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        FISIOPATOLOGÍA
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='tipo_presinaptico' title=' TIPO PRESINÁPTICO ' displayText={'PRESINÁPTICO'}/>                
        <ConclusionButton value='tipo_postsinaptico' title=' TIPO POSTSINÁPTICO ' displayText={'POSTSINÁPTICO'}/>
      </div>
      
      
    </div>
  );
};

const StepC = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('bulbar')
            removeConclusion('proximal')
            removeConclusion('distal')
            handlePrevStep()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>
      <ConclusionButton value='bulbar' title='BULBAR ' displayText={'BULBAR '}   dangerouslySetInnerHTML={{ __html: ' BULBAR' }}/>
      <ConclusionButton value='proximal' title='PROXIMAL ' displayText={'PROXIMAL '}/>
      <ConclusionButton value='distal' title='DISTAL ' displayText={'DISTAL '}/>
    </div>
  );
};

const StepD = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('activa_abundante_difusa')
            removeConclusion('activa_moderada_progresiva')
            handlePrevStep()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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
      <ConclusionButton value='activa_abundante_difusa' title=' (ALTO COMPROMISO RESPIRATORIO)' displayText={'RIESGO ALTO DE COMPROMISO RESPIRATORIO'}/>
      <ConclusionButton value='activa_moderada_progresiva ' title=' (BAJO COMPROMISO RESPIRATORIO)' displayText={'RIESGO BAJO DE COMPROMISO RESPIRATORIO'}/>
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
            removeConclusion('intensidad_leve')
            removeConclusion('intensidad_moderada')
            removeConclusion('intensidad_severa')
            handlePrevStep()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
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

      <div onClick={handleNextStep}>
        <ConclusionButton value='intensidad_leve' title=' DE INTENSIDAD LEVE' displayText={'LEVE'}/>
        <ConclusionButton value='intensidad_moderada' title=' DE INTENSIDAD MODERADA - APRECIABLE CON MANIOBRAS DE ACTIVACIÓN' displayText={'MODERADA'}/>
        <ConclusionButton value='intensidad_severa' title=' DE INTENSIDAD SEVERA - APRECIABLE EN REGISTROS BASALES' displayText={'SEVERA'}/>
      </div>      
    </div>
  );
};

const StepF = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('recuperacion_completa')
            removeConclusion('recuperacion_parcial')
            removeConclusion('recuperacion_nula')
            handlePrevStep()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        RECUPERACIÓN
      </h1>
      <div onClick={ handleNextStep }>
      <ConclusionButton value = 'recuperacion_completa' title = ' CON RECUPERACIÓN COMPLETA AL REPOSO.' displayText={'COMPLETO AL REPOSO'}/>
      <ConclusionButton value = 'recuperacion_parcial' title = ' CON RECUPERACIÓN PARCIAL AL REPOSO.' displayText={'PARCIAL AL REPOSO'}/>
      <ConclusionButton value = 'recuperacion_nula' title = ' SIN RECUPERACIÓN AL REPOSO.' displayText={'SIN RECUPERACIÓN'}/>
      </div>
    </div>
  );
};

const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs}) => {
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
      const response = await fetch('/api/pdf/generate-pdf/unionneuromuscular?route', {
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
        <button onClick={handlePrevStep} className={`print-button`}>
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>



        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>

        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      </div>
      <MenuImagenes   expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
    </div>
  );
};

export default SimpleMultiStepForm;