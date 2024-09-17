import { ReportContext } from '@/src/context';
import { createContext, useContext, useState } from 'react';

var value=1;
export function darvalor({value}){
value += 1
}

// Crea un contexto para el reporte con un valor inicial vacío
export const AccordionValuesContext = createContext({
  activeValue: value,
  setActiveValue: () => {}
})

// Crea un componente que provee el contexto a sus hijos
export function AccordionContainer ({ children }) {
  const [activeValue, setActiveValue] = useState(null); // Inicializa el estado correctamente

  const value = { activeValue, setActiveValue } // Crea un objeto con el valor y la función para actualizarlo
  // Renderiza los hijos
  return (
    <AccordionValuesContext.Provider value={value}>
      {children}
    </AccordionValuesContext.Provider>
  )
}

// Crea un componente que recibe un valor y un título
// Si el valor es igual al valor activo, muestra el contenido
export function Accordion ({ children, value, title, displayText, onToggle }) {
  const { updateConclusions } = useContext(ReportContext);

  const { setActiveValue } = useContext(AccordionValuesContext) // Obtiene la función para actualizar el valor activo
  const [active, setActive] = useState(false) // Estado para saber si el acordeón está activo

  function handleClick () {
    //updateConclusions({ title });
    setActive(prev => !prev);
    setActiveValue(prev => prev === value ? null : value);
    if (onToggle) onToggle(); // Asegúrate de que onToggle esté definido
    
  }

  // Renderiza el título y el contenido
  return (
    <div className='p-2'>
      <h2 className={'text-white cursor-pointer p-2 rounded-md transition-colors transition-300 ease-in hover:bg-[#8F3400]' + (active ? ' active bg-[#c44900]' : '')} onClick={handleClick}>{title}</h2>
      {active && <div className='text-white p-2'>{children}</div>}
    </div>  
  )
}