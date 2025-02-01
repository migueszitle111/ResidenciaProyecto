import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function NerviusButton({ title, value, displayText }) {
  const { updateConclusions, conclusions } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);
  
  // Verifica si el valor ya está en las conclusiones
  const isSelected = conclusions.find(cl => cl.value === value);
  // Clase condicional para que el botón seleccionado sea visible y los demás transparentes
  const classnames = 'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' + 
    (selectedButton === value ? 'bg-[#c44900]' : 'bg-transparent') + ' rounded-[50px] z-50 relative';

  // Función para actualizar las conclusiones y mostrar o esconder el botón seleccionado
  function handleClick() {
    if (selectedButton === value) {
      // Si ya está seleccionado, deseleccionarlo (hacerlo invisible)
      setSelectedButton(null);
    } else {
      // Si no está seleccionado, seleccionarlo (hacerlo visible)
      setSelectedButton(value);
    }
    updateConclusions({ title, value });
  }

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}







