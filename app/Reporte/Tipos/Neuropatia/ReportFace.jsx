import { ReportContext, DropContext } from '@/src/context';
import { useSession } from 'next-auth/react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useRouter } from 'next/navigation';
import { ConclusionCanvas } from '../../../components/ReportTemplate/Conclusions/Canvas';
import SimpleMultiStepForm from './MenuBotones';
import { checkDivs2 } from './selecNervio2';
import { checkDivsSegmentarBilateral2 } from './SelecNerviosSegmenBILATERAL2';
import { checkDivsBILATERAL2 } from './SelecNerviosBILATERAL2';
import { checkDivsSegmentar2 } from './SelecSegmentariaNerv2';
import { checkDivsSegmentar } from './SelecSegmentariaNerv';
import { checkDivsBILATERAL } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERAL';
import { checkDivsBILATERALIZQ } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERALIZQ';
import { checkDivs } from '@/app/Reporte/Tipos/Neuropatia/SelecNervios';
import { checkDivsSegmentarBilateral } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosSegmenBILATERAL';
import './Style.css';

// ── DropArea ──────────────────────────────────────────────────────────────────
const DropArea = ({ topLeftText, expandedDivs, setExpandedDivs }) => {
  const { droppedItems, setDroppedItems } = useContext(DropContext);
  const dropAreaRef = useRef(null);

  useEffect(() => {
    if (dropAreaRef.current) {
      const rect = dropAreaRef.current.getBoundingClientRect();
      console.log('DropArea dimensions:', rect.width, rect.height);
    }
  }, []);

  const handleDragStop = (e, d, item) => {
    const dropAreaRect = dropAreaRef.current.getBoundingClientRect();
    const itemRect = e.target.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top + itemRect.height / 2;
    if (
      itemCenterX < dropAreaRect.left || itemCenterX > dropAreaRect.right ||
      itemCenterY < dropAreaRect.top  || itemCenterY > dropAreaRect.bottom
    ) {
      setDroppedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      updatePosition(item.id, d.x, d.y);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('app-id');
    if (draggedId) {
      setExpandedDivs(prev => ({ ...prev, [draggedId]: false }));
    }
    const data = e.dataTransfer.getData('text/html');
    if (data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const element = doc.body.firstChild;
      if (element) {
        setDroppedItems([...droppedItems, { id: Date.now(), content: element.outerHTML, x: 0, y: 0 }]);
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const updatePosition = (id, x, y) => {
    setDroppedItems(items => items.map(item => item.id === id ? { ...item, x, y } : item));
  };

  const removeItem = (id) => setDroppedItems(prev => prev.filter(item => item.id !== id));

  return (
    <div className="dropArea" onDrop={handleDrop} onDragOver={handleDragOver} ref={dropAreaRef}>
      {topLeftText && (
        <p className="top-left-text" style={{ marginLeft: 'auto', textAlign: 'left', paddingLeft: 15, fontSize: 19, paddingTop: 10 }}>
          {topLeftText}
        </p>
      )}
      {droppedItems.length === 0 ? <p /> : droppedItems.map(item => (
        <Rnd
          key={item.id}
          default={{ x: item.x, y: item.y, width: 200, height: 200 }}
          onDragStop={(e, d) => handleDragStop(e, d, item)}
          style={{ position: 'absolute' }}
        >
          <div className="item-container" style={{ width: '100%', height: '100%' }}>
            <button className="delete-button" onClick={() => removeItem(item.id)}>X</button>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </Rnd>
      ))}
    </div>
  );
};

// ── Lista visual helper ───────────────────────────────────────────────────────
function getListItem(c) {
  const val   = (c.value || '').replace(/\d+$/, '').trim();
  const title = (c.title || '').trim();
  if (!title) return null;
  const clean = s => s.replace(/^[\s,;.]+|[\s,;.]+$/g, '').trim();

  if (/^evolucion/i.test(val))
    return { k: 'EVOLUCIÓN', v: clean(title) };
  if (/^(MEDIANO|FRENICO|GLUTEO_INFERIOR|CIATICO|PUDENDO)/i.test(val))
    return { k: 'NERVIO', v: clean(title.replace(/^DE NERVIO\s*/i, '')) };
  if (/BILATERAL/i.test(title))
    return { k: 'LADO', v: clean(title) };
  if (/^(IZQUIERDO|DERECHO)$/i.test(val))
    return { k: 'LADO', v: clean(title) };
  if (/^focalizada$/i.test(val))  return { k: 'UBICACIÓN', v: 'FOCALIZADA A NIVEL' };
  if (/^segmentaria$/i.test(val)) return { k: 'UBICACIÓN', v: 'SEGMENTARIA A NIVEL' };
  if (/generalizada/i.test(val))  return { k: 'UBICACIÓN', v: 'GENERALIZADA A NIVEL' };
  if (/TIPO\s+(AXONAL|DESMIEL|MIXTA)/i.test(title))
    return { k: 'TIPO', v: clean(title.replace(/^TIPO\s*/i, '')) };
  if (/^(MOTORAS|SENSITIVAS|MIXTAS)/i.test(val))
    return { k: 'FIBRAS', v: clean(title.replace(/^DE FIBRAS\s*/i, '')) };
  if (/INTENSIDAD/i.test(title))
    return { k: 'INTENSIDAD', v: clean(title.replace(/^INTENSIDAD\s*/i, '')) };
  if (/REINERVACI/i.test(title))
    return { k: 'REINERVACIÓN', v: clean(title.replace(/^REINERVACI[ÓO]N\s*/i, '')) };
  if (/PRON[ÓO]STICO/i.test(title))
    return { k: 'PRONÓSTICO', v: clean(title.replace(/^PRON[ÓO]STICO\s+DE\s+RECUPERACI[ÓO]N\s*/i, '')) };
  // Botones del overlay (NerviusButton / SegmentariaButton / NerviusButtonBILATERAL…)
  // values: cari1…cariN, car1…carN, carizq1…
  if (/^car/i.test(val))
    return { k: 'UBICACIÓN', v: clean(title) };
  return null;
}

/* ─── CropModal ─────────────────────────────────────────────────────────────── */
function CropModal({ src, onConfirm, onClose }) {
  const imgRef = useRef(null); const canvasRef = useRef(null); const overlayRef = useRef(null);
  const [sel, setSel] = useState(null); const [drawing, setDrawing] = useState(false); const startRef = useRef({ x:0, y:0 });
  const getRelPos = (e, el) => { const r = el.getBoundingClientRect(); return { x:e.clientX-r.left, y:e.clientY-r.top }; };
  const onMouseDown = e => { const pos = getRelPos(e, overlayRef.current); startRef.current=pos; setSel({ x:pos.x, y:pos.y, w:0, h:0 }); setDrawing(true); };
  const onMouseMove = e => { if (!drawing) return; const pos = getRelPos(e, overlayRef.current); setSel({ x:Math.min(startRef.current.x,pos.x), y:Math.min(startRef.current.y,pos.y), w:Math.abs(pos.x-startRef.current.x), h:Math.abs(pos.y-startRef.current.y) }); };
  const onMouseUp = () => setDrawing(false);
  const applyCrop = () => {
    if (!sel||sel.w<5||sel.h<5) { onClose(); return; }
    const img=imgRef.current; const ov=overlayRef.current;
    const sx=img.naturalWidth/ov.clientWidth; const sy=img.naturalHeight/ov.clientHeight;
    const cv=canvasRef.current; cv.width=sel.w*sx; cv.height=sel.h*sy;
    cv.getContext('2d').drawImage(img,sel.x*sx,sel.y*sy,sel.w*sx,sel.h*sy,0,0,cv.width,cv.height);
    onConfirm(cv.toDataURL('image/png'));
  };
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10200, background:'rgba(0,0,0,0.9)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:16 }}>
      <p style={{ color:'#fff', fontSize:13, marginBottom:10 }}>Arrastra para seleccionar el área a recortar</p>
      <div ref={overlayRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} style={{ position:'relative', cursor:'crosshair', maxWidth:'90vw', maxHeight:'70vh', userSelect:'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop" draggable={false} style={{ display:'block', maxWidth:'90vw', maxHeight:'70vh', objectFit:'contain' }} />
        {sel&&sel.w>2&&sel.h>2&&<div style={{ position:'absolute', left:sel.x, top:sel.y, width:sel.w, height:sel.h, border:'2px dashed #f97316', background:'rgba(249,115,22,0.15)', pointerEvents:'none' }}/>}
      </div>
      <canvas ref={canvasRef} style={{ display:'none' }} />
      <div style={{ display:'flex', gap:12, marginTop:16 }}>
        <button onClick={applyCrop} style={{ padding:'9px 28px', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer' }}>Aplicar recorte</button>
        <button onClick={onClose} style={{ padding:'9px 28px', borderRadius:10, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', fontSize:14, cursor:'pointer' }}>Cancelar</button>
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
const Reporte = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  useEffect(() => {
    const hide = localStorage.getItem('hideHelpGif') === 'true';
    setShowHelpModal(!hide);
  }, []);
  
  const router = useRouter();
  const { data: session } = useSession();
  const { conclusions } = useContext(ReportContext);
  const [copyConclusions, setCopyConclusions] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [topLeftText, setTopLeftText]   = useState('');
  const [expandedDivs, setExpandedDivs] = useState({});
  const imgRef    = useRef(null);
  const reportRef = useRef(null);
  const conclusionDivRef = useRef(null);
  const elementRef       = useRef(null);

  const [activeTab, setActiveTab] = useState('reporte');
  const [figuras, setFiguras]     = useState([]);
  const [cropState, setCropState] = useState(null);

  const listaVisual = useMemo(() => {
    const rows = [];
    for (const c of conclusions) {
      const item = getListItem(c);
      if (!item) continue;
      const existing = rows.find(r => r.k === item.k);
      if (existing) {
        if (!existing.v.includes(item.v)) existing.v += '  ' + item.v;
      } else {
        rows.push({ ...item });
      }
    }
    return rows;
  }, [conclusions]);

  // ── formateo de conclusiones ──────────────────────────────────────────────
  function formatConclusions(copyConclusions) {
    const keywords2 = ["POSTGANGLIONAR PACIAL A NIVEL DE TROCO"];
    const keywords3 = ["POSTGANGLIONAR PARCIAL A NIVEL DE CORDON"];
    const keywords4 = ["INTENSIDAD LEVE.", "INTENSIDAD MODERADA.", "INTENSIDAD SEVERA."];
    const keywords  = ["C5","C6","C7","C8","T1","SUPERIOR","MEDIO","INFERIOR","LATERAL","POSTERIOR","MEDIAL","L2","L3","L4","L5","S1","S2"];
    const specificKeywords  = ["C5","C6","C7","C8","T1"];
    const prognosisKeywords = [
      "PRONÓSTICO DE RECUPERACIÓN COMPLETA.",
      "PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.",
      "PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.",
      "PRONÓSTICO DE RECUPERACIÓN NULA.",
    ];
    const keywords5 = ["FOCALIZADA A NIVEL", "FOCAL A NIVEL"];

    if (copyConclusions.includes(keywords5[0])) {
      copyConclusions = 'MONO ' + copyConclusions;
    }

    let words = copyConclusions.split(' ');

    for (let i = 0; i < words.length; i++) {
      if (keywords2.includes(words.slice(i, i + 6).join(' '))) {
        let count = 0;
        for (let j = i + 6; j < words.length; j++) { if (keywords.includes(words[j])) count++; }
        if (count > 1) words[i + 5] += 'S';
        break;
      }
    }
    for (let i = 0; i < words.length; i++) {
      if (keywords3.includes(words.slice(i, i + 6).join(' '))) {
        let count = 0;
        for (let j = i + 6; j < words.length; j++) { if (keywords.includes(words[j])) count++; }
        if (count > 1) words[i + 5] += 'ES';
        break;
      }
    }
    for (let i = 0; i < words.length; i++) {
      if (keywords4.includes(words.slice(i, i + 2).join(' '))) {
        words[i + 1] += '\n';
      }
    }
    for (let phrase of prognosisKeywords) {
      const regex = new RegExp(phrase, 'g');
      copyConclusions = copyConclusions.replace(regex, phrase + '\n\n');
    }

    let firstKeywordIndex = words.findIndex(word => specificKeywords.includes(word));
    if (firstKeywordIndex !== -1) {
      words.splice(firstKeywordIndex, 0, "PREGANGLIONAR PARCIAL A NIVEL DE");
    }

    let keywordPositions = [];
    for (let i = 0; i < words.length; i++) {
      if (keywords.includes(words[i])) keywordPositions.push(i);
    }
    if (keywordPositions.length > 1) {
      for (let i = 0; i < keywordPositions.length - 2; i++) {
        words[keywordPositions[i]] += ',';
      }
      let lastKeywordIndex = keywordPositions[keywordPositions.length - 1];
      let conjunction = words[lastKeywordIndex][0].toUpperCase() === 'I' ? 'E' : 'Y';
      words.splice(lastKeywordIndex, 0, conjunction);
    }

    let formattedConclusions = words.join(' ');
    formattedConclusions = formattedConclusions.replace(/ \bREINERVACIÓN\b/g, '\nREINERVACIÓN');
    formattedConclusions = formattedConclusions.replace(
      /(PRONÓSTICO DE RECUPERACIÓN (?:COMPLETA|PARCIAL FUNCIONAL|POBRE NO FUNCIONAL|NULA)\.)\s*/gi,
      '$1\n\n'
    );
    formattedConclusions = formattedConclusions.replace(
      /([.;])\s*(MONO NEUROPATÍA|POLI NEUROPATÍA|NEURONOPATÍA|RADICULOPATÍA|PLEXOPATÍA)/gi,
      '$1\n\n$2'
    );

    return formattedConclusions;
  }

  // ── effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const newConclusions = conclusions.map(cl => cl.title).join('');
    setCopyConclusions(formatConclusions(newConclusions));
  }, [conclusions]);

  const handleTextareaChange = (e) => setCopyConclusions(e.target.value);

  const handleImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImages(prev => [...prev, {
        src: URL.createObjectURL(event.target.files[0]),
        position: { x: Math.random() * 200, y: Math.random() * 200 },
        size: { width: 200, height: 200 },
      }]);
    }
  }, [selectedImages]);

  const handleDragStop = useCallback((index, e, d) => {
    setSelectedImages(prev => {
      const next = [...prev];
      next[index].position = { x: d.x, y: d.y };
      return next;
    });
  }, []);

  const handleResizeStop = useCallback((index, e, direction, ref, delta, position) => {
    setSelectedImages(prev => {
      const next = [...prev];
      next[index].size = { width: ref.style.width, height: ref.style.height };
      return next;
    });
  }, []);

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Modal de ayuda */}
      {showHelpModal && (
        <div className="help-modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="help-modal-content" onClick={e => e.stopPropagation()}>
            <button className="help-modal-close" onClick={() => setShowHelpModal(false)}>×</button>
            <img
              src="https://media.githubusercontent.com/media/migueszitle111/ResidenciaProyecto/refs/heads/main/public/assets/Gifs/Ayudaboton.gif"
              alt="Ayuda menú"
              className="help-modal-gif"
            />
            <button
              className="help-modal-hide"
              onClick={() => { localStorage.setItem('hideHelpGif', 'true'); setShowHelpModal(false); }}
            >
              No volver a mostrar
            </button>
          </div>
        </div>
      )}

      {/* ── Barra superior ── */}
      <div style={{
        flexShrink: 0, width: '100%', height: 52,
        background: '#111', borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '0 20px', boxSizing: 'border-box',
      }}>
        <div />
        
        <div style={{ flexShrink:0, width:'100%', height:52, background:'#111', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', padding:'0 20px', boxSizing:'border-box' }}>
          <div>
            <button onClick={() => router.push('/Reporte')}
              style={{ display:'flex', alignItems:'left', justifyContent:'left', width:38, height:38, borderRadius:'50%', background:'#1C1C1C', border:'2px solid #c44900', cursor:'pointer', padding:8, transition:'background 0.15s', marginLeft: -445 }}
              onMouseEnter={e => { e.currentTarget.style.background='#c44900'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#1C1C1C'; }}>
              <img src="/assets/IconSVG/I_Crop.svg" alt="Regresar" style={{ width:18, height:18, filter:'invert(1)' }} />
            </button>
          </div>
          <input
            type="text"
            value={topLeftText}
            onChange={e => setTopLeftText(e.target.value)}
            placeholder="Nombre del paciente"
            style={{
              width: 580, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7,
              padding: '6px 14px', color: '#fff', fontSize: 13,
              outline: 'none', boxSizing: 'border-box', textAlign: 'center',
            }}
          />
        </div>

      </div>

      {/* ── Zona centrada ── */}
      <div style={{
        flex: '0 0 auto', width: '100%', maxWidth: 850,
        display: 'flex', flexDirection: 'column',
        padding: '12px 8px 0', boxSizing: 'border-box',
      }}>

        {/* Fila: menú izquierdo + lámina derecha */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'stretch', minHeight: 520 }}>

          {/* ── Panel menú ── */}
          <div style={{
            width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column',
            background: '#111', borderRadius: '10px 0 0 10px',
            border: '1px solid rgba(255,255,255,0.08)', borderRight: 'none',
            overflowY: 'auto',
          }}>
            <div style={{ flex: 1, padding: '12px 14px 14px', overflowY: 'auto' }}>
              <SimpleMultiStepForm
                reportRef={reportRef}
                showStepNumber={true}
                conclusionDivRef={conclusionDivRef}
                elementRef={elementRef}
                handleImageChange={handleImageChange}
                topLeftText={topLeftText}
                setTopLeftText={setTopLeftText}
                copyConclusions={copyConclusions}
                ref={imgRef}
                expandedDivs={expandedDivs}
                setExpandedDivs={setExpandedDivs}
                figuras={figuras}
                setFiguras={setFiguras}
                activeTab={activeTab}
              />
            </div>
          </div>

          {/* ── Lámina anatómica ── */}
          <div style={{
            flex: 1, position: 'relative',
            background: '#fff', borderRadius: '0 10px 10px 0',
            boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}>
            <div className="con-img" ref={reportRef} id="reporte-completo" style={{ width: 600, flexShrink: 0 }}>

              {/* Figuras circulares/cuadradas con z-index alto */}
              {figuras.map(figura => (
                <Rnd
                  key={figura.id}
                  default={{ x: figura.x, y: figura.y, width: 80, height: 80 }}
                  onDragStop={(_e, d) =>
                    setFiguras(prev => prev.map(f => f.id === figura.id ? { ...f, x: d.x, y: d.y } : f))
                  }
                  lockAspectRatio={true}
                  style={{ zIndex: 200, position: 'absolute' }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={figura.src}
                      draggable="false"
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        borderRadius: figura.tipo === 'circle' ? '50%' : 0,
                        border: '1.5px solid gray',
                        display: 'block', pointerEvents: 'none',
                      }}
                    />
                    <button
                      onMouseDown={e => e.stopPropagation()}
                      onClick={() => setFiguras(prev => prev.filter(f => f.id !== figura.id))}
                      style={{
                        position: 'absolute', top: -10, right: -10,
                        width: 24, height: 24, borderRadius: '50%',
                        background: 'red', border: 'none', cursor: 'pointer',
                        color: '#fff', fontSize: 11, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 201,
                      }}
                    >✕</button>
                    <button
                      onMouseDown={e => e.stopPropagation()}
                      onClick={() => setCropState({ id: figura.id, src: figura.src })}
                      style={{
                        position: 'absolute', bottom: -10, left: -10,
                        width: 26, height: 26, borderRadius: '50%',
                        background: 'rgba(0,0,0,0.75)', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 201,
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                  </div>
                </Rnd>
              ))}

              {/* Imágenes arrastrables */}
              {selectedImages.map((image, index) => (
                <Rnd
                  className="rnd-image"
                  key={index}
                  size={image.size}
                  position={image.position}
                  onDragStop={(e, d) => handleDragStop(index, e, d)}
                  onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(index, e, direction, ref, delta, position)}
                  lockAspectRatio={true}
                  style={{ zIndex: 2 }}
                >
                  <img src={image.src} draggable="false" />
                </Rnd>
              ))}

              {/* Contenido principal: overlays + canvas */}
              <div ref={elementRef} className="conclusion-container" style={{ paddingBottom: 175 }}>
                <div id="dropArea">
                  <DropArea topLeftText={topLeftText} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} />
                </div>
                <ConclusionCanvas
                  img={{
                    src: '/assets/NeuronoImg/BP_Neuronopatia.png',
                    alt: 'Modelo',
                    useMap: '#image-map',
                    width: '600',
                    height: '600',
                  }}
                  rules={[
                    { expectedValue: 'MEDIANO', image: { src: 'NeuropatiaImg/NO_1_Mediano.png', alt: 'Modelo' } },
                                      {
                    expectedValue: 'MEDIANO2',
                    image: {
                      src: 'NeuropatiaImg/NO_1_Mediano.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'INTEROSEOANTERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Anterior.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'INTEROSEOANTERIOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Anterior.png',
                      alt: 'Modelo',
                    }

                  },
                  {
                    expectedValue: 'ACCESORIO',
                    image: {
                      src: 'NeuropatiaImg/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ACCESORIO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRAQUIAL_CUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Antebraquial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRAQUIAL_CUTANEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Antebraquial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR',
                    image: {
                      src: 'NeuropatiaImg/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Posterior.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Interoseo Posterior.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR',
                    image: {
                      src: 'NeuropatiaImg/NO_Supraescapular - Subescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Supraescapular - Subescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR',
                    image: {
                      src: 'NeuropatiaImg/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'DORSAL_CUTANEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Dorsal Cutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'DORSAL_CUTANEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Dorsal Cutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO',
                    image: {
                      src: 'NeuropatiaImg/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_LARGO',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracico_largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_LARGO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracico_largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO',
                    image: {
                      src: 'NeuropatiaImg/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Medio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Medio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Sup.Inf FC.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Gluteo Sup.Inf FC.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO',
                    image: {
                      src: 'NeuropatiaImg/NO_Safeno.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Safeno.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                  expectedValue: 'FEMOROCUTÁNEO_LATERAL',
                  image: {
                    src: 'NeuropatiaImg/NO_Femorocutáneo femoral.png',
                    alt: 'Modelo',
                  }
                  },
                                    {
                  expectedValue: 'FEMOROCUTÁNEO_LATERAL2',
                  image: {
                    src: 'NeuropatiaImg/NO_Femorocutáneo femoral.png',
                    alt: 'Modelo',
                  }
                  },
                  {
                    expectedValue: 'ILIOINGUINAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Ilioinguinal-genitofemoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTURADOR',
                    image: {
                      src: 'NeuropatiaImg/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTURADOR2',
                    image: {
                      src: 'NeuropatiaImg/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'NERVIO_PERONEO',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'NERVIO_PERONEO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Superficial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Profundo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Peroneo Profundo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Sural.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Sural.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL2',
                    image: {
                      src: 'NeuropatiaImg/NO_Plantar Lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO',
                    image: {
                      src: 'NeuropatiaImg/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO2',
                    image: {
                      src: 'NeuropatiaImg/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'MED_IZQUIERDA',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },


                  // Imagenes de Generalizada DERECHA

                  {
                    expectedValue: 'MEDIANO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                // FALTA EL NERVIO 
                  {
                    expectedValue: 'INTEROSEO_ANTERIOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  // FALTA EL NERVIO 
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MEDIANO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  
                  {
                    expectedValue: 'SUPRAESCAPULAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_DERgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/DERECHA/Ulnar.png',
                      alt: 'Modelo',
                    }
                  },


                  // Imagenes de Generalizada IZQUIERDA
                  {
                    expectedValue: 'MEDIANO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MEDIANO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'MUSCULOCUTANEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Musculocutaneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_IZQgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/IZQUIERDA/Ulnar.png',
                      alt: 'Modelo',
                    }
                  },

                  // Imagenes de Generalizada NERVIO COMPLETO

                  {
                    expectedValue: 'MEDIANO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_12_Mediano.png',
                      alt: 'Modelo',
                    }
                  },
                  //C:\Users\Estefanny Cruz.B\Documents\RESIDENCIA\ResidenciaProyecto\public\assets\NeuropatiaImg\NervioRojo\COMPLETO\NO_Interoseo-Anterior(1).png
                  {
                    expectedValue: 'INTEROSEOANTERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Anterior(1).png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'ACCESORIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Accesorio.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRLATE_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ANTEBRMEDIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Antebraquial medial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'AXILAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Axilar.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'CIATICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Ciatico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FACIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Facial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMORAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Femoral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FEMOROCUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Femorocutáneo lateral.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'FRENICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Frenico.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ILIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_GF-ILIO.png',
                      alt: 'Modelo',
                    }
                  },

                  {
                    expectedValue: 'MUSCULOCUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Musculocutaneo.png',
                      alt: 'Modelo2',
                    }
                  },
                  {
                    expectedValue: 'OBTUUADOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Obturador.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PUDENDO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Pudendo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'RADIAL_SUPERFICIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'INTEROSEO_POSTERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Interoseo-Posterior (1).png',
                      alt: 'Modelo',
                    }
                  },

                //FALTA NERVIO
                  {
                    expectedValue: 'DORSAL_CUTANEO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Radial-Superficial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SAFENO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Safeno(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SUPRAESCAPULAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Supraescapular.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TIBIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Tibial.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'SURAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Sural-(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_MEDIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Medial(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PLANTAR_LATERAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Plantar-Lateral(1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_SUPERFICIAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Superficial (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'PERONEO_PROFUNDO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Peroneo-Profundo (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_INFERIOR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Sup.Inf (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'GLUTEO_MEDIO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Gluteo Medio (1).png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACICO_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracico largo.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'TORACODORSAL_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Toracodorsal.png',
                      alt: 'Modelo',
                    }
                  },
                  {
                    expectedValue: 'ULNAR_COMPgeneralizada',
                    image: {
                      src: 'NeuropatiaImg/NervioRojo/COMPLETO/NO_Ulnar.png',
                      alt: 'Modelo',
                    }
                  },
                  ]}
                />
                {/* Overlays de nervios */}
                <div>{checkDivsBILATERAL(copyConclusions)}</div>
                <div>{checkDivsBILATERAL2(copyConclusions)}</div>
                <div>{checkDivs(copyConclusions)}</div>
                <div>{checkDivs2(copyConclusions)}</div>
                <div>{checkDivsSegmentar(copyConclusions)}</div>
                <div>{checkDivsSegmentar2(copyConclusions)}</div>
                <div>{checkDivsSegmentarBilateral(copyConclusions)}</div>
                <div>{checkDivsSegmentarBilateral2(copyConclusions)}</div>
                {/* Cuadro de conclusiones con tabs Reporte / Lista */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 10,
                  width: 'calc(100% - 40px)',
                  background: 'rgba(10,10,10,0.7)',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: 3,
                }}>
                  <div style={{ display: 'flex', gap: 3, padding: '5px 8px' }}>
                    {[['reporte', 'Reporte'], ['lista', 'Lista']].map(([id, label]) => (
                      <button key={id} onClick={() => setActiveTab(id)} style={{
                        padding: '2px 11px', borderRadius: 5, fontSize: 10, fontWeight: 600,
                        border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                        background: activeTab === id ? '#f97316' : 'rgba(255,255,255,0.07)',
                        color: activeTab === id ? '#fff' : 'rgba(255,255,255,0.38)',
                      }}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'reporte' && (
                    <textarea
                      value={copyConclusions}
                      onChange={handleTextareaChange}
                      placeholder="Sin conclusiones aún."
                      style={{
                        display: 'block', width: '100%', minHeight: 138,
                        boxSizing: 'border-box', resize: 'vertical',
                        background: 'transparent',
                        border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '0 0 8px 8px',
                        padding: '6px 10px',
                        color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.55,
                        outline: 'none', fontFamily: 'inherit',
                        overflowY: 'auto', wordBreak: 'break-word',
                      }}
                    />
                  )}

                  {activeTab === 'lista' && (
                    <div style={{
                      height: 138, overflowY: 'auto',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0 0 8px 8px',
                      padding: '8px 10px',
                    }}>
                      {listaVisual.length === 0 && !copyConclusions.trim()
                        ? <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, fontStyle: 'italic', margin: 0 }}>Sin conclusiones aún.</p>
                        : <>
                            {listaVisual.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 20px', marginBottom: 8 }}>
                                {listaVisual.map(({ k, v }, i) => (
                                  <p key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0 }}>
                                    <span style={{ color: '#f97316', fontWeight: 600 }}>{k}:</span> {v}
                                  </p>
                                ))}
                              </div>
                            )}
                            {/* {copyConclusions.trim() && copyConclusions.split('\n\n').filter(Boolean).map((p, i) => (
                              <p key={`cp${i}`} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, margin: '2px 0', borderLeft: '2px solid rgba(249,115,22,0.35)', paddingLeft: 8 }}>
                                {p.trim()}
                              </p>
                            ))} */}
                          </>
                      }
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>{/* fin fila menú + lámina */}


      </div>
      {cropState && (
        <CropModal
          src={cropState.src}
          onConfirm={newSrc => { setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: newSrc } : f)); setCropState(null); }}
          onClose={() => setCropState(null)}
        />
      )}
    </div>
  );
};

export default Reporte;
