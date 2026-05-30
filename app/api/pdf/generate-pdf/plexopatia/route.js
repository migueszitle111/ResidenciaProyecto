import { NextResponse }  from 'next/server';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
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

// Plantilla real dimensions (measured)
const PW = 595.28;
const PH = 841.89;

// Layout zones matching reference PDF (mEDXproPlexopatia_1.pdf)
// Header bar: y=800–841
// Sub-header zone: y=730–800  → patient name + logo box
// Content zone: y=185–728     → lámina + diagnóstico text
// Footer text: y=102           → just above dark MEDX bar
// Dark bar (plantilla): y=0–98

const ZONE_CONTENT_TOP = 728;   // top of lámina
const ZONE_CONTENT_BOT = 185;   // bottom of content zone
const MARGIN_L = 42;
const MARGIN_R = 42;
const CONTENT_W = PW - MARGIN_L - MARGIN_R;   // ~511pt

// BP_PTR.png natural size: 1582×2048 px → ratio h/w = 1.2946 (portrait)
const LAM_IMG_RATIO = 2048 / 1582;             // ≈1.2946 (height per width unit)

const OVERLAYS_PLEXO = {
  'IzquierdoIMG':   '/PlexopatiaImg/PlcervicalIZQ.png',
  'DerechoIMG':     '/PlexopatiaImg/PlCervicalDec.png',
  'ImgTroncosDrc':  '/PlexopatiaImg/TroncoSpD.png',
  'ImgTroncosIzq':  '/PlexopatiaImg/TroncoSpIzq.png',
  'ImgTroncoMdDrc': '/PlexopatiaImg/TroncoMdD.png',
  'ImgTroncoMdIzq': '/PlexopatiaImg/TroncoMdIzq.png',
  'ImgTroncoInDrc': '/PlexopatiaImg/TroncoInD.png',
  'ImgTroncoInIzq': '/PlexopatiaImg/TroncoInIzq.png',
  'ImgTroncoSpBlt': '/PlexopatiaImg/TroncoSpBl.png',
  'ImgTroncoMdBlt': '/PlexopatiaImg/TroncoMdBl.png',
  'ImgTroncoInBlt': '/PlexopatiaImg/TroncoInBl.png',
  'CordonLtD':      '/PlexopatiaImg/CordonLtD.png',
  'CordonMdD':      '/PlexopatiaImg/CordonMdD.png',
  'CordonPsD':      '/PlexopatiaImg/CordonPsD.png',
  'CordonLtIzq':    '/PlexopatiaImg/CordonLtIzq.png',
  'CordonMdIzq':    '/PlexopatiaImg/CordonMdIzq.png',
  'CordonPsIzq':    '/PlexopatiaImg/CordonPsIzq.png',
  'CordonLtBlt':    '/PlexopatiaImg/CordonLtBlt.png',
  'CordonMdBlt':    '/PlexopatiaImg/CordonMdBlt.png',
  'CordonPsBlt':    '/PlexopatiaImg/CordonPsBlt.png',
  'LumbosacroDrc':  '/PlexopatiaImg/LumbosacroD.png',
  'LumbosacroIzq':  '/PlexopatiaImg/LumbosacroIzq.png',
  'LumbosacroBlt':  '/PlexopatiaImg/LumbosacroBlt.png',
  'LumbarDrc':      '/PlexopatiaImg/PxLumbarD.png',
  'LumbarIzq':      '/PlexopatiaImg/PxLumbarIzq.png',
  'LumbarBlt':      '/PlexopatiaImg/LumbarBlt.png',
  'TcLumbosDrc':    '/PlexopatiaImg/TcLumbosacroD.png',
  'TcLumbosIzq':    '/PlexopatiaImg/TcLumbosacroIzq.png',
  'TcLumbosBlt':    '/PlexopatiaImg/TcLumbosacroBlt.png',
  'SacroDrc':       '/PlexopatiaImg/SacroD.png',
  'SacroIzq':       '/PlexopatiaImg/SacroIzq.png',
  'SacroBlt':       '/PlexopatiaImg/SacroBlt.png',
  'IliohipoDrc':    '/PlexopatiaImg/IliohipoD.png',
  'IliohipoIzq':    '/PlexopatiaImg/IliohipoIzq.png',
  'IliohipoBlt':    '/PlexopatiaImg/IliohipoBlt.png',
  'FemoroDrc':      '/PlexopatiaImg/FemoroD.png',
  'FemoroIzq':      '/PlexopatiaImg/FemoroIzq.png',
  'FemoroBlt':      '/PlexopatiaImg/FemoroBlt.png',
  'PudendoDrc':     '/PlexopatiaImg/PudendoD.png',
  'PudendoIzq':     '/PlexopatiaImg/PudendoIzq.png',
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
  // In production, images live in the backend under /laminasImg/
  // Strip leading /assets/ prefix if present (trigeminofacial uses /assets/TrigeminoFacialImg/...)
  const imgPath = publicPath.startsWith('/assets/') ? publicPath.slice(7) : publicPath;
  return fetchBytes(`${BACKEND_URL}/laminasImg${imgPath}`);
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

// Word-wrap to fit within maxWidth
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
function justifyLine(page, line, isLast, x, y, font, fontSize, colWidth, color) {
  const words = line.split(' ');
  if (words.length <= 1 || isLast) { page.drawText(line, { x, y, font, size: fontSize, color }); return; }
  const totalWordW = words.reduce((s, w) => s + font.widthOfTextAtSize(w, fontSize), 0);
  const gap = (colWidth - totalWordW) / (words.length - 1);
  let cx = x;
  for (const w of words) { page.drawText(w, { x: cx, y, font, size: fontSize, color }); cx += font.widthOfTextAtSize(w, fontSize) + gap; }
}

// ── Page 1 ───────────────────────────────────────────────────────────────────

async function buildPage1(pdfDoc, {
  finalConclusion, userData, baseImgBytes, overlayBytesArr, figurasData,
  laminaSize, topLeftText, plantillaId, fontRegular, fontBold, fontLight,
}) {
  const page = pdfDoc.addPage([PW, PH]);

  // ── Plantilla background (drawn first, content on top) ──
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

  // ── Sub-header: patient name (left) + doctor logo box (right) ──
  // Sub-header zone: y=728–790 (between header bar and content zone)
  // Center vertically at y≈754 (mid of 728–780)
  const SUBHDR_TEXT_Y = 742;

  if (topLeftText) {
    page.drawText(topLeftText, {
      x: MARGIN_L + 20, y: SUBHDR_TEXT_Y,
      font: fontBold, size: 9.5,
      color: rgb(0.08, 0.08, 0.08),
    });
  }

  // Doctor logo: top-right inside a thin-bordered white box (matches reference)
  const LOGO_BOX_SZ = 52;
  const LOGO_BOX_X  = PW - MARGIN_R - LOGO_BOX_SZ;
  const LOGO_BOX_Y  = SUBHDR_TEXT_Y - 20;  // lower in sub-header zone

  if (userData.imageUrl) {
    const logoBytes = await fetchRemoteBytes(userData.imageUrl);
    const logoImg   = await embedImg(pdfDoc, logoBytes, dataUrlMime(userData.imageUrl));
    if (logoImg) {
      page.drawImage(logoImg, {
        x: LOGO_BOX_X, y: LOGO_BOX_Y,
        width: LOGO_BOX_SZ, height: LOGO_BOX_SZ,
        opacity: 0.55,
      });
    }
  }

  // ── Lámina sizing ──
  // BP_PTR.png is 1582×2048 (portrait, ratio 1.2946 h/w).
  // Reference: body fills ~490pt tall, ~378pt wide, centered in content zone.
  // Reserve ~70pt below lámina for "Diagnóstico" title + 2 text lines.
  const DIAG_RESERVE = 70;
  const LAM_H_MAX    = ZONE_CONTENT_TOP - ZONE_CONTENT_BOT - DIAG_RESERVE; // ~473pt
  const LAM_W_FROM_H = Math.round(LAM_H_MAX / LAM_IMG_RATIO);               // ~365pt
  const LAM_W_MAX    = CONTENT_W;                                             // ~511pt
  // Constrain by height (portrait image fills height)
  let LAM_H = LAM_H_MAX;
  let LAM_W = LAM_W_FROM_H;
  // If width would exceed content width, constrain by width instead
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

  // ── Figuras movibles ──
  // x, y, dw, dh arrive as raw screen pixels (laminaSize space).
  // One scale maps them directly to PDF lámina points.
  const scaleX = LAM_W / (laminaSize?.w || 690);
  const scaleY = LAM_H / (laminaSize?.h || 620);

for (const f of (figurasData || [])) {
    if (!f.src) continue;
    const figBytes = await fetchRemoteBytes(f.src);
    const figImg   = await embedImg(pdfDoc, figBytes, dataUrlMime(f.src));
    if (!figImg) continue;

    const isSymbol = f.tipo === 'symbol';
    const defSz = isSymbol ? 48 : 80;
    const boxW = (f.dw ?? defSz) * scaleX;
    const boxH = (f.dh ?? defSz) * scaleY;

    // For symbols, preserve natural aspect ratio within the display box.
    let fw = boxW;
    let fh = boxH;
    if (isSymbol && f.nw && f.nh) {
      const ratio = f.nw / f.nh;
      if (ratio > 1) { fh = fw / ratio; }
      else           { fw = fh * ratio; }
    }

    const fx = LAM_X + f.x * scaleX + (boxW - fw) / 2;
    const fy = LAM_Y + LAM_H - f.y * scaleY - boxH + (boxH - fh) / 2;

    const rot = f.rotation ?? 0;
    // pdf-lib rotates around the bottom-left corner of the image.
    // To rotate around the image center, offset the anchor by the rotation.
    let drawX = fx, drawY = fy;
    if (rot !== 0) {
      const rad = (rot * Math.PI) / 180;
      const cx = fx + fw / 2, cy = fy + fh / 2;
      // New bottom-left after rotating image around its own center:
      drawX = cx - (fw / 2) * Math.cos(rad) + (fh / 2) * Math.sin(rad);
      drawY = cy - (fw / 2) * Math.sin(rad) - (fh / 2) * Math.cos(rad);
    }
    page.drawImage(figImg, { x: drawX, y: drawY, width: fw, height: fh, rotate: degrees(rot) });

    if (!isSymbol) {
      if (f.tipo === 'circle') {
        page.drawEllipse({
          x: fx + fw / 2, y: fy + fh / 2,
          xScale: fw / 2, yScale: fh / 2,
          borderColor: rgb(0.35, 0.35, 0.35), borderWidth: 1.2,
        });
      } else {
        page.drawRectangle({
          x: fx, y: fy, width: fw, height: fh,
          borderColor: rgb(0.45, 0.45, 0.45), borderWidth: 1.0,
        });
      }
    }
  }

  // ── Diagnóstico text — immediately below lámina ──
  // ── Footer constants (defined early so TEXT_FLOOR can reference them) ──
  const FTR_Y        = 48;
  const FTR_SZ       = 7.5;

  // Reference: "Diagnóstico" bold black, body text regular black ~9pt
  const DIAG_X     = MARGIN_L + 14;
  const DIAG_W     = CONTENT_W - 14;
  const TITLE_Y    = LAM_Y - 62;
  const FONT_SZ    = 9;
  const LINE_H     = 13;
  const BLACK      = rgb(0.07, 0.07, 0.07);
  const TEXT_FLOOR = FTR_Y + FTR_SZ + 10;  // stop just above footer

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

  // ── Footer: doctor info with drawn icons — just above the dark MEDX bar ──
  const ICON_R       = 3.2;   // icon circle/shape radius in pt
  const ICON_GAP     = 4;     // gap between icon and text
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
    // Pre-calculate total width to center
    const SEP_W  = fontLight.widthOfTextAtSize(SEP, FTR_SZ);
    const iconSlot = ICON_R * 2 + ICON_GAP; // width taken by each icon
    let totalW = 0;
    for (let i = 0; i < ftrSegments.length; i++) {
      if (i > 0) totalW += SEP_W;
      totalW += iconSlot + fontLight.widthOfTextAtSize(ftrSegments[i].text, FTR_SZ);
    }
    let cx = (PW - totalW) / 2;
    const iconBaseline = FTR_Y + FTR_SZ * 0.3; // vertically center icon with text cap

    for (let i = 0; i < ftrSegments.length; i++) {
      if (i > 0) {
        page.drawText(SEP, { x: cx, y: FTR_Y, font: fontLight, size: FTR_SZ, color: DARK });
        cx += SEP_W;
      }

      // Draw icon shape
      const ic = ftrSegments[i].icon;
      const ix = cx + ICON_R; // center x of icon
      const iy = iconBaseline;

      if (ic === 'person') {
        // Head circle + body arc = person silhouette
        page.drawEllipse({ x: ix, y: iy + 2.5, xScale: 1.8, yScale: 1.8, color: ICON_FILL });
        page.drawEllipse({ x: ix, y: iy - 1.2, xScale: 3.0, yScale: 1.8, color: ICON_FILL });
      } else if (ic === 'email') {
        // Envelope: rectangle with V-line on top
        page.drawRectangle({ x: ix - 3.5, y: iy - 2, width: 7, height: 4.5,
          borderColor: ICON_FILL, borderWidth: 0.8, color: rgb(1,1,1) });
        // V flap lines
        page.drawLine({ start: { x: ix - 3.5, y: iy + 2.5 }, end: { x: ix, y: iy + 0.2 },
          thickness: 0.8, color: ICON_FILL });
        page.drawLine({ start: { x: ix, y: iy + 0.2 }, end: { x: ix + 3.5, y: iy + 2.5 },
          thickness: 0.8, color: ICON_FILL });
      } else if (ic === 'dot') {
        // Filled circle
        page.drawEllipse({ x: ix, y: iy, xScale: ICON_R - 0.5, yScale: ICON_R - 0.5, color: ICON_FILL });
      } else if (ic === 'id') {
        // ID card: rectangle with small lines inside
        page.drawRectangle({ x: ix - 4, y: iy - 2.5, width: 8, height: 5,
          borderColor: ICON_FILL, borderWidth: 0.8, color: rgb(1,1,1) });
        page.drawLine({ start: { x: ix - 2, y: iy + 0.5 }, end: { x: ix + 2, y: iy + 0.5 },
          thickness: 0.7, color: ICON_FILL });
        page.drawLine({ start: { x: ix - 2, y: iy - 0.8 }, end: { x: ix + 1, y: iy - 0.8 },
          thickness: 0.7, color: ICON_FILL });
      }

      cx += iconSlot;

      // Draw text
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
  // With plantilla: header takes top ~120pt, footer takes bottom ~140pt
  const TOP_Y   = hasPlantilla ? ZONE_CONTENT_TOP : PH - 50;
  const BOT_Y   = hasPlantilla ? ZONE_CONTENT_BOT : 40;
  const COL_OFFSET = 20;                              // shift both cols right
  const COL_GAP    = 28;
  const COL_W      = (CONTENT_W - COL_GAP) / 2;
  const FONT_SZ    = 8.5;
  const LINE_H     = 13;
  const LX         = MARGIN_L + COL_OFFSET;           // left col x
  const RX         = LX + COL_W + COL_GAP;            // right col x

  // Left col: Estudio
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

  // Right col: Comentario
  let ry = TOP_Y - 30;
  page.drawText('Comentario', {
    x: RX, y: ry,
    font: fontBold, size: 9, color: rgb(0.07, 0.07, 0.07),
  });
  ry -= 16;

  if (comentarioLista) {
    const cLines = comentarioLista.split('\n').flatMap(l => wrapText(l || ' ', fontRegular, FONT_SZ, COL_W));
    for (let ci = 0; ci < cLines.length; ci++) {
      if (ry < BOT_Y) break;
      justifyLine(page, cLines[ci], ci === cLines.length - 1, RX, ry, fontRegular, FONT_SZ, COL_W, rgb(0.08,0.08,0.08));
      ry -= LINE_H;
    }
  }

  // Tabla image: centered, with large gap below both columns
  if (imgListaBytes) {
    const tablaImg = await embedImg(pdfDoc, imgListaBytes);
    if (tablaImg) {
      const { width: iw, height: ih } = tablaImg;
      const maxW  = CONTENT_W;
      const lowestCol = Math.min(ly, ry);
      const tablaTopY = lowestCol - 200;              // 60pt gap below columns
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
      laminaSize      = { w: 690, h: 620 },
    } = body;

    // Load fonts from filesystem
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

    // Fetch all images in parallel
    const ovPaths = activeOv
      .map(key => OVERLAYS_PLEXO[key])
      .filter(Boolean)
      .filter((p, i, arr) => arr.indexOf(p) === i);

    const [baseImgBytes, imgListaBytes, ...overlayBytesArr] = await Promise.all([
      fetchLocalBytes('/PlexopatiaImg/BP_PTR.png'),
      fetchRemoteBytes(imgListaUrl),
      ...ovPaths.map(p => fetchLocalBytes(p)),
    ]);

    await buildPage1(pdfDoc, {
      finalConclusion, userData, baseImgBytes, overlayBytesArr,
      figurasData: figuras, laminaSize, topLeftText, plantillaId,
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
        'Content-Disposition': 'attachment; filename=reporte_plexopatia.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF plexopatia:', err);
    return NextResponse.json({ message: 'Error generando PDF: ' + err.message }, { status: 500 });
  }
}
