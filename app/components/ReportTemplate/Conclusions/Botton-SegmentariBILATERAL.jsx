'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonSegmenBILATERAL({ title, value, buttonTop, filtroRojo, filtroGrados = 0, filtroRojoOpuesto, filtroGradosOpuesto = 0 }) {
  const {
    updateConclusions,
    removeConclusion,
    conclusions,
    buttonsDisabledBITSeg,
    setFiltroRojoActivo,
    setFiltroRojoActivo2,
    activeSegmBilateralValue,
    setActiveSegmBilateralValue,
  } = useContext(ReportContext);

  const opposites = Object.fromEntries(
    Array.from({ length: 280 }, (_, i) => [`car${i + 1}`, `cari${i + 1}`])
  );

  const oppositeValue = opposites[value];
  const isPrimary     = !!oppositeValue;

  const isSelected = isPrimary
    ? activeSegmBilateralValue === value
    : conclusions.some(cl => cl?.value === value);

  const hasCarSelected = conclusions.some(cl => cl?.value && /^car\d+$/.test(cl.value));
  if (!isPrimary && !hasCarSelected) return null;

  function handleClick() {
    if (buttonsDisabledBITSeg) return;

    if (isPrimary) {
      if (activeSegmBilateralValue === value) {
        removeConclusion(value);
        removeConclusion(oppositeValue);
        setActiveSegmBilateralValue(null);
        setFiltroRojoActivo?.(null);
        setFiltroRojoActivo2?.(null);
      } else {
        if (activeSegmBilateralValue !== null) {
          removeConclusion(activeSegmBilateralValue);
          removeConclusion(opposites[activeSegmBilateralValue]);
        }
        updateConclusions({ title, value });
        updateConclusions({ title: '', value: oppositeValue });
        setActiveSegmBilateralValue(value);
        if (filtroRojo?.top && filtroRojo?.height && buttonTop) {
          const clipTop = Math.max(0, ((parseFloat(buttonTop) - parseFloat(filtroRojo.top)) / parseFloat(filtroRojo.height)) * 100);
          setFiltroRojoActivo?.({ ...filtroRojo, clipTop: `${clipTop.toFixed(2)}%`, grados: filtroGrados });
        }
        if (filtroRojoOpuesto?.top && filtroRojoOpuesto?.height && buttonTop) {
          const clipTop = Math.max(0, ((parseFloat(buttonTop) - parseFloat(filtroRojoOpuesto.top)) / parseFloat(filtroRojoOpuesto.height)) * 100);
          setFiltroRojoActivo2?.({ ...filtroRojoOpuesto, clipTop: `${clipTop.toFixed(2)}%`, grados: filtroGradosOpuesto });
        }
      }
    } else {
      if (isSelected) {
        removeConclusion(value);
      } else {
        updateConclusions({ title, value });
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
