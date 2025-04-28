// DropContext.jsx
'use client';       // 👈  debe ser la primera línea

import { createContext, useState } from "react";

export const DropContextR = createContext();

export const DropProviderR = ({ children }) => {
  // 1) Estados separados para cada canvas
  const [droppedItemsFront, setDroppedItemsFront] = useState([]);
  const [droppedItemsBack, setDroppedItemsBack] = useState([]);

  return (
    <DropContextR.Provider
      value={{
        droppedItemsFront,
        setDroppedItemsFront,
        droppedItemsBack,
        setDroppedItemsBack
      }}
    >
      {children}
    </DropContextR.Provider>
  );
};
