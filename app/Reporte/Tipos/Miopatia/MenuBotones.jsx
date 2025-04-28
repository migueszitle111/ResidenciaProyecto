import { ReportContext,DropContext } from '@/src/context';
import { useContext, useState } from 'react';
import { useSession } from "next-auth/react";
import { Accordion, AccordionContainer } from '../../../components/ReportTemplate/Accordion';
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber,conclusionDivRef, elementRef, handleImageChange,droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs }) => {

  //Se da el valor en donde se inicie el primer paso
  const [step, setStep] = useState('A');

  // Metodos del ultimo paso
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
    else if (step === 'H') setStep('I');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'I') setStep('H');
    else if (step === 'H') setStep('G');
    else if (step === 'G') setStep('F');
    else if (step === 'F') setStep('E');
    else if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  return (
    <div>
      {/* Se crean los objetos paso y se le dan los metodos que necesitan*/}
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

      {step === 'G' ? (
        <StepG
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'H' ? (
        <StepH
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'I' ? (
        <StepI
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

const saveFile = () => {
  const blob = new Blob(["Contenido del archivo"], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "archivo.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
            <ConclusionButton value='evolucion_aguda' title='MIOPATÍA AGUDA' displayText={'AGUDA'}/>
            <ConclusionButton value='evolucion_subaguda' title='MIOPATÍA SUBAGUDA' displayText={'SUBAGUDA'}/>
            <ConclusionButton value='evolucion_cronica' title='MIOPATÍA CRÓNICA' displayText={'CRÓNICA'}/>
            <ConclusionButton value='evolucion_antigua' title='MIOPATÍA ANTIGUA' displayText={'ANTIGUA'}/>
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
            removeConclusion('evolucion_aguda')
            removeConclusion('evolucion_subaguda')
            removeConclusion('evolucion_cronica')
            removeConclusion('evolucion_antigua')
            removeConclusion('adquirida')
            removeConclusion('hereditaria')

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
        CLASIFICACIÓN
      </h1>
      <div onClick={ handleNextStep }>
        <ConclusionButton value='adquirida' title=' ADQUIRIDA,' displayText={'ADQUIRIDA'}/>
        <ConclusionButton value='hereditaria' title=' HEREDITARIA,' displayText={'HEREDITARIA'}/>                
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
            removeConclusion('intensidad_leve')
            removeConclusion('intensidad_moderada')
            removeConclusion('intensidad_severa')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep }>
      <ConclusionButton value='intensidad_leve' title=' INTENSIDAD LEVE' displayText={'LEVE'}/>
      <ConclusionButton value='intensidad_moderada' title=' INTENSIDAD MODERADA' displayText={'MODERADA'}/>
      <ConclusionButton value='intensidad_severa' title=' INTENSIDAD SEVERA' displayText={'SEVERA'}/>
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
            removeConclusion('denervacion_severa')
            removeConclusion('denervacion_abundante')
            removeConclusion('denervacion_progresiva')
            removeConclusion('denervacion_discreta')
            removeConclusion('denervacion_ausente')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INESTABILIDAD DE MEMBRANA
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='denervacion_severa' title=' CON ACTIVIDAD PATOLÓGICA DIFUSA (++++)' displayText={'DIFUSA (++++)'}/>
        <ConclusionButton value='denervacion_abundante' title=' CON ACTIVIDAD PATOLÓGICA ABUNDANTE (+++)' displayText={'ABUNDANTE (+++)'}/>
        <ConclusionButton value='denervacion_progresiva' title=' CON ACTIVIDAD PATOLÓGICA PROGRESIVA (++)' displayText={'PROGRESIVA (++)'}/>
        <ConclusionButton value='denervacion_discreta' title=' CON ACTIVIDAD PATOLÓGICA DISCRETA (+)' displayText={'DISCRETA (+/+)'}/>
        <ConclusionButton value='denervacion_ausente' title=' CON ACTIVIDAD PATOLÓGICA AUSENTE (-)' displayText={'AUSENTE (-)'}/>
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
            removeConclusion('descargas_miotonicas');
            removeConclusion('descargas_repetitivas_complejas');

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
        <ConclusionButton value = 'descargas_miotonicas' title = ' Y DESCARGAS MIOTÓNICAS' displayText={'DESCARGAS MIOTÓNICAS'}/>
        <ConclusionButton value = 'descargas_repetitivas_complejas' title = ' Y DESCARGAS REPETITIVAS COMPLEJAS' displayText={'DESCARGAS REPETITIVAS COMPLEJAS'}/>
      </div>
      
    </div>
  );
};

const StepF = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('distribucion_proximal')
            removeConclusion('distribucion_distal')
            removeConclusion('distribucion_generalizada')
            removeConclusion('generalizada1')
            removeConclusion('anillo_oseo')
            removeConclusion('duchenne_becker')
            removeConclusion('emery_dreifuss')
            removeConclusion('facioescapulohumeral')
            removeConclusion('oculofaringea')
          
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DISTRIBUCIÓN
      </h1>
      
      <div onClick={ handleNextStep }>
        <ConclusionButton value='distribucion_proximal' title=' DE DISTRIBUCIÓN PROXIMAL.' displayText={'PROXIMAL'}/>
        <ConclusionButton value='distribucion_distal' title=' DE DISTRIBUCIÓN DISTAL.' displayText={'DISTAL'}/>
        <ConclusionButton value='generalizada1' title=' DE DISTRIBUCIÓN GENERALIZADA.' displayText={'GENERALIZADA'}/>
      </div>
      
        <AccordionContainer>
          <Accordion title='DISTROFIA' value='DISTROFIA' type='external'>
            <div onClick={ handleNextStep }>
              <ConclusionButton value='anillo_oseo' title=' POR DISTROFIA DE CINTURAS.' displayText={'CINTURAS'}/>
              <ConclusionButton value='duchenne_becker' title=' POR DISTROFIA DE DUCHENNE/BECKER.' displayText={'DUCHENNE/BECKER'}/>
              <ConclusionButton value='emery_dreifuss' title=' POR DISTROFIA DE EMERY-DREIFUSS.' displayText={'EMERY-DREIFUSS'}/>
              <ConclusionButton value='facioescapulohumeral' title=' POR DISTROFIA FACIOESCAPULOHUMERAL.' displayText={'FACIOESCAPULOHUMERAL'}/>
              <ConclusionButton value='oculofaringea' title=' POR DISTROFIA OCULOFARINGEA.' displayText={'OCULOFARINGEA'}/>
            </div>
          </Accordion>
        </AccordionContainer>
      
    </div>
  );
};

const StepG = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('con_reinervacion')
            removeConclusion('sin_reinervacion')
          
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REGENERARCIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='con_reinervacion' title=' PRESENCIA DE REINERVACIÓN DISCRETA;' displayText={'DISCRETA (+)'}/>    
        <ConclusionButton value='con_reinervacion' title=' PRESENCIA DE REINERVACIÓN ABUNDANTE;' displayText={'ABUNDANTE (+++)'}/>               
        <ConclusionButton value='sin_reinervacion' title=' SIN PRESENCIA DE REINERVACIÓN;' displayText={'AUSENTE (-)'}/>
      </div>
      
      
    </div>
  );
};

const StepH = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('completo')
            removeConclusion('parcial_funcional')
            removeConclusion('pobre')
            removeConclusion('nulo')
          
            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO DE RECUPERACIÓN
      </h1>
      <div onClick={ handleNextStep }>
        <ConclusionButton value = 'completo' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'COMPLETA'}/>
        <ConclusionButton value = 'parcial_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'PARCIAL FUNCIONAL'}/>
        <ConclusionButton value = 'pobre' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'POBRE NO FUNCIONAL'}/>
        <ConclusionButton value = 'nulo' title = ' PRONÓSTICO DE RECUPERACIÓN NULO.' displayText={'NULO'}/>
      </div>
      
    </div>
  );
};




const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs }) => {
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
          const response = await fetch('/api/pdf/generate-pdf/miopia?route', {
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

const StepI1 = ({ handlePrevStep1, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs }) => {
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
      const response = await fetch('/api/pdf/generate-pdf/miopia?route', {
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
        <button onClick={handlePrevStep1} className={`print-button`}>
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