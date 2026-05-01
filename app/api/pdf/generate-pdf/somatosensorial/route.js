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

const PAGE_W = 794;
const PAGE_H = 1123;

// ── Mapa de overlays (igual que web client) ───────────────────────────────────
const OVERLAYS_SOMATO = {
  superiores_indemne_izq:   '/SomatosensorialImg/SUPERIORDERECHA.png',
  superiores_indemne_der:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  inferiores_indemne_izq:   '/SomatosensorialImg/INFERIORDERECHA.png',
  inferiores_indemne_der:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  // Alias cortos (nervios / dermatomas indemne)
  superior_izq: '/SomatosensorialImg/SUPERIORDERECHA.png',
  superior_der: '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  inferior_izq: '/SomatosensorialImg/INFERIORDERECHA.png',
  inferior_der: '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  // Nervios superiores
  izquierdo_mediano: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_mediano:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_ulnar: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_ulnar:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_radial_superficial: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_radial_superficial:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_antebraqueal_cutaneo_lateral: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_antebraqueal_cutaneo_lateral:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',

  // Nervios inferiores
  izquierdo_tibial: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_tibial:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_peroneo: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_peroneo:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_peroneo_superficial: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_peroneo_superficial:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_sural: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_sural:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_safeno: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_safeno:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_femorocutaneo_lateral: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_femorocutaneo_lateral:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_pudendo: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_pudendo:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  superiores_alterada_izq:  '/SomatosensorialImg/ViaAfectada/ViaDerecha/alteradaderechasuperior.png',
  superiores_alterada_der:  '/SomatosensorialImg/ViaAfectada/alteradaizquierdasuperior.png',
  inferiores_alterada_izq:  '/SomatosensorialImg/ViaAfectada/ViaDerecha/alteradaderechainferior.png',
  inferiores_alterada_der:  '/SomatosensorialImg/ViaAfectada/alteradaizquierdainferior.png',

  // Alias dermatomas alterada
  ALT_SUP_IZQ_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9-D.png',
  ALT_SUP_DER_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9.png',
  ALT_SUP_IZQ_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_9-D.png',
  ALT_SUP_DER_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_9.png',
  ALT_SUP_IZQ_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9-D.png',
  ALT_SUP_DER_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9.png',
  ALT_INF_IZQ_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5-D.png',
  ALT_INF_DER_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5.png',
  ALT_INF_IZQ_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_5-D.png',
  ALT_INF_DER_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_5.png',
  ALT_INF_IZQ_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5-D.png',
  ALT_INF_DER_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5.png',

  trigemino_izquierdo_indemne: '/SomatosensorialImg/TRI_2.png',
  trigemino_derecho_indemne:   '/SomatosensorialImg/TRI_1.png',

  izquierdotrigeminoAlterada_leve:     '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Naranja/TRI_Naranja_2.png',
  derechotrigeminoAlterada_leve:       '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Naranja/TRI_Naranja_1.png',
  izquierdotrigeminoAlterada_moderado: '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/TR_2.png',
  derechotrigeminoAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/TR_1.png',
  izquierdotrigeminoAlterada_severo:   '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Marron/TRI_Marron_2.png',
  derechotrigeminoAlterada_severo:     '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Marron/TRI_Marron_1.png',

  izquierdocorticalsAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9-D.png',
  derechocorticalsAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9.png',
  izquierdocorticalsAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_9-D.png',
  derechocorticalsAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_9.png',
  izquierdocorticalsAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9-D.png',
  derechocorticalsAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9.png',

  izquierdosubcorticalsAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_8-D.png',
  derechosubcorticalsAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_8.png',
  izquierdosubcorticalsAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_8-D.png',
  derechosubcorticalsAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_8.png',
  izquierdosubcorticalsAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_8-D.png',
  derechosubcorticalsAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_8.png',

  izquierdocervicalsAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_7-D.png',
  derechocervicalsAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_7.png',
  izquierdocervicalsAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_7-D.png',
  derechocervicalsAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_7.png',
  izquierdocervicalsAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_7-D.png',
  derechocervicalsAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_7.png',

  izquierdoperifericosAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_6-D.png',
  derechoperifericosAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_6.png',
  izquierdoperifericosAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_R_6-D.png',
  derechoperifericosAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_R_6.png',
  izquierdoperifericosAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_6-D.png',
  derechoperifericosAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_6.png',

  izquierdocorticaliAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5-D.png',
  derechocorticaliAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5.png',
  izquierdocorticaliAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_5-D.png',
  derechocorticaliAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_5.png',
  izquierdocorticaliAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5-D.png',
  derechocorticaliAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5.png',

  izquierdosubcorticaliAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_4-D.png',
  derechosubcorticaliAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_4.png',
  izquierdosubcorticaliAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_4-D.png',
  derechosubcorticaliAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_4.png',
  izquierdosubcorticaliAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_4-D.png',
  derechosubcorticaliAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_4.png',

  izquierdotoracicoiAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_3-D.png',
  derechotoracicoiAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_3.png',
  izquierdotoracicoiAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_3-D.png',
  derechotoracicoiAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_3.png',
  izquierdotoracicoiAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_3-D.png',
  derechotoracicoiAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_3.png',

  izquierdolumbosacroiAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_2-D.png',
  derecholumbosacroiAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_2.png',
  izquierdolumbosacroiAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_2-D.png',
  derecholumbosacroiAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_2.png',
  izquierdolumbosacroiAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_2-D.png',
  derecholumbosacroiAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_2.png',

  izquierdoperifericoiAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_1-D.png',
  derechoperifericoiAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_1.png',
  izquierdoperifericoiAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_Rojo_1-D.png',
  derechoperifericoiAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_Rojo_1.png',
  izquierdoperifericoiAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_1-D.png',
  derechoperifericoiAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_1.png',
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

function buildPage1Html({ finalConclusion, userData, baseImgB64, overlayB64s, figuras, topLeftText }) {
  const PAD      = 30;
  const HDR_H    = 68;
  const HDR_PADT = 42;
  const HDR_PADH = 70;
  const LOGO_SZ  = 72;
  const LAM_W    = 690;
  const LAM_H    = 620;
  const DIAG_PH  = 64;
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

  // Support two-paragraph conclusion (split on \n\n)
  const diagHtml = (finalConclusion || '').split('\n\n').map(p => p.trim()).filter(Boolean)
    .map(p => `<p class="diag-text">${esc(p)}</p>`).join('');

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
  .lamina-wrap{flex-shrink:0;display:flex;justify-content:center;margin-top:10px;}
  .stack{position:relative;width:${LAM_W}px;height:${LAM_H}px;overflow:hidden;background:transparent;flex-shrink:0;}
  .si{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;}
  .diag{flex-shrink:0;padding:0 ${DIAG_PH}px;margin-top:110px;}
  .diag-title{font-size:11px;font-weight:700;color:#111;margin-bottom:5px}
  .diag-text{font-size:10.5px;line-height:17px;color:#1a1a1a;text-align:justify;margin-bottom:8px}
  .spacer{flex:1;min-height:0}
  .footer{
    flex-shrink:0;height:${FTR_H}px;margin-top:${FTR_BG}px;
    display:flex;flex-direction:row;align-items:center;justify-content:center;
    gap:10px;flex-wrap:wrap;padding:0 ${HDR_PADH}px;
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
    ${diagHtml}
  </div>
  <div class="spacer"></div>
  <div class="footer">${footerItems}</div>
</div>
</body>
</html>`;
}

function buildPage2Html({ listaVisual, comentarioLista, imgListaB64, hasPlantilla }) {
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
  .two-col{display:flex;flex-direction:row;flex-shrink:0;gap:40px;margin-bottom:36px;}
  .col-left{flex:1;padding:0 20px;}
  .col-right{flex:1;padding:0 20px;}
  .col-title{font-size:11px;font-weight:700;color:#111;margin-bottom:10px;}
  .li{font-size:10px;color:#111;line-height:18px;margin-bottom:5px}
  .lk{font-weight:700}
  .lv{font-weight:400}
  .li-empty{font-size:10px;color:#999;font-style:italic}
  .comment{font-size:10px;color:#111;line-height:18px;text-align:justify}
  .img-wrap{flex:1;margin-top:190px;display:flex;align-items:flex-start;justify-content:center;overflow:hidden;}
  .tabla-img{width:100%;max-height:560px;object-fit:contain;display:block;}
</style>
</head>
<body>
<div class="page">
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
  ${imgSection}
</div>
</body>
</html>`;
}

async function captureHtmlAsPng(browser, html) {
  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const buf = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: PAGE_W, height: PAGE_H } });
  await page.close();
  return buf;
}

async function assemblePdf({ jpgPage1, jpgPage2, plantillaId }) {
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
  const img1 = await pdfDoc.embedPng(jpgPage1);
  page1.drawImage(img1, { x: 0, y: 0, width: W, height: H });

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
      imgListaUrl      = null,
      comentarioLista  = '',
      userData         = {},
      topLeftText      = '',
      plantillaId      = 'none',
    } = body;

    // Detect trigémino to use cerebro base image
    const isTrigémino = activeOv.some(k =>
      k.includes('trigemino') || k.includes('trigémino')
    );
    const baseImagePath = isTrigémino
      ? '/assets/MioImg/Base_Cerebro_TR.png'
      : '/SomatosensorialImg/SO_BASE_TR.png';

    const ovPaths = activeOv.map(k => OVERLAYS_SOMATO[k]).filter(Boolean);
    const [baseImgB64, imgListaB64, doctorLogoB64, ...overlayB64s] = await Promise.all([
      localImgToB64(baseImagePath),
      remoteImgToB64(imgListaUrl),
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
    const jpgPage1 = await captureHtmlAsPng(browser, html1);

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
    console.error('Error PDF somatosensorial:', err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
