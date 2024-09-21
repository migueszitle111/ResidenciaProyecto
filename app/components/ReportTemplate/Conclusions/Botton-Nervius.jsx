import { ReportContext } from '@/src/context';
import { useContext } from 'react';


// Se recibe el titulo y el valor de la conclusión
export function NerviusButton ({title, value, displayText}) {
  // Utiliza el contexto para obtener las conclusiones y la función para actualizarlas
  const { updateConclusions, conclusions } = useContext(ReportContext)
  // Se crea una clase condicional para cambiar el color del botón
  const classnames = 'cursor-pointer p-2 text-white transition-colors duration-300 ease-in hover:bg-[#8F3400]  ' + (conclusions.find(cl => cl.value === value) ? 'bg-transparent' : 'bg-[#c44900]') + ' rounded-[100px]';


  // Función para actualizar las conclusiones
  function handleClick () {
    updateConclusions({ title, value})
  } 

  // Se retorna el botón   checar los clicks de 
  return (
      <div className={classnames} onClick={handleClick} >
        {displayText || title}
      </div>
      
  )
}