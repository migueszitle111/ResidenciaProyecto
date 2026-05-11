'use client';
/*
 * SomatosensorialNew/ReportFace.jsx
 * Versión web del reporte de Vías Somatosensoriales.
 * Estructura idéntica a VisualNew/ReportFace.jsx con lógica de Somatosensorial.
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

/* ─── Mapa de overlays → rutas públicas (/SomatosensorialImg/...) ──────────── */
const OVERLAYS_SOMATO = {
  /* Indemne base — claves largas (legacy) */
  superiores_indemne_izq:   '/SomatosensorialImg/SUPERIORDERECHA.png',
  superiores_indemne_der:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  inferiores_indemne_izq:   '/SomatosensorialImg/INFERIORDERECHA.png',
  inferiores_indemne_der:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  /* Alias cortos usados por nervios/dermatomas (igual que mobile) */
  superior_izq:  '/SomatosensorialImg/SUPERIORDERECHA.png',
  superior_der:  '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  inferior_izq:  '/SomatosensorialImg/INFERIORDERECHA.png',
  inferior_der:  '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  /* Nervios superiores (todos usan la misma imagen de lado) */
  izquierdo_mediano:                    '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_mediano:                      '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_ulnar:                      '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_ulnar:                        '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_radial_superficial:         '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_radial_superficial:           '/SomatosensorialImg/SUPERIORIZQUIERDA.png',
  izquierdo_antebraqueal_cutaneo_lateral: '/SomatosensorialImg/SUPERIORDERECHA.png',
  derecho_antebraqueal_cutaneo_lateral:   '/SomatosensorialImg/SUPERIORIZQUIERDA.png',

  /* Nervios inferiores */
  izquierdo_tibial:                '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_tibial:                  '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_peroneo:               '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_peroneo:                 '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_peroneo_superficial:   '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_peroneo_superficial:     '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_sural:                 '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_sural:                   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_safeno:                '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_safeno:                  '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_femorocutaneo_lateral: '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_femorocutaneo_lateral:   '/SomatosensorialImg/Izquierda/inferior_izquierda.png',
  izquierdo_pudendo:               '/SomatosensorialImg/INFERIORDERECHA.png',
  derecho_pudendo:                 '/SomatosensorialImg/Izquierda/inferior_izquierda.png',

  /* Bilateral nervios (par izq+der juntos – se usan como 2 claves separadas arriba) */

  /* Alterada base */
  superiores_alterada_izq:  '/SomatosensorialImg/ViaAfectada/ViaDerecha/alteradaderechasuperior.png',
  superiores_alterada_der:  '/SomatosensorialImg/ViaAfectada/alteradaizquierdasuperior.png',
  inferiores_alterada_izq:  '/SomatosensorialImg/ViaAfectada/ViaDerecha/alteradaderechainferior.png',
  inferiores_alterada_der:  '/SomatosensorialImg/ViaAfectada/alteradaizquierdainferior.png',

  /* Alias usados por dermatomas alterada */
  ALT_SUP_IZQ_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9-D.png',
  ALT_SUP_DER_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9.png',
  ALT_SUP_IZQ_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_9-D.png',
  ALT_SUP_DER_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_9.png',
  ALT_SUP_IZQ_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9-D.png',
  ALT_SUP_DER_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9.png',
  ALT_INF_IZQ_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5-D.png',
  ALT_INF_DER_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5.png',
  ALT_INF_IZQ_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_5-D.png',
  ALT_INF_DER_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_5.png',
  ALT_INF_IZQ_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5-D.png',
  ALT_INF_DER_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5.png',

  /* Trigémino indemne */
  trigemino_izquierdo_indemne: '/SomatosensorialImg/TRI_2.png',
  trigemino_derecho_indemne:   '/SomatosensorialImg/TRI_1.png',

  /* Trigémino alterado con severidad */
  izquierdotrigeminoAlterada_leve:     '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Naranja/TRI_Naranja_2.png',
  derechotrigeminoAlterada_leve:       '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Naranja/TRI_Naranja_1.png',
  izquierdotrigeminoAlterada_moderado: '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/TR_2.png',
  derechotrigeminoAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/TR_1.png',
  izquierdotrigeminoAlterada_severo:   '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Marron/TRI_Marron_2.png',
  derechotrigeminoAlterada_severo:     '/SomatosensorialImg/ViaAfectada/SomatosensorialTrigemino/Marron/TRI_Marron_1.png',

  /* ── Superiores topografía con severidad ── */
  /* Cortical */
  izquierdocorticalsAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9-D.png',
  derechocorticalsAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_9.png',
  izquierdocorticalsAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_9-D.png',
  derechocorticalsAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_9.png',
  izquierdocorticalsAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9-D.png',
  derechocorticalsAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_9.png',
  /* Subcortical */
  izquierdosubcorticalsAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_8-D.png',
  derechosubcorticalsAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_8.png',
  izquierdosubcorticalsAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_8-D.png',
  derechosubcorticalsAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_8.png',
  izquierdosubcorticalsAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_8-D.png',
  derechosubcorticalsAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_8.png',
  /* Cervical */
  izquierdocervicalsAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_7-D.png',
  derechocervicalsAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_7.png',
  izquierdocervicalsAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_7-D.png',
  derechocervicalsAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_7.png',
  izquierdocervicalsAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_7-D.png',
  derechocervicalsAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_7.png',
  /* Periférico superior */
  izquierdoperifericosAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_6-D.png',
  derechoperifericosAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_6.png',
  izquierdoperifericosAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_R_6-D.png',
  derechoperifericosAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_R_6.png',
  izquierdoperifericosAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_6-D.png',
  derechoperifericosAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_6.png',

  /* ── Inferiores topografía con severidad ── */
  /* Cortical inf */
  izquierdocorticaliAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5-D.png',
  derechocorticaliAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_5.png',
  izquierdocorticaliAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_5-D.png',
  derechocorticaliAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_5.png',
  izquierdocorticaliAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5-D.png',
  derechocorticaliAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_5.png',
  /* Subcortical inf */
  izquierdosubcorticaliAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_4-D.png',
  derechosubcorticaliAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_4.png',
  izquierdosubcorticaliAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_4-D.png',
  derechosubcorticaliAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_4.png',
  izquierdosubcorticaliAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_4-D.png',
  derechosubcorticaliAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_4.png',
  /* Torácico */
  izquierdotoracicoiAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_3-D.png',
  derechotoracicoiAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_3.png',
  izquierdotoracicoiAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_3-D.png',
  derechotoracicoiAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_3.png',
  izquierdotoracicoiAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_3-D.png',
  derechotoracicoiAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_3.png',
  /* Lumbosacro */
  izquierdolumbosacroiAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_2-D.png',
  derecholumbosacroiAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_2.png',
  izquierdolumbosacroiAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_2-D.png',
  derecholumbosacroiAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_2.png',
  izquierdolumbosacroiAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_2-D.png',
  derecholumbosacroiAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_2.png',
  /* Periférico inf */
  izquierdoperifericoiAlterada_leve:     '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_1-D.png',
  derechoperifericoiAlterada_leve:       '/SomatosensorialImg/ViaAfectada/Naranja/SO_Naranja_1.png',
  izquierdoperifericoiAlterada_moderado: '/SomatosensorialImg/ViaAfectada/Rojo/SO_Rojo_1-D.png',
  derechoperifericoiAlterada_moderado:   '/SomatosensorialImg/ViaAfectada/Rojo/SO_Rojo_1.png',
  izquierdoperifericoiAlterada_severo:   '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_1-D.png',
  derechoperifericoiAlterada_severo:     '/SomatosensorialImg/ViaAfectada/Marron/SO_Marron_1.png',
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

/* ─── Datos nervios ────────────────────────────────────────────────────────── */
const NERVIOS_SUP = [
  { value: 'mediano',                    title: ', a través de región medular posterior al estímulo de nervio Mediano.',                     label: 'NERVIO MEDIANO' },
  { value: 'ulnar',                      title: ', a través de región medular posterior al estímulo de nervio Ulnar.',                      label: 'NERVIO ULNAR' },
  { value: 'radial_superficial',         title: ', a través de región medular posterior al estímulo de nervio Radial superficial.',         label: 'NERVIO RADIAL SUPERFICIAL' },
  { value: 'antebraqueal_cutaneo_lateral', title: ', a través de región medular posterior al estímulo de nervio Antebraqueal cutáneo lateral.', label: 'NERVIO ANTEBRAQUEAL CUTÁNEO LATERAL' },
];
const NERVIOS_INF = [
  { value: 'tibial',               title: ', a través de región medular posterior al estímulo de nervio Tibial.',               label: 'NERVIO TIBIAL' },
  { value: 'peroneo',              title: ', a través de región medular posterior al estímulo de nervio Peroneo.',              label: 'NERVIO PERONEO' },
  { value: 'peroneo_superficial',  title: ', a través de región medular posterior al estímulo de nervio Peroneo superficial.',  label: 'NERVIO PERONEO SUPERFICIAL' },
  { value: 'sural',                title: ', a través de región medular posterior al estímulo de nervio Sural.',                label: 'NERVIO SURAL' },
  { value: 'safeno',               title: ', a través de región medular posterior al estímulo de nervio Safeno.',               label: 'NERVIO SAFENO' },
  { value: 'femorocutaneo_lateral',title: ', a través de región medular posterior al estímulo de nervio Femorocutáneo lateral.',label: 'NERVIO FEMOROCUTÁNEO LATERAL' },
  { value: 'pudendo',              title: ', a través de región medular posterior al estímulo de nervio Pudendo.',              label: 'NERVIO PUDENDO' },
];
const DERM_LEVELS = {
  cervical:   ['c4','c5','c6','c7','c8','t1'],
  toracico:   ['t2','t3','t4','t5','t6','t7','t8','t9','t10','t11','t12'],
  lumbosacro: ['l1','l2','l3','l4','l5','s1','s2'],
};

/* ─── Accordion ────────────────────────────────────────────────────────────── */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 6 }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 2,
        }}
      >
        {title}
      </button>
      {open && <div style={{ paddingLeft: 4 }}>{children}</div>}
    </div>
  );
}

function ControlledAccordion({ title, open, onToggle, children }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 2,
        }}
      >
        {title}
      </button>
      {open && <div style={{ paddingLeft: 4 }}>{children}</div>}
    </div>
  );
}

/* ─── PASOS ─────────────────────────────────────────────────────────────────── */

/* StepA: Menú raíz — igual que el mobile: Accordions SUP/INF + botones DERMATOMAS/TRIGÉMINO */
function StepA({ goTo, setViaType, setSelectedNerve, resetAll }) {
  return (
    <div>
      <StepTitle>VÍA SOMATOSENSORIAL</StepTitle>

      <Accordion title="SUPERIORES">
        {NERVIOS_SUP.map(n => (
          <ConclusionBtn key={n.value} value={n.value} title={n.title} label={n.label}
            onPress={() => { setViaType('superiores'); setSelectedNerve(n.value); goTo('B_sup'); }}
          />
        ))}
      </Accordion>

      <Accordion title="INFERIORES">
        {NERVIOS_INF.map(n => (
          <ConclusionBtn key={n.value} value={n.value} title={n.title} label={n.label}
            onPress={() => { setViaType('inferiores'); setSelectedNerve(n.value); goTo('B_inf'); }}
          />
        ))}
      </Accordion>

      <button
        style={{
          width: '100%', textAlign: 'left', padding: '8px 16px', marginBottom: 6, borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)',
          color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
        }}
        onClick={() => { setViaType('dermatomas'); setSelectedNerve(null); goTo('B_derm'); }}
      >
        DERMATOMAS
      </button>

      <ConclusionBtn
        value="trigemino_indemne"
        title="Vía somatosensorial, a través del tracto y núcleo mesencefálico al estímulo de nervio trigémino."
        label="TRIGÉMINO"
        onPress={() => { setViaType('trigemino'); setSelectedNerve(null); goTo('B_tri'); }}
      />
    </div>
  );
}

/* StepB_sup: Indemne / Alterada para Superiores */
function StepB_sup({ goTo, removeConclusion, setRootFlow, setSeverity, removeLastOverlayGroup, addOverlays, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          NERVIOS_SUP.forEach(n => removeConclusion(n.value));
          setRootFlow(null); setSeverity(null);
          setStep('A');
        }}
        onReset={resetAll}
      />
      <StepTitle>INTEGRIDAD:</StepTitle>
      <ConclusionBtn value="superiores_indemne" title="Vía somatosensorial con integridad funcional " label="INDEMNE"
        onPress={() => { setRootFlow('indemne'); goTo('E'); }} />
      <ConclusionBtn value="superiores_alterada" title="Vía somatosensorial con defecto " label="ALTERADA"
        onPress={() => {
          setRootFlow('alterada'); setSeverity(null);
          addOverlays(['superiores_alterada_izq', 'superiores_alterada_der']);
          goTo('C');
        }} />
    </div>
  );
}

/* StepB_inf: Indemne / Alterada para Inferiores */
function StepB_inf({ goTo, removeConclusion, setRootFlow, setSeverity, removeLastOverlayGroup, addOverlays, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          NERVIOS_INF.forEach(n => removeConclusion(n.value));
          setRootFlow(null); setSeverity(null);
          setStep('A');
        }}
        onReset={resetAll}
      />
      <StepTitle>INTEGRIDAD:</StepTitle>
      <ConclusionBtn value="inferior_indemne" title="Vía somatosensorial con integridad funcional " label="INDEMNE"
        onPress={() => { setRootFlow('indemne'); goTo('E'); }} />
      <ConclusionBtn value="inferior_alterada" title="Vía somatosensorial con defecto " label="ALTERADA"
        onPress={() => {
          setRootFlow('alterada'); setSeverity(null);
          addOverlays(['inferiores_alterada_izq', 'inferiores_alterada_der']);
          goTo('C');
        }} />
    </div>
  );
}

/* StepB_tri: Indemne / Alterada para Trigémino */
function StepB_tri({ goTo, removeConclusion, setRootFlow, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          removeConclusion('trigemino_indemne');
          setRootFlow(null); setSeverity(null);
          setStep('A');
        }}
        onReset={resetAll}
      />
      <StepTitle>INTEGRIDAD:</StepTitle>
      <ConclusionBtn value="trigemino_indemne" title="Vía somatosensorial con integridad funcional " label="INDEMNE"
        onPress={() => { setRootFlow('indemne'); goTo('E_tri'); }} />
      <ConclusionBtn value="trigemino_alterada" title="Vía somatosensorial con defecto " label="ALTERADA"
        onPress={() => { setRootFlow('alterada'); setSeverity(null); goTo('C'); }} />
    </div>
  );
}

/* StepB_derm: Indemne / Alterada para Dermatomas */
function StepB_derm({ goTo, removeConclusion, setRootFlow, setSeverity, addOverlays, setStep, resetAll }) {
  return (
    <div>
      <NavRow
        onBack={() => {
          setRootFlow(null); setSeverity(null);
          setStep('A');
        }}
        onReset={resetAll}
      />
      <StepTitle>INTEGRIDAD:</StepTitle>
      <ConclusionBtn value="dermatomas_indemne" title="Vía somatosensorial con integridad funcional " label="INDEMNE"
        onPress={() => { setRootFlow('indemne'); goTo('E'); }} />
      <ConclusionBtn value="dermatomas_alterada" title="Vía somatosensorial con defecto " label="ALTERADA"
        onPress={() => { setRootFlow('alterada'); setSeverity(null); goTo('C'); }} />
    </div>
  );
}

/* StepC: Fisiopatología */
function StepC({ goTo, removeConclusion, setSeverity, setStep, resetAll, viaType, addConclusion, removeLastOverlayGroup }) {
  const backStep = viaType === 'trigemino' ? 'B_tri'
    : viaType === 'superiores' ? 'B_sup'
    : viaType === 'dermatomas'  ? 'B_derm'
    : 'B_inf';
  return (
    <div>
      <NavRow
        onBack={() => {
          ['superiores_alterada','inferior_alterada','trigemino_alterada','dermatomas_alterada',
           'retardo_en_la_conduccion','bloqueo_en_la_conduccion','deficit_neuronal','sin_respuesta'].forEach(removeConclusion);
          setSeverity(null);
          removeLastOverlayGroup();
          setStep(backStep);
        }}
        onReset={resetAll}
      />
      <StepTitle>FISIOPATOLOGÍA:</StepTitle>
      <ConclusionBtn value="retardo_en_la_conduccion" title="Por retardo en la conducción " label="RETARDO EN LA CONDUCCIÓN" onPress={() => goTo('D1')} />
      <ConclusionBtn value="bloqueo_en_la_conduccion" title=" Por bloqueo en la conducción" label="BLOQUEO EN LA CONDUCCIÓN" onPress={() => goTo('DB')} />
      <ConclusionBtn value="deficit_neuronal" title=" Axonal" label="DÉFICIT AXONAL" onPress={() => goTo('D2')} />
      <ConclusionBtn value="sin_respuesta" title=" Por ausencia de respuesta evocable" label="SIN RESPUESTA"
        onPress={() => { setSeverity('severo'); addConclusion({ value: 'severo', title: ' Severo ' }); goTo(viaType === 'trigemino' ? 'E_tri' : 'E'); }} />
    </div>
  );
}

/* StepD1: Grado para Retardo */
function StepD1({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { ['leve','moderado','severo'].forEach(removeConclusion); setSeverity(null); setStep('C'); }} onReset={resetAll} />
      <StepTitle>GRADO:</StepTitle>
      <ConclusionBtn value="leve"     title=" Leve "     label="LEVE"     onPress={() => { setSeverity('leve');     goTo('D1b'); }} />
      <ConclusionBtn value="moderado" title=" Moderado " label="MODERADO" onPress={() => { setSeverity('moderado'); goTo('D1b'); }} />
      <ConclusionBtn value="severo"   title=" Severo "   label="SEVERO"   onPress={() => { setSeverity('severo');   goTo('D1b'); }} />
    </div>
  );
}

/* StepD1b: Pérdida axonal secundaria opcional */
function StepD1b({ goTo, removeConclusion, setSeverity, setStep, resetAll, viaType }) {
  const nextLado = viaType === 'trigemino' ? 'E_tri' : 'E';
  return (
    <div>
      <NavRow
        onBack={() => { ['leve','moderado','severo','perdida_axonal_secundaria'].forEach(removeConclusion); setSeverity(null); setStep('D1'); }}
        onReset={resetAll}
      />
      <StepTitle>RETARDO EN CONDUCCIÓN:</StepTitle>
      <ConclusionBtn value="perdida_axonal_secundaria" title=", y pérdida axonal secundaria " label="+ PÉRDIDA AXONAL" onPress={() => goTo(nextLado)} />
      <SkipButton onPress={() => goTo(nextLado)} label="Saltar →" />
    </div>
  );
}

/* StepDB: Grado para Bloqueo */
function StepDB({ goTo, removeConclusion, setSeverity, setStep, resetAll, viaType }) {
  const nextLado = viaType === 'trigemino' ? 'E_tri' : 'E';
  return (
    <div>
      <NavRow onBack={() => { ['leve','moderado','severo'].forEach(removeConclusion); setSeverity(null); setStep('C'); }} onReset={resetAll} />
      <StepTitle>GRADO:</StepTitle>
      <ConclusionBtn value="leve"     title=" Leve "     label="LEVE"     onPress={() => { setSeverity('leve');     goTo(nextLado); }} />
      <ConclusionBtn value="moderado" title=" Moderado " label="MODERADO" onPress={() => { setSeverity('moderado'); goTo(nextLado); }} />
      <ConclusionBtn value="severo"   title=" Severo "   label="SEVERO"   onPress={() => { setSeverity('severo');   goTo(nextLado); }} />
    </div>
  );
}

/* StepD2: Grado para Déficit Axonal */
function StepD2({ goTo, removeConclusion, setSeverity, setStep, resetAll }) {
  return (
    <div>
      <NavRow onBack={() => { ['leve','moderado','severo'].forEach(removeConclusion); setSeverity(null); setStep('C'); }} onReset={resetAll} />
      <StepTitle>GRADO:</StepTitle>
      <ConclusionBtn value="leve"     title=" Leve "     label="LEVE"     onPress={() => { setSeverity('leve');     goTo('D2b'); }} />
      <ConclusionBtn value="moderado" title=" Moderado " label="MODERADO" onPress={() => { setSeverity('moderado'); goTo('D2b'); }} />
      <ConclusionBtn value="severo"   title=" Severo "   label="SEVERO"   onPress={() => { setSeverity('severo');   goTo('D2b'); }} />
    </div>
  );
}

/* StepD2b: Retardo secundario opcional */
function StepD2b({ goTo, removeConclusion, setSeverity, setStep, resetAll, viaType }) {
  const nextLado = viaType === 'trigemino' ? 'E_tri' : 'E';
  return (
    <div>
      <NavRow
        onBack={() => { ['leve','moderado','severo','retardo_secundario_en_la_conduccion'].forEach(removeConclusion); setSeverity(null); setStep('D2'); }}
        onReset={resetAll}
      />
      <StepTitle>AXONAL:</StepTitle>
      <ConclusionBtn value="retardo_secundario_en_la_conduccion" title=", y retardo secundario en la conducción " label="+ RETARDO EN LA CONDUCCIÓN" onPress={() => goTo(nextLado)} />
      <SkipButton onPress={() => goTo(nextLado)} label="Saltar →" />
    </div>
  );
}

/* StepE: Lado para superiores / inferiores / dermatomas — aplica overlays en indemne */
function StepE({ goTo, removeConclusion, setSide, setStep, resetAll, rootFlow, severity, viaType, selectedNerve, addOverlays, conclusions }) {
  const nextAfterLado = (selectedSide) => {
    setSide(selectedSide);
    // Para INDEMNE: agrega overlay del nervio específico
    if (rootFlow === 'indemne' && selectedNerve) {
      if (selectedSide === 'bilateral') {
        addOverlays([`izquierdo_${selectedNerve}`, `derecho_${selectedNerve}`]);
      } else {
        addOverlays([`${selectedSide}_${selectedNerve}`]);
      }
    }
    // Para INDEMNE sin nervio (dermatomas): agrega overlay base
    if (rootFlow === 'indemne' && !selectedNerve && viaType === 'dermatomas') {
      if (selectedSide === 'bilateral') {
        addOverlays(['superior_izq', 'superior_der']);
      } else {
        addOverlays([selectedSide === 'izquierdo' ? 'superior_izq' : 'superior_der']);
      }
    }
    // Routing después del lado
    if (viaType === 'dermatomas') { goTo('DERMATOMAS_LIST'); return; }
    if (rootFlow === 'indemne') { goTo('H'); return; }
    if (viaType === 'superiores') { goTo('F_sup'); return; }
    if (viaType === 'inferiores') { goTo('F_inf'); return; }
    goTo('H');
  };

  const backStep = rootFlow === 'indemne'
    ? (viaType === 'superiores' ? 'B_sup' : viaType === 'inferiores' ? 'B_inf' : viaType === 'dermatomas' ? 'B_derm' : 'B_sup')
    : 'C';

  return (
    <div>
      <NavRow
        onBack={() => {
          ['izquierdo','derecho','bilateral',
           'perdida_axonal_secundaria','retardo_secundario_en_la_conduccion','leve','moderado','severo'].forEach(removeConclusion);
          setStep(backStep);
        }}
        onReset={resetAll}
      />
      <StepTitle>LADO:</StepTitle>
      <ConclusionBtn value="izquierdo" title=" Para lado izquierdo " label="IZQUIERDO" onPress={() => nextAfterLado('izquierdo')} />
      <ConclusionBtn value="derecho"   title=" Para lado derecho "   label="DERECHO"   onPress={() => nextAfterLado('derecho')} />
      <ConclusionBtn value="bilateral" title=" De forma bilateral,"  label="BILATERAL"  onPress={() => nextAfterLado('bilateral')} />
      {rootFlow === 'alterada' && severity && (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textAlign: 'center', marginTop: 6 }}>Grado: {severity.toUpperCase()}</p>
      )}
    </div>
  );
}

/* StepE_tri: Lado para Trigémino — aplica overlay y va a H */
function StepE_tri({ goTo, removeConclusion, setSide, setStep, resetAll, rootFlow, severity, addOverlays, removeLastOverlayGroup }) {
  const applyAndGo = (selectedSide) => {
    setSide(selectedSide);
    if (rootFlow === 'indemne') {
      if (selectedSide === 'bilateral') {
        addOverlays(['trigemino_izquierdo_indemne', 'trigemino_derecho_indemne']);
      } else {
        addOverlays([`trigemino_${selectedSide}_indemne`]);
      }
    } else {
      const suf = severity || 'leve';
      if (selectedSide === 'bilateral') {
        addOverlays([`izquierdotrigeminoAlterada_${suf}`, `derechotrigeminoAlterada_${suf}`]);
      } else {
        addOverlays([`${selectedSide}trigeminoAlterada_${suf}`]);
      }
    }
    goTo('H');
  };

  const backStep = rootFlow === 'indemne' ? 'B_tri' : 'C';

  return (
    <div>
      <NavRow
        onBack={() => {
          ['izquierdo','derecho','bilateral','leve','moderado','severo'].forEach(removeConclusion);
          removeLastOverlayGroup();
          setStep(backStep);
        }}
        onReset={resetAll}
      />
      <StepTitle>LADO TRIGÉMINO:</StepTitle>
      <ConclusionBtn value="izquierdo" title=" Para lado izquierdo " label="IZQUIERDO" onPress={() => applyAndGo('izquierdo')} />
      <ConclusionBtn value="derecho"   title=" Para lado derecho "   label="DERECHO"   onPress={() => applyAndGo('derecho')} />
      <ConclusionBtn value="bilateral" title=" De forma bilateral,"  label="BILATERAL"  onPress={() => applyAndGo('bilateral')} />
      {rootFlow === 'alterada' && severity && (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textAlign: 'center', marginTop: 6 }}>Grado: {severity.toUpperCase()}</p>
      )}
    </div>
  );
}

/* StepDERMATOMAS: Selección de dermatomas estimulados */
function StepDERMATOMAS({ goTo, removeConclusion, addConclusion, setStep, resetAll, side, rootFlow, severity, addOverlays, removeOverlays, conclusions }) {
  const [openZones, setOpenZones] = useState({ cervical: true, toracico: false, lumbosacro: false });
  const hasDerm = conclusions.some(c =>
    /^(?:izquierdo|derecho|bilateral)(?:c\d|t\d{1,2}|l\d|s\d)(?:di|da)$/i.test(c.value)
  );

  const getDermOverlayKeys = (sideSel, flow, code) => {
    const isUpper = /^c/i.test(code) || /^t1$/i.test(code);
    if (flow === 'indemne') {
      if (isUpper) {
        return sideSel === 'bilateral' ? ['superior_izq', 'superior_der']
             : sideSel === 'izquierdo' ? ['superior_izq'] : ['superior_der'];
      } else {
        return sideSel === 'bilateral' ? ['inferior_izq', 'inferior_der']
             : sideSel === 'izquierdo' ? ['inferior_izq'] : ['inferior_der'];
      }
    } else {
      const suf = severity ? `_${severity}` : '_leve';
      if (isUpper) {
        return sideSel === 'bilateral'
          ? [`ALT_SUP_IZQ${suf}`, `ALT_SUP_DER${suf}`]
          : sideSel === 'izquierdo' ? [`ALT_SUP_IZQ${suf}`] : [`ALT_SUP_DER${suf}`];
      } else {
        return sideSel === 'bilateral'
          ? [`ALT_INF_IZQ${suf}`, `ALT_INF_DER${suf}`]
          : sideSel === 'izquierdo' ? [`ALT_INF_IZQ${suf}`] : [`ALT_INF_DER${suf}`];
      }
    }
  };

  return (
    <div>
      <NavRow
        onBack={() => {
          conclusions.filter(c =>
            /^(?:izquierdo|derecho|bilateral)(?:c\d|t\d{1,2}|l\d|s\d)(?:di|da)$/i.test(c.value)
          ).forEach(c => removeConclusion(c.value));
          ['izquierdo','derecho','bilateral'].forEach(removeConclusion);
          setStep('E');
        }}
        onReset={resetAll}
      />
      <StepTitle>DERMATOMAS</StepTitle>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 8 }}>Selecciona los dermatomas estimulados:</p>

      {(['cervical','toracico','lumbosacro']).map(zone => {
        const open = openZones[zone];
        const toggle = () => setOpenZones(prev => ({ ...prev, [zone]: !prev[zone] }));
        return (
          <ControlledAccordion key={zone} title={zone.toUpperCase()} open={open} onToggle={toggle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '4px 0' }}>
              {DERM_LEVELS[zone].map(code => {
                const valSuffix = rootFlow === 'indemne' ? 'di' : 'da';
                const valueNow = `${side}${code}${valSuffix}`;
                const titleTxt = `A través de región medular posterior al estímulo de dermatomas ${code.toUpperCase()}`;
                const isSel = conclusions.some(c => c.value === valueNow);
                const ovKeys = getDermOverlayKeys(side, rootFlow, code);

                const toggle = () => {
                  if (isSel) {
                    removeConclusion(valueNow);
                    removeOverlays(ovKeys);
                  } else {
                    addConclusion({ value: valueNow, title: titleTxt });
                    addOverlays(ovKeys);
                  }
                };

                return (
                  <button
                    key={code}
                    onClick={toggle}
                    style={{
                      padding: '5px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', border: '1px solid',
                      background: isSel ? '#f97316' : 'rgba(255,255,255,0.06)',
                      borderColor: isSel ? '#f97316' : 'rgba(255,255,255,0.15)',
                      color: '#fff',
                    }}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </ControlledAccordion>
        );
      })}

      <button
        onClick={() => { if (hasDerm) goTo('H'); }}
        disabled={!hasDerm}
        style={{
          width: '100%', marginTop: 10, padding: '10px 0', borderRadius: 10,
          background: hasDerm ? '#f97316' : 'rgba(255,255,255,0.08)',
          border: 'none', cursor: hasDerm ? 'pointer' : 'not-allowed',
          color: hasDerm ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: 14,
        }}
      >
        Siguiente →
      </button>
    </div>
  );
}

/* StepF_sup: Topografía Superiores */
function StepF_sup({ goTo, removeConclusion, setStep, resetAll, side, severity, addOverlays }) {
  const applyTopSup = (topoKey) => {
    const suf = severity ? `_${severity}` : '_leve';
    if (side === 'bilateral') {
      addOverlays([`izquierdo${topoKey}Alterada${suf}`, `derecho${topoKey}Alterada${suf}`]);
    } else if (side === 'izquierdo') {
      addOverlays([`izquierdo${topoKey}Alterada${suf}`]);
    } else {
      addOverlays([`derecho${topoKey}Alterada${suf}`]);
    }
    goTo('H');
  };

  return (
    <div>
      <NavRow
        onBack={() => {
          ['corticals','subcorticals','cervicals','perifericos'].forEach(removeConclusion);
          setStep('E');
        }}
        onReset={resetAll}
      />
      <StepTitle>NIVEL SUPERIOR:</StepTitle>
      <ConclusionBtn value="corticals"    title="\n\nTopográficamente a nivel cortical (N20-P25: Núcleo talámico - área somestésica primaria)."   label="CORTICAL"    onPress={() => applyTopSup('corticals')} />
      <ConclusionBtn value="subcorticals" title="\n\nTopográficamente a nivel subcortical (P14-N18: Lemnisco medial - núcleo tectal)."            label="SUBCORTICAL" onPress={() => applyTopSup('subcorticals')} />
      <ConclusionBtn value="cervicals"    title="\n\nTopográficamente a nivel cervical (N11-N13: Raíces y astas dorsales - tracto cuneatus)."     label="CERVICAL"    onPress={() => applyTopSup('cervicals')} />
      <ConclusionBtn value="perifericos"  title="\n\nTopográficamente a nivel periférico (N4-N9: Fibras nerviosas mielínicas - plexo braquial)."  label="PERIFÉRICO"  onPress={() => applyTopSup('perifericos')} />
      <SkipButton onPress={() => goTo('H')} label="Sin topografía →" />
    </div>
  );
}

/* StepF_inf: Topografía Inferiores */
function StepF_inf({ goTo, removeConclusion, setStep, resetAll, side, severity, addOverlays }) {
  const applyTopInf = (topoKey) => {
    const suf = severity ? `_${severity}` : '_leve';
    if (side === 'bilateral') {
      addOverlays([`izquierdo${topoKey}Alterada${suf}`, `derecho${topoKey}Alterada${suf}`]);
    } else if (side === 'izquierdo') {
      addOverlays([`izquierdo${topoKey}Alterada${suf}`]);
    } else {
      addOverlays([`derecho${topoKey}Alterada${suf}`]);
    }
    goTo('H');
  };

  return (
    <div>
      <NavRow
        onBack={() => {
          ['corticali','subcorticali','toracicoi','lumbosacroi','perifericoi'].forEach(removeConclusion);
          setStep('E');
        }}
        onReset={resetAll}
      />
      <StepTitle>NIVEL INFERIOR:</StepTitle>
      <ConclusionBtn value="corticali"    title="\n\nTopográficamente a nivel cortical (P37-N45: Núcleo talámico - área somestésica primaria)."    label="CORTICAL"    onPress={() => applyTopInf('corticali')} />
      <ConclusionBtn value="subcorticali" title="\n\nTopográficamente a nivel subcortical (P31-N34: Núcleo gracilis - lemnisco medial)."           label="SUBCORTICAL" onPress={() => applyTopInf('subcorticali')} />
      <ConclusionBtn value="toracicoi"    title="\n\nTopográficamente a nivel torácico (N24: Astas dorsales - tracto gracilis)."                   label="TORÁCICO"    onPress={() => applyTopInf('toracicoi')} />
      <ConclusionBtn value="lumbosacroi"  title="\n\nTopográficamente a nivel lumbosacro (N20: Cono medular - raíces dorsales)."                   label="LUMBOSACRO"  onPress={() => applyTopInf('lumbosacroi')} />
      <ConclusionBtn value="perifericoi"  title="\n\nTopográficamente a nivel periférico (P9-N18: Fibras nerviosas mielínicas - plexo sacro)."     label="PERIFÉRICO"  onPress={() => applyTopInf('perifericoi')} />
      <SkipButton onPress={() => goTo('H')} label="Sin topografía →" />
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
  const [viaType, setViaType]         = useState(null);   // 'superiores' | 'inferiores' | 'trigemino' | 'dermatomas'
  const [selectedNerve, setSelectedNerve] = useState(null);
  const [activeOv, setActiveOv] = useState([]);
  const [, setOvHist]           = useState([]);

  const addOverlays = useCallback((ids) => {
    setActiveOv(p => [...p, ...ids.filter(i => !p.includes(i))]);
    setOvHist(h => [...h, ids]);
  }, []);
  const addOverlay = useCallback((id) => addOverlays([id]), [addOverlays]);

  const removeOverlays = useCallback((ids) => {
    setActiveOv(p => p.filter(k => !ids.includes(k)));
    setOvHist(h => h.map(grp => grp.filter(k => !ids.includes(k))).filter(g => g.length > 0));
  }, []);

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
      moverFigura(dragRef.active, dragRef.origX + dx, dragRef.origY + dy);
    };
    const onUp = () => {
      dragRef.active = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [dragRef, moverFigura]);

  /* ── Reset total ── */
  const resetAll = useCallback(() => {
    setConclusions([]); setHist(['A']); setStep('A');
    setRootFlow(null); setViaType(null); setSelectedNerve(null); setSide(''); resetOverlays();
    setNombrePaciente(''); setSeverity(null); setActiveTab('reporte');
    setFiguras([]); setImgLista(null); setComentarioLista('');
    setTextoEditado(''); setEditadoManual(false);
  }, [resetOverlays]);

  /* ── Texto reporte editable ── */
  const [textoEditado, setTextoEditado] = useState('');
  const [editadoManual, setEditadoManual] = useState(false);

  /* ── Texto reporte ── */
  const textoReporte = useMemo(() => {
    if (!rootFlow || conclusions.length === 0) return '';

    const hasVal = (v) => conclusions.some(c => c.value === v);
    const pick   = (vals) => conclusions.find(c => vals.includes(c.value));

    const NERVIO_LABELS_LC = Object.fromEntries(
      [...NERVIOS_SUP, ...NERVIOS_INF].map(n => [n.value, n.label.toLowerCase()])
    );

    const TOPO_SUP_MAP = {
      corticals:    '\n\nTopográficamente a nivel cortical (N20-P25: Núcleo talámico - área somestésica primaria).',
      subcorticals: '\n\nTopográficamente a nivel subcortical (P14-N18: Lemnisco medial - núcleo tectal).',
      cervicals:    '\n\nTopográficamente a nivel cervical (N11-N13: Raíces y astas dorsales - tracto cuneatus).',
      perifericos:  '\n\nTopográficamente a nivel periférico (N4-N9: Fibras nerviosas mielínicas - plexo braquial).',
    };
    const TOPO_INF_MAP = {
      corticali:    '\n\nTopográficamente a nivel cortical (P37-N45: Núcleo talámico - área somestésica primaria).',
      subcorticali: '\n\nTopográficamente a nivel subcortical (P31-N34: Núcleo gracilis - lemnisco medial).',
      toracicoi:    '\n\nTopográficamente a nivel torácico (N24: Astas dorsales - tracto gracilis).',
      lumbosacroi:  '\n\nTopográficamente a nivel lumbosacro (N20: Cono medular - raíces dorsales).',
      perifericoi:  '\n\nTopográficamente a nivel periférico (P9-N18: Fibras nerviosas mielínicas - plexo sacro).',
    };
    const TOPO_MAP = { ...TOPO_SUP_MAP, ...TOPO_INF_MAP };

    const getTopographySentence = () => {
      const allVals = conclusions.map(c => c.value);
      const re = /^(?:izquierdo|derecho|bilateral)_?(corticals|subcorticals|cervicals|perifericos|corticali|subcorticali|toracicoi|lumbosacroi|perifericoi)$/;
      const hit = allVals.find(v => re.test(v));
      if (!hit) return '';
      const suffix = hit.replace(/^(?:izquierdo|derecho|bilateral)_?/, '');
      const raw = TOPO_MAP[suffix] || '';
      if (!raw) return '';
      const t = raw.replace(/[ \t]+$/, '');
      return /[.!?]$/.test(t) ? t : `${t}.`;
    };

    const getStimulusSentence = () => {
      if (viaType === 'superiores' || viaType === 'inferiores') {
        if (!selectedNerve) return '';
        const conc = conclusions.find(c => c.value === selectedNerve);
        if (conc?.title) return conc.title;
        const lbl = NERVIO_LABELS_LC[selectedNerve] || `nervio ${selectedNerve.replace(/_/g, ' ').toLowerCase()}`;
        return ` a través de región medular posterior al estímulo de ${lbl}.`;
      }
      if (viaType === 'trigemino') return ' a través del tracto y núcleo mesencefálico al estímulo de nervio trigémino.';
      if (viaType === 'dermatomas') {
        const codes = conclusions
          .map(c => c.value)
          .map(v => v.match(/(?:izquierdo|derecho|bilateral)(c\d+|t\d+|l\d+|s\d+)(?:di|da)$/i)?.[1]?.toUpperCase())
          .filter(Boolean);
        const uniq = Array.from(new Set(codes));
        return uniq.length ? ` a través de región medular posterior al estímulo de dermatomas ${uniq.join('-')}.` : '';
      }
      return '';
    };

    const via = `Vía somatosensorial${rootFlow === 'indemne' ? ' con integridad funcional' : rootFlow === 'alterada' ? ' con defecto' : ''}`;

    let fisio = '';
    if (hasVal('retardo_en_la_conduccion'))   fisio = ' por retardo en la conducción';
    else if (hasVal('bloqueo_en_la_conduccion')) fisio = ' por bloqueo en la conducción';
    else if (hasVal('deficit_neuronal'))         fisio = ' axonal';
    else if (hasVal('sin_respuesta'))            fisio = ' por ausencia de respuesta evocable';

    const gradoVal = pick(['leve', 'moderado', 'severo'])?.value;
    const grado = gradoVal ? ` ${gradoVal}` : '';

    let secund = '';
    if (hasVal('perdida_axonal_secundaria'))            secund = ' y pérdida axonal secundaria';
    if (hasVal('retardo_secundario_en_la_conduccion')) secund = ' y retardo secundario en la conducción';

    let ladoTxt = '';
    if (side === 'izquierdo')  ladoTxt = ' para lado izquierdo';
    else if (side === 'derecho')    ladoTxt = ' para lado derecho';
    else if (side === 'bilateral')  ladoTxt = ' de forma bilateral';

    const estimulo = getStimulusSentence();

    const ordenPartes = hasVal('sin_respuesta')
      ? `${via}${grado}${fisio}${secund}${ladoTxt}`
      : `${via}${fisio}${grado}${secund}${ladoTxt}`;

    let s1 = ordenPartes.replace(/\s+/g, ' ').trim();
    s1 = s1 ? s1[0].toUpperCase() + s1.slice(1) : s1;
    if (estimulo) s1 += estimulo;
    else if (!/[.!?]$/.test(s1)) s1 += '.';

    const topo = getTopographySentence();
    if (!topo) return s1;

    const needsSpace = !/^\s*\n/.test(topo);
    return needsSpace ? `${s1} ${topo}` : `${s1}${topo}`;
  }, [conclusions, rootFlow, side, viaType, selectedNerve]);

  useEffect(() => {
    if (!editadoManual) setTextoEditado(textoReporte);
  }, [textoReporte, editadoManual]);

  const textoFinal = editadoManual ? textoEditado : textoReporte;

  /* ── Lista visual ── */
  const listaVisual = useMemo(() => {
    const vals = new Set(conclusions.map(c => c.value));
    const lines = [];

    const viaMap = { superiores: 'Miembros superiores', inferiores: 'Miembros inferiores', dermatomas: 'Dermatomas', trigemino: 'Trigémino' };
    const via = viaType ? viaMap[viaType] : '';
    if (via) lines.push({ k: 'Vía somatosensorial', v: via });

    // Estado indemne / alterada
    const isIndemne = vals.has('superiores_indemne') || vals.has('inferior_indemne') ||
                      vals.has('trigemino_indemne')  || vals.has('dermatomas_indemne');
    const isAlterada = vals.has('superiores_alterada') || vals.has('inferior_alterada') ||
                       vals.has('trigemino_alterada')  || vals.has('dermatomas_alterada');
    const estado = isAlterada ? 'Alterada' : isIndemne ? 'Indemne' : '';
    if (estado) lines.push({ k: 'Vía somatosensorial', v: estado });

    let fisio = '';
    if (vals.has('retardo_en_la_conduccion')) {
      fisio = 'Retardo en la conducción';
      if (vals.has('perdida_axonal_secundaria')) fisio += ' con pérdida axonal secundaria';
    } else if (vals.has('deficit_neuronal')) {
      fisio = 'Déficit axonal';
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
      vals.has('izquierdo') ? 'Izquierdo' : vals.has('derecho') ? 'Derecho' :
      vals.has('bilateral') ? 'Bilateral' : '';
    if (lado) lines.push({ k: 'Lado', v: lado });

    // Estímulo (nervio)
    if (selectedNerve && viaType !== 'trigemino') {
      const nervLabels = {
        mediano: 'Nervio mediano', ulnar: 'Nervio ulnar',
        radial_superficial: 'Nervio radial superficial',
        antebraqueal_cutaneo_lateral: 'Nervio antebraqueal cutáneo lateral',
        tibial: 'Nervio tibial', peroneo: 'Nervio peroneo',
        peroneo_superficial: 'Nervio peroneo superficial', sural: 'Nervio sural',
        safeno: 'Nervio safeno', femorocutaneo_lateral: 'Nervio femorocutáneo lateral',
        pudendo: 'Nervio pudendo',
      };
      const lbl = nervLabels[selectedNerve] || selectedNerve.replace(/_/g, ' ');
      lines.push({ k: 'Estímulo', v: lbl });
    }
    if (viaType === 'trigemino') lines.push({ k: 'Estímulo', v: 'Nervio trigémino' });

    const topSup = vals.has('corticals') ? 'Cortical' : vals.has('subcorticals') ? 'Subcortical' :
                   vals.has('cervicals') ? 'Cervical' : vals.has('perifericos') ? 'Periférico' : '';
    if (topSup) lines.push({ k: 'Topografía', v: topSup });

    const topInf = vals.has('corticali') ? 'Cortical' : vals.has('subcorticali') ? 'Subcortical' :
                   vals.has('toracicoi') ? 'Torácico' : vals.has('lumbosacroi') ? 'Lumbosacro' :
                   vals.has('perifericoi') ? 'Periférico' : '';
    if (topInf) lines.push({ k: 'Topografía', v: topInf });

    // Dermatomas
    const dermCodes = conclusions
      .map(c => c.value.match(/^(?:izquierdo|derecho|bilateral)(c\d|t\d{1,2}|l\d|s\d)(?:di|da)$/i)?.[1]?.toUpperCase())
      .filter(Boolean);
    if (dermCodes.length) {
      const uniq = [...new Set(dermCodes)];
      lines.push({ k: 'Dermatomas', v: uniq.join('-') });
    }

    return lines;
  }, [conclusions, side, viaType, selectedNerve]);

  /* ── Props comunes a todos los pasos ── */
  const sp = {
    goTo, setStep, removeConclusion, setSeverity, setSide, setRootFlow, setViaType,
    setSelectedNerve, selectedNerve,
    removeLastOverlayGroup, removeOverlays, resetAll, addOverlay, addOverlays,
    rootFlow, severity, side, viaType, conclusions, addConclusion,
  };

  /* ── Dispatcher ── */
  const renderStep = () => {
    switch (step) {
      case 'A':             return <StepA            {...sp} />;
      case 'B_sup':         return <StepB_sup        {...sp} />;
      case 'B_inf':         return <StepB_inf        {...sp} />;
      case 'B_tri':         return <StepB_tri        {...sp} />;
      case 'B_derm':        return <StepB_derm       {...sp} />;
      case 'C':             return <StepC            {...sp} />;
      case 'D1':            return <StepD1           {...sp} />;
      case 'D1b':           return <StepD1b          {...sp} />;
      case 'DB':            return <StepDB           {...sp} />;
      case 'D2':            return <StepD2           {...sp} />;
      case 'D2b':           return <StepD2b          {...sp} />;
      case 'E':             return <StepE            {...sp} />;
      case 'E_tri':         return <StepE_tri        {...sp} />;
      case 'DERMATOMAS_LIST': return <StepDERMATOMAS {...sp} />;
      case 'F_sup':         return <StepF_sup        {...sp} />;
      case 'F_inf':         return <StepF_inf        {...sp} />;
      case 'H':   return (
        <div>
          <NavRow onBack={goBack} onReset={resetAll} onPdf={() => setPdfOpen(true)} />

          <ExportBar
            nombrePaciente={nombrePaciente}
            textoReporte={textoFinal}
            activeOv={activeOv}
            figuras={figuras}
            laminaSize={{
              w: laminaRef.current?.clientWidth  || 690,
              h: laminaRef.current?.clientHeight || 620,
            }}
            listaVisual={listaVisual}
            imgLista={imgLista}
            comentarioLista={comentarioLista}
            onBack={goBack}
            onReset={resetAll}
            isOpen={pdfOpen}
            onClose={() => setPdfOpen(false)}
          />

          {activeTab === 'reporte' && (
            <>
              <StepTitle>Agrega figuras al reporte (imagen)</StepTitle>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <label style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '14px 8px', borderRadius: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => {
                    Array.from(e.target.files || []).forEach(f => agregarFigura('circle', URL.createObjectURL(f)));
                    e.target.value = '';
                  }} />
                </label>
                <label style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '14px 8px', borderRadius: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 4, border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => {
                    Array.from(e.target.files || []).forEach(f => agregarFigura('square', URL.createObjectURL(f)));
                    e.target.value = '';
                  }} />
                </label>
              </div>
              {figuras.length > 0 && (
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, margin: '4px 0 12px', fontStyle: 'italic' }}>
                  {figuras.length} figura{figuras.length > 1 ? 's' : ''} en la lámina
                </p>
              )}
            </>
          )}

          {activeTab === 'lista' && (
            <>
              <StepTitle>Imagen de tabla</StepTitle>
              <button onClick={() => setShowGaleria(true)} style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '18px 12px', borderRadius: 10, cursor: 'pointer', marginBottom: 12,
                background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)',
              }}>
                {imgLista ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgLista.src} alt="tabla" style={{ width: '100%', maxHeight: 100, objectFit: 'contain', borderRadius: 6 }} />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18" />
                    </svg>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Sin imagen seleccionada</span>
                  </>
                )}
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
      default: return null;
    }
  };

  /* ── Indicador de paso ── */
  const STEP_LABELS = {
    A: 'Vía Somato', B_sup: 'Integridad Sup', B_inf: 'Integridad Inf', B_tri: 'Integridad Tri', B_derm: 'Integridad Derm',
    C: 'Fisiopatología', D1: 'Grado', D1b: 'Retardo+', DB: 'Grado',
    D2: 'Grado', D2b: 'Axonal+', E: 'Lado', E_tri: 'Lado Tri',
    DERMATOMAS_LIST: 'Dermatomas',
    F_sup: 'Topografía Sup', F_inf: 'Topografía Inf',
    H: 'Informe',
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {session?.user?.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.imageUrl} alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain', opacity: 0.85 }} />
            )}
          </div>
        </div>

        {/* ── Zona centrada ── */}
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
                src={viaType === 'trigemino' ? '/assets/MioImg/Base_Cerebro.png' : '/SomatosensorialImg/SO_BASE_BLANCO.png'}
                alt="Vías somatosensoriales"
                draggable={false}
                style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              {activeOv.map(k => {
                const src = OVERLAYS_SOMATO[k];
                if (!src) return null;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" draggable={false}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                  />
                );
              })}
              {/* Figuras arrastrables */}
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
                      {listaVisual.map(({ k, v }, i) => (
                        <p key={`${k}-${i}`} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: 0 }}>
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
                {session.user.name && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Dr. {session.user.name} {session.user.lastname || ''}</span>}
                {session.user.email && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>{session.user.email}</span>}
                {session.user.cedula && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>No. {session.user.cedula}</span>}
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
