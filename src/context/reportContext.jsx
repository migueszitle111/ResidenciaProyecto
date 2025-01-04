import { createContext, useState } from 'react'

// Valor inicial del contexto
export const ReportContext = createContext({
  conclusions: [],
  updateConclusions: () => {},
  setInitialConclusions: () => {},
  removeConclusion: () => {}
})

export function ReportContextProvider({ children }) {
  const [conclusions, setConclusions] = useState([{ title: '' }])

  // 1) Función para agregar/quitar conclusiones a modo "toggle"
  function updateConclusions(conclusion) {
    setConclusions((prevConclusions) => {
      // Si 'value' ya existe, lo removemos
      if (prevConclusions.find((cl) => cl.value === conclusion.value)) {
        return prevConclusions.filter((cl) => cl.value !== conclusion.value)
      } else {
        // Si no existe, lo agregamos
        return [...prevConclusions, conclusion]
      }
    })
  } // <-- Cierra correctamente la llave AQUÍ

  // 2) (Opcional) Función para setear conclusiones desde fuera
  function setInitialConclusions(initialValue) {
    setConclusions(initialValue)
  }

  // 3) (Opcional) Función para eliminar un 'value' sin toggle
  function removeConclusion(value) {
    setConclusions((prev) => prev.filter((cl) => cl.value !== value))
  }

  // 4) Creamos el objeto con todo lo que exponemos
  const value = {
    conclusions,
    updateConclusions,
    setInitialConclusions,
    removeConclusion // <- solo si lo vas a usar
  }

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  )
}
