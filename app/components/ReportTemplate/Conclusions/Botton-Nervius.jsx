import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function NerviusButton({ title, value, displayText }) {
  const { updateConclusions, conclusions } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);

  // Verifica si el valor ya está en las conclusiones
  const isSelected = conclusions.find(cl => cl.value === value);

  // Clase condicional para que el botón seleccionado sea visible y los demás transparentes
  const classnames = 'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' + 
  (conclusions.find(cl => cl.value === value) ? 'bg-[#c44900]' : 'bg-transparent') + ' rounded-[50px]';

 // Función para actualizar las conclusiones
 function handleClick() {
  updateConclusions({ title, value });
  }

  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  );
}