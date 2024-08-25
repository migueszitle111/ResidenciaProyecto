import { ReportContext } from '@/src/context'
import Image from 'next/image'
import { useContext } from 'react'

// Se recibe el objeto de la imagen y las reglas
export function ConclusionCanvas ({ img: {src, alt, useMap, width, height}, rules }) {
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
        // Cada regla tiene un valor esperado y una imagen
        // Si el valor esperado se encuentra en las conclusiones, se muestra la imagen
        Object.entries(rules).map(([rule, { expectedValue, image: {src, alt} }]) => {
          return conclusions.find(cl => cl.value === expectedValue) && (
              <Image
                key={rule} 
                src={'/assets/'+ src}
                alt={alt}
                layout='fill'
                className='absolute'
              />
          )
        })
      }
    </div>
  )
}