// app/api/pdf/generate-pdf/motoracorticoespinal/route.js
import { NextResponse }   from 'next/server';
import puppeteer          from 'puppeteer';
import puppeteerCore      from 'puppeteer-core';
import chromium           from '@sparticuz/chromium-min';
import { PDFDocument }    from 'pdf-lib';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isDev   = process.env.NODE_ENV !== 'production';
const baseUrl = isDev
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medxproapp.com');

const BACKEND_URL = 'https://backendmedxpro-tef2.onrender.com';

const PAGE_W = 794;
const PAGE_H = 1123;

// ── Mapa de overlays ──────────────────────────────────────────────────────────
const OVERLAY_MAP = {
  /* INDEMNE */
  izquierdo_indemne:  '/MotoresImg/INFERIORD.png',
  derecho_indemne:    '/MotoresImg/INFERIORI.png',

  /* ALTERADA — CORTICAL */
  izquierdo_corticalAlterada:             '/MotoresImg/ViasAfectadas/SUPERIORD.png',
  derecho_corticalAlterada:               '/MotoresImg/ViasAfectadas/SUPERIORI.png',
  izquierdo_corticalAlterada_leve:        '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1-D.png',
  derecho_corticalAlterada_leve:          '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1.png',
  izquierdo_corticalAlterada_moderado:    '/MotoresImg/ViaAfectada/Rojo/VersionDerecha/MO_1-D.png',
  derecho_corticalAlterada_moderado:      '/MotoresImg/ViaAfectada/Rojo/MO_1.png',
  izquierdo_corticalAlterada_severo:      '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1-D.png',
  derecho_corticalAlterada_severo:        '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1.png',

  /* ALTERADA — CERVICAL */
  izquierdo_cervicalAlterada:             '/MotoresImg/ViasAfectadas/SUPERIORD.png',
  derecho_cervicalAlterada:               '/MotoresImg/ViasAfectadas/SUPERIORI.png',
  izquierdo_cervicalAlterada_leve:        '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1-D.png',
  derecho_cervicalAlterada_leve:          '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1.png',
  izquierdo_cervicalAlterada_moderado:    '/MotoresImg/ViaAfectada/Rojo/VersionDerecha/MO_1-D.png',
  derecho_cervicalAlterada_moderado:      '/MotoresImg/ViaAfectada/Rojo/MO_1.png',
  izquierdo_cervicalAlterada_severo:      '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1-D.png',
  derecho_cervicalAlterada_severo:        '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1.png',

  /* ALTERADA — LUMBOSACRO */
  izquierdo_lumbasacroAlterada:           '/MotoresImg/ViasAfectadas/INFERIORD.png',
  derecho_lumbasacroAlterada:             '/MotoresImg/ViasAfectadas/INFERIORI.png',
  izquierdo_lumbasacroAlterada_leve:      '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_2-D.png',
  derecho_lumbasacroAlterada_leve:        '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_2.png',
  izquierdo_lumbasacroAlterada_moderado:  '/MotoresImg/ViaAfectada/Rojo/VersionDerecha/MO_2-D.png',
  derecho_lumbasacroAlterada_moderado:    '/MotoresImg/ViaAfectada/Rojo/MO_2.png',
  izquierdo_lumbasacroAlterada_severo:    '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_2-D.png',
  derecho_lumbasacroAlterada_severo:      '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_2.png',

  /* INDEMNE con región (base sin severidad) */
  izquierdo_cortical:   '/MotoresImg/ViasAfectadas/SUPERIORD.png',
  derecho_cortical:     '/MotoresImg/ViasAfectadas/SUPERIORI.png',
  izquierdo_cervical:   '/MotoresImg/ViasAfectadas/SUPERIORD.png',
  derecho_cervical:     '/MotoresImg/ViasAfectadas/SUPERIORI.png',
  izquierdo_lumbasacro: '/MotoresImg/ViasAfectadas/INFERIORD.png',
  derecho_lumbasacro:   '/MotoresImg/ViasAfectadas/INFERIORI.png',
};

const PLANTILLAS_PDF = {
  A: { p1: 'PLANTILLA_A_VERTICAL-1.pdf', p2: 'PLANTILLA_A_VERTICAL-2.pdf' },
  B: { p1: 'PLANTILLA_B_VERTICAL-1.pdf', p2: 'PLANTILLA_B_VERTICAL-2.pdf' },
  C: { p1: 'PLANTILLA_C_VERTICAL-1.pdf', p2: 'PLANTILLA_C_VERTICAL-2.pdf' },
};

// ── helpers ───────────────────────────────────────────────────────────────────
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
  } catch { return null; }
}

function esc(t) {
  return String(t || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── HTML de la página 1 ───────────────────────────────────────────────────────
function buildPage1Html({ finalConclusion, userData, baseImgB64, overlayB64s, figuras, topLeftText }) {
  const PAD     = 30;
  const HDR_H   = 68;
  const HDR_PADT = 42;
  const HDR_PADH = 70;
  const LOGO_SZ  = 72;
  const LAM_W    = 600;
  const LAM_H    = 776;
  const DIAG_PH  = 40;
  const FTR_H    = 54;
  const FTR_BG   = 20;

  const overlayTags = overlayB64s.filter(Boolean)
    .map(b64 => `<img src="${b64}" class="si"/>`)
    .join('');

  const figuraTags = figuras.map(f => {
    if (!f.src) return '';
    const r = f.tipo === 'circle' ? '50%' : '0';
    return `<img src="${f.src}" style="position:absolute;left:${f.x}px;top:${f.y}px;width:80px;height:80px;object-fit:cover;border-radius:${r};border:1.5px solid #808080;z-index:10;pointer-events:none;"/>`;
  }).join('');

  const svgUser  = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#000"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
  const svgEmail = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#000"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
  const svgSpec  = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 90 90" fill="#000"><path d="M45.12,61.02c0,0,0,7.32-4.79,7.32h-8.68c-1.82,0-3.29-1.47-3.29-3.29c0,0-2.39-8.68-2.65-8.68l-2.88-1.21c-1.57-0.66-2.31-2.46-1.66-4.03l4.8-9.65v-0.67c0-11.9,9.65-21.55,21.55-21.55s21.55,9.65,21.55,21.55c0,5.12-1.8,9.84-4.79,13.54v16.39"/></svg>`;
  const svgId    = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#000"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 2l-6 3.99L6 4h12z"/></svg>`;

  const footerItems = [
    userData.name
      ? `<span class="fi">${svgUser}<span>Dr. ${esc(userData.name)} ${esc(userData.lastname||'')}</span></span>`
      : '',
    userData.email
      ? `<span class="fi">${svgEmail}<span>${esc(userData.email)}</span></span>`
      : '',
    userData.especialidad
      ? `<span class="fi">${svgSpec}<span>${esc(userData.especialidad)}</span></span>`
      : '',
    userData.cedula
      ? `<span class="fi">${svgId}<span>${esc(userData.cedula)}</span></span>`
      : '',
  ].filter(Boolean).join(`<span class="fsep">|</span>`);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  img{border:none;outline:none;box-shadow:none}
  html,body{
    width:${PAGE_W}px;height:${PAGE_H}px;
    background:transparent;
    font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
    overflow:hidden;
  }
  .page{
    width:${PAGE_W}px;height:${PAGE_H}px;
    padding:${PAD}px;
    display:flex;flex-direction:column;
    background:transparent;
  }
  .shift{height:10px;flex-shrink:0}
  .hdr{
    height:${HDR_H}px;flex-shrink:0;
    padding-left:${HDR_PADH + 30}px;padding-right:${HDR_PADH}px;
    padding-top:${HDR_PADT}px;padding-bottom:6px;
    display:flex;flex-direction:row;
    align-items:center;justify-content:space-between;
  }
  .patient{font-size:12px;font-weight:700;color:#111;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:24px}
  .logo-wrap{width:${LOGO_SZ+12}px;height:${LOGO_SZ+12}px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:26px}
  .logo{width:${LOGO_SZ}px;height:${LOGO_SZ}px;object-fit:contain;border-radius:0;border:none;outline:none;box-shadow:none;background:transparent}
  .lamina-wrap{
    flex-shrink:0;
    display:flex;justify-content:center;
    margin-top:8px;
  }
  .stack{
    position:relative;
    width:${LAM_W}px;height:${LAM_H}px;
    overflow:hidden;background:transparent;flex-shrink:0;
  }
  .si{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;}
  .diag{
    flex-shrink:0;
    padding:0 ${DIAG_PH}px;
    margin-top:12px;
  }
  .diag-title{font-size:11px;font-weight:700;color:#111;margin-bottom:5px}
  .diag-text{font-size:10.5px;line-height:17px;color:#1a1a1a;text-align:justify}
  .spacer{flex:1;min-height:0}
  .footer{
    flex-shrink:0;
    height:${FTR_H}px;
    margin-top:${FTR_BG}px;
    display:flex;flex-direction:row;
    align-items:center;justify-content:center;
    gap:10px;flex-wrap:wrap;
    padding:0 ${HDR_PADH}px;
  }
  .fi{display:inline-flex;align-items:center;gap:5px;font-size:9px;color:#444;white-space:nowrap}
  .fsep{font-size:10px;color:#ccc;margin:0 2px}
</style>
</head>
<body>
<div class="page">
  <div class="shift"></div>
  <div class="hdr">
    <div class="patient">${esc(topLeftText)}</div>
    ${userData.imageUrl ? `<div class="logo-wrap"><img src="${esc(userData.imageUrl)}" class="logo"/></div>` : ''}
  </div>
  <div class="lamina-wrap">
    <div class="stack">
      ${baseImgB64 ? `<img src="${baseImgB64}" class="si"/>` : ''}
      ${overlayTags}
      ${figuraTags}
    </div>
  </div>
  <div class="diag">
    <div class="diag-title">Diagnóstico</div>
    <div class="diag-text">${esc(finalConclusion)}</div>
  </div>
  <div class="spacer"></div>
  <div class="footer">${footerItems}</div>
</div>
</body>
</html>`;
}

// ── Captura PNG transparente ──────────────────────────────────────────────────
async function captureHtmlAsPng(browser, html) {
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const buf = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: PAGE_W, height: PAGE_H } });
  await page.close();
  return buf;
}

// ── Ensamblado PDF con plantillas ─────────────────────────────────────────────
async function assemblePdf({ pngPage1, plantillaId }) {
  const pdfDoc = await PDFDocument.create();
  const W = 595.28, H = 841.89;

  const page1 = pdfDoc.addPage([W, H]);

  if (plantillaId && plantillaId !== 'none' && PLANTILLAS_PDF[plantillaId]) {
    const bytes = await fetchBytes(`${BACKEND_URL}/plantillas/${PLANTILLAS_PDF[plantillaId].p1}`);
    if (bytes) {
      try {
        const tpl = await PDFDocument.load(bytes);
        const [tplPg] = await pdfDoc.embedPdf(tpl, [0]);
        page1.drawPage(tplPg, { x: 0, y: 0, width: W, height: H });
      } catch (e) { console.warn('plantilla p1:', e.message); }
    }
  }

  const img1 = await pdfDoc.embedPng(pngPage1);
  page1.drawImage(img1, { x: 0, y: 0, width: W, height: H });

  return await pdfDoc.save();
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req) {
  let browser;
  try {
    const body = await req.json();
    const {
      finalConclusion = '',
      activeOv        = [],
      figuras         = [],
      listaVisual     = [],
      userData        = {},
      topLeftText     = '',
      plantillaId     = 'none',
    } = body;

    const ovPaths = activeOv.map(k => OVERLAY_MAP[k]).filter(Boolean);
    const [baseImgB64, doctorLogoB64, ...overlayB64s] = await Promise.all([
      localImgToB64('/MotoresImg/BP_Motores_TR.png'),
      remoteImgToB64(userData.imageUrl || null),
      ...ovPaths.map(p => localImgToB64(p)),
    ]);

    const userDataB64 = { ...userData, imageUrl: doctorLogoB64 || null };

    browser = await launchBrowser();

    const html1 = buildPage1Html({
      finalConclusion,
      userData: userDataB64,
      baseImgB64,
      overlayB64s,
      figuras,
      topLeftText: topLeftText || '',
    });
    const pngPage1 = await captureHtmlAsPng(browser, html1);

    await browser.close();
    browser = null;

    const pdfBytes = await assemblePdf({ pngPage1, plantillaId });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte.pdf',
      },
    });
  } catch (err) {
    if (browser) { try { await browser.close(); } catch {} }
    console.error('Error PDF motoracorticoespinal:', err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
