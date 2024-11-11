// ButtonContext.js
import React, { createContext, useContext, useState } from 'react';

const ButtonContext = createContext();

export const useButtonContext = () => useContext(ButtonContext);

export const ButtonProvider = ({ children }) => {
  const [activeButtons, setActiveButtons] = useState({});

  const toggleButton = (value) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  return (
    <ButtonContext.Provider value={{ activeButtons, toggleButton }}>
      {children}
    </ButtonContext.Provider>
  );
};
