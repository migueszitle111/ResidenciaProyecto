'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButton({ title, value, displayText, buttonTop, filtroRojo, filtroGrados = 0 }) {
  const {
    updateConclusions,
    removeConclusion,
    buttonsDisabled,
    setFiltroRojoActivo,
    activeNerviusValue,
    setActiveNerviusValue,
  } = useContext(ReportContext);

  const isSelected = activeNerviusValue === value;

  const classnames =
    'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' +
    (isSelected ? 'bg-[#ff0000]' : 'bg-transparent') +
    (buttonsDisabled ? ' opacity-50 pointer-events-none' : '') +
    ' rounded-[50px] z-50 relative';

  function handleClick() {
    if (buttonsDisabled) return;

    if (isSelected) {
      removeConclusion(value);
      setActiveNerviusValue(null);
      setFiltroRojoActivo?.(null);
    } else {
      if (activeNerviusValue !== null) {
        removeConclusion(activeNerviusValue);
      }
      updateConclusions({ title, value });
      setActiveNerviusValue(value);
      if (filtroRojo?.top && filtroRojo?.height && buttonTop) {
        const bTop    = parseFloat(buttonTop);
        const iTop    = parseFloat(filtroRojo.top);
        const iHeight = parseFloat(filtroRojo.height);
        const clipTop = Math.max(0, ((bTop - iTop) / iHeight) * 100);
        setFiltroRojoActivo?.({ ...filtroRojo, clipTop: `${clipTop.toFixed(2)}%`, grados: filtroGrados });
      }
    }
  }

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}
