import { createContext, useState } from 'react'; // Hook necesario para crear el contexto

// Crea un contexto para el reporte con un valor inicial vacío
export const ReportContext = createContext({
  conclusions: [], // Valor inicial
  updateConclusions: () => {}, // Función para actualizar el valor
  setInitialConclusions: () => {} // Función para establecer el valor inicial desde otro archivo
});

// Crea un componente que provee el contexto a sus hijos
export function ReportContextProvider ({ children }) {
  const [conclusions, setConclusions] = useState([{ title: '' }]); // Estado que se va a compartir

  // Función para actualizar el valor del contexto
  function updateConclusions(conclusion) {
    setConclusions((prevConclusions) => {
      // Si el valor ya existe en el arreglo, lo remueve
      if (prevConclusions.find(cl => cl.title === conclusion.title)) {
        return prevConclusions.filter(cl => cl.title !== conclusion.title);
      } else {
        // Si no existe, lo agrega
        return [...prevConclusions, conclusion];
      }
    });
  }

  // Función para establecer el valor inicial de conclusions desde fuera del archivo
  function setInitialConclusions(initialValue) {
    setConclusions(initialValue);
  }

  // Crea un objeto con el valor y la función para actualizarlo
  const value = {
    conclusions,
    updateConclusions,
    setInitialConclusions // Incluimos la función en el contexto
  };

  return (
    <ReportContext.Provider value={value}>
      {children} {/* Renderiza los hijos */}
    </ReportContext.Provider>
  );
}
