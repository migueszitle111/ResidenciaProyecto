import { ReportContext } from '@/src/context'
import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react'

// Se recibe el objeto de la imagen y las reglas
export function ConclusionCanvas ({ img: {src, alt, useMap, width, height}, rules, footertext = '', userImageUrl = '', patientName = '' }) {
  const { conclusions } = useContext(ReportContext)
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      console.log('Imagen offsetWidth:',  imgRef.current.offsetWidth);
      console.log('Imagen offsetHeight:', imgRef.current.offsetHeight);
    }
  }, []);

  // Determinar si hay contenido real en footertext
  const hasFooter = footertext !== '' && footertext !== null && footertext !== undefined;

  return (
    <div className='image-container relative' style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'inline-block' }}>

      {/* Nombre del paciente en el header del canvas (como la app nativa) */}
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

      {/* Overlays de diagnóstico */}
      {Object.entries(rules).map(([rule, { expectedValue, image }]) => {
        const isImageArray = Array.isArray(image);
        if (conclusions.find(cl => cl.value === expectedValue)) {
          return isImageArray ? (
            image.map((img, index) => (
              <Image
                key={`${rule}-${index}`}
                src={'/assets/' + img.src}
                alt={img.alt}
                layout='fill'
                className='absolute'
              />
            ))
          ) : (
            <Image
              key={rule}
              src={'/assets/' + image.src}
              alt={image.alt}
              layout='fill'
              className='absolute'
            />
          );
        }
        return null;
      })}

      {/* Logo/foto del usuario — esquina superior derecha */}
      {userImageUrl && (
        <div style={{
          position: 'absolute',
          top: 5,
          right: 5,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#fff',
          zIndex: 20,
          border: '1.5px solid #e5e7eb',
        }}>
          <Image
            src={userImageUrl}
            alt="User Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {/* Footer con datos del doctor */}
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
