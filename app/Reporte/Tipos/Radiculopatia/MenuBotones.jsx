import React, { useState } from 'react';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { Accordion } from '@/app/components/ReportTemplate/Accordion';
import { useImageState } from '../../MetodosBotones';

// Metodos de movimiento entre menus
const SimpleMultiStepForm = () => {

  const [step, setStep] = useState('A');

  // Visibilidad de imagenes
  const [checkedState, setCheckedState] = useState ({})
  const [checkedState1, setCheckedState1] = useState ({})

  // Funcion para mostrar imagenes
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedState(prevState => ({
      ...!prevState,
      [id]: checked
    }));
  };

  const handleCheckboxChange1 = (event) => {
    const { id, checked } = event.target;
    setCheckedState1(prevState => ({
      ...!prevState,
      [id]: checked
    }));
  };

  const {
    selectedImages,
    history,
    handleImageChange,
    handleUndo,
    handlePrint
  } = useImageState();

  // Siguiente paso
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
    else if (step === 'D') setStep('E');
  };

  // Paso anterior
  const handlePrevStep = () => {
    if (step === 'E') setStep('D');
    else if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // Metodos de movimiento entre menus custom
  const handleNextStep1 = () => {
    if (step === 'A') setStep('B1');
    else if (step === 'B1') setStep ('C1')
    else if (step === 'C1') setStep ('D1')
    else if (step === 'D1') setStep ('E1')
    else if (step === 'E1') setStep ('F1')
    else if (step === 'F1') setStep ('G1')
  };

  const handlePrevStep1 = () => {
    if (step === 'G1') setStep('F1');
    else if (step === 'F1') setStep('E1');
    else if (step === 'E1') setStep('C1');
    else if (step === 'D1') setStep('C1');
    else if (step === 'C1') setStep('B1');
    else if (step === 'B1') setStep ('A')
  };

  const handleNextStep2 = () => {
    if (step === 'A') setStep('B2');
    else if (step === 'B2') setStep('C2');
    else if (step === 'C2') setStep('D2');
    else if (step === 'D2') setStep('E2');
  };

  const handlePrevStep2 = () => {
    if (step === 'F1') setStep('D1');
  };

  return (
    <div>
      {/* // Render Steps */}
      {step === 'A' ? (
        <StepA
          handleNextStep={handleNextStep}
          handleNextStep1={handleNextStep1}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'B' ? (
        <StepB
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep} 
          handleCheckboxChange={handleCheckboxChange}
          handleCheckboxChange1={handleCheckboxChange1}
          checkedState={checkedState}
          checkedState1={checkedState1}
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

      {step === 'C1' ? (
        <StepC1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
          handleCheckboxChange={handleCheckboxChange}
          handleCheckboxChange1={handleCheckboxChange1}
          checkedState={checkedState}
          checkedState1={checkedState1}
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
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'D1' ? (
        <StepD1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'E1' ? (
        <StepE1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'F1' ? (
        <StepF1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'G1' ? (
        <StepG1
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'B2' ? (
        <StepB2
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
          handleCheckboxChange={handleCheckboxChange}
          handleCheckboxChange1={handleCheckboxChange1}
          checkedState={checkedState}
          checkedState1={checkedState1}
        />
      ) : null}

      {step === 'C2' ? (
        <StepC2
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'E2' ? (
        <StepE2
          handlePrevStep2={handlePrevStep2}
        />
      ) : null}

            {step === 'D2' ? (
        <StepD2
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
        />
      ) : null}
    </div>
  );
};

//////////////////////////////////

const StepA = ({ handleNextStep, handleNextStep1, handleNextStep2}) => {
  return (
    <div>
      <div className='button-bar'>
      <button className={`print-button dont-print `}>
          <img src="" style={{filter: 'invert(0.5)'}} />
          </button>
          <button className={`print-button dont-print `}>
          <img src="" style={{filter: 'invert(0.5)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        EVOLUCIÓN
      </h1>

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

        <div className='my-2 flex justify-end items-center'>
      </div>
    </div>
  );
};

const StepB = ({ handleNextStep, handlePrevStep, checkedState, checkedState1, handleCheckboxChange, handleCheckboxChange1}) => {
  return (
    <div>
      <div className='button-bar'>
      <button onClick={handlePrevStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_Out.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
          <button onClick={handleNextStep} id='prev' className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
          </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        NIVEL
      </h1>

      <Accordion title='CERVICAL'>
        <Accordion title='C4'>
          <table cellpadding='3'>
              <td>
              &nbsp;&nbsp;L&nbsp;&nbsp;
              </td>
                <td>
                  <input type='radio' name="radio1" value='1' id='A1' checked={checkedState.A1} onChange={handleCheckboxChange}></input>
                  {checkedState.A1 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz1" /> )}
                </td>
                <td>           
                  <input type='radio' name="radio1" value='2' id='A2' checked={checkedState.A2} onChange={handleCheckboxChange}></input>
                  {checkedState.A2 && ( <img src='/assets/Simbolos/S_Cruz 2.png' className="cruz2"/> )}
                </td> 
                <td>
                  <input type='radio' name="radio1" value='3'  id='A3' checked={checkedState.A3} onChange={handleCheckboxChange}></input>
                  {checkedState.A3 && ( <img src='/assets/Simbolos/S_Cruz 3.png' className="cruz3"/> )}
                </td>
                <td>
                  <input type='radio' name="radio1" value='4' id='A4' checked={checkedState.A4} onChange={handleCheckboxChange}></input>
                  {checkedState.A4 && ( <img src='/assets/Simbolos/S_Cruz 4.png' className="cruz4"/> )}
                </td>
              <td>
              &nbsp;&nbsp;R&nbsp;&nbsp;
              </td>
              <td>
                <input type='radio' name="radio2" value='1' id='A5' checked={checkedState.A5} onChange={handleCheckboxChange1}></input>
                {checkedState1.A5 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz5"/> )}
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A6' checked={checkedState.A6} onChange={handleCheckboxChange1}></input>
                {checkedState1.A6 && ( <img src='/assets/Simbolos/S_Cruz 2.png' className="cruz6"/> )}
              </td> 
              <td>
                <input type='radio' name="radio3" value='3' id='A7' checked={checkedState.A7} onChange={handleCheckboxChange1}></input>
                {checkedState1.A7 && ( <img src='/assets/Simbolos/S_Cruz 3.png' className="cruz7"/> )}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A8' checked={checkedState.A8} onChange={handleCheckboxChange1}></input>
                {checkedState1.A8 && ( <img src='/assets/Simbolos/S_Cruz 4.png' className="cruz8"/> )}
              </td>
          </table>
        </Accordion>
        </Accordion>
      

      <Accordion title='LUMBAR'>
      <Accordion title='L2'>
      <table>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A49' checked={checkedState.A49} onChange={handleCheckboxChange}></input>
                {checkedState.A49 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz49"/> )}
              </td>
              <td>
                <input type='checkbox' id='A50' checked={checkedState.A50} onChange={handleCheckboxChange}></input>
                {checkedState.A50 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz50"/> )}
              </td>
              <td>
                <input type='checkbox' id='A51' checked={checkedState.A51} onChange={handleCheckboxChange}></input>
                {checkedState.A51 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz51"/> )}
              </td>
              <td>
                <input type='checkbox' id='A52' checked={checkedState.A52} onChange={handleCheckboxChange}></input>
                {checkedState.A52 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz52"/> )}
              </td>
            <td>
            &nbsp;&nbsp;R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A53' checked={checkedState.A53} onChange={handleCheckboxChange}></input>
                {checkedState.A53 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz53"/> )}
              </td>
              <td>
                <input type='checkbox' id='A54' checked={checkedState.A54} onChange={handleCheckboxChange}></input>
                {checkedState.A54 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz54"/> )}
              </td>
              <td>
                <input type='checkbox' id='A55' checked={checkedState.A55} onChange={handleCheckboxChange}></input>
                {checkedState.A55 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz55"/> )}
              </td>
              <td>
                <input type='checkbox' id='A56' checked={checkedState.A56} onChange={handleCheckboxChange}></input>
                {checkedState.A56 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz56"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L3'>
        <table>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A57' checked={checkedState.A57} onChange={handleCheckboxChange}></input>
                {checkedState.A57 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz57"/> )}
              </td>
              <td>
                <input type='checkbox' id='A58' checked={checkedState.A58} onChange={handleCheckboxChange}></input>
                {checkedState.A58 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz58"/> )}
              </td>
              <td>
                <input type='checkbox' id='A59' checked={checkedState.A59} onChange={handleCheckboxChange}></input>
                {checkedState.A59 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz59"/> )}
              </td>
              <td>
                <input type='checkbox' id='A60' checked={checkedState.A60} onChange={handleCheckboxChange}></input>
                {checkedState.A60 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz60"/> )}
              </td>
            <td>
            &nbsp;&nbsp;R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A61' checked={checkedState.A61} onChange={handleCheckboxChange}></input>
                {checkedState.A61 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz61"/> )}
              </td>
              <td>
                <input type='checkbox' id='A62' checked={checkedState.A62} onChange={handleCheckboxChange}></input>
                {checkedState.A62 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz62"/> )}
              </td>
              <td>
                <input type='checkbox' id='A63' checked={checkedState.A63} onChange={handleCheckboxChange}></input>
                {checkedState.A63 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz63"/> )}
              </td>
              <td>
                <input type='checkbox' id='A64' checked={checkedState.A64} onChange={handleCheckboxChange}></input>
                {checkedState.A64 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz64"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L4'>
        <table>
            <td>
            <ConclusionButton value='l4_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' id='A65' checked={checkedState.A65} onChange={handleCheckboxChange}></input>
                {checkedState.A65 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz65"/> )}
              </td>
              <td>
                <input type='checkbox' id='A66' checked={checkedState.A66} onChange={handleCheckboxChange}></input>
                {checkedState.A66 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz66"/> )}
              </td>
              <td>
                <input type='checkbox' id='A67' checked={checkedState.A67} onChange={handleCheckboxChange}></input>
                {checkedState.A67 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz67"/> )}
              </td>
              <td>
                <input type='checkbox' id='A68' checked={checkedState.A68} onChange={handleCheckboxChange}></input>
                {checkedState.A68 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz68"/> )}
              </td>
            <td>
            <ConclusionButton value='l4_d' title='R' displayText=''/>
            </td>
            <td>
                <input type='checkbox' id='A69' checked={checkedState.A69} onChange={handleCheckboxChange}></input>
                {checkedState.A69 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz69"/> )}
              </td>
              <td>
                <input type='checkbox' id='A70' checked={checkedState.A70} onChange={handleCheckboxChange}></input>
                {checkedState.A70 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz70"/> )}
              </td>
              <td>
                <input type='checkbox' id='A71' checked={checkedState.A71} onChange={handleCheckboxChange}></input>
                {checkedState.A71 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz71"/> )}
              </td>
              <td>
                <input type='checkbox' id='A72' checked={checkedState.A72} onChange={handleCheckboxChange}></input>
                {checkedState.A72 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz72"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L5'>
        <table>
            <td>
            <ConclusionButton value='l5_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' id='A73' checked={checkedState.A73} onChange={handleCheckboxChange}></input>
                {checkedState.A73 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz73"/> )}
              </td>
              <td>
                <input type='checkbox' id='A74' checked={checkedState.A74} onChange={handleCheckboxChange}></input>
                {checkedState.A74 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz74"/> )}
              </td>
              <td>
                <input type='checkbox' id='A75' checked={checkedState.A75} onChange={handleCheckboxChange}></input>
                {checkedState.A75 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz75"/> )}
              </td>
              <td>
                <input type='checkbox' id='A76' checked={checkedState.A76} onChange={handleCheckboxChange}></input>
                {checkedState.A76 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz76"/> )}
              </td>
            <td>
            <ConclusionButton value='l5_d' title='R' displayText=''/>
            </td>
            <td>
                <input type='checkbox' id='A77' checked={checkedState.A77} onChange={handleCheckboxChange}></input>
                {checkedState.A77 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz77"/> )}
              </td>
              <td>
                <input type='checkbox' id='A78' checked={checkedState.A78} onChange={handleCheckboxChange}></input>
                {checkedState.A78 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz78"/> )}
              </td>
              <td>
                <input type='checkbox' id='A79' checked={checkedState.A79} onChange={handleCheckboxChange}></input>
                {checkedState.A79 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz79"/> )}
              </td>
              <td>
                <input type='checkbox' id='A80' checked={checkedState.A80} onChange={handleCheckboxChange}></input>
                {checkedState.A80 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz80"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S1'>
        <table>
            <td>
            <ConclusionButton value='s1_i' title='L' displayText=''/>
            </td>
            <td>
                <input type='checkbox' id='A81' checked={checkedState.A81} onChange={handleCheckboxChange}></input>
                {checkedState.A81 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz81"/> )}
              </td>
              <td>
                <input type='checkbox' id='A82' checked={checkedState.A82} onChange={handleCheckboxChange}></input>
                {checkedState.A82 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz82"/> )}
              </td>
              <td>
                <input type='checkbox' id='A83' checked={checkedState.A83} onChange={handleCheckboxChange}></input>
                {checkedState.A83 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz83"/> )}
              </td>
              <td>
                <input type='checkbox' id='A84' checked={checkedState.A84} onChange={handleCheckboxChange}></input>
                {checkedState.A84 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz84"/> )}
              </td>
            <td>
            <ConclusionButton value='s1_d' title='R' displayText=''/>
            </td>
            <td>
                <input type='checkbox' id='A85' checked={checkedState.A85} onChange={handleCheckboxChange}></input>
                {checkedState.A85 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz85"/> )}
              </td>
              <td>
                <input type='checkbox' id='A86' checked={checkedState.A86} onChange={handleCheckboxChange}></input>
                {checkedState.A86 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz86"/> )}
              </td>
              <td>
                <input type='checkbox' id='A87' checked={checkedState.A87} onChange={handleCheckboxChange}></input>
                {checkedState.A87 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz87"/> )}
              </td>
              <td>
                <input type='checkbox' id='A88' checked={checkedState.A88} onChange={handleCheckboxChange}></input>
                {checkedState.A88 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz88"/> )}
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

const StepC1 = ({ handleNextStep1, handlePrevStep1, checkedState, checkedState1, handleCheckboxChange, handleCheckboxChange1}) => {
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
        NIVEL
      </h1>

      <Accordion title='CERVICAL'>
        <Accordion title='C4'>
          <table cellpadding='3'>
              <td>
                <ConclusionButton value='c4_i' title='L' displayText=''/>
              </td>
              <td>
                  <input type='radio' name="radio1" value='1' id='A1' checked={checkedState.A1} onChange={handleCheckboxChange}></input>
                  {checkedState.A1 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz1"/> )}
                </td>
                <td>
                  <input type='radio' name="radio1" value='2' id='A2' checked={checkedState.A2} onChange={handleCheckboxChange}></input>
                  {checkedState.A2 && ( <img src='/assets/Simbolos/S_Cruz 2.png' className="cruz2"/> )}
                </td> 
                <td>
                  <input type='radio' name="radio1" value='3'  id='A3' checked={checkedState.A3} onChange={handleCheckboxChange}></input>
                  {checkedState.A3 && ( <img src='/assets/Simbolos/S_Cruz 3.png' className="cruz3"/> )}
                </td>
                <td>
                  <input type='radio' name="radio1" value='4' id='A4' checked={checkedState.A4} onChange={handleCheckboxChange}></input>
                  {checkedState.A4 && ( <img src='/assets/Simbolos/S_Cruz 4.png' className="cruz4"/> )}
                </td>
              <td>
                <ConclusionButton value='c4_d' title='R' displayText=''/>
              </td>
              <td>
                <input type='radio' name="radio2" value='1' id='A5' checked={checkedState.A5} onChange={handleCheckboxChange1}></input>
                {checkedState1.A5 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz5"/> )}
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A6' checked={checkedState.A6} onChange={handleCheckboxChange1}></input>
                {checkedState1.A6 && ( <img src='/assets/Simbolos/S_Cruz 2.png' className="cruz6"/> )}
              </td> 
              <td>
                <input type='radio' name="radio3" value='3' id='A7' checked={checkedState.A7} onChange={handleCheckboxChange1}></input>
                {checkedState1.A7 && ( <img src='/assets/Simbolos/S_Cruz 3.png' className="cruz7"/> )}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A8' checked={checkedState.A8} onChange={handleCheckboxChange1}></input>
                {checkedState1.A8 && ( <img src='/assets/Simbolos/S_Cruz 4.png' className="cruz8"/> )}
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
                  <input type='radio' name="radio3" value='9' id='A9' checked={checkedState.A9} onChange={handleCheckboxChange}></input>
                  {checkedState.A9 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz1"/> )}
            </td>
              <td>
                <input type='checkbox' id='A10' checked={checkedState.A10} onChange={handleCheckboxChange}></input>
                {checkedState.A10 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz10"/> )}
              </td> 
              <td>
                <input type='checkbox' id='A11' checked={checkedState.A11} onChange={handleCheckboxChange}></input>
                {checkedState.A11 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz11"/> )}
              </td>
              <td>
                <input type='checkbox' id='A12' checked={checkedState.A12} onChange={handleCheckboxChange}></input>
                {checkedState.A12 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz12"/> )}
              </td>
            <td>
            <td>
                <ConclusionButton value='c5_d' title='R' displayText=''/>
              </td>
            </td>
            <td>
                <input type='checkbox' id='A13' checked={checkedState.A13} onChange={handleCheckboxChange}></input>
                {checkedState.A13 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz13"/> )}
              </td>
              <td>
                <input type='checkbox' id='A14' checked={checkedState.A14} onChange={handleCheckboxChange}></input>
                {checkedState.A14 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz14"/> )}
              </td> 
              <td>
                <input type='checkbox' id='A15' checked={checkedState.A15} onChange={handleCheckboxChange}></input>
                {checkedState.A15 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz15"/> )}
              </td>
              <td>
                <input type='checkbox' id='A16' checked={checkedState.A16} onChange={handleCheckboxChange}></input>
                {checkedState.A16 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz16"/> )}
              </td>
          </table>
        </Accordion>
        <Accordion title='C6'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A17' checked={checkedState.A17} onChange={handleCheckboxChange}></input>
                {checkedState.A17 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz17"/> )}
              </td>
              <td>
                <input type='checkbox' id='A18' checked={checkedState.A18} onChange={handleCheckboxChange}></input>
                {checkedState.A18 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz18"/> )}
              </td> 
              <td>
                <input type='checkbox' id='A19' checked={checkedState.A19} onChange={handleCheckboxChange}></input>
                {checkedState.A19 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz19"/> )}
              </td>
              <td>
                <input type='checkbox' id='A20' checked={checkedState.A20} onChange={handleCheckboxChange}></input>
                {checkedState.A20 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz20"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A21' checked={checkedState.A21} onChange={handleCheckboxChange}></input>
                {checkedState.A21 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz21"/> )}
              </td>
              <td>
                <input type='checkbox' id='A22' checked={checkedState.A22} onChange={handleCheckboxChange}></input>
                {checkedState.A22 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz22"/> )}
              </td> 
              <td>
                <input type='checkbox' id='A23' checked={checkedState.A23} onChange={handleCheckboxChange}></input>
                {checkedState.A23 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz23"/> )}
              </td>
              <td>
                <input type='checkbox' id='A24' checked={checkedState.A24} onChange={handleCheckboxChange}></input>
                {checkedState.A24 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz24"/> )}
              </td>
          </table>
        </Accordion>
        <Accordion title='C7'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A25' checked={checkedState.A25} onChange={handleCheckboxChange}></input>
                {checkedState.A25 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz25"/> )}
              </td>
              <td>
                <input type='checkbox' id='A26' checked={checkedState.A26} onChange={handleCheckboxChange}></input>
                {checkedState.A26 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz26"/> )}
              </td> 
              <td>
                <input type='checkbox' id='A27' checked={checkedState.A27} onChange={handleCheckboxChange}></input>
                {checkedState.A27 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz27"/> )}
              </td>
              <td>
                <input type='checkbox' id='A28' checked={checkedState.A28} onChange={handleCheckboxChange}></input>
                {checkedState.A28 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz28"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A29' checked={checkedState.A29} onChange={handleCheckboxChange}></input>
                {checkedState.A29 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz29"/> )}
              </td>
              <td>
                <input type='checkbox' id='A30' checked={checkedState.A30} onChange={handleCheckboxChange}></input>
                {checkedState.A30 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz30"/> )}
              </td> 
              <td>
                <input type='checkbox' id='A31' checked={checkedState.A31} onChange={handleCheckboxChange}></input>
                {checkedState.A31 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz31"/> )}
              </td>
              <td>
                <input type='checkbox' id='A32' checked={checkedState.A32} onChange={handleCheckboxChange}></input>
                {checkedState.A32 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz32"/> )}
              </td>
          </table>
        </Accordion>
        <Accordion title='C8'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A33' checked={checkedState.A33} onChange={handleCheckboxChange}></input>
                {checkedState.A33 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz33"/> )}
              </td>
              <td>
                <input type='checkbox' id='A34' checked={checkedState.A34} onChange={handleCheckboxChange}></input>
                {checkedState.A34 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz34"/> )}
              </td>
              <td>
                <input type='checkbox' id='A35' checked={checkedState.A35} onChange={handleCheckboxChange}></input>
                {checkedState.A35 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz35"/> )}
              </td>
              <td>
                <input type='checkbox' id='A36' checked={checkedState.A36} onChange={handleCheckboxChange}></input>
                {checkedState.A36 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz36"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A37' checked={checkedState.A37} onChange={handleCheckboxChange}></input>
                {checkedState.A37 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz37"/> )}
              </td>
              <td>
                <input type='checkbox' id='A38' checked={checkedState.A38} onChange={handleCheckboxChange}></input>
                {checkedState.A38 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz38"/> )}
              </td>
              <td>
                <input type='checkbox' id='A39' checked={checkedState.A39} onChange={handleCheckboxChange}></input>
                {checkedState.A39 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz39"/> )}
              </td>
              <td>
                <input type='checkbox' id='A40' checked={checkedState.A40} onChange={handleCheckboxChange}></input>
                {checkedState.A40 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz40"/> )}
              </td>
          </table>
        </Accordion>
        <Accordion title='T1'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A41' checked={checkedState.A41} onChange={handleCheckboxChange}></input>
                {checkedState.A41 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz41"/> )}
              </td>
              <td>
                <input type='checkbox' id='A42' checked={checkedState.A42} onChange={handleCheckboxChange}></input>
                {checkedState.A42 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz42"/> )}
              </td>
              <td>
                <input type='checkbox' id='A43' checked={checkedState.A43} onChange={handleCheckboxChange}></input>
                {checkedState.A43 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz43"/> )}
              </td>
              <td>
                <input type='checkbox' id='A44' checked={checkedState.A44} onChange={handleCheckboxChange}></input>
                {checkedState.A44 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz44"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A45' checked={checkedState.A45} onChange={handleCheckboxChange}></input>
                {checkedState.A45 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz45"/> )}
              </td>
              <td>
                <input type='checkbox' id='A46' checked={checkedState.A46} onChange={handleCheckboxChange}></input>
                {checkedState.A46 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz46"/> )}
              </td>
              <td>
                <input type='checkbox' id='A47' checked={checkedState.A47} onChange={handleCheckboxChange}></input>
                {checkedState.A47 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz47"/> )}
              </td>
              <td>
                <input type='checkbox' id='A48' checked={checkedState.A48} onChange={handleCheckboxChange}></input>
                {checkedState.A48 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz48"/> )}
              </td>
          </table>
        </Accordion>
        <ConclusionButton value='cervical_multinivel' title='CERVICAL MULTINIVEL' />              
      </Accordion>

      <Accordion title='LUMBAR'>
      <Accordion title='L2'>
      <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A49' checked={checkedState.A49} onChange={handleCheckboxChange}></input>
                {checkedState.A49 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz49"/> )}
              </td>
              <td>
                <input type='checkbox' id='A50' checked={checkedState.A50} onChange={handleCheckboxChange}></input>
                {checkedState.A50 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz50"/> )}
              </td>
              <td>
                <input type='checkbox' id='A51' checked={checkedState.A51} onChange={handleCheckboxChange}></input>
                {checkedState.A51 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz51"/> )}
              </td>
              <td>
                <input type='checkbox' id='A52' checked={checkedState.A52} onChange={handleCheckboxChange}></input>
                {checkedState.A52 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz52"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A53' checked={checkedState.A53} onChange={handleCheckboxChange}></input>
                {checkedState.A53 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz53"/> )}
              </td>
              <td>
                <input type='checkbox' id='A54' checked={checkedState.A54} onChange={handleCheckboxChange}></input>
                {checkedState.A54 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz54"/> )}
              </td>
              <td>
                <input type='checkbox' id='A55' checked={checkedState.A55} onChange={handleCheckboxChange}></input>
                {checkedState.A55 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz55"/> )}
              </td>
              <td>
                <input type='checkbox' id='A56' checked={checkedState.A56} onChange={handleCheckboxChange}></input>
                {checkedState.A56 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz56"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L3'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A57' checked={checkedState.A57} onChange={handleCheckboxChange}></input>
                {checkedState.A57 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz57"/> )}
              </td>
              <td>
                <input type='checkbox' id='A58' checked={checkedState.A58} onChange={handleCheckboxChange}></input>
                {checkedState.A58 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz58"/> )}
              </td>
              <td>
                <input type='checkbox' id='A59' checked={checkedState.A59} onChange={handleCheckboxChange}></input>
                {checkedState.A59 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz59"/> )}
              </td>
              <td>
                <input type='checkbox' id='A60' checked={checkedState.A60} onChange={handleCheckboxChange}></input>
                {checkedState.A60 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz60"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A61' checked={checkedState.A61} onChange={handleCheckboxChange}></input>
                {checkedState.A61 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz61"/> )}
              </td>
              <td>
                <input type='checkbox' id='A62' checked={checkedState.A62} onChange={handleCheckboxChange}></input>
                {checkedState.A62 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz62"/> )}
              </td>
              <td>
                <input type='checkbox' id='A63' checked={checkedState.A63} onChange={handleCheckboxChange}></input>
                {checkedState.A63 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz63"/> )}
              </td>
              <td>
                <input type='checkbox' id='A64' checked={checkedState.A64} onChange={handleCheckboxChange}></input>
                {checkedState.A64 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz64"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L4'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A65' checked={checkedState.A65} onChange={handleCheckboxChange}></input>
                {checkedState.A65 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz65"/> )}
              </td>
              <td>
                <input type='checkbox' id='A66' checked={checkedState.A66} onChange={handleCheckboxChange}></input>
                {checkedState.A66 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz66"/> )}
              </td>
              <td>
                <input type='checkbox' id='A67' checked={checkedState.A67} onChange={handleCheckboxChange}></input>
                {checkedState.A67 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz67"/> )}
              </td>
              <td>
                <input type='checkbox' id='A68' checked={checkedState.A68} onChange={handleCheckboxChange}></input>
                {checkedState.A68 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz68"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A69' checked={checkedState.A69} onChange={handleCheckboxChange}></input>
                {checkedState.A69 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz69"/> )}
              </td>
              <td>
                <input type='checkbox' id='A70' checked={checkedState.A70} onChange={handleCheckboxChange}></input>
                {checkedState.A70 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz70"/> )}
              </td>
              <td>
                <input type='checkbox' id='A71' checked={checkedState.A71} onChange={handleCheckboxChange}></input>
                {checkedState.A71 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz71"/> )}
              </td>
              <td>
                <input type='checkbox' id='A72' checked={checkedState.A72} onChange={handleCheckboxChange}></input>
                {checkedState.A72 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz72"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='L5'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A73' checked={checkedState.A73} onChange={handleCheckboxChange}></input>
                {checkedState.A73 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz73"/> )}
              </td>
              <td>
                <input type='checkbox' id='A74' checked={checkedState.A74} onChange={handleCheckboxChange}></input>
                {checkedState.A74 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz74"/> )}
              </td>
              <td>
                <input type='checkbox' id='A75' checked={checkedState.A75} onChange={handleCheckboxChange}></input>
                {checkedState.A75 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz75"/> )}
              </td>
              <td>
                <input type='checkbox' id='A76' checked={checkedState.A76} onChange={handleCheckboxChange}></input>
                {checkedState.A76 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz76"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A77' checked={checkedState.A77} onChange={handleCheckboxChange}></input>
                {checkedState.A77 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz77"/> )}
              </td>
              <td>
                <input type='checkbox' id='A78' checked={checkedState.A78} onChange={handleCheckboxChange}></input>
                {checkedState.A78 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz78"/> )}
              </td>
              <td>
                <input type='checkbox' id='A79' checked={checkedState.A79} onChange={handleCheckboxChange}></input>
                {checkedState.A79 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz79"/> )}
              </td>
              <td>
                <input type='checkbox' id='A80' checked={checkedState.A80} onChange={handleCheckboxChange}></input>
                {checkedState.A80 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz80"/> )}
              </td>
          </table>
        </Accordion> 
        <Accordion title='S1'>
        <table>
            <td>
            R&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A81' checked={checkedState.A81} onChange={handleCheckboxChange}></input>
                {checkedState.A81 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz81"/> )}
              </td>
              <td>
                <input type='checkbox' id='A82' checked={checkedState.A82} onChange={handleCheckboxChange}></input>
                {checkedState.A82 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz82"/> )}
              </td>
              <td>
                <input type='checkbox' id='A83' checked={checkedState.A83} onChange={handleCheckboxChange}></input>
                {checkedState.A83 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz83"/> )}
              </td>
              <td>
                <input type='checkbox' id='A84' checked={checkedState.A84} onChange={handleCheckboxChange}></input>
                {checkedState.A84 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz84"/> )}
              </td>
            <td>
            &nbsp;&nbsp;L&nbsp;&nbsp;
            </td>
            <td>
                <input type='checkbox' id='A85' checked={checkedState.A85} onChange={handleCheckboxChange}></input>
                {checkedState.A85 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz85"/> )}
              </td>
              <td>
                <input type='checkbox' id='A86' checked={checkedState.A86} onChange={handleCheckboxChange}></input>
                {checkedState.A86 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz86"/> )}
              </td>
              <td>
                <input type='checkbox' id='A87' checked={checkedState.A87} onChange={handleCheckboxChange}></input>
                {checkedState.A87 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz87"/> )}
              </td>
              <td>
                <input type='checkbox' id='A88' checked={checkedState.A88} onChange={handleCheckboxChange}></input>
                {checkedState.A88 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz88"/> )}
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

const StepG1 = ({  handlePrevStep1  }) => {
  return (
    <div>
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

      <ConclusionButton value='p_completa' title='Y PRONOSTICO DE RECUPERACION COMPLETA' displayText=''/>
      <ConclusionButton value='p_parcial' title='Y PRONOSTICO DE RECUPERACION PARCIAL FUNCIONAL' displayText=''/>
      <ConclusionButton value='p_no_funcional' title='Y PRONOSTICO DE RECUPERACION POBRE NO FUNCIONAL' displayText=''/>
      <ConclusionButton value='nula' title='NULA (EN FASE DE SECUELA DEFINITIVA)' displayText=''/>

      
    </div>
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

const StepB2 = ({ handleNextStep2, handlePrevStep2, checkedState, checkedState1, handleCheckboxChange, handleCheckboxChange1 }) => {
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
        <Accordion title='C4'>
          <table cellpadding='3'>
              <td>
                <ConclusionButton value='c4_i' title='L' displayText=''/>
              </td>
              <td>
                  <input type='radio' name="radio1" value='1' id='A1' checked={checkedState.A1} onChange={handleCheckboxChange}></input>
                  {checkedState.A1 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz1"/> )}
                </td>
                <td>
                  <input type='radio' name="radio1" value='2' id='A2' checked={checkedState.A2} onChange={handleCheckboxChange}></input>
                  {checkedState.A2 && ( <img src='/assets/Simbolos/S_Cruz 2.png' className="cruz2"/> )}
                </td> 
                <td>
                  <input type='radio' name="radio1" value='3'  id='A3' checked={checkedState.A3} onChange={handleCheckboxChange}></input>
                  {checkedState.A3 && ( <img src='/assets/Simbolos/S_Cruz 3.png' className="cruz3"/> )}
                </td>
                <td>
                  <input type='radio' name="radio1" value='4' id='A4' checked={checkedState.A4} onChange={handleCheckboxChange}></input>
                  {checkedState.A4 && ( <img src='/assets/Simbolos/S_Cruz 4.png' className="cruz4"/> )}
                </td>
              <td>
                <ConclusionButton value='c4_d' title='R' displayText=''/>
              </td>
              <td>
                <input type='radio' name="radio2" value='1' id='A5' checked={checkedState.A5} onChange={handleCheckboxChange1}></input>
                {checkedState1.A5 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz5"/> )}
              </td>
              <td>
                <input type='radio' name="radio2" value='2' id='A6' checked={checkedState.A6} onChange={handleCheckboxChange1}></input>
                {checkedState1.A6 && ( <img src='/assets/Simbolos/S_Cruz 2.png' className="cruz6"/> )}
              </td> 
              <td>
                <input type='radio' name="radio3" value='3' id='A7' checked={checkedState.A7} onChange={handleCheckboxChange1}></input>
                {checkedState1.A7 && ( <img src='/assets/Simbolos/S_Cruz 3.png' className="cruz7"/> )}
              </td>
              <td>
                <input type='radio' name="radio2" value='4' id='A8' checked={checkedState.A8} onChange={handleCheckboxChange1}></input>
                {checkedState1.A8 && ( <img src='/assets/Simbolos/S_Cruz 4.png' className="cruz8"/> )}
              </td>
          </table>
        </Accordion>
        <Accordion title='C5'>
        <table>
            <td>
            <ConclusionButton value='c5_i' title='L' displayText=''/>
            </td>
                  <input type='radio' name="radio3" value='9' id='A9' checked={checkedState.A9} onChange={handleCheckboxChange}></input>
                  {checkedState.A9 && ( <img src='/assets/Simbolos/S_Cruz 1.png' className="cruz1"/> )}
            {checkedState.A9 && ( <img src='/assets/RadiculopatiaImg/C5 izquierdo anterior.png' className="imagen1"/> )}
            <td>
            <ConclusionButton value='c5_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion>
        <Accordion title='C6'>
        <table>
            <td>
            <ConclusionButton value='c6_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='c6_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion>
        <Accordion title='C7'>
        <table>
            <td>
            <ConclusionButton value='c7_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='c7_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion>
        <Accordion title='C8'>
        <table>
            <td>
            <ConclusionButton value='c8_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='c8_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion>
        <Accordion title='T1'>
        <table>
            <td>
            <ConclusionButton value='t1_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='t1_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion>
        <ConclusionButton value='cervical_multinivel' title='CERVICAL MULTINIVEL' />              
      </Accordion>

      <Accordion title='LUMBAR'>
      <Accordion title='L2'>
      <table>
            <td>
            <ConclusionButton value='l2_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='l2_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion> 
        <Accordion title='L3'>
        <table>
            <td>
            <ConclusionButton value='l3_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='l3_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion> 
        <Accordion title='L4'>
        <table>
            <td>
            <ConclusionButton value='l4_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='l4_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion> 
        <Accordion title='L5'>
        <table>
            <td>
            <ConclusionButton value='l5_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='l5_d' title='R' displayText=''/>
            </td>
          </table>
        </Accordion> 
        <Accordion title='S1'>
        <table>
            <td>
            <ConclusionButton value='s1_i' title='L' displayText=''/>
            </td>
            <td>
            <ConclusionButton value='s1_d' title='R' displayText=''/>
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


const StepE2 = ({  handlePrevStep2 }) => {
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

      <div //onClick={handleNextStep}
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