
import { Accordion } from '@/app/components/ReportTemplate/Accordion';
import { CheckboxContext, ReportContextR, useButtonContext } from '@/src/context';
import { useContext, useState } from 'react';
import { ConclusionButtonR } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';

// Hook personalizado para manejar los pasos
const useStep = () => {
  const [step, setStep] = useState('A'); // Inicialmente en el paso 'A'
  const { resetCheckboxes } = useContext(CheckboxContext);
  const { handlePrint } = useImageState();

  // Flujo principal (ejemplo Radiculopatía Aguda)
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
    else if (step === 'D') setStep('E');
  };
  
  const handlePrevStep = () => {
    if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') {
      setStep('A');
      // Al volver a A, puedes resetear si así lo requieres
      resetCheckboxes();
    }
  };
  
  // Flujo para Radiculopatía Crónica
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
    else if (step === 'B1') {
      setStep('A');
      resetCheckboxes();
    }
  };
  
  // Flujo para Radiculopatía Subaguda
  const handleNextStep2 = () => {
    if (step === 'A') setStep('B2');
    else if (step === 'B2') setStep('C2');
    else if (step === 'C2') setStep('D2');
    else if (step === 'D2') setStep('E2');
    else if (step === 'E2') setStep('E');
  };
  
  const handlePrevStep2 = () => {
    if (step === 'E2') setStep('D2');
    else if (step === 'D2') setStep('C2');
    else if (step === 'C2') setStep('B2');
    else if (step === 'B2') {
      setStep('A');
      resetCheckboxes();
    }
  };

  // Flujo para Radiculopatía Sensitiva
  const handleNextStep3 = () => {
    if (step === 'A') setStep('S1');
    else if (step === 'S1') setStep('E3');
  };
  
  const handlePrevStep3 = () => {
    if (step === 'E3') setStep('S1');
    else if (step === 'S1') {
      setStep('A');
      resetCheckboxes();
    }
  };

  return {
    step,
    handleNextStep,
    handlePrevStep,
    handleNextStep1,
    handlePrevStep1,
    handleNextStep2,
    handlePrevStep2,
    handleNextStep3,
    handlePrevStep3,
    handlePrint
  };
};

const SimpleMultiStepForm = () => {
  const {
    step,
    handleNextStep,
    handlePrevStep,
    handleNextStep1,
    handlePrevStep1,
    handleNextStep2,
    handlePrevStep2,
    handleNextStep3,
    handlePrevStep3,
    handlePrint
  } = useStep();

  return (
    <div>
      {step === 'A' && (
        <StepA
          handleNextStep={handleNextStep}    // Aguda
          handleNextStep1={handleNextStep1}  // Crónica
          handleNextStep2={handleNextStep2}  // Subaguda
          handleNextStep3={handleNextStep3}  // Sensitiva
        />
      )}
      
      {/* Flujo principal (aguda) */}
      {step === 'B' && <StepB handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'C' && <StepC handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'D' && <StepD handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} handlePrint={handlePrint} />}

      {/* Flujo crónico */}
      {step === 'B1' && <StepB1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />}
      {step === 'C1' && <StepC1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />}
      {step === 'D1' && <StepD1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />}
      {step === 'E1' && <StepE1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />}
      {step === 'F1' && <StepF1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />}
      {step === 'G1' && <StepG1 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />}

      {/* Flujo subagudo */}
      {step === 'B2' && <StepB2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />}
      {step === 'C2' && <StepC2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />}
      {step === 'D2' && <StepD2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />}
      {step === 'E2' && <StepE2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} handlePrint={handlePrint} />}

      {/* Flujo sensitiva */}
      {step === 'S1' && <StepS1 handlePrevStep3={handlePrevStep3} handleNextStep3={handleNextStep3} />}
      {step === 'E3' && <StepE3 handlePrevStep3={handlePrevStep3} handleNextStep3={handleNextStep3} handlePrint={handlePrint} />}
    </div>
  );
};

const StepA = ({ handleNextStep, handleNextStep1, handleNextStep2, handleNextStep3 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value]; // Since we just toggled it

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <h1 className="text-xl font-bold text-white">EVOLUCIÓN</h1>
      <div>
        <ConclusionButtonR
          value="radiculopatia_aguda"
          title="RADICULOPATIA AGUDA"
          displayText="RADICULOPATIA AGUDA"
          pressed={activeButtons["radiculopatia_aguda"]}
          onClick={() => handleButtonPress("radiculopatia_aguda", "RADICULOPATIA AGUDA", handleNextStep)}
        />
      </div>
      <div>
        <ConclusionButtonR
          value="radiculopatia_subaguda"
          title="RADICULOPATIA SUBAGUDA"
          displayText="RADICULOPATIA SUBAGUDA"
          pressed={activeButtons["radiculopatia_subaguda"]}
          onClick={() => handleButtonPress("radiculopatia_subaguda", "RADICULOPATIA SUBAGUDA", handleNextStep2)}
        />
      </div>
      <div>
        <ConclusionButtonR
          value="radiculopatia_cronica"
          title="RADICULOPATIA CRONICA"
          displayText="RADICULOPATIA CRONICA"
          pressed={activeButtons["radiculopatia_cronica"]}
          onClick={() => handleButtonPress("radiculopatia_cronica", "RADICULOPATIA CRONICA", handleNextStep1)}
        />
      </div>
      <div>
        <ConclusionButtonR
          value="radiculopatia_sensitiva"
          title="RADICULOPATIA SENSITIVA"
          displayText="RADICULOPATIA SENSITIVA"
          pressed={activeButtons["radiculopatia_sensitiva"]}
          onClick={() => handleButtonPress("radiculopatia_sensitiva", "BLOQUEO AFERENTE", handleNextStep3)}
        />
      </div>
    </div>
  );
};
const StepB = ({ handleNextStep, handlePrevStep}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight, resetCheckboxes} = useContext(CheckboxContext);  
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

  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value]; // Since we just toggled it

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
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
        <Accordion title='C4 '>
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
        <ConclusionButtonR 
        value='cervical_multinivel' 
        title='CERVICAL MULTINIVEL'
        displayText="CERVICAL MULTINIVEL"
        pressed={activeButtons["cervical_multinivel"]}
        onClick={() => handleButtonPress("cervical_multinivel", "CERVICAL MULTINIVEL")}
        /> 
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
            <ConclusionButtonR value='l4_i' title='L' displayText=''/>
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
            <ConclusionButtonR value='l5_i' title='L' displayText=''/>
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
            <ConclusionButtonR value='s1_i' title='L' displayText=''/>
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
              <ConclusionButtonR value='s1_d' title='R' displayText=''/>
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
        <ConclusionButtonR 
        value='lumbrosaca_multinivel' 
        title='LUMBROSACA MULTINIVEL' 
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel"]}
        onClick={() => handleButtonPress("lumbrosaca_multinivel", "LUMBROSACA MULTINIVEL")}
        />
      </Accordion>
      <Accordion title='TORÁCICA'>
      </Accordion>
      <Accordion title='POLISEGMENTARIA'>
        <ConclusionButtonR 
        value='cervical' 
        title='CERVICAL'
        displayText="CERVICAL"
        pressed={activeButtons["cervical"]}
        onClick={() => handleButtonPress("cervical", "CERVICAL")} 
        />   
        <ConclusionButtonR 
        value='torasica' 
        title='TORACICA' 
        displayText="TORACICA"
        pressed={activeButtons["torasica"]}
        onClick={() => handleButtonPress("torasica", "TORACICA")} 
        /> 
        <ConclusionButtonR 
        value='lumbrosaca' 
        title='LUMBOSACRA' 
        displayText="LUMBOSACRA"
        pressed={activeButtons["lumbrosaca"]}
        onClick={() => handleButtonPress("lumbrosaca", "LUMBOSACRA")} 
        />            
      </Accordion>      
    </div>
  );
};

const StepC = ({ handleNextStep, handlePrevStep }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

  return (
    <div>
      <div className="button-bar">
        <button onClick={handlePrevStep} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button className="print-button dont-print">
          <img src="/I_X.webp" alt="Imprimir" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">INTENSIDAD</h1>
      <div>
        <ConclusionButtonR
          value="intensidad_leve"
          title="INTENSIDAD LEVE (+/+)"
          displayText="INTENSIDAD LEVE (+/+)"
          pressed={activeButtons["intensidad_leve"]}
          onClick={() => handleButtonPress("intensidad_leve", "INTENSIDAD LEVE (+/+).", handleNextStep)}
        />
        <ConclusionButtonR
          value="intensidad_moderada"
          title="INTENSIDAD MODERADA (++)"
          displayText="INTENSIDAD MODERADA (++)"
          pressed={activeButtons["intensidad_moderada"]}
          onClick={() => handleButtonPress("intensidad_moderada", "INTENSIDAD MODERADA (++).", handleNextStep)}
        />
        <ConclusionButtonR
          value="intensidad_severa"
          title="INTENSIDAD SEVERA (+++)"
          displayText="INTENSIDAD SEVERA (+++)"
          pressed={activeButtons["intensidad_severa"]}
          onClick={() => handleButtonPress("intensidad_severa", "INTENSIDAD SEVERA (+++).", handleNextStep)}
        />
        <ConclusionButtonR
          value="intensidad_difusa"
          title="INTENSIDAD DIFUSA (++++)"
          displayText="INTENSIDAD DIFUSA (++++)"
          pressed={activeButtons["intensidad_difusa"]}
          onClick={() => handleButtonPress("intensidad_difusa", "INTENSIDAD DIFUSA (++++).", handleNextStep)}
        />
      </div>
    </div>
  );
};

const StepD = ({ handlePrevStep, handleNextStep }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

  return (
    <div>
      <div className="button-bar">
        <button onClick={handlePrevStep} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button id="prev" className="print-button dont-print">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">PRONOSTICO</h1>
      <div>
        <ConclusionButtonR
          value="p_completa"
          title="COMPLETA"
          displayText="COMPLETA"
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", " PRONOSTICO DE RECUPERACION COMPLETA.", handleNextStep)}
        />
        <ConclusionButtonR
          value="p_parcial"
          title="PARCIAL FUNCIONAL"
          displayText="PARCIAL FUNCIONAL"
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", " PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL.", handleNextStep)}
        />
        <ConclusionButtonR
          value="p_no_funcional"
          title="POBRE NO FUNCIONAL"
          displayText="POBRE NO FUNCIONAL"
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", " PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL.", handleNextStep)}
        />
        <ConclusionButtonR
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText="NULA (EN FASE DE SECUELA DEFINITIVA)"
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", " PRONOSTICO DE RECUPERACION NULO (EN FASE DE SECUELA DEFINITIVA).", handleNextStep)}
        />
      </div>
    </div>
  );
};

const StepB1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

  return (
    <div>
      <div className="button-bar">
        <button onClick={handlePrevStep1} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep1} className="print-button dont-print">
          <img src="/I_In.svg" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">FASE</h1>
      <div>
        <ConclusionButtonR
          value="activa"
          title="ACTIVA"
          displayText=""
          pressed={activeButtons["activa"]}
          onClick={() => handleButtonPress("activa", "ACTIVA", handleNextStep1)}
        />
        <ConclusionButtonR
          value="inactiva"
          title="INACTIVA"
          displayText=""
          pressed={activeButtons["inactiva"]}
          onClick={() => handleButtonPress("inactiva", "INACTIVA", handleNextStep1)}
        />
        <ConclusionButtonR
          value="antigua"
          title="ANTIGUA"
          displayText=""
          pressed={activeButtons["antigua"]}
          onClick={() => handleButtonPress("antigua", "ANTIGUA", handleNextStep1)}
        />
      </div>
    </div>
  );
};


const StepS1 = ({ handleNextStep3, handlePrevStep3 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleCheckboxChange = (event, value, title) => {
    const isChecked = event.target.checked;
    toggleButton(value);

    if (isChecked) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }
  };

  return (
    <div>
      <div className='button-bar'>
        <button onClick={handlePrevStep3} id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Previous" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" alt="Next" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL</h1>  

      <Accordion title='C6-C7'>
        <table>
          <tr className="checkbox-row">
            <td>
              <input
                type="checkbox"
                id="c6s_i"
                checked={activeButtons["c6s_i"] || false}
                onChange={(e) => handleCheckboxChange(e, "c6s_i", "C6-C8 IZQUIERDO.")}
              />
              <label htmlFor="c6s_i"> L </label>
            </td>
            <td>
              <input
                type="checkbox"
                id="c6s_d"
                checked={activeButtons["c6s_d"] || false}
                onChange={(e) => handleCheckboxChange(e, "c6s_d", "C6-C8 DERECHO.")}
              />
              <label htmlFor="c6s_d"> R </label>
            </td>
            <td>
              <input
                type="checkbox"
                id="c6s_bi"
                checked={activeButtons["c6s_bi"] || false}
                onChange={(e) => handleCheckboxChange(e, "c6s_bi", "C6-C8 BILATERAL.")}
              />
              <label htmlFor="c6s_bi"> L & R </label>
            </td>
          </tr>
        </table>
      </Accordion>

      <Accordion title='S1'>
        <table>
          <tr className="checkbox-row">
            <td>
              <input
                type="checkbox"
                id="s1s_i"
                checked={activeButtons["s1s_i"] || false}
                onChange={(e) => handleCheckboxChange(e, "s1s_i", " S1 IZQUIERDA.")}
              />
              <label htmlFor="s1s_i"> L </label>
            </td>
            <td>
              <input
                type="checkbox"
                id="s1s_d"
                checked={activeButtons["s1s_d"] || false}
                onChange={(e) => handleCheckboxChange(e, "s1s_d", "S1 DERECHA.")}
              />
              <label htmlFor="s1s_d"> R </label>
            </td>
            <td>
              <input
                type="checkbox"
                id="s1s_bi"
                checked={activeButtons["s1s_bi"] || false}
                onChange={(e) => handleCheckboxChange(e, "s1s_bi", "S1 BILATERAL.")}
              />
              <label htmlFor="s1s_bi"> L & R </label>
            </td>
          </tr>
        </table>
      </Accordion>
    </div>
  );
};


const StepC1 = ({ handleNextStep1, handlePrevStep1}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight } = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContextR);
  const [buttonStates, setButtonStates] = useState({});
  const { activeButtons, toggleButton } = useButtonContext(); // Añadir esta línea
  const conclusionMapping = {
    A9: 'c5_i', A10: 'c5_i', A11: 'c5_i', A12: 'c5_i',
      A13: 'c5_d', A14: 'c5_d', A15: 'c5_d', A16: 'c5_d',
      A17: 'c6_i', A18: 'c6_i', A19: 'c6_i', A20: 'c6_i',
      A21: 'c6_d', A22: 'c6_d', A23: 'c6_d', A24: 'c6_d',
      A25: 'c7_i', A26: 'c7_i', A27: 'c7_i', A28: 'c7_i',
      A29: 'c7_d', A30: 'c7_d', A31: 'c7_d', A32: 'c7_d',
      A33: 'c8_i', A34: 'c8_i', A35: 'c8_i', A36: 'c8_i',
      A37: 'c8_d', A38: 'c8_d', A39: 'c8_d', A40: 'c8_d',
      A41: 't1_i', A42: 't1_i', A43: 't1_i', A44: 't1_i',
      A45: 't1_d', A46: 't1_d', A47: 't1_d', A48: 't1_d',
      A49: 'l2_i', A50: 'l2_i', A51: 'l2_i', A52: 'l2_i',
      A53: 'l2_d', A54: 'l2_d', A55: 'l2_d', A56: 'l2_d',
      A57: 'l3_i', A58: 'l3_i', A59: 'l3_i', A60: 'l3_i',
      A61: 'l3_d', A62: 'l3_d', A63: 'l3_d', A64: 'l3_d',
      A65: 'l4_i', A66: 'l4_i', A67: 'l4_i', A68: 'l4_i',
      A69: 'l4_d', A70: 'l4_d', A71: 'l4_d', A72: 'l4_d',
      A73: 'l5_i', A74: 'l5_i', A75: 'l5_i', A76: 'l5_i',
      A77: 'l5_d', A78: 'l5_d', A79: 'l5_d', A80: 'l5_d',
      A81: 's1_i', A82: 's1_i', A83: 's1_i', A84: 's1_i',
      A85: 's1_d', A86: 's1_d', A87: 's1_d', A88: 's1_d',
      A89: 's2_i', A90: 's2_i', A91: 's2_i', A92: 's2_i',
      A93: 's2_d', A94: 's2_d', A95: 's2_d', A96: 's2_d',
  };

  const handleCheckboxChange = (event, side) => {
    const { id, checked } = event.target;
    const setCheckedState = side === 'left' ? setcheckedStateLeft : setcheckedStateRight;
    const checkedState = side === 'left' ? checkedStateLeft : checkedStateRight;

    setCheckedState(prevState => {
      const newState = {
        ...prevState,
        [id]: checked,
      };

      // Now call handleButtonPress with the updated state
      handleButtonPress(id, checked, side, newState);
      return newState;
    });
  };

  const handleCheckboxChangeLeft = (event) => {
    handleCheckboxChange(event, 'left');
  };

  const handleCheckboxChangeRight = (event) => {
    handleCheckboxChange(event, 'right');
  };

  const conclusionTitles = {
  
  };

  const handleButtonPress = (checkboxId, isChecked, side, checkedState) => {
    const groupKey = conclusionMapping[checkboxId];
    if (groupKey) {
      const title = conclusionTitles[groupKey]; // Get the title
      if (isChecked) {
        setButtonStates(prevState => ({
          ...prevState,
          [groupKey]: true,
        }));
        updateConclusions({ value: groupKey, title });
      } else {
        // Check if other checkboxes in the group are still checked
        const checkboxesInGroup = Object.keys(conclusionMapping).filter(
          key => conclusionMapping[key] === groupKey
        );
        const anyChecked = checkboxesInGroup.some(id => checkedState[id]);
  
        if (!anyChecked) {
          setButtonStates(prevState => ({
            ...prevState,
            [groupKey]: false,
          }));
          updateConclusions({ value: groupKey, remove: true });
        }
      }
    }
  };

  const handleButtonPress1 = (value, title) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }
  };
   
  const handleConclusionButtonRClick = (value) => {
    const isPressed = buttonStates[value];
    const newPressedState = !isPressed;
  
    // Update buttonStates
    setButtonStates(prevState => ({
      ...prevState,
      [value]: newPressedState,
    }));
  
    const title = conclusionTitles[value]; // Get the title
  
    // Update conclusions
    if (newPressedState) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }
  }

  const renderConclusionButtonR = (value, title) => (
    <ConclusionButtonR
      value={value}
      title={title}
      pressed={buttonStates[value]}
      onClick={() => handleConclusionButtonRClick(value)}
    />
  );
 
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
                <input type='checkbox' name="radio2" value='5' id='A5' checked={checkedStateRight.A5} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A5 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='6' id='A6' checked={checkedStateRight.A6} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A6}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='7' id='A7' checked={checkedStateRight.A7} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A7}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='8' id='A8' checked={checkedStateRight.A8} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A8}
              </td>
          </table>
        </Accordion>
        <Accordion title='C5'>
        <table>
            <td>
            <td>
            {renderConclusionButtonR('c5_i', 'L')}
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='9' id='A9' checked={checkedStateLeft.A9} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A9}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='10' id='A10' checked={checkedStateLeft.A10} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A10}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='11' id='A11' checked={checkedStateLeft.A11} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A11}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='12' id='A12' checked={checkedStateLeft.A12} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A12 }
              </td>
            <td>
            <td>
            {renderConclusionButtonR('c5_d', 'R')}
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio2" value='13' id='A13' checked={checkedStateRight.A13} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A13 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='14' id='A14' checked={checkedStateRight.A14} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A14}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='15' id='A15' checked={checkedStateRight.A15} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A15}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='16' id='A16' checked={checkedStateRight.A16} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A16}
              </td>
          </table>
        </Accordion>
        <Accordion title='C6'>
        <table>
        <tr>
        {renderConclusionButtonR('c6_i', 'L')}

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

              {renderConclusionButtonR('c6_d', 'R')}

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
        {renderConclusionButtonR('c7_i', 'L')}

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
              {renderConclusionButtonR('c7_d', 'R')}

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
          {renderConclusionButtonR('c8_i', 'L')}

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
               {renderConclusionButtonR('c8_d', 'R')}

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
         {renderConclusionButtonR('t1_i', 'L')}

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
              {renderConclusionButtonR('t1_d', 'R')}

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
        <ConclusionButtonR
        value='cervical_multinivel'
        title='CERVICAL MULTINIVEL'
        displayText="CERVICAL MULTINIVEL"
        pressed={activeButtons["cervical_multinivel"]}
        onClick={() => handleButtonPress1("cervical_multinivel", "CERVICAL MULTINIVEL")}
      />                        
      </Accordion>

     
      <Accordion title='LUMBAR'>
      <Accordion title='L2' >
      <table>
      {renderConclusionButtonR('l2_i', 'L')}

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
                    {renderConclusionButtonR('l2_d', 'R')}

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
              {renderConclusionButtonR('l3_i', 'L')}
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
                            {renderConclusionButtonR('l3_d', 'R')}
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
            {renderConclusionButtonR('l4_i', 'L')}
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
            {renderConclusionButtonR('l4_d', 'R')}

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
            {renderConclusionButtonR('l5_i', 'L')}
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
                          {renderConclusionButtonR('l5_d', 'R')}

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
                        {renderConclusionButtonR('s1_i', 'L')}

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
                                      {renderConclusionButtonR('s1_d', 'R')}
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
                                    {renderConclusionButtonR('s2_i', 'L')}
            </td>
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
                  {renderConclusionButtonR('s2_d', 'R')}

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
          </table>
        </Accordion> 
        <ConclusionButtonR
        value='lumbrosaca_multinivel'
        title='LUMBROSACA MULTINIVEL'
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel"]}
        onClick={() => handleButtonPress1("lumbrosaca_multinivel", "LUMBROSACA MULTINIVEL")}
      />
      </Accordion>

      <Accordion title='TORÁCICA'>
        <ConclusionButtonR value='T' title='T' />            
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
      <ConclusionButtonR
    value='cervical'
    title='CERVICAL'
    displayText='CERVICAL'
    pressed={activeButtons["cervical"]}
    onClick={() => handleButtonPress1("cervical", "CERVICAL")}
  />
  <ConclusionButtonR
    value='toracica'
    title='TORÁCICA'
    displayText='TORÁCICA'
    pressed={activeButtons["toracica"]}
    onClick={() => handleButtonPress1("toracica", "TORÁCICA")}
  />
  <ConclusionButtonR
    value='lumbrosacra'
    title='LUMBOSACRA'
    displayText='LUMBOSACRA'
    pressed={activeButtons["lumbrosacra"]}
    onClick={() => handleButtonPress1("lumbrosacra", "LUMBOSACRA")}
  />                      
      </Accordion>     
    </div>
  );
};

const StepD1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

  return (
    <div>
      <div className="button-bar">
        <button onClick={handlePrevStep1} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button id="prev" className="print-button dont-print">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-white">INTENSIDAD</h1>

      <div>
        <ConclusionButtonR
          value="intensidad_leve"
          title="INTENSIDAD LEVE (+/+)"
          displayText="INTENSIDAD LEVE (+/+)"
          pressed={activeButtons["intensidad_leve"]}
          onClick={() => handleButtonPress("intensidad_leve", "INTENSIDAD LEVE (+/+)", handleNextStep1)}
        />
        <ConclusionButtonR
          value="intensidad_moderada"
          title="INTENSIDAD MODERADA (++)"
          displayText="INTENSIDAD MODERADA (++)"
          pressed={activeButtons["intensidad_moderada"]}
          onClick={() => handleButtonPress("intensidad_moderada", "INTENSIDAD MODERADA (++)", handleNextStep1)}
        />
        <ConclusionButtonR
          value="intensidad_severa"
          title="INTENSIDAD SEVERA (+++)"
          displayText="INTENSIDAD SEVERA (+++)"
          pressed={activeButtons["intensidad_severa"]}
          onClick={() => handleButtonPress("intensidad_severa", "INTENSIDAD SEVERA (+++)", handleNextStep1)}
        />
        <ConclusionButtonR
          value="intensidad_difusa"
          title="INTENSIDAD DIFUSA (++++)"
          displayText="INTENSIDAD DIFUSA (++++)"
          pressed={activeButtons["intensidad_difusa"]}
          onClick={() => handleButtonPress("intensidad_difusa", "INTENSIDAD DIFUSA (++++)", handleNextStep1)}
        />
      </div>
    </div>
  );
};

const StepE1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

  return (
    <div>
      <div className="button-bar">
        <button onClick={handlePrevStep1} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button id="prev" className="print-button dont-print">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-white">PROGRESION</h1>

      <div>
        <ConclusionButtonR
          value="con_progresion"
          title="CON PROGRESIÓN DISTAL A MIOTOMAS"
          displayText="CON PROGRESIÓN DISTAL A MIOTOMAS"
          pressed={activeButtons["con_progresion"]}
          onClick={() => handleButtonPress("con_progresion", "CON PROGRESIÓN DISTAL A MIOTOMAS.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="sin_progresion"
          title="SIN PROGRESION DISTAL A MIOTOMAS"
          displayText="SIN PROGRESION DISTAL A MIOTOMAS"
          pressed={activeButtons["sin_progresion"]}
          onClick={() => handleButtonPress("sin_progresion", "SIN PROGRESION DISTAL A MIOTOMAS.", handleNextStep1)}
        />
      </div>
    </div>
  );
};

const StepG1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

  return (
    <>
      <div className="button-bar">
        <button onClick={handlePrevStep1} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button className="print-button dont-print">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-white">PRONOSTICO</h1>
      <div>
        <ConclusionButtonR
          value="p_completa"
          title="COMPLETA"
          displayText="COMPLETA"
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", " PRONOSTICO DE RECUPERACION COMPLETA.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="p_parcial"
          title="PARCIAL FUNCIONAL"
          displayText="PARCIAL FUNCIONAL"
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", " PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="p_no_funcional"
          title="POBRE NO FUNCIONAL"
          displayText="POBRE NO FUNCIONAL"
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", "  PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText="NULA (EN FASE DE SECUELA DEFINITIVA)"
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", " PRONOSTICO DE RECUPERACION NULO (EN FASE DE SECUELA DEFINITIVA).", handleNextStep1)}
        />
      </div>
    </>
  );
};


const DropArea2 = ({ isExpanded }) => {
  const [imageSrc, setImageSrc] = useState(null); // Estado para la imagen cargada

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileSelect = (files) => {
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

  const handleInputChange = (e) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div
      className={`dropArea2 ${isExpanded ? 'dropArea2-expanded' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: isExpanded ? '96px' : '40px', // Ajusta el tamaño basado en el estado de expansión
        height: isExpanded ? '90px' : '40px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'width 0.3s ease, height 0.3s ease', // Transiciones suaves
        overflow: 'hidden', // Evita que el contenido se desborde
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
        }}
      />
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
 

const StepE = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {

  const { setInitialConclusions } = useContext(ReportContextR); // Acceder a setInitialConclusions desde el contexto
  const resetCopyConclusions = () => {
    setInitialConclusions([{ title: '' }]); // Resetea las conclusiones a una cadena vacía
  };


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
        <button onClick={handlePrevStep} className={`print-button`} title="Anterior"> 
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`} title="Imprimir">
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }}/>

        <label htmlFor="file-upload" className={`print-button`} title="Guardar archivo">
          <img src="/I_Document.svg" style={{filter: 'invert(1)'}}/>
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

const StepE3 = ({ handlePrevStep3, handleUndo, handleImageChange, handlePrint }) => {

  const { setInitialConclusions } = useContext(ReportContextR); // Acceder a setInitialConclusions desde el contexto
  const resetCopyConclusions = () => {
    setInitialConclusions([{ title: '' }]); // Resetea las conclusiones a una cadena vacía
  };

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
        <button onClick={handlePrevStep} className={`print-button`} title="Anterior"> 
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`} title="Imprimir">
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }}/>

        <label htmlFor="file-upload" className={`print-button`} title="Guardar archivo">
          <img src="/I_Document.svg" style={{filter: 'invert(1)'}}/>
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



const StepB2 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight } = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContextR);
  const { activeButtons, toggleButton } = useButtonContext(); // Añadir esta línea
  const [buttonStates, setButtonStates] = useState({});
  const conclusionMapping = {
    A9: 'c5_i', A10: 'c5_i', A11: 'c5_i', A12: 'c5_i',
      A13: 'c5_d', A14: 'c5_d', A15: 'c5_d', A16: 'c5_d',
      A17: 'c6_i', A18: 'c6_i', A19: 'c6_i', A20: 'c6_i',
      A21: 'c6_d', A22: 'c6_d', A23: 'c6_d', A24: 'c6_d',
      A25: 'c7_i', A26: 'c7_i', A27: 'c7_i', A28: 'c7_i',
      A29: 'c7_d', A30: 'c7_d', A31: 'c7_d', A32: 'c7_d',
      A33: 'c8_i', A34: 'c8_i', A35: 'c8_i', A36: 'c8_i',
      A37: 'c8_d', A38: 'c8_d', A39: 'c8_d', A40: 'c8_d',
      A41: 't1_i', A42: 't1_i', A43: 't1_i', A44: 't1_i',
      A45: 't1_d', A46: 't1_d', A47: 't1_d', A48: 't1_d',
      A49: 'l2_i', A50: 'l2_i', A51: 'l2_i', A52: 'l2_i',
      A53: 'l2_d', A54: 'l2_d', A55: 'l2_d', A56: 'l2_d',
      A57: 'l3_i', A58: 'l3_i', A59: 'l3_i', A60: 'l3_i',
      A61: 'l3_d', A62: 'l3_d', A63: 'l3_d', A64: 'l3_d',
      A65: 'l4_i', A66: 'l4_i', A67: 'l4_i', A68: 'l4_i',
      A69: 'l4_d', A70: 'l4_d', A71: 'l4_d', A72: 'l4_d',
      A73: 'l5_i', A74: 'l5_i', A75: 'l5_i', A76: 'l5_i',
      A77: 'l5_d', A78: 'l5_d', A79: 'l5_d', A80: 'l5_d',
      A81: 's1_i', A82: 's1_i', A83: 's1_i', A84: 's1_i',
      A85: 's1_d', A86: 's1_d', A87: 's1_d', A88: 's1_d',
      A89: 's2_i', A90: 's2_i', A91: 's2_i', A92: 's2_i',
      A93: 's2_d', A94: 's2_d', A95: 's2_d', A96: 's2_d',
  };

  const handleCheckboxChange = (event, side) => {
    const { id, checked } = event.target;
    const setCheckedState = side === 'left' ? setcheckedStateLeft : setcheckedStateRight;
    const checkedState = side === 'left' ? checkedStateLeft : checkedStateRight;

    setCheckedState(prevState => {
      const newState = {
        ...prevState,
        [id]: checked,
      };

      // Now call handleButtonPress with the updated state
      handleButtonPress(id, checked, side, newState);
      return newState;
    });
  };

  const handleCheckboxChangeLeft = (event) => {
    handleCheckboxChange(event, 'left');
  };

  const handleCheckboxChangeRight = (event) => {
    handleCheckboxChange(event, 'right');
  };

  const conclusionTitles = {
  
  };
  
  const handleButtonPress = (checkboxId, isChecked, side, checkedState) => {
    const groupKey = conclusionMapping[checkboxId];
    if (groupKey) {
      const title = conclusionTitles[groupKey]; // Get the title
      if (isChecked) {
        setButtonStates(prevState => ({
          ...prevState,
          [groupKey]: true,
        }));
        updateConclusions({ value: groupKey, title });
      } else {
        // Check if other checkboxes in the group are still checked
        const checkboxesInGroup = Object.keys(conclusionMapping).filter(
          key => conclusionMapping[key] === groupKey
        );
        const anyChecked = checkboxesInGroup.some(id => checkedState[id]);
  
        if (!anyChecked) {
          setButtonStates(prevState => ({
            ...prevState,
            [groupKey]: false,
          }));
          updateConclusions({ value: groupKey, remove: true });
        }
      }
    }
  };

  const handleButtonPress1 = (value, title) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }
  };
  const handleConclusionButtonRClick = (value) => {
    const isPressed = buttonStates[value];
    const newPressedState = !isPressed;
  
    // Update buttonStates
    setButtonStates(prevState => ({
      ...prevState,
      [value]: newPressedState,
    }));
  
    const title = conclusionTitles[value]; // Get the title
  
    // Update conclusions
    if (newPressedState) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    // Update associated checkboxes
    const checkboxesToUpdate = Object.keys(conclusionMapping).filter(
      key => conclusionMapping[key] === value
    );

    checkboxesToUpdate.forEach(id => {
      if (checkedStateLeft[id] !== undefined) {
        setcheckedStateLeft(prevState => ({ ...prevState, [id]: newPressedState }));
      }
      if (checkedStateRight[id] !== undefined) {
        setcheckedStateRight(prevState => ({ ...prevState, [id]: newPressedState }));
      }
    });
  };

  const renderConclusionButtonR = (value, title) => (
    <ConclusionButtonR
      value={value}
      title={title}
      pressed={buttonStates[value]}
      onClick={() => handleConclusionButtonRClick(value)}
    />
  );

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
                <input type='checkbox' name="radio2" value='5' id='A5' checked={checkedStateRight.A5} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A5 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='6' id='A6' checked={checkedStateRight.A6} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A6}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='7' id='A7' checked={checkedStateRight.A7} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A7}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='8' id='A8' checked={checkedStateRight.A8} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A8}
              </td>
          </table>
        </Accordion>
        <Accordion title='C5'>
        <table>
            <td>
            <td>
            {renderConclusionButtonR('c5_i', 'L')}
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio1" value='9' id='A9' checked={checkedStateLeft.A9} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A9}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='10' id='A10' checked={checkedStateLeft.A10} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A10}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='11' id='A11' checked={checkedStateLeft.A11} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A11}
              </td>
              <td>
                <input type='checkbox' name="radio1" value='12' id='A12' checked={checkedStateLeft.A12} onChange={handleCheckboxChangeLeft} />
                {checkedStateLeft.A12 }
              </td>
            <td>
            <td>
            {renderConclusionButtonR('c5_d', 'R')}
              </td>
            </td>
            <td>
                <input type='checkbox' name="radio2" value='13' id='A13' checked={checkedStateRight.A13} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A13 }
              </td>
              <td>
                <input type='checkbox' name="radio2" value='14' id='A14' checked={checkedStateRight.A14} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A14}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='15' id='A15' checked={checkedStateRight.A15} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A15}
              </td>
              <td>
                <input type='checkbox' name="radio2" value='16' id='A16' checked={checkedStateRight.A16} onChange={handleCheckboxChangeRight} />
                {checkedStateRight.A16}
              </td>
          </table>
        </Accordion>
        <Accordion title='C6'>
        <table>
        <tr>
        {renderConclusionButtonR('c6_i', 'L')}

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

              {renderConclusionButtonR('c6_d', 'R')}

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
        {renderConclusionButtonR('c7_i', 'L')}

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
              {renderConclusionButtonR('c7_d', 'R')}

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
          {renderConclusionButtonR('c8_i', 'L')}

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
               {renderConclusionButtonR('c8_d', 'R')}

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
         {renderConclusionButtonR('t1_i', 'L')}

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
              {renderConclusionButtonR('t1_d', 'R')}

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
        <ConclusionButtonR
        value='cervical_multinivel'
        title='CERVICAL MULTINIVEL'
        displayText="CERVICAL MULTINIVEL"
        pressed={activeButtons["cervical_multinivel"]}
        onClick={() => handleButtonPress1("cervical_multinivel", "CERVICAL MULTINIVEL")}
      />             
      </Accordion>
      <Accordion title='LUMBAR'>
      <Accordion title='L2' >
      <table>
      {renderConclusionButtonR('l2_i', 'L')}

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
                    {renderConclusionButtonR('l2_d', 'R')}

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
              {renderConclusionButtonR('l3_i', 'L')}
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
                            {renderConclusionButtonR('l3_d', 'R')}
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
            {renderConclusionButtonR('l4_i', 'L')}
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
            {renderConclusionButtonR('l4_d', 'R')}

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
            {renderConclusionButtonR('l5_i', 'L')}
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
                          {renderConclusionButtonR('l5_d', 'R')}

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
                        {renderConclusionButtonR('s1_i', 'L')}

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
                                      {renderConclusionButtonR('s1_d', 'R')}
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
                                    {renderConclusionButtonR('s2_i', 'L')}
            </td>
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
                  {renderConclusionButtonR('s2_d', 'R')}

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
          </table>
        </Accordion> 
        <ConclusionButtonR
        value='lumbrosaca_multinivel'
        title='LUMBROSACA MULTINIVEL'
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel"]}
        onClick={() => handleButtonPress1("lumbrosaca_multinivel", "LUMBROSACA MULTINIVEL")}
      />
                
      </Accordion>

      <Accordion title='TORÁCICA'>
        <ConclusionButtonR value='T' title='T' />            
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
      <ConclusionButtonR
    value='cervical'
    title='CERVICAL'
    displayText='CERVICAL'
    pressed={activeButtons["cervical"]}
    onClick={() => handleButtonPress1("cervical", "CERVICAL")}
  />
  <ConclusionButtonR
    value='toracica'
    title='TORÁCICA'
    displayText='TORÁCICA'
    pressed={activeButtons["toracica"]}
    onClick={() => handleButtonPress1("toracica", "TORÁCICA")}
  />
  <ConclusionButtonR
    value='lumbrosacra'
    title='LUMBOSACRA'
    displayText='LUMBOSACRA'
    pressed={activeButtons["lumbrosacra"]}
    onClick={() => handleButtonPress1("lumbrosacra", "LUMBOSACRA")}
  />           
      </Accordion>     
    </div>
  );
};
const StepC2 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value]; // Since we just toggled it

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };


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

      <div >
      <ConclusionButtonR value='intensidad_leve' title='INTENSIDAD LEVE (+/+)'displayText='INTENSIDAD LEVE (+/+)' pressed={activeButtons["intensidad_leve"]} onClick={() => handleButtonPress("intensidad_leve", "INTENSIDAD LEVE (+/+)", handleNextStep2)}/>
      <ConclusionButtonR value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText='INTENSIDAD MODERADA (++)' pressed={activeButtons["intensidad_moderada"]} onClick={() => handleButtonPress("intensidad_moderada", "INTENSIDAD MODERADA (+/+)", handleNextStep2)}/>
      <ConclusionButtonR value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText='INTENSIDAD SEVERA (+++)' onClick={() => handleButtonPress("intensidad_severa", "INTENSIDAD SEVERA (+++)", handleNextStep2)}/>
      <ConclusionButtonR value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText='INTENSIDAD DIFUSA (++++)'onClick={() => handleButtonPress("intensidad_difusa", "INTENSIDAD DIFUSA (++++)", handleNextStep2)}/>

      </div>

      
    </div>
  );
};

const StepD2 = ({ handlePrevStep2, handleNextStep2 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value]; // Since we just toggled it

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };

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

      <div>
      <ConclusionButtonR value='r_abundante' title='REINERVACION COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'pressed={activeButtons["r_abundante"]} onClick={() => handleButtonPress("r_abundante", " CON REINERVACION COLATERAL COMPENSATORIA ABUNDANTE.", handleNextStep2)}/>
      <ConclusionButtonR value='r_minima' title='REINERVACION COLATERAL COMPENSATORIA MINIMA' displayText='MINIMA' pressed={activeButtons["r_minima"]} onClick={() => handleButtonPress("r_minima", "CON REINERVACION COLATERAL COMPENSATORIA MINIMA.", handleNextStep2)}/>
      <ConclusionButtonR value='r_ausante' title='REINERVACION COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE' pressed={activeButtons["r_ausente"]} onClick={() => handleButtonPress("r_ausente", "SIN REINERVACION COLATERAL COMPENSATORIA.", handleNextStep2)}/>
      </div>
      
    </div>
  );
};


const StepE2 = ({  handlePrevStep2, handleNextStep2}) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value];

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };
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

      <div>
     <ConclusionButtonR
          value="p_completa"
          title="COMPLETA"
          displayText="COMPLETA"
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", " PRONOSTICO DE RECUPERACION COMPLETA.", handleNextStep2)}
        />
        <ConclusionButtonR
          value="p_parcial"
          title="PARCIAL FUNCIONAL"
          displayText="PARCIAL FUNCIONAL"
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", " PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL.", handleNextStep2)}
        />
        <ConclusionButtonR
          value="p_no_funcional"
          title="POBRE NO FUNCIONAL"
          displayText="POBRE NO FUNCIONAL"
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", " PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL.", handleNextStep2)}
        />
        <ConclusionButtonR
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText="NULA (EN FASE DE SECUELA DEFINITIVA)"
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", " PRONOSTICO DE RECUPERACION NULO (EN FASE DE SECUELA DEFINITIVA).", handleNextStep2)}
        />
      </div>
      
    </div>
  );
};

const StepF1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  const handleButtonPress = (value, title, nextStepFunction) => {
    toggleButton(value);
    const isPressed = !activeButtons[value]; // Since we just toggled it

    if (isPressed) {
      updateConclusions({ value, title });
    } else {
      updateConclusions({ value, remove: true });
    }

    if (nextStepFunction) {
      nextStepFunction();
    }
  };
  return (
    <div>
      <div className='button-bar'>
      <button  id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACION
      </h1>
      <div>
      <ConclusionButtonR value='r_abundante' title='REINERVACION COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'pressed={activeButtons["r_abundante"]} onClick={() => handleButtonPress("r_abundante", "REINERVACION COLATERAL COMPENSATORIA ABUNDANTE,", handleNextStep1)}/>
      <ConclusionButtonR value='r_minima' title='REINERVACION COLATERAL COMPENSATORIA MINIMA' displayText='MINIMA' pressed={activeButtons["r_minima"]} onClick={() => handleButtonPress("r_minima", "REINERVACION COLATERAL COMPENSATORIA MINIMA,", handleNextStep1)}/>
      <ConclusionButtonR value='r_ausante' title='REINERVACION COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE' pressed={activeButtons["r_ausente"]} onClick={() => handleButtonPress("r_ausente", "REINERVACION COLATERAL COMPENSATORIA AUSENTE,", handleNextStep1)}/>
      </div>
      
    </div>
  );
};

export default SimpleMultiStepForm;
