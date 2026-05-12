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

// BP_Motores_TR.png natural size: 1275×1650 px → ratio h/w = 1650/1275 ≈ 1.2941
const LAM_IMG_RATIO = 1650 / 1275;

const OVERLAY_MAP = {
  izquierdo_indemne:  '/MotoresImg/INFERIORD.png',
  derecho_indemne:    '/MotoresImg/INFERIORI.png',

  izquierdo_corticalAlterada:             '/MotoresImg/ViasAfectadas/SUPERIORD.png',
  derecho_corticalAlterada:               '/MotoresImg/ViasAfectadas/SUPERIORI.png',
  izquierdo_corticalAlterada_leve:        '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1-D.png',
  derecho_corticalAlterada_leve:          '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1.png',
  izquierdo_corticalAlterada_moderado:    '/MotoresImg/ViaAfectada/Rojo/VersionDerecha/MO_1-D.png',
  derecho_corticalAlterada_moderado:      '/MotoresImg/ViaAfectada/Rojo/MO_1.png',
  izquierdo_corticalAlterada_severo:      '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1-D.png',
  derecho_corticalAlterada_severo:        '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1.png',

  izquierdo_cervicalAlterada:             '/MotoresImg/ViasAfectadas/SUPERIORD.png',
  derecho_cervicalAlterada:               '/MotoresImg/ViasAfectadas/SUPERIORI.png',
  izquierdo_cervicalAlterada_leve:        '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1-D.png',
  derecho_cervicalAlterada_leve:          '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_1.png',
  izquierdo_cervicalAlterada_moderado:    '/MotoresImg/ViaAfectada/Rojo/VersionDerecha/MO_1-D.png',
  derecho_cervicalAlterada_moderado:      '/MotoresImg/ViaAfectada/Rojo/MO_1.png',
  izquierdo_cervicalAlterada_severo:      '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1-D.png',
  derecho_cervicalAlterada_severo:        '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_1.png',

  izquierdo_lumbasacroAlterada:           '/MotoresImg/ViasAfectadas/INFERIORD.png',
  derecho_lumbasacroAlterada:             '/MotoresImg/ViasAfectadas/INFERIORI.png',
  izquierdo_lumbasacroAlterada_leve:      '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_2-D.png',
  derecho_lumbasacroAlterada_leve:        '/MotoresImg/ViaAfectada/Naranja/BP_Motores_Naranja_2.png',
  izquierdo_lumbasacroAlterada_moderado:  '/MotoresImg/ViaAfectada/Rojo/VersionDerecha/MO_2-D.png',
  derecho_lumbasacroAlterada_moderado:    '/MotoresImg/ViaAfectada/Rojo/MO_2.png',
  izquierdo_lumbasacroAlterada_severo:    '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_2-D.png',
  derecho_lumbasacroAlterada_severo:      '/MotoresImg/ViaAfectada/Marron/BP_Motores_Marron_2.png',

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

// ── Page 1 (single page — no page 2 for motores) ─────────────────────────────

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

// ── Main handler ──────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      finalConclusion = '',
      activeOv        = [],
      figuras         = [],
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

    const ovPaths = activeOv
      .map(key => OVERLAY_MAP[key])
      .filter(Boolean)
      .filter((p, i, arr) => arr.indexOf(p) === i);

    const [baseImgBytes, ...overlayBytesArr] = await Promise.all([
      fetchLocalBytes('/MotoresImg/BP_Motores_TR.png'),
      ...ovPaths.map(p => fetchLocalBytes(p)),
    ]);

    await buildPage1(pdfDoc, {
      finalConclusion, userData, baseImgBytes, overlayBytesArr,
      figurasData: figuras, topLeftText, plantillaId,
      fontRegular, fontBold, fontLight,
    });

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false, addDefaultPage: false });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte_motoracorticoespinal.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF motoracorticoespinal:', err);
    return NextResponse.json({ message: 'Error generando PDF: ' + err.message }, { status: 500 });
  }
}
