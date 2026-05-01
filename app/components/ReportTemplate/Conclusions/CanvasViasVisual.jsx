import { ReportContext } from '@/src/context'
import Image from 'next/image'
import { useContext ,useEffect,useRef} from 'react'

// Se recibe el objeto de la imagen y las reglas
export function ConclusionCanvasV ({ img: {src, alt, useMap, width, height}, rules, footertext = '', userImageUrl = '', patientName = '' }) {
  // Utiliza el contexto para obtener las conclusiones
  const { conclusions } = useContext(ReportContext)
  const imgRef = useRef(null);
  const hasFooter = footertext !== '' && footertext !== null && footertext !== undefined;

  useEffect(() => {
    if (imgRef.current) {
      console.log('Imagen offsetWidth:',  imgRef.current.offsetWidth);
      console.log('Imagen offsetHeight:', imgRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className='image-container relative' style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'inline-block' }}>

      {/* Nombre del paciente en el header del canvas */}
      {patientName && (
        <div style={{
          position: 'absolute',
          top: 6,
          left: 0,
          width: '100%',
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: '600',
          color: '#333',
          zIndex: 15,
          pointerEvents: 'none',
          letterSpacing: '0.3px',
        }}>
          {patientName}
        </div>
      )}

      <Image
        className='image-container__image'
        src={src}
        alt={alt}
        useMap={useMap}
        width={width}
        height={height}
        ref={imgRef}

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
     { /* Imagen del usuario en la esquina superior derecha */}
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
                  backgroundColor: 'rgb(255, 255, 255)',
      
                  zIndex: 20
                }}
              >
                <Image 
                  src={userImageUrl}
                  alt="User Profile"
                  layout="fill"
                  objectFit="cover"
                  backgroundColor='rgb(255, 255, 255)'
      
                />
              </div>
            )}
            {/* Se agrega el footer sobre la imagen */}
            {hasFooter && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                padding: '6px 10px',
                alignItems: 'center',
                fontSize: '9.5px',
                lineHeight: '1.3',
                color: '#6b7280',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderTop: '1px solid #f3f4f6',
              }}>
                {footertext}
              </div>
            )}
    </div>
  )
}
