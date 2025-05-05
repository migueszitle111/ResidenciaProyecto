// app/api/pdf/generate-pdf/neuropatia/route.js

// --------------------------- IMPORTS ---------------------------
import { NextResponse }        from 'next/server';           // sin “type”
import puppeteer               from 'puppeteer';             // Dev
import puppeteerCore           from 'puppeteer-core';        // Prod (λ)
import chromium                from '@sparticuz/chromium-min';

export const runtime = 'nodejs';          // ⚠️ va después de los imports
export const dynamic = 'force-dynamic';   // (opcional) evita caché de Vercel

// ---------------------------------------------------------------
const isDev  = process.env.NODE_ENV !== 'production';
const baseUrl = isDev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_URL;


// ───────────────────────── helpers ────────────────────────────
async function launchBrowser() {
  if (isDev) {
    // Puppeteer normal en local
    return puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  // Puppeteer‑core + Chromium empaquetado en Vercel
  const executablePath = await chromium.executablePath(
    'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
  );

  return puppeteerCore.launch({
    executablePath,
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });
}



/* ---------- 1.  CSS incrustado ---------- */
const pdfCSS = /* css */ `
@page {
  size: A4 portrait;
  margin: 1cm 1.5cm;
}

body{
  font-family: Arial, Helvetica, sans-serif;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* textarea “invisible” en el PDF               */
textarea{
  color:#fff !important;
  background:#fff !important;
  caret-color:#fff !important;
  border:none !important;
}


/* ---------- contenedor de la lámina ---------- */
.stack{
  position:relative;
  width:1000px;
  height:1400px;
  margin:0 auto;
}
.stack img{
  position:absolute;
  inset:0;
  width:1000px;
  height:1400px;
  object-fit:contain;
}
.base  { z-index:1; }
.rule  { z-index:1; }
.paint { z-index:2; }

.buttons-wrapper{
  position:relative;
  z-index:3;
}

.conclusion-container {
  background:#fff;
  position:absolute;         
  top: 1151px;                
  left:0; right:0;          
  margin-inline:0cm;        
  margin-block-start:0cm; 
 padding:0cm;      
  background:#fff;
  font-size:17px;
  z-index:4;    
  margin-top: 2px;   
  white-space: pre-line;  
 line-height:1.8;          
 text-align:justify;       
 text-justify:inter-word;  
 hyphens:auto;
 -webkit-hyphens:auto;
 -ms-hyphens:auto;
}   


.user-logo{             /* lo paso a la hoja global para que no se repita */
  position:fixed; top:20px; right:20px;
  width:60px; height:60px;
  opacity:.5; object-fit:cover; z-index:9999;
}
.user-data{
  position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
  font-size:10px; opacity:.5; text-align:center; z-index:9999;
}

`;

/* ---------- 2.  plantilla HTML ---------- */
function buildHtml({
  finalConclusion  = '',
  userData         = {},
  topLeftText      = '',
  overlayHtml      = '',
  buttonsOverlay   = '',
  canvasImage      = '',
  baseImgData      = ''
} = {}) {

  const { name, lastname, cedula, email, especialidad, imageUrl } = userData;

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Reporte Neuropatía</title>
    <style>
      ${pdfCSS}

      .user-logo {
        position: fixed;
        top: 10px;
        right: 20px;
        width: 60px;
        height: 60px;
        opacity: 0.5;
        object-fit: cover;
        z-index: 9999;
      }

      .top-left-text {
        position: fixed;
        top: 20px;
        left: 45px;
        font-size: 23px;
        color: black;
        z-index: 9999;
      }

      .user-data {
        position: fixed;
  bottom: 20px;
  left: 50%;               /* centrado horizontal */
  transform: translateX(-50%);
  font-size: 12px;         /* ↑ un poco más grande que antes */
  opacity: .5;
  display: flex;           /* todo en una sola línea */
  gap: 20px;               /* espacio entre bloques (nombre, mail…) */
  align-items: center;
  white-space: nowrap;     /* impide saltos de línea */
  z-index: 9999;
      }
    </style>
  </head>

  <body>
    <!-- Logo (arriba-derecha) -->
   ${
      userData.imageUrl
        ? `<img class="user-logo" src="${userData.imageUrl}" alt="Logo Usuario" />`
        : ""
    }


    <!-- Texto en la esquina superior izquierda -->
    <div class="top-left-text">
      ${topLeftText}
    </div>

    <!-- Imagen Base -->
    <div class="stack">
     
    
      ${canvasImage ? `<img src="${canvasImage}" class="paint" />` : ''}
     
    </div>

    <!-- Conclusiones -->
    <div class="conclusion-container">
      ${finalConclusion}
    </div>

    <!-- Footer con datos del usuario -->
  <div class="user-data">
      ${
          userData.name
            ? `
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
                <span>Dr. ${userData.name} ${userData.lastname ?? ""}</span>
              </div>
            `
            : ""
        }
        ${
          userData.email
            ? `
              <div id="footerEmail">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Email"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 
                           2v12c0 1.1.9 2 2 2h16c1.1 0 
                           2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
                           4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>${userData.email}</span>
              </div>
            `
            : ""
        }
        ${
          userData.especialidad
            ? `
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
                  <path d="M45.12,61.02c0,0,0,
                           7.32-4.79,7.32h-8.68c-1.82,
                           0-3.29-1.47-3.29-3.29
                           c0,0-2.39-8.68-2.65-8.68l-2.88-1.21
                           c-1.57-0.66-2.31-2.46-1.66-4.03l4.8-9.65v-0.67
                           c0-11.9,9.65-21.55,21.55-21.55s21.55,9.65,21.55,21.55
                           c0,5.12-1.8,9.84-4.79,13.54v16.39"/>
                </svg>
                <span>${userData.especialidad}</span>
              </div>
            `
            : ""
        }
        ${
          userData.cedula
            ? `
              <div id="footerCedula">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Cédula"
                >
                  <path d="M20 2H4c-1.1 0-2 
                           .9-2 2v16c0 1.1.9 2 2 2h16c1.1 
                           0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 
                           2l-6 3.99L6 4h12z"/>
                </svg>
                <span>Cédula: ${userData.cedula}</span>
              </div>
            `
            : ""
        }
  </div>
  </body>
  </html>`;
}

/* ---------- 3.  handler POST ---------- */
export async function POST(req){
  try{
    const {
      finalConclusion = '',
      userData        = {},
      topLeftText     = '',
      canvasImage     = '',
      baseImgData     = ''
    } = await req.json();

    /* — tu propia lógica para overlays — */
    const overlayHtml    = '<!-- img regla-sensitiva -->';
    const buttonsOverlay = '<!-- checkDivs -->';

    /* 3-A  construimos HTML */
    const html = buildHtml({
      finalConclusion,
      userData,
      topLeftText,
      overlayHtml,
      buttonsOverlay,
      canvasImage,
      baseImgData
    });

  

    const browser = await launchBrowser({
      args:            isDev ? [] : chromium.args,
      executablePath:  isDev ? undefined : await chromium.executablePath,
      defaultViewport: { width: 800, height: 1100 },
      headless:        true,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1000,    // = igual que .stack
      height: 1400,   // suficiente para stack + conclusiones + footer
      deviceScaleFactor: 1,
    });
    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // 3) Genera el PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF:', err);
    return NextResponse.json(
      { message: 'Error generando PDF' },
      { status: 500 },
    );
  }
}