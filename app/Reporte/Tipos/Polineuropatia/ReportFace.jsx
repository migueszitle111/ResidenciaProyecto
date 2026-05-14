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
  { id: 'CRITERIOS POLINEUROPATÍA DESMIELINIZANTE/AXONAL',    file: 'POLINEUROPATIA_DESMIELINIZANTE.png' },
  { id: 'PATRONES DE DISTRIBUCIÓN EN POLINEUROPATÍA',         file: 'DISTRIBUCION_POLI.png' },
  { id: 'CUANTIFICACIÓN DE POLINEUROPATÍAS',                  file: 'CUANTIFICACION_POLI.png' },
  { id: 'DIFERENCIAS ELECTROFISIOLÓGICAS EN POLINEUROPATÍAS', file: 'DIFERENCIAS_POLI.png' },
  { id: 'POLINEUROPATÍAS DESMIELINIZANTES',                   file: 'Tabla39.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',         file: 'LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                               file: 'CRITERIOS_CIDP_AANEM.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',  file: 'ELECTROFISIOLOGICOS_DES.png' },
  { id: 'CRITERIOS DIAGNÓSTICOS ELECTROFISIOLÓGICOS PARA AIDP', file: 'CRITERIOS_AIDP.png' },
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
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
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
                <button key={i} onClick={() => onSelect(`${TABLAS_URL}/${t.file}`)} style={{ width:'100%', textAlign:'left', padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.07)', color:'#fff', fontSize:14, cursor:'pointer' }} onMouseEnter={e => e.currentTarget.style.background='rgba(249,115,22,0.12)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>{t.id}</button>
              ))}
        </div>
        <div style={{ padding:'12px 20px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onClose} style={{ width:'100%', padding:'11px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer' }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

/* ─── UI primitives ─────────────────────────────────────────────────────────── */
function NavRow({ onBack, onReset, onPdf }) {
  return (
    <div className="flex gap-2 mb-3">
      <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Regresar
      </button>
      <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Reset
      </button>
      {onPdf && <button onClick={onPdf} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-md">PDF</button>}
    </div>
  );
}

function StepTitle({ children }) {
  return <p className="text-orange-400 text-xs font-bold tracking-widest mb-3 mt-1 uppercase">{children}</p>;
}

function Btn({ label, onClick }) {
  return (
    <button className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white text-sm font-medium transition-all" onClick={onClick}>
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
function StepD({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('C'); }} onReset={resetAll} />
      <StepTitle>Agregado (Opcional)</StepTitle>
      <Btn label="DISFUNCIÓN AUTONÓMICA POSITIVA" onClick={() => { addConclusion({ value: 'agr_auto_pos', title: ' (disfunción autonómica positiva)' }); goTo('E'); }} />
      <Btn label="DISFUNCIÓN AUTONÓMICA NEGATIVA" onClick={() => { addConclusion({ value: 'agr_auto_neg', title: ' (disfunción autonómica negativa)' }); goTo('E'); }} />
      <button className="w-full mt-1 px-4 py-2 rounded-lg border border-dashed border-white/20 text-slate-400 text-xs hover:border-white/40 hover:text-white transition-colors" onClick={() => goTo('E')}>Saltar →</button>
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
function StepG_pred({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('F'); }} onReset={resetAll} />
      <StepTitle>Predominio</StepTitle>
      <Btn label="PREDOMINIO SENSITIVO" onClick={() => { addConclusion({ value: 'pred_sensitivo', title: ' predominio sensitivo,' }); goTo('G'); }} />
      <Btn label="PREDOMINIO MOTOR"     onClick={() => { addConclusion({ value: 'pred_motor',     title: ' predominio motor,'     }); goTo('G'); }} />
    </div>
  );
}

/* G — Intensidad */
function StepG({ goTo, setStep, removeConclusion, resetAll, esDesmielinizante, esMixta, setEsSensitiva }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['int_leve',    ' intensidad leve'],
    ['int_moderada',' intensidad moderada'],
    ['int_severa',  ' intensidad severa'],
  ];
  const backStep = esMixta ? 'G_pred' : 'F';
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setEsSensitiva(false); setStep(backStep); }} onReset={resetAll} />
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
          if (ovKey) addOverlays([ovKey]);
          goTo('J');
        }} />
      ))}
    </div>
  );
}

/* J — Extensión */
function StepJ({ goTo, setStep, removeConclusion, resetAll, addOverlays, esDesmielinizante, esSensitiva }) {
  const { addConclusion } = useContext(ReportContext);
  const opts = [
    ['ext_proximal',     'ProximalImg', ' proximal.'],
    ['ext_distal',       'DistalImg',   ' distal.'],
    ['ext_segmentaria',  'ProximalAim', ' segmentaria.'],
    ['ext_generalizada', null,          ' generalizada.'],
  ];
  const labels = ['PROXIMAL','DISTAL','SEGMENTARIA','GENERALIZADA'];

  /* Siguiente paso:
     - desmielinizante (cualquier fibra) → L_des (RecuperacionDes, con \n\n)
     - axonal sensitiva                  → L_des (RecuperacionDes, con \n\n, sin Reinervación)
     - axonal motora / mixta             → K (Reinervación → L sin \n\n) */
  const nextStep = (esDesmielinizante || esSensitiva) ? 'L_des' : 'K';

  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('I'); }} onReset={resetAll} />
      <StepTitle>Extensión</StepTitle>
      {opts.map(([val, ovKey, title], i) => (
        <Btn key={val} label={labels[i]} onClick={() => {
          addConclusion({ value: val, title });
          if (ovKey) addOverlays([ovKey]);
          goTo(nextStep);
        }} />
      ))}
    </div>
  );
}

/* K — Reinervación (solo axonal) */
function StepK({ goTo, setStep, removeConclusion, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('J'); }} onReset={resetAll} />
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
function StepL_des({ goTo, setStep, removeConclusion, resetAll }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow onBack={() => { removeConclusion(null, 1); setStep('J'); }} onReset={resetAll} />
      <StepTitle>Pronóstico de recuperación</StepTitle>
      <Btn label="COMPLETA"           onClick={() => { addConclusion({ value:'rec_completa', title:"\n\nPronóstico de recuperación completa."          }); goTo('FINAL'); }} />
      <Btn label="PARCIAL FUNCIONAL"  onClick={() => { addConclusion({ value:'rec_parcial',  title:"\n\nPronóstico de recuperación parcial funcional."  }); goTo('FINAL'); }} />
      <Btn label="POBRE NO FUNCIONAL" onClick={() => { addConclusion({ value:'rec_pobre',    title:"\n\nPronóstico de recuperación pobre no funcional." }); goTo('FINAL'); }} />
      <Btn label="NULO"               onClick={() => { addConclusion({ value:'rec_nulo',     title:"\n\nPronóstico de recuperación nulo."                }); goTo('FINAL'); }} />
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────────── */
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
  }, []); // eslint-disable-line

  /* Figuras */
  const [figuras, setFiguras] = useState([]);
  const laminaRef = useRef(null);
  const agregarFigura = useCallback((tipo, src) => {
    const SIZE = 80;
    const rect = laminaRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width / 2 - SIZE / 2) : 60;
    const cy = rect ? (rect.height / 2 - SIZE / 2) : 60;
    setFiguras(p => [...p, { id: Date.now() + Math.random(), src, tipo, x: cx, y: cy }]);
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

  /* Modales / tabs */
  const [cropState, setCropState]             = useState(null);
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
                {figuras.length > 0 && <p style={{ color:'rgba(255,255,255,0.35)', fontSize:11, margin:'4px 0 12px', fontStyle:'italic' }}>{figuras.length} figura{figuras.length>1?'s':''} en la lámina</p>}
              </>
            )}
            {activeTab === 'lista' && (
              <>
                <StepTitle>Imagen de tabla</StepTitle>
                <button onClick={() => setShowGaleria(true)} style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'18px 12px', borderRadius:10, cursor:'pointer', marginBottom:12, background:'rgba(255,255,255,0.05)', border:'1px dashed rgba(255,255,255,0.15)' }}>
                  {imgLista
                    ? <img src={imgLista.src} alt="tabla" style={{ width:'100%', maxHeight:100, objectFit:'contain', borderRadius:6 }} />
                    : <><svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18" /></svg><span style={{ color:'rgba(255,255,255,0.35)', fontSize:12 }}>Sin imagen seleccionada</span></>
                  }
                </button>
                {imgLista && <button onClick={() => setImgLista(null)} style={{ width:'100%', padding:'5px 0', borderRadius:8, marginBottom:10, background:'transparent', border:'1px solid rgba(239,68,68,0.4)', color:'#ef4444', fontSize:12, cursor:'pointer' }}>Quitar imagen</button>}
                <button onClick={() => { setComentarioTemp(comentarioLista); setShowComentarioModal(true); }} style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'#f97316', border:'none', cursor:'pointer', color:'#fff', fontWeight:700, fontSize:14 }}>{comentarioLista ? 'Editar Comentario' : 'Agregar Comentario'}</button>
                {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:8 }}>{comentarioLista.length>100?comentarioLista.slice(0,100)+'…':comentarioLista}</p>}
              </>
            )}
            <div style={{ marginTop:8 }}>
              <ExportBar
                nombrePaciente={nombrePaciente}
                textoReporte={textoFinal}
                activeOv={overlayKeys}
                figuras={figuras}
                laminaSize={{ w: laminaRef.current?.clientWidth||690, h: laminaRef.current?.clientHeight||620 }}
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
      <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto' }}>

        {/* TOP BAR */}
        <div style={{ flexShrink:0, width:'100%', height:52, background:'#111', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'0 20px', boxSizing:'border-box' }}>
          <div>
            <button onClick={() => router.push('/Reporte')} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer', color:'#fff', fontSize:13, fontWeight:500 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Regresar
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <input type="text" value={nombrePaciente} onChange={e => setNombrePaciente(e.target.value)} placeholder="Nombre del paciente" style={{ width:580, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'6px 14px', color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box', textAlign:'center' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
            {session?.user?.imageUrl && <img src={session.user.imageUrl} alt="" style={{ width:32, height:32, borderRadius:8, objectFit:'contain', opacity:0.85 }} />}
          </div>
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
              {figuras.map(f => (
                <div key={f.id} onMouseDown={e => onFiguraMouseDown(e, f)} style={{ position:'absolute', left:f.x, top:f.y, zIndex:20, width:80, height:80, cursor:'grab', userSelect:'none' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" draggable={false} style={{ width:80, height:80, objectFit:'cover', borderRadius:f.tipo==='circle'?'50%':0, border:'1.5px solid gray', display:'block', pointerEvents:'none' }} />
                  <button onMouseDown={e=>e.stopPropagation()} onClick={()=>eliminarFigura(f.id)} style={{ position:'absolute', top:-10, right:-10, width:24, height:24, borderRadius:'50%', background:'red', border:'none', cursor:'pointer', color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>✕</button>
                  <button onMouseDown={e=>e.stopPropagation()} onClick={()=>setCropState({id:f.id,src:f.src})} style={{ position:'absolute', bottom:-10, left:-10, width:26, height:26, borderRadius:'50%', background:'rgba(0,0,0,0.75)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" /></svg>
                  </button>
                </div>
              ))}
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
                {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:6 }}>💬 {comentarioLista.length>100?comentarioLista.slice(0,100)+'…':comentarioLista}</p>}
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
