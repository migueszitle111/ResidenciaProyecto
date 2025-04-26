'use client';

import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function SegmentariaButton2({ title, value, displayText }) {
    const { updateConclusions, conclusions, buttonsDisabledSegm2 } = useContext(ReportContext);
    const [selectedButton, setSelectedButton] = useState(null);

// Verifica si el valor ya está en las conclusiones
const isSelected = conclusions.find(cl => cl.value === value);

// Clase condicional con opacidad y bloqueo de eventos si está deshabilitado
const classnames = 'cursor-pointer w-[3.5px] h-[18px] text-xs flex items-center justify-center text-white transition-colors duration-300 ease-in ' +
    (selectedButton === value ? 'bg-[#ff0000]' : 'bg-transparent') +
    (buttonsDisabledSegm2 ? ' opacity-50 pointer-events-none' : '') + ' rounded-[50px] z-50 relative';

// Función para actualizar las conclusiones
function handleClick() {
    if (buttonsDisabledSegm2) return; // Evita interacción si está bloqueado

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
