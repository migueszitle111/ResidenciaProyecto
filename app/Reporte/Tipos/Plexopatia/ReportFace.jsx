'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import './Style.css';

/* ─── Galería de tablas ─────────────────────────────────────────────────── */
const TABLAS_URL = 'https://backendmedxpro-tef2.onrender.com/pdfEducacion/Tablas';
const TABLAS = [
  { id: 'COORRELACIÓN DE TIEMPO DE EVOLUCIÓN EN PLEXOPATÍAS', file: 'EVOLUCION_PLEXO.png' },
  { id: 'CLASIFICACIÓN DE SEDDON Y SUNDERLAND',               file: 'Tabla38.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',         file: 'LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                               file: 'CRITERIOS_CIDP_AANEM.png' },
  { id: 'PATRONES ELECTROFISIOLÓGICOS EN NEUROPATÍA',         file: 'PATRONES_NEURO.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',  file: 'ELECTROFISIOLOGICOS_DES.png' },
  { id: 'AANEM CRITERIOS PARA NEUROPATÍAS POR ATRAPAMIENTO',  file: 'ATRAPAMIENTO.png' },
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

/* ─── Step UI helpers ────────────────────────────────────────────────────── */
function StepTitle({ children }) {
  return <p className="text-orange-400 text-xs font-bold tracking-widest mb-3 mt-1 uppercase">{children}</p>;
}

function CBtn({ label, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white text-sm font-medium transition-all">
      {label}
    </button>
  );
}

function MultiBtn({ label, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border text-sm font-medium transition-all
        ${selected ? 'bg-orange-500/30 border-orange-500 text-white' : 'border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white'}`}>
      {label}
    </button>
  );
}

function NavRow({ onBack, onReset, onPdf }) {
  return (
    <div className="flex gap-2 mb-3">
      <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Regresar
      </button>
      <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        Reset
      </button>
      {onPdf && (
        <button onClick={onPdf} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          PDF
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

  /* ── Back helper: pops 1 conclusion + 1 overlay group ── */
  const goBack1 = useCallback((toStep) => {
    popConclusion(1);
    removeLastOverlayGroup();
    setStep(toStep);
  }, [popConclusion, removeLastOverlayGroup]);

  /* ── Reset ── */
  const resetAll = useCallback(() => {
    setStep('Plexo'); setConclusions([]); setMultiSel([]);
    setActiveOv([]); setOvHist([]); setPlexoTipo(''); setLadoKey('');
    setActiveTab('reporte'); setFiguras([]);
    setImgLista(null); setComentarioLista('');
    setTextoEditado(''); setEditadoManual(false);
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
  const STEP_LABELS = {
    Plexo:'Plexo', Lado:'Lado', 'Evolución':'Evolución', 'Ubicación':'Ubicación',
    Preganglionar_parcial:'Ubicación', Postganglionar_total:'Ubicación',
    Postganglionar_parcial:'Ubicación', Divisiones:'Divisiones',
    Tronco:'Tronco', Cordones:'Cordones',
    Tipo:'Tipo', Axonal:'Tipo', Mixta:'Tipo', Desmielinizante:'Tipo',
    Intensidad:'Intensidad', 'Reinervación':'Reinervación', 'Pronóstico':'Pronóstico',
  };
  const listaVisual = useMemo(() => {
    const map = {};
    const order = [];
    for (const c of conclusions) {
      if (!c.value) continue;
      const label = STEP_LABELS[c.value] || c.value;
      const v = (c.lista ?? c.title).trim().replace(/^[,;. ]+/, '');
      if (!v) continue;
      if (map[label] !== undefined) {
        map[label] += ' ' + v;
      } else {
        map[label] = v;
        order.push(label);
      }
    }
    return order.map(k => ({ k, v: map[k] }));
  }, [conclusions]);

  /* ── Figura drag ── */
  const dragRef = useState(() => ({ active:null, startX:0, startY:0, origX:0, origY:0 }))[0];
  const agregarFigura = useCallback((tipo, src) => {
    const SIZE = 80;
    const rect = laminaRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width/2 - SIZE/2) : 60;
    const cy = rect ? (rect.height/2 - SIZE/2) : 60;
    setFiguras(p => [...p, { id: Date.now()+Math.random(), src, tipo, x:cx, y:cy }]);
  }, []);
  const eliminarFigura = useCallback((id) => setFiguras(p => p.filter(f => f.id !== id)), []);
  const moverFigura = useCallback((id, x, y) => setFiguras(p => p.map(f => f.id===id ? {...f,x,y} : f)), []);
  const onFiguraMouseDown = useCallback((e, figura) => {
    e.preventDefault();
    dragRef.active=figura.id; dragRef.startX=e.clientX; dragRef.startY=e.clientY;
    dragRef.origX=figura.x; dragRef.origY=figura.y;
    const onMove = (ev) => {
      if (!dragRef.active) return;
      moverFigura(dragRef.active, dragRef.origX+(ev.clientX-dragRef.startX), dragRef.origY+(ev.clientY-dragRef.startY));
    };
    const onUp = () => { dragRef.active=null; window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',onUp); };
    window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
  }, [dragRef, moverFigura]);

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
      const toggle = (n) => setMultiSel(p => p.includes(n) ? p.filter(x=>x!==n) : [...p,n]);
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>roots.find(r=>r.n===n)?.img).filter(Boolean))];
        const sel = multiSel.join(', ');
        pushConclusion('Preganglionar_parcial', ' '+sel, sel); addOverlays(imgs); setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { goBack1('Ubicacion_B'); setMultiSel([]); }} onReset={resetAll} />
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
      const toggle = (n) => setMultiSel(p => p.includes(n)?p.filter(x=>x!==n):[...p,n]);
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>troncos.find(t=>t.n===n)?.img).filter(Boolean))];
        const sel = multiSel.map(n=>n.toLowerCase()).join(', ');
        pushConclusion('Tronco', ' '+sel, sel); addOverlays(imgs); setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { goBack1('Postgang_parcial_B'); setMultiSel([]); }} onReset={resetAll} />
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
      const toggle = (n) => setMultiSel(p => p.includes(n)?p.filter(x=>x!==n):[...p,n]);
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>cordones.find(c=>c.n===n)?.img).filter(Boolean))];
        const sel = multiSel.map(n=>n.toLowerCase()).join(', ');
        pushConclusion('Cordones', ' '+sel, sel); addOverlays(imgs); setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { goBack1('Postgang_parcial_B'); setMultiSel([]); }} onReset={resetAll} />
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
      const toggle = (n) => setMultiSel(p => p.includes(n)?p.filter(x=>x!==n):[...p,n]);
      const confirm = () => {
        if (!multiSel.length) return;
        const imgs = [...new Set(multiSel.map(n=>divs.find(x=>x.n===n)?.img).filter(Boolean))];
        const sel = multiSel.join(', ');
        pushConclusion('Divisiones', ' '+sel, sel); addOverlays(imgs); setMultiSel([]); setStep('Tipos');
      };
      return (
        <div>
          <NavRow onBack={() => { goBack1('Ubicacion_L'); setMultiSel([]); }} onReset={resetAll} />
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
          <CBtn key={n} label={n} onClick={() => { pushConclusion('Reinervación', `Reinervación ${n.toLowerCase()};`, n); addOverlays([]); setStep('Pronostico'); }} />
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
          { n:'Desmielinizante-Axonal', t:'de tipo mixta primariamente desmielinizante con perdida axonal secundaria,', l:'Desmielinizante con pérdida axonal secundaria' },
          { n:'Axonal-Desmielinizante', t:'de tipo mixta primariamente axonal con desmielinizacón secundaria,',         l:'Axonal con desmielinización secundaria'        },
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
          laminaSize={{ w: laminaRef.current?.clientWidth||690, h: laminaRef.current?.clientHeight||620 }}
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
              <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'12px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', fontSize:11, textAlign:'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a9 9 0 0118 0"/></svg>
                Forma circular
                <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('circle',URL.createObjectURL(f))); e.target.value=''; }} />
              </label>
              <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'12px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', fontSize:11, textAlign:'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Forma cuadrada
                <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('square',URL.createObjectURL(f))); e.target.value=''; }} />
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
      <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto' }}>

        {/* ── Top bar ── */}
        <div style={{ flexShrink:0, width:'100%', height:52, background:'#111', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'0 20px', boxSizing:'border-box' }}>
          <div>
            <button onClick={() => router.push('/Reporte')}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer', color:'#fff', fontSize:13, fontWeight:500 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              Regresar
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <input type="text" value={nombrePaciente} onChange={e=>setNombrePaciente(e.target.value)} placeholder="Nombre del paciente"
              style={{ width:580, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'6px 14px', color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box', textAlign:'center' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
            {session?.user?.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.imageUrl} alt="" style={{ width:32, height:32, borderRadius:8, objectFit:'contain', opacity:0.85 }} />
            )}
          </div>
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
              {figuras.map(f => (
                <div key={f.id} onMouseDown={e=>onFiguraMouseDown(e,f)}
                  style={{ position:'absolute', left:f.x, top:f.y, zIndex:20, width:80, height:80, cursor:'grab', userSelect:'none' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" draggable={false} style={{ width:80, height:80, objectFit:'cover', borderRadius:f.tipo==='circle'?'50%':0, border:'1.5px solid gray', display:'block', pointerEvents:'none' }} />
                  <button onMouseDown={e=>e.stopPropagation()} onClick={()=>eliminarFigura(f.id)}
                    style={{ position:'absolute', top:-10, right:-10, width:24, height:24, borderRadius:'50%', background:'red', border:'none', cursor:'pointer', color:'#fff', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>✕</button>
                  <button onMouseDown={e=>e.stopPropagation()} onClick={()=>setCropState({id:f.id,src:f.src})}
                    style={{ position:'absolute', bottom:-10, left:-10, width:26, height:26, borderRadius:'50%', background:'rgba(0,0,0,0.75)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:22 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"/></svg>
                  </button>
                </div>
              ))}
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
                  : <div style={{ display:'flex', flexWrap:'wrap', gap:'2px 24px' }}>
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
          onConfirm={url => { setFiguras(p=>p.map(f=>f.id===cropState.id?{...f,src:url}:f)); setCropState(null); }}
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
