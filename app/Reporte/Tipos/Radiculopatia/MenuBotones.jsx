import { Accordion } from '@/app/components/ReportTemplate/Accordion';
import { useState, createContext, useContext } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
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

  });
   // Función para manejar los cambios de checkboxes en el lado izquierdo
   const handleCheckboxChangeLeft = (id) => {
    setcheckedStateLeft((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === id ? !prevState[id] : false;
        return acc;
      }, {});
      return newState;
    });
  };
  // Función para manejar los cambios de checkboxes en el lado derecho
  const handleCheckboxChangeRight = (id) => {
    setcheckedStateRight((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === id ? !prevState[id] : false;
        return acc;
      }, {});
      return newState;
    });
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
  };
  const handlePrevStep2 = () => {
    if (step === 'E2') setStep('D2');
  };
  return {
    step,
    handleNextStep,
    handlePrevStep,
    handleNextStep1,
    handleNextStep2,
    handlePrevStep1,
    handlePrevStep2,
  };
};
const SimpleMultiStepForm = () => {
  const { step, handleNextStep, handlePrevStep,handleNextStep1,handleNextStep2,handlePrevStep1,handlePrevStep2 } = useStep();
  const { checkedStateLeft, setcheckedStateLeft, checkedStateRight, setcheckedStateRight } = useContext(CheckboxContext);
  const { selectedImages, handleImageChange, handleUndo, handlePrint } = useImageState();
  return (
      <div>
        {/* Renderiza el componente adecuado basado en el estado del paso */}
        {step === 'A' ? (<StepA handleNextStep={handleNextStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} />) : null}
        {step === 'B' ? (<StepB handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />) : null}
        {step === 'B1' ? (<StepB1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'C' ? (<StepC handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />) : null}
        {step === 'C1' ? (<StepC1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'D' ? (<StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />) : null}
        {step === 'E' ? (<StepE handlePrevStep={handlePrevStep}  />) : null}
        {step === 'D1' ? (<StepD1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'E1' ? (<StepE1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'F1' ? (<StepF1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'G1' ? (<StepG1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />) : null}
        {step === 'B2' ? (<StepB2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />) : null}
        {step === 'C2' ? (<StepC2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />) : null}
        {step === 'E2' ? (<StepE2 handlePrevStep2={handlePrevStep2} />) : null}
        {step === 'D2' ? (<StepD2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />) : null}
      </div>
  );
};
const StepA = ({ handleNextStep,handleNextStep1, handleNextStep2} ) => (
  <div>
    <div className='button-bar'>
      <button className='print-button dont-print'>
        <img src="" style={{ filter: 'invert(0.5)' }} />
      </button>
      <button className='print-button dont-print'>
        <img src="" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>EVOLUCIÓN</h1>
    <div onClick={ handleNextStep }>
          <ConclusionButton value='radiculopatia_aguda' title='RADICULOPATIA AGUDA' displayText=''/>
        </div>
        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='radiculopatia_subaguda' title='RADICULOPATIA SUBAGUDA' displayText=''/>
        </div>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='radiculopatia_cronica' title='RADICULOPATIA CRONICA' displayText=''/>
        </div>
        {/* <div onClick={ handleNextStep2 }> */} 
          <ConclusionButton value='radiculopatia_sensitiva' title='RADICULOPATIA SENSITIVA' displayText=''/>
        {/* </div> */} 
        <div onClick={ handleNextStep }>
          <ConclusionButton value='radiculopatia_intermitente' title='RADICULOPATIA INTERMITENTE' displayText=''/>
        </div>
  </div>
);
const StepB = ({ handleNextStep, handlePrevStep}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight, resetCheckboxes} = useContext(CheckboxContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleCheckboxChangeLeft= (event) => {
    const { id, checked } = event.target;
    setcheckedStateLeft(prevState => ({
      ...!prevState,
      [id]: checked
    }));
  };
  const handleCheckboxChangeRight = (event) => {
    const { id, checked } = event.target;
    setcheckedStateRight(prevState => ({
      ...!prevState,
      [id]: checked
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
        <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id='next' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL</h1>
      <Accordion title='CERVICAL'>
        <Accordion title='C4' onToggle={handleAccordionToggle}>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio1" value='1' id='A1' checked={checkedStateLeft.A1} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A1}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A2' checked={checkedStateLeft.A2} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A2}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A3' checked={checkedStateLeft.A3} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A3}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A4' checked={checkedStateLeft.A4} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A4 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio2" value='1' id='A5' checked={checkedStateRight.A5} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A5 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A6' checked={checkedStateRight.A6} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A6}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A7' checked={checkedStateRight.A7} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A7}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A8' checked={checkedStateRight.A8} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A8}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C5' onToggle={handleAccordionToggle}>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio1" value='1' id='A9' checked={checkedStateLeft.A9} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A9}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A10' checked={checkedStateLeft.A10} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A10}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A11' checked={checkedStateLeft.A11} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A11}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A12' checked={checkedStateLeft.A12} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A12 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio2" value='1' id='A13' checked={checkedStateRight.A13} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A13 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A14' checked={checkedStateRight.A14} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A14}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A15' checked={checkedStateRight.A15} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A15}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A16' checked={checkedStateRight.A16} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A16}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C6' onToggle={handleAccordionToggle}>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio1" value='1' id='A17' checked={checkedStateLeft.A17} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A17}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A18' checked={checkedStateLeft.A18} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A18}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A19' checked={checkedStateLeft.A19} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A19}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A20' checked={checkedStateLeft.A20} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A20 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio2" value='1' id='A21' checked={checkedStateRight.A21} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A21 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A22' checked={checkedStateRight.A22} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A22}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A23' checked={checkedStateRight.A23} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A23}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A24' checked={checkedStateRight.A24} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A24}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C7' onToggle={handleAccordionToggle}>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio1" value='1' id='A25' checked={checkedStateLeft.A25} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A25}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A26' checked={checkedStateLeft.A26} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A26}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A27' checked={checkedStateLeft.A27} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A27}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A28' checked={checkedStateLeft.A28} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A28 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio2" value='1' id='A29' checked={checkedStateRight.A29} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A29 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A30' checked={checkedStateRight.A30} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A30}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A31' checked={checkedStateRight.A31} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A31}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A32' checked={checkedStateRight.A32} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A32}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='C8' onToggle={handleAccordionToggle}>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio1" value='1' id='A33' checked={checkedStateLeft.A33} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A33}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A34' checked={checkedStateLeft.A34} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A34}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A35' checked={checkedStateLeft.A35} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A35}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A36' checked={checkedStateLeft.A36} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A36 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio2" value='1' id='A37' checked={checkedStateRight.A37} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A37 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A38' checked={checkedStateRight.A38} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A38}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A39' checked={checkedStateRight.A39} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A39}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A40' checked={checkedStateRight.A40} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A40}
              </td>
            </tr>
          </table>
        </Accordion>
        <Accordion title='T1' onToggle={handleAccordionToggle}>
          <table cellpadding='1'>
            <tr>
              <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio1" value='1' id='A41' checked={checkedStateLeft.A41} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A41}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A42' checked={checkedStateLeft.A42} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A42}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A43' checked={checkedStateLeft.A43} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A43}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A44' checked={checkedStateLeft.A44} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A44 }
              </td>
              <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
              <td>
                <input type='radio' name="radio2" value='1' id='A45' checked={checkedStateRight.A45} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A45 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A46' checked={checkedStateRight.A46} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A46}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A47' checked={checkedStateRight.A47} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A47}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A48' checked={checkedStateRight.A48} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A48}
              </td>
            </tr>
          </table>
        </Accordion>
        <ConclusionButton value='cervical_multinivel' title='CERVICAL MULTINIVEL' /> 
      </Accordion>
      <Accordion title='LUMBAR'>
      <Accordion title='L2' onToggle={handleAccordionToggle}>
      <table>
            <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio1" value='1' id='A49' checked={checkedStateLeft.A49} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A49}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A50' checked={checkedStateLeft.A50} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A50}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A51' checked={checkedStateLeft.A51} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A51}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A52' checked={checkedStateLeft.A52} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A52 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio2" value='1' id='A53' checked={checkedStateRight.A53} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A53 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A54' checked={checkedStateRight.A54} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A54}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A55' checked={checkedStateRight.A55} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A55}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A56' checked={checkedStateRight.A56} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A56}
              </td>
          
          </table>
        </Accordion> 
        <Accordion title='L3' onToggle={handleAccordionToggle}> 
        <table>
        <td>&nbsp;&nbsp;L&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio1" value='1' id='A57' checked={checkedStateLeft.A57} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A57}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A58' checked={checkedStateLeft.A58} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A58}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A59' checked={checkedStateLeft.A59} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A59}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A60' checked={checkedStateLeft.A60} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A60 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio2" value='1' id='A61' checked={checkedStateRight.A61} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A61 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A62' checked={checkedStateRight.A62} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A62}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A63' checked={checkedStateRight.A63} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A63}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A64' checked={checkedStateRight.A64} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A64}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L4' onToggle={handleAccordionToggle}>
        <table>
            <td>
            <ConclusionButton value='l4_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='radio' name="radio1" value='1' id='A65' checked={checkedStateLeft.A65} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A65}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A66' checked={checkedStateLeft.A66} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A66}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A67' checked={checkedStateLeft.A67} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A67}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A68' checked={checkedStateLeft.A68} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A68 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio2" value='1' id='A69' checked={checkedStateRight.A69} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A69 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A70' checked={checkedStateRight.A70} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A70}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A71' checked={checkedStateRight.A71} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A71}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A72' checked={checkedStateRight.A72} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A72}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L5' onToggle={handleAccordionToggle}>
        <table>
            <td>
            <ConclusionButton value='l5_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='radio' name="radio1" value='1' id='A73' checked={checkedStateLeft.A73} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A73}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A74' checked={checkedStateLeft.A74} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A74}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A75' checked={checkedStateLeft.A75} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A75}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A76' checked={checkedStateLeft.A76} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A76 }
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio2" value='1' id='A77' checked={checkedStateRight.A77} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A77 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A78' checked={checkedStateRight.A78} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A78}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A79' checked={checkedStateRight.A79} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A79}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A80' checked={checkedStateRight.A80} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A80}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S1' onToggle={handleAccordionToggle}>
        <table>
            <td>
            <ConclusionButton value='s1_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='radio' name="radio1" value='1' id='A81' checked={checkedStateLeft.A81} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A81}
              </td>
              <td>
                <input type='radio' name="radio1" value='2' id='A82' checked={checkedStateLeft.A82} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A82}
              </td>
              <td>
                <input type='radio' name="radio1" value='3' id='A83' checked={checkedStateLeft.A83} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A83}
              </td>
              <td>
                <input type='radio' name="radio1" value='4' id='A84' checked={checkedStateLeft.A84} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A84}
              </td>
            <td>&nbsp;&nbsp;R&nbsp;&nbsp;</td>
            <td>
                <input type='radio' name="radio2" value='1' id='A85' checked={checkedStateRight.A85} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A85 }
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A86' checked={checkedStateRight.A86} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A86}
              </td>
              <td>
                <input type='radio' name="radio2" value='3' id='A87' checked={checkedStateRight.A87} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A87}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A88' checked={checkedStateRight.A88} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A88}
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

const StepC = ({ handleNextStep, handlePrevStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button className={`print-button dont-print `}>
        <img src="/I_X.webp" alt="Imprimir" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>

    <h1 className='text-xl font-bold text-white'>INTENSIDAD</h1>

    <div onClick={handleNextStep}>
      <ConclusionButton value='intensidad_leve' title='INTENSIDAD LEVE (+/+) ' displayText='' />
      <ConclusionButton value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText='' />
      <ConclusionButton value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText='' />
      <ConclusionButton value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText='' />
    </div>
  </div>
);

const StepD = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>PRONOSTICO</h1>
    <div onClick={handleNextStep}>
      <ConclusionButton value='p_completa' title='Y PRONOSTICO DE RECUPERACION COMPLETA' displayText='' />
      <ConclusionButton value='p_parcial' title='Y PRONOSTICO DE RECUPERACION PARCIAL' displayText='' />
      <ConclusionButton value='p_no' title='Y SIN PRONOSTICO DE RECUPERACION' displayText='' />
    </div>
  </div>
);

const StepE = ({ handlePrevStep, handleNextStep, handleImageChange, handleUndo, handlePrint }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handlePrint} className={`print-button dont-print `}>
        <img src="/I_Print.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleUndo} className={`print-button dont-print `}>
        <img src="/I_Undo.svg" alt="Deshacer" style={{ filter: 'invert(1)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>IMAGENES</h1>
    <div className='image-container'>
      <img src={selectedImages['A'] || '/defaultA.png'} alt="A" onClick={() => handleImageChange('A')} />
      <img src={selectedImages['B'] || '/defaultB.png'} alt="B" onClick={() => handleImageChange('B')} />
    </div>
    <div onClick={handleNextStep}>
      <ConclusionButton value='siguiente' title='SIGUIENTE' displayText='' />
    </div>
  </div>
);

const StepB1 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso B1</h1>
    <div>
      <ConclusionButton value='b1_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='b1_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepC1 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso C1</h1>
    <div>
      <ConclusionButton value='c1_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='c1_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepD1 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso D1</h1>
    <div>
      <ConclusionButton value='d1_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='d1_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepE1 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso E1</h1>
    <div>
      <ConclusionButton value='e1_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='e1_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepF1 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso F1</h1>
    <div>
      <ConclusionButton value='f1_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='f1_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepG1 = ({ handlePrevStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso G1</h1>
    <div>
      <ConclusionButton value='g1_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='g1_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepB2 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso B2</h1>
    <div>
      <ConclusionButton value='b2_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='b2_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepC2 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso C2</h1>
    <div>
      <ConclusionButton value='c2_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='c2_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepD2 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso D2</h1>
    <div>
      <ConclusionButton value='d2_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='d2_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepE2 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso E2</h1>
    <div>
      <ConclusionButton value='e2_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='e2_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepF2 = ({ handlePrevStep, handleNextStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
      <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso F2</h1>
    <div>
      <ConclusionButton value='f2_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='f2_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

const StepG2 = ({ handlePrevStep }) => (
  <div>
    <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
        <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
      </button>
    </div>
    <h1 className='text-xl font-bold text-white'>Paso G2</h1>
    <div>
      <ConclusionButton value='g2_option1' title='Opción 1' displayText='' />
      <ConclusionButton value='g2_option2' title='Opción 2' displayText='' />
    </div>
  </div>
);

export default SimpleMultiStepForm;
