import { createContext, useContext, useState } from 'react';

// Contexto para acordeones externos (solo uno abierto)
export const AccordionValuesContext = createContext({
  activeValue: null,
  setActiveValue: () => {},
});

// Contexto para acordeones internos (varios abiertos)
export const InternalAccordionContext = createContext({
  activeInternalValues: {},
  toggleInternalValue: () => {},
});

// Proveedor para acordeones externos
export function AccordionContainer({ children }) {
  const [activeValue, setActiveValue] = useState(null);

  return (
    <AccordionValuesContext.Provider value={{ activeValue, setActiveValue }}>
      {children}
    </AccordionValuesContext.Provider>
  );
}

// Proveedor para acordeones internos
export function InternalAccordionContainer({ children }) {
  // En este caso guardamos un objeto cuyas keys son los 'value' de cada acordeón
  // y su valor es true/false si está abierto o no
  const [activeInternalValues, setActiveInternalValues] = useState({});

  function toggleInternalValue(value) {
    setActiveInternalValues(prev => {
      // Si ya está abierto, lo cerramos
      if (prev[value]) {
        const newState = { ...prev };
        delete newState[value];
        return newState;
      } 
      // Si está cerrado, lo abrimos (sin cerrar otros)
      return {
        ...prev,
        [value]: true,
      };
    });
  }

  return (
    <InternalAccordionContext.Provider
      value={{ activeInternalValues, toggleInternalValue }}
    >
      {children}
    </InternalAccordionContext.Provider>
  );
}

// Componente Accordion
// type = "external" => maneja la lógica de un solo abierto
// type = "internal" => maneja la lógica de múltiples abiertos
export function Accordion({ children, value, title, type = 'external' }) {
  const { activeValue, setActiveValue } = useContext(AccordionValuesContext);
  const { activeInternalValues, toggleInternalValue } = useContext(InternalAccordionContext);

  const isExternal = type === 'external';

  // Determina si está activo según si es externo o interno
  const isActive = isExternal
    ? activeValue === value
    : !!activeInternalValues[value]; // true/false

  function handleClick() {
    if (isExternal) {
      // Cierra el que esté abierto y abre este (lógica de "solo uno abierto")
      setActiveValue(isActive ? null : value);
    } else {
      // Interno => se permite abrir/cerrar varios
      toggleInternalValue(value);
    }
  }

  return (
    <div className="p-2">
      <h2
        className={`text-white cursor-pointer p-2 rounded-md 
                    hover:bg-[#8F3400] transition-colors transition-300 ease-in 
                    ${isActive ? 'bg-[#c44900]' : ''}`}
        onClick={handleClick}
      >
        {title}
      </h2>

      {/* Si está activo, muestra el contenido */}
      {isActive && <div className="text-white p-2">{children}</div>}
    </div>
  );
}
