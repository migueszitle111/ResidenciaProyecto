import { NextResponse }  from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isDev   = process.env.NODE_ENV !== 'production';
const baseUrl = isDev
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medxproapp.com');

const BACKEND_URL = 'https://backendmedxpro-tef2.onrender.com';

const PW = 595.28;
const PH = 841.89;

const ZONE_CONTENT_TOP = 728;
const ZONE_CONTENT_BOT = 185;
const MARGIN_L = 42;
const MARGIN_R = 42;
const CONTENT_W = PW - MARGIN_L - MARGIN_R;

// SO_BASE_TR.png natural size: 1583×2048 px → ratio h/w ≈ 1.2939
const LAM_IMG_RATIO = 2048 / 1583;

const OVERLAYS_SOMATO = {
  superiores_indemne_izq:   '/SomatosensorialImg/SUPERIORDERECHA.png',
  superiores_indemne_der:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  inferiores_indemne_izq:   '/SomatosensorialImg/INFERIORDERECHA.png',
  inferiores_indemne_der:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  superior_izq: '/SomatosensorialImg/SUPERIORDERECHA.png',
  superior_der: '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  inferior_izq: '/SomatosensorialImg/INFERIORDERECHA.png',
  inferior_der: '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  izquierdo_mediano: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_mediano:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_ulnar: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_ulnar:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_radial_superficial: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_radial_superficial:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_antebraqueal_cutaneo_lateral: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_antebraqueal_cutaneo_lateral:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',

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

// ── helpers ──────────────────────────────────────────────────────────────────

async function fetchBytes(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch { return null; }
}

async function fetchLocalBytes(publicPath) {
  if (!publicPath) return null;
  try {
    const fsPath = path.join(process.cwd(), 'public', publicPath);
    if (fs.existsSync(fsPath)) return new Uint8Array(fs.readFileSync(fsPath));
  } catch {}
  return fetchBytes(`${baseUrl}${publicPath}`);
}

async function fetchRemoteBytes(url) {
  if (!url) return null;
  if (url.startsWith('data:')) {
    const comma = url.indexOf(',');
    if (comma === -1) return null;
    return new Uint8Array(Buffer.from(url.slice(comma + 1), 'base64'));
  }
  return fetchBytes(url);
}

function loadFontBytes(filename) {
  const p = path.join(process.cwd(), 'public', 'fonts', filename);
  try { return fs.readFileSync(p); } catch { return null; }
}

async function embedPng(pdfDoc, bytes) {
  if (!bytes) return null;
  try { return await pdfDoc.embedPng(bytes); } catch { return null; }
}
async function embedJpg(pdfDoc, bytes) {
  if (!bytes) return null;
  try { return await pdfDoc.embedJpg(bytes); } catch { return null; }
}

function dataUrlMime(url) {
  if (!url || !url.startsWith('data:')) return null;
  const semi = url.indexOf(';');
  return semi > 5 ? url.slice(5, semi) : null;
}

async function embedImg(pdfDoc, bytes, mimeHint) {
  if (!bytes) return null;
  if (mimeHint === 'image/jpeg' || mimeHint === 'image/jpg') {
    const img = await embedJpg(pdfDoc, bytes);
    if (img) return img;
  }
  const img = await embedPng(pdfDoc, bytes);
  if (img) return img;
  return embedJpg(pdfDoc, bytes);
}

function wrapText(text, font, fontSize, maxWidth) {
  if (!text) return [];
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    if (font.widthOfTextAtSize(test, fontSize) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// ── Page 1 ───────────────────────────────────────────────────────────────────

async function buildPage1(pdfDoc, {
  finalConclusion, userData, baseImgBytes, overlayBytesArr, figurasData,
  topLeftText, plantillaId, fontRegular, fontBold, fontLight,
}) {
  const page = pdfDoc.addPage([PW, PH]);

  if (plantillaId && plantillaId !== 'none' && PLANTILLAS_PDF[plantillaId]) {
    const tplBytes = await fetchBytes(`${BACKEND_URL}/plantillas/${PLANTILLAS_PDF[plantillaId].p1}`);
    if (tplBytes) {
      try {
        const tplDoc = await PDFDocument.load(tplBytes);
        const [tplPg] = await pdfDoc.embedPdf(tplDoc, [0]);
        page.drawPage(tplPg, { x: 0, y: 0, width: PW, height: PH });
      } catch (e) { console.warn('plantilla p1:', e.message); }
    }
  }

  const SUBHDR_TEXT_Y = 742;

  if (topLeftText) {
    page.drawText(topLeftText, {
      x: MARGIN_L + 20, y: SUBHDR_TEXT_Y,
      font: fontBold, size: 9.5,
      color: rgb(0.08, 0.08, 0.08),
    });
  }

  const LOGO_BOX_SZ = 52;
  const LOGO_BOX_X  = PW - MARGIN_R - LOGO_BOX_SZ;
  const LOGO_BOX_Y  = SUBHDR_TEXT_Y - 20;

  if (userData.imageUrl) {
    const logoBytes = await fetchRemoteBytes(userData.imageUrl);
    const logoImg   = await embedImg(pdfDoc, logoBytes, dataUrlMime(userData.imageUrl));
    if (logoImg) {
      page.drawImage(logoImg, {
        x: LOGO_BOX_X, y: LOGO_BOX_Y,
        width: LOGO_BOX_SZ, height: LOGO_BOX_SZ,
      });
    }
  }

  const DIAG_RESERVE = 70;
  const LAM_H_MAX    = ZONE_CONTENT_TOP - ZONE_CONTENT_BOT - DIAG_RESERVE;
  const LAM_W_FROM_H = Math.round(LAM_H_MAX / LAM_IMG_RATIO);
  const LAM_W_MAX    = CONTENT_W;
  let LAM_H = LAM_H_MAX;
  let LAM_W = LAM_W_FROM_H;
  if (LAM_W > LAM_W_MAX) {
    LAM_W = LAM_W_MAX;
    LAM_H = Math.round(LAM_W * LAM_IMG_RATIO);
  }
  const LAM_X = MARGIN_L + Math.round((CONTENT_W - LAM_W) / 2);
  const LAM_Y = ZONE_CONTENT_TOP - LAM_H;

  const baseImg = await embedImg(pdfDoc, baseImgBytes);
  if (baseImg) {
    page.drawImage(baseImg, { x: LAM_X, y: LAM_Y, width: LAM_W, height: LAM_H });
  }
  for (const ovBytes of overlayBytesArr) {
    const ovImg = await embedImg(pdfDoc, ovBytes);
    if (ovImg) {
      page.drawImage(ovImg, { x: LAM_X, y: LAM_Y, width: LAM_W, height: LAM_H });
    }
  }

  const FIG_SIZE = 56;
  const scaleX   = LAM_W / 690;
  const scaleY   = LAM_H / 620;

  for (const f of (figurasData || [])) {
    if (!f.src) continue;
    const figBytes = await fetchRemoteBytes(f.src);
    const figImg   = await embedImg(pdfDoc, figBytes, dataUrlMime(f.src));
    if (!figImg) continue;

    const fx = LAM_X + f.x * scaleX;
    const fy = LAM_Y + LAM_H - f.y * scaleY - FIG_SIZE;

    page.drawImage(figImg, { x: fx, y: fy, width: FIG_SIZE, height: FIG_SIZE });

    if (f.tipo === 'circle') {
      page.drawEllipse({
        x: fx + FIG_SIZE / 2, y: fy + FIG_SIZE / 2,
        xScale: FIG_SIZE / 2, yScale: FIG_SIZE / 2,
        borderColor: rgb(0.35, 0.35, 0.35), borderWidth: 1.2,
      });
    } else {
      page.drawRectangle({
        x: fx, y: fy, width: FIG_SIZE, height: FIG_SIZE,
        borderColor: rgb(0.45, 0.45, 0.45), borderWidth: 1.0,
      });
    }
  }

  const FTR_Y        = 48;
  const FTR_SZ       = 7.5;

  const DIAG_X     = MARGIN_L + 14;
  const DIAG_W     = CONTENT_W - 14;
  const TITLE_Y    = LAM_Y - 62;
  const FONT_SZ    = 9;
  const LINE_H     = 13;
  const BLACK      = rgb(0.07, 0.07, 0.07);
  const TEXT_FLOOR = FTR_Y + FTR_SZ + 10;

  page.drawText('Diagnóstico', {
    x: DIAG_X, y: TITLE_Y,
    font: fontBold, size: 9,
    color: BLACK,
  });

  const paragraphs = (finalConclusion || '')
    .split('\n\n').map(p => p.trim()).filter(Boolean);
  let textY = TITLE_Y - 14;

  for (const para of paragraphs) {
    const lines = wrapText(para, fontRegular, FONT_SZ, DIAG_W);
    for (const line of lines) {
      if (textY < TEXT_FLOOR) break;
      page.drawText(line, { x: DIAG_X, y: textY, font: fontRegular, size: FONT_SZ, color: BLACK });
      textY -= LINE_H;
    }
    textY -= 4;
  }

  const ICON_R       = 3.2;
  const ICON_GAP     = 4;
  const SEP          = '   |   ';
  const DARK         = rgb(0.22, 0.22, 0.22);
  const ICON_FILL    = rgb(0.3, 0.3, 0.3);

  const ftrSegments = [
    userData.name        ? { icon: 'person', text: `Dr. ${userData.name}${userData.lastname ? ' ' + userData.lastname : ''}` } : null,
    userData.email       ? { icon: 'email',  text: userData.email } : null,
    userData.especialidad ? { icon: 'dot',   text: userData.especialidad } : null,
    userData.cedula      ? { icon: 'id',     text: `Céd. ${userData.cedula}` } : null,
  ].filter(Boolean);

  if (ftrSegments.length) {
    const SEP_W  = fontLight.widthOfTextAtSize(SEP, FTR_SZ);
    const iconSlot = ICON_R * 2 + ICON_GAP;
    let totalW = 0;
    for (let i = 0; i < ftrSegments.length; i++) {
      if (i > 0) totalW += SEP_W;
      totalW += iconSlot + fontLight.widthOfTextAtSize(ftrSegments[i].text, FTR_SZ);
    }
    let cx = (PW - totalW) / 2;
    const iconBaseline = FTR_Y + FTR_SZ * 0.3;

    for (let i = 0; i < ftrSegments.length; i++) {
      if (i > 0) {
        page.drawText(SEP, { x: cx, y: FTR_Y, font: fontLight, size: FTR_SZ, color: DARK });
        cx += SEP_W;
      }

      const ic = ftrSegments[i].icon;
      const ix = cx + ICON_R;
      const iy = iconBaseline;

      if (ic === 'person') {
        page.drawEllipse({ x: ix, y: iy + 2.5, xScale: 1.8, yScale: 1.8, color: ICON_FILL });
        page.drawEllipse({ x: ix, y: iy - 1.2, xScale: 3.0, yScale: 1.8, color: ICON_FILL });
      } else if (ic === 'email') {
        page.drawRectangle({ x: ix - 3.5, y: iy - 2, width: 7, height: 4.5,
          borderColor: ICON_FILL, borderWidth: 0.8, color: rgb(1,1,1) });
        page.drawLine({ start: { x: ix - 3.5, y: iy + 2.5 }, end: { x: ix, y: iy + 0.2 },
          thickness: 0.8, color: ICON_FILL });
        page.drawLine({ start: { x: ix, y: iy + 0.2 }, end: { x: ix + 3.5, y: iy + 2.5 },
          thickness: 0.8, color: ICON_FILL });
      } else if (ic === 'dot') {
        page.drawEllipse({ x: ix, y: iy, xScale: ICON_R - 0.5, yScale: ICON_R - 0.5, color: ICON_FILL });
      } else if (ic === 'id') {
        page.drawRectangle({ x: ix - 4, y: iy - 2.5, width: 8, height: 5,
          borderColor: ICON_FILL, borderWidth: 0.8, color: rgb(1,1,1) });
        page.drawLine({ start: { x: ix - 2, y: iy + 0.5 }, end: { x: ix + 2, y: iy + 0.5 },
          thickness: 0.7, color: ICON_FILL });
        page.drawLine({ start: { x: ix - 2, y: iy - 0.8 }, end: { x: ix + 1, y: iy - 0.8 },
          thickness: 0.7, color: ICON_FILL });
      }

      cx += iconSlot;

      page.drawText(ftrSegments[i].text, { x: cx, y: FTR_Y, font: fontLight, size: FTR_SZ, color: DARK });
      cx += fontLight.widthOfTextAtSize(ftrSegments[i].text, FTR_SZ);
    }
  }
}

// ── Page 2 ───────────────────────────────────────────────────────────────────

async function buildPage2(pdfDoc, {
  listaVisual, comentarioLista, imgListaBytes, plantillaId,
  fontRegular, fontBold,
}) {
  const page = pdfDoc.addPage([PW, PH]);

  if (plantillaId && plantillaId !== 'none' && PLANTILLAS_PDF[plantillaId]) {
    const tplBytes = await fetchBytes(`${BACKEND_URL}/plantillas/${PLANTILLAS_PDF[plantillaId].p2}`);
    if (tplBytes) {
      try {
        const tplDoc = await PDFDocument.load(tplBytes);
        const [tplPg] = await pdfDoc.embedPdf(tplDoc, [0]);
        page.drawPage(tplPg, { x: 0, y: 0, width: PW, height: PH });
      } catch (e) { console.warn('plantilla p2:', e.message); }
    }
  }

  const hasPlantilla = plantillaId && plantillaId !== 'none';
  const TOP_Y   = hasPlantilla ? ZONE_CONTENT_TOP : PH - 50;
  const BOT_Y   = hasPlantilla ? ZONE_CONTENT_BOT : 40;
  const COL_OFFSET = 20;
  const COL_GAP    = 28;
  const COL_W      = (CONTENT_W - COL_GAP) / 2;
  const FONT_SZ    = 8.5;
  const LINE_H     = 13;
  const LX         = MARGIN_L + COL_OFFSET;
  const RX         = LX + COL_W + COL_GAP;

  let ly = TOP_Y - 30;
  page.drawText('Estudio', {
    x: LX, y: ly,
    font: fontBold, size: 9, color: rgb(0.07, 0.07, 0.07),
  });
  ly -= 16;

  for (const { k, v } of (listaVisual || [])) {
    if (ly < BOT_Y) break;
    const keyStr = `${k}: `;
    const keyW   = fontBold.widthOfTextAtSize(keyStr, FONT_SZ);
    page.drawText(keyStr, { x: LX, y: ly, font: fontBold, size: FONT_SZ, color: rgb(0.08,0.08,0.08) });
    const valLines = wrapText(v, fontRegular, FONT_SZ, COL_W - keyW);
    if (valLines.length === 0) { ly -= LINE_H; continue; }
    page.drawText(valLines[0], { x: LX + keyW, y: ly, font: fontRegular, size: FONT_SZ, color: rgb(0.08,0.08,0.08) });
    ly -= LINE_H;
    for (let i = 1; i < valLines.length; i++) {
      if (ly < BOT_Y) break;
      page.drawText(valLines[i], { x: LX + keyW, y: ly, font: fontRegular, size: FONT_SZ, color: rgb(0.08,0.08,0.08) });
      ly -= LINE_H;
    }
  }

  let ry = TOP_Y - 30;
  page.drawText('Comentario', {
    x: RX, y: ry,
    font: fontBold, size: 9, color: rgb(0.07, 0.07, 0.07),
  });
  ry -= 16;

  if (comentarioLista) {
    const cLines = comentarioLista.split('\n').flatMap(l => wrapText(l || ' ', fontRegular, FONT_SZ, COL_W));
    for (const cl of cLines) {
      if (ry < BOT_Y) break;
      page.drawText(cl, { x: RX, y: ry, font: fontRegular, size: FONT_SZ, color: rgb(0.08,0.08,0.08) });
      ry -= LINE_H;
    }
  }

  if (imgListaBytes) {
    const tablaImg = await embedImg(pdfDoc, imgListaBytes);
    if (tablaImg) {
      const { width: iw, height: ih } = tablaImg;
      const maxW  = CONTENT_W;
      const lowestCol = Math.min(ly, ry);
      const tablaTopY = lowestCol - 200;
      const maxH  = Math.min(tablaTopY - BOT_Y - 10, 320);
      if (maxH > 30) {
        const scale = Math.min(maxW / iw, maxH / ih, 1);
        const dw = iw * scale;
        const dh = ih * scale;
        page.drawImage(tablaImg, {
          x: MARGIN_L + (CONTENT_W - dw) / 2,
          y: tablaTopY - dh,
          width: dw, height: dh,
        });
      }
    }
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      finalConclusion = '',
      activeOv        = [],
      figuras         = [],
      listaVisual     = [],
      imgListaUrl     = null,
      comentarioLista = '',
      userData        = {},
      topLeftText     = '',
      plantillaId     = 'none',
    } = body;

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontRegular = await (async () => {
      const b = loadFontBytes('LuxoraGrotesk-Regular.ttf');
      return b ? pdfDoc.embedFont(b) : pdfDoc.embedFont('Helvetica');
    })();
    const fontBold = await (async () => {
      const b = loadFontBytes('LuxoraGrotesk-Bold.ttf');
      return b ? pdfDoc.embedFont(b) : pdfDoc.embedFont('Helvetica-Bold');
    })();
    const fontLight = await (async () => {
      const b = loadFontBytes('LuxoraGrotesk-Light.ttf');
      return b ? pdfDoc.embedFont(b) : fontRegular;
    })();

    const isTrigémino = activeOv.some(k =>
      k.includes('trigemino') || k.includes('trigémino')
    );
    const baseImagePath = isTrigémino
      ? '/assets/MioImg/Base_Cerebro_TR.png'
      : '/SomatosensorialImg/SO_BASE_TR.png';

    const ovPaths = activeOv
      .map(key => OVERLAYS_SOMATO[key])
      .filter(Boolean)
      .filter((p, i, arr) => arr.indexOf(p) === i);

    const [baseImgBytes, imgListaBytes, ...overlayBytesArr] = await Promise.all([
      fetchLocalBytes(baseImagePath),
      fetchRemoteBytes(imgListaUrl),
      ...ovPaths.map(p => fetchLocalBytes(p)),
    ]);

    await buildPage1(pdfDoc, {
      finalConclusion, userData, baseImgBytes, overlayBytesArr,
      figurasData: figuras, topLeftText, plantillaId,
      fontRegular, fontBold, fontLight,
    });

    const hayPag2 = (comentarioLista && comentarioLista.trim().length > 0) || !!imgListaBytes;
    if (hayPag2) {
      await buildPage2(pdfDoc, {
        listaVisual, comentarioLista, imgListaBytes, plantillaId,
        fontRegular, fontBold,
      });
    }

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false, addDefaultPage: false });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte_somatosensorial.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF somatosensorial:', err);
    return NextResponse.json({ message: 'Error generando PDF: ' + err.message }, { status: 500 });
  }
}
