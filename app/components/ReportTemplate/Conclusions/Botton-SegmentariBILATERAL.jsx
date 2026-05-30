'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonSegmenBILATERAL({ title, value }) {
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
    if (buttonsDisabledBITSeg) return;

    updateConclusions({ title, value });

    if (oppositeValue) {
      updateConclusions({ title: '', value: oppositeValue });
    }
  }

  const H = 18;
  const step = 3;
  const amp = 4;
  const W = amp;

  let points = '';
  for (let y = 0; y <= H; y += step) {
    const x = (y / step) % 2 === 0 ? amp : 0;
    points += `${x},${y} `;
  }

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: buttonsDisabledBITSeg ? 'default' : 'pointer',
        opacity: buttonsDisabledBITSeg ? 0.5 : 1,
        pointerEvents: buttonsDisabledBITSeg ? 'none' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 50,
        width: W + 2,
        height: H,
      }}
    >
      {isSelected && (
        <span
          className="bg-[#ff0000] text-xs"
          style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }}
        />
      )}
      <svg
        width={W + 2}
        height={H}
        viewBox={`-1 0 ${W + 2} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <polyline
          points={points}
          fill="none"
          stroke={isSelected ? '#ff0000' : 'transparent'}
          strokeWidth="1.5"
          strokeLinejoin="miter"
          style={{ transition: 'stroke 0.3s ease-in' }}
        />
      </svg>
    </div>
  );
}
