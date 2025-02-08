import { ReportContext } from '@/src/context';
import { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionContainer, darvalor, InternalAccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import ReportFace from './ReportFace';


// Numero de pasos 
const stepsArray = ['A1','B1','B2','B3','C1','C2','C3','D1','D2','D3','E1','E2','E3','F1','F2','F3','G1','G2','G3','H2','H3', 'D2A', 'D2A', 'D3A', 'I1', 'I2', 'I3'];
// Metodos de movimiento entre menus
const SimpleMultiStepForm = ({ showStepNumber }) => {
  const [step, setStep] = useState('A');
  const [myVariable, setMyVariable] = useState([]);
  const [myVariable1, setMyVariable1] = useState([]);
  const [myVariable2, setMyVariable2] = useState([]);
  const [text, setText]=useState("");

  useEffect(()=>{
    setText("hola");
  },[]);

  const {
    selectedImages,
    history,
    handleImageChange,
    handleUndo,
    handlePrint
  } = useImageState();

  // Function to assign the first value to the variable
  const assignFirstValue = () => {
    setMyVariable(prevValues => [...prevValues, "Hello, World!"]);
  };

  // Function to assign the second value to the variable
  const assignSecondValue = () => {
    setMyVariable(prevValues => [...prevValues, "Second Value"]);
  };

  const assignThirdValue = () => {
    setMyVariable(prevValues => [...prevValues, "Third Value"]);
  };

  const ladoizquierda = () => {
    setMyVariable1(prevValues => [...prevValues, "b"]);
  };

  // Function to assign the second value to the variable
  const ladoderecho = () => {
    setMyVariable1(prevValues => [...prevValues, "a"]);
  };

  const ladobilateral = () => {
    setMyVariable1(prevValues => [...prevValues, "c"]);
  };

  const ladoizquierda1 = () => {
    setMyVariable2(prevValues => [...prevValues, "b"]);
  };

  // Function to assign the second value to the variable
  const ladoderecho1 = () => {
    setMyVariable2(prevValues => [...prevValues, "a"]);
  };

  const ladobilateral1 = () => {
    setMyVariable2(prevValues => [...prevValues, "c"]);
  };

  const ubicaciond2 = () => {
    if (myVariable1.includes("a")) {
      return (<div>
        
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='pre_total' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
        </div>
        <InternalAccordionContainer>
        <Accordion title=' PREGANGLIONAR PARCIAL' displayText={'PREGANGLIONAR PARCIAL'} type='internal'>
          <ConclusionButton value='c5sd' title=' C5' displayText={'C5'}/>
          <ConclusionButton value='c6sd' title=' C6' displayText={'C6'}/>
          <ConclusionButton value='c7md' title=' C7' displayText={'C7'}/>
          <ConclusionButton value='c8fd' title=' C8' displayText={'C8'}/>
          <ConclusionButton value='t1fd' title=' T1' displayText={'T1'}/>
        </Accordion>
        </InternalAccordionContainer>
        {/* <div onClick={ handleNextStep1 }>
          <ConclusionButton value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}/>
        </div> */}
        <AccordionContainer>
        <Accordion value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL 1'}  type='external'>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='troncosD' title=' POSTGANGLIONAR TOTAL A NIVEL DE TROCOS' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='divid' title=' POSTGANGLIONAR TOTAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='CordonD' title=' POSTGANGLIONAR TOTAL A NIVEL DE CORDONES' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion value='prueba1000' title=' POSTGANGLIONAR PARCIAL' displayText={'POSTGANGLIONAR PARCIAL'} type='external'>
          <div onClick={handleNextStep5}>
            <ConclusionButton value='tron1000d' title=' POSTGANGLIONAR PACIAL A NIVEL DE TROCO' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='divid' title=' POSTGANGLIONAR PACIAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep6}>
            <ConclusionButton value='tron10000d' title=' POSTGANGLIONAR PARCIAL A NIVEL DE CORDON' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
        </AccordionContainer>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='salidad' title=' A NIVEL DE SALIDA TORÁCICA' displayText={'SALIDA TORÁCICA'}/>
        </div></div>
      );
    }
    else if (myVariable1.includes("b")) {
      return (<div>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='pre_totald' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
        </div>
      <AccordionContainer>
        <Accordion title=' PREGANGLIONAR PARCIAL' displayText={'PREGANGLIONAR PARCIAL'}>
          <ConclusionButton value='c5si' title=' C5' displayText={'C5'}/>
          <ConclusionButton value='c6si' title=' C6' displayText={'C6'}/>
          <ConclusionButton value='c7mi' title=' C7' displayText={'C7'}/>
          <ConclusionButton value='c8fi' title=' C8' displayText={'C8'}/>
          <ConclusionButton value='t1fi' title=' T1' displayText={'T1'}/>
        </Accordion>

        {/* <div onClick={ handleNextStep1 }>
          <ConclusionButton value='post_totali' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}/>
        </div> */}

        <Accordion value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL 2'}>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='troncosI' title=' POSTGANGLIONAR TOTAL A NIVEL DE TROCOS' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='diviI' title=' POSTGANGLIONAR TOTAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='CordonI' title=' POSTGANGLIONAR TOTAL A NIVEL DE CORDONES' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
      
        <Accordion value='prueba1000' title=' POSTGANGLIONAR PARCIAL' displayText={'POSTGANGLIONAR PARCIAL'}>
          <div onClick={handleNextStep5}>
            <ConclusionButton value='tron1000i' title=' POSTGANGLIONAR PACIAL A NIVEL DE TROCO' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='divii' title=' POSTGANGLIONAR PACIAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep6}>
            <ConclusionButton value='tron10000i' title=' POSTGANGLIONAR PARCIAL A NIVEL DE CORDON' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
    </AccordionContainer>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='salidai' title=' A NIVEL DE SALIDA TORÁCICA' displayText={'SALIDA TORÁCICA'}/>
        </div></div>
      );
    }
    else if (myVariable1.includes("c")) {
      return (<div>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='pre_totali' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
        </div>
      <AccordionContainer>
        <Accordion title=' PREGANGLIONAR PARCIAL' displayText={'PREGANGLIONAR PARCIAL'}>
          <ConclusionButton value='c5s' title=' C5' displayText={'C5'}/>
          <ConclusionButton value='c6s' title=' C6' displayText={'C6'}/>
          <ConclusionButton value='c7m' title=' C7' displayText={'C7'}/>
          <ConclusionButton value='c8f' title=' C8' displayText={'C8'}/>
          <ConclusionButton value='t1f' title=' T1' displayText={'T1'}/>
        </Accordion>
{/* 
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='post_total' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}/>
        </div> */}

        <Accordion value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL 3'}>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='troncosB' title=' POSTGANGLIONAR TOTAL A NIVEL DE TROCOS' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='divi' title=' POSTGANGLIONAR TOTAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='CordonB' title=' POSTGANGLIONAR TOTAL A NIVEL DE CORDONES' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
      
        <Accordion value='prueba1000' title=' POSTGANGLIONAR PARCIAL' displayText={'POSTGANGLIONAR PARCIAL'}>
          <div onClick={handleNextStep5}>
            <ConclusionButton value='tron1000' title=' POSTGANGLIONAR PACIAL A NIVEL DE TROCO' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='divi' title=' POSTGANGLIONAR PACIAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep6}>
            <ConclusionButton value='tron10000' title=' POSTGANGLIONAR PARCIAL A NIVEL DE CORDON' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
        </AccordionContainer>
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='salida' title=' A NIVEL DE SALIDA TORÁCICA' displayText={'SALIDA TORÁCICA'}/>
        </div></div>
      );
    }
    return null;
  };

  const ubicaciond2a = () => {
    if (myVariable1.includes("a")) {
      return (<div>
              <ConclusionButton value='supd' title=' SUPERIOR' displayText={'SUPERIOR'}/>
              <ConclusionButton value='mediod' title=' MEDIO' displayText={'MEDIO'}/>
              <ConclusionButton value='infd' title=' INFERIOR' displayText={'INFERIOR'}/>
            </div>
      );
    }
    else if (myVariable1.includes("b")) {
      return (<div>
              <ConclusionButton value='supi' title=' SUPERIOR' displayText={'SUPERIOR'}/>
              <ConclusionButton value='medioi' title=' MEDIO' displayText={'MEDIO'}/>
              <ConclusionButton value='infi' title=' INFERIOR' displayText={'INFERIOR'}/></div>
      );
    }
    else if (myVariable1.includes("c")) {
      return (<div>
              <ConclusionButton value='sup' title=' SUPERIOR' displayText={'SUPERIOR'}/>
              <ConclusionButton value='medio' title=' MEDIO' displayText={'MEDIO'}/>
              <ConclusionButton value='inf' title=' INFERIOR' displayText={'INFERIOR'}/></div>
      );
    }
    return null;
  };

  const ubicaciond2b = () => {
    if (myVariable1.includes("a")) {
      return (<div>
        <ConclusionButton value='laterald' title=' LATERAL' displayText={'LATERAL'}/>
        <ConclusionButton value='posteriord' title=' POSTERIOR' displayText={'POSTERIOR'}/>
        <ConclusionButton value='mediald' title=' MEDIAL'displayText={'MEDIAL'} /></div>
      );
    }
    else if (myVariable1.includes("b")) {
      return (<div>
        <ConclusionButton value='laterali' title=' LATERAL' displayText={'LATERAL'}/>
        <ConclusionButton value='posteriori' title=' POSTERIOR' displayText={'POSTERIOR'}/>
        <ConclusionButton value='mediali' title=' MEDIAL'displayText={'MEDIAL'} /></div>
      );
    }
    else if (myVariable1.includes("c")) {
      return (<div>
        <ConclusionButton value='lateral' title=' LATERAL' displayText={'LATERAL'}/>
        <ConclusionButton value='posterior' title=' POSTERIOR' displayText={'POSTERIOR'}/>
        <ConclusionButton value='medial' title=' MEDIAL'displayText={'MEDIAL'} /></div>
      );
    }
    return null;
  };

  const ubicaciond3 = () => {
    if (myVariable2.includes("a")) {
      return (<div>
        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='preganglionar_totald' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
        </div>

        <div onClick={handleNextStep7}>
          <ConclusionButton value='holad' title=' PREGANGLIONAR PARCIAL A NIVEL DE ' displayText='PREGANGLIONAR PARCIAL'/>
        </div>

        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='postganglionar_totald' title=' POSTGANGLIONAR TOTAL 4' displayText={'POSTGANGLIONAR TOTAL 4'}/>
        </div>
        <AccordionContainer>
        <Accordion title='POSTGANGLIONAR PACIAL' value='POSTGANGLIONAR PACIAL' type='external'> 
            <div onClick={ handleNextStep2 }>
              <ConclusionButton value='ilihipogastrico_e_ilinguinald' title=' POSTGANGLIONAR PACIAL A NIVEL DE ILIHIPOGASTRICO E ILIINGUINAL' displayText={'ILIHIPOGASTRICO E ILIINGUINAL'}/>
              <ConclusionButton value='genitocrural_y_femorocutáneo_laterald' title=' POSTGANGLIONAR PACIAL A NIVEL DE GENITOCRURAL Y FEMOROCUTANEO LATERAL' displayText={'GENITOCRURAL Y FEMOROCUTANEO LATERAL'}/>
              <ConclusionButton value='plexo_lumbard' title=' POSTGANGLIONAR PACIAL A NIVEL DE PLEXO LUMBAR (FEMORAL Y OBTURADOR)' displayText={'PLEXO LUMBAR (FEMORAL Y OBTURADOR)'}/>
              <ConclusionButton value='plexo_lumbosacrod' title=' POSTGANGLIONAR PACIAL A NIVEL DE TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)' displayText={'TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_sacrod' title=' POSTGANGLIONAR PACIAL A NIVEL DE TRONCO SACRO' displayText={'PLEXO SACRO'}/>
              <ConclusionButton value='plexo_pudendod' title=' POSTGANGLIONAR PACIAL A NIVEL DE PLEXO PUDENDO' displayText={'PLEXO PUDENDO'}/>
            </div>
        </Accordion>
        </AccordionContainer>
        </div>
      );
    }
    else if (myVariable2.includes("b")) {
      return (<div>
        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='preganglionar_totali' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
        </div>

        <div onClick={handleNextStep7}>
          <ConclusionButton value='holai' title=' PREGANGLIONAR PARCIAL A NIVEL DE ' displayText='PREGANGLIONAR PARCIAL'/>
        </div>

        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='postganglionar_totali' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL 5'}/>
        </div>
        <AccordionContainer>
        <Accordion title='POSTGANGLIONAR PACIAL' value='POSTGANGLIONAR PACIAL' type='external'>
            <div onClick={ handleNextStep2 }>
              <ConclusionButton value='ilihipogastrico_e_ilinguinali' title=' POSTGANGLIONAR PACIAL A NIVEL DE ILIHIPOGASTRICO E ILIINGUINAL' displayText={'ILIHIPOGASTRICO E ILIINGUINAL'}/>
              <ConclusionButton value='genitocrural_y_femorocutáneo_laterali' title=' POSTGANGLIONAR PACIAL A NIVEL DE GENITOCRURAL Y FEMOROCUTANEO LATERAL' displayText={'GENITOCRURAL Y FEMOROCUTANEO LATERAL'}/>
              <ConclusionButton value='plexo_lumbari' title=' POSTGANGLIONAR PACIAL A NIVEL DE PLEXO LUMBAR (FEMORAL Y OBTURADOR)' displayText={'PLEXO LUMBAR (FEMORAL Y OBTURADOR)'}/>
              <ConclusionButton value='plexo_lumbosacroi' title=' POSTGANGLIONAR PACIAL A NIVEL DE TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)' displayText={'TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_sacroi' title=' POSTGANGLIONAR PACIAL A NIVEL DE TRONCO SACRO' displayText={'TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_pudendoi' title=' POSTGANGLIONAR PACIAL A NIVEL DE PLEXO PUDENDO' displayText={'PLEXO PUDENDO'}/>
            </div>
        </Accordion>
        </AccordionContainer>
        </div>
      );
    }
    else if (myVariable2.includes("c")) {
      return (<div>
        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='preganglionar_total' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
        </div>

        <div onClick={handleNextStep7}>
          <ConclusionButton value='hola' title=' PREGANGLIONAR PARCIAL A NIVEL DE ' displayText='PREGANGLIONAR PARCIAL'/>
        </div>

        <div onClick={ handleNextStep2 }>
          <ConclusionButton value='postganglionar_total' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}/>
        </div>
        <AccordionContainer>
        <Accordion title='POSTGANGLIONAR PACIAL'>
            <div onClick={ handleNextStep2 }>
              <ConclusionButton value='ilihipogastrico_e_ilinguinal' title=' POSTGANGLIONAR PACIAL A NIVEL DE ILIHIPOGASTRICO E ILIINGUINAL' displayText={'ILIHIPOGASTRICO E ILIINGUINAL'}/>
              <ConclusionButton value='genitocrural_y_femorocutáneo_lateral' title=' POSTGANGLIONAR PACIAL A NIVEL DE GENITOCRURAL Y FEMOROCUTANEO LATERAL' displayText={'GENITOCRURAL Y FEMOROCUTANEO LATERAL'}/>
              <ConclusionButton value='plexo_lumbar' title=' POSTGANGLIONAR PACIAL A NIVEL DE PLEXO LUMBAR (FEMORAL Y OBTURADOR)' displayText={'PLEXO LUMBAR (FEMORAL Y OBTURADOR)'}/>
              <ConclusionButton value='plexo_lumbosacro' title=' POSTGANGLIONAR PACIAL A NIVEL DE TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)' displayText={'TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_sacro' title=' POSTGANGLIONAR PACIAL A NIVEL DE TRONCO SACRO' displayText={'TRONCO LUMBOSACRO (CIATICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_pudendo' title=' POSTGANGLIONAR PACIAL A NIVEL DE PLEXO PUDENDO' displayText={'PLEXO PUDENDO'}/>
            </div>
        </Accordion>
        </AccordionContainer>
        </div>
      );
    }
    return null;
  };

  const ubicaciond3a = () => {
    if (myVariable2.includes("a")) {
      return (<div>
        <ConclusionButton value='L2d' title=' L2' displayText={'L2'}/>
        <ConclusionButton value='L3d' title=' L3' displayText={'L3'}/>
        <ConclusionButton value='L4d' title=' L4' displayText={'L4'}/>
        <ConclusionButton value='L5d' title=' L5' displayText={'L5'}/>
        <ConclusionButton value='S1d' title=' S1' displayText={'S1'}/>
        <ConclusionButton value='S2d' title=' S2' displayText={'S2'}/></div>
      );
    }
    else if (myVariable2.includes("b")) {
      return (<div>
        <ConclusionButton value='L2i' title=' L2' displayText={'L2'}/>
        <ConclusionButton value='L3i' title=' L3' displayText={'L3'}/>
        <ConclusionButton value='L4i' title=' L4' displayText={'L4'}/>
        <ConclusionButton value='L5i' title=' L5' displayText={'L5'}/>
        <ConclusionButton value='S1i' title=' S1' displayText={'S1'}/>
        <ConclusionButton value='S2i' title=' S2' displayText={'S2'}/></div>
      );
    }
    else if (myVariable2.includes("c")) {
      return (<div>
        <ConclusionButton value='L2' title=' L2' displayText={'L2'}/>
        <ConclusionButton value='L3' title=' L3' displayText={'L3'}/>
        <ConclusionButton value='L4' title=' L4' displayText={'L4'}/>
        <ConclusionButton value='L5' title=' L5' displayText={'L5'}/>
        <ConclusionButton value='S1' title=' S1' displayText={'S1'}/>
        <ConclusionButton value='S2' title=' S2' displayText={'S2'}/></div>
      );
    }
    return null;
  };

  const muestralog =() =>{
    if(myVariable.includes("Hello, World!", "Second Value")){
      console.log("hola");
      return(<div><ReportFace text={text}/></div>)
    }
    //else if(myVariable.includes())
  };
  
  // Siguiente paso, se ponen los pasos de arriba hacia abajo
  const handleNextStep = () => {
    if (step === 'A') setStep('B1');
    else if (step === 'B1') setStep('C1');
    else if (step === 'C1') setStep('D1');
    else if (step === 'D1') setStep('E1');
    else if (step === 'E1') setStep('F1');
    else if (step === 'F1') setStep('G1');
    else if (step === 'G1') setStep('I');
  };
  
  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep = () => {
    if (step === 'I') setStep('G1');
    else if (step === 'G1') setStep('F1');
    else if (step === 'F1') setStep('E1');
    else if (step === 'E1') setStep('D1');
    else if (step === 'D1') setStep('C1');
    else if (step === 'C1') setStep('B1');
    else if (step === 'B1') setStep('A');
  };

  const handleNextStep1 = () => {
    if (step === 'A') setStep('B2');
    else if (step === 'B2') setStep('C2');
    else if (step === 'C2') setStep('D2');
    else if (step === 'D2') setStep('E2');
    else if (step === 'E2') setStep('F2');
    else if (step === 'F2') setStep('G2');
    else if (step === 'G2') setStep('H2');
    else if (step === 'H2') setStep('I1');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep1 = () => {
    if (step === 'I1') setStep('H2');
    else if (step === 'H2') setStep('G2');
    else if (step === 'G2') setStep('F2');
    else if (step === 'F2') setStep('E2');
    else if (step === 'E2') setStep('D2');
    else if (step === 'D2') setStep('C2');
    else if (step === 'C2') setStep('B2');
    else if (step === 'B2') setStep('A');
  };

  // const handleNextStep2 = () => {
  //   if (step === 'A') setStep('B3');
  //   else if (step === 'B3') setStep('C3');
  //   else if (step === 'C3') setStep('D3');
  //   else if (step === 'D3') setStep('E3');
  //   else if (step === 'E3') setStep('F3');
  //   else if (step === 'F3') setStep('G3');
  //   else if (step === 'G3') setStep('H3');
  //   else if (step === 'H3') setStep('I2');
  // };

  // // Paso anterior, se ponen los pasos de abajo hacia arriba
  // const handlePrevStep2 = () => {
  //   if (step === 'I2') setStep('H3');
  //   else if (step === 'H3') setStep('G3');
  //   else if (step === 'G3') setStep('F3');
  //   else if (step === 'F3') setStep('E3');
  //   else if (step === 'D3') setStep('C3');
  //   else if (step === 'C3') setStep('B3');
  //   else if (step === 'B3') setStep('A');
  // };
  
  const handleNextStep2 = () => {
    if (step === 'A') setStep('B3');
    else if (step === 'B3') setStep('C3');
    else if (step === 'C3') setStep('D3');
    else if (step === 'D3') setStep('E3');
    else if (step === 'E3') setStep('F3');
    else if (step === 'F3') setStep('G3');
    else if (step === 'G3') setStep('H3');
    else if (step === 'H3') setStep('I2');
  };

  // Paso anterior, se ponen los pasos de abajo hacia arriba
  const handlePrevStep2 = () => {
    if (step === 'I2') setStep('H3');
    else if (step === 'H3') setStep('G3');
    else if (step === 'G3') setStep('F3');
    else if (step === 'F3') setStep('E3');
    else if (step === 'E3') setStep('D3');
    else if (step === 'D3') setStep('C3');
    else if (step === 'C3') setStep('B3');
    else if (step === 'B3') setStep('A');
  };
  
  const handleNextStep4 = () => {
    if (step === 'E3') setStep('H3');
    else if (step === 'E2') setStep('H2');
    else if (step === 'D1') setStep('G1');
  };
  const handleNextStep5=()=>{
    if (step === 'D2') setStep('D2A')
    else if (step === 'D2A') setStep('E2')
  }
  const handleNextStep6=()=>{
    if (step === 'D2') setStep('D2B')
    else if (step === 'D2B') setStep('E2')
  }
  const handleNextStep7=()=>{
    if (step === 'D3') setStep('D3A')
    else if (step === 'D3A') setStep('E3')
  }
  const handlePrevStep5 = () => {
    if (step === 'E2') setStep('D2A');
    else if (step === 'D2A') setStep('D2')
  };
  const handlePrevStep6 = () => {
    if (step === 'E2') setStep('D2B');
    else if (step === 'D2B') setStep('D2')
  };
  const handlePrevStep7 = () => {
    if (step === 'E3') setStep('D3A');
    else if (step === 'D3A') setStep('D3')
  };
const cambiotexto = () =>{
  switch(op){
    case "a":
      

  }
};

  // Renderizado de los pasos en circulos
  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === 'Final') {
      return null;
    }
    return (
      <section className='mt-2 mb-4 flex justify-between'>
        {stepsArray.map((item) => (
          <div
            key={item}
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${
              item === step ? 'bg-orange-500' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </section>
    );
  };

  return (
    <div>
      {/* Metodos que toman cada paso
      {renderTopStepNumbers()}*/}
      {step === 'A' ? (
        <StepA
          handleNextStep={handleNextStep}
          handleNextStep1={handleNextStep1}
          handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'B1' ? (
        <StepB1
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'B2' ? (
        <StepB2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        ladoizquierda={ladoizquierda}
        ladoderecho={ladoderecho}
        ladobilateral={ladobilateral}
        />
      ) : null}

      {step === 'B3' ? (
        <StepB3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        ladoizquierda1={ladoizquierda1}
        ladoderecho1={ladoderecho1}
        ladobilateral1={ladobilateral1}
        />
      ) : null}

      {step === 'C1' ? (
        <StepC1
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'C2' ? (
        <StepC2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'C3' ? (
        <StepC3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'D1' ? (
        <StepD1
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleNextStep4={handleNextStep4}
        />
      ) : null}

      {step === 'D2' ? (
        <StepD2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handleNextStep5={handleNextStep5}
        handleNextStep6={handleNextStep6}
        ubicaciond2={ubicaciond2}
        />
      ) : null}

      {step === 'D2A' ? (
        <StepD2A
        handleNextStep1={handleNextStep1}
        handleNextStep5={handleNextStep5}
        handleNextStep6={handleNextStep6}
        handlePrevStep5={handlePrevStep5}
        ubicaciond2a={ubicaciond2a}
        assignFirstValue={assignFirstValue}
        assignSecondValue={assignSecondValue}
        assignThirdValue={assignThirdValue}
        muestralog={muestralog}
        />
      ) : null}

      {step === 'D2B' ? (
        <StepD2B
        handlePrevStep6={handlePrevStep6}
        handleNextStep1={handleNextStep1}
        handleNextStep5={handleNextStep5}
        handleNextStep6={handleNextStep6}
        ubicaciond2b={ubicaciond2b}
        />
      ) : null}

      {step === 'D3' ? (
        <StepD3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handleNextStep7={handleNextStep7}
        handlePrevStep7={handlePrevStep7}
        ubicaciond3={ubicaciond3}
        />
      ) : null}

      {step === 'D3A' ? (
        <StepD3A
        handleNextStep2={handleNextStep2}
        handleNextStep7={handleNextStep7}
        handlePrevStep7={handlePrevStep7}

        ubicaciond3a={ubicaciond3a}
        />
      ) : null}

      {step === 'E1' ? (
        <StepE1
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'E2' ? (
        <StepE2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        handleNextStep4={handleNextStep4}
        />
      ) : null}

      {step === 'E3' ? (
        <StepE3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        handleNextStep4={handleNextStep4}
        />
      ) : null}

      {step === 'F1' ? (
        <StepF1
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'F2' ? (
        <StepF2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'F3' ? (
        <StepF3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'G1' ? (
        <StepG1
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'G2' ? (
        <StepG2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'G3' ? (
        <StepG3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'H2' ? (
        <StepH2
        handlePrevStep1={handlePrevStep1}
        handleNextStep1={handleNextStep1}
        />
      ) : null}

      {step === 'H3' ? (
        <StepH3
        handlePrevStep2={handlePrevStep2}
        handleNextStep2={handleNextStep2}
        />
      ) : null}

      {step === 'I' ? (
        <StepI
          handlePrevStep={handlePrevStep}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'I1' ? (
        <StepI1
          handlePrevStep1={handlePrevStep1}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

      {step === 'I2' ? (
        <StepI2
          handlePrevStep2={handlePrevStep2}
          selectedImages={selectedImages}
          handleUndo={handleUndo}
          handleImageChange={handleImageChange}
          handlePrint={handlePrint}
        />
      ) : null}

    </div>
  );
};

///////////////// Menu de cada paso /////////////////

const StepA = ({ handleNextStep,handleNextStep1,handleNextStep2 }) => {
  
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
        PLEXO
      </h1>
      <div onClick={darvalor}>
        <div onClick={handleNextStep}>
          <ConclusionButton value='plexopatia_cervical' title='PLEXOPATIA CERVICAL' displayText={'CERVICAL'}/>
        </div>

        <div onClick={handleNextStep1}>
          <ConclusionButton value='plexopatia_braquial' title='PLEXOPATIA BRAQUIAL' displayText={'BRAQUIAL'}/>
        </div>

        <div onClick={handleNextStep2}>
          <ConclusionButton value='plexopatia_lumbosacra' title='PLEXOPATIA LUMBOSACRA' displayText={'LUMBOSACRO'}/>
        </div>
      </div>
        <div className='my-2 flex justify-end items-center'>
      </div>
    </div>
  );
};

const StepB1 = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)

  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('izquierda_C')
            removeConclusion('derecha_C')
            removeConclusion('bilateral_C')
            removeConclusion('plexopatia_cervical')
            removeConclusion('plexopatia_braquial')
            removeConclusion('plexopatia_lumbosacra')

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>
        
        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        LADO
      </h1>
      
      <div onClick={ handleNextStep }>
      <ConclusionButton value='izquierda_C' title=' IZQUIERDA,' displayText={'IZQUIERDA'}/>
      <ConclusionButton value='derecha_C' title=' DERECHA' displayText={'DERECHA'}   dangerouslySetInnerHTML={{ __html: 'DERECHA,<br>' }} />
      <ConclusionButton value='bilateral_C' title=' BILATERAL,' displayText={'BILATERAL'}/>
      </div>

      
    </div>
  );
};

const StepB2 = ({ handleNextStep1, handlePrevStep1, ladoizquierda, ladoderecho, ladobilateral}) => {
  const { removeConclusion } = useContext(ReportContext)

  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('izquierda')
            removeConclusion('derecha')
            removeConclusion('bilateral')
            removeConclusion('plexopatia_cervical')
            removeConclusion('plexopatia_braquial')
            removeConclusion('plexopatia_lumbosacra')

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        LADO
      </h1>
      <div onClick={ handleNextStep1 }>
        <div onClick={ladoizquierda}>
        <ConclusionButton value='izquierda' title=' IZQUIERDA,' displayText={'IZQUIERDA'}/></div>
        <div onClick={ladoderecho}>
        <ConclusionButton value='derecha' title=' DERECHA,' displayText={'DERECHA'}/></div>
        <div onClick={ladobilateral}>
        <ConclusionButton value='bilateral' title=' BILATERAL,' displayText={'BILATERAL'}/></div>
      </div>

      
    </div>
  );
};

const StepB3 = ({ handleNextStep2, handlePrevStep2, ladoizquierda1, ladoderecho1, ladobilateral1 }) => {
  const { removeConclusion } = useContext(ReportContext)

  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('izquierda')
            removeConclusion('derecha')
            removeConclusion('bilateral')
            removeConclusion('plexopatia_cervical')
            removeConclusion('plexopatia_braquial')
            removeConclusion('plexopatia_lumbosacra')

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        LADO
      </h1>
      <div onClick={ handleNextStep2 }>
        <div onClick={ladoizquierda1}>
        <ConclusionButton value='izquierda' title=' IZQUIERDA,' displayText={'IZQUIERDA'}/></div>
        <div onClick={ladoderecho1}>
        <ConclusionButton value='derecha' title=' DERECHA,' displayText={'DERECHA'}/></div>
        <div onClick={ladobilateral1}>
        <ConclusionButton value='bilateral' title=' BILATERAL,' displayText={'BILATERAL'}/></div>
      </div>

      
    </div>
  );
};

const StepC1 = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
          removeConclusion('aguda');
          removeConclusion('subaguda');
          removeConclusion('cronica');

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EVOLUCION
      </h1>

      <div onClick={ handleNextStep }>
      <ConclusionButton value='aguda' title=' AGUDA' />
      <ConclusionButton value='subaguda' title=' SUBAGUDA' />
      <ConclusionButton value='cronica' title=' CRONICA' />
      </div>
    </div>
  );
};

const StepC2 = ({ handleNextStep1, handlePrevStep1 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
          removeConclusion('aguda');
          removeConclusion('subaguda');
          removeConclusion('cronica');

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button id='prev' className={`print-button dont-print `}>
          <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EVOLUCION
      </h1>
      <div onClick={ handleNextStep1 }>
      <ConclusionButton value='aguda' title=' AGUDA' />
      <ConclusionButton value='subaguda' title=' SUBAGUDA' />
      <ConclusionButton value='cronica' title=' CRONICA' />
      </div>

      
    </div>
  );
};

const StepC3 = ({ handleNextStep2, handlePrevStep2 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
          removeConclusion('aguda');
          removeConclusion('subaguda');
          removeConclusion('cronica');

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        EVOLUCION
      </h1>

      <div onClick={ handleNextStep2 }>
      <ConclusionButton value='aguda' title=' AGUDA 3' />
      <ConclusionButton value='subaguda' title=' SUBAGUDA' />
      <ConclusionButton value='cronica' title=' CRONICA' />
      </div>

      
    </div>
  );
};

const StepD2 = ({ handleNextStep1, handlePrevStep1, handleNextStep5, handleNextStep6, ubicaciond2 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
          removeConclusion('pre_total');
          removeConclusion('c5sd');
          removeConclusion('c6sd');
          removeConclusion('c7md');
          removeConclusion('c8fd');
          removeConclusion('t1fd');
          removeConclusion('post_totald');
          removeConclusion('troncosD');
          removeConclusion('divid');
          removeConclusion('CordonD');
          removeConclusion('prueba1000');
          removeConclusion('tron1000d');
          removeConclusion('tron10000d');
          removeConclusion('salida');
          removeConclusion('salidad');
          removeConclusion('pre_totald');
          removeConclusion('c5si');
          removeConclusion('c6si');
          removeConclusion('c7mi');
          removeConclusion('c8fi');
          removeConclusion('t1fi');
          removeConclusion('troncosI');
          removeConclusion('diviI');
          removeConclusion('CordonI');
          removeConclusion('tron1000i');
          removeConclusion('divii');
          removeConclusion('tron10000i');
          removeConclusion('salidai');
          removeConclusion('pre_totali');
          removeConclusion('c5s');
          removeConclusion('c6s');
          removeConclusion('c7m');
          removeConclusion('c8f');
          removeConclusion('t1f');
          removeConclusion('troncosB');
          removeConclusion('divi');
          removeConclusion('CordonB');
          removeConclusion('tron1000');
          removeConclusion('tron10000');

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' onClick={handleNextStep1} className={`print-button dont-print `}>
        <img src="/I_In.svg" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>
      <div>{ubicaciond2()}</div>
    </div>
  );
};

const StepD2A = ({handleNextStep5, handlePrevStep5, ubicaciond2a}) => {
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
          removeConclusion('supd');
          removeConclusion('mediod');
          removeConclusion('infd');

          removeConclusion('supi');
          removeConclusion('medioi');
          removeConclusion('infi');

          removeConclusion('sup');
          removeConclusion('medio');
          removeConclusion('inf');


            handlePrevStep5()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' onClick={handleNextStep5} className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        TRONCO
      </h1>
      <div>{ubicaciond2a()}</div>
    </div>
  );
};

const StepD2B = ({ handleNextStep6, handlePrevStep6, ubicaciond2b }) => {
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion('laterald');
            removeConclusion('posteriord');
            removeConclusion('mediald');

            removeConclusion('laterali');
            removeConclusion('posteriori');
            removeConclusion('mediali');

            removeConclusion('lateral');
            removeConclusion('posterior');
            removeConclusion('medial');

            handlePrevStep6()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' onClick={handleNextStep6} className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        CORDONES
      </h1>
      <div>{ubicaciond2b()}</div>
    </div>
  );
};

// const StepE3 = ({ handleNextStep2, handlePrevStep2, handleNextStep4 }) => {
//   const {removeConclusion} = useContext(ReportContext)
//   return (
//     <div>
//       <div className='button-bar'>
//         <button  onClick={() => {
//             removeConclusion("AXONAL COMPLETA");
//             removeConclusion("con_denervación_difusa");
//             removeConclusion("con_denervación_abundante");
//             removeConclusion("con_denervación_progresiva");
//             removeConclusion("con_denervación discreta");
//             removeConclusion("sin_denervación");
//             removeConclusion("AXONAL INCOMPLETA");
//             removeConclusion("DESMIELINIZANTE");
//             removeConclusion("por_retardo_en_la_conduccion");
//             removeConclusion("por_bloqueo_parcial_en_la_conducción");
//             removeConclusion("por_bloqueo_completo_en_la_conduccion");
//             removeConclusion("MIXTA");
//             removeConclusion("primariamente_desmielinizante_con_perdida_axonal_secundaria");
//             removeConclusion("primariamente_axonal_con_desmielinizacion_secundaria");

//             handlePrevStep2()
//           }} className={`print-button`}>
//           <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
//         </button>

//         <button onClick={() => window.location.reload()} className={`print-button`}>
//         <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
//         </button>

//         <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
//         <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
//         </button>
//       </div>

//       <h1 className=' text-xl font-bold text-white'>
//         TIPO
//       </h1>
//       <AccordionContainer>
//       <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type="external">
//           <div onClick={handleNextStep2}>
//           <ConclusionButton value='con_denervación_difusa' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
//           <ConclusionButton value='con_denervación_abundante' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
//           <ConclusionButton value='con_denervación_progresiva' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
//           <ConclusionButton value='con_denervación discreta' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
//           <ConclusionButton value='sin_denervación' title=', DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
//           </div>
//         </Accordion>

//         <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type="external">
//           <div onClick={handleNextStep2}>
//           <ConclusionButton value='con_denervación_difusa' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
//           <ConclusionButton value='con_denervación_abundante' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
//           <ConclusionButton value='con_denervación_progresiva' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
//           <ConclusionButton value='con_denervación discreta' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
//           <ConclusionButton value='sin_denervación' title=', DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
//           </div>
//         </Accordion>

//         <Accordion title='DESMIELINIZANTE' value='DESMIELINIZANTE' type="external">
//           <div onClick={handleNextStep4}>
//           <ConclusionButton value='por_retardo_en_la_conduccion' title=', DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,' displayText={'RETARDO EN LA CONDUCCIÓN'}/>
//           <ConclusionButton value='por_bloqueo_parcial_en_la_conducción' title=', DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,' displayText={'BLOQUEO PARCIAL EN LA CONDUCCIÓN'}/>
//           <ConclusionButton value='por_bloqueo_completo_en_la_conduccion' title=', DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,' displayText={'BLOQUEO COMPLETO EN LA CONDUCCIÓN'}/>
//           </div>
//         </Accordion>

//         <Accordion title='MIXTA' value='MIXTA' type="external">
//           <div onClick={handleNextStep2}>
//           <ConclusionButton value='primariamente_desmielinizante_con_perdida_axonal_secundaria' title=', DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,' displayText={'DESMIELINIZANTE-AXONAL'}/>
//           <ConclusionButton value='primariamente_axonal_con_desmielinizacion_secundaria' title=', DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,' displayText={'AXONAL-DESMIELINIZANTE'}/>
//           </div>
//         </Accordion>
//         </AccordionContainer>
//     </div>
//   );
// };

const StepD3 = ({handlePrevStep2, handleNextStep2, ubicaciond3 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('preganglionar_totald');
            removeConclusion('holad');
            removeConclusion('postganglionar_totald');
            removeConclusion('ilihipogastrico_e_ilinguinald');
            removeConclusion('genitocrural_y_femorocutáneo_laterald');
            removeConclusion('plexo_lumbard');
            removeConclusion('plexo_lumbosacrod');
            removeConclusion('plexo_sacrod');
            removeConclusion('plexo_pudendod');
            removeConclusion('preganglionar_totali');
            removeConclusion('holai');
            removeConclusion('postganglionar_totali');
            removeConclusion('ilihipogastrico_e_ilinguinali');
            removeConclusion('genitocrural_y_femorocutáneo_laterali');
            removeConclusion('plexo_lumbari');
            removeConclusion('plexo_lumbosacroi');
            removeConclusion('plexo_sacroi');
            removeConclusion('plexo_pudendoi');
            removeConclusion('preganglionar_total');
            removeConclusion('hola');
            removeConclusion('postganglionar_total');
            removeConclusion('ilihipogastrico_e_ilinguinal');
            removeConclusion('genitocrural_y_femorocutáneo_lateral');
            removeConclusion('plexo_lumbar');
            removeConclusion('plexo_lumbosacro');
            removeConclusion('plexo_sacro');
            removeConclusion('plexo_pudendo');


            removeConclusion('L2d');
            removeConclusion('L3d');
            removeConclusion('L4d');
            removeConclusion('L5d');
            removeConclusion('S1d');
            removeConclusion('S2d');

            removeConclusion('L2i');
            removeConclusion('L3i');
            removeConclusion('L4i');
            removeConclusion('L5i');
            removeConclusion('S1i');
            removeConclusion('S2i');

            removeConclusion('L2');
            removeConclusion('L3');
            removeConclusion('L4');
            removeConclusion('L5');
            removeConclusion('S1');
            removeConclusion('S2');

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>


        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        UBICACION
      </h1>

      <div>{ubicaciond3()}</div>
    </div>
  );
};

const StepD3A = ({ handleNextStep7, handlePrevStep2, ubicaciond3a }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion('L2d');
            removeConclusion('L3d');
            removeConclusion('L4d');
            removeConclusion('L5d');
            removeConclusion('S1d');
            removeConclusion('S2d');

            removeConclusion('L2i');
            removeConclusion('L3i');
            removeConclusion('L4i');
            removeConclusion('L5i');
            removeConclusion('S1i');
            removeConclusion('S2i');

            removeConclusion('L2');
            removeConclusion('L3');
            removeConclusion('L4');
            removeConclusion('L5');
            removeConclusion('S1');
            removeConclusion('S2');

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' onClick={handleNextStep7} className={`print-button dont-print `}>
          <img src="/I_In.svg" alt="Imprimir" style={{filter: 'invert(1)'}} />
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        DIVISIONES
      </h1>
      <div>{ubicaciond3a()}</div>
    </div>
  );
};

const StepD1 = ({ handleNextStep, handlePrevStep, handleNextStep4 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("AXONAL COMPLETA");
            removeConclusion("con_denervación_difusa");
            removeConclusion("con_denervación_abundante");
            removeConclusion("con_denervación_progresiva");
            removeConclusion("con_denervación discreta");
            removeConclusion("sin_denervación");
            removeConclusion("AXONAL INCOMPLETA");
            removeConclusion("DESMIELINIZANTE");
            removeConclusion("por_retardo_en_la_conduccion");
            removeConclusion("por_bloqueo_parcial_en_la_conducción");
            removeConclusion("por_bloqueo_completo_en_la_conduccion");
            removeConclusion("MIXTA");
            removeConclusion("primariamente_desmielinizante_con_perdida_axonal_secundaria");
            removeConclusion("primariamente_axonal_con_desmielinizacion_secundaria");

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
        TIPO
      </h1>
      <AccordionContainer>
        <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type="external">
          <div onClick={handleNextStep}>
          <ConclusionButton value='con_denervación_difusa' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
          <ConclusionButton value='con_denervación_abundante' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
          <ConclusionButton value='con_denervación_progresiva' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
          <ConclusionButton value='con_denervación discreta' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
          <ConclusionButton value='sin_denervación' title=' DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,' displayText={'AUSENTE'}/>
          </div>
        </Accordion>

        <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type="external">
          <div onClick={handleNextStep}>
          <ConclusionButton value='con_denervación_difusa' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
          <ConclusionButton value='con_denervación_abundante' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
          <ConclusionButton value='con_denervación_progresiva' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
          <ConclusionButton value='con_denervación discreta' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
          <ConclusionButton value='sin_denervación' title=' DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
          </div>
        </Accordion>

        <Accordion title='DESMIELINIZANTE' value='DESMIELINIZANTE' type="external">
          <div onClick={handleNextStep4}>
          <ConclusionButton value='por_retardo_en_la_conduccion' title=' DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,' displayText={'RETARDO EN LA CONDUCCIÓN'}/>
          <ConclusionButton value='por_bloqueo_parcial_en_la_conducción' title=' DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,' displayText={'BLOQUEO PARCIAL EN LA CONDUCCIÓN'}/>
          <ConclusionButton value='por_bloqueo_completo_en_la_conduccion' title=' DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,' displayText={'BLOQUEO COMPLETO EN LA CONDUCCIÓN'}/>
          </div>
        </Accordion>

        <Accordion title='MIXTA' value='MIXTA' type="external">
          <div onClick={handleNextStep}>
          <ConclusionButton value='primariamente_desmielinizante_con_perdida_axonal_secundaria' title=' DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,' displayText={'DESMIELINIZANTE-AXONAL'}/>
          <ConclusionButton value='primariamente_axonal_con_desmielinizacion_secundaria' title=' DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,' displayText={'AXONAL-DESMIELINIZANTE'}/>
          </div>
        </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepE2 = ({ handleNextStep1, handlePrevStep1, handleNextStep4 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("AXONAL COMPLETA");
            removeConclusion("con_denervación_difusa");
            removeConclusion("con_denervación_abundante");
            removeConclusion("con_denervación_progresiva");
            removeConclusion("con_denervación discreta");
            removeConclusion("sin_denervación");
            removeConclusion("AXONAL INCOMPLETA");
            removeConclusion("DESMIELINIZANTE");
            removeConclusion("por_retardo_en_la_conduccion");
            removeConclusion("por_bloqueo_parcial_en_la_conducción");
            removeConclusion("por_bloqueo_completo_en_la_conduccion");
            removeConclusion("MIXTA");
            removeConclusion("primariamente_desmielinizante_con_perdida_axonal_secundaria");
            removeConclusion("primariamente_axonal_con_desmielinizacion_secundaria");

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep1} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        TIPO
      </h1>
      <AccordionContainer>
      <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type="external">
          <div onClick={handleNextStep1}>
          <ConclusionButton value='con_denervación_difusa' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
          <ConclusionButton value='con_denervación_abundante' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
          <ConclusionButton value='con_denervación_progresiva' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
          <ConclusionButton value='con_denervación discreta' title=' DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
          <ConclusionButton value='sin_denervación' title=' DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
          </div>
        </Accordion>

        <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type="external">
          <div onClick={handleNextStep1}>
          <ConclusionButton value='con_denervación_difusa' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
          <ConclusionButton value='con_denervación_abundante' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
          <ConclusionButton value='con_denervación_progresiva' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
          <ConclusionButton value='con_denervación discreta' title=' DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
          <ConclusionButton value='sin_denervación' title=' DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
          </div>
        </Accordion>

        <Accordion title='DESMIELINIZANTE' value='DESMIELINIZANTE' type="external">
          <div onClick={handleNextStep4}>
          <ConclusionButton value='por_retardo_en_la_conduccion' title=' DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,' displayText={'RETARDO EN LA CONDUCCIÓN'}/>
          <ConclusionButton value='por_bloqueo_parcial_en_la_conducción' title=' DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,' displayText={'BLOQUEO PARCIAL EN LA CONDUCCIÓN'}/>
          <ConclusionButton value='por_bloqueo_completo_en_la_conduccion' title=' DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,' displayText={'BLOQUEO COMPLETO EN LA CONDUCCIÓN'}/>
          </div>
        </Accordion>

        <Accordion title='MIXTA'value='MIXTA' type="external">
          <div onClick={handleNextStep1} >
          <ConclusionButton value='primariamente_desmielinizante_con_perdida_axonal_secundaria' title=' DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,' displayText={'DESMIELINIZANTE-AXONAL'}/>
          <ConclusionButton value='primariamente_axonal_con_desmielinizacion_secundaria' title=' DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,' displayText={'AXONAL-DESMIELINIZANTE'}/>
          </div>
        </Accordion>
        </AccordionContainer>
    </div>
  );
};

const StepE3 = ({ handleNextStep2, handlePrevStep2, handleNextStep4 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("AXONAL COMPLETA");
            removeConclusion("con_denervación_difusa");
            removeConclusion("con_denervación_abundante");
            removeConclusion("con_denervación_progresiva");
            removeConclusion("con_denervación discreta");
            removeConclusion("sin_denervación");
            removeConclusion("AXONAL INCOMPLETA");
            removeConclusion("DESMIELINIZANTE");
            removeConclusion("por_retardo_en_la_conduccion");
            removeConclusion("por_bloqueo_parcial_en_la_conducción");
            removeConclusion("por_bloqueo_completo_en_la_conduccion");
            removeConclusion("MIXTA");
            removeConclusion("primariamente_desmielinizante_con_perdida_axonal_secundaria");
            removeConclusion("primariamente_axonal_con_desmielinizacion_secundaria");

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>

      <h1 className=' text-xl font-bold text-white'>
        TIPO
      </h1>
      <AccordionContainer>
      <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type="external">
          <div onClick={handleNextStep2}>
          <ConclusionButton value='con_denervación_difusa' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
          <ConclusionButton value='con_denervación_abundante' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
          <ConclusionButton value='con_denervación_progresiva' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
          <ConclusionButton value='con_denervación discreta' title=', DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
          <ConclusionButton value='sin_denervación' title=', DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
          </div>
        </Accordion>

        <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type="external">
          <div onClick={handleNextStep2}>
          <ConclusionButton value='con_denervación_difusa' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),' displayText={'DIFUSA (++++)'}/>
          <ConclusionButton value='con_denervación_abundante' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),' displayText={'ABUNDANTE (+++)'}/>
          <ConclusionButton value='con_denervación_progresiva' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),' displayText={'PROGRESIVA (++)'}/>
          <ConclusionButton value='con_denervación discreta' title=', DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),' displayText={'DISCRETA (+/+)'}/>
          <ConclusionButton value='sin_denervación' title=', DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,' displayText={'ASUSENTE'}/>
          </div>
        </Accordion>

        <Accordion title='DESMIELINIZANTE' value='DESMIELINIZANTE' type="external">
          <div onClick={handleNextStep4}>
          <ConclusionButton value='por_retardo_en_la_conduccion' title=', DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,' displayText={'RETARDO EN LA CONDUCCIÓN'}/>
          <ConclusionButton value='por_bloqueo_parcial_en_la_conducción' title=', DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,' displayText={'BLOQUEO PARCIAL EN LA CONDUCCIÓN'}/>
          <ConclusionButton value='por_bloqueo_completo_en_la_conduccion' title=', DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,' displayText={'BLOQUEO COMPLETO EN LA CONDUCCIÓN'}/>
          </div>
        </Accordion>

        <Accordion title='MIXTA' value='MIXTA' type="external">
          <div onClick={handleNextStep2}>
          <ConclusionButton value='primariamente_desmielinizante_con_perdida_axonal_secundaria' title=', DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,' displayText={'DESMIELINIZANTE-AXONAL'}/>
          <ConclusionButton value='primariamente_axonal_con_desmielinizacion_secundaria' title=', DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,' displayText={'AXONAL-DESMIELINIZANTE'}/>
          </div>
        </Accordion>
        </AccordionContainer>
    </div>
  );
};

const StepE1 = ({ handlePrevStep, handleNextStep }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
      <button  onClick={() => {
            removeConclusion("intensidad_leve");
            removeConclusion("intensidad_leverada");
            removeConclusion("intensidad_severa");

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
        <ConclusionButton value='intensidad_leve' title=' INTENSIDAD LEVE. ' displayText={'LEVE '}/>
        <ConclusionButton value='intensidad_leverada' title=' INTENSIDAD MODERADA. ' displayText={'MODERADA '}/>
        <ConclusionButton value='intensidad_severa' title=' INTENSIDAD SEVERA. ' displayText={'SEVERA '}/>
      </div>
    </div>
  );
};

const StepF2 = ({ handlePrevStep1, handleNextStep1 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("intensidad_leve");
            removeConclusion("intensidad_leverada");
            removeConclusion("intensidad_severa");

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep1} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>
      
      <div onClick={ handleNextStep1 }>
        <ConclusionButton value='intensidad_leve' title=' INTENSIDAD LEVE. ' displayText={'LEVE '}/>
        <ConclusionButton value='intensidad_leverada' title=' INTENSIDAD MODERADA. ' displayText={'MODERADA '}/>
        <ConclusionButton value='intensidad_severa' title=' INTENSIDAD SEVERA. ' displayText={'SEVERA '}/>
      </div>

      
    </div>
  );
};

const StepF3 = ({ handlePrevStep2, handleNextStep2 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("intensidad_leve");
            removeConclusion("intensidad_leverada");
            removeConclusion("intensidad_severa");

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        INTENSIDAD
      </h1>
      
      <div onClick={ handleNextStep2 }>
        <ConclusionButton value='intensidad_leve' title=' INTENSIDAD LEVE. ' displayText={'LEVE '}/>
        <ConclusionButton value='intensidad_leverada' title=' INTENSIDAD MODERADA. ' displayText={'MODERADA '}/>
        <ConclusionButton value='intensidad_severa' title=' INTENSIDAD SEVERA. ' displayText={'SEVERA '}/>
      </div>

      
    </div>
  );
};

const StepF1 = ({ handleNextStep, handlePrevStep }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("reinervacion_activa");
            removeConclusion("sin_reinervacion_inactiva");

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
        REINERVACIÓN
      </h1>

      <div onClick={ handleNextStep }>
        <ConclusionButton value='reinervacion_activa' title='REINERVACIÓN ACTIVA;' displayText={'ACTIVA'}/>                
        <ConclusionButton value='sin_reinervacion_inactiva' title='REINERVACIÓN INACTIVA;' displayText={'INACTIVA'}/>
      </div>
      
      
    </div>
  );
};

const StepG2 = ({ handleNextStep1, handlePrevStep1 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("reinervacion_activa");
            removeConclusion("sin_reinervacion_inactiva");

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep1} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={ handleNextStep1 }>
        <ConclusionButton value='reinervacion_activa' title='REINERVACIÓN ACTIVA; ' displayText={'ACTIVA'}/>                
        <ConclusionButton value='sin_reinervacion_inactiva' title='REINERVACIÓN INACTIVA; ' displayText={'INACTIVA'}/>
      </div>
      
      
    </div>
  );
};

const StepG3 = ({ handleNextStep2, handlePrevStep2 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("reinervacion_activa");
            removeConclusion("sin_reinervacion_inactiva");

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        REINERVACIÓN
      </h1>

      <div onClick={ handleNextStep2 }>
        <ConclusionButton value='reinervacion_activa' title='REINERVACIÓN ACTIVA; ' displayText={'ACTIVA'}/>
        <ConclusionButton value='sin_reinervacion_inactiva' title='REINERVACIÓN INACTIVA; ' displayText={'INACTIVA'}/>
      </div>
      
      
    </div>
  );
};

const StepG1 = ({handlePrevStep, handleNextStep }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("completo");
            removeConclusion("parcial_funcional");
            removeConclusion("pobre");
            removeConclusion("nulo");

            handlePrevStep()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO
      </h1><div onClick={handleNextStep}>
        <ConclusionButton value = 'completo' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'}/>
        <ConclusionButton value = 'parcial_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL'}/>
        <ConclusionButton value = 'pobre' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'displayText={'POBRE NO FUNCIONAL'} />
        <ConclusionButton value = 'nulo' title = ' PRNÓSTICO DE RECUPERACIÓN NULO.' displayText={'RECUPERACIÓN NULO'}/></div>
    </div>
  );
};

const StepH2 = ({handlePrevStep1, handleNextStep1 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("completo");
            removeConclusion("parcial_funcional");
            removeConclusion("pobre");
            removeConclusion("nulo");

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO
      </h1><div onClick={handleNextStep1}>
        <ConclusionButton value = 'completo' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'}/>
        <ConclusionButton value = 'parcial_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL'}/>
        <ConclusionButton value = 'pobre' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'displayText={'POBRE NO FUNCIONAL'} />
        <ConclusionButton value = 'nulo' title = ' PRNÓSTICO DE RECUPERACIÓN NULO.' displayText={'RECUPERACIÓN NULO'}/></div>
    </div>
  );
};

const StepH3 = ({handlePrevStep2, handleNextStep2 }) => {
  const {removeConclusion} = useContext(ReportContext)
  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("completo");
            removeConclusion("parcial_funcional");
            removeConclusion("pobre");
            removeConclusion("nulo");

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handleNextStep2} id='prev' className={`print-button dont-print `}>
        <img src="/I_X.webp" style={{filter: 'invert(0.5)'}}/>
        </button>
      </div>
      <h1 className=' text-xl font-bold text-white'>
        PRONÓSTICO
      </h1>
      <div onClick={handleNextStep2}>
        <ConclusionButton value = 'completo' title = ' PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'}/>
        <ConclusionButton value = 'parcial_funcional' title = ' PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL'}/>
        <ConclusionButton value = 'pobre' title = ' PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.'displayText={'POBRE NO FUNCIONAL'} />
        <ConclusionButton value = 'nulo' title = ' PRNÓSTICO DE RECUPERACIÓN NULO.' displayText={'RECUPERACIÓN NULO'}/></div>
    </div>
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
  


  const StepI = ({ handlePrevStep, handleUndo, handleImageChange, handlePrint}) => {
    const {removeConclusion} = useContext(ReportContext)
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
        <button  onClick={() => {
            removeConclusion("completo");
            removeConclusion("parcial_funcional");
            removeConclusion("pobre");
            removeConclusion("nulo");

            handlePrevStep()
          }} className={`print-button`}>
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

const StepI1 = ({ handlePrevStep1, handleUndo, handleImageChange, handlePrint }) => {
  const {removeConclusion} = useContext(ReportContext)
  const [expandedDivs, setExpandedDivs] = useState({}); // Estado para manejar el tamaño de cada div

  const toggleDivSize = (index) => {
    // Cambiar el estado del tamaño del div al hacer clic
    setExpandedDivs((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre true/false para expandir o contraer
    }));
  };


    const [imageSrc, setImageSrc] = useState(null);

    // Función para manejar la carga de la imagen
    const handleImageUpload = (event) => {
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

  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("completo");
            removeConclusion("parcial_funcional");
            removeConclusion("pobre");
            removeConclusion("nulo");

            handlePrevStep1()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`}>
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

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

const StepI2 = ({ handlePrevStep2, handleUndo, handleImageChange, handlePrint }) => {
  const {removeConclusion} = useContext(ReportContext)
  const [expandedDivs, setExpandedDivs] = useState({}); // Estado para manejar el tamaño de cada div

  const toggleDivSize = (index) => {
    // Cambiar el estado del tamaño del div al hacer clic
    setExpandedDivs((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre true/false para expandir o contraer
    }));
  };


    const [imageSrc, setImageSrc] = useState(null);

    // Función para manejar la carga de la imagen
    const handleImageUpload = (event) => {
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

  return (
    <div>
      <div className='button-bar'>
        <button  onClick={() => {
            removeConclusion("completo");
            removeConclusion("parcial_funcional");
            removeConclusion("pobre");
            removeConclusion("nulo");

            handlePrevStep2()
          }} className={`print-button`}>
          <img src="/I_Out.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={handlePrint} className={`print-button`}>
          <img src="/I_Print.svg" style={{filter: 'invert(1)'}}/>
        </button>

        <button onClick={() => window.location.reload()} className={`print-button`}>
        <img src="/I_Repeat.svg" style={{filter: 'invert(1)'}}/>
        </button>

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
export default SimpleMultiStepForm;