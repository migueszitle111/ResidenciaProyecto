'use client';       // 👈  debe ser la primera línea

import { createContext, useState } from "react";

export const DropContext = createContext();

export const DropProvider = ({ children }) => {
  const [droppedItems, setDroppedItems] = useState([]);

  return (
    <DropContext.Provider value={{ droppedItems, setDroppedItems }}>
      {children}
    </DropContext.Provider>
  );
};
