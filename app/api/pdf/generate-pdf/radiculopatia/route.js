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

// A4 landscape (both pages)
const PW = 841.89;
const PH = 595.28;

const PLANTILLAS_PDF = {
  A: { p1: 'PLANTILLA_A_HORIZONTAL-1.pdf', p2: 'PLANTILLA_A_HORIZONTAL-2.pdf' },
  B: { p1: 'PLANTILLA_B_HORIZONTAL-1.pdf', p2: 'PLANTILLA_B_HORIZONTAL-2.pdf' },
  C: { p1: 'PLANTILLA_C_HORIZONTAL-1.pdf', p2: 'PLANTILLA_C_HORIZONTAL-2.pdf' },
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
function justifyLine(page, line, isLast, x, y, font, fontSize, colWidth, color) {
  const words = line.split(' ');
  if (words.length <= 1 || isLast) { page.drawText(line, { x, y, font, size: fontSize, color }); return; }
  const totalWordW = words.reduce((s, w) => s + font.widthOfTextAtSize(w, fontSize), 0);
  const gap = (colWidth - totalWordW) / (words.length - 1);
  let cx = x;
  for (const w of words) { page.drawText(w, { x: cx, y, font, size: fontSize, color }); cx += font.widthOfTextAtSize(w, fontSize) + gap; }
}

// ── Page 1 ────────────────────────────────────────────────────────────────────

async function buildPage1(pdfDoc, {
  finalConclusion, userData, topLeftText, plantillaId,
  postBaseBytes, antBaseBytes, postOverlayBytes, antOverlayBytes,
  crossesResolved, figurasData, fontRegular, fontBold, fontLight,
}) {
  const page = pdfDoc.addPage([PW, PH]);

  if (plantillaId && plantillaId !== 'none' && PLANTILLAS_PDF[plantillaId]) {
    const tplBytes = await fetchBytes(`${BACKEND_URL}/plantillas/${PLANTILLAS_PDF[plantillaId].p1}`);
    if (tplBytes) {
      try {
        const tplDoc = await PDFDocument.load(tplBytes);
        const [tplPg] = await pdfDoc.embedPdf(tplDoc, [0]);
        page.drawPage(tplPg, { x: 0, y: 0, width: PW, height: PH });
      } catch (e) { console.warn('plantilla:', e.message); }
    }
  }

  const MARGIN  = 30;
  const HDR_Y   = PH - 28;

  if (topLeftText) {
    page.drawText(topLeftText, {
      x: MARGIN + 10, y: HDR_Y,
      font: fontBold, size: 9,
      color: rgb(0.08, 0.08, 0.08),
    });
  }

  // Doctor logo (top-right)
  const LOGO_SZ = 40;
  if (userData.imageUrl) {
    const logoBytes = await fetchRemoteBytes(userData.imageUrl);
    const logoImg   = await embedImg(pdfDoc, logoBytes, dataUrlMime(userData.imageUrl));
    if (logoImg) {
      page.drawImage(logoImg, {
        x: PW - MARGIN - LOGO_SZ, y: HDR_Y - 10,
        width: LOGO_SZ, height: LOGO_SZ,
      });
    }
  }

  // ── Two portrait panels side by side (no gap — same as HTML layout) ────────
  // Panel ratio: 2550×3300 (portrait)
  const IMG_RATIO   = 2550 / 3300;   // ~0.7727
  // Fit two panels side by side within page width minus margins
  const HDR_BOTTOM  = PH - 46;        // bottom edge of header zone
  const FTR_TOP     = 50;             // top of diagnosis+footer zone
  const PANELS_H    = Math.round((HDR_BOTTOM - FTR_TOP) * 0.82); // ~366pt
  const PANEL_W     = Math.round(PANELS_H * IMG_RATIO);           // ~283pt
  const TOTAL_W     = PANEL_W * 2;
  const PANELS_X    = Math.round((PW - TOTAL_W) / 2);
  // Pin panel top just below header, floor derived from height
  const PANEL_TOP_Y   = PH - 28;                           // slightly below top
  const PANEL_FLOOR_Y = PANEL_TOP_Y - PANELS_H;            // bottom of panel in pdf-lib coords

  // Posterior panel (left)
  const postBase = await embedImg(pdfDoc, postBaseBytes);
  if (postBase) {
    page.drawImage(postBase, { x: PANELS_X, y: PANEL_FLOOR_Y, width: PANEL_W, height: PANELS_H });
  }
  for (const ovBytes of postOverlayBytes) {
    const ovImg = await embedImg(pdfDoc, ovBytes);
    if (ovImg) page.drawImage(ovImg, { x: PANELS_X, y: PANEL_FLOOR_Y, width: PANEL_W, height: PANELS_H });
  }

  // Anterior panel (right) — immediately adjacent, no gap
  const antPanelX = PANELS_X + PANEL_W;
  const antBase = await embedImg(pdfDoc, antBaseBytes);
  if (antBase) {
    page.drawImage(antBase, { x: antPanelX, y: PANEL_FLOOR_Y, width: PANEL_W, height: PANELS_H });
  }
  for (const ovBytes of antOverlayBytes) {
    const ovImg = await embedImg(pdfDoc, ovBytes);
    if (ovImg) page.drawImage(ovImg, { x: antPanelX, y: PANEL_FLOOR_Y, width: PANEL_W, height: PANELS_H });
  }

  // ── Crosses ───────────────────────────────────────────────────────────────
  // Cross images are 167×42px — preserve native ratio.
  // In HTML: width:64 height:64 objectFit:contain → drawn as 64×16px inside a 64×64 box.
  // The CSS `top` and `left`/`right` refer to the top-left corner of the 64×64 box.
  // We render at native ratio scaled to the same reference size (64px wide at 560px panel height).
  const CROSS_NATIVE_W = 167;
  const CROSS_NATIVE_H = 42;
  const CROSS_W = Math.round(PANELS_H * (64 / 560));
  const CROSS_H = Math.round(CROSS_W * CROSS_NATIVE_H / CROSS_NATIVE_W);
  // HTML box is 64×64 px; the actual image sits at the top of the box (objectFit:contain).
  // So the vertical anchor is the top of the box = topPct of panel height.
  // In PDF: top of box → pdf-lib Y = PANEL_FLOOR_Y + PANELS_H - topPct*PANELS_H - CROSS_H
  // (no extra vertical offset needed since image fills width of box)

  for (const c of (crossesResolved || [])) {
    if (!c.src) continue;
    const crossBytes = await fetchRemoteBytes(c.src);
    const crossImg   = await embedImg(pdfDoc, crossBytes, dataUrlMime(c.src));
    if (!crossImg) continue;

    const topPct = c.topPct || 0;
    const offPct = c.offPct || 0;

    // Y: top of HTML box → bottom-left in pdf-lib
    // Add 0.06 vertical offset to match GUI visual — the HTML panel container
    // includes whitespace above the body (~4.7%) plus rendering differences
    const cy = PANEL_FLOOR_Y + PANELS_H - (topPct + 0.02) * PANELS_H - CROSS_H;

    if (c.side === 'L') {
      // HTML: left:offPct*100% — x from left edge of posterior panel
      const cx = PANELS_X + offPct * PANEL_W;
      page.drawImage(crossImg, { x: cx, y: cy, width: CROSS_W, height: CROSS_H });
    } else {
      // HTML: right:offPct*100% — distance from right edge of anterior panel
      // → x from left = antPanelX + (1-offPct)*PANEL_W - CROSS_W
      const cx = antPanelX + (1 - offPct) * PANEL_W - CROSS_W;
      page.drawImage(crossImg, { x: cx, y: cy, width: CROSS_W, height: CROSS_H });
    }
  }

  // ── Figuras movibles ──────────────────────────────────────────────────────
  // Frontend normalises figura coords to 690×620 before sending (PDF_LAM_W/H).
  // Map that space to the actual two-panel area in the PDF.
  const FIG_SIZE  = Math.round(PANELS_H * (80 / 560));
  const figScaleX = TOTAL_W / 690;
  const figScaleY = PANELS_H / 620;

  for (const f of (figurasData || [])) {
    if (!f.src) continue;
    const figBytes = await fetchRemoteBytes(f.src);
    const figImg   = await embedImg(pdfDoc, figBytes, dataUrlMime(f.src));
    if (!figImg) continue;

    const fx = PANELS_X + f.x * figScaleX;
    // PDF origin is bottom-left; flip Y
    const fy = PANEL_FLOOR_Y + PANELS_H - f.y * figScaleY - FIG_SIZE;

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

  // ── Diagnosis text ────────────────────────────────────────────────────────
  const DIAG_Y  = PANEL_FLOOR_Y - 32;  // below panel with more space
  const DIAG_X  = PANELS_X + 60;       // shifted right
  const DIAG_W  = TOTAL_W;

  if (finalConclusion && finalConclusion.trim()) {
    const diagLines = finalConclusion.split('\n').flatMap(l =>
      wrapText(l || ' ', fontRegular, 10.5, DIAG_W)
    );
    let ty = DIAG_Y;
    for (const dl of diagLines) {
      if (ty < 36) break;
      page.drawText(dl, { x: DIAG_X, y: ty, font: fontRegular, size: 10.5, color: rgb(0.1, 0.1, 0.1) });
      ty -= 14;
    }
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  const FTR_Y     = 16;
  const FTR_SZ    = 7;
  const ICON_R    = 2.8;
  const ICON_GAP  = 4;
  const SEP       = '   |   ';
  const DARK      = rgb(0.25, 0.25, 0.25);
  const ICON_FILL = rgb(0.3, 0.3, 0.3);

  const ftrSegments = [
    userData.name         ? { icon: 'person', text: `Dr. ${userData.name}${userData.lastname ? ' ' + userData.lastname : ''}` } : null,
    userData.email        ? { icon: 'email',  text: userData.email } : null,
    userData.especialidad ? { icon: 'dot',    text: userData.especialidad } : null,
    userData.cedula       ? { icon: 'id',     text: `Céd. ${userData.cedula}` } : null,
  ].filter(Boolean);

  if (ftrSegments.length) {
    const SEP_W    = fontLight.widthOfTextAtSize(SEP, FTR_SZ);
    const iconSlot = ICON_R * 2 + ICON_GAP;
    let totalFtrW  = 0;
    for (let i = 0; i < ftrSegments.length; i++) {
      if (i > 0) totalFtrW += SEP_W;
      totalFtrW += iconSlot + fontLight.widthOfTextAtSize(ftrSegments[i].text, FTR_SZ);
    }
    let cx = (PW - totalFtrW) / 2;
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
        page.drawEllipse({ x: ix, y: iy + 2.2, xScale: 1.6, yScale: 1.6, color: ICON_FILL });
        page.drawEllipse({ x: ix, y: iy - 1.0, xScale: 2.6, yScale: 1.6, color: ICON_FILL });
      } else if (ic === 'email') {
        page.drawRectangle({ x: ix - 3.2, y: iy - 1.8, width: 6.4, height: 4,
          borderColor: ICON_FILL, borderWidth: 0.7, color: rgb(1,1,1) });
        page.drawLine({ start: { x: ix - 3.2, y: iy + 2.2 }, end: { x: ix, y: iy + 0.2 },
          thickness: 0.7, color: ICON_FILL });
        page.drawLine({ start: { x: ix, y: iy + 0.2 }, end: { x: ix + 3.2, y: iy + 2.2 },
          thickness: 0.7, color: ICON_FILL });
      } else if (ic === 'dot') {
        page.drawEllipse({ x: ix, y: iy, xScale: ICON_R - 0.4, yScale: ICON_R - 0.4, color: ICON_FILL });
      } else if (ic === 'id') {
        page.drawRectangle({ x: ix - 3.6, y: iy - 2.2, width: 7.2, height: 4.4,
          borderColor: ICON_FILL, borderWidth: 0.7, color: rgb(1,1,1) });
        page.drawLine({ start: { x: ix - 1.8, y: iy + 0.4 }, end: { x: ix + 1.8, y: iy + 0.4 },
          thickness: 0.6, color: ICON_FILL });
        page.drawLine({ start: { x: ix - 1.8, y: iy - 0.7 }, end: { x: ix + 0.9, y: iy - 0.7 },
          thickness: 0.6, color: ICON_FILL });
      }

      cx += iconSlot;
      page.drawText(ftrSegments[i].text, { x: cx, y: FTR_Y, font: fontLight, size: FTR_SZ, color: DARK });
      cx += fontLight.widthOfTextAtSize(ftrSegments[i].text, FTR_SZ);
    }
  }
}

// ── Page 2 ────────────────────────────────────────────────────────────────────

async function buildPage2(pdfDoc, {
  listaVisual, comentarioLista, imgListaBytes, plantillaId,
  fontRegular, fontBold,
}) {
  // Page 2 is also landscape (same dimensions as page 1)
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
  const TOP_Y    = hasPlantilla ? PH - 90 : PH - 75;
  const BOT_Y    = hasPlantilla ? 40 : 20;
  const MARGIN_L = 95;
  const MARGIN_R = 108;
  const CONTENT_W = PW - MARGIN_L - MARGIN_R;
  const COL_GAP    = 40;
  const COL_W      = (CONTENT_W - COL_GAP) / 2;
  const FONT_SZ    = 8.5;
  const LINE_H     = 13;
  const LX         = MARGIN_L;
  const RX         = LX + COL_W + COL_GAP;

  // Left col: Estudio
  let ly = TOP_Y - 16;
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
  let ry = TOP_Y - 16;
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

  // Tabla image: centered below both columns
  if (imgListaBytes) {
    const tablaImg = await embedImg(pdfDoc, imgListaBytes);
    if (tablaImg) {
      const { width: iw, height: ih } = tablaImg;
      const lowestCol  = Math.min(ly, ry);
      const tablaTopY  = lowestCol - 55;
      const maxH = Math.min(tablaTopY - BOT_Y - 10, 200);
      if (maxH > 30) {
        const scale = Math.min(CONTENT_W / iw, maxH / ih, 0.55);
        const dw = iw * scale;
        const dh = ih * scale;
        page.drawImage(tablaImg, {
          x: (PW - dw) / 2,
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
      postOv          = [],
      antOv           = [],
      crosses         = [],
      figuras         = [],
      listaVisual     = [],
      imgListaUrl     = null,
      comentarioLista = '',
      userData        = {},
      topLeftText     = '',
      plantillaId     = 'none',
      isSensitiva     = false,
      postBase        = null,
      antBase         = null,
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

    // ── Resolve base image paths ──────────────────────────────────────────────
    const useTransparent = plantillaId && plantillaId !== 'none';

    const postBasePath = postBase || (isSensitiva
      ? (useTransparent ? '/RadiculopatiaImg/Columna/BASE_POSTERIOR_TR.png' : '/RadiculopatiaImg/Columna/BASE_POSTERIOR.png')
      : (useTransparent ? '/RadiculopatiaImg/Multinivel/RA_Columna_1_FondoB_TR.png' : '/RadiculopatiaImg/Multinivel/RA_Columna_1_FondoB.png'));
    const antBasePath  = antBase  || (isSensitiva
      ? (useTransparent ? '/RadiculopatiaImg/Columna/BASE_ANTERIOR_TR.png' : '/RadiculopatiaImg/Columna/BASE_ANTERIOR.png')
      : (useTransparent ? '/RadiculopatiaImg/Multinivel/RA_Columna_2_FondoB_TR.png' : '/RadiculopatiaImg/Multinivel/RA_Columna_2_FondoB.png'));

    // ── Resolve overlays ──────────────────────────────────────────────────────
    const hasNewFlow = postOv.length > 0 || antOv.length > 0;
    const postOvList = hasNewFlow ? postOv : activeOv;
    const antOvList  = hasNewFlow ? antOv  : activeOv;

    // ── Resolve cross src ─────────────────────────────────────────────────────
    const crossesResolved = await Promise.all(
      crosses.map(async (c) => {
        if (!c.src) return c;
        let resolvedSrc = c.src;
        if (!c.src.startsWith('data:')) {
          const bytes = c.src.startsWith('http')
            ? await fetchBytes(c.src)
            : await fetchLocalBytes(c.src);
          if (bytes) {
            resolvedSrc = `data:image/png;base64,${Buffer.from(bytes).toString('base64')}`;
          }
        }
        return { ...c, src: resolvedSrc };
      })
    );

    // ── Fetch all image bytes in parallel ─────────────────────────────────────
    const [postBaseBytes, antBaseBytes, imgListaBytes, ...ovResults] = await Promise.all([
      fetchLocalBytes(postBasePath),
      fetchLocalBytes(antBasePath),
      fetchRemoteBytes(imgListaUrl),
      ...postOvList.filter(Boolean).map(p => fetchLocalBytes(p)),
      ...antOvList.filter(Boolean).map(p => fetchLocalBytes(p)),
    ]);

    const postOverlayBytes = ovResults.slice(0, postOvList.length);
    const antOverlayBytes  = ovResults.slice(postOvList.length);

    await buildPage1(pdfDoc, {
      finalConclusion, userData, topLeftText, plantillaId,
      postBaseBytes, antBaseBytes,
      postOverlayBytes, antOverlayBytes,
      crossesResolved, figurasData: figuras,
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
        'Content-Disposition': 'attachment; filename=reporte_radiculopatia.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF radiculopatia:', err);
    return NextResponse.json({ message: 'Error generando PDF: ' + err.message }, { status: 500 });
  }
}
