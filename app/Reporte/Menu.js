"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";

const BUCKET = "reportesnormales-packages";
const MAX_FILES = 10;

const formatSize = (n) => {
  if (!n || n <= 0) return "—";
  const mb = n / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
};

function FileRow({ file, onRemove }) {
  const pct = Math.round((file.progress ?? 0) * 100);
  const isDone = file.status === "done";
  const isError = file.status === "error";
  const statusLabel = isDone
    ? "Completado"
    : isError
    ? "Error"
    : file.status === "uploading"
    ? `Subiendo ${pct}%`
    : "Pendiente";

  return (
    <div className="flex items-center gap-3 bg-[#141414] border border-white/10 rounded-xl px-3 py-2 mb-2">
      <div className="w-10 h-8 rounded-md bg-[#222] border border-white/10 flex items-center justify-center shrink-0">
        <span className="text-[9px] text-slate-400 font-bold">
          {file.name.split(".").pop()?.toUpperCase().slice(0, 4) || "FILE"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold truncate">{file.name}</p>
        <p className="text-slate-400 text-[10px] mt-0.5">
          {formatSize(file.size)} · {statusLabel}
        </p>
        <div className="mt-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-xs text-slate-400 hover:text-white border border-white/10 px-2 py-1 rounded-lg shrink-0 transition-colors"
        >
          Quitar
        </button>
      )}
    </div>
  );
}

function ReportesNormalesModal({ onClose, session }) {
  const [patientName, setPatientName] = useState("");
  const [studyType, setStudyType] = useState("");
  const [files, setFiles] = useState([]);
  const [expiry, setExpiry] = useState("15d");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef();

  const atLimit = files.length >= MAX_FILES;

  const handlePickFiles = (e) => {
    const picked = Array.from(e.target.files).map((f) => ({
      id: `${Date.now()}_${Math.random()}_${f.name}`,
      name: f.name,
      file: f,
      size: f.size,
      type: f.type || "application/octet-stream",
      progress: 0,
      status: "pending",
    }));
    setFiles((prev) => {
      const free = Math.max(0, MAX_FILES - prev.length);
      return [...prev, ...picked.slice(0, free)];
    });
    e.target.value = "";
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const updateProgress = (id, p) => {
    setFiles((prev) => {
      const updated = prev.map((f) =>
        f.id === id ? { ...f, progress: p, status: "uploading" } : f
      );
      const avg =
        updated.reduce((s, f) => s + (f.progress ?? 0), 0) / updated.length;
      setOverallProgress(Math.round(avg * 100));
      return updated;
    });
  };

  const markDone = (id) =>
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, progress: 1, status: "done" } : f))
    );

  const markError = (id) =>
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "error" } : f))
    );

  const handleGenerate = async () => {
    if (files.length === 0) {
      setError("Selecciona al menos un archivo.");
      return;
    }
    setError(null);
    setGenerating(true);
    setOverallProgress(5);

    try {
      const doctorName = [session?.user?.name, session?.user?.lastname]
        .filter(Boolean)
        .join(" ");
      const expSeconds =
        expiry === "30d" ? 2592000 : expiry === "3m" ? 7776000 : 1296000;
      const finalTitle = (
        title.trim() ||
        `Reporte Normal${patientName ? ` – ${patientName}` : ""}`
      ).slice(0, 140);
      const finalStudyType = studyType.trim() || null;

      // 1) Init
      const initRes = await fetch("/api/share/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: finalTitle,
          message: message.trim() || "Archivos compartidos desde MEDXpro",
          expiresInSeconds: expSeconds,
          patient: patientName.trim() || null,
          doctor: doctorName || null,
          studyType: finalStudyType,
          doctorLogo: session?.user?.imageUrl || null,
          meta: {
            patient: patientName.trim() || null,
            doctor: doctorName || null,
            study: finalStudyType,
            studyType: finalStudyType,
            doctorLogo: session?.user?.imageUrl || null,
            source: "MenuReporte",
          },
        }),
      });
      const initData = await initRes.json();
      if (!initData.ok) throw new Error(initData.error || "Error iniciando link");
      const { linkId } = initData;

      setOverallProgress(10);

      // Marcar todos como uploading
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: "uploading", progress: 0.05 }))
      );

      // 2) Subir archivos uno a uno con progreso individual
      const uploadedFiles = [];
      for (const f of files) {
        updateProgress(f.id, 0.1);
        const fd = new FormData();
        fd.append("file", f.file);
        fd.append("folder", "reportes-normales");
        fd.append("bucket", BUCKET);
        updateProgress(f.id, 0.5);
        const upRes = await fetch("/api/share/upload", {
          method: "POST",
          body: fd,
        });
        const upData = await upRes.json();
        if (!upData.ok) {
          markError(f.id);
          throw new Error(upData.error || `Error subiendo ${f.name}`);
        }
        markDone(f.id);
        uploadedFiles.push({
          name: upData.name,
          mime_type: upData.mime_type,
          size_bytes: upData.size_bytes,
          storage_path: upData.path,
        });
      }

      setOverallProgress(90);

      // 3) Complete
      const doneRes = await fetch("/api/share/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId, files: uploadedFiles }),
      });
      const doneData = await doneRes.json();
      if (!doneData.ok) throw new Error(doneData.error || "Error completando link");

      setOverallProgress(100);
      setLink(doneData.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: link, title: "Reporte MEDXpro" }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const expiryOpts = [
    { v: "15d", l: "15 días" },
    { v: "30d", l: "30 días" },
    { v: "3m", l: "3 meses" },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 bg-[#0a0a0a] rounded-t-2xl shrink-0">
          <div>
            <h2 className="text-orange-400 font-bold text-lg">Reportes Normales</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Selecciona archivos para generar un link de descarga seguro
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 text-white flex items-center justify-center hover:bg-[#2a2a2a] transition-colors text-base font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">

          {/* Link generado */}
          {link ? (
            <div className="flex flex-col gap-3 pt-2">
              <p className="text-green-400 text-sm font-bold text-center">✓ Link generado exitosamente</p>
              <div className="bg-[#1b1b1b] border border-white/10 rounded-xl px-3 py-2">
                <p className="text-slate-400 text-[10px] mb-1">Link generado</p>
                <p className="text-orange-400 text-xs break-all">{link}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-[#161616] border border-white/20 hover:border-white/40 text-white text-sm py-2.5 rounded-xl transition-colors font-semibold"
                >
                  {copied ? "✓ Copiado" : "Copiar"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 bg-[#161616] border border-white/20 hover:border-white/40 text-white text-sm py-2.5 rounded-xl transition-colors font-semibold"
                >
                  Compartir
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-full border border-white/10 text-slate-400 text-sm py-2.5 rounded-xl hover:text-white transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              {/* Nombre del paciente */}
              <div className="border-t border-white/10 pt-4">
                <label className="text-slate-400 text-xs mb-1 block">
                  Nombre del Paciente
                </label>
                <input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ingresa el nombre del paciente"
                  className="w-full bg-[#222] text-white text-sm rounded-xl px-3 py-2.5 border border-white/10 focus:border-orange-500 focus:outline-none placeholder-slate-600"
                />
              </div>

              {/* Selección de archivos */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white text-sm font-bold text-center mb-3">
                  Selecciona archivos
                </p>

                {/* Dropzone */}
                <button
                  onClick={() => !atLimit && fileRef.current.click()}
                  disabled={atLimit}
                  className={`w-full border border-dashed rounded-xl py-5 flex flex-col items-center gap-2 transition-colors mb-3 ${
                    atLimit
                      ? "border-white/10 opacity-50 cursor-not-allowed"
                      : "border-white/20 hover:border-orange-500/50 hover:bg-[#161616] cursor-pointer"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#222] border border-white/10 flex items-center justify-center">
                    <span className="text-white text-xl font-bold leading-none">+</span>
                  </div>
                  <span className="text-white text-sm font-bold">Toca para elegir</span>
                  <span className="text-slate-400 text-xs">
                    Galería · Archivos {atLimit ? "(límite alcanzado)" : ""}
                  </span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/csv,application/octet-stream"
                  className="hidden"
                  onChange={handlePickFiles}
                />
              </div>

              {/* Lista de archivos */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white text-sm font-bold text-center mb-3">
                  Archivos a subir
                </p>
                {files.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center">
                    Selecciona archivos para compartir
                  </p>
                ) : (
                  files.map((f) => (
                    <FileRow
                      key={f.id}
                      file={f}
                      onRemove={generating ? null : () => removeFile(f.id)}
                    />
                  ))
                )}
              </div>

              {/* Tipo de estudio */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white text-sm font-bold text-center mb-3">
                  Tipo de estudio
                </p>
                <input
                  value={studyType}
                  onChange={(e) => setStudyType(e.target.value)}
                  placeholder="Ej. Electroneuromiografía, Potenciales Evocados..."
                  className="w-full bg-[#222] text-white text-sm rounded-xl px-3 py-2.5 border border-white/10 focus:border-orange-500 focus:outline-none placeholder-slate-600"
                />
              </div>

              {/* Opciones del link */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white text-sm font-bold text-center mb-3">
                  Opciones del link
                </p>

                <div className="mb-3">
                  <label className="text-slate-400 text-xs mb-1 block">Título</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título del link de descarga"
                    className="w-full bg-[#222] text-white text-sm rounded-xl px-3 py-2.5 border border-white/10 focus:border-orange-500 focus:outline-none placeholder-slate-600"
                  />
                </div>

                <div className="mb-3">
                  <label className="text-slate-400 text-xs mb-1 block">Mensaje (opcional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Saludos..."
                    rows={2}
                    className="w-full bg-[#222] text-white text-sm rounded-xl px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none resize-none placeholder-slate-600"
                  />
                </div>

                <label className="text-slate-400 text-xs mb-2 block">Caducidad</label>
                <div className="flex gap-2">
                  {expiryOpts.map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setExpiry(o.v)}
                      className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors border ${
                        expiry === o.v
                          ? "bg-[#272015] border-orange-500 text-orange-300"
                          : "bg-[#1b1b1b] border-white/10 text-slate-300 hover:border-orange-500/40"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Botón generar */}
              <div className="border-t border-white/10 pt-4 pb-1">
                <button
                  onClick={handleGenerate}
                  disabled={generating || files.length === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  {generating ? `Generando… ${overallProgress}%` : "Generar link"}
                </button>

                {/* Barra de progreso general durante generación */}
                {generating && (
                  <div className="mt-3 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#222] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      />
                    </div>
                    <p className="text-slate-400 text-xs">No cierres esta ventana</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Perfil() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="Conteiner">
      {/*Menú 1 */}
      <div className="lg:w-2/3 bg-orange-500 md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
        <div className="flex flex-wrap">
          <div className="Description w-full md:w-1/2">
            {/*Titulo */}
            <h2 className="title text-3xl font-semibold text-white mb-4">
              Sistema Nervioso
            </h2>
            <hr className="bg-white h-0.5" />
            {/*Grid of buttons*/}
            <div className="grid rid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <a href="./Reporte/Tipos/Neuronopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Neuronopatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Radiculopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Radiculopatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Plexopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Plexopatía
                </button>
              </a>
               <a href="./Reporte/Tipos/Neuropatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Neuropatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Polineuropatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Polineuropatía
                </button>
              </a>
              <a href="./Reporte/Tipos/Union_Neuromuscular">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Unión Neuromuscular
                </button>
              </a>
              <a href="./Reporte/Tipos/Miopatia">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Miopatía
                </button>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <Image
              src="/mEDX_128_SNP.svg"
              alt="Radiolopatia"
              width={250}
              height={300}
              className="rounded-tr-lg rounded-bl-lg grayscale mt-6"
            />
          </div>
        </div>
      </div>

      {/*Menú 2 */}
      <div className="lg:w-2/3 bg-[#5F5F5F] md:p-10 flex flex-col mx-auto m-5 rounded-tr-3xl rounded-bl-3xl p-5">
        <div className="flex flex-wrap">
          <div className="Description w-full md:w-1/2">
            <h2 className="title text-3xl font-semibold text-white mb-4">
              Vías Neurológicas
            </h2>
            <hr className="bg-white h-0.5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <a href="./Reporte/Tipos/Visual">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Visual
                </button>
              </a>
              <a href="./Reporte/Tipos/Auditiva">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Auditiva
                </button>
              </a>
              <a href="./Reporte/Tipos/Somatosensorial">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Somatosensorial
                </button>
              </a>
              <a href="./Reporte/Tipos/Motores">
                <button className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-xs overflow-hidden">
                  Motora Corticoespinal
                </button>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <Image
              src="/mEDX_128_VN.svg"
              alt="Radiolopatia"
              width={250}
              height={300}
              className="rounded-tr-lg rounded-bl-lg grayscale mx-2 mt-6"
            />
          </div>
        </div>
      </div>

      {/* Botón "..." — Reportes Normales */}
      <div className="lg:w-2/3 mx-auto flex justify-end px-5 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-3 rounded-lg border border-white/20 hover:border-orange-500/60 hover:bg-[#111] transition-colors text-sm font-semibold tracking-widest"
        >
          •••
        </button>
      </div>

      {showModal && (
        <ReportesNormalesModal
          onClose={() => setShowModal(false)}
          session={session}
        />
      )}
    </div>
  );
}
