import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function SegmentariaButton({ title, value, displayText }) {
  const { updateConclusions, conclusions } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);

  // Verifica si el valor ya está en las conclusiones
  const isSelected = conclusions.find(cl => cl.value === value);

  // Clase condicional para que sea completamente transparente por defecto y se pinte al hacer clic o hover
  const classnames = 'cursor-pointer w-[3.5px] h-[18px] text-xs flex items-center justify-center text-white transition-colors duration-300 ease-in ' +
  (selectedButton === value ? 'bg-[#c44900]' : 'bg-transparent')  + ' rounded-[50px]';

  // Función para actualizar las conclusiones
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

