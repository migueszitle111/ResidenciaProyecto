import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  localStorage.clear();
});

// jsdom no implementa requestIdleCallback; el código de producción hace
// fallback a setTimeout, así que aquí lo dejamos que use el fallback
// (basta con NO definirlo). Se documenta explícito para que quede claro.
