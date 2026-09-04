'use client';
/*
 * Union_NeuromuscularNew/ReportFace.jsx
 * Versión web del reporte de Unión Neuromuscular — shell VisualNew.
 */

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
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
  { id: 'ELA / ALS — GOLD COAST 2020',                                                       file: 'ELA_ALS.png' },
  { id: 'SÍNDROME DE GUILLAIN-BARRÉ — EAN/PNS 2023',                                         file: 'SINDROME_GUILLAIN.png' },
  { id: 'NEUROPATÍA MOTORA MULTIFOCAL (MMN) — EFNS/PNS 2010',                                file: 'NEUROPATIA_MOTORA.png' },
];

/* ─── Modal de recorte ──────────────────────────────────────────────────────── */
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
    const scaleX = img.naturalWidth / overlay.clientWidth; const scaleY = img.naturalHeight / overlay.clientHeight;
    const canvas = canvasRef.current; canvas.width = sel.w * scaleX; canvas.height = sel.h * scaleY;
    canvas.getContext('2d').drawImage(img, sel.x * scaleX, sel.y * scaleY, sel.w * scaleX, sel.h * scaleY, 0, 0, canvas.width, canvas.height);
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

/* ─── Galería de tablas ─────────────────────────────────────────────────────── */
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
                ))
            }
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

/* ─── Contexto ──────────────────────────────────────────────────────────────── */
const ReportContext = createContext({ conclusions: [], addConclusion: () => {}, removeConclusion: () => {} });

/* ─── Overlays ──────────────────────────────────────────────────────────────── */
const OVERLAYS_UN = {
  'Bulbar':       '/UnionNeuromuscularImg/UN_Bulbar.png',
  'Proximal':     '/UnionNeuromuscularImg/UN_Proximal.png',
  'Distal':       '/UnionNeuromuscularImg/UN_Distal.png',
  'Presináptico': '/UnionNeuromuscularImg/UN_Presinaptico.png',
  'Postsináptico':'/UnionNeuromuscularImg/UN_Postsinaptico.png',
};

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
const limpiarTextoReporte = (s) => {
  if (!s) return '';
  let t = s.replace(/[ \t]+/g, ' ').trim();
  t = t.replace(/\s+([,;])/g, '$1');
  t = t.replace(/([.!?])\s*([.!?])+$/, '$1');
  if (t.length > 0) t = t[0].toUpperCase() + t.slice(1);
  if (!/[.!?]$/.test(t)) t += '.';
  return t;
};

/* ─── Componentes de UI de los pasos ───────────────────────────────────────── */
function ConclusionBtn({ value, title, label, onPress }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <button className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white text-sm font-medium transition-all"
      onClick={() => { addConclusion({ value, title }); onPress?.(); }}>
      {label}
    </button>
  );
}

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

/* ─── Pasos del wizard ──────────────────────────────────────────────────────── */
function StepA({ goTo, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <StepTitle>Clasificación</StepTitle>
      {[['adquirida', 'Bloqueo de la unión neuromuscular adquirida,', 'ADQUIRIDA'], ['hereditaria', 'Bloqueo de la unión neuromuscular hereditaria,', 'HEREDITARIA']].map(([val, title, label]) => (
        <button key={val} className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white text-sm font-medium transition-all"
          onClick={() => { addConclusion({ value: val, title }); goTo('B'); }}>{label}</button>
      ))}
    </div>
  );
}

function StepB({ goTo, setStep, removeConclusion, resetAll, addOverlays }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('A'); }} onReset={resetAll} />
      <StepTitle>Fisiopatología</StepTitle>
      <button className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white text-sm font-medium transition-all"
        onClick={() => { addConclusion({ value: 'presinaptico', title: ' tipo presináptico' }); addOverlays(['Presináptico']); goTo('C'); }}>PRESINÁPTICO</button>
      <button className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white text-sm font-medium transition-all"
        onClick={() => { addConclusion({ value: 'postsinaptico', title: ' tipo postsináptico' }); addOverlays(['Postsináptico']); goTo('C'); }}>POSTSINÁPTICO</button>
    </div>
  );
}

function StepC({ goTo, setStep, removeConclusion, resetAll, addOverlays, removeOverlay }) {
  const { addConclusion, conclusions } = useContext(ReportContext);
  const OPCIONES = [
    { key: 'Bulbar',   value: 'dist_bulbar' },
    { key: 'Proximal', value: 'dist_proximal' },
    { key: 'Distal',   value: 'dist_distal' },
  ];
  const seleccionados = OPCIONES.filter(o => conclusions.some(c => c.value === o.value)).map(o => o.key);

  const toggle = (op) => {
    const yaEsta = conclusions.some(c => c.value === op.value);
    if (yaEsta) {
      removeConclusion(op.value);
      removeOverlay(op.key);
    } else {
      addConclusion({ value: op.value, title: op.key });
      addOverlays([op.key]);
    }
  };

  const continuar = () => {
    if (seleccionados.length === 0) return;
    goTo('D');
  };

  return (
    <div>
      <NavRow onBack={() => { OPCIONES.forEach(o => { removeConclusion(o.value); removeOverlay(o.key); }); removeConclusion(null, 1); setStep('B'); }} onReset={resetAll} />
      <StepTitle>Distribución</StepTitle>
      {OPCIONES.map(op => {
        const activo = seleccionados.includes(op.key);
        return (
          <button key={op.key}
            style={{ width:'100%', textAlign:'left', padding:'10px 16px', marginBottom:6, borderRadius:10, border:'none', cursor:'pointer', fontWeight:600, fontSize:14,
              background: activo ? '#f97316' : 'rgba(255,255,255,0.08)',
              color: activo ? '#fff' : 'rgba(255,255,255,0.6)',
              transition:'all 0.15s' }}
            onClick={() => toggle(op)}>
            {op.key}
          </button>
        );
      })}
      <button
        style={{ width:'100%', marginTop:8, padding:'10px 0', borderRadius:10, border:'none', cursor: seleccionados.length > 0 ? 'pointer' : 'not-allowed',
          background: seleccionados.length > 0 ? '#f97316' : 'rgba(255,255,255,0.1)',
          color: seleccionados.length > 0 ? '#fff' : 'rgba(255,255,255,0.3)',
          fontWeight:700, fontSize:14, transition:'all 0.15s' }}
        onClick={continuar}>
        Siguiente →
      </button>
    </div>
  );
}

function StepD({ goTo, setStep, removeConclusion, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { setStep('C'); }} onReset={resetAll} />
      <StepTitle>Agregado (Opcional)</StepTitle>
      <ConclusionBtn value="riesgo_alto_resp" title=" (alto compromiso respiratorio)" label="RIESGO ALTO COMPROMISO RESPIRATORIO" onPress={() => goTo('E')} />
      <ConclusionBtn value="riesgo_bajo_resp" title=" (bajo compromiso respiratorio)" label="RIESGO BAJO COMPROMISO RESPIRATORIO" onPress={() => goTo('E')} />
      <button className="w-full mt-2 px-4 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors" onClick={() => goTo('E')}>Saltar →</button>
    </div>
  );
}

function StepE({ goTo, setStep, removeConclusion, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { setStep('D'); }} onReset={resetAll} />
      <StepTitle>Intensidad</StepTitle>
      <ConclusionBtn value="leve"     title=" de intensidad leve"     label="LEVE"     onPress={() => goTo('F')} />
      <ConclusionBtn value="moderada" title=" de intensidad moderada" label="MODERADA" onPress={() => goTo('F')} />
      <ConclusionBtn value="severa"   title=" de intensidad severa"   label="SEVERA"   onPress={() => goTo('F')} />
    </div>
  );
}

function StepF({ goTo, setStep, removeConclusion, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('E'); }} onReset={resetAll} />
      <StepTitle>Recuperación al reposo</StepTitle>
      <ConclusionBtn value="rec_completa"     title=" con recuperación completa al reposo." label="COMPLETA AL REPOSO"  onPress={() => goTo('FINAL')} />
      <ConclusionBtn value="rec_parcial"      title=" con recuperación parcial al reposo."  label="PARCIAL AL REPOSO"   onPress={() => goTo('FINAL')} />
      <ConclusionBtn value="sin_recuperacion" title=" sin recuperación al reposo."          label="SIN RECUPERACIÓN"   onPress={() => goTo('FINAL')} />
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
  const removeOverlay = useCallback((key) => {
    setOverlayKeys(prev => prev.filter(k => k !== key));
  }, []);
  const removeLastOverlayGroup = useCallback(() => {
    setOverlayHistory(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setOverlayKeys(k => k.filter(x => !last.includes(x)));
      return prev.slice(0, -1);
    });
  }, []);

  /* Pasos */
  const [step, setStep] = useState('A');
  const [history, setHistory] = useState(['A']);
  const goTo = useCallback((s) => { setHistory(prev => [...prev, s]); setStep(s); }, []);
  const resetAll = useCallback(() => {
    setConclusions([]); setOverlayKeys([]); setOverlayHistory([]);
    setStep('A'); setHistory(['A']);
    setFiguras([]); setNombrePaciente('');
    setActiveTab('reporte'); setTextoEditado(''); setEditadoManual(false);
    setImgLista(null); setComentarioLista('');
    setShowSimbolos(false);
  }, []);

  /* Figuras drag — patrón VisualNew */
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
    dragRef.active = figura.id;
    dragRef.startX = e.clientX; dragRef.startY = e.clientY;
    dragRef.origX = figura.x;   dragRef.origY = figura.y;
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
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [dragRef, moverFigura, laminaRef]);

  /* Modales */
  const [cropState, setCropState]             = useState(null);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [showGaleria, setShowGaleria]         = useState(false);
  const [imgLista, setImgLista]               = useState(null);
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [comentarioTemp, setComentarioTemp]   = useState('');
  const [comentarioLista, setComentarioLista] = useState('');

  /* Paciente / texto */
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [activeTab, setActiveTab]           = useState('reporte');
  const [textoEditado, setTextoEditado]     = useState('');
  const [editadoManual, setEditadoManual]   = useState(false);
  const [pdfOpen, setPdfOpen]               = useState(false);

  const textoBase = useMemo(() => {
    const DIST_VALUES = ['dist_bulbar','dist_proximal','dist_distal'];
    const DIST_NAMES  = { dist_bulbar:'Bulbar', dist_proximal:'Proximal', dist_distal:'Distal' };
    let parts = [];
    let distAdded = false;
    for (const c of conclusions) {
      if (DIST_VALUES.includes(c.value)) {
        if (!distAdded) {
          const selDist = conclusions.filter(x => DIST_VALUES.includes(x.value)).map(x => DIST_NAMES[x.value]);
          const distTexto = selDist.length === 1
            ? ` ${selDist[0]}`
            : ` ${selDist.slice(0,-1).join(', ')} y ${selDist[selDist.length-1]}`;
          parts.push(distTexto);
          distAdded = true;
        }
      } else {
        parts.push(c.title);
      }
    }
    return limpiarTextoReporte(parts.join(''));
  }, [conclusions]);
  const textoFinal = editadoManual ? textoEditado : textoBase;

  const listaVisual = useMemo(() => {
    const vals = new Set(conclusions.map(c => c.value));
    const lines = [];
    const clasi = vals.has('adquirida') ? 'Adquirida' : vals.has('hereditaria') ? 'Hereditaria' : '';
    if (clasi) lines.push({ k: 'Clasificación', v: clasi });
    const fisio = vals.has('presinaptico') ? 'Presináptico' : vals.has('postsinaptico') ? 'Postsináptico' : '';
    if (fisio) lines.push({ k: 'Fisiopatología', v: fisio });
    const distNombres = ['dist_bulbar','dist_proximal','dist_distal']
      .filter(v => vals.has(v))
      .map(v => ({ dist_bulbar:'Bulbar', dist_proximal:'Proximal', dist_distal:'Distal' }[v]));
    if (distNombres.length) lines.push({ k: 'Distribución', v: distNombres.join(' y ') });
    if (vals.has('riesgo_alto_resp')) lines.push({ k: 'Agregado', v: 'Riesgo alto de compromiso respiratorio' });
    if (vals.has('riesgo_bajo_resp')) lines.push({ k: 'Agregado', v: 'Riesgo bajo de compromiso respiratorio' });
    const intens = vals.has('leve') ? 'Leve' : vals.has('moderada') ? 'Moderada' : vals.has('severa') ? 'Severa' : '';
    if (intens) lines.push({ k: 'Intensidad', v: intens });
    const rec = vals.has('rec_completa') ? 'Completa al reposo' : vals.has('rec_parcial') ? 'Parcial al reposo' : vals.has('sin_recuperacion') ? 'Sin recuperación' : '';
    if (rec) lines.push({ k: 'Recuperación', v: rec });
    return lines;
  }, [conclusions]);

  const resolvedOverlayUrls = useMemo(() => {
    const urls = [];
    for (const key of overlayKeys) {
      const url = OVERLAYS_UN[key];
      if (url && !urls.includes(url)) urls.push(url);
    }
    return urls;
  }, [overlayKeys]);

  const ctxValue = useMemo(() => ({ conclusions, addConclusion, removeConclusion }), [conclusions, addConclusion, removeConclusion]);

  /* Render de pasos */
  const renderStep = () => {
    const props = { goTo, setStep, removeConclusion, resetAll, addOverlays, removeOverlay, removeLastOverlayGroup };
    switch (step) {
      case 'A': return <StepA {...props} />;
      case 'B': return <StepB {...props} />;
      case 'C': return <StepC {...props} />;
      case 'D': return <StepD {...props} />;
      case 'E': return <StepE {...props} />;
      case 'F': return <StepF {...props} />;
      case 'FINAL':
        return (
          <div>
            <NavRow onBack={() => { removeConclusion(null, 1); setStep('F'); }} onReset={resetAll} onPdf={() => setPdfOpen(true)} />
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
                {figuras.length > 0 && <p style={{ color:'rgba(255,255,255,0.35)', fontSize:11, margin:'4px 0 8px', fontStyle:'italic' }}>{figuras.length} figura{figuras.length > 1 ? 's' : ''} en la lámina</p>}

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
              <ExportBar nombrePaciente={nombrePaciente} textoReporte={textoFinal} activeOv={overlayKeys} figuras={figuras} laminaSize={(() => { const w = laminaRef.current?.clientWidth || 690; return { w, h: Math.round(w * (2048/1582)) }; })()} listaVisual={listaVisual} imgLista={imgLista} comentarioLista={comentarioLista} onReset={resetAll} isOpen={pdfOpen} onClose={() => setPdfOpen(false)} />
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

          {/* MENU + LAMINA ROW */}
          <div style={{ flex:'0 0 auto', display:'flex', alignItems:'stretch', minHeight:520 }}>

            {/* LEFT MENU */}
            <div style={{ width:300, flexShrink:0, display:'flex', flexDirection:'column', background:'#111', borderRadius:'10px 0 0 10px', border:'1px solid rgba(255,255,255,0.08)', borderRight:'none', overflowY:'auto' }}>
              <div style={{ flex:1, padding:'12px 14px 14px', overflowY:'auto' }}>
                {renderStep()}
              </div>
            </div>

            {/* LAMINA */}
            <div ref={laminaRef} style={{ flex:1, position:'relative', background:'#fff', borderRadius:'0 10px 10px 0', boxShadow:'0 8px 48px rgba(0,0,0,0.6)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {nombrePaciente && <div style={{ position:'absolute', top:10, left:12, zIndex:10, background:'rgba(0,0,0,0.45)', color:'#fff', fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:6 }}>{nombrePaciente}</div>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/UnionNeuromuscularImg/BP_UnionMuscular.png" alt="base" draggable={false} style={{ display:'block', width:'100%', height:'auto', objectFit:'contain' }} />
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
              {[['reporte', 'Reporte'], ['lista', 'Lista']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{ padding:'4px 16px', borderRadius:7, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', background:activeTab === id ? '#f97316' : 'rgba(255,255,255,0.07)', color:activeTab === id ? '#fff' : 'rgba(255,255,255,0.4)' }}>{label}</button>
              ))}
            </div>
            {activeTab === 'reporte' && (textoFinal
              ? <textarea value={textoFinal} onChange={e => { setTextoEditado(e.target.value); setEditadoManual(true); }} rows={4} style={{ width:'100%', boxSizing:'border-box', resize:'vertical', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'7px 10px', color:'rgba(255,255,255,0.85)', fontSize:13, lineHeight:1.55, outline:'none', fontFamily:'inherit', marginTop:4 }} />
              : <p style={{ color:'rgba(255,255,255,0.2)', fontSize:13, fontStyle:'italic', margin:'4px 0 0' }}>Sin conclusiones aún.</p>
            )}
            {activeTab === 'lista' && (
              <div style={{ marginTop:4 }}>
                {listaVisual.length === 0
                  ? <p style={{ color:'rgba(255,255,255,0.25)', fontSize:12, fontStyle:'italic', margin:0 }}>Sin conclusiones aún.</p>
                  : <div style={{ display:'flex', flexDirection:'column', gap:2 }}>{listaVisual.map(({ k, v }, i) => <p key={i} style={{ color:'rgba(255,255,255,0.75)', fontSize:12, margin:0 }}><span style={{ color:'#f97316', fontWeight:600 }}>{k}:</span> {v}</p>)}</div>
                }
                {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:6, wordBreak:'break-word', whiteSpace:'pre-wrap', textAlign:'justify' }}>💬 {comentarioLista}</p>}
              </div>
            )}
            {(session?.user?.name || session?.user?.email) && (
              <div style={{ marginTop:8, paddingTop:7, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:16, flexWrap:'wrap' }}>
                {session.user.name && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>👤 {session.user.name} {session.user.lastname || ''}</span>}
                {session.user.email && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>✉ {session.user.email}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {cropState && <CropModal src={cropState.src} onConfirm={croppedUrl => { setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: croppedUrl } : f)); setCropState(null); }} onClose={() => setCropState(null)} />}
      {showGaleria && <GaleriaTablas onSelect={url => { setImgLista({ src: url, file: null }); setShowGaleria(false); }} onClose={() => setShowGaleria(false)} />}

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

