import { ReportContext,DropContext } from '@/src/context';
import { useContext, useState } from 'react';
import { useSession } from "next-auth/react";
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({showStepNumber,conclusionDivRef, elementRef, handleImageChange,droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs}) => {
  const [step, setStep] = useState('A');
  const { data: session } = useSession();

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
  };

  const handleNextStep2 = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('D');
    else if (step === 'D') setStep('E');
    else if (step === 'E') setStep('F');
    else if (step === 'F') setStep('G');
    else if (step === 'G') setStep('H');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'H') setStep('G');
    else if (step === 'G') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // Metodos de movimiento entre menus custom
  const handleNextStep1 = () => {
    if (step === 'A') setStep('B1');
    else if (step === 'B1') setStep ('D1')
    else if (step === 'D1') setStep ('E1')
    else if (step === 'E1') setStep ('F1')
    else if (step === 'F1') setStep ('G1')
  };

  const handlePrevStep1 = () => {
    if (step === 'G1') setStep('F1')
    else if (step === 'F1') setStep('E1')
    else if (step === 'E1') setStep('D1')
    else if (step === 'D1') setStep('B1')
    else if (step === 'B1') setStep ('A')
    
  };

  return (
    <div>
      {/* Metodos que toman cada paso*/}
      {step === 'A' ? (
        <StepA
          handleNextStep={handleNextStep}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'B' ? (
        <StepB
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'B1' ? (
        <StepB1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
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

      {step === 'D1' ? (
        <StepD1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
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
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
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
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null} 

      {step === 'G' ? (
        <StepG
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'H' ? (
        <StepH
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

      {step === 'G1' ? (
        <StepG1
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

const StepA = ({ handleNextStep, handleNextStep1 }) => {
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
        FIBRAS
      </h1>
      
      <div onClick={ handleNextStep }>
        <ConclusionButton value='1' title='NEURONOPATÍA MOTORA (ASTA ANTERIOR MEDULAR)' displayText='MOTORAS - ASTA ANTERIOR MEDULAR'/>
      </div>

      <div onClick={ handleNextStep1 }>
        <ConclusionButton value='sentitiva_ganglio_de_la_raiz_dorsal' title='NEURONOPATÍA SENSITIVA (GANGLIO DE LA RAÍZ DORSAL)' displayText='SENSITIVAS - GANGLIO DE LA RAÍZ DORSAL'/>
      </div>
    </div>
  );
};

const StepB = ({ handleNextStep, handlePrevStep,handleNextStep2 }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('1')
            removeConclusion('sentitiva_ganglio_de_la_raiz_dorsal')
            removeConclusion('2')
            removeConclusion('3')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button>

        {/* <button onClick={handleNextStep2} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button> */}
      </div>

      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='2' title=' HEREDITARIA,' displayText='HEREDITARIA'/>
        <ConclusionButton value='3' title=' ADQUIRIDA,' displayText='ADQUIRIDA'/>
      </div>
    </div>
  );
};

const StepB1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('hereditaria')
            removeConclusion('adquirida')
            removeConclusion('sentitiva_ganglio_de_la_raiz_dorsal')

            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        CLASIFICACIÓN
      </h1>

      <div onClick={ handleNextStep1 }>
        <ConclusionButton value='hereditaria' title=' HEREDITARIA,' displayText='HEREDITARIA'/>
        <ConclusionButton value='adquirida' title=' ADQUIRIDA,' displayText='ADQUIRIDA'/>
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
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('4')
            removeConclusion('5')
            removeConclusion('6')
            removeConclusion('7')
            removeConclusion('8')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        INESTABILIDAD DE MEMBRANA
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='4' title=' CON DENERVACIÓN DIFUSA SEVERA (++++)  ' displayText='DIFUSA SEVERA (++++)'/>
        <ConclusionButton value='5' title=' CON DENERVACIÓN ABUNDANTE PROGRESIVA (+++) ' displayText='ABUNDANTE PROGRESIVA (+++)'/>
        <ConclusionButton value='6' title=' CON DENERVACIÓN ACTIVA MODERADA (++) ' displayText='ACTIVA MODERADA (++)'/>
        <ConclusionButton value='7' title=' CON DENERVACIÓN LEVE (+/+) ' displayText='LEVE (+/+)'/>
        <ConclusionButton value='8' title=' SIN DENERVACIÓN ACTIVA ' displayText='INACTIVA'/>
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
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('bulbar')
            removeConclusion('cervical_miembros_superiores')
            removeConclusion('toracico')
            removeConclusion('lumbar_miembros_inferiores')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} className={`print-button`}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>
      <ConclusionButton value='bulbar' title=' BULBAR ' displayText='BULBAR'/>
      <ConclusionButton value='cervical_miembros_superiores' title=' CERVICAL ' displayText='CERVICAL/MIEMBROS SUPERIORES'/>
      <ConclusionButton value='toracico' title='TORÁCICA ' displayText=' TORÁCICA'/>
      <ConclusionButton value='lumbar_miembros_inferiores' title=' LUMBAR ' displayText='LUMBAR/MIEMBROS INFERIORES'/>
    </div>
  );
};

const StepD1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('generalizada')
            removeConclusion('parcial')
            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>

          <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
          </button>

          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>

      <div onClick={handleNextStep1}>
      <ConclusionButton value='generalizada' title=' DISTRIBUCIÓN GENERALIZADA' displayText='GENERALIZADA'/>
      <ConclusionButton value='parcial' title=' DISTRIBUCIÓN PARCIAL' displayText='PARCIAL'/>
      </div>

      
    </div>
  );
};

const StepE = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('9')
            removeConclusion('10')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>

      <div onClick={handleNextStep}>
        <ConclusionButton value = '9' title = ' SIMÉTRICA.' displayText = 'SIMÉTRICA'/>
        <ConclusionButton value = '10' title = ' ASIMÉTRICA.'  displayText = 'ASIMÉTRICA'/>
      </div>
    </div>
  );
};

const StepE1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('completo')
            removeConclusion('parcial')
            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>

          <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
          </button>

          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      
      <h1 className=' text-xl font-bold text-white'>
        TOPOGRAFÍA
      </h1>

      <div onClick={handleNextStep1}>
      <ConclusionButton value = '9' title = ' SIMÉTRICA;' displayText = 'SIMÉTRICA'/>
      <ConclusionButton value = '10' title = ' ASIMÉTRICA;'  displayText = 'ASIMÉTRICA'/></div>
    </div>
  );
};

const StepF = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('11')
            removeConclusion('12')
            removeConclusion('13')
            // 2) Regresamos 
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}} />
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value = '11' title = ' REINERVACIÓN ABUNDANTE;' displayText= 'ABUNDANTE'/>
        <ConclusionButton value = '12' title = ' REINERVACIÓN DISCRETA;' displayText= 'DISCRETA'/>
        <ConclusionButton value = '13' title = ' SIN REINERVACIÓN;' displayText= 'AUSENTE '/>
      </div>
    </div>
  );
};

const StepF1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('completo1')
            removeConclusion('parcial1')
            removeConclusion('pobre1')
            removeConclusion('nulo1')
            removeConclusion('incierto1')
            // 2) Regresamos 
            handlePrevStep1()
          }} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>

          <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
          </button>

          <button className={`print-button dont-print `}>
          <img src="/I_X.webp" alt="Imprimir" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO DE RECUPERACIÓN
      </h1>
      <div onClick={handleNextStep1}>
      <ConclusionButton value = 'completo1' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETO.' displayText = 'COMPLETO'/>
      <ConclusionButton value = 'pobre1' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'  displayText = 'POBRE NO FUNCIONAL'/>
      <ConclusionButton value = 'nulo1' title = ' PRONÓSTICO DE RECUPERACIÓN NULO.'  displayText = 'NULO'/>
      <ConclusionButton value = 'incierto1' title = ' PRONÓSTICO DE RECUPERACIÓN INCIERTO.'  displayText = 'INCIERTO'/>
      </div>
    </div>
  );
};
const StepG = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            // 1) Quitamos las conclusiones que StepA pudo haber agregado
            removeConclusion('14')
            removeConclusion('16')
            removeConclusion('17')
            removeConclusion('18')
            // 2) Regresamos 
            handlePrevStep()
          }}className={`print-button`}>
          <img src="/I_Out.svg"  style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button className={`print-button`}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO DE RECUPERACIÓN 
      </h1>

      <div onClick={ handleNextStep }>
          <ConclusionButton value = '14' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETO.' displayText = 'COMPLETO'/>
          <ConclusionButton value = '16' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'  displayText = 'POBRE'/>
          <ConclusionButton value = '17' title = ' PRONÓSTICO DE RECUPERACIÓN NULO.'  displayText = 'NULO'/>
          <ConclusionButton value = '18' title = ' PRONÓSTICO DE RECUPERACIÓN INCIERTO.'  displayText = 'INCIERTO'/>
        </div>
    </div>
  );
};

const StepH = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs}) => {
   const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
   const { conclusions } = useContext(ReportContext)
   const { droppedItems } = useContext(DropContext);
   const [isLoading, setIsLoading] = useState(false);
   const handleExportPdf = async () => {
    try {
      setIsLoading(true); // ⌛ Mostrar overlay
  
      const conclusionFinal = copyConclusions;
      const conclusiones = conclusions;
  
      const response = await fetch('/api/pdf/generate-pdf/neuronopatia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          finalConclusion: conclusionFinal,
          conclusiones,
          userData: {
            name: session?.user?.name,
            lastname: session?.user?.lastname,
            email: session?.user?.email,
            cedula: session?.user?.cedula,
            especialidad: session?.user?.especialidad,
            imageUrl: session?.user?.imageUrl,
          },
          droppedItems,
          topLeftText,
        }),
      });
  
      if (!response.ok) throw new Error("Error al generar PDF");
  
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

      <MenuImagenes expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
     

    </div>

  );
};

const StepG1 = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs }) => {
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
  
  
        const response = await fetch('/api/pdf/generate-pdf/neuronopatia', {
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
      
    
      <MenuImagenes  expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />

    </div>
  );
};
export default SimpleMultiStepForm;