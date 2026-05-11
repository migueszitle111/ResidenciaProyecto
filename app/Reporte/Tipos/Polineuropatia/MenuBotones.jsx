'use client';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import './Style.css';

const STUDY_KEY    = 'Polineuropatia';
const STUDY_PREFIX = `mEDXpro${STUDY_KEY}`;
const BUCKET       = 'report-packages';
const SHARE_BASE   = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medxproapp.com';

const PLANTILLAS = [
  { id: 'A',    label: 'Plantilla A',  ring: '#ffffff', dot: '#111111' },
  { id: 'B',    label: 'Plantilla B',  ring: '#f97316', dot: '#f97316' },
  { id: 'C',    label: 'Plantilla C',  ring: '#888888', dot: '#888888' },
  { id: 'none', label: 'Sin plantilla',ring: '#cccccc', dot: '#cccccc' },
];

let _unnamedCounter = 0;

const toSafeToken = (s) =>
  (s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\w.\-]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '')
    || `archivo_${Date.now()}`;

const buildBaseName = (paciente) => {
  if (paciente && paciente.trim()) return `${STUDY_PREFIX}_${toSafeToken(paciente.trim())}`;
  _unnamedCounter += 1;
  return `${STUDY_PREFIX}_${_unnamedCounter}`;
};

function PlantillaModal({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border-2 border-orange-500 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-xl">Elige una plantilla</h3>
          <button onClick={onClose} className="text-white text-2xl font-bold leading-none">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {PLANTILLAS.map(p => (
            <button key={p.id} onClick={() => onSelect(p.id)}
              className="flex flex-col items-center justify-between gap-4 bg-[#0d0d0d] rounded-2xl py-5 px-3 hover:bg-[#1a1a1a] transition-all border border-white/5">
              <span className="text-white font-bold text-sm">{p.label}</span>
              <span style={{ width:64, height:64, borderRadius:'50%', border:`5px solid ${p.ring}`, background: p.ring==='#ccc'?'#b0b0b0':'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ width:36, height:36, borderRadius:'50%', background: p.dot }} />
              </span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full border-2 border-orange-500 text-orange-500 font-bold py-3 rounded-full text-sm hover:bg-orange-500/10 transition-colors tracking-widest">
          CANCELAR
        </button>
      </div>
    </div>
  );
}

function ProgressModal({ progress, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-xs p-6 shadow-2xl text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white font-semibold mb-2">Procesando…</p>
        <div className="w-full bg-white/10 rounded-full h-2 mb-1">
          <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-slate-400 text-xs">{progress}%</p>
      </div>
    </div>
  );
}

function SuccessModal({ filename, pdfUrl, onAbrir, onLink, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border-2 border-orange-500 rounded-2xl w-full max-w-xs p-6 shadow-2xl text-center relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-white text-xl font-bold leading-none">✕</button>
        <p className="text-orange-400 font-bold text-xl mb-1">¡Reporte listo!</p>
        <p className="text-white font-semibold text-sm mb-1">{filename}</p>
        <p className="text-slate-400 text-xs mb-2">Guardado en Descargas</p>
        <div className="flex gap-3 mt-4">
          {pdfUrl && (
            <button onClick={onAbrir} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full text-sm transition-colors">
              ABRIR
            </button>
          )}
          <button onClick={onLink} className="flex-1 border-2 border-white/30 text-white font-bold py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
            LINK
          </button>
        </div>
      </div>
    </div>
  );
}

const EXPIRY_OPTIONS = [
  { value: '3m',  label: '3 meses' },
  { value: '30d', label: '30 días' },
  { value: '3m',  label: '3 meses' },
];

function FileRowUI({ file, onRemove }) {
  const pct = Math.round((file.progress ?? 0) * 100);
  const isDone = file.status === 'done';
  const isError = file.status === 'error';
  const isUploading = file.status === 'uploading';
  const isImg = file.type?.startsWith('image/');
  return (
    <div className="flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] rounded-xl p-2 mb-2">
      <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
        {isImg && file.thumbUrl ? <img src={file.thumbUrl} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] text-[#999]">FILE</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-bold truncate">{file.name}</p>
        <p className="text-[#aaa] text-xs mt-0.5">
          {file.size ? (file.size > 1048576 ? `${(file.size/1048576).toFixed(1)} MB` : `${Math.round(file.size/1024)} KB`) : '—'}
          {' · '}
          {isDone ? 'Completado' : isError ? 'Error' : isUploading ? `Subiendo ${pct}%` : 'Pendiente'}
        </p>
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
          <div className="bg-orange-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      {onRemove && (
        <button onClick={onRemove} className="text-xs text-white border border-[#333] bg-[#1a1a1a] px-2.5 py-1.5 rounded-lg shrink-0">Quitar</button>
      )}
    </div>
  );
}

function LinkUploaderModal({ pdfBlob, pdfFilename, nombrePaciente, session, onClose }) {
  const [files, setFiles]       = useState([]);
  const [title, setTitle]       = useState(`Polineuropatía – ${[session?.user?.name, session?.user?.lastname].filter(Boolean).join(' ')}`.trim());
  const [message, setMessage]   = useState('');
  const [expiry, setExpiry]     = useState('15d');
  const [justReport, setJustReport] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploadPct, setUploadPct]   = useState(0);
  const [link, setLink]             = useState(null);
  const fileInputRef = useRef(null);
  const MAX_FILES = 4;
  const atLimit = files.length >= MAX_FILES;

  const pickFiles = () => fileInputRef.current?.click();
  const onFileInputChange = (e) => {
    const selected = Array.from(e.target.files || []);
    e.target.value = '';
    const toAdd = selected.slice(0, MAX_FILES - files.length).map(f => ({
      id: `${Date.now()}_${Math.random()}`, name: f.name, file: f,
      type: f.type || 'application/octet-stream', size: f.size,
      thumbUrl: f.type?.startsWith('image/') ? URL.createObjectURL(f) : null,
      progress: 0, status: 'pending',
    }));
    setFiles(prev => [...prev, ...toAdd].slice(0, MAX_FILES));
  };
  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));
  const updateProgress = (id, pct) => {
    setFiles(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, progress: pct, status: pct >= 1 ? 'done' : 'uploading' } : f);
      const avg = updated.reduce((s, f) => s + (f.progress || 0), 0) / (updated.length || 1);
      setUploadPct(Math.round(avg * 100));
      return updated;
    });
  };
  const copyLink = () => link && navigator.clipboard.writeText(link).catch(() => {});

  const handleGenerate = async () => {
    setGenerating(true); setLink(null); setUploadPct(5);
    try {
      const doctor = [session?.user?.name, session?.user?.lastname].filter(Boolean).join(' ');
      const expirySeconds = expiry === '30d' ? 2592000 : expiry === '3m' ? 7776000 : 1296000;
      const finalTitle = (title.trim() || `Polineuropatía – ${nombrePaciente || 'Paciente'}`).slice(0, 140);
      const finalMessage = message.trim() || '';
      const folder = toSafeToken(nombrePaciente || 'paciente');
      const initRes = await fetch('/api/share/init', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: finalTitle, message: finalMessage || undefined, expiresInSeconds: expirySeconds, studyType: STUDY_KEY, patient: nombrePaciente || null, doctor: doctor || null, doctorLogo: session?.user?.imageUrl || null }),
      });
      if (!initRes.ok) throw new Error('Error al inicializar link');
      const { linkId } = await initRes.json();
      setUploadPct(15);
      const uploadedFiles = [];
      setFiles(prev => {
        const auto = { id: '__auto_report__', name: pdfFilename, type: 'application/pdf', size: pdfBlob?.size, progress: 0.1, status: 'uploading', thumbUrl: null };
        return justReport ? [auto] : [auto, ...prev.map(f => ({ ...f, status: 'pending', progress: 0.1 }))];
      });
      setUploadPct(20);
      const pdfForm = new FormData();
      pdfForm.append('file', pdfBlob, pdfFilename);
      pdfForm.append('folder', folder);
      pdfForm.append('bucket', BUCKET);
      const pdfUp = await fetch('/api/share/upload', { method: 'POST', body: pdfForm });
      if (!pdfUp.ok) throw new Error('Error al subir PDF');
      const pdfData = await pdfUp.json();
      if (!pdfData.ok) throw new Error(pdfData.error || 'Error subiendo PDF');
      updateProgress('__auto_report__', 1);
      uploadedFiles.push({ name: pdfData.name, mime_type: pdfData.mime_type, size_bytes: pdfData.size_bytes, storage_path: pdfData.path });
      setUploadPct(50);
      if (!justReport) {
        const userFiles = files.filter(f => f.id !== '__auto_report__');
        for (let i = 0; i < userFiles.length; i++) {
          const f = userFiles[i];
          const form = new FormData();
          form.append('file', f.file, f.name); form.append('folder', folder); form.append('bucket', BUCKET);
          updateProgress(f.id, 0.3);
          const up = await fetch('/api/share/upload', { method: 'POST', body: form });
          if (!up.ok) throw new Error(`Error subiendo ${f.name}`);
          const upData = await up.json();
          if (!upData.ok) throw new Error(upData.error || `Error subiendo ${f.name}`);
          updateProgress(f.id, 1);
          uploadedFiles.push({ name: upData.name, mime_type: upData.mime_type, size_bytes: upData.size_bytes, storage_path: upData.path });
          setUploadPct(50 + Math.round(((i + 1) / userFiles.length) * 40));
        }
      }
      const completeRes = await fetch('/api/share/complete', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId, files: uploadedFiles }),
      });
      if (!completeRes.ok) throw new Error('Error al completar link');
      const completeData = await completeRes.json();
      setUploadPct(100);
      setLink(completeData.url || `${SHARE_BASE}/s/${linkId}`);
    } catch (e) {
      alert('Error al generar link: ' + e.message);
    } finally {
      setGenerating(false);
    }
  };

  const canGenerate = !generating && (justReport || files.length > 0);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111] border border-[#333] rounded-2xl w-full max-w-sm shadow-2xl relative my-auto">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#222]">
          <div>
            <p className="text-orange-400 font-bold text-lg">Generar link</p>
            <p className="text-[#bbb] text-xs mt-0.5">Comparte el diagnóstico de forma segura</p>
          </div>
          <button onClick={onClose} className="text-white text-2xl font-bold leading-none ml-3">✕</button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <button onClick={() => setJustReport(v => !v)} className="w-full flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] px-4 py-2.5 rounded-full">
            <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${justReport ? 'bg-orange-500 border-orange-500 text-white' : 'border-[#666]'}`}>{justReport ? '✓' : ''}</span>
            <span className="text-white text-sm font-semibold">Enviar sólo el PDF del diagnóstico</span>
          </button>
          <div className="border-t border-[#222] pt-4">
            <p className="text-white font-bold text-sm mb-3 text-center">Selecciona archivos</p>
            <div style={{ opacity: justReport ? 0.4 : 1, pointerEvents: justReport ? 'none' : 'auto' }}>
              <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt,.csv" className="hidden" onChange={onFileInputChange} />
              <button onClick={pickFiles} disabled={atLimit} className={`w-full border border-dashed border-[#444] rounded-2xl py-5 flex flex-col items-center gap-2 bg-[#151515] hover:bg-[#1a1a1a] transition-colors ${atLimit ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[#222] border border-[#333] flex items-center justify-center">
                  <span className="text-white text-2xl font-bold leading-none">+</span>
                </div>
                <span className="text-white text-sm font-bold">Toca para elegir</span>
                <span className="text-[#999] text-xs">Imágenes · Archivos {atLimit ? '(límite alcanzado)' : ''}</span>
              </button>
            </div>
          </div>
          <div className="border-t border-[#222] pt-4">
            <p className="text-white font-bold text-sm mb-3 text-center">Archivos a subir</p>
            <div className="flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] rounded-xl p-2 mb-2 opacity-70">
              <div className="w-14 h-10 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
                <span className="text-[10px] text-orange-400 font-bold">PDF</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{pdfFilename}</p>
                <p className="text-[#aaa] text-xs mt-0.5">PDF del diagnóstico · Auto</p>
              </div>
            </div>
            {files.length > 0
              ? files.map(f => <FileRowUI key={f.id} file={f} onRemove={!generating ? () => removeFile(f.id) : null} />)
              : <p className="text-[#bbb] text-xs text-center py-1">{justReport ? 'Se enviará únicamente el PDF.' : 'Sin archivos adicionales'}</p>
            }
          </div>
          <div className="border-t border-[#222] pt-4 space-y-3">
            <p className="text-white font-bold text-sm text-center">Opciones del link</p>
            <div>
              <p className="text-[#bbb] text-xs mb-1.5">Título</p>
              <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#222] border border-[#444] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-orange-500" />
            </div>
            <div>
              <p className="text-[#bbb] text-xs mb-1.5">Mensaje (opcional)</p>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Saludos..." className="w-full bg-[#222] border border-[#444] text-white text-sm rounded-xl px-3 py-2.5 outline-none focus:border-orange-500 resize-none placeholder:text-[#666]" />
            </div>
            <div>
              <p className="text-[#bbb] text-xs mb-2">Caducidad</p>
              <div className="flex gap-2">
                {EXPIRY_OPTIONS.map(o => (
                  <button key={o.value} onClick={() => setExpiry(o.value)} className={`flex-1 py-2 rounded-full text-xs font-bold border transition-colors ${expiry === o.value ? 'bg-[#272015] border-orange-400 text-orange-300' : 'bg-[#1b1b1b] border-[#333] text-[#ddd]'}`}>{o.label}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#222] pt-4 flex flex-col items-center gap-4">
            <button onClick={handleGenerate} disabled={!canGenerate} className={`w-full py-3 rounded-xl font-bold text-white text-sm bg-orange-500 hover:bg-orange-600 transition-colors ${!canGenerate ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {generating ? 'Generando…' : 'Generar link'}
            </button>
            {generating && (
              <div className="w-full">
                <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                  <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${uploadPct}%` }} />
                </div>
                <p className="text-slate-400 text-xs text-center">{uploadPct}%</p>
              </div>
            )}
            {link && (
              <div className="w-full space-y-2">
                <p className="text-green-400 text-xs font-bold text-center">¡Link generado!</p>
                <div className="flex gap-2">
                  <input readOnly value={link} className="flex-1 bg-[#1a1a1a] border border-[#333] text-white text-xs rounded-xl px-3 py-2.5 outline-none min-w-0" />
                  <button onClick={copyLink} className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0">Copiar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── helpers para el nuevo ExportBar ──────────────────────────────────────── */
async function toBase64DataUrl(src) {
  if (!src) return null;
  if (src.startsWith('data:')) return src;
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch { return null; }
}

function toCircleDataUrl(src) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const size = Math.min(img.naturalWidth, img.naturalHeight);
      const canvas = document.createElement('canvas');
      canvas.width  = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      const ox = (img.naturalWidth  - size) / 2;
      const oy = (img.naturalHeight - size) / 2;
      ctx.drawImage(img, ox, oy, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

const PDF_LAM_W = 690;
const PDF_LAM_H = 620;

export default function ExportBar({ nombrePaciente, textoReporte, activeOv = [], figuras = [], laminaSize = { w: 690, h: 620 }, listaVisual = [], imgLista = null, comentarioLista = '', onBack: _onBack, onReset: _onReset, isOpen = false, onClose: notifyClose }) {
  const { data: session } = useSession();

  const [showPlantillaModal, setShowPlantillaModal] = useState(false);
  const [progress, setProgress]         = useState(0);
  const [processing, setProcessing]     = useState(false);
  const [pdfUrl, setPdfUrl]             = useState('');
  const [pdfBlob, setPdfBlob]           = useState(null);
  const [showSuccess, setShowSuccess]   = useState(false);
  const [showLinkUploader, setShowLinkUploader] = useState(false);
  const [filename, setFilename]         = useState('');

  if (isOpen && !showPlantillaModal && !processing && !showSuccess && !showLinkUploader) {
    setShowPlantillaModal(true);
    notifyClose?.();
  }

  const buildPayload = async (plantillaId) => {
    const scaleX = PDF_LAM_W / (laminaSize.w || PDF_LAM_W);
    const scaleY = PDF_LAM_H / (laminaSize.h || PDF_LAM_H);
    const figurasB64 = await Promise.all(
      figuras.map(async (f) => {
        let src = f.src?.startsWith('blob:') ? await toBase64DataUrl(f.src) : f.src;
        if (f.tipo === 'circle' && src) src = await toCircleDataUrl(src);
        return { ...f, src, x: Math.round(f.x * scaleX), y: Math.round(f.y * scaleY) };
      })
    );
    return {
      finalConclusion: textoReporte,
      activeOv,
      figuras: figurasB64,
      listaVisual,
      imgListaUrl: imgLista?.src || null,
      comentarioLista,
      plantillaId,
      userData: {
        name:         session?.user?.name,
        lastname:     session?.user?.lastname,
        email:        session?.user?.email,
        cedula:       session?.user?.idprofessional,
        especialidad: session?.user?.specialty,
        imageUrl:     session?.user?.imageUrl,
      },
      topLeftText: nombrePaciente || '',
    };
  };

  const handlePlantillaSelect = async (id) => {
    setShowPlantillaModal(false);
    setProcessing(true); setProgress(10);
    try {
      const nombre = buildBaseName(nombrePaciente);
      const payload = await buildPayload(id);
      setProgress(40);
      const res = await fetch('/api/pdf/generate-pdf/polineuropatia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setProgress(80);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${nombre}.pdf`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setProgress(100);
      setProcessing(false);
      setPdfBlob(blob);
      setPdfUrl(url);
      setFilename(`${nombre}.pdf`);
      setShowSuccess(true);
    } catch (e) {
      alert('Error al exportar PDF: ' + e.message);
      setProcessing(false);
    }
  };

  const handleAbrirPdf = () => { if (pdfUrl) window.open(pdfUrl, '_blank'); };
  const handleOpenLinkUploader = () => { setShowSuccess(false); setShowLinkUploader(true); };
  const closeSuccess = () => { setShowSuccess(false); if (pdfUrl) { window.URL.revokeObjectURL(pdfUrl); setPdfUrl(''); } setPdfBlob(null); };
  const closeLinkUploader = () => setShowLinkUploader(false);

  return (
    <>
      {showPlantillaModal && <PlantillaModal onSelect={handlePlantillaSelect} onClose={() => setShowPlantillaModal(false)} />}
      {processing && <ProgressModal progress={progress} />}
      {showSuccess && <SuccessModal filename={filename} pdfUrl={pdfUrl} onAbrir={handleAbrirPdf} onLink={handleOpenLinkUploader} onClose={closeSuccess} />}
      {showLinkUploader && <LinkUploaderModal pdfBlob={pdfBlob} pdfFilename={filename} nombrePaciente={nombrePaciente} session={session} onClose={closeLinkUploader} />}
    </>
  );
}
