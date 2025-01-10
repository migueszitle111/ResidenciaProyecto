import { ReportContext } from '@/src/context'
import { useContext } from 'react'

// Se recibe el titulo y el valor de la conclusión
export function ConclusionButton({ title, value, displayText, onClick }) {
  // Utiliza el contexto para obtener las conclusiones y la función para actualizarlas
  const { updateConclusions, conclusions } = useContext(ReportContext)

  // Se crea una clase condicional para cambiar el color del botón
  const classnames = 
    'cursor-pointer p-2 text-white transition-colors transition-300 ease-in hover:bg-[#8F3400] ' +
    (conclusions.find(cl => cl.value === value) ? 'bg-[#c44900]' : '')

  // Función para actualizar las conclusiones
  function handleClick() {
    if (onClick) {
      // Si el padre nos pasó un onClick, llamamos a esa función en lugar de hacerlo nosotros
      onClick(title, value)
    } else {
      // De lo contrario, mantenemos el funcionamiento original
      updateConclusions({ title, value })
    }
  }

  // Se retorna el botón
  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  )
}
