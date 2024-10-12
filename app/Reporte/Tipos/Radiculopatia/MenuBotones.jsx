import { Accordion } from '@/app/components/ReportTemplate/Accordion';
import { createContext, useContext, useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import { ReportContext } from '@/src/context';
// Contexto para mostrar imágenes de los checkboxes
export const CheckboxContext = createContext();
export const CheckboxProvider = ({ children }) => {
  // Estado para manejar los checkboxes de lado izquierdo
  const [checkedStateLeft, setcheckedStateLeft] = useState({
    A1: false, A2: false, A3: false, A4: false,
    A9: false, A10: false, A11: false, A12: false,
    A17: false, A18: false, A19: false, A20: false,
    A25: false,A26: false, A27: false, A28: false,
    A33: false, A34: false, A35: false, A36: false,
    A41: false, A42: false, A43: false, A44: false,
    A49: false, A50: false, A51: false, A52: false,
    A57: false, A58: false, A59: false, A60: false,
    A65: false, A66: false, A67: false, A68: false,
    A73: false, A74: false, A75: false, A76: false,
    A81: false, A82: false, A83: false, A84: false,//S1 L
    //Torácica
    A85: false, A86: false, A87: false, A88: false,//S1 R
    A89: false, A90: false, A91: false, A92: false,//T2
    A97: false, A98: false, A99: false, A100: false,
    A105: false, A106: false, A107: false, A108: false,
    A113: false, A114: false, A115: false, A116: false,
    A121: false, A122: false, A123: false, A124: false,
    A129: false, A130: false, A131: false, A132: false,
    A137: false, A138: false, A139: false, A140: false,
    A145: false, A146: false, A147: false, A148: false,
    A153: false, A154: false, A155: false, A156: false,
    A161: false, A162: false, A163: false, A164: false,
    A169: false, A170: false, A171: false, A172: false,
  });
    // Estado para manejar los checkboxes de lado derecho izquierdo
  const [checkedStateRight, setcheckedStateRight] = useState({
    A5: false, A6: false, A7: false,A8: false,
    A13: false,A14: false,A15: false,A16: false,
    A21: false,A22: false,A23: false,A24: false,
    A29: false,A30: false,A31: false,A32: false,
    A37: false,A38: false,A39: false,A40: false,
    A45: false,A46: false,A47: false,A48: false,
    A53: false,A54: false,A55: false,A56: false,
    A61: false,A62: false,A63: false,A64: false,
    A69: false,A70: false,A71: false,A72: false,
    A77: false,A78: false,A79: false,A80: false,
    //Torácica
    A93: false,A94: false,A95: false,A96: false,//T2
    A101: false,A102: false,A103: false,A104: false,
    A109: false,A110: false,A111: false,A112: false,
    A117: false,A118: false,A119: false,A120: false,
    A125: false, A126: false, A127: false, A128: false,
    A133: false, A134: false, A135: false, A136: false,
    A141: false, A142: false, A143: false, A144: false,
    A149: false, A150: false, A151: false, A152: false,
    A157: false, A158: false, A159: false, A160: false,
    A165: false, A166: false, A167: false, A168: false,
    A173: false, A174: false, A175: false, A176: false,
  });
   // Función para manejar los cambios de checkboxes en el lado izquierdo
const handleCheckboxChangeLeft = (id, value) => {
  setcheckedStateLeft((prevState) => ({
    ...prevState,
    [id]: value,  // Actualiza solo el checkbox seleccionado, sin modificar los demás
  }));
};

// Función para manejar los cambios de checkboxes en el lado derecho
const handleCheckboxChangeRight = (id, value) => {
  setcheckedStateRight((prevState) => ({
    ...prevState,
    [id]: value,  // Actualiza solo el checkbox seleccionado, sin modificar los demás
  }));
};

  const resetCheckboxes = () => {
    setcheckedStateLeft({
      A1: false,A2: false,A3: false, A4: false,
      A9: false, A10: false, A11: false, A12: false,

    });
    setcheckedStateRight({
      A5: false, A6: false, A7: false, A8: false,
      A13: false,A14: false,A15: false,A16: false,

    });
  };
  return (
    <CheckboxContext.Provider
      value={{
        checkedStateLeft,
        setcheckedStateLeft,  
        handleCheckboxChangeLeft,
        checkedStateRight,
        setcheckedStateRight,  
        handleCheckboxChangeRight,
        resetCheckboxes,
        
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};
// Hook personalizado para manejar los pasos
const useStep = () => {
  const [step, setStep] = useState('A'); // Inicialmente en el paso 'A'
  const { resetCheckboxes } = useContext(CheckboxContext);
  const {handlePrint} = useImageState();

  // Siguiente paso
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
    else if (step === 'D') setStep('E');
  };
  // Paso anterior
  const handlePrevStep = () => {
    resetCheckboxes();
    if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };
  // Metodos de movimiento entre menus custom
  const handleNextStep1 = () => {
    if (step === 'A') setStep('B1');
    else if (step === 'B1') setStep('C1');
    else if (step === 'C1') setStep('D1');
    else if (step === 'D1') setStep('E1');
    else if (step === 'E1') setStep('F1');
    else if (step === 'F1') setStep('G1');
    else if (step === 'G1') setStep('E');
  };
  const handlePrevStep1 = () => {
    if (step === 'G1') setStep('F1');
    else if (step === 'F1') setStep('E1');
    else if (step === 'E1') setStep('D1');
    else if (step === 'D1') setStep('C1');
    else if (step === 'C1') setStep('B1');
    else if (step === 'B1') setStep('A');
  };
  const handleNextStep2 = () => {
    if (step === 'A') setStep('B2');
    else if (step === 'B2') setStep('C2');
    else if (step === 'C2') setStep('D2');
    else if (step === 'D2') setStep('E2');
    else if (step === 'E2') setStep('E');
  };
  const handlePrevStep2 = () => {
    if (step === 'E2') setStep('D2');
    if (step === 'C2') setStep('B2');
    if (step === 'B2') setStep('A');
  };
  return {
    step,
    handleNextStep,
    handlePrevStep,
    handleNextStep1,
    handleNextStep2,
    handlePrevStep1,
    handlePrevStep2,
    handlePrint
  };
};
const SimpleMultiStepForm = () => {
  const { step, handleNextStep, handlePrevStep,handleNextStep1,handleNextStep2,handlePrevStep1,handlePrevStep2,handlePrint } = useStep();
  const { checkedStateLeft, setcheckedStateLeft, checkedStateRight, setcheckedStateRight} = useContext(CheckboxContext);

  return (
      <div>
        {/* Renderiza el componente adecuado basado en el estado del paso */}
        {step === 'A' ? (<StepA handleNextStep={handleNextStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} />) : null}
        {step === 'B' ? (<StepB handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />) : null}
        {step === 'B1' ? (<StepB1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'C' ? (<StepC handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />) : null}
        {step === 'C1' ? (<StepC1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'D' ? (<StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />) : null}
        {step === 'E' ? (<StepE handlePrevStep={handlePrevStep}  handlePrint={handlePrint}/>) : null}
        {step === 'D1' ? (<StepD1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'E1' ? (<StepE1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'F1' ? (<StepF1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'G1' ? (<StepG1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'B2' ? (<StepB2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />) : null}
        {step === 'C2' ? (<StepC2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />) : null}
        {step === 'E2' ? (<StepE2 handlePrevStep2={handlePrevStep2}  handleNextStep2={handleNextStep2} />) : null}
        {step === 'D2' ? (<StepD2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />) : null}
      </div>
  );
};
const StepA = ({ handleNextStep,handleNextStep1, handleNextStep2} ) => (
  <div>
    <br></br>
    <br></br>
    <br></br>
    <h1 className='text-xl font-bold text-white'>EVOLUCIÓN</h1>
    <div onClick={ handleNextStep }>
          <ConclusionButton value='radiculopatia_aguda' title='RADICULOPATIA AGUDA ' displayText='RADICULOPATIA AGUDA'/>
        </div>
        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='radiculopatia_subaguda' title='RADICULOPATIA SUBAGUDA' displayText='RADICULOPATIA SUBAGUDA'/>
        </div>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='radiculopatia_cronica' title='RADICULOPATIA CRONICA' displayText='ADICULOPATIA CRONICA'/>
        </div>
         <div onClick={ handleNextStep2 }> 
          <ConclusionButton value='radiculopatia_sensitiva' title='RADICULOPATIA SENSITIVA' displayText='RADICULOPATIA SENSITIVA'/>
         </div>  
        <div onClick={ handleNextStep }>
          <ConclusionButton value='radiculopatia_intermitente' title='RADICULOPATIA INTERMITENTE' displayText='RADICULOPATIA INTERMITENTE'/>
        </div>
  </div>
);
const StepB = ({ handleNextStep, handlePrevStep}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight, resetCheckboxes} = useContext(CheckboxContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  
  const handleCheckboxChangeLeft = (event) => {
    const { id, checked } = event.target;
    setcheckedStateLeft(prevState => ({
      ...prevState,  // Mantener el estado actual
      [id]: checked  // Solo actualizar el checkbox que cambió
    }));
  };
  
  const handleCheckboxChangeRight = (event) => {
    const { id, checked } = event.target;
    setcheckedStateRight(prevState => ({
      ...prevState,  // Mantener el estado actual
      [id]: checked  // Solo actualizar el checkbox que cambió
    }));
  };
  
  const handleAccordionToggle = (event) => {
    setIsAccordionOpen((prev) => {
      const newIsOpen = !prev;
      if (!newIsOpen) {
        resetCheckboxes(); 
      }
      return newIsOpen;
    });
  };
  return (
    <div className='accordion-content '>
      <div className='button-bar'>
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL</h1>
      <Accordion title='CERVICAL' >
        <Accordion title='C4'>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>

                <input type='checkbox' name="radioC4Left" value='1' id='A1'  checked={checkedStateLeft.A1} onChange={handleCheckboxChangeLeft}/>
                {checkedStateLeft.A1}
                
              </td>
              <td>
                <input type='checkbox' name="radioC4Left" value='2' id='A2' checked={checkedStateLeft.A2} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A2}
              </td>
              <td>
                <input type='checkbox' name="radioC4Left" value='3' id='A3' checked={checkedStateLeft.A3} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A3}
              </td>
              <td>
                <input type='checkbox' name="radioC4Left" value='4' id='A4' checked={checkedStateLeft.A4} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A4 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC4Right" value='1' id='A5' checked={checkedStateRight.A5} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A5 }
              </td>
              <td>
                <input type='checkbox' name="radioC4Right" value='2' id='A6' checked={checkedStateRight.A6} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A6}
              </td>
              <td>
                <input type='checkbox' name="radioC4Right" value='3' id='A7' checked={checkedStateRight.A7} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A7}
              </td>
              <td>
                <input type='checkbox' name="radioC4Right" value='4' id='A8' checked={checkedStateRight.A8} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A8}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C5' >
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC5Left" value='1' id='A9' checked={checkedStateLeft.A9} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A9}
              </td>
              <td>
                <input type='checkbox' name="radioC5Left" value='2' id='A10' checked={checkedStateLeft.A10}onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A10}
              </td>
              <td>
                <input type='checkbox' name="radioC5Left" value='3' id='A11' checked={checkedStateLeft.A11}onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A11}
              </td>
              <td>
                <input type='checkbox' name="radioC5Left" value='4' id='A12' checked={checkedStateLeft.A12}onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A12 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC5Right" value='1' id='A13' checked={checkedStateRight.A13} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A13 }
              </td>
              <td>
                <input type='checkbox' name="radioC5Right" value='2' id='A14' checked={checkedStateRight.A14} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A14}
              </td>
              <td>
                <input type='checkbox' name="radioC45Right" value='3' id='A15' checked={checkedStateRight.A15}onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A15}
              </td>
              <td>
                <input type='checkbox' name="radioC5Right" value='4' id='A16' checked={checkedStateRight.A16} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A16}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C6' >
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC6Left" value='1' id='A17' checked={checkedStateLeft.A17} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A17}
              </td>
              <td>
                <input type='checkbox' name="radioC6Left" value='2' id='A18' checked={checkedStateLeft.A18} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A18}
              </td>
              <td>
                <input type='checkbox' name="radioC6Left" value='3' id='A19' checked={checkedStateLeft.A19} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A19}
              </td>
              <td>
                <input type='checkbox' name="radioC6Left" value='4' id='A20' checked={checkedStateLeft.A20} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A20 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC6Right" value='1' id='A21' checked={checkedStateRight.A21} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A21 }
              </td>
              <td>
                <input type='checkbox' name="radioC6Right" value='2' id='A22' checked={checkedStateRight.A22} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A22}
              </td>
              <td>
                <input type='checkbox' name="radioC6Right" value='3' id='A23' checked={checkedStateRight.A23} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A23}
              </td>
              <td>
                <input type='checkbox' name="radioC6Right" value='4' id='A24' checked={checkedStateRight.A24} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A24}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C7' >
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC7Left" value='1' id='A25' checked={checkedStateLeft.A25} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A25}
              </td>
              <td>
                <input type='checkbox' name="radioC7Left" value='2' id='A26' checked={checkedStateLeft.A26} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A26}
              </td>
              <td>
                <input type='checkbox' name="radioC7Left" value='3' id='A27' checked={checkedStateLeft.A27} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A27}
              </td>
              <td>
                <input type='checkbox' name="radioC7Left" value='4' id='A28' checked={checkedStateLeft.A28} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A28 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC7Right" value='1' id='A29' checked={checkedStateRight.A29} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A29 }
              </td>
              <td>
                <input type='checkbox' name="radioC7Right" value='2' id='A30' checked={checkedStateRight.A30} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A30}
              </td>
              <td>
                <input type='checkbox' name="radioC7Right" value='3' id='A31' checked={checkedStateRight.A31} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A31}
              </td>
              <td>
                <input type='checkbox' name="radioC7Right" value='4' id='A32' checked={checkedStateRight.A32} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A32}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C8'>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC8Left" value='1' id='A33' checked={checkedStateLeft.A33} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A33}
              </td>
              <td>
                <input type='checkbox' name="radioC8Left" value='2' id='A34' checked={checkedStateLeft.A34} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A34}
              </td>
              <td>
                <input type='checkbox' name="radioC8Left" value='3' id='A35' checked={checkedStateLeft.A35} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A35}
              </td>
              <td>
                <input type='checkbox' name="radioC8Left" value='4' id='A36' checked={checkedStateLeft.A36} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A36 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioC8Right" value='1' id='A37' checked={checkedStateRight.A37} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A37 }
              </td>
              <td>
                <input type='checkbox' name="radioC8Right" value='2' id='A38' checked={checkedStateRight.A38} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A38}
              </td>
              <td>
                <input type='checkbox' name="radioC8Right" value='3' id='A39' checked={checkedStateRight.A39} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A39}
              </td>
              <td>
                <input type='checkbox' name="radioC8Right" value='4' id='A40' checked={checkedStateRight.A40} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A40}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='T1' >
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioT1Left" value='1' id='A41' checked={checkedStateLeft.A41} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A41}
              </td>
              <td>
                <input type='checkbox' name="radioT1Left" value='2' id='A42' checked={checkedStateLeft.A42} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A42}
              </td>
              <td>
                <input type='checkbox' name="radioT1Left" value='3' id='A43' checked={checkedStateLeft.A43} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A43}
              </td>
              <td>
                <input type='checkbox' name="radioT1Left" value='4' id='A44' checked={checkedStateLeft.A44} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A44 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='checkbox' name="radioT1Right" value='1' id='A45' checked={checkedStateRight.A45} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A45 }
              </td>
              <td>
                <input type='checkbox' name="radioT1Right" value='2' id='A46' checked={checkedStateRight.A46} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A46}
              </td>
              <td>
                <input type='checkbox' name="radioT1Right" value='3' id='A47' checked={checkedStateRight.A47} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A47}
              </td>
              <td>
                <input type='checkbox' name="radioT1Right" value='4' id='A48' checked={checkedStateRight.A48} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A48}
              </td>
            </tr>
          </table>
        </Accordion>
        <ConclusionButton value='cervical_multinivel' title='CERVICAL MULTINIVEL' /> 
      </Accordion>
      <Accordion title='LUMBAR'>
      <Accordion title='L2' >
      <table>
            <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A49' checked={checkedStateLeft.A49} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A49}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A50' checked={checkedStateLeft.A50} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A50}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A51' checked={checkedStateLeft.A51} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A51}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A52' checked={checkedStateLeft.A52} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A52 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A53' checked={checkedStateRight.A53} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A53 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A54' checked={checkedStateRight.A54} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A54}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A55' checked={checkedStateRight.A55} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A55}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A56' checked={checkedStateRight.A56} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A56}
              </td>
          
          </table>
        </Accordion> 
        <Accordion title='L3' > 
        <table>
        <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A57' checked={checkedStateLeft.A57} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A57}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A58' checked={checkedStateLeft.A58} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A58}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A59' checked={checkedStateLeft.A59} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A59}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A60' checked={checkedStateLeft.A60} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A60 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A61' checked={checkedStateRight.A61} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A61 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A62' checked={checkedStateRight.A62} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A62}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A63' checked={checkedStateRight.A63} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A63}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A64' checked={checkedStateRight.A64} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A64}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L4' >
        <table>
            <td>
            <ConclusionButton value='l4_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A65' checked={checkedStateLeft.A65} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A65}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A66' checked={checkedStateLeft.A66} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A66}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A67' checked={checkedStateLeft.A67} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A67}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A68' checked={checkedStateLeft.A68} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A68 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A69' checked={checkedStateRight.A69} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A69 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A70' checked={checkedStateRight.A70} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A70}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A71' checked={checkedStateRight.A71} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A71}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A72' checked={checkedStateRight.A72} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A72}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L5'>
        <table>
            <td>
            <ConclusionButton value='l5_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A73' checked={checkedStateLeft.A73} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A73}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A74' checked={checkedStateLeft.A74} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A74}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A75' checked={checkedStateLeft.A75} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A75}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A76' checked={checkedStateLeft.A76} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A76 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A77' checked={checkedStateRight.A77} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A77 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A78' checked={checkedStateRight.A78} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A78}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A79' checked={checkedStateRight.A79} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A79}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A80' checked={checkedStateRight.A80} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A80}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S1' >
        <table>
            <td>
            <ConclusionButton value='s1_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A81' checked={checkedStateLeft.A81} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A81}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A82' checked={checkedStateLeft.A82} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A82}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A83' checked={checkedStateLeft.A83} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A83}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A84' checked={checkedStateLeft.A84} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A84}
              </td>
              <ConclusionButton value='s1_d' title='R' displayText=''/>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A85' checked={checkedStateRight.A85} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A85 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A86' checked={checkedStateRight.A86} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A86}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A87' checked={checkedStateRight.A87} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A87}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A88' checked={checkedStateRight.A88} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A88}
              </td>
          </table>
        </Accordion> 
      
        <ConclusionButton value='lumbrosaca_multinivel' title='LUMBROSACA MULTINIVEL' />
      </Accordion>

      <Accordion title='TORÁCICA'>
       {/* <Accordion title='T2' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A89' checked={checkedStateLeft.A89} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A89}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A90' checked={checkedStateLeft.A90} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A90}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A91' checked={checkedStateLeft.A91} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A91}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A92' checked={checkedStateLeft.A92} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A92}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A93' checked={checkedStateRight.A93} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A93}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A94' checked={checkedStateRight.A94} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A94}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A95' checked={checkedStateRight.A95} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A95}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A96' checked={checkedStateRight.A96} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A96}
                </td>
              </tr>
            </table>
          </Accordion>
          <Accordion title='T3' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A97' checked={checkedStateLeft.A97} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A97}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A98' checked={checkedStateLeft.A98} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A98}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A99' checked={checkedStateLeft.A99} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A99}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A100' checked={checkedStateLeft.A100} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A100 }
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A101' checked={checkedStateRight.A101} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A101}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A102' checked={checkedStateRight.A102} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A102}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A103' checked={checkedStateRight.A103} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A103}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A104' checked={checkedStateRight.A104} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A104}
                </td>
              </tr>
            </table>
          </Accordion>
          <Accordion title='T4' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A105' checked={checkedStateLeft.A105} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A105}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A106' checked={checkedStateLeft.A106} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A106}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A107' checked={checkedStateLeft.A107} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A107}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A108' checked={checkedStateLeft.A108} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A108 }
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A109' checked={checkedStateRight.A109} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A109 }
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A110' checked={checkedStateRight.A110} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A110}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A111' checked={checkedStateRight.A111} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A111}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A112' checked={checkedStateRight.A112} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A112}
                </td>
              </tr>
            </table>
          </Accordion>
          <Accordion title='T5' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A113' checked={checkedStateLeft.A113} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A113}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A114' checked={checkedStateLeft.A114} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A114}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A115' checked={checkedStateLeft.A115} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A115}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A116' checked={checkedStateLeft.A116} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A116 }
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A117' checked={checkedStateRight.A117} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A117}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A118' checked={checkedStateRight.A118} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A118}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A119' checked={checkedStateRight.A119} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A119}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A120' checked={checkedStateRight.A120} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A120}
                </td>
              </tr>
            </table>
          </Accordion>
          <Accordion title='T6' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A121' checked={checkedStateLeft.A121} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A121}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A122' checked={checkedStateLeft.A122} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A122}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A123' checked={checkedStateLeft.A123} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A123}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A124' checked={checkedStateLeft.A124} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A124}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A125' checked={checkedStateRight.A125} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A125}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A126' checked={checkedStateRight.A126} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A126}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A127' checked={checkedStateRight.A127} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A127}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A128' checked={checkedStateRight.A128} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A128}
                </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title='T7' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A129' checked={checkedStateLeft.A129} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A129}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A130' checked={checkedStateLeft.A130} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A130}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A131' checked={checkedStateLeft.A131} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A131}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A132' checked={checkedStateLeft.A132} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A132}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A133' checked={checkedStateRight.A133} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A133}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A134' checked={checkedStateRight.A134} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A134}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A135' checked={checkedStateRight.A135} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A135}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A136' checked={checkedStateRight.A136} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A136}
                </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title='T8' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A137' checked={checkedStateLeft.A137} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A137}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A138' checked={checkedStateLeft.A138} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A138}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A139' checked={checkedStateLeft.A139} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A139}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A140' checked={checkedStateLeft.A140} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A140}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A141' checked={checkedStateRight.A141} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A141}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A142' checked={checkedStateRight.A142} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A142}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A143' checked={checkedStateRight.A143} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A143}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A144' checked={checkedStateRight.A144} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A144}
                </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title='T9' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A145' checked={checkedStateLeft.A145} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A145}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A146' checked={checkedStateLeft.A146} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A146}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A147' checked={checkedStateLeft.A147} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A147}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A148' checked={checkedStateLeft.A148} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A148}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A149' checked={checkedStateRight.A149} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A149}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A150' checked={checkedStateRight.A150} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A150}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A151' checked={checkedStateRight.A151} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A151}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A152' checked={checkedStateRight.A152} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A152}
                </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title='T10' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A153' checked={checkedStateLeft.A153} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A153}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A154' checked={checkedStateLeft.A154} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A154}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A155' checked={checkedStateLeft.A155} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A155}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A156' checked={checkedStateLeft.A156} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A156}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A157' checked={checkedStateRight.A157} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A157}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A158' checked={checkedStateRight.A158} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A158}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A159' checked={checkedStateRight.A159} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A159}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A160' checked={checkedStateRight.A160} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A160}
                </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title='T11' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A161' checked={checkedStateLeft.A161} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A161}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A162' checked={checkedStateLeft.A162} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A162}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A163' checked={checkedStateLeft.A163} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A163}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A164' checked={checkedStateLeft.A164} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A164}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A165' checked={checkedStateRight.A165} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A165}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A166' checked={checkedStateRight.A166} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A166}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A167' checked={checkedStateRight.A167} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A167}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A168' checked={checkedStateRight.A168} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A168}
                </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title='T12' onToggle={handleAccordionToggle}>
            <table cellpadding='1'>
              <tr>
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio1" value='1' id='A169' checked={checkedStateLeft.A169} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A169}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A170' checked={checkedStateLeft.A170} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A170}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A171' checked={checkedStateLeft.A171} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A171}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A172' checked={checkedStateLeft.A172} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A172}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A173' checked={checkedStateRight.A173} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A173}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A174' checked={checkedStateRight.A174} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A174}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A175' checked={checkedStateRight.A175} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A175}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A176' checked={checkedStateRight.A176} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A176}
                </td>
              </tr>
            </table>
          </Accordion>*/}
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
        <ConclusionButton value='cervical' title='CERVICAL' displayText=''/>   
        <ConclusionButton value='torasica' title='TORACICA' displayText=''/> 
        <ConclusionButton value='lumbrosaca' title='LUMBOSACRA' displayText=''/>            
      </Accordion>      
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
          <button className={`print-button dont-print `}>
          <img src="/I_X.webp" alt="Imprimir" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep }>
      <ConclusionButton value='intensidad_leve' title='INTENSIDAD LEVE (+/+)' displayText=''/>
      <ConclusionButton value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText=''/>
      <ConclusionButton value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText=''/>
      <ConclusionButton value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText=''/>
      </div>

      
    </div>
  );
};

const StepD = ({  handlePrevStep, handleNextStep }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>


      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep}>
      <ConclusionButton value='p_completa' title='Y PRONOSTICO DE RECUPERACION COMPLETA' displayText=''/>
      <ConclusionButton value='p_parcial' title='Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL' displayText=''/>
      <ConclusionButton value='p_no_funcional' title='Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL' displayText=''/>
      <ConclusionButton value='nula' title='NULA (EN FASE DE SECUELA DEFINITIVA)' displayText=''/>
      </div>
      
    </div>
  );
};

const StepB1 = ({ handleNextStep1, handlePrevStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button onClick={handleNextStep1} className={`print-button dont-print `}>
          <img src="/I_In.svg" style={{filter: 'invert(1)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        FASE
      </h1>

      <div onClick={ handleNextStep1 }>
      <ConclusionButton value='activa' title='ACTIVA' displayText=''/>
      <ConclusionButton value='inactiva' title='INACTIVA' displayText=''/>
      <ConclusionButton value='antigua' title='ANTIGUA' displayText=''/>
      </div>

      
    </div>
  );
};

const StepC1 = ({ handleNextStep1, handlePrevStep1}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight, resetCheckboxes} = useContext(CheckboxContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleCheckboxChangeLeft = (event) => {
    const { id, checked } = event.target;
    setcheckedStateLeft(prevState => ({
      ...prevState,  // Mantener el estado actual
      [id]: checked  // Solo actualizar el checkbox que cambió
    }));
  };
  
  const handleCheckboxChangeRight = (event) => {
    const { id, checked } = event.target;
    setcheckedStateRight(prevState => ({
      ...prevState,  // Mantener el estado actual
      [id]: checked  // Solo actualizar el checkbox que cambió
    }));
  };
  const handleAccordionToggle = (event) => {
    setIsAccordionOpen((prev) => {
      const newIsOpen = !prev;
      if (!newIsOpen) {
        resetCheckboxes(); 
      }
      return newIsOpen;
    });
  };
  return (
    <div>
     <div className='button-bar'>
        <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep1} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        NIVEL
      </h1>

      <Accordion title='CERVICAL'>
        <Accordion title='C4' >
          <table cellpadding='3'>
              <td>
              
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>

              </td>
              <td>
                <input type='checkbox' name="radio1" value='1' id='A1' checked={checkedStateLeft.A1} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A1}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A2' checked={checkedStateLeft.A2} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A2}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A3' checked={checkedStateLeft.A3} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A3}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A4' checked={checkedStateLeft.A4} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A4 }
              </td>
              <td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>

              </td>
              <td>
                <input type='checkbox' name="radio2" value='1' id='A5' checked={checkedStateRight.A5} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A5 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A6' checked={checkedStateRight.A6} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A6}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A7' checked={checkedStateRight.A7} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A7}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A8' checked={checkedStateRight.A8} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A8}
              </td>
          </table>
        </Accordion>
        <Accordion title='C5'>
        <table>
            <td>
            <td>
                <ConclusionButton value='c5_i' title='L' displayText=''/>
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A9' checked={checkedStateLeft.A9} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A9}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A10' checked={checkedStateLeft.A10} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A10}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A11' checked={checkedStateLeft.A11} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A11}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A12' checked={checkedStateLeft.A12} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A12 }
              </td>
            <td>
            <td>
                <ConclusionButton value='c5_d' title='R' displayText=''/>
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A13' checked={checkedStateRight.A13} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A13 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A14' checked={checkedStateRight.A14} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A14}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A15' checked={checkedStateRight.A15} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A15}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A16' checked={checkedStateRight.A16} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A16}
              </td>
          </table>
        </Accordion>
        <Accordion title='C6'>
        <table>
        <tr>
              
              <ConclusionButton value='c6_i' title='L' displayText=''/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A17' checked={checkedStateLeft.A17} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A17}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A18' checked={checkedStateLeft.A18} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A18}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A19' checked={checkedStateLeft.A19} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A19}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A20' checked={checkedStateLeft.A20} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A20 }
              </td>
              <ConclusionButton value='c6_d' title='R' displayText=''/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A21' checked={checkedStateRight.A21} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A21 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A22' checked={checkedStateRight.A22} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A22}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A23' checked={checkedStateRight.A23} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A23}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A24' checked={checkedStateRight.A24} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A24}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C7'>
        <table>
        <tr>
        <ConclusionButton value='c7_i' title='L' displayText=''/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A25' checked={checkedStateLeft.A25} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A25}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A26' checked={checkedStateLeft.A26} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A26}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A27' checked={checkedStateLeft.A27} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A27}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A28' checked={checkedStateLeft.A28} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A28 }
              </td>
              <ConclusionButton value='c7_d' title='R' displayText=''/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A29' checked={checkedStateRight.A29} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A29 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A30' checked={checkedStateRight.A30} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A30}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A31' checked={checkedStateRight.A31} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A31}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A32' checked={checkedStateRight.A32} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A32}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C8'>
        <table>
        <tr>
        <ConclusionButton value='c8_i' title='L' displayText=''/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A33' checked={checkedStateLeft.A33} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A33}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A34' checked={checkedStateLeft.A34} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A34}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A35' checked={checkedStateLeft.A35} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A35}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A36' checked={checkedStateLeft.A36} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A36 }
              </td>
              <ConclusionButton value='c8_d' title='R' displayText=''/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A37' checked={checkedStateRight.A37} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A37 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A38' checked={checkedStateRight.A38} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A38}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A39' checked={checkedStateRight.A39} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A39}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A40' checked={checkedStateRight.A40} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A40}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='T1'>
        <table>
        <tr>
        <ConclusionButton value='t1_i' title='L' displayText=''/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A41' checked={checkedStateLeft.A41} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A41}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A42' checked={checkedStateLeft.A42} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A42}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A43' checked={checkedStateLeft.A43} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A43}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A44' checked={checkedStateLeft.A44} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A44 }
              </td>
              <ConclusionButton value='t1_d' title='R' displayText=''/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A45' checked={checkedStateRight.A45} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A45 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A46' checked={checkedStateRight.A46} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A46}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A47' checked={checkedStateRight.A47} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A47}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A48' checked={checkedStateRight.A48} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A48}
              </td>
            </tr>
          </table>
        </Accordion>
        <ConclusionButton value='cervical_multinivel' title='CERVICAL MULTINIVEL' />              
      </Accordion>

      <Accordion title='LUMBAR'>
      <Accordion title='L2' >
      <table>
      <ConclusionButton value='l2_i' title='L' displayText=''/>

            <td>
                <input type='checkbox' name="radio1" value='1' id='A49' checked={checkedStateLeft.A49} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A49}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A50' checked={checkedStateLeft.A50} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A50}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A51' checked={checkedStateLeft.A51} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A51}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A52' checked={checkedStateLeft.A52} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A52 }
              </td>
              <ConclusionButton value='l2_d' title='R' displayText=''/>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A53' checked={checkedStateRight.A53} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A53 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A54' checked={checkedStateRight.A54} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A54}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A55' checked={checkedStateRight.A55} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A55}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A56' checked={checkedStateRight.A56} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A56}
              </td>
          
          </table>
        </Accordion> 
        <Accordion title='L3' > 
        <table>
        <ConclusionButton value='l3_i' title='L' displayText=''/>

            <td>
                <input type='checkbox' name="radio1" value='1' id='A57' checked={checkedStateLeft.A57} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A57}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A58' checked={checkedStateLeft.A58} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A58}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A59' checked={checkedStateLeft.A59} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A59}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A60' checked={checkedStateLeft.A60} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A60 }
              </td>
              <ConclusionButton value='l3_d' title='R' displayText=''/>

            <td>
                <input type='checkbox' name="radio2" value='1' id='A61' checked={checkedStateRight.A61} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A61 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A62' checked={checkedStateRight.A62} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A62}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A63' checked={checkedStateRight.A63} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A63}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A64' checked={checkedStateRight.A64} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A64}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L4' >
        <table>
            <td>
            <ConclusionButton value='l4_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A65' checked={checkedStateLeft.A65} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A65}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A66' checked={checkedStateLeft.A66} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A66}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A67' checked={checkedStateLeft.A67} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A67}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A68' checked={checkedStateLeft.A68} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A68 }
              </td>
              <ConclusionButton value='l4_d' title='R' displayText=''/>

            <td>
                <input type='checkbox' name="radio2" value='1' id='A69' checked={checkedStateRight.A69} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A69 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A70' checked={checkedStateRight.A70} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A70}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A71' checked={checkedStateRight.A71} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A71}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A72' checked={checkedStateRight.A72} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A72}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L5' >
        <table>
            <td>
            <ConclusionButton value='l5_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A73' checked={checkedStateLeft.A73} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A73}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A74' checked={checkedStateLeft.A74} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A74}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A75' checked={checkedStateLeft.A75} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A75}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A76' checked={checkedStateLeft.A76} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A76 }
              </td>
              <ConclusionButton value='l5_d' title='R' displayText=''/>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A77' checked={checkedStateRight.A77} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A77 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A78' checked={checkedStateRight.A78} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A78}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A79' checked={checkedStateRight.A79} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A79}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A80' checked={checkedStateRight.A80} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A80}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S1'>
        <table>
            <td>
            <ConclusionButton value='s1_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A81' checked={checkedStateLeft.A81} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A81}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A82' checked={checkedStateLeft.A82} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A82}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A83' checked={checkedStateLeft.A83} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A83}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A84' checked={checkedStateLeft.A84} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A84}
              </td>
              <ConclusionButton value='s1_d' title='R' displayText=''/>

            <td>
                <input type='checkbox' name="radio2" value='1' id='A85' checked={checkedStateRight.A85} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A85 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A86' checked={checkedStateRight.A86} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A86}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A87' checked={checkedStateRight.A87} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A87}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A88' checked={checkedStateRight.A88} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A88}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S2' >
        <table>
            <td>
            <ConclusionButton value='s2_i' title='L' displayText=''/>
            </td>
            <td>
                  <input type='checkbox' name="radio1" value='1' id='A169' checked={checkedStateLeft.A169} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A169}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A170' checked={checkedStateLeft.A170} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A170}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A171' checked={checkedStateLeft.A171} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A171}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A172' checked={checkedStateLeft.A172} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A172}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A173' checked={checkedStateRight.A173} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A173}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A174' checked={checkedStateRight.A174} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A174}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A175' checked={checkedStateRight.A175} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A175}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A176' checked={checkedStateRight.A176} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A176}
                </td>
          </table>
        </Accordion> 
        <ConclusionButton value='lumbrosaca_multinivel' title='LUMBROSACA MULTINIVEL' />              
      </Accordion>

      <Accordion title='TORÁCICA'>
        <ConclusionButton value='T' title='T' />            
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
        <ConclusionButton value='cervical' title='CERVICAL' displayText=''/>   
        <ConclusionButton value='torasica' title='TORACICA' displayText=''/> 
        <ConclusionButton value='lumbrosaca' title='LUMBOSACRA' displayText=''/>            
      </Accordion>
      
      
    </div>
  );
};

const StepD1 = ({ handleNextStep1, handlePrevStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep1 }>
      <ConclusionButton value='intensidad_leve' title='INTENSIDAD LEVE (+/+)' displayText=''/>
      <ConclusionButton value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText=''/>
      <ConclusionButton value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText=''/>
      <ConclusionButton value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText=''/>
      </div>

      
    </div>
  );
};

const StepE1 = ({ handleNextStep1, handlePrevStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        PROGRESION
      </h1>

      <div onClick={ handleNextStep1 }>
      <ConclusionButton value='con_progresion' title='CON PROGRESIÓN DISTAL A MIOTOMAS' displayText=''/>
      <ConclusionButton value='sin_progresion' title='SIN PROGRESION DISTAL A MIOTOMAS' displayText=''/>
      </div>

      
    </div>
  );
};

const StepG1 = ({  handlePrevStep1,handleNextStep1  }) => {
  return (
    <>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
         
          <button className={`print-button dont-print `}>
          <img src="/I_X.webp"style={{filter: 'invert(0.5)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>
      <div onClick={ handleNextStep1 }>
      <ConclusionButton value='p_completa' title='Y PRONOSTICO DE RECUPERACION COMPLETA' displayText=''/>
      <ConclusionButton value='p_parcial' title='Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL' displayText=''/>
      <ConclusionButton value='p_no_funcional' title='Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL' displayText=''/>
      <ConclusionButton value='nula' title='NULA (EN FASE DE SECUELA DEFINITIVA)' displayText=''/>
      </div>
      </>
  );
};

const StepE = ({  handlePrevStep, handleUndo, handleImageChange, handlePrint  }) => {
  return (
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
      </button>

      <button onClick={handlePrint} className={`print-button dont-print`}>
        <img src="/I_Print.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
      </button>

      <button onClick={handleUndo} className={`print-button dont-print`}>
        <img src="/I_Repeat.svg" alt="Deshacer" style={{filter: 'invert(1)'}} />
      </button>

      <label htmlFor="file-upload" className={`print-button`}>
        <img src="/I_Folder.svg" alt="Subir" style={{filter: 'invert(1)'}} />
      </label>

      <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print`} style={{display: 'none'}}/>
    </div>
  );
};

const StepB2 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight, resetCheckboxes} = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContext);
  const [buttonPressed, setButtonPressed] = useState(null);

  const checkboxGroups = {
    'c5_i': ['A9', 'A10', 'A11', 'A12'],
    'c5_d': ['A13', 'A14', 'A15', 'A16'],
    'c6_i': ['A17', 'A18', 'A19', 'A20'],
    'c6_d': ['A21', 'A22', 'A23', 'A24'],
    'c7_i': ['A25', 'A26', 'A27', 'A28'],
    'c7_d': ['A29', 'A30', 'A31', 'A32'],
    'c8_i': ['A33', 'A34', 'A35', 'A36'],
    'c8_d': ['A37', 'A38', 'A39', 'A40'],
    't1_i': ['A41', 'A42', 'A43', 'A44'],
    't1_d': ['A45', 'A46', 'A47', 'A48'],
    'l2_i': ['A49', 'A50', 'A51', 'A52'],
    'l2_d': ['A53', 'A54', 'A55', 'A56'],
    'l3_i': ['A57', 'A58', 'A59', 'A60'],
    'l3_d': ['A61', 'A62', 'A63', 'A64'],
    'l4_i': ['A65', 'A66', 'A67', 'A68'],
    'l4_d': ['A69', 'A70', 'A71', 'A72'],
    'l5_i': ['A73', 'A74', 'A75', 'A76'],
    'l5_d': ['A77', 'A78', 'A79', 'A80'],
    's1_i': ['A81', 'A82', 'A83', 'A84'],
    's1_d': ['A85', 'A86', 'A87', 'A88'],
    's2_i': ['A89', 'A90', 'A91', 'A92'],
    's2_d': ['A93', 'A94', 'A95', 'A96'],
  };

  const handleCheckboxChangeLeft = (event) => {
    const { id, checked } = event.target;
    setcheckedStateLeft(prevState => ({
      ...prevState,  // Mantener el estado actual
      [id]: checked  // Solo actualizar el checkbox que cambió
    }));
    handleButtonPress(id, checked);
  };
  
  const handleCheckboxChangeRight = (event) => {
    const { id, checked } = event.target;
    setcheckedStateRight(prevState => ({
      ...prevState,  // Mantener el estado actual
      [id]: checked  // Solo actualizar el checkbox que cambió
    }));
    handleButtonPress(id, checked);
  };

  
  const handleButtonPress = (checkboxId, isChecked) => {
    const conclusionMapping = {
      A9: 'c5_i',
      A10: 'c5_i',
      A11: 'c5_i',
      A12: 'c5_i',

      A13: 'c5_d',
      A14: 'c5_d',
      A15: 'c5_d',
      A16: 'c5_d',

      A17: 'c6_i',
      A18: 'c6_i',
      A19: 'c6_i',
      A20: 'c6_i',

      A21: 'c6_d',
      A22: 'c6_d',
      A23: 'c6_d',
      A24: 'c6_d',

      A25: 'c7_i',
      A26: 'c7_i',
      A27: 'c7_i',
      A28: 'c7_i',

      A29: 'c7_d',
      A30: 'c7_d',
      A31: 'c7_d',
      A32: 'c7_d',

      A33: 'c8_i',
      A34: 'c8_i',
      A35: 'c8_i',
      A36: 'c8_i',

      A37: 'c8_d',
      A38: 'c8_d',
      A39: 'c8_d',
      A40: 'c8_d',

      A41: 't1_i',
      A42: 't1_i',
      A43: 't1_i',
      A44: 't1_i',

      A45: 't1_d',
      A46: 't1_d',
      A47: 't1_d',
      A48: 't1_d',

      A49: 'l2_i',
      A50: 'l2_i',
      A51: 'l2_i',
      A52: 'l2_i',

      A53: 'l2_d',
      A54: 'l2_d',
      A55: 'l2_d',
      A56: 'l2_d',

      A57: 'l3_i',
      A58: 'l3_i',
      A59: 'l3_i',
      A60: 'l3_i',

      A61: 'l3_d',
      A62: 'l3_d',
      A63: 'l3_d',
      A64: 'l3_d',

      A65: 'l4_i',
      A66: 'l4_i',
      A67: 'l4_i',
      A68: 'l4_i',

      A69: 'l4_d',
      A70: 'l4_d',
      A71: 'l4_d',
      A72: 'l4_d',

      A73: 'l5_i',
      A74: 'l5_i',
      A75: 'l5_i',
      A76: 'l5_i',

      A77: 'l5_d',
      A78: 'l5_d',
      A79: 'l5_d',
      A80: 'l5_d',

      A81: 's1_i',
      A82: 's1_i',
      A83: 's1_i',
      A84: 's1_i',

      A85: 's1_d',
      A86: 's1_d',
      A87: 's1_d',
      A88: 's1_d',

      A89: 's2_i',
      A90: 's2_i',
      A91: 's2_i',
      A92: 's2_i',

      A93: 's2_d',
      A94: 's2_d',
      A95: 's2_d',
      A96: 's2_d',

    };

    const conclusionValue = conclusionMapping[checkboxId];

    if (isChecked) {
      setButtonPressed(conclusionValue);
      updateConclusions({ value: conclusionValue });
    } else {
      resetButtonPress(checkboxId);
    }
  };

  const resetButtonPress = (checkboxId) => {
    for (const [conclusionValue, ids] of Object.entries(checkboxGroups)) {
      if (ids.includes(checkboxId) && buttonPressed === conclusionValue) {
        setButtonPressed(null);
        updateConclusions({ title: '', value: conclusionValue });
        break;
      }
    }

    // Si se desmarcó un checkbox, verifica si hay otros checkboxes seleccionados
    const anyLeftChecked = Object.keys(checkedStateLeft).some(key => checkedStateLeft[key]);
    const anyRightChecked = Object.keys(checkedStateRight).some(key => checkedStateRight[key]);

    // Si no hay checkboxes seleccionados en ambos lados, resetea el botón
    if (!anyLeftChecked && !anyRightChecked) {
      setButtonPressed(null);
      updateConclusions({ title: '', value: '' });
    }
  };

  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        NIVEL
      </h1>
      <Accordion title='CERVICAL'>
        <Accordion title='C4' >
          <table cellpadding='3'>
              <td>
              
                <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>

              </td>
              <td>
                <input type='checkbox' name="radio1" value='1' id='A1' checked={checkedStateLeft.A1} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A1}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A2' checked={checkedStateLeft.A2} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A2}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A3' checked={checkedStateLeft.A3} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A3}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A4' checked={checkedStateLeft.A4} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A4 }
              </td>
              <td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>

              </td>
              <td>
                <input type='checkbox' name="radio2" value='1' id='A5' checked={checkedStateRight.A5} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A5 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A6' checked={checkedStateRight.A6} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A6}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A7' checked={checkedStateRight.A7} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A7}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A8' checked={checkedStateRight.A8} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A8}
              </td>
          </table>
        </Accordion>
        <Accordion title='C5'>
        <table>
            <td>
            <td>
                <ConclusionButton value='c5_i' title='L' displayText='' pressed={buttonPressed === 'c5_i'}/>
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A9' checked={checkedStateLeft.A9} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A9}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A10' checked={checkedStateLeft.A10} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A10}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A11' checked={checkedStateLeft.A11} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A11}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A12' checked={checkedStateLeft.A12} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A12 }
              </td>
            <td>
            <td>
                <ConclusionButton value='c5_d' title='R' displayText='' pressed={buttonPressed === 'c5_i'}/>
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A13' checked={checkedStateRight.A13} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A13 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A14' checked={checkedStateRight.A14} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A14}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A15' checked={checkedStateRight.A15} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A15}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A16' checked={checkedStateRight.A16} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A16}
              </td>
          </table>
        </Accordion>
        <Accordion title='C6'>
        <table>
        <tr>
              
              <ConclusionButton value='c6_i' title='L' displayText=''pressed={buttonPressed === 'c6_i'}/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A17' checked={checkedStateLeft.A17} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A17}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A18' checked={checkedStateLeft.A18} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A18}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A19' checked={checkedStateLeft.A19} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A19}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A20' checked={checkedStateLeft.A20} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A20 }
              </td>
              <ConclusionButton value='c6_d' title='R' displayText='' pressed={buttonPressed === 'c6_d'}/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A21' checked={checkedStateRight.A21} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A21 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A22' checked={checkedStateRight.A22} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A22}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A23' checked={checkedStateRight.A23} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A23}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A24' checked={checkedStateRight.A24} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A24}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C7'>
        <table>
        <tr>
        <ConclusionButton value='c7_i' title='L' displayText='' pressed={buttonPressed === 'c7_i'}/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A25' checked={checkedStateLeft.A25} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A25}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A26' checked={checkedStateLeft.A26} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A26}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A27' checked={checkedStateLeft.A27} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A27}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A28' checked={checkedStateLeft.A28} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A28 }
              </td>
              <ConclusionButton value='c7_d' title='R' displayText='' pressed={buttonPressed === 'c7_d'}/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A29' checked={checkedStateRight.A29} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A29 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A30' checked={checkedStateRight.A30} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A30}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A31' checked={checkedStateRight.A31} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A31}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A32' checked={checkedStateRight.A32} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A32}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C8'>
        <table>
        <tr>
        <ConclusionButton value='c8_i' title='L' displayText='' pressed={buttonPressed === 'c8_i'}/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A33' checked={checkedStateLeft.A33} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A33}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A34' checked={checkedStateLeft.A34} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A34}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A35' checked={checkedStateLeft.A35} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A35}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A36' checked={checkedStateLeft.A36} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A36 }
              </td>
              <ConclusionButton value='c8_d' title='R' displayText='' pressed={buttonPressed === 'c8_d'}/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A37' checked={checkedStateRight.A37} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A37 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A38' checked={checkedStateRight.A38} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A38}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A39' checked={checkedStateRight.A39} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A39}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A40' checked={checkedStateRight.A40} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A40}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='T1'>
        <table>
        <tr>
        <ConclusionButton value='t1_i' title='L' displayText='' pressed={buttonPressed === 't1_i'}/>

              <td>
                <input type='checkbox' name="radio1" value='1' id='A41' checked={checkedStateLeft.A41} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A41}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A42' checked={checkedStateLeft.A42} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A42}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A43' checked={checkedStateLeft.A43} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A43}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A44' checked={checkedStateLeft.A44} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A44 }
              </td>
              <ConclusionButton value='t1_d' title='R' displayText='' pressed={buttonPressed === 't1_d'}/>

              <td>
                <input type='checkbox' name="radio2" value='1' id='A45' checked={checkedStateRight.A45} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A45 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A46' checked={checkedStateRight.A46} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A46}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A47' checked={checkedStateRight.A47} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A47}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A48' checked={checkedStateRight.A48} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A48}
              </td>
            </tr>
          </table>
        </Accordion>
        <ConclusionButton value='cervical_multinivel' title='CERVICAL MULTINIVEL' />              
      </Accordion>

     
      <Accordion title='LUMBAR'>
      <Accordion title='L2' >
      <table>
      <ConclusionButton value='l2_i' title='L' displayText='' pressed={buttonPressed === 'l2_i'}/>

            <td>
                <input type='checkbox' name="radio1" value='1' id='A49' checked={checkedStateLeft.A49} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A49}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A50' checked={checkedStateLeft.A50} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A50}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A51' checked={checkedStateLeft.A51} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A51}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A52' checked={checkedStateLeft.A52} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A52 }
              </td>
              <ConclusionButton value='l2_d' title='R' displayText='' pressed={buttonPressed === 'l2_d'}/>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A53' checked={checkedStateRight.A53} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A53 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A54' checked={checkedStateRight.A54} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A54}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A55' checked={checkedStateRight.A55} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A55}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A56' checked={checkedStateRight.A56} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A56}
              </td>
          
          </table>
        </Accordion> 
        <Accordion title='L3' > 
        <table>
        <ConclusionButton value='l3_i' title='L' displayText='' pressed={buttonPressed === 'l3_i'}/>

            <td>
                <input type='checkbox' name="radio1" value='1' id='A57' checked={checkedStateLeft.A57} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A57}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A58' checked={checkedStateLeft.A58} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A58}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A59' checked={checkedStateLeft.A59} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A59}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A60' checked={checkedStateLeft.A60} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A60 }
              </td>
              <ConclusionButton value='l3_d' title='R' displayText='' pressed={buttonPressed === 'l3_d'}/>

            <td>
                <input type='checkbox' name="radio2" value='1' id='A61' checked={checkedStateRight.A61} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A61 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A62' checked={checkedStateRight.A62} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A62}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A63' checked={checkedStateRight.A63} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A63}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A64' checked={checkedStateRight.A64} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A64}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L4' >
        <table>
            <td>
            <ConclusionButton value='l4_i' title='L' displayText='' pressed={buttonPressed === 'l4_i'}/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A65' checked={checkedStateLeft.A65} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A65}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A66' checked={checkedStateLeft.A66} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A66}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A67' checked={checkedStateLeft.A67} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A67}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A68' checked={checkedStateLeft.A68} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A68 }
              </td>
              <ConclusionButton value='l4_d' title='R' displayText='' pressed={buttonPressed === 'l4_d'}/>

            <td>
                <input type='checkbox' name="radio2" value='1' id='A69' checked={checkedStateRight.A69} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A69 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A70' checked={checkedStateRight.A70} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A70}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A71' checked={checkedStateRight.A71} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A71}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A72' checked={checkedStateRight.A72} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A72}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L5' >
        <table>
            <td> 
            <ConclusionButton value='l5_i' title='L' displayText=''  pressed={buttonPressed === 'l5_i'}/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A73' checked={checkedStateLeft.A73} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A73}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A74' checked={checkedStateLeft.A74} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A74}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A75' checked={checkedStateLeft.A75} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A75}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A76' checked={checkedStateLeft.A76} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A76 }
              </td>
              <ConclusionButton value='l5_d' title='R' displayText=''  pressed={buttonPressed === 'l5_d'}/>
            <td>
                <input type='checkbox' name="radio2" value='1' id='A77' checked={checkedStateRight.A77} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A77 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A78' checked={checkedStateRight.A78} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A78}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A79' checked={checkedStateRight.A79} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A79}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A80' checked={checkedStateRight.A80} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A80}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S1'>
        <table>
            <td>
            <ConclusionButton value='s1_i' title='L' displayText=''  pressed={buttonPressed === 's1_i'}/>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='1' id='A81' checked={checkedStateLeft.A81} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A81}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='2' id='A82' checked={checkedStateLeft.A82} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A82}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='3' id='A83' checked={checkedStateLeft.A83} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A83}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='4' id='A84' checked={checkedStateLeft.A84} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A84}
              </td>
              <ConclusionButton value='s1_d' title='R' displayText=''  pressed={buttonPressed === 's1_d'}/>

            <td>
                <input type='checkbox' name="radio2" value='1' id='A85' checked={checkedStateRight.A85} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A85 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='2' id='A86' checked={checkedStateRight.A86} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A86}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='3' id='A87' checked={checkedStateRight.A87} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A87}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='4' id='A88' checked={checkedStateRight.A88} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A88}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S2' >
        <table>
            <td>
            <ConclusionButton value='s2_i' title='L' displayText=''  pressed={buttonPressed === 's2_i'}/>
            </td>
            <td>
                  <input type='checkbox' name="radio1" value='1' id='A169' checked={checkedStateLeft.A169} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A169}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='2' id='A170' checked={checkedStateLeft.A170} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A170}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='3' id='A171' checked={checkedStateLeft.A171} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A171}
                </td>
                <td>
                  <input type='checkbox' name="radio1" value='4' id='A172' checked={checkedStateLeft.A172} onChange={handleCheckboxChangeLeft} />
                  {checkedStateLeft.A172}
                </td>
                <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
                <td>
                  <input type='checkbox' name="radio2" value='1' id='A173' checked={checkedStateRight.A173} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A173}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='2' id='A174' checked={checkedStateRight.A174} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A174}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='3' id='A175' checked={checkedStateRight.A175} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A175}
                </td>
                <td>
                  <input type='checkbox' name="radio2" value='4' id='A176' checked={checkedStateRight.A176} onChange={handleCheckboxChangeRight} />
                  {checkedStateRight.A176}
                </td>
          </table>
        </Accordion> 
        <ConclusionButton value='lumbrosaca_multinivel' title='LUMBROSACA MULTINIVEL' />              
      </Accordion>

      <Accordion title='TORÁCICA'>
        <ConclusionButton value='T' title='T' />            
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
        <ConclusionButton value='cervical' title='CERVICAL' displayText=''/>   
        <ConclusionButton value='torasica' title='TORACICA' displayText=''/> 
        <ConclusionButton value='lumbrosaca' title='LUMBOSACRA' displayText=''/>            
      </Accordion>

      
    </div>
  );
};

const StepC2 = ({ handleNextStep2, handlePrevStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button className={`print-button dont-print `}>
          <img src="/I_X.webp" alt="Imprimir" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>

      <div onClick={ handleNextStep2 }>
      <ConclusionButton value='intensidad_leve' title='INTENSIDAD LEVE (+/+)' displayText=''/>
      <ConclusionButton value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText=''/>
      <ConclusionButton value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText=''/>
      <ConclusionButton value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText=''/>
      </div>

      
    </div>
  );
};

const StepD2 = ({ handlePrevStep2, handleNextStep2 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>


      <h1 className=' text-xl font-bold text-white'>
        REINERVACION
      </h1>

      <div onClick={handleNextStep2}
      >
      <ConclusionButton value='p_completa' title='REINERVACION COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'/>
      <ConclusionButton value='p_parcial' title='REINERVACION COLATERAL COMPENSATORIA MINIMA' displayText='MINIMA'/>
      <ConclusionButton value='p_no_funcional' title='REINERVACION COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE'/>
      </div>
      
    </div>
  );
};


const StepE2 = ({  handlePrevStep2, handleNextStep2}) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep2} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>


      <h1 className=' text-xl font-bold text-white'>
        PRONOSTICO
      </h1>

      <div onClick={handleNextStep2}
      >
      <ConclusionButton value='p_completa' title='Y PRONOSTICO DE RECUPERACION COMPLETA' displayText=''/>
      <ConclusionButton value='p_parcial' title='Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL' displayText=''/>
      <ConclusionButton value='p_no_funcional' title='Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL' displayText=''/>
      <ConclusionButton value='nula' title='NULA (EN FASE DE SECUELA DEFINITIVA)' displayText=''/>
      </div>
      
    </div>
  );
};

const StepF1 = ({ handlePrevStep1, handleNextStep1 }) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep1} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>


      <h1 className=' text-xl font-bold text-white'>
        REINERVACION
      </h1>

      <div onClick={handleNextStep1}>
      <ConclusionButton value='p_completa' title='REINERVACION COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'/>
      <ConclusionButton value='p_parcial' title='REINERVACION COLATERAL COMPENSATORIA MINIMA' displayText='MINIMA'/>
      <ConclusionButton value='p_no_funcional' title='REINERVACION COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE'/>
      </div>
      
    </div>
  );
};

export default SimpleMultiStepForm;
