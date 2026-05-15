'use client';
/*
 * RadiculopatiaNew/ReportFace.jsx
 * Layout horizontal: dos láminas (posterior + anterior) de columna vertebral.
 * Wizard jerárquico: Evolución → Nivel → Raíces/Lados → Intensidad → Pronóstico
 * Dos bases: Multinivel (motor) y Columna/BASE_* (sensitiva) – igual que en móvil.
 */

import { useSession } from 'next-auth/react';
import { useCallback, createContext, useContext, useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import './Style.css';

/* ─── Galería de tablas ───────────────────────────────────────────────────── */
const TABLAS_URL = 'https://backendmedxpro-tef2.onrender.com/pdfEducacion/Tablas';
const TABLAS = [
  { id: 'HALLAZGOS ELECTROFISIOLÓGICOS EN RADICULOPATÍA',                    file: 'ELECTROFISIOLOGICOS_RADI.png' },
  { id: 'HALLAZGOS ELECTROFISIÓLOGICOS EVOLUTIVOS EN RADICULOPATÍA',         file: 'EVOLUTIVOS_RADI.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                       file: 'LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                                              file: 'CRITERIOS_CIDP_AANEM.png' },
  { id: 'CRITERIOS DE LAMBERT ESCLEROSIS LATERAL AMIOTRÓFICA',               file: 'LAMBERT_ESCLEROSIS_LT.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (DOMINIO)',                                 file: 'CRITERIOS _AWAJI_2008_1.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (CATEGORÍA)',                               file: 'CRITERIOS _AWAJI_2008_2.png' },
  { id: 'COMPARACIÓN EL ESCORIAL / AWAJI 2008',                              file: 'COMPARACION_ESCORIAL.png' },
  { id: 'CRITERIOS POLINEUROPATÍA DESMIELINIZANTE/AXONAL',                   file: 'POLINEUROPATIA_DESMIELINIZANTE.png' },
  { id: 'PATRONES DE DISTRIBUCIÓN EN POLINEUROPATÍA',                        file: 'DISTRIBUCION_POLI.png' },
  { id: 'CUANTIFICACIÓN DE POLINEUROPATÍAS',                                 file: 'CUANTIFICACION_POLI.png' },
  { id: 'HALLAZGOS NEUROGRÁFICOS EN MIOPATÍAS',                              file: 'NEUROGRAFICO_MIO.png' },
  { id: 'HALLAZGOS MIOGRÁFICOS EN MIOPATÍAS',                                file: 'MIOGRAFICOS_MIO.png' },
  { id: 'HALLAZGOS DIFERENCIALES POR TIPOS DE MIOPATÍAS',                   file: 'TIPOS_MIOPATIAS.png' },
  { id: 'COMPARACIÓN MIOPATÍA/RADICULOPATÍA/UNIÓN NEUROMUSCULAR',            file: 'COMPARACION.png' },
  { id: 'SEVERIDAD EN MIOPATÍA',                                             file: 'SEVERIDAD_MIO.png' },
  { id: 'GRAVEDAD POR DECREMENTO ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',    file: 'DECREMENTO_ELEC.png' },
  { id: 'GRAVEDAD POR SFEMG ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',         file: 'SFEMG_ELEC.png' },
  { id: 'COORRELACIÓN PRUEBAS ELECTROFISIOLOGICAS/DATOS CLÍNICOS MG',        file: 'PRUEBAS_ELEC.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS SOMATOSENSORIALES Y MOTORES', file: 'POTENCIALES_EVO.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS VISUALES',        file: 'POTENCIALES_VISUALES.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS AUDITIVOS',       file: 'POTENCIALES_AUD.png' },
  { id: 'PRONÓSTICO ASOCIADO A POTENCIALES EVOCADOS',                        file: 'PRONOSTICO_ASOCIADO.png' },
  { id: 'SEVERIDAD POTENCIALES EVOCADOS MULTIMODALES',                       file: 'EVO_MULTIMODALES.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MS',          file: 'SOMATOSENSORIALES_MS.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MI',          file: 'SOMATOS_MI.png' },
  { id: 'MIOPATÍAS DISTALES',                                                file: 'MIOPATIAS_DISTAL.png' },
  { id: 'SÍNDROMES DE LESIÓN COMBINADA A PARES CRANEALES',                   file: 'PARES_CRANEALES.png' },
  { id: 'PRONÓSTICO EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',      file: 'DEFICIT_AXONAL.png' },
  { id: 'EVOLUCION EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',       file: 'DEFICIT_AXONAL2.png' },
  { id: 'COORRELACIÓN DE TIEMPO DE EVOLUCIÓN EN PLEXOPATÍAS',                file: 'EVOLUCION_PLEXO.png' },
  { id: 'PATRONES ELECTROFISIOLÓGICOS EN NEUROPATÍA',                        file: 'PATRONES_NEURO.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',                 file: 'ELECTROFISIOLOGICOS_DES.png' },
  { id: 'CRITERIOS DIAGNÓSTICOS ELECTROFISIOLÓGICOS PARA AIDP',              file: 'CRITERIOS_AIDP.png' },
  { id: 'DIFERENCIAS ELECTROFISIOLÓGICAS EN POLINEUROPATÍAS',                file: 'DIFERENCIAS_POLI.png' },
  { id: 'AANEM CRITERIOS PARA NEUROPATÍAS POR ATRAPAMIENTO',                 file: 'ATRAPAMIENTO.png' },
  { id: 'CLASIFICACIÓN DE SEDDON Y SUNDERLAND',                              file: 'Tabla38.png' },
  { id: 'POLINEUROPATÍAS DESMIELINIZANTES',                                  file: 'Tabla39.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – PADUA',                              file: 'Tabla40.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – CANTERBURY',                         file: 'Tabla41.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – HIRANI',                             file: 'Tabla42.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                        file: 'Tabla43.png' },
  { id: 'CRITERIOS CIDP AANEM',                                               file: 'Tabla44.png' },
];

/* ─── Crop Modal ──────────────────────────────────────────────────────────── */
function CropModal({ src, onConfirm, onClose }) {
  const imgRef    = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [sel, setSel]     = useState(null);
  const [drawing, setDrawing] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });

  const getRelPos = (e, el) => {
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onMouseDown = (e) => { const p = getRelPos(e, overlayRef.current); startRef.current = p; setSel({ x: p.x, y: p.y, w: 0, h: 0 }); setDrawing(true); };
  const onMouseMove = (e) => { if (!drawing) return; const p = getRelPos(e, overlayRef.current); setSel({ x: Math.min(startRef.current.x, p.x), y: Math.min(startRef.current.y, p.y), w: Math.abs(p.x - startRef.current.x), h: Math.abs(p.y - startRef.current.y) }); };
  const onMouseUp = () => setDrawing(false);

  const applyCrop = () => {
    if (!sel || sel.w < 5 || sel.h < 5) { onClose(); return; }
    const img = imgRef.current;
    const overlay = overlayRef.current;
    const scaleX = img.naturalWidth / overlay.clientWidth;
    const scaleY = img.naturalHeight / overlay.clientHeight;
    const canvas = canvasRef.current;
    canvas.width  = sel.w * scaleX;
    canvas.height = sel.h * scaleY;
    canvas.getContext('2d').drawImage(img, sel.x * scaleX, sel.y * scaleY, sel.w * scaleX, sel.h * scaleY, 0, 0, canvas.width, canvas.height);
    onConfirm(canvas.toDataURL('image/png'));
  };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:10200, background:'rgba(0,0,0,0.9)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:16 }}>
      <p style={{ color:'#fff', fontSize:13, marginBottom:10 }}>Arrastra para seleccionar el área a recortar</p>
      <div ref={overlayRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        style={{ position:'relative', cursor:'crosshair', maxWidth:'90vw', maxHeight:'70vh', userSelect:'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop" draggable={false} style={{ display:'block', maxWidth:'90vw', maxHeight:'70vh', objectFit:'contain' }} />
        {sel && sel.w > 2 && sel.h > 2 && (
          <div style={{ position:'absolute', left:sel.x, top:sel.y, width:sel.w, height:sel.h, border:'2px dashed #f97316', background:'rgba(249,115,22,0.15)', pointerEvents:'none' }} />
        )}
      </div>
      <canvas ref={canvasRef} style={{ display:'none' }} />
      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <button onClick={applyCrop} style={{ padding:'9px 28px', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer' }}>Aplicar recorte</button>
        <button onClick={onClose}  style={{ padding:'9px 28px', borderRadius:10, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', fontSize:14, cursor:'pointer' }}>Cancelar</button>
      </div>
    </div>
  );
}

/* ─── GaleriaTablas ───────────────────────────────────────────────────────── */
function GaleriaTablas({ onSelect, onClose }) {
  const [busqueda, setBusqueda] = useState('');
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10100, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#2a2a2a', borderRadius:14, width:'100%', maxWidth:480, maxHeight:'85vh', display:'flex', flexDirection:'column', border:'1px solid rgba(255,255,255,0.1)', overflow:'hidden' }}>
        <div style={{ padding:'18px 20px 12px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ color:'#fff', fontSize:17, fontWeight:700, margin:'0 0 12px', textAlign:'center' }}>Selecciona una imagen:</h3>
          <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar imagen..." autoFocus
            style={{ width:'100%', boxSizing:'border-box', background:'#444', border:'none', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:14, outline:'none' }} />
        </div>
        <div style={{ flex:1, overflowY:'auto' }}>
          {filtradas.length === 0
            ? <p style={{ color:'rgba(255,255,255,0.4)', fontStyle:'italic', padding:20, textAlign:'center', margin:0 }}>Sin resultados.</p>
            : filtradas.map((t, i) => (
                <button key={i} onClick={() => onSelect(`${TABLAS_URL}/${t.file}`)}
                  style={{ width:'100%', textAlign:'left', padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.07)', color:'#fff', fontSize:14, cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {t.id}
                </button>
              ))
          }
        </div>
        <div style={{ padding:'12px 20px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onClose} style={{ width:'100%', padding:'11px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer' }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Contexto ────────────────────────────────────────────────────────────── */
const ReportContext = createContext({ conclusions: [], addConclusion: () => {}, removeConclusion: () => {} });

/* ─── Bases de imágenes (igual que en móvil) ─────────────────────────────── */
const BASE_POST_MOTOR = '/RadiculopatiaImg/Multinivel/RA_Columna_1_FondoB.png';
const BASE_ANT_MOTOR  = '/RadiculopatiaImg/Multinivel/RA_Columna_2_FondoB.png';
const BASE_POST_SENS  = '/RadiculopatiaImg/Columna/BASE_POSTERIOR.png';
const BASE_ANT_SENS   = '/RadiculopatiaImg/Columna/BASE_ANTERIOR.png';

/* ─── Cruces (mismos datos que móvil) ────────────────────────────────────── */
const CROSS_IMG = {
  1: '/Cruces/S_Cruz1.png',
  2: '/Cruces/S_Cruz2.png',
  3: '/Cruces/S_Cruz3.png',
  4: '/Cruces/S_Cruz4.png',
};
const CROSS_RED_IMG = {
  1: '/Cruces/S_Cruz_Rojo01.png',
  2: '/Cruces/S_Cruz_Rojo02.png',
  3: '/Cruces/S_Cruz_Rojo03.png',
  4: '/Cruces/S_Cruz_Rojo04.png',
};

/* posición vertical base por nivel (fracción de altura del panel) */
const LEVEL_TOP = {
  C4:0.055, C5:0.075, C6:0.095, C7:0.105, C8:0.135, T1:0.165,
  L1:0.498, L2:0.525, L3:0.557, L4:0.588, L5:0.624, S1:0.663, S2:0.690,
};

/* desplazamiento horizontal por [nivel][índice 1-4] (fracción de ancho del panel) */
const OFFSET = {
  C4:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438 },
  C5:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  C6:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  C7:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  C8:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  T1:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  L1:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  L2:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  L3:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  L4:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  L5:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  S1:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
  S2:{ 1:0.400+0.44, 2:0.390+0.44, 3:0.380+0.44, 4:0.370+0.438  },
};

/* ajuste vertical adicional por [nivel][índice] */
const V_DELTAS = {
  C4:{ 1:0.02-0.069,  2:+0.00-0.049,    3:-0.01-0.040,  4:+0.01-0.059 },
  C5:{ 1:+0.03-0.070, 2:+0.01-0.050,    3:-0.02-0.020,  4:+0.00-0.040 },
  C6:{ 1:+0.05-0.085, 2:+0.0125-0.048,  3:-0.02-0.016,  4:+0.02-0.055 },
  C7:{ 1:+0.04-0.061, 2:+0.04-0.061,    3:-0.02-0.002,  4:+0.02-0.041 },
  C8:{ 1:+0.03-0.050, 2:+0.03-0.050,    3:-0.01-0.010,  4:+0.00-0.019 },
  T1:{ 1:+0.02-0.030, 2:+0.00-0.010,    3:-0.00-0.009,  4:+0.00-0.010 },
  L1:{ 1:+0.01+0.065, 2:+0.01+0.065,    3:+0.01+0.065,  4:+0.01+0.065 },
  L2:{ 1:+0.02+0.065, 2:+0.01+0.075,    3:+0.01+0.075,  4:+0.00+0.084 },
  L3:{ 1:+0.03+0.065, 2:+0.02+0.074,    3:+0.02+0.074,  4:+0.01+0.085 },
  L4:{ 1:+0.04+0.065, 2:+0.04+0.065,    3:+0.04+0.065,  4:+0.04+0.065 },
  L5:{ 1:+0.05+0.065, 2:+0.03+0.084,    3:+0.03+0.085,  4:+0.03+0.085 },
  S1:{ 1:+0.087+0.039,2:+0.090+0.035,   3:+0.090+0.036, 4:+0.090+0.036 },
  S2:{ 1:+0.03+0.109, 2:+0.090+0.048,   3:+0.090+0.049, 4:+0.090+0.049 },
};

/* Nivel web → clave de LEVEL_TOP/OFFSET/V_DELTAS */
const NIVEL_TO_CROSS_KEY = {
  C5:'C5', C6:'C6', C7:'C7', C8:'C8', T1:'T1',
  'L1-L2':'L2', 'L3-L4':'L4', L5:'L5', S1:'S1',
};

/* Genera lista de metadatos de cruces para un panel (side='L' → post, side='R' → ant) */
function buildCrossMetas(roots, lados, red = false) {
  const out = [];
  roots.forEach(root => {
    const lvl = NIVEL_TO_CROSS_KEY[root];
    if (!lvl || LEVEL_TOP[lvl] == null) return;
    const topBase = LEVEL_TOP[lvl];
    lados.forEach(lado => {
      const side = (lado === 'Izquierdo' || lado === 'Bilateral') ? 'L' : 'R';
      const side2 = (lado === 'Derecho'   || lado === 'Bilateral') ? 'R' : null;
      const addSide = (s) => {
        for (let n = 1; n <= 4; n++) {
          const off = OFFSET[lvl]?.[n];
          const delta = V_DELTAS[lvl]?.[n] ?? 0;
          if (off == null) continue;
          out.push({
            key: `${root}_${s}${n}${red?'_red':''}`,
            src: red ? CROSS_RED_IMG[n] : CROSS_IMG[n],
            topPct: topBase + delta,
            offPct: off,
            side: s,
          });
        }
      };
      addSide(side);
      if (side2) addSide(side2);
    });
  });
  return out;
}

/* ─── Overlays de raíces nerviosas por nivel de checkbox ────────────────── */
/* Las llaves son los niveles exactos que usan los IDs de checkbox (C4-T1, L1-S2) */
const NIVEL_OVERLAYS = {
  C4: {
    post: { izq: '/RadiculopatiaImg/C5_izquierdo_anterior.png',  der: '/RadiculopatiaImg/C5_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C5C6izquierdoposterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C5C6derechoposterior.png' },
  },
  C5: {
    post: { izq: '/RadiculopatiaImg/C5_izquierdo_anterior.png',  der: '/RadiculopatiaImg/C5_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C5C6izquierdoposterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C5C6derechoposterior.png' },
  },
  C6: {
    post: { izq: '/RadiculopatiaImg/C6_izquierdo_anterior.png',  der: '/RadiculopatiaImg/C6_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C5C6izquierdoposterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C5C6derechoposterior.png' },
  },
  C7: {
    post: { izq: '/RadiculopatiaImg/C7_izquierdo_anterior.png',  der: '/RadiculopatiaImg/C7_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C7_izquierdo_posterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C7_derecho_posterior.png' },
  },
  C8: {
    post: { izq: '/RadiculopatiaImg/C8_izquierdo_anterior.png',  der: '/RadiculopatiaImg/C8_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C8_izquierdo_posterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C8_derecho_posterior.png' },
  },
  T1: {
    post: { izq: '/RadiculopatiaImg/T1_izquierdo_anterior.png',  der: '/RadiculopatiaImg/T1_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C8_izquierdo_posterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C8_derecho_posterior.png' },
  },
  /* Lumbar: L1/L2 → mismo overlay L1-L2; L3/L4 → mismo overlay L3-L4 */
  L1: {
    post: { izq: '/RadiculopatiaImg/L1-L2_izquierdo_anterior.png', der: '/RadiculopatiaImg/L1-L2_derecho_anterior.png' },
    ant:  { izq: null, der: null },
  },
  L2: {
    post: { izq: '/RadiculopatiaImg/L1-L2_izquierdo_anterior.png', der: '/RadiculopatiaImg/L1-L2_derecho_anterior.png' },
    ant:  { izq: null, der: null },
  },
  L3: {
    post: { izq: '/RadiculopatiaImg/L3-L4_izquierdo_anterior.png', der: '/RadiculopatiaImg/L3-L4_derecho_anterior.png' },
    ant:  { izq: null, der: null },
  },
  L4: {
    post: { izq: '/RadiculopatiaImg/L3-L4_izquierdo_anterior.png', der: '/RadiculopatiaImg/L3-L4_derecho_anterior.png' },
    ant:  { izq: null, der: null },
  },
  L5: {
    post: { izq: '/RadiculopatiaImg/L5_izquierdo_anterior.png',  der: '/RadiculopatiaImg/L5_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/L5_izquierdo_posterior.png', der: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/L5_derecho_posterior.png' },
  },
  S1: {
    post: { izq: '/RadiculopatiaImg/S1_izquierdo_anterior.png',  der: '/RadiculopatiaImg/S1_derecho_anterior.png' },
    ant:  { izq: '/RadiculopatiaImg/S1_izquierdo_posterior.png', der: '/RadiculopatiaImg/S1_derecho_posterior.png' },
  },
  S2: {
    post: { izq: null, der: null },
    ant:  { izq: null, der: null },
  },
};

/* Dado un array de IDs de checkbox ["C5_L1","C5_R2",...], calcula los overlays únicos */
function computeOverlaysFromChecks(checkedL, checkedR) {
  const postSet = new Set();
  const antSet  = new Set();
  const lvlSide = {}; // { lvl: { L: bool, R: bool } }
  [...checkedL].forEach(id => {
    const lvl = id.split('_')[0];
    if (!lvlSide[lvl]) lvlSide[lvl] = {};
    lvlSide[lvl].L = true;
  });
  [...checkedR].forEach(id => {
    const lvl = id.split('_')[0];
    if (!lvlSide[lvl]) lvlSide[lvl] = {};
    lvlSide[lvl].R = true;
  });
  Object.entries(lvlSide).forEach(([lvl, sides]) => {
    const ov = NIVEL_OVERLAYS[lvl];
    if (!ov) return;
    if (sides.L) {
      if (ov.post.izq) postSet.add(ov.post.izq);
      if (ov.ant.izq)  antSet.add(ov.ant.izq);
    }
    if (sides.R) {
      if (ov.post.der) postSet.add(ov.post.der);
      if (ov.ant.der)  antSet.add(ov.ant.der);
    }
  });
  return { post: [...postSet], ant: [...antSet] };
}

/* Dado un array de IDs de checkbox, genera los metadatos de cruces */
function computeCrossesFromChecks(checkedL, checkedR, red = false) {
  const out = [];
  const seen = new Set();
  [...checkedL, ...checkedR].forEach(id => {
    if (seen.has(id)) return;
    seen.add(id);
    const parts = id.split('_');
    const lvl   = parts[0];
    const sideN = parts[1]; // 'L1'..'L4' o 'R1'..'R4'
    const side  = sideN[0];
    const n     = parseInt(sideN[1], 10);
    if (!LEVEL_TOP[lvl] || !OFFSET[lvl]?.[n]) return;
    const topPct = LEVEL_TOP[lvl] + (V_DELTAS[lvl]?.[n] ?? 0);
    const offPct = OFFSET[lvl][n];
    out.push({ key: red ? `${id}_red` : id, src: red ? CROSS_RED_IMG[n] : CROSS_IMG[n], topPct, offPct, side });
  });
  return out;
}

/* ─── Overlays de región (multinivel) ───────────────────────────────────── */
const REGION_OVERLAYS = {
  Cervical:    { post: '/RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',  ant: '/RadiculopatiaImg/Multinivel/Columna_Cervical_D.png'  },
  Torácica:    { post: '/RadiculopatiaImg/Multinivel/Columna_Toracica_I.png', ant: '/RadiculopatiaImg/Multinivel/Columna_Toracica_D.png'  },
  Lumbosacro:  { post: '/RadiculopatiaImg/Multinivel/Columna_Lumbar_I.png',  ant: '/RadiculopatiaImg/Multinivel/Columna_Lumbar_D.png'  },
};

/* ─── Overlays sensitivos ────────────────────────────────────────────────── */
const SENS_OVERLAYS = {
  'C6-C7': {
    post: {
      Izquierda: '/RadiculopatiaImg/SENSITIVAS/C6-C7izquierdopos.png',
      Derecha:   '/RadiculopatiaImg/SENSITIVAS/C6-C7derechopos.png',
      Bilateral: '/RadiculopatiaImg/SENSITIVAS/C6-C7bilateralpos.png',
    },
    ant: {
      Izquierda: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C6s_anterior_izquierdo.png',
      Derecha:   '/RadiculopatiaImg/RadiculopatiaPosteriorImg/C6s_anterior_derecho.png',
      Bilateral: null,
    },
  },
  S1: {
    post: {
      Izquierda: '/RadiculopatiaImg/SENSITIVAS/S1izquierdapos.png',
      Derecha:   '/RadiculopatiaImg/SENSITIVAS/S1derechapos.png',
      Bilateral: '/RadiculopatiaImg/SENSITIVAS/S1bilateralpos.png',
    },
    ant: {
      Izquierda: '/RadiculopatiaImg/RadiculopatiaPosteriorImg/S1s_posterior_izquierdo.png',
      Derecha:   '/RadiculopatiaImg/RadiculopatiaPosteriorImg/S1s_posterior_derecho.png',
      Bilateral: null,
    },
  },
};

const CERVICAL_LEVELS    = ['C5','C6','C7','C8','T1'];
const LUMBOSACRAL_LEVELS = ['L1-L2','L3-L4','L5','S1'];
const SENSITIVA_LEVELS   = ['C6-C7','S1'];

/* ─── Diagnóstico estructurado (port del móvil) ───────────────────────────── */

const INTENSITY_SIGNS = { leve: '(+/+)', moderada: '(++)', severa: '(+++)', difusa: '(++++)' };

const capWord = (w) => w ? w.charAt(0).toUpperCase() + w.slice(1) : w;

const parseIntensidadConParentesis = (txt) => {
  const s = (txt || '').trim();
  const low = s.toLowerCase();
  const key = low.includes('leve') ? 'leve' : low.includes('moderada') ? 'moderada' : low.includes('severa') ? 'severa' : low.includes('difusa') ? 'difusa' : '';
  if (!key) return s;
  const yaTraeParens = /\(.+?\)/.test(low);
  const signos = yaTraeParens ? (s.match(/\(.+?\)/)?.[0] || INTENSITY_SIGNS[key]) : INTENSITY_SIGNS[key];
  const tail = s.replace(new RegExp(`^\\s*(${key})\\s*(\\(.+?\\))?\\s*`, 'i'), '').trim();
  const base = `${key} ${signos}`;
  return tail ? `${base} ${tail}` : base;
};

const canonicalizePrognosis = (raw) => {
  const s = raw.toLowerCase();
  if (s.includes('complet')) return 'Recuperación completa';
  if (s.includes('parcial')) return 'Recuperación parcial funcional';
  if (s.includes('pobre'))   return 'Recuperación pobre no funcional';
  if (s.includes('nula') || s.includes('nulo')) return 'Recuperación nula (en fase de secuela)';
  return 'Recuperación completa';
};

function getPair(t) {
  const low = t.toLowerCase();
  if (low.startsWith('con progresión') || low.startsWith('con progresion') ||
      low.startsWith('sin progresión') || low.startsWith('sin progresion')) return ['Progresión', t];
  if (low.startsWith('progresión') || low.startsWith('progresion')) return ['Progresión', t.replace(/^progres(ión|ion)\s+/i, '')];
  if (/^tor[aá]cica:\s*/i.test(t)) return ['Nivel', t.replace(/^tor[aá]cica:\s*/i, '')];
  if (low.startsWith('polisegmentario')) return ['Ubicación', t.replace(/^polisegmentario\s*/i, '')];
  if (/^niveles\s+tor[aá]cicas:\s*/i.test(t)) return ['Nivel', t.replace(/^niveles\s+tor[aá]cicas:\s*/i, '')];
  if (/^con\s+agudizaci[oó]n\s+nivel\s+tor[aá]cica:\s*/i.test(t)) return ['Nivel de agudización', t.replace(/^con\s+agudizaci[oó]n\s+nivel\s+tor[aá]cica:\s*/i, '')];
  if (low.startsWith('radiculopatía')) return ['Evolución', t];
  if (low.startsWith('fase')) return ['Fase', t.replace(/^fase\s+/i, '')];
  if (low.startsWith('nivel') || low.includes('multinivel')) return ['Nivel', t.replace(/^nivel\s+/i, '')];
  if (low.includes('agudización nivel')) return ['Nivel de agudización', t.replace(/^con agudización nivel\s+/i, '')];
  if (low.startsWith('intensidad')) return ['Intensidad', t.replace(/^intensidad\s+/i, '')];
  if (low.includes('reinervación')) return ['Reinervación', t.replace(/^con\s+/i, '')];
  if (low.startsWith('pronóstico') || low.startsWith('pronostico')) return ['Pronóstico', canonicalizePrognosis(t)];
  return null;
}

const ORDER = ['Evolución', 'Fase', 'Patología', 'Nivel', 'Ubicación', 'Nivel de agudización', 'Intensidad', 'Progresión', 'Reinervación', 'Pronóstico'];

const ubicacionAplanadaParaReporte = (s) => {
  if (!s) return '';
  let norm = s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  norm = norm.replace(/\s+y\s+/g, ', ');
  const mapPretty = { cervical: 'cervical', toracica: 'torácica', toracico: 'torácica', lumbosacro: 'lumbosacra', lumbosacra: 'lumbosacra' };
  const seen = new Set();
  const partes = norm.split(',').map(p => p.trim()).filter(Boolean).map(p => mapPretty[p] || p).filter(p => { if (seen.has(p)) return false; seen.add(p); return true; });
  if (!partes.length) return '';
  let txt = partes.join(', ');
  if (partes.length > 1) txt = txt.replace(/, ([^,]+)$/, ' y $1');
  return txt;
};

const formatLista = (label, rawTxt) => {
  const txt = rawTxt.trim();
  if (label === 'Evolución') {
    const t = txt.replace(/^Radiculopatía\s*/i, '').trim();
    return { label: 'Evolución', txt: t ? t.charAt(0).toUpperCase() + t.slice(1) : t };
  }
  if (label === 'Reinervación') {
    const t = txt.toLowerCase();
    if (t.includes('sin')) return { label: 'Reinervación', txt: 'Ausente' };
    if (t.includes('mínima') || t.includes('minima')) return { label: 'Reinervación', txt: 'Mínima' };
    if (t.includes('abundante')) return { label: 'Reinervación', txt: 'Abundante' };
    return { label: 'Reinervación', txt: 'Mínima' };
  }
  if (label === 'Progresión') {
    const t = txt.toLowerCase();
    if (t.startsWith('con progresión') || t.startsWith('con progresion')) return { label: 'Progresión', txt: 'Progresión distal a miotomas' };
    if (t.startsWith('sin progresión') || t.startsWith('sin progresion')) return { label: 'Progresión', txt: 'Sin progresión distal a miotomas' };
  }
  if (label === 'Intensidad') {
    const withParen = parseIntensidadConParentesis(txt);
    const m = withParen.match(/^(leve|moderada|severa|difusa)\s*(\(.+?\))?/i);
    if (m) {
      const palabra = capWord(m[1].toLowerCase());
      const signos  = m[2] || INTENSITY_SIGNS[m[1].toLowerCase()];
      const suffix  = withParen.slice(m[0].length).trim();
      return { label: 'Intensidad', txt: `${palabra} ${signos}${suffix ? ` ${suffix}` : ''}` };
    }
    return { label: 'Intensidad', txt: withParen };
  }
  if (label === 'Fase') return { label: 'Fase', txt: capWord(txt) };
  if (label === 'Ubicación') {
    const u = ubicacionAplanadaParaReporte(txt);
    return { label: 'Ubicación', txt: `Polisegmentaria a nivel ${u}` };
  }
  if (label === 'Nivel') return { label: 'Nivel', txt };
  return { label, txt };
};

const buildDiagnostico = (items) => {
  const dict = {};
  items.forEach(t => { const p = getPair(t); if (p) dict[p[0]] = p[1]; });
  const evolucion = (dict['Evolución'] || 'Radiculopatía').replace(/^Radiculopatía/i, 'Radiculopatía');
  const fase      = (dict['Fase'] || '').trim();
  const nivel     = (dict['Nivel'] || '').trim();
  const nivelAgu  = (dict['Nivel de agudización'] || '').trim();
  const intenRaw  = (dict['Intensidad'] || '').replace(/^Intensidad\s+/i, '').trim();
  const prog      = (dict['Progresión'] || '').trim();
  const reinRaw   = (dict['Reinervación'] || '').trim();
  const pronRaw   = (dict['Pronóstico'] || '').trim();
  const ubic      = (dict['Ubicación'] || '').trim();
  const faseMin = fase ? fase.toLowerCase() : '';
  const nivelCompuesto = nivelAgu ? `${nivel} con agudización ${nivelAgu}` : nivel;
  let head = `${evolucion} ${faseMin}`.replace(/\s+/g, ' ').trim();
  if (ubic) {
    const uRep = ubicacionAplanadaParaReporte(ubic);
    head += `${head ? ' ' : ''}polisegmentaria a nivel ${uRep}`;
  } else if (nivelCompuesto) {
    head += `${head ? ' ' : ''}${nivelCompuesto}`;
  }
  if (intenRaw) {
    const inten = parseIntensidadConParentesis(intenRaw);
    head += `${head ? ', ' : ''}intensidad ${inten}`;
  }
  if (prog) head += ` ${prog}`;
  head = head.replace(/\s+/g, ' ').trim() + '.';
  let rein = '';
  if (reinRaw) {
    let r = reinRaw.replace(/^con\s+/i, '').replace(/^sin\s+/i, 'Sin ');
    r = r.replace(/^reinervación/i, 'Reinervación');
    rein = r;
  }
  let pron = '';
  if (pronRaw) pron = `pronóstico de ${pronRaw.toLowerCase()}.`;
  let tail = '';
  if (rein && pron) tail = `${rein}; ${pron}`;
  else if (rein)    tail = `${rein}.`;
  else if (pron)    tail = pron.charAt(0).toUpperCase() + pron.slice(1);
  return tail ? `${head}\n${tail}` : head;
};

/* ─── UI helpers ──────────────────────────────────────────────────────────── */
function StepTitle({ children }) {
  return <p className="text-orange-400 text-xs font-bold tracking-widest mb-3 mt-1 uppercase">{children}</p>;
}

function NavRow({ onBack, onReset, onPdf }) {
  return (
    <div className="flex gap-2 mb-3">
      <button onClick={onBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar
      </button>
      <button onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
      </button>
      {onPdf && (
        <button onClick={onPdf}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-md">
          PDF
        </button>
      )}
    </div>
  );
}

function ChoiceBtn({ label, onPress }) {
  return (
    <button
      className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white text-sm font-medium transition-all"
      onClick={onPress}>
      {label}
    </button>
  );
}

function SkipButton({ onPress, label = 'Saltar →' }) {
  return (
    <button onClick={onPress}
      className="w-full mt-2 px-4 py-2 rounded-lg border border-dashed border-white/20 text-slate-400 text-xs hover:border-white/40 hover:text-white transition-colors">
      {label}
    </button>
  );
}

function ToggleBtn({ label, active, onPress }) {
  return (
    <button onClick={onPress}
      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all mr-1.5 mb-1.5 ${active ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-white hover:bg-orange-500/20'}`}>
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/* PASOS DEL WIZARD                                                          */
/* ══════════════════════════════════════════════════════════════════════════ */

/* A – Evolución */
function StepA({ goTo, setEvo, addText, setFlowType, resetAll }) {
  const opciones = [
    { nombre: 'Aguda',             texto: 'Radiculopatía aguda',     flow: 'Aguda'    },
    { nombre: 'Subaguda',          texto: 'Radiculopatía subaguda',  flow: 'Subaguda' },
    { nombre: 'Crónica',           texto: 'Radiculopatía crónica',   flow: 'Crónica'  },
    { nombre: 'Crónica agudizada', texto: 'RADICULOPATÍA CRÓNICA',   flow: 'Crónica agudizada' },
    { nombre: 'Sensitiva',         texto: 'Radiculopatía sensitiva', flow: 'Sensitiva' },
  ];
  return (
    <div>
      <StepTitle>Evolución</StepTitle>
      {opciones.map(op => (
        <ChoiceBtn key={op.nombre} label={op.nombre.toUpperCase()} onPress={() => {
          setEvo(op.nombre);
          setFlowType(op.flow);
          addText(op.texto);
          if (op.flow === 'Sensitiva') goTo('S_PATOLOGIA');
          else if (op.flow === 'Crónica') goTo('E_FASE');
          else goTo('B_NIVEL');
        }} />
      ))}
    </div>
  );
}

/* E_FASE – Solo Crónica */
function StepEFase({ goTo, addText, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => goTo('A')} onReset={resetAll} />
      <StepTitle>Fase</StepTitle>
      {['Activa', 'Inactiva', 'Antigua'].map(f => (
        <ChoiceBtn key={f} label={f.toUpperCase()} onPress={() => { addText(' ' + f); goTo('B_NIVEL'); }} />
      ))}
    </div>
  );
}

/* ─── Constantes internas del nivel ─────────────────────────────────────── */
const CERVICAL_LVL  = ['C5','C6','C7','C8','T1'];
const LUMBO_LVL     = ['L1','L2','L3','L4','L5','S1','S2'];

/* B – Nivel (accordion igual que móvil) */
/* checkedL_C, checkedR_C, checkedL_L, checkedR_L viven en el padre para que  */
/* los overlays y cruces se actualicen en tiempo real al marcar/desmarcar.      */
function StepBNivel({
  goTo, evo, flowType, addText, addRegionOverlay, resetAll,
  checkedL_C, setCheckedL_C, checkedR_C, setCheckedR_C,
  checkedL_L, setCheckedL_L, checkedR_L, setCheckedR_L,
  checkedL_C_A, setCheckedL_C_A, checkedR_C_A, setCheckedR_C_A,
  checkedL_L_A, setCheckedL_L_A, checkedR_L_A, setCheckedR_L_A,
  agudiPhase, setAgudiPhase,
}) {
  const [expandedNivel, setExpandedNivel] = useState(null);
  const [expandedVertC, setExpandedVertC] = useState(null);
  const [expandedVertL, setExpandedVertL] = useState(null);
  const [toracicoTxt,   setToracicoTxt]   = useState('');

  const isCroAgu = flowType === 'Crónica agudizada';
  const backStep = evo === 'Crónica' ? 'E_FASE' : 'A';
  const handleBack = () => {
    if (isCroAgu && agudiPhase) {
      setAgudiPhase(false);
      setCheckedL_C_A([]); setCheckedR_C_A([]);
      setCheckedL_L_A([]); setCheckedR_L_A([]);
    } else goTo(backStep);
  };

  /* "solo uno por lado por nivel" – igual que toggleOnePerSide móvil */
  const toggleOne = (setList, id) => {
    const [lvl, sideN] = id.split('_');
    const side = sideN[0];
    setList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev.filter(x => !x.startsWith(`${lvl}_${side}`)), id];
    });
  };

  /* Texto final Cervical → avanza (visuales ya están en tiempo real) */
  const finalizarCervical = () => {
    const lvlOf = id => id.split('_')[0];
    const srcL = agudiPhase ? checkedL_C_A : checkedL_C;
    const srcR = agudiPhase ? checkedR_C_A : checkedR_C;
    const setL = new Set(srcL.map(lvlOf));
    const setR = new Set(srcR.map(lvlOf));
    const left = [], right = [], bilateral = [];
    CERVICAL_LVL.forEach(v => {
      const l = setL.has(v), r = setR.has(v);
      if (l && r) bilateral.push(v); else if (l) left.push(v); else if (r) right.push(v);
    });
    if (!left.length && !right.length && !bilateral.length) return;
    const segs = [];
    if (left.length)      segs.push(`${left.join(', ')} izquierda`);
    if (right.length)     segs.push(`${right.join(', ')} derecha`);
    if (bilateral.length) segs.push(`${bilateral.join(', ')} bilateral`);
    let res = segs.join(', ');
    if (segs.length > 1) res = res.replace(/, ([^,]+)$/, ' Y $1');
    const total = left.length + right.length + bilateral.length;
    const prefix = agudiPhase ? 'con agudización nivel' : 'nivel';
    addText(total >= 3 ? `${prefix} ${res} (multinivel)` : `${prefix} ${res}`);
    addRegionOverlay('Cervical');
    if (isCroAgu && !agudiPhase) { setAgudiPhase(true); }
    else goTo('E_INTENSIDAD');
  };

  /* Texto final Lumbosacro → avanza */
  const finalizarLumbo = () => {
    const lvlOf = id => id.split('_')[0];
    const srcL = agudiPhase ? checkedL_L_A : checkedL_L;
    const srcR = agudiPhase ? checkedR_L_A : checkedR_L;
    const setL = new Set(srcL.map(lvlOf));
    const setR = new Set(srcR.map(lvlOf));
    const left = [], right = [], bilateral = [];
    LUMBO_LVL.forEach(v => {
      const l = setL.has(v), r = setR.has(v);
      if (l && r) bilateral.push(v); else if (l) left.push(v); else if (r) right.push(v);
    });
    if (!left.length && !right.length && !bilateral.length) return;
    const segs = [];
    if (left.length)      segs.push(`${left.join(', ')} izquierda`);
    if (right.length)     segs.push(`${right.join(', ')} derecha`);
    if (bilateral.length) segs.push(`${bilateral.join(', ')} bilateral`);
    let res = segs.join(', ');
    if (segs.length > 1) res = res.replace(/, ([^,]+)$/, ' Y $1');
    const total = left.length + right.length + bilateral.length;
    const prefix = agudiPhase ? 'con agudización nivel' : 'nivel';
    addText(total >= 3 ? `${prefix} ${res} (multinivel)` : `${prefix} ${res}`);
    addRegionOverlay('Lumbosacro');
    if (isCroAgu && !agudiPhase) { setAgudiPhase(true); }
    else goTo('E_INTENSIDAD');
  };

  /* Torácica */
  const finalizarToracica = () => {
    if (!toracicoTxt.trim()) return;
    const prefix = agudiPhase ? 'con agudización nivel torácica:' : 'niveles Torácicas:';
    addText(`${prefix} ${toracicoTxt.trim()}`);
    addRegionOverlay('Torácica');
    if (isCroAgu && !agudiPhase) { setAgudiPhase(true); }
    else goTo('E_INTENSIDAD');
  };

  /* Checkbox row – igual que la app móvil: cuadro + número al lado */
  const ChkRow = ({ lvl, side, checked, setList }) => (
    <div style={{ marginBottom:6 }}>
      <span style={{ color:'rgba(255,255,255,0.55)', fontSize:10, display:'block', marginBottom:3 }}>{side}</span>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {[1,2,3,4].map(i => {
          const id = `${lvl}_${side[0] === 'I' ? 'L' : 'R'}${i}`;
          const on = checked.includes(id);
          return (
            <button key={id} onClick={() => toggleOne(setList, id)}
              style={{ display:'flex', alignItems:'center', gap:5, background:'transparent', border:'none', cursor:'pointer', padding:0 }}>
              <span style={{ width:18, height:18, borderRadius:3, border:`1.5px solid ${on ? '#f97316' : 'rgba(255,255,255,0.5)'}`, background: on ? '#f97316' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {on && <svg width={10} height={10} viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </span>
              <span style={{ color:'#fff', fontSize:13 }}>{i}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const AccHeader = ({ label, open, onToggle }) => (
    <button onClick={onToggle} style={{ width:'100%', textAlign:'left', padding:'8px 10px', marginBottom:2, borderRadius:8, background: open ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)', border:`1px solid ${open ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.1)'}`, color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', justifyContent:'space-between' }}>
      {label}<span>{open ? '−' : '+'}</span>
    </button>
  );

  const VertHeader = ({ label, open, onToggle }) => (
    <button onClick={onToggle} style={{ width:'100%', textAlign:'left', padding:'5px 8px', marginBottom:2, borderRadius:6, background: open ? 'rgba(249,115,22,0.1)' : 'rgba(255,255,255,0.03)', border:`1px solid ${open ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.08)'}`, color:'rgba(255,255,255,0.8)', fontSize:11, fontWeight:600, cursor:'pointer', display:'flex', justifyContent:'space-between' }}>
      {label}<span style={{ fontSize:10 }}>{open ? '−' : '+'}</span>
    </button>
  );

  return (
    <div>
      <NavRow onBack={handleBack} onReset={resetAll} />
      <StepTitle>{(isCroAgu && agudiPhase) ? 'Agudización' : 'Nivel'}</StepTitle>

      {/* ── Cervical ── */}
      <AccHeader label="CERVICAL" open={expandedNivel === 'Cervical'} onToggle={() => setExpandedNivel(p => p === 'Cervical' ? null : 'Cervical')} />
      {expandedNivel === 'Cervical' && (
        <div style={{ padding:'6px 4px 8px', marginBottom:4 }}>
          {CERVICAL_LVL.map(v => (
            <div key={v}>
              <VertHeader label={v} open={expandedVertC === v} onToggle={() => setExpandedVertC(p => p === v ? null : v)} />
              {expandedVertC === v && (
                <div style={{ padding:'6px 8px 8px', background:'rgba(255,255,255,0.02)', borderRadius:6, marginBottom:4 }}>
                  <ChkRow lvl={v} side="Izquierdo" checked={agudiPhase ? checkedL_C_A : checkedL_C} setList={agudiPhase ? setCheckedL_C_A : setCheckedL_C} />
                  <ChkRow lvl={v} side="Derecho"   checked={agudiPhase ? checkedR_C_A : checkedR_C} setList={agudiPhase ? setCheckedR_C_A : setCheckedR_C} />
                </div>
              )}
            </div>
          ))}
          {((agudiPhase ? checkedL_C_A : checkedL_C).length > 0 || (agudiPhase ? checkedR_C_A : checkedR_C).length > 0) && (
            <button onClick={finalizarCervical} style={{ width:'100%', marginTop:6, padding:'8px 0', borderRadius:8, background:'#f97316', border:'none', color:'#fff', fontWeight:700, fontSize:13, cursor:'pointer' }}>
              Siguiente →
            </button>
          )}
        </div>
      )}

      {/* ── Torácica ── */}
      <AccHeader label="TORÁCICA" open={expandedNivel === 'Torácica'} onToggle={() => setExpandedNivel(p => p === 'Torácica' ? null : 'Torácica')} />
      {expandedNivel === 'Torácica' && (
        <div style={{ padding:'6px 4px 8px', marginBottom:4 }}>
          <textarea value={toracicoTxt} onChange={e => setToracicoTxt(e.target.value)} placeholder="Describe nivel Torácica..." rows={3}
            style={{ width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'6px 10px', color:'#fff', fontSize:12, resize:'none', outline:'none', fontFamily:'inherit' }} />
          {toracicoTxt.trim().length > 0 && (
            <button onClick={finalizarToracica} style={{ width:'100%', marginTop:6, padding:'8px 0', borderRadius:8, background:'#f97316', border:'none', color:'#fff', fontWeight:700, fontSize:13, cursor:'pointer' }}>
              Siguiente →
            </button>
          )}
        </div>
      )}

      {/* ── Lumbosacro ── */}
      <AccHeader label="LUMBOSACRO" open={expandedNivel === 'Lumbosacro'} onToggle={() => setExpandedNivel(p => p === 'Lumbosacro' ? null : 'Lumbosacro')} />
      {expandedNivel === 'Lumbosacro' && (
        <div style={{ padding:'6px 4px 8px', marginBottom:4 }}>
          {LUMBO_LVL.map(v => (
            <div key={v}>
              <VertHeader label={v} open={expandedVertL === v} onToggle={() => setExpandedVertL(p => p === v ? null : v)} />
              {expandedVertL === v && (
                <div style={{ padding:'6px 8px 8px', background:'rgba(255,255,255,0.02)', borderRadius:6, marginBottom:4 }}>
                  <ChkRow lvl={v} side="Izquierdo" checked={agudiPhase ? checkedL_L_A : checkedL_L} setList={agudiPhase ? setCheckedL_L_A : setCheckedL_L} />
                  <ChkRow lvl={v} side="Derecho"   checked={agudiPhase ? checkedR_L_A : checkedR_L} setList={agudiPhase ? setCheckedR_L_A : setCheckedR_L} />
                </div>
              )}
            </div>
          ))}
          {((agudiPhase ? checkedL_L_A : checkedL_L).length > 0 || (agudiPhase ? checkedR_L_A : checkedR_L).length > 0) && (
            <button onClick={finalizarLumbo} style={{ width:'100%', marginTop:6, padding:'8px 0', borderRadius:8, background:'#f97316', border:'none', color:'#fff', fontWeight:700, fontSize:13, cursor:'pointer' }}>
              Siguiente →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* E – Intensidad */
function StepEIntensidad({ goTo, addText, evo, resetAll }) {
  const opciones = [
    { nombre: 'Leve (+/+)',    texto: 'Intensidad leve (+/+)' },
    { nombre: 'Moderada (++)', texto: 'Intensidad moderada (++)' },
    { nombre: 'Severa (+++)',  texto: 'Intensidad severa (+++)' },
    { nombre: 'Difusa (++++)', texto: 'Intensidad difusa (++++)'  },
  ];
  const goNext = (evo === 'Aguda' || evo === 'Subaguda' || evo === 'Crónica') ? 'F_REINERVACION' : 'G_PRONOSTICO';
  return (
    <div>
      <NavRow onBack={() => goTo('B_NIVEL')} onReset={resetAll} />
      <StepTitle>Intensidad</StepTitle>
      {opciones.map(op => (
        <ChoiceBtn key={op.nombre} label={op.nombre} onPress={() => { addText(op.texto); goTo(goNext); }} />
      ))}
      <SkipButton onPress={() => goTo(goNext)} />
    </div>
  );
}

/* F – Reinervación */
function StepFReinervacion({ goTo, addText, evo, resetAll }) {
  const goNext = evo === 'Crónica' ? 'F2_PROGRESION' : 'G_PRONOSTICO';
  return (
    <div>
      <NavRow onBack={() => goTo('E_INTENSIDAD')} onReset={resetAll} />
      <StepTitle>Reinervación</StepTitle>
      {['Abundante', 'Mínima', 'Ausente'].map(r => (
        <ChoiceBtn key={r} label={r.toUpperCase()} onPress={() => { addText(r === 'Ausente' ? 'sin reinervación colateral' : `con reinervación colateral ${r.toLowerCase()}`); goTo(goNext); }} />
      ))}
      <SkipButton onPress={() => goTo(goNext)} />
    </div>
  );
}

/* F2 – Progresión (solo Crónica) */
function StepF2Progresion({ goTo, addText, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => goTo('F_REINERVACION')} onReset={resetAll} />
      <StepTitle>Progresión</StepTitle>
      <ChoiceBtn label="CON PROGRESIÓN DISTAL A MIOTOMAS" onPress={() => { addText('con progresión distal a miotomas'); goTo('G_PRONOSTICO'); }} />
      <ChoiceBtn label="SIN PROGRESIÓN DISTAL A MIOTOMAS" onPress={() => { addText('sin progresión distal a miotomas'); goTo('G_PRONOSTICO'); }} />
      <SkipButton onPress={() => goTo('G_PRONOSTICO')} />
    </div>
  );
}

/* G – Pronóstico */
function StepGPronostico({ goTo, addText, evo, resetAll }) {
  const backStep = (evo === 'Aguda' || evo === 'Subaguda' || evo === 'Crónica') ? 'F_REINERVACION' : 'E_INTENSIDAD';
  const opciones = [
    { nombre: 'Completa',           texto: 'Pronóstico Recuperación completa' },
    { nombre: 'Parcial funcional',  texto: 'Pronóstico Recuperación parcial funcional' },
    { nombre: 'Pobre no funcional', texto: 'Pronóstico Recuperación pobre no funcional' },
    { nombre: 'Nula (secuela)',     texto: 'Pronóstico Recuperación nula (en fase de secuela)' },
  ];
  return (
    <div>
      <NavRow onBack={() => goTo(backStep)} onReset={resetAll} />
      <StepTitle>Pronóstico</StepTitle>
      {opciones.map(op => (
        <ChoiceBtn key={op.nombre} label={op.nombre.toUpperCase()} onPress={() => { addText(op.texto); goTo('FINAL'); }} />
      ))}
      <SkipButton onPress={() => goTo('FINAL')} />
    </div>
  );
}

/* S_PATOLOGIA – Sensitiva: patología */
function StepSPatologia({ goTo, setSensPatologia, addText, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => goTo('A')} onReset={resetAll} />
      <StepTitle>Patología sensitiva</StepTitle>
      <ChoiceBtn label="BLOQUEO" onPress={() => { setSensPatologia('Bloqueo'); addText('Patología Bloqueo'); goTo('S_NIVEL'); }} />
      <ChoiceBtn label="RETARDO" onPress={() => { setSensPatologia('Retardo'); addText('Patología Retardo'); goTo('S_NIVEL'); }} />
    </div>
  );
}

/* S_NIVEL – Sensitiva: selección simultánea de nivel y lado (igual que en móvil) */
function StepSNivel({ goTo, selectedSensitiva, setSelectedSensitiva, applySensOverlays, resetAll, onFinalizar }) {
  const lados = ['Izquierda', 'Derecha', 'Bilateral'];
  const tieneSelecc = Object.values(selectedSensitiva).some(v => v !== null);

  const handleSelect = (lvl, lado) => {
    const prev = selectedSensitiva[lvl];
    const postPrev = prev ? SENS_OVERLAYS[lvl]?.post[prev] : null;
    const antPrev  = prev ? SENS_OVERLAYS[lvl]?.ant[prev]  : null;

    if (prev === lado) {
      setSelectedSensitiva(s => ({ ...s, [lvl]: null }));
      return;
    }
    const postSrc = SENS_OVERLAYS[lvl]?.post[lado];
    const antSrc  = SENS_OVERLAYS[lvl]?.ant[lado];
    if (!postSrc && !antSrc) return;
    setSelectedSensitiva(s => ({ ...s, [lvl]: lado }));
    applySensOverlays(lvl, lado, postPrev, antPrev);
  };

  return (
    <div>
      <NavRow onBack={() => goTo('S_PATOLOGIA')} onReset={resetAll} />
      <StepTitle>Nivel sensitivo</StepTitle>
      {SENSITIVA_LEVELS.map(lvl => (
        <div key={lvl} style={{ marginBottom: 10 }}>
          <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, margin: '0 0 5px', textTransform: 'uppercase', letterSpacing: 1 }}>{lvl}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {lados.map(l => {
              const available = SENS_OVERLAYS[lvl]?.post[l] || SENS_OVERLAYS[lvl]?.ant[l];
              if (!available) return null;
              const active = selectedSensitiva[lvl] === l;
              return (
                <button key={l} onClick={() => handleSelect(lvl, l)}
                  style={{ padding: '5px 12px', borderRadius: 7, border: `1.5px solid ${active ? '#f97316' : 'rgba(255,255,255,0.2)'}`, background: active ? '#f97316' : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 12, fontWeight: active ? 700 : 400, cursor: 'pointer' }}>
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {tieneSelecc && (
        <button onClick={onFinalizar} style={{ width: '100%', marginTop: 8, padding: '9px 0', borderRadius: 8, background: '#f97316', border: 'none', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          Finalizar →
        </button>
      )}
    </div>
  );
}

/* ──────────── Panel FINAL ──────────────────────────────────────── */
function StepFinal({ goTo, flowType, figuras, agregarFigura, setPdfOpen, listaVisual, postOverlays, antOverlays, crosses, laminaRef, nombrePaciente, textoFinal, imgLista, setImgLista, comentarioLista, setShowGaleria, onOpenComentario, resetAll, pdfOpen, activeOv, activeTab }) {
  const backStep = flowType === 'Sensitiva' ? 'S_NIVEL' : 'G_PRONOSTICO';

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <NavRow onBack={() => goTo(backStep)} onReset={resetAll} onPdf={() => setPdfOpen(true)} />

      {/* Tab REPORTE: figuras arrastrables */}
      {activeTab === 'reporte' && (
        <div>
          <StepTitle>Agrega figuras al reporte (imagen)</StepTitle>
          <div style={{ display:'flex', gap:10, marginBottom:16 }}>
            <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width:52, height:52, borderRadius:'50%', border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files || []).forEach(f => agregarFigura('circle', URL.createObjectURL(f))); e.target.value = ''; }} />
            </label>
            <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width:52, height:52, borderRadius:4, border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files || []).forEach(f => agregarFigura('square', URL.createObjectURL(f))); e.target.value = ''; }} />
            </label>
          </div>
          {figuras.length > 0 && <p style={{ color:'rgba(255,255,255,0.35)', fontSize:11, margin:'0 0 6px', fontStyle:'italic' }}>{figuras.length} figura{figuras.length > 1 ? 's' : ''} en la lámina</p>}
        </div>
      )}

      {/* Tab LISTA: galería de tabla + comentario */}
      {activeTab === 'lista' && (
        <div>
          <StepTitle>Imagen de tabla</StepTitle>
          <button onClick={() => setShowGaleria(true)} style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'14px 10px', borderRadius:10, cursor:'pointer', marginBottom:8, background:'rgba(255,255,255,0.04)', border:'1px dashed rgba(255,255,255,0.15)' }}>
            {imgLista ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imgLista.src} alt="tabla" style={{ width:'100%', maxHeight:80, objectFit:'contain', borderRadius:6 }} />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18" /></svg>
                <span style={{ color:'rgba(255,255,255,0.3)', fontSize:12 }}>Sin imagen seleccionada</span>
              </>
            )}
          </button>
          {imgLista && (
            <button onClick={() => setImgLista(null)} style={{ width:'100%', padding:'5px 0', borderRadius:8, marginBottom:8, background:'transparent', border:'1px solid rgba(239,68,68,0.4)', color:'#ef4444', fontSize:12, cursor:'pointer' }}>
              Quitar imagen
            </button>
          )}
          <button onClick={onOpenComentario} style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'#f97316', border:'none', cursor:'pointer', color:'#fff', fontWeight:700, fontSize:13, marginBottom:6 }}>
            {comentarioLista ? 'Editar Comentario' : 'Agregar Comentario'}
          </button>
          {comentarioLista && <p style={{ color:'rgba(255,255,255,0.35)', fontSize:11, fontStyle:'italic', marginBottom:8 }}>{comentarioLista.length > 80 ? comentarioLista.slice(0,80)+'…' : comentarioLista}</p>}
        </div>
      )}

      {/* ExportBar */}
      <div style={{ marginTop:'auto', paddingTop:8 }}>
        <ExportBar
          nombrePaciente={nombrePaciente}
          textoReporte={textoFinal}
          flowType={flowType}
          activeOv={activeOv}
          postOv={postOverlays}
          antOv={antOverlays}
          crosses={crosses}
          figuras={figuras}
          laminaSize={{ w: laminaRef.current?.clientWidth || 690, h: laminaRef.current?.clientHeight || 620 }}
          listaVisual={listaVisual}
          imgLista={imgLista}
          comentarioLista={comentarioLista}
          onReset={resetAll}
          isOpen={pdfOpen}
          onClose={() => setPdfOpen(false)}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/* COMPONENTE PRINCIPAL                                                       */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function ReportFaceRadiculopatia() {
  const { data: session } = useSession();
  const router = useRouter();

  /* --- Estado del wizard --- */
  const [step, setStep]               = useState('A');
  const [evo, setEvo]                 = useState(null);
  const [flowType, setFlowType]       = useState(''); // 'Aguda'|'Subaguda'|'Crónica'|'Crónica agudizada'|'Sensitiva'
  const [sensPatologia, setSensPatologia] = useState(null); // 'Bloqueo' | 'Retardo'
  const [selectedSensitiva, setSelectedSensitiva] = useState({ 'C6-C7': null, 'S1': null });
  const [agudiPhase, setAgudiPhase]   = useState(false); // Crónica agudizada: segunda pasada
  const [textos, setTextos]           = useState([]);

  /* checkboxes del paso Nivel – viven aquí para derivar overlays en tiempo real */
  const [checkedL_C, setCheckedL_C] = useState([]);
  const [checkedR_C, setCheckedR_C] = useState([]);
  const [checkedL_L, setCheckedL_L] = useState([]);
  const [checkedR_L, setCheckedR_L] = useState([]);

  /* segunda pasada (agudización) – cruces rojas */
  const [checkedL_C_A, setCheckedL_C_A] = useState([]);
  const [checkedR_C_A, setCheckedR_C_A] = useState([]);
  const [checkedL_L_A, setCheckedL_L_A] = useState([]);
  const [checkedR_L_A, setCheckedR_L_A] = useState([]);

  /* overlays comprometidos (región + sensitiva) – se acumulan al avanzar pasos */
  const [committedPost, setCommittedPost] = useState([]);
  const [committedAnt,  setCommittedAnt]  = useState([]);

  /* overlays de músculos derivados en tiempo real de los checkboxes */
  const liveMusclePairs = useMemo(() => {
    const cPost = computeOverlaysFromChecks([...checkedL_C, ...checkedL_L], [...checkedR_C, ...checkedR_L]);
    return cPost;
  }, [checkedL_C, checkedR_C, checkedL_L, checkedR_L]);

  /* columna roja en tiempo real – igual que showCervOverlay / showLumboOverlay en móvil */
  const liveRegionPairs = useMemo(() => {
    const post = [];
    const ant  = [];
    const hasC = [...checkedL_C, ...checkedR_C].length > 0;
    const hasL = [...checkedL_L, ...checkedR_L].length > 0;
    if (hasC) {
      post.push(REGION_OVERLAYS.Cervical.post);
      ant.push(REGION_OVERLAYS.Cervical.ant);
    }
    if (hasL) {
      post.push(REGION_OVERLAYS.Lumbosacro.post);
      ant.push(REGION_OVERLAYS.Lumbosacro.ant);
    }
    return { post, ant };
  }, [checkedL_C, checkedR_C, checkedL_L, checkedR_L]);

  /* cruces negras (primera pasada) */
  const crosses = useMemo(() =>
    computeCrossesFromChecks([...checkedL_C, ...checkedL_L], [...checkedR_C, ...checkedR_L]),
    [checkedL_C, checkedR_C, checkedL_L, checkedR_L]
  );

  /* cruces rojas (segunda pasada – Crónica agudizada) */
  const crossesRed = useMemo(() =>
    computeCrossesFromChecks([...checkedL_C_A, ...checkedL_L_A], [...checkedR_C_A, ...checkedR_L_A], true),
    [checkedL_C_A, checkedR_C_A, checkedL_L_A, checkedR_L_A]
  );

  /* combinadas para renderizar y enviar al PDF */
  const allCrosses = useMemo(() => [...crosses, ...crossesRed], [crosses, crossesRed]);

  /* overlays finales = comprometidos + región en vivo + músculos en vivo (sin duplicados) */
  const postOverlays = useMemo(() =>
    [...new Set([...committedPost, ...liveRegionPairs.post, ...liveMusclePairs.post])],
    [committedPost, liveRegionPairs, liveMusclePairs]
  );
  const antOverlays = useMemo(() =>
    [...new Set([...committedAnt, ...liveRegionPairs.ant, ...liveMusclePairs.ant])],
    [committedAnt, liveRegionPairs, liveMusclePairs]
  );

  /* ── VisualNew shell state ── */
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [activeTab, setActiveTab] = useState('reporte');
  const [imgLista, setImgLista] = useState(null);
  const [comentarioLista, setComentarioLista] = useState('');
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [showGaleria, setShowGaleria] = useState(false);
  const [comentarioTemp, setComentarioTemp] = useState('');
  const [pdfOpen, setPdfOpen] = useState(false);
  const [textoEditado, setTextoEditado] = useState('');
  const [editadoManual, setEditadoManual] = useState(false);
  const [cropState, setCropState] = useState(null);

  /* figuras draggables */
  const [figuras, setFiguras] = useState([]);
  const laminaRef = useRef(null);

  const agregarFigura = useCallback((tipo, src) => {
    const SIZE = 80;
    const rect = laminaRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width / 2 - SIZE / 2) : 60;
    const cy = rect ? (rect.height / 2 - SIZE / 2) : 60;
    const img = new window.Image();
    img.onload = () => {
      setFiguras(p => [...p, { id: Date.now() + Math.random(), src, tipo, x: cx, y: cy, nw: img.naturalWidth, nh: img.naturalHeight }]);
    };
    img.onerror = () => {
      setFiguras(p => [...p, { id: Date.now() + Math.random(), src, tipo, x: cx, y: cy }]);
    };
    img.src = src;
  }, []);
  const eliminarFigura = useCallback((id) => setFiguras(p => p.filter(f => f.id !== id)), []);
  const moverFigura    = useCallback((id, x, y) => setFiguras(p => p.map(f => f.id === id ? { ...f, x, y } : f)), []);

  const dragRef = useState(() => ({ active: null, startX: 0, startY: 0, origX: 0, origY: 0 }))[0];
  const onFiguraMouseDown = useCallback((e, figura) => {
    e.preventDefault();
    dragRef.active = figura.id; dragRef.startX = e.clientX; dragRef.startY = e.clientY;
    dragRef.origX = figura.x; dragRef.origY = figura.y;
    const onMove = (ev) => {
      if (!dragRef.active) return;
      const canvas = laminaRef.current;
      const maxX = canvas ? canvas.clientWidth  - 80 : 9999;
      const maxY = canvas ? canvas.clientHeight - 80 : 9999;
      moverFigura(dragRef.active,
        Math.max(0, Math.min(dragRef.origX + ev.clientX - dragRef.startX, maxX)),
        Math.max(0, Math.min(dragRef.origY + ev.clientY - dragRef.startY, maxY)),
      );
    };
    const onUp = () => { dragRef.active = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  }, [dragRef, moverFigura, laminaRef]);

  /* --- helpers de texto --- */
  const addText = useCallback((t) => setTextos(prev => [...prev, t]), []);

  /* --- overlay de región (Cervical / Torácica / Lumbosacro) --- */
  const addRegionOverlay = useCallback((region) => {
    const r = REGION_OVERLAYS[region];
    if (!r) return;
    if (r.post) setCommittedPost(prev => [...prev, r.post]);
    if (r.ant)  setCommittedAnt(prev  => [...prev, r.ant]);
  }, []);

  /* --- bases de imagen según flowType (como en móvil) --- */
  const isSensitiva = flowType === 'Sensitiva';
  const basePost = isSensitiva ? BASE_POST_SENS : BASE_POST_MOTOR;
  const baseAnt  = isSensitiva ? BASE_ANT_SENS  : BASE_ANT_MOTOR;

  /* --- applySensOverlays reemplazando el overlay anterior del mismo nivel --- */
  const applySensOverlays = useCallback((sNivel, lado, prevPost, prevAnt) => {
    const ov = SENS_OVERLAYS[sNivel];
    if (!ov) return;
    const postSrc = ov.post[lado];
    const antSrc  = ov.ant[lado];
    setCommittedPost(prev => {
      const base = prevPost ? prev.filter(x => x !== prevPost) : prev;
      return postSrc ? [...base, postSrc] : base;
    });
    setCommittedAnt(prev => {
      const base = prevAnt ? prev.filter(x => x !== prevAnt) : prev;
      return antSrc ? [...base, antSrc] : base;
    });
  }, []);

  /* --- buildSensitivaFrases (igual que en móvil) --- */
  const buildSensitivaFrases = useCallback(() => {
    if (!sensPatologia) return [];
    const mapSide = { Izquierda: 'izquierdo', Derecha: 'derecho', Bilateral: 'bilateral' };
    const base = sensPatologia === 'Retardo' ? 'Retardo aferente' : 'Bloqueo aferente';
    const out = [];
    ['C6-C7', 'S1'].forEach(lvl => {
      const side = selectedSensitiva[lvl];
      if (!side) return;
      out.push(`${base} ${lvl} ${mapSide[side]}.`);
    });
    return out;
  }, [sensPatologia, selectedSensitiva]);

  /* --- texto del reporte --- */
  const textoReporte = useMemo(() => {
    if (flowType === 'Sensitiva') {
      const frases = buildSensitivaFrases();
      return frases.length ? frases.join(' ') : '';
    }
    return textos.length ? buildDiagnostico(textos) : '';
  }, [flowType, textos, buildSensitivaFrases]);
  const textoFinal = editadoManual ? textoEditado : textoReporte;
  useEffect(() => { if (!editadoManual) setTextoEditado(textoReporte); }, [textoReporte, editadoManual]);

  /* lista estructurada: pares ordenados label/valor como en móvil */
  const listaRender = useMemo(() => {
    const dict = {};
    textos.forEach(t => { const p = getPair(t); if (p) dict[p[0]] = p[1]; });
    if (dict['Intensidad'] && dict['Progresión']) {
      const intenTxt = formatLista('Intensidad', dict['Intensidad']).txt;
      const esSin = (dict['Progresión'] || '').toLowerCase().trim().startsWith('sin');
      dict['Intensidad'] = `${intenTxt} ${esSin ? 'sin progresión distal a miotomas' : 'con progresión distal a miotomas'}`;
      delete dict['Progresión'];
    }
    return ORDER.filter(lbl => dict[lbl]).map(lbl => formatLista(lbl, dict[lbl]));
  }, [textos]);

  const listaVisual = useMemo(() => listaRender.map(({ label, txt }) => ({ k: `${label}_${txt}`, v: `${label}: ${txt}` })), [listaRender]);

  /* --- reset --- */
  const resetAll = useCallback(() => {
    setStep('A'); setEvo(null); setFlowType('');
    setSensPatologia(null); setSelectedSensitiva({ 'C6-C7': null, 'S1': null });
    setAgudiPhase(false);
    setTextos([]);
    setCheckedL_C([]); setCheckedR_C([]);
    setCheckedL_L([]); setCheckedR_L([]);
    setCheckedL_C_A([]); setCheckedR_C_A([]);
    setCheckedL_L_A([]); setCheckedR_L_A([]);
    setCommittedPost([]); setCommittedAnt([]);
    setFiguras([]); setImgLista(null); setComentarioLista('');
    setTextoEditado(''); setEditadoManual(false);
  }, []);

  const goTo = useCallback((s) => setStep(s), []);

  /* ─── Render wizard step ─────────────────────────────────────────────── */
  const renderStep = () => {
    switch (step) {
      case 'A':
        return <StepA goTo={goTo} setEvo={setEvo} addText={addText} setFlowType={setFlowType} resetAll={resetAll} />;
      case 'E_FASE':
        return <StepEFase goTo={goTo} addText={addText} resetAll={resetAll} />;
      case 'B_NIVEL':
        return <StepBNivel
          goTo={goTo} evo={evo} flowType={flowType} addText={addText} addRegionOverlay={addRegionOverlay} resetAll={resetAll}
          checkedL_C={checkedL_C} setCheckedL_C={setCheckedL_C}
          checkedR_C={checkedR_C} setCheckedR_C={setCheckedR_C}
          checkedL_L={checkedL_L} setCheckedL_L={setCheckedL_L}
          checkedR_L={checkedR_L} setCheckedR_L={setCheckedR_L}
          checkedL_C_A={checkedL_C_A} setCheckedL_C_A={setCheckedL_C_A}
          checkedR_C_A={checkedR_C_A} setCheckedR_C_A={setCheckedR_C_A}
          checkedL_L_A={checkedL_L_A} setCheckedL_L_A={setCheckedL_L_A}
          checkedR_L_A={checkedR_L_A} setCheckedR_L_A={setCheckedR_L_A}
          agudiPhase={agudiPhase} setAgudiPhase={setAgudiPhase}
        />;
      case 'E_INTENSIDAD':
        return <StepEIntensidad goTo={goTo} addText={addText} evo={evo} resetAll={resetAll} />;
      case 'F_REINERVACION':
        return <StepFReinervacion goTo={goTo} addText={addText} evo={evo} resetAll={resetAll} />;
      case 'F2_PROGRESION':
        return <StepF2Progresion goTo={goTo} addText={addText} resetAll={resetAll} />;
      case 'G_PRONOSTICO':
        return <StepGPronostico goTo={goTo} addText={addText} evo={evo} resetAll={resetAll} />;
      case 'S_PATOLOGIA':
        return <StepSPatologia goTo={goTo} setSensPatologia={setSensPatologia} addText={addText} resetAll={resetAll} />;
      case 'S_NIVEL':
        return <StepSNivel
          goTo={goTo}
          selectedSensitiva={selectedSensitiva}
          setSelectedSensitiva={setSelectedSensitiva}
          applySensOverlays={applySensOverlays}
          resetAll={resetAll}
          onFinalizar={() => goTo('FINAL')}
        />;
      case 'FINAL':
        return (
          <StepFinal
            goTo={goTo}
            flowType={flowType}
            figuras={figuras}
            agregarFigura={agregarFigura}
            setPdfOpen={setPdfOpen}
            listaVisual={listaVisual}
            postOverlays={postOverlays}
            antOverlays={antOverlays}
            activeOv={[...new Set([...postOverlays, ...antOverlays])]}
            crosses={allCrosses}
            laminaRef={laminaRef}
            nombrePaciente={nombrePaciente}
            textoFinal={textoFinal}
            imgLista={imgLista}
            setImgLista={setImgLista}
            comentarioLista={comentarioLista}
            setShowGaleria={setShowGaleria}
            onOpenComentario={() => { setComentarioTemp(comentarioLista); setShowComentarioModal(true); }}
            activeTab={activeTab}
            resetAll={resetAll}
            pdfOpen={pdfOpen}
          />
        );
      default: return null;
    }
  };

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <ReportContext.Provider value={useMemo(() => ({
      conclusions: textos.map(t => ({ value: t, title: t })),
      addConclusion: ({ value, title }) => addText(title ?? value),
      removeConclusion: (v) => setTextos(prev => prev.filter(t => t !== v)),
    }), [textos, addText])}>
      {/* ══ MODAL FULLSCREEN ══ */}
      <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto' }}>

        {/* ── Barra superior ── */}
        <div style={{ flexShrink:0, width:'100%', height:52, background:'#111', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'0 20px', boxSizing:'border-box' }}>
          <div>
            <button onClick={() => router.push('/Reporte')} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer', color:'#fff', fontSize:13, fontWeight:500 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Regresar
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <input type="text" value={nombrePaciente} onChange={e => setNombrePaciente(e.target.value)} placeholder="Nombre del paciente" style={{ width:580, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'6px 14px', color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box', textAlign:'center' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
            {session?.user?.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.imageUrl} alt="" style={{ width:32, height:32, borderRadius:8, objectFit:'contain', opacity:0.85 }} />
            )}
          </div>
        </div>

        {/* ── Zona centrada ── */}
        <div style={{ flex:'0 0 auto', width:'100%', maxWidth:1400, display:'flex', flexDirection:'column', padding:'12px 8px 0', boxSizing:'border-box' }}>

          {/* Fila: menú + lámina (dos paneles) */}
          <div style={{ flex:'0 0 auto', display:'flex', alignItems:'stretch', minHeight:580 }}>

            {/* ══ MENÚ IZQUIERDO ══ */}
            <div style={{ width:260, flexShrink:0, display:'flex', flexDirection:'column', background:'#111', borderRadius:'10px 0 0 10px', border:'1px solid rgba(255,255,255,0.08)', borderRight:'none', overflowY:'auto' }}>
              <div style={{ flex:1, padding:'12px 14px 14px', overflowY:'auto' }}>
                {renderStep()}
              </div>
            </div>

            {/* ══ LÁMINA: dos paneles side by side ══ */}
            <div ref={laminaRef} style={{ flex:1, position:'relative', background:'#fff', borderRadius:'0 10px 10px 0', boxShadow:'0 8px 48px rgba(0,0,0,0.6)', overflow:'hidden', display:'flex', alignItems:'stretch' }}>
              {nombrePaciente && (
                <div style={{ position:'absolute', top:10, left:12, zIndex:10, background:'rgba(0,0,0,0.45)', color:'#fff', fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:6 }}>
                  {nombrePaciente}
                </div>
              )}

              {/* Panel POSTERIOR (side L) */}
              <div style={{ position:'relative', aspectRatio:'2550/3300', height:'100%', minHeight:560 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={basePost} src={basePost} alt="" draggable={false}
                  style={{ display:'block', width:'100%', height:'100%' }} />
                {postOverlays.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={`post_ov_${i}_${src}`} src={src} alt="" draggable={false}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
                ))}
                {allCrosses.filter(c => c.side === 'L').map(({ key, src, topPct, offPct }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={`cx_L_${key}`} src={src} alt="" draggable={false}
                    style={{ position:'absolute', top:`${topPct*100}%`, left:`${offPct*100}%`, width:64, height:64, objectFit:'contain', pointerEvents:'none', zIndex:5 }} />
                ))}
              </div>

              {/* Panel ANTERIOR (side R) */}
              <div style={{ position:'relative', aspectRatio:'2550/3300', height:'100%', minHeight:560 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={baseAnt} src={baseAnt} alt="" draggable={false}
                  style={{ display:'block', width:'100%', height:'100%' }} />
                {antOverlays.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={`ant_ov_${i}_${src}`} src={src} alt="" draggable={false}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
                ))}
                {allCrosses.filter(c => c.side === 'R').map(({ key, src, topPct, offPct }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={`cx_R_${key}`} src={src} alt="" draggable={false}
                    style={{ position:'absolute', top:`${topPct*100}%`, right:`${offPct*100}%`, width:64, height:64, objectFit:'contain', pointerEvents:'none', zIndex:5 }} />
                ))}
              </div>

              {/* Figuras flotantes (sobre el contenedor combinado) */}
              {figuras.map(f => (
                <div key={f.id} onMouseDown={e => onFiguraMouseDown(e, f)} style={{ position:'absolute', left:f.x, top:f.y, zIndex:20, width:80, height:80, cursor:'grab', userSelect:'none' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" draggable={false} style={{ width:80, height:80, objectFit:'cover', borderRadius:f.tipo === 'circle' ? '50%' : 0, border:'1.5px solid gray', display:'block', pointerEvents:'none' }} />
                  <button onMouseDown={e => e.stopPropagation()} onClick={() => eliminarFigura(f.id)} style={{ position:'absolute', top:-10, right:-10, width:24, height:24, borderRadius:'50%', background:'red', border:'none', cursor:'pointer', color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>✕</button>
                  <button onMouseDown={e => e.stopPropagation()} onClick={() => setCropState({ id: f.id, src: f.src })} style={{ position:'absolute', bottom:-10, left:-10, width:26, height:26, borderRadius:'50%', background:'rgba(0,0,0,0.75)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" /></svg>
                  </button>
                </div>
              ))}
            </div>

          </div>{/* fin fila */}

          {/* ── FOOTER: pestañas Reporte/Lista + contenido ── */}
          <div style={{ background:'#111', borderRadius:'0 0 10px 10px', border:'1px solid rgba(255,255,255,0.08)', borderTop:'none', marginBottom:16 }}>

            {/* Selector de pestaña */}
            <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'8px 16px 0' }}>
              {[['reporte','Reporte'],['lista','Lista']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{ padding:'6px 20px', marginRight:4, borderRadius:'7px 7px 0 0', fontSize:12, fontWeight:600, border:'none', cursor:'pointer', background: activeTab === id ? '#f97316' : 'rgba(255,255,255,0.06)', color: activeTab === id ? '#fff' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === id ? '2px solid #f97316' : '2px solid transparent' }}>{label}</button>
              ))}
            </div>

            {/* Tab REPORTE: conclusión editable */}
            {activeTab === 'reporte' && (
              <div style={{ padding:'10px 16px 14px' }}>
                {textoFinal
                  ? <textarea value={textoFinal} onChange={e => { setTextoEditado(e.target.value); setEditadoManual(true); }} rows={3} style={{ width:'100%', boxSizing:'border-box', resize:'vertical', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'7px 10px', color:'rgba(255,255,255,0.85)', fontSize:13, lineHeight:1.55, outline:'none', fontFamily:'inherit' }} />
                  : <p style={{ color:'rgba(255,255,255,0.2)', fontSize:13, fontStyle:'italic', margin:'2px 0' }}>Sin conclusiones aún.</p>
                }
                {(session?.user?.name || session?.user?.email) && (
                  <div style={{ marginTop:7, paddingTop:6, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:16, flexWrap:'wrap' }}>
                    {session.user.name && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>👤 {session.user.name} {session.user.lastname || ''}</span>}
                    {session.user.email && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>✉ {session.user.email}</span>}
                  </div>
                )}
              </div>
            )}

            {/* Tab LISTA */}
            {activeTab === 'lista' && (
              <div style={{ padding:'10px 16px 14px' }}>
                {/* Sensitiva: muestra Fibras / Patología / Nivel igual que el móvil */}
                {flowType === 'Sensitiva' ? (
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', marginBottom:4, borderRadius:7, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:'#f97316', flexShrink:0 }} />
                      <span style={{ color:'rgba(255,255,255,0.45)', fontSize:11, fontWeight:600, minWidth:80 }}>Fibras</span>
                      <span style={{ color:'rgba(255,255,255,0.85)', fontSize:12 }}>Sensitiva</span>
                    </div>
                    {sensPatologia && (
                      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', marginBottom:4, borderRadius:7, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:'#f97316', flexShrink:0 }} />
                        <span style={{ color:'rgba(255,255,255,0.45)', fontSize:11, fontWeight:600, minWidth:80 }}>Patología</span>
                        <span style={{ color:'rgba(255,255,255,0.85)', fontSize:12 }}>{sensPatologia}</span>
                      </div>
                    )}
                    {['C6-C7','S1'].map(lvl => {
                      const side = selectedSensitiva[lvl];
                      if (!side) return null;
                      const sideTxt = side === 'Izquierda' ? 'izquierdo' : side === 'Derecha' ? 'derecho' : 'bilateral';
                      return (
                        <div key={lvl} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', marginBottom:4, borderRadius:7, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                          <span style={{ width:6, height:6, borderRadius:'50%', background:'#f97316', flexShrink:0 }} />
                          <span style={{ color:'rgba(255,255,255,0.45)', fontSize:11, fontWeight:600, minWidth:80 }}>Nivel</span>
                          <span style={{ color:'rgba(255,255,255,0.85)', fontSize:12 }}>{lvl} {sideTxt}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Flujos normales */
                  <div>
                    {listaRender.length > 0 ? listaRender.map(({ label, txt }) => (
                      <div key={label} style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'5px 8px', marginBottom:4, borderRadius:7, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:'#f97316', flexShrink:0, marginTop:4 }} />
                        <span style={{ color:'rgba(255,255,255,0.45)', fontSize:11, fontWeight:600, minWidth:80, flexShrink:0 }}>{label}</span>
                        <span style={{ color:'rgba(255,255,255,0.85)', fontSize:12, flex:1 }}>{txt}</span>
                      </div>
                    )) : <p style={{ color:'rgba(255,255,255,0.2)', fontSize:13, fontStyle:'italic', margin:'2px 0' }}>Sin datos aún.</p>}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>{/* fin zona centrada */}
      </div>

      {/* ══ MODAL CROP ══ */}
      {cropState && (
        <CropModal
          src={cropState.src}
          onConfirm={url => { setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: url } : f)); setCropState(null); }}
          onClose={() => setCropState(null)}
        />
      )}

      {/* ══ GALERÍA ══ */}
      {showGaleria && (
        <GaleriaTablas onSelect={url => { setImgLista({ src: url, file: null }); setShowGaleria(false); }} onClose={() => setShowGaleria(false)} />
      )}

      {/* ══ MODAL COMENTARIO ══ */}
      {showComentarioModal && (
        <div style={{ position:'fixed', inset:0, zIndex:10000, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:24, width:'100%', maxWidth:480 }}>
            <h3 style={{ color:'#fff', fontSize:16, fontWeight:700, margin:'0 0 4px' }}>Comentario</h3>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12, margin:'0 0 14px' }}>Se agregará al informe como nota adicional</p>
            <textarea value={comentarioTemp} onChange={e => setComentarioTemp(e.target.value)} rows={5} placeholder="Escribe aquí tu comentario..." style={{ width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'10px 12px', color:'#fff', fontSize:13, resize:'vertical', outline:'none', fontFamily:'inherit' }} />
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <button onClick={() => { setComentarioLista(comentarioTemp); setShowComentarioModal(false); }} style={{ flex:1, padding:'9px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:600, fontSize:14, cursor:'pointer' }}>Guardar</button>
              <button onClick={() => setShowComentarioModal(false)} style={{ flex:1, padding:'9px 0', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'transparent', color:'rgba(255,255,255,0.5)', fontSize:14, cursor:'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </ReportContext.Provider>
  );
}
