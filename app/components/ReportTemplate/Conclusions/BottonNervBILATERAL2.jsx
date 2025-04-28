'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonBILATERAL2({ title, value, displayText }) {
const { updateConclusions, conclusions, buttonsDisabledBILT2 } = useContext(ReportContext);

// Mapeo de valores opuestos
const opposites = Object.fromEntries(
Array.from({ length: 80 }, (_, i) => [`caar${i + 1}`, `caarii${i + 1}`])
);

const isSelected = conclusions.some(cl => cl?.value === value);
const oppositeValue = opposites[value];

// Verificar si hay algún "carX" en las conclusiones
const hasCarSelected = conclusions.some(cl => cl?.value && cl.value.startsWith('car'));

// Si el botón es "cariX" y no hay ningún "carX" seleccionado, no se muestra
if (value.startsWith('caarii') && !hasCarSelected) {
return null;
}

function handleClick() {
if (buttonsDisabledBILT2) return; // Evita interacción si está bloqueado

updateConclusions({ title, value });

if (oppositeValue) {
    updateConclusions({ title: '', value: oppositeValue });
}
}

const classnames = `cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in 
${isSelected ? 'bg-[#ff0000]' : 'bg-transparent'} 
${buttonsDisabledBILT2 ? 'opacity-50 pointer-events-none' : ''} 
rounded-[50px] z-50 relative`;

return (
<div className={classnames} onClick={handleClick}>
    {displayText || title}
</div>
);
}
