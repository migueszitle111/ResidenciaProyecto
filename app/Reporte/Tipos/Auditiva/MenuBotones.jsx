'use client';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import LinkUploaderModal from '../../../components/LinkUploaderModal';
import './Style.css';

// ─── Constantes ───────────────────────────────────────────────────────────────
const STUDY_KEY    = 'Auditiva';
const STUDY_PREFIX = 'mEDXproAuditiva';

const PLANTILLAS = [
  { id: 'A',    label: 'Plantilla A',  ring: '#ffffff', dot: '#111111' },
  { id: 'B',    label: 'Plantilla B',  ring: '#f97316', dot: '#f97316' },
  { id: 'C',    label: 'Plantilla C',  ring: '#888888', dot: '#888888' },
  { id: 'none', label: 'Sin plantilla',ring: '#cccccc', dot: '#cccccc' },
];

// Contador global para pacientes sin nombre → mEDXproAuditiva_1, _2, …
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

/* ─── Modales ─────────────────────────────────────────────────────────────── */
function PlantillaModal({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4">
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
              <span style={{
                width: 64, height: 64, borderRadius: '50%',
                border: `5px solid ${p.ring}`,
                background: p.ring === '#ccc' ? '#b0b0b0' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: p.dot,
                }} />
              </span>
            </button>
          ))}
        </div>
        <button onClick={onClose}
          className="w-full border-2 border-orange-500 text-orange-500 font-bold py-3 rounded-full text-sm hover:bg-orange-500/10 transition-colors tracking-widest">
          CANCELAR
        </button>
      </div>
    </div>
  );
}

/* Modal procesando */
function ProgressModal({ progress, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4">
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

/* Modal éxito — ¡Reporte listo! con Abrir y Link */
function SuccessModal({ filename, pdfUrl, onAbrir, onLink, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center p-4">
      <div className="bg-[#111] border-2 border-orange-500 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center relative">
        <button onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl font-bold leading-none">✕</button>
        <p className="text-orange-400 font-bold text-xl mb-1">¡Reporte listo!</p>
        <p className="text-white font-semibold text-sm mb-1 break-all">{filename}</p>
        <p className="text-slate-400 text-xs mb-2">Guardado en Descargas</p>
        <div className="flex gap-3 mt-4">
          {pdfUrl && (
            <button onClick={onAbrir}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full text-sm transition-colors">
              ABRIR
            </button>
          )}
          <button onClick={onLink}
            className="flex-1 border-2 border-white/30 text-white font-bold py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
            LINK
          </button>
        </div>
      </div>
    </div>
  );
}


async function toBase64FromPath(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return path;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(path);
      reader.readAsDataURL(blob);
    });
  } catch { return path; }
}

/* ─── Barra de exportación (paso H) ─────────────────────────────────────────── */
// Convierte cualquier URL (blob:, http, data:) a base64 data URL
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

// Pre-clips image to a circle using canvas (transparent corners) for clean PDF rendering
function toCircleDataUrl(src) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const size = Math.min(img.naturalWidth, img.naturalHeight);
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath(); ctx.clip();
      const ox = (img.naturalWidth - size) / 2;
      const oy = (img.naturalHeight - size) / 2;
      ctx.drawImage(img, ox, oy, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

// Tamaño del stack PDF (debe coincidir con LAM_W/LAM_H en route.js)
const PDF_LAM_W = 690;
const PDF_LAM_H = 620;

export default function ExportBar({ nombrePaciente, textoReporte, activeOv = [], figuras = [], laminaSize = { w: 690, h: 620 }, listaVisual = [], imgLista = null, comentarioLista = '', onBack: _onBack, onReset, isOpen = false, onClose: notifyClose }) {
  const { data: session } = useSession();

  const [showPlantillaModal, setShowPlantillaModal] = useState(false);
  const [progress, setProgress]         = useState(0);
  const [processing, setProcessing]     = useState(false);
  const [pdfUrl, setPdfUrl]             = useState('');
  const [pdfBlob, setPdfBlob]           = useState(null);
  const [showSuccess, setShowSuccess]   = useState(false);
  const [showLinkUploader, setShowLinkUploader] = useState(false);
  const [filename, setFilename]         = useState('');

  // isOpen=true → abrir PlantillaModal directamente
  if (isOpen && !showPlantillaModal && !processing && !showSuccess && !showLinkUploader) {
    setShowPlantillaModal(true);
    notifyClose?.();
  }

  const buildPayload = async (plantillaId) => {
    const figurasB64 = await Promise.all(
      figuras.map(async (f) => {
        let src = f.src;
        if (src?.startsWith('blob:')) src = await toBase64DataUrl(src);
        else if (src?.startsWith('/')) src = await toBase64FromPath(src);
        if (f.tipo === 'circle' && src) src = await toCircleDataUrl(src);
        const defSz = f.tipo === 'symbol' ? 48 : 80;
        return { ...f, src, nw: f.nw ?? defSz, nh: f.nh ?? defSz, dw: f.dw ?? defSz, dh: f.dh ?? defSz };
      })
    );
    return {
      finalConclusion: textoReporte,
      activeOv,
      figuras: figurasB64,
      laminaSize: { w: laminaSize.w || 690, h: laminaSize.h || 620 },
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
      const res = await fetch('/api/pdf/generate-pdf/auditiva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setProgress(80);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      // Auto-descarga
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

  const handleAbrirPdf = () => {
    if (pdfUrl) window.open(pdfUrl, '_blank');
  };

  const handleOpenLinkUploader = () => {
    setShowSuccess(false);
    setShowLinkUploader(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    if (pdfUrl) { window.URL.revokeObjectURL(pdfUrl); setPdfUrl(''); }
    setPdfBlob(null);
    onReset?.();
  };

  const closeLinkUploader = () => {
    setShowLinkUploader(false);
    onReset?.();
  };

  return (
    <>
      {showPlantillaModal && (
        <PlantillaModal
          onSelect={handlePlantillaSelect}
          onClose={() => setShowPlantillaModal(false)}
        />
      )}
      {processing && <ProgressModal progress={progress} />}
      {showSuccess && (
        <SuccessModal
          filename={filename}
          pdfUrl={pdfUrl}
          onAbrir={handleAbrirPdf}
          onLink={handleOpenLinkUploader}
          onClose={closeSuccess}
        />
      )}
      {showLinkUploader && (
        <LinkUploaderModal
          pdfBlob={pdfBlob}
          pdfFilename={filename}
          nombrePaciente={nombrePaciente}
          session={session}
          onClose={closeLinkUploader}
          studyKey={STUDY_KEY}
          defaultTitle={nombrePaciente ? `Vías Auditivas – ${nombrePaciente}` : 'Vías Auditivas'}
          fallbackTitle={`Vías Auditivas – ${nombrePaciente || 'Paciente'}`}
        />
      )}
    </>
  );
}

