"use client";
/*
 * ENMG/ReportFace.jsx
 * Reporte genérico de Electroneuromiografía — formulario por pasos
 * (mismo estilo que Monitoreo/components/FormularioReporte.js).
 */

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { SuggestInput, SuggestTextarea } from "../../../Monitoreo/components/SuggestField";
import LinkUploaderModal from "../../../components/LinkUploaderModal";
import { buildEnmgPdf, nombreArchivoEnmg, RECURSOS_ENMG, DESCRIPCION_ESTANDAR, tituloConclusion, crearRevisorEnmg } from "./pdfENMG.mjs";
// Fuentes (/fonts del frontend) e imágenes del formato (backend, laminasImg/ENMGImg) para el PDF.
// Se guardan en memoria: una vez descargadas, generar el PDF ya no depende del servidor.
// Más reintentos porque el backend (Render) puede tardar en despertar.
const cacheRecursos = new Map();
const cargarRecurso = async (ruta) => {
  if (cacheRecursos.has(ruta)) return cacheRecursos.get(ruta);
  for (let intento = 0; intento < 5; intento++) {
    try {
      const r = await fetch(ruta, { cache: "force-cache" });
      if (r.ok) {
        const bytes = new Uint8Array(await r.arrayBuffer());
        cacheRecursos.set(ruta, bytes);
        return bytes;
      }
    } catch {
      // red caída o servidor reiniciando: reintenta
    }
    await new Promise((res) => setTimeout(res, 1000 * (intento + 1)));
  }
  return null;
};
const precargarRecursos = () => Promise.all(RECURSOS_ENMG.map(cargarRecurso));

/* ─── Límite de texto según la plantilla del PDF ────────────────────────────────
 * El revisor (crearRevisorEnmg) mide el texto con las mismas fuentes y reglas del PDF.
 * Un cambio se acepta solo si ningún campo queda más fuera de su espacio que antes;
 * así se bloquea seguir escribiendo, pero siempre se puede borrar. */

const excesosNuevos = (antes, despues) =>
  Object.entries(despues).filter(([k, v]) => v.exceso > (antes[k]?.exceso ?? 0) + 0.01);

// Textos que cambiaron entre dos valores (ruta dentro del objeto). Si cambió algo que no es texto, lo marca.
function cambiosDeTexto(a, b, ruta = [], out = []) {
  if (a === b) return out;
  if (typeof a === "string" && typeof b === "string") { out.push({ ruta, antes: a, despues: b }); return out; }
  if (a && b && typeof a === "object" && typeof b === "object" && Array.isArray(a) === Array.isArray(b)) {
    if (Array.isArray(a) && a.length !== b.length) { out.push({ ruta, otro: true }); return out; }
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) cambiosDeTexto(a[k], b[k], [...ruta, k], out);
    return out;
  }
  out.push({ ruta, otro: true });
  return out;
}

const conValorEn = (obj, ruta, valor) => {
  if (!ruta.length) return valor;
  const [k, ...resto] = ruta;
  if (Array.isArray(obj)) return obj.map((x, i) => (String(i) === String(k) ? conValorEn(x, resto, valor) : x));
  return { ...obj, [k]: conValorEn(obj[k], resto, valor) };
};

/* Devuelve el valor a guardar: `despues` si cabe; si no, `despues` con lo escrito/pegado
 * recortado hasta donde quepa; o `antes` si no cabe nada. `armar(valor)` arma los datos del PDF. */
function ajustarAlEspacio(revisar, antes, despues, armar) {
  const capAntes = revisar(armar(antes));
  const cabe = (valor) => excesosNuevos(capAntes, revisar(armar(valor))).length === 0;
  if (cabe(despues)) return { valor: despues };
  const campo = excesosNuevos(capAntes, revisar(armar(despues)))[0]?.[1]?.campo || "";

  const cambios = cambiosDeTexto(antes, despues);
  if (cambios.length === 1 && !cambios[0].otro) {
    const { ruta, antes: a, despues: d } = cambios[0];
    // Parte insertada = lo que hay entre el prefijo y el sufijo comunes
    let p = 0;
    while (p < a.length && p < d.length && a[p] === d[p]) p++;
    let s = 0;
    while (s < a.length - p && s < d.length - p && a[a.length - 1 - s] === d[d.length - 1 - s]) s++;
    const inicio = d.slice(0, p);
    const insertado = d.slice(p, d.length - s);
    const fin = d.slice(d.length - s);
    const con = (k) => conValorEn(despues, ruta, inicio + insertado.slice(0, k) + fin);
    let lo = 0, hi = insertado.length - 1, mejor = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (cabe(con(mid))) { mejor = mid; lo = mid + 1; } else hi = mid - 1;
    }
    if (mejor > 0) return { valor: con(mejor), recortado: true, campo };
  }
  return { valor: antes, bloqueado: true, campo };
}

// Paso del formulario donde está cada campo revisado
const pasoDeCampo = (clave) => {
  if (["region", "nombrePaciente", "fecha", "medico"].includes(clave)) return 0;
  if (["dx", "datosClinicos", "antecedentes"].includes(clave)) return 1;
  if (/^(sensitiva|motora|especiales)\./.test(clave)) return 2;
  if (clave.startsWith("miografia.")) return 3;
  if (clave.startsWith("ecografia.")) return 4;
  return 5;
};

const leerComoDataUrl = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(file);
  });

/* Reduce la imagen subida (firma, logo, íconos) a `maxLado` px por lado como máximo.
 * Así se guarda para el usuario sin llenar el almacenamiento del navegador. En el PDF
 * se dibuja dentro de su recuadro fijo, así que el tamaño en el reporte no cambia.
 * PNG se mantiene PNG (conserva la transparencia); JPG se guarda como JPG. */
const reducirImagen = async (file, maxLado = 600) => {
  const original = await leerComoDataUrl(file);
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = original;
  }).catch(() => null);
  if (!img) return original;
  const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * escala));
  const h = Math.max(1, Math.round(img.height * escala));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(img, 0, 0, w, h);
  const esJpg = /jpe?g/i.test(file.type);
  const reducida = esJpg ? canvas.toDataURL("image/jpeg", 0.9) : canvas.toDataURL("image/png");
  return reducida.length < original.length ? reducida : original;
};

/* Selector de imagen (firma / logo) con vista previa */
function SelectorImagen({ label, valor, onChange, ayuda, alto = "h-20", maxLado = 600 }) {
  const ref = useRef(null);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => ref.current?.click()}
          className={`w-40 ${alto} rounded-lg border border-dashed border-orange-500/40 hover:border-orange-500 bg-white flex items-center justify-center overflow-hidden transition-colors`}>
          {valor
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={valor} alt={label} className="max-w-full max-h-full object-contain" />
            : <span className="text-orange-500 text-sm">+ Subir</span>}
        </button>
        <div className="flex flex-col gap-1">
          {valor && (
            <button type="button" onClick={() => onChange("")} className="text-xs text-slate-500 hover:text-red-400 text-left transition-colors">Quitar</button>
          )}
          {ayuda && <span className={helpClass}>{ayuda}</span>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/png,image/jpeg" className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onChange(await reducirImagen(file, maxLado));
        }} />
    </div>
  );
}

/* ─── Constantes fijas del reporte ──────────────────────────────────────────── */

export const TITULO_FIJO = "ELECTRONEUROMIOGRAFÍA";

/* Ícono de una sección (Neurografía / Miografía / Ecografía), junto al título.
 * Lo sube el usuario; se usa en el PDF en el mismo lugar. Sin ícono, no aparece. */
function IconoSeccion({ seccion, valor, onChange }) {
  const ref = useRef(null);
  return (
    <span className="inline-flex items-center gap-2 ml-1">
      <button type="button" onClick={() => ref.current?.click()}
        title={valor ? `Cambiar el logo de ${seccion}` : `Subir logo de ${seccion}`}
        className={`w-7 h-7 rounded-md flex items-center justify-center overflow-hidden transition-colors ${
          valor ? "bg-white p-0.5 hover:ring-2 hover:ring-orange-500" : "border border-dashed border-orange-500/60 text-orange-400 hover:border-orange-500 text-sm"
        }`}>
        {valor
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={valor} alt={`Logo de ${seccion}`} className="max-w-full max-h-full object-contain" />
          : "+"}
      </button>
      {valor
        ? <button type="button" onClick={() => onChange("")} className="text-xs font-normal text-slate-500 hover:text-red-400 transition-colors">Quitar logo</button>
        : <span className="text-xs font-normal text-slate-500">Subir logo</span>}
      <input ref={ref} type="file" accept="image/png,image/jpeg" className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onChange(await reducirImagen(file, 400));
        }} />
    </span>
  );
}

/* Bloques con título, color y descripción fijos. Solo los renglones son editables. */
export const BLOQUES = {
  sensitiva: {
    titulo: "Conducción Nerviosa Sensitiva (PANS)",
    descripcion: "Estímulo submáximo a territorio cutáneo sensorial con registro distal mediante técnica antidrómica convencional, encontrando:",
    color: "#8F6787",
    prefijo: "NERVIO",
    item: "nervio",
  },
  motora: {
    titulo: "Conducción Nerviosa Motora (PAMC)",
    descripcion: "Estímulo supramáximo a trayecto nervioso con registro en punto motor correspondiente, encontrando:",
    color: "#2A80AE",
    prefijo: "NERVIO",
    item: "nervio",
  },
  especiales: {
    titulo: "Pruebas especiales complementarias",
    descripcion: "",
    color: "#648F64",
    prefijo: "",
    item: "prueba",
  },
  miografia: {
    titulo: "Electrodo monopolar/concéntrico (EMG)",
    descripcion: "Se evalúan músculos con aguja de 55 mm, por medio de las modalidades de inserción, reposo y actividad voluntaria, encontrando:",
    color: "#EB4A25",
    prefijo: "",
    item: "apartado",
  },
  ecografia: {
    titulo: "Ultrasonido MSK",
    descripcion: "Se evalúan estructuras nerviosas con sonda lineal de alta frecuencia (L12-5L40S), encontrando:",
    color: "#908F8D",
    prefijo: "",
    item: "apartado",
  },
};

/* ─── Estado ────────────────────────────────────────────────────────────────── */

const SESSION_KEY = "@formulario_enmg_session";
const FIRMA_KEY = "@formulario_enmg_firma";

let _uid = 0;
const uid = () => `r${Date.now().toString(36)}${(_uid++).toString(36)}`;
const fila = (nombre = "", hallazgo = "", sinPrefijo = false) => ({ id: uid(), nombre, hallazgo, sinPrefijo });
const linea = (texto = "") => ({ id: uid(), texto });
// Sesiones guardadas antes guardaban los renglones como strings simples
const normalizarLineas = (arr) =>
  Array.isArray(arr) && arr.length
    ? arr.map((x) => (typeof x === "string" ? linea(x) : { id: x?.id || uid(), texto: x?.texto || "" }))
    : [linea()];

const hoy = () => {
  const n = new Date();
  return `${String(n.getDate()).padStart(2, "0")}/${String(n.getMonth() + 1).padStart(2, "0")}/${n.getFullYear()}`;
};

/* Reporte genérico: todo empieza vacío; el médico redacta cada renglón. */
const formVacio = () => ({
  region: "",
  fecha: hoy(),
  nombrePaciente: "",
  edad: "",
  medico: "",
  dx: "",
  datosClinicos: [linea()],
  antecedentes: [linea()],
  conclusion: "",
  correlacion: "", // "Comentario adicional" (en el PDF va solo el texto)
  tituloConclusion: "", // vacío = "ENMG de {región}"
  bloques: {
    sensitiva: { incluir: true, filas: [fila()], nota: "" },
    motora: { incluir: true, filas: [fila()], nota: "" },
    especiales: { incluir: true, filas: [fila()], nota: "" },
    miografia: { incluir: true, filas: [fila()], nota: "" },
    ecografia: { incluir: false, filas: [fila()], nota: "" },
  },
});

const NEURO = ["sensitiva", "motora", "especiales"];

const PASOS = ["Datos", "Motivo", "Neurografía", "Miografía", "Ecografía", "Conclusión"];

/* ─── Tipografía y clases compartidas ───────────────────────────────────────────
 * Una sola escala para todo el formulario:
 *   text-base  → título de paso
 *   text-sm    → encabezados de bloque, campos y botones
 *   text-xs    → etiquetas, ayudas y resúmenes
 * Mismo peso para todos los campos (font-normal); etiquetas en font-medium. */

const fieldBase = "block w-full bg-[#1c1c1c] text-white text-sm font-normal leading-relaxed rounded-md px-3 py-2 border border-white/10 focus:border-orange-500 focus:outline-none placeholder-slate-600";
const inputClass = fieldBase;
const textareaClass = `${fieldBase} resize-none`;
const labelClass = "text-slate-400 text-xs font-medium mb-1.5 block";
const helpClass = "text-slate-500 text-xs font-normal";

/* ─── Sub-componentes ───────────────────────────────────────────────────────── */

function Campo({ label, value, onChange, placeholder, required, suggestKey }) {
  return (
    <div>
      <label className={labelClass}>
        {label}{required && <span className="text-orange-400 ml-1">*</span>}
      </label>
      {suggestKey ? (
        <SuggestInput selectorGuardados fieldKey={suggestKey} value={value} onChange={onChange} placeholder={placeholder || ""} className={inputClass} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || ""} className={inputClass} />
      )}
    </div>
  );
}

function TituloPaso({ num, children, accesorio, sub }) {
  return (
    <>
      <h2 className={`text-white font-semibold text-base ${sub ? "mb-1" : "mb-4"} flex items-center gap-2`}>
        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{num}</span>
        {children}
        {accesorio}
      </h2>
      {sub && <p className={`${helpClass} mb-4 ml-8`}>{sub}</p>}
    </>
  );
}

function PasoIndicador({ pasoActual, onIr }) {
  return (
    <div className="flex items-center justify-between mb-8 px-1">
      {PASOS.map((nombre, idx) => {
        const completado = idx < pasoActual;
        const activo = idx === pasoActual;
        return (
          <div key={idx} className="flex items-center flex-1 last:flex-none">
            <button type="button" onClick={() => onIr(idx)} className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                completado ? "bg-orange-500 text-white" :
                activo ? "bg-orange-500/20 border-2 border-orange-500 text-orange-400" :
                "bg-[#1a1a1a] border border-white/10 text-slate-500"
              }`}>
                {completado ? "✓" : idx + 1}
              </div>
              <span className={`text-xs font-medium mt-1.5 text-center hidden sm:block ${activo ? "text-orange-400" : completado ? "text-slate-300" : "text-slate-600"}`}>
                {nombre}
              </span>
            </button>
            {idx < PASOS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all ${completado ? "bg-orange-500" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function NavButtons({ onAnterior, onSiguiente, labelSiguiente = "Siguiente →", hideSiguiente = false }) {
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
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          {labelSiguiente}
        </motion.button>
      )}
    </div>
  );
}

/* Lista de renglones con guion (Datos clínicos / Antecedentes).
 * Captura rápida con teclado:
 *   Enter      → nuevo renglón debajo (si el actual tiene texto) y foco en él
 *   Backspace  → en un renglón vacío lo borra y regresa al anterior
 *   ↑ / ↓      → moverse entre renglones (si no hay sugerencias abiertas)
 *   Pegar      → un texto con varias líneas se separa en renglones (quita viñetas) */
function ListaRenglones({ titulo, color, items, onChange, suggestKey }) {
  const contRef = useRef(null);
  const focoPendiente = useRef(null); // { id, alFinal }

  // Enfoca el renglón indicado después de que React lo pinte
  useEffect(() => {
    const p = focoPendiente.current;
    if (!p) return;
    const input = contRef.current?.querySelector(`[data-renglon="${p.id}"] input`);
    if (!input) return;
    focoPendiente.current = null;
    input.focus();
    const n = input.value.length;
    input.setSelectionRange(p.alFinal ? n : 0, p.alFinal ? n : 0);
  });
  // Para renglones que aún no existen (se enfocan tras el render)
  const enfocar = (id, alFinal = true) => { focoPendiente.current = { id, alFinal }; };
  // Para renglones que ya están en pantalla
  const enfocarYa = (id) => {
    const input = contRef.current?.querySelector(`[data-renglon="${id}"] input`);
    if (!input) return;
    input.focus();
    const n = input.value.length;
    input.setSelectionRange(n, n);
  };

  const set = (id, texto) => onChange(items.map((x) => (x.id === id ? { ...x, texto } : x)));
  const del = (id) => {
    const idx = items.findIndex((x) => x.id === id);
    const resto = items.filter((x) => x.id !== id);
    if (resto.length === 0) { const n = linea(); onChange([n]); enfocar(n.id); return; }
    enfocar(resto[Math.max(0, idx - 1)].id);
    onChange(resto);
  };
  const insertarDespues = (idx, textos = [""]) => {
    const nuevos = textos.map((t) => linea(t));
    onChange([...items.slice(0, idx + 1), ...nuevos, ...items.slice(idx + 1)]);
    enfocar(nuevos[nuevos.length - 1].id);
  };
  const agregarAlFinal = () => {
    const ultimo = items[items.length - 1];
    if (ultimo && !ultimo.texto.trim()) { enfocarYa(ultimo.id); return; }
    insertarDespues(items.length - 1);
  };

  const onKeyDown = (e, idx, item) => {
    if (e.defaultPrevented) return; // el autocompletado ya usó la tecla
    if (e.key === "Enter") {
      e.preventDefault();
      if (!item.texto.trim()) return;
      const sig = items[idx + 1];
      if (sig && !sig.texto.trim()) enfocarYa(sig.id);
      else insertarDespues(idx);
    } else if (e.key === "Backspace" && !item.texto && items.length > 1) {
      e.preventDefault();
      del(item.id);
    } else if (e.key === "ArrowDown" && items[idx + 1]) {
      e.preventDefault();
      enfocarYa(items[idx + 1].id);
    } else if (e.key === "ArrowUp" && items[idx - 1]) {
      e.preventDefault();
      enfocarYa(items[idx - 1].id);
    }
  };

  const onPaste = (e, idx, item) => {
    const texto = e.clipboardData?.getData("text") || "";
    if (!/[\r\n]/.test(texto)) return; // una sola línea: pegado normal
    e.preventDefault();
    const lineas = texto
      .split(/\r?\n/)
      .map((l) => l.replace(/^\s*(?:[-–—•*·]|\d+[.)])\s*/, "").trim())
      .filter(Boolean);
    if (!lineas.length) return;
    if (!item.texto.trim()) {
      const [primera, ...resto] = lineas;
      const nuevos = resto.map((t) => linea(t));
      onChange([...items.slice(0, idx), { ...item, texto: primera }, ...nuevos, ...items.slice(idx + 1)]);
      enfocar((nuevos[nuevos.length - 1] || item).id);
    } else {
      insertarDespues(idx, lineas);
    }
  };

  const capturados = items.filter((x) => x.texto.trim()).length;

  return (
    <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden" ref={contRef}>
      <div className="px-4 py-2.5 text-white text-sm font-semibold flex items-center justify-between" style={{ background: color }}>
        <span>{titulo}</span>
        {capturados > 0 && (
          <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-white/25 text-white text-xs font-medium flex items-center justify-center">{capturados}</span>
        )}
      </div>
      <div className="p-4">
        <div className="-mb-2">
          <AnimatePresence initial={false}>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                layout="position"
                initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
                exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 pb-2" data-renglon={item.id}
                  onKeyDown={(e) => onKeyDown(e, idx, item)}
                  onPasteCapture={(e) => onPaste(e, idx, item)}>
                  <span className="text-slate-500 text-sm w-2">–</span>
                  <div className="flex-1 min-w-0">
                    <SuggestInput selectorGuardados fieldKey={suggestKey} value={item.texto} onChange={(val) => set(item.id, val)}
                      placeholder="" className={inputClass} />
                  </div>
                  {items.length > 1 && (
                    <button onClick={() => del(item.id)} title="Quitar" tabIndex={-1}
                      className="text-slate-400 hover:text-red-400 text-xs w-8 h-8 rounded-lg border border-white/10 shrink-0 transition-colors">✕</button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button onClick={agregarAlFinal}
          className="w-full border border-dashed border-orange-500/40 text-orange-400 hover:border-orange-500 rounded-xl py-2.5 text-sm transition-colors mt-3">
          + Agregar renglón
        </button>
      </div>
    </div>
  );
}

/* Bloque de hallazgos: encabezado fijo con color + n renglones + nota opcional.
 * Con `onToggle` funciona como acordeón: clic en el encabezado abre/cierra,
 * y entrar a editar (foco) lo abre con `onAbrir`. */
/* Renglones que ocupa el texto en el PDF ("3/5"); naranja al llegar al máximo */
function ContadorRenglones({ info }) {
  if (!info) return null;
  const color = info.usados > info.max ? "text-red-400" : info.usados === info.max ? "text-orange-400" : "text-slate-500";
  return (
    <p className={`text-xs font-normal text-right mt-1 ${color}`}>
      {info.usados}/{info.max} renglones en el PDF
    </p>
  );
}

function BloqueHallazgos({ id, bloque, onChange, opcional, abierto = true, onAbrir, onToggle, renglones = {} }) {
  const cfg = BLOQUES[id];
  const setFila = (fid, patch) => onChange({ ...bloque, filas: bloque.filas.map((f) => (f.id === fid ? { ...f, ...patch } : f)) });
  const delFila = (fid) => onChange({ ...bloque, filas: bloque.filas.filter((f) => f.id !== fid) });
  const agregar = () => onChange({ ...bloque, filas: [...bloque.filas, fila()] });
  const apagado = opcional && !bloque.incluir;
  const acordeon = typeof onToggle === "function";
  const descripcion = typeof bloque.descripcion === "string" ? bloque.descripcion : DESCRIPCION_ESTANDAR[id];

  // Resumen visible cuando el apartado está contraído
  const llenas = bloque.filas.filter((f) => f.nombre.trim());
  const completo = bloque.filas.some((f) => f.nombre.trim() && f.hallazgo.trim());
  const resumen = apagado ? "No se incluye en el reporte" : llenas.length
    ? `${llenas.length} ${cfg.item}${llenas.length === 1 ? "" : "s"}: ${llenas.map((f) => f.nombre.trim()).join(", ")}`
    : `Sin ${cfg.item}s ${cfg.item === "prueba" ? "capturadas" : "capturados"}`;

  return (
    <div
      className={`rounded-xl border mb-4 bg-[#0d0d0d] transition-colors ${acordeon && abierto ? "border-orange-500/40" : "border-white/10"}`}
      onFocusCapture={acordeon && !abierto ? onAbrir : undefined}
    >
      {/* Encabezado fijo */}
      <div
        className={`px-4 py-3 flex items-center gap-3 ${abierto ? "rounded-t-xl" : "rounded-xl"} ${acordeon ? "cursor-pointer select-none" : ""}`}
        style={{ background: cfg.color }}
        onClick={acordeon ? onToggle : undefined}
      >
        <span className="text-white text-sm font-semibold flex-1">{cfg.titulo}</span>
        {opcional && (
          <label className="flex items-center gap-2 text-white text-xs font-medium cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
            <input type="checkbox" checked={bloque.incluir} onChange={(e) => onChange({ ...bloque, incluir: e.target.checked })} className="accent-orange-500" />
            Incluir en el reporte
          </label>
        )}
        {acordeon && (
          <>
            {completo && <span className="w-5 h-5 rounded-full bg-white/25 text-white text-xs flex items-center justify-center">✓</span>}
            <motion.svg animate={{ rotate: abierto ? 180 : 0 }} transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </>
        )}
      </div>

      {/* Resumen cuando está contraído */}
      {acordeon && !abierto && (
        <button type="button" onClick={onToggle} className="w-full text-left px-4 py-3 text-xs text-slate-400 hover:text-white truncate transition-colors">
          {resumen}
          {bloque.nota.trim() && <span className="text-slate-600"> · con nota</span>}
        </button>
      )}

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            key="contenido"
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {DESCRIPCION_ESTANDAR[id] && (
              <div className={`px-4 py-3 border-b border-white/5 ${apagado ? "opacity-30 pointer-events-none" : ""}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`${labelClass} mb-0`}>Descripción de la técnica</label>
                  {descripcion !== DESCRIPCION_ESTANDAR[id] && (
                    <button type="button" onClick={() => onChange({ ...bloque, descripcion: DESCRIPCION_ESTANDAR[id] })}
                      className="text-xs text-slate-500 hover:text-orange-400 transition-colors">Restablecer</button>
                  )}
                </div>
                <textarea value={descripcion} onChange={(e) => onChange({ ...bloque, descripcion: e.target.value })}
                  rows={2} maxLength={260} className={textareaClass} />
              </div>
            )}

            <div className={`p-4 flex flex-col gap-3 ${apagado ? "opacity-30 pointer-events-none" : ""}`}>
              {/* Renglones: entran/salen con animación de altura + fade.
                  El espacio entre renglones va como padding dentro del motion.div
                  para que también se anime (un `gap` saltaría de golpe).
                  -mb-3 compensa el pb-3 del último renglón frente al gap-3 del contenedor. */}
              <div className="-mb-3">
              <AnimatePresence initial={false}>
              {bloque.filas.map((f) => (
                <motion.div
                  key={f.id}
                  layout="position"
                  initial={{ height: 0, opacity: 0, y: -8, overflow: "hidden" }}
                  animate={{ height: "auto", opacity: 1, y: 0, transitionEnd: { overflow: "visible" } }}
                  exit={{ height: 0, opacity: 0, y: -8, overflow: "hidden" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                <div className="pb-3">
                <div className="bg-[#111] rounded-xl border border-white/10 flex overflow-hidden">
                  <div className="w-1.5 shrink-0" style={{ background: cfg.color }} />
                  <div className="flex-1 min-w-0 p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {cfg.prefijo && (
                        <button type="button" onClick={() => setFila(f.id, { sinPrefijo: !f.sinPrefijo })}
                          title={f.sinPrefijo ? `Agregar “${cfg.prefijo}” antes del nombre` : `Quitar “${cfg.prefijo}” antes del nombre`}
                          className={`text-xs font-medium px-2 h-8 rounded-lg border shrink-0 transition-colors ${
                            f.sinPrefijo ? "border-white/10 text-slate-600 line-through" : "border-white/20 text-slate-300 hover:border-orange-500"
                          }`}>
                          {cfg.prefijo}
                        </button>
                      )}
                      <div className="flex-1 min-w-0">
                        <SuggestInput selectorGuardados
                          fieldKey={`enmg.${id}.nombre`}
                          value={f.nombre}
                          onChange={(v) => setFila(f.id, { nombre: v })}
                          placeholder="Nombre"
                          className={inputClass}
                        />
                      </div>
                      {bloque.filas.length > 1 && (
                        <button onClick={() => delFila(f.id)} title="Quitar"
                          className="text-slate-400 hover:text-red-400 text-xs w-8 h-8 rounded-lg border border-white/10 shrink-0 transition-colors">✕</button>
                      )}
                    </div>
                    <SuggestTextarea selectorGuardados
                      fieldKey={`enmg.${id}.hallazgo`}
                      value={f.hallazgo}
                      onChange={(v) => setFila(f.id, { hallazgo: v })}
                      rows={2}
                      placeholder="Hallazgo"
                      className={textareaClass}
                    />
                    <ContadorRenglones info={renglones[`${id}.fila.${f.id}`]} />
                  </div>
                </div>
                </div>
                </motion.div>
              ))}
              </AnimatePresence>
              </div>

              <button onClick={agregar}
                className="w-full border border-dashed border-orange-500/40 text-orange-400 hover:border-orange-500 rounded-xl py-2.5 text-sm transition-colors">
                + Agregar {cfg.item}
              </button>

              <div className="mt-1">
                <label className={labelClass}>Nota <span className="text-slate-600 font-normal">(opcional)</span></label>
                <SuggestTextarea selectorGuardados
                  fieldKey={`enmg.${id}.nota`}
                  value={bloque.nota}
                  onChange={(v) => onChange({ ...bloque, nota: v })}
                  rows={2}
                  placeholder=""
                  className={textareaClass}
                />
                <ContadorRenglones info={renglones[`${id}.nota`]} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────────── */

export default function ReportFace() {
  const { data: session, status: estadoSesion } = useSession();
  const [paso, setPaso] = useState(0);
  const [form, setForm] = useState(formVacio);
  const [mensaje, setMensaje] = useState(null);
  const msgTimer = useRef(null);

  // Firma del reporte (hoja de Conclusión) y anexo del equipo
  const [firmante, setFirmante] = useState("");   // una línea por renglón
  const [firma, setFirma] = useState("");         // data URL
  const [logo, setLogo] = useState("");           // data URL; vacío = logo del perfil
  const [iconos, setIconos] = useState({});       // { neurografia, miografia, ecografia }: data URL (vacío = sin ícono)
  const setIcono = (clave) => (valor) => setIconos((i) => ({ ...i, [clave]: valor }));
  const [anexo, setAnexo] = useState(null);       // { nombre, bytes } — no se guarda en la sesión
  const anexoRef = useRef(null);

  // Generación
  const [showGenerar, setShowGenerar] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [linkPdf, setLinkPdf] = useState(null);   // { blob, nombre }
  // Acordeón de Neurografía: apartado abierto ("sensitiva" | "motora" | "especiales")
  const [neuroAbierto, setNeuroAbierto] = useState("sensitiva");

  // ── Restaurar / guardar la sesión en curso (mismo patrón que Monitoreo) ──
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.form?.bloques) {
          setForm({
            ...formVacio(), // campos nuevos que una sesión anterior no tenía
            ...parsed.form,
            datosClinicos: normalizarLineas(parsed.form.datosClinicos),
            antecedentes: normalizarLineas(parsed.form.antecedentes),
            // Sesiones anteriores tenían Principal y Secundario: se juntan en Conclusión
            conclusion: typeof parsed.form.conclusion === "string"
              ? parsed.form.conclusion
              : [parsed.form.principal, parsed.form.secundario].map((t) => String(t || "").trim()).filter(Boolean).join("\n"),
          });
        }
        if (typeof parsed?.paso === "number") setPaso(parsed.paso);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // ── Datos del médico que firma, firma, logo e íconos de sección: se guardan POR USUARIO
  // (clave con su correo) y se recuerdan entre reportes. Se cargan cuando se conoce la sesión.
  const claveFirma = session?.user?.email ? `${FIRMA_KEY}:${String(session.user.email).toLowerCase()}` : `${FIRMA_KEY}:sin-sesion`;
  const [firmaCargada, setFirmaCargada] = useState(null); // clave ya cargada
  useEffect(() => {
    if (!hydrated || estadoSesion === "loading" || firmaCargada === claveFirma) return;
    let f = null;
    try {
      // Si este usuario aún no tiene nada guardado, se toma lo que había antes (sin usuario)
      f = JSON.parse(localStorage.getItem(claveFirma) || "null") || JSON.parse(localStorage.getItem(FIRMA_KEY) || "null");
    } catch {}
    setFirma(typeof f?.firma === "string" ? f.firma : "");
    setLogo(typeof f?.logo === "string" ? f.logo : "");
    setIconos(f?.iconos && typeof f.iconos === "object" ? f.iconos : {});
    let texto = typeof f?.firmante === "string" ? f.firmante : "";
    if (!texto.trim() && session?.user) {
      // Primera vez: se prellena con el perfil (los campos pueden venir vacíos o con espacios)
      const u = session.user;
      const limpio = (v) => (typeof v === "string" ? v.trim() : "");
      const nombre = [limpio(u.name), limpio(u.lastname)].filter(Boolean).join(" ");
      const cedula = limpio(u.idprofessional);
      texto = [
        nombre && (/^dr/i.test(nombre) ? nombre : `Dr. ${nombre}`),
        limpio(u.specialty),
        cedula && `CE ${cedula}`,
      ].filter(Boolean).join("\n");
    }
    setFirmante(texto);
    setFirmaCargada(claveFirma);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, estadoSesion, claveFirma, firmaCargada]);

  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(SESSION_KEY, JSON.stringify({ form, paso })); } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [hydrated, form, paso]);

  const avisoGuardado = useRef(false);
  useEffect(() => {
    if (firmaCargada !== claveFirma) return; // no sobrescribir antes de cargar lo de este usuario
    try {
      localStorage.setItem(claveFirma, JSON.stringify({ firmante, firma, logo, iconos }));
      avisoGuardado.current = false;
    } catch {
      // Almacenamiento del navegador lleno: se usa en este reporte pero no se recordará
      if (!avisoGuardado.current) {
        avisoGuardado.current = true;
        showMsg("error", "No se pudo guardar la firma o los logos en este navegador (almacenamiento lleno). Se usarán en este reporte, pero no se recordarán.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firmaCargada, claveFirma, firmante, firma, logo, iconos]);

  useEffect(() => () => clearTimeout(msgTimer.current), []);

  // Precarga las fuentes e imágenes del formato en cuanto se abre el reporte
  useEffect(() => { precargarRecursos(); }, []);

  const showMsg = (tipo, texto) => {
    setMensaje({ tipo, texto });
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMensaje(null), 4000);
  };

  // ── Límite de texto: no deja escribir más de lo que cabe en la plantilla del PDF ──
  const revisorRef = useRef(null);
  const [revisorListo, setRevisorListo] = useState(false);
  const formRef = useRef(form);
  const firmanteRef = useRef(firmante);
  formRef.current = form;
  firmanteRef.current = firmante;
  useEffect(() => {
    let vivo = true;
    crearRevisorEnmg(cargarRecurso)
      .then((r) => { if (vivo) { revisorRef.current = r; setRevisorListo(true); } })
      .catch(() => {}); // sin fuentes no se limita; el PDF tampoco se podrá generar y lo avisará
    return () => { vivo = false; };
  }, []);
  const datosPdf = (f, firm) => ({ ...f, firmante: String(firm || "").split("\n") });
  // Renglones que ocupa cada texto largo en el PDF (contadores "3/5")
  const renglones = revisorListo && revisorRef.current ? revisorRef.current.renglones(form) : {};

  const avisarEspacio = (r) => {
    if (r.bloqueado || r.recortado) {
      showMsg("error", `Se alcanzó el espacio disponible en el PDF${r.campo ? ` para “${r.campo}”` : ""}.`);
    }
  };

  const cambiarForm = (siguiente) => {
    const antes = formRef.current;
    const despues = siguiente(antes);
    const rev = revisorRef.current;
    const r = rev ? ajustarAlEspacio(rev, antes, despues, (f) => datosPdf(f, firmanteRef.current)) : { valor: despues };
    avisarEspacio(r);
    if (r.valor !== antes) {
      formRef.current = r.valor;
      setForm(r.valor);
    }
  };
  const cambiarFirmante = (texto) => {
    const antes = firmanteRef.current;
    const rev = revisorRef.current;
    const r = rev ? ajustarAlEspacio(rev, antes, texto, (s) => datosPdf(formRef.current, s)) : { valor: texto };
    avisarEspacio(r);
    if (r.valor !== antes) {
      firmanteRef.current = r.valor;
      setFirmante(r.valor);
    }
  };

  const setField = (field) => (val) => cambiarForm((f) => ({ ...f, [field]: val }));
  const setBloque = (id) => (val) => cambiarForm((f) => ({ ...f, bloques: { ...f.bloques, [id]: val } }));

  // Deja el formulario vacío para un nuevo reporte (firmante, firma y logo se conservan)
  const reiniciarFormulario = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    const vacio = formVacio();
    formRef.current = vacio;
    setForm(vacio);
    setPaso(0);
    setAnexo(null);
    setNeuroAbierto("sensitiva");
  };

  const limpiar = () => {
    reiniciarFormulario();
    showMsg("info", "Formulario limpiado.");
  };

  // ── Validación por paso ──
  const filasCompletas = (id) => form.bloques[id].filas.some((f) => f.nombre.trim() && f.hallazgo.trim());
  const filasIncompletas = (id) => form.bloques[id].filas.some((f) => !!f.nombre.trim() !== !!f.hallazgo.trim());

  const validar = (p) => {
    if (p === 0) {
      if (!form.region.trim() || !form.nombrePaciente.trim() || !form.edad.trim() || !form.fecha.trim()) {
        showMsg("error", "Por favor complete los campos requeridos antes de continuar.");
        return false;
      }
    }
    if (p === 1 && !form.dx.trim()) {
      showMsg("error", "Ingrese el Dx del motivo de envío.");
      return false;
    }
    if (p === 2) {
      const incluidos = NEURO.filter((id) => form.bloques[id].incluir !== false);
      if (!incluidos.length) {
        showMsg("error", "Incluya al menos un apartado de Neurografía.");
        return false;
      }
      const faltante = incluidos.find((id) => !filasCompletas(id));
      if (faltante) {
        setNeuroAbierto(faltante);
        showMsg("error", `Agregue al menos un ${BLOQUES[faltante].item} con su hallazgo en “${BLOQUES[faltante].titulo}”, o desmarque “Incluir en el reporte”.`);
        return false;
      }
      const incompleto = incluidos.find(filasIncompletas);
      if (incompleto) {
        setNeuroAbierto(incompleto);
        showMsg("error", `Hay renglones sin nombre o sin hallazgo en “${BLOQUES[incompleto].titulo}”.`);
        return false;
      }
    }
    if ((p === 3 || p === 4)) {
      const id = p === 3 ? "miografia" : "ecografia";
      if (form.bloques[id].incluir && !filasCompletas(id)) {
        showMsg("error", "Complete al menos un apartado, o desmarque “Incluir en el reporte”.");
        return false;
      }
    }
    if (p === 5 && !String(form.conclusion || "").trim()) {
      showMsg("error", "La conclusión es requerida.");
      return false;
    }
    return true;
  };

  const irA = (p) => {
    setPaso(Math.max(0, Math.min(PASOS.length - 1, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const avanzar = () => { if (validar(paso)) irA(paso + 1); };
  const retroceder = () => irA(paso - 1);
  // Desde el indicador: hacia atrás libre, hacia adelante validando cada paso intermedio.
  const irDesdeIndicador = (destino) => {
    if (destino <= paso) return irA(destino);
    for (let p = paso; p < destino; p++) if (!validar(p)) return irA(p);
    irA(destino);
  };

  const finalizar = () => {
    for (let p = 0; p < PASOS.length; p++) if (!validar(p)) return irA(p);
    // Por si se restauró una sesión con más texto del que cabe
    const rev = revisorRef.current;
    if (rev) {
      const [clave, info] = Object.entries(rev(datosPdf(form, firmante)))[0] || [];
      if (clave) {
        irA(pasoDeCampo(clave));
        showMsg("error", `“${info.campo}” no cabe en el PDF. Reduzca el texto para poder generar el reporte.`);
        return;
      }
    }
    setShowGenerar(true);
  };

  const elegirAnexo = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) {
      showMsg("error", "El archivo del equipo debe ser PDF.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      showMsg("error", "El PDF del equipo supera 50 MB.");
      return;
    }
    setAnexo({ nombre: file.name, bytes: new Uint8Array(await file.arrayBuffer()) });
  };

  const generarPdf = async () => {
    setGenerando(true);
    try {
      const datos = {
        ...form,
        firmante: firmante.split("\n"),
        firma,
        logo: logo || session?.user?.imageUrl || "",
        iconos, // íconos de sección que subió el usuario; sin ícono no se dibuja
        anexoPdf: anexo?.bytes || null,
      };
      const bytes = await buildEnmgPdf(datos, cargarRecurso);
      return { blob: new Blob([bytes], { type: "application/pdf" }), nombre: nombreArchivoEnmg(form.nombrePaciente) };
    } finally {
      setGenerando(false);
    }
  };

  const descargarPdf = async () => {
    setShowGenerar(false);
    try {
      const { blob, nombre } = await generarPdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nombre;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      reiniciarFormulario();
      showMsg("ok", "PDF descargado. El formulario quedó listo para un nuevo reporte.");
    } catch (e) {
      showMsg("error", `Error generando PDF: ${e.message}`);
    }
  };

  const generarLink = async () => {
    setShowGenerar(false);
    try {
      // Se guarda el paciente con el PDF: el formulario se reinicia al cerrar la ventana del link
      setLinkPdf({ ...(await generarPdf()), paciente: form.nombrePaciente });
    } catch (e) {
      showMsg("error", `Error generando PDF: ${e.message}`);
    }
  };
  const cerrarLink = () => {
    setLinkPdf(null);
    reiniciarFormulario();
    showMsg("info", "El formulario quedó listo para un nuevo reporte.");
  };

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">Reporte · Sistema Nervioso</span>
          <h1 className="text-2xl font-bold text-white mt-1 leading-tight">Electroneuromiografía</h1>
        </div>
        <button onClick={limpiar} className="text-xs text-slate-600 hover:text-red-400 transition-colors mt-1">
          Limpiar
        </button>
      </div>

      {/* Mensaje */}
      <AnimatePresence>
        {mensaje && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`mb-4 px-4 py-3 rounded-xl text-sm ${
              mensaje.tipo === "error" ? "bg-red-900/50 text-red-300 border border-red-700" :
              mensaje.tipo === "ok" ? "bg-green-900/50 text-green-300 border border-green-700" :
              "bg-blue-900/50 text-blue-300 border border-blue-700"
            }`}
          >{mensaje.texto}</motion.div>
        )}
      </AnimatePresence>

      <PasoIndicador pasoActual={paso} onIr={irDesdeIndicador} />

      <AnimatePresence mode="wait">
        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >

          {/* ── PASO 0: Datos generales ── */}
          {paso === 0 && (
            <div>
              <TituloPaso num={1}>Datos del Estudio y Paciente</TituloPaso>
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Título</label>
                  <div className="w-full bg-black text-white text-sm font-medium leading-relaxed rounded-md px-3 py-2 border border-white/10">
                    {TITULO_FIJO}
                  </div>
                </div>
                <Campo label="Región / extremidades" value={form.region} onChange={setField("region")} required suggestKey="enmg.region" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Campo label="Nombre del Paciente" value={form.nombrePaciente} onChange={setField("nombrePaciente")} required />
                  <Campo label="Edad" value={form.edad} onChange={(v) => setField("edad")(v.replace(/[^\d]/g, "").slice(0, 3))} placeholder="Años" required />
                  <Campo label="Fecha (DD/MM/AAAA)" value={form.fecha} onChange={setField("fecha")} placeholder="DD/MM/AAAA" required />
                  <Campo label="Médico tratante" value={form.medico} onChange={setField("medico")} suggestKey="enmg.medico" />
                </div>
              </div>
              <NavButtons onSiguiente={avanzar} />
            </div>
          )}

          {/* ── PASO 1: Motivo de envío ── */}
          {paso === 1 && (
            <div>
              <TituloPaso num={2}>Motivo de envío</TituloPaso>
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 flex flex-col gap-4">
                <Campo label="Dx" value={form.dx} onChange={setField("dx")} required suggestKey="enmg.dx" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ListaRenglones titulo="DATOS CLÍNICOS" color="#5B93BC" items={form.datosClinicos} onChange={setField("datosClinicos")}
                    suggestKey="enmg.datosClinicos" />
                  <ListaRenglones titulo="ANTECEDENTES" color="#EF7046" items={form.antecedentes} onChange={setField("antecedentes")}
                    suggestKey="enmg.antecedentes" />
                </div>
              </div>
              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Neurografía →" />
            </div>
          )}

          {/* ── PASO 2: Neurografía ── */}
          {paso === 2 && (
            <div>
              <TituloPaso num={3} accesorio={<IconoSeccion seccion="Neurografía" valor={iconos.neurografia || ""} onChange={setIcono("neurografia")} />}>Neurografía</TituloPaso>
              {NEURO.map((id) => (
                <BloqueHallazgos key={id} id={id} bloque={form.bloques[id]} onChange={setBloque(id)} opcional renglones={renglones}
                  abierto={neuroAbierto === id}
                  onAbrir={() => setNeuroAbierto(id)}
                  onToggle={() => setNeuroAbierto((a) => (a === id ? null : id))} />
              ))}
              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Miografía →" />
            </div>
          )}

          {/* ── PASO 3: Miografía ── */}
          {paso === 3 && (
            <div>
              <TituloPaso num={4} accesorio={<IconoSeccion seccion="Miografía" valor={iconos.miografia || ""} onChange={setIcono("miografia")} />}>Miografía</TituloPaso>
              <BloqueHallazgos id="miografia" bloque={form.bloques.miografia} onChange={setBloque("miografia")} opcional renglones={renglones} />
              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Ecografía →" />
            </div>
          )}

          {/* ── PASO 4: Ecografía ── */}
          {paso === 4 && (
            <div>
              <TituloPaso num={5} accesorio={<IconoSeccion seccion="Ecografía" valor={iconos.ecografia || ""} onChange={setIcono("ecografia")} />}>Ecografía</TituloPaso>
              <BloqueHallazgos id="ecografia" bloque={form.bloques.ecografia} onChange={setBloque("ecografia")} opcional renglones={renglones} />
              <NavButtons onAnterior={retroceder} onSiguiente={avanzar} labelSiguiente="Continuar a Conclusión →" />
            </div>
          )}

          {/* ── PASO 5: Conclusión ── */}
          {paso === 5 && (
            <div>
              <TituloPaso num={6}>Conclusión</TituloPaso>
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Título de la hoja de conclusión</label>
                  <input value={form.tituloConclusion} onChange={(e) => setField("tituloConclusion")(e.target.value)}
                    placeholder={tituloConclusion({ region: form.region })} maxLength={60} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Conclusión<span className="text-orange-400 ml-1">*</span></label>
                  <SuggestTextarea selectorGuardados fieldKey="enmg.conclusion" value={form.conclusion} onChange={setField("conclusion")} rows={5}
                    className={textareaClass} />
                  <ContadorRenglones info={renglones.conclusion} />
                </div>
                <div>
                  <label className={labelClass}>Comentario adicional <span className="text-slate-600 font-normal">(opcional)</span></label>
                  <SuggestTextarea selectorGuardados fieldKey="enmg.correlacion" value={form.correlacion} onChange={setField("correlacion")} rows={5}
                    className={textareaClass} />
                  <ContadorRenglones info={renglones.correlacion} />
                </div>
              </div>

              {/* Firma del reporte */}
              <h3 className="text-white text-sm font-semibold mt-6 mb-3">Firma del reporte</h3>
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10 flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Datos del médico que realiza el estudio <span className="text-slate-600 font-normal">(un renglón por línea)</span></label>
                  <textarea value={firmante} onChange={(e) => cambiarFirmante(e.target.value)} rows={5} className={textareaClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectorImagen label="Firma" valor={firma} onChange={setFirma} ayuda="PNG con fondo transparente" maxLado={900} />
                  <SelectorImagen label="Logo" valor={logo || session?.user?.imageUrl || ""} onChange={setLogo} maxLado={500}
                    ayuda={logo ? "" : "Por defecto, el de su perfil"} alto="h-20" />
                </div>
              </div>

              {/* Resultados del equipo */}
              <h3 className="text-white text-sm font-semibold mt-6 mb-3">Resultados del equipo <span className="text-slate-600 font-normal text-xs">(opcional)</span></h3>
              <div className="bg-[#0d0d0d] rounded-xl p-5 border border-white/10">
                {anexo ? (
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-red-500/15 text-red-300 text-xs font-semibold flex items-center justify-center">PDF</span>
                    <span className="text-white text-sm flex-1 truncate">{anexo.nombre}</span>
                    <button onClick={() => setAnexo(null)} className="text-xs text-slate-500 hover:text-red-400 transition-colors">Quitar</button>
                  </div>
                ) : (
                  <button onClick={() => anexoRef.current?.click()}
                    className="w-full border border-dashed border-orange-500/40 text-orange-400 hover:border-orange-500 rounded-xl py-3 text-sm transition-colors">
                    + Adjuntar PDF del equipo (tablas y trazos)
                  </button>
                )}
                <p className={`${helpClass} mt-2`}>Sus hojas se agregan al final del reporte.</p>
                <input ref={anexoRef} type="file" accept="application/pdf" className="hidden" onChange={elegirAnexo} />
              </div>
              <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                <button onClick={retroceder}
                  className="px-5 py-2.5 border border-white/20 text-slate-400 hover:text-white hover:border-white/40 rounded-xl text-sm transition-colors">
                  ← Anterior
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={finalizar}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors">
                  Generar Informe
                </motion.button>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Generar Informe: Link / PDF */}
      {showGenerar && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xs p-6 shadow-2xl">
            <h3 className="text-white font-semibold text-base text-center mb-6">Generar Informe</h3>
            <div className="flex flex-col gap-3">
              <button onClick={generarLink}
                className="w-full border border-orange-500 text-orange-400 hover:bg-orange-500/10 font-semibold py-3 rounded-xl text-sm transition-colors">
                🔗 Link
              </button>
              <button onClick={descargarPdf}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                ⬇ PDF
              </button>
              <button onClick={() => setShowGenerar(false)}
                className="w-full border border-white/10 text-slate-400 hover:text-white py-2.5 rounded-xl text-sm transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {generando && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-72 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm font-semibold">Generando PDF...</p>
          </div>
        </div>
      )}

      {linkPdf && (
        <LinkUploaderModal
          pdfBlob={linkPdf.blob}
          pdfFilename={linkPdf.nombre}
          nombrePaciente={linkPdf.paciente}
          session={session}
          onClose={cerrarLink}
          studyKey="ENMG"
          defaultTitle={linkPdf.paciente ? `Electroneuromiografía – ${linkPdf.paciente}` : "Electroneuromiografía"}
          fallbackTitle={`Electroneuromiografía – ${linkPdf.paciente || "Paciente"}`}
        />
      )}
    </div>
  );
}
