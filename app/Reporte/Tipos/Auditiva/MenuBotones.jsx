import { ReportContext,DropContext } from '@/src/context';
import { useContext, useState } from 'react';
import { useSession } from "next-auth/react";
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C1','C2','D1','D2', 'E','E2', 'F','F2','G','H','I','J'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber, conclusionDivRef, elementRef, handleImageChange,droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs}) => {

  // Se da el valor en donde se inicie el primer paso
  const [step, setStep] = useState('A');
  const [selectedSide, setSelectedSide] = useState('');

  // Metodos del ultimo paso
  const {
    selectedImages,
    history,
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
      {step === 'E2' && <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}setSelectedSide={setSelectedSide} />}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'H' && <StepH handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'I' && <StepI handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide}/>}
      {step === 'J' && <StepJ handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}    handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>}
      {step === 'J2' && <StepJ2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>}
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
    <h1 className="text-xl font-bold text-white">VÍA AUDITIVA</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('E2')}>
      <ConclusionButton value="indemne" title="VÍA AUDITIVA CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA AUDITIVA CON DEFECTO " displayText="ALTERADA " />
    </div>
  </div>
);

const StepB = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('indenme')
        removeConclusion('alterada')
        removeConclusion('retardo_en_la_conduccion')
        removeConclusion('bloqueo_en_la_conduccion')
        removeConclusion('deficit_neuronal')
        removeConclusion('sin_respuesta')
        setStep('A')}} className="print-button dont-print">
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
      <ConclusionButton value="deficit_neuronal" title="AXONAL " displayText="DEFICIT AXONAL" />
    </div>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="sin_respuesta" title="POR AUSENCIA DE RESPUESTA EVOCABLE " displayText="SIN RESPUETA" />
    </div>
  </div>
);
};

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() => {
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('B')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('D1')} className="print-button dont-print">
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
};

const StepC2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('leve')
        removeConclusion('moderado')
        removeConclusion('severo')
        setStep('B')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('D2')} className="print-button dont-print">
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
};

const StepD1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('perdida_axonal_secundaria')
        setStep('C1')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">RETARDO EN CONDUCCION: </h1>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="perdida_axonal_secundaria" title=" Y PÉRDIDA AXONAL SECUNDARIA " displayText="+ PÉRDIDA AXONAL" />
      </div>
  </div>
);
};

const StepD2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
        removeConclusion('retardo_secundario_en_la_conduccion')
        setStep('C2')}} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => setStep('E')} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
    </div>
    <h1 className="text-xl font-bold text-white">AXONAL:</h1>
    <div onClick={() => setStep('E')}>
      <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="+ RETARDO EN LA CONDUCCIÓN" />
      </div>
  </div>
);
};

const StepE = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
      <div>
        <div className='button-bar'>
          <button onClick={() =>{ 
            removeConclusion('izquierdo')
            removeConclusion('derecho')
            removeConclusion('bilateral')
            setStep('D1')}} className="print-button dont-print">
            <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
          </button>

          <button onClick={()=>setStep('F')} className="print-button dont-print">
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
            title="DE FORMA BILATERAL,"
            displayText="BILATERAL "
            
          />
        </div>
      </div>
  );
};


const StepE2 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide}) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
  <div>
    <div className='button-bar'>
      <button onClick={() =>{ 
          removeConclusion('izquierdo')
          removeConclusion('derecho')
          removeConclusion('bilateral')
          removeConclusion('indemne')
          removeConclusion('izquierdoindemne')
          removeConclusion('derechoindemne')
          removeConclusion('bilateralindemne')

          setStep('D2')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>

      <button onClick={() => setStep('J2')} className="print-button dont-print">
        <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className="text-xl font-bold text-white">LADO:</h1>
        <div  onClick={() => {
              setSelectedSide('izquierdo');
              setStep('J2');
            }}>
          <ConclusionButton
            value="izquierdoindemne"
            title="PARA LADO IZQUIERDO A TRAVÉS DEL TALLO CEREBRAL."
            displayText="IZQUIERDO"
          
          />
        </div>
        <div  onClick={() => {
              setSelectedSide('derecho');
              setStep('J2');
            }}>
          <ConclusionButton
            value="derechoindemne"
            title="PARA LADO DERECHO A TRAVÉS DEL TALLO CEREBRAL."
            displayText="DERECHO"
          
          />
        </div>
        <div onClick={() => {
              setSelectedSide('bilateral');
              setStep('J2');
            }}>
          <ConclusionButton
            value="bilateralindemne"
            title="DE FORMA BILATERAL A TRAVÉS DEL TALLO CEREBRAL."
            displayText="BILATERAL "
            
          />
        </div>
      </div>
);
};



const StepF = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
          removeConclusion('rostral')
          removeConclusion('caudal')
          removeConclusion('tallo_cerebral')
          setStep('E')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => setStep('G')} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>REGIÓN: </h1>
    
      <div onClick={() => setStep('G')}>
        <ConclusionButton value='rostral' title=' A TRAVÉS DE REGIÓN ROSTRAL DEL TALLO CEREBRAL' displayText='ROSTRAL (III-V)' />
        <ConclusionButton value='caudal' title=' A TRAVÉS DE REGIÓN CAUDAL DEL TALLO CEREBERAL' displayText='CAUDAL (I-III)' />
        <ConclusionButton value='tallo_cerebral' title=' A TRAVÉS DEL TALLO CEREBERAL' displayText='TOTAL (I-V)' />
      </div>
    </div>
  );
};

// ...
const StepG = ({
  setStep,
  selectedSide,
  // otras props que necesites
}) => {
  const { updateConclusions } = useContext(ReportContext)
  const { removeConclusion } = useContext(ReportContext)

  // Array de los 5 niveles, EN ORDEN.
  // Nota que "value" incluye "selectedSide".
  const levels = [
    {
      title: '; TOPOGRÁFICAMENTE A NIVEL DE NERVIO AUDITIVO.',
      value: `${selectedSide}nervio_auditivo`,
      displayText: 'NERVIO AUDITIVO (I)'
    },
    {
      title: '; TOPOGRÁFICAMENTE A NIVEL DE NÚCLEO COCLEAR.',
      value: `${selectedSide}nucleo_coclear`,
      displayText: 'NUCLEO COCLEAR (II)'
    },
    {
      title: '; TOPOGRÁFICAMENTE A NIVEL DE COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE.',
      value: `${selectedSide}completo_olivar_trapezoide`,
      displayText: 'COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE (III)'
    },
    {
      title: '; TOPOGRÁFICAMENTE A NIVEL DE LEMNISCO LATERAL.',
      value: `${selectedSide}lemnisco_lateral`,
      displayText: 'LEMNISCO LATERAL (IV)'
    },
    {
      title: '; TOPOGRÁFICAMENTE A NIVEL DE COLÍCULO INFERIOR.',
      value: `${selectedSide}coliculo_inferior`,
      displayText: 'COLÍCULO INFERIOR (V)'
    },
  ]

  // Cuando clican cualquiera de los 5, seleccionamos
  // a partir de ÉL hasta el final (incluyéndolo).
 const handleConclusionClick = (title, value) => {
  setStep('H')
  const index = levels.findIndex(item => item.value === value);
  if (index === -1) {
    updateConclusions({ title, value });
    return;
  }

  // Limpia los niveles previos (si tu contexto lo permite),
  // o de lo contrario sobrescribe la conclusión anterior.
  // Luego agregas desde 'index' hasta el final:
  for (let i = index; i < levels.length; i++) {
    updateConclusions({
      title: i === index ? levels[i].title : '', // Solo el clicado conserva su título
      value: levels[i].value,
    });
  }
};


  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
          removeConclusion(`${selectedSide}nervio_auditivo`)
          removeConclusion(`${selectedSide}nucleo_coclear`)
          removeConclusion(`${selectedSide}completo_olivar_trapezoide`)
          removeConclusion(`${selectedSide}lemnisco_lateral`)
          removeConclusion(`${selectedSide}coliculo_inferior`)

          setStep('F')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

      <button onClick={() => setStep('H')} id='next' className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
      </button>

      </div>

      <h1 className='text-xl font-bold text-white'>NIVEL: </h1>
      
      {/* Botón 1 (especial) */}
      <ConclusionButton
        value={`${selectedSide}nervio_auditivo`}
        title="; TOPOGRÁFICAMENTE A NIVEL DE NERVIO AUDITIVO."
        displayText="NERVIO AUDITIVO (I)"
        onClick={handleConclusionClick}   // <--- Pasamos la función
      />

      {/* Botón 2 (normal) */}
      <ConclusionButton
        value={`${selectedSide}nucleo_coclear`}
        title="; TOPOGRÁFICAMENTE A NIVEL DE NÚCLEO COCLEAR."
        displayText="NUCLEO COCLEAR (II)"
        onClick={handleConclusionClick}   // <--- misma función
      />

      {/* Botón 3 (normal) */}
      <ConclusionButton
        value={`${selectedSide}completo_olivar_trapezoide`}
        title="; TOPOGRÁFICAMENTE A NIVEL DE COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE."
        displayText="COMPLEJO OLIVAR SUPERIOR Y CUERPO TRAPEZOIDE (III)"
        onClick={handleConclusionClick}
      />

      {/* Botón 4 (normal) */}
      <ConclusionButton
        value={`${selectedSide}lemnisco_lateral`}
        title="; TOPOGRÁFICAMENTE A NIVEL DE LEMNISCO LATERAL."
        displayText="LEMNISCO LATERAL (IV)"
        onClick={handleConclusionClick}
      />

      {/* Botón 5 (normal) */}
      <ConclusionButton
        value={`${selectedSide}coliculo_inferior`}
        title="; TOPOGRÁFICAMENTE A NIVEL DE COLÍCULO INFERIOR."
        displayText="COLÍCULO INFERIOR (V)"
        onClick={handleConclusionClick}
      />
    </div>
  )
}




const StepH = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
          removeConclusion('normoacusia')
          removeConclusion('hipoacusia_leve')
          removeConclusion('hipoacusia_moderada')
          removeConclusion('hipoacusia_severa')
          removeConclusion('hipocusia_profunda')

          setStep('G')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => setStep('I')} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>UMBRAL AUDITIVO: </h1>
      <div onClick={() => setStep('I')}>
      <ConclusionButton value='normoacusia' title='  UMBRAL PARA TONOS ALTOS COMPATIBLE CON NORMOACUSIA' displayText='NORMOACUSIA '/> 
      <ConclusionButton value='hipoacusia_leve' title=' UMBRAL PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA LEVE' displayText='HIPOACUSIA LEVE'/> 
      <ConclusionButton value='hipoacusia_moderada' title=' UMBRAL PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA MODERADA' displayText='HIPOACUSIA MODERADA'/> 
      <ConclusionButton value='hipoacusia_severa' title=' UMBRAL PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA SEVERA' displayText='HIPOACUSIA SEVERA'/> 
      <ConclusionButton value='hipocusia_profunda' title=' UMBRAL PARA TONOS ALTOS COMPATIBLE CON HIPOACUSIA PROFUNDA' displayText='HIPOACUSIA PROFUNDA'/> 
      </div>
    </div>
  );
};

const StepI = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
          removeConclusion('neurosensorial')
          removeConclusion('conductiva')

          setStep('H')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => setStep('J')} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>TIPO: </h1>
      <div onClick={() => setStep('J')}>
      <ConclusionButton value='neurosensorial' title=' DE TIPO NEUROSENSORIAL.' displayText='NEUROSENSORIAL'/> 
      <ConclusionButton value='conductiva' title=' DE TIPO CONDUCTIVA.' displayText='CONDUCTIVA'/> 
      </div>
    </div>
  );
};



const StepJ = ({ setStep, selectedImages, handleUndo, handleImageChange, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
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


      const response = await fetch('/api/pdf/generate-pdf/auditiva?route', {
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
    }finally {
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
          removeConclusion('neurosensorial')
          removeConclusion('conductiva')

          setStep('I')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
        
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        {/* <button id='prev' onClick={() => window.print()} className={`print-button dont-print `}>
          <img src="/I_Print.svg " alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button> */}

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

const StepJ2 = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
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
      const response = await fetch('/api/pdf/generate-pdf/auditiva?route', {
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
      <button onClick={() => setStep('E2')} className="print-button dont-print">
        <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
      </button>
      
      <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        {/* <button id='prev' onClick={() => window.print()} className={`print-button dont-print `}>
          <img src="/I_Print.svg " alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button> */}

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
