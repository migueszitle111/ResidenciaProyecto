// Generador de PDF de Monitoreo para Web
// Puerto exacto de pdfMonitoreoGenerator.ts de la app React Native
// Usa: pdf-lib + @pdf-lib/fontkit, fuentes Quando + WorkSans, plantilla IOM

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

// Todos los recursos del backend se piden a través del proxy Next.js /api/monitoreopdf
// para evitar CORS (el fetch se hace server-side o con same-origin).
const PROXY_BASE = typeof window !== 'undefined' ? window.location.origin : '';
const PDF_PROXY  = `${PROXY_BASE}/api/monitoreopdf`;

// Fallback directo solo para el logo del doctor (imageUrl de Supabase — no tiene CORS)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backendmedxpro-tef2.onrender.com';

// ─── Constantes de diseño (idénticas al TS) ─────────────────────────────────

const PDF_CONFIG = {
  pageMargin: 50,
  header: {
    titleY: 662,
    titleSize: 20,
    nameY: 562,
    nameSize: 20,
  },
  body: {
    startY: 490,
    leftColumnX: 80,
    rightColumnX: 320,
    labelSize: 12,
    valueSize: 12,
    lineHeight: 50,
    columnWidth: 180,
  },
};

const MARGIN_BOTTOM = 120;
const MARGIN_BOTTOM_SECTION = 130;
const MARGIN_BOTTOM_TITLE = 150;

// ─── Utilidades ──────────────────────────────────────────────────────────────

function sanitizeText(text) {
  return String(text || '')
    .replace(/[\uFFFC\uFFFD]/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim();
}

function toSingleLine(text) {
  return sanitizeText(text).replace(/\r\n|\r|\n/g, ' ').replace(/ {2,}/g, ' ').trim();
}

function sanitizeData(value) {
  // No tocar data URLs (imágenes base64) ni URLs normales — solo sanitizar texto humano
  if (typeof value === 'string') {
    if (value.startsWith('data:') || value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) return value;
    return sanitizeText(value);
  }
  if (Array.isArray(value)) return value.map(sanitizeData);
  if (value !== null && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) result[key] = sanitizeData(value[key]);
    return result;
  }
  return value;
}

function wrapText(text, maxWidth, font, fontSize) {
  const words = String(text).replace(/\r\n|\r|\n/g, ' ').split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const wordWidth = font.widthOfTextAtSize(word, fontSize);
    if (wordWidth > maxWidth) {
      if (currentLine) { lines.push(currentLine); currentLine = ''; }
      let remaining = word;
      while (remaining.length > 0) {
        let chunk = '';
        for (let i = 0; i < remaining.length; i++) {
          const test = chunk + remaining[i];
          if (font.widthOfTextAtSize(test, fontSize) > maxWidth) {
            if (chunk) { lines.push(chunk); remaining = remaining.substring(i); break; }
            else { lines.push(remaining[i]); remaining = remaining.substring(i + 1); break; }
          } else {
            chunk = test;
          }
        }
        if (chunk && chunk === remaining) { currentLine = chunk; break; }
      }
    } else {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function drawJustifiedText(page, lines, x, yPos, maxWidth, font, fontSize, lineHeight) {
  let currentY = yPos;
  lines.forEach((line, index) => {
    const isLastLine = index === lines.length - 1;
    if (isLastLine) {
      page.drawText(line, { x, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });
    } else {
      const words = line.split(' ');
      if (words.length === 1) {
        page.drawText(line, { x, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });
      } else {
        const textWithoutSpaces = words.join('');
        const textWidth = font.widthOfTextAtSize(textWithoutSpaces, fontSize);
        const totalSpaceWidth = maxWidth - textWidth;
        const spaceWidth = totalSpaceWidth / (words.length - 1);
        let currentX = x;
        words.forEach((word) => {
          page.drawText(word, { x: currentX, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });
          currentX += font.widthOfTextAtSize(word, fontSize) + spaceWidth;
        });
      }
    }
    currentY -= lineHeight;
  });
  return currentY;
}

async function fetchOptional(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch { return null; }
}

async function fetchRequired(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return new Uint8Array(await res.arrayBuffer());
}

// Convierte dataURL o URL a bytes
async function loadImageBytes(src) {
  if (!src) return null;
  try {
    if (src.startsWith('data:')) {
      const base64 = src.split(',')[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return bytes;
    }
    return await fetchOptional(src);
  } catch { return null; }
}

// Intenta embedder como PNG luego como JPG
async function embedImage(pdfDoc, bytes) {
  try { return await pdfDoc.embedPng(bytes); } catch { /* intentar jpg */ }
  try { return await pdfDoc.embedJpg(bytes); } catch { return null; }
}

// ─── Carga de fuentes ────────────────────────────────────────────────────────

async function loadCustomFonts(pdfDoc) {
  pdfDoc.registerFontkit(fontkit);

  // Origen absoluto para que el fetch funcione en cliente
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  // Igual que la app móvil: Quando + WorkSans-Regular + WorkSans-Light
  const quandoBytes       = await fetchOptional(`${origin}/fonts/Quando-Regular.ttf`);
  const workSansBytes     = await fetchOptional(`${origin}/fonts/WorkSans-Regular.ttf`);
  const workSansLightBytes = await fetchOptional(`${origin}/fonts/WorkSans-Light.ttf`);

  let quando, workSans, workSansLight;

  try {
    quando = quandoBytes
      ? await pdfDoc.embedFont(quandoBytes)
      : await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  } catch {
    quando = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  try {
    workSans = workSansBytes
      ? await pdfDoc.embedFont(workSansBytes)
      : await pdfDoc.embedFont(StandardFonts.Helvetica);
  } catch {
    workSans = await pdfDoc.embedFont(StandardFonts.Helvetica);
  }

  try {
    workSansLight = workSansLightBytes
      ? await pdfDoc.embedFont(workSansLightBytes)
      : workSans;
  } catch {
    workSansLight = workSans;
  }

  return { quando, workSans, workSansLight };
}

// ─── Plantilla ───────────────────────────────────────────────────────────────

let _plantillaBytesCache = null;

async function getPlantillaBytes() {
  if (_plantillaBytesCache) return _plantillaBytesCache;
  // Usar proxy para evitar CORS
  _plantillaBytesCache = await fetchOptional(`${PDF_PROXY}?plantilla=Plantilla_IOM.pdf`);
  return _plantillaBytesCache;
}

async function aplicarPlantillaFondo(pdfDoc, usarPlantilla) {
  if (usarPlantilla) {
    try {
      const tplBytes = await getPlantillaBytes();
      if (tplBytes) {
        const tplDoc = await PDFDocument.load(tplBytes);
        const [copy] = await pdfDoc.copyPages(tplDoc, [0]);
        return pdfDoc.addPage(copy);
      }
    } catch { /* fallback */ }
  }
  return pdfDoc.addPage([595, 842]);
}

// ─── Grid de imágenes 2x2 (idéntico al TS) ──────────────────────────────────

async function renderImagenesEnGrid(imagenes, currentPage, pdfDoc, usarPlantilla, yPos, width, height) {
  if (!imagenes || imagenes.length === 0) return { page: currentPage, yPos };

  const imgWidth = 191;
  const imgHeight = 142;
  const espacioHorizontal = 20;
  const espacioVertical = 15;
  const margenInferior = 100;

  let page = currentPage;
  let currentY = yPos - 15;

  function calcDims(naturalW, naturalH, maxW, maxH) {
    const scale = Math.min(maxW / naturalW, maxH / naturalH);
    const drawW = naturalW * scale;
    const drawH = naturalH * scale;
    return { drawW, drawH, offsetX: (maxW - drawW) / 2, offsetY: (maxH - drawH) / 2 };
  }

  // Solo 1 imagen — centrada
  if (imagenes.length === 1) {
    if (currentY - imgHeight < margenInferior) {
      page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
      currentY = height - 80;
    }
    const bytes = await loadImageBytes(imagenes[0]);
    if (bytes) {
      const img = await embedImage(pdfDoc, bytes);
      if (img) {
        const { drawW, drawH, offsetX, offsetY } = calcDims(img.width, img.height, imgWidth, imgHeight);
        const imgX = (width - imgWidth) / 2 + offsetX;
        page.drawImage(img, { x: imgX, y: currentY - imgHeight + offsetY, width: drawW, height: drawH });
      }
    }
    currentY -= imgHeight + espacioVertical;
    return { page, yPos: currentY };
  }

  // 2+ imágenes — grid 2x2
  const totalWidth = (imgWidth * 2) + espacioHorizontal;
  const startX = (width - totalWidth) / 2;
  const col1X = startX;
  const col2X = startX + imgWidth + espacioHorizontal;

  for (let i = 0; i < imagenes.length; i += 2) {
    if (currentY - imgHeight < margenInferior) {
      page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
      currentY = height - 80;
    }

    // Imagen 1 (columna izquierda)
    const bytes1 = await loadImageBytes(imagenes[i]);
    if (bytes1) {
      const img1 = await embedImage(pdfDoc, bytes1);
      if (img1) {
        const { drawW, drawH, offsetX, offsetY } = calcDims(img1.width, img1.height, imgWidth, imgHeight);
        page.drawImage(img1, { x: col1X + offsetX, y: currentY - imgHeight + offsetY, width: drawW, height: drawH });
      }
    }

    // Imagen 2 (columna derecha)
    if (i + 1 < imagenes.length) {
      const bytes2 = await loadImageBytes(imagenes[i + 1]);
      if (bytes2) {
        const img2 = await embedImage(pdfDoc, bytes2);
        if (img2) {
          const { drawW, drawH, offsetX, offsetY } = calcDims(img2.width, img2.height, imgWidth, imgHeight);
          page.drawImage(img2, { x: col2X + offsetX, y: currentY - imgHeight + offsetY, width: drawW, height: drawH });
        }
      }
    }

    currentY -= imgHeight + espacioVertical;
  }

  return { page, yPos: currentY };
}

// ─── Página 1: Información General ──────────────────────────────────────────

async function crearPaginaInformacionGeneral(pdfDoc, data, usarPlantilla, fonts) {
  let page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
  const { quando, workSansLight } = fonts;
  const { width, height } = page.getSize();

  // Fecha en la parte superior
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const partes = (data.fecha || '').split('/');
  let fechaTexto = data.fecha || '';
  if (partes.length === 3) {
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const anio = partes[2];
    if (!isNaN(dia) && mes >= 1 && mes <= 12) fechaTexto = `${dia} de ${meses[mes - 1]} de ${anio}`;
  }
  const fechaW = workSansLight.widthOfTextAtSize(fechaTexto, 9);
  page.drawText(fechaTexto, {
    x: width / 2 - fechaW / 2, y: height - 25,
    size: 9, font: workSansLight, color: rgb(0.4, 0.4, 0.4),
  });

  // Título principal centrado
  const titulo = 'Reporte de Neuromonitoreo Intraoperatorio';
  const tituloW = quando.widthOfTextAtSize(titulo, PDF_CONFIG.header.titleSize);
  page.drawText(titulo, {
    x: width / 2 - tituloW / 2, y: PDF_CONFIG.header.titleY,
    size: PDF_CONFIG.header.titleSize, font: quando, color: rgb(0, 0, 0),
  });

  // Nombre del paciente centrado
  const nombrePaciente = toSingleLine(data.nombrePaciente || '');
  const nombreW = workSansLight.widthOfTextAtSize(nombrePaciente, PDF_CONFIG.header.nameSize);
  page.drawText(nombrePaciente, {
    x: width / 2 - nombreW / 2, y: PDF_CONFIG.header.nameY,
    size: PDF_CONFIG.header.nameSize, font: workSansLight, color: rgb(0, 0, 0),
  });

  // Cuatro líneas de info en dos columnas
  const lineas = [
    { left: { label: 'Edad:', value: `${data.edad || ''} años` },         right: { label: 'Diagnóstico:', value: data.diagnostico || '' } },
    { left: { label: 'Cirujano:', value: data.cirujano || '' },           right: { label: 'Tipo de cirugía:', value: data.tipoCirugia || '' } },
    { left: { label: 'Hospital:', value: data.hospital || '' },           right: { label: 'Aseguranza:', value: data.aseguranza || '' } },
    { left: { label: 'Neurofisiólogo:', value: `Dr. ${data.neurofisiologo || ''}` }, right: { label: 'Equipo:', value: data.equipo || '' } },
  ];

  let currentY = PDF_CONFIG.body.startY;
  const lineStartX = 90;
  const lineEndX = width - 90;
  const minYBeforeInsumos = 30;

  for (const linea of lineas) {
    if (currentY < minYBeforeInsumos + 60) {
      page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
      currentY = height - 80;
    }

    const leftLabelX = PDF_CONFIG.body.leftColumnX;
    let maxLeftHeight = 0;
    if (linea.left.label) {
      page.drawText(linea.left.label, { x: leftLabelX, y: currentY, size: PDF_CONFIG.body.labelSize, font: workSansLight, color: rgb(0, 0, 0) });
      const leftLabelW = workSansLight.widthOfTextAtSize(linea.left.label, PDF_CONFIG.body.labelSize);
      const leftValueX = leftLabelX + leftLabelW + 5;
      const leftMaxWidth = PDF_CONFIG.body.rightColumnX - leftValueX - 20;
      const leftLines = wrapText(linea.left.value, leftMaxWidth, workSansLight, PDF_CONFIG.body.valueSize);
      let leftY = currentY;
      for (const l of leftLines) {
        page.drawText(l, { x: leftValueX, y: leftY, size: PDF_CONFIG.body.valueSize, font: workSansLight, color: rgb(0, 0, 0) });
        leftY -= 12;
      }
      maxLeftHeight = leftLines.length * 12;
    }

    const rightLabelX = PDF_CONFIG.body.rightColumnX;
    let maxRightHeight = 0;
    if (linea.right.label) {
      page.drawText(linea.right.label, { x: rightLabelX, y: currentY, size: PDF_CONFIG.body.labelSize, font: workSansLight, color: rgb(0, 0, 0) });
      const rightLabelW = workSansLight.widthOfTextAtSize(linea.right.label, PDF_CONFIG.body.labelSize);
      const rightValueX = rightLabelX + rightLabelW + 5;
      const rightMaxWidth = (width - PDF_CONFIG.pageMargin) - rightValueX;
      const rightLines = wrapText(linea.right.value, rightMaxWidth, workSansLight, PDF_CONFIG.body.valueSize);
      let rightY = currentY;
      for (const l of rightLines) {
        page.drawText(l, { x: rightValueX, y: rightY, size: PDF_CONFIG.body.valueSize, font: workSansLight, color: rgb(0, 0, 0) });
        rightY -= 12;
      }
      maxRightHeight = rightLines.length * 12;
    }

    const maxHeight = Math.max(maxLeftHeight, maxRightHeight, 15);
    currentY -= maxHeight;

    page.drawLine({
      start: { x: lineStartX, y: currentY - 5 },
      end: { x: lineEndX, y: currentY - 5 },
      thickness: 0.5, color: rgb(0, 0, 0),
    });
    currentY -= (PDF_CONFIG.body.lineHeight - maxHeight);
  }

  // Insumos
  currentY -= 10;
  if (currentY < 30) {
    page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
    currentY = height - 80;
  }

  const insumosLabel = 'Insumos:';
  const insumosLabelW = workSansLight.widthOfTextAtSize(insumosLabel, PDF_CONFIG.body.labelSize);
  page.drawText(insumosLabel, {
    x: width / 2 - insumosLabelW / 2, y: currentY,
    size: PDF_CONFIG.body.labelSize, font: workSansLight, color: rgb(0, 0, 0),
  });
  currentY -= 20;

  const insumosLeftMargin = 90;
  const insumosRightMargin = 90;
  const insumosMaxWidth = width - insumosLeftMargin - insumosRightMargin;
  const insumosLineHeight = 14;
  const margenInferiorInsumos = 40;

  let currentInsumosPage = page;
  const insumosLineasOriginales = (data.insumos || '').split('\n').filter(l => l.trim());
  for (let lineaOriginal of insumosLineasOriginales) {
    lineaOriginal = lineaOriginal.trim();
    if (!lineaOriginal) continue;
    const wrappedLines = wrapText(lineaOriginal, insumosMaxWidth, workSansLight, PDF_CONFIG.body.valueSize);
    for (const l of wrappedLines) {
      if (currentY - insumosLineHeight < margenInferiorInsumos) {
        currentInsumosPage = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
        currentY = height - 80;
      }
      currentInsumosPage.drawText(l, {
        x: insumosLeftMargin, y: currentY,
        size: PDF_CONFIG.body.valueSize, font: workSansLight, color: rgb(0, 0, 0),
      });
      currentY -= insumosLineHeight;
    }
  }
}

// ─── PDFs adicionales del backend (protocolo/procedimiento/modalidades) ───────

const nombresSinEspacios = {
  'Artroplastía Cervical': 'ARTROPLASTÍACERVICAL',
  'Disectomía Cervical Anterior 2-3 Niveles': 'DISECTOMÍACERVICALANTERIOR2-3niveles',
  'Disectomía Cervical Anterior': 'DISECTOMÍACERVICALANTERIOR',
  'Instrumentación Cervical Posterior': 'INSTRUMENTACIÓNCERVICALPOSTERIOR',
  'Laminectomía + Foraminotomía Cervical': 'LAMINECTOMIA+FORAMINOTOMIACERVICAL',
  'Corpectomía Cervical Anterior': 'CORPECTOMIACERVICALANTERIOR',
  'Endoscopía Cervical Posterior': 'ENDOSCOPIACERVICALPOSTERIOR',
  'Descompresión de la Unión Cráneo Cervical': 'DESCOMPRESIÓNDELAUNIÓNCRÁNEOCERVICAL',
  'ALIF - Fusión Lumbar Intersomática Anterior': 'ALIF-FusiónlumbarIntersonamticaAnterior',
  'Descompresión Lumbar Mínimamente Invasiva': 'DESCOMPRESIÓNLUMBARMÍNIMAMENTEINVASIVA',
  'Instrumentación Lumbar': 'INSTRUMENTACIÓNLUMBAR',
  'Instrumentación Percutánea Lumbar': 'INSTRUMENTACIÓNPERCUTÁNEALUMBAR',
  'Laminectomía + Foraminotomía Lumbar': 'LAMINECTOMÍA+FORAMINOTOMÍALUMBAR',
  'LLIF - Fusión Lumbar Intersomática Lateral': 'LLIF-FusiónlumbarintersomáticaLateral',
  'PLIF - Fusión Lumbar Intersomática Posterior': 'PLIF-FusiónlumbarIntersomáticaposterior',
  'Liberación Microquirúrgica de Medula Anclada': 'LIBERACIÓNMICROQUIRÚRGICADEMEDULAANCLADA',
  'Resección de Meningioma Craneal': 'RESECCIÓNDEMENINGIOMACRANEAL',
  'Resección de Meningioma Fosa Posterior Tentorial': 'RESECCIÓNDEMENINGIOMAFOSAPOSTERIORTENTORIAL',
  'Resección de Schwanoma Vestibular (Neurinoma del Acústico)': 'RESECCIÓNDESCHANOMAVESTIBULAR(NEURINOMADELACÚSTICO)',
  'Resección Endonasal de Adenoma Hipofisiario': 'RESECCIÓNENDONASALDEADENOMAHIPOFISIARIO',
  'Resección Endonasal de Craneofaringioma': 'RESECCIÓNENDONASALDECRANEOFARINGIOMA',
  'Resección Frontal de Glioblastoma': 'RESECCIÓNFRONTALDEGLIOBLASTOMA',
  'Resección Glioma Óptico Quiasmático': 'RESECCIÓNGLIOMAÓPTICOQUIASMÁTICO',
  'Resección Microquirúrgica de Astrocitoma Cerebeloso': 'RESECCIÓNMICROQUIRÚRGICADEASTROCITOMACEREBELOSO',
  'Exploración Neurólisis y Reparación Microquirúrgica de Plexo Lumbar': 'EXPLORACIÓNNEURÓLISISYREPARACIÓNMICROQUIRÚRGICADEPLEXOLUMBAR',
  'Instrumentación Posterior Toracolumbar con Corrección': 'INSTRUMENTACIÓNPOSTERIORTORACOLUMBARCONCORRECCIÓN',
  'Neurorrafia Microquirúrgica de Plexo Braquial': 'NEURORRAFIAMICROQUIRÚRGICADEPLEXOBRAQUIAL',
  'Resección Microquirúrgia de Tumoración Intramedular': 'RESECCIONMICROQUIRURGIADETUMORACIONINTRAMEDULAR',
  'Endarterectomía Carotídea': 'ENDARTERECTOMÍACAROTÍDEA',
  'Neurólisis de Nervio Periférico': 'NEURÓLISISDENERVIOPERIFÉRICO',
  'Neurorrafia Microquirúrgica de Nervio Periférico': 'NEURORRAFIAMICROQUIRURGIADENERVIOPERIFERICO',
  'Tiroidectomía': 'TIROIDECTOMÍA',
};

function getCarpeta(tipoCirugia) {
  const cervicales = ['Artroplastía Cervical','Disectomía Cervical Anterior 2-3 Niveles','Disectomía Cervical Anterior','Instrumentación Cervical Posterior','Laminectomía + Foraminotomía Cervical','Corpectomía Cervical Anterior','Endoscopía Cervical Posterior','Descompresión de la Unión Cráneo Cervical'];
  const lumbares = ['ALIF - Fusión Lumbar Intersomática Anterior','Descompresión Lumbar Mínimamente Invasiva','Instrumentación Lumbar','Instrumentación Percutánea Lumbar','Laminectomía + Foraminotomía Lumbar','LLIF - Fusión Lumbar Intersomática Lateral','PLIF - Fusión Lumbar Intersomática Posterior','Liberación Microquirúrgica de Medula Anclada'];
  const craneales = ['Resección de Meningioma Craneal','Resección de Meningioma Fosa Posterior Tentorial','Resección de Schwanoma Vestibular (Neurinoma del Acústico)','Resección Endonasal de Adenoma Hipofisiario','Resección Endonasal de Craneofaringioma','Resección Frontal de Glioblastoma','Resección Glioma Óptico Quiasmático','Resección Microquirúrgica de Astrocitoma Cerebeloso'];
  if (cervicales.includes(tipoCirugia)) return 'CERVICAL';
  if (lumbares.includes(tipoCirugia)) return 'LUMBAR';
  if (craneales.includes(tipoCirugia)) return 'CRANEAL';
  return 'OTROS';
}

async function agregarPDFDeBackend(pdfDoc, filename, tipoCirugia, isGenericFile = false) {
  try {
    let url;
    if (isGenericFile) {
      url = `${BACKEND_URL}/monitoreopdfs/${filename}`;
    } else {
      const carpeta = getCarpeta(tipoCirugia);
      url = `${BACKEND_URL}/monitoreopdfs/${carpeta}/${filename}`;
    }
    const bytes = await fetchOptional(url);
    if (!bytes) return;
    const externalDoc = await PDFDocument.load(bytes);
    const pages = await pdfDoc.copyPages(externalDoc, externalDoc.getPageIndices());
    for (const p of pages) pdfDoc.addPage(p);
  } catch { /* PDF opcional no disponible */ }
}

// ─── Renderizado de secciones de registros ───────────────────────────────────

async function renderSeccion(titulo, registro, pdfDoc, usarPlantilla, fonts, pageRef, _unused, height) {
  if (!registro || (!registro.texto && (!registro.imagenes || registro.imagenes.length === 0))) return;

  const { workSans, workSansLight } = fonts;
  let { page, yPos } = pageRef;

  if (yPos < MARGIN_BOTTOM_SECTION) {
    page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
    yPos = height - 80;
  }

  // Título de la sección
  page.drawText(titulo, { x: 70, y: yPos, size: 9, font: workSans, color: rgb(0, 0, 0) });
  yPos -= 25;

  // Texto
  if (registro.texto) {
    const leftMargin = 90;
    const rightMargin = 90;
    const maxTextWidth = 595 - leftMargin - rightMargin;
    const fontSize = 9;
    const lineHeight = 11;

    const paragraphs = registro.texto.split(/\n\s*\n/);
    for (let p = 0; p < paragraphs.length; p++) {
      const paragraph = paragraphs[p].trim();
      if (!paragraph) continue;
      const textLines = wrapText(paragraph, maxTextWidth, workSansLight, fontSize);
      const requiredSpace = textLines.length * lineHeight;
      if (yPos - requiredSpace < MARGIN_BOTTOM) {
        page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
        yPos = height - 80;
      }
      yPos = drawJustifiedText(page, textLines, leftMargin, yPos, maxTextWidth, workSansLight, fontSize, lineHeight);
      if (p < paragraphs.length - 1) yPos -= 5;
    }
  }

  // Imágenes en grid 2x2
  if (registro.imagenes && registro.imagenes.length > 0) {
    const result = await renderImagenesEnGrid(registro.imagenes, page, pdfDoc, usarPlantilla, yPos, 595, height);
    page = result.page;
    yPos = result.yPos;
  }

  yPos -= 15;
  pageRef.page = page;
  pageRef.yPos = yPos;
}

// ─── Página de Registros Basales ─────────────────────────────────────────────

function tieneContenido(registros, keys) {
  return keys.some(k => registros[k] && (registros[k].texto || (registros[k].imagenes && registros[k].imagenes.length > 0)));
}

async function crearPaginaRegistrosBasales(pdfDoc, registros, usarPlantilla, fonts) {
  const basalesKeys = ['peSomatosensoriales','peMotores','emgLibre','emgEvocada','peMotoresCorticobulbares','peVisuales','peAuditivosTallo','electroencefalograma','electrocorticografia','tof','ondaD','pNeuromotores'];
  if (!tieneContenido(registros, basalesKeys)) return;

  const page0 = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
  const { quando } = fonts;
  const { width, height } = page0.getSize();

  let yPos = height - 100;

  const titulo1 = 'Interpretación';
  page0.drawText(titulo1, { x: width / 2 - quando.widthOfTextAtSize(titulo1, 14) / 2, y: yPos, size: 14, font: quando, color: rgb(0, 0, 0) });
  yPos -= 40;

  const titulo2 = 'Registros basales';
  page0.drawText(titulo2, { x: width / 2 - quando.widthOfTextAtSize(titulo2, 14) / 2, y: yPos, size: 14, font: quando, color: rgb(0, 0, 0) });
  yPos -= 35;

  const pageRef = { page: page0, yPos };

  const secciones = [
    { titulo: 'POTENCIALES EVOCADOS SOMATOSENSORIALES.', key: 'peSomatosensoriales' },
    { titulo: 'POTENCIALES EVOCADOS MOTORES.', key: 'peMotores' },
    { titulo: 'ELECTROMIOGRAFÍA LIBRE.', key: 'emgLibre' },
    { titulo: 'ELECTROMIOGRAFÍA EVOCADA.', key: 'emgEvocada' },
    { titulo: 'POTENCIALES EVOCADOS MOTORES CORTICOBULBARES.', key: 'peMotoresCorticobulbares' },
    { titulo: 'POTENCIALES EVOCADOS VISUALES.', key: 'peVisuales' },
    { titulo: 'POTENCIALES EVOCADOS AUDITIVOS DE TALLO CEREBRAL.', key: 'peAuditivosTallo' },
    { titulo: 'ELECTROENCEFALOGRAMA.', key: 'electroencefalograma' },
    { titulo: 'ELECTROCORTICOGRAFÍA.', key: 'electrocorticografia' },
    { titulo: 'TOF.', key: 'tof' },
    { titulo: 'ONDA D.', key: 'ondaD' },
    { titulo: 'COMENTARIO.', key: 'pNeuromotores' },
  ];

  for (const s of secciones) {
    await renderSeccion(s.titulo, registros[s.key], pdfDoc, usarPlantilla, fonts, pageRef, undefined, height);
  }
}

// ─── Páginas Durante el Procedimiento ────────────────────────────────────────

async function crearPaginasProcedimiento(pdfDoc, fases, usarPlantilla, fonts) {
  function tieneContenidoFase(fase) {
    const keys = ['peSomatosensoriales','peMotores','emgLibre','emgEvocada','peMotoresCorticobulbares','peVisuales','peAuditivosTallo','electroencefalograma','electrocorticografia','tof','ondaD','pNeuromotores'];
    return keys.some(k => fase[k] && (fase[k].texto || (fase[k].imagenes && fase[k].imagenes.length > 0)));
  }

  const fasesConContenido = (fases || []).filter(tieneContenidoFase);
  if (fasesConContenido.length === 0) return;

  const { quando, workSans } = fonts;
  let page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
  const { width, height } = page.getSize();
  let yPos = height - 100;

  const tituloProcedimiento = 'Durante el procedimiento';
  page.drawText(tituloProcedimiento, {
    x: width / 2 - quando.widthOfTextAtSize(tituloProcedimiento, 14) / 2,
    y: yPos, size: 14, font: quando, color: rgb(0, 0, 0),
  });
  yPos -= 35;

  for (const fase of fasesConContenido) {
    if (yPos < MARGIN_BOTTOM_TITLE) {
      page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
      yPos = height - 80;
    }

    const nombreFase = toSingleLine(fase.nombre || '');
    page.drawText(nombreFase, {
      x: width / 2 - workSans.widthOfTextAtSize(nombreFase, 9) / 2,
      y: yPos, size: 9, font: workSans, color: rgb(0, 0, 0),
    });
    yPos -= 30;

    const pageRef = { page, yPos };

    const secciones = [
      { titulo: 'POTENCIALES EVOCADOS SOMATOSENSORIALES.', key: 'peSomatosensoriales' },
      { titulo: 'POTENCIALES EVOCADOS MOTORES.', key: 'peMotores' },
      { titulo: 'ELECTROMIOGRAFÍA LIBRE.', key: 'emgLibre' },
      { titulo: 'ELECTROMIOGRAFÍA EVOCADA.', key: 'emgEvocada' },
      { titulo: 'POTENCIALES EVOCADOS MOTORES CORTICOBULBARES.', key: 'peMotoresCorticobulbares' },
      { titulo: 'POTENCIALES EVOCADOS VISUALES.', key: 'peVisuales' },
      { titulo: 'POTENCIALES EVOCADOS AUDITIVOS DE TALLO CEREBRAL.', key: 'peAuditivosTallo' },
      { titulo: 'ELECTROENCEFALOGRAMA.', key: 'electroencefalograma' },
      { titulo: 'ELECTROCORTICOGRAFÍA.', key: 'electrocorticografia' },
      { titulo: 'TOF.', key: 'tof' },
      { titulo: 'ONDA D.', key: 'ondaD' },
      { titulo: 'COMENTARIO.', key: 'pNeuromotores' },
    ];

    for (const s of secciones) {
      await renderSeccion(s.titulo, fase[s.key], pdfDoc, usarPlantilla, fonts, pageRef, undefined, height);
    }

    page = pageRef.page;
    yPos = pageRef.yPos;
  }
}

// ─── Página Registros Finales ─────────────────────────────────────────────────

async function crearPaginaRegistrosFinales(pdfDoc, registros, usarPlantilla, fonts) {
  const finalesKeys = ['peSomatosensorialesFinales','peMotoresFinales','emgLibreFinales','emgEvocadaFinales','peMotoresCorticobulbaresFinales','peVisualesFinales','peAuditivosTalloFinales','electroencefalogramaFinales','electrocorticografiaFinales','tofFinales','ondaDFinales','pNeuromotoresFinales'];
  if (!tieneContenido(registros, finalesKeys)) return;

  const page0 = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
  const { quando } = fonts;
  const { width, height } = page0.getSize();

  let yPos = height - 100;

  const titulo1 = 'Interpretación';
  page0.drawText(titulo1, { x: width / 2 - quando.widthOfTextAtSize(titulo1, 14) / 2, y: yPos, size: 14, font: quando, color: rgb(0, 0, 0) });
  yPos -= 40;

  const titulo2 = 'Registros finales';
  page0.drawText(titulo2, { x: width / 2 - quando.widthOfTextAtSize(titulo2, 14) / 2, y: yPos, size: 14, font: quando, color: rgb(0, 0, 0) });
  yPos -= 35;

  const pageRef = { page: page0, yPos };

  const secciones = [
    { titulo: 'POTENCIALES EVOCADOS SOMATOSENSORIALES.', key: 'peSomatosensorialesFinales' },
    { titulo: 'POTENCIALES EVOCADOS MOTORES.', key: 'peMotoresFinales' },
    { titulo: 'ELECTROMIOGRAFÍA LIBRE.', key: 'emgLibreFinales' },
    { titulo: 'ELECTROMIOGRAFÍA EVOCADA.', key: 'emgEvocadaFinales' },
    { titulo: 'POTENCIALES EVOCADOS MOTORES CORTICOBULBARES.', key: 'peMotoresCorticobulbaresFinales' },
    { titulo: 'POTENCIALES EVOCADOS VISUALES.', key: 'peVisualesFinales' },
    { titulo: 'POTENCIALES EVOCADOS AUDITIVOS DE TALLO CEREBRAL.', key: 'peAuditivosTalloFinales' },
    { titulo: 'ELECTROENCEFALOGRAMA.', key: 'electroencefalogramaFinales' },
    { titulo: 'ELECTROCORTICOGRAFÍA.', key: 'electrocorticografiaFinales' },
    { titulo: 'TOF.', key: 'tofFinales' },
    { titulo: 'ONDA D.', key: 'ondaDFinales' },
    { titulo: 'COMENTARIO.', key: 'pNeuromotoresFinales' },
  ];

  for (const s of secciones) {
    await renderSeccion(s.titulo, registros[s.key], pdfDoc, usarPlantilla, fonts, pageRef, undefined, height);
  }
}

// ─── Página Conclusión ────────────────────────────────────────────────────────

async function crearPaginaConclusion(pdfDoc, data, usarPlantilla, fonts) {
  let page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
  const { quando, workSansLight } = fonts;
  const { width, height } = page.getSize();

  let yPos = height - 120;

  const tituloConclusion = 'Conclusión';
  page.drawText(tituloConclusion, {
    x: width / 2 - quando.widthOfTextAtSize(tituloConclusion, 14) / 2,
    y: yPos, size: 14, font: quando, color: rgb(0, 0, 0),
  });
  yPos -= 40;

  const leftMargin = 90;
  const rightMargin = 90;
  const maxTextWidth = width - leftMargin - rightMargin;
  const margenInferiorConclusion = 80;
  const fontSize = 9;     // igual que la app móvil
  const lineHeight = 11;  // igual que la app móvil

  let currentPage = page;

  const conclusionParagraphs = (data.conclusion || 'Sin conclusión').split(/\n\s*\n/);
  for (let p = 0; p < conclusionParagraphs.length; p++) {
    const paragraph = conclusionParagraphs[p].trim();
    if (!paragraph) continue;
    const wrappedLines = wrapText(paragraph, maxTextWidth, workSansLight, fontSize);
    const requiredSpace = wrappedLines.length * lineHeight;
    if (yPos - requiredSpace < margenInferiorConclusion) {
      currentPage = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
      yPos = height - 80;
    }
    yPos = drawJustifiedText(currentPage, wrappedLines, leftMargin, yPos, maxTextWidth, workSansLight, fontSize, lineHeight);
    if (p < conclusionParagraphs.length - 1) yPos -= 5;
  }

  // Nota Agregada
  if (data.notaAgregada && data.notaAgregada.trim()) {
    yPos -= 30;
    if (yPos < margenInferiorConclusion + 50) {
      currentPage = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
      yPos = height - 80;
    }
    const tituloNota = 'Nota Agregada';
    currentPage.drawText(tituloNota, {
      x: width / 2 - quando.widthOfTextAtSize(tituloNota, 14) / 2,
      y: yPos, size: 14, font: quando, color: rgb(0, 0, 0),
    });
    yPos -= 30;

    const notaParagraphs = data.notaAgregada.split(/\n\s*\n/);
    for (let p = 0; p < notaParagraphs.length; p++) {
      const paragraph = notaParagraphs[p].trim();
      if (!paragraph) continue;
      const wrappedLines = wrapText(paragraph, maxTextWidth, workSansLight, fontSize);
      if (yPos - wrappedLines.length * lineHeight < margenInferiorConclusion) {
        currentPage = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
        yPos = height - 80;
      }
      yPos = drawJustifiedText(currentPage, wrappedLines, leftMargin, yPos, maxTextWidth, workSansLight, fontSize, lineHeight);
      if (p < notaParagraphs.length - 1) yPos -= 5;
    }
  }

  // ─── Firma / Logo ──────────────────────────────────────────────────────────
  const firmaBlockBottom = 50;
  const firmaBlockTop = firmaBlockBottom + 80;
  const firmaPage = currentPage;
  const firmaY = firmaBlockTop - 20;
  const logoSize = 60;
  const espacioEntreLogoYTexto = 15;

  let logoImage = null;
  let imageDrawWidth = logoSize;
  let imageDrawHeight = logoSize;

  // Intentar imagen de firma primero (PNG o JPG)
  if (data.firmaBase64) {
    try {
      const firmaBytes = await loadImageBytes(data.firmaBase64);
      if (firmaBytes) {
        const firmaImg = await embedImage(pdfDoc, firmaBytes);
        if (firmaImg) {
          logoImage = firmaImg;
          // Escalar proporcionalmente con máximo 80x35
          const maxW = 80; const maxH = 35;
          const scale = Math.min(maxW / firmaImg.width, maxH / firmaImg.height);
          imageDrawWidth  = firmaImg.width  * scale;
          imageDrawHeight = firmaImg.height * scale;
        }
      }
    } catch { logoImage = null; }
  }

  // Fallback: logo del usuario
  if (!logoImage && data.usuarioLogo) {
    try {
      let logoUrl = String(data.usuarioLogo).trim();
      if (!logoUrl.startsWith('http://') && !logoUrl.startsWith('https://') && !logoUrl.startsWith('data:')) {
        logoUrl = `${BACKEND_URL}${logoUrl.startsWith('/') ? '' : '/'}${logoUrl}`;
      }
      const logoBytes = await loadImageBytes(logoUrl);
      if (logoBytes) {
        logoImage = await embedImage(pdfDoc, logoBytes);
        imageDrawWidth = logoSize;
        imageDrawHeight = logoSize;
      }
    } catch { logoImage = null; }
  }

  // Calcular ancho del texto
  const nombreCompleto = toSingleLine(`Dr. ${data.usuarioNombre || ''} ${data.usuarioApellido || ''}`.trim());
  let maxTxtWidth = 0;
  if (nombreCompleto !== 'Dr.') maxTxtWidth = Math.max(maxTxtWidth, quando.widthOfTextAtSize(nombreCompleto, 11));
  if (data.usuarioCedula) maxTxtWidth = Math.max(maxTxtWidth, workSansLight.widthOfTextAtSize(`Céd. ${data.usuarioCedula}`, 9));
  if (data.usuarioEspecialidad) maxTxtWidth = Math.max(maxTxtWidth, workSansLight.widthOfTextAtSize(data.usuarioEspecialidad, 9));
  if (data.usuarioCorreo) maxTxtWidth = Math.max(maxTxtWidth, workSansLight.widthOfTextAtSize(data.usuarioCorreo, 9));
  if (data.usuarioTelefono) maxTxtWidth = Math.max(maxTxtWidth, workSansLight.widthOfTextAtSize(data.usuarioTelefono, 9));

  const totalFirmaWidth = (logoImage ? imageDrawWidth + espacioEntreLogoYTexto : 0) + maxTxtWidth;
  const firmaX = (width - totalFirmaWidth) / 2;

  if (logoImage) {
    firmaPage.drawImage(logoImage, {
      x: firmaX, y: firmaY - imageDrawHeight + 10,
      width: imageDrawWidth, height: imageDrawHeight,
    });
  }

  const textoX = firmaX + (logoImage ? imageDrawWidth + espacioEntreLogoYTexto : 0);
  let textoY = firmaY;

  if (nombreCompleto !== 'Dr.') {
    firmaPage.drawText(nombreCompleto, { x: textoX, y: textoY, size: 11, font: quando, color: rgb(0, 0, 0) });
    textoY -= 14;
  }
  if (data.usuarioCedula) {
    firmaPage.drawText(toSingleLine(`Céd. ${data.usuarioCedula}`), { x: textoX, y: textoY, size: 9, font: workSansLight, color: rgb(0, 0, 0) });
    textoY -= 13;
  }
  if (data.usuarioEspecialidad) {
    firmaPage.drawText(toSingleLine(data.usuarioEspecialidad), { x: textoX, y: textoY, size: 9, font: workSansLight, color: rgb(0, 0, 0) });
    textoY -= 13;
  }
  if (data.usuarioCorreo) {
    firmaPage.drawText(toSingleLine(data.usuarioCorreo), { x: textoX, y: textoY, size: 9, font: workSansLight, color: rgb(0, 0, 0) });
    textoY -= 13;
  }
  if (data.usuarioTelefono) {
    firmaPage.drawText(toSingleLine(data.usuarioTelefono), { x: textoX, y: textoY, size: 9, font: workSansLight, color: rgb(0, 0, 0) });
  }
}

// ─── Página Tendencias ────────────────────────────────────────────────────────

async function crearPaginasTendencias(pdfDoc, tendencias, usarPlantilla, fonts) {
  if (!tendencias || tendencias.length === 0) return;
  const { quando, workSansLight } = fonts;

  for (const tendencia of tendencias) {
    let page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
    const { width, height } = page.getSize();
    let yPos = height - 100;

    const titulo = 'Tendencias o cascada de eventos (pila)';
    page.drawText(titulo, {
      x: width / 2 - quando.widthOfTextAtSize(titulo, 13) / 2,
      y: yPos, size: 13, font: quando, color: rgb(0, 0, 0),
    });
    yPos -= 35;

    // Imágenes de tendencia (array de base64 o URIs)
    const imgs = tendencia.imagenes || (tendencia.uri ? [tendencia.uri] : []);
    for (const imgSrc of imgs) {
      if (!imgSrc) continue;
      try {
        const bytes = await loadImageBytes(imgSrc);
        if (bytes) {
          const img = await embedImage(pdfDoc, bytes);
          if (img) {
            const imgWidth = width - 80;
            const maxImgHeight = Math.min(height - 200, 500);
            let imgHeight = (imgWidth * img.height) / img.width;
            let drawWidth = imgWidth;
            if (imgHeight > maxImgHeight) {
              imgHeight = maxImgHeight;
              drawWidth = (imgHeight * img.width) / img.height;
            }
            // Nueva página si no cabe
            if (yPos - imgHeight < 80) {
              page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
              yPos = height - 80;
            }
            page.drawImage(img, { x: (width - drawWidth) / 2, y: yPos - imgHeight, width: drawWidth, height: imgHeight });
            yPos -= imgHeight + 20;
          }
        }
      } catch { /* imagen no disponible */ }
    }

    // Texto descriptivo
    if (tendencia.texto) {
      const leftMargin = 90;
      const rightMargin = 90;
      const maxTextWidth = width - leftMargin - rightMargin;
      const fontSize = 10;
      const lineHeight = 12;
      const paragraphs = tendencia.texto.split(/\n\s*\n/);
      for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p].trim();
        if (!paragraph) continue;
        const textLines = wrapText(paragraph, maxTextWidth, workSansLight, fontSize);
        if (yPos - textLines.length * lineHeight < 120) {
          page = await aplicarPlantillaFondo(pdfDoc, usarPlantilla);
          yPos = height - 80;
        }
        yPos = drawJustifiedText(page, textLines, leftMargin, yPos, maxTextWidth, workSansLight, fontSize, lineHeight);
        if (p < paragraphs.length - 1) yPos -= 5;
      }
    }
  }
}

// ─── Función principal ────────────────────────────────────────────────────────

export async function buildMonitoreoPdf(data, usarPlantilla = true, onProgress) {
  const prog = (p) => onProgress?.(p);
  prog(0);

  // Limpiar caracteres problemáticos
  data = sanitizeData(data);

  // Limpiar caché de plantilla al inicio de cada generación
  _plantillaBytesCache = null;

  const pdfDoc = await PDFDocument.create();
  prog(5);

  // Precargar plantilla
  if (usarPlantilla) await getPlantillaBytes();
  prog(10);

  // Cargar fuentes
  const fonts = await loadCustomFonts(pdfDoc);
  prog(15);

  // Página 1: Información General
  await crearPaginaInformacionGeneral(pdfDoc, data, usarPlantilla, fonts);
  prog(25);

  // PDFs opcionales del backend
  const nombreArchivoSinEspacios = nombresSinEspacios[data.tipoCirugia] || data.tipoCirugia;

  if (data.incluirProtocolo) {
    await agregarPDFDeBackend(pdfDoc, `${nombreArchivoSinEspacios}protocolo.pdf`, data.tipoCirugia);
  }
  prog(35);

  if (data.incluirProcedimiento) {
    await agregarPDFDeBackend(pdfDoc, `${nombreArchivoSinEspacios}procedimiento.pdf`, data.tipoCirugia);
  }
  prog(45);

  if (data.incluirModalidades) {
    // Modalidades NF.pdf vive dentro de la subcarpeta de cada tipo — NO es genérico
    await agregarPDFDeBackend(pdfDoc, 'Modalidades NF.pdf', data.tipoCirugia, false);
  }
  prog(50);

  // Registros Basales
  await crearPaginaRegistrosBasales(pdfDoc, data.registrosBasales || {}, usarPlantilla, fonts);
  prog(60);

  // Durante el Procedimiento
  await crearPaginasProcedimiento(pdfDoc, data.fasesProcedimiento || [], usarPlantilla, fonts);
  prog(70);

  // Registros Finales
  await crearPaginaRegistrosFinales(pdfDoc, data.registrosFinales || {}, usarPlantilla, fonts);
  prog(80);

  // Conclusión
  await crearPaginaConclusion(pdfDoc, data, usarPlantilla, fonts);
  prog(85);

  // Tendencias
  await crearPaginasTendencias(pdfDoc, data.tendenciasFotos || [], usarPlantilla, fonts);
  prog(90);

  // Metadatos
  pdfDoc.setTitle(`Reporte Monitoreo – ${data.nombrePaciente || ''}`);
  pdfDoc.setAuthor(data.neurofisiologo || '');
  pdfDoc.setSubject('Neuromonitoreo Intraoperatorio');
  pdfDoc.setCreator('MEDXpro Web');
  pdfDoc.setCreationDate(new Date());

  const bytes = await pdfDoc.save();
  prog(100);
  return bytes.buffer;
}

// ─── Utilidades exportadas ────────────────────────────────────────────────────

export function buildReportFileName(tipoCirugia, nombrePaciente) {
  const safe = (s) => (s || '').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-]/g, '').trim().replace(/\s+/g, '_');
  return `${safe(tipoCirugia)}_${safe(nombrePaciente)}.pdf`;
}

export function toSafeToken(s) {
  return (s || 'paciente').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 60);
}
