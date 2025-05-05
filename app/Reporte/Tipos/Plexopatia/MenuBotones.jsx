import { ReportContext, DropContext } from '@/src/context';
import { useContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContainer,
  darvalor,
  InternalAccordionContainer
} from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import MenuImagenes from '../../../components/ReportTemplate/DinamicImagesMenu';
import { useImageState } from '../../MetodosBotones';
import ReportFace from './ReportFace';

/**
 * NOTA: Si en algún futuro quisieras simplificar todavía más la lógica de
 * "siguiente paso" y "paso anterior", podrías agrupar todos tus pasos en
 * un array y recorrerlo con un índice actual. Pero por ahora, esta limpieza
 * elimina lo que no se usaba y mantiene la misma lógica.
 */

// -- Array de pasos usado en caso de que quieras renderizar la numeración arriba --
const stepsArray = [
  'A1','B1','B2','B3','C1','C2','C3',
  'D1','D2','D3','E1','E2','E3','F1',
  'F2','F3','G1','G2','G3','H2','H3',
  'D2A','D3A','I1','I2','I3'
];

// ----------------------------------------------------------------------------

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
  setExpandedDivs
}) => {
  const [step, setStep] = useState('A');
  const [myVariable, setMyVariable] = useState([]);
  const [myVariable1, setMyVariable1] = useState([]);
  const [myVariable2, setMyVariable2] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, []);

  const { selectedImages, history, handleUndo, handlePrint } = useImageState();

  // Ejemplos de funciones que asignan valores a estados, por si las usas en tu flujo
  const assignFirstValue = () => {
    setMyVariable((prevValues) => [...prevValues, "First Value"]);
  };
  const assignSecondValue = () => {
    setMyVariable((prevValues) => [...prevValues, "Second Value"]);
  };
  const assignThirdValue = () => {
    setMyVariable((prevValues) => [...prevValues, "Third Value"]);
  };
  const ladoizquierda = () => {
    setMyVariable1((prevValues) => [...prevValues, "b"]);
  };
  const ladoderecho = () => {
    setMyVariable1((prevValues) => [...prevValues, "a"]);
  };
  const ladobilateral = (e) => {
    e.stopPropagation();
    setMyVariable1((prevValues) => [...prevValues, "c"]);
    handleNextStep1(); // Avanza al siguiente paso
  };
  
  
  const ladoizquierda1 = () => {
    setMyVariable2((prevValues) => [...prevValues, "b"]);
  };
  const ladoderecho1 = () => {
    setMyVariable2((prevValues) => [...prevValues, "a"]);
  };
  const ladobilateral1 = () => {
    setMyVariable2((prevValues) => [...prevValues, "c"]);
  };

  /**
   *  Retornos condicionales
   *  Para tu UI en D2, D2A, D2B, D3, D3A
   */
  const ubicaciond2 = () => {
    if (myVariable1.includes("a")) {
      return (<div>
        
        <div onClick={ handleNextStep1 }>
          <ConclusionButton value='troncosD' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
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
        <Accordion value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}  type='external'>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='troncosD' title=' POSTGANGLIONAR TOTAL A NIVEL DE TRONCOS' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='CordonD' title=' POSTGANGLIONAR TOTAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='CordonD' title=' POSTGANGLIONAR TOTAL A NIVEL DE CORDONES' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion value='prueba1000' title=' POSTGANGLIONAR PARCIAL' displayText={'POSTGANGLIONAR PARCIAL'} type='external'>
          <div onClick={handleNextStep5}>
            <ConclusionButton value='tron1000d' title=' POSTGANGLIONAR PARCIAL A NIVEL DE TRONCO' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='CordonD' title=' POSTGANGLIONAR PARCIAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
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
          <ConclusionButton value='troncosI' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
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

        <Accordion value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='troncosI' title=' POSTGANGLIONAR TOTAL A NIVEL DE TRONCOS' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='CordonI' title=' POSTGANGLIONAR TOTAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='CordonI' title=' POSTGANGLIONAR TOTAL A NIVEL DE CORDONES' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
      
        <Accordion value='prueba1000' title=' POSTGANGLIONAR PARCIAL' displayText={'POSTGANGLIONAR PARCIAL'}>
          <div onClick={handleNextStep5}>
            <ConclusionButton value='tron1000i' title=' POSTGANGLIONAR PARCIAL A NIVEL DE TRONCO' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='CordonI' title=' POSTGANGLIONAR PARCIAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
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
          <ConclusionButton value='troncosB' title=' PREGANGLIONAR TOTAL' displayText={'PREGANGLIONAR TOTAL'}/>
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

        <Accordion value='post_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='troncosB' title=' POSTGANGLIONAR TOTAL A NIVEL DE TRONCOS' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='CordonB' title=' POSTGANGLIONAR TOTAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
          </div>
          <div onClick={handleNextStep1}>
            <ConclusionButton value='CordonB' title=' POSTGANGLIONAR TOTAL A NIVEL DE CORDONES' displayText={'CORDONES (INFRACLAVICULAR)'}/>
          </div>
        </Accordion>
      
        <Accordion value='prueba1000' title=' POSTGANGLIONAR PARCIAL' displayText={'POSTGANGLIONAR PARCIAL'}>
          <div onClick={handleNextStep5}>
            <ConclusionButton value='tron1000' title=' POSTGANGLIONAR PARCIAL A NIVEL DE TRONCO' displayText={'TRONCOS (SUPRACLAVICULAR)'}/>
          </div>
          <div onClick={ handleNextStep1 }>
            <ConclusionButton value='CordonB' title=' POSTGANGLIONAR PARCIAL A NIVEL DE DIVISIONES' displayText={'DIVISIONES (CLAVICULAR)'}/>
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
          <ConclusionButton value='postganglionar_totald' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}/>
        </div>
        <AccordionContainer>
        <Accordion title='POSTGANGLIONAR PARCIAL' value='POSTGANGLIONAR PARCIAL' type='external'> 
            <div onClick={ handleNextStep2 }>
              <ConclusionButton value='ilihipogastrico_e_ilinguinald' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (ILIOHIPOGÁSTRICO E ILIOINGUINAL)' displayText={'PLEXO LUMBAR (ILIOHIPOGÁSTRICO E ILIOINGUINAL)'}/>
              <ConclusionButton value='genitocrural_y_femorocutáneo_laterald' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (GENITOCRURAL Y FEMOROCUTÁNEO LATERAL)' displayText={'PLEXO LUMBAR (GENITOCRURAL Y FEMOROCUTÁNEO LATERAL)'}/>
              <ConclusionButton value='plexo_lumbard' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (FEMORAL Y OBTURADOR)' displayText={'PLEXO LUMBAR (FEMORAL Y OBTURADOR)'}/>
              <ConclusionButton value='plexo_lumbosacrod' title=' POSTGANGLIONAR PARCIAL A NIVEL DE TRONCO LUMBOSACRO (CIÁTICO MENOR Y MAYOR)' displayText={'TRONCO LUMBOSACRO (CIÁTICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_sacrod' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO SACRO' displayText={'PLEXO SACRO'}/>
              <ConclusionButton value='plexo_pudendod' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO PUDENDO' displayText={'PLEXO PUDENDO'}/>
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
          <ConclusionButton value='postganglionar_totali' title=' POSTGANGLIONAR TOTAL' displayText={'POSTGANGLIONAR TOTAL'}/>
        </div>
        <AccordionContainer>
        <Accordion title='POSTGANGLIONAR PARCIAL' value='POSTGANGLIONAR PARCIAL' type='external'>
            <div onClick={ handleNextStep2 }>
              <ConclusionButton value='ilihipogastrico_e_ilinguinali' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (ILIOHIPOGÁSTRICO E ILIOINGUINAL)' displayText={'PLEXO LUMBAR (ILIOHIPOGÁSTRICO E ILIOINGUINAL)'}/>
              <ConclusionButton value='genitocrural_y_femorocutáneo_laterali' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (GENITOCRURAL Y FEMOROCUTÁNEO LATERAL)' displayText={'PLEXO LUMBAR (GENITOCRURAL Y FEMOROCUTÁNEO LATERAL)'}/>
              <ConclusionButton value='plexo_lumbari' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (FEMORAL Y OBTURADOR)' displayText={'PLEXO LUMBAR (FEMORAL Y OBTURADOR)'}/>
              <ConclusionButton value='plexo_lumbosacroi' title=' POSTGANGLIONAR PARCIAL A NIVEL DE TRONCO LUMBOSACRO (CIÁTICO MENOR Y MAYOR)' displayText={'TRONCO LUMBOSACRO (CIÁTICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='pre_Sacroi' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO SACRO' displayText={'PLEXO SACRO'}/>
              <ConclusionButton value='plexo_pudendoi' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO PUDENDO' displayText={'PLEXO PUDENDO'}/>
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
        <Accordion title='POSTGANGLIONAR PARCIAL'>
            <div onClick={ handleNextStep2 }>
              <ConclusionButton value='ilihipogastrico_e_ilinguinal' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (ILIOHIPOGÁSTRICO E ILIOINGUINAL' displayText={'PLEXO LUMBAR (ILIOHIPOGÁSTRICO E ILIOINGUINAL)'}/>
              <ConclusionButton value='genitocrural_y_femorocutáneo_lateral' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (GENITOCRURAL Y FEMOROCUTÁNEO LATERAL)' displayText={'PLEXO LUMBAR (GENITOCRURAL Y FEMOROCUTÁNEO LATERAL)'}/>
              <ConclusionButton value='plexo_lumbar' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO LUMBAR (FEMORAL Y OBTURADOR)' displayText={'PLEXO LUMBAR (FEMORAL Y OBTURADOR)'}/>
              <ConclusionButton value='plexo_lumbosacro' title=' POSTGANGLIONAR PARCIAL A NIVEL DE TRONCO LUMBOSACRO (CIÁTICO MENOR Y MAYOR)' displayText={'TRONCO LUMBOSACRO (CIÁTICO MENOR Y MAYOR)'}/>
              <ConclusionButton value='plexo_sacro' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO SACRO' displayText={'PLEXO SACRO'}/>
              <ConclusionButton value='plexo_pudendo' title=' POSTGANGLIONAR PARCIAL A NIVEL DE PLEXO PUDENDO' displayText={'PLEXO PUDENDO'}/>
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
  // -------------------------------------------------
  // Manejo de pasos para "CERVICAL" y "BRAQUIAL" y "LUMBOSACRO"
  // -------------------------------------------------

  const handleNextStep = () => {
    if (step === 'A') setStep('B1');
    else if (step === 'B1') setStep('C1');
    else if (step === 'C1') setStep('D1');
    else if (step === 'D1') setStep('E1');
    else if (step === 'E1') setStep('F1');
    else if (step === 'F1') setStep('G1');
    else if (step === 'G1') setStep('I');
  };

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

  // Pasos extra
  const handleNextStep4 = () => {
    if (step === 'E3') setStep('H3');
    else if (step === 'E2') setStep('H2');
    else if (step === 'D1') setStep('G1');
  };
  const handleNextStep5 = () => {
    if (step === 'D2') setStep('D2A');
    else if (step === 'D2A') setStep('E2');
  };
  const handleNextStep6 = () => {
    if (step === 'D2') setStep('D2B');
    else if (step === 'D2B') setStep('E2');
  };
  const handleNextStep7 = () => {
    if (step === 'D3') setStep('D3A');
    else if (step === 'D3A') setStep('E3');
  };
  const handlePrevStep5 = () => {
    if (step === 'E2') setStep('D2A');
    else if (step === 'D2A') setStep('D2');
  };
  const handlePrevStep6 = () => {
    if (step === 'E2') setStep('D2B');
    else if (step === 'D2B') setStep('D2');
  };
  const handlePrevStep7 = () => {
    if (step === 'E3') setStep('D3A');
    else if (step === 'D3A') setStep('D3');
  };

  // Render de la barra superior de pasos (sólo si lo usas realmente):
  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === 'Final') return null;
    return (
      <section className="mt-2 mb-4 flex justify-between">
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
      {/* Si NO quieres ver la numeración arriba, comenta o quita la línea de abajo */}
      {/* {renderTopStepNumbers()} */}

      {step === 'A' && (
        <StepA
          handleNextStep={handleNextStep}
          handleNextStep1={handleNextStep1}
          handleNextStep2={handleNextStep2}
        />
      )}
      {step === 'B1' && <StepB1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'B2' && (
        <StepB2
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
          ladoizquierda={ladoizquierda}
          ladoderecho={ladoderecho}
          ladobilateral={ladobilateral}
        />
      )}
      {step === 'B3' && (
        <StepB3
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
          ladoizquierda1={ladoizquierda1}
          ladoderecho1={ladoderecho1}
          ladobilateral1={ladobilateral1}
        />
      )}

      {step === 'C1' && <StepC1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'C2' && (
        <StepC2 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />
      )}
      {step === 'C3' && (
        <StepC3 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />
      )}
      {step === 'D1' && (
        <StepD1
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleNextStep4={handleNextStep4}
        />
      )}
      {step === 'D2' && (
        <StepD2
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
          handleNextStep5={handleNextStep5}
          handleNextStep6={handleNextStep6}
          ubicaciond2={ubicaciond2}
        />
      )}
      {step === 'D2A' && (
        <StepD2A
          handleNextStep5={handleNextStep5}
          handlePrevStep5={handlePrevStep5}
          ubicaciond2a={ubicaciond2a}
          assignFirstValue={assignFirstValue}
          assignSecondValue={assignSecondValue}
          assignThirdValue={assignThirdValue}
        />
      )}
      {step === 'D2B' && (
        <StepD2B
          handleNextStep6={handleNextStep6}
          handlePrevStep6={handlePrevStep6}
          ubicaciond2b={ubicaciond2b}
        />
      )}
      {step === 'D3' && (
        <StepD3
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
          handleNextStep7={handleNextStep7}
          handlePrevStep7={handlePrevStep7}
          ubicaciond3={ubicaciond3}
        />
      )}
      {step === 'D3A' && (
        <StepD3A
          handleNextStep2={handleNextStep2}
          handleNextStep7={handleNextStep7}
          handlePrevStep7={handlePrevStep7}
          ubicaciond3a={ubicaciond3a}
        />
      )}
      {step === 'E1' && <StepE1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'E2' && (
        <StepE2
          handlePrevStep1={handlePrevStep1}
          handleNextStep1={handleNextStep1}
          handleNextStep4={handleNextStep4}
        />
      )}
      {step === 'E3' && (
        <StepE3
          handlePrevStep2={handlePrevStep2}
          handleNextStep2={handleNextStep2}
          handleNextStep4={handleNextStep4}
        />
      )}
      {step === 'F1' && <StepF1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'F2' && (
        <StepF2 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />
      )}
      {step === 'F3' && (
        <StepF3 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />
      )}
      {step === 'G1' && <StepG1 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />}
      {step === 'G2' && (
        <StepG2 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />
      )}
      {step === 'G3' && (
        <StepG3 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />
      )}
      {step === 'H2' && (
        <StepH2 handlePrevStep1={handlePrevStep1} handleNextStep1={handleNextStep1} />
      )}
      {step === 'H3' && (
        <StepH3 handlePrevStep2={handlePrevStep2} handleNextStep2={handleNextStep2} />
      )}

      {step === 'I' && (
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
      )}
      {step === 'I1' && (
        <StepI1
          handlePrevStep1={handlePrevStep1}
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
      )}
      {step === 'I2' && (
        <StepI2
          handlePrevStep2={handlePrevStep2}
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
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Definición de cada Step (para no romper tu estructura original)
// -----------------------------------------------------------------------------

const StepA = ({ handleNextStep, handleNextStep1, handleNextStep2 }) => {
  return (
    <div>
      <div className="button-bar">
        <button className="print-button">
          <img src="" style={{ filter: 'invert(0.5)' }} />
        </button>
        <button className="print-button">
          <img src="" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">PLEXO</h1>
      <div onClick={darvalor}>
        <div onClick={handleNextStep}>
          <ConclusionButton
            value="plexopatia_cervical"
            title="PLEXOPATÍA CERVICAL"
            displayText="CERVICAL"
          />
        </div>
        <div onClick={handleNextStep1}>
          <ConclusionButton
            value="plexopatia_braquial"
            title="PLEXOPATÍA BRAQUIAL"
            displayText="BRAQUIAL"
          />
        </div>
        <div onClick={handleNextStep2}>
          <ConclusionButton
            value="plexopatia_lumbosacra"
            title="PLEXOPATÍA LUMBOSACRA"
            displayText="LUMBOSACRO"
          />
        </div>
      </div>
    </div>
  );
};

const StepB1 = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext);

  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('izquierda_C');
            removeConclusion('derecha_C');
            removeConclusion('bilateral_C');
            removeConclusion('plexopatia_cervical');
            removeConclusion('plexopatia_braquial');
            removeConclusion('plexopatia_lumbosacra');
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" className="print-button dont-print">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">LADO</h1>
      <div onClick={handleNextStep}>
        <ConclusionButton value="izquierda_C" title=" IZQUIERDA," displayText="IZQUIERDO" />
        <ConclusionButton
          value="derecha_C"
          title=" DERECHA"
          displayText="DERECHO"
          dangerouslySetInnerHTML={{ __html: 'DERECHA,<br>' }}
        />
        <ConclusionButton value="bilateral_C" title=" BILATERAL," displayText="BILATERAL" />
      </div>
    </div>
  );
};

const StepB2 = ({
  handleNextStep1,
  handlePrevStep1,
  ladoizquierda,
  ladoderecho,
  ladobilateral
}) => {
  const { removeConclusion } = useContext(ReportContext);

  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('izquierda');
            removeConclusion('derecha');
            removeConclusion('bilateral');
            removeConclusion('plexopatia_cervical');
            removeConclusion('plexopatia_braquial');
            removeConclusion('plexopatia_lumbosacra');
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">LADO</h1>
      <div onClick={handleNextStep1}>
        <div onClick={ladoizquierda}>
          <ConclusionButton value="izquierda" title=" IZQUIERDA," displayText="IZQUIERDO" />
        </div>
        <div onClick={ladoderecho}>
          <ConclusionButton value="derecha" title=" DERECHA," displayText="DERECHO" />
        </div>
        <div onClick={ladobilateral}>
          <ConclusionButton value="bilateral" title=" BILATERAL," displayText="BILATERAL" />
        </div>
      </div>
    </div>
  );
};

const StepB3 = ({
  handleNextStep2,
  handlePrevStep2,
  ladoizquierda1,
  ladoderecho1,
  ladobilateral1
}) => {
  const { removeConclusion } = useContext(ReportContext);

  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('izquierda');
            removeConclusion('derecha');
            removeConclusion('bilateral');
            removeConclusion('plexopatia_cervical');
            removeConclusion('plexopatia_braquial');
            removeConclusion('plexopatia_lumbosacra');
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">LADO</h1>
      <div onClick={handleNextStep2}>
        <div onClick={ladoizquierda1}>
          <ConclusionButton value="izquierda" title=" IZQUIERDA," displayText="IZQUIERDO" />
        </div>
        <div onClick={ladoderecho1}>
          <ConclusionButton value="derecha" title=" DERECHA," displayText="DERECHO" />
        </div>
        <div onClick={ladobilateral1}>
          <ConclusionButton value="bilateral" title=" BILATERAL," displayText="BILATERAL" />
        </div>
      </div>
    </div>
  );
};

const StepC1 = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('aguda');
            removeConclusion('subaguda');
            removeConclusion('cronica');
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">EVOLUCIÓN</h1>
      <div onClick={handleNextStep}>
        <ConclusionButton value="aguda" title=" AGUDA" />
        <ConclusionButton value="subaguda" title=" SUBAGUDA" />
        <ConclusionButton value="cronica" title=" CRÓNICA" />
      </div>
    </div>
  );
};

const StepC2 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('aguda');
            removeConclusion('subaguda');
            removeConclusion('cronica');
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">EVOLUCIÓN</h1>
      <div onClick={handleNextStep1}>
        <ConclusionButton value="aguda" title=" AGUDA" />
        <ConclusionButton value="subaguda" title=" SUBAGUDA" />
        <ConclusionButton value="cronica" title=" CRÓNICA" />
      </div>
    </div>
  );
};

const StepC3 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('aguda');
            removeConclusion('subaguda');
            removeConclusion('cronica');
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">EVOLUCIÓN</h1>
      <div onClick={handleNextStep2}>
        <ConclusionButton value="aguda" title=" AGUDA" />
        <ConclusionButton value="subaguda" title=" SUBAGUDA" />
        <ConclusionButton value="cronica" title=" CRÓNICA" />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// D2
// ----------------------------------------------------------------

const StepD2 = ({
  handleNextStep1,
  handlePrevStep1,
  handleNextStep5,
  handleNextStep6,
  ubicaciond2
}) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            // Limpieza de conclusiones
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
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" onClick={handleNextStep1} className="print-button dont-print ">
          <img src="/I_In.svg" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">UBICACIÓN</h1>
      <div>{ubicaciond2()}</div>
    </div>
  );
};

const StepD2A = ({
  handleNextStep5,
  handlePrevStep5,
  ubicaciond2a,
  assignFirstValue,
  assignSecondValue,
  assignThirdValue
}) => {
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('supd');
            removeConclusion('mediod');
            removeConclusion('infd');
            removeConclusion('supi');
            removeConclusion('medioi');
            removeConclusion('infi');
            removeConclusion('sup');
            removeConclusion('medio');
            removeConclusion('inf');
            handlePrevStep5();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" onClick={handleNextStep5} className="print-button dont-print ">
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">TRONCO</h1>
      {/* Opcional: llamadas a tus funciones de prueba */}
      {/* <button onClick={assignFirstValue}>Asignar 1</button> */}
      <div>{ubicaciond2a()}</div>
    </div>
  );
};

const StepD2B = ({ handleNextStep6, handlePrevStep6, ubicaciond2b }) => {
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('laterald');
            removeConclusion('posteriord');
            removeConclusion('mediald');
            removeConclusion('laterali');
            removeConclusion('posteriori');
            removeConclusion('mediali');
            removeConclusion('lateral');
            removeConclusion('posterior');
            removeConclusion('medial');
            handlePrevStep6();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" onClick={handleNextStep6} className="print-button dont-print ">
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">CORDONES</h1>
      <div>{ubicaciond2b()}</div>
    </div>
  );
};

// ----------------------------------------------------------------
// D3
// ----------------------------------------------------------------

const StepD3 = ({
  handlePrevStep2,
  handleNextStep2,
  handleNextStep7,
  handlePrevStep7,
  ubicaciond3
}) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
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
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">UBICACIÓN</h1>
      <div>{ubicaciond3()}</div>
    </div>
  );
};

const StepD3A = ({
  handleNextStep2,
  handleNextStep7,
  handlePrevStep7,
  ubicaciond3a
}) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
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
            handlePrevStep7();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button id="prev" onClick={handleNextStep7} className="print-button dont-print ">
          <img src="/I_In.svg" alt="Imprimir" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">DIVISIONES</h1>
      <div>{ubicaciond3a()}</div>
    </div>
  );
};

const StepD1 = ({ handleNextStep, handlePrevStep, handleNextStep4 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
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
            removeConclusion(
              "primariamente_desmielinizante_con_perdida_axonal_secundaria"
            );
            removeConclusion(
              "primariamente_axonal_con_desmielinizacion_secundaria"
            );
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-white">TIPO</h1>
      <AccordionContainer>
        <Accordion title="AXONAL COMPLETA" value="AXONAL COMPLETA" type="external">
          <div onClick={handleNextStep}>
            <ConclusionButton
              value="con_denervación_difusa"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),"
              displayText="DIFUSA (++++)"
            />
            <ConclusionButton
              value="con_denervación_abundante"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),"
              displayText="ABUNDANTE (+++)"
            />
            <ConclusionButton
              value="con_denervación_progresiva"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),"
              displayText="PROGRESIVA (++)"
            />
            <ConclusionButton
              value="con_denervación discreta"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),"
              displayText="DISCRETA (+/+)"
            />
            <ConclusionButton
              value="sin_denervación"
              title=" DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,"
              displayText="AUSENTE"
            />
          </div>
        </Accordion>

        <Accordion title="AXONAL INCOMPLETA" value="AXONAL INCOMPLETA" type="external">
          <div onClick={handleNextStep}>
            <ConclusionButton
              value="con_denervación_difusa"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),"
              displayText="DIFUSA (++++)"
            />
            <ConclusionButton
              value="con_denervación_abundante"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),"
              displayText="ABUNDANTE (+++)"
            />
            <ConclusionButton
              value="con_denervación_progresiva"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),"
              displayText="PROGRESIVA (++)"
            />
            <ConclusionButton
              value="con_denervación discreta"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),"
              displayText="DISCRETA (+/+)"
            />
            <ConclusionButton
              value="sin_denervación"
              title=" DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,"
              displayText="AUSENTE"
            />
          </div>
        </Accordion>

        <Accordion title="DESMIELINIZANTE" value="DESMIELINIZANTE" type="external">
          <div onClick={handleNextStep4}>
            <ConclusionButton
              value="por_retardo_en_la_conduccion"
              title=" DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,"
              displayText="RETARDO EN LA CONDUCCIÓN"
            />
            <ConclusionButton
              value="por_bloqueo_parcial_en_la_conducción"
              title=" DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,"
              displayText="BLOQUEO PARCIAL EN LA CONDUCCIÓN"
            />
            <ConclusionButton
              value="por_bloqueo_completo_en_la_conduccion"
              title=" DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,"
              displayText="BLOQUEO COMPLETO EN LA CONDUCCIÓN"
            />
          </div>
        </Accordion>

        <Accordion title="MIXTA" value="MIXTA" type="external">
          <div onClick={handleNextStep}>
            <ConclusionButton
              value="primariamente_desmielinizante_con_perdida_axonal_secundaria"
              title=" DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,"
              displayText="DESMIELINIZANTE-AXONAL"
            />
            <ConclusionButton
              value="primariamente_axonal_con_desmielinizacion_secundaria"
              title=" DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,"
              displayText="AXONAL-DESMIELINIZANTE"
            />
          </div>
        </Accordion>
      </AccordionContainer>
    </div>
  );
};

// ----------------------------------------------------------------
// E1, E2, E3
// ----------------------------------------------------------------

const StepE1 = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('intensidad_leve');
            removeConclusion('intensidad_leverada');
            removeConclusion('intensidad_severa');
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">INTENSIDAD</h1>
      <div onClick={handleNextStep}>
        <ConclusionButton
          value="intensidad_leve"
          title=" INTENSIDAD LEVE. "
          displayText="LEVE "
        />
        <ConclusionButton
          value="intensidad_leverada"
          title=" INTENSIDAD MODERADA. "
          displayText="MODERADA "
        />
        <ConclusionButton
          value="intensidad_severa"
          title=" INTENSIDAD SEVERA. "
          displayText="SEVERA "
        />
      </div>
    </div>
  );
};

const StepE2 = ({ handlePrevStep1, handleNextStep1, handleNextStep4 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('AXONAL COMPLETA');
            removeConclusion('con_denervación_difusa');
            removeConclusion('con_denervación_abundante');
            removeConclusion('con_denervación_progresiva');
            removeConclusion('con_denervación discreta');
            removeConclusion('sin_denervación');
            removeConclusion('AXONAL INCOMPLETA');
            removeConclusion('DESMIELINIZANTE');
            removeConclusion('por_retardo_en_la_conduccion');
            removeConclusion('por_bloqueo_parcial_en_la_conducción');
            removeConclusion('por_bloqueo_completo_en_la_conduccion');
            removeConclusion('MIXTA');
            removeConclusion(
              'primariamente_desmielinizante_con_perdida_axonal_secundaria'
            );
            removeConclusion(
              'primariamente_axonal_con_desmielinizacion_secundaria'
            );
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep1} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-white">TIPO</h1>
      <AccordionContainer>
        <Accordion title="AXONAL COMPLETA" value="AXONAL COMPLETA" type="external">
          <div onClick={handleNextStep1}>
            <ConclusionButton
              value="con_denervación_difusa"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),"
              displayText="DIFUSA (++++)"
            />
            <ConclusionButton
              value="con_denervación_abundante"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),"
              displayText="ABUNDANTE (+++)"
            />
            <ConclusionButton
              value="con_denervación_progresiva"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),"
              displayText="PROGRESIVA (++)"
            />
            <ConclusionButton
              value="con_denervación discreta"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),"
              displayText="DISCRETA (+/+)"
            />
            <ConclusionButton
              value="sin_denervación"
              title=" DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,"
              displayText="AUSENTE"
            />
          </div>
        </Accordion>

        <Accordion title="AXONAL INCOMPLETA" value="AXONAL INCOMPLETA" type="external">
          <div onClick={handleNextStep1}>
            <ConclusionButton
              value="con_denervación_difusa"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),"
              displayText="DIFUSA (++++)"
            />
            <ConclusionButton
              value="con_denervación_abundante"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),"
              displayText="ABUNDANTE (+++)"
            />
            <ConclusionButton
              value="con_denervación_progresiva"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),"
              displayText="PROGRESIVA (++)"
            />
            <ConclusionButton
              value="con_denervación discreta"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),"
              displayText="DISCRETA (+/+)"
            />
            <ConclusionButton
              value="sin_denervación"
              title=" DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,"
              displayText="AUSENTE"
            />
          </div>
        </Accordion>

        <Accordion title="DESMIELINIZANTE" value="DESMIELINIZANTE" type="external">
          <div onClick={handleNextStep4}>
            <ConclusionButton
              value="por_retardo_en_la_conduccion"
              title=" DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,"
              displayText="RETARDO EN LA CONDUCCIÓN"
            />
            <ConclusionButton
              value="por_bloqueo_parcial_en_la_conducción"
              title=" DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,"
              displayText="BLOQUEO PARCIAL EN LA CONDUCCIÓN"
            />
            <ConclusionButton
              value="por_bloqueo_completo_en_la_conduccion"
              title=" DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,"
              displayText="BLOQUEO COMPLETO EN LA CONDUCCIÓN"
            />
          </div>
        </Accordion>

        <Accordion title="MIXTA" value="MIXTA" type="external">
          <div onClick={handleNextStep1}>
            <ConclusionButton
              value="primariamente_desmielinizante_con_perdida_axonal_secundaria"
              title=" DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,"
              displayText="DESMIELINIZANTE-AXONAL"
            />
            <ConclusionButton
              value="primariamente_axonal_con_desmielinizacion_secundaria"
              title=" DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,"
              displayText="AXONAL-DESMIELINIZANTE"
            />
          </div>
        </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepE3 = ({ handleNextStep2, handlePrevStep2, handleNextStep4 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('AXONAL COMPLETA');
            removeConclusion('con_denervación_difusa');
            removeConclusion('con_denervación_abundante');
            removeConclusion('con_denervación_progresiva');
            removeConclusion('con_denervación discreta');
            removeConclusion('sin_denervación');
            removeConclusion('AXONAL INCOMPLETA');
            removeConclusion('DESMIELINIZANTE');
            removeConclusion('por_retardo_en_la_conduccion');
            removeConclusion('por_bloqueo_parcial_en_la_conducción');
            removeConclusion('por_bloqueo_completo_en_la_conduccion');
            removeConclusion('MIXTA');
            removeConclusion(
              'primariamente_desmielinizante_con_perdida_axonal_secundaria'
            );
            removeConclusion(
              'primariamente_axonal_con_desmielinizacion_secundaria'
            );
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleNextStep2} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">TIPO</h1>
      <AccordionContainer>
        <Accordion title="AXONAL COMPLETA" value="AXONAL COMPLETA" type="external">
          <div onClick={handleNextStep2}>
            <ConclusionButton
              value="con_denervación_difusa"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++),"
              displayText="DIFUSA (++++)"
            />
            <ConclusionButton
              value="con_denervación_abundante"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++),"
              displayText="ABUNDANTE (+++)"
            />
            <ConclusionButton
              value="con_denervación_progresiva"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++),"
              displayText="PROGRESIVA (++)"
            />
            <ConclusionButton
              value="con_denervación discreta"
              title=" DE TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+),"
              displayText="DISCRETA (+/+)"
            />
            <ConclusionButton
              value="sin_denervación"
              title=" DE TIPO AXONAL COMPLETA SIN DENERVACIÓN,"
              displayText="AUSENTE"
            />
          </div>
        </Accordion>

        <Accordion title="AXONAL INCOMPLETA" value="AXONAL INCOMPLETA" type="external">
          <div onClick={handleNextStep2}>
            <ConclusionButton
              value="con_denervación_difusa"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++),"
              displayText="DIFUSA (++++)"
            />
            <ConclusionButton
              value="con_denervación_abundante"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++),"
              displayText="ABUNDANTE (+++)"
            />
            <ConclusionButton
              value="con_denervación_progresiva"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++),"
              displayText="PROGRESIVA (++)"
            />
            <ConclusionButton
              value="con_denervación discreta"
              title=" DE TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+),"
              displayText="DISCRETA (+/+)"
            />
            <ConclusionButton
              value="sin_denervación"
              title=" DE TIPO AXONAL INCOMPLETA SIN DENERVACIÓN,"
              displayText="A
              USENTE"
            />
          </div>
        </Accordion>

        <Accordion title="DESMIELINIZANTE" value="DESMIELINIZANTE" type="external">
          <div onClick={handleNextStep4}>
            <ConclusionButton
              value="por_retardo_en_la_conduccion"
              title=" DE TIPO DESMIELINIZANTE POR RETARDO EN LA CONDUCCIÓN,"
              displayText="RETARDO EN LA CONDUCCIÓN"
            />
            <ConclusionButton
              value="por_bloqueo_parcial_en_la_conducción"
              title=" DE TIPO DESMIELINIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN,"
              displayText="BLOQUEO PARCIAL EN LA CONDUCCIÓN"
            />
            <ConclusionButton
              value="por_bloqueo_completo_en_la_conduccion"
              title=" DE TIPO DESMIELINIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN,"
              displayText="BLOQUEO COMPLETO EN LA CONDUCCIÓN"
            />
          </div>
        </Accordion>

        <Accordion title="MIXTA" value="MIXTA" type="external">
          <div onClick={handleNextStep2}>
            <ConclusionButton
              value="primariamente_desmielinizante_con_perdida_axonal_secundaria"
              title=" DE TIPO MIXTA PRIMARIAMENTE DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA,"
              displayText="DESMIELINIZANTE-AXONAL"
            />
            <ConclusionButton
              value="primariamente_axonal_con_desmielinizacion_secundaria"
              title=" DE TIPO MIXTA PRIMARIAMENTE AXONAL CON DESMIELINIZACÓN SECUNDARIA,"
              displayText="AXONAL-DESMIELINIZANTE"
            />
          </div>
        </Accordion>
      </AccordionContainer>
    </div>
  );
};

// ----------------------------------------------------------------
// F1, F2, F3
// ----------------------------------------------------------------

const StepF1 = ({ handleNextStep, handlePrevStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('reinervacion_activa');
            removeConclusion('sin_reinervacion_inactiva');
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">REINERVACIÓN</h1>
      <div onClick={handleNextStep}>
        <ConclusionButton
          value="reinervacion_activa"
          title="REINERVACIÓN ACTIVA;"
          displayText="ACTIVA"
        />
        <ConclusionButton
          value="sin_reinervacion_inactiva"
          title="REINERVACIÓN INACTIVA;"
          displayText="INACTIVA"
        />
      </div>
    </div>
  );
};

const StepF2 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('intensidad_leve');
            removeConclusion('intensidad_leverada');
            removeConclusion('intensidad_severa');
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep1} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">INTENSIDAD</h1>
      <div onClick={handleNextStep1}>
        <ConclusionButton
          value="intensidad_leve"
          title=" INTENSIDAD LEVE. "
          displayText="LEVE "
        />
        <ConclusionButton
          value="intensidad_leverada"
          title=" INTENSIDAD MODERADA. "
          displayText="MODERADA "
        />
        <ConclusionButton
          value="intensidad_severa"
          title=" INTENSIDAD SEVERA. "
          displayText="SEVERA "
        />
      </div>
    </div>
  );
};

const StepF3 = ({ handlePrevStep2, handleNextStep2 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('intensidad_leve');
            removeConclusion('intensidad_leverada');
            removeConclusion('intensidad_severa');
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">INTENSIDAD</h1>
      <div onClick={handleNextStep2}>
        <ConclusionButton
          value="intensidad_leve"
          title=" INTENSIDAD LEVE. "
          displayText="LEVE "
        />
        <ConclusionButton
          value="intensidad_leverada"
          title=" INTENSIDAD MODERADA. "
          displayText="MODERADA "
        />
        <ConclusionButton
          value="intensidad_severa"
          title=" INTENSIDAD SEVERA. "
          displayText="SEVERA "
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// G1, G2, G3
// ----------------------------------------------------------------

const StepG1 = ({ handlePrevStep, handleNextStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('completo');
            removeConclusion('parcial_funcional');
            removeConclusion('pobre');
            removeConclusion('nulo');
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">PRONÓSTICO</h1>
      <div onClick={handleNextStep}>
        <ConclusionButton
          value="completo"
          title=" PRONÓSTICO DE RECUPERACIÓN COMPLETA."
          displayText="RECUPERACIÓN COMPLETA"
        />
        <ConclusionButton
          value="parcial_funcional"
          title=" PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL."
          displayText="RECUPERACIÓN PARCIAL"
        />
        <ConclusionButton
          value="pobre"
          title=" PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL."
          displayText="POBRE NO FUNCIONAL"
        />
        <ConclusionButton
          value="nulo"
          title=" PRNÓSTICO DE RECUPERACIÓN NULO."
          displayText="RECUPERACIÓN NULO"
        />
      </div>
    </div>
  );
};

const StepG2 = ({ handleNextStep1, handlePrevStep1 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('reinervacion_activa');
            removeConclusion('sin_reinervacion_inactiva');
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep1} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">REINERVACIÓN</h1>
      <div onClick={handleNextStep1}>
        <ConclusionButton
          value="reinervacion_activa"
          title="REINERVACIÓN ACTIVA; "
          displayText="ACTIVA"
        />
        <ConclusionButton
          value="sin_reinervacion_inactiva"
          title="REINERVACIÓN INACTIVA; "
          displayText="INACTIVA"
        />
      </div>
    </div>
  );
};

const StepG3 = ({ handleNextStep2, handlePrevStep2 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('reinervacion_activa');
            removeConclusion('sin_reinervacion_inactiva');
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">REINERVACIÓN</h1>
      <div onClick={handleNextStep2}>
        <ConclusionButton
          value="reinervacion_activa"
          title="REINERVACIÓN ACTIVA; "
          displayText="ACTIVA"
        />
        <ConclusionButton
          value="sin_reinervacion_inactiva"
          title="REINERVACIÓN INACTIVA; "
          displayText="INACTIVA"
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// H2, H3
// ----------------------------------------------------------------

const StepH2 = ({ handlePrevStep1, handleNextStep1 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('completo');
            removeConclusion('parcial_funcional');
            removeConclusion('pobre');
            removeConclusion('nulo');
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">PRONÓSTICO</h1>
      <div onClick={handleNextStep1}>
        <ConclusionButton
          value="completo"
          title=" PRONÓSTICO DE RECUPERACIÓN COMPLETA."
          displayText="RECUPERACIÓN COMPLETA"
        />
        <ConclusionButton
          value="parcial_funcional"
          title=" PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL."
          displayText="RECUPERACIÓN PARCIAL"
        />
        <ConclusionButton
          value="pobre"
          title=" PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL."
          displayText="POBRE NO FUNCIONAL"
        />
        <ConclusionButton
          value="nulo"
          title=" PRNÓSTICO DE RECUPERACIÓN NULO."
          displayText="RECUPERACIÓN NULO"
        />
      </div>
    </div>
  );
};

const StepH3 = ({ handlePrevStep2, handleNextStep2 }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('completo');
            removeConclusion('parcial_funcional');
            removeConclusion('pobre');
            removeConclusion('nulo');
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={handleNextStep2} id="prev" className="print-button dont-print ">
          <img src="/I_X.webp" style={{ filter: 'invert(0.5)' }} />
        </button>
      </div>
      <h1 className="text-xl font-bold text-white">PRONÓSTICO</h1>
      <div onClick={handleNextStep2}>
        <ConclusionButton
          value="completo"
          title=" PRONÓSTICO DE RECUPERACIÓN COMPLETA."
          displayText="RECUPERACIÓN COMPLETA"
        />
        <ConclusionButton
          value="parcial_funcional"
          title=" PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL."
          displayText="RECUPERACIÓN PARCIAL"
        />
        <ConclusionButton
          value="pobre"
          title=" PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL."
          displayText="POBRE NO FUNCIONAL"
        />
        <ConclusionButton
          value="nulo"
          title=" PRNÓSTICO DE RECUPERACIÓN NULO."
          displayText="RECUPERACIÓN NULO"
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// I, I1, I2 -> Secciones finales para imprimir / PDF
// ----------------------------------------------------------------

const StepI = ({
  handlePrevStep,
  selectedImages,
  handleUndo,
  handleImageChange,
  handlePrint,
  topLeftText,
  setTopLeftText,
  copyConclusions,
  expandedDivs,
  setExpandedDivs
}) => {
  const { removeConclusion } = useContext(ReportContext);

   const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
    const { conclusions } = useContext(ReportContext)
    const { droppedItems } = useContext(DropContext);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleExportPdf = async () => {
      try {
      setIsLoading(true); // ⌛ Mostrar overlay
      // 1) conclusiones (array con {value, title})
      const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
      console.log(conclusionFinal)
      const conclusiones = conclusions;
        const response = await fetch('/api/pdf/generate-pdf/plexopatia?route', {
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
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('completo');
            removeConclusion('parcial_funcional');
            removeConclusion('pobre');
            removeConclusion('nulo');
            handlePrevStep();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        {/* Aquí podrías llamar a tu función de export PDF */}
        <button onClick={handleExportPdf} className="print-button dont-print">
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
      </div>
      <MenuImagenes
        expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}
        topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}
      />
    </div>
  );
};

const StepI1 = ({
  handlePrevStep1,
  selectedImages,
  handleUndo,
  handleImageChange,
  handlePrint,
  topLeftText,
  setTopLeftText,
  copyConclusions,
  expandedDivs,
  setExpandedDivs
}) => {
  const { removeConclusion } = useContext(ReportContext);

  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
    setIsLoading(true); // ⌛ Mostrar overlay
    // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    console.log(conclusionFinal)

    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/plexopatia?route', {
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
  // lógica similar a StepI
  return (
    
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('completo');
            removeConclusion('parcial_funcional');
            removeConclusion('pobre');
            removeConclusion('nulo');
            handlePrevStep1();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleExportPdf} className="print-button dont-print">
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <MenuImagenes
        expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}
        topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}
      />
    </div>
  );
};

const StepI2 = ({
  handlePrevStep2,
  selectedImages,
  handleUndo,
  handleImageChange,
  handlePrint,
  topLeftText,
  setTopLeftText,
  copyConclusions,
  expandedDivs,
  setExpandedDivs
}) => {
  const { removeConclusion } = useContext(ReportContext);

  const { data: session } = useSession(); // o sube esto a nivel del componente si prefieres
  const { conclusions } = useContext(ReportContext)
  const { droppedItems } = useContext(DropContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
    setIsLoading(true); // ⌛ Mostrar overlay
    // 1) conclusiones (array con {value, title})
    const conclusionFinal = copyConclusions; // Este es tu string formateado en el frontend
    console.log(conclusionFinal)

    const conclusiones = conclusions;
      const response = await fetch('/api/pdf/generate-pdf/plexopatia?route', {
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
  // lógica similar
  return (
    <div>
      <div className="button-bar">
        <button
          onClick={() => {
            removeConclusion('completo');
            removeConclusion('parcial_funcional');
            removeConclusion('pobre');
            removeConclusion('nulo');
            handlePrevStep2();
          }}
          className="print-button"
        >
          <img src="/I_Out.svg" style={{ filter: 'invert(1)' }} />
        </button>
        <button onClick={() => window.location.reload()} className="print-button">
          <img src="/I_Repeat.svg" style={{ filter: 'invert(1)' }} />
        </button>

        <button onClick={handleExportPdf} className="print-button dont-print">
          <img src="/I_Document.svg" alt="Exportar PDF" style={{ filter: 'invert(1)' }} />
        </button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <MenuImagenes
        expandedDivs={expandedDivs}
        setExpandedDivs={setExpandedDivs}
        topLeftText={topLeftText}
        setTopLeftText={setTopLeftText}
      />
    </div>
  );
};

export default SimpleMultiStepForm;
