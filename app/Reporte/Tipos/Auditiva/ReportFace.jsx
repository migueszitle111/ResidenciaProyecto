'use client';
/*
 * AuditivaNew/ReportFace.jsx
 * Versión web del reporte de Vías Auditivas basado en Auditiva.tsx (app móvil).
 * Layout: panel izquierdo oscuro (menú pasos) + panel derecho blanco (imagen + overlays).
 */

import { useSession } from 'next-auth/react';
import { useCallback, createContext, useContext, useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import './Style.css';

/* ─── Galería de tablas ──────────────────────────────────────────────────────── */
const TABLAS_URL = 'https://backendmedxpro-tef2.onrender.com/pdfEducacion/Tablas';
const TABLAS = [
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                       file: 'LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                                              file: 'CRITERIOS_CIDP_AANEM.png' },
  { id: 'CRITERIOS DE LAMBERT ESCLEROSIS LATERAL AMIOTRÓFICA',               file: 'LAMBERT_ESCLEROSIS_LT.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (DOMINIO)',                                 file: 'CRITERIOS _AWAJI_2008_1.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (CATEGORÍA)',                               file: 'CRITERIOS _AWAJI_2008_2.png' },
  { id: 'COMPARACIÓN EL ESCORIAL / AWAJI 2008',                              file: 'COMPARACION_ESCORIAL.png' },
  { id: 'CRITERIOS POLINEUROPATÍA DESMIELINIZANTE/AXONAL',                   file: 'POLINEUROPATIA_DESMIELINIZANTE.png' },
  { id: 'PATRONES DE DISTRIBUCIÓN EN POLINEUROPATÍA',                        file: 'DISTRIBUCION_POLI.png' },
  { id: 'CUANTIFICACIÓN DE POLINEUROPATÍAS',                                 file: 'CUANTIFICACION_POLI.png' },
  { id: 'HALLAZGOS ELECTROFISIOLÓGICOS EN RADICULOPATÍA',                    file: 'ELECTROFISIOLOGICOS_RADI.png' },
  { id: 'HALLAZGOS ELECTROFISIÓLOGICOS EVOLUTIVOS EN RADICULOPATÍA',         file: 'EVOLUTIVOS_RADI.png' },
  { id: 'HALLAZGOS NEUROGRÁFICOS EN MIOPATÍAS',                              file: 'NEUROGRAFICO_MIO.png' },
  { id: 'HALLAZGOS MIOGRÁFICOS EN MIOPATÍAS',                                file: 'MIOGRAFICOS_MIO.png' },
  { id: 'HALLAZGOS DIFERENCIALES POR TIPOS DE MIOPATÍAS',                   file: 'TIPOS_MIOPATIAS.png' },
  { id: 'COMPARACIÓN MIOPATÍA/RADICULOPATÍA/UNIÓN NEUROMUSCULAR',            file: 'COMPARACION.png' },
  { id: 'SEVERIDAD EN MIOPATÍA',                                             file: 'SEVERIDAD_MIO.png' },
  { id: 'GRAVEDAD POR DECREMENTO ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',    file: 'DECREMENTO_ELEC.png' },
  { id: 'GRAVEDAD POR SFEMG ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',         file: 'SFEMG_ELEC.png' },
  { id: 'COORRELACIÓN PRUEBAS ELECTROFISIOLOGICAS/DATOS CLÍNICOS MG',        file: 'PRUEBAS_ELEC.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS SOMATOSENSORIALES Y MOTORES', file: 'POTENCIALES_EVO.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS VISUALES',        file: 'POTENCIALES_VISUALES.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS AUDITIVOS',       file: 'POTENCIALES_AUD.png' },
  { id: 'PRONÓSTICO ASOCIADO A POTENCIALES EVOCADOS',                        file: 'PRONOSTICO_ASOCIADO.png' },
  { id: 'SEVERIDAD POTENCIALES EVOCADOS MULTIMODALES',                       file: 'EVO_MULTIMODALES.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MS',          file: 'SOMATOSENSORIALES_MS.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MI',          file: 'SOMATOS_MI.png' },
  { id: 'MIOPATÍAS DISTALES',                                                file: 'MIOPATIAS_DISTAL.png' },
  { id: 'SÍNDROMES DE LESIÓN COMBINADA A PARES CRANEALES',                   file: 'PARES_CRANEALES.png' },
  { id: 'PRONÓSTICO EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',      file: 'DEFICIT_AXONAL.png' },
  { id: 'EVOLUCION EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',       file: 'DEFICIT_AXONAL2.png' },
  { id: 'COORRELACIÓN DE TIEMPO DE EVOLUCIÓN EN PLEXOPATÍAS',                file: 'EVOLUCION_PLEXO.png' },
  { id: 'PATRONES ELECTROFISIOLÓGICOS EN NEUROPATÍA',                        file: 'PATRONES_NEURO.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',                 file: 'ELECTROFISIOLOGICOS_DES.png' },
  { id: 'CRITERIOS DIAGNÓSTICOS ELECTROFISIOLÓGICOS PARA AIDP',              file: 'CRITERIOS_AIDP.png' },
  { id: 'DIFERENCIAS ELECTROFISIOLÓGICAS EN POLINEUROPATÍAS',                file: 'DIFERENCIAS_POLI.png' },
  { id: 'AANEM CRITERIOS PARA NEUROPATÍAS POR ATRAPAMIENTO',                 file: 'ATRAPAMIENTO.png' },
  { id: 'CLASIFICACIÓN DE SEDDON Y SUNDERLAND',                              file: 'Tabla38.png' },
  { id: 'POLINEUROPATÍAS DESMIELINIZANTES',                                  file: 'Tabla39.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – PADUA',                              file: 'Tabla40.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – CANTERBURY',                         file: 'Tabla41.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – HIRANI',                             file: 'Tabla42.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                        file: 'Tabla43.png' },
  { id: 'CRITERIOS CIDP AANEM',                                               file: 'Tabla44.png' },
];

/* ─── Modal de recorte (Crop) ────────────────────────────────────────────────── */
function CropModal({ src, onConfirm, onClose }) {
  const imgRef    = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [sel, setSel]   = useState(null);
  const [drawing, setDrawing] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });

  const getRelPos = (e, el) => {
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onMouseDown = (e) => {
    const pos = getRelPos(e, overlayRef.current);
    startRef.current = pos;
    setSel({ x: pos.x, y: pos.y, w: 0, h: 0 });
    setDrawing(true);
  };
  const onMouseMove = (e) => {
    if (!drawing) return;
    const pos = getRelPos(e, overlayRef.current);
    setSel({
      x: Math.min(startRef.current.x, pos.x),
      y: Math.min(startRef.current.y, pos.y),
      w: Math.abs(pos.x - startRef.current.x),
      h: Math.abs(pos.y - startRef.current.y),
    });
  };
  const onMouseUp = () => setDrawing(false);

  const applyCrop = () => {
    if (!sel || sel.w < 5 || sel.h < 5) { onClose(); return; }
    const img = imgRef.current;
    const overlay = overlayRef.current;
    const scaleX = img.naturalWidth  / overlay.clientWidth;
    const scaleY = img.naturalHeight / overlay.clientHeight;
    const canvas = canvasRef.current;
    canvas.width  = sel.w * scaleX;
    canvas.height = sel.h * scaleY;
    canvas.getContext('2d').drawImage(
      img,
      sel.x * scaleX, sel.y * scaleY,
      sel.w * scaleX, sel.h * scaleY,
      0, 0, canvas.width, canvas.height,
    );
    onConfirm(canvas.toDataURL('image/png'));
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10200,
      background: 'rgba(0,0,0,0.9)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <p style={{ color: '#fff', fontSize: 13, marginBottom: 10 }}>
        Arrastra para seleccionar el área a recortar
      </p>
      <div ref={overlayRef}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        style={{ position: 'relative', cursor: 'crosshair', maxWidth: '90vw', maxHeight: '70vh', userSelect: 'none' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop"
          draggable={false}
          style={{ display: 'block', maxWidth: '90vw', maxHeight: '70vh', objectFit: 'contain' }}
        />
        {sel && sel.w > 2 && sel.h > 2 && (
          <div style={{
            position: 'absolute',
            left: sel.x, top: sel.y, width: sel.w, height: sel.h,
            border: '2px dashed #f97316',
            background: 'rgba(249,115,22,0.15)',
            pointerEvents: 'none',
          }} />
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={applyCrop} style={{
          padding: '9px 28px', borderRadius: 10, border: 'none',
          background: '#f97316', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}>Aplicar recorte</button>
        <button onClick={onClose} style={{
          padding: '9px 28px', borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
          color: '#fff', fontSize: 14, cursor: 'pointer',
        }}>Cancelar</button>
      </div>
    </div>
  );
}

function GaleriaTablas({ onSelect, onClose }) {
  const [busqueda, setBusqueda] = useState('');
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10100,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{
        background: '#2a2a2a', borderRadius: 14, width: '100%', maxWidth: 480,
        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
      }}>
        <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 12px', textAlign: 'center' }}>
            Selecciona una imagen:
          </h3>
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar imagen..."
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              background: '#444', border: 'none', borderRadius: 8,
              padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none',
            }}
          />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtradas.length === 0
            ? <p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', padding: 20, textAlign: 'center', margin: 0 }}>Sin resultados.</p>
            : filtradas.map((t, i) => (
                <button key={i} onClick={() => onSelect(`${TABLAS_URL}/${t.file}`)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px 20px',
                    background: 'transparent', border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    color: '#fff', fontSize: 14, cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {t.id}
                </button>
              ))
          }
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onClose} style={{
            width: '100%', padding: '11px 0', borderRadius: 10, border: 'none',
            background: '#f97316', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Contexto ──────────────────────────────────────────────────────────────── */
const ReportContext = createContext({
  conclusions: [],
  addConclusion: () => {},
  removeConclusion: () => {},
});

/* ─── Mapa de overlays → rutas públicas (/AuditivaImg/...) ───────────────────── */
const OVERLAYS_AUDITIVA = {
  indemne:                              '/AuditivaImg/AU_Gris_BASE.png',
  alterada:                             '/AuditivaImg/AU_Gris_BASE.png',
  base_bilateral_izquierdo:             '/AuditivaImg/AU_I.png',
  base_bilateral_derecho:               '/AuditivaImg/AU_D.png',

  /* INDEMNE */
  derechoindemne:                       '/AuditivaImg/AU_D.png',
  izquierdoindemne:                     '/AuditivaImg/AU_I.png',
  bilateralindemne_izquierdo:           '/AuditivaImg/AU_I.png',
  bilateralindemne_derecho:             '/AuditivaImg/AU_D.png',

  /* ALTERADAS — NIVEL V (colículo inferior) */
  derechocoliculo_inferiorAlterada_leve:      '/AuditivaImg/ViaAfectada/Naranja/AU_Naranja_5.png',
  derechocoliculo_inferiorAlterada_moderado:  '/AuditivaImg/ViaAfectada/Rojo/AU_5.png',
  derechocoliculo_inferiorAlterada_severo:    '/AuditivaImg/ViaAfectada/Marron/AU_Marron_5.png',
  izquierdocoliculo_inferiorAlterada_leve:    '/AuditivaImg/ViaAfectada/Naranja/ViaDerecha/AU_Naranja_5-D.png',
  izquierdocoliculo_inferiorAlterada_moderado:'/AuditivaImg/ViaAfectada/Rojo/ViaDerecha/AU_5-D.png',
  izquierdocoliculo_inferiorAlterada_severo:  '/AuditivaImg/ViaAfectada/Marron/ViaDerecha/AU_Marron_5-D.png',

  /* ALTERADAS — NIVEL IV (lemnisco lateral) */
  derecholemnisco_lateralAlterada_leve:       '/AuditivaImg/ViaAfectada/Naranja/AU_Naranja_4.png',
  derecholemnisco_lateralAlterada_moderado:   '/AuditivaImg/ViaAfectada/Rojo/AU_4.png',
  derecholemnisco_lateralAlterada_severo:     '/AuditivaImg/ViaAfectada/Marron/AU_Marron_4.png',
  izquierdolemnisco_lateralAlterada_leve:     '/AuditivaImg/ViaAfectada/Naranja/ViaDerecha/AU_Naranja_4-D.png',
  izquierdolemnisco_lateralAlterada_moderado: '/AuditivaImg/ViaAfectada/Rojo/ViaDerecha/AU_4-D.png',
  izquierdolemnisco_lateralAlterada_severo:   '/AuditivaImg/ViaAfectada/Marron/ViaDerecha/AU_Marron_4-D.png',

  /* ALTERADAS — NIVEL III (complejo olivar superior + cuerpo trapezoide) */
  derechocompleto_olivar_trapezoideAlterada_leve:       '/AuditivaImg/ViaAfectada/Naranja/AU_Naranja_3.png',
  derechocompleto_olivar_trapezoideAlterada_moderado:   '/AuditivaImg/ViaAfectada/Rojo/AU_3.png',
  derechocompleto_olivar_trapezoideAlterada_severo:     '/AuditivaImg/ViaAfectada/Marron/AU_Marron_3.png',
  izquierdocompleto_olivar_trapezoideAlterada_leve:     '/AuditivaImg/ViaAfectada/Naranja/ViaDerecha/AU_Naranja_3-D.png',
  izquierdocompleto_olivar_trapezoideAlterada_moderado: '/AuditivaImg/ViaAfectada/Rojo/ViaDerecha/AU_3-D.png',
  izquierdocompleto_olivar_trapezoideAlterada_severo:   '/AuditivaImg/ViaAfectada/Marron/ViaDerecha/AU_Marron_3-D.png',

  /* ALTERADAS — NIVEL II (núcleo coclear) */
  derechonucleo_coclearAlterada_leve:       '/AuditivaImg/ViaAfectada/Naranja/AU_Naranja_2.png',
  derechonucleo_coclearAlterada_moderado:   '/AuditivaImg/ViaAfectada/Rojo/AU_2.png',
  derechonucleo_coclearAlterada_severo:     '/AuditivaImg/ViaAfectada/Marron/AU_Marron_2.png',
  izquierdonucleo_coclearAlterada_leve:     '/AuditivaImg/ViaAfectada/Naranja/ViaDerecha/AU_Naranja_2-D.png',
  izquierdonucleo_coclearAlterada_moderado: '/AuditivaImg/ViaAfectada/Rojo/ViaDerecha/AU_2-D.png',
  izquierdonucleo_coclearAlterada_severo:   '/AuditivaImg/ViaAfectada/Marron/ViaDerecha/AU_Marron_2-D.png',

  /* ALTERADAS — NIVEL I (nervio auditivo) */
  derechonervio_auditivoAlterada_leve:       '/AuditivaImg/ViaAfectada/Naranja/AU_Naranja_1.png',
  derechonervio_auditivoAlterada_moderado:   '/AuditivaImg/ViaAfectada/Rojo/AU_1.png',
  derechonervio_auditivoAlterada_severo:     '/AuditivaImg/ViaAfectada/Marron/AU_Marron_1.png',
  izquierdonervio_auditivoAlterada_leve:     '/AuditivaImg/ViaAfectada/Naranja/ViaDerecha/AU_Naranja_1-D.png',
  izquierdonervio_auditivoAlterada_moderado: '/AuditivaImg/ViaAfectada/Rojo/ViaDerecha/AU_1-D.png',
  izquierdonervio_auditivoAlterada_severo:   '/AuditivaImg/ViaAfectada/Marron/ViaDerecha/AU_Marron_1-D.png',
};

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
const limpiarTextoReporte = (s) => {
  if (!s) return '';
  let t = s.replace(/\s+/g, ' ').trim();
  t = t.replace(/\s*([,;:.])\s*/g, '$1 ');
  t = t.toLowerCase();
  t = t.replace(/(^\s*[a-záéíóúñ])|([.!?]\s+[a-záéíóúñ])/g, m => m.toUpperCase());
  t = t.replace(/\s+([,.:;])/g, ' $1').replace(/\s+([,.])$/g, '$1').replace(/\s+$/, '');
  t = t.replace(/([.!?])\s*([.!?])+$/, '$1');
  if (!/[.!?]$/.test(t)) t += '.';
  return t;
};

/* ─── Componentes de UI de los pasos ───────────────────────────────────────── */
function ConclusionBtn({ value, title, label, onPress }) {
  const { addConclusion } = useContext(ReportContext);
  return (
    <button
      className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white text-sm font-medium transition-all"
      onClick={() => { addConclusion({ value, title }); onPress?.(); }}
    >
      {label}
    </button>
  );
}

function NavRow({ onBack, onReset, onPdf }) {
  return (
    <div className="flex gap-2 mb-3">
      <button onClick={onBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar
      </button>
      <button onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-white text-xs transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
      </button>
      {onPdf && (
        <button onClick={onPdf}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          PDF
        </button>
      )}
    </div>
  );
}

function SkipButton({ onPress, label = 'Saltar →' }) {
  return (
    <button onClick={onPress}
      className="w-full mt-2 px-4 py-2 rounded-lg border border-dashed border-white/20 text-slate-400 text-xs hover:border-white/40 hover:text-white transition-colors">
      {label}
    </button>
  );
}

function StepTitle({ children }) {
  return (
    <p className="text-orange-400 text-xs font-bold tracking-widest mb-3 mt-1 uppercase">
      {children}
    </p>
  );
}

/* ─── PASOS ─────────────────────────────────────────────────────────────────── */
function StepA({ goTo, setRootFlow, setSeverity, addOverlay, addOverlays }) {
  return (
    <div>
      <StepTitle>Vía Auditiva</StepTitle>
      <ConclusionBtn value="indemne" title="Vía auditiva con integridad funcional " label="INDEMNE"
        onPress={() => { setRootFlow('indemne'); setSeverity(null); goTo('E2'); }} />
      <ConclusionBtn value="alterada" title="Vía auditiva con defecto " label="ALTERADA"
        onPress={() => {
          setRootFlow('alterada'); setSeverity(null);
          addOverlays(['alterada', 'base_bilateral_izquierdo', 'base_bilateral_derecho']);
          goTo('B');
        }} />
    </div>
  );
}

function StepB({ goTo, removeConclusion, setSeverity, setRootFlow, removeLastOverlayGroup, setStep, resetAll, addConclusion }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['indemne','alterada','retardo_en_la_conduccion','bloqueo_en_la_conduccion','deficit_neuronal','sin_respuesta']
            .forEach(removeConclusion);
          setSeverity(null); setRootFlow(null);
          removeLastOverlayGroup();
          setStep('A');
        }}
        onReset={resetAll}
      />
      <StepTitle>Fisiopatología</StepTitle>
      <ConclusionBtn value="retardo_en_la_conduccion" title="Por retardo en la conducción " label="RETARDO EN LA CONDUCCIÓN" onPress={() => goTo('C1')} />
      <ConclusionBtn value="bloqueo_en_la_conduccion" title="Por bloqueo en la conducción " label="BLOQUEO EN LA CONDUCCIÓN" onPress={() => goTo('CB')} />
      <ConclusionBtn value="deficit_neuronal" title="Axonal " label="DÉFICIT AXONAL" onPress={() => goTo('C2')} />
      <ConclusionBtn value="sin_respuesta" title="Por ausencia de respuesta evocable " label="SIN RESPUESTA"
        onPress={() => { setSeverity('severo'); addConclusion({ value: 'severo', title: 'Severo ' }); goTo('E'); }} />
    </div>
  );
}

function StepC1({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { ['leve','moderado','severo'].forEach(removeConclusion); setSeverity(null); setStep('B'); }} onReset={resetAll} />
      <StepTitle>Grado</StepTitle>
      <ConclusionBtn value="leve"     title="Leve "     label="LEVE"     onPress={() => { setSeverity('leve');     goTo('D1'); }} />
      <ConclusionBtn value="moderado" title="Moderado " label="MODERADO" onPress={() => { setSeverity('moderado'); goTo('D1'); }} />
      <ConclusionBtn value="severo"   title="Severo "   label="SEVERO"   onPress={() => { setSeverity('severo');   goTo('D1'); }} />
    </div>
  );
}


function StepCB({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { ['leve','moderado','severo'].forEach(removeConclusion); setSeverity(null); setStep('B'); }} onReset={resetAll} />
      <StepTitle>Grado</StepTitle>
      <ConclusionBtn value="leve"     title="Leve "     label="LEVE"     onPress={() => { setSeverity('leve');     goTo('E'); }} />
      <ConclusionBtn value="moderado" title="Moderado " label="MODERADO" onPress={() => { setSeverity('moderado'); goTo('E'); }} />
      <ConclusionBtn value="severo"   title="Severo "   label="SEVERO"   onPress={() => { setSeverity('severo');   goTo('E'); }} />
    </div>
  );
}

function StepC2({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { ['leve','moderado','severo'].forEach(removeConclusion); setSeverity(null); setStep('B'); }} onReset={resetAll} />
      <StepTitle>Grado</StepTitle>
      <ConclusionBtn value="leve"     title="Leve "     label="LEVE"     onPress={() => { setSeverity('leve');     goTo('D2'); }} />
      <ConclusionBtn value="moderado" title="Moderado " label="MODERADO" onPress={() => { setSeverity('moderado'); goTo('D2'); }} />
      <ConclusionBtn value="severo"   title="Severo "   label="SEVERO"   onPress={() => { setSeverity('severo');   goTo('D2'); }} />
    </div>
  );
}

function StepD1({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['indemne','alterada','retardo_en_la_conduccion','bloqueo_en_la_conduccion','deficit_neuronal','sin_respuesta','perdida_axonal_secundaria']
            .forEach(removeConclusion);
          setSeverity(null); setStep('C1');
        }}
        onReset={resetAll}
      />
      <StepTitle>Retardo en conducción</StepTitle>
      <ConclusionBtn value="perdida_axonal_secundaria" title=" y pérdida axonal secundaria " label="+ PÉRDIDA AXONAL" onPress={() => goTo('E')} />
      <SkipButton onPress={() => goTo('E')} />
    </div>
  );
}

function StepD2({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['indemne','alterada','retardo_en_la_conduccion','bloqueo_en_la_conduccion','deficit_neuronal','sin_respuesta','retardo_secundario_en_la_conduccion']
            .forEach(removeConclusion);
          setSeverity(null); setStep('C2');
        }}
        onReset={resetAll}
      />
      <StepTitle>Axonal</StepTitle>
      <ConclusionBtn value="retardo_secundario_en_la_conduccion" title="y retardo secundario en la conducción " label="+ RETARDO EN LA CONDUCCIÓN" onPress={() => goTo('E')} />
      <SkipButton onPress={() => goTo('E')} />
    </div>
  );
}

function StepE({ goTo, removeConclusion, setSeverity, setStep, resetAll, rootFlow, severity, setSide, conclusions }) {
  const isSinRespuesta = conclusions.some(c => c.value === 'sin_respuesta');
  const nextStep = isSinRespuesta ? 'H' : 'F';
  return (
    <div>
      <NavRow
        onBack={() => {
          ['izquierdo','derecho','bilateral']
            .forEach(removeConclusion);
          setStep('D1');
        }}
        onReset={resetAll}
      />
      <StepTitle>Lado</StepTitle>
      <ConclusionBtn value="izquierdo" title="Para lado izquierdo " label="IZQUIERDO" onPress={() => { setSide('izquierdo'); goTo(nextStep); }} />
      <ConclusionBtn value="derecho"   title="Para lado derecho "   label="DERECHO"   onPress={() => { setSide('derecho');   goTo(nextStep); }} />
      <ConclusionBtn value="bilateral" title="De forma bilateral,"  label="BILATERAL"  onPress={() => { setSide('bilateral'); goTo(nextStep); }} />
      {rootFlow === 'alterada' && severity && (
        <p className="text-white/50 text-center text-xs mt-2">Grado: {severity.toUpperCase()}</p>
      )}
    </div>
  );
}

function StepE2({ removeConclusion, setStep, resetAll, side, setSide, goTo, addOverlays }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['indemne','izquierdoindemne','derechoindemne','bilateralindemne',
           'bilateralindemne_izquierdo','bilateralindemne_derecho']
            .forEach(v => removeConclusion(v));
          setStep('A');
        }}
        onReset={resetAll}
      />
      <StepTitle>Lado</StepTitle>
      <ConclusionBtn value="izquierdoindemne" title="Para lado izquierdo a través del tallo cerebral." label="IZQUIERDO" onPress={() => { setSide('izquierdo'); addOverlays(['izquierdoindemne']); goTo('J2'); }} />
      <ConclusionBtn value="derechoindemne"   title="Para lado derecho a través del tallo cerebral."   label="DERECHO"   onPress={() => { setSide('derecho');   addOverlays(['derechoindemne']); goTo('J2'); }} />
      <ConclusionBtn value="bilateralindemne" title="De forma bilateral a través del tallo cerebral."  label="BILATERAL"  onPress={() => { setSide('bilateral'); addOverlays(['bilateralindemne_izquierdo','bilateralindemne_derecho']); goTo('J2'); }} />
    </div>
  );
}

function StepF({ goTo, removeConclusion, setStep, resetAll, side, rootFlow, severity, addOverlays, expandOverlay }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['rostral','caudal','tallo_cerebral','izquierdo','derecho','bilateral']
            .forEach(v => v && removeConclusion(v));
          setStep('E');
        }}
        onReset={resetAll}
      />
      <StepTitle>Región</StepTitle>
      <ConclusionBtn value="rostral"        title=" A través de región rostral del tallo cerebral"  label="ROSTRAL (III-V)"  onPress={() => goTo('G')} />
      <ConclusionBtn value="caudal"         title=" A través de región caudal del tallo cerebral"   label="CAUDAL (I-III)"   onPress={() => goTo('G')} />
      <ConclusionBtn value="tallo_cerebral" title=" A través del tallo cerebral"                    label="TOTAL (I-V)"      onPress={() => goTo('G')} />
      {rootFlow === 'alterada' && severity && (
        <p className="text-white/50 text-center text-xs mt-2">Grado: {severity.toUpperCase()}</p>
      )}
    </div>
  );
}

function StepF2({ goTo, removeConclusion, setStep, resetAll, side, addOverlays, expandOverlay }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['rostral','caudal','tallo_cerebral','izquierdo','derecho','bilateral']
            .forEach(v => v && removeConclusion(v));
          setStep('E2');
        }}
        onReset={resetAll}
      />
      <StepTitle>Región</StepTitle>
      <ConclusionBtn value="rostral"        title="Topográficamente en región rostral (III-V),"   label="ROSTRAL (III-V)"       onPress={() => goTo('H')} />
      <ConclusionBtn value="caudal"         title="Topográficamente en región caudal (I-III),"    label="CAUDAL (I-III)"        onPress={() => goTo('H')} />
      <ConclusionBtn value="tallo_cerebral" title="Topográficamente en tallo cerebral (I-V),"     label="TALLO CEREBRAL (I-V)"  onPress={() => goTo('H')} />
    </div>
  );
}

function StepG({ goTo, removeConclusion, setStep, resetAll, side, addOverlays, expandOverlay, conclusions, addConclusion }) {
  const ALL_LEVELS = [
    { key: 'nervio_auditivo',            title: '; topográficamente a nivel de nervio auditivo.',                                label: 'NERVIO AUDITIVO (I)' },
    { key: 'nucleo_coclear',             title: '; topográficamente a nivel de núcleo coclear.',                                 label: 'NÚCLEO COCLEAR (II)' },
    { key: 'completo_olivar_trapezoide', title: '; topográficamente a nivel de complejo olivar superior y cuerpo trapezoide.',  label: 'COMPLEJO OLIVAR SUP. Y CUERPO TRAPEZOIDE (III)' },
    { key: 'lemnisco_lateral',           title: '; topográficamente a nivel de lemnisco lateral.',                              label: 'LEMNISCO LATERAL (IV)' },
    { key: 'coliculo_inferior',          title: '; topográficamente a nivel de colículo inferior.',                             label: 'COLÍCULO INFERIOR (V)' },
  ];

  const handlePress = (idx) => {
    ALL_LEVELS.forEach(lvl => removeConclusion(`${side}${lvl.key}`));
    const cascadeOverlays = [];
    for (let i = idx; i < ALL_LEVELS.length; i++) {
      const lvl = ALL_LEVELS[i];
      addConclusion({ value: `${side}${lvl.key}`, title: i === idx ? lvl.title : '' });
      expandOverlay(lvl.key).forEach(k => { if (!cascadeOverlays.includes(k)) cascadeOverlays.push(k); });
    }
    addOverlays(cascadeOverlays);
    goTo('H');
  };

  return (
    <div>
      <NavRow
        onBack={() => {
          ALL_LEVELS.forEach(lvl => removeConclusion(`${side}${lvl.key}`));
          ['rostral','caudal','tallo_cerebral'].forEach(v => removeConclusion(v));
          setStep('F');
        }}
        onReset={resetAll}
      />
      <StepTitle>Nivel</StepTitle>
      {ALL_LEVELS.map((lvl, idx) => (
        <button
          key={lvl.key}
          className="w-full text-left px-4 py-2.5 mb-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white text-sm font-medium transition-all"
          onClick={() => handlePress(idx)}
        >
          {lvl.label}
        </button>
      ))}
    </div>
  );
}

function StepH({ goTo, removeConclusion, setStep, resetAll, conclusions }) {
  const isSinRespuesta = conclusions.some(c => c.value === 'sin_respuesta');
  return (
    <div>
      <NavRow
        onBack={() => {
          ['normoacusia','hipoacusia_leve','hipoacusia_moderada','hipoacusia_severa','hipocusia_profunda']
            .forEach(v => removeConclusion(v));
          setStep(isSinRespuesta ? 'E' : 'G');
        }}
        onReset={resetAll}
      />
      <StepTitle>Umbral auditivo</StepTitle>
      <ConclusionBtn value="normoacusia"         title={'\n\nUmbral para tonos altos compatible con normoacusia'}         label="NORMOACUSIA"        onPress={() => goTo('I')} />
      <ConclusionBtn value="hipoacusia_leve"     title={'\n\nUmbral para tonos altos compatible con hipoacusia leve'}     label="HIPOACUSIA LEVE"    onPress={() => goTo('I')} />
      <ConclusionBtn value="hipoacusia_moderada" title={'\n\nUmbral para tonos altos compatible con hipoacusia moderada'} label="HIPOACUSIA MODERADA" onPress={() => goTo('I')} />
      <ConclusionBtn value="hipoacusia_severa"   title={'\n\nUmbral para tonos altos compatible con hipoacusia severa'}   label="HIPOACUSIA SEVERA"  onPress={() => goTo('I')} />
      <ConclusionBtn value="hipocusia_profunda"  title={'\n\nUmbral para tonos altos compatible con hipoacusia profunda'} label="HIPOACUSIA PROFUNDA" onPress={() => goTo('I')} />
    </div>
  );
}

function StepI({ goTo, removeConclusion, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          ['neurosensorial','conductiva'].forEach(v => removeConclusion(v));
          setStep('H');
        }}
        onReset={resetAll}
      />
      <StepTitle>Tipo</StepTitle>
      <ConclusionBtn value="neurosensorial" title=" De tipo neurosensorial." label="NEUROSENSORIAL" onPress={() => goTo('J')} />
      <ConclusionBtn value="conductiva"     title=" De tipo conductiva."     label="CONDUCTIVA"     onPress={() => goTo('J')} />
    </div>
  );
}

/* ─── Componente principal ─────────────────────────────────────────────────── */
export default function ReportFace() {
  const { data: session } = useSession();
  const router = useRouter();

  /* ── Conclusiones ── */
  const [conclusions, setConclusions] = useState([]);
  const addConclusion    = useCallback((c) =>
    setConclusions(p => p.some(x => x.value === c.value) ? p : [...p, c]), []);
  const removeConclusion = useCallback((value) =>
    setConclusions(p => p.filter(x => x.value !== value)), []);

  /* ── Navegación ── */
  const [step, setStep]   = useState('A');
  const [history, setHist] = useState(['A']);

  const goTo = useCallback((n) => { setHist(p => [...p, n]); setStep(n); }, []);

  const goBack = useCallback(() => {
    if (history.length <= 1) return;
    const nh = history.slice(0, -1);
    setHist(nh); setStep(nh[nh.length - 1]);
    const last = conclusions[conclusions.length - 1];
    if (last) removeConclusion(last.value);
    removeLastOverlayGroup();
  }, [history, conclusions, removeConclusion]); // eslint-disable-line

  /* ── Overlays ── */
  const [rootFlow, setRootFlow] = useState(null);
  const [activeOv, setActiveOv] = useState([]);
  const [, setOvHist]           = useState([]);

  const addOverlays = useCallback((ids) => {
    setActiveOv(p => [...p, ...ids.filter(i => !p.includes(i))]);
    setOvHist(h => [...h, ids]);
  }, []);
  const addOverlay = useCallback((id) => addOverlays([id]), [addOverlays]);

  const removeLastOverlayGroup = useCallback(() =>
    setOvHist(h => {
      if (!h.length) return h;
      const last = h[h.length - 1];
      setActiveOv(p => p.filter(k => !last.includes(k)));
      return h.slice(0, -1);
    }), []);

  const resetOverlays = useCallback(() => { setActiveOv([]); setOvHist([]); }, []);

  /* ── Severidad / lado ── */
  const [severity, setSeverity] = useState(null);
  const [side, setSide]         = useState('');

  /* ── Tab footer ── */
  const [activeTab, setActiveTab] = useState('reporte');

  /* ── Nombre paciente ── */
  const [nombrePaciente, setNombrePaciente] = useState('');

  /* ── Lista: imagen galería + comentario ── */
  const [imgLista, setImgLista]               = useState(null);
  const [comentarioLista, setComentarioLista] = useState('');
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [showGaleria, setShowGaleria] = useState(false);
  const [comentarioTemp, setComentarioTemp]   = useState('');

  /* ── Figuras sobre la lámina (tab Reporte, paso H) ── */
  const [figuras, setFiguras] = useState([]);
  const [pdfOpen, setPdfOpen] = useState(false);
  const laminaRef = useRef(null);

  /* Crop modal */
  const [cropState, setCropState] = useState(null);

  const agregarFigura = useCallback((tipo, src) => {
    const SIZE = 80;
    const rect = laminaRef.current?.getBoundingClientRect();
    const cx = rect ? (rect.width  / 2 - SIZE / 2) : 60;
    const cy = rect ? (rect.height / 2 - SIZE / 2) : 60;
    setFiguras(p => [...p, { id: Date.now() + Math.random(), src, tipo, x: cx, y: cy }]);
  }, []);
  const eliminarFigura = useCallback((id) => setFiguras(p => p.filter(f => f.id !== id)), []);
  const moverFigura    = useCallback((id, x, y) =>
    setFiguras(p => p.map(f => f.id === id ? { ...f, x, y } : f)), []);

  const dragRef = useState(() => ({ active: null, startX: 0, startY: 0, origX: 0, origY: 0 }))[0];

  const onFiguraMouseDown = useCallback((e, figura) => {
    e.preventDefault();
    dragRef.active = figura.id;
    dragRef.startX = e.clientX;
    dragRef.startY = e.clientY;
    dragRef.origX  = figura.x;
    dragRef.origY  = figura.y;

    const onMove = (ev) => {
      if (!dragRef.active) return;
      const dx = ev.clientX - dragRef.startX;
      const dy = ev.clientY - dragRef.startY;
      const canvas = laminaRef.current;
      const maxX = canvas ? canvas.clientWidth  - 80 : 9999;
      const maxY = canvas ? canvas.clientHeight - 80 : 9999;
      moverFigura(dragRef.active,
        Math.max(0, Math.min(dragRef.origX + dx, maxX)),
        Math.max(0, Math.min(dragRef.origY + dy, maxY)),
      );
    };
    const onUp = () => {
      dragRef.active = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [dragRef, moverFigura, laminaRef]);

  /* ── expandOverlay para Auditiva ── */
  const expandOverlay = useCallback((raw) => {
    // Para indemne: usa claves como 'derechoindemne', 'izquierdoindemne', 'bilateralindemne_izquierdo/derecho'
    if (rootFlow === 'indemne') {
      if (raw === 'indemne') return ['indemne'];
      if (side === 'derecho')   return OVERLAYS_AUDITIVA['derechoindemne']   ? ['derechoindemne']   : [];
      if (side === 'izquierdo') return OVERLAYS_AUDITIVA['izquierdoindemne'] ? ['izquierdoindemne'] : [];
      if (side === 'bilateral') {
        const out = [];
        if (OVERLAYS_AUDITIVA['bilateralindemne_izquierdo']) out.push('bilateralindemne_izquierdo');
        if (OVERLAYS_AUDITIVA['bilateralindemne_derecho'])   out.push('bilateralindemne_derecho');
        return out;
      }
      return [];
    }

    // Para alterada con nivel: usa `${side}${nivel}Alterada_${severity}`
    if (rootFlow === 'alterada') {
      const nivel = raw; // e.g. 'coliculo_inferior'
      if (side === 'bilateral') {
        const out = [];
        const izqKey = `izquierdo${nivel}Alterada_${severity}`;
        const derKey = `derecho${nivel}Alterada_${severity}`;
        if (OVERLAYS_AUDITIVA[izqKey]) out.push(izqKey);
        if (OVERLAYS_AUDITIVA[derKey]) out.push(derKey);
        return out;
      }
      if (side === 'izquierdo' || side === 'derecho') {
        const key = `${side}${nivel}Alterada_${severity}`;
        return OVERLAYS_AUDITIVA[key] ? [key] : [];
      }
    }

    return OVERLAYS_AUDITIVA[raw] ? [raw] : [];
  }, [rootFlow, severity, side]);

  /* ── Reset total ── */
  const resetAll = useCallback(() => {
    setConclusions([]); setHist(['A']); setStep('A');
    setRootFlow(null); setSide(''); resetOverlays();
    setNombrePaciente(''); setSeverity(null); setActiveTab('reporte');
    setFiguras([]); setImgLista(null); setComentarioLista('');
    setTextoEditado(''); setEditadoManual(false);
  }, [resetOverlays]);

  /* ── Texto reporte editable ── */
  const [textoEditado, setTextoEditado] = useState('');
  const [editadoManual, setEditadoManual] = useState(false);

  /* ── Texto reporte ── */
  const textoReporte = useMemo(() => {
    const vals = new Set(conclusions.map(c => c.value));

    if (vals.has('sin_respuesta')) {
      const ladoMap = { izquierdo: 'para lado izquierdo', derecho: 'para lado derecho', bilateral: 'de forma bilateral' };
      const ladoVal = ['izquierdo','derecho','bilateral'].find(l => vals.has(l)) ?? '';
      const umbralConc = conclusions.find(c =>
        c.value === 'normoacusia' || c.value.startsWith('hipoacusia') || c.value === 'hipocusia_profunda'
      );
      const tipoConc = conclusions.find(c => c.value === 'neurosensorial' || c.value === 'conductiva');

      let linea1;
      if (ladoVal) {
        linea1 = limpiarTextoReporte(`Vía auditiva con defecto severo por ausencia de respuesta evocable ${ladoMap[ladoVal]} a través del tallo cerebral.`);
      } else {
        linea1 = limpiarTextoReporte('Vía auditiva con defecto severo por ausencia de respuesta evocable.');
      }

      let linea2 = '';
      if (umbralConc) {
        const umbralText = umbralConc.title.replace(/^\n+/, '').trim();
        const tipoText = tipoConc ? tipoConc.title.trim() : '';
        linea2 = limpiarTextoReporte(`${umbralText}${tipoText ? ` ${tipoText}` : '.'}`);
      }

      return linea2 ? `${linea1}\n\n${linea2}` : linea1;
    }

    const crudo = conclusions
      .filter(c => (c.title || '').trim() !== '')
      .map(c => c.title)
      .join(' ');

    // Split on \n\n to preserve two-paragraph structure (e.g. umbral titles)
    const parts = crudo.split('\n\n');
    if (parts.length > 1) {
      return parts.map(p => limpiarTextoReporte(p.trim())).filter(Boolean).join('\n\n');
    }
    return limpiarTextoReporte(crudo);
  }, [conclusions]);

  useEffect(() => {
    if (!editadoManual) setTextoEditado(textoReporte);
  }, [textoReporte, editadoManual]);

  const textoFinal = editadoManual ? textoEditado : textoReporte;

  /* ── Lista auditiva ── */
  const listaVisual = useMemo(() => {
    const vals = new Set(conclusions.map(c => c.value));
    const lines = [];

    const via = vals.has('alterada') ? 'Afectada' : vals.has('indemne') ? 'Indemne' : '';
    if (via) lines.push({ k: 'Vía Auditiva', v: via });

    let fisio = '';
    if (vals.has('retardo_en_la_conduccion')) {
      fisio = 'Retardo en la conducción';
      if (vals.has('perdida_axonal_secundaria')) fisio += ' con pérdida axonal secundaria';
    } else if (vals.has('deficit_neuronal')) {
      fisio = 'Axonal';
      if (vals.has('retardo_secundario_en_la_conduccion')) fisio += ' con retardo secundario en la conducción';
    } else if (vals.has('bloqueo_en_la_conduccion')) {
      fisio = 'Bloqueo en la conducción';
    } else if (vals.has('sin_respuesta')) {
      fisio = 'Sin respuesta evocable';
    }
    if (fisio) lines.push({ k: 'Fisiopatología', v: fisio });

    const grado = vals.has('severo') ? 'Severo' : vals.has('moderado') ? 'Moderado' : vals.has('leve') ? 'Leve' : '';
    if (grado) lines.push({ k: 'Grado', v: grado });

    const sideMap = { izquierdo: 'Izquierdo', derecho: 'Derecho', bilateral: 'Bilateral' };
    const lado = side ? sideMap[side] :
      (vals.has('izquierdo') || vals.has('izquierdoindemne')) ? 'Izquierdo' :
      (vals.has('derecho')   || vals.has('derechoindemne'))   ? 'Derecho' :
      (vals.has('bilateral') || vals.has('bilateralindemne')) ? 'Bilateral' : '';
    if (lado) lines.push({ k: 'Lado', v: lado });

    const regionMap = { rostral: 'Rostral (III-V)', caudal: 'Caudal (I-III)', tallo_cerebral: 'Total (I-V)' };
    const region = ['rostral','caudal','tallo_cerebral'].find(r => vals.has(r));
    if (region) lines.push({ k: 'Región', v: regionMap[region] });

    const NIVEL_KEYS = {
      nervio_auditivo: 'nervio auditivo (I)',
      nucleo_coclear: 'núcleo coclear (II)',
      completo_olivar_trapezoide: 'complejo olivar superior y cuerpo trapezoide (III)',
      lemnisco_lateral: 'lemnisco lateral (IV)',
      coliculo_inferior: 'colículo inferior (V)',
    };
    const nivelConc = conclusions.find(c =>
      /nervio_auditivo|nucleo_coclear|completo_olivar_trapezoide|lemnisco_lateral|coliculo_inferior/.test(c.value) &&
      (c.title || '').trim() !== ''
    );
    if (nivelConc) {
      const nivelKey = nivelConc.value.replace(/^(izquierdo|derecho|bilateral)/, '');
      const nivelLabel = NIVEL_KEYS[nivelKey];
      if (nivelLabel) lines.push({ k: 'Nivel', v: `Topográficamente a nivel de ${nivelLabel}` });
    }

    const umbralMap = {
      normoacusia: 'Normoacusia',
      hipoacusia_leve: 'Hipoacusia leve',
      hipoacusia_moderada: 'Hipoacusia moderada',
      hipoacusia_severa: 'Hipoacusia severa',
      hipocusia_profunda: 'Hipoacusia profunda',
    };
    const umbral = Object.keys(umbralMap).find(k => vals.has(k));
    if (umbral) lines.push({ k: 'Umbral auditivo', v: umbralMap[umbral] });

    const tipo = vals.has('neurosensorial') ? 'Neurosensorial' : vals.has('conductiva') ? 'Conductiva' : '';
    if (tipo) lines.push({ k: 'Tipo', v: tipo });

    return lines;
  }, [conclusions, side]);

  /* ── Props comunes a todos los pasos ── */
  const sp = {
    goTo, setStep, removeConclusion, setSeverity, setSide, setRootFlow,
    removeLastOverlayGroup, resetAll, addOverlay, addOverlays, expandOverlay,
    rootFlow, severity, side, conclusions, addConclusion,
  };

  /* ── Paso final (J / J2) ── */
  const renderFinal = (fromIndemne = false) => (
    <div>
      <NavRow
        onBack={() => {
          if (fromIndemne) {
            ['neurosensorial','conductiva'].forEach(removeConclusion);
            setStep('E2');
          } else {
            ['neurosensorial','conductiva'].forEach(removeConclusion);
            setStep('I');
          }
        }}
        onReset={resetAll}
        onPdf={() => setPdfOpen(true)}
      />

      <ExportBar
        nombrePaciente={nombrePaciente}
        textoReporte={textoFinal}
        activeOv={activeOv}
        figuras={figuras}
        laminaSize={{ w: laminaRef.current?.clientWidth || 690, h: laminaRef.current?.clientHeight || 620 }}
        listaVisual={listaVisual}
        imgLista={imgLista}
        comentarioLista={comentarioLista}
        onBack={goBack}
        onReset={resetAll}
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />

      {/* Tab Reporte: cargar figuras sobre la lámina */}
      {activeTab === 'reporte' && (
        <>
          <StepTitle>Agrega figuras al reporte (imagen)</StepTitle>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width:52, height:52, borderRadius:'50%', border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('circle',URL.createObjectURL(f))); e.target.value=''; }} />
            </label>
            <label style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, padding:'14px 8px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width:52, height:52, borderRadius:4, border:'2px solid #f97316', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => { Array.from(e.target.files||[]).forEach(f=>agregarFigura('square',URL.createObjectURL(f))); e.target.value=''; }} />
            </label>
          </div>
          {figuras.length > 0 && (
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, margin: '4px 0 12px', fontStyle: 'italic' }}>
              {figuras.length} figura{figuras.length > 1 ? 's' : ''} en la lámina
            </p>
          )}
        </>
      )}

      {/* Tab Lista: imagen de tabla + comentario */}
      {activeTab === 'lista' && (
        <>
          <StepTitle>Imagen de tabla</StepTitle>
          <button onClick={() => setShowGaleria(true)} style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: '18px 12px', borderRadius: 10, cursor: 'pointer', marginBottom: 12,
            background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)',
          }}>
            {imgLista
              ? <img src={imgLista.src} alt="tabla" style={{ width: '100%', maxHeight: 100, objectFit: 'contain', borderRadius: 6 }} />
              : <>
                  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18" />
                  </svg>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Sin imagen seleccionada</span>
                </>
            }
          </button>
          {imgLista && (
            <button onClick={() => setImgLista(null)} style={{
              width: '100%', padding: '5px 0', borderRadius: 8, marginBottom: 10,
              background: 'transparent', border: '1px solid rgba(239,68,68,0.4)',
              color: '#ef4444', fontSize: 12, cursor: 'pointer',
            }}>Quitar imagen</button>
          )}
          <button onClick={() => { setComentarioTemp(comentarioLista); setShowComentarioModal(true); }} style={{
            width: '100%', padding: '10px 0', borderRadius: 10,
            background: '#f97316', border: 'none', cursor: 'pointer',
            color: '#fff', fontWeight: 700, fontSize: 14,
          }}>
            {comentarioLista ? 'Editar Comentario' : 'Agregar Comentario'}
          </button>
          {comentarioLista && (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontStyle: 'italic', marginTop: 8 }}>
              {comentarioLista.length > 100 ? comentarioLista.slice(0, 100) + '…' : comentarioLista}
            </p>
          )}
        </>
      )}
    </div>
  );

  /* ── Dispatcher ── */
  const renderStep = () => {
    switch (step) {
      case 'A':   return <StepA  {...sp} />;
      case 'B':   return <StepB  {...sp} />;
      case 'C1':  return <StepC1 {...sp} />;
      case 'CB':  return <StepCB {...sp} />;
      case 'C2':  return <StepC2 {...sp} />;
      case 'D1':  return <StepD1 {...sp} />;
      case 'D2':  return <StepD2 {...sp} />;
      case 'E':   return <StepE  {...sp} />;
      case 'E2':  return <StepE2 {...sp} />;
      case 'F':   return <StepF  {...sp} />;
      case 'F2':  return <StepF2 {...sp} />;
      case 'G':   return <StepG  {...sp} />;
      case 'H':   return <StepH  {...sp} />;
      case 'I':   return <StepI  {...sp} />;
      case 'J2':  return renderFinal(true);
      case 'J':   return renderFinal(false);
      default: return null;
    }
  };

  /* ── Indicador de paso ── */
  const STEP_LABELS = {
    A: 'Vía Auditiva', B: 'Fisiopatología', C1: 'Grado', CB: 'Grado', C2: 'Grado',
    D1: 'Retardo', D2: 'Axonal', E: 'Lado', E2: 'Lado',
    F: 'Región', F2: 'Región', G: 'Nivel', H: 'Umbral Auditivo',
    I: 'Tipo', J: 'Informe', J2: 'Informe',
  };

  return (
    <ReportContext.Provider value={{ conclusions, addConclusion, removeConclusion }}>

      {/* ══ MODAL FULLSCREEN ══ */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflowY: 'auto',
      }}>

        {/* ── Barra superior ── */}
        <div style={{
          flexShrink: 0, width: '100%', height: 52,
          background: '#111',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '0 20px', boxSizing: 'border-box',
        }}>
          {/* Izquierda: botón Regresar */}
          <div>
            <button
              onClick={() => router.push('/Reporte')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 500,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Regresar
            </button>
          </div>

          {/* Centro: input paciente */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type="text"
              value={nombrePaciente}
              onChange={e => setNombrePaciente(e.target.value)}
              placeholder="Nombre del paciente"
              style={{
                width: 580, background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7,
                padding: '6px 14px', color: '#fff', fontSize: 13,
                outline: 'none', boxSizing: 'border-box', textAlign: 'center',
              }}
            />
          </div>

          {/* Derecha: avatar usuario */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {session?.user?.imageUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={session.user.imageUrl} alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain', opacity: 0.85 }} />
            )}
          </div>
        </div>

        {/* ── Zona centrada: menú + lámina + footer ── */}
        <div style={{
          flex: '0 0 auto', width: '100%', maxWidth: 850,
          display: 'flex', flexDirection: 'column',
          padding: '12px 8px 0',
          boxSizing: 'border-box',
        }}>

          {/* Fila: menú + lámina */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'stretch', minHeight: 520 }}>

            {/* ══ MENÚ IZQUIERDO ══ */}
            <div style={{
              width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column',
              background: '#111',
              borderRadius: '10px 0 0 10px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRight: 'none',
              overflowY: 'auto',
            }}>
              <div style={{ flex: 1, padding: '12px 14px 14px', overflowY: 'auto' }}>
                {renderStep()}
              </div>
            </div>

            {/* ══ LÁMINA ══ */}
            <div ref={laminaRef} style={{
              flex: 1, position: 'relative',
              background: '#fff',
              borderRadius: '0 10px 10px 0',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {nombrePaciente && (
                <div style={{
                  position: 'absolute', top: 10, left: 12, zIndex: 10,
                  background: 'rgba(0,0,0,0.45)', color: '#fff',
                  fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 6,
                }}>
                  {nombrePaciente}
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/AuditivaImg/AU_BASE_BLANCO.png"
                alt="Vías auditivas"
                draggable={false}
                style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              {activeOv.map(k => {
                const src = OVERLAYS_AUDITIVA[k];
                if (!src) return null;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" draggable={false}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                  />
                );
              })}
              {/* Figuras superpuestas — arrastrables */}
              {figuras.map(f => (
                <div key={f.id}
                  onMouseDown={(e) => onFiguraMouseDown(e, f)}
                  style={{
                    position: 'absolute', left: f.x, top: f.y, zIndex: 20,
                    width: 80, height: 80,
                    cursor: 'grab', userSelect: 'none',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" draggable={false} style={{
                    width: 80, height: 80, objectFit: 'cover',
                    borderRadius: f.tipo === 'circle' ? '50%' : 0,
                    border: '1.5px solid gray',
                    display: 'block',
                    pointerEvents: 'none',
                  }} />

                  {/* Botón ✕ — arriba derecha */}
                  <button
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => eliminarFigura(f.id)}
                    style={{
                      position: 'absolute', top: -10, right: -10,
                      width: 24, height: 24, borderRadius: '50%',
                      background: 'red', border: 'none', cursor: 'pointer',
                      color: '#fff', fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 22,
                    }}>✕</button>

                  {/* Botón editar (lápiz) — abre crop modal */}
                  <button
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => setCropState({ id: f.id, src: f.src })}
                    style={{
                      position: 'absolute', bottom: -10, left: -10,
                      width: 26, height: 26, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.75)', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 22,
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

          </div>{/* fin fila menú+lámina */}

          {/* ── FOOTER: tabs + conclusión ── */}
          <div style={{
            background: '#111',
            borderRadius: '0 0 10px 10px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: 'none',
            padding: '10px 16px 14px',
            marginBottom: 16,
          }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {[['reporte','Reporte'],['lista','Lista']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{
                  padding: '4px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  background: activeTab === id ? '#f97316' : 'rgba(255,255,255,0.07)',
                  color: activeTab === id ? '#fff' : 'rgba(255,255,255,0.4)',
                }}>
                  {label}
                </button>
              ))}
            </div>
            {/* ── Contenido según tab ── */}
            {activeTab === 'reporte' && (
              textoFinal
                ? <textarea
                    value={textoFinal}
                    onChange={e => { setTextoEditado(e.target.value); setEditadoManual(true); }}
                    rows={4}
                    style={{
                      width: '100%', boxSizing: 'border-box', resize: 'vertical',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8, padding: '7px 10px',
                      color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.55,
                      outline: 'none', fontFamily: 'inherit', marginTop: 4,
                    }}
                  />
                : <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, fontStyle: 'italic', margin: '4px 0 0' }}>
                    Sin conclusiones aún.
                  </p>
            )}
            {activeTab === 'lista' && (
              <div style={{ marginTop: 4 }}>
                {listaVisual.length === 0
                  ? <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, fontStyle: 'italic', margin: 0 }}>Sin conclusiones aún.</p>
                  : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 24px' }}>
                      {listaVisual.map(({ k, v }) => (
                        <p key={k} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: 0 }}>
                          <span style={{ color: '#f97316', fontWeight: 600 }}>{k}:</span> {v}
                        </p>
                      ))}
                    </div>
                }
                {comentarioLista && (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontStyle: 'italic', marginTop: 6 }}>
                    {comentarioLista.length > 100 ? comentarioLista.slice(0, 100) + '…' : comentarioLista}
                  </p>
                )}
              </div>
            )}

            {(session?.user?.name || session?.user?.email) && (
              <div style={{ marginTop: 8, paddingTop: 7, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {session.user.name && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>👤 {session.user.name} {session.user.lastname || ''}</span>}
                {session.user.email && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>✉ {session.user.email}</span>}
                {session.user.cedula && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>№ {session.user.cedula}</span>}
              </div>
            )}
          </div>

        </div>{/* fin zona centrada */}

      </div>

      {/* ══ MODAL CROP ══ */}
      {cropState && (
        <CropModal
          src={cropState.src}
          onConfirm={(croppedUrl) => {
            setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: croppedUrl } : f));
            setCropState(null);
          }}
          onClose={() => setCropState(null)}
        />
      )}

      {/* ══ GALERÍA DE TABLAS ══ */}
      {showGaleria && (
        <GaleriaTablas
          onSelect={(url) => { setImgLista({ src: url, file: null }); setShowGaleria(false); }}
          onClose={() => setShowGaleria(false)}
        />
      )}

      {/* ══ MODAL COMENTARIO ══ */}
      {showComentarioModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 24, width: '100%', maxWidth: 480,
          }}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>Comentario</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '0 0 14px' }}>Se agregará al informe como nota adicional</p>
            <textarea
              value={comentarioTemp}
              onChange={e => setComentarioTemp(e.target.value)}
              rows={5}
              placeholder="Escribe aquí tu comentario..."
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10, padding: '10px 12px', color: '#fff', fontSize: 13,
                resize: 'vertical', outline: 'none', fontFamily: 'inherit',
              }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button
                onClick={() => { setComentarioLista(comentarioTemp); setShowComentarioModal(false); }}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, border: 'none',
                  background: '#f97316', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}
              >Guardar</button>
              <button
                onClick={() => setShowComentarioModal(false)}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
                  color: 'rgba(255,255,255,0.5)', fontSize: 14, cursor: 'pointer',
                }}
              >Cancelar</button>
            </div>
          </div>
        </div>
      )}

    </ReportContext.Provider>
  );
}
