import React from 'react';
import '../UnionMuscular/style.css';
import { PDFDocument } from 'pdf-lib';


// Forzamos SSR sin caché
export const dynamic = 'force-dynamic';

export default function Page({ searchParams }) {
  const conclusiones = JSON.parse(searchParams.conclusiones || "[]");
  const userData = JSON.parse(searchParams.userData || "{}");
  const droppedItems = JSON.parse(searchParams.droppedItems ?? "[]");



  const showBulbar = !!conclusiones.find((c) => c.value === "bulbar");
  const showPresinaptico = !!conclusiones.find((c) => c.value === "tipo_presinaptico");
  const showPostsinaptico = !!conclusiones.find((c) => c.value === "tipo_postsinaptico");
  const showDistal = !!conclusiones.find((c) => c.value === "distal");
  const showProximal = !!conclusiones.find((c) => c.value === "proximal");

  return (
    <>
      {userData.imageUrl && (
        <img
          className="user-logo"
          src={userData.imageUrl}
          alt="Logo Usuario"
        />
      )}

      <div className="container">
        <div className="image-container">
        {droppedItems.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            // ancho, alto si hicieras resizing 
          }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      ))}
      
        </div>
          <div className="image-stack">
            <img
              src="/assets/UnionMuscularIMG/BP_UnionMuscular.png"
              alt="Unión Neuromuscular Base"
            />

            {showBulbar && (
              <img
                src="/assets/UnionMuscularIMG/UN_Bulbar.png"
                alt="Bulbar"
              />
            )}
            {showPresinaptico && (
              <img
                src="/assets/UnionMuscularIMG/UN_Presinaptico.png"
                alt="Presináptico"
              />
            )}
            {showPostsinaptico && (
              <img
                src="/assets/UnionMuscularIMG/UN_Postsinaptico.png"
                alt="Postsináptico"
              />
            )}
            {showDistal && (
              <img
                src="/assets/UnionMuscularIMG/UN_Distal.png"
                alt="Distal"
              />
            )}
            {showProximal && (
              <img
                src="/assets/UnionMuscularIMG/UN_Proximal.png"
                alt="Proximal"
              />
            )}

            
          </div>
       

        <div id="conclusionDiv">
          {conclusiones.map((c) => c.title).join(" ")}
        </div>

      

        <div className="user-data">
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
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span>{userData.name} {userData.lastname}</span>
            </div>
          )}

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
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>{userData.email}</span>
            </div>
          )}

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
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 2l-6 3.99L6 4h12z" />
              </svg>
              <span>Cédula: {userData.cedula}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}