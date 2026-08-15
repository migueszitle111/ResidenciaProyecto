'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function SegmentariaButton({ title, value, buttonTop, filtroRojo, filtroGrados = 0 }) {
  const {
    updateConclusions,
    removeConclusion,
    buttonsDisabledSegm,
    setFiltroRojoActivo,
    activeSegmentariaValue,
    setActiveSegmentariaValue,
  } = useContext(ReportContext);

  const isSelected = activeSegmentariaValue === value;

  function handleClick() {
    if (buttonsDisabledSegm) return;

    if (isSelected) {
      removeConclusion(value);
      setActiveSegmentariaValue(null);
      setFiltroRojoActivo?.(null);
    } else {
      if (activeSegmentariaValue !== null) {
        removeConclusion(activeSegmentariaValue);
      }
      updateConclusions({ title, value });
      setActiveSegmentariaValue(value);
      if (filtroRojo?.top && filtroRojo?.height && buttonTop) {
        const bTop    = parseFloat(buttonTop);
        const iTop    = parseFloat(filtroRojo.top);
        const iHeight = parseFloat(filtroRojo.height);
        const clipTop = Math.max(0, ((bTop - iTop) / iHeight) * 100);
        setFiltroRojoActivo?.({ ...filtroRojo, clipTop: `${clipTop.toFixed(2)}%`, grados: filtroGrados });
      }
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
        cursor: buttonsDisabledSegm ? 'default' : 'pointer',
        opacity: buttonsDisabledSegm ? 0.5 : 1,
        pointerEvents: buttonsDisabledSegm ? 'none' : 'auto',
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
