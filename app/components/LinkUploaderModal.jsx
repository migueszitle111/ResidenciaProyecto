'use client';
import { useState, useRef, useEffect } from 'react';

const BUCKET     = 'report-packages';
const SHARE_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.medxproapp.com';
const MAX_FILES  = 10;

const EXPIRY_OPTIONS = [
  { value: '15d', label: '15 días' },
  { value: '30d', label: '30 días' },
  { value: '3m',  label: '3 meses' },
];

const toSafeToken = (s) =>
  (s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\w.\-]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '')
    || `archivo_${Date.now()}`;

const isMergeableFile = (f) => {
  const t = (f.type || '').toLowerCase();
  const n = (f.name || '').toLowerCase();
  if (t === 'application/pdf' || n.endsWith('.pdf')) return true;
  if (t.startsWith('image/')) return true;
  if (/\.(png|jpg|jpeg)$/.test(n)) return true;
  return false;
};

async function mergeFilesToPdf(files) {
  const { PDFDocument } = await import('pdf-lib');
  const merged = await PDFDocument.create();

  for (const f of files) {
    const source = f.blob || f.file;
    const bytes = new Uint8Array(await source.arrayBuffer());
    const type = (f.type || '').toLowerCase();
    const name = (f.name || '').toLowerCase();

    if (type === 'application/pdf' || name.endsWith('.pdf')) {
      const src = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(src, src.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    } else {
      const isPng = type === 'image/png' || name.endsWith('.png');
      const img = isPng ? await merged.embedPng(bytes) : await merged.embedJpg(bytes);
      const page = merged.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
  }

  const pdfBytes = await merged.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

function FileRowUI({ file, onRemove, index, total, showOrder, onMoveUp, onMoveDown }) {
  const pct = Math.round((file.progress ?? 0) * 100);
  const isDone = file.status === 'done';
  const isError = file.status === 'error';
  const isUploading = file.status === 'uploading';
  const isImg = file.type?.startsWith('image/');
  const canUp = showOrder && typeof index === 'number' && index > 0;
  const canDown = showOrder && typeof index === 'number' && typeof total === 'number' && index < total - 1;

  return (
    <div className="flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] rounded-xl p-2 mb-2">
      {showOrder && (
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button
            onClick={onMoveUp}
            disabled={!canUp}
            className={`w-7 h-6 rounded-md border border-[#333] bg-[#1a1a1a] text-white text-sm font-bold flex items-center justify-center ${!canUp ? 'opacity-30' : 'hover:bg-[#222]'}`}
          >↑</button>
          <span className="text-orange-400 text-[10px] font-bold">{(index ?? 0) + 1}</span>
          <button
            onClick={onMoveDown}
            disabled={!canDown}
            className={`w-7 h-6 rounded-md border border-[#333] bg-[#1a1a1a] text-white text-sm font-bold flex items-center justify-center ${!canDown ? 'opacity-30' : 'hover:bg-[#222]'}`}
          >↓</button>
        </div>
      )}
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

export default function LinkUploaderModal({
  pdfBlob,
  pdfFilename,
  nombrePaciente,
  session,
  onClose,
  studyKey,
  defaultTitle,
  fallbackTitle,
  initialJustReport = false,
  requireUserFileWhenNotJustReport = true,
  useSlugFallback = false,
  useOverlayLoader = false,
}) {
  const [files, setFiles]           = useState([]);
  const [title, setTitle]           = useState(defaultTitle);
  const [message, setMessage]       = useState('');
  const [expiry, setExpiry]         = useState('15d');
  const [justReport, setJustReport] = useState(initialJustReport);
  const [generating, setGenerating] = useState(false);
  const [uploadPct, setUploadPct]   = useState(0);
  const [link, setLink]             = useState(null);
  const [mergeIntoOne, setMergeIntoOne] = useState(false);
  const fileInputRef = useRef(null);

  const userFiles = files.filter(f => f.id !== '__auto_report__');
  const atLimit = userFiles.length >= MAX_FILES;

  const pickFiles = () => fileInputRef.current?.click();

  const onFileInputChange = (e) => {
    const selected = Array.from(e.target.files || []);
    e.target.value = '';
    setFiles(prev => {
      const currentUserCount = prev.filter(f => f.id !== '__auto_report__').length;
      const toAdd = selected.slice(0, MAX_FILES - currentUserCount).map(f => ({
        id: `${Date.now()}_${Math.random()}`, name: f.name, file: f,
        type: f.type || 'application/octet-stream', size: f.size,
        thumbUrl: f.type?.startsWith('image/') ? URL.createObjectURL(f) : null,
        progress: 0, status: 'pending',
      }));
      return [...prev, ...toAdd];
    });
  };

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));

  const moveFile = (index, direction) => {
    setFiles(prev => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  const updateProgress = (id, pct) => {
    setFiles(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, progress: pct, status: pct >= 1 ? 'done' : 'uploading' } : f);
      const avg = updated.reduce((s, f) => s + (f.progress || 0), 0) / (updated.length || 1);
      setUploadPct(Math.round(avg * 100));
      return updated;
    });
  };

  const copyLink = () => link && navigator.clipboard.writeText(link).catch(() => {});

  // El PDF de diagnóstico auto siempre es mergeable (es PDF). Solo validamos los del usuario.
  const allUserMergeable = userFiles.length === 0 || userFiles.every(isMergeableFile);
  // Merge posible cuando hay al menos 1 archivo del usuario (auto + 1 = 2 items para unir)
  const canMerge = allUserMergeable && userFiles.length >= 1;
  const showMergeToggle = userFiles.length >= 1 && allUserMergeable;
  const effectiveMerge = mergeIntoOne && canMerge && !justReport;

  const toggleMerge = () => {
    if (!canMerge) return;
    const nextActive = !mergeIntoOne;
    setMergeIntoOne(nextActive);
    if (nextActive) {
      // Al activar merge: incluir diagnóstico como primera fila reordenable
      setFiles(prev => {
        if (prev.some(f => f.id === '__auto_report__')) return prev;
        const autoRow = {
          id: '__auto_report__',
          name: pdfFilename,
          type: 'application/pdf',
          size: pdfBlob?.size,
          thumbUrl: null,
          progress: 0,
          status: 'pending',
          blob: pdfBlob,
          isAuto: true,
        };
        return [autoRow, ...prev];
      });
    } else {
      // Al desactivar: quitar el diagnóstico de la lista (vuelve a mostrarse arriba como fila fija)
      setFiles(prev => prev.filter(f => f.id !== '__auto_report__'));
    }
  };

  // Si merge deja de ser válido (justReport ON, o el usuario quitó todos los archivos),
  // desactivarlo y sacar el diagnóstico de la lista.
  useEffect(() => {
    if (mergeIntoOne && (!canMerge || justReport)) {
      setMergeIntoOne(false);
      setFiles(prev => prev.filter(f => f.id !== '__auto_report__'));
    }
  }, [mergeIntoOne, canMerge, justReport]);

  const handleGenerate = async () => {
    setGenerating(true); setLink(null); setUploadPct(5);
    try {
      const doctor = [session?.user?.name, session?.user?.lastname].filter(Boolean).join(' ');
      const expirySeconds = expiry === '30d' ? 2592000 : expiry === '3m' ? 7776000 : 1296000;
      const finalTitle = (title.trim() || fallbackTitle).slice(0, 140);
      const finalMessage = message.trim() || '';
      const folder = toSafeToken(nombrePaciente || 'paciente');

      const initRes = await fetch('/api/share/init', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: finalTitle, message: finalMessage || undefined, expiresInSeconds: expirySeconds, studyType: studyKey, patient: nombrePaciente || null, doctor: doctor || null, doctorLogo: session?.user?.imageUrl || null }),
      });
      if (!initRes.ok) throw new Error('Error al inicializar link');
      const initData = await initRes.json();
      const { linkId } = initData;
      const slug = initData.slug;
      setUploadPct(15);

      const uploadedFiles = [];

      if (effectiveMerge) {
        // Modo unir todo: fusionar diagnóstico + archivos del usuario en un solo PDF
        // en el orden mostrado en la lista (files ya incluye el auto reordenado)
        setUploadPct(20);
        const orderedForMerge = files.map(f => f.id === '__auto_report__' ? { ...f, blob: pdfBlob } : f);
        // Nombre = primer archivo del usuario (ignora el diagnóstico auto).
        // Fallback: título del link o 'Documentos_unidos'.
        const firstUserFile = files.find(f => f.id !== '__auto_report__');
        const rawName = firstUserFile?.name || title.trim() || 'Documentos_unidos';
        const nameWithoutExt = rawName.replace(/\.[^./\\]+$/, '');
        const mergedName = nameWithoutExt.replace(/[^\w\-. ]/g, '_') + '.pdf';
        const mergedBlob = await mergeFilesToPdf(orderedForMerge);
        setUploadPct(50);

        const mergedForm = new FormData();
        mergedForm.append('file', mergedBlob, mergedName);
        mergedForm.append('folder', folder);
        mergedForm.append('bucket', BUCKET);
        const mergedUp = await fetch('/api/share/upload', { method: 'POST', body: mergedForm });
        if (!mergedUp.ok) throw new Error('Error al subir PDF unido');
        const mergedData = await mergedUp.json();
        if (!mergedData.ok) throw new Error(mergedData.error || 'Error subiendo PDF unido');
        uploadedFiles.push({ name: mergedData.name, mime_type: mergedData.mime_type, size_bytes: mergedData.size_bytes, storage_path: mergedData.path });
        setFiles(prev => prev.map(f => ({ ...f, progress: 1, status: 'done' })));
        setUploadPct(90);
      } else {
        // Modo normal: subir diagnóstico + archivos del usuario por separado
        const userFilesList = files.filter(f => f.id !== '__auto_report__');
        setFiles(() => {
          const auto = { id: '__auto_report__', name: pdfFilename, type: 'application/pdf', size: pdfBlob?.size, progress: 0.1, status: 'uploading', thumbUrl: null };
          return justReport ? [auto] : [auto, ...userFilesList.map(f => ({ ...f, status: 'pending', progress: 0.1 }))];
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
          for (let i = 0; i < userFilesList.length; i++) {
            const f = userFilesList[i];
            const form = new FormData();
            form.append('file', f.file, f.name); form.append('folder', folder); form.append('bucket', BUCKET);
            updateProgress(f.id, 0.3);
            const up = await fetch('/api/share/upload', { method: 'POST', body: form });
            if (!up.ok) throw new Error(`Error subiendo ${f.name}`);
            const upData = await up.json();
            if (!upData.ok) throw new Error(upData.error || `Error subiendo ${f.name}`);
            updateProgress(f.id, 1);
            uploadedFiles.push({ name: upData.name, mime_type: upData.mime_type, size_bytes: upData.size_bytes, storage_path: upData.path });
            setUploadPct(50 + Math.round(((i + 1) / userFilesList.length) * 40));
          }
        }
      }

      const completeRes = await fetch('/api/share/complete', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId, files: uploadedFiles }),
      });
      if (!completeRes.ok) throw new Error('Error al completar link');
      const completeData = await completeRes.json();
      setUploadPct(100);
      const fallback = useSlugFallback ? `${SHARE_BASE}/s/${slug || linkId}` : `${SHARE_BASE}/s/${linkId}`;
      setLink(completeData.url || fallback);
    } catch (e) {
      alert('Error al generar link: ' + e.message);
    } finally {
      setGenerating(false);
    }
  };

  const canGenerate = !generating && (
    requireUserFileWhenNotJustReport ? (justReport || userFiles.length > 0) : true
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
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

            {!effectiveMerge && (
              <div className="flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] rounded-xl p-2 mb-2 opacity-70">
                <div className="w-14 h-10 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-orange-400 font-bold">PDF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate">{pdfFilename}</p>
                  <p className="text-[#aaa] text-xs mt-0.5">PDF del diagnóstico · Auto</p>
                </div>
              </div>
            )}

            {!justReport && showMergeToggle && (
              <button
                onClick={toggleMerge}
                disabled={!canMerge}
                className={`w-full flex items-start gap-3 bg-[#141414] border border-[#2a2a2a] px-3 py-2.5 rounded-xl mb-2 ${!canMerge ? 'opacity-55 cursor-not-allowed' : 'hover:bg-[#171717]'}`}
              >
                <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 transition-colors ${mergeIntoOne ? 'bg-orange-500 border-orange-500 text-white' : 'border-[#666]'}`}>{mergeIntoOne ? '✓' : ''}</span>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-semibold">Unir en un solo PDF</p>
                  <p className="text-[#999] text-[11px] mt-0.5">
                    {!canMerge
                      ? 'Agrega al menos 1 archivo para unirlo con el diagnóstico.'
                      : mergeIntoOne
                        ? 'Ordena con las flechas ↑ ↓ (incluye el diagnóstico). Se enviará un único PDF.'
                        : 'Combina el diagnóstico con tus archivos en un solo PDF.'}
                  </p>
                </div>
              </button>
            )}
            {!justReport && !allUserMergeable && userFiles.length >= 1 && (
              <p className="text-[#c88] text-[11px] text-center italic mb-2">
                La unión sólo está disponible con PDFs e imágenes.
              </p>
            )}

            {files.length > 0
              ? files.map((f, idx) => (
                  <FileRowUI
                    key={f.id}
                    file={f}
                    index={idx}
                    total={files.length}
                    showOrder={effectiveMerge && !generating}
                    onMoveUp={() => moveFile(idx, -1)}
                    onMoveDown={() => moveFile(idx, 1)}
                    onRemove={!generating && !f.isAuto ? () => removeFile(f.id) : null}
                  />
                ))
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
            {generating && !useOverlayLoader && (
              <div className="w-full">
                <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                  <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${uploadPct}%` }} />
                </div>
                <p className="text-slate-400 text-xs text-center">{uploadPct}%</p>
              </div>
            )}
            {link && !useOverlayLoader && (
              <div className="w-full space-y-2">
                <p className="text-green-400 text-xs font-bold text-center">¡Link generado!</p>
                <div className="flex gap-2">
                  <input readOnly value={link} className="flex-1 bg-[#1a1a1a] border border-[#333] text-white text-xs rounded-xl px-3 py-2.5 outline-none min-w-0" />
                  <button onClick={copyLink} className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0">Copiar</button>
                </div>
              </div>
            )}
            {link && useOverlayLoader && (
              <div className="w-full bg-[#141414] border border-[#333] rounded-xl p-3 space-y-2">
                <p className="text-[#bbb] text-xs">Link generado</p>
                <div className="bg-[#1b1b1b] border border-[#333] rounded-lg px-3 py-2">
                  <p className="text-white text-xs break-all">{link}</p>
                </div>
                <button onClick={copyLink} className="w-full py-2 border border-[#333] bg-[#161616] text-white text-xs font-bold rounded-lg hover:bg-[#222] transition-colors">
                  Copiar link
                </button>
              </div>
            )}
          </div>
        </div>

        {useOverlayLoader && generating && (
          <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
            <div className="bg-[#111] border border-[#333] rounded-xl px-6 py-5 flex flex-col items-center gap-3 w-52">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white font-bold text-sm">Generando link…</p>
              <p className="text-[#bbb] text-xs">No cierres esta pantalla</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${uploadPct}%` }} />
              </div>
              <p className="text-white text-xs font-bold">{uploadPct}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
