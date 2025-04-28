'use client';       // 👈  debe ser la primera línea

import { createContext, useState } from 'react';

export const ReportContextR = createContext({
  conclusions: [],
  updateConclusions: () => {},
  setInitialConclusions: () => {},
});

export function ReportContextProviderR({ children }) {
  const [conclusions, setConclusions] = useState([]);

  function updateConclusions({ value, title, remove }) {
    setConclusions((prevConclusions) => {
      if (remove) {
        // Eliminamos la conclusión
        return prevConclusions.filter(cl => cl.value !== value);
      } else {
        // Buscamos si ya existe
        const existingIndex = prevConclusions.findIndex(cl => cl.value === value);
        if (existingIndex === -1) {
          // No existe, lo agregamos
          return [...prevConclusions, { value, title }];
        } else {
          // Sí existe, entonces actualizamos el title (u otras props si quieres)
          const updated = [...prevConclusions];
          updated[existingIndex] = { ...updated[existingIndex], title };
          return updated;
        }
      }
    });
  }
  
  function setInitialConclusions(initialValue) {
    setConclusions(initialValue);
  }

  const value = {
    conclusions,
    updateConclusions,
    setInitialConclusions,
  };

  return (
    <ReportContextR.Provider value={value}>
      {children}
    </ReportContextR.Provider>
  );
}
