// app/ReporteImprimir/UnionMuscular/page.jsx
import React from 'react'

// Forzamos SSR sin caché
export const dynamic = 'force-dynamic'

export default function Page({ searchParams }) {
  // 1) Parseamos los datos de la URL
  const conclusiones = JSON.parse(searchParams.conclusiones || '[]')
  const imagenes = JSON.parse(searchParams.imagenes || '[]')
  const userData = JSON.parse(searchParams.userData || '{}')

  // 2) Verificamos qué overlays mostrar
//   const showBulbar        = !!conclusiones.find(c => c.value === 'bulbar')
//   const showPresinaptico  = !!conclusiones.find(c => c.value === 'tipo_presinaptico')
//   const showPostsinaptico = !!conclusiones.find(c => c.value === 'tipo_postsinaptico')
//   const showDistal        = !!conclusiones.find(c => c.value === 'distal')
//   const showProximal      = !!conclusiones.find(c => c.value === 'proximal')

  return (
    <html>
      <head>
        <title>Reporte Neuronopatia (SSR)</title>
        <meta charSet="utf-8" />
        <style>{`
          /* Reset básico */
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #fff;
            color: #000;
          }

        /* Contenedor principal para centrar y limitar ancho */
        .container {
          width: 700px; 
          height: 800px;
          margin: 10px auto; 
          align-items: center;
          position: relative;
        }

       /* Logo del usuario (si existe) arriba a la derecha */
       .user-logo {
         position: absolute;
         top: 10px;
         right: 20px;
         width: 60px;
         height: 60px;
         border-radius: 50%;
         object-fit: cover;
         border: 2px solid #999;
       }

       /* "image-stack": imagen base + overlays */
        
      .image-stack {
        position: relative;
        width: 700px;
        height: 900px;
        overflow: hidden;
        justify-content: center;
         z-index:0;
      }

      .drop-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 700px;
        height: 600px;
        overflow: hidden;
        background-color: transparent;
        z-index: 10; /* sobre la imagen base */
      }
          .image-stack img {
            position: absolute;
            top: 0;
            left: 0;
            width: 800px;
            height: 700px;
            object-fit: contain; 
            align-items: center;
          }
        
          /* Bloque de datos de usuario (Name, Email, etc.) */
         .user-data {
          display: flex;
          flex-wrap: wrap;
          gap: 16px; 
          font-size: 10px;
          opacity: 50%;
          margin-top: 230px;
          align-items: center;
          justify-content: center; /* Centra horizontalmente los elementos */
          
        }  
          .user-data svg {
            margin-right: 4px;
          }
          .user-data > div {
            display: inline-flex;
            align-items: center;
            gap: 4px; 
          }

          /* Conclusiones */
          #conclusionDiv {
            margin-top: -150px;
            padding: 12px;
            font-size: 14px;
            line-height: 1.4;

          }
        `}</style>
      </head>
      <body>
        
          {/* Logo (si existe) */}
          {userData.imageUrl && (
            <img
              className="user-logo"
              src={userData.imageUrl}
              alt="Logo Usuario"
            />
          )}
        <div className="container">


          {/* Imagen base + Overlays */}
          <div className="image-stack">
            {/* Imagen base */}
            <img
              src="/assets/NeuronoImg/BP_Neuronopatia.png"
              alt="Neuronopatia"
            />

          </div>

          {/* dropArea con imágenes arrastradas */}
          <div id="dropArea" className="drop-area">
            {imagenes.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={`arrastrada-${i}`}
                style={{
                  position: 'absolute',
                  left: img.x,
                  top: img.y,
                  width: img.width,
                  height: img.height,
                  objectFit: 'contain'
                }}
              />
            ))}
          </div>
          
          {/* Conclusiones */}
          <div id="conclusionDiv">
            {conclusiones.map(c => c.title).join(' ')}
          </div>

          {/* Datos de usuario en un bloque con íconos */}
          <div className="user-data">
            
            {/* Nombre */}
            {userData.name && (
              <div id="footerName">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Usuario"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                           1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                           0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>{userData.name} {userData.lastname}</span>
              </div>
            )}

            {/* Email */}
            {userData.email && (
              <div id="footerEmail">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Email"
                >
                  <path d="M20 4H4c-1.1 0-2 
                           .9-2 2v12c0 1.1.9 2 2 2h16c1.1 
                           0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
                           4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>{userData.email}</span>
              </div>
            )}

            {/* Especialidad */}
            {userData.especialidad && (
              <div id="footerEspecialidad">
                <svg
                  version="1.1"
                  id="ICONOS"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 90 90"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-label="Especialidad"
                >
                  <path d="M45.12,61.02c0,0,0,7.32-4.79,7.32h-8.68c-1.82,0-3.29-1.47-3.29-3.29c0,0-2.39-8.68-2.65-8.68l-2.88-1.21
                           c-1.57-0.66-2.31-2.46-1.66-4.03l4.8-9.65v-0.67c0-11.9,9.65-21.55,21.55-21.55s21.55,9.65,21.55,21.55
                           c0,5.12-1.8,9.84-4.79,13.54v16.39"/>
                </svg>
                <span>{userData.especialidad}</span>
              </div>
            )}

            {/* Cédula */}
            {userData.cedula && (
              <div id="footerCedula">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Cédula"
                >
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 
                           1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 
                           2l-6 3.99L6 4h12z" />
                </svg>
                <span>Cédula: {userData.cedula}</span>
              </div>
            )}
          </div>

        </div>
      </body>
    </html>
  )
}
