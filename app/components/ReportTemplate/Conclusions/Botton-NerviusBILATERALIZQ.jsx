import { ReportContext } from '@/src/context';
import { useContext, useState } from 'react';

export function NerviusButtonBILATERALIZQ({ title, value, displayText, additionalInfo }) {
  const { conclusions } = useContext(ReportContext);
  const [selectedButton, setSelectedButton] = useState(null);

  // Verifica si el valor ya está en las conclusiones
  const isSelected = conclusions.find(cl => cl.value === value);

  // Clase condicional para el botón
  const classnames = 'cursor-pointer p-1 text-sm text-white transition-colors duration-300 ease-in ' + 
    (selectedButton === value ? 'bg-[#c44900]' : 'bg-transparent') + ' rounded-[50px] z-50 relative';

  // Función para manejar el clic
  function handleClick() {
    setSelectedButton(prev => (prev === value ? null : value));
  }

  return (
    <div>
      {/* Botón principal */}
      <div className={classnames} onClick={handleClick}>
        {displayText || title}
      </div>

      {/* Información adicional que aparece cuando el botón está seleccionado */}
      {selectedButton === value && additionalInfo && (
        <div className="mt-2 p-2 bg-gray-200 text-black rounded-md shadow-md">
          {additionalInfo}
        </div>
      )}
    </div>
  );
}
