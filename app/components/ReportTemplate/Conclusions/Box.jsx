import { ReportContext } from '@/src/context'
import { useContext } from 'react'

// Componente que muestra las conclusiones generadas
export function ConclusionBox () {
  const { conclusions } = useContext(ReportContext)

  return (
    <div className='info-box'>
      <div className='selected-words-box dont-print'>
        
        {/* Se utiliza un map para desplegar a la conclusion */}
        {conclusions.map(cl => cl.title).join(', ')}
      </div>
    </div>
  )
}