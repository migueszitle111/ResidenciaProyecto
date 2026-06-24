'use client';
/*
 * PolineuropatiaNew/ReportFace.jsx
 * Wizard fiel al árbol de Polineuropatia.tsx (mobile).
 *
 * Árbol:
 *  A  Evolución
 *  B  Clasificación
 *  C  Tipo
 *  D  Agregado (opcional)  — skip disponible
 *  E  Fase
 *  F  Fibras
 *  G  Intensidad            — bifurca (axonal→H membrana / desmielinizante→I topografía)
 *  H  Inestabilidad de membrana   (solo axonal)
 *  I  Topografía
 *  J  Extensión
 *  K  Reinervación          (solo axonal)   — bifurca (desmielinizante→FINAL con RecuperaciónDes)
 *  L  Pronóstico de recuperación
 *  FINAL
 */

import { useSession } from 'next-auth/react';
import { useCallback, createContext, useContext, useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import './Style.css';

const TABLAS_URL = 'https://backendmedxpro-tef2.onrender.com/pdfEducacion/Tablas';
const TABLAS = [
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                                       file: 'LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                                                              file: 'CRITERIOS_CIDP_AANEM.png' },
  { id: 'CRITERIOS DE LAMBERT ESCLEROSIS LATERAL AMIOTRÓFICA',                              file: 'LAMBERT_ESCLEROSIS_LT.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (DOMINIO)',                                                file: 'CRITERIOS _AWAJI_2008_1.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (CATEGORÍA)',                                              file: 'CRITERIOS _AWAJI_2008_2.png' },
  { id: 'COMPARACIÓN EL ESCORIAL / AWAJI 2008',                                             file: 'COMPARACION_ESCORIAL.png' },
  { id: 'CRITERIOS POLINEUROPATÍA DESMIELINIZANTE/AXONAL',                                  file: 'POLINEUROPATIA_DESMIELINIZANTE.png' },
  { id: 'PATRONES DE DISTRIBUCIÓN EN POLINEUROPATÍA',                                       file: 'DISTRIBUCION_POLI.png' },
  { id: 'CUANTIFICACIÓN DE POLINEUROPATÍAS',                                                file: 'CUANTIFICACION_POLI.png' },
  { id: 'HALLAZGOS ELECTROFISIOLÓGICOS EN RADICULOPATÍA',                                   file: 'ELECTROFISIOLOGICOS_RADI.png' },
  { id: 'HALLAZGOS ELECTROFISIÓLOGICOS EVOLUTIVOS EN RADICULOPATÍA',                        file: 'EVOLUTIVOS_RADI.png' },
  { id: 'HALLAZGOS NEUROGRÁFICOS EN MIOPATÍAS',                                             file: 'NEUROGRAFICO_MIO.png' },
  { id: 'HALLAZGOS MIOGRÁFICOS EN MIOPATÍAS',                                               file: 'MIOGRAFICOS_MIO.png' },
  { id: 'HALLAZGOS DIFERENCIALES POR TIPOS DE MIOPATÍAS',                                  file: 'TIPOS_MIOPATIAS.png' },
  { id: 'COMPARACIÓN MIOPATÍA/RADICULOPATÍA/UNIÓN NEUROMUSCULAR',                           file: 'COMPARACION.png' },
  { id: 'SEVERIDAD EN MIOPATÍA',                                                            file: 'SEVERIDAD_MIO.png' },
  { id: 'GRAVEDAD POR DECREMENTO ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',                   file: 'DECREMENTO_ELEC.png' },
  { id: 'GRAVEDAD POR SFEMG ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',                        file: 'SFEMG_ELEC.png' },
  { id: 'COORRELACIÓN DE PRUEBAS ELECTROFISIOLOGICAS/DATOS CLÍNICOS EN MIASTENIA GRAVIS',   file: 'PRUEBAS_ELEC.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS SOMATOSENSORIALES Y MOTORES',    file: 'POTENCIALES_EVO.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS VISUALES',                       file: 'POTENCIALES_VISUALES.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS AUDITIVOS',                      file: 'POTENCIALES_AUD.png' },
  { id: 'PRONÓSTICO ASOCIADO A POTENCIALES EVOCADOS',                                       file: 'PRONOSTICO_ASOCIADO.png' },
  { id: 'SEVERIDAD POTENCIALES EVOCADOS MULTIMODALES',                                      file: 'EVO_MULTIMODALES.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MS',                         file: 'SOMATOSENSORIALES_MS.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MI',                         file: 'SOMATOS_MI.png' },
  { id: 'MIOPATÍAS DISTALES',                                                               file: 'MIOPATIAS_DISTAL.png' },
  { id: 'SÍNDROMES DE LESIÓN COMBINADA A PARES CRANEALES',                                  file: 'PARES_CRANEALES.png' },
  { id: 'PRONÓSTICO EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',                     file: 'DEFICIT_AXONAL.png' },
  { id: 'EVOLUCION EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',                      file: 'DEFICIT_AXONAL2.png' },
  { id: 'COORRELACIÓN DE TIEMPO DE EVOLUCIÓN EN PLEXOPATÍAS',                               file: 'EVOLUCION_PLEXO.png' },
  { id: 'PATRONES ELECTROFISIOLÓGICOS EN NEUROPATÍA',                                       file: 'PATRONES_NEURO.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',                                file: 'ELECTROFISIOLOGICOS_DES.png' },
  { id: 'CRITERIOS DIAGNÓSTICOS ELECTROFISIOLÓGICOS PARA AIDP',                             file: 'CRITERIOS_AIDP.png' },
  { id: 'DIFERENCIAS ELECTROFISIOLÓGICAS EN POLINEUROPATÍAS',                               file: 'DIFERENCIAS_POLI.png' },
  { id: 'AANEM CRITERIOS PARA NEUROPATÍAS POR ATRAPAMIENTO',                                file: 'ATRAPAMIENTO.png' },
  { id: 'CLASIFICACIÓN DE SEDDON Y SUNDERLAND',                                             file: 'Tabla38.png' },
  { id: 'POLINEUROPATÍAS DESMIELINIZANTES',                                                 file: 'Tabla39.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – PADUA',                                             file: 'Tabla40.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – CANTERBURY',                                        file: 'Tabla41.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – HIRANI',                                            file: 'Tabla42.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                                       file: 'Tabla43.png' },
  { id: 'CRITERIOS CIDP AANEM',                                                              file: 'Tabla44.png' },
];

/* ─── Overlays ──────────────────────────────────────────────────────────────── */
const OVERLAYS_POLI = {
  'AsAxonal':                '/PolineuropatiaImg/PO_Aximal.png',
  'Axonal':                  '/PolineuropatiaImg/Asimetrica_Aximal.png',
  'AsDesmielinizante':       '/PolineuropatiaImg/PO_Desmielinizante.png',
  'Desmielinizante':         '/PolineuropatiaImg/Asimetrica_Desmielinizante.png',
  'Axonal > Desmielinizante':'/PolineuropatiaImg/PO2_Aximal.png',
  'Desmielinizante > Axonal':'/PolineuropatiaImg/PO_Desmielinizante.png',
  'Motora':                  '/PolineuropatiaImg/PO_Motor.png',
  'Sensitiva':               '/PolineuropatiaImg/PO_Sensitivo.png',
  'Mixta':                   '/PolineuropatiaImg/PO_Sensitivo-Motor.png',
  'ProximalImg':             '/PolineuropatiaImg/PO_Proximal2.png',
  'ProximalAim':             '/PolineuropatiaImg/Asimetrica_Proximal.png',
  'DistalImg':               '/PolineuropatiaImg/PO_Distal2.png',
  'DistalAsim':              '/PolineuropatiaImg/Asimetrica_Distal.png',
  'Segmentaria':             '/PolineuropatiaImg/PO_Proximal.png',
  'GenePx':                  '/PolineuropatiaImg/PO_Proximal2.png',
  'GeneDs':                  '/PolineuropatiaImg/PO_Distal2.png',
  'LongitudDep':             '/PolineuropatiaImg/PO_LongitudDependiente.png',
};
const OVERLAY_GROUPS = { 'Generalizada': ['GenePx', 'GeneDs'] };

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
const limpiarTextoReporte = (s) => {
  if (!s) return '';
  const parrs = s.split('\n\n');
  const cleaned = parrs.map(p => {
    let t = p.replace(/\n/g, ' ').replace(/[ \t]+/g, ' ').trim();
    t = t.replace(/\s+([,;])/g, '$1');
    t = t.replace(/([.!?])\s*([.!?])+$/, '$1');
    if (t.length > 0) t = t[0].toUpperCase() + t.slice(1);
    if (t && !/[.!?]$/.test(t)) t += '.';
    return t;
  }).filter(Boolean);
  return cleaned.join('\n\n');
};

/* ─── Contexto ──────────────────────────────────────────────────────────────── */
const ReportContext = createContext({ conclusions: [], addConclusion: () => {}, removeConclusion: () => {} });

/* ─── Modales ───────────────────────────────────────────────────────────────── */
function CropModal({ src, onConfirm, onClose }) {
  const imgRef = useRef(null); const canvasRef = useRef(null); const overlayRef = useRef(null);
  const [sel, setSel] = useState(null); const [drawing, setDrawing] = useState(false); const startRef = useRef({ x: 0, y: 0 });
  const getRelPos = (e, el) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onMouseDown = (e) => { const pos = getRelPos(e, overlayRef.current); startRef.current = pos; setSel({ x: pos.x, y: pos.y, w: 0, h: 0 }); setDrawing(true); };
  const onMouseMove = (e) => { if (!drawing) return; const pos = getRelPos(e, overlayRef.current); setSel({ x: Math.min(startRef.current.x, pos.x), y: Math.min(startRef.current.y, pos.y), w: Math.abs(pos.x - startRef.current.x), h: Math.abs(pos.y - startRef.current.y) }); };
  const onMouseUp = () => setDrawing(false);
  const applyCrop = () => {
    if (!sel || sel.w < 5 || sel.h < 5) { onClose(); return; }
    const img = imgRef.current; const overlay = overlayRef.current;
    const sx = img.naturalWidth / overlay.clientWidth; const sy = img.naturalHeight / overlay.clientHeight;
    const canvas = canvasRef.current; canvas.width = sel.w * sx; canvas.height = sel.h * sy;
    canvas.getContext('2d').drawImage(img, sel.x * sx, sel.y * sy, sel.w * sx, sel.h * sy, 0, 0, canvas.width, canvas.height);
    onConfirm(canvas.toDataURL('image/png'));
  };
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10200, background:'rgba(0,0,0,0.9)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:16 }}>
      <p style={{ color:'#fff', fontSize:13, marginBottom:10 }}>Arrastra para seleccionar el área a recortar</p>
      <div ref={overlayRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} style={{ position:'relative', cursor:'crosshair', maxWidth:'90vw', maxHeight:'70vh', userSelect:'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop" draggable={false} style={{ display:'block', maxWidth:'90vw', maxHeight:'70vh', objectFit:'contain' }} />
        {sel && sel.w > 2 && sel.h > 2 && <div style={{ position:'absolute', left:sel.x, top:sel.y, width:sel.w, height:sel.h, border:'2px dashed #f97316', background:'rgba(249,115,22,0.15)', pointerEvents:'none' }} />}
      </div>
      <canvas ref={canvasRef} style={{ display:'none' }} />
      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <button onClick={applyCrop} style={{ padding:'9px 28px', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer' }}>Aplicar recorte</button>
        <button onClick={onClose} style={{ padding:'9px 28px', borderRadius:10, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', fontSize:14, cursor:'pointer' }}>Cancelar</button>
      </div>
    </div>
  );
}

function GaleriaTablas({ onSelect, onClose }) {
  const [busqueda, setBusqueda] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <>
      <div style={{ position:'fixed', inset:0, zIndex:10100, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
        <div style={{ background:'#2a2a2a', borderRadius:14, width:'100%', maxWidth:480, maxHeight:'85vh', display:'flex', flexDirection:'column', border:'1px solid rgba(255,255,255,0.1)', overflow:'hidden' }}>
          <div style={{ padding:'18px 20px 12px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ color:'#fff', fontSize:17, fontWeight:700, margin:'0 0 12px', textAlign:'center' }}>Selecciona una imagen:</h3>
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar imagen..." autoFocus style={{ width:'100%', boxSizing:'border-box', background:'#444', border:'none', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:14, outline:'none' }} />
          </div>
          <div style={{ flex:1, overflowY:'auto' }}>
            {filtradas.length === 0
              ? <p style={{ color:'rgba(255,255,255,0.4)', fontStyle:'italic', padding:20, textAlign:'center', margin:0 }}>Sin resultados.</p>
              : filtradas.map((t, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(249,115,22,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                  >
                    <button onClick={() => onSelect(`${TABLAS_URL}/${t.file}`)}
                      style={{ flex:1, textAlign:'left', padding:'14px 20px', background:'transparent', border:'none', color:'#fff', fontSize:14, cursor:'pointer' }}
                    >{t.id}</button>
                    <button onClick={() => setPreviewUrl(`${TABLAS_URL}/${t.file}`)}
                      title="Vista previa"
                      style={{ flexShrink:0, marginRight:12, background:'transparent', border:'none', cursor:'pointer', padding:6, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.45)' }}
                      onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.color='#f97316'; }}
                      onMouseLeave={e => { e.stopPropagation(); e.currentTarget.style.color='rgba(255,255,255,0.45)'; }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                ))}
          </div>
          <div style={{ padding:'12px 20px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={onClose} style={{ width:'100%', padding:'11px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer' }}>Cerrar</button>
          </div>
        </div>
      </div>

      {previewUrl && (
        <div onClick={() => setPreviewUrl(null)}
          style={{ position:'fixed', inset:0, zIndex:10200, background:'rgba(0,0,0,0.88)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:'90vw', maxHeight:'85vh', display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
            <img src={previewUrl} alt="Vista previa"
              style={{ maxWidth:'100%', maxHeight:'75vh', objectFit:'contain', borderRadius:10, boxShadow:'0 8px 40px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.12)' }} />
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setPreviewUrl(null)}
                style={{ padding:'9px 24px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.08)', color:'#fff', fontSize:14, cursor:'pointer', fontWeight:600 }}>
                Cerrar preview
              </button>
              <button onClick={() => { onSelect(previewUrl); setPreviewUrl(null); }}
                style={{ padding:'9px 24px', borderRadius:8, border:'none', background:'#f97316', color:'#fff', fontSize:14, cursor:'pointer', fontWeight:600 }}>
                Seleccionar esta tabla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── UI primitives ─────────────────────────────────────────────────────────── */
function NavRow({ onBack, onReset, onPdf }) {
  const circleBase = {
    width: 44, height: 44, borderRadius: '50%',
    border: '1.5px solid #ff4500', background: '#000',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s', padding: 0, position: 'relative',
  };
  const tooltipStyle = {
    position: 'absolute', top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(30,30,30,0.95)', color: '#fff', fontSize: 11, whiteSpace: 'nowrap',
    padding: '3px 8px', borderRadius: 4, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.15s',
    zIndex: 99999, border: '1px solid rgba(255,69,0,0.4)',
  };
  const showTip = e => { const t = e.currentTarget.querySelector('.nav-tip'); if (t) t.style.opacity = '1'; };
  const hideTip = e => { const t = e.currentTarget.querySelector('.nav-tip'); if (t) t.style.opacity = '0'; };
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
      <button onClick={onBack} style={circleBase}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.15)'; showTip(e); }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; hideTip(e); }}>
        <img src="/I_Out_white.svg" alt="Regresar" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
        <span className="nav-tip" style={tooltipStyle}>Regresar</span>
      </button>
      <button onClick={onReset} style={circleBase}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.15)'; showTip(e); }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; hideTip(e); }}>
        <img src="/I_Repeat_white.svg" alt="Refrescar" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
        <span className="nav-tip" style={tooltipStyle}>Refrescar</span>
      </button>
      {onPdf && (
        <button onClick={onPdf}
          style={{ ...circleBase, background: '#FF6B00', border: '1.5px solid #FF6B00', boxShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e05e00'; showTip(e); }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FF6B00'; hideTip(e); }}>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 }}>PDF</span>
          <span className="nav-tip" style={tooltipStyle}>Exportar PDF</span>
        </button>
      )}
    </div>
  );
}

function StepTitle({ children }) {
  return <p className="text-orange-400 text-xs font-bold tracking-widest mb-3 mt-1 uppercase">{children}</p>;
}

function Btn({ label, onClick }) {
  return (
    <button className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white text-sm font-medium transition-all" onClick={onClick}>
      {label}
    </button>
  );
}

/* ─── Pasos del wizard ──────────────────────────────────────────────────────── */

/* A — Evolución */
function StepA({ goTo, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['evol_aguda',   'Polineuropatía aguda',    'AGUDA'],
    ['evol_subaguda','Polineuropatía subaguda',  'SUBAGUDA'],
    ['evol_cronica', 'Polineuropatía crónica',   'CRÓNICA'],
    ['evol_antigua', 'Polineuropatía antigua',   'ANTIGUA'],
  ];
  return (
    <div>
      <StepTitle>Evolución</StepTitle>
      {opts.map(([val, title, label]) => (
        <Btn key={val} label={label} onClick={() => { addConclusion({ value: val, title }); goTo('B'); }} />
      ))}
    </div>
  );
}

/* B — Clasificación */
function StepB({ goTo, setStep, removeConclusion, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('A'); }} onReset={resetAll} />
      <StepTitle>Clasificación</StepTitle>
      <Btn label="HEREDITARIA" onClick={() => { addConclusion({ value: 'clasi_hereditaria', title: ' hereditaria,' }); goTo('C'); }} />
      <Btn label="ADQUIRIDA"   onClick={() => { addConclusion({ value: 'clasi_adquirida',   title: ' adquirida,'   }); goTo('C'); }} />
    </div>
  );
}

/* C — Tipo */
function StepC({ goTo, setStep, removeConclusion, resetAll, addOverlays, setEsDesmielinizante }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['tipo_axonal',    'AsAxonal',          false, ' tipo axonal',                                                    'AXONAL'],
    ['tipo_desm',      'AsDesmielinizante', true,  ' tipo desmielinizante',                                          'DESMIELINIZANTE'],
    ['tipo_ax_desm',   'AsAxonal',          false, ' primariamente axonal con desmielinización secundaria',           'AXONAL > DESMIELINIZANTE'],
    ['tipo_desm_ax',   'AsDesmielinizante', true,  ' primariamente desmielinizante con pérdida axonal secundaria',   'DESMIELINIZANTE > AXONAL'],
  ];
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('B'); }} onReset={resetAll} />
      <StepTitle>Tipo</StepTitle>
      {opts.map(([val, ovKey, isDesm, title, label]) => (
        <Btn key={val} label={label} onClick={() => {
          addConclusion({ value: val, title });
          addOverlays([ovKey]);
          setEsDesmielinizante(isDesm);
          goTo('D');
        }} />
      ))}
    </div>
  );
}

/* D — Agregado (opcional) */
function StepD({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante, removeLastOverlayGroup }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); removeLastOverlayGroup(); setStep('C'); }} onReset={resetAll} />
      <StepTitle>Agregado (Opcional)</StepTitle>
      <Btn label="DISFUNCIÓN AUTONÓMICA POSITIVA" onClick={() => { addConclusion({ value: 'agr_auto_pos', title: ' (disfunción autonómica positiva)' }); goTo('E'); }} />
      <Btn label="DISFUNCIÓN AUTONÓMICA NEGATIVA" onClick={() => { addConclusion({ value: 'agr_auto_neg', title: ' (disfunción autonómica negativa)' }); goTo('E'); }} />
      <button className="w-full mt-2 px-4 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors" onClick={() => goTo('E')}>Saltar →</button>
    </div>
  );
}

/* E — Fase */
function StepE({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['fase_rapida',     ' rápidamente progresiva'],
    ['fase_lenta',      ' lentamente progresiva'],
    ['fase_recidivante',' recidivante/recurente'],
    ['fase_remitente',  ' remitente/regresiva'],
  ];
  const labels = ['RÁPIDAMENTE PROGRESIVA','LENTAMENTE PROGRESIVA','RECIDIVANTE/RECURRENTE','REMITENTE/REGRESIVA'];
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('D'); }} onReset={resetAll} />
      <StepTitle>Fase</StepTitle>
      {opts.map(([val, title], i) => (
        <Btn key={val} label={labels[i]} onClick={() => { addConclusion({ value: val, title }); goTo('F'); }} />
      ))}
    </div>
  );
}

/* F — Fibras */
function StepF({ goTo, setStep, removeConclusion, resetAll, addOverlays, esDesmielinizante, setEsSensitiva }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['fib_motora',   'Motora',    ' de fibras motoras,'],
    ['fib_sensitiva','Sensitiva', ' de fibras sensitivas,'],
    ['fib_mixta',    'Mixta',     ' de fibras mixtas'],
  ];
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('E'); }} onReset={resetAll} />
      <StepTitle>Fibras</StepTitle>
      {opts.map(([val, ovKey, title]) => (
        <Btn key={val} label={val.replace('fib_','').toUpperCase()} onClick={() => {
          addConclusion({ value: val, title });
          addOverlays([ovKey]);
          setEsSensitiva(val === 'fib_sensitiva');
          goTo(val === 'fib_mixta' ? 'G_pred' : 'G');
        }} />
      ))}
    </div>
  );
}

/* G_pred — Predominio (solo cuando fibras=mixta) */
function StepG_pred({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante, removeLastOverlayGroup }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); removeLastOverlayGroup(); setStep('F'); }} onReset={resetAll} />
      <StepTitle>Predominio</StepTitle>
      <Btn label="PREDOMINIO SENSITIVO" onClick={() => { addConclusion({ value: 'pred_sensitivo', title: ' predominio sensitivo,' }); goTo('G'); }} />
      <Btn label="PREDOMINIO MOTOR"     onClick={() => { addConclusion({ value: 'pred_motor',     title: ' predominio motor,'     }); goTo('G'); }} />
      <Btn label="SIN PREDOMINIO"     onClick={() => { addConclusion({ value: 'pred_motor',     title: ' (sensitivo-motora),'     }); goTo('G'); }} />
    </div>
  );
}

/* G — Intensidad */
function StepG({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante, esMixta, setEsSensitiva, removeLastOverlayGroup }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['int_leve',    ' intensidad leve'],
    ['int_moderada',' intensidad moderada'],
    ['int_severa',  ' intensidad severa'],
  ];
  const backStep = esMixta ? 'G_pred' : 'F';
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setEsSensitiva(false); if (!esMixta) removeLastOverlayGroup(); setStep(backStep); }} onReset={resetAll} />
      <StepTitle>Intensidad</StepTitle>
      {opts.map(([val, title]) => (
        <Btn key={val} label={val.replace('int_','').toUpperCase()} onClick={() => {
          addConclusion({ value: val, title });
          goTo(esDesmielinizante ? 'I' : 'H');
        }} />
      ))}
    </div>
  );
}

/* H — Inestabilidad de membrana (solo axonal) */
function StepH({ goTo, setStep, removeConclusion, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['mem_difusa',    ' con denervación difusa (++++),'],
    ['mem_abundante', ' con denervación abundante (+++),'],
    ['mem_progresiva',' con denervación progresiva (++),'],
    ['mem_discreta',  ' con denervación discreta (+/+),'],
    ['mem_ausente',   ' con denervación ausente,'],
  ];
  const labels = ['DIFUSA (++++)', 'ABUNDANTE (+++)', 'PROGRESIVA (++)', 'DISCRETA (+/+)', 'AUSENTE'];
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('G'); }} onReset={resetAll} />
      <StepTitle>Inestabilidad de membrana</StepTitle>
      {opts.map(([val, title], i) => (
        <Btn key={val} label={labels[i]} onClick={() => { addConclusion({ value: val, title }); goTo('I'); }} />
      ))}
    </div>
  );
}

/* I — Topografía */
function StepI({ goTo, setStep, removeConclusion, resetAll, addOverlays, esDesmielinizante, esSensitiva }) {
  const { addConclusion } = useContext(ReportContext);

  const backStep = esDesmielinizante ? 'G' : 'H';

  const getText = (nombre) => {
    if (esDesmielinizante) return ` con topografía ${nombre.toLowerCase()}`;
    return ` topografía ${nombre.toLowerCase()}`;
  };

  const opts = [
    ['top_simetrica',  null,        'Simétrica',  'SIMÉTRICA'],
    ['top_asimetrica', 'DistalAsim','Asimétrica', 'ASIMÉTRICA'],
    ['top_multifocal', 'DistalAsim','Multifocal', 'MULTIFOCAL'],
  ];

  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep(backStep); }} onReset={resetAll} />
      <StepTitle>Topografía</StepTitle>
      {opts.map(([val, ovKey, nombre, label]) => (
        <Btn key={val} label={label} onClick={() => {
          addConclusion({ value: val, title: getText(nombre) });
          addOverlays(ovKey ? [ovKey] : []);
          goTo('J');
        }} />
      ))}
    </div>
  );
}

/* J — Extensión */
function StepJ({ goTo, setStep, removeConclusion, resetAll, addOverlays, esDesmielinizante, esSensitiva, removeLastOverlayGroup }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['ext_proximal',            'ProximalImg',  ' proximal.'],
    ['ext_distal',              'DistalImg',    ' distal.'],
    ['ext_segmentaria',         'ProximalAim',  ' segmentaria.'],
    ['ext_generalizada',        null,           ' generalizada.'],
    ['ext_longitud_dependiente','LongitudDep',  ' longitud dependiente.'],
  ];
  const labels = ['PROXIMAL','DISTAL','SEGMENTARIA','GENERALIZADA','LONGITUD DEPENDIENTE'];

  /* Siguiente paso:
     - desmielinizante (cualquier fibra) → L_des (RecuperacionDes, con \n\n)
     - axonal sensitiva                  → L_des (RecuperacionDes, con \n\n, sin Reinervación)
     - axonal motora / mixta             → K (Reinervación → L sin \n\n) */
  const nextStep = (esDesmielinizante || esSensitiva) ? 'L_des' : 'K';

  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); removeLastOverlayGroup(); setStep('I'); }} onReset={resetAll} />
      <StepTitle>Extensión</StepTitle>
      {opts.map(([val, ovKey, title], i) => (
        <Btn key={val} label={labels[i]} onClick={() => {
          addConclusion({ value: val, title });
          addOverlays(ovKey ? [ovKey] : []);
          goTo(nextStep);
        }} />
      ))}
    </div>
  );
}

/* K — Reinervación (solo axonal) */
function StepK({ goTo, setStep, removeConclusion, resetAll, removeLastOverlayGroup }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); removeLastOverlayGroup(); setStep('J'); }} onReset={resetAll} />
      <StepTitle>Reinervación</StepTitle>
      <Btn label="ACTIVA"   onClick={() => { addConclusion({ value: 'reinv_activa',   title: '\n\nReinervación activa;'   }); goTo('L'); }} />
      <Btn label="INACTIVA" onClick={() => { addConclusion({ value: 'reinv_inactiva', title: '\n\nReinervación inactiva;' }); goTo('L'); }} />
    </div>
  );
}

/* L — Recuperacion: axonal motora/mixta (sin \n\n, lowercase, espacio prefijo) */
function StepL({ goTo, setStep, removeConclusion, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('K'); }} onReset={resetAll} />
      <StepTitle>Pronóstico de recuperación</StepTitle>
      <Btn label="COMPLETA"           onClick={() => { addConclusion({ value:'rec_completa', title:' pronóstico de recuperación completa.'          }); goTo('FINAL'); }} />
      <Btn label="PARCIAL FUNCIONAL"  onClick={() => { addConclusion({ value:'rec_parcial',  title:' pronóstico de recuperación parcial funcional.'  }); goTo('FINAL'); }} />
      <Btn label="POBRE NO FUNCIONAL" onClick={() => { addConclusion({ value:'rec_pobre',    title:' pronóstico de recuperación pobre no funcional.' }); goTo('FINAL'); }} />
      <Btn label="NULO"               onClick={() => { addConclusion({ value:'rec_nulo',     title:' pronóstico de recuperación nulo.'                }); goTo('FINAL'); }} />
    </div>
  );
}

/* L_des — RecuperacionDes: desmielinizante o axonal-sensitiva (con \n\n = párrafo separado) */
function StepL_des({ goTo, setStep, removeConclusion, resetAll, removeLastOverlayGroup }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); removeLastOverlayGroup(); setStep('J'); }} onReset={resetAll} />
      <StepTitle>Pronóstico de recuperación</StepTitle>
      <Btn label="COMPLETA"           onClick={() => { addConclusion({ value:'rec_completa', title:"\n\nPronóstico de recuperación completa."          }); goTo('FINAL'); }} />
      <Btn label="PARCIAL FUNCIONAL"  onClick={() => { addConclusion({ value:'rec_parcial',  title:"\n\nPronóstico de recuperación parcial funcional."  }); goTo('FINAL'); }} />
      <Btn label="POBRE NO FUNCIONAL" onClick={() => { addConclusion({ value:'rec_pobre',    title:"\n\nPronóstico de recuperación pobre no funcional." }); goTo('FINAL'); }} />
      <Btn label="NULO"               onClick={() => { addConclusion({ value:'rec_nulo',     title:"\n\nPronóstico de recuperación nulo."                }); goTo('FINAL'); }} />
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────────── */
const SIMBOLOS = [
  { grupo: 'Círculos Rojos', items: [
    { label: 'Rojo 1', src: '/assets/Simbolos/S_Circulo Rojo XS (4px).png' },
    { label: 'Rojo 2', src: '/assets/Simbolos/S_Circulo Rojo S.png' },
    { label: 'Rojo 3', src: '/assets/Simbolos/S_Circulo Rojo Intermedio (5.1px).png' },
    { label: 'Rojo 4', src: '/assets/Simbolos/S_Circulo Rojo XL.png' },
  ]},
  { grupo: 'Cruces', items: [
    { label: 'Cruz 1', src: '/assets/Simbolos/S_Cruz 1.png' },
    { label: 'Cruz 2', src: '/assets/Simbolos/S_Cruz 2.png' },
    { label: 'Cruz 3', src: '/assets/Simbolos/S_Cruz 3.png' },
    { label: 'Cruz 4', src: '/assets/Simbolos/S_Cruz 4.png' },
  ]},
  { grupo: 'Cruces Rojas', items: [
    { label: 'Cruz R01', src: '/assets/Simbolos/S_Cruz_Rojo01.png' },
    { label: 'Cruz R02', src: '/assets/Simbolos/S_Cruz_Rojo02.png' },
    { label: 'Cruz R03', src: '/assets/Simbolos/S_Cruz_Rojo03.png' },
    { label: 'Cruz R04', src: '/assets/Simbolos/S_Cruz_Rojo04.png' },
  ]},
  { grupo: 'Otros', items: [
    { label: 'ZigZag',    src: '/assets/Simbolos/S_ZigZag.png' },
    { label: 'ZigZag 2',  src: '/assets/Simbolos/S_ZigZag2.png' },
    { label: 'Inching 1', src: '/assets/Simbolos/S_Inching 1.png' },
    { label: 'Inching 2', src: '/assets/Simbolos/S_Inching 2.png' },
    { label: 'Inching 3', src: '/assets/Simbolos/S_Inching 3.png' },
  ]},
];

export default function ReportFace() {
  const { data: session } = useSession();
  const router = useRouter();

  /* Conclusiones */
  const [conclusions, setConclusions] = useState([]);
  const addConclusion    = useCallback(c => setConclusions(prev => [...prev, c]), []);
  const removeConclusion = useCallback((val, n) => {
    if (n) setConclusions(prev => prev.slice(0, -n));
    else   setConclusions(prev => prev.filter(c => c.value !== val));
  }, []);

  /* Overlays */
  const [overlayKeys, setOverlayKeys] = useState([]);
  const [overlayHistory, setOverlayHistory] = useState([]);
  const addOverlays = useCallback((keys) => {
    setOverlayHistory(prev => [...prev, keys]);
    setOverlayKeys(prev => [...prev, ...keys]);
  }, []);
  const removeLastOverlayGroup = useCallback(() => {
    setOverlayHistory(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setOverlayKeys(k => k.filter(x => !last.includes(x)));
      return prev.slice(0, -1);
    });
  }, []);

  /* Estado derivado del flujo */
  const [esDesmielinizante, setEsDesmielinizante] = useState(false);
  const [esSensitiva, setEsSensitiva] = useState(false);

  /* Pasos */
  const [step, setStep] = useState('A');
  const [history, setHistory] = useState(['A']);
  const goTo = useCallback((s) => { setHistory(prev => [...prev, s]); setStep(s); }, []);

  const resetAll = useCallback(() => {
    setConclusions([]); setOverlayKeys([]); setOverlayHistory([]);
    setStep('A'); setHistory(['A']); setEsDesmielinizante(false); setEsSensitiva(false);
    setFiguras([]); setNombrePaciente('');
    setActiveTab('reporte'); setTextoEditado(''); setEditadoManual(false);
    setImgLista(null); setComentarioLista('');
    setShowSimbolos(false);
  }, []); // eslint-disable-line

  /* Figuras */
  const [figuras, setFiguras] = useState([]);
  const laminaRef = useRef(null);
  const [showSimbolos, setShowSimbolos] = useState(false);

  const agregarFigura = useCallback((tipo, src) => {
    const DISPLAY = tipo === 'symbol' ? 48 : 80;
    const rect = laminaRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width / 2 - DISPLAY / 2) : 60;
    const cy = rect ? (rect.height / 2 - DISPLAY / 2) : 60;
    const img = new window.Image();
    img.onload = () => setFiguras(p => [...p, { id: Date.now()+Math.random(), src, tipo, x:cx, y:cy, nw:img.naturalWidth, nh:img.naturalHeight, dw:DISPLAY, dh:DISPLAY }]);
    img.onerror = () => setFiguras(p => [...p, { id: Date.now()+Math.random(), src, tipo, x:cx, y:cy, dw:DISPLAY, dh:DISPLAY }]);
    img.src = src;
  }, []);
  const eliminarFigura = useCallback((id) => setFiguras(p => p.filter(f => f.id !== id)), []);
  const rotarFigura    = useCallback((id, delta) => setFiguras(p => p.map(f => f.id===id ? {...f, rotation: ((f.rotation ?? 0) + delta + 360) % 360} : f)), []);
  const SIZE_STEP = 8; const SIZE_MIN = 16; const SIZE_MAX = 200;
  const redimensionarFigura = useCallback((id, delta) => setFiguras(p => p.map(f => { if (f.id !== id) return f; const newW = Math.min(SIZE_MAX, Math.max(SIZE_MIN, (f.dw ?? 48) + delta)); const newH = (f.nw && f.nh) ? newW * (f.nh / f.nw) : Math.min(SIZE_MAX, Math.max(SIZE_MIN, (f.dh ?? 48) + delta)); return { ...f, dw: newW, dh: newH }; })), []);
  const ROTATE_STEP = 3;
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

  /* Modales / tabs */
  const [cropState, setCropState]             = useState(null);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [showGaleria, setShowGaleria]         = useState(false);
  const [imgLista, setImgLista]               = useState(null);
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [comentarioTemp, setComentarioTemp]   = useState('');
  const [comentarioLista, setComentarioLista] = useState('');
  const [nombrePaciente, setNombrePaciente]   = useState('');
  const [activeTab, setActiveTab]             = useState('reporte');
  const [textoEditado, setTextoEditado]       = useState('');
  const [editadoManual, setEditadoManual]     = useState(false);
  const [pdfOpen, setPdfOpen]                 = useState(false);

  /* Overlays resueltos (con grupos) */
  const resolvedOverlayUrls = useMemo(() => {
    const urls = [];
    for (const key of overlayKeys) {
      const group = OVERLAY_GROUPS[key];
      if (group) {
        for (const gk of group) { const url = OVERLAYS_POLI[gk]; if (url && !urls.includes(url)) urls.push(url); }
      } else {
        const url = OVERLAYS_POLI[key];
        if (url && !urls.includes(url)) urls.push(url);
      }
    }
    return urls;
  }, [overlayKeys]);

  /* Texto reporte — join('') porque los títulos ya llevan espacio inicial */
  const textoBase = useMemo(() => limpiarTextoReporte(conclusions.map(c => c.title).join('')), [conclusions]);
  useEffect(() => { if (!editadoManual) setTextoEditado(textoBase); }, [textoBase, editadoManual]);
  const textoFinal = editadoManual ? textoEditado : textoBase;

  /* Lista visual con etiquetas legibles */
  const listaVisual = useMemo(() => {
    const vals = new Set(conclusions.map(c => c.value));
    const lines = [];

    const EVOL_MAP = { evol_aguda:'Aguda', evol_subaguda:'Subaguda', evol_cronica:'Crónica', evol_antigua:'Antigua' };
    const evol = Object.entries(EVOL_MAP).find(([k]) => vals.has(k));
    if (evol) lines.push({ k:'Evolución', v: evol[1] });

    const clasi = vals.has('clasi_hereditaria') ? 'Hereditaria' : vals.has('clasi_adquirida') ? 'Adquirida' : null;
    if (clasi) lines.push({ k:'Clasificación', v: clasi });

    const TIPO_MAP = {
      tipo_axonal:'Axonal', tipo_desm:'Desmielinizante',
      tipo_ax_desm:'Axonal > Desmielinizante', tipo_desm_ax:'Desmielinizante > Axonal',
    };
    const tipo = Object.entries(TIPO_MAP).find(([k]) => vals.has(k));
    if (tipo) lines.push({ k:'Tipo', v: tipo[1] });

    if (vals.has('agr_auto_pos')) lines.push({ k:'Agregado', v:'Disfunción autonómica positiva' });
    if (vals.has('agr_auto_neg')) lines.push({ k:'Agregado', v:'Disfunción autonómica negativa' });

    const FASE_MAP = { fase_rapida:'Rápidamente progresiva', fase_lenta:'Lentamente progresiva', fase_recidivante:'Recidivante/Recurrente', fase_remitente:'Remitente/Regresiva' };
    const fase = Object.entries(FASE_MAP).find(([k]) => vals.has(k));
    if (fase) lines.push({ k:'Fase', v: fase[1] });

    const FIB_MAP = { fib_motora:'Motora', fib_sensitiva:'Sensitiva', fib_mixta:'Mixta' };
    const fib = Object.entries(FIB_MAP).find(([k]) => vals.has(k));
    if (fib) lines.push({ k:'Fibras', v: fib[1] });

    if (vals.has('pred_sensitivo')) lines.push({ k:'Predominio', v:'Sensitivo' });
    if (vals.has('pred_motor'))     lines.push({ k:'Predominio', v:'Motor' });

    const INT_MAP = { int_leve:'Leve', int_moderada:'Moderada', int_severa:'Severa' };
    const intens = Object.entries(INT_MAP).find(([k]) => vals.has(k));
    if (intens) lines.push({ k:'Intensidad', v: intens[1] });

    const MEM_MAP = { mem_difusa:'Difusa (++++)', mem_abundante:'Abundante (+++)', mem_progresiva:'Progresiva (++)', mem_discreta:'Discreta (+/+)', mem_ausente:'Ausente' };
    const mem = Object.entries(MEM_MAP).find(([k]) => vals.has(k));
    if (mem) lines.push({ k:'Inestabilidad de membrana', v: mem[1] });

    const TOP_MAP = { top_simetrica:'Simétrica', top_asimetrica:'Asimétrica', top_multifocal:'Multifocal' };
    const top = Object.entries(TOP_MAP).find(([k]) => vals.has(k));
    if (top) lines.push({ k:'Topografía', v: top[1] });

    const EXT_MAP = { ext_proximal:'Proximal', ext_distal:'Distal', ext_segmentaria:'Segmentaria', ext_generalizada:'Generalizada' };
    const ext = Object.entries(EXT_MAP).find(([k]) => vals.has(k));
    if (ext) lines.push({ k:'Extensión', v: ext[1] });

    if (vals.has('reinv_activa'))   lines.push({ k:'Reinervación', v:'Activa' });
    if (vals.has('reinv_inactiva')) lines.push({ k:'Reinervación', v:'Inactiva' });

    const REC_MAP = { rec_completa:'Completa', rec_parcial:'Parcial funcional', rec_pobre:'Pobre no funcional', rec_nulo:'Nulo' };
    const rec = Object.entries(REC_MAP).find(([k]) => vals.has(k));
    if (rec) lines.push({ k:'Pronóstico', v: rec[1] });

    return lines;
  }, [conclusions]);

  const ctxValue = useMemo(() => ({ conclusions, addConclusion, removeConclusion }), [conclusions, addConclusion, removeConclusion]);

  /* Detectar si fibras es mixta para saber el back correcto en Intensidad */
  const esMixta = conclusions.some(c => c.value === 'fib_mixta');

  /* Dispatcher */
  const renderStep = () => {
    const props = { goTo, setStep, removeConclusion, resetAll, addOverlays, removeLastOverlayGroup, esDesmielinizante, setEsDesmielinizante, esSensitiva, setEsSensitiva, esMixta };
    switch (step) {
      case 'A':      return <StepA {...props} />;
      case 'B':      return <StepB {...props} />;
      case 'C':      return <StepC {...props} />;
      case 'D':      return <StepD {...props} />;
      case 'E':      return <StepE {...props} />;
      case 'F':      return <StepF {...props} />;
      case 'G_pred': return <StepG_pred {...props} />;
      case 'G':      return <StepG {...props} />;
      case 'H':      return <StepH {...props} />;
      case 'I':      return <StepI {...props} />;
      case 'J':      return <StepJ {...props} />;
      case 'K':      return <StepK {...props} />;
      case 'L':      return <StepL {...props} />;
      case 'L_des':  return <StepL_des {...props} />;
      case 'FINAL':
        return (
          <div>
            <NavRow onBack={() => { removeConclusion(null, 1); setStep((esDesmielinizante || esSensitiva) ? 'L_des' : 'L'); }} onReset={resetAll} onPdf={() => setPdfOpen(true)} />
            {activeTab === 'reporte' && (
              <>
                <StepTitle>Agrega figuras al reporte (imagen)</StepTitle>
                <div style={{ display:'flex', gap:10, marginBottom:16 }}>
                  <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ width:52, height:52, borderRadius:'50%', border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                    </div>
                    <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f => agregarFigura('circle', URL.createObjectURL(f))); e.target.value=''; }} />
                  </label>
                  <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ width:52, height:52, borderRadius:4, border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                    </div>
                    <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f => agregarFigura('square', URL.createObjectURL(f))); e.target.value=''; }} />
                  </label>
                </div>
                {figuras.length > 0 && <p style={{ color:'rgba(255,255,255,0.35)', fontSize:11, margin:'4px 0 8px', fontStyle:'italic' }}>{figuras.length} figura{figuras.length>1?'s':''} en la lámina</p>}

                {/* ── Panel de símbolos ── */}
                <button
                  onClick={() => setShowSimbolos(v => !v)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 12px', marginBottom: showSimbolos ? 0 : 4, borderRadius: showSimbolos ? '8px 8px 0 0' : 8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer', color:'rgba(255,255,255,0.75)', fontSize:12, fontWeight:600 }}>
                  <span>Agregar símbolo</span>
                  <span style={{ fontSize:10, opacity:0.6, transform: showSimbolos ? 'rotate(180deg)' : 'none', transition:'transform 0.2s', display:'inline-block' }}>▼</span>
                </button>

                {showSimbolos && (
                  <div className="simbolos-scroll" style={{ border:'1px solid rgba(255,255,255,0.1)', borderTop:'none', borderRadius:'0 0 8px 8px', background:'rgba(255,255,255,0.03)', padding:'10px 10px 12px', marginBottom:4, maxHeight:420, overflowY:'auto', scrollbarWidth:'thin', scrollbarColor:'rgba(255,255,255,0.12) transparent' }}>
                    {SIMBOLOS.map(grupo => (
                      <div key={grupo.grupo} style={{ marginBottom:10 }}>
                        <p style={{ color:'rgba(255,255,255,0.35)', fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase', margin:'0 0 6px 0' }}>{grupo.grupo}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:5 }}>
                          {grupo.items.map(sim => (
                            <button
                              key={sim.src}
                              title={sim.label}
                              onClick={() => agregarFigura('symbol', sim.src)}
                              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, padding:'5px 4px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, transition:'background 0.15s' }}
                              onMouseEnter={e => { e.currentTarget.style.background='rgba(249,115,22,0.2)'; e.currentTarget.style.borderColor='rgba(249,115,22,0.5)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={sim.src} alt={sim.label} draggable={false} style={{ width:32, height:32, objectFit:'contain' }} />
                              <span style={{ color:'rgba(255,255,255,0.4)', fontSize:8, textAlign:'center', lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'100%' }}>{sim.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {activeTab === 'lista' && (
              <>
                <StepTitle>Tabla</StepTitle>
                <button onClick={() => setShowGaleria(true)} style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'18px 12px', borderRadius:10, cursor:'pointer', marginBottom:12, background:'rgba(255,255,255,0.05)', border:'1px dashed rgba(255,255,255,0.15)' }}>
                  {imgLista
                    ? <img src={imgLista.src} alt="tabla" style={{ width:'100%', maxHeight:100, objectFit:'contain', borderRadius:6 }} />
                    : <><svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18" /></svg><span style={{ color:'rgba(255,255,255,0.35)', fontSize:12 }}>Sin imagen seleccionada</span></>
                  }
                </button>
                {imgLista && <button onClick={() => setImgLista(null)} style={{ width:'100%', padding:'5px 0', borderRadius:8, marginBottom:10, background:'transparent', border:'1px solid rgba(239,68,68,0.4)', color:'#ef4444', fontSize:12, cursor:'pointer' }}>Quitar imagen</button>}
                <button onClick={() => { setComentarioTemp(comentarioLista); setShowComentarioModal(true); }} style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'#f97316', border:'none', cursor:'pointer', color:'#fff', fontWeight:700, fontSize:14 }}>{comentarioLista ? 'Editar Comentario' : 'Agregar Comentario'}</button>
                {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:8, wordBreak:'break-word', whiteSpace:'pre-wrap', textAlign:'justify' }}>{comentarioLista}</p>}
              </>
            )}
            <div style={{ marginTop:8 }}>
              <ExportBar
                nombrePaciente={nombrePaciente}
                textoReporte={textoFinal}
                activeOv={overlayKeys}
                figuras={figuras}
                laminaSize={(() => { const w = laminaRef.current?.clientWidth || 690; return { w, h: Math.round(w * (2048/1582)) }; })()}
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
      default: return null;
    }
  };

  return (
    <ReportContext.Provider value={ctxValue}>
      <div style={{ position:'relative', zIndex:1, background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100vh' }}>

        {/* TOP BAR */}
        <div style={{ flexShrink:0, width:'100%', height:52, background:'#111', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'0 20px', boxSizing:'border-box' }}>
          <div>
            <button onClick={() => router.push('/Reporte')} style={{ display:'flex', alignItems:'center', justifyContent:'center', width:38, height:38, borderRadius:'50%', background:'#1C1C1C', border:'2px solid #c44900', cursor:'pointer', padding:8, transition:'background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#c44900'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#1C1C1C'; }}>
              <img src="/assets/IconSVG/I_Crop.svg" alt="Regresar" style={{ width:18, height:18, filter:'invert(1)' }} />
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <input type="text" value={nombrePaciente} onChange={e => setNombrePaciente(e.target.value)} placeholder="Nombre del paciente" style={{ width:580, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'6px 14px', color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box', textAlign:'center' }} />
          </div>
          <div />
        </div>

        {/* CENTERED ZONE */}
        <div style={{ flex:'0 0 auto', width:'100%', maxWidth:850, display:'flex', flexDirection:'column', padding:'12px 8px 0', boxSizing:'border-box' }}>

          {/* MENU + LAMINA */}
          <div style={{ flex:'0 0 auto', display:'flex', alignItems:'stretch', minHeight:520 }}>
            <div style={{ width:300, flexShrink:0, display:'flex', flexDirection:'column', background:'#111', borderRadius:'10px 0 0 10px', border:'1px solid rgba(255,255,255,0.08)', borderRight:'none', overflowY:'auto' }}>
              <div style={{ flex:1, padding:'12px 14px 14px', overflowY:'auto' }}>
                {renderStep()}
              </div>
            </div>
            <div ref={laminaRef} style={{ flex:1, position:'relative', background:'#fff', borderRadius:'0 10px 10px 0', boxShadow:'0 8px 48px rgba(0,0,0,0.6)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {nombrePaciente && <div style={{ position:'absolute', top:10, left:12, zIndex:10, background:'rgba(0,0,0,0.45)', color:'#fff', fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:6 }}>{nombrePaciente}</div>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/PolineuropatiaImg/BP_Polineuropatia.png" alt="base" draggable={false} style={{ display:'block', width:'100%', height:'auto', objectFit:'contain' }} />
              {resolvedOverlayUrls.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" draggable={false} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', pointerEvents:'none' }} />
              ))}
              {figuras.map(f => {
                const isSymbol = f.tipo === 'symbol';
                const fw = f.dw ?? (isSymbol ? 48 : 80);
                const fh = f.dh ?? (isSymbol ? 48 : 80);
                return (
                  <div key={f.id} onMouseDown={e => onFiguraMouseDown(e, f)} style={{ position:'absolute', left:f.x, top:f.y, zIndex:20, width:fw, height:fh, cursor:'grab', userSelect:'none' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.src} alt="" draggable={false} style={{ width:'100%', height:'100%', objectFit:isSymbol?'contain':'cover', borderRadius:f.tipo==='circle'?'50%':0, border:isSymbol?'none':'1.5px solid gray', display:'block', pointerEvents:'none', transform:`rotate(${f.rotation ?? 0}deg)` }} />
                    <button onMouseDown={e=>e.stopPropagation()} onClick={e=>{ e.stopPropagation(); setCtxMenu({ id:f.id, x:e.clientX, y:e.clientY, isSymbol, src:f.src }); }}
                      style={{ position:'absolute', top:-8, right:-8, width:18, height:18, borderRadius:'50%', background:'#1e1e1e', border:'1px solid rgba(255,255,255,0.18)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22, padding:0 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={9} height={9} fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"/></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ background:'#111', borderRadius:'0 0 10px 10px', border:'1px solid rgba(255,255,255,0.08)', borderTop:'none', padding:'10px 16px 14px', marginBottom:16 }}>
            <div style={{ display:'flex', gap:4, marginBottom:8 }}>
              {[['reporte','Reporte'],['lista','Lista']].map(([id,label]) => (
                <button key={id} onClick={()=>setActiveTab(id)} style={{ padding:'4px 16px', borderRadius:7, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', background:activeTab===id?'#f97316':'rgba(255,255,255,0.07)', color:activeTab===id?'#fff':'rgba(255,255,255,0.4)' }}>{label}</button>
              ))}
            </div>
            {activeTab==='reporte' && (textoFinal
              ? <textarea value={textoFinal} onChange={e=>{setTextoEditado(e.target.value);setEditadoManual(true);}} rows={4} style={{ width:'100%', boxSizing:'border-box', resize:'vertical', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'7px 10px', color:'rgba(255,255,255,0.85)', fontSize:13, lineHeight:1.55, outline:'none', fontFamily:'inherit', marginTop:4 }} />
              : <p style={{ color:'rgba(255,255,255,0.2)', fontSize:13, fontStyle:'italic', margin:'4px 0 0' }}>Sin conclusiones aún.</p>
            )}
            {activeTab==='lista' && (
              <div style={{ marginTop:4 }}>
                {listaVisual.length===0
                  ? <p style={{ color:'rgba(255,255,255,0.25)', fontSize:12, fontStyle:'italic', margin:0 }}>Sin conclusiones aún.</p>
                  : <div style={{ display:'flex', flexWrap:'wrap', gap:'4px 24px' }}>
                      {listaVisual.map(({k,v},i)=>(
                        <p key={i} style={{ color:'rgba(255,255,255,0.75)', fontSize:12, margin:0 }}>
                          <span style={{ color:'#f97316', fontWeight:600 }}>{k}:</span> {v}
                        </p>
                      ))}
                    </div>
                }
                {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:6, wordBreak:'break-word', whiteSpace:'pre-wrap', textAlign:'justify' }}>💬 {comentarioLista}</p>}
              </div>
            )}
            {(session?.user?.name||session?.user?.email) && (
              <div style={{ marginTop:8, paddingTop:7, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:16, flexWrap:'wrap' }}>
                {session.user.name && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>👤 {session.user.name} {session.user.lastname||''}</span>}
                {session.user.email && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>✉ {session.user.email}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {cropState && <CropModal src={cropState.src} onConfirm={url=>{setFiguras(p=>p.map(f=>f.id===cropState.id?{...f,src:url}:f));setCropState(null);}} onClose={()=>setCropState(null)} />}
      {showGaleria && <GaleriaTablas onSelect={url=>{setImgLista({src:url,file:null});setShowGaleria(false);}} onClose={()=>setShowGaleria(false)} />}

      {/* Context menu símbolos */}
      {ctxMenu && (
        <>
          <div onClick={()=>setCtxMenu(null)} style={{ position:'fixed', inset:0, zIndex:9998 }} />
          <div onMouseDown={e=>e.stopPropagation()} style={{ position:'fixed', left:ctxMenu.x, top:ctxMenu.y, zIndex:9999, background:'#1e1e1e', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'6px 0', minWidth:170, boxShadow:'0 8px 32px rgba(0,0,0,0.55)', userSelect:'none' }}>
            <div style={{ padding:'4px 14px 8px', borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:4 }}>
              <span style={{ color:'rgba(255,255,255,0.35)', fontSize:11 }}>Símbolo</span>
            </div>
            <div style={{ padding:'2px 8px', display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12, flex:1, paddingLeft:6 }}>Tamaño</span>
              <button onClick={()=>redimensionarFigura(ctxMenu.id,-SIZE_STEP)} style={{ width:28, height:28, borderRadius:7, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
              <button onClick={()=>redimensionarFigura(ctxMenu.id,+SIZE_STEP)} style={{ width:28, height:28, borderRadius:7, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
            </div>
            {ctxMenu.isSymbol && (
              <div style={{ padding:'2px 8px', display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12, flex:1, paddingLeft:6 }}>Rotar</span>
                <button onClick={()=>rotarFigura(ctxMenu.id,-ROTATE_STEP)} style={{ width:28, height:28, borderRadius:7, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
                <button onClick={()=>rotarFigura(ctxMenu.id,+ROTATE_STEP)} style={{ width:28, height:28, borderRadius:7, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                </button>
              </div>
            )}
            {!ctxMenu.isSymbol && (
              <button onClick={()=>{ setCropState({id:ctxMenu.id,src:ctxMenu.src}); setCtxMenu(null); }} style={{ width:'100%', padding:'8px 14px', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.75)', fontSize:13, textAlign:'left', display:'flex', alignItems:'center', gap:10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"/></svg>
                Editar foto
              </button>
            )}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', margin:'6px 0 2px' }} />
            <button onClick={()=>{ eliminarFigura(ctxMenu.id); setCtxMenu(null); }} style={{ width:'100%', padding:'8px 14px', background:'none', border:'none', cursor:'pointer', color:'#f87171', fontSize:13, textAlign:'left', display:'flex', alignItems:'center', gap:10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              Eliminar
            </button>
          </div>
        </>
      )}

      {showComentarioModal && (
        <div style={{ position:'fixed', inset:0, zIndex:10000, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:24, width:'100%', maxWidth:480 }}>
            <h3 style={{ color:'#fff', fontSize:16, fontWeight:700, margin:'0 0 4px' }}>Comentario</h3>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12, margin:'0 0 14px' }}>Se agregará al informe como nota adicional</p>
            <textarea value={comentarioTemp} onChange={e=>setComentarioTemp(e.target.value)} rows={5} placeholder="Escribe aquí tu comentario..." style={{ width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'10px 12px', color:'#fff', fontSize:13, resize:'vertical', outline:'none', fontFamily:'inherit' }} />
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <button onClick={()=>{setComentarioLista(comentarioTemp);setShowComentarioModal(false);}} style={{ flex:1, padding:'9px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:600, fontSize:14, cursor:'pointer' }}>Guardar</button>
              <button onClick={()=>setShowComentarioModal(false)} style={{ flex:1, padding:'9px 0', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'transparent', color:'rgba(255,255,255,0.5)', fontSize:14, cursor:'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </ReportContext.Provider>
  );
}

