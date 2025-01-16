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

// Variable y función adicional
var value = 1;

export function darvalor() {
  value += 1;
  return value;
}

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
  const [activeInternalValues, setActiveInternalValues] = useState({});

  function toggleInternalValue(value) {
    setActiveInternalValues((prev) => {
      if (prev[value]) {
        const newState = { ...prev };
        delete newState[value];
        return newState;
      }
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
      setActiveValue(isActive ? null : value);
    } else {
      toggleInternalValue(value);
    }
    // Ejemplo de uso de darvalor (opcional)
    console.log('Nuevo valor:', darvalor());
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

      {isActive && <div className="text-white p-2">{children}</div>}
    </div>
  );
}
