'use client';

import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function NerviusButtonBILATERALIZQ({ title, value, displayText }) {
  // Necesitas la función updateConclusions:
  const { updateConclusions, conclusions } = useContext(ReportContext);

  const [selectedButton, setSelectedButton] = useState(null);

  const isSelected = conclusions.find(cl => cl.value === value);

  const classnames = 'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' + 
    (selectedButton === value ? 'bg-[#ff0000]' : 'bg-transparent') + 
    ' rounded-[50px] z-50 relative';

  function handleClick() {
    if (selectedButton === value) {
      // Si ya está seleccionado, deseleccionarlo
      setSelectedButton(null);
    } else {
      // Si no está seleccionado, lo seleccionamos
      setSelectedButton(value);
    }
    // AÑADIR esta línea para actualizar el texto en la conclusión:
    updateConclusions({ title, value });
  }

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}


// export function NerviusButtonBILATERALIZQ({ title, value, displayText }) {
//   // Necesitas la función updateConclusions:
//   const { updateConclusions, conclusions } = useContext(ReportContext);

//   const [selectedButton, setSelectedButton] = useState(null);

//   const isSelected = conclusions.find(cl => cl.value === value);

//   const classnames = 'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in bg-[#c44900] rounded-[50px] z-50 relative';

//   function handleClick() {
//     if (selectedButton === value) {
//       // Si ya está seleccionado, deseleccionarlo
//       setSelectedButton(null);
//     } else {
//       // Si no está seleccionado, lo seleccionamos
//       setSelectedButton(value);
//     }
//     // AÑADIR esta línea para actualizar el texto en la conclusión:
//     updateConclusions({ title, value });
//   }

//   return (
//     <div className={classnames} onClick={handleClick}>
//       {displayText || title}
//     </div>
//   );
// }