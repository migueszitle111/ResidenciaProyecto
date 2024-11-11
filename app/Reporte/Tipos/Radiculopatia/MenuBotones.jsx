import { Accordion } from '@/app/components/ReportTemplate/Accordion';
import { useContext, useState,useEffect} from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import { ReportContext,CheckboxContext,useButtonContext } from '@/src/context';

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
  const handleNextStep3 = () => {
    if (step === 'A') setStep('S1');
    if (step === 'S1') setStep('C2');
  };
  const handlePrevStep3 = () => {

    if (step === 'S1') setStep('A');
  };
  return {
    step,
    handleNextStep,
    handlePrevStep,
    handleNextStep1,
    handleNextStep2,
    handlePrevStep1,
    handlePrevStep2,
    handleNextStep3,
    handlePrevStep3,
    handlePrint
  };
};
const SimpleMultiStepForm = () => {
  const { step, handleNextStep, handlePrevStep,handleNextStep1,handleNextStep2,handlePrevStep1,handlePrevStep2,handleNextStep3,handlePrevStep3,handlePrint } = useStep();
  return (
      <div>
        {/* Renderiza el componente adecuado basado en el estado del paso */}
        {step === 'A' ? (<StepA handleNextStep={handleNextStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} handleNextStep3={handleNextStep3} />) : null}
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
        {step === 'S1' ? (<StepS1 handlePrevStep3={handlePrevStep3} handleNextStep3={handleNextStep3} />) : null}
      </div>
  );
};
const StepA = ({ handleNextStep, handleNextStep1, handleNextStep2, handleNextStep3 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="radiculopatia_aguda"
          title="RADICULOPATIA AGUDA"
          displayText="RADICULOPATIA AGUDA"
          pressed={activeButtons["radiculopatia_aguda"]}
          onClick={() => handleButtonPress("radiculopatia_aguda", "RADICULOPATIA AGUDA", handleNextStep)}
        />
      </div>
      <div>
        <ConclusionButton
          value="radiculopatia_subaguda"
          title="RADICULOPATIA SUBAGUDA"
          displayText="RADICULOPATIA SUBAGUDA"
          pressed={activeButtons["radiculopatia_subaguda"]}
          onClick={() => handleButtonPress("radiculopatia_subaguda", "RADICULOPATIA SUBAGUDA", handleNextStep2)}
        />
      </div>
      <div>
        <ConclusionButton
          value="radiculopatia_cronica"
          title="RADICULOPATIA CRONICA"
          displayText="RADICULOPATIA CRONICA"
          pressed={activeButtons["radiculopatia_cronica"]}
          onClick={() => handleButtonPress("radiculopatia_cronica", "RADICULOPATIA CRONICA", handleNextStep1)}
        />
      </div>
      <div>
        <ConclusionButton
          value="radiculopatia_sensitiva"
          title="RADICULOPATIA SENSITIVA"
          displayText="RADICULOPATIA SENSITIVA"
          pressed={activeButtons["radiculopatia_sensitiva"]}
          onClick={() => handleButtonPress("radiculopatia_sensitiva", "RADICULOPATIA SENSITIVA", handleNextStep3)}
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
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton 
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
        <ConclusionButton 
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
        <ConclusionButton 
        value='cervical' 
        title='CERVICAL'
        displayText="CERVICAL"
        pressed={activeButtons["cervical"]}
        onClick={() => handleButtonPress("cervical", "CERVICAL")} 
        />   
        <ConclusionButton 
        value='torasica' 
        title='TORACICA' 
        displayText="TORACICA"
        pressed={activeButtons["torasica"]}
        onClick={() => handleButtonPress("torasica", "TORACICA")} 
        /> 
        <ConclusionButton 
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
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="intensidad_leve"
          title="INTENSIDAD LEVE (+/+)"
          displayText="INTENSIDAD LEVE (+/+)"
          pressed={activeButtons["intensidad_leve"]}
          onClick={() => handleButtonPress("intensidad_leve", "INTENSIDAD LEVE (+/+)", handleNextStep)}
        />
        <ConclusionButton
          value="intensidad_moderada"
          title="INTENSIDAD MODERADA (++)"
          displayText="INTENSIDAD MODERADA (++)"
          pressed={activeButtons["intensidad_moderada"]}
          onClick={() => handleButtonPress("intensidad_moderada", "INTENSIDAD MODERADA (++)", handleNextStep)}
        />
        <ConclusionButton
          value="intensidad_severa"
          title="INTENSIDAD SEVERA (+++)"
          displayText="INTENSIDAD SEVERA (+++)"
          pressed={activeButtons["intensidad_severa"]}
          onClick={() => handleButtonPress("intensidad_severa", "INTENSIDAD SEVERA (+++)", handleNextStep)}
        />
        <ConclusionButton
          value="intensidad_difusa"
          title="INTENSIDAD DIFUSA (++++)"
          displayText="INTENSIDAD DIFUSA (++++)"
          pressed={activeButtons["intensidad_difusa"]}
          onClick={() => handleButtonPress("intensidad_difusa", "INTENSIDAD DIFUSA (++++)", handleNextStep)}
        />
      </div>
    </div>
  );
};

const StepD = ({ handlePrevStep, handleNextStep }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="p_completa"
          title="Y PRONOSTICO DE RECUPERACION COMPLETA"
          displayText=""
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", "Y PRONOSTICO DE RECUPERACION COMPLETA", handleNextStep)}
        />
        <ConclusionButton
          value="p_parcial"
          title="Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL"
          displayText=""
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", "Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL", handleNextStep)}
        />
        <ConclusionButton
          value="p_no_funcional"
          title="Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL"
          displayText=""
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", "Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL", handleNextStep)}
        />
        <ConclusionButton
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText=""
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", "NULA (EN FASE DE SECUELA DEFINITIVA)", handleNextStep)}
        />
      </div>
    </div>
  );
};

const StepB1 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="activa"
          title="ACTIVA"
          displayText=""
          pressed={activeButtons["activa"]}
          onClick={() => handleButtonPress("activa", "ACTIVA", handleNextStep1)}
        />
        <ConclusionButton
          value="inactiva"
          title="INACTIVA"
          displayText=""
          pressed={activeButtons["inactiva"]}
          onClick={() => handleButtonPress("inactiva", "INACTIVA", handleNextStep1)}
        />
        <ConclusionButton
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
  const { updateConclusions } = useContext(ReportContext);

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
        <button onClick={handlePrevStep3} id='prev' className='print-button dont-print'>
          <img src="/I_Out.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep3} id='next' className='print-button dont-print'>
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className='text-xl font-bold text-white'>NIVEL</h1>  

      <Accordion title='C6'>
        <table>
          <tr>
            <ConclusionButton
               value="c6s_i"
               title="C6 IZQUIERDA"
               displayText=""
               pressed={activeButtons["c6s_i"]}
               onClick={() => handleButtonPress("c6s_i", "C6 IZQUIERDA", handleNextStep3)}
            />
            <ConclusionButton
               value="c6s_d"
               title="C6 DERECHA"
               displayText=""
               pressed={activeButtons["c6s_d"]}
               onClick={() => handleButtonPress("c6s_d", "C6 DERECHA", handleNextStep3)}
            />
             <ConclusionButton
                value="c6s_bi"
                title="C6 BILATERAL"
                displayText=""
                pressed={activeButtons["c6s_bi"]}
                onClick={() => handleButtonPress("c6s_bi", "C6 BILATERAL", handleNextStep3)}
            />
          </tr>
        </table>
      </Accordion>

      <Accordion title='C7'>
        <table>
          <tr>
            <ConclusionButton
              value="c7s_i"
              title="C7 IZQUIERDA"
              displayText=""
              pressed={activeButtons["c7s_i"]}
              onClick={() => handleButtonPress("c7s_i", "C7 IZQUIERDA", handleNextStep3)}
            />
            <ConclusionButton
               value="c7s_d"
               title="C7 DERECHA"
               displayText=""
               pressed={activeButtons["c7s_d"]}
               onClick={() => handleButtonPress("c7s_i", "C7 DERECHA", handleNextStep3)}
            />
              <ConclusionButton
              value="c7s_bi"
              title="C7 BILATERAL"
              displayText=""
              pressed={activeButtons["c7s_bi"]}
              onClick={() => handleButtonPress("c7s_bi", "C7 BILATERAL", handleNextStep3)}
            />
          </tr>
        </table>
      </Accordion>

      <Accordion title='S1'>
        <table>
          <tr>
            <ConclusionButton
               value="s1s_i"
               title="S1 IZQUIERDA"
               displayText=""
               pressed={activeButtons["s1s_i"]}
               onClick={() => handleButtonPress("s1s_i", "S1 IZQUIERDA", handleNextStep3)}
            />
            <ConclusionButton
             value="s1s_d"
             title="S1 DERECHA"
             displayText=""
             pressed={activeButtons["s1s_d"]}
             onClick={() => handleButtonPress("s1s_d", "S1 DERECHA", handleNextStep3)}
            />
              <ConclusionButton
               value="s1s_bi"
               title="S1 BILATERAL"
               displayText=""
               pressed={activeButtons["s1s_bi"]}
               onClick={() => handleButtonPress("s1s_bi", "S1 BILATERAL", handleNextStep3)}
            />
          </tr>
        </table>
      </Accordion>
      <div>
      </div>
    </div>
  );
};

const StepC1 = ({ handleNextStep1, handlePrevStep1}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight } = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContext);
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
   
  const handleConclusionButtonClick = (value) => {
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

  const renderConclusionButton = (value, title) => (
    <ConclusionButton
      value={value}
      title={title}
      pressed={buttonStates[value]}
      onClick={() => handleConclusionButtonClick(value)}
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
        <Accordion title='C4a' >
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
            {renderConclusionButton('c5_i', 'L')}
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
            {renderConclusionButton('c5_d', 'R')}
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
        {renderConclusionButton('c6_i', 'L')}

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

              {renderConclusionButton('c6_d', 'R')}

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
        {renderConclusionButton('c7_i', 'L')}

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
              {renderConclusionButton('c7_d', 'R')}

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
          {renderConclusionButton('c8_i', 'L')}

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
               {renderConclusionButton('c8_d', 'R')}

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
         {renderConclusionButton('t1_i', 'L')}

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
              {renderConclusionButton('t1_d', 'R')}

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
        <ConclusionButton
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
      {renderConclusionButton('l2_i', 'L')}

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
                    {renderConclusionButton('l2_d', 'R')}

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
              {renderConclusionButton('l3_i', 'L')}
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
                            {renderConclusionButton('l3_d', 'R')}
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
            {renderConclusionButton('l4_i', 'L')}
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
            {renderConclusionButton('l4_d', 'R')}

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
            {renderConclusionButton('l5_i', 'L')}
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
                          {renderConclusionButton('l5_d', 'R')}

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
                        {renderConclusionButton('s1_i', 'L')}

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
                                      {renderConclusionButton('s1_d', 'R')}
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
                                    {renderConclusionButton('s2_i', 'L')}
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
                  {renderConclusionButton('s2_d', 'R')}

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
        <ConclusionButton
        value='lumbrosaca_multinivel'
        title='LUMBROSACA MULTINIVEL'
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel"]}
        onClick={() => handleButtonPress1("lumbrosaca_multinivel", "LUMBROSACA MULTINIVEL")}
      />
      </Accordion>

      <Accordion title='TORÁCICA'>
        <ConclusionButton value='T' title='T' />            
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
      <ConclusionButton
    value='cervical'
    title='CERVICAL'
    displayText='CERVICAL'
    pressed={activeButtons["cervical"]}
    onClick={() => handleButtonPress1("cervical", "CERVICAL")}
  />
  <ConclusionButton
    value='toracica'
    title='TORÁCICA'
    displayText='TORÁCICA'
    pressed={activeButtons["toracica"]}
    onClick={() => handleButtonPress1("toracica", "TORÁCICA")}
  />
  <ConclusionButton
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
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="intensidad_leve"
          title="INTENSIDAD LEVE (+/+)"
          displayText="INTENSIDAD LEVE (+/+)"
          pressed={activeButtons["intensidad_leve"]}
          onClick={() => handleButtonPress("intensidad_leve", "INTENSIDAD LEVE (+/+)", handleNextStep1)}
        />
        <ConclusionButton
          value="intensidad_moderada"
          title="INTENSIDAD MODERADA (++)"
          displayText="INTENSIDAD MODERADA (++)"
          pressed={activeButtons["intensidad_moderada"]}
          onClick={() => handleButtonPress("intensidad_moderada", "INTENSIDAD MODERADA (++)", handleNextStep1)}
        />
        <ConclusionButton
          value="intensidad_severa"
          title="INTENSIDAD SEVERA (+++)"
          displayText="INTENSIDAD SEVERA (+++)"
          pressed={activeButtons["intensidad_severa"]}
          onClick={() => handleButtonPress("intensidad_severa", "INTENSIDAD SEVERA (+++)", handleNextStep1)}
        />
        <ConclusionButton
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
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="con_progresion"
          title="CON PROGRESIÓN DISTAL A MIOTOMAS"
          displayText="CON PROGRESIÓN DISTAL A MIOTOMAS"
          pressed={activeButtons["con_progresion"]}
          onClick={() => handleButtonPress("con_progresion", "CON PROGRESIÓN DISTAL A MIOTOMAS", handleNextStep1)}
        />
        <ConclusionButton
          value="sin_progresion"
          title="SIN PROGRESION DISTAL A MIOTOMAS"
          displayText="SIN PROGRESION DISTAL A MIOTOMAS"
          pressed={activeButtons["sin_progresion"]}
          onClick={() => handleButtonPress("sin_progresion", "SIN PROGRESION DISTAL A MIOTOMAS", handleNextStep1)}
        />
      </div>
    </div>
  );
};

const StepG1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
        <ConclusionButton
          value="p_completa"
          title="Y PRONOSTICO DE RECUPERACION COMPLETA"
          displayText=""
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", "Y PRONOSTICO DE RECUPERACION COMPLETA", handleNextStep1)}
        />
        <ConclusionButton
          value="p_parcial"
          title="Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL"
          displayText=""
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", "Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL", handleNextStep1)}
        />
        <ConclusionButton
          value="p_no_funcional"
          title="Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL"
          displayText=""
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", "Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL", handleNextStep1)}
        />
        <ConclusionButton
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText=""
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", "NULA (EN FASE DE SECUELA DEFINITIVA)", handleNextStep1)}
        />
      </div>
    </>
  );
};


const StepE = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint }) => {

  const { setInitialConclusions } = useContext(ReportContext); // Acceder a setInitialConclusions desde el contexto
  const resetCopyConclusions = () => {
    setInitialConclusions([{ title: '' }]); // Resetea las conclusiones a una cadena vacía
  };

  return (
    <div className='button-bar'>
      <button 
        onClick={() => { 
          handlePrevStep(); // Llamar a la función para el paso anterior
          resetCopyConclusions(); // Resetea las conclusiones
        }} 
        id='prev' 
        className={`print-button dont-print `}
      >

        <img src="/I_Out.svg" alt="Regresar" style={{filter: 'invert(1)'}} />
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

      <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className={`dont-print`} style={{display: 'none'}} />
    </div>
  );
};

const StepB2 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight } = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContext);
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
  const handleConclusionButtonClick = (value) => {
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

  const renderConclusionButton = (value, title) => (
    <ConclusionButton
      value={value}
      title={title}
      pressed={buttonStates[value]}
      onClick={() => handleConclusionButtonClick(value)}
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
            {renderConclusionButton('c5_i', 'L')}
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
            {renderConclusionButton('c5_d', 'R')}
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
        {renderConclusionButton('c6_i', 'L')}

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

              {renderConclusionButton('c6_d', 'R')}

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
        {renderConclusionButton('c7_i', 'L')}

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
              {renderConclusionButton('c7_d', 'R')}

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
          {renderConclusionButton('c8_i', 'L')}

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
               {renderConclusionButton('c8_d', 'R')}

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
         {renderConclusionButton('t1_i', 'L')}

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
              {renderConclusionButton('t1_d', 'R')}

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
        <ConclusionButton
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
      {renderConclusionButton('l2_i', 'L')}

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
                    {renderConclusionButton('l2_d', 'R')}

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
              {renderConclusionButton('l3_i', 'L')}
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
                            {renderConclusionButton('l3_d', 'R')}
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
            {renderConclusionButton('l4_i', 'L')}
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
            {renderConclusionButton('l4_d', 'R')}

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
            {renderConclusionButton('l5_i', 'L')}
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
                          {renderConclusionButton('l5_d', 'R')}

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
                        {renderConclusionButton('s1_i', 'L')}

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
                                      {renderConclusionButton('s1_d', 'R')}
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
                                    {renderConclusionButton('s2_i', 'L')}
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
                  {renderConclusionButton('s2_d', 'R')}

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
        <ConclusionButton
        value='lumbrosaca_multinivel'
        title='LUMBROSACA MULTINIVEL'
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel"]}
        onClick={() => handleButtonPress1("lumbrosaca_multinivel", "LUMBROSACA MULTINIVEL")}
      />
                
      </Accordion>

      <Accordion title='TORÁCICA'>
        <ConclusionButton value='T' title='T' />            
      </Accordion>

      <Accordion title='POLISEGMENTARIA'>
      <ConclusionButton
    value='cervical'
    title='CERVICAL'
    displayText='CERVICAL'
    pressed={activeButtons["cervical"]}
    onClick={() => handleButtonPress1("cervical", "CERVICAL")}
  />
  <ConclusionButton
    value='toracica'
    title='TORÁCICA'
    displayText='TORÁCICA'
    pressed={activeButtons["toracica"]}
    onClick={() => handleButtonPress1("toracica", "TORÁCICA")}
  />
  <ConclusionButton
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
  const { updateConclusions } = useContext(ReportContext);

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
      <ConclusionButton value='intensidad_leve' title='INTENSIDAD LEVE (+/+)'displayText='INTENSIDAD LEVE (+/+)' pressed={activeButtons["intensidad_leve"]} onClick={() => handleButtonPress("intensidad_leve", "INTENSIDAD LEVE (+/+)", handleNextStep2)}/>
      <ConclusionButton value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText='INTENSIDAD MODERADA (++)' pressed={activeButtons["intensidad_moderada"]} onClick={() => handleButtonPress("intensidad_moderada", "INTENSIDAD MODERADA (+/+)", handleNextStep2)}/>
      <ConclusionButton value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText='INTENSIDAD SEVERA (+++)' onClick={() => handleButtonPress("intensidad_severa", "INTENSIDAD SEVERA (+++)", handleNextStep2)}/>
      <ConclusionButton value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText='INTENSIDAD DIFUSA (++++)'onClick={() => handleButtonPress("intensidad_difusa", "INTENSIDAD DIFUSA (++++)", handleNextStep2)}/>

      </div>

      
    </div>
  );
};

const StepD2 = ({ handlePrevStep2, handleNextStep2 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
      <ConclusionButton value='r_abundante' title='REINERVACION COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'pressed={activeButtons["r_abundante"]} onClick={() => handleButtonPress("r_abundante", "REINERVACION COLATERAL COMPENSATORIA ABUNDANTE", handleNextStep2)}/>
      <ConclusionButton value='r_minima' title='REINERVACION COLATERAL COMPENSATORIA MINIMA' displayText='MINIMA' pressed={activeButtons["r_minima"]} onClick={() => handleButtonPress("r_minima", "REINERVACION COLATERAL COMPENSATORIA MINIMA", handleNextStep2)}/>
      <ConclusionButton value='r_ausante' title='REINERVACION COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE' pressed={activeButtons["r_ausente"]} onClick={() => handleButtonPress("r_ausente", "REINERVACION COLATERAL COMPENSATORIA AUSENTE", handleNextStep2)}/>
      </div>
      
    </div>
  );
};


const StepE2 = ({  handlePrevStep2, handleNextStep2}) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
     <ConclusionButton
          value="p_completa"
          title="Y PRONOSTICO DE RECUPERACION COMPLETA"
          displayText=""
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", "Y PRONOSTICO DE RECUPERACION COMPLETA", handleNextStep2)}
        />
        <ConclusionButton
          value="p_parcial"
          title="Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL"
          displayText=""
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", "Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL", handleNextStep2)}
        />
        <ConclusionButton
          value="p_no_funcional"
          title="Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL"
          displayText=""
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", "Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL", handleNextStep2)}
        />
        <ConclusionButton
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText=""
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", "NULA (EN FASE DE SECUELA DEFINITIVA)", handleNextStep2)}
        />
      </div>
      
    </div>
  );
};

const StepF1 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContext);

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
      <div>
      <ConclusionButton value='r_abundante' title='REINERVACION COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'pressed={activeButtons["r_abundante"]} onClick={() => handleButtonPress("r_abundante", "REINERVACION COLATERAL COMPENSATORIA ABUNDANTE", handleNextStep1)}/>
      <ConclusionButton value='r_minima' title='REINERVACION COLATERAL COMPENSATORIA MINIMA' displayText='MINIMA' pressed={activeButtons["r_minima"]} onClick={() => handleButtonPress("r_minima", "REINERVACION COLATERAL COMPENSATORIA MINIMA", handleNextStep1)}/>
      <ConclusionButton value='r_ausante' title='REINERVACION COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE' pressed={activeButtons["r_ausente"]} onClick={() => handleButtonPress("r_ausente", "REINERVACION COLATERAL COMPENSATORIA AUSENTE", handleNextStep1)}/>
      </div>
      
    </div>
  );
};

export default SimpleMultiStepForm;
