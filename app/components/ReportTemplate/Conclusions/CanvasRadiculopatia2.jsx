import { ReportContextR, useButtonContext  } from '@/src/context'
import Image from 'next/image'
import { useContext } from 'react'

// Se recibe el objeto de la imagen y las reglas
export function ConclusionCanvasR2 ({ img: {src, alt, useMap, width, height}, rules }) {
  // Utiliza el contexto para obtener las conclusiones
  const { conclusions } = useContext(ReportContextR)
  const { activeButtons } = useButtonContext()
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
        Object.entries(rules).map(([rule, { expectedValue, image }]) => {
          const isImageArray = Array.isArray(image); // Verifica si es un array
          
          // Comprueba si la conclusión coincide con la regla
          //if (conclusions.find(cl => cl.value === expectedValue)) {
            //if (activeButtons[expectedValue]){
              const inConclusions = conclusions.some(cl => cl.value === expectedValue)
              const inActiveButtons = activeButtons[expectedValue]
              if (inConclusions || inActiveButtons) {
            return isImageArray ? (
              // Renderiza ambas imágenes si es un array
              image.map((img, index) => (
                <Image
                  key={`${rule}-${index}`} // Usa un key único para cada imagen
                  src={'/assets/'+ img.src}
                  alt={img.alt}
                  layout='fill'
                  className='absolute'
                />
              ))
            ) : (
              // Renderiza la imagen única si no es un array
              <Image
                key={rule}
                src={'/assets/'+ image.src}
                alt={image.alt}
                layout='fill'
                className='absolute'
              />
            );
          }
          return null; // Retorna null si no se cumple la condición
        })
      }
    </div>
  )
}
