'use client';

import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function NerviusButton({ title, value, displayText, buttonTop, filtroRojo, filtroGrados = 0 }) {
  const { updateConclusions, conclusions, buttonsDisabled, setFiltroRojoActivo } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);

  const isSelected = conclusions.find(cl => cl.value === value);
  const classnames =
    'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' +
    (selectedButton === value ? 'bg-[#ff0000]' : 'bg-transparent') +
    (buttonsDisabled ? ' opacity-50 pointer-events-none' : '') + // desactiva el botón
    ' rounded-[50px] z-50 relative';

  function handleClick() {
    if (buttonsDisabled) return;

    const isCurrentlySelected = selectedButton === value;

    if (isCurrentlySelected) {
      setSelectedButton(null);
      setFiltroRojoActivo?.(null);
    } else {
      setSelectedButton(value);
      // Solo activa el filtro si el botón tiene todos los datos necesarios
      if (filtroRojo?.top && filtroRojo?.height && buttonTop) {
        const bTop    = parseFloat(buttonTop);
        const iTop    = parseFloat(filtroRojo.top);
        const iHeight = parseFloat(filtroRojo.height);
        const clipTop = Math.max(0, ((bTop - iTop) / iHeight) * 100);
        setFiltroRojoActivo?.({ ...filtroRojo, clipTop: `${clipTop.toFixed(2)}%`, grados: filtroGrados });
      }
    }

    updateConclusions({ title, value });
  }

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}
