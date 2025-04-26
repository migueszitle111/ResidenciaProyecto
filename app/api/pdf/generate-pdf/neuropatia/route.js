// app/api/pdf/generate-pdf/neuropatia/route.js
export const runtime = 'nodejs';

import puppeteerDev from 'puppeteer';          // solo se usa en local
import chromium     from '@sparticuz/chromium';

const isDev  = process.env.NODE_ENV !== 'production';

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
  height:1200px;
  margin:0 auto;
}
.stack img{
  position:absolute;
  inset:0;
  width:1000px;
  height:1200px;
  object-fit:contain;
}
.base  { z-index:1; }
.rule  { z-index:1; }
.paint { z-index:2; }

.buttons-wrapper{
  position:relative;
  z-index:3;
}

.conclusion-container{
  background:#fff;
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
        top: 20px;
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
        font-size: 14px;
        color: black;
        z-index: 9999;
      }

      .user-data {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 10px;
        opacity: 0.5;
        text-align: center;
        z-index: 9999;
      }
    </style>
  </head>

  <body>
    <!-- Logo del usuario -->
    ${imageUrl ? `<img src="${imageUrl}" alt="Logo" class="user-logo" />` : ''}

    <!-- Texto en la esquina superior izquierda -->
    <div class="top-left-text">
      ${topLeftText}
    </div>

    <!-- Imagen Base -->
    <div class="stack">
      <img src="${baseImgData}" class="base" />
      ${overlayHtml}
      ${canvasImage ? `<img src="${canvasImage}" class="paint" />` : ''}
      <div class="buttons-wrapper">${buttonsOverlay}</div>
    </div>

    <!-- Conclusiones -->
    <div class="conclusion-container" style="margin-top:20px; padding:10px;">
      ${finalConclusion}
    </div>

    <!-- Footer de datos del usuario -->
    <div class="user-data">
      ${name || lastname ? `<div><strong>${name ?? ''} ${lastname ?? ''}</strong></div>` : ''}
      ${especialidad ? `<div>${especialidad}</div>` : ''}
      ${cedula ? `<div>Cédula: ${cedula}</div>` : ''}
      ${email ? `<div>${email}</div>` : ''}
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

    /* 3-B  lanzamos Puppeteer */
    const puppeteer = isDev
      ? puppeteerDev                              // Full Puppeteer en local
      : (await import('puppeteer-core')).default; // Core + Chromium en prod

    const browser = await puppeteer.launch({
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

    const pdfBuffer = await page.pdf({ format:'A4', printBackground:true });
    await browser.close();

    return new Response(pdfBuffer,{
      headers:{
        'Content-Type':        'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-neuropatia.pdf"',
      },
    });

  }catch(err){
    console.error('[PDF] error:', err);
    return new Response('Error generando PDF: ' + err.message, { status:500 });
  }
}
