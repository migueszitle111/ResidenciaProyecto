// Prueba del auto-save debounced que se añadió a FormularioReporte.js para
// evitar que la UI se bloqueara al llenar 3+ fases del procedimiento.
//
// En vez de montar FormularioReporte completo (arrastra NextAuth, framer-motion
// y buildMonitoreoPdf, que no aportan al comportamiento bajo prueba), aquí se
// replica EL MISMO patrón — mismo debounce, mismo scheduleIdle, mismos deps —
// en un componente mínimo. Si el patrón funciona, funciona igual en el real.
//
// Lo que valida:
//  1. Un solo cambio → una escritura después del debounce (no antes).
//  2. Varios cambios rápidos → una sola escritura al final (no una por tecla).
//  3. Simular llenar 10 fases → no hay 10 escrituras síncronas.
//  4. Desmontar antes del debounce → NO se escribe (no queda basura).

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { useEffect, useRef, useState } from 'react';

// ── Componente de prueba: mismo patrón que FormularioReporte.js:583-628 ──
function AutoSaveHarness({ storageKey, initialForm }) {
  const [form, setForm] = useState(initialForm);
  const cleanupIdleRef = useRef(null);

  const scheduleIdle = (fn) => {
    if (typeof window === 'undefined') return () => {};
    const ric = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 0));
    const cic = window.cancelIdleCallback || window.clearTimeout;
    const id = ric(fn);
    return () => cic(id);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const cancelIdle = scheduleIdle(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify({ form }));
        } catch {}
      });
      cleanupIdleRef.current = cancelIdle;
    }, 600);
    return () => {
      clearTimeout(t);
      if (cleanupIdleRef.current) {
        cleanupIdleRef.current();
        cleanupIdleRef.current = null;
      }
    };
  }, [form, storageKey]);

  // API para que el test dispare cambios sin depender de inputs/DOM.
  AutoSaveHarness.__setForm = setForm;
  return null;
}

describe('Auto-save debounced (fix del bloqueo en Fases)', () => {
  let setItemSpy;

  beforeEach(() => {
    vi.useFakeTimers();
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  });

  it('un solo cambio: NO escribe antes del debounce y SÍ escribe después', () => {
    render(<AutoSaveHarness storageKey="test-key" initialForm={{ fases: [] }} />);

    // Efecto inicial programado — nada escrito aún.
    expect(setItemSpy).not.toHaveBeenCalled();

    // Justo antes del debounce (599ms): nada.
    act(() => { vi.advanceTimersByTime(599); });
    expect(setItemSpy).not.toHaveBeenCalled();

    // Cruzado el debounce (600ms) + drenar el idle callback.
    act(() => { vi.advanceTimersByTime(1); });
    act(() => { vi.runOnlyPendingTimers(); });

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith('test-key', expect.stringContaining('"fases":[]'));
  });

  it('varios cambios rápidos colapsan a UNA sola escritura', () => {
    render(<AutoSaveHarness storageKey="test-key" initialForm={{ fases: [] }} />);

    // 5 cambios en ráfaga (como teclear rápido).
    for (let i = 0; i < 5; i++) {
      act(() => {
        AutoSaveHarness.__setForm({ fases: Array.from({ length: i + 1 }, (_, k) => ({ nombre: `F${k}` })) });
        vi.advanceTimersByTime(50); // 50ms entre cambios, menor al debounce.
      });
    }

    // Aún dentro del debounce del último cambio: nada escrito.
    expect(setItemSpy).not.toHaveBeenCalled();

    // Terminar el debounce y drenar el idle.
    act(() => { vi.advanceTimersByTime(600); });
    act(() => { vi.runOnlyPendingTimers(); });

    // UNA sola escritura — la del último estado. Sin debounce serían 6+.
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    const [, valueWritten] = setItemSpy.mock.calls[0];
    expect(valueWritten).toContain('"F4"'); // el último estado, no uno intermedio.
  });

  it('agregar 10 fases NO dispara 10 escrituras síncronas', () => {
    render(<AutoSaveHarness storageKey="test-key" initialForm={{ fases: [] }} />);

    // Simula "Guardar y Agregar Otra" 10 veces con imágenes base64 gordas.
    const fasePesada = (i) => ({
      nombre: `Fase ${i}`,
      // Simula el peso real: 5 registros con base64 ~50KB cada uno.
      registros: Array.from({ length: 5 }, () => ({
        imagenes: [Array.from({ length: 50_000 }).map(() => 'A').join('')],
      })),
    });

    for (let i = 0; i < 10; i++) {
      act(() => {
        AutoSaveHarness.__setForm({
          fases: Array.from({ length: i + 1 }, (_, k) => fasePesada(k)),
        });
        vi.advanceTimersByTime(100); // Simula 100ms entre operaciones.
      });
    }

    // A este punto, el auto-save viejo habría escrito ~10 veces MB de datos.
    // Con debounce: cero escrituras hasta drenar.
    expect(setItemSpy).not.toHaveBeenCalled();

    // Drenar y verificar que sólo se escribe UNA vez, con las 10 fases.
    act(() => { vi.advanceTimersByTime(600); });
    act(() => { vi.runOnlyPendingTimers(); });

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    const written = JSON.parse(setItemSpy.mock.calls[0][1]);
    expect(written.form.fases).toHaveLength(10);
  });

  it('desmontar antes del debounce cancela la escritura pendiente', () => {
    const { unmount } = render(
      <AutoSaveHarness storageKey="test-key" initialForm={{ fases: [{ nombre: 'X' }] }} />
    );

    // Avanzamos parcialmente y desmontamos antes del debounce.
    act(() => { vi.advanceTimersByTime(300); });
    unmount();

    // Terminar todos los timers pendientes.
    act(() => { vi.advanceTimersByTime(2000); });
    act(() => { vi.runOnlyPendingTimers(); });

    // No debe quedar escritura huérfana.
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
