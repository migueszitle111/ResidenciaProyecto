import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

// export function NerviusButton({ title, value, displayText }) {
//   const { updateConclusions } = useContext(ReportContext);
  
//   // Clase fija para que el botón siempre sea visible
//   const classnames = 'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in bg-[#c44900] rounded-[50px] z-50 relative';

//   // Función para actualizar las conclusiones
//   function handleClick() {
//     updateConclusions({ title, value });
//   }

//   return (
//     <div className={classnames} onClick={handleClick}>
//       {displayText || title}
//     </div>
//   );
// }

export function NerviusButton({ title, value, displayText }) {
  const { updateConclusions, conclusions, buttonsDisabled } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);

  const isSelected = conclusions.find(cl => cl.value === value);
  const classnames =
    'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' +
    (selectedButton === value ? 'bg-[#ff0000]' : 'bg-transparent') +
    (buttonsDisabled ? ' opacity-50 pointer-events-none' : '') + // desactiva el botón
    ' rounded-[50px] z-50 relative';

  function handleClick() {
    if (buttonsDisabled) return; // Protección adicional
    if (selectedButton === value) {
      setSelectedButton(null);
    } else {
      setSelectedButton(value);
    }
    updateConclusions({ title, value });
  }

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}








