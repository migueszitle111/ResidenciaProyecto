// app/api/pdf/generate-pdf/neuropatia/route.js

import { NextResponse }  from 'next/server';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BACKEND_URL = 'https://backendmedxpro-tef2.onrender.com';

const PW = 595.28;
const PH = 841.89;

const ZONE_CONTENT_TOP = 728;
const ZONE_CONTENT_BOT = 185;
const MARGIN_L = 42;
const MARGIN_R = 42;
const CONTENT_W = PW - MARGIN_L - MARGIN_R;

// BP_Neuropatia_TR.png: 1582×2048
const LAM_IMG_RATIO = 2048 / 1582;

const OVERLAYS_NEURO_P = {
  // ── Nervios base ────────────────────────────────────────────────────────────
  'MedianoImg':           '/NeuropatiaImg/NOMediano.png',
  'MedianoFlz':           '/NeuropatiaImg/MedianoFlz.png',
  'MedianoFIqz':          '/NeuropatiaImg/FocalMIzq.png',
  'FocalIzq':             '/NeuropatiaImg/AxilFcIzq.png',
  'Axilar':               '/NeuropatiaImg/Axilar.png',
  'InteroseoA':           '/NeuropatiaImg/InteroseoAnterior.png',
  'MusculocutaneoImg':       '/NeuropatiaImg/Musculocutaneo.png',
  'Radial':               '/NeuropatiaImg/Radial.png',
  'Radial superficial':   '/NeuropatiaImg/RadialSuperficial.png',
  'Interóseo posterior':  '/NeuropatiaImg/InteroseoP.png',
  'Supraescapular':       '/NeuropatiaImg/Supraescapular.png',
  'Ulnar':                '/NeuropatiaImg/Ulnar.png',
  'Dorsal cutáneo':       '/NeuropatiaImg/DorsalCutaneo.png',
  'Toracodorsal':         '/NeuropatiaImg/Toracodorsal.png',
  'Torácicolargo':       '/NeuropatiaImg/ToracicoLargo.png',
  'AntebraquialCutaneo':  '/NeuropatiaImg/Antebraquial.png',
  'Antebraquiallat': '/NeuropatiaImg/Musculocutaneo.png',
  'Frenico':              '/NeuropatiaImg/Frenico.png',
  'Accesorio':            '/NeuropatiaImg/Accesorio.png',
  'Facial':               '/NeuropatiaImg/Facial.png',
  'GluteoInf':            '/NeuropatiaImg/GluteoSupIn.png',
  'GluteoSup':            '/NeuropatiaImg/GluteoMedio.png',
  'Femoral':              '/NeuropatiaImg/Femoral.png',
  'FemoralCtn':           '/NeuropatiaImg/Femorocutáneo.png',
  'Safeno':               '/NeuropatiaImg/Safeno.png',
  'Obturador':            '/NeuropatiaImg/Obturador.png',
  'Peroneo':              '/NeuropatiaImg/Peroneo.png',
  'PeroneoS':             '/NeuropatiaImg/PeroneoSu.png',
  'PeroneoP':             '/NeuropatiaImg/PeroneoPr.png',
  'Tibial':               '/NeuropatiaImg/Tibial.png',
  'Sural':                '/NeuropatiaImg/Sural.png',
  'PlantarMe':            '/NeuropatiaImg/PlantarMe.png',
  'PlantarLa':            '/NeuropatiaImg/PlantarLa.png',
  'Ilioiguinal':          '/NeuropatiaImg/Ilioinguinal.png',
  'Ciatico':              '/NeuropatiaImg/Ciatico.png',
  'Pudendo':              '/NeuropatiaImg/Pudendo.png',
  // ── Overlays adicionales (base) ─────────────────────────────────────────────
  'Mediano1':              '/assets/NeuropatiaImg/NO_1_Mediano.png',
  'InteroseoAnterior':    '/assets/NeuropatiaImg/NO_Interoseo Anterior.png',
  'AccesorioBase':        '/assets/NeuropatiaImg/NO_Accesorio.png',
  //'AntebraquialCutaneo':  '/assets/NeuropatiaImg/NO_Antebraquial.png',
  'AxilarBase':           '/assets/NeuropatiaImg/NO_Axilar.png',
  'Musculocutaneo':   '/assets/NeuropatiaImg/NO_Musculocutaneo.png',
  'RadialSuperficial':    '/assets/NeuropatiaImg/NO_Radial Superficial.png',
  'InteroseoPosterior':   '/assets/NeuropatiaImg/NO_Interoseo Posterior.png',
  'RadialBase':           '/assets/NeuropatiaImg/NO_Radial.png',
  'SupraescapularBase':   '/assets/NeuropatiaImg/NO_Supraescapular - Subescapular.png',
  'UlnarBase':            '/assets/NeuropatiaImg/NO_Ulnar.png',
  'DorsalCut':        '/assets/NeuropatiaImg/NO_Dorsal Cutaneo.png',
  'FacialBase':           '/assets/NeuropatiaImg/NO_Facial.png',
  'FrenicoBase':          '/assets/NeuropatiaImg/NO_Frenico.png',
  'ToracicoLar':        '/assets/NeuropatiaImg/NO_Toracico_largo.png',
  'ToracodorsalBase':     '/assets/NeuropatiaImg/NO_Toracodorsal.png',
  'CiaticoBase':          '/assets/NeuropatiaImg/NO_Ciatico.png',
  'GluteoMedio':          '/assets/NeuropatiaImg/NO_Gluteo Medio.png',
  'GluteoInferior':       '/assets/NeuropatiaImg/NO_Gluteo Sup.Inf FC.png',
  'FemoralBase':          '/assets/NeuropatiaImg/NO_Femoral.png',
  'SafenoBase':           '/assets/NeuropatiaImg/NO_Safeno.png',
  'FemorocutaneoLateral': '/assets/NeuropatiaImg/NO_Femorocutáneo femoral.png',
  'Iilioinguinal':        '/assets/NeuropatiaImg/NO_Ilioinguinal-genitofemoral.png',
  'ObturadorBase':        '/assets/NeuropatiaImg/NO_Obturador.png',
  'NervioPer':        '/assets/NeuropatiaImg/NO_Peroneo.png',
  'PeroneoSuperficial':   '/assets/NeuropatiaImg/NO_Peroneo Superficial.png',
  'PeroneoProfundo':      '/assets/NeuropatiaImg/NO_Peroneo Profundo.png',
  'TibialBase':           '/assets/NeuropatiaImg/NO_Tibial.png',
  'SuralBase':            '/assets/NeuropatiaImg/NO_Sural.png',
  'PlantarMedial':        '/assets/NeuropatiaImg/NO_Plantar Medial.png',
  'PlantarLateral':       '/assets/NeuropatiaImg/NO_Plantar Lateral.png',
  'PudendoBase':          '/assets/NeuropatiaImg/NO_Pudendo.png',
  // ── Lado izquierdo / derecho ─────────────────────────────────────────────
  'MedIzquierda':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
  'MedDerecha':           '/assets/NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
  'IntAntDegene':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
  'IntPostDegene':        '/assets/NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
  // DERECHA
  'AccesorioDerge':       '/assets/NeuropatiaImg/NervioRojo/DERECHA/Accesorio.png',
  'AnteLateDerge':        '/assets/NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
  'AnteBraqDerge':        '/assets/NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
  'AxilaDerge':           '/assets/NeuropatiaImg/NervioRojo/DERECHA/Axilar.png',
  'CiaticoDerge':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Ciatico.png',
  'FacialDerge':          '/assets/NeuropatiaImg/NervioRojo/DERECHA/Facial.png',
  'FemoralDerge':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Femoral.png',
  'FemorocutaneoDerge':   '/assets/NeuropatiaImg/NervioRojo/DERECHA/Femorocutáneo lateral.png',
  'FrenicoDerge':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Frenico.png',
  'IlioinguinalDerge':    '/assets/NeuropatiaImg/NervioRojo/DERECHA/GF-ILIO.png',
  'MedianoDerge':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
  'MusculocutaneoDerge':  '/assets/NeuropatiaImg/NervioRojo/DERECHA/Musculocutaneo.png',
  'ObturadorDerge':       '/assets/NeuropatiaImg/NervioRojo/DERECHA/Obturador.png',
  'PeroneoDerge':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Peroneo.png',
  'PudendoDerge':         '/assets/NeuropatiaImg/NervioRojo/DERECHA/Pudendo.png',
  'RadialDerge':          '/assets/NeuropatiaImg/NervioRojo/DERECHA/Radial.png',
  'SupraescapularDerge':  '/assets/NeuropatiaImg/NervioRojo/DERECHA/Supraescapular.png',
  'TibialDerge':          '/assets/NeuropatiaImg/NervioRojo/DERECHA/Tibial.png',
  'ToracicoDerge':        '/assets/NeuropatiaImg/NervioRojo/DERECHA/Toracico largo.png',
  'ToracodorsalDerge':    '/assets/NeuropatiaImg/NervioRojo/DERECHA/Toracodorsal.png',
  'UlnarDerge':           '/assets/NeuropatiaImg/NervioRojo/DERECHA/Ulnar.png',
  // IZQUIERDA
  'MedianoIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
  'AccesorioIzqge':       '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Accesorio.png',
  'AnteLateIzqge':        '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
  'AnteMedIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
  'AxilaIzqge':           '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Axilar.png',
  'CiaticoIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Ciatico.png',
  'FacialIzqge':          '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Facial.png',
  'FemoralIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Femoral.png',
  'FemorocutaneoIzqge':   '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Femorocutáneo lateral.png',
  'FrenicoIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Frenico.png',
  'IlioinguinalIzqge':    '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/GF-ILIO.png',
  'MusculocutaneoIzqge':  '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Musculocutaneo.png',
  'ObturadorIzqge':       '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Obturador.png',
  'PeroneoIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Peroneo.png',
  'PudendoIzqge':         '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Pudendo.png',
  'RadialIzqge':          '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Radial.png',
  'SupraescapularIzqge':  '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Supraescapular.png',
  'TibialIzqge':          '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Tibial.png',
  'ToracicoIzqge':        '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Toracico largo.png',
  'ToracodorsalIzqge':    '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Toracodorsal.png',
  'UlnarIzqge':           '/assets/NeuropatiaImg/NervioRojo/IZQUIERDA/Ulnar.png',
  // BILATERAL COMPLETO
  'MedianoCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Anterior(1).png',
  'AccesorioCompgen':          '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Accesorio.png',
  'AnteLatelCompgen':          '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
  'AnteMedCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
  'AxilaCompgen':              '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Axilar.png',
  'CiaticoCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Ciatico.png',
  'FacialCompgen':             '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Facial.png',
  'FemoralCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Femoral.png',
  'FemorocutaneoCompgen':      '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Femorocutáneo lateral.png',
  'FrenicoCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Frenico.png',
  'IlioinguinalCompgen':       '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_GF-ILIO.png',
  'MusculocutaneoCompgen':     '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Musculocutaneo.png',
  'ObturadorCompgen':          '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Obturador.png',
  'PeroneoCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo.png',
  'PudendoCompgen':            '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Pudendo.png',
  'RadialCompgen':             '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial.png',
  'RadialSupCompgen':          '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
  'InteroseoPosteriorCompgen': '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Posterior (1).png',
  'SafenoCompgen':             '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Safeno(1).png',
  'SupraescapularCompgen':     '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Supraescapular.png',
  'TibialCompgen':             '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Tibial.png',
  'SuralCompgen':              '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Sural-(1).png',
  'PlantarMedCompgen':         '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Medial(1).png',
  'PlantarLatCompgen':         '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Lateral(1).png',
  'PeroneoSupCompgen':         '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Superficial (1).png',
  'PeroneoProfCompgen':        '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Profundo (1).png',
  'GluteoInfCompgen':          '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Sup.Inf (1).png',
  'GluteoMedCompgen':          '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Medio (1).png',
  'ToracodorsalCompgen':       '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracodorsal.png',
  'UlnarCompgen':              '/assets/NeuropatiaImg/NervioRojo/COMPLETO/NO_Ulnar.png',
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

// Convierte texto a minúsculas con reglas gramaticales (misma lógica que el frontend)
function sentenceCase(text) {
  if (!text) return '';
  let r = text.toLowerCase();
  r = r.replace(/^([a-záéíóúüñ])/i, ch => ch.toUpperCase());
  r = r.replace(/([.!?]['"»]?\s+)([a-záéíóúüñ])/gi, (_, p, l) => p + l.toUpperCase());
  r = r.replace(/(\n\s*)([a-záéíóúüñ])/gi, (_, nl, l) => nl + l.toUpperCase());
  r = r.replace(/\b([ctls])(\d+)\b/g, (_, letter, num) => letter.toUpperCase() + num);
  return r;
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
  for (const w of words) {
    page.drawText(w, { x: cx, y, font, size: fontSize, color });
    cx += font.widthOfTextAtSize(w, fontSize) + gap;
  }
}

// ── Page 1 ───────────────────────────────────────────────────────────────────

async function buildPage1(pdfDoc, {
  finalConclusion, userData, baseImgBytes, overlayBytesArr, figurasData,
  laminaSize, topLeftText, plantillaId, fontRegular, fontBold, fontLight, dotOverlays,
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

  // ── figuras ─────────────────────────────────────────────────────────────────
  // Figures are positioned inside a sub-zone offset by (offsetX, offsetY) px
  // within a screen canvas of (imgW x imgH). Scale maps screen→PDF lámina.
  const IMG_W  = 600;
  const IMG_H  = Math.round(600 * (3301 / 2551)); // ≈ 776px — real rendered height
  const scaleX = LAM_W / IMG_W;
  const scaleY = LAM_H / IMG_H;
  const OX     = (laminaSize?.offsetX ?? 10) * scaleX; // offset left:10
  const OY     = (laminaSize?.offsetY ?? 20) * scaleY; // offset top:20

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

    // f.x/f.y are relative to the sub-zone; add OX/OY to get lámina-relative position.
    // PDF y-axis is inverted: y=0 is bottom, so subtract from top + OY offset.
    const fx = LAM_X + OX + f.x * scaleX + (boxW - fw) / 2;
    const fy = LAM_Y + LAM_H - OY - f.y * scaleY - boxH + (boxH - fh) / 2;

    const rot = f.rotation ?? 0;
    const pdfRot = -rot;
    let drawX = fx, drawY = fy;
    if (pdfRot !== 0) {
      const rad = (pdfRot * Math.PI) / 180;
      const cx = fx + fw / 2, cy = fy + fh / 2;
      drawX = cx - (fw / 2) * Math.cos(rad) + (fh / 2) * Math.sin(rad);
      drawY = cy - (fw / 2) * Math.sin(rad) - (fh / 2) * Math.cos(rad);
    }
    page.drawImage(figImg, { x: drawX, y: drawY, width: fw, height: fh, rotate: degrees(pdfRot) });

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

  // ── dot overlays ─────────────────────────────────────────────────────────────
  for (const d of (dotOverlays || [])) {
    const px = LAM_X + d.xPct * LAM_W;
    const py = LAM_Y + (1 - d.yPct) * LAM_H;
    if (d.shape === 'bar') {
      // Zigzag que replica el polyline de SegmentariaButton, con la rotación original
      const deg     = ((d.rotation !== undefined ? d.rotation : 80) * Math.PI) / 180;
      const H_pdf   = 14;
      const amp_pdf = 3.5;
      const steps   = 6;
      const stepH   = H_pdf / steps;
      const topY    = py + H_pdf / 2;
      // Rotación horaria (misma convención que el bar original: dirección (sin,cos))
      const rot = (x, y) => ({
        x: px + (x - px) * Math.cos(deg) + (y - py) * Math.sin(deg),
        y: py - (x - px) * Math.sin(deg) + (y - py) * Math.cos(deg),
      });
      for (let i = 0; i < steps; i++) {
        const p1 = rot(px + (i % 2 === 0 ?  amp_pdf / 2 : -amp_pdf / 2), topY - i * stepH);
        const p2 = rot(px + (i % 2 === 0 ? -amp_pdf / 2 :  amp_pdf / 2), topY - (i + 1) * stepH);
        page.drawLine({ start: p1, end: p2, thickness: 1.5, color: rgb(1, 0, 0) });
      }
    } else {
      page.drawEllipse({ x: px, y: py, xScale: 3.5, yScale: 3.5, color: rgb(1.0, 0.35, 0.05) });
    }
  }

  // ── diagnóstico ──────────────────────────────────────────────────────────────
  const FTR_Y      = 48;
  const FTR_SZ     = 7.5;
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

  // ── footer ───────────────────────────────────────────────────────────────────
  const ICON_R    = 3.2;
  const ICON_GAP  = 4;
  const SEP       = '   |   ';
  const DARK      = rgb(0.22, 0.22, 0.22);
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
  const TOP_Y      = hasPlantilla ? ZONE_CONTENT_TOP : PH - 50;
  const BOT_Y      = hasPlantilla ? ZONE_CONTENT_BOT : 40;
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
    const keyStr = `${sentenceCase(k)}: `;
    const keyW   = fontBold.widthOfTextAtSize(keyStr, FONT_SZ);
    page.drawText(keyStr, { x: LX, y: ly, font: fontBold, size: FONT_SZ, color: rgb(0.08,0.08,0.08) });
    const valLines = wrapText(sentenceCase(v), fontRegular, FONT_SZ, COL_W - keyW);
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
    for (let ci = 0; ci < cLines.length; ci++) {
      if (ry < BOT_Y) break;
      justifyLine(page, cLines[ci], ci === cLines.length - 1, RX, ry, fontRegular, FONT_SZ, COL_W, rgb(0.08,0.08,0.08));
      ry -= LINE_H;
    }
  }

  if (imgListaBytes) {
    const tablaImg = await embedImg(pdfDoc, imgListaBytes);
    if (tablaImg) {
      const { width: iw, height: ih } = tablaImg;
      const maxW      = CONTENT_W;
      const lowestCol = Math.min(ly, ry);
      const tablaTopY = lowestCol - 200;
      const maxH      = Math.min(tablaTopY - BOT_Y - 10, 320);
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
      dotOverlays     = [],
      laminaSize      = { w: 690, h: 620 },
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
      .map(key => OVERLAYS_NEURO_P[key])
      .filter(Boolean)
      .filter((p, i, arr) => arr.indexOf(p) === i);

    const [baseImgBytes, imgListaBytes, ...overlayBytesArr] = await Promise.all([
      fetchLocalBytes('/NeuropatiaImg/BP_Neuropatia_TR.png'),
      fetchRemoteBytes(imgListaUrl),
      ...ovPaths.map(p => fetchLocalBytes(p)),
    ]);

    await buildPage1(pdfDoc, {
      finalConclusion, userData, baseImgBytes, overlayBytesArr,
      figurasData: figuras, laminaSize, topLeftText, plantillaId,
      fontRegular, fontBold, fontLight, dotOverlays,
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
        'Content-Disposition': 'attachment; filename=reporte_neuropatia.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF neuropatia:', err);
    return NextResponse.json({ message: 'Error generando PDF: ' + err.message }, { status: 500 });
  }
}

