'use client';

import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function NerviusButtonBILATERAL({ title, value, displayText, buttonTop, filtroRojo, filtroGrados = 0, filtroRojoOpuesto, filtroGradosOpuesto = 0 }) {
  const {
    updateConclusions,
    removeConclusion,
    conclusions,
    buttonsDisabledBILT,
    setFiltroRojoActivo,
    setFiltroRojoActivo2,
    activeBilateralValue,
    setActiveBilateralValue,
  } = useContext(ReportContext);

  // Mapeo car1→cari1, car2→cari2, … (solo para botones primarios)
  const opposites = Object.fromEntries(
    Array.from({ length: 250 }, (_, i) => [`car${i + 1}`, `cari${i + 1}`])
  );

  const oppositeValue = opposites[value]; // definido solo para botones 'car'
  const isPrimary     = !!oppositeValue;  // true = botón 'car', false = botón 'cari'

  const isSelected = isPrimary
    ? activeBilateralValue === value
    : conclusions.some(cl => cl?.value === value);

  // Los botones 'cari' solo se muestran cuando hay un 'car' activo
  const hasCarSelected = conclusions.some(cl => cl?.value && /^car\d+$/.test(cl.value));
  if (!isPrimary && !hasCarSelected) return null;

  function handleClick() {
    if (buttonsDisabledBILT) return;

    if (isPrimary) {
      if (activeBilateralValue === value) {
        // Deseleccionar par activo
        removeConclusion(value);
        removeConclusion(oppositeValue);
        setActiveBilateralValue(null);
        setFiltroRojoActivo?.(null);
        setFiltroRojoActivo2?.(null);
      } else {
        // Eliminar par anterior si existía
        if (activeBilateralValue !== null) {
          removeConclusion(activeBilateralValue);
          removeConclusion(opposites[activeBilateralValue]);
        }
        // Seleccionar nuevo par
        updateConclusions({ title, value });
        updateConclusions({ title: '', value: oppositeValue });
        setActiveBilateralValue(value);
        // Activar filtros
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
      // Botón 'cari': toggle independiente sin afectar el par activo
      if (isSelected) {
        removeConclusion(value);
      } else {
        updateConclusions({ title, value });
      }
    }
  }

  const classnames = `cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in
    ${isSelected ? 'bg-[#ff0000]' : 'bg-transparent'}
    ${buttonsDisabledBILT ? 'opacity-50 pointer-events-none' : ''}
    rounded-[50px] z-50 relative`;

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}
