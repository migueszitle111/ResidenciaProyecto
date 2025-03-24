import { ReportContext } from '@/src/context'
import { useContext } from 'react'

export function ConclusionButton({ title, value, displayText, onClick }) {
  const { updateConclusions, conclusions } = useContext(ReportContext)

  function handleClick() {
    if (onClick) {
      // Si el padre nos pasó un onClick, usamos esa función
      onClick(title, value)
    } else {
      // De lo contrario, guardamos en el contexto TODA la info que quieras
      updateConclusions({
        title,                 // texto que usas en la conclusión (legible)
        value,                 // palabra clave interna para overlays
        displayText: displayText || title, 
      })
    }
  }

    // Se crea una clase condicional para cambiar el color del botón
    const classnames = 
    'cursor-pointer p-2 text-white transition-colors transition-300 ease-in hover:bg-[#8F3400] ' +
    (conclusions.find(cl => cl.value === value) ? 'bg-[#c44900]' : '')
  
  return (
    <div className={classnames} onClick={handleClick}>
      {displayText || title}
    </div>
  )
}
