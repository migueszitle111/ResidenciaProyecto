import React, { createContext, useContext, useState } from 'react';

const ButtonContext = createContext();

export const useButtonContext = () => {
  return useContext(ButtonContext);
};

export const ButtonContextProvider = ({ children }) => {
  const [activeButtons, setActiveButtons] = useState({});

  // La función para "togglEar" un botón ya la tienes
  const toggleButton = (value) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  // Agrega la siguiente función para dejar el objeto vacío,
  // con lo cual visualmente todos se vuelven "no presionados"
  const resetAllButtons = () => {
    setActiveButtons({});
  };

  return (
    <ButtonContext.Provider value={{ 
      activeButtons, 
      toggleButton,
      resetAllButtons    // <-- la expones aquí
    }}>
      {children}
    </ButtonContext.Provider>
  );
};
