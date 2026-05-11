'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import './Style.css';

/* ─── Galería de tablas ─────────────────────────────────────────────────── */
const TABLAS_URL = 'https://backendmedxpro-tef2.onrender.com/pdfEducacion/Tablas';
const TABLAS = [
  { id: 'CRITERIOS DE AWAJI 2008 (DOMINIO)',                     file: 'CRITERIOS _AWAJI_2008_1.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (CATEGORÍA)',                   file: 'CRITERIOS _AWAJI_2008_2.png' },
  { id: 'COMPARACIÓN EL ESCORIAL / AWAJI 2008',                  file: 'COMPARACION_ESCORIAL.png' },
  { id: 'CRITERIOS DE LAMBERT ESCLEROSIS LATERAL AMIOTRÓFICA',   file: 'LAMBERT_ESCLEROSIS_LT.png' },
  { id: 'COMPARACIÓN MIOPATÍA/RADICULOPATÍA/UNIÓN NEUROMUSCULAR',file: 'COMPARACION.png' },
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
  const imgRef = useRef(null); const canvasRef = useRef(null); const overlayRef = useRef(null);
  const [sel, setSel] = useState(null); const [drawing, setDrawing] = useState(false); const startRef = useRef({ x:0, y:0 });
  const getRelPos = (e, el) => { const r = el.getBoundingClientRect(); return { x:e.clientX-r.left, y:e.clientY-r.top }; };
  const onMouseDown = (e) => { const pos=getRelPos(e,overlayRef.current); startRef.current=pos; setSel({x:pos.x,y:pos.y,w:0,h:0}); setDrawing(true); };
  const onMouseMove = (e) => { if(!drawing)return; const pos=getRelPos(e,overlayRef.current); setSel({x:Math.min(startRef.current.x,pos.x),y:Math.min(startRef.current.y,pos.y),w:Math.abs(pos.x-startRef.current.x),h:Math.abs(pos.y-startRef.current.y)}); };
  const onMouseUp = () => setDrawing(false);
  const applyCrop = () => {
    if (!sel||sel.w<5||sel.h<5){onClose();return;}
    const img=imgRef.current; const overlay=overlayRef.current;
    const sx=img.naturalWidth/overlay.clientWidth; const sy=img.naturalHeight/overlay.clientHeight;
    const canvas=canvasRef.current; canvas.width=sel.w*sx; canvas.height=sel.h*sy;
    canvas.getContext('2d').drawImage(img,sel.x*sx,sel.y*sy,sel.w*sx,sel.h*sy,0,0,canvas.width,canvas.height);
    onConfirm(canvas.toDataURL('image/png'));
  };
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10200, background:'rgba(0,0,0,0.9)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:16 }}>
      <p style={{ color:'#fff', fontSize:13, marginBottom:10 }}>Arrastra para seleccionar el área a recortar</p>
      <div ref={overlayRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        style={{ position:'relative', cursor:'crosshair', maxWidth:'90vw', maxHeight:'70vh', userSelect:'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop" draggable={false} style={{ display:'block', maxWidth:'90vw', maxHeight:'70vh', objectFit:'contain' }} />
        {sel&&sel.w>2&&sel.h>2&&<div style={{ position:'absolute', left:sel.x, top:sel.y, width:sel.w, height:sel.h, border:'2px dashed #f97316', background:'rgba(249,115,22,0.15)', pointerEvents:'none' }} />}
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
    t = t.replace(/([.!?])\s+([a-záéíóúüñ])/g, (_, p, c) => `${p} ${c.toUpperCase()}`);
    if (!/[.!?]$/.test(t)) t += '.';
    return t;
  }).filter(Boolean).join('\n\n');
}

/* ─── Overlay keys ───────────────────────────────────────────────────────── */
const OVERLAYS_NEURO = {
  'Bulbar':                                '/NeuronopatiaImg/Bulbar.png',
  'Cervical':                              '/NeuronopatiaImg/Cervical.png',
  'Torácica':                              '/NeuronopatiaImg/Toracico.png',
  'Lumbar':                                '/NeuronopatiaImg/Lumbar.png',
  'Sensitiva-Ganglio de la Raíz Dorsal':   '/NeuronopatiaImg/Sensitiva.png',
  'AsBulbar':                              '/NeuronopatiaImg/Asimetrica_bulbar.png',
  'AsCervical':                            '/NeuronopatiaImg/Asimetrica_cervical.png',
  'AsTorácica':                            '/NeuronopatiaImg/Asimetrica_toracico.png',
  'AsLumbar':                              '/NeuronopatiaImg/Asimetrica_lumbar.png',
  'AsSensitiva-Ganglio de la Raíz Dorsal': '/NeuronopatiaImg/Asimetrica_sensitiva.png',
};

// Simetría → overlay key map (used in Distribuciones multi-select)
const SIMETRIA_OV = {
  Simétrica:  { Bulbar:'Bulbar', Cervical:'Cervical', 'Torácica':'Torácica', Lumbar:'Lumbar' },
  Asimétrica: { Bulbar:'AsBulbar', Cervical:'AsCervical', 'Torácica':'AsTorácica', Lumbar:'AsLumbar' },
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
  const [step, setStep]               = useState('Fibras');
  const [conclusions, setConclusions] = useState([]);
  const [multiSel, setMultiSel]       = useState([]);
  const [activeOv, setActiveOv]       = useState([]);
  const [ovHist, setOvHist]           = useState([]);
  const [fibrasTipo, setFibrasTipo]   = useState('');   // 'Motora' | 'Sensitiva'
  const [simetria, setSimetria]       = useState('');   // 'Simétrica' | 'Asimétrica'
  const [activeTab, setActiveTab]     = useState('reporte');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [figuras, setFiguras]         = useState([]);
  const [imgLista, setImgLista]       = useState(null);
  const [comentarioLista, setComentarioLista] = useState('');
  const [showGaleria, setShowGaleria] = useState(false);
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [comentarioTemp, setComentarioTemp] = useState('');
  const [pdfOpen, setPdfOpen]         = useState(false);
  const [cropState, setCropState]     = useState(null);
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

  const goBack1 = useCallback((toStep) => {
    popConclusion(1);
    removeLastOverlayGroup();
    setStep(toStep);
  }, [popConclusion, removeLastOverlayGroup]);

  /* ── Reset ── */
  const resetAll = useCallback(() => {
    setStep('Fibras'); setConclusions([]); setMultiSel([]);
    setActiveOv([]); setOvHist([]); setFibrasTipo(''); setSimetria('');
    setActiveTab('reporte'); setFiguras([]);
    setImgLista(null); setComentarioLista('');
    setTextoEditado(''); setEditadoManual(false);
  }, []);

  /* ── Texto reporte ── */
  const textoReporte = useMemo(() =>
    limpiarTextoReporte(conclusions.map(c => c.title).join('')),
    [conclusions]
  );

  const prevTextoRef = useRef('');
  if (!editadoManual && textoReporte !== prevTextoRef.current) {
    prevTextoRef.current = textoReporte;
    if (textoEditado !== textoReporte) setTextoEditado(textoReporte);
  }
  const textoFinal = editadoManual ? textoEditado : textoReporte;

  /* ── Lista visual ── */
  const STEP_LABELS = {
    Fibras:'Fibras', Clasificación:'Clasificación',
    Denervación:'Denervación', Distribución:'Distribución',
    Topografía:'Topografía', Reinervación:'Reinervación',
    'Pronóstico':'Pronóstico de recuperación',
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
    const onMove = (ev) => { if(!dragRef.active)return; moverFigura(dragRef.active, dragRef.origX+(ev.clientX-dragRef.startX), dragRef.origY+(ev.clientY-dragRef.startY)); };
    const onUp = () => { dragRef.active=null; window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',onUp); };
    window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
  }, [dragRef, moverFigura]);

  /* ── STEP RENDERERS ── */
  const renderStep = () => {

    // ── Fibras (Motora vs Sensitiva)
    if (step === 'Fibras') return (
      <div>
        <StepTitle>Fibras</StepTitle>
        {[
          { n:'Motora-Asta anterior medular',        t:'Neuronopatía motora (asta anterior medular)',          l:'Motora-Asta anterior medular'         },
          { n:'Sensitiva-Ganglio de la Raíz Dorsal', t:'Neuronopatía sensitiva (ganglio de la raíz dorsal)',   l:'Sensitiva-Ganglio de la Raíz Dorsal'  },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            setFibrasTipo(op.n === 'Motora-Asta anterior medular' ? 'Motora' : 'Sensitiva');
            pushConclusion('Fibras', op.t, op.l);
            if (op.n === 'Sensitiva-Ganglio de la Raíz Dorsal') addOverlays(['Sensitiva-Ganglio de la Raíz Dorsal']);
            else addOverlays([]);
            setStep('Clasificación');
          }} />
        ))}
      </div>
    );

    // ── Clasificación
    if (step === 'Clasificación') return (
      <div>
        <NavRow onBack={() => { goBack1('Fibras'); setFibrasTipo(''); setSimetria(''); }} onReset={resetAll} />
        <StepTitle>Clasificación</StepTitle>
        {[
          { n:'Hereditaria', t:' hereditaria,', l:'Hereditaria' },
          { n:'Adquirida',   t:' adquirida,',   l:'Adquirida'   },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Clasificación', op.t, op.l);
            addOverlays([]);
            setStep(fibrasTipo === 'Motora' ? 'Denervación' : 'Distribución_B');
          }} />
        ))}
      </div>
    );

    // ── Denervación (solo Motora)
    if (step === 'Denervación') return (
      <div>
        <NavRow onBack={() => goBack1('Clasificación')} onReset={resetAll} />
        <StepTitle>Denervación</StepTitle>
        {[
          { n:'Difusa Severa (++++)',       t:' con denervación difusa severa (++++)',       l:'Difusa Severa (++++)'       },
          { n:'Abundante Progresiva (+++)', t:' con denervación abundante progresiva (+++)', l:'Abundante Progresiva (+++)' },
          { n:'Activa Moderada (++)',       t:' con denervación activa moderada (++)',       l:'Activa Moderada (++)'       },
          { n:'Leve (+/+)',                 t:' con denervación activa moderada (++)',       l:'Leve (+/+)'                 },
          { n:'Inactiva',                   t:' sin denervación activa',                    l:'Inactiva'                   },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Denervación', op.t, op.l);
            addOverlays([]);
            setMultiSel([]);
            setStep('Distribución_M');
          }} />
        ))}
      </div>
    );

    // ── Distribución Motora (multi: Bulbar/Cervical/Torácica/Lumbar)
    if (step === 'Distribución_M') {
      const DISTRIB = ['Bulbar','Cervical','Torácica','Lumbar'];
      const toggle = (n) => setMultiSel(p => p.includes(n) ? p.filter(x=>x!==n) : [...p,n]);
      const joinConY = (arr) => arr.length <= 1 ? arr[0] || '' : arr.slice(0,-1).join(', ') + ' y ' + arr[arr.length-1];
      const confirm = () => {
        if (!multiSel.length) return;
        const sel = multiSel.join(', ');
        const selY = joinConY(multiSel);
        pushConclusion('Distribución', ` ${sel.toLowerCase()}`, selY);
        // overlays applied after Topografía selection
        setMultiSel([]);
        setStep('Topografía_M');
      };
      return (
        <div>
          <NavRow onBack={() => { goBack1('Denervación'); setMultiSel([]); }} onReset={resetAll} />
          <StepTitle>Distribución</StepTitle>
          <p className="text-white/40 text-xs mb-2">Selecciona una o más</p>
          {DISTRIB.map(d => <MultiBtn key={d} label={d} selected={multiSel.includes(d)} onClick={() => toggle(d)} />)}
          <SiguienteBtn disabled={!multiSel.length} onClick={confirm} />
        </div>
      );
    }

    // ── Topografía Motora
    if (step === 'Topografía_M') {
      // We need the previously-selected distribuciones to apply the right overlay keys
      const distribConc = conclusions[conclusions.length - 1];
      const distribSel = distribConc?.lista?.split(', ') || [];
      return (
        <div>
          <NavRow onBack={() => { goBack1('Distribución_M'); }} onReset={resetAll} />
          <StepTitle>Topografía</StepTitle>
          {[
            { n:'Simétrica',  t:' simétrica. ', l:'Simétrica'  },
            { n:'Asimétrica', t:' asimétrica. ',l:'Asimétrica' },
          ].map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              setSimetria(op.n);
              pushConclusion('Topografía', op.t, op.l);
              // Apply overlay keys based on symmetry + selected distributions
              const ovMap = SIMETRIA_OV[op.n] || {};
              const keys = distribSel.map(d => ovMap[d]).filter(Boolean);
              addOverlays(keys);
              setStep('Reinervación');
            }} />
          ))}
        </div>
      );
    }

    // ── Reinervación (solo Motora)
    if (step === 'Reinervación') return (
      <div>
        <NavRow onBack={() => goBack1('Topografía_M')} onReset={resetAll} />
        <StepTitle>Reinervación</StepTitle>
        {[
          { n:'Abundante', t:'\n\nReinervación abundante;', l:'Abundante' },
          { n:'Discreta',  t:'\n\nReinervación discreta;',  l:'Discreta'  },
          { n:'Ausente',   t:'\n\nSin reinervación;',       l:'Ausente'   },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Reinervación', op.t, op.l);
            addOverlays([]);
            setStep('Pronóstico_M');
          }} />
        ))}
      </div>
    );

    // ── Pronóstico Motora
    if (step === 'Pronóstico_M') return (
      <div>
        <NavRow onBack={() => goBack1('Reinervación')} onReset={resetAll} />
        <StepTitle>Pronóstico de recuperación</StepTitle>
        {[
          { n:'Completo',  t:'pronóstico de recuperación completo.',          l:'Completo'  },
          { n:'Pobre',     t:'pronóstico de recuperación pobre no funcional.',l:'Pobre'     },
          { n:'Nulo',      t:'pronóstico de recuperación nulo.',              l:'Nulo'      },
          { n:'Incierto',  t:'pronóstico de recuperación incierto.',          l:'Incierto'  },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Pronóstico', op.t, op.l);
            addOverlays([]);
            setStep('Final');
          }} />
        ))}
      </div>
    );

    // ── Distribución Sensitiva (single: Generalizada/Parcial)
    if (step === 'Distribución_B') return (
      <div>
        <NavRow onBack={() => goBack1('Clasificación')} onReset={resetAll} />
        <StepTitle>Distribución</StepTitle>
        {[
          { n:'Generalizada', t:'distribución generalizada', l:'Generalizada' },
          { n:'Parcial',      t:'distribución parcial',      l:'Parcial'      },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Distribución', op.t, op.l);
            addOverlays([]);
            setStep('Topografía_B');
          }} />
        ))}
      </div>
    );

    // ── Topografía Sensitiva
    if (step === 'Topografía_B') return (
      <div>
        <NavRow onBack={() => goBack1('Distribución_B')} onReset={resetAll} />
        <StepTitle>Topografía</StepTitle>
        {[
          { n:'Simétrica',  t:' simétrica. ', l:'Simétrica'  },
          { n:'Asimétrica', t:' asimétrica. ',l:'Asimétrica' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            const ovKey = op.n === 'Asimétrica' ? 'AsSensitiva-Ganglio de la Raíz Dorsal' : 'Sensitiva-Ganglio de la Raíz Dorsal';
            setSimetria(op.n);
            pushConclusion('Topografía', op.t, op.l);
            addOverlays([ovKey]);
            setStep('Pronóstico_B');
          }} />
        ))}
      </div>
    );

    // ── Pronóstico Sensitiva
    if (step === 'Pronóstico_B') return (
      <div>
        <NavRow onBack={() => goBack1('Topografía_B')} onReset={resetAll} />
        <StepTitle>Pronóstico de recuperación</StepTitle>
        {[
          { n:'Completo',  t:'\n\nPronóstico de recuperación completo.',          l:'Completo'  },
          { n:'Pobre',     t:'\n\nPronóstico de recuperación pobre no funcional.',l:'Pobre'     },
          { n:'Nulo',      t:'\n\nPronóstico de recuperación nulo.',              l:'Nulo'      },
          { n:'Incierto',  t:'\n\nPronóstico de recuperación incierto.',          l:'Incierto'  },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Pronóstico', op.t, op.l);
            addOverlays([]);
            setStep('Final');
          }} />
        ))}
      </div>
    );

    // ── Final
    if (step === 'Final') {
      const backStep = fibrasTipo === 'Motora' ? 'Pronóstico_M' : 'Pronóstico_B';
      return (
        <div>
          <NavRow onBack={() => goBack1(backStep)} onReset={resetAll} onPdf={() => setPdfOpen(true)} />

          <ExportBar
            nombrePaciente={nombrePaciente}
            textoReporte={textoFinal}
            activeOv={activeOv}
            figuras={figuras}
            laminaSize={{ w: laminaRef.current?.clientWidth||690, h: laminaRef.current?.clientHeight||620 }}
            listaVisual={listaVisual}
            imgLista={imgLista}
            comentarioLista={comentarioLista}
            onBack={() => goBack1(backStep)}
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('circle',URL.createObjectURL(f))); e.target.value=''; }} />
                </label>
                <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width:52, height:52, borderRadius:4, border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
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
    }

    return null;
  };

  /* ── RENDER ── */
  return (
    <>
      <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto' }}>

        {/* TOP BAR */}
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

        {/* CENTERED AREA */}
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
              {nombrePaciente && (
                <div style={{ position:'absolute', top:10, left:12, zIndex:10, background:'rgba(0,0,0,0.45)', color:'#fff', fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:6 }}>
                  {nombrePaciente}
                </div>
              )}
              {/* image stack: base + overlays share identical dimensions */}
              <div style={{ position:'relative', width:'100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/NeuronopatiaImg/BP_Neuronopatia.png" alt="Neuronopatía" draggable={false}
                  style={{ display:'block', width:'100%', height:'auto' }} />
                {activeOv.map(k => {
                  const src = OVERLAYS_NEURO[k];
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
            </div>

          </div>

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
                          <span style={{ color:'#f97316', fontWeight:600 }}>{k}</span>{' - '}{v}
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
