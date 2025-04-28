'use client';

import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function NerviusButton2({ title, value, displayText }) {
  const { updateConclusions, conclusions, buttonsDisabled2 } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);

  const isSelected = conclusions.find(cl => cl.value === value);
  const classnames =
    'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' +
    (selectedButton === value ? 'bg-[#ff0000]' : 'bg-transparent') +
    (buttonsDisabled2 ? ' opacity-50 pointer-events-none' : '') + // desactiva el botón
    ' rounded-[50px] z-50 relative';

  function handleClick() {
    if (buttonsDisabled2) return; // Protección adicional
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