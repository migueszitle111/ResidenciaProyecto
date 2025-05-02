'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonSegmenBILATERAL2({ title, value, displayText }) {
  const { updateConclusions, conclusions, buttonsDisabledBITSeg2 } = useContext(ReportContext);

  // Mapeo de valores opuestos
  const opposites = Object.fromEntries(
    Array.from({ length: 580 }, (_, i) => [`caar${i + 1}`, `caarii${i + 1}`])
  );

  const isSelected = conclusions.some(cl => cl?.value === value);
  const oppositeValue = opposites[value];

  // Verificar si hay algún "carX" en las conclusiones
  const hasCarSelected = conclusions.some(cl => cl?.value && cl.value.startsWith('car'));

  // Si el botón es "cariX" y no hay ningún "carX" seledccionado, 
  if (value.startsWith('caarii') && !hasCarSelected) {
    return null;
  }

  function handleClick() {
    if (buttonsDisabledBITSeg2) return; // No hacer nada si los botones están deshabilitados

    updateConclusions({ title, value });

    if (oppositeValue) {
      updateConclusions({ title: '', value: oppositeValue });
    }
  }

  const classnames = `cursor-pointer w-[3.5px] h-[18px] text-xs flex items-center justify-center text-white transition-colors duration-300 ease-in  
    ${isSelected ? 'bg-[#ff0000]' : 'bg-transparent'} 
    ${buttonsDisabledBITSeg2 ? 'opacity-50 pointer-events-none' : ''} 
    rounded-[50px] z-50 relative`;

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}
