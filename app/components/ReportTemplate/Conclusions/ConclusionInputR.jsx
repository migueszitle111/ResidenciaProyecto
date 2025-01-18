import React, { useState, useContext } from "react";
import { ReportContextR } from "@/src/context";

export function ConclusionInputR({
  valueKey,         // "value" único con que identificarás la conclusión
  placeholder,      // texto a mostrar cuando está vacío
  defaultValue = "",// valor inicial si quieres
  style,            // estilos opcionales
}) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const { updateConclusions } = useContext(ReportContextR);

  // Cada vez que el usuario teclea:
  const handleChange = (e) => {
    const newText = e.target.value;
    setLocalValue(newText);

    // Si está vacío, quita la conclusión
    if (newText.trim() === "") {
      updateConclusions({ value: valueKey, remove: true });
    } else {
      // De lo contrario, actualiza con el texto actual
      updateConclusions({ value: valueKey, title: newText });
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      style={style}
    />
  );
}
