"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { CRANEALES, OTROS, getFolder } from "../utils/cirugiaUtils";
import { buildMonitoreoPdf, buildReportFileName, toSafeToken } from "../utils/pdfGenerator";
import { SuggestInput, SuggestTextarea } from "./SuggestField";

// Fields excluded from autocomplete history (personal data or format-specific).
const NO_SUGGEST_FIELDS = new Set(["nombrePaciente", "fecha"]);

// Autocomplete scoping strategy (hybrid):
//   - "global" fields (person/place data like cirujano, hospital, equipo) share
//     a single pool across ALL surgery categories — same surgeon works on
//     craneal, cervical, etc., so suggestions must cross categories.
//   - Everything else (diagnóstico, insumos, clinical registros, conclusión,
//     notas) is scoped per surgery category ("craneal", "cervical", "lumbar",
//     "otros") because signal patterns and conclusions differ a lot between
//     categories — mixing them would surface irrelevant text.
const GLOBAL_FIELDS = new Set([
  "cirujano",
  "hospital",
  "aseguranza",
  "neurofisiologo",
  "equipo",
]);

// Lowercase folder code used as bucket suffix. Falls back to "unknown" when
// the surgery name doesn't map to a known category — those entries still work,
// they just live in their own bucket instead of contaminating a real one.
const categoryBucket = (nombreCirugia) => {
  const folder = getFolder(nombreCirugia);
  return folder ? folder.toLowerCase() : "unknown";
};

const fieldKeyFor = (name, nombreCirugia) => {
  if (GLOBAL_FIELDS.has(name)) return `monitoreo.${name}`;
  return `monitoreo.${name}:${categoryBucket(nombreCirugia)}`;
};

const STORAGE_KEY = (tipo, paciente) =>
  `@formulario_monitoreo_${tipo}_${(paciente||'').replace(/\s+/g,'_')}`;

const emptyReg = () => ({ texto: '', imagenes: [] });

function emptyBasales(esCraneal) {
  return {
    peSomatosensoriales: emptyReg(),
    peMotores:           emptyReg(),
    ...(esCraneal ? { peMotoresCorticobulbares: emptyReg() } : {}),
    emgLibre:            emptyReg(),
    emgEvocada:          emptyReg(),
    ...(esCraneal ? {
      peVisuales:       emptyReg(),
      peAuditivosTallo: emptyReg(),
    } : {}),
    ondaD:               emptyReg(),
    tof:                 emptyReg(),
    electroencefalograma: emptyReg(),
    ...(esCraneal ? { electrocorticografia: emptyReg() } : {}),
    pNeuromotores:       emptyReg(),
  };
}

function emptyFinales(esCraneal) {
  return {
    peSomatosensorialesFinales: emptyReg(),
    peMotoresFinales:           emptyReg(),
    ...(esCraneal ? { peMotoresCorticobulbaresFinales: emptyReg() } : {}),
    emgLibreFinales:            emptyReg(),
    emgEvocadaFinales:          emptyReg(),
    ...(esCraneal ? {
      peVisualesFinales:       emptyReg(),
      peAuditivosTalloFinales: emptyReg(),
    } : {}),
    ondaDFinales:               emptyReg(),
    tofFinales:                 emptyReg(),
    electroencefalogramaFinales: emptyReg(),
    ...(esCraneal ? { electrocorticografiaFinales: emptyReg() } : {}),
    pNeuromotoresFinales:       emptyReg(),
  };
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

/* ── Modal de recorte (igual que en Plexopatia) ── */
function CropModal({ src, onConfirm, onClose }) {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [sel, setSel] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });

  // Coordenadas relativas al elemento <img> renderizado (no al div contenedor)
  const getImgPos = (e) => {
    const r = imgRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onMouseDown = (e) => {
    const pos = getImgPos(e);
    startRef.current = pos;
    setSel({ x: pos.x, y: pos.y, w: 0, h: 0 });
    setDrawing(true);
  };
  const onMouseMove = (e) => {
    if (!drawing) return;
    const pos = getImgPos(e);
    setSel({ x: Math.min(startRef.current.x, pos.x), y: Math.min(startRef.current.y, pos.y), w: Math.abs(pos.x - startRef.current.x), h: Math.abs(pos.y - startRef.current.y) });
  };
  const onMouseUp = () => setDrawing(false);

  const applyCrop = () => {
    if (!sel || sel.w < 5 || sel.h < 5) { onClose(); return; }
    const img = imgRef.current;
    // Escalar de píxeles de pantalla a píxeles naturales de la imagen
    const renderedW = img.getBoundingClientRect().width;
    const renderedH = img.getBoundingClientRect().height;
    const scaleX = img.naturalWidth / renderedW;
    const scaleY = img.naturalHeight / renderedH;
    const canvas = canvasRef.current;
    canvas.width  = Math.round(sel.w * scaleX);
    canvas.height = Math.round(sel.h * scaleY);
    canvas.getContext('2d').drawImage(
      img,
      sel.x * scaleX, sel.y * scaleY, sel.w * scaleX, sel.h * scaleY,
      0, 0, canvas.width, canvas.height
    );
    onConfirm(canvas.toDataURL('image/png'));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10200, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <p style={{ color: '#fff', fontSize: 13, marginBottom: 10 }}>Arrastra para seleccionar el área a recortar</p>
      {/* La posición del sel se calcula relativa al img, así que ponemos el overlay sobre el img */}
      <div style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair', userSelect: 'none' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop" draggable={false}
          style={{ display: 'block', maxWidth: '85vw', maxHeight: '65vh', objectFit: 'contain' }} />
        {sel && sel.w > 2 && sel.h > 2 && (
          <div style={{ position: 'absolute', left: sel.x, top: sel.y, width: sel.w, height: sel.h, border: '2px dashed #f97316', background: 'rgba(249,115,22,0.15)', pointerEvents: 'none' }} />
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={applyCrop} style={{ padding: '9px 28px', borderRadius: 10, border: 'none', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Aplicar recorte</button>
        <button onClick={onClose} style={{ padding: '9px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 14, cursor: 'pointer' }}>Cancelar</button>
      </div>
    </div>
  );
}

function Campo({ label, value, onChange, placeholder, type = 'text', required, name, nombreCirugia }) {
  const inputClass = "w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none placeholder-slate-600";
  const suggestKey = name && !NO_SUGGEST_FIELDS.has(name) ? fieldKeyFor(name, nombreCirugia) : null;
  return (
    <div>
      <label className="text-slate-400 text-xs mb-1 block">
        {label}{required && <span className="text-orange-400 ml-1">*</span>}
      </label>
      {suggestKey ? (
        <SuggestInput
          fieldKey={suggestKey}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          type={type}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || label}
          className={inputClass}
        />
      )}
    </div>
  );
}

const MAX_IMAGENES = 5;

function SubRegistroField({ label, value, onChange, suggestKey }) {
  const fileRef = useRef();
  const [cropSrc, setCropSrc] = useState(null);
  const [cropIdx, setCropIdx] = useState(null);

  const handleImages = e => {
    const disponibles = MAX_IMAGENES - value.imagenes.length;
    if (disponibles <= 0) return;
    const files = Array.from(e.target.files).slice(0, disponibles);
    Promise.all(files.map(f => new Promise(res => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.readAsDataURL(f);
    }))).then(uris => onChange({ ...value, imagenes: [...value.imagenes, ...uris] }));
  };

  const abrirCrop = (src, i) => { setCropSrc(src); setCropIdx(i); };
  const aplicarCrop = (croppedDataUrl) => {
    const nuevas = [...value.imagenes];
    if (cropIdx !== null) nuevas[cropIdx] = croppedDataUrl;
    onChange({ ...value, imagenes: nuevas });
    setCropSrc(null); setCropIdx(null);
  };

  return (
    <div className="bg-[#111] rounded-xl p-4 border border-white/10">
      <p className="text-orange-400 text-xs font-semibold mb-2">{label}</p>
      {suggestKey ? (
        <SuggestTextarea
          fieldKey={suggestKey}
          value={value.texto}
          onChange={(txt) => onChange({ ...value, texto: txt })}
          placeholder="Observaciones..."
          rows={3}
          className="w-full bg-[#1c1c1c] text-white text-sm rounded-md p-2 border border-white/10 resize-none focus:border-orange-500 focus:outline-none placeholder-slate-500"
        />
      ) : (
        <textarea
          value={value.texto}
          onChange={e => onChange({ ...value, texto: e.target.value })}
          placeholder="Observaciones..."
          rows={3}
          className="w-full bg-[#1c1c1c] text-white text-sm rounded-md p-2 border border-white/10 resize-none focus:border-orange-500 focus:outline-none placeholder-slate-500"
        />
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {value.imagenes.map((src, i) => (
          <div key={i} className="relative w-16 h-16 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
            {/* Botón recortar */}
            <button
              onClick={() => abrirCrop(src, i)}
              title="Recortar"
              className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[9px] py-0.5 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity text-center"
            >✂ Editar</button>
            <button
              onClick={() => onChange({ ...value, imagenes: value.imagenes.filter((_, j) => j !== i) })}
              className="absolute -top-1 -right-1 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
            >×</button>
          </div>
        ))}
        {value.imagenes.length < MAX_IMAGENES && (
          <button
            onClick={() => fileRef.current.click()}
            className="w-16 h-16 border border-dashed border-orange-500/50 rounded-md flex items-center justify-center text-orange-400 hover:border-orange-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
        {value.imagenes.length >= MAX_IMAGENES && (
          <p className="text-slate-600 text-[10px] self-center">Máx. {MAX_IMAGENES} imágenes</p>
        )}
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
      </div>
      {cropSrc && (
        <CropModal src={cropSrc} onConfirm={aplicarCrop} onClose={() => { setCropSrc(null); setCropIdx(null); }} />
      )}
    </div>
  );
}

// Basales and Finales share the same suggestion pool per registro TYPE — the
// suffix "…Finales" is dropped so "PE Somatosensoriales" observations recorded
// during either phase autocomplete each other. Scoping by category is added at
// use-site (see registroSuggestKey below) so a craneal EEG doesn't pollute a
// lumbar EEG bucket.
const REGISTRO_BASE_TYPE = {
  peSomatosensoriales: 'peSomatosensoriales',
  peSomatosensorialesFinales: 'peSomatosensoriales',
  peMotores: 'peMotores',
  peMotoresFinales: 'peMotores',
  peMotoresCorticobulbares: 'peMotoresCorticobulbares',
  peMotoresCorticobulbaresFinales: 'peMotoresCorticobulbares',
  emgLibre: 'emgLibre',
  emgLibreFinales: 'emgLibre',
  emgEvocada: 'emgEvocada',
  emgEvocadaFinales: 'emgEvocada',
  peVisuales: 'peVisuales',
  peVisualesFinales: 'peVisuales',
  peAuditivosTallo: 'peAuditivosTallo',
  peAuditivosTalloFinales: 'peAuditivosTallo',
  ondaD: 'ondaD',
  ondaDFinales: 'ondaD',
  tof: 'tof',
  tofFinales: 'tof',
  electroencefalograma: 'electroencefalograma',
  electroencefalogramaFinales: 'electroencefalograma',
  electrocorticografia: 'electrocorticografia',
  electrocorticografiaFinales: 'electrocorticografia',
  pNeuromotores: 'comentario',
  pNeuromotoresFinales: 'comentario',
};

const registroSuggestKey = (campoKey, nombreCirugia) => {
  const base = REGISTRO_BASE_TYPE[campoKey];
  if (!base) return null;
  return `monitoreo.registro.${base}:${categoryBucket(nombreCirugia)}`;
};

function CamposRegistros({ data, onChange, esCraneal, nombreCirugia }) {
  const set = campo => val => onChange({ ...data, [campo]: val });
  const campos = [
    ['peSomatosensoriales',      'PE Somatosensoriales'],
    ['peMotores',                'PE Motores'],
    ...(esCraneal ? [['peMotoresCorticobulbares', 'PE Motores Corticobulbares']] : []),
    ['emgLibre',                 'EMG Libre'],
    ['emgEvocada',               'EMG Evocada'],
    ...(esCraneal ? [
      ['peVisuales',    'PE Visuales'],
      ['peAuditivosTallo', 'PE Auditivos de Tallo Cerebral'],
    ] : []),
    ['ondaD',                    'Onda D'],
    ['tof',                      'TOF'],
    ['electroencefalograma',     'Electroencefalograma'],
    ...(esCraneal ? [['electrocorticografia', 'Electrocorticografía']] : []),
    ['pNeuromotores',            'Comentario'],
  ];
  return (
    <div className="flex flex-col gap-3">
      {campos.map(([key, label]) => (
        <SubRegistroField
          key={key}
          label={label}
          value={data[key] || emptyReg()}
          onChange={set(key)}
          suggestKey={registroSuggestKey(key, nombreCirugia)}
        />
      ))}
    </div>
  );
}

function CamposFinales({ data, onChange, esCraneal, nombreCirugia }) {
  const set = campo => val => onChange({ ...data, [campo]: val });
  const campos = [
    ['peSomatosensorialesFinales', 'PE Somatosensoriales'],
    ['peMotoresFinales',           'PE Motores'],
    ...(esCraneal ? [['peMotoresCorticobulbaresFinales', 'PE Motores Corticobulbares']] : []),
    ['emgLibreFinales',            'EMG Libre'],
    ['emgEvocadaFinales',          'EMG Evocada'],
    ...(esCraneal ? [
      ['peVisualesFinales',       'PE Visuales'],
      ['peAuditivosTalloFinales', 'PE Auditivos de Tallo Cerebral'],
    ] : []),
    ['ondaDFinales',               'Onda D'],
    ['tofFinales',                 'TOF'],
    ['electroencefalogramaFinales', 'Electroencefalograma'],
    ...(esCraneal ? [['electrocorticografiaFinales', 'Electrocorticografía']] : []),
    ['pNeuromotoresFinales',       'Comentario'],
  ];
  return (
    <div className="flex flex-col gap-3">
      {campos.map(([key, label]) => (
        <SubRegistroField
          key={key}
          label={label}
          value={data[key] || emptyReg()}
          onChange={set(key)}
          suggestKey={registroSuggestKey(key, nombreCirugia)}
        />
      ))}
    </div>
  );
}

// ─── Barra de progreso de pasos (6 pasos ahora) ───────────────────────────────
const PASOS = ['Datos', 'Basales', 'Procedimiento', 'Finales', 'Conclusión', 'Agregar'];

function PasoIndicador({ pasoActual }) {
  return (
    <div className="flex items-center justify-between mb-8 px-1">
      {PASOS.map((nombre, idx) => {
        const completado = idx < pasoActual;
        const activo     = idx === pasoActual;
        return (
          <div key={idx} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                completado ? 'bg-orange-500 text-white' :
                activo     ? 'bg-orange-500/20 border-2 border-orange-500 text-orange-400' :
                             'bg-[#1a1a1a] border border-white/10 text-slate-500'
              }`}>
                {completado ? '✓' : idx + 1}
              </div>
              <span className={`text-[9px] mt-1 text-center hidden sm:block ${activo ? 'text-orange-400 font-semibold' : completado ? 'text-slate-300' : 'text-slate-600'}`}>
                {nombre}
              </span>
            </div>
            {idx < PASOS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all ${completado ? 'bg-orange-500' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Modal selector de plantilla ─────────────────────────────────────────────
function PlantillaModal({ titulo, onConPlantilla, onSinPlantilla, onCancelar }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <h3 className="text-white font-bold text-lg text-center mb-2">{titulo}</h3>
        <p className="text-slate-400 text-sm text-center mb-6">Selecciona el estilo del PDF</p>
        <div className="flex gap-3 mb-3">
          <button
            onClick={onConPlantilla}
            className="flex-1 flex flex-col items-center gap-2 bg-[#1c1c1c] border border-orange-500/50 hover:border-orange-500 rounded-xl py-4 px-3 transition-colors group"
          >
            {/* Ícono plantilla con diseño */}
            <div className="w-10 h-10 rounded-full border-2 border-orange-400 group-hover:border-orange-500 flex items-center justify-center overflow-hidden">
              <div className="w-5 h-5 rounded-full border-2 border-orange-400" style={{ background: 'conic-gradient(#f97316 50%, transparent 50%)' }} />
            </div>
            <span className="text-white text-xs font-semibold">Con Plantilla IOM</span>
          </button>
          <button
            onClick={onSinPlantilla}
            className="flex-1 flex flex-col items-center gap-2 bg-[#1c1c1c] border border-white/20 hover:border-white/40 rounded-xl py-4 px-3 transition-colors"
          >
            <div className="w-10 h-10 rounded-full border-2 border-slate-400 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400" />
            </div>
            <span className="text-slate-300 text-xs font-semibold">Sin Plantilla</span>
          </button>
        </div>
        <button onClick={onCancelar}
          className="w-full border border-white/10 text-slate-400 hover:text-white py-2.5 rounded-xl text-sm transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ─── Modal principal "Generar Informe" ────────────────────────────────────────
function GenerarInformeModal({ onLink, onPdf, onCancelar }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xs p-6 shadow-2xl">
        <h3 className="text-white font-bold text-lg text-center mb-6">Generar Informe</h3>
        <div className="flex flex-col gap-3">
          <button onClick={onLink}
            className="w-full border border-orange-500 text-orange-400 hover:bg-orange-500/10 font-semibold py-3 rounded-xl text-sm transition-colors">
            🔗 Link
          </button>
          <button onClick={onPdf}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            ⬇ PDF
          </button>
          <button onClick={onCancelar}
            className="w-full border border-white/10 text-slate-400 hover:text-white py-2.5 rounded-xl text-sm transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LinkModal ────────────────────────────────────────────────────────────────
function LinkModal({ onClose, onGenerate, generating, link, progress, nombrePaciente }) {
  const [title, setTitle]     = useState(nombrePaciente ? `Neuromonitoreo Intraoperatorio – ${nombrePaciente}` : 'Neuromonitoreo Intraoperatorio');
  const [message, setMessage] = useState('');
  const [expiry, setExpiry]   = useState('15d');
  const [files, setFiles]     = useState([]);
  const fileRef = useRef();

  const handleFiles = e => {
    const newFiles = Array.from(e.target.files).map(f => ({
      id: `${Date.now()}_${f.name}`, name: f.name, file: f,
      size: f.size, type: f.type, status: 'pending',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const expiryOpts = [
    { v: '15d', l: '15 días' },
    { v: '30d', l: '30 días' },
    { v: '3m',  l: '3 meses' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold text-lg">Generar Link Compartible</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">×</button>
        </div>
        {link ? (
          <div className="flex flex-col gap-3">
            <p className="text-green-400 text-sm font-semibold">✓ Link generado exitosamente</p>
            <div className="bg-[#1c1c1c] rounded-lg px-3 py-2 text-orange-400 text-xs break-all">{link}</div>
            <div className="flex gap-2">
              <button onClick={() => navigator.clipboard.writeText(link)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg transition-colors">Copiar</button>
              <button onClick={onClose} className="flex-1 border border-white/20 text-slate-300 text-sm py-2 rounded-lg hover:border-white/40 transition-colors">Cerrar</button>
            </div>
          </div>
        ) : generating ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-full bg-[#1c1c1c] rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-slate-300 text-sm">Generando... {progress}%</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Título del link</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Reporte de Monitoreo"
                className="w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Mensaje (opcional)</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={2}
                className="w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none resize-none" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-2 block">Vigencia del link</label>
              <div className="flex gap-2">
                {expiryOpts.map(o => (
                  <button key={o.v} onClick={() => setExpiry(o.v)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${expiry === o.v ? 'bg-orange-500 text-white' : 'bg-[#1c1c1c] text-slate-400 border border-white/10 hover:border-orange-500/50'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-2 block">Archivos adicionales (opcional)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {files.map(f => (
                  <div key={f.id} className="bg-[#1c1c1c] rounded-lg px-3 py-1 text-xs text-slate-300 flex items-center gap-2">
                    {f.name}
                    <button onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))} className="text-red-400">×</button>
                  </div>
                ))}
              </div>
              <button onClick={() => fileRef.current.click()}
                className="w-full border border-dashed border-white/20 text-slate-400 hover:border-orange-500/50 hover:text-orange-400 text-xs py-3 rounded-lg transition-colors">
                + Agregar archivos
              </button>
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFiles} />
            </div>
            <button onClick={() => onGenerate({ title, message, expiry, files })}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              Generar Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Botones de navegación ────────────────────────────────────────────────────
function NavButtons({ onAnterior, onSiguiente, labelSiguiente = 'Siguiente →', disabledSiguiente = false, hideSiguiente = false }) {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
      {onAnterior ? (
        <button onClick={onAnterior}
          className="px-5 py-2.5 border border-white/20 text-slate-400 hover:text-white hover:border-white/40 rounded-xl text-sm transition-colors">
          ← Anterior
        </button>
      ) : <div />}
      {!hideSiguiente && (
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onSiguiente}
          disabled={disabledSiguiente}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
        >
          {labelSiguiente}
        </motion.button>
      )}
    </div>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function FormularioReporte({ nombreCirugia }) {
  const { data: session } = useSession();
  const esCraneal = CRANEALES.includes(nombreCirugia);
  const esOtros   = nombreCirugia === 'REPORTE_GENERICO' || (OTROS ? OTROS.includes(nombreCirugia) : false);

  // Paso actual: 0=Datos, 1=Basales, 2=Procedimiento, 3=Finales, 4=Conclusión, 5=Agregar
  const [paso, setPaso] = useState(0);

  // Formulario
  const [form, setForm] = useState({
    nombrePaciente: '', edad: '',
    fecha: (() => { const n = new Date(); const d = String(n.getDate()).padStart(2,'0'); const m = String(n.getMonth()+1).padStart(2,'0'); return `${d}/${m}/${n.getFullYear()}`; })(),
    diagnostico: '', cirujano: '', tipoCirugia: nombreCirugia,
    hospital: '', aseguranza: '', neurofisiologo: '', equipo: '', insumos: '',
    registrosBasales:   emptyBasales(esCraneal),
    fasesProcedimiento: [],
    faseActual: null,
    registrosFinales:   emptyFinales(esCraneal),
    conclusion: '', notaAgregada: '',
    tendenciasFotos: [],
  });

  // Firma (imagen cargada)
  const [firmaBase64, setFirmaBase64] = useState('');
  const firmaInputRef = useRef(null);

  // Opciones de adjuntos
  const [incluirProtocolo,    setIncluirProtocolo]    = useState(false);
  const [incluirProcedimiento,setIncluirProcedimiento]= useState(false);
  const [incluirModalidades,  setIncluirModalidades]  = useState(false);

  // UI states
  const [mensaje,        setMensaje]        = useState(null);
  const [generandoPdf,   setGenerandoPdf]   = useState(false);
  const [pdfProgress,    setPdfProgress]    = useState(0);
  const [showLink,       setShowLink]       = useState(false);
  const [linkUrl,        setLinkUrl]        = useState(null);
  const [linkGenerating, setLinkGenerating] = useState(false);
  const [linkProgress,   setLinkProgress]  = useState(0);

  // Modales de flujo de generación
  const [showGenerarModal,   setShowGenerarModal]   = useState(false);  // Generar Informe (Link/PDF)
  const [plantillaCallback,  setPlantillaCallback]  = useState(null);   // función a ejecutar tras elegir plantilla
  const [showPlantillaModal, setShowPlantillaModal] = useState(false);  // Selector Con/Sin plantilla

  // ── Auto-guardar borrador ──
  useEffect(() => {
    if (!form.nombrePaciente) return;
    localStorage.setItem(STORAGE_KEY(nombreCirugia, form.nombrePaciente), JSON.stringify({ form, paso }));
  }, [form, paso]);

  // ── Recuperar borrador ──
  const restaurarBorrador = () => {
    if (!form.nombrePaciente) return;
    const saved = localStorage.getItem(STORAGE_KEY(nombreCirugia, form.nombrePaciente));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm(parsed.form || parsed);
        if (parsed.paso !== undefined) setPaso(parsed.paso);
        showMsg('info', 'Borrador restaurado.');
      } catch {}
    } else {
      showMsg('info', 'No hay borrador guardado para este paciente.');
    }
  };

  const showMsg = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 4000);
  };

  const setField = field => val => setForm(f => ({ ...f, [field]: val }));

  // ── Fases del procedimiento ──
  const iniciarNuevaFase = () => {
    setForm(f => ({ ...f, faseActual: { nombre: '', ...emptyBasales(esCraneal) } }));
  };

  const guardarFaseActual = () => {
    if (!form.faseActual) return;
    if (!form.faseActual.nombre.trim()) { showMsg('error', 'Ingrese el nombre de la fase.'); return; }
    setForm(f => ({ ...f, fasesProcedimiento: [...f.fasesProcedimiento, f.faseActual], faseActual: null }));
  };

  const agregarOtraFase = () => {
    if (!form.faseActual) return;
    if (!form.faseActual.nombre.trim()) { showMsg('error', 'Ingrese el nombre de la fase.'); return; }
    setForm(f => ({
      ...f,
      fasesProcedimiento: [...f.fasesProcedimiento, f.faseActual],
      faseActual: { nombre: '', ...emptyBasales(esCraneal) },
    }));
  };

  const removeFase = idx => setForm(f => ({ ...f, fasesProcedimiento: f.fasesProcedimiento.filter((_, i) => i !== idx) }));
  const updateFaseActual = data => setForm(f => ({ ...f, faseActual: data }));

  // ── Tendencias ──
  const addTendencia = () => setForm(f => ({ ...f, tendenciasFotos: [...f.tendenciasFotos, emptyReg()] }));
  const updateTendencia = (idx, val) => setForm(f => { const arr = [...f.tendenciasFotos]; arr[idx] = val; return { ...f, tendenciasFotos: arr }; });
  const removeTendencia = idx => setForm(f => ({ ...f, tendenciasFotos: f.tendenciasFotos.filter((_, i) => i !== idx) }));

  // ── Construir datos del reporte ──
  const buildReporteData = useCallback(() => ({
    ...form,
    usuarioNombre:       session?.user?.name      || '',
    usuarioApellido:     session?.user?.lastname  || '',
    usuarioCorreo:       session?.user?.email     || '',
    usuarioTelefono:     '',
    usuarioCedula:       session?.user?.idprofessional || '',
    usuarioEspecialidad: session?.user?.specialty || '',
    usuarioLogo:         session?.user?.imageUrl  || '',
    firmaBase64:         firmaBase64 || '',
    incluirProtocolo,
    incluirProcedimiento,
    incluirModalidades,
  }), [form, session, firmaBase64, incluirProtocolo, incluirProcedimiento, incluirModalidades]);

  // ── Descarga PDF ──
  const handleDescargarPdf = async (usarPlantilla) => {
    setShowPlantillaModal(false);
    setShowGenerarModal(false);
    if (!form.conclusion) { showMsg('error', 'La conclusión es requerida.'); return; }
    setGenerandoPdf(true);
    setPdfProgress(0);
    try {
      const datos = buildReporteData();
      const arrayBuffer = await buildMonitoreoPdf(datos, usarPlantilla, p => setPdfProgress(p));
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = buildReportFileName(form.tipoCirugia, form.nombrePaciente);
      a.click();
      URL.revokeObjectURL(url);
      showMsg('ok', 'PDF descargado exitosamente.');
    } catch (e) {
      showMsg('error', `Error generando PDF: ${e.message}`);
    } finally {
      setGenerandoPdf(false);
    }
  };

  // ── Generar Link ──
  const handleGenerarLink = async (usarPlantilla) => {
    setShowPlantillaModal(false);
    setShowGenerarModal(false);
    if (!form.conclusion) { showMsg('error', 'La conclusión es requerida.'); return; }
    setShowLink(true);
    setLinkUrl(null);
    // La generación real la dispara el LinkModal al confirmar
    // Guardamos usarPlantilla para usarlo en el callback real
    setLinkUsarPlantilla(usarPlantilla);
  };

  const [linkUsarPlantilla, setLinkUsarPlantilla] = useState(true);

  const handleGenerarLinkConfirmar = async ({ title, message, expiry, files }) => {
    if (!form.conclusion) { showMsg('error', 'La conclusión es requerida.'); return; }
    setLinkGenerating(true);
    setLinkProgress(5);
    setLinkUrl(null);

    try {
      const datos = buildReporteData();
      const doctorName = [datos.usuarioNombre, datos.usuarioApellido].filter(Boolean).join(' ');
      const studyType  = 'Neuromonitoreo Intraoperatorio';
      const expSeconds = expiry === '30d' ? 2592000 : expiry === '3m' ? 7776000 : 1296000;

      const finalTitle = (title?.trim() || `${studyType} – ${form.nombrePaciente || 'Paciente'}`).slice(0, 140);
      const finalMsg   = message?.trim() || '';

      // Rutas relativas → funciona en local y en producción sin CORS
      const initRes = await fetch(`/api/share/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: finalTitle, message: finalMsg, expiresInSeconds: expSeconds,
          patient: form.nombrePaciente || null, doctor: doctorName || null,
          studyType, doctorLogo: session?.user?.imageUrl || null,
          meta: { patient: form.nombrePaciente, doctor: doctorName, study: studyType, studyType, doctorLogo: session?.user?.imageUrl || null },
        }),
      });
      const initData = await initRes.json();
      if (!initData.ok) throw new Error(initData.error || 'Error iniciando link');
      const { linkId } = initData;

      setLinkProgress(15);

      const arrayBuffer = await buildMonitoreoPdf(datos, linkUsarPlantilla, p => setLinkProgress(15 + Math.round(p * 0.5)));
      const reportName  = buildReportFileName(form.tipoCirugia, form.nombrePaciente);

      setLinkProgress(65);

      // Bucket de monitoreo — igual que la app móvil
      const MONITOREO_BUCKET = 'monitoreo-packages';
      const folder = toSafeToken(form.nombrePaciente || 'Paciente');

      // — Subir PDF del reporte —
      const formData = new FormData();
      formData.append('file', new Blob([arrayBuffer], { type: 'application/pdf' }), reportName);
      formData.append('folder', folder);
      formData.append('bucket', MONITOREO_BUCKET);

      const uploadRes = await fetch(`/api/share/upload`, { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.ok) throw new Error(uploadData.error || 'Error subiendo PDF');

      setLinkProgress(85);

      // — Archivos adicionales del usuario —
      // uploadData.path ya viene con prefijo "monitoreo-packages/..." igual que la app móvil
      const uploadedFiles = [
        {
          name:         uploadData.name,
          mime_type:    uploadData.mime_type,
          size_bytes:   uploadData.size_bytes,
          storage_path: uploadData.path,
        },
      ];

      for (const f of (files || [])) {
        const fd = new FormData();
        fd.append('file', f.file);
        fd.append('folder', folder);
        fd.append('bucket', MONITOREO_BUCKET);
        const r = await fetch(`/api/share/upload`, { method: 'POST', body: fd }).catch(() => null);
        if (r?.ok) {
          const d = await r.json().catch(() => null);
          if (d?.ok) {
            uploadedFiles.push({
              name:         d.name,
              mime_type:    d.mime_type,
              size_bytes:   d.size_bytes,
              storage_path: d.path,
            });
          }
        }
      }

      const doneRes = await fetch(`/api/share/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId, files: uploadedFiles }),
      });
      const doneData = await doneRes.json();
      if (!doneData.ok) throw new Error(doneData.error || 'Error completando link');

      setLinkProgress(100);
      setLinkUrl(doneData.url);
      localStorage.removeItem(STORAGE_KEY(nombreCirugia, form.nombrePaciente));
      limpiar();
    } catch (e) {
      showMsg('error', `Error: ${e.message}`);
      setShowLink(false);
    } finally {
      setLinkGenerating(false);
    }
  };

  // ── Flujo de selección: Generar Informe → Link/PDF → Con/Sin plantilla ──
  const abrirGenerarInforme = () => {
    if (!form.conclusion?.trim()) { showMsg('error', 'Por favor ingrese una conclusión antes de generar el reporte.'); return; }
    setShowGenerarModal(true);
  };

  const onElegirLink = () => {
    setShowGenerarModal(false);
    setPlantillaCallback(() => (usarPlantilla) => handleGenerarLink(usarPlantilla));
    setShowPlantillaModal(true);
  };

  const onElegirPdf = () => {
    setShowGenerarModal(false);
    setPlantillaCallback(() => (usarPlantilla) => handleDescargarPdf(usarPlantilla));
    setShowPlantillaModal(true);
  };

  const limpiar = () => {
    if (form.nombrePaciente) localStorage.removeItem(STORAGE_KEY(nombreCirugia, form.nombrePaciente));
    setForm({
      nombrePaciente: '', edad: '',
      fecha: (() => { const n = new Date(); const d = String(n.getDate()).padStart(2,'0'); const m = String(n.getMonth()+1).padStart(2,'0'); return `${d}/${m}/${n.getFullYear()}`; })(),
      diagnostico: '', cirujano: '', tipoCirugia: nombreCirugia,
      hospital: '', aseguranza: '', neurofisiologo: '', equipo: '', insumos: '',
      registrosBasales: emptyBasales(esCraneal), fasesProcedimiento: [],
      faseActual: null,
      registrosFinales: emptyFinales(esCraneal), conclusion: '', notaAgregada: '',
      tendenciasFotos: [],
    });
    setFirmaBase64('');
    setIncluirProtocolo(false);
    setIncluirProcedimiento(false);
    setIncluirModalidades(false);
    setPaso(0);
    showMsg('info', 'Formulario limpiado.');
  };

  // ── Validación por paso ──
  const validarPaso0 = () => {
    const { nombrePaciente, edad, fecha, diagnostico, cirujano, tipoCirugia, hospital, neurofisiologo } = form;
    if (!nombrePaciente || !edad || !fecha || !diagnostico || !cirujano || !tipoCirugia || !hospital || !neurofisiologo) {
      showMsg('error', 'Por favor complete los campos requeridos antes de continuar.');
      return false;
    }
    return true;
  };

  const validarPaso1 = () => {
    const b = form.registrosBasales;
    const tieneAlgo = Object.values(b).some(v => v?.texto?.trim());
    if (!tieneAlgo) { showMsg('error', 'Complete al menos un registro basal antes de continuar.'); return false; }
    return true;
  };

  const avanzar = () => {
    if (paso === 0 && !validarPaso0()) return;
    if (paso === 1 && !validarPaso1()) return;
    if (paso === 2 && form.faseActual?.nombre?.trim()) { guardarFaseActual(); return; }
    if (paso === 4 && !form.conclusion?.trim()) { showMsg('error', 'La conclusión es requerida.'); return; }
    setPaso(p => Math.min(p + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retroceder = () => {
    setPaso(p => Math.max(p - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">Reporte de Monitoreo</span>
          <h1 className="text-2xl font-bold text-white mt-1 leading-tight">{nombreCirugia}</h1>
        </div>
        <div className="flex gap-2 mt-1">
          <button onClick={restaurarBorrador} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Restaurar borrador
          </button>
          <button onClick={limpiar} className="text-xs text-slate-600 hover:text-red-400 transition-colors">
            Limpiar
          </button>
        </div>
      </div>

      {/* Mensaje */}
      <AnimatePresence>
        {mensaje && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`mb-4 px-4 py-3 rounded-xl text-sm ${
              mensaje.tipo === 'error' ? 'bg-red-900/50 text-red-300 border border-red-700' :
              mensaje.tipo === 'ok'    ? 'bg-green-900/50 text-green-300 border border-green-700' :
              'bg-blue-900/50 text-blue-300 border border-blue-700'
            }`}
          >{mensaje.texto}</motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de pasos */}
      <PasoIndicador pasoActual={paso} />

      {/* Overlay generando PDF */}
      {generandoPdf && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-80 flex flex-col items-center gap-4">
            <p className="text-white font-semibold">Generando PDF...</p>
            <div className="w-full bg-[#1c1c1c] rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${pdfProgress}%` }} />
            </div>
            <p className="text-orange-400 text-sm font-bold">{Math.round(pdfProgress)}%</p>
          </div>
        </div>
      )}

      {/* Contenido animado por paso */}
      <AnimatePresence mode="wait">
        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >

          {/* ── PASO 0: Datos del Paciente ── */}
          {paso === 0 && (
            <div>
              <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                Datos del Paciente y Cirugía
              </h2>
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Campo name="nombrePaciente"  label="Nombre del Paciente" value={form.nombrePaciente} onChange={setField('nombrePaciente')} required nombreCirugia={nombreCirugia} />
                  <Campo name="edad"            label="Edad"                value={form.edad}           onChange={setField('edad')} required nombreCirugia={nombreCirugia} />
                  <Campo name="fecha"           label="Fecha (DD/MM/AAAA)"  value={form.fecha}          onChange={setField('fecha')} placeholder="DD/MM/AAAA" required nombreCirugia={nombreCirugia} />
                  <Campo name="diagnostico"     label="Diagnóstico"         value={form.diagnostico}    onChange={setField('diagnostico')} required nombreCirugia={nombreCirugia} />
                  <Campo name="cirujano"        label="Cirujano"            value={form.cirujano}       onChange={setField('cirujano')} required nombreCirugia={nombreCirugia} />
                  <Campo name="tipoCirugia"     label="Tipo de Cirugía"     value={form.tipoCirugia}    onChange={setField('tipoCirugia')} required nombreCirugia={nombreCirugia} />
                  <Campo name="hospital"        label="Hospital"            value={form.hospital}       onChange={setField('hospital')} required nombreCirugia={nombreCirugia} />
                  <Campo name="aseguranza"      label="Aseguranza"          value={form.aseguranza}     onChange={setField('aseguranza')} nombreCirugia={nombreCirugia} />
                  <Campo name="neurofisiologo"  label="Neurofisiólogo"      value={form.neurofisiologo} onChange={setField('neurofisiologo')} required nombreCirugia={nombreCirugia} />
                  <Campo name="equipo"          label="Equipo"              value={form.equipo}         onChange={setField('equipo')} nombreCirugia={nombreCirugia} />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Insumos</label>
                  <SuggestTextarea
                    fieldKey={fieldKeyFor('insumos', nombreCirugia)}
                    value={form.insumos}
                    onChange={(v) => setField('insumos')(v)}
                    rows={2}
                    placeholder="Insumos utilizados..."
                    className="w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none resize-none placeholder-slate-600"
                  />
                </div>
              </div>
              <NavButtons onSiguiente={avanzar} labelSiguiente="Iniciar Cirugía →" />
            </div>
          )}

          {/* ── PASO 1: Registros Basales ── */}
          {paso === 1 && (
            <div>
              <h2 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                Registros Basales
              </h2>
              <p className="text-slate-500 text-xs mb-4 ml-8">Complete al menos un registro antes de continuar</p>
              <CamposRegistros data={form.registrosBasales} onChange={setField('registrosBasales')} esCraneal={esCraneal} nombreCirugia={nombreCirugia} />
              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Procedimiento →" />
            </div>
          )}

          {/* ── PASO 2: Fases del Procedimiento ── */}
          {paso === 2 && (
            <div>
              <h2 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                Fases del Procedimiento
              </h2>
              <p className="text-slate-500 text-xs mb-4 ml-8">Agregue las fases del procedimiento quirúrgico</p>

              {form.fasesProcedimiento.map((fase, idx) => (
                <div key={idx} className="border border-orange-500/20 rounded-xl p-4 mb-3 bg-[#0d0d0d]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-orange-400 text-sm font-semibold">Fase {idx + 1}: {fase.nombre}</span>
                    <button onClick={() => removeFase(idx)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 border border-red-800/40 rounded-lg transition-colors">
                      Eliminar
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs">Fase guardada — {Object.values(fase).filter(v => v?.texto?.trim()).length} campos con datos</p>
                </div>
              ))}

              {form.faseActual ? (
                <div className="border border-orange-500/40 rounded-xl p-4 mb-3 bg-[#0d0d0d]">
                  <div className="mb-3">
                    <label className="text-slate-400 text-xs mb-1 block">Nombre de la fase <span className="text-orange-400">*</span></label>
                    <input
                      value={form.faseActual.nombre}
                      onChange={e => updateFaseActual({ ...form.faseActual, nombre: e.target.value })}
                      placeholder="Ej: Apertura, Resección, Cierre..."
                      className="w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-orange-500/40 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <CamposRegistros
                    data={form.faseActual}
                    onChange={data => updateFaseActual({ ...form.faseActual, ...data })}
                    esCraneal={esCraneal}
                    nombreCirugia={nombreCirugia}
                  />
                  <div className="flex gap-3 mt-4">
                    <button onClick={guardarFaseActual}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                      ✓ Guardar Fase
                    </button>
                    <button onClick={agregarOtraFase}
                      className="flex-1 border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 text-sm py-2.5 rounded-xl transition-colors">
                      + Guardar y Agregar Otra
                    </button>
                    <button onClick={() => setForm(f => ({ ...f, faseActual: null }))}
                      className="px-4 border border-white/10 text-slate-500 hover:text-slate-300 text-sm py-2.5 rounded-xl transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={iniciarNuevaFase}
                  className="w-full border border-dashed border-orange-500/40 text-orange-400 hover:border-orange-500 rounded-xl py-4 text-sm transition-colors mb-3">
                  + Agregar Fase del Procedimiento
                </button>
              )}

              <NavButtons
                onAnterior={retroceder}
                onSiguiente={() => {
                  // Auto-save any in-progress phase before leaving step 2.
                  // Without this, a user who fills a fase and clicks "Continuar"
                  // without first pressing "Guardar Fase" loses that data:
                  // faseActual is dropped and only fasesProcedimiento reaches
                  // the PDF (see crearPaginasProcedimiento in pdfGenerator.js).
                  const fase = form.faseActual;
                  const hasContent = fase && Object.entries(fase).some(([k, v]) => (
                    k !== 'nombre' && v && (v.texto?.trim() || v.imagenes?.length > 0)
                  ));
                  if (fase && hasContent && !fase.nombre.trim()) {
                    showMsg('error', 'Ingrese el nombre de la fase actual antes de continuar (o cancélela para descartar).');
                    return;
                  }
                  if (fase && fase.nombre.trim()) {
                    setForm(f => ({ ...f, fasesProcedimiento: [...f.fasesProcedimiento, f.faseActual], faseActual: null }));
                  } else if (fase && !hasContent) {
                    // Empty phase (no name, no content) — silently discard.
                    setForm(f => ({ ...f, faseActual: null }));
                  }
                  setPaso(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                labelSiguiente="Continuar a Registros Finales →"
              />
            </div>
          )}

          {/* ── PASO 3: Registros Finales ── */}
          {paso === 3 && (
            <div>
              <h2 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">4</span>
                Registros Finales
              </h2>
              <p className="text-slate-500 text-xs mb-4 ml-8">Registros al finalizar el procedimiento</p>
              <CamposFinales data={form.registrosFinales} onChange={setField('registrosFinales')} esCraneal={esCraneal} nombreCirugia={nombreCirugia} />
              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Conclusión →" />
            </div>
          )}

          {/* ── PASO 4: Conclusión ── */}
          {paso === 4 && (
            <div>
              <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">5</span>
                Conclusión
              </h2>

              {/* Conclusión */}
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 mb-4">
                <div className="mb-4">
                  <label className="text-slate-400 text-xs mb-1 block">
                    Conclusión <span className="text-orange-400">*requerida</span>
                  </label>
                  <SuggestTextarea
                    fieldKey={fieldKeyFor('conclusion', nombreCirugia)}
                    value={form.conclusion}
                    onChange={(v) => setField('conclusion')(v)}
                    rows={5}
                    placeholder="Escriba la conclusión del monitoreo..."
                    className="w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none resize-none placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Nota Agregada</label>
                  <SuggestTextarea
                    fieldKey={fieldKeyFor('notaAgregada', nombreCirugia)}
                    value={form.notaAgregada}
                    onChange={(v) => setField('notaAgregada')(v)}
                    rows={3}
                    placeholder="Agregue notas adicionales si es necesario..."
                    className="w-full bg-[#1c1c1c] text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none resize-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Información del Médico y Firma */}
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 mb-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Info médico completa */}
                  <div className="flex-1 flex flex-col gap-0.5">
                    <p className="text-white text-sm font-semibold">
                      Dr. {session?.user?.name || ''} {session?.user?.lastname || ''}
                    </p>
                    {session?.user?.specialty && (
                      <p className="text-slate-400 text-xs">{session.user.specialty}</p>
                    )}
                    {session?.user?.idprofessional && (
                      <p className="text-slate-500 text-xs">Céd. {session.user.idprofessional}</p>
                    )}
                    {session?.user?.email && (
                      <p className="text-slate-500 text-xs">{session.user.email}</p>
                    )}
                  </div>
                  {/* Imagen de firma */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-slate-400 text-xs">Firma</p>
                    {firmaBase64 ? (
                      <div className="flex flex-col items-center gap-1">
                        <div className="bg-white rounded-lg p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={firmaBase64} alt="Firma" className="h-12 object-contain" style={{ maxWidth: 140 }} />
                        </div>
                        <button onClick={() => setFirmaBase64('')}
                          className="text-xs text-orange-400 hover:text-orange-300 border border-orange-500/40 px-2 py-1 rounded-lg transition-colors">
                          Cambiar
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => firmaInputRef.current?.click()}
                        className="border border-dashed border-orange-500/50 text-orange-400 hover:border-orange-500 text-xs px-4 py-3 rounded-xl transition-colors min-w-[120px] text-center">
                        Cargar firma
                      </button>
                    )}
                    <input
                      ref={firmaInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const r = new FileReader();
                        r.onload = () => setFirmaBase64(r.result);
                        r.readAsDataURL(file);
                        e.target.value = '';
                      }}
                    />
                  </div>
                </div>
              </div>

              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Agregar →" />
            </div>
          )}

          {/* ── PASO 5: AGREGAR ── */}
          {paso === 5 && (
            <div>
              <h2 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">6</span>
                AGREGAR
              </h2>
              <p className="text-slate-500 text-xs mb-4 ml-8">Adjunte documentos adicionales para el informe final</p>

              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 mb-4 flex flex-col gap-5">

                {/* Protocolo, Procedimiento, Modalidades — solo si no es "otros" */}
                {!esOtros && (
                  <>
                    {/* Protocolo */}
                    <div>
                      <p className="text-white text-sm font-semibold">Protocolo</p>
                      <p className="text-slate-500 text-xs mb-2">Se agregará al reporte final — Hoja 2</p>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setIncluirProtocolo(v => !v)}
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${incluirProtocolo ? 'bg-orange-500 border-orange-500' : 'bg-[#1c1c1c] border-white/20'}`}
                        >
                          {incluirProtocolo && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-slate-300 text-sm">Incluir en reporte final</span>
                      </label>
                    </div>

                    {/* Procedimiento */}
                    <div>
                      <p className="text-white text-sm font-semibold">Procedimiento</p>
                      <p className="text-slate-500 text-xs mb-2">Se agregará al reporte final — Hoja 3</p>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setIncluirProcedimiento(v => !v)}
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${incluirProcedimiento ? 'bg-orange-500 border-orange-500' : 'bg-[#1c1c1c] border-white/20'}`}
                        >
                          {incluirProcedimiento && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-slate-300 text-sm">Incluir en reporte final</span>
                      </label>
                    </div>

                    {/* Modalidades Neurofisiológicas */}
                    <div>
                      <p className="text-white text-sm font-semibold">Modalidades Neurofisiológicas</p>
                      <p className="text-slate-500 text-xs mb-2">Se agregará al reporte final — Hoja 4</p>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setIncluirModalidades(v => !v)}
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${incluirModalidades ? 'bg-orange-500 border-orange-500' : 'bg-[#1c1c1c] border-white/20'}`}
                        >
                          {incluirModalidades && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-slate-300 text-sm">Incluir en reporte final</span>
                      </label>
                    </div>

                    <div className="border-t border-white/10" />
                  </>
                )}

                {/* Tendencias y Cascada de Eventos */}
                <div>
                  <p className="text-white text-sm font-semibold">Tendencias y Cascada de Eventos</p>
                  <p className="text-slate-500 text-xs mb-3">Fotos tamaño grande con descripción — Última hoja</p>

                  {form.tendenciasFotos.map((t, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-xs font-semibold">Tendencia {idx + 1}</span>
                        <button onClick={() => removeTendencia(idx)} className="text-red-400 text-xs hover:text-red-300">✕ Eliminar</button>
                      </div>
                      <SubRegistroField label="Descripción" value={t} onChange={val => updateTendencia(idx, val)} />
                    </div>
                  ))}

                  <button onClick={addTendencia}
                    className="w-full border border-dashed border-white/20 text-slate-400 hover:border-orange-500/50 hover:text-orange-400 rounded-xl py-3 text-sm transition-colors">
                    + Agregar Foto
                  </button>
                </div>
              </div>

              {/* Botón único "Generar Informe PDF" */}
              <div className="flex flex-col gap-3 mt-4">
                <button onClick={retroceder}
                  className="px-5 py-2.5 border border-white/20 text-slate-400 hover:text-white hover:border-white/40 rounded-xl text-sm transition-colors self-start">
                  ← Anterior
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={abrirGenerarInforme}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-base transition-colors shadow-lg shadow-orange-900/30"
                >
                  Generar Informe PDF
                </motion.button>
                <p className="text-slate-600 text-xs text-center">
                  El borrador se guarda automáticamente en tu navegador
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ── Modal Generar Informe (Link / PDF / Cancelar) ── */}
      {showGenerarModal && (
        <GenerarInformeModal
          onLink={onElegirLink}
          onPdf={onElegirPdf}
          onCancelar={() => setShowGenerarModal(false)}
        />
      )}

      {/* ── Modal selector de plantilla ── */}
      {showPlantillaModal && plantillaCallback && (
        <PlantillaModal
          titulo="Plantilla"
          onConPlantilla={() => { setShowPlantillaModal(false); plantillaCallback(true); }}
          onSinPlantilla={() => { setShowPlantillaModal(false); plantillaCallback(false); }}
          onCancelar={() => { setShowPlantillaModal(false); setPlantillaCallback(null); }}
        />
      )}

      {/* ── Modal de link ── */}
      {showLink && (
        <LinkModal
          onClose={() => { setShowLink(false); setLinkUrl(null); setLinkGenerating(false); }}
          onGenerate={handleGenerarLinkConfirmar}
          generating={linkGenerating}
          link={linkUrl}
          progress={linkProgress}
          nombrePaciente={form.nombrePaciente}
        />
      )}
    </div>
  );
}
