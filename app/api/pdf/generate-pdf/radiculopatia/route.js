// app/api/pdf/generate-pdf/radiculopatia/route.js

import { NextResponse } from 'next/server';
import puppeteer        from 'puppeteer';
import puppeteerCore    from 'puppeteer-core';
import chromium         from '@sparticuz/chromium-min';
import { PDFDocument }  from 'pdf-lib';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isDev   = process.env.NODE_ENV !== 'production';
const baseUrl = isDev
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medxproapp.com');

const BACKEND_URL = 'https://backendmedxpro-tef2.onrender.com';

// A4 landscape: 841.89 x 595.28 pt
// HTML capture at 2x scale â†’ 1122 x 794 px viewport
const PAGE_W = 1122;
const PAGE_H = 794;


const PLANTILLAS_PDF = {
  A: { p1: 'PLANTILLA_A_HORIZONTAL-1.pdf' },
  B: { p1: 'PLANTILLA_B_HORIZONTAL-1.pdf' },
  C: { p1: 'PLANTILLA_C_HORIZONTAL-1.pdf' },
};

async function launchBrowser() {
  if (isDev) {
    return puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  }
  const executablePath = await chromium.executablePath(
    'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
  );
  return puppeteerCore.launch({
    executablePath, args: chromium.args,
    headless: chromium.headless, defaultViewport: chromium.defaultViewport,
  });
}

async function fetchBytes(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch { return null; }
}

async function localImgToB64(publicPath) {
  if (!publicPath) return null;
  try {
    const res = await fetch(`${baseUrl}${publicPath}`);
    if (!res.ok) return null;
    const buf  = await res.arrayBuffer();
    const mime = res.headers.get('content-type') || 'image/png';
    return `data:${mime};base64,${Buffer.from(buf).toString('base64')}`;
  } catch { return null; }
}

async function remoteImgToB64(url) {
  if (!url) return null;
  if (url.startsWith('data:')) return url;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf  = await res.arrayBuffer();
    const mime = res.headers.get('content-type') || 'image/png';
    return `data:${mime};base64,${Buffer.from(buf).toString('base64')}`;
  } catch (e) {
    console.warn('remoteImgToB64 failed:', url, e.message);
    return null;
  }
}

function esc(t) {
  return String(t || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildPageHtml({
  finalConclusion,
  topLeftText,
  userData,
  postBaseB64,
  antBaseB64,
  postOverlayB64s,
  antOverlayB64s,
  crosses,
  plantillaId,
}) {
  const hasDiag   = (finalConclusion || '').trim().length > 0;
  const isPlantC  = plantillaId === 'C';

  // Layout vertical fijo
  const HDR_H  = 40;
  const DIAG_H = hasDiag ? 56 : 0;
  const FTR_H  = 28;
  const GAP    = 8;

  // Plantilla C: todo el contenido sube 20px (excepto footer)
  const CONTENT_OFFSET = isPlantC ? -20 : 0;

  // LÃ¡minas fijas en 530px de alto â€” deja espacio visible para conclusiÃ³n y footer
  const panelsH = 530;

  // ImÃ¡genes son portrait 2550Ã—3300 â†’ ratio ancho/alto = 0.7727
  // Cada panel tiene exactamente el ancho de la imagen escalada â†’ sin mÃ¡rgenes laterales
  const IMG_RATIO = 2550 / 3300;
  const panelW    = Math.round(panelsH * IMG_RATIO);        // ancho exacto de cada lÃ¡mina
  const totalW    = panelW * 2;
  const panelsLeft = Math.round((PAGE_W - totalW) / 2);    // centrado horizontal

  const panelsTop = HDR_H + 30 + CONTENT_OFFSET;

  // Overlays comparten exactamente el mismo tamaÃ±o â†’ alineaciÃ³n perfecta
  const mkOverlays = (b64s) =>
    (b64s || []).filter(Boolean)
      .map(b64 => `<img src="${b64}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:fill;z-index:2;pointer-events:none;"/>`)
      .join('');

  // Cruces: posiciÃ³n relativa al panel (que ya tiene el tamaÃ±o exacto de la imagen)
  const mkCrosses = (list, side) =>
    (list || []).filter(c => c.side === side).map(({ src, topPct, offPct }) => {
      const top  = Math.round(topPct * panelsH);
      const xImg = Math.round(offPct * panelW);
      const left = side === 'L' ? xImg : (panelW - xImg - 56);
      return `<img src="${src}" style="position:absolute;top:${top}px;left:${left}px;width:56px;height:56px;object-fit:contain;z-index:5;pointer-events:none;"/>`;
    }).join('');

  const svgUser  = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#000"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
  const svgEmail = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#000"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
  const svgSpec  = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 90 90" fill="#000"><path d="M45.12,61.02c0,0,0,7.32-4.79,7.32h-8.68c-1.82,0-3.29-1.47-3.29-3.29c0,0-2.39-8.68-2.65-8.68l-2.88-1.21c-1.57-0.66-2.31-2.46-1.66-4.03l4.8-9.65v-0.67c0-11.9,9.65-21.55,21.55-21.55s21.55,9.65,21.55,21.55c0,5.12-1.8,9.84-4.79,13.54v16.39"/></svg>`;
  const svgId    = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#000"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 2l-6 3.99L6 4h12z"/></svg>`;

  const footerItems = [
    userData.name ? `<span class="fi">${svgUser}<span>Dr. ${esc(userData.name)} ${esc(userData.lastname || '')}</span></span>` : '',
    userData.email ? `<span class="fi">${svgEmail}<span>${esc(userData.email)}</span></span>` : '',
    userData.especialidad ? `<span class="fi">${svgSpec}<span>${esc(userData.especialidad)}</span></span>` : '',
    userData.cedula ? `<span class="fi">${svgId}<span>${esc(userData.cedula)}</span></span>` : '',
  ].filter(Boolean).join('<span class="fsep">|</span>');

  // Cada \n en la conclusiÃ³n se convierte en <br>; cada \n\n en pÃ¡rrafo separado
  const diagHtml = (finalConclusion || '')
    .split('\n')
    .map(line => `<span>${esc(line.trim())}</span>`)
    .join('<br/>');

  const diagTop = panelsTop + panelsH + GAP;
  const ftrTop  = PAGE_H - FTR_H;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  img{border:none;outline:none;box-shadow:none;display:block}
  html,body{width:${PAGE_W}px;height:${PAGE_H}px;background:transparent;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;overflow:hidden;}
  .page{position:relative;width:${PAGE_W}px;height:${PAGE_H}px;background:transparent;}

  /* â”€â”€ Header â”€â”€ */
  .hdr{position:absolute;top:0;left:0;right:0;height:${HDR_H}px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:10;}
  .patient{font-size:13px;font-weight:700;color:#111;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .logo{width:42px;height:42px;object-fit:contain;flex-shrink:0;}

  /* â”€â”€ Paneles de lÃ¡minas â”€â”€ */
  .panels{position:absolute;top:${panelsTop}px;left:${panelsLeft}px;display:flex;flex-direction:row;width:${totalW}px;height:${panelsH}px;}
  .panel{position:relative;width:${panelW}px;height:${panelsH}px;flex-shrink:0;overflow:hidden;}
  .panel img.base{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill;z-index:1;}

  /* â”€â”€ ConclusiÃ³n â”€â”€ */
  .diag{position:absolute;top:${diagTop}px;left:${panelsLeft}px;width:${totalW}px;height:${DIAG_H}px;display:flex;align-items:flex-start;padding:6px 0 0 0;}
  .diag-text{font-size:11.5px;line-height:18px;color:#111;font-weight:400;}

  /* â”€â”€ Footer â”€â”€ */
  .footer{position:absolute;top:${ftrTop}px;left:0;right:0;height:${FTR_H}px;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 20px;}
  .fi{display:inline-flex;align-items:center;gap:4px;font-size:9px;color:#333;white-space:nowrap}
  .fsep{font-size:10px;color:#bbb;margin:0 2px}
</style>
</head>
<body>
<div class="page">
  <!-- Header -->
  <div class="hdr">
    <div class="patient">${esc(topLeftText)}</div>
    ${userData.imageUrl ? `<img src="${esc(userData.imageUrl)}" class="logo"/>` : ''}
  </div>

  <!-- Dos paneles de lÃ¡minas -->
  <div class="panels">
    <div class="panel">
      ${postBaseB64 ? `<img src="${postBaseB64}" class="base"/>` : ''}
      ${mkOverlays(postOverlayB64s)}
      ${mkCrosses(crosses, 'L')}
    </div>
    <div class="panel">
      ${antBaseB64 ? `<img src="${antBaseB64}" class="base"/>` : ''}
      ${mkOverlays(antOverlayB64s)}
      ${mkCrosses(crosses, 'R')}
    </div>
  </div>

  <!-- ConclusiÃ³n -->
  ${hasDiag ? `<div class="diag"><div class="diag-text">${diagHtml}</div></div>` : ''}

  <!-- Footer -->
  <div class="footer">${footerItems}</div>
</div>
</body>
</html>`;
}

async function captureHtmlAsPng(browser, html) {
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 3 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const buf = await page.screenshot({
    type: 'png',
    omitBackground: true,
    clip: { x: 0, y: 0, width: PAGE_W, height: PAGE_H },
  });
  await page.close();
  return buf;
}

function drawImageCentered(page, image) {
  const { width: pageW, height: pageH } = page.getSize();
  const scaleW = pageW / image.width;
  const scaleH = pageH / image.height;
  const scale  = Math.min(scaleW, scaleH);
  const finalW = image.width  * scale;
  const finalH = image.height * scale;
  const x = (pageW - finalW) / 2;
  const y = (pageH - finalH) / 2;
  page.drawImage(image, { x, y, width: finalW, height: finalH });
}

async function assemblePdf({ pngPage1, plantillaId }) {
  // A4 landscape pt
  const W = 841.89;
  const H = 595.28;

  const usePlantilla = plantillaId && plantillaId !== 'none' && PLANTILLAS_PDF[plantillaId];

  if (usePlantilla) {
    // PatrÃ³n idÃ©ntico al mÃ³vil:
    // 1) Carga el PDF de plantilla como documento base
    // 2) Obtiene su pÃ¡gina 1 y dibuja el PNG encima
    const bytes = await fetchBytes(`${BACKEND_URL}/plantillas/${PLANTILLAS_PDF[plantillaId].p1}`);
    if (bytes) {
      try {
        const pdfDoc = await PDFDocument.load(bytes);
        const [templatePage] = pdfDoc.getPages();
        const img1 = await pdfDoc.embedPng(pngPage1);
        drawImageCentered(templatePage, img1);
        return await pdfDoc.save();
      } catch (e) {
        console.warn('plantilla load error, falling back:', e.message);
      }
    }
  }

  // Sin plantilla (o fallback si fallÃ³ la carga)
  const pdfDoc = await PDFDocument.create();
  const page1  = pdfDoc.addPage([W, H]);
  const img1   = await pdfDoc.embedPng(pngPage1);
  drawImageCentered(page1, img1);
  return await pdfDoc.save();
}

export async function POST(req) {
  let browser;
  try {
    const body = await req.json();
    const {
      finalConclusion = '',
      activeOv        = [],
      postOv          = [],
      antOv           = [],
      crosses         = [],
      userData        = {},
      topLeftText     = '',
      plantillaId     = 'none',
      isSensitiva     = false,
      postBase        = null,
      antBase         = null,
    } = body;

    // â”€â”€ Resolve base images to base64 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // When a plantilla is active use transparent-background versions (same as mobile app)
    const useTransparent = plantillaId && plantillaId !== 'none';

    const postBasePath = postBase || (isSensitiva
      ? (useTransparent ? '/RadiculopatiaImg/Columna/BASE_POSTERIOR_TR.png' : '/RadiculopatiaImg/Columna/BASE_POSTERIOR.png')
      : (useTransparent ? '/RadiculopatiaImg/Multinivel/RA_Columna_1_FondoB_TR.png' : '/RadiculopatiaImg/Multinivel/RA_Columna_1_FondoB.png'));
    const antBasePath  = antBase  || (isSensitiva
      ? (useTransparent ? '/RadiculopatiaImg/Columna/BASE_ANTERIOR_TR.png' : '/RadiculopatiaImg/Columna/BASE_ANTERIOR.png')
      : (useTransparent ? '/RadiculopatiaImg/Multinivel/RA_Columna_2_FondoB_TR.png' : '/RadiculopatiaImg/Multinivel/RA_Columna_2_FondoB.png'));

    const [postBaseB64, antBaseB64] = await Promise.all([
      localImgToB64(postBasePath),
      localImgToB64(antBasePath),
    ]);

    // â”€â”€ Resolve overlay images to base64 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const hasNewFlow = postOv.length > 0 || antOv.length > 0;
    const postOvList = hasNewFlow ? postOv : activeOv;
    const antOvList  = hasNewFlow ? antOv  : activeOv;

    const [postOverlayB64s, antOverlayB64s] = await Promise.all([
      Promise.all(postOvList.filter(Boolean).map(localImgToB64)),
      Promise.all(antOvList.filter(Boolean).map(localImgToB64)),
    ]);

    // â”€â”€ Resolve cross src images to base64 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const crossesResolved = await Promise.all(
      crosses.map(async (c) => {
        const src = c.src?.startsWith('data:') ? c.src
          : c.src?.startsWith('http') ? await remoteImgToB64(c.src)
          : await localImgToB64(c.src);
        return { ...c, src };
      })
    );

    // â”€â”€ Resolve user logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const userImageB64 = userData.imageUrl
      ? await remoteImgToB64(userData.imageUrl)
      : null;
    const userDataResolved = { ...userData, imageUrl: userImageB64 };

    // â”€â”€ Build HTML â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const html = buildPageHtml({
      finalConclusion,
      topLeftText,
      userData: userDataResolved,
      postBaseB64,
      antBaseB64,
      postOverlayB64s,
      antOverlayB64s,
      crosses: crossesResolved,
      plantillaId,
    });

    // â”€â”€ Capture PNG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    browser = await launchBrowser();
    const pngBuf = await captureHtmlAsPng(browser, html);
    await browser.close();
    browser = null;

    // â”€â”€ Assemble PDF with template â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const pdfBytes = await assemblePdf({ pngPage1: pngBuf, plantillaId });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF radiculopatia:', err);
    if (browser) { try { await browser.close(); } catch {} }
    return NextResponse.json({ message: 'Error generando PDF' }, { status: 500 });
  }
}

