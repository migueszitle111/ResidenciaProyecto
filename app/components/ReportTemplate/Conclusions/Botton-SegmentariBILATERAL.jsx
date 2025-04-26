'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonSegmenBILATERAL({ title, value, displayText }) {
  const { updateConclusions, conclusions, buttonsDisabledBITSeg } = useContext(ReportContext);

  // Mapeo de valores opuestos
  const opposites = Object.fromEntries(
    Array.from({ length: 280 }, (_, i) => [`car${i + 1}`, `cari${i + 1}`])
  );

  const isSelected = conclusions.some(cl => cl?.value === value);
  const oppositeValue = opposites[value];

  // Verificar si hay algún "carX" en las conclusiones
  const hasCarSelected = conclusions.some(cl => cl?.value && cl.value.startsWith('car'));

  // Si el botón es "cariX" y no hay ningún "carX" seleccionado, no se muestra
  if (value.startsWith('cari') && !hasCarSelected) {
    return null;
  }

  function handleClick() {
    if (buttonsDisabledBITSeg) return; // No hacer nada si los botones están deshabilitados

    updateConclusions({ title, value });

    if (oppositeValue) {
      updateConclusions({ title: '', value: oppositeValue });
    }
  }

  const classnames = `cursor-pointer w-[3.5px] h-[18px] text-xs flex items-center justify-center text-white transition-colors duration-300 ease-in  
    ${isSelected ? 'bg-[#ff0000]' : 'bg-transparent'} 
    ${buttonsDisabledBITSeg ? 'opacity-50 pointer-events-none' : ''} 
    rounded-[50px] z-50 relative`;

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}
