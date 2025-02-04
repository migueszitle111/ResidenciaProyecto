import { ReportContext } from '@/src/context'
import Image from 'next/image'
import { useContext } from 'react'

// Se recibe el objeto de la imagen y las reglas
export function ConclusionCanvas ({ img: {src, alt, useMap, width, height}, rules ,footertext='', userImageUrl = '' }) {
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
        Object.entries(rules).map(([rule, { expectedValue, image }]) => {
          const isImageArray = Array.isArray(image); // Verifica si es un array
          
          // Comprueba si la conclusión coincide con la regla
          if (conclusions.find(cl => cl.value === expectedValue)) {
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
      {/* Imagen del usuario en la esquina superior derecha */}
      {userImageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 20
          }}
        >
          <Image 
            src={userImageUrl}
            alt="User Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {/* Se agrega el footer sobre la imagen */}
      {footertext && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            display: 'inline-flex',
            marginBottom: '10px',
          }}
        >
          {footertext}
        </div>
      )}
      
    </div>
  )
}
