import { NextResponse }  from 'next/server';
import puppeteer         from 'puppeteer';
import puppeteerCore     from 'puppeteer-core';
import chromium          from '@sparticuz/chromium-min';
import { PDFDocument }   from 'pdf-lib';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isDev   = process.env.NODE_ENV !== 'production';
const baseUrl = isDev
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medxproapp.com');

const BACKEND_URL = 'https://backendmedxpro-tef2.onrender.com';

// A4 px a 96dpi = 794 × 1123
const PAGE_W = 794;
const PAGE_H = 1123;

// ── Mapa de overlays ──────────────────────────────────────────────────────────
const OVERLAYS_VISUAL = {
  indemne:                              '/VisualImg/VI_Gris_BASE.png',
  alterada:                             '/VisualImg/VI_Gris_BASE.png',
  base_bilateral_izquierdo:             '/VisualImg/VI_8.png',
  base_bilateral_derecho:               '/VisualImg/VI_7.png',
  izquierdo_led_flash:                  '/VisualImg/VI_8.png',
  derecho_led_flash:                    '/VisualImg/VI_7.png',
  izquierdo_damero_total:               '/VisualImg/VI_8.png',
  derecho_damero_total:                 '/VisualImg/VI_7.png',
  izquierdo_damero_hemicampos:          '/VisualImg/VI_5.png',
  derecho_damero_hemicampos:            '/VisualImg/VI_6.png',
  izquierdo_led_flashAlterada_leve:     '/VisualImg/ViaAfectada/Naranja/VI_Naranja_5.png',
  izquierdo_led_flashAlterada_moderado: '/VisualImg/ViaAfectada/Rojo/VI_5.png',
  izquierdo_led_flashAlterada_severo:   '/VisualImg/ViaAfectada/Marron/VI_Marron_5.png',
  derecho_led_flashAlterada_leve:       '/VisualImg/ViaAfectada/Naranja/VI_Naranja_4.png',
  derecho_led_flashAlterada_moderado:   '/VisualImg/ViaAfectada/Rojo/VI_4.png',
  derecho_led_flashAlterada_severo:     '/VisualImg/ViaAfectada/Marron/VI_Marron_4.png',
  izquierdo_nervio_opticoAlterada_leve:     '/VisualImg/ViaAfectada/Naranja/VI_Naranja_5.png',
  izquierdo_nervio_opticoAlterada_moderado: '/VisualImg/ViaAfectada/Rojo/VI_5.png',
  izquierdo_nervio_opticoAlterada_severo:   '/VisualImg/ViaAfectada/Marron/VI_Marron_5.png',
  derecho_nervio_opticoAlterada_leve:       '/VisualImg/ViaAfectada/Naranja/VI_Naranja_4.png',
  derecho_nervio_opticoAlterada_moderado:   '/VisualImg/ViaAfectada/Rojo/VI_4.png',
  derecho_nervio_opticoAlterada_severo:     '/VisualImg/ViaAfectada/Marron/VI_Marron_4.png',
  izquierdo_quiasma_opticoAlterada_leve:     '/VisualImg/ViaAfectada/Naranja/VI_Naranja_6.png',
  izquierdo_quiasma_opticoAlterada_moderado: '/VisualImg/ViaAfectada/Rojo/VI_6.png',
  izquierdo_quiasma_opticoAlterada_severo:   '/VisualImg/ViaAfectada/Marron/VI_Marron_6.png',
  derecho_quiasma_opticoAlterada_leve:       '/VisualImg/ViaAfectada/Naranja/VI_Naranja_2.png',
  derecho_quiasma_opticoAlterada_moderado:   '/VisualImg/ViaAfectada/Rojo/VI_2.png',
  derecho_quiasma_opticoAlterada_severo:     '/VisualImg/ViaAfectada/Marron/VI_Marron_2.png',
  izquierdo_tracto_opticoAlterada_leve:      '/VisualImg/ViaAfectada/Naranja/VI_Naranja_3.png',
  izquierdo_tracto_opticoAlterada_moderado:  '/VisualImg/ViaAfectada/Rojo/VI_3.png',
  izquierdo_tracto_opticoAlterada_severo:    '/VisualImg/ViaAfectada/Marron/VI_Marron_3.png',
  derecho_tracto_opticoAlterada_leve:        '/VisualImg/ViaAfectada/Naranja/VI_Naranja_1.png',
  derecho_tracto_opticoAlterada_moderado:    '/VisualImg/ViaAfectada/Rojo/VI_1.png',
  derecho_tracto_opticoAlterada_severo:      '/VisualImg/ViaAfectada/Marron/VI_Marron_1.png',
  izquierdo_nucleo_geniculadoAlterada_leve:     '/VisualImg/ViaAfectada/NUCLEO_GENICULADO_IZQUIERDO.png',
  izquierdo_nucleo_geniculadoAlterada_moderado: '/VisualImg/ViaAfectada/NUCLEO_GENICULADO_IZQUIERDO.png',
  izquierdo_nucleo_geniculadoAlterada_severo:   '/VisualImg/ViaAfectada/NUCLEO_GENICULADO_IZQUIERDO.png',
  derecho_nucleo_geniculadoAlterada_leve:       '/VisualImg/ViaAfectada/NUCLEO_GENICULADO_DERECHO.png',
  derecho_nucleo_geniculadoAlterada_moderado:   '/VisualImg/ViaAfectada/NUCLEO_GENICULADO_DERECHO.png',
  derecho_nucleo_geniculadoAlterada_severo:     '/VisualImg/ViaAfectada/NUCLEO_GENICULADO_DERECHO.png',
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

// Convierte ruta local pública (/VisualImg/...) a base64
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

// Descarga cualquier URL absoluta (http/https) → base64 (sin restricciones CORS en servidor)
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
    console.warn('remoteImgToB64 falló:', url, e.message);
    return null;
  }
}

function esc(t) {
  return String(t || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Métricas exactas del móvil (DEFAULT_PDF, renderScale=1, A4 96dpi) ─────────
// pageMargin=30, header.height=56, header.offsetDown=12, header.afterGap=10
// header.padH=70, header.padTop=30, header.padBottom=6
// lamina.widthFrac=0.94  diag.padH=64 diag.offsetUp=12 diag.topGap=0
// footer.height=54 footer.beforeGap=20 footer.marginTop=20
// page1.shiftDown=10   page2.shiftDown=66
//
// A4 @ 96dpi: 794 × 1123 px  (Puppeteer viewport)
// innerW = 794 - 60 = 734    innerH = 1123 - 60 = 1063
// headerTotalH = 56+12 = 68  headerGap = max(10-12,0) = 0
// laminaW = round(734*0.94) = 690   laminaH = round(690/BASE_AR)  BASE_AR≈0.888 → ~777 → capped
// diagH = innerH - 68 - 0 - 0 - 20 - laminaH - 54
// Con lámina=620: diagH = 1063-68-20-620-54 = 301 → usaremos 620 para coincidir visualmente

function buildPage1Html({ finalConclusion, userData, baseImgB64, overlayB64s, figuras, topLeftText }) {
  // Dimensiones calculadas fielmente al móvil (96dpi)
  const PAD      = 30;   // pageMargin
  const HDR_H    = 68;   // header.height(56) + offsetDown(12)
  const HDR_PADT = 42;   // padTop(30) + offsetDown(12)
  const HDR_PADH = 70;   // padH
  const LOGO_SZ  = 72;
  const LAM_W    = 690;  // innerW(734) * 0.94
  const LAM_H    = 620;  // altura visual (VI_BASE es casi cuadrada)
  const DIAG_PH  = 64;   // padH diagnóstico
  const FTR_H    = 54;   // footer height
  const FTR_BG   = 20;   // beforeGap

  const overlayTags = overlayB64s.filter(Boolean)
    .map(b64 => `<img src="${b64}" class="si"/>`)
    .join('');

  // Figuras: las coordenadas x,y vienen del canvas web (ancho≈laminaRef)
  // Escalamos proporcional: laminaRef en pantalla ≈ ancho del stack en pantalla.
  // En el PDF el stack mide LAM_W × LAM_H.
  // El cliente guarda x,y respecto al laminaRef (clientWidth/clientHeight).
  // Pasamos las coords tal cual — el usuario las colocó en el stack.
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
  /* ── HEADER ── */
  /* shiftDown=10 → pequeño espacio encima del header para la plantilla */
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
  /* ── LÁMINA ── */
  .lamina-wrap{
    flex-shrink:0;
    display:flex;justify-content:center;
    margin-top:10px;
  }
  .stack{
    position:relative;
    width:${LAM_W}px;height:${LAM_H}px;
    overflow:hidden;background:transparent;flex-shrink:0;
  }
  .si{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;}
  /* ── DIAGNÓSTICO ── */
  .diag{
    flex-shrink:0;
    padding:0 ${DIAG_PH}px;
    margin-top:110px;
  }
  .diag-title{font-size:11px;font-weight:700;color:#111;margin-bottom:5px}
  .diag-text{font-size:10.5px;line-height:17px;color:#1a1a1a;text-align:justify}
  /* ── SPACER ── */
  .spacer{flex:1;min-height:0}
  /* ── FOOTER ── */
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
  .fic{font-size:10px;color:#888}
  .fsep{font-size:10px;color:#ccc;margin:0 2px}
</style>
</head>
<body>
<div class="page">

  <div class="shift"></div>

  <!-- HEADER: nombre paciente izq + logo doctor der -->
  <div class="hdr">
    <div class="patient">${esc(topLeftText)}</div>
    ${userData.imageUrl ? `<div class="logo-wrap"><img src="${esc(userData.imageUrl)}" class="logo"/></div>` : ''}
  </div>

  <!-- LÁMINA -->
  <div class="lamina-wrap">
    <div class="stack">
      ${baseImgB64 ? `<img src="${baseImgB64}" class="si"/>` : ''}
      ${overlayTags}
      ${figuraTags}
    </div>
  </div>

  <!-- DIAGNÓSTICO -->
  <div class="diag">
    <div class="diag-title">Diagnóstico</div>
    <div class="diag-text">${esc(finalConclusion)}</div>
  </div>

  <div class="spacer"></div>

  <!-- FOOTER: datos del doctor centrados -->
  <div class="footer">${footerItems}</div>

</div>
</body>
</html>`;
}

// ── Página 2 HTML ─────────────────────────────────────────────────────────────
// page2.shiftDown=66 → espacio para el header negro de la plantilla
// top-row: col izq (lista, paddingLeft=50) | col der (comentario)
// imagen tabla abajo completa con padding=40
function buildPage2Html({ listaVisual, comentarioLista, imgListaB64, hasPlantilla }) {
  // Con plantilla: el header negro tapa los primeros ~80px del PDF.
  // padding-top=110px deja espacio libre para que el header negro caiga
  // sobre el área blanca del JPG y el contenido quede debajo del header.
  // Sin plantilla: padding-top=40px, espaciado normal.

  const listaHtml = listaVisual.length
    ? listaVisual.map(({ k, v }) =>
        `<div class="li"><span class="lk">${esc(k)}:</span><span class="lv"> ${esc(v)}</span></div>`
      ).join('')
    : `<div class="li-empty">Sin datos.</div>`;

  const imgSection = imgListaB64
    ? `<div class="img-wrap"><img src="${imgListaB64}" class="tabla-img"/></div>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{
    width:${PAGE_W}px;height:${PAGE_H}px;
    background:transparent;
    font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
    overflow:hidden;
  }
  .page{
    width:${PAGE_W}px;height:${PAGE_H}px;
    padding:${hasPlantilla ? 170 : 40}px 70px 30px 70px;
    display:flex;flex-direction:column;
    background:transparent;
  }
  /* DOS COLUMNAS */
  .two-col{
    display:flex;
    flex-direction:row;
    flex-shrink:0;
    gap:40px;
    margin-bottom:36px;
  }
  .col-left{ flex:1; padding:0 20px; }
  .col-right{ flex:1; padding:0 20px; }
  .col-title{
    font-size:11px;font-weight:700;color:#111;
    margin-bottom:10px;
  }
  .li{font-size:10px;color:#111;line-height:18px;margin-bottom:5px}
  .lk{font-weight:700}
  .lv{font-weight:400}
  .li-empty{font-size:10px;color:#999;font-style:italic}
  .comment{font-size:10px;color:#111;line-height:18px;text-align:justify}
  /* TABLA */
  .img-wrap{
    flex:1;
    margin-top:190px;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    overflow:hidden;
  }
  .tabla-img{
    width:100%;
    max-height:560px;
    object-fit:contain;
    display:block;
  }
</style>
</head>
<body>
<div class="page">

  <!-- DOS COLUMNAS: Estudio | Comentario -->
  <div class="two-col">
    <div class="col-left">
      <div class="col-title">Estudio</div>
      ${listaHtml}
    </div>
    <div class="col-right">
      <div class="col-title">Comentario</div>
      <p class="comment">${esc(comentarioLista)}</p>
    </div>
  </div>

  <!-- TABLA centrada -->
  ${imgSection}

</div>
</body>
</html>`;
}

// ── Captura PNG transparente (plantilla se dibuja de fondo en assemblePdf) ────
async function captureHtmlAsPng(browser, html) {
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const buf = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: PAGE_W, height: PAGE_H } });
  await page.close();
  return buf;
}

// ── Ensamblado PDF con plantillas ─────────────────────────────────────────────
async function assemblePdf({ jpgPage1, jpgPage2, plantillaId }) {
  const pdfDoc = await PDFDocument.create();
  const W = 595.28, H = 841.89; // A4 en puntos

  // Página 1 — plantilla primero (fondo), PNG transparente encima
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

  const img1 = await pdfDoc.embedPng(jpgPage1);
  page1.drawImage(img1, { x: 0, y: 0, width: W, height: H });

  // Página 2 (solo si hay contenido)
  // La plantilla se dibuja PRIMERO (fondo), luego el PNG transparente encima
  if (jpgPage2) {
    const page2 = pdfDoc.addPage([W, H]);

    if (plantillaId && plantillaId !== 'none' && PLANTILLAS_PDF[plantillaId]) {
      const bytes2 = await fetchBytes(`${BACKEND_URL}/plantillas/${PLANTILLAS_PDF[plantillaId].p2}`);
      if (bytes2) {
        try {
          const tpl2 = await PDFDocument.load(bytes2);
          const [tplPg2] = await pdfDoc.embedPdf(tpl2, [0]);
          page2.drawPage(tplPg2, { x: 0, y: 0, width: W, height: H });
        } catch (e) { console.warn('plantilla p2:', e.message); }
      }
    }

    // PNG con fondo transparente encima de la plantilla
    const img2 = await pdfDoc.embedPng(jpgPage2);
    page2.drawImage(img2, { x: 0, y: 0, width: W, height: H });
  }

  return await pdfDoc.save();
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req) {
  let browser;
  try {
    const body = await req.json();
    const {
      finalConclusion  = '',
      activeOv         = [],
      figuras          = [],
      listaVisual      = [],
      imgListaUrl      = null,   // URL cruda — el servidor la descarga sin CORS
      comentarioLista  = '',
      userData         = {},
      topLeftText      = '',
      plantillaId      = 'none',
    } = body;

    // Prefetch todas las imágenes en paralelo (locales + tabla externa + logo doctor)
    const ovPaths = activeOv.map(k => OVERLAYS_VISUAL[k]).filter(Boolean);
    const [baseImgB64, imgListaB64, doctorLogoB64, ...overlayB64s] = await Promise.all([
      localImgToB64('/VisualImg/VI_BASE_TR.png'),
      remoteImgToB64(imgListaUrl),              // tabla desde backend/CDN sin CORS
      remoteImgToB64(userData.imageUrl || null), // logo doctor sin CORS
      ...ovPaths.map(p => localImgToB64(p)),
    ]);

    // Reemplaza la URL del logo por base64 para que Puppeteer pueda cargarlo
    const userDataB64 = { ...userData, imageUrl: doctorLogoB64 || null };

    browser = await launchBrowser();

    // ── Página 1
    // topLeftText es el nombre del paciente; si viene vacío lo dejamos en blanco
    const html1 = buildPage1Html({
      finalConclusion,
      userData: userDataB64,
      baseImgB64,
      overlayB64s,
      figuras,
      topLeftText: topLeftText || '',
    });
    const jpgPage1 = await captureHtmlAsPng(browser, html1);

    // ── Página 2: igual que móvil — solo si hay comentario O imagen de tabla seleccionada
    const hayPag2 = comentarioLista.trim().length > 0 || imgListaB64 !== null;
    let jpgPage2 = null;
    if (hayPag2) {
      const html2 = buildPage2Html({
        listaVisual,
        comentarioLista,
        imgListaB64,
        hasPlantilla: plantillaId && plantillaId !== 'none',
      });
      jpgPage2 = await captureHtmlAsPng(browser, html2);
    }

    await browser.close();
    browser = null;

    const pdfBytes = await assemblePdf({ jpgPage1, jpgPage2, plantillaId });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte.pdf',
      },
    });
  } catch (err) {
    if (browser) { try { await browser.close(); } catch {} }
    console.error('Error PDF visual:', err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
