import { ReportContextR, useButtonContext } from '@/src/context';
import { useContext } from 'react';

// Se recibe el título y el valor de la conclusión
export function ConclusionButtonR({ title, value, displayText, pressed,onClick}) {
  // Utiliza el contexto para obtener las conclusiones y la función para actualizarlas
  const { updateConclusions, conclusions } = useContext(ReportContextR);
  const { activeButtons, toggleButton } = useButtonContext();

  // Verifica si el botón actual está activo en ButtonContext
  const isActive = activeButtons[value];

  // Se crea una clase condicional para cambiar el color del botón
  const classnames = 'cursor-pointer p-2 text-white transition-colors transition-300 ease-in hover:bg-[#8F3400] ' + (pressed ? 'bg-[#c44900]' : '');
  //const classnames = 'cursor-pointer p-2 text-white transition-colors transition-300 ease-in hover:bg-[#8F3400] ' + (conclusions.find(cl => cl.value === value) ? 'bg-[#c44900]' : '');

  // Función para actualizar las conclusiones
  function handleClick() {
    // Alterna el estado activo del botón en ButtonContext
    toggleButton(value);
    // Actualiza la conclusión específica del botón que se hizo clic
    updateConclusions({ title, value });
  }

  // Se retorna el botón
  return (
    <div className={classnames} onClick={onClick}>
      {displayText || title}
    </div>
  );
}
