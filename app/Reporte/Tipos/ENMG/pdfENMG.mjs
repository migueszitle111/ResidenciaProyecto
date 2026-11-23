/*
 * pdfENMG.mjs — Generador del PDF de Electroneuromiografía (reporte genérico).
 *
 * Replica la plantilla "EMG 4 extremidades": las cajas/encabezados son las mismas
 * imágenes de la plantilla (public/ENMGImg/plantilla) colocadas en las mismas
 * coordenadas, y el texto usa las fuentes de la plantilla (Luxora Grotesk,
 * Work Sans Light y Quando).
 *
 * Módulo puro: no depende de React ni de Next. Recibe `loadAsset(path)` para
 * leer fuentes/imágenes, así funciona en el navegador (fetch) y en Node (fs)
 * para pruebas.
 *
 * Coordenadas: todas las medidas están en puntos con origen ARRIBA-izquierda
 * (como se leen en la plantilla); se convierten a PDF (origen abajo) al dibujar.
 */

import { PDFDocument, rgb, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const PW = 612;
const PH = 792;

const NEGRO = rgb(0, 0, 0);
const BLANCO = rgb(1, 1, 1);
const GRIS_7F = rgb(0x7f / 255, 0x7f / 255, 0x7f / 255);
const GRIS_74 = rgb(0x74 / 255, 0x74 / 255, 0x74 / 255);
const GRIS_80 = rgb(0x80 / 255, 0x80 / 255, 0x80 / 255);

const PLANTILLA = '/ENMGImg/plantilla';

/* Configuración fija de cada bloque (medidas tomadas de la plantilla) */
const BLOQUES_PDF = {
  sensitiva: {
    titulo: 'Conducción Nerviosa Sensitiva (PANS)',
    descripcion: ['Estímulo submáximo a territorio cutáneo sensorial con registro distal mediante técnica antidrómica convencional, encontrando:'],
    descY: [187.5],
    hdr: 'hdrSensitiva', hdrH: 76.2, row: 'rowSensitiva',
    tituloY: 154, filasTop: 224.8, textoOff: 44.2,
    prefijo: 'NERVIO', seccion: 'Neurografía', icono: 'iconoNeurografia',
  },
  motora: {
    titulo: 'Conducción Nerviosa Motora (PAMC)',
    descripcion: ['Estímulo supramáximo a trayecto nervioso con registro en punto motor correspondiente, encontrando:'],
    descY: [187.5],
    hdr: 'hdrMotora', hdrH: 81.3, row: 'rowMotora',
    tituloY: 154, filasTop: 229.6, textoOff: 36.9,
    prefijo: 'NERVIO', seccion: 'Neurografía', icono: 'iconoNeurografia',
  },
  especiales: {
    titulo: 'Pruebas especiales complementarias',
    descripcion: [],
    hdr: 'hdrEspeciales', hdrH: 39.0, row: 'rowEspeciales',
    tituloY: 153, filasTop: 192.0, textoOff: 36.9,
    prefijo: '', seccion: 'Neurografía', icono: 'iconoNeurografia',
  },
  miografia: {
    titulo: 'Electrodo monopolar/concéntrico (EMG)',
    descripcion: [
      'Se evalúan músculos con aguja de 55 mm, por medio de las modalidades de inserción, reposo y actividad voluntaria,',
      'encontrando:',
    ],
    descY: [185.5, 194.5],
    hdr: 'hdrMiografia', hdrH: 81.3, row: 'rowMiografia',
    tituloY: 163, filasTop: 229.6, textoOff: 43.9,
    prefijo: '', seccion: 'Miografía', icono: 'iconoMiografia',
  },
  ecografia: {
    titulo: 'Ultrasonido MSK',
    descripcion: ['Se evalúan estructuras nerviosas con sonda lineal de alta frecuencia (L12-5L40S), encontrando:'],
    descY: [187.5],
    hdr: 'hdrEcografia', hdrH: 81.3, row: 'rowEcografia',
    tituloY: 163, filasTop: 229.6, textoOff: 43.9,
    prefijo: '', seccion: 'Ecografía', icono: 'iconoEcografia',
  },
};

const FILA = { x: 41.4, w: 525, h: 104.5, paso: 113.55, textoX: 94, textoDer: 555, size: 12, lh: 14 };
const NOTA = { x: 42.9, w: 522.8, h: 103.5, gap: 17.8, textoX: 68, textoDer: 548, off: 52.5, size: 10, lh: 12 };
const LIMITE_INFERIOR = 742; // y máxima para cajas antes de saltar de página

const PIE_MIOGRAFIA = [
  { t: '**El termino ', f: 'luxLight' },
  { t: 'respuesta normal', f: 'luxRegular' },
  { t: ', hace alusión a registros dentro de valores estadísticos (2.5 DE) de acuerdo con edad y sexo (DeLisa)**', f: 'luxLight' },
];

const AVISO_VALIDEZ = [
  '“Esta evaluación tiene una validez de 3-6 meses a partir de la fecha de entregado el presente resultado, ya que los procesos de reinervación y/o',
  'degeneración NEURAL, se modifican indeterminadamente con o sin tratamiento pasado este lapso. Todo tratamiento final, es responsabilidad del',
  'médico tratante, tomando este informe como adyuvante en la correlación diagnostica”',
];

const MESES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

/* "10/11/2026" → "NOVIEMBRE 10, 2026" */
export function formatearFechaPdf(fecha) {
  const m = String(fecha || '').trim().match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!m) return String(fecha || '').toUpperCase();
  const [, d, mes, y] = m;
  const nombre = MESES[Number(mes) - 1];
  return nombre ? `${nombre} ${Number(d)}, ${y}` : String(fecha).toUpperCase();
}

/* "PERONEO SUPERFICIAL" → "NERVIO PERONEO SUPERFICIAL."
 * sinPrefijo: renglones como "RAMA TÉMPORO-FACIAL" que no llevan "NERVIO". */
export function etiqueta(prefijo, nombre, sinPrefijo = false) {
  const limpio = String(nombre || '').trim().replace(/\.+$/, '');
  if (!limpio) return '';
  const p = sinPrefijo ? '' : prefijo;
  const yaTiene = p && limpio.toUpperCase().startsWith(p);
  return `${p && !yaTiene ? `${p} ` : ''}${limpio}.`;
}

/* Descripción estándar de cada bloque (en una sola cadena) */
export const DESCRIPCION_ESTANDAR = Object.fromEntries(
  Object.entries(BLOQUES_PDF).map(([id, b]) => [id, b.descripcion.join(' ')]),
);

/* Título de la hoja de Conclusión: el capturado, o "ENMG de {región}" */
export const tituloConclusion = (data) =>
  String(data.tituloConclusion || '').trim() || `ENMG de ${String(data.region || '').trim().toLowerCase()}`;

const DESC_MAX_W = 485; // ancho máximo de una descripción editada (pt a 8 pt de tamaño)
const DESC_MAX_LINEAS = 3; // líneas que caben en el encabezado de color

/* ─── Medidas del texto ─────────────────────────────────────────────────────────
 * Las usa el generador para acomodar el texto y el revisor de capacidad
 * (crearRevisorEnmg) para que el formulario no deje escribir más de lo que cabe.
 * Así ambos calculan exactamente lo mismo. F = { luxLight, luxRegular, workLight, quando }. */

const ancho = (t, f, size) => f.widthOfTextAtSize(t, size);

// Reduce el tamaño hasta que el texto quepa en `max` puntos (sin bajar de `min`)
const ajustarTam = (t, f, size, max, min = 8) => {
  let s = size;
  while (s > min && ancho(t, f, s) > max) s -= 0.5;
  return s;
};

/* Parte un párrafo (varias corridas de texto: etiqueta negra + valor gris…) en líneas por palabras.
 * runs: [{ t, f, color }] → [[{ t, f, color, espacio }]] */
function partirLineas(runs, size, maxW) {
  const palabras = [];
  for (const r of runs) {
    const partes = String(r.t || '').split(/(\s+)/);
    for (const p of partes) {
      if (!p) continue;
      if (/^\s+$/.test(p)) { if (palabras.length) palabras[palabras.length - 1].espacio = true; continue; }
      // Permite cortar después de un guion entre letras, como Word ("sensitivo-" | "motoras")
      for (const trozo of p.split(/(?<=[A-Za-zÀ-ÿ]-)(?=[A-Za-zÀ-ÿ])/)) {
        palabras.push({ t: trozo, f: r.f, color: r.color, espacio: false });
      }
    }
  }
  const lineas = [];
  let actual = [];
  let w = 0;
  for (const pal of palabras) {
    const pw = ancho(pal.t, pal.f, size);
    const sp = actual.length && actual[actual.length - 1].espacio ? ancho(' ', actual[actual.length - 1].f, size) : 0;
    if (actual.length && w + sp + pw > maxW) {
      lineas.push(actual);
      actual = [pal];
      w = pw;
    } else {
      w += sp + pw;
      actual.push(pal);
    }
  }
  if (actual.length) lineas.push(actual);
  return lineas;
}

const contarLineas = (runs, size, maxW) => partirLineas(runs, size, maxW).length;
const textoDeLinea = (linea) => linea.map((p) => p.t + (p.espacio ? ' ' : '')).join('').trim();

// Cuánto sobresale a lo ancho una palabra sin espacios más larga que el renglón (0 si nada)
const excesoAncho = (runs, size, maxW) => {
  let max = 0;
  for (const linea of partirLineas(runs, size, maxW)) {
    if (linea.length !== 1) continue; // con 2+ palabras el corte ya lo acomodó
    max = Math.max(max, ancho(linea[0].t, linea[0].f, size) - maxW);
  }
  return max;
};

/* Medidas de cada zona de la plantilla */
const MIN_REGION = 14;
const MIN_PACIENTE = 14;
const MIN_DX = 11;
const PORTADA_MAX_W = 480;
const PACIENTE_MAX_W = 500;
const MEDICO_MAX_W = 500;
const DX_MAX_W = 460;
const COLUMNA = { maxW: 253.65 - 54.1 - 20, disponible: 491.8 - 347 - 8, min: 7 };
const CONC_MOTIVO = { x: 71, y0: 575.5, maxW: 541 - 71, limite: 700 };
const CONC_FINAL = { x: 66, y0: 296.5, maxW: 536 - 66, fin: 229.6 + 343.2 - 20, corrX: 69, corrMaxW: 540 - 69, corrSize: 9.85, corrLh: 11.7, corrMinY: 473 };
const FIRMANTE = { maxW: 290, alto: 78, min: 7 };
// En la hoja que lleva el pie "respuesta normal" (y = 718) el contenido debe terminar antes
const LIMITE_PIE = 708;
// Alto máximo de una caja: un renglón debe caber debajo del encabezado de su bloque y una nota
// en una hoja nueva, aun en la hoja del pie (así nunca queda un encabezado solo ni se encima nada)
const altoMaxFila = (cfg) => LIMITE_PIE - cfg.filasTop;
const ALTO_MAX_NOTA = LIMITE_PIE - 130.3;

const lineasColumna = (items) =>
  (items || []).map((i) => (typeof i === 'string' ? i : i?.texto || '')).map((s) => s.trim()).filter(Boolean);

// Datos clínicos / Antecedentes: reduce tamaño e interlineado hasta que quepan
function medidaColumna(items, F) {
  const lineas = lineasColumna(items);
  const runs = (l) => [{ t: l, f: F.workLight, color: NEGRO }];
  const total = (s) => lineas.reduce((a, l) => a + contarLineas(runs(l), s, COLUMNA.maxW), 0);
  let size = 10.56, lh = 15;
  while (size > COLUMNA.min && (total(size) - 1) * lh > COLUMNA.disponible) { size -= 0.5; lh = size * 1.42; }
  const exceso = Math.max(
    (total(size) - 1) * lh - COLUMNA.disponible,
    ...lineas.map((l) => excesoAncho(runs(l), size, COLUMNA.maxW)),
  );
  return { lineas, size, lh, exceso };
}

// Principal, Secundario y un tercer renglón opcional (p. ej. "Vía Trigémino-Facial")
function parrafosConclusion(data, F) {
  const lista = [
    [{ t: 'Principal. ', f: F.luxRegular, color: NEGRO }, { t: conPunto(data.principal), f: F.workLight, color: GRIS_74 }],
    [{ t: 'Secundario. ', f: F.luxRegular, color: NEGRO }, { t: conPunto(data.secundario), f: F.workLight, color: GRIS_74 }],
  ];
  const etq3 = String(data.terceraEtiqueta || '').trim().replace(/\.+$/, '');
  const txt3 = String(data.tercera || '').trim();
  if (etq3 || txt3) {
    lista.push([
      ...(etq3 ? [{ t: txt3 ? `${etq3}. ` : etq3, f: F.luxRegular, color: NEGRO }] : []),
      ...(txt3 ? [{ t: conPunto(txt3), f: F.workLight, color: GRIS_74 }] : []),
    ]);
  }
  return lista;
}
// Alto de los párrafos separados por una línea en blanco (incluye una línea extra al final)
const altoParrafos = (ps, size, lh, maxW) => (ps.reduce((a, r) => a + contarLineas(r, size, maxW), 0) + ps.length - 1) * lh;
const excesoAnchoParrafos = (ps, size, maxW) => Math.max(0, ...ps.map((r) => excesoAncho(r, size, maxW)));

// Caja "CONCLUSIÓN." de la hoja Motivo de envío
function medidaConclusionMotivo(data, F) {
  const ps = parrafosConclusion(data, F);
  const { y0, maxW, limite } = CONC_MOTIVO;
  let size = 14, lh = 16.5;
  while (size > 8 && y0 + altoParrafos(ps, size, lh, maxW) > limite) { size -= 0.5; lh = size * 1.18; }
  const exceso = Math.max(y0 + altoParrafos(ps, size, lh, maxW) - limite, excesoAnchoParrafos(ps, size, maxW));
  return { ps, size, lh, exceso };
}

// Caja de la hoja final de Conclusión (conclusiones + correlación clínica)
function medidaConclusionFinal(data, F) {
  const ps = parrafosConclusion(data, F);
  const c = CONC_FINAL;
  const corr = String(data.correlacion || '').trim();
  const runsC = [{ t: 'Correlación clínica. ', f: F.quando, color: NEGRO }, { t: corr, f: F.workLight, color: GRIS_80 }];
  const nC = corr ? contarLineas(runsC, c.corrSize, c.corrMaxW) : 0;
  const altoC = nC * c.corrLh;
  const ultimaY = (s, l) => c.y0 + altoParrafos(ps, s, l, c.maxW) - l;
  const yCorr = (s, l) => Math.max(c.corrMinY, ultimaY(s, l) + 45);
  // y de la última línea escrita en la caja
  const finReal = (s, l) => (corr ? yCorr(s, l) + (nC - 1) * c.corrLh : ultimaY(s, l));
  let size = 14, lh = 16.3;
  while (size > 8 && (c.y0 + altoParrafos(ps, size, lh, c.maxW) + (corr ? 40 + altoC : 0) > c.fin || finReal(size, lh) > c.fin)) {
    size -= 0.5; lh = size * 1.165;
  }
  const excesoConclusiones = Math.max(ultimaY(size, lh) - c.fin, excesoAnchoParrafos(ps, size, c.maxW));
  const excesoCorrelacion = corr ? Math.max(finReal(size, lh) - c.fin, excesoAncho(runsC, c.corrSize, c.corrMaxW)) : 0;
  return { ps, size, lh, corr, runsC, yCorr: yCorr(size, lh), excesoConclusiones, excesoCorrelacion };
}

// Datos del médico: renglones largos se parten (como Word); si son demasiados, se reduce el tamaño
function medidaFirmante(firmante, F) {
  const renglones = (firmante || []).map((l) => String(l || '').replace(/\s+/g, ' ').trim()).filter(Boolean);
  const runs = (l) => [{ t: l, f: F.workLight, color: GRIS_80 }];
  const partir = (size) => renglones.flatMap((l) => partirLineas(runs(l), size, FIRMANTE.maxW).map(textoDeLinea));
  let size = 10;
  let lineas = partir(size);
  while (size > FIRMANTE.min && lineas.length * size * 1.18 > FIRMANTE.alto) { size -= 0.5; lineas = partir(size); }
  const exceso = Math.max(
    lineas.length * size * 1.18 - FIRMANTE.alto,
    ...renglones.map((l) => excesoAncho(runs(l), size, FIRMANTE.maxW)),
  );
  return { lineas, size, exceso };
}

// Descripción de la técnica de un bloque: líneas a dibujar (o null si el bloque no lleva)
function lineasDescripcion(id, b, F) {
  const cfg = BLOQUES_PDF[id];
  const desc = typeof b?.descripcion === 'string' ? b.descripcion.replace(/\s+/g, ' ').trim() : DESCRIPCION_ESTANDAR[id];
  if (!cfg.descY || !desc) return null;
  if (desc === DESCRIPCION_ESTANDAR[id]) return { lineas: cfg.descripcion, exceso: 0 };
  const runs = [{ t: desc, f: F.workLight, color: GRIS_80 }];
  const lineas = partirLineas(runs, 8, DESC_MAX_W).map(textoDeLinea);
  return { lineas, exceso: Math.max(lineas.length - DESC_MAX_LINEAS, excesoAncho(runs, 8, DESC_MAX_W)) };
}

const filaConTexto = (f) => String(f?.nombre || '').trim() || String(f?.hallazgo || '').trim();

// Renglón de hallazgo (caja de color que crece con el texto)
function medidaFila(id, f, F) {
  const cfg = BLOQUES_PDF[id];
  const runs = [
    { t: etiqueta(cfg.prefijo, f.nombre, f.sinPrefijo), f: F.workLight, color: NEGRO },
    { t: ` ${conPunto(f.hallazgo)}`, f: F.workLight, color: GRIS_74 },
  ];
  const maxW = FILA.textoDer - FILA.textoX;
  const n = contarLineas(runs, FILA.size, maxW);
  const alto = Math.max(FILA.h, cfg.textoOff + (n - 1) * FILA.lh + 30);
  return { runs, alto, exceso: Math.max(alto - altoMaxFila(cfg), excesoAncho(runs, FILA.size, maxW)) };
}

function medidaNota(nota, F) {
  const runs = [
    { t: 'NOTA. ', f: F.luxLight, color: NEGRO },
    { t: conPunto(nota), f: F.workLight, color: GRIS_74 },
  ];
  const maxW = NOTA.textoDer - NOTA.textoX;
  const n = contarLineas(runs, NOTA.size, maxW);
  const alto = Math.max(NOTA.h, NOTA.off + (n - 1) * NOTA.lh + 30);
  return { runs, alto, exceso: Math.max(alto - ALTO_MAX_NOTA, excesoAncho(runs, NOTA.size, maxW)) };
}

const ETIQUETA_MEDICO = 'Médico tratante ';

/**
 * Revisa qué campos no caben en la plantilla del PDF.
 * @returns {Record<string, { exceso: number, campo: string }>} solo los que se salen (exceso > 0)
 */
export function revisarCapacidad(data, F) {
  const r = {};
  const marcar = (clave, campo, exceso) => { if (exceso > 0.01) r[clave] = { exceso, campo }; };

  // Portada
  const region = String(data.region || '').trim();
  marcar('region', 'Región / extremidades', ancho(region, F.luxRegular, MIN_REGION) - PORTADA_MAX_W);
  const paciente = String(data.nombrePaciente || '').trim();
  marcar('nombrePaciente', 'Nombre del Paciente', ancho(paciente, F.luxRegular, MIN_PACIENTE) - PACIENTE_MAX_W);
  marcar('fecha', 'Fecha', ancho(formatearFechaPdf(data.fecha), F.workLight, 15) - PORTADA_MAX_W);
  const med = String(data.medico || '').trim().toUpperCase();
  marcar('medico', 'Médico tratante', ancho(ETIQUETA_MEDICO, F.luxRegular, 15) + ancho(med, F.workLight, 15) - MEDICO_MAX_W);

  // Motivo de envío
  marcar('dx', 'Dx', ancho(String(data.dx || '').trim(), F.workLight, MIN_DX) - DX_MAX_W);
  marcar('datosClinicos', 'Datos clínicos', medidaColumna(data.datosClinicos, F).exceso);
  marcar('antecedentes', 'Antecedentes', medidaColumna(data.antecedentes, F).exceso);
  marcar('conclusionMotivo', 'Conclusión', medidaConclusionMotivo(data, F).exceso);

  // Bloques
  for (const [id, b] of Object.entries(data.bloques || {})) {
    const cfg = BLOQUES_PDF[id];
    if (!cfg || !b) continue;
    const d = lineasDescripcion(id, b, F);
    if (d) marcar(`${id}.descripcion`, `${cfg.titulo} · descripción`, d.exceso);
    (b.filas || []).forEach((f, i) => {
      if (filaConTexto(f)) marcar(`${id}.fila.${f.id ?? i}`, `${cfg.titulo} · renglón ${i + 1}`, medidaFila(id, f, F).exceso);
    });
    const nota = String(b.nota || '').trim();
    if (nota) marcar(`${id}.nota`, `${cfg.titulo} · nota`, medidaNota(nota, F).exceso);
  }

  // Hoja de Conclusión
  const titulo = tituloConclusion(data);
  marcar('tituloConclusion', 'Título de la hoja de conclusión', ancho(titulo, F.quando, 8) - PORTADA_MAX_W);
  const cf = medidaConclusionFinal(data, F);
  marcar('conclusionFinal', 'Conclusión', cf.excesoConclusiones);
  marcar('correlacion', 'Correlación clínica', cf.excesoCorrelacion);
  marcar('firmante', 'Datos del médico que realiza el estudio', medidaFirmante(data.firmante, F).exceso);
  return r;
}

/**
 * Crea un revisor de capacidad con las fuentes del formato ya cargadas.
 * Una vez creado, revisar es síncrono (sirve para validar cada tecla).
 * @param {(path:string)=>Promise<Uint8Array|ArrayBuffer|null>} loadAsset
 * @returns {Promise<(data:object)=>ReturnType<typeof revisarCapacidad>>}
 */
export async function crearRevisorEnmg(loadAsset) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const fuente = async (archivo) => {
    const ruta = `/fonts/${archivo}`;
    const b = await loadAsset(ruta);
    if (!b) throw new RecursosFaltantesError([ruta]);
    return pdf.embedFont(b instanceof Uint8Array ? b : new Uint8Array(b), { subset: true });
  };
  const F = {
    luxLight: await fuente('LuxoraGrotesk-Light.ttf'),
    luxRegular: await fuente('LuxoraGrotesk-Regular.ttf'),
    workLight: await fuente('WorkSans-Light.ttf'),
    quando: await fuente('Quando-Regular.ttf'),
  };
  return (data) => revisarCapacidad(data, F);
}

const conPunto = (s) => {
  const t = String(s || '').trim();
  return t && !/[.!?…:]$/.test(t) ? `${t}.` : t;
};

function dataUrlABytes(url) {
  const base64 = url.slice(url.indexOf(',') + 1);
  if (typeof atob === 'function') {
    const bin = atob(base64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  return new Uint8Array(Buffer.from(base64, 'base64'));
}

const esPng = (b) => b && b[0] === 0x89 && b[1] === 0x50;
const esJpg = (b) => b && b[0] === 0xff && b[1] === 0xd8;

/* Recursos obligatorios del formato. Si falta alguno NO se genera el PDF
 * (antes se generaba con Helvetica y sin cajas, sin avisar). */
const FUENTES = ['LuxoraGrotesk-Light.ttf', 'LuxoraGrotesk-Regular.ttf', 'WorkSans-Light.ttf', 'Quando-Regular.ttf'];
const IMAGENES_PLANTILLA = [
  'portada', 'caja', 'dx', 'datosClinicos', 'antecedentes', 'hdrConclusion',
  ...Object.values(BLOQUES_PDF).flatMap((b) => [b.hdr, b.row, b.icono]),
];
export const RECURSOS_ENMG = [
  ...FUENTES.map((f) => `/fonts/${f}`),
  ...[...new Set(IMAGENES_PLANTILLA)].map((n) => `${PLANTILLA}/${n}.png`),
];

export class RecursosFaltantesError extends Error {
  constructor(faltantes) {
    super(`No se pudieron cargar los recursos del formato (${faltantes.length}). Verifique su conexión e intente de nuevo.`);
    this.name = 'RecursosFaltantesError';
    this.faltantes = faltantes;
  }
}

/* ─── Generador ────────────────────────────────────────────────────────────── */

/**
 * @param {object} data  Formulario del reporte (ver ReportFace.jsx) + firmante/firma/logo/anexo.
 * @param {(path:string)=>Promise<Uint8Array|ArrayBuffer|null>} loadAsset
 * @returns {Promise<Uint8Array>}
 * @throws {RecursosFaltantesError} si no se pudo leer alguna fuente o imagen de la plantilla
 */
export async function buildEnmgPdf(data, loadAsset) {
  const bytes = async (src) => {
    if (!src) return null;
    if (src instanceof Uint8Array) return src;
    if (src instanceof ArrayBuffer) return new Uint8Array(src);
    if (typeof src === 'string' && src.startsWith('data:')) return dataUrlABytes(src);
    try {
      const r = await loadAsset(src);
      return r ? (r instanceof Uint8Array ? r : new Uint8Array(r)) : null;
    } catch { return null; }
  };

  // Descarga todos los recursos del formato antes de empezar; si falta uno, se aborta.
  const recursos = new Map(await Promise.all(RECURSOS_ENMG.map(async (r) => [r, await bytes(r)])));
  const faltantes = RECURSOS_ENMG.filter((r) => !recursos.get(r));
  if (faltantes.length) throw new RecursosFaltantesError(faltantes);

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`Electroneuromiografía ${data.nombrePaciente || ''}`.trim());
  pdf.setCreator('MEDXpro');

  const fuente = (archivo) => pdf.embedFont(recursos.get(`/fonts/${archivo}`), { subset: true });
  const F = {
    luxLight: await fuente('LuxoraGrotesk-Light.ttf'),
    luxRegular: await fuente('LuxoraGrotesk-Regular.ttf'),
    workLight: await fuente('WorkSans-Light.ttf'),
    quando: await fuente('Quando-Regular.ttf'),
  };

  const imgCache = {};
  const imagen = async (src) => {
    const key = typeof src === 'string' ? src : null;
    if (key && key in imgCache) return imgCache[key];
    const b = (key && recursos.get(key)) || await bytes(src);
    let img = null;
    try {
      if (esPng(b)) img = await pdf.embedPng(b);
      else if (esJpg(b)) img = await pdf.embedJpg(b);
    } catch { img = null; }
    if (key) imgCache[key] = img;
    return img;
  };
  const plantilla = (nombre) => imagen(`${PLANTILLA}/${nombre}.png`);

  /* ── primitivas (y = desde arriba) ── */
  let page = null;
  const nuevaPagina = () => { page = pdf.addPage([PW, PH]); return page; };

  const dibujarImg = (img, x, yTop, w, h) => {
    if (img) page.drawImage(img, { x, y: PH - yTop - h, width: w, height: h });
  };
  // Ajusta la imagen dentro de la caja conservando proporción (centrada)
  const dibujarImgContenida = (img, x, yTop, w, h) => {
    if (!img) return;
    const s = Math.min(w / img.width, h / img.height);
    const iw = img.width * s, ih = img.height * s;
    dibujarImg(img, x + (w - iw) / 2, yTop + (h - ih) / 2, iw, ih);
  };
  const texto = (t, x, y, f, size, color = NEGRO, skew = false) => {
    if (!t) return;
    page.drawText(t, { x, y: PH - y, size, font: f, color, ...(skew ? { ySkew: degrees(12) } : {}) });
  };
  const textoCentro = (t, cx, y, f, size, color, skew) => texto(t, cx - ancho(t, f, size) / 2, y, f, size, color, skew);
  const textoDerecha = (t, xDer, y, f, size, color) => texto(t, xDer - ancho(t, f, size), y, f, size, color);

  /*
   * Párrafo con varias corridas de texto (p. ej. etiqueta negra + valor gris),
   * con salto de línea por palabras y justificado opcional (como la plantilla).
   * runs: [{ t, f, color }]. Devuelve la y de la última línea.
   */
  const dibujarParrafo = (runs, x, y, maxW, size, lh, { justificar = true } = {}) => {
    const lineas = partirLineas(runs, size, maxW);
    lineas.forEach((linea, li) => {
      const ultima = li === lineas.length - 1;
      const anchos = linea.map((p) => ancho(p.t, p.f, size));
      const espacios = linea.slice(0, -1).map((p) => (p.espacio ? ancho(' ', p.f, size) : 0));
      const total = anchos.reduce((a, b) => a + b, 0) + espacios.reduce((a, b) => a + b, 0);
      const huecos = espacios.filter((e) => e > 0).length;
      const extra = justificar && !ultima && huecos > 0 ? (maxW - total) / huecos : 0;
      let cx = x;
      linea.forEach((p, i) => {
        texto(p.t, cx, y + li * lh, p.f, size, p.color);
        cx += anchos[i];
        if (i < linea.length - 1 && p.espacio) cx += espacios[i] + extra;
      });
    });
    return { lineas: lineas.length, ultimaY: y + Math.max(0, lineas.length - 1) * lh };
  };

  /* ════════════════════ HOJA 1 · Portada ════════════════════ */
  nuevaPagina();
  dibujarImg(await plantilla('portada'), 44.4, 135.0, 536.3, 123.0);
  textoCentro('ELECTRONEUROMIOGRAFÍA', 306, 167.5, F.luxLight, 24, BLANCO);
  const region = String(data.region || '').trim();
  textoCentro(region, 306.3, 222, F.luxRegular, ajustarTam(region, F.luxRegular, 23.2, PORTADA_MAX_W, MIN_REGION), NEGRO);
  textoCentro(formatearFechaPdf(data.fecha), 312.5, 282, F.workLight, 15, GRIS_7F);

  dibujarImg(await plantilla('caja'), 40.0, 300.8, 545.0, 242.8);
  const paciente = String(data.nombrePaciente || '').trim();
  textoCentro(paciente, 312.3, 401, F.luxRegular, ajustarTam(paciente, F.luxRegular, 29.6, PACIENTE_MAX_W, MIN_PACIENTE), NEGRO);
  if (String(data.edad || '').trim()) textoCentro(`${String(data.edad).trim()} AÑOS`, 313.3, 422, F.workLight, 15, NEGRO);

  {
    const etq = ETIQUETA_MEDICO;
    const med = String(data.medico || '').trim().toUpperCase();
    const w1 = ancho(etq, F.luxRegular, 15);
    const w2 = ancho(med, F.workLight, 15);
    const x0 = 312 - (w1 + w2) / 2;
    texto(etq, x0, 581, F.luxRegular, 15, NEGRO);
    texto(med, x0 + w1, 581, F.workLight, 15, GRIS_7F);
  }

  /* ════════════════════ HOJA 2 · Motivo de envío ════════════════════ */
  nuevaPagina();
  textoCentro('Motivo de envío', 305.5, 111, F.luxRegular, 19.4, NEGRO);
  dibujarImg(await plantilla('dx'), 41.4, 136.1, 527.9, 79.8);
  texto('Dx', 50, 171.5, F.luxRegular, 20, NEGRO);
  texto('–', 79, 171.5, F.workLight, 20, NEGRO);
  const dx = String(data.dx || '').trim();
  texto(dx, 99.5, 171.5, F.workLight, ajustarTam(dx, F.workLight, 20, DX_MAX_W, MIN_DX), NEGRO);

  const columna = async (img, x, titulo, cxTitulo, items) => {
    dibujarImg(await plantilla(img), x, 209.0, 253.65, 282.85);
    textoCentro(titulo, cxTitulo, 260, F.luxRegular, 15, BLANCO);
    const dashX = x + 36.1;
    const textoX = x + 54.1;
    // Si no cabe, se reduce tamaño e interlineado proporcionalmente
    const { lineas, size, lh } = medidaColumna(items, F);
    let y = 345;
    for (const l of lineas) {
      texto('-', dashX, y, F.workLight, 12 * (size / 10.56), GRIS_7F);
      const r = dibujarParrafo([{ t: l, f: F.workLight, color: NEGRO }], textoX, y, COLUMNA.maxW, size, lh, { justificar: false });
      y = r.ultimaY + lh;
    }
  };
  await columna('datosClinicos', 43.9, 'DATOS CLÍNICOS', 172.3, data.datosClinicos);
  await columna('antecedentes', 313.2, 'ANTECEDENTES', 438.5, data.antecedentes);

  // Dibuja los párrafos de la conclusión separados por una línea en blanco; devuelve la y del último
  const dibujarConclusion = (ps, x, y0, maxW, size, lh) => {
    let y = y0, ultimaY = y0;
    for (const runs of ps) {
      ultimaY = dibujarParrafo(runs, x, y, maxW, size, lh).ultimaY;
      y = ultimaY + lh * 2;
    }
    return ultimaY;
  };

  dibujarImg(await plantilla('caja'), 41.4, 518.0, 527.9, 194.3);
  texto('CONCLUSIÓN.', 71, 553, F.workLight, 15, GRIS_7F);
  {
    const { ps, size, lh } = medidaConclusionMotivo(data, F);
    dibujarConclusion(ps, CONC_MOTIVO.x, CONC_MOTIVO.y0, CONC_MOTIVO.maxW, size, lh);
  }

  /* ════════════════════ Hojas de bloques (Neurografía / Miografía / Ecografía) ════════════════════ */
  const bloques = data.bloques || {};
  const orden = ['sensitiva', 'motora', 'especiales', 'miografia', 'ecografia'];
  const incluidos = orden.filter((id) => {
    const b = bloques[id];
    if (!b || b.incluir === false) return false;
    return (b.filas || []).some((f) => String(f.nombre || '').trim() || String(f.hallazgo || '').trim());
  });
  // El pie "respuesta normal" va en la última hoja de Miografía/Ecografía (o en la última de Neurografía)
  const idPie = [...incluidos].reverse()[0];
  const seccionesTituladas = new Set();

  for (const id of incluidos) {
    const cfg = BLOQUES_PDF[id];
    const b = bloques[id];
    const icono = await plantilla(cfg.icono);
    const encabezadoPagina = (conTitulo) => {
      nuevaPagina();
      if (conTitulo) textoDerecha(cfg.seccion, 524.5, 106, F.luxRegular, 28, NEGRO);
      dibujarImg(icono, 535.5, 79.4, 35.1, 35.1);
    };

    const primeraDeSeccion = !seccionesTituladas.has(cfg.seccion);
    seccionesTituladas.add(cfg.seccion);
    encabezadoPagina(primeraDeSeccion);

    // Encabezado de color + descripción fija
    dibujarImg(await plantilla(cfg.hdr), 41.4, 130.3, 524.3, cfg.hdrH);
    textoCentro(cfg.titulo, 302.5, cfg.tituloY, F.quando, 15, BLANCO);
    {
      // Descripción: la estándar conserva los cortes de línea de la plantilla; una editada se ajusta al ancho
      const d = lineasDescripcion(id, b, F);
      if (d) {
        const lineas = d.lineas.slice(0, DESC_MAX_LINEAS);
        const ys = lineas.length === cfg.descY.length
          ? cfg.descY
          : lineas.map((_, i) => (lineas.length === 1 ? 187.5 : 185.5 - (lineas.length - 2) * 4.5 + i * 9));
        lineas.forEach((linea, i) => textoCentro(linea, 302.5, ys[i], F.workLight, 8, GRIS_80, true));
      }
    }

    const imgFila = await plantilla(cfg.row);
    const imgNota = await plantilla('caja');
    let y = cfg.filasTop;
    const filas = (b.filas || []).filter(filaConTexto);
    // El bloque que lleva el pie no debe llegar a él
    const limite = id === idPie ? LIMITE_PIE : LIMITE_INFERIOR;

    for (const f of filas) {
      const { runs, alto } = medidaFila(id, f, F);
      if (y + alto > limite) {
        encabezadoPagina(false);
        y = 130.3;
      }
      dibujarImg(imgFila, FILA.x, y, FILA.w, alto);
      dibujarParrafo(runs, FILA.textoX, y + cfg.textoOff, FILA.textoDer - FILA.textoX, FILA.size, FILA.lh);
      y += alto + (FILA.paso - FILA.h);
    }

    const nota = String(b.nota || '').trim();
    if (nota) {
      const { runs, alto } = medidaNota(nota, F);
      let top = y - (FILA.paso - FILA.h) + NOTA.gap;
      if (top + alto > limite) {
        encabezadoPagina(false);
        top = 130.3;
      }
      dibujarImg(imgNota, NOTA.x, top, NOTA.w, alto);
      dibujarParrafo(runs, NOTA.textoX, top + NOTA.off, NOTA.textoDer - NOTA.textoX, NOTA.size, NOTA.lh, { justificar: false });
    }

    if (id === idPie) {
      const total = PIE_MIOGRAFIA.reduce((a, r) => a + ancho(r.t, F[r.f], 8), 0);
      let x = 305.5 - total / 2;
      for (const r of PIE_MIOGRAFIA) {
        texto(r.t, x, 718, F[r.f], 8, NEGRO, true);
        x += ancho(r.t, F[r.f], 8);
      }
    }
  }

  /* ════════════════════ Hoja final · Conclusión ════════════════════ */
  nuevaPagina();
  textoDerecha('Conclusión', 527, 106, F.luxRegular, 28, NEGRO);
  dibujarImg(await plantilla('hdrConclusion'), 41.4, 130.3, 524.4, 81.3);
  {
    const titulo = tituloConclusion(data);
    textoCentro(titulo, 302.5, 156, F.quando, ajustarTam(titulo, F.quando, 15, PORTADA_MAX_W), BLANCO);
  }
  textoCentro('Estudio con datos electrofisiológicos que sugieren:', 302.8, 190, F.workLight, 8, GRIS_80);
  dibujarImg(await plantilla('caja'), 42.1, 229.6, 524.9, 343.2);
  {
    const c = CONC_FINAL;
    const { ps, size, lh, corr, runsC, yCorr } = medidaConclusionFinal(data, F);
    dibujarConclusion(ps, c.x, c.y0, c.maxW, size, lh);
    if (corr) dibujarParrafo(runsC, c.corrX, yCorr, c.corrMaxW, c.corrSize, c.corrLh);
  }

  // Firma, datos del médico que realiza el estudio y logo
  dibujarImgContenida(await imagen(data.firma), 97.8, 596.5, 122.7, 56.6);
  {
    const { lineas, size } = medidaFirmante(data.firmante, F);
    lineas.forEach((l, i) => textoDerecha(l, 469.5, 606.5 + i * size * 1.18, F.workLight, size, GRIS_80));
  }
  dibujarImgContenida(await imagen(data.logo), 483.4, 587.2, 84.8, 84.8);

  AVISO_VALIDEZ.forEach((l, i) => textoCentro(l, 305.5, [694.5, 704.5, 715.5][i], F.luxLight, 8, NEGRO, true));

  /* ════════════════════ Anexo: resultados del equipo (PDF) ════════════════════ */
  const anexo = await bytes(data.anexoPdf);
  if (anexo) {
    try {
      const src = await PDFDocument.load(anexo, { ignoreEncryption: true });
      const copiadas = await pdf.copyPages(src, src.getPageIndices());
      copiadas.forEach((p) => pdf.addPage(p));
    } catch {
      // Si el PDF del equipo está dañado se genera el reporte sin anexo.
    }
  }

  return pdf.save();
}

/* Nombre de archivo legible: "mEDXpro ENMG Nombre Paciente.pdf" */
export function nombreArchivoEnmg(paciente) {
  const limpio = String(paciente || '').replace(/[\\/:*?"<>|_\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim();
  return `mEDXpro ENMG${limpio ? ` ${limpio}` : ''}.pdf`;
}
