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
// HTML capture at 2x scale → 1122 x 794 px viewport
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
}) {
  // Footer y header son absolutos, no compiten con los paneles
  const HDR_H   = 44;   // px — espacio reservado arriba para nombre + logo
  const FTR_H   = 32;   // px — espacio reservado abajo para datos del médico
  const DIAG_H  = (finalConclusion || '').trim() ? 28 : 0;
  // Paneles: mitad del ancho, altura restante entre header, diag y footer
  const panelW  = Math.floor(PAGE_W / 2);
  const panelsH = PAGE_H - HDR_H - DIAG_H - FTR_H;

  const mkOverlays = (b64s) =>
    (b64s || []).filter(Boolean)
      .map(b64 => `<img src="${b64}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:fill;z-index:2;pointer-events:none;"/>`)
      .join('');

  const mkCrosses = (list, side) =>
    (list || []).filter(c => c.side === side).map(({ src, topPct, offPct }) => {
      const posAttr = side === 'L'
        ? `left:${offPct * 100}%`
        : `right:${offPct * 100}%`;
      return `<img src="${src}" style="position:absolute;top:${topPct * 100}%;${posAttr};width:64px;height:64px;object-fit:contain;z-index:5;pointer-events:none;"/>`;
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

  const diagHtml = (finalConclusion || '').split('\n\n')
    .map(p => `<div class="diag-para">${esc(p.trim())}</div>`)
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  img{border:none;outline:none;box-shadow:none;display:block}
  html,body{width:${PAGE_W}px;height:${PAGE_H}px;background:transparent;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;overflow:hidden;}
  .page{position:relative;width:${PAGE_W}px;height:${PAGE_H}px;background:transparent;}
  .hdr{position:absolute;top:0;left:0;right:0;height:${HDR_H}px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;z-index:10;}
  .patient{font-size:12px;font-weight:700;color:#111;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .logo{width:40px;height:40px;object-fit:contain;flex-shrink:0;}
  .panels{position:absolute;top:${HDR_H}px;left:0;display:flex;flex-direction:row;width:${PAGE_W}px;height:${panelsH}px;}
  .panel{position:relative;width:${panelW}px;height:${panelsH}px;flex-shrink:0;overflow:hidden;}
  .panel img.base{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;}
  ${DIAG_H > 0 ? `.diag{position:absolute;top:${HDR_H + panelsH}px;left:0;right:0;height:${DIAG_H}px;padding:2px 24px;overflow:hidden;}
  .diag-para{font-size:8.5px;line-height:13px;color:#1a1a1a;text-align:justify;}` : ''}
  .footer{position:absolute;bottom:4px;left:0;right:0;height:${FTR_H}px;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 20px;}
  .fi{display:inline-flex;align-items:center;gap:4px;font-size:9px;color:#222;white-space:nowrap}
  .fsep{font-size:10px;color:#999;margin:0 2px}
</style>
</head>
<body>
<div class="page">
  <!-- Header: nombre paciente + logo médico -->
  <div class="hdr">
    <div class="patient">${esc(topLeftText)}</div>
    ${userData.imageUrl ? `<img src="${esc(userData.imageUrl)}" class="logo"/>` : ''}
  </div>
  <!-- Dos paneles de láminas -->
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
  <!-- Diagnóstico (solo si hay texto) -->
  ${DIAG_H > 0 ? `<div class="diag">${diagHtml}</div>` : ''}
  <!-- Footer absoluto: datos del médico -->
  <div class="footer">${footerItems}</div>
</div>
</body>
</html>`;
}

async function captureHtmlAsPng(browser, html) {
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 2 });
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
    // Patrón idéntico al móvil:
    // 1) Carga el PDF de plantilla como documento base
    // 2) Obtiene su página 1 y dibuja el PNG encima
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

  // Sin plantilla (o fallback si falló la carga)
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

    // ── Resolve base images to base64 ──────────────────────────────
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

    // ── Resolve overlay images to base64 ───────────────────────────
    const hasNewFlow = postOv.length > 0 || antOv.length > 0;
    const postOvList = hasNewFlow ? postOv : activeOv;
    const antOvList  = hasNewFlow ? antOv  : activeOv;

    const [postOverlayB64s, antOverlayB64s] = await Promise.all([
      Promise.all(postOvList.filter(Boolean).map(localImgToB64)),
      Promise.all(antOvList.filter(Boolean).map(localImgToB64)),
    ]);

    // ── Resolve cross src images to base64 ────────────────────────
    const crossesResolved = await Promise.all(
      crosses.map(async (c) => {
        const src = c.src?.startsWith('data:') ? c.src
          : c.src?.startsWith('http') ? await remoteImgToB64(c.src)
          : await localImgToB64(c.src);
        return { ...c, src };
      })
    );

    // ── Resolve user logo ─────────────────────────────────────────
    const userImageB64 = userData.imageUrl
      ? await remoteImgToB64(userData.imageUrl)
      : null;
    const userDataResolved = { ...userData, imageUrl: userImageB64 };

    // ── Build HTML ────────────────────────────────────────────────
    const html = buildPageHtml({
      finalConclusion,
      topLeftText,
      userData: userDataResolved,
      postBaseB64,
      antBaseB64,
      postOverlayB64s,
      antOverlayB64s,
      crosses: crossesResolved,
    });

    // ── Capture PNG ───────────────────────────────────────────────
    browser = await launchBrowser();
    const pngBuf = await captureHtmlAsPng(browser, html);
    await browser.close();
    browser = null;

    // ── Assemble PDF with template ────────────────────────────────
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
