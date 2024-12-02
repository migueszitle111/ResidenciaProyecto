import { ReportContext } from '@/src/context';
import { useContext } from 'react';

export function SegmentariaButton({ title, value, displayText }) {
 const { updateConclusions, conclusions } = useContext(ReportContext);

  // Verifica si el valor ya está en las conclusiones
  const isSelected = conclusions.find(cl => cl.value === value);

  // Clase condicional para que sea completamente transparente por defecto y se pinte al hacer clic o hover
  const classnames = 'cursor-pointer w-[3.5px] h-[18px] text-xs flex items-center justify-center text-white transition-colors duration-300 ease-in ' + 
    (isSelected ? 'bg-[#c44900]' : 'bg-transparent hover:bg-[#c44900]') + ' rounded-full';

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
