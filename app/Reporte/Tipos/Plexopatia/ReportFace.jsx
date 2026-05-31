'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import './Style.css';

/* ─── Galería de tablas ─────────────────────────────────────────────────── */
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

function GaleriaTablas({ onSelect, onClose }) {
  const [busqueda, setBusqueda] = useState('');
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10100, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#2a2a2a', borderRadius:14, width:'100%', maxWidth:480, maxHeight:'85vh', display:'flex', flexDirection:'column', border:'1px solid rgba(255,255,255,0.1)', overflow:'hidden' }}>
        <div style={{ padding:'18px 20px 12px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ color:'#fff', fontSize:17, fontWeight:700, margin:'0 0 12px', textAlign:'center' }}>Selecciona una imagen:</h3>
          <input type="text" value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar imagen..." autoFocus
            style={{ width:'100%', boxSizing:'border-box', background:'#444', border:'none', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:14, outline:'none' }} />
        </div>
        <div style={{ flex:1, overflowY:'auto' }}>
          {filtradas.length === 0
            ? <p style={{ color:'rgba(255,255,255,0.4)', fontStyle:'italic', padding:20, textAlign:'center', margin:0 }}>Sin resultados.</p>
            : filtradas.map((t,i) => (
                <button key={i} onClick={() => onSelect(`${TABLAS_URL}/${t.file}`)}
                  style={{ width:'100%', textAlign:'left', padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.07)', color:'#fff', fontSize:14, cursor:'pointer' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(249,115,22,0.12)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >{t.id}</button>
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

/* ─── Crop modal ─────────────────────────────────────────────────────────── */
function CropModal({ src, onConfirm, onClose }) {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [sel, setSel] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const startRef = useRef({ x:0, y:0 });
  const getRelPos = (e, el) => { const r = el.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top }; };
  const onMouseDown = (e) => { const pos = getRelPos(e, overlayRef.current); startRef.current=pos; setSel({ x:pos.x, y:pos.y, w:0, h:0 }); setDrawing(true); };
  const onMouseMove = (e) => { if (!drawing) return; const pos = getRelPos(e, overlayRef.current); setSel({ x:Math.min(startRef.current.x,pos.x), y:Math.min(startRef.current.y,pos.y), w:Math.abs(pos.x-startRef.current.x), h:Math.abs(pos.y-startRef.current.y) }); };
  const onMouseUp = () => setDrawing(false);
  const applyCrop = () => {
    if (!sel || sel.w < 5 || sel.h < 5) { onClose(); return; }
    const img = imgRef.current; const overlay = overlayRef.current;
    const scaleX = img.naturalWidth/overlay.clientWidth; const scaleY = img.naturalHeight/overlay.clientHeight;
    const canvas = canvasRef.current;
    canvas.width = sel.w*scaleX; canvas.height = sel.h*scaleY;
    canvas.getContext('2d').drawImage(img, sel.x*scaleX, sel.y*scaleY, sel.w*scaleX, sel.h*scaleY, 0, 0, canvas.width, canvas.height);
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
        <button onClick={onClose} style={{ padding:'9px 28px', borderRadius:10, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', fontSize:14, cursor:'pointer' }}>Cancelar</button>
      </div>
    </div>
  );
}

/* ─── limpiarTextoReporte ────────────────────────────────────────────────── */
function limpiarTextoReporte(s) {
  if (!s) return '';
  return s.split('\n\n').map(parrafo => {
    let t = parrafo.replace(/[ \t]+/g, ' ').trim();
    t = t.replace(/\s+([.,;:])/g, '$1');
    if (!t) return '';
    t = t[0].toUpperCase() + t.slice(1);
    // Capitalize first letter after a sentence-ending period + space
    t = t.replace(/([.!?])\s+([a-záéíóúüñ])/g, (_, p, c) => `${p} ${c.toUpperCase()}`);
    if (!/[.!?]$/.test(t)) t += '.';
    return t;
  }).filter(Boolean).join('\n\n');
}

/* ─── Overlay keys (public folder: /PlexopatiaImg/) ─────────────────────── */
const OVERLAYS_PLEXO = {
  'IzquierdoIMG':   '/PlexopatiaImg/PlcervicalIZQ.png',
  'DerechoIMG':     '/PlexopatiaImg/PlCervicalDec.png',
  'ImgTroncosDrc':  '/PlexopatiaImg/TroncoSpD.png',
  'ImgTroncosIzq':  '/PlexopatiaImg/TroncoSpIzq.png',
  'ImgTroncoMdDrc': '/PlexopatiaImg/TroncoMdD.png',
  'ImgTroncoMdIzq': '/PlexopatiaImg/TroncoMdIzq.png',
  'ImgTroncoInDrc': '/PlexopatiaImg/TroncoInD.png',
  'ImgTroncoInIzq': '/PlexopatiaImg/TroncoInIzq.png',
  'ImgTroncoSpBlt': '/PlexopatiaImg/TroncoSpBl.png',
  'ImgTroncoMdBlt': '/PlexopatiaImg/TroncoMdBl.png',
  'ImgTroncoInBlt': '/PlexopatiaImg/TroncoInBl.png',
  'CordonLtD':      '/PlexopatiaImg/CordonLtD.png',
  'CordonMdD':      '/PlexopatiaImg/CordonMdD.png',
  'CordonPsD':      '/PlexopatiaImg/CordonPsD.png',
  'CordonLtIzq':    '/PlexopatiaImg/CordonLtIzq.png',
  'CordonMdIzq':    '/PlexopatiaImg/CordonMdIzq.png',
  'CordonPsIzq':    '/PlexopatiaImg/CordonPsIzq.png',
  'CordonLtBlt':    '/PlexopatiaImg/CordonLtBlt.png',
  'CordonMdBlt':    '/PlexopatiaImg/CordonMdBlt.png',
  'CordonPsBlt':    '/PlexopatiaImg/CordonPsBlt.png',
  'LumbosacroDrc':  '/PlexopatiaImg/LumbosacroD.png',
  'LumbosacroIzq':  '/PlexopatiaImg/LumbosacroIzq.png',
  'LumbosacroBlt':  '/PlexopatiaImg/LumbosacroBlt.png',
  'LumbarDrc':      '/PlexopatiaImg/PxLumbarD.png',
  'LumbarIzq':      '/PlexopatiaImg/PxLumbarIzq.png',
  'LumbarBlt':      '/PlexopatiaImg/LumbarBlt.png',
  'TcLumbosDrc':    '/PlexopatiaImg/TcLumbosacroD.png',
  'TcLumbosIzq':    '/PlexopatiaImg/TcLumbosacroIzq.png',
  'TcLumbosBlt':    '/PlexopatiaImg/TcLumbosacroBlt.png',
  'SacroDrc':       '/PlexopatiaImg/SacroD.png',
  'SacroIzq':       '/PlexopatiaImg/SacroIzq.png',
  'SacroBlt':       '/PlexopatiaImg/SacroBlt.png',
  'IliohipoDrc':    '/PlexopatiaImg/IliohipoD.png',
  'IliohipoIzq':    '/PlexopatiaImg/IliohipoIzq.png',
  'IliohipoBlt':    '/PlexopatiaImg/IliohipoBlt.png',
  'FemoroDrc':      '/PlexopatiaImg/FemoroD.png',
  'FemoroIzq':      '/PlexopatiaImg/FemoroIzq.png',
  'FemoroBlt':      '/PlexopatiaImg/FemoroBlt.png',
  'PudendoDrc':     '/PlexopatiaImg/PudendoD.png',
  'PudendoIzq':     '/PlexopatiaImg/PudendoIzq.png',
};

/* ─── joinConY ───────────────────────────────────────────────────────────── */
function joinConY(arr) {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  const last = arr[arr.length - 1];
  const conj = last.trim().toLowerCase().startsWith('i') ? ' e ' : ' y ';
  if (arr.length === 2) return arr[0] + conj + arr[1];
  return arr.slice(0, -1).join(', ') + conj + last;
}

/* ─── Step UI helpers ────────────────────────────────────────────────────── */
function StepTitle({ children }) {
  return <p className="text-orange-400 text-xs font-bold tracking-widest mb-3 mt-1 uppercase">{children}</p>;
}

function CBtn({ label, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white text-sm font-medium transition-all">
      {label}
    </button>
  );
}

function MultiBtn({ label, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border text-sm font-medium transition-all
        ${selected ? 'bg-orange-500/30 border-orange-500 text-white' : 'border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 text-white'}`}>
      {label}
    </button>
  );
}

function NavRow({ onBack, onReset, onPdf }) {
  const circleBase = {
    width: 44, height: 44, borderRadius: '50%',
    border: '1.5px solid #ff4500',
    background: '#000',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s',
    padding: 0, position: 'relative',
  };
  const tooltipStyle = {
    position: 'absolute', top: 'calc(100% + 6px)', left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(30,30,30,0.95)', color: '#fff',
    fontSize: 11, whiteSpace: 'nowrap',
    padding: '3px 8px', borderRadius: 4,
    pointerEvents: 'none', opacity: 0, transition: 'opacity 0.15s',
    zIndex: 99999, border: '1px solid rgba(255,69,0,0.4)',
  };
  const showTip = e => { const t = e.currentTarget.querySelector('.nav-tip'); if (t) t.style.opacity = '1'; };
  const hideTip = e => { const t = e.currentTarget.querySelector('.nav-tip'); if (t) t.style.opacity = '0'; };
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
      <button onClick={onBack}
        style={circleBase}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.15)'; showTip(e); }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; hideTip(e); }}>
        <img src="/I_Out_white.svg" alt="Regresar" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
        <span className="nav-tip" style={tooltipStyle}>Regresar</span>
      </button>
      <button onClick={onReset}
        style={circleBase}
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

function SiguienteBtn({ disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all
        ${disabled ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>
      Siguiente →
    </button>
  );
}

/* ─── Catálogo de símbolos ──────────────────────────────────────────────── */
const SIMBOLOS = [
  { grupo: 'Círculos Rojos',  items: [
    { label: 'Rojo 1',     src: '/assets/Simbolos/S_Circulo Rojo XS (4px).png' },
    { label: 'Rojo 2',      src: '/assets/Simbolos/S_Circulo Rojo S.png' },
    { label: 'Rojo 3',   src: '/assets/Simbolos/S_Circulo Rojo Intermedio (5.1px).png' },
    { label: 'Rojo 4',     src: '/assets/Simbolos/S_Circulo Rojo XL.png' },
  ]},
  { grupo: 'Cruces',          items: [
    { label: 'Cruz 1',      src: '/assets/Simbolos/S_Cruz 1.png' },
    { label: 'Cruz 2',      src: '/assets/Simbolos/S_Cruz 2.png' },
    { label: 'Cruz 3',      src: '/assets/Simbolos/S_Cruz 3.png' },
    { label: 'Cruz 4',      src: '/assets/Simbolos/S_Cruz 4.png' },
  
  ]},
  { grupo: 'Cruces Rojas',    items: [
    { label: 'Cruz R01',    src: '/assets/Simbolos/S_Cruz_Rojo01.png' },
    { label: 'Cruz R02',    src: '/assets/Simbolos/S_Cruz_Rojo02.png' },
    { label: 'Cruz R03',    src: '/assets/Simbolos/S_Cruz_Rojo03.png' },
    { label: 'Cruz R04',    src: '/assets/Simbolos/S_Cruz_Rojo04.png' },
  ]},
  { grupo: 'Otros',           items: [
    { label: 'ZigZag',      src: '/assets/Simbolos/S_ZigZag.png' },
    { label: 'ZigZag 2',    src: '/assets/Simbolos/S_ZigZag2.png' },
    { label: 'Inching 1',   src: '/assets/Simbolos/S_Inching 1.png' },
    { label: 'Inching 2',   src: '/assets/Simbolos/S_Inching 2.png' },
    { label: 'Inching 3',   src: '/assets/Simbolos/S_Inching 3.png' },
  ]},
];

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
export default function ReportFace() {
  const { data: session } = useSession();
  const router = useRouter();

  /* ── State ── */
  const [step, setStep]           = useState('Plexo');
  const [conclusions, setConclusions] = useState([]);
  const [multiSel, setMultiSel]   = useState([]);
  const [activeOv, setActiveOv]   = useState([]);
  const [ovHist, setOvHist]       = useState([]);
  const [plexoTipo, setPlexoTipo] = useState('');
  const [ladoKey, setLadoKey]     = useState('');
  const [activeTab, setActiveTab] = useState('reporte');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [figuras, setFiguras]     = useState([]);
  const [imgLista, setImgLista]   = useState(null);
  const [comentarioLista, setComentarioLista] = useState('');
  const [showGaleria, setShowGaleria] = useState(false);
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [comentarioTemp, setComentarioTemp] = useState('');
  const [pdfOpen, setPdfOpen]     = useState(false);
  const [cropState, setCropState] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [editadoManual, setEditadoManual] = useState(false);
  const [showSimbolos, setShowSimbolos] = useState(false);
  const laminaRef = useRef(null);

  /* ── Overlay helpers ── */
  const addOverlays = useCallback((ids) => {
    setActiveOv(p => [...p, ...ids.filter(i => !p.includes(i))]);
    setOvHist(h => [...h, ids]);
  }, []);

  const removeLastOverlayGroup = useCallback(() => {
    setOvHist(h => {
      if (!h.length) return h;
      const last = h[h.length - 1];
      setActiveOv(p => p.filter(k => !last.includes(k)));
      return h.slice(0, -1);
    });
  }, []);

  /* ── Conclusion helpers ── */
  const pushConclusion = useCallback((value, title, lista) =>
    setConclusions(prev => [...prev, { value, title, lista: lista ?? title }]), []);

  const popConclusion = useCallback((n = 1) =>
    setConclusions(prev => prev.slice(0, -n)), []);

  // Reemplaza o agrega una conclusión con el value dado (para actualizar en tiempo real durante multi-select)
  const upsertConclusion = useCallback((value, title, lista) =>
    setConclusions(prev => {
      const idx = prev.findIndex(c => c.value === value);
      const entry = { value, title, lista: lista ?? title };
      if (idx === -1) return [...prev, entry];
      const next = [...prev]; next[idx] = entry; return next;
    }), []);

  // Elimina la conclusión con el value dado
  const removeConclusion = useCallback((value) =>
    setConclusions(prev => prev.filter(c => c.value !== value)), []);

  /* ── Back helper: pops 1 conclusion + 1 overlay group ── */
  const goBack1 = useCallback((toStep) => {
    popConclusion(1);
    removeLastOverlayGroup();
    setStep(toStep);
    setShowSimbolos(false);
  }, [popConclusion, removeLastOverlayGroup]);

  /* ── Reset ── */
  const resetAll = useCallback(() => {
    setStep('Plexo'); setConclusions([]); setMultiSel([]);
    setActiveOv([]); setOvHist([]); setPlexoTipo(''); setLadoKey('');
    setActiveTab('reporte'); setFiguras([]);
    setImgLista(null); setComentarioLista('');
    setTextoEditado(''); setEditadoManual(false);
    setShowSimbolos(false);
  }, []);

  /* ── Texto reporte ── */
  const textoReporte = useMemo(() =>
    limpiarTextoReporte(conclusions.map(c => c.title).join('')),
    [conclusions]
  );

  // Sync editable text unless manually edited
  const prevTextoRef = useRef('');
  if (!editadoManual && textoReporte !== prevTextoRef.current) {
    prevTextoRef.current = textoReporte;
    if (textoEditado !== textoReporte) setTextoEditado(textoReporte);
  }
  const textoFinal = editadoManual ? textoEditado : textoReporte;

  /* ── Lista visual ── */
  const listaVisual = useMemo(() => {
    // Construye la lista igual que la app móvil: cada step es una fila, con labels legibles
    const LABELS = {
      Plexo:'Plexo', Lado:'Lado', 'Evolución':'Evolución',
      'Ubicación':'Ubicación',
      Preganglionar_parcial:'Ubicación', Postganglionar_total:'Ubicación', Postganglionar_parcial:'Ubicación',
      Tronco:'Tronco', Cordones:'Cordones', Divisiones:'Divisiones',
      Tipo:'Tipo', Axonal:'Tipo', Mixta:'Tipo', Desmielinizante:'Tipo',
      Intensidad:'Intensidad', 'Reinervación':'Reinervación', 'Pronóstico':'Pronóstico',
    };
    // Pasos sub-ubicación que se fusionan a la entrada Ubicación
    const SUB_UBIC = new Set(['Preganglionar_parcial','Postganglionar_total','Postganglionar_parcial']);
    const map = {};
    const order = [];
    for (const c of conclusions) {
      if (!c.value) continue;
      const label = LABELS[c.value] || c.value;
      let v = (c.lista ?? c.title).trim().replace(/^[,;. ]+/, '');
      if (!v) continue;
      if (SUB_UBIC.has(c.value)) {
        // Fusiona con la entrada Ubicación base
        if (map['Ubicación'] !== undefined) {
          map['Ubicación'] += ' ' + v;
        } else {
          map['Ubicación'] = v;
          order.push('Ubicación');
        }
      } else if (map[label] !== undefined) {
        map[label] += ' ' + v;
      } else {
        map[label] = v;
        order.push(label);
      }
    }
    // Mirror mobile: append Divisiones/Tronco/Cordones value to Ubicación row
    // and remove them as standalone rows so they don't appear twice
    const fusionados = new Set();
    if (map['Ubicación'] && /a nivel de\s*$/i.test(map['Ubicación'])) {
      const subKey = ['Tronco','Cordones','Divisiones'].find(k => map[k]);
      if (subKey) {
        map['Ubicación'] = map['Ubicación'].trimEnd() + ' ' + map[subKey];
        fusionados.add(subKey);
      }
    }
    return order.filter(k => !fusionados.has(k)).map(k => ({ k, v: map[k] }));
  }, [conclusions]);

  /* ── Figura drag ── */
  const dragRef = useState(() => ({ active:null, startX:0, startY:0, origX:0, origY:0 }))[0];
  const agregarFigura = useCallback((tipo, src) => {
    const DISPLAY = tipo === 'symbol' ? 48 : 80;
    const rect = laminaRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width/2  - DISPLAY/2) : 60;
    const cy = rect ? (rect.height/2 - DISPLAY/2) : 60;
    const img = new window.Image();
    img.onload = () => {
      setFiguras(p => [...p, { id: Date.now()+Math.random(), src, tipo, x:cx, y:cy, nw: img.naturalWidth, nh: img.naturalHeight, dw: DISPLAY, dh: DISPLAY }]);
    };
    img.onerror = () => {
      setFiguras(p => [...p, { id: Date.now()+Math.random(), src, tipo, x:cx, y:cy, dw: DISPLAY, dh: DISPLAY }]);
    };
    img.src = src;
  }, []);
  const eliminarFigura = useCallback((id) => setFiguras(p => p.filter(f => f.id !== id)), []);
  const moverFigura    = useCallback((id, x, y) => setFiguras(p => p.map(f => f.id===id ? {...f,x,y} : f)), []);
  const rotarFigura    = useCallback((id, delta) => setFiguras(p => p.map(f => f.id===id ? {...f, rotation: ((f.rotation ?? 0) + delta + 360) % 360} : f)), []);
  const ROTATE_STEP = 3;
  const onFiguraMouseDown = useCallback((e, figura) => {
    e.preventDefault();
    dragRef.active=figura.id; dragRef.startX=e.clientX; dragRef.startY=e.clientY;
    dragRef.origX=figura.x; dragRef.origY=figura.y;
    const onMove = (ev) => {
      if (!dragRef.active) return;
      const canvas = laminaRef.current;
      const maxX = canvas ? canvas.clientWidth  - 80 : 9999;
      const maxY = canvas ? canvas.clientHeight - 80 : 9999;
      moverFigura(dragRef.active,
        Math.max(0, Math.min(dragRef.origX+(ev.clientX-dragRef.startX), maxX)),
        Math.max(0, Math.min(dragRef.origY+(ev.clientY-dragRef.startY), maxY)),
      );
    };
    const onUp = () => { dragRef.active=null; window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',onUp); };
    window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
  }, [dragRef, moverFigura, laminaRef]);

  /* ── STEP RENDERERS ── */

  const renderStep = () => {
    // ── Plexo
    if (step === 'Plexo') return (
      <div>
        <StepTitle>Plexo</StepTitle>
        {[
          { n:'Cervical',   t:'Plexopatía cervical',   l:'Cervical'   },
          { n:'Braquial',   t:'Plexopatía braquial',   l:'Braquial'   },
          { n:'Lumbosacro', t:'Plexopatía lumbosacra', l:'Lumbosacro' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            setPlexoTipo(op.n); pushConclusion('Plexo', op.t, op.l); addOverlays([]);
            setStep('Lado');
          }} />
        ))}
      </div>
    );

    // ── Lado
    if (step === 'Lado') {
      const isCervical = plexoTipo === 'Cervical';
      const opts = [
        { n:'Izquierdo', t:' izquierda,', k:'Izq', img: isCervical ? 'IzquierdoIMG' : null },
        { n:'Derecho',   t:' derecha,',   k:'Drc', img: isCervical ? 'DerechoIMG'   : null },
        { n:'Bilateral', t:' bilateral,', k:'Blt', img: isCervical ? 'BilateralIMG' : null },
      ];
      // BilateralIMG expands to both
      const expandBilateral = (img) => img === 'BilateralIMG' ? ['IzquierdoIMG','DerechoIMG'] : img ? [img] : [];
      return (
        <div>
          <NavRow onBack={() => { goBack1('Plexo'); setPlexoTipo(''); }} onReset={resetAll} />
          <StepTitle>Lado</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              setLadoKey(op.k); pushConclusion('Lado', op.t, op.n);
              addOverlays(expandBilateral(op.img));
              setStep(plexoTipo==='Cervical' ? 'Evolucion_C' : plexoTipo==='Braquial' ? 'Evolucion_B' : 'Evolucion_L');
            }} />
          ))}
        </div>
      );
    }

    // ── Evolución Cervical
    if (step === 'Evolucion_C') return (
      <div>
        <NavRow onBack={() => { goBack1('Lado'); setLadoKey(''); }} onReset={resetAll} />
        <StepTitle>Evolución</StepTitle>
        {['Aguda','Subaguda','Crónica'].map(n => (
          <CBtn key={n} label={n} onClick={() => { pushConclusion('Evolución', ` ${n.toLowerCase()}`, n); addOverlays([]); setStep('Tipos'); }} />
        ))}
      </div>
    );

    // ── Evolución Braquial
    if (step === 'Evolucion_B') return (
      <div>
        <NavRow onBack={() => { goBack1('Lado'); setLadoKey(''); }} onReset={resetAll} />
        <StepTitle>Evolución</StepTitle>
        {['Aguda','Subaguda','Crónica'].map(n => (
          <CBtn key={n} label={n} onClick={() => { pushConclusion('Evolución', ` ${n.toLowerCase()}`, n); addOverlays([]); setStep('Ubicacion_B'); }} />
        ))}
      </div>
    );

    // ── Evolución Lumbosacro
    if (step === 'Evolucion_L') return (
      <div>
        <NavRow onBack={() => { goBack1('Lado'); setLadoKey(''); }} onReset={resetAll} />
        <StepTitle>Evolución</StepTitle>
        {['Aguda','Subaguda','Crónica'].map(n => (
          <CBtn key={n} label={n} onClick={() => { pushConclusion('Evolución', ` ${n.toLowerCase()}`, n); addOverlays([]); setStep('Ubicacion_L'); }} />
        ))}
      </div>
    );

    // ── Ubicación Braquial
    if (step === 'Ubicacion_B') {
      const d = ladoKey;
      const troncoImg = d==='Drc'?'TroncosDrc': d==='Izq'?'TroncosIzq':'TroncosBlt';
      const salidaImg = d==='Drc'?'ImgTroncoInDrc': d==='Izq'?'ImgTroncoInIzq':'ImgTroncoInBlt';
      const expandGroup = (k) => {
        const G = { TroncosDrc:['ImgTroncosDrc','ImgTroncoMdDrc','ImgTroncoInDrc'], TroncosIzq:['ImgTroncosIzq','ImgTroncoMdIzq','ImgTroncoInIzq'], TroncosBlt:['ImgTroncoSpBlt','ImgTroncoMdBlt','ImgTroncoInBlt'] };
        return G[k] ? G[k] : k ? [k] : [];
      };
      const opts = [
        { n:'Preganglionar total',    t:' preganglionar total',               l:'Preganglionar total a nivel',         img:troncoImg, next:'Tipos' },
        { n:'Preganglionar parcial',  t:' preganglionar parcial a nivel de',  l:'Preganglionar parcial a nivel de',    img:null,      next:'Pregang_parcial_B' },
        { n:'Postganglionar total',   t:' postganglionar total a nivel de',   l:'Postganglionar total a nivel de',     img:null,      next:'Postgang_total_B' },
        { n:'Postganglionar parcial', t:' postganglionar parcial a nivel de', l:'Postganglionar parcial a nivel de',   img:null,      next:'Postgang_parcial_B' },
        { n:'Salida torácica',        t:'  a nivel de salida torácica',       l:'Salida torácica',                    img:salidaImg, next:'Tipos' },
      ];
      return (
        <div>
          <NavRow onBack={() => goBack1('Evolucion_B')} onReset={resetAll} />
          <StepTitle>Ubicación</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              pushConclusion('Ubicación', op.t, op.l); addOverlays(op.img ? expandGroup(op.img) : []); setStep(op.next);
            }} />
          ))}
        </div>
      );
    }

    // ── Preganglionar parcial Braquial (multi C5-T1)
    if (step === 'Pregang_parcial_B') {
      const d = ladoKey;
      const roots = [
        { n:'C5', img: d==='Drc'?'ImgTroncosDrc':  d==='Izq'?'ImgTroncosIzq':'ImgTroncoSpBlt' },
        { n:'C6', img: d==='Drc'?'ImgTroncosDrc':  d==='Izq'?'ImgTroncosIzq':'ImgTroncoSpBlt' },
        { n:'C7', img: d==='Drc'?'ImgTroncoMdDrc': d==='Izq'?'ImgTroncoMdIzq':'ImgTroncoMdBlt' },
        { n:'C8', img: d==='Drc'?'ImgTroncoInDrc': d==='Izq'?'ImgTroncoInIzq':'ImgTroncoInBlt' },
        { n:'T1', img: d==='Drc'?'ImgTroncoInDrc': d==='Izq'?'ImgTroncoInIzq':'ImgTroncoInBlt' },
      ];
      const toggle = (n) => {
        setMultiSel(p => {
          const nuevo = p.includes(n) ? p.filter(x=>x!==n) : [...p,n];
          if (nuevo.length === 0) { removeConclusion('Preganglionar_parcial'); }
          else { const sel = joinConY(nuevo); upsertConclusion('Preganglionar_parcial', ' '+sel, sel); }
          // overlays en tiempo real
          const imgs = [...new Set(nuevo.map(x=>roots.find(r=>r.n===x)?.img).filter(Boolean))];
          setActiveOv(ov => { const sin = ov.filter(k => !roots.map(r=>r.img).includes(k)); return [...sin, ...imgs]; });
          return nuevo;
        });
      };
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>roots.find(r=>r.n===n)?.img).filter(Boolean))];
        setOvHist(h => [...h, imgs]);
        setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { removeConclusion('Preganglionar_parcial'); setActiveOv(ov => ov.filter(k => !roots.map(r=>r.img).includes(k))); goBack1('Ubicacion_B'); setMultiSel([]); }} onReset={resetAll} />
          <StepTitle>Preganglionar parcial</StepTitle>
          <p className="text-white/40 text-xs mb-2">Selecciona uno o más</p>
          {roots.map(r => <MultiBtn key={r.n} label={r.n} selected={multiSel.includes(r.n)} onClick={() => toggle(r.n)} />)}
          <SiguienteBtn disabled={!multiSel.length} onClick={confirm} />
        </div>
      );
    }

    // ── Postganglionar total Braquial
    if (step === 'Postgang_total_B') {
      const d = ladoKey;
      const opts = [
        { n:'Troncos (Supraclavicular)',  t:' troncos',    l:' troncos',    img: d==='Drc'?'TroncosDrc': d==='Izq'?'TroncosIzq':'TroncosBlt' },
        { n:'Divisiones (Clavicular)',    t:' divisiones', l:' divisiones', img: d==='Drc'?'CordonesDrc':d==='Izq'?'CordonesIzq':'CordonesBlt' },
        { n:'Cordones (Infraclavicular)', t:' cordones',   l:' cordones',   img: d==='Drc'?'CordonesDrc':d==='Izq'?'CordonesIzq':'CordonesBlt' },
      ];
      const GC = { CordonesDrc:['CordonLtD','CordonMdD','CordonPsD'], CordonesIzq:['CordonLtIzq','CordonMdIzq','CordonPsIzq'], CordonesBlt:['CordonLtBlt','CordonMdBlt','CordonPsBlt'],
        TroncosDrc:['ImgTroncosDrc','ImgTroncoMdDrc','ImgTroncoInDrc'], TroncosIzq:['ImgTroncosIzq','ImgTroncoMdIzq','ImgTroncoInIzq'], TroncosBlt:['ImgTroncoSpBlt','ImgTroncoMdBlt','ImgTroncoInBlt'] };
      return (
        <div>
          <NavRow onBack={() => goBack1('Ubicacion_B')} onReset={resetAll} />
          <StepTitle>Postganglionar total</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              pushConclusion('Postganglionar_total', op.t, op.l); addOverlays(GC[op.img]||[op.img]); setStep('Tipos');
            }} />
          ))}
        </div>
      );
    }

    // ── Postganglionar parcial Braquial
    if (step === 'Postgang_parcial_B') {
      const d = ladoKey;
      const GC = { CordonesDrc:['CordonLtD','CordonMdD','CordonPsD'], CordonesIzq:['CordonLtIzq','CordonMdIzq','CordonPsIzq'], CordonesBlt:['CordonLtBlt','CordonMdBlt','CordonPsBlt'] };
      const opts = [
        { n:'Troncos (Supraclavicular)',  t:'', img:null, next:'Troncos_B' },
        { n:'Divisiones (Clavicular)',    t:' divisiones', img:d==='Drc'?'CordonesDrc':d==='Izq'?'CordonesIzq':'CordonesBlt', next:'Tipos' },
        { n:'Cordones (Infraclavicular)', t:'', img:null, next:'Cordones_B' },
      ];
      return (
        <div>
          <NavRow onBack={() => goBack1('Ubicacion_B')} onReset={resetAll} />
          <StepTitle>Postganglionar parcial</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              pushConclusion('Postganglionar_parcial', op.t); addOverlays(op.img?(GC[op.img]||[op.img]):[]); setStep(op.next);
            }} />
          ))}
        </div>
      );
    }

    // ── Troncos Braquial (multi)
    if (step === 'Troncos_B') {
      const d = ladoKey;
      const troncos = [
        { n:'Superior', img: d==='Drc'?'ImgTroncosDrc': d==='Izq'?'ImgTroncosIzq':'ImgTroncoSpBlt' },
        { n:'Medio',    img: d==='Drc'?'ImgTroncoMdDrc':d==='Izq'?'ImgTroncoMdIzq':'ImgTroncoMdBlt' },
        { n:'Inferior', img: d==='Drc'?'ImgTroncoInDrc':d==='Izq'?'ImgTroncoInIzq':'ImgTroncoInBlt' },
      ];
      const toggle = (n) => {
        setMultiSel(p => {
          const nuevo = p.includes(n) ? p.filter(x=>x!==n) : [...p,n];
          if (nuevo.length === 0) { removeConclusion('Tronco'); }
          else {
            const base = nuevo.length === 1 ? 'tronco' : 'troncos';
            const sel = joinConY(nuevo.map(x=>x.toLowerCase()));
            upsertConclusion('Tronco', ` ${base} ${sel}`, `${base} ${sel}`);
          }
          const imgs = [...new Set(nuevo.map(x=>troncos.find(t=>t.n===x)?.img).filter(Boolean))];
          setActiveOv(ov => { const sin = ov.filter(k => !troncos.map(t=>t.img).includes(k)); return [...sin, ...imgs]; });
          return nuevo;
        });
      };
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>troncos.find(t=>t.n===n)?.img).filter(Boolean))];
        setOvHist(h => [...h, imgs]);
        setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { removeConclusion('Tronco'); setActiveOv(ov => ov.filter(k => !troncos.map(t=>t.img).includes(k))); goBack1('Postgang_parcial_B'); setMultiSel([]); }} onReset={resetAll} />
          <StepTitle>Tronco</StepTitle>
          <p className="text-white/40 text-xs mb-2">Selecciona uno o más</p>
          {troncos.map(t => <MultiBtn key={t.n} label={t.n} selected={multiSel.includes(t.n)} onClick={() => toggle(t.n)} />)}
          <SiguienteBtn disabled={!multiSel.length} onClick={confirm} />
        </div>
      );
    }

    // ── Cordones Braquial (multi)
    if (step === 'Cordones_B') {
      const d = ladoKey;
      const cordones = [
        { n:'Lateral',   img: d==='Drc'?'CordonLtD':  d==='Izq'?'CordonLtIzq':'CordonLtBlt' },
        { n:'Medio',     img: d==='Drc'?'CordonMdD':  d==='Izq'?'CordonMdIzq':'CordonMdBlt' },
        { n:'Posterior', img: d==='Drc'?'CordonPsD':  d==='Izq'?'CordonPsIzq':'CordonPsBlt' },
      ];
      const toggle = (n) => {
        setMultiSel(p => {
          const nuevo = p.includes(n) ? p.filter(x=>x!==n) : [...p,n];
          if (nuevo.length === 0) { removeConclusion('Cordones'); }
          else {
            const base = nuevo.length === 1 ? 'cordón' : 'cordones';
            const sel = joinConY(nuevo.map(x=>x.toLowerCase()));
            upsertConclusion('Cordones', ` ${base} ${sel}`, `${base} ${sel}`);
          }
          const imgs = [...new Set(nuevo.map(x=>cordones.find(c=>c.n===x)?.img).filter(Boolean))];
          setActiveOv(ov => { const sin = ov.filter(k => !cordones.map(c=>c.img).includes(k)); return [...sin, ...imgs]; });
          return nuevo;
        });
      };
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>cordones.find(c=>c.n===n)?.img).filter(Boolean))];
        setOvHist(h => [...h, imgs]);
        setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { removeConclusion('Cordones'); setActiveOv(ov => ov.filter(k => !cordones.map(c=>c.img).includes(k))); goBack1('Postgang_parcial_B'); setMultiSel([]); }} onReset={resetAll} />
          <StepTitle>Cordones</StepTitle>
          <p className="text-white/40 text-xs mb-2">Selecciona uno o más</p>
          {cordones.map(c => <MultiBtn key={c.n} label={c.n} selected={multiSel.includes(c.n)} onClick={() => toggle(c.n)} />)}
          <SiguienteBtn disabled={!multiSel.length} onClick={confirm} />
        </div>
      );
    }

    // ── Ubicación Lumbosacro
    if (step === 'Ubicacion_L') {
      const d = ladoKey;
      const lsImg = d==='Drc'?'LumbosacroDrc':d==='Izq'?'LumbosacroIzq':'LumbosacroBlt';
      const opts = [
        { n:'Preganglionar total',    t:' preganglionar total',               l:'Preganglionar total',              img:lsImg, next:'Tipos' },
        { n:'Preganglionar parcial',  t:' preganglionar parcial a nivel de',  l:'Preganglionar parcial a nivel de', img:null,  next:'Divisiones_L' },
        { n:'Postganglionar total',   t:' postganglionar total',              l:'Postganglionar total',             img:lsImg, next:'Tipos' },
        { n:'Postganglionar parcial', t:' postganglionar parcial a nivel de', l:'Postganglionar parcial a nivel de',img:null,  next:'Postgang_parcial_L' },
      ];
      return (
        <div>
          <NavRow onBack={() => goBack1('Evolucion_L')} onReset={resetAll} />
          <StepTitle>Ubicación</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              pushConclusion('Ubicación', op.t, op.l); addOverlays(op.img?[op.img]:[]); setStep(op.next);
            }} />
          ))}
        </div>
      );
    }

    // ── Divisiones Lumbosacro (multi L2-S2)
    if (step === 'Divisiones_L') {
      const d = ladoKey;
      const divs = [
        { n:'L2', img: d==='Drc'?'LumbarDrc':  d==='Izq'?'LumbarIzq':'LumbarBlt' },
        { n:'L3', img: d==='Drc'?'LumbarDrc':  d==='Izq'?'LumbarIzq':'LumbarBlt' },
        { n:'L4', img: d==='Drc'?'TcLumbosDrc':d==='Izq'?'TcLumbosIzq':'TcLumbosBlt' },
        { n:'L5', img: d==='Drc'?'TcLumbosDrc':d==='Izq'?'TcLumbosIzq':'TcLumbosBlt' },
        { n:'S1', img: d==='Drc'?'SacroDrc':   d==='Izq'?'SacroIzq':'SacroBlt' },
        { n:'S2', img: d==='Drc'?'SacroDrc':   d==='Izq'?'SacroIzq':'SacroBlt' },
      ];
      const toggle = (n) => {
        setMultiSel(p => {
          const nuevo = p.includes(n) ? p.filter(x=>x!==n) : [...p,n];
          if (nuevo.length === 0) { removeConclusion('Divisiones'); }
          else { const sel = joinConY(nuevo); upsertConclusion('Divisiones', ' '+sel, sel); }
          const imgs = [...new Set(nuevo.map(x=>divs.find(d=>d.n===x)?.img).filter(Boolean))];
          setActiveOv(ov => { const sin = ov.filter(k => !divs.map(d=>d.img).includes(k)); return [...sin, ...imgs]; });
          return nuevo;
        });
      };
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>divs.find(x=>x.n===n)?.img).filter(Boolean))];
        setOvHist(h => [...h, imgs]);
        setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { removeConclusion('Divisiones'); setActiveOv(ov => ov.filter(k => !divs.map(d=>d.img).includes(k))); goBack1('Ubicacion_L'); setMultiSel([]); }} onReset={resetAll} />
          <StepTitle>Divisiones</StepTitle>
          <p className="text-white/40 text-xs mb-2">Selecciona uno o más</p>
          {divs.map(d2 => <MultiBtn key={d2.n} label={d2.n} selected={multiSel.includes(d2.n)} onClick={() => toggle(d2.n)} />)}
          <SiguienteBtn disabled={!multiSel.length} onClick={confirm} />
        </div>
      );
    }

    // ── Postganglionar parcial Lumbosacro
    if (step === 'Postgang_parcial_L') {
      const d = ladoKey;
      const opts = [
        { n:'Plexo lumbar (Iliohipogástrico e Ilioinginal)',      t:' plexo lumbar (Iliohipogástrico e Ilioinginal)',      l:'a nivel de plexo lumbar (Iliohipogástrico e Ilioinginal)',      img: d==='Drc'?'IliohipoDrc':d==='Izq'?'IliohipoIzq':'IliohipoBlt' },
        { n:'Plexo lumbar (Genitocrural y Femorocutáneo lateral)',t:' plexo lumbar (Genitocrural y Femorocutáneo lateral)',l:'a nivel de plexo lumbar (Genitocrural y Femorocutáneo lateral)',img: d==='Drc'?'FemoroDrc':  d==='Izq'?'FemoroIzq':'FemoroBlt' },
        { n:'Plexo lumbar (Femoral y Obturador)',                 t:' plexo lumbar (Femoral y Obturador)',                 l:'a nivel de plexo lumbar (Femoral y Obturador)',                 img: d==='Drc'?'LumbarDrc':  d==='Izq'?'LumbarIzq':'LumbarBlt' },
        { n:'Tronco lumbosacro (Ciático menor y mayor)',          t:' tronco lumbosacro (Ciático menor y mayor)',          l:'a nivel de tronco lumbosacro (Ciático menor y mayor)',          img: d==='Drc'?'TcLumbosDrc':d==='Izq'?'TcLumbosIzq':'TcLumbosBlt' },
        { n:'Plexo sacro',                                        t:' plexo sacro',                                        l:'a nivel de plexo sacro',                                        img: d==='Drc'?'SacroDrc':   d==='Izq'?'SacroIzq':'SacroBlt' },
        { n:'Plexo pudendo',                                      t:' plexo pudendo',                                      l:'a nivel de plexo pudendo',                                      img: d==='Drc'?'PudendoDrc': d==='Izq'?'PudendoIzq':'PudendoBlt' },
      ];
      const expand = (k) => k==='PudendoBlt'?['PudendoDrc','PudendoIzq']:k?[k]:[];
      return (
        <div>
          <NavRow onBack={() => goBack1('Ubicacion_L')} onReset={resetAll} />
          <StepTitle>Postganglionar parcial</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              pushConclusion('Postganglionar_parcial', op.t, op.l); addOverlays(expand(op.img)); setStep('Tipos');
            }} />
          ))}
        </div>
      );
    }

    // ── Tipos
    if (step === 'Tipos') {
      // determine back step
      const lastV = conclusions[conclusions.length-1]?.value;
      const backStep = () => {
        if (plexoTipo==='Cervical') return 'Evolucion_C';
        if (lastV==='Ubicación') return plexoTipo==='Braquial'?'Ubicacion_B':'Ubicacion_L';
        if (lastV==='Postganglionar_total') return 'Postgang_total_B';
        if (lastV==='Postganglionar_parcial') return plexoTipo==='Braquial'?'Postgang_parcial_B':'Postgang_parcial_L';
        if (lastV==='Preganglionar_parcial') return 'Pregang_parcial_B';
        if (lastV==='Tronco') return 'Troncos_B';
        if (lastV==='Cordones') return 'Cordones_B';
        if (lastV==='Divisiones') return 'Divisiones_L';
        return plexoTipo==='Braquial'?'Ubicacion_B':'Ubicacion_L';
      };
      const opts = [
        { n:'Axonal completa',   t:' de tipo axonal completa',   l:'Axonal completa',   next:'Axonal_completa' },
        { n:'Axonal incompleta', t:' de tipo axonal incompleta', l:'Axonal incompleta', next:'Axonal_incompleta' },
        { n:'Desmielinizante',   t:' de tipo desmielinizante',   l:'Desmielinizante',   next:'Desmielinizante' },
        { n:'Mixta',             t:'',                           l:'',                  next:'Mixta' },
      ];
      return (
        <div>
          <NavRow onBack={() => goBack1(backStep())} onReset={resetAll} />
          <StepTitle>Tipo</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => { pushConclusion('Tipo', op.t, op.l); addOverlays([]); setStep(op.next); }} />
          ))}
        </div>
      );
    }

    // ── Axonal completa / incompleta (denervación)
    if (step === 'Axonal_completa' || step === 'Axonal_incompleta') {
      const titulo = step==='Axonal_completa' ? 'Axonal completa' : 'Axonal incompleta';
      const opts = [
        { n:'Difusa (++++)',    t:' con denervación difusa (++++),',    l:'con denervación difusa (++++)'   },
        { n:'Abundante (+++)', t:' con denervación abundante (+++),',  l:'con denervación abundante (+++)'  },
        { n:'Progresiva (++)', t:' con denervación progresiva (++),',  l:'con denervación progresiva (++)'  },
        { n:'Discreta (+/+)',  t:' con denervación discreta (+/+),',   l:'con denervación discreta (+/+)'   },
        { n:'Ausente',         t:' sin denervación',                   l:'sin denervación,'                 },
      ];
      return (
        <div>
          <NavRow onBack={() => goBack1('Tipos')} onReset={resetAll} />
          <StepTitle>{titulo}</StepTitle>
          {opts.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => { pushConclusion('Axonal', op.t, op.l); addOverlays([]); setStep('Intensidad_axonal'); }} />
          ))}
        </div>
      );
    }

    // ── Intensidad axonal
    if (step === 'Intensidad_axonal') {
      const tipoAnt = conclusions.find(c=>c.value==='Tipo')?.title?.includes('incompleta') ? 'Axonal_incompleta' : 'Axonal_completa';
      return (
        <div>
          <NavRow onBack={() => goBack1(tipoAnt)} onReset={resetAll} />
          <StepTitle>Intensidad</StepTitle>
          {['Leve','Moderada','Severa'].map(n => (
            <CBtn key={n} label={n} onClick={() => { pushConclusion('Intensidad', ` intensidad ${n.toLowerCase()}.`, n); addOverlays([]); setStep('Reinervacion'); }} />
          ))}
        </div>
      );
    }

    // ── Reinervación
    if (step === 'Reinervacion') return (
      <div>
        <NavRow onBack={() => goBack1('Intensidad_axonal')} onReset={resetAll} />
        <StepTitle>Reinervación</StepTitle>
        {['Activa','Inactiva'].map(n => (
          <CBtn key={n} label={n} onClick={() => { pushConclusion('Reinervación', `\n\nReinervación ${n.toLowerCase()}; `, n); addOverlays([]); setStep('Pronostico'); }} />
        ))}
      </div>
    );

    // ── Desmielinizante
    if (step === 'Desmielinizante') return (
      <div>
        <NavRow onBack={() => goBack1('Tipos')} onReset={resetAll} />
        <StepTitle>Desmielinizante</StepTitle>
        {[
          { n:'Retardo en la conducción',          t:' por retardo en la conducción.',          l:' por retardo en la conducción'          },
          { n:'Bloqueo parcial en la conducción',  t:' por bloqueo parcial en la conducción.',  l:'por bloqueo parcial en la conducción'   },
          { n:'Bloqueo completo en la conducción', t:' por bloqueo completo en la conducción.', l:'por bloqueo completo en la conducción'  },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => { pushConclusion('Desmielinizante', op.t, op.l); addOverlays([]); setStep('Pronostico'); }} />
        ))}
      </div>
    );

    // ── Mixta
    if (step === 'Mixta') return (
      <div>
        <NavRow onBack={() => goBack1('Tipos')} onReset={resetAll} />
        <StepTitle>Mixta</StepTitle>
        {[
          { n:'Desmielinizante-Axonal', t:' de tipo mixta primariamente desmielinizante con perdida axonal secundaria,', l:'Desmielinizante con pérdida axonal secundaria' },
          { n:'Axonal-Desmielinizante', t:' de tipo mixta primariamente axonal con desmielinizacón secundaria,',         l:'Axonal con desmielinización secundaria'        },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => { pushConclusion('Mixta', op.t, op.l); addOverlays([]); setStep('Intensidad_desm'); }} />
        ))}
      </div>
    );

    // ── Intensidad desmielinizante/mixta
    if (step === 'Intensidad_desm') {
      const backD = conclusions.find(c=>c.value==='Mixta') ? 'Mixta' : 'Desmielinizante';
      return (
        <div>
          <NavRow onBack={() => goBack1(backD)} onReset={resetAll} />
          <StepTitle>Intensidad</StepTitle>
          {['Leve','Moderada','Severa'].map(n => (
            <CBtn key={n} label={n} onClick={() => { pushConclusion('Intensidad', ` intensidad ${n.toLowerCase()}.`, n); addOverlays([]); setStep('Pronostico'); }} />
          ))}
        </div>
      );
    }

    // ── Pronóstico
    if (step === 'Pronostico') {
      const lastV = conclusions[conclusions.length-1]?.value;
      const backPron = lastV==='Reinervación'?'Reinervacion': lastV==='Desmielinizante'?'Desmielinizante':'Intensidad_desm';
      return (
        <div>
          <NavRow onBack={() => goBack1(backPron)} onReset={resetAll} />
          <StepTitle>Pronóstico</StepTitle>
          {[
            { n:'Recuperación completa',  t:' pronóstico de recuperación completa.',          l:'Recuperación completa'   },
            { n:'Recuperación parcial',   t:' pronóstico de recuperación parcial.',           l:'Recuperación parcial'    },
            { n:'Pobre no funcional',     t:' pronóstico de recuperación pobre no funcional.',l:'Pobre no funcional'      },
            { n:'Recuperación nulo',      t:' pronóstico de recuperación nulo.',              l:'Recuperación nulo'       },
          ].map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => { pushConclusion('Pronóstico', op.t, op.l); addOverlays([]); setStep('Final'); }} />
          ))}
        </div>
      );
    }

    // ── Final — muestra botones de figura + PDF
    if (step === 'Final') return (
      <div>
        <NavRow onBack={() => goBack1('Pronostico')} onReset={resetAll} onPdf={() => setPdfOpen(true)} />

        <ExportBar
          nombrePaciente={nombrePaciente}
          textoReporte={textoFinal}
          activeOv={activeOv}
          figuras={figuras}
          laminaSize={(() => {
            const w = laminaRef.current?.clientWidth || 690;
            const h = Math.round(w * (2048 / 1582));
            return { w, h };
          })()}
          listaVisual={listaVisual}
          imgLista={imgLista}
          comentarioLista={comentarioLista}
          onBack={() => goBack1('Pronostico')}
          onReset={resetAll}
          isOpen={pdfOpen}
          onClose={() => setPdfOpen(false)}
        />

        {activeTab === 'reporte' && (
          <>
            <StepTitle>Agrega figuras al reporte (imagen)</StepTitle>
            <div style={{ display:'flex', gap:10, marginBottom:16 }}>
              <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
                <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('circle',URL.createObjectURL(f))); e.target.value=''; }} />
              </label>
              <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width:52, height:52, borderRadius:6, border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
                <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('square',URL.createObjectURL(f))); e.target.value=''; }} />
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
            <StepTitle>Imagen de tabla</StepTitle>
            <button onClick={() => setShowGaleria(true)} style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'18px 12px', borderRadius:10, cursor:'pointer', marginBottom:12, background:'rgba(255,255,255,0.05)', border:'1px dashed rgba(255,255,255,0.15)' }}>
              {imgLista
                ? <img src={imgLista.src} alt="tabla" style={{ width:'100%', maxHeight:100, objectFit:'contain', borderRadius:6 }} />
                : <>
                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18"/></svg>
                    <span style={{ color:'rgba(255,255,255,0.35)', fontSize:12 }}>Sin imagen seleccionada</span>
                  </>
              }
            </button>
            {imgLista && <button onClick={() => setImgLista(null)} style={{ width:'100%', padding:'5px 0', borderRadius:8, marginBottom:10, background:'transparent', border:'1px solid rgba(239,68,68,0.4)', color:'#ef4444', fontSize:12, cursor:'pointer' }}>Quitar imagen</button>}
            <button onClick={() => { setComentarioTemp(comentarioLista); setShowComentarioModal(true); }} style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'#f97316', border:'none', cursor:'pointer', color:'#fff', fontWeight:700, fontSize:14 }}>
              {comentarioLista ? 'Editar Comentario' : 'Agregar Comentario'}
            </button>
            {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:8 }}>{comentarioLista.length>100?comentarioLista.slice(0,100)+'…':comentarioLista}</p>}
          </>
        )}
      </div>
    );

    return null;
  };

  /* ── RENDER ── */
  return (
    <>
      <div style={{ position:'relative', zIndex:1, background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100vh' }}>

        {/* ── Top bar ── */}
        <div style={{ flexShrink:0, width:'100%', height:52, background:'#111', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'0 20px', boxSizing:'border-box' }}>
          <div>
            <button onClick={() => router.push('/Reporte')}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', width:38, height:38, borderRadius:'50%', background:'#1C1C1C', border:'2px solid #c44900', cursor:'pointer', padding:8, transition:'background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#c44900'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#1C1C1C'; }}>
              <img src="/assets/IconSVG/I_Crop.svg" alt="Regresar" style={{ width:18, height:18, filter:'invert(1)' }} />
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <input type="text" value={nombrePaciente} onChange={e=>setNombrePaciente(e.target.value)} placeholder="Nombre del paciente"
              style={{ width:580, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'6px 14px', color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box', textAlign:'center' }} />
          </div>
          <div />
        </div>

        {/* ── Centered area ── */}
        <div style={{ flex:'0 0 auto', width:'100%', maxWidth:850, display:'flex', flexDirection:'column', padding:'12px 8px 0', boxSizing:'border-box' }}>

          {/* Menu + Lamina row */}
          <div style={{ flex:'0 0 auto', display:'flex', alignItems:'stretch', minHeight:520 }}>

            {/* LEFT MENU */}
            <div style={{ width:300, flexShrink:0, display:'flex', flexDirection:'column', background:'#111', borderRadius:'10px 0 0 10px', border:'1px solid rgba(255,255,255,0.08)', borderRight:'none', overflowY:'auto' }}>
              <div style={{ flex:1, padding:'12px 14px 14px', overflowY:'auto' }}>
                {renderStep()}
              </div>
            </div>

            {/* LAMINA */}
            <div ref={laminaRef} style={{ flex:1, position:'relative', background:'#fff', borderRadius:'0 10px 10px 0', boxShadow:'0 8px 48px rgba(0,0,0,0.6)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {nombrePaciente && (
                <div style={{ position:'absolute', top:10, left:12, zIndex:10, background:'rgba(0,0,0,0.45)', color:'#fff', fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:6 }}>
                  {nombrePaciente}
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/PlexopatiaImg/BP_Plexopatia.png" alt="Plexopatía" draggable={false}
                style={{ display:'block', width:'100%', height:'auto', objectFit:'contain' }} />
              {activeOv.map(k => {
                const src = OVERLAYS_PLEXO[k];
                if (!src) return null;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" draggable={false}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', pointerEvents:'none' }} />
                );
              })}
              {figuras.map(f => {
                const isSymbol = f.tipo === 'symbol';
                const sz = isSymbol ? 48 : 80;
                return (
                  <div key={f.id} onMouseDown={e=>onFiguraMouseDown(e,f)}
                    style={{ position:'absolute', left:f.x, top:f.y, zIndex:20, width:sz, height:sz, cursor:'grab', userSelect:'none' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.src} alt="" draggable={false} style={{ width:'100%', height:'100%', objectFit:isSymbol?'contain':'cover', borderRadius:f.tipo==='circle'?'50%':0, border:isSymbol?'none':'1.5px solid gray', display:'block', pointerEvents:'none', transform:`rotate(${f.rotation ?? 0}deg)` }} />
                    <button onMouseDown={e=>e.stopPropagation()} onClick={()=>eliminarFigura(f.id)}
                      style={{ position:'absolute', top:-10, right:-10, width:24, height:24, borderRadius:'50%', background:'red', border:'none', cursor:'pointer', color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>✕</button>
                    {isSymbol ? (
                      <>
                        <button onMouseDown={e=>e.stopPropagation()} onClick={()=>rotarFigura(f.id,-ROTATE_STEP)}
                          style={{ position:'absolute', bottom:-10, left:-10, width:26, height:26, borderRadius:'50%', background:'rgba(0,0,0,0.75)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </button>
                        <button onMouseDown={e=>e.stopPropagation()} onClick={()=>rotarFigura(f.id,ROTATE_STEP)}
                          style={{ position:'absolute', bottom:-10, right:-10, width:26, height:26, borderRadius:'50%', background:'rgba(0,0,0,0.75)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                        </button>
                      </>
                    ) : (
                      <button onMouseDown={e=>e.stopPropagation()} onClick={()=>setCropState({id:f.id,src:f.src})}
                        style={{ position:'absolute', bottom:-10, left:-10, width:26, height:26, borderRadius:'50%', background:'rgba(0,0,0,0.75)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"/></svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

          </div>{/* end row */}

          {/* FOOTER */}
          <div style={{ background:'#111', borderRadius:'0 0 10px 10px', border:'1px solid rgba(255,255,255,0.08)', borderTop:'none', padding:'10px 16px 14px', marginBottom:16 }}>
            <div style={{ display:'flex', gap:4, marginBottom:8 }}>
              {[['reporte','Reporte'],['lista','Lista']].map(([id,label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{ padding:'4px 16px', borderRadius:7, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', transition:'all 0.15s', background: activeTab===id?'#f97316':'rgba(255,255,255,0.07)', color: activeTab===id?'#fff':'rgba(255,255,255,0.4)' }}>
                  {label}
                </button>
              ))}
            </div>

            {activeTab === 'reporte' && (
              textoFinal
                ? <textarea value={textoFinal} onChange={e=>{ setTextoEditado(e.target.value); setEditadoManual(true); }} rows={4}
                    style={{ width:'100%', boxSizing:'border-box', resize:'vertical', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'7px 10px', color:'rgba(255,255,255,0.85)', fontSize:13, lineHeight:1.55, outline:'none', fontFamily:'inherit', marginTop:4 }} />
                : <p style={{ color:'rgba(255,255,255,0.2)', fontSize:13, fontStyle:'italic', margin:'4px 0 0' }}>Sin conclusiones aún.</p>
            )}

            {activeTab === 'lista' && (
              <div style={{ marginTop:4 }}>
                {listaVisual.length === 0
                  ? <p style={{ color:'rgba(255,255,255,0.25)', fontSize:12, fontStyle:'italic', margin:0 }}>Sin conclusiones aún.</p>
                  : <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                      {listaVisual.map(({k,v}) => (
                        <p key={k} style={{ color:'rgba(255,255,255,0.75)', fontSize:12, margin:0 }}>
                          <span style={{ color:'#f97316', fontWeight:600 }}>{k}:</span> {v}
                        </p>
                      ))}
                    </div>
                }
                {comentarioLista && <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:6 }}>💬 {comentarioLista.length>100?comentarioLista.slice(0,100)+'…':comentarioLista}</p>}
              </div>
            )}

            {(session?.user?.name || session?.user?.email) && (
              <div style={{ marginTop:8, paddingTop:7, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:16, flexWrap:'wrap' }}>
                {session.user.name && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>👤 {session.user.name} {session.user.lastname||''}</span>}
                {session.user.email && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>✉ {session.user.email}</span>}
                {session.user.cedula && <span style={{ color:'rgba(255,255,255,0.3)', fontSize:11 }}>№ {session.user.cedula}</span>}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Crop modal */}
      {cropState && (
        <CropModal src={cropState.src}
          onConfirm={url => {
            const img = new window.Image();
            img.onload = () => {
              setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: url, nw: img.naturalWidth, nh: img.naturalHeight } : f));
            };
            img.onerror = () => {
              setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: url } : f));
            };
            img.src = url;
            setCropState(null);
          }}
          onClose={() => setCropState(null)} />
      )}

      {/* Galería tablas */}
      {showGaleria && (
        <GaleriaTablas
          onSelect={url => { setImgLista({ src:url, file:null }); setShowGaleria(false); }}
          onClose={() => setShowGaleria(false)} />
      )}

      {/* Comentario modal */}
      {showComentarioModal && (
        <div style={{ position:'fixed', inset:0, zIndex:10000, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:24, width:'100%', maxWidth:480 }}>
            <h3 style={{ color:'#fff', fontSize:16, fontWeight:700, margin:'0 0 4px' }}>Comentario</h3>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12, margin:'0 0 14px' }}>Se agregará al informe como nota adicional</p>
            <textarea value={comentarioTemp} onChange={e=>setComentarioTemp(e.target.value)} rows={5} placeholder="Escribe aquí tu comentario..."
              style={{ width:'100%', boxSizing:'border-box', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'10px 12px', color:'#fff', fontSize:13, resize:'vertical', outline:'none', fontFamily:'inherit' }} />
            <div style={{ display:'flex', gap:10, marginTop:14 }}>
              <button onClick={() => { setComentarioLista(comentarioTemp); setShowComentarioModal(false); }}
                style={{ flex:1, padding:'9px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:600, fontSize:14, cursor:'pointer' }}>Guardar</button>
              <button onClick={() => setShowComentarioModal(false)}
                style={{ flex:1, padding:'9px 0', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'transparent', color:'rgba(255,255,255,0.5)', fontSize:14, cursor:'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
