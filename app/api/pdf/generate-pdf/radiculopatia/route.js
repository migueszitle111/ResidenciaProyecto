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

// A4 landscape
const PW = 841.89;
const PH = 595.28;

const PLANTILLAS_PDF = {
  A: { p1: 'PLANTILLA_A_HORIZONTAL-1.pdf' },
  B: { p1: 'PLANTILLA_B_HORIZONTAL-1.pdf' },
  C: { p1: 'PLANTILLA_C_HORIZONTAL-1.pdf' },
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

// ── Main page builder ─────────────────────────────────────────────────────────

async function buildPage(pdfDoc, {
  finalConclusion, userData, topLeftText, plantillaId,
  postBaseBytes, antBaseBytes, postOverlayBytes, antOverlayBytes,
  crossesResolved, fontRegular, fontBold, fontLight,
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

  const MARGIN  = 20;
  const HDR_Y   = PH - 28;

  // Patient text (top-left)
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

  // ── Two portrait panels side by side ─────────────────────────────────────
  // Panel images are portrait (2550×3300) ratio = 2550/3300
  const IMG_RATIO  = 2550 / 3300;        // ~0.7727 (width/height)
  const PANELS_TOP = PH - 46;            // top of panels in pdf-lib coords (bottom-left origin)
  const PANELS_H   = PH - 46 - 60;      // height reserved for panels: ~489pt
  const PANEL_W    = Math.round(PANELS_H * IMG_RATIO);  // ~378pt per panel
  const TOTAL_W    = PANEL_W * 2;
  const PANELS_X   = (PW - TOTAL_W) / 2; // centered

  // pdf-lib origin is bottom-left, so panel bottom Y:
  const PANEL_FLOOR_Y = 60; // space for diagnosis + footer at bottom

  // Draw posterior panel (left)
  const postBase = await embedImg(pdfDoc, postBaseBytes);
  if (postBase) {
    page.drawImage(postBase, {
      x: PANELS_X, y: PANEL_FLOOR_Y,
      width: PANEL_W, height: PANELS_H,
    });
  }
  for (const ovBytes of postOverlayBytes) {
    const ovImg = await embedImg(pdfDoc, ovBytes);
    if (ovImg) {
      page.drawImage(ovImg, { x: PANELS_X, y: PANEL_FLOOR_Y, width: PANEL_W, height: PANELS_H });
    }
  }

  // Draw anterior panel (right)
  const antPanelX = PANELS_X + PANEL_W;
  const antBase = await embedImg(pdfDoc, antBaseBytes);
  if (antBase) {
    page.drawImage(antBase, {
      x: antPanelX, y: PANEL_FLOOR_Y,
      width: PANEL_W, height: PANELS_H,
    });
  }
  for (const ovBytes of antOverlayBytes) {
    const ovImg = await embedImg(pdfDoc, ovBytes);
    if (ovImg) {
      page.drawImage(ovImg, { x: antPanelX, y: PANEL_FLOOR_Y, width: PANEL_W, height: PANELS_H });
    }
  }

  // ── Crosses ───────────────────────────────────────────────────────────────
  const CROSS_SZ = 40;
  for (const c of (crossesResolved || [])) {
    if (!c.src) continue;
    const crossBytes = await fetchRemoteBytes(c.src);
    const crossImg   = await embedImg(pdfDoc, crossBytes, dataUrlMime(c.src));
    if (!crossImg) continue;

    // topPct/offPct are fractions relative to each panel
    const topPct = c.topPct || 0;
    const offPct = c.offPct || 0;

    if (c.side === 'L') {
      // posterior panel: offset from left edge
      const cx = PANELS_X + offPct * PANEL_W;
      // topPct from top of panel → in pdf-lib: bottom of cross
      const cy = PANEL_FLOOR_Y + PANELS_H - topPct * PANELS_H - CROSS_SZ;
      page.drawImage(crossImg, { x: cx, y: cy, width: CROSS_SZ, height: CROSS_SZ });
    } else {
      // anterior panel: offset from right edge
      const cx = antPanelX + PANEL_W - offPct * PANEL_W - CROSS_SZ;
      const cy = PANEL_FLOOR_Y + PANELS_H - topPct * PANELS_H - CROSS_SZ;
      page.drawImage(crossImg, { x: cx, y: cy, width: CROSS_SZ, height: CROSS_SZ });
    }
  }

  // ── Diagnosis text ────────────────────────────────────────────────────────
  const DIAG_Y  = PANEL_FLOOR_Y - 10;
  const DIAG_X  = PANELS_X;
  const DIAG_W  = TOTAL_W;

  if (finalConclusion && finalConclusion.trim()) {
    const diagLines = finalConclusion.split('\n').flatMap(l =>
      wrapText(l || ' ', fontRegular, 8, DIAG_W)
    );
    let ty = DIAG_Y;
    for (const dl of diagLines) {
      if (ty < 36) break;
      page.drawText(dl, { x: DIAG_X, y: ty, font: fontRegular, size: 8, color: rgb(0.1, 0.1, 0.1) });
      ty -= 11;
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
          // remote http or local public path
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
    const [postBaseBytes, antBaseBytes, ...ovResults] = await Promise.all([
      fetchLocalBytes(postBasePath),
      fetchLocalBytes(antBasePath),
      ...postOvList.filter(Boolean).map(p => fetchLocalBytes(p)),
      ...antOvList.filter(Boolean).map(p => fetchLocalBytes(p)),
    ]);

    const postOverlayBytes = ovResults.slice(0, postOvList.length);
    const antOverlayBytes  = ovResults.slice(postOvList.length);

    await buildPage(pdfDoc, {
      finalConclusion, userData, topLeftText, plantillaId,
      postBaseBytes, antBaseBytes,
      postOverlayBytes, antOverlayBytes,
      crossesResolved, fontRegular, fontBold, fontLight,
    });

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
