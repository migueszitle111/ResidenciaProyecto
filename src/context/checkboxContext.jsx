'use client';       // 👈  debe ser la primera línea

import { createContext, useState, useEffect } from 'react';

// Contexto para mostrar imágenes de los checkboxes
export const CheckboxContext = createContext();

export const CheckboxProvider = ({ children }) => {
  // Estado para manejar los checkboxes de lado izquierdo
  const [checkedStateLeft, setcheckedStateLeft] = useState({
    A1: false, A2: false, A3: false, A4: false,
    A9: false, A10: false, A11: false, A12: false,
    A17: false, A18: false, A19: false, A20: false,
    A25: false, A26: false, A27: false, A28: false,
    A33: false, A34: false, A35: false, A36: false,
    A41: false, A42: false, A43: false, A44: false,
    A49: false, A50: false, A51: false, A52: false,
    A57: false, A58: false, A59: false, A60: false,
    A65: false, A66: false, A67: false, A68: false,
    A73: false, A74: false, A75: false, A76: false,
    A81: false, A82: false, A83: false, A84: false,
    A89: false, A90: false, A91: false, A92: false,
  });

  // Estado para manejar los checkboxes de lado derecho
  const [checkedStateRight, setcheckedStateRight] = useState({
    A5: false, A6: false, A7: false, A8: false,
    A13: false, A14: false, A15: false, A16: false,
    A21: false, A22: false, A23: false, A24: false,
    A29: false, A30: false, A31: false, A32: false,
    A37: false, A38: false, A39: false, A40: false,
    A45: false, A46: false, A47: false, A48: false,
    A53: false, A54: false, A55: false, A56: false,
    A61: false, A62: false, A63: false, A64: false,
    A69: false, A70: false, A71: false, A72: false,
    A77: false, A78: false, A79: false, A80: false,
    A85: false, A86: false, A87: false, A88: false,
    A93: false, A94: false, A95: false, A96: false,
  });

  useEffect(() => {
    // Asegúrate de que el estado inicial sea consistente
    setcheckedStateLeft({
      A1: false, A2: false, A3: false, A4: false,
      A9: false, A10: false, A11: false, A12: false,
      A17: false, A18: false, A19: false, A20: false,
      A25: false, A26: false, A27: false, A28: false,
      A33: false, A34: false, A35: false, A36: false,
      A41: false, A42: false, A43: false, A44: false,
      A49: false, A50: false, A51: false, A52: false,
      A57: false, A58: false, A59: false, A60: false,
      A65: false, A66: false, A67: false, A68: false,
      A73: false, A74: false, A75: false, A76: false,
      A81: false, A82: false, A83: false, A84: false,
      A89: false, A90: false, A91: false, A92: false,
    });
    setcheckedStateRight({
      A5: false, A6: false, A7: false, A8: false,
      A13: false, A14: false, A15: false, A16: false,
      A21: false, A22: false, A23: false, A24: false,
      A29: false, A30: false, A31: false, A32: false,
      A37: false, A38: false, A39: false, A40: false,
      A45: false, A46: false, A47: false, A48: false,
      A53: false, A54: false, A55: false, A56: false,
      A61: false, A62: false, A63: false, A64: false,
      A69: false, A70: false, A71: false, A72: false,
      A77: false, A78: false, A79: false, A80: false,
      A85: false, A86: false, A87: false, A88: false,
      A93: false, A94: false, A95: false, A96: false,
    });
  }, []);

  // Función para manejar los cambios de checkboxes en el lado izquierdo
  const handleCheckboxChangeLeft = (id, value) => {
    setcheckedStateLeft((prevState) => ({
      ...prevState,
      [id]: value, // Actualiza solo el checkbox seleccionado, sin modificar los demás
    }));
  };

  // Función para manejar los cambios de checkboxes en el lado derecho
  const handleCheckboxChangeRight = (id, value) => {
    setcheckedStateRight((prevState) => ({
      ...prevState,
      [id]: value, // Actualiza solo el checkbox seleccionado, sin modificar los demás
    }));
  };

  const resetCheckboxes = () => {
    setcheckedStateLeft({
      A1: false, A2: false, A3: false, A4: false,
      A9: false, A10: false, A11: false, A12: false,
      A17: false, A18: false, A19: false, A20: false,
      A25: false, A26: false, A27: false, A28: false,
      A33: false, A34: false, A35: false, A36: false,
      A41: false, A42: false, A43: false, A44: false,
      A49: false, A50: false, A51: false, A52: false,
      A57: false, A58: false, A59: false, A60: false,
      A65: false, A66: false, A67: false, A68: false,
      A73: false, A74: false, A75: false, A76: false,
      A81: false, A82: false, A83: false, A84: false,
      A89: false, A90: false, A91: false, A92: false,
    });
    setcheckedStateRight({
      A5: false, A6: false, A7: false, A8: false,
      A13: false, A14: false, A15: false, A16: false,
      A21: false, A22: false, A23: false, A24: false,
      A29: false, A30: false, A31: false, A32: false,
      A37: false, A38: false, A39: false, A40: false,
      A45: false, A46: false, A47: false, A48: false,
      A53: false, A54: false, A55: false, A56: false,
      A61: false, A62: false, A63: false, A64: false,
      A69: false, A70: false, A71: false, A72: false,
      A77: false, A78: false, A79: false, A80: false,
      A85: false, A86: false, A87: false, A88: false,
      A93: false, A94: false, A95: false, A96: false,
    });
  };

  return (
    <CheckboxContext.Provider
      value={{
        checkedStateLeft,
        setcheckedStateLeft,
        handleCheckboxChangeLeft,
        checkedStateRight,
        setcheckedStateRight,
        handleCheckboxChangeRight,
        resetCheckboxes,
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};