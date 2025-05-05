
import { Accordion ,AccordionContainer,InternalAccordionContainer} from '@/app/components/ReportTemplate/Accordion';
import { CheckboxContext, ReportContextR, useButtonContext,DropContext  } from '@/src/context';
import { useSession } from "next-auth/react";
import  MenuImagenes  from '../../../components/ReportTemplate/DinamicImagesMenu';
import { useContext, useState,useEffect } from 'react';
import { ConclusionButtonR } from '../../../components/ReportTemplate/Conclusions';
import { useImageState } from '../../MetodosBotones';
import { ConclusionInputR } from '../../../components/ReportTemplate/Conclusions/ConclusionInputR';

export const groupMapping = {
  // C4
  A1: 'c4_left',
  A2: 'c4_left',
  A3: 'c4_left',
  A4: 'c4_left',
  A5: 'c4_right',
  A6: 'c4_right',
  A7: 'c4_right',
  A8: 'c4_right',
  // C5
  A9:  'c5_left',
  A10: 'c5_left',
  A11: 'c5_left',
  A12: 'c5_left',
  A13: 'c5_right',
  A14: 'c5_right',
  A15: 'c5_right',
  A16: 'c5_right',
  // C6
  A17: 'c6_left',
  A18: 'c6_left',
  A19: 'c6_left',
  A20: 'c6_left',
  A21: 'c6_right',
  A22: 'c6_right',
  A23: 'c6_right',
  A24: 'c6_right',
  // C7
  A25: 'c7_left',
  A26: 'c7_left',
  A27: 'c7_left',
  A28: 'c7_left',
  A29: 'c7_right',
  A30: 'c7_right',
  A31: 'c7_right',
  A32: 'c7_right',
  // C8
  A33: 'c8_left',
  A34: 'c8_left',
  A35: 'c8_left',
  A36: 'c8_left',
  A37: 'c8_right',
  A38: 'c8_right',
  A39: 'c8_right',
  A40: 'c8_right',
  // T1
  A41: 't1_left',
  A42: 't1_left',
  A43: 't1_left',
  A44: 't1_left',
  A45: 't1_right',
  A46: 't1_right',
  A47: 't1_right',
  A48: 't1_right',
 //L1
  A97: 'l1_left',
  A98: 'l1_left',
  A99: 'l1_left',
  A100: 'l1_left',
  A101: 'l1_right',
  A102: 'l1_right',
  A103: 'l1_right',
  A104: 'l1_right',


  // L2
  A49: 'l2_left',
  A50: 'l2_left',
  A51: 'l2_left',
  A52: 'l2_left',
  A53: 'l2_right',
  A54: 'l2_right',
  A55: 'l2_right',
  A56: 'l2_right',
  // L3
  A57: 'l3_left',
  A58: 'l3_left',
  A59: 'l3_left',
  A60: 'l3_left',
  A61: 'l3_right',
  A62: 'l3_right',
  A63: 'l3_right',
  A64: 'l3_right',
  // L4
  A65: 'l4_left',
  A66: 'l4_left',
  A67: 'l4_left',
  A68: 'l4_left',
  A69: 'l4_right',
  A70: 'l4_right',
  A71: 'l4_right',
  A72: 'l4_right',
  // L5
  A73: 'l5_left',
  A74: 'l5_left',
  A75: 'l5_left',
  A76: 'l5_left',
  A77: 'l5_right',
  A78: 'l5_right',
  A79: 'l5_right',
  A80: 'l5_right',
  // S1
  A81: 's1_left',
  A82: 's1_left',
  A83: 's1_left',
  A84: 's1_left',
  A85: 's1_right',
  A86: 's1_right',
  A87: 's1_right',
  A88: 's1_right',
  // S2
  A89: 's2_left',
  A90: 's2_left',
  A91: 's2_left',
  A92: 's2_left',
  A93: 's2_right',
  A94: 's2_right',
  A95: 's2_right',
  A96: 's2_right',
};
// Hook personalizado para manejar los pasos
const useStep = () => {
  const [step, setStep] = useState('A'); // Inicialmente en el paso 'A'
  const { resetCheckboxes } = useContext(CheckboxContext);
  const { resetAllButtons } = useButtonContext(); // <-- Importante
  const { setInitialConclusions } = useContext(ReportContextR); // Acceder a setInitialConclusions desde el contexto
  const resetCopyConclusions = () => {
    setInitialConclusions([{ title: '' }]); // Resetea las conclusiones a una cadena vacía
    
  };
  const { handlePrint } = useImageState();
  // Flujo principal (ejemplo Radiculopatía Aguda)
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
    else if (step === 'D') setStep('E');
  };
  const handlePrevStep = () => {
    if (step === 'E') {setStep('D'); resetCheckboxes(); resetAllButtons();resetCopyConclusions();}
    else if (step === 'D') {setStep('C');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'C') {setStep('B'); resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'B') {setStep('A'); resetCheckboxes();resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'A') {resetCheckboxes();resetAllButtons();resetCopyConclusions();}
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
    else if (step === 'F1') {setStep('E1');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'E1') {setStep('D1');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'D1') {setStep('C1');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'C1') {setStep('B1');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'B1') {setStep('A');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'A') {resetCheckboxes();resetAllButtons();resetCopyConclusions();}
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
    if (step === 'E2') {setStep('D2');resetCheckboxes();}
    else if (step === 'D2') {setStep('C2');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'C2') {setStep('B2');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'B2') {setStep('A');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'A') {resetCheckboxes();resetAllButtons();resetCopyConclusions();}
  };
  // Flujo para Radiculopatía Sensitiva
  const handleNextStep3 = () => {
    if (step === 'A') setStep('S1');
    else if (step === 'S1') setStep('E3');
  };
  const handlePrevStep3 = () => {
    if (step === 'E3') {setStep('S1');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'S1') {setStep('A');resetCheckboxes();resetAllButtons();resetCopyConclusions();}
    else if (step === 'A') {resetCheckboxes();resetAllButtons();resetCopyConclusions();}
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
const SimpleMultiStepForm = ({
  showStepNumber,
  conclusionDivRef,
  elementRef,
  handleImageChange,
  droppedItems,
  topLeftText,
  setTopLeftText,
  copyConclusions,
  expandedDivs,
  setExpandedDivs,
}) => {
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
      {step === 'E' && <StepE handlePrevStep={handlePrevStep} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} />}
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
      {step === 'E2' && <StepE2 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>}
      {/* Flujo sensitiva */}
      {step === 'S1' && <StepS1 handlePrevStep3={handlePrevStep3} handleNextStep3={handleNextStep3} />}
      {step === 'E3' && <StepE3 handlePrevStep3={handlePrevStep3} handleNextStep3={handleNextStep3} conclusionDivRef={conclusionDivRef} elementRef={elementRef} droppedItems={droppedItems} topLeftText={topLeftText} setTopLeftText={setTopLeftText} copyConclusions={copyConclusions} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs}/>}
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
          title="RADICULOPATÍA AGUDA"
          displayText="RADICULOPATÍA AGUDA"
          pressed={activeButtons["radiculopatia_aguda"]}
          onClick={() => handleButtonPress("radiculopatia_aguda", "RADICULOPATÍA AGUDA", handleNextStep)}
        />
      </div>
      <div>
        <ConclusionButtonR
          value="radiculopatia_subaguda"
          title="RADICULOPATÍA SUBAGUDA"
          displayText="RADICULOPATÍA SUBAGUDA"
          pressed={activeButtons["radiculopatia_subaguda"]}
          onClick={() => handleButtonPress("radiculopatia_subaguda", "RADICULOPATÍA SUBAGUDA", handleNextStep2)}
        />
      </div>
      <div>
        <ConclusionButtonR
          value="radiculopatia_cronica"
          title="RADICULOPATÍA CRÓNICA"
          displayText="RADICULOPATÍA CRÓNICA"
          pressed={activeButtons["radiculopatia_cronica"]}
          onClick={() => handleButtonPress("radiculopatia_cronica", "RADICULOPATÍA CRÓNICA", handleNextStep1)}
        />
      </div>
      <div>
        <ConclusionButtonR
          value="radiculopatia_sensitiva"
          title="RADICULOPATÍA SENSITIVA"
          displayText="RADICULOPATÍA SENSITIVA"
          pressed={activeButtons["radiculopatia_sensitiva"]}
          onClick={() => handleButtonPress("radiculopatia_sensitiva", "BLOQUEO AFERENTE", handleNextStep3)}
        />
      </div>
    </div>
  );
};

const StepB = ({ handleNextStep, handlePrevStep}) => {
  const {
    checkedStateLeft,
    checkedStateRight,
    setcheckedStateLeft,
    setcheckedStateRight,
  } = useContext(CheckboxContext);
  const { activeButtons, toggleButton } = useButtonContext();
  const { updateConclusions } = useContext(ReportContextR);

  // Manejo de checkboxes “lado izquierdo”

  function handleCheckboxChangeLeft(event) {
    const { id, checked } = event.target;
    setcheckedStateLeft((prevState) => {
      const newState = { ...prevState };
  
      // 1) Determinar el grupo (si estás usando groupMapping)
      const group = groupMapping[id];
      // 2) Desmarcar cualquier checkbox del mismo grupo
      Object.keys(groupMapping).forEach((k) => {
        if (groupMapping[k] === group) {
          newState[k] = false;
        }
      });
      // 3) Marcar sólo el que se acaba de seleccionar
      newState[id] = checked;
  
      return newState; 
      // (No hace falta updateConclusions si tu
      //  "ReportFace.jsx" arma la frase desde
      //   checkedStateLeft/Right).
    });
  }
  
  
  // Manejo de checkboxes “lado derecho”
  function handleCheckboxChangeRight(event) {
    const { id, checked } = event.target;
    setcheckedStateRight((prevState) => {
      const newState = { ...prevState };
      const group = groupMapping[id];
      if (group) {
        for (const [key, val] of Object.entries(groupMapping)) {
          if (val === group) {
            newState[key] = false; 
          }
        }
      }
      newState[id] = checked;
      return newState;
    });
  }

// Ejemplo de función para “forzar” un estado ON/OFF en la UI
// en lugar de un "toggle" ciego.
function setButtonState(value, desiredOn) {
  const currentlyOn = activeButtons[value];
  if (desiredOn && !currentlyOn) {
    toggleButton(value); // lo enciende
  } else if (!desiredOn && currentlyOn) {
    toggleButton(value); // lo apaga
  }
}

  // Manejo de botones de conclusión
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
    <div className="accordion-content">
      {/* Barra de navegación de StepB */}
      <div className="button-bar">
        <button onClick={handlePrevStep} id="prev" className="print-button dont-print">
          <img src="/I_Out.svg" alt="Anterior" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id="next" className="print-button dont-print">
          <img src="/I_In.svg" alt="Siguiente" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">NIVEL</h1>
      {/** 
       * 1) Acordeones Externos: 
       *    <AccordionContainer> maneja que solo uno se abra
       */}
      <AccordionContainer>
        
      {/* Acordeón externo: CERVICAL */}
  <Accordion title="CERVICAL"  value= "CERVICAL" type="external" onToggle={(isOpen) => {
    /* fuerza el estado visual */
    setButtonState('CERVICAL', isOpen);

    /* sincroniza conclusiones */
    if (isOpen) {
      updateConclusions({ value: 'CERVICAL', title: '' });
    } else {
      updateConclusions({ value: 'CERVICAL', remove: true });
    }
  }} >
          {/** 
           * 2) Acordeones Internos: 
           *    <InternalAccordionContainer> permite abrir varios simultáneamente
           */}
          <InternalAccordionContainer>
            {/* C4 (interno) */}
            <Accordion title="C4" type="internal">
              <table cellPadding="1">
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Left"
                        value="1"
                        id="A1"
                        checked={checkedStateLeft.A1}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A1}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Left"
                        value="2"
                        id="A2"
                        checked={checkedStateLeft.A2}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A2}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Left"
                        value="3"
                        id="A3"
                        checked={checkedStateLeft.A3}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A3}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Left"
                        value="4"
                        id="A4"
                        checked={checkedStateLeft.A4}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A4}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Right"
                        value="1"
                        id="A5"
                        checked={checkedStateRight.A5}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A5}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Right"
                        value="2"
                        id="A6"
                        checked={checkedStateRight.A6}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A6}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Right"
                        value="3"
                        id="A7"
                        checked={checkedStateRight.A7}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A7}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC4Right"
                        value="4"
                        id="A8"
                        checked={checkedStateRight.A8}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A8}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
            {/* C5 (interno) */}
            <Accordion title="C5" type="internal">
              <table cellPadding="1">
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Left"
                        value="1"
                        id="A9"
                        checked={checkedStateLeft.A9}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A9}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Left"
                        value="2"
                        id="A10"
                        checked={checkedStateLeft.A10}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A10}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Left"
                        value="3"
                        id="A11"
                        checked={checkedStateLeft.A11}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A11}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Left"
                        value="4"
                        id="A12"
                        checked={checkedStateLeft.A12}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A12}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Right"
                        value="1"
                        id="A13"
                        checked={checkedStateRight.A13}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A13}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Right"
                        value="2"
                        id="A14"
                        checked={checkedStateRight.A14}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A14}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Right"
                        value="3"
                        id="A15"
                        checked={checkedStateRight.A15}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A15}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC5Right"
                        value="4"
                        id="A16"
                        checked={checkedStateRight.A16}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A16}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
            {/* C6 (interno) */}
            <Accordion title="C6" type="internal">
              <table cellPadding="1">
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Left"
                        value="1"
                        id="A17"
                        checked={checkedStateLeft.A17}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A17}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Left"
                        value="2"
                        id="A18"
                        checked={checkedStateLeft.A18}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A18}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Left"
                        value="3"
                        id="A19"
                        checked={checkedStateLeft.A19}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A19}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Left"
                        value="4"
                        id="A20"
                        checked={checkedStateLeft.A20}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A20}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Right"
                        value="1"
                        id="A21"
                        checked={checkedStateRight.A21}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A21}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Right"
                        value="2"
                        id="A22"
                        checked={checkedStateRight.A22}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A22}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Right"
                        value="3"
                        id="A23"
                        checked={checkedStateRight.A23}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A23}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC6Right"
                        value="4"
                        id="A24"
                        checked={checkedStateRight.A24}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A24}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
            {/* C7 (interno) */}
            <Accordion title="C7" type="internal">
              <table cellPadding="1">
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Left"
                        value="1"
                        id="A25"
                        checked={checkedStateLeft.A25}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A25}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Left"
                        value="2"
                        id="A26"
                        checked={checkedStateLeft.A26}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A26}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Left"
                        value="3"
                        id="A27"
                        checked={checkedStateLeft.A27}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A27}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Left"
                        value="4"
                        id="A28"
                        checked={checkedStateLeft.A28}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A28}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Right"
                        value="1"
                        id="A29"
                        checked={checkedStateRight.A29}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A29}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Right"
                        value="2"
                        id="A30"
                        checked={checkedStateRight.A30}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A30}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Right"
                        value="3"
                        id="A31"
                        checked={checkedStateRight.A31}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A31}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC7Right"
                        value="4"
                        id="A32"
                        checked={checkedStateRight.A32}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A32}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
            {/* C8 (interno) */}
            <Accordion title="C8" type="internal">
              <table cellPadding="1">
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Left"
                        value="1"
                        id="A33"
                        checked={checkedStateLeft.A33}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A33}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Left"
                        value="2"
                        id="A34"
                        checked={checkedStateLeft.A34}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A34}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Left"
                        value="3"
                        id="A35"
                        checked={checkedStateLeft.A35}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A35}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Left"
                        value="4"
                        id="A36"
                        checked={checkedStateLeft.A36}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A36}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Right"
                        value="1"
                        id="A37"
                        checked={checkedStateRight.A37}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A37}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Right"
                        value="2"
                        id="A38"
                        checked={checkedStateRight.A38}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A38}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Right"
                        value="3"
                        id="A39"
                        checked={checkedStateRight.A39}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A39}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioC8Right"
                        value="4"
                        id="A40"
                        checked={checkedStateRight.A40}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A40}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
            {/* T1 (interno) */}
            <Accordion title="T1" type="internal">
              <table cellPadding="1">
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Left"
                        value="1"
                        id="A41"
                        checked={checkedStateLeft.A41}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A41}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Left"
                        value="2"
                        id="A42"
                        checked={checkedStateLeft.A42}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A42}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Left"
                        value="3"
                        id="A43"
                        checked={checkedStateLeft.A43}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A43}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Left"
                        value="4"
                        id="A44"
                        checked={checkedStateLeft.A44}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A44}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Right"
                        value="1"
                        id="A45"
                        checked={checkedStateRight.A45}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A45}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Right"
                        value="2"
                        id="A46"
                        checked={checkedStateRight.A46}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A46}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Right"
                        value="3"
                        id="A47"
                        checked={checkedStateRight.A47}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A47}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radioT1Right"
                        value="4"
                        id="A48"
                        checked={checkedStateRight.A48}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A48}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          {/* Botón de conclusión para "CERVICAL MULTINIVEL" */}
          <ConclusionButtonR
            value="cervical_multinivel2"
            title="MULTINIVEL"
            displayText="CERVICAL MULTINIVEL"
            pressed={activeButtons['cervical_multinivel2']}
            onClick={() =>
              handleButtonPress('cervical_multinivel2', 'MULTINIVEL')
            }
          />
        </Accordion>
        {/* Acordeón externo: LUMBAR */}
        {/* TORÁCICA  "interno" o "external"  */}
        <Accordion title="TORÁCICO" value="TORÁCICA" type="external">
        <ConclusionInputR
        valueKey="toracica_input"
        placeholder="Ingrese texto..."
        style={{ width: "290px", height: "60px",color: "white",backgroundColor: '#1c1c1c',border: '1px solid white',borderRadius: '5px',padding: '5px',margin: '5px'}}
      />
        </Accordion>
        <Accordion title="LUMBOSACRO" value="LUMBAR" type="external"  onToggle={(isOpen) => {
    /* fuerza el estado visual */
    setButtonState('LUMBOSACRO', isOpen);

    /* sincroniza conclusiones */
    if (isOpen) {
      updateConclusions({ value: 'LUMBOSACRO', title: '' });
    } else {
      updateConclusions({ value: 'LUMBOSACRO', remove: true });
    }
  }}>
        <InternalAccordionContainer>
            {/* L1 (interno) */}
            <Accordion title="L1" type="internal">
              <table>
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="1"
                        id="A97"
                        checked={checkedStateLeft.A97}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A97}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="2"
                        id="A98"
                        checked={checkedStateLeft.A98}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A98}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="3"
                        id="A99"
                        checked={checkedStateLeft.A99}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A99}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="4"
                        id="A100"
                        checked={checkedStateLeft.A100}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A100}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="1"
                        id="A101"
                        checked={checkedStateRight.A101}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A101}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="2"
                        id="A102"
                        checked={checkedStateRight.A102}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A102}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="3"
                        id="A103"
                        checked={checkedStateRight.A103}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A103}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="4"
                        id="A104"
                        checked={checkedStateRight.A104}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A104}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
            {/* L2 (interno) */}
            <Accordion title="L2" type="internal">
              <table>
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="1"
                        id="A49"
                        checked={checkedStateLeft.A49}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A49}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="2"
                        id="A50"
                        checked={checkedStateLeft.A50}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A50}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="3"
                        id="A51"
                        checked={checkedStateLeft.A51}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A51}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="4"
                        id="A52"
                        checked={checkedStateLeft.A52}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A52}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="1"
                        id="A53"
                        checked={checkedStateRight.A53}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A53}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="2"
                        id="A54"
                        checked={checkedStateRight.A54}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A54}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="3"
                        id="A55"
                        checked={checkedStateRight.A55}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A55}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="4"
                        id="A56"
                        checked={checkedStateRight.A56}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A56}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
          {/* L3 (interno) */}
          <Accordion title="L3" type="internal">
            <table>
              <tbody>
                <tr>
                  <td>&nbsp;L&nbsp;</td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="1"
                      id="A57"
                      checked={checkedStateLeft.A57}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A57}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="2"
                      id="A58"
                      checked={checkedStateLeft.A58}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A58}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="3"
                      id="A59"
                      checked={checkedStateLeft.A59}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A59}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="4"
                      id="A60"
                      checked={checkedStateLeft.A60}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A60}
                  </td>
                  <td>&nbsp;R&nbsp;</td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="1"
                      id="A61"
                      checked={checkedStateRight.A61}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A61}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="2"
                      id="A62"
                      checked={checkedStateRight.A62}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A62}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="3"
                      id="A63"
                      checked={checkedStateRight.A63}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A63}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="4"
                      id="A64"
                      checked={checkedStateRight.A64}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A64}
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>
          {/* L4 (interno) */}
          <Accordion title="L4" type="internal">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ConclusionButtonR value="l4_i" title="L" displayText="" />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="1"
                      id="A65"
                      checked={checkedStateLeft.A65}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A65}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="2"
                      id="A66"
                      checked={checkedStateLeft.A66}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A66}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="3"
                      id="A67"
                      checked={checkedStateLeft.A67}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A67}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="4"
                      id="A68"
                      checked={checkedStateLeft.A68}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A68}
                  </td>
                  <td>&nbsp;R&nbsp;</td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="1"
                      id="A69"
                      checked={checkedStateRight.A69}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A69}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="2"
                      id="A70"
                      checked={checkedStateRight.A70}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A70}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="3"
                      id="A71"
                      checked={checkedStateRight.A71}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A71}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="4"
                      id="A72"
                      checked={checkedStateRight.A72}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A72}
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>

          {/* L5 (interno) */}
          <Accordion title="L5" type="internal">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ConclusionButtonR value="l5_i" title="L" displayText="" />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="1"
                      id="A73"
                      checked={checkedStateLeft.A73}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A73}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="2"
                      id="A74"
                      checked={checkedStateLeft.A74}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A74}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="3"
                      id="A75"
                      checked={checkedStateLeft.A75}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A75}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="4"
                      id="A76"
                      checked={checkedStateLeft.A76}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A76}
                  </td>
                  <td>&nbsp;R&nbsp;</td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="1"
                      id="A77"
                      checked={checkedStateRight.A77}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A77}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="2"
                      id="A78"
                      checked={checkedStateRight.A78}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A78}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="3"
                      id="A79"
                      checked={checkedStateRight.A79}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A79}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="4"
                      id="A80"
                      checked={checkedStateRight.A80}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A80}
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>

          {/* S1 (interno) */}
          <Accordion title="S1" type="internal">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ConclusionButtonR value="s1_i" title="L" displayText="" />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="1"
                      id="A81"
                      checked={checkedStateLeft.A81}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A81}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="2"
                      id="A82"
                      checked={checkedStateLeft.A82}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A82}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="3"
                      id="A83"
                      checked={checkedStateLeft.A83}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A83}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="4"
                      id="A84"
                      checked={checkedStateLeft.A84}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A84}
                  </td>
                  <td>
                    <ConclusionButtonR value="s1_d" title="R" displayText="" />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="1"
                      id="A85"
                      checked={checkedStateRight.A85}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A85}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="2"
                      id="A86"
                      checked={checkedStateRight.A86}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A86}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="3"
                      id="A87"
                      checked={checkedStateRight.A87}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A87}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="4"
                      id="A88"
                      checked={checkedStateRight.A88}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A88}
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          </InternalAccordionContainer>
          <InternalAccordionContainer>

          {/* S2 (interno) */}
          <Accordion title="S2" type="internal">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ConclusionButtonR value="s2_i" title="L" displayText="" />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="1"
                      id="A89"
                      checked={checkedStateLeft.A89}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A89}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="2"
                      id="A90"
                      checked={checkedStateLeft.A90}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A90}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="3"
                      id="A91"
                      checked={checkedStateLeft.A91}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A91}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio1"
                      value="4"
                      id="A92"
                      checked={checkedStateLeft.A92}
                      onChange={handleCheckboxChangeLeft}
                    />
                    {checkedStateLeft.A92}
                  </td>
                  <td>
                    <ConclusionButtonR value="s2_d" title="R" displayText="" />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="1"
                      id="A93"
                      checked={checkedStateRight.A93}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A93}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="2"
                      id="A94"
                      checked={checkedStateRight.A94}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A94}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="3"
                      id="A95"
                      checked={checkedStateRight.A95}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A95}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="radio2"
                      value="4"
                      id="A96"
                      checked={checkedStateRight.A96}
                      onChange={handleCheckboxChangeRight}
                    />
                    {checkedStateRight.A96}
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          </InternalAccordionContainer>

          {/* Botón de conclusión para "LUMBROSACA MULTINIVEL" */}
          <ConclusionButtonR
            value="lumbrosaca_multinivel2"
            title="LUMBROSACA MULTINIVEL"
            displayText="LUMBROSACA MULTINIVEL"
            pressed={activeButtons['lumbrosaca_multinivel2']}
            onClick={() =>
              handleButtonPress('lumbrosaca_multinivel2', 'MULTINIVEL')
            }
          />
        </Accordion>

  <Accordion title="POLISEGMENTARIO" value="POLISEGMENTARIA" type="external">
  <ConclusionButtonR
    value="cervical_multinivel"
    title="CERVICAL"
    displayText="CERVICAL"
    pressed={activeButtons['cervical_multinivel']}
    onClick={() =>
      handleButtonPress('cervical_multinivel', 'CERVICAL')
    }
  />
  
  <ConclusionButtonR
    value="toracica_multinivel"
    title="TORÁCICO"
    displayText="TORÁCICA"
    pressed={activeButtons['toracica_multinivel']}
    onClick={() =>
      handleButtonPress('toracica_multinivel', 'TORÁCICA')
    }
  />

  <ConclusionButtonR
    value="lumbrosaca_multinivel"
    title="LUMBROSACRA"
    displayText="LUMBROSACRA"
    pressed={activeButtons['lumbrosaca_multinivel']}
    onClick={() =>
      handleButtonPress('lumbrosaca_multinivel', 'LUMBROSACRA')
    }
  />
</Accordion>

      </AccordionContainer>
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
          onClick={() => handleButtonPress("intensidad_leve", "; INTENSIDAD LEVE (+/+).", handleNextStep)}
        />
        <ConclusionButtonR
          value="intensidad_moderada"
          title="INTENSIDAD MODERADA (++)"
          displayText="INTENSIDAD MODERADA (++)"
          pressed={activeButtons["intensidad_moderada"]}
          onClick={() => handleButtonPress("intensidad_moderada", "; INTENSIDAD MODERADA (++).", handleNextStep)}
        />
        <ConclusionButtonR
          value="intensidad_severa"
          title="INTENSIDAD SEVERA (+++)"
          displayText="INTENSIDAD SEVERA (+++)"
          pressed={activeButtons["intensidad_severa"]}
          onClick={() => handleButtonPress("intensidad_severa", "; INTENSIDAD SEVERA (+++).", handleNextStep)}
        />
        <ConclusionButtonR
          value="intensidad_difusa"
          title="INTENSIDAD DIFUSA (++++)"
          displayText="INTENSIDAD DIFUSA (++++)"
          pressed={activeButtons["intensidad_difusa"]}
          onClick={() => handleButtonPress("intensidad_difusa", "; INTENSIDAD DIFUSA (++++).", handleNextStep)}
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
      <h1 className="text-xl font-bold text-white">PRONÓSTICO</h1>
      <div>
        <ConclusionButtonR
          value="p_completa"
          title="COMPLETA"
          displayText="COMPLETA"
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", " PRONÓSTICO DE RECUPERACIÓN COMPLETA.", handleNextStep)}
        />
        <ConclusionButtonR
          value="p_parcial"
          title="PARCIAL FUNCIONAL"
          displayText="PARCIAL FUNCIONAL"
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", " PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.", handleNextStep)}
        />
        <ConclusionButtonR
          value="p_no_funcional"
          title="POBRE NO FUNCIONAL"
          displayText="POBRE NO FUNCIONAL"
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", " PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.", handleNextStep)}
        />
        <ConclusionButtonR
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText="NULA (EN FASE DE SECUELA DEFINITIVA)"
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", " PRONÓSTICO DE RECUPERACIÓN NULO (EN FASE DE SECUELA DEFINITIVA).", handleNextStep)}
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

  // Grupos de checkboxes
  const groupC6C7 = ["c6s_i", "c6s_d", "c6s_bi"];
  const groupS1   = ["s1s_i", "s1s_d", "s1s_bi"];

  // Función para desmarcar otros checkboxes en el mismo grupo
  const uncheckOthers = (clickedValue, groupArray) => {
    groupArray.forEach(itemValue => {
      if (itemValue !== clickedValue && activeButtons[itemValue]) {
        // Si alguno está marcado, lo desmarcamos
        toggleButton(itemValue);
        updateConclusions({ value: itemValue, remove: true });
      }
    });
  };

  const handleCheckboxChange = (event, value, title, groupArray) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // 1) Desmarcar otros checkboxes de este grupo
      uncheckOthers(value, groupArray);

      // 2) Marcar (toggle ON) el checkbox actual
      toggleButton(value);
      updateConclusions({ value, title });
    } else {
      // Si el usuario desmarca el checkbox actual
      toggleButton(value);
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

      <AccordionContainer>
        
        {/* Grupo C6-C7 */}
        <Accordion title='C6-C7'  value='C6-C7' type='external'>
          <table>
            <tr className="checkbox-row">
              <td>
                <input
                  type="checkbox"
                  id="c6s_i"
                  checked={!!activeButtons["c6s_i"]}
                  onChange={(e) => handleCheckboxChange(e, "c6s_i", "C6-C8 IZQUIERDO.", groupC6C7)}
                />
                <label htmlFor="c6s_i"> L </label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="c6s_d"
                  checked={!!activeButtons["c6s_d"]}
                  onChange={(e) => handleCheckboxChange(e, "c6s_d", "C6-C8 DERECHO.", groupC6C7)}
                />
                <label htmlFor="c6s_d"> R </label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="c6s_bi"
                  checked={!!activeButtons["c6s_bi"]}
                  onChange={(e) => handleCheckboxChange(e, "c6s_bi", "C6-C8 BILATERAL.", groupC6C7)}
                />
                <label htmlFor="c6s_bi"> L & R </label>
              </td>
            </tr>
          </table>
        </Accordion>

        {/* Grupo S1 */}
        <Accordion title='S1' value='S1' type='external'>
          <table>
            <tr className="checkbox-row">
              <td>
                <input
                  type="checkbox"
                  id="s1s_i"
                  checked={!!activeButtons["s1s_i"]}
                  onChange={(e) => handleCheckboxChange(e, "s1s_i", "S1 IZQUIERDO.", groupS1)}
                />
                <label htmlFor="s1s_i"> L </label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="s1s_d"
                  checked={!!activeButtons["s1s_d"]}
                  onChange={(e) => handleCheckboxChange(e, "s1s_d", "S1 DERECHO.", groupS1)}
                />
                <label htmlFor="s1s_d"> R </label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="s1s_bi"
                  checked={!!activeButtons["s1s_bi"]}
                  onChange={(e) => handleCheckboxChange(e, "s1s_bi", "S1 BILATERAL.", groupS1)}
                />
                <label htmlFor="s1s_bi"> L & R </label>
              </td>
            </tr>
          </table>
        </Accordion>

      </AccordionContainer>
    </div>
  );
};



const StepC1 = ({ handleNextStep1, handlePrevStep1}) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight } = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContextR);
  const [buttonStates, setButtonStates] = useState({});
  const { activeButtons, toggleButton } = useButtonContext(); //


  
  const conclusionMapping = {
       A1: 'c4_i',  A2: 'c4_i',  A3: 'c4_i',  A4: 'c4_i',
       A5: 'c4_d',  A6: 'c4_d',  A7: 'c4_d',  A8: 'c4_d',
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

      A97: 'l1_i', A98: 'l1_i', A99: 'l1_i', A100: 'l1_i',
      A101: 'l1_d', A102: 'l1_d', A103: 'l1_d', A104: 'l1_d',

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
      A97: 'l1_i', A98: 'l1_i', A99: 'l1_i', A100: 'l1_i',
      A101: 'l1_d', A102: 'l1_d', A103: 'l1_d', A104: 'l1_d',
  };

  const handleCheckboxChange = (event, side) => {
    const { id } = event.target; // ID del checkbox clicado
    const setCheckedState = side === 'left' ? setcheckedStateLeft : setcheckedStateRight;
    const checkedState = side === 'left' ? checkedStateLeft : checkedStateRight;
  
    const groupKey = conclusionMapping[id]; // grupo al que pertenece el checkbox
  
    setCheckedState(prevState => {
      const updatedState = { ...prevState };
      const wasChecked = prevState[id]; // saber si YA estaba marcado
  
      if (wasChecked) {
        // Caso 1: ya estaba marcado => lo desmarcamos
        updatedState[id] = false;
        handleButtonPress(id, false, side, updatedState);
      } else {
        // Caso 2: estaba desmarcado => lo marcamos y desmarcamos los demás en ese grupo
        Object.keys(conclusionMapping).forEach(key => {
          if (conclusionMapping[key] === groupKey) {
            updatedState[key] = false; // Desmarcar todos los del mismo grupo
          }
        });
        // Marcar el checkbox que el usuario seleccionó
        updatedState[id] = true;
        handleButtonPress(id, true, side, updatedState);
      }
  
      return updatedState;
    });
  };
  
  // Arreglo ordenado: CERVICAL (índice 0), TORACICA (1), LUMBROSACRA (2)
const polisegSteps = [
  { value: 'cervical_multinivel',   title: 'CERVICAL',    displayText: 'CERVICAL' },
  { value: 'toracica_multinivel',   title: 'TORÁCICA',    displayText: 'TORÁCICA' },
  { value: 'lumbrosaca_multinivel', title: 'LUMBROSACRA', displayText: 'LUMBROSACRA' },
];



function setButtonState(value, desiredOn) {
  const currentlyOn = activeButtons[value];
  if (desiredOn && !currentlyOn) toggleButton(value);
  if (!desiredOn && currentlyOn)  toggleButton(value);
}

  

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
    <AccordionContainer>
      <Accordion  title='CERVICAL' value='CERVICAL' type='external'  onToggle={(isOpen) => {
    /* fuerza el estado visual */
    setButtonState('CERVICAL', isOpen);

    /* sincroniza conclusiones */
    if (isOpen) {
      updateConclusions({ value: 'CERVICAL', title: '' });
    } else {
      updateConclusions({ value: 'CERVICAL', remove: true });
    }
  }}>
      <InternalAccordionContainer>
        <Accordion title='C4' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C5' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C6' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C7' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C8' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='T1' type='internal'>
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
        </InternalAccordionContainer>
        <ConclusionButtonR
        value='cervical_multinivel2'
        title='CERVICAL MULTINIVEL'
        displayText="CERVICAL MULTINIVEL"
        pressed={activeButtons["cervical_multinivel2"]}
        onClick={() => handleButtonPress1("cervical_multinivel2", "MULTINIVEL")}
      />                        
      </Accordion>

      <Accordion title='TORÁCICO' value='TORÁCICA' type='external'>
      <ConclusionInputR
        valueKey="toracica_input"
        placeholder="Ingrese texto..."
        style={{ width: "290px", height: "60px",color: "white",backgroundColor: '#1c1c1c',border: '1px solid white',borderRadius: '5px',padding: '5px',margin: '5px'}}
      />          
      </Accordion>

      <Accordion title='LUMBOSACRO' value='LUMBAR' type='external'onToggle={(isOpen) => {
    /* fuerza el estado visual */
    setButtonState('LUMBOSACRO', isOpen);

    /* sincroniza conclusiones */
    if (isOpen) {
      updateConclusions({ value: 'LUMBOSACRO', title: '' });
    } else {
      updateConclusions({ value: 'LUMBOSACRO', remove: true });
    }
  }}>
        <InternalAccordionContainer>
            {/* L1 (interno) */}
            <Accordion title="L1" type="internal">
              <table>
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="1"
                        id="A97"
                        checked={checkedStateLeft.A97}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A97}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="2"
                        id="A98"
                        checked={checkedStateLeft.A98}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A98}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="3"
                        id="A99"
                        checked={checkedStateLeft.A99}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A99}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="4"
                        id="A100"
                        checked={checkedStateLeft.A100}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A100}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="1"
                        id="A101"
                        checked={checkedStateRight.A101}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A101}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="2"
                        id="A102"
                        checked={checkedStateRight.A102}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A102}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="3"
                        id="A103"
                        checked={checkedStateRight.A103}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A103}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="4"
                        id="A104"
                        checked={checkedStateRight.A104}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A104}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
      <InternalAccordionContainer>
      <Accordion title='L2' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='L3' type='internal' > 
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='L4' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='L5' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='S1' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='S2' type='internal' >
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
        
        </InternalAccordionContainer>
        <ConclusionButtonR
        value='lumbrosaca_multinivel2'
        title='LUMBROSACA MULTINIVEL'
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel2"]}
        onClick={() => handleButtonPress1("lumbrosaca_multinivel2", "MULTINIVEL")}
      />
      </Accordion>


      <Accordion title="POLISEGMENTARIO" value="POLISEGMENTARIA" type="external">
  <ConclusionButtonR
    value="cervical_multinivel"
    title="CERVICAL"
    displayText="CERVICAL"
    pressed={activeButtons['cervical_multinivel']}
    onClick={() =>
      handleButtonPress1('cervical_multinivel', 'CERVICAL')
    }
  />
  
  <ConclusionButtonR
    value="toracica_multinivel"
    title="TORÁCICO"
    displayText="TORÁCICA"
    pressed={activeButtons['toracica_multinivel']}
    onClick={() =>
      handleButtonPress1('toracica_multinivel', 'TORÁCICA')
    }
  />

  <ConclusionButtonR
    value="lumbrosaca_multinivel"
    title="LUMBROSACRA"
    displayText="LUMBROSACRA"
    pressed={activeButtons['lumbrosaca_multinivel']}
    onClick={() =>
      handleButtonPress1('lumbrosaca_multinivel', 'LUMBROSACRA')
    }
  />
</Accordion>
      </AccordionContainer>    
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
          onClick={() => handleButtonPress("intensidad_leve", "; INTENSIDAD LEVE (+/+)", handleNextStep1)}
        />
        <ConclusionButtonR
          value="intensidad_moderada"
          title="INTENSIDAD MODERADA (++)"
          displayText="INTENSIDAD MODERADA (++)"
          pressed={activeButtons["intensidad_moderada"]}
          onClick={() => handleButtonPress("intensidad_moderada", "; INTENSIDAD MODERADA (++)", handleNextStep1)}
        />
        <ConclusionButtonR
          value="intensidad_severa"
          title="INTENSIDAD SEVERA (+++)"
          displayText="INTENSIDAD SEVERA (+++)"
          pressed={activeButtons["intensidad_severa"]}
          onClick={() => handleButtonPress("intensidad_severa", "; INTENSIDAD SEVERA (+++)", handleNextStep1)}
        />
        <ConclusionButtonR
          value="intensidad_difusa"
          title="INTENSIDAD DIFUSA (++++)"
          displayText="INTENSIDAD DIFUSA (++++)"
          pressed={activeButtons["intensidad_difusa"]}
          onClick={() => handleButtonPress("intensidad_difusa", "; INTENSIDAD DIFUSA (++++)", handleNextStep1)}
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

      <h1 className="text-xl font-bold text-white">PROGRESIÓN</h1>

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
          title="SIN PROGRESIÓN DISTAL A MIOTOMAS"
          displayText="SIN PROGRESIÓN DISTAL A MIOTOMAS"
          pressed={activeButtons["sin_progresion"]}
          onClick={() => handleButtonPress("sin_progresion", "SIN PROGRESIÓN DISTAL A MIOTOMAS.", handleNextStep1)}
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

      <h1 className="text-xl font-bold text-white">PRONÓSTICO</h1>
      <div>
        <ConclusionButtonR
          value="p_completa"
          title="COMPLETA"
          displayText="COMPLETA"
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", " PRONÓSTICO DE RECUPERACIÓN COMPLETA.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="p_parcial"
          title="PARCIAL FUNCIONAL"
          displayText="PARCIAL FUNCIONAL"
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", " PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="p_no_funcional"
          title="POBRE NO FUNCIONAL"
          displayText="POBRE NO FUNCIONAL"
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", "  PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.", handleNextStep1)}
        />
        <ConclusionButtonR
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText="NULA (EN FASE DE SECUELA DEFINITIVA)"
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", " PRONÓSTICO DE RECUPERACIÓN NULO (EN FASE DE SECUELA DEFINITIVA).", handleNextStep1)}
        />
      </div>
    </>
  );
};



const StepE = ({ handlePrevStep, topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs  }) => {
  const { setInitialConclusions } = useContext(ReportContextR); // Acceder a setInitialConclusions desde el contexto
  const { checkedStateLeft, checkedStateRight } = useContext(CheckboxContext);

  const resetCopyConclusions = () => {
    setInitialConclusions([{ title: '' }]); // Resetea las conclusiones a una cadena vacía
  };
  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContextR)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
    setIsLoading(true); // ⌛ Mostrar overlay
       // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    const conclusiones = conclusions;

      const response = await fetch('/api/pdf/generate-pdf/radiculopatia?route', {
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
          checkedLeft: checkedStateLeft,
          checkedRight: checkedStateRight,

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
        <button onClick={handlePrevStep} className={`print-button`} title="Anterior"> 
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>



        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
      </div>

      <MenuImagenes   expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
  
    </div> 
  );
};

const StepE3 = ({ handlePrevStep3,topLeftText,setTopLeftText, copyConclusions,expandedDivs,setExpandedDivs }) => {
  const { setInitialConclusions } = useContext(ReportContextR); // Acceder a setInitialConclusions desde el contexto
  const resetCopyConclusions = () => {
    setInitialConclusions([{ title: '' }]); // Resetea las conclusiones a una cadena vacía
  };
    const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
    const { conclusions } = useContext(ReportContextR)
    const { droppedItems } = useContext(DropContext);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleExportPdf = async () => {
      try {
      setIsLoading(true); // ⌛ Mostrar overlay
         // 1) conclusiones (array con {value, title})
      const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
      const conclusiones = conclusions;
  
        const response = await fetch('/api/pdf/generate-pdf/radiculopatia?route', {
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
        <button onClick={handlePrevStep3} className={`print-button`} title="Anterior"> 
        <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>



        <button onClick={handleExportPdf} className={`print-button dont-print`}>
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
      </div>

      <MenuImagenes   expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}  topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}   />
    </div> 
  );
}

const StepB2 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { checkedStateLeft, checkedStateRight, setcheckedStateLeft, setcheckedStateRight } = useContext(CheckboxContext);
  const { updateConclusions } = useContext(ReportContextR);
  const { activeButtons, toggleButton } = useButtonContext(); // Añadir esta línea
  const [buttonStates, setButtonStates] = useState({});
  const conclusionMapping = {
       A1: 'c1_i',  A2: 'c1_i',  A3: 'c1_i',  A4: 'c1_i',
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
      A97: 'l1_i', A98: 'l1_i', A99: 'l1_i', A100: 'l1_i',
      A101: 'l1_d', A102: 'l1_d', A103: 'l1_d', A104: 'l1_d',
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
    const { id } = event.target; // ID del checkbox clicado
    const setCheckedState = side === 'left' ? setcheckedStateLeft : setcheckedStateRight;
    const checkedState = side === 'left' ? checkedStateLeft : checkedStateRight;
  
    const groupKey = conclusionMapping[id]; // grupo al que pertenece el checkbox
  
    setCheckedState(prevState => {
      const updatedState = { ...prevState };
      const wasChecked = prevState[id]; // saber si YA estaba marcado
  
      if (wasChecked) {
        // Caso 1: ya estaba marcado => lo desmarcamos
        updatedState[id] = false;
        handleButtonPress(id, false, side, updatedState);
      } else {
        // Caso 2: estaba desmarcado => lo marcamos y desmarcamos los demás en ese grupo
        Object.keys(conclusionMapping).forEach(key => {
          if (conclusionMapping[key] === groupKey) {
            updatedState[key] = false; // Desmarcar todos los del mismo grupo
          }
        });
        // Marcar el checkbox que el usuario seleccionó
        updatedState[id] = true;
        handleButtonPress(id, true, side, updatedState);
      }
  
      return updatedState;
    });
  };
 

// Ejemplo de función para “forzar” un estado ON/OFF en la UI
// en lugar de un "toggle" ciego.
function setButtonState(value, desiredOn) {
  const currentlyOn = activeButtons[value];
  if (desiredOn && !currentlyOn) {
    toggleButton(value); // lo enciende
  } else if (!desiredOn && currentlyOn) {
    toggleButton(value); // lo apaga
  }
}

// function handlePolisegmentariaClick(clickedValue) {
//   const index = polisegSteps.findIndex(item => item.value === clickedValue);
//   if (index === -1) return;

//   const isCurrentlyActive = activeButtons[clickedValue];

//   if (!isCurrentlyActive) {
//     // --- CASO 1: Activar un botón que estaba apagado ---

//     // (A) Enciende en la UI los niveles del inicio (0) hasta el clicado (index-1),
//     //     sin meterlos a conclusiones
//     for (let i = 0; i < index; i++) {
//       const { value } = polisegSteps[i];
//       // Fuerza ON en la UI
//       setButtonState(value, true);
//       // Asegúrate de sacarlos de conclusiones (no se mostrarán en el reporte)
//       updateConclusions({ value, remove: true });
//     }

//     // (B) Enciende el botón clicado en la UI y SÍ lo mete a conclusiones
//     const { value, title } = polisegSteps[index];
//     setButtonState(value, true);
//     updateConclusions({ value, title }); // ESTE es el que se guarda en reporte

//     // (C) Apaga (UI) y quita de conclusiones todos los posteriores
//     for (let i = index + 1; i < polisegSteps.length; i++) {
//       const { value } = polisegSteps[i];
//       setButtonState(value, false);
//       updateConclusions({ value, remove: true });
//     }

//   } else {
//     // --- CASO 2: El botón ya estaba activo => apaga todo ---
//     for (let i = 0; i < polisegSteps.length; i++) {
//       const { value } = polisegSteps[i];
//       setButtonState(value, false);
//       updateConclusions({ value, remove: true });
//     }
//   }
// }


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
      <AccordionContainer>
      <Accordion title='CERVICAL' value="CERVICAL" type= 'external' onToggle={(isOpen) => {
    /* fuerza el estado visual */
    setButtonState('CERVICAL', isOpen);

    /* sincroniza conclusiones */
    if (isOpen) {
      updateConclusions({ value: 'CERVICAL', title: '' });
    } else {
      updateConclusions({ value: 'CERVICAL', remove: true });
    }
  }}>
        <InternalAccordionContainer>
        <Accordion title='C4' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C5' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C6' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='C7' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>

        <Accordion title='C8' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>

        <Accordion title='T1' type='internal'>
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
        </InternalAccordionContainer>

        <ConclusionButtonR
        value='cervical_multinivel2'
        title='CERVICAL MULTINIVEL'
        displayText="CERVICAL MULTINIVEL"
        pressed={activeButtons["cervical_multinivel2"]}
        onClick={() => handleButtonPress1("cervical_multinivel2", "MULTINIVEL")}
      />             
      </Accordion>
      <Accordion title='TORÁCICO' value='TORÁCICA' type='external'>
      <ConclusionInputR
        valueKey="toracica_input"
        value='toracica_input'
        placeholder="Ingrese texto..."
        style={{ width: "290px", height: "60px",color: "white",backgroundColor: '#1c1c1c',border: '1px solid white',borderRadius: '5px',padding: '5px',margin: '5px'}}
      />           
      </Accordion>
      <Accordion title='LUMBOSACRO' value='LUMBAR' type='external'onToggle={(isOpen) => {
    /* fuerza el estado visual */
    setButtonState('LUMBOSACRO', isOpen);

    /* sincroniza conclusiones */
    if (isOpen) {
      updateConclusions({ value: 'LUMBOSACRO', title: '' });
    } else {
      updateConclusions({ value: 'LUMBOSACRO', remove: true });
    }
  }}>
      <InternalAccordionContainer>
            {/* L1 (interno) */}
            <Accordion title="L1" type="internal">
              <table>
                <tbody>
                  <tr>
                    <td>&nbsp;L&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="1"
                        id="A97"
                        checked={checkedStateLeft.A97}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A97}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="2"
                        id="A98"
                        checked={checkedStateLeft.A98}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A98}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="3"
                        id="A99"
                        checked={checkedStateLeft.A99}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A99}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio1"
                        value="4"
                        id="A100"
                        checked={checkedStateLeft.A100}
                        onChange={handleCheckboxChangeLeft}
                      />
                      {checkedStateLeft.A100}
                    </td>
                    <td>&nbsp;R&nbsp;</td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="1"
                        id="A101"
                        checked={checkedStateRight.A101}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A101}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="2"
                        id="A102"
                        checked={checkedStateRight.A102}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A102}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="3"
                        id="A103"
                        checked={checkedStateRight.A103}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A103}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="radio2"
                        value="4"
                        id="A104"
                        checked={checkedStateRight.A104}
                        onChange={handleCheckboxChangeRight}
                      />
                      {checkedStateRight.A104}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </InternalAccordionContainer>
      <InternalAccordionContainer>

      <Accordion title='L2' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='L3' type='internal' > 
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='L4' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='L5' type='internal'>
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='S1' type='internal' >
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
        </InternalAccordionContainer>
        <InternalAccordionContainer>
        <Accordion title='S2' type='internal'>
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
        </InternalAccordionContainer>

        <ConclusionButtonR
        value='lumbrosaca_multinivel2'
        title='LUMBROSACA MULTINIVEL'
        displayText="LUMBROSACA MULTINIVEL"
        pressed={activeButtons["lumbrosaca_multinivel2"]}
        onClick={() => handleButtonPress1("lumbrosaca_multinivel2", "MULTINIVEL")}
      />
                
      </Accordion>

     

      <Accordion title="POLISEGMENTARIO" value="POLISEGMENTARIA" type="external">
  <ConclusionButtonR
    value="cervical_multinivel"
    title="CERVICAL"
    displayText="CERVICAL"
    pressed={activeButtons['cervical_multinivel']}
    onClick={() =>
      handleButtonPress1('cervical_multinivel', 'CERVICAL')
    }
  />
  
  <ConclusionButtonR
    value="toracica_multinivel"
    title="TORÁCICO"
    displayText="TORÁCICA"
    pressed={activeButtons['toracica_multinivel']}
    onClick={() =>
      handleButtonPress1('toracica_multinivel', 'TORACICA')
    }
  />

  <ConclusionButtonR
    value="lumbrosaca_multinivel"
    title="LUMBROSACRA"
    displayText="LUMBROSACRA"
    pressed={activeButtons['lumbrosaca_multinivel']}
    onClick={() =>
      handleButtonPress1('lumbrosaca_multinivel', 'LUMBROSACRA')
    }
  />
</Accordion>
      </AccordionContainer> 
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
      <ConclusionButtonR value='intensidad_leve' title='INTENSIDAD LEVE (+/+)'displayText='INTENSIDAD LEVE (+/+)' pressed={activeButtons["intensidad_leve"]} onClick={() => handleButtonPress("intensidad_leve", "; INTENSIDAD LEVE (+/+)", handleNextStep2)}/>
      <ConclusionButtonR value='intensidad_moderada' title='INTENSIDAD MODERADA (++)' displayText='INTENSIDAD MODERADA (++)' pressed={activeButtons["intensidad_moderada"]} onClick={() => handleButtonPress("intensidad_moderada", "; INTENSIDAD MODERADA (+/+)", handleNextStep2)}/>
      <ConclusionButtonR value='intensidad_severa' title='INTENSIDAD SEVERA (+++)' displayText='INTENSIDAD SEVERA (+++)' onClick={() => handleButtonPress("intensidad_severa", "; INTENSIDAD SEVERA (+++)", handleNextStep2)}/>
      <ConclusionButtonR value='intensidad_difusa' title='INTENSIDAD DIFUSA (++++)' displayText='INTENSIDAD DIFUSA (++++)'onClick={() => handleButtonPress("intensidad_difusa", "; INTENSIDAD DIFUSA (++++)", handleNextStep2)}/>

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
        REINERVACIÓN
      </h1>

      <div>
      <ConclusionButtonR value='r_abundante' title='REINERVACIÓN COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'pressed={activeButtons["r_abundante"]} onClick={() => handleButtonPress("r_abundante", "CON REINERVACION COLATERAL ABUNDANTE.", handleNextStep2)}/>
      <ConclusionButtonR value='r_minima' title='REINERVACIÓN COLATERAL COMPENSATORIA MÍNIMA' displayText='MÍNIMA' pressed={activeButtons["r_minima"]} onClick={() => handleButtonPress("r_minima", "CON REINERVACION COLATERAL MINIMA.", handleNextStep2)}/>
      <ConclusionButtonR value='r_ausante' title='REINERVACIÓN COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE' pressed={activeButtons["r_ausente"]} onClick={() => handleButtonPress("r_ausente", "SIN REINERVACION COLATERAL.", handleNextStep2)}/>
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
        PRONÓSTICO
      </h1>

      <div>
     <ConclusionButtonR
          value="p_completa"
          title="COMPLETA"
          displayText="COMPLETA"
          pressed={activeButtons["p_completa"]}
          onClick={() => handleButtonPress("p_completa", " PRÓNOSTICO DE RECUPERACIÓN COMPLETA.", handleNextStep2)}
        />
        <ConclusionButtonR
          value="p_parcial"
          title="PARCIAL FUNCIONAL"
          displayText="PARCIAL FUNCIONAL"
          pressed={activeButtons["p_parcial"]}
          onClick={() => handleButtonPress("p_parcial", " PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.", handleNextStep2)}
        />
        <ConclusionButtonR
          value="p_no_funcional"
          title="POBRE NO FUNCIONAL"
          displayText="POBRE NO FUNCIONAL"
          pressed={activeButtons["p_no_funcional"]}
          onClick={() => handleButtonPress("p_no_funcional", " PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.", handleNextStep2)}
        />
        <ConclusionButtonR
          value="nula"
          title="NULA (EN FASE DE SECUELA DEFINITIVA)"
          displayText="NULA (EN FASE DE SECUELA DEFINITIVA)"
          pressed={activeButtons["nula"]}
          onClick={() => handleButtonPress("nula", " PRONÓSTICO DE RECUPERACIÓN NULO (EN FASE DE SECUELA DEFINITIVA).", handleNextStep2)}
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
        REINERVACIÓN
      </h1>
      <div>
      <ConclusionButtonR value='r_abundante' title='REINERVACIÓN COLATERAL COMPENSATORIA ABUNDANTE' displayText='ABUNDATE'pressed={activeButtons["r_abundante"]} onClick={() => handleButtonPress("r_abundante", "REINERVACION COLATERAL ABUNDANTE,", handleNextStep1)}/>
      <ConclusionButtonR value='r_minima' title='REINERVACIÓN COLATERAL COMPENSATORIA MÍNIMA' displayText='MÍNIMA' pressed={activeButtons["r_minima"]} onClick={() => handleButtonPress("r_minima", "REINERVACION COLATERAL MINIMA,", handleNextStep1)}/>
      <ConclusionButtonR value='r_ausante' title='REINERVACIÓN COLATERAL COMPENSATORIA AUSENTE' displayText='AUSENTE' pressed={activeButtons["r_ausente"]} onClick={() => handleButtonPress("r_ausente", "REINERVACION COLATERAL AUSENTE,", handleNextStep1)}/>
      </div>
      
    </div>
  );
};

export default SimpleMultiStepForm;
