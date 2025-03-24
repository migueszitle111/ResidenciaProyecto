import { ReportContext,DropContext } from '@/src/context';
import { useContext, useState } from 'react';
import { useSession } from "next-auth/react";
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import './Style.css';

// Numero de pasos
const stepsArray = ['A', 'B', 'C1','C2','D1','D2', 'E','E2', 'F','F2','G'];

// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber,conclusionDivRef, elementRef, droppedItems,topLeftText,setTopLeftText,copyConclusions,expandedDivs,setExpandedDivs }) => {

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
      {step === 'E2' && <StepE2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} setSelectedSide={setSelectedSide}/>}
      {step === 'F' && <StepF handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'F2' && <StepF2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep} selectedSide={selectedSide} setSelectedSide={setSelectedSide} />}
      {step === 'G' && <StepG handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} setStep={setStep}  handlePrint={handlePrint} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>}

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
    <h1 className="text-xl font-bold text-white">VÍA MOTORA CORTICOESPINAL</h1>
    <div onClick={handleNextStep}> 
    </div>
    <div onClick={() => setStep('E2')}>
      <ConclusionButton value="indenme" title="VÍA MOTORA CORTICOESPINAL CON INTEGRIDAD FUNCIONAL " displayText="INDEMNE" />    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value="alterada" title="VÍA MOTORA CORTICOESPINAL CON DEFECTO FUNCIONAL " displayText="ALTERADA " />
    </div>
  </div>
);

const StepB = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
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
        <ConclusionButton value="deficit_neuronal" title="AXONAL " displayText="POR DEFICIT NEURONAL" />
      </div>
      <div onClick={() => setStep('E')}>
        <ConclusionButton value="sin_respuesta" title="POR AUSENCIA DE RESPUESTA EVOCABLE " displayText="SIN RESPUETA" />
      </div>
    </div>
  );
};

const StepC1 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
    <div>
      <div className='button-bar'>
        <button onClick={() => {
            removeConclusion('leve')
            removeConclusion('moderado')
            removeConclusion('severo')
          setStep('B')}} className="print-button dont-print">
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
};

const StepC2 = ({ handlePrevStep, handleNextStep, setStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
          removeConclusion('leve')
          removeConclusion('moderado')
          removeConclusion('severo')
          setStep('B')}} className="print-button dont-print">
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
        <ConclusionButton value="perdida_axonal_secundaria" title=" Y PERDIDA AXONAL SECUNDARIA " displayText="PERDIDA AXONAL SECUNDARIA" />
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
        
        <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
            <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
      </div>
      <h1 className="text-xl font-bold text-white">AXONAL:</h1>
        <ConclusionButton value="retardo_secundario_en_la_conduccion" title="Y RETARDO SECUNDARIO EN LA CONDUCCIÓN " displayText="RETARDO SECUNDARIO EN LA CONDUCCIÓN" />
    </div>
  );
};

const StepE = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return(
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
            removeConclusion('izquierdo')
            removeConclusion('derecho')
            removeConclusion('bilateral')
            setStep('D1')}} className="print-button dont-print">
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
          title="PARA LADO IZQUIERDO,"
          displayText="IZQUIERDO"
        
        />
      </div>
      <div  onClick={() => {
            setSelectedSide('derecho');
            setStep('F');
          }}>
        <ConclusionButton
          value="derecho"
          title="PARA LADO DERECHO,"
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
          displayText="BILATERAL"
          
        />
      </div>
    </div>
  );
};


const StepE2 = ({ handlePrevStep, handleNextStep, setStep,setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)

  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
            removeConclusion('izquierdo')
            removeConclusion('derecho')
            removeConclusion('bilateral')

            setStep('D2')}} className="print-button dont-print">
            <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} className="print-button dont-print">
          <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">LADO:</h1>
      <div  onClick={() => {
            setSelectedSide('izquierdo');
            setStep('F2');
          }}>
        <ConclusionButton
          value="izquierdo"
          title="PARA LADO IZQUIERDO,"
          displayText="IZQUIERDO"
        
        />
      </div>
      <div  onClick={() => {
            setSelectedSide('derecho');
            setStep('F2');
          }}>
        <ConclusionButton
          value="derecho"
          title="PARA LADO DERECHO,"
          displayText="DERECHO"
        
        />
      </div>
      <div onClick={() => {
            setSelectedSide('bilateral');
            setStep('F2');
          }}>
        <ConclusionButton
          value="bilateral"
          title="BILATERAL,"
          displayText="BILATERAL"
          
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
          removeConclusion('cortical')
          removeConclusion(`${selectedSide}cervical`)
          removeConclusion(`${selectedSide}lumbasacro`)

          setStep('E')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <div onClick={() => setStep('G')}>
      <ConclusionButton
        value="cortical"
        title='A TRAVÉS DE REGION MEDULAR ANTEROLATERAL AL ESTIMULO EN CORTEZA MOTORA PRIMARIA'
        displayText='CORTICAL'
      />
    </div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton
        value={`${selectedSide}cervical`}
        title='A TRAVÉS DE REGION MEDULAR ANTEROLATERAL AL ESTIMULO EN ASTAS Y RAICES CERVICALES ANTERIORES'
        displayText='CERVICAL'
        
      />
    </div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton
        value={`${selectedSide}lumbasacro`}
        title='A TRAVÉS DE REGION MEDULAR ANTEROLATERAL AL ESTIMULO EN ASTAS Y RAICES LUMBOSACRAS ANTERIORES'
        displayText='LUMBOSACRO'
        
      />
    </div>
  </div>
  );
};

const StepF2 = ({ handleNextStep, handlePrevStep, setStep,selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
            removeConclusion('cortical')
            removeConclusion('cervicaL')
            removeConclusion('lumbasacro')
          setStep('E2')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" style={{filter: 'invert(0.5)'}} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>ESTIMULO: </h1>
    <div onClick={() => setStep('G')}>
      <ConclusionButton
        value="cortical"
        title='A TRAVÉS DE REGION MEDULAR ANTEROLATERAL AL ESTIMULO EN CORTEZA MOTORA PRIMARIA'
        displayText='CORTICAL'
      />
    </div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton
        value="cervicaL"
        title='A TRAVÉS DE REGION MEDULAR ANTEROLATERAL AL ESTIMULO EN ASTAS Y RAICES CERVICALES ANTERIORES'
        displayText='CERVICAL'
        
      />
    </div>
    <div onClick={() => setStep('G')}>
      <ConclusionButton
        value="lumbasacro"
        title='A TRAVÉS DE REGION MEDULAR ANTEROLATERAL AL ESTIMULO EN ASTAS Y RAICES LUMBOSACRAS ANTERIORES'
        displayText='LUMBOSACRO'
        
      />
    </div>
  </div>
  );
};
  
const StepG = ({ setStep, selectedImages, handleUndo, handlePrint,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs }) => {
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);

  const handleExportPdf = async () => {
    try {
       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusionFormateada = formatConclusions(copyConclusions);

    const conclusiones = conclusions;


      const response = await fetch('/api/pdf/generate-pdf/neuronopatia?route', {
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
    }
  };

  return (
    <div>
      <div className='button-bar'>
        <button onClick={() =>{ 
            removeConclusion('')

          setStep('F')}} className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id='prev' onClick={() => window.print()} className={`print-button dont-print `}>
          <img src="/I_Print.svg " alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>

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
