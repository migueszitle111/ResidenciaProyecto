import { ReportContext } from '@/src/context'
import Image from 'next/image'
import { useContext } from 'react'

// Se recibe el objeto de la imagen, las reglas y el estado de los radios
export function ConclusionCanvas2 ({ img: { src, alt, useMap, width, height }, rules, checkedState }) {
  // Utiliza el contexto para obtener las conclusiones
  const { conclusions } = useContext(ReportContext)
  
  return (
    <div className='image-container relative'>
      <Image
        className='image-container__image'
        src={src}
        alt={alt}
        useMap={useMap}
        width={width}
        height={height}
      />

      {
        // Se mapean las reglas para mostrar las imágenes
        Object.entries(rules).map(([rule, { expectedValue, image: { src, alt } }]) => {
          return conclusions.find(cl => cl.value === expectedValue) && (
            <Image
              key={rule}
              src={'/assets/' + src}
              alt={alt}
              layout='fill'
              className='absolute'
            />
          )
        })
      }

      {
        // Condicional para mostrar las cruces basadas en el estado de los radio buttons
        checkedState.A1 && (
          <Image
            src='/assets/Simbolos/S_Cruz 1.png'
            alt='Cruz 1'
            width={50}
            height={50}
            className='absolute cruz1'
            style={{
              top: '100px',  // Ajusta la posición según sea necesario
              left: '150px', // Ajusta la posición según sea necesario
            }}
          />
        )
        // Agrega más condicionales para otras cruces según sea necesario
      }
    </div>
  )
}
