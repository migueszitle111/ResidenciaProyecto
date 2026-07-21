import { useCallback, useContext, useMemo, useState } from 'react';
import { ReportContext, DropContext } from '@/src/context';
import { Accordion, AccordionContainer, InternalAccordionContainer } from '../../../components/ReportTemplate/Accordion';
import { ConclusionButton } from '../../../components/ReportTemplate/Conclusions';
import { DraggableDiv } from '../../../components/ReportTemplate/DraggableImage';
import { useImageState } from '../../MetodosBotones';
import { checkDivsBILATERAL } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosBILATERAL';
import { NerviusButton } from '@/app/components/ReportTemplate/Conclusions/Botton-Nervius';
import { checkDivsSegmentarBilateral } from '@/app/Reporte/Tipos/Neuropatia/SelecNerviosSegmenBILATERAL';
import ExportBar from './MenuB';
import './Style.css';

// ─── Tablas ───────────────────────────────────────────────────────────────────
const TABLAS_URL = 'https://backendmedxpro-tef2.onrender.com/pdfEducacion/Tablas';
const TABLAS = [
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                                       file: 'LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                                                              file: 'CRITERIOS_CIDP_AANEM.png' },
  { id: 'CRITERIOS DE LAMBERT ESCLEROSIS LATERAL AMIOTRÓFICA',                              file: 'LAMBERT_ESCLEROSIS_LT.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (DOMINIO)',                                                file: 'CRITERIOS _AWAJI_2008_1.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (CATEGORÍA)',                                              file: 'CRITERIOS _AWAJI_2008_2.png' },
  { id: 'COMPARACIÓN EL ESCORIAL / AWAJI 2008',                                             file: 'COMPARACION_ESCORIAL.png' },
  { id: 'CRITERIOS POLINEUROPATÍA DESMIELINIZANTE/AXONAL',                                  file: 'POLINEUROPATIA_DESMIELINIZANTE.png' },
  { id: 'PATRONES DE DISTRIBUCIÓN EN POLINEUROPATÍA',                                       file: 'DISTRIBUCION_POLI.png' },
  { id: 'CUANTIFICACIÓN DE POLINEUROPATÍAS',                                                file: 'CUANTIFICACION_POLI.png' },
  { id: 'HALLAZGOS ELECTROFISIOLÓGICOS EN RADICULOPATÍA',                                   file: 'ELECTROFISIOLOGICOS_RADI.png' },
  { id: 'HALLAZGOS ELECTROFISIÓLOGICOS EVOLUTIVOS EN RADICULOPATÍA',                        file: 'EVOLUTIVOS_RADI.png' },
  { id: 'HALLAZGOS NEUROGRÁFICOS EN MIOPATÍAS',                                             file: 'NEUROGRAFICO_MIO.png' },
  { id: 'HALLAZGOS MIOGRÁFICOS EN MIOPATÍAS',                                               file: 'MIOGRAFICOS_MIO.png' },
  { id: 'HALLAZGOS DIFERENCIALES POR TIPOS DE MIOPATÍAS',                                  file: 'TIPOS_MIOPATIAS.png' },
  { id: 'COMPARACIÓN MIOPATÍA/RADICULOPATÍA/UNIÓN NEUROMUSCULAR',                           file: 'COMPARACION.png' },
  { id: 'SEVERIDAD EN MIOPATÍA',                                                            file: 'SEVERIDAD_MIO.png' },
  { id: 'GRAVEDAD POR DECREMENTO ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',                   file: 'DECREMENTO_ELEC.png' },
  { id: 'GRAVEDAD POR SFEMG ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',                        file: 'SFEMG_ELEC.png' },
  { id: 'COORRELACIÓN DE PRUEBAS ELECTROFISIOLOGICAS/DATOS CLÍNICOS EN MIASTENIA GRAVIS',   file: 'PRUEBAS_ELEC.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS SOMATOSENSORIALES Y MOTORES',    file: 'POTENCIALES_EVO.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS VISUALES',                       file: 'POTENCIALES_VISUALES.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS AUDITIVOS',                      file: 'POTENCIALES_AUD.png' },
  { id: 'PRONÓSTICO ASOCIADO A POTENCIALES EVOCADOS',                                       file: 'PRONOSTICO_ASOCIADO.png' },
  { id: 'SEVERIDAD POTENCIALES EVOCADOS MULTIMODALES',                                      file: 'EVO_MULTIMODALES.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MS',                         file: 'SOMATOSENSORIALES_MS.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MI',                         file: 'SOMATOS_MI.png' },
  { id: 'MIOPATÍAS DISTALES',                                                               file: 'MIOPATIAS_DISTAL.png' },
  { id: 'SÍNDROMES DE LESIÓN COMBINADA A PARES CRANEALES',                                  file: 'PARES_CRANEALES.png' },
  { id: 'PRONÓSTICO EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',                     file: 'DEFICIT_AXONAL.png' },
  { id: 'EVOLUCION EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',                      file: 'DEFICIT_AXONAL2.png' },
  { id: 'COORRELACIÓN DE TIEMPO DE EVOLUCIÓN EN PLEXOPATÍAS',                               file: 'EVOLUCION_PLEXO.png' },
  { id: 'PATRONES ELECTROFISIOLÓGICOS EN NEUROPATÍA',                                       file: 'PATRONES_NEURO.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',                                file: 'ELECTROFISIOLOGICOS_DES.png' },
  { id: 'CRITERIOS DIAGNÓSTICOS ELECTROFISIOLÓGICOS PARA AIDP',                             file: 'CRITERIOS_AIDP.png' },
  { id: 'DIFERENCIAS ELECTROFISIOLÓGICAS EN POLINEUROPATÍAS',                               file: 'DIFERENCIAS_POLI.png' },
  { id: 'AANEM CRITERIOS PARA NEUROPATÍAS POR ATRAPAMIENTO',                                file: 'ATRAPAMIENTO.png' },
  { id: 'CLASIFICACIÓN DE SEDDON Y SUNDERLAND',                                             file: 'Tabla38.png' },
  { id: 'POLINEUROPATÍAS DESMIELINIZANTES',                                                 file: 'Tabla39.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – PADUA',                                             file: 'Tabla40.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – CANTERBURY',                                        file: 'Tabla41.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – HIRANI',                                            file: 'Tabla42.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                                       file: 'Tabla43.png' },
  { id: 'CRITERIOS CIDP AANEM',                                                              file: 'Tabla44.png' },
];

function GaleriaTablas({ onSelect, onClose }) {
  const [busqueda, setBusqueda] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 10100, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: '#2a2a2a', borderRadius: 14, width: '100%', maxWidth: 480, maxHeight: '85vh', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 12px', textAlign: 'center' }}>Selecciona una imagen:</h3>
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar imagen..." autoFocus
              style={{ width: '100%', boxSizing: 'border-box', background: '#444', border: 'none', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtradas.length === 0
              ? <p style={{ color: 'rgba(255,255,255,0.4)', padding: 20, textAlign: 'center' }}>Sin resultados.</p>
              : filtradas.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <button onClick={() => onSelect(`${TABLAS_URL}/${t.file}`)}
                    style={{ flex: 1, textAlign: 'left', padding: '14px 20px', background: 'transparent', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer' }}>
                    {t.id}
                  </button>
                  <button onClick={() => setPreviewUrl(`${TABLAS_URL}/${t.file}`)}
                    title="Vista previa"
                    style={{ flexShrink: 0, marginRight: 12, background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.color = '#f97316'; }}
                    onMouseLeave={e => { e.stopPropagation(); e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              ))
            }
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={onClose} style={{ width: '100%', padding: '11px 0', borderRadius: 10, border: 'none', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      </div>
      {previewUrl && (
        <div onClick={() => setPreviewUrl(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 10200, background: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <img src={previewUrl} alt="Vista previa"
              style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 10, boxShadow: '0 8px 40px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.12)' }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setPreviewUrl(null)}
                style={{ padding: '9px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
                Cerrar preview
              </button>
              <button onClick={() => { onSelect(previewUrl); setPreviewUrl(null); }}
                style={{ padding: '9px 24px', borderRadius: 8, border: 'none', background: '#f97316', color: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
                Seleccionar esta tabla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── UI primitivos estilo ReportFace ──────────────────────────────────────────
function StepTitle({ children }) {
  return (
    <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 10, marginTop: 4, textTransform: 'uppercase' }}>
      {children}
    </p>
  );
}

function SiguienteBtn({ disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full mt-8 px-4 py-2.5 rounded-lg text-sm font-bold transition-all
        ${disabled ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>
      Siguiente →
    </button>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
const SIMBOLOS = [
  { grupo: 'Círculos Rojos', items: [
    { label: 'Rojo 1', src: '/assets/Simbolos/S_Circulo Rojo XS (4px).png' },
    { label: 'Rojo 2', src: '/assets/Simbolos/S_Circulo Rojo S.png' },
    { label: 'Rojo 3', src: '/assets/Simbolos/S_Circulo Rojo Intermedio (5.1px).png' },
    { label: 'Rojo 4', src: '/assets/Simbolos/S_Circulo Rojo XL.png' },
  ]},
  { grupo: 'Cruces', items: [
    { label: 'Cruz 1', src: '/assets/Simbolos/S_Cruz 1.png' },
    { label: 'Cruz 2', src: '/assets/Simbolos/S_Cruz 2.png' },
    { label: 'Cruz 3', src: '/assets/Simbolos/S_Cruz 3.png' },
    { label: 'Cruz 4', src: '/assets/Simbolos/S_Cruz 4.png' },
  ]},
  { grupo: 'Cruces Rojas', items: [
    { label: 'Cruz R01', src: '/assets/Simbolos/S_Cruz_Rojo01.png' },
    { label: 'Cruz R02', src: '/assets/Simbolos/S_Cruz_Rojo02.png' },
    { label: 'Cruz R03', src: '/assets/Simbolos/S_Cruz_Rojo03.png' },
    { label: 'Cruz R04', src: '/assets/Simbolos/S_Cruz_Rojo04.png' },
  ]},
  { grupo: 'Otros', items: [
    { label: 'ZigZag',    src: '/assets/Simbolos/S_ZigZag.png' },
    { label: 'ZigZag 2',  src: '/assets/Simbolos/S_ZigZag2.png' },
    { label: 'Inching 1', src: '/assets/Simbolos/S_Inching 1.png' },
    { label: 'Inching 2', src: '/assets/Simbolos/S_Inching 2.png' },
    { label: 'Inching 3', src: '/assets/Simbolos/S_Inching 3.png' },
  ]},
];

function NavRow({ onBack, onReset, onPdf }) {
  const circleBase = {
    width: 44, height: 44, borderRadius: '50%',
    border: '1.5px solid #ff4500', background: '#000',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s', padding: 0, position: 'relative',
  };
  const tooltipStyle = {
    position: 'absolute', top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(30,30,30,0.95)', color: '#fff', fontSize: 11, whiteSpace: 'nowrap',
    padding: '3px 8px', borderRadius: 4, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.15s',
    zIndex: 99999, border: '1px solid rgba(255,69,0,0.4)',
  };
  const showTip = e => { const t = e.currentTarget.querySelector('.nav-tip'); if (t) t.style.opacity = '1'; };
  const hideTip = e => { const t = e.currentTarget.querySelector('.nav-tip'); if (t) t.style.opacity = '0'; };
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
      <button onClick={onBack} style={circleBase}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.15)'; showTip(e); }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; hideTip(e); }}>
        <img src="/I_Out_white.svg" alt="Regresar" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
        <span className="nav-tip" style={tooltipStyle}>Regresar</span>
      </button>
      <button onClick={onReset} style={circleBase}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.15)'; showTip(e); }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; hideTip(e); }}>
        <img src="/I_Repeat_white.svg" alt="Refrescar" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
        <span className="nav-tip" style={tooltipStyle}>Refrescar</span>
      </button>
      {onPdf && (
        <button onClick={onPdf}
          style={{ ...circleBase, background: '#FF6B00', border: '1.5px solid #FF6B00', boxShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e05e00'; showTip(e); }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FF6B00'; hideTip(e); }}>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 }}>PDF</span>
          <span className="nav-tip" style={tooltipStyle}>Exportar PDF</span>
        </button>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────

function Reporte({ copyConclusions }) {
  return (
    <div>
      {checkDivsBILATERAL(copyConclusions)}
      {checkDivsSegmentarBilateral(copyConclusions)}
    </div>
  );
}

export async function urlToDataURI(url) {
  const blob = await fetch(url).then(r => r.blob());
  return await new Promise((ok) => {
    const fr = new FileReader();
    fr.onload = () => ok(fr.result);
    fr.readAsDataURL(blob);
  });
}

// ── Lista visual helper ───────────────────────────────────────────────────────
function getListItem(c) {
  const val   = (c.value || '').replace(/\d+$/, '').trim();
  const title = (c.title || '').trim();
  if (!title) return null;
  const clean = s => s.replace(/^[\s,;.]+|[\s,;.]+$/g, '').trim();

  if (/^evolucion/i.test(val))
    return { k: 'Evolución', v: clean(title) };
  if (/^(MEDIANO|FRENICO|GLUTEO_INFERIOR|CIATICO|PUDENDO)/i.test(val))
    return { k: 'Nervio', v: clean(title.replace(/^DE NERVIO\s*/i, '')) };
  if (/BILATERAL/i.test(title))
    return { k: 'Lado', v: clean(title) };
  if (/^(IZQUIERDO|DERECHO)$/i.test(val))
    return { k: 'Lado', v: clean(title) };
  if (/^focalizada$/i.test(val))  return { k: 'Ubicación', v: 'focalizada a nivel' };
  if (/^segmentaria$/i.test(val)) return { k: 'Ubicación', v: 'Segmentaria a nivel' };
  if (/generalizada/i.test(val))  return { k: 'Ubicación', v: 'Generalizada a nivel' };
  if (/TIPO\s+(AXONAL|DESMIEL|MIXTA)/i.test(title))
    return { k: 'Tipo', v: clean(title.replace(/^TIPO\s*/i, '')) };
  if (/^(MOTORAS|SENSITIVAS|MIXTAS)/i.test(val))
    return { k: 'Fibras', v: clean(title.replace(/^DE FIBRAS\s*/i, '')) };
  if (/INTENSIDAD/i.test(title))
    return { k: 'Intensidad', v: clean(title.replace(/^INTENSIDAD\s*/i, '')) };
  if (/REINERVACI/i.test(title))
    return { k: 'Reinervación', v: clean(title.replace(/^REINERVACI[ÓO]N\s*/i, '')) };
  if (/PRON[ÓO]STICO/i.test(title))
    return { k: 'Pronóstico', v: clean(title.replace(/^PRON[ÓO]STICO\s+DE\s+RECUPERACI[ÓO]N\s*/i, '')) };
  // Botones del overlay (NerviusButton / SegmentariaButton / NerviusButtonBILATERAL…)
  // values: cari1…cariN, car1…carN, carizq1…
  if (/^car/i.test(val))
    return { k: 'Ubicación', v: clean(title) };
  return null;
}

// ── Wizard principal ──────────────────────────────────────────────────────────
const SimpleMultiStepForm = ({ showStepNumber, conclusionDivRef, elementRef, handleImageChange, droppedItems, topLeftText, setTopLeftText, copyConclusions, expandedDivs, setExpandedDivs, reportRef, figuras, setFiguras, activeTab }) => {
  const [step, setStep] = useState('A');
  const [selectedSide, setSelectedSide] = useState('');

  return (
    <div>
      {step === 'A'    && <StepA setStep={setStep} />}
      {step === 'B'    && <StepB setStep={setStep} setSelectedSide={setSelectedSide} />}
      {step === 'B1'   && <StepB1 setStep={setStep} />}
      {step === 'BB'   && <StepBB setStep={setStep} />}
      {step === 'BC'   && <StepBC setStep={setStep} />}
      {step === 'C'    && <StepC setStep={setStep} selectedSide={selectedSide} />}
      {step === 'CL'   && <StepCL setStep={setStep} selectedSide={selectedSide} />}
      {step === 'CG'   && <StepCG setStep={setStep} selectedSide={selectedSide} />}
      {step === 'CD'   && <StepCD setStep={setStep} />}
      {step === 'CDD'  && <StepCDD setStep={setStep} />}
      {step === 'CGI'  && <StepCGI setStep={setStep} />}
      {step === 'CDI'  && <StepCDI setStep={setStep} />}
      {step === 'D'    && <StepD setStep={setStep} />}
      {step === 'DB'    && <StepDB setStep={setStep} />}
      {step === 'DC'    && <StepDC setStep={setStep} />}
      {step === 'E'    && <StepE setStep={setStep} />}
      {step === 'E1'   && <StepE1 setStep={setStep} />}
      {step === 'F1'   && <StepF1 setStep={setStep} />}
      {step === 'F'    && <StepF setStep={setStep} />}
      {step === 'G'    && <StepG setStep={setStep} />}
      {step === 'H'    && <StepH setStep={setStep} />}
      {step === 'R'    && <StepR setStep={setStep} />}
      {step === 'I'    && (
        <StepI
          setStep={setStep}
          reportRef={reportRef}
          topLeftText={topLeftText}
          copyConclusions={copyConclusions}
          figuras={figuras}
          setFiguras={setFiguras}
          activeTab={activeTab}
        />
      )}
      {step === 'A2'   && <StepA2 setStep={setStep} />}
      {step === 'B2'   && <StepB2 setStep={setStep} setSelectedSide={setSelectedSide} />}
      {step === 'B12'  && <StepB12 setStep={setStep} />}
      {step === 'C2'   && <StepC2 setStep={setStep} selectedSide={selectedSide} />}
      {step === 'CL2'  && <StepCL2 setStep={setStep} selectedSide={selectedSide} />}
      {step === 'CG2'  && <StepCG2 setStep={setStep} selectedSide={selectedSide} />}
      {step === 'CD2'  && <StepCD2 setStep={setStep} />}
      {step === 'CDD2' && <StepCDD2 setStep={setStep} />}
      {step === 'CGI2' && <StepCGI2 setStep={setStep} />}
      {step === 'CDI2' && <StepCDI2 setStep={setStep} />}
      {step === 'D2'   && <StepD2 setStep={setStep} />}
      {step === 'E2'   && <StepE2 setStep={setStep} />}
      {step === 'E12'  && <StepE12 setStep={setStep} />}
      {step === 'F12'  && <StepF12 setStep={setStep} />}
      {step === 'F2'   && <StepF2 setStep={setStep} />}
      {step === 'G2'   && <StepG2 setStep={setStep} />}
      {step === 'H2'   && <StepH2 setStep={setStep} />}
    </div>
  );
};

// ── Pasos ─────────────────────────────────────────────────────────────────────

const StepA = ({ setStep }) => (
  <div>
    <NavRow onReset={() => window.location.reload()} />
    <StepTitle>Evolución</StepTitle>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value='evolucion_aguda' title='NEUROPATÍA AGUDA' displayText="NEUROPATÍA AGUDA" />
    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value='evolucion_subaguda' title='NEUROPATÍA SUBAGUDA' displayText="NEUROPATÍA SUBAGUDA" />
    </div>
    <div onClick={() => setStep('B')}>
      <ConclusionButton value='evolucion_cronica' title='NEUROPATÍA CRÓNICA ' displayText="NEUROPATÍA CRÓNICA" />
    </div>
  </div>
);

const StepB = ({ setStep, setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
                      removeConclusion('evolucion_aguda');
            removeConclusion('evolucion_subaguda');
            removeConclusion('evolucion_cronica');
            
            removeConclusion('MEDIANO');
            removeConclusion('INTEROSEOANTERIOR');
            removeConclusion('ACCESORIO');
            removeConclusion('AXILAR');
            removeConclusion('MUSCULOCUTANEO');
            removeConclusion('RADIAL');
            removeConclusion('RADIAL_SUPERFICIAL');
            removeConclusion('INTEROSEO_POSTERIOR');
            removeConclusion('SUPRAESCAPULAR');
            removeConclusion('ULNAR');
            removeConclusion('DORSAL_CUTANEO');
            removeConclusion('FRENICO');
            removeConclusion('TORACODORSAL');
            removeConclusion('TORACICO_LARGO');
            removeConclusion('CIATICO');
            removeConclusion('GLUTEO_INFERIOR');
            removeConclusion('GLUTEO_MEDIO');
            removeConclusion('FEMORAL');
            removeConclusion('SAFENO');
            removeConclusion('OBTURADOR');
            removeConclusion('NERVIO_PERONEO');
            removeConclusion('PERONEO_SUPERFICIAL');
            removeConclusion('PERONEO_PROFUNDO');
            removeConclusion('TIBIAL');
            removeConclusion('SURAL');
            removeConclusion('PLANTAR_MEDIAL');
            removeConclusion('PLANTAR_LATERAL');
            removeConclusion('PUDENDO');
            removeConclusion('FACIAL'); 
          
          setStep('A'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Nervio</StepTitle>
  <AccordionContainer>
      <Accordion title='MIEMBROS SUPERIORES' value='NERVIOS SUPERIORES' type='external'>
        <div onClick={() => { setSelectedSide('MEDIANO'); setStep('B1'); }}>
          <ConclusionButton value='MEDIANO' title=' DE NERVIO MEDIANO' displayText='MEDIANO' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEOANTERIOR'); setStep('BB'); }}>
          <ConclusionButton value='INTEROSEOANTERIOR' title=' DE NERVIO INTERÓSEO ANTERIOR' displayText='INTERÓSEO ANTERIOR' /></div>
        {/* <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B1'); }}>
          <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div> */}
        <div onClick={() => { setSelectedSide('AXILAR'); setStep('BB'); }}>
          <ConclusionButton value='AXILAR' title=' DE NERVIO AXILAR' displayText='AXILAR' /></div>
        <div onClick={() => { setSelectedSide('MUSCULOCUTANEO'); setStep('B1'); }}>
          <ConclusionButton value='MUSCULOCUTANEO' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' /></div>
        <div onClick={() => { setSelectedSide('RADIAL'); setStep('B1'); }}>
          <ConclusionButton value='RADIAL' title=' DE NERVIO RADIAL' displayText='RADIAL' /></div>
        <div onClick={() => { setSelectedSide('RADIAL_SUPERFICIAL'); setStep('BC'); }}>
          <ConclusionButton value='RADIAL_SUPERFICIAL' title=' DE NERVIO RADIAL SUPERFICIAL' displayText='RADIAL SUPERFICIAL' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEO_POSTERIOR'); setStep('BB'); }}>
          <ConclusionButton value='INTEROSEO_POSTERIOR' title=' DE NERVIO INTERÓSEO POSTERIOR' displayText='INTERÓSEO POSTERIOR' /></div>
        <div onClick={() => { setSelectedSide('SUPRAESCAPULAR'); setStep('BB'); }}>
          <ConclusionButton value='SUPRAESCAPULAR' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' /></div>
        <div onClick={() => { setSelectedSide('ULNAR'); setStep('B1'); }}>
          <ConclusionButton value='ULNAR' title=' DE NERVIO ULNAR' displayText='ULNAR' /></div>
        <div onClick={() => { setSelectedSide('DORSAL_CUTANEO'); setStep('BC'); }}>
          <ConclusionButton value='DORSAL_CUTANEO' title=' DE NERVIO DORSAL CUTÁNEO' displayText='DORSAL CUTÁNEO' /></div>
        {/* <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
          <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div> */}
        <div onClick={() => { setSelectedSide('TORACODORSAL'); setStep('BB'); }}>
          <ConclusionButton value='TORACODORSAL' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' /></div>
        <div onClick={() => { setSelectedSide('TORACICO_LARGO'); setStep('BB'); }}>
          <ConclusionButton value='TORACICO_LARGO' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' /></div>
          <div onClick={() => { setSelectedSide('ANTEBRAQUIAL_CUTANEO'); setStep('BC'); }}>
          <ConclusionButton value='ANTEBRAQUIAL_CUTANEO' title=' DE NERVIO ANTEBRAQUIAL MEDIAL' displayText='ANTEBRAQUIAL MEDIAL' /></div>
          <div onClick={() => { setSelectedSide('ANTEBRAQUIAL LATERAL'); setStep('BC'); }}>
          <ConclusionButton value='MUSCULOCUTANEO' title=' DE NERVIO ANTEBRAQUIAL LATERAL' displayText='ANTEBRAQUIAL LATERAL' /></div>
              
      </Accordion>

      <Accordion title='CRANEALES' value='CRANEALES' type='external'>
        <div onClick={() => { setSelectedSide('FRENICO'); setStep('BB'); }}>
            <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div>
        <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('BB'); }}>
            <ConclusionButton value='ACCESORIO' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div>
        <div onClick={() => { setSelectedSide('FACIAL'); setStep('BB'); }}>
            <ConclusionButton value='FACIAL' title=' DE NERVIO FACIAL' displayText='FACIAL' /></div>
      </Accordion>

      <Accordion title='MIEMBROS INFERIORES' value='NERVIOS INFERIORES' type='external'>

        <div onClick={() => { setSelectedSide('GLUTEO_INFERIOR'); setStep('BB'); }}>
          <ConclusionButton value='GLUTEO_INFERIOR' title=' DE NERVIO GLÚTEO INFERIOR' displayText='GLÚTEO INFERIOR' /></div>
        <div onClick={() => { setSelectedSide('GLUTEO_MEDIO'); setStep('BB'); }}>
          <ConclusionButton value='GLUTEO_MEDIO' title=' DE NERVIO GLÚTEO SUPERIOR' displayText='GLÚTEO SUPERIOR' /></div>
        <div onClick={() => { setSelectedSide('FEMORAL'); setStep('B1'); }}>
          <ConclusionButton value='FEMORAL' title=' DE NERVIO FEMORAL' displayText='FEMORAL' /></div>
        <div onClick={() => { setSelectedSide('FEMOROCUTÁNEO_LATERAL'); setStep('BC'); }}>
          <ConclusionButton value='FEMOROCUTÁNEO_LATERAL' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' /></div>
        <div onClick={() => { setSelectedSide('SAFENO'); setStep('BC'); }}>
          <ConclusionButton value='SAFENO' title=' DE NERVIO SAFENO' displayText='SAFENO' /></div>
        <div onClick={() => { setSelectedSide('OBTURADOR'); setStep('BB'); }}>
          <ConclusionButton value='OBTURADOR' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' /></div>
        <div onClick={() => { setSelectedSide('NERVIO_PERONEO'); setStep('B1'); }}>
          <ConclusionButton value='NERVIO_PERONEO' title=' DE NERVIO PERONEO COMÚN' displayText='PERONEO COMÚN' /></div>
        <div onClick={() => { setSelectedSide('PERONEO_SUPERFICIAL'); setStep('BC'); }}>
          <ConclusionButton value='PERONEO_SUPERFICIAL' title=' DE NERVIO PERONEO SUPERFICIAL' displayText='PERONEO SUPERFICIAL' /></div>
        <div onClick={() => { setSelectedSide('PERONEO_PROFUNDO'); setStep('B1'); }}>
          <ConclusionButton value='PERONEO_PROFUNDO' title=' DE NERVIO PERONEO PROFUNDO' displayText='PERONEO PROFUNDO' /></div>
        <div onClick={() => { setSelectedSide('TIBIAL'); setStep('B1'); }}>
          <ConclusionButton value='TIBIAL' title=' DE NERVIO TIBIAL' displayText='TIBIAL' /></div>
        <div onClick={() => { setSelectedSide('SURAL'); setStep('BC'); }}>
          <ConclusionButton value='SURAL' title=' DE NERVIO SURAL' displayText='SURAL' /></div>
        <div onClick={() => { setSelectedSide('PLANTAR_MEDIAL'); setStep('B1'); }}>
          <ConclusionButton value='PLANTAR_MEDIAL' title=' DE NERVIO PLANTAR MEDIAL' displayText='PLANTAR MEDIAL' /></div>
        <div onClick={() => { setSelectedSide('PLANTAR_LATERAL'); setStep('B1'); }}>
          <ConclusionButton value='PLANTAR_LATERAL' title=' DE NERVIO PLANTAR LATERAL' displayText='PLANTAR LATERAL' /></div>
          <div onClick={() => { setSelectedSide('ILIOINGUINAL'); setStep('BC'); }}>
          <ConclusionButton value='ILIOINGUINAL' title=' DE NERVIO ILIOINGUINAL' displayText='ILIOINGUINAL' /></div>

      </Accordion>

      <Accordion title='SACRO' value='SACRO' type='external'>
        <div onClick={() => { setSelectedSide('CIATICO'); setStep('B1'); }}>
          <ConclusionButton value='CIATICO' title=' DE NERVIO CIÁTICO' displayText='CIÁTICO' /></div>
        <div onClick={() => { setSelectedSide('PUDENDO'); setStep('B1'); }}>
          <ConclusionButton value='PUDENDO' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepB1 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO')
              removeConclusion('DERECHO')
              removeConclusion('BILATERAL')
              removeConclusion('MEDIANO');
              removeConclusion('INTEROSEOANTERIOR');
              removeConclusion('ACCESORIO');
              removeConclusion('AXILAR');
              removeConclusion('MUSCULOCUTANEO');
              removeConclusion('RADIAL');
              removeConclusion('RADIAL_SUPERFICIAL');
              removeConclusion('INTEROSEO_POSTERIOR');
              removeConclusion('SUPRAESCAPULAR');
              removeConclusion('ULNAR');
              removeConclusion('DORSAL_CUTANEO');
              removeConclusion('FRENICO');
              removeConclusion('TORACODORSAL');
              removeConclusion('TORACICO_LARGO');
              removeConclusion('CIATICO');
              removeConclusion('GLUTEO_INFERIOR');
              removeConclusion('GLUTEO_MEDIO');
              removeConclusion('FEMORAL');
              removeConclusion('FEMOROCUTÁNEO_LATERAL');
              removeConclusion('SAFENO');
              removeConclusion('OBTURADOR');
              removeConclusion('NERVIO_PERONEO');
              removeConclusion('PERONEO_SUPERFICIAL');
              removeConclusion('PERONEO_PROFUNDO');
              removeConclusion('TIBIAL');
              removeConclusion('SURAL');
              removeConclusion('PLANTAR_MEDIAL');
              removeConclusion('PLANTAR_LATERAL');
              removeConclusion('PUDENDO');
              removeConclusion('FACIAL'); 
          setStep('B'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Lado</StepTitle>
      <div onClick={() => setStep('C')}>
        <ConclusionButton value='IZQUIERDO' title=' IZQUIERDO,' displayText='IZQUIERDO' />
      </div>
      <div onClick={() => setStep('CL')}>
        <ConclusionButton value='DERECHO' title=' DERECHO,' displayText='DERECHO' />
      </div>
      <AccordionContainer>
        <InternalAccordionContainer>
          <Accordion title='BILATERIAL' value={'BILATERAL'} type='internal'>
            <div onClick={() => setStep('CG')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} />
            </div>
            <div onClick={() => setStep('CGI')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} />
            </div>
            {/* <div onClick={() => setStep('CG')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} />
            </div> */}
          </Accordion>
        </InternalAccordionContainer>
      </AccordionContainer>
    </div>
  );
};

const StepBB = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO')
              removeConclusion('DERECHO')
              removeConclusion('BILATERAL')
              removeConclusion('MEDIANO');
              removeConclusion('INTEROSEOANTERIOR');
              removeConclusion('ACCESORIO');
              removeConclusion('AXILAR');
              removeConclusion('MUSCULOCUTANEO');
              removeConclusion('RADIAL');
              removeConclusion('RADIAL_SUPERFICIAL');
              removeConclusion('INTEROSEO_POSTERIOR');
              removeConclusion('SUPRAESCAPULAR');
              removeConclusion('ULNAR');
              removeConclusion('DORSAL_CUTANEO');
              removeConclusion('FRENICO');
              removeConclusion('TORACODORSAL');
              removeConclusion('TORACICO_LARGO');
              removeConclusion('CIATICO');
              removeConclusion('GLUTEO_INFERIOR');
              removeConclusion('GLUTEO_MEDIO');
              removeConclusion('FEMORAL');
              removeConclusion('FEMOROCUTÁNEO_LATERAL');
              removeConclusion('SAFENO');
              removeConclusion('OBTURADOR');
              removeConclusion('NERVIO_PERONEO');
              removeConclusion('PERONEO_SUPERFICIAL');
              removeConclusion('PERONEO_PROFUNDO');
              removeConclusion('TIBIAL');
              removeConclusion('SURAL');
              removeConclusion('PLANTAR_MEDIAL');
              removeConclusion('PLANTAR_LATERAL');
              removeConclusion('PUDENDO');
              removeConclusion('FACIAL'); 
          setStep('B'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Lado B</StepTitle>
      <div onClick={() => setStep('C')}>
        <ConclusionButton value='IZQUIERDO' title=' IZQUIERDO,' displayText='IZQUIERDO' />
      </div>
      <div onClick={() => setStep('CL')}>
        <ConclusionButton value='DERECHO' title=' DERECHO,' displayText='DERECHO' />
      </div>
      <AccordionContainer>
        <InternalAccordionContainer>
          <Accordion title='BILATERIAL' value={'BILATERAL'} type='internal'>
            <div onClick={() => setStep('CG')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} />
            </div>
            <div onClick={() => setStep('CGI')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} />
            </div>
            {/* <div onClick={() => setStep('CG')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} />
            </div> */}
          </Accordion>
        </InternalAccordionContainer>
      </AccordionContainer>
    </div>
  );
};

const StepBC = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO')
              removeConclusion('DERECHO')
              removeConclusion('BILATERAL')
              removeConclusion('MEDIANO');
              removeConclusion('INTEROSEOANTERIOR');
              removeConclusion('ACCESORIO');
              removeConclusion('AXILAR');
              removeConclusion('MUSCULOCUTANEO');
              removeConclusion('RADIAL');
              removeConclusion('RADIAL_SUPERFICIAL');
              removeConclusion('INTEROSEO_POSTERIOR');
              removeConclusion('SUPRAESCAPULAR');
              removeConclusion('ULNAR');
              removeConclusion('DORSAL_CUTANEO');
              removeConclusion('FRENICO');
              removeConclusion('TORACODORSAL');
              removeConclusion('TORACICO_LARGO');
              removeConclusion('CIATICO');
              removeConclusion('GLUTEO_INFERIOR');
              removeConclusion('GLUTEO_MEDIO');
              removeConclusion('FEMORAL');
              removeConclusion('FEMOROCUTÁNEO_LATERAL');
              removeConclusion('SAFENO');
              removeConclusion('OBTURADOR');
              removeConclusion('NERVIO_PERONEO');
              removeConclusion('PERONEO_SUPERFICIAL');
              removeConclusion('PERONEO_PROFUNDO');
              removeConclusion('TIBIAL');
              removeConclusion('SURAL');
              removeConclusion('PLANTAR_MEDIAL');
              removeConclusion('PLANTAR_LATERAL');
              removeConclusion('PUDENDO');
              removeConclusion('FACIAL'); 
          setStep('B'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Lado C</StepTitle>
      <div onClick={() => setStep('C')}>
        <ConclusionButton value='IZQUIERDO' title=' IZQUIERDO,' displayText='IZQUIERDO' />
      </div>
      <div onClick={() => setStep('CL')}>
        <ConclusionButton value='DERECHO' title=' DERECHO,' displayText='DERECHO' />
      </div>
      <AccordionContainer>
        <InternalAccordionContainer>
          <Accordion title='BILATERIAL' value={'BILATERAL'} type='internal'>
            <div onClick={() => setStep('CG')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} />
            </div>
            <div onClick={() => setStep('CGI')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} />
            </div>
            {/* <div onClick={() => setStep('CG')}>
              <ConclusionButton value='IZQUIERDO' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} />
            </div> */}
          </Accordion>
        </InternalAccordionContainer>
      </AccordionContainer>
    </div>
  );
};

const StepCG = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_COMPgeneralizada`)

          setStep('B1'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CDD')}>
        <ConclusionButton value='focalizada' title=' focalizada a nivel ' displayText={'FOCALIZADA '} />
      </div>
      <div onClick={() => setStep('CDD')}>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA ' displayText={'GENERALIZADA'} />
      </div>
    </div>
  );
};

const StepCGI = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO')
            removeConclusion('DERECHO')
            removeConclusion('BILATERAL')
            removeConclusion('focalizada')
            removeConclusion('segmentaria')
            removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
            removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
            removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
            removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
            removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
            removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
            removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
            removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
            removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
            removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
            removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
            
            removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
            removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
            removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
            removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
            removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
            removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
            removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
            removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
            removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
            removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

            removeConclusion(`${selectedSide}_COMPgeneralizada`)

          setStep('B1'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CDI')}>
        <ConclusionButton value='focalizada' title=' focalizada a nivel ' displayText={'FOCALIZADA'} />
      </div>
      <div onClick={() => setStep('CDI')}>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA ' displayText={'GENERALIZADA'} />
      </div>
    </div>
  );
};

const StepC = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO')
              removeConclusion('DERECHO')
              removeConclusion('BILATERAL')
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              // removeConclusion('car', 'cari1', 'car2', 'car3', 'car4', 'car5', 'car6', 'car7', 'car8', 'cari1', 'cari2', 'cari3', 'cari4', 'cari5', 'cari6', 'cari7', 'cari8')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_IZQgeneralizada`)

          setStep('B1'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CD')}>
        <ConclusionButton value='focalizada' title=' focalizada a nivel ' displayText={'FOCALIZADA'} />
      </div>
      <div onClick={() => setStep('CD')}>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D')}>
        <ConclusionButton value={`${selectedSide}_IZQgeneralizada`} title=' GENERALIZADA ' displayText={'GENERALIZADA'} />
      </div>
    </div>
  );
};

const StepCL = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO')
              removeConclusion('DERECHO')
              removeConclusion('BILATERAL')
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_DERgeneralizada`)

          setStep('B1'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CD')}>
        <ConclusionButton value='focalizada' title=' focalizada a nivel ' displayText={'FOCALIZADA'} />
      </div>
      <div onClick={() => setStep('CD')}>
        <ConclusionButton value='segmentaria' title=' SEGMENTARIA A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D')}>
        <ConclusionButton value={`${selectedSide}_DERgeneralizada`} title=' GENERALIZADA ' displayText='GENERALIZADA' />
      </div>
    </div>
  );
};

const StepCD = ({ setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledSegm } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('BILATERAL')
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('seguir')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

          setStep('C'); }}
        onReset={() => window.location.reload()}
        onConfirm={() => { setButtonsDisabled(true); setbuttonsDisabledSegm(true); setStep('D'); }}
      />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '90px 0 10px', textAlign: 'center' }}>
        Seleccionar el nivel de lesión con el puntero
      </p>
      <SiguienteBtn onClick={() => { setButtonsDisabled(true); setbuttonsDisabledSegm(true); setStep('D'); }} />
    </div>
  );
};

const StepCDD = ({ setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledBILT, setbuttonsDisabledBITSeg } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
              removeConclusion('BILATERAL')
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('seguir')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

          setStep('CG'); }}
        onReset={() => window.location.reload()}
        onConfirm={() => { setButtonsDisabled(true); setbuttonsDisabledBILT(true); setbuttonsDisabledBITSeg(true); setStep('D'); }}
      />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '90px 0 10px', textAlign: 'center' }}>
        Seleccionar el nivel de lesión del lado derecho con el puntero
      </p>
      <SiguienteBtn onClick={() => { setButtonsDisabled(true); setbuttonsDisabledBILT(true); setbuttonsDisabledBITSeg(true); setStep('D'); }} />
    </div>
  );
};

const StepCDI = ({ setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledBILT, setbuttonsDisabledBITSeg } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('BILATERAL')
              removeConclusion('focalizada')
              removeConclusion('segmentaria')
              removeConclusion('seguir')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

          setStep('CGI'); }}
        onReset={() => window.location.reload()}
        onConfirm={() => { setButtonsDisabled(true); setbuttonsDisabledBILT(true); setbuttonsDisabledBITSeg(true); setStep('D'); }}
      />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '90px 0 10px', textAlign: 'center' }}>
        Seleccionar el nivel de lesión del lado izquierdo con el puntero
      </p>
      <SiguienteBtn onClick={() => { setButtonsDisabled(true); setbuttonsDisabledBILT(true); setbuttonsDisabledBITSeg(true); setStep('D'); }} />
    </div>
  );
};

const StepD = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
          removeConclusion('SIN DENERVACIÓN ACTIVA');
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
          removeConclusion('SIN DENERVACIÓN ACTIVA');
          removeConclusion('RETARDO EN LA CONDUCCIÓN');
          removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN');
          removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN');
          removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA');
          removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA');

          setStep('CD'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Tipo</StepTitle>
  <AccordionContainer>
      <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='DESMIELINIZANTE ' value='DESMIELINIZANTE' type='external'>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} /></div>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} /></div>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} /></div>
      </Accordion>
      </AccordionContainer>

      <AccordionContainer>
      <Accordion title='MIXTA' value='MIXTA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepDB = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
          removeConclusion('SIN DENERVACIÓN ACTIVA');
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
          removeConclusion('SIN DENERVACIÓN ACTIVA');
          removeConclusion('RETARDO EN LA CONDUCCIÓN');
          removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN');
          removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN');
          removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA');
          removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA');

          setStep('CD'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Tipo B</StepTitle>
  <AccordionContainer>
      <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='DESMIELINIZANTE ' value='DESMIELINIZANTE' type='external'>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} /></div>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} /></div>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} /></div>
      </Accordion>
      </AccordionContainer>

      <AccordionContainer>
      <Accordion title='MIXTA' value='MIXTA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepDC = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
          removeConclusion('SIN DENERVACIÓN ACTIVA');
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
          removeConclusion('SIN DENERVACIÓN ACTIVA');
          removeConclusion('RETARDO EN LA CONDUCCIÓN');
          removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN');
          removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN');
          removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA');
          removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA');

          setStep('CD'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Tipo C</StepTitle>
  <AccordionContainer>
      <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)' displayText={' DENERVACIÓN DIFUSA (++++) '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)' displayText={'DENERVACIÓN ABUNDANTE (+++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)' displayText={'DENERVACIÓN PROGRESIVA (++)'} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)' title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)' displayText={'DENERVACIÓN DISCRETA (+/+)'} /></div>
        <div onClick={() => setStep('F')}>
          <ConclusionButton value='SIN DENERVACIÓN ACTIVA' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} /></div>
      </Accordion>
      </AccordionContainer>
      <AccordionContainer>
      <Accordion title='DESMIELINIZANTE ' value='DESMIELINIZANTE' type='external'>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN ' title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN ' displayText={'POR RETARDO EN LA CONDUCCIÓN '} /></div>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN' displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} /></div>
        <div onClick={() => setStep('E1')}>
          <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} /></div>
      </Accordion>
      </AccordionContainer>

      <AccordionContainer>
      <Accordion title='MIXTA' value='MIXTA' type='external'>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA ' title=' TIPO DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA ' displayText={'DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA '} /></div>
        <div onClick={() => setStep('E')}>
          <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA ' title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA' displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepE = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
              removeConclusion(' MOTORAS ');
              removeConclusion(' SENSITIVAS ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTORA)');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
              removeConclusion('SIN DENERVACIÓN ACTIVA');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
              removeConclusion('SIN DENERVACIÓN ACTIVA');
              removeConclusion('RETARDO EN LA CONDUCCIÓN');
              removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN');
              removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN');
              removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA');
              removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA');

          setStep('D'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Fibras</StepTitle>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} />
      </div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
      </div>
      <div onClick={() => setStep('F')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTORA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTORA), ' displayText={' MIXTAS (SENSITIVO-MOTORA) '} />
      </div>
    </div>
  );
};

const StepE1 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
              removeConclusion(' MOTORAS ');
              removeConclusion(' SENSITIVAS ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTORA)');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
              removeConclusion('SIN DENERVACIÓN ACTIVA');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)');
              removeConclusion('SIN DENERVACIÓN ACTIVA');
              removeConclusion('RETARDO EN LA CONDUCCIÓN');
              removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN');
              removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN');
              removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA');
              removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA');

          setStep('D'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Fibras</StepTitle>
      <div onClick={() => setStep('F1')}>
        <ConclusionButton value=' MOTORAS ' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} />
      </div>
      <div onClick={() => setStep('F1')}>
        <ConclusionButton value=' SENSITIVAS ' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
      </div>
      <div onClick={() => setStep('F1')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTORA)' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTORA), ' displayText={' MIXTAS (SENSITIVO-MOTORA) '} />
      </div>
    </div>
  );
};

const StepF = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion(' LEVE (NEUROAPRAXIA)');
          removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)');
          removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)');
          removeConclusion(' MOTORAS ');
          removeConclusion(' SENSITIVAS ');
          removeConclusion(' MIXTAS (SENSITIVO-MOTORA)');
 
          setStep('E'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Intensidad</StepTitle>
      <div onClick={() => setStep('G')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title=' INTENSIDAD LEVE. ' displayText={' LEVE'} />
      </div>
      <div onClick={() => setStep('G')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title=' INTENSIDAD MODERADA. ' displayText={' MODERADA '} />
      </div>
      <div onClick={() => setStep('G')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title=' INTENSIDAD SEVERA. ' displayText={' SEVERA '} />
      </div>
    </div>
  );
};

const StepF1 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => {  
          removeConclusion(' LEVE (NEUROAPRAXIA)');
          removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)');
          removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)');
          removeConclusion(' MOTORAS ');
          removeConclusion(' SENSITIVAS ');
          removeConclusion(' MIXTAS (SENSITIVO-MOTORA)');

          setStep('E1'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Intensidad</StepTitle>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)' title=' INTENSIDAD LEVE. ' displayText={' LEVE'} />
      </div>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)' title=' INTENSIDAD MODERADA. ' displayText={' MODERADA '} />
      </div>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)' title=' INTENSIDAD SEVERA. ' displayText={' SEVERA '} />
      </div>
    </div>
  );
};

const StepG = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion(' CON REINERVACIÓN ACTIVA ');
          removeConclusion('  REINERVACIÓN ACTIVA ');
          removeConclusion(' LEVE (NEUROAPRAXIA)');
          removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)');
          removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)');

          setStep('F'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Reinervación</StepTitle>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA ' title=' REINERVACIÓN ACTIVA; ' displayText={'REINERVACIÓN ACTIVA'} />
      </div>
      <div onClick={() => setStep('H')}>
        <ConclusionButton value='  REINERVACIÓN ACTIVA ' title=' REINERVACIÓN INACTIVA; ' displayText={'REINERVACIÓN INACTIVA'} />
      </div>
    </div>
  );
};

const StepH = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('completo');
          removeConclusion('parcial_funcional');
          removeConclusion('pobre');
          removeConclusion('nulo');
          removeConclusion(' CON REINERVACIÓN ACTIVA ');
          removeConclusion('  REINERVACIÓN ACTIVA ');

          setStep('G'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Pronóstico</StepTitle>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='completo' title='PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'} /></div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='parcial_funcional' title='PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} /></div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='pobre' title='PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} /></div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='nulo' title='PRONÓSTICO DE RECUPERACIÓN NULA.' displayText={'RECUPERACIÓN NULA'} /></div> 
    </div>
  );
};

const StepR = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { removeConclusion('completo'); removeConclusion('parcial_funcional'); removeConclusion('pobre'); removeConclusion('nulo'); setStep('H'); }}
        onReset={() => window.location.reload()}
      />
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, textAlign: 'center', margin: '40px 0 20px' }}>
        ¿Deseas agregar un nuevo nervio?
      </p>
      <div style={{ textAlign: 'center' }} onClick={() => setStep('A2')}>
        <ConclusionButton value='salto' title='' displayText={'AGREGAR NUEVO'} />
      </div>
      <div style={{ textAlign: 'center', paddingTop: 16 }} onClick={() => setStep('I')}>
        <ConclusionButton value='fin' title=' ' displayText={'FINALIZAR'} />
      </div>
    </div>
  );
};

// ── Segundo nervio (flujo "2") ─────────────────────────────────────────────────

const StepA2 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { removeConclusion('evolucion_aguda2'); removeConclusion('evolucion_subaguda2'); removeConclusion('evolucion_cronica2'); setStep('R'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Evolución</StepTitle>
      <div onClick={() => setStep('B2')}>
        <ConclusionButton value='evolucion_aguda2' title='NEUROPATÍA AGUDA' displayText="NEUROPATÍA AGUDA" />
      </div>
      <div onClick={() => setStep('B2')}>
        <ConclusionButton value='evolucion_subaguda2' title='NEUROPATÍA SUBAGUDA' displayText="NEUROPATÍA SUBAGUDA" />
      </div>
      <div onClick={() => setStep('B2')}>
        <ConclusionButton value='evolucion_cronica2' title='NEUROPATÍA CRÓNICA ' displayText="NEUROPATÍA CRÓNICA" />
      </div>
    </div>
  );
};

const StepB2 = ({ setStep, setSelectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('evolucion_aguda2');
          removeConclusion('evolucion_subaguda2');
          removeConclusion('evolucion_cronica2');
          removeConclusion('MEDIANO2');
          removeConclusion('INTEROSEOANTERIOR2');
          removeConclusion('ACCESORIO2');
          removeConclusion('AXILAR2');
          removeConclusion('MUSCULOCUTANEO2');
          removeConclusion('RADIAL2');
          removeConclusion('RADIAL_SUPERFICIAL2');
          removeConclusion('INTEROSEO_POSTERIOR2');
          removeConclusion('SUPRAESCAPULAR2');
          removeConclusion('ULNAR2');
          removeConclusion('DORSAL_CUTANEO2');
          removeConclusion('FRENICO2');
          removeConclusion('TORACODORSAL2');
          removeConclusion('TORACICO_LARGO2');
          removeConclusion('CIATICO2');
          removeConclusion('GLUTEO_INFERIOR2');
          removeConclusion('GLUTEO_MEDIO2');
          removeConclusion('FEMORAL2');
          removeConclusion('FEMOROCUTÁNEO_LATERAL2');
          removeConclusion('SAFENO2');
          removeConclusion('OBTURADOR2');
          removeConclusion('NERVIO_PERONEO2');
          removeConclusion('PERONEO_SUPERFICIAL2');
          removeConclusion('PERONEO_PROFUNDO2');
          removeConclusion('TIBIAL2');
          removeConclusion('SURAL2');
          removeConclusion('PLANTAR_MEDIAL2');
          removeConclusion('PLANTAR_LATERAL2');
          removeConclusion('PUDENDO2');
          removeConclusion('FACIAL2');

          setStep('A2'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Nervio</StepTitle>
  <AccordionContainer>
      <Accordion title='MIEMBROS SUPERIORES' value='NERVIOS SUPERIORES2' type='external'>
        <div onClick={() => { setSelectedSide('MEDIANO2'); setStep('B12'); }}>
          <ConclusionButton value='MEDIANO2' title=' DE NERVIO MEDIANO' displayText='MEDIANO' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEOANTERIOR2'); setStep('B12'); }}>
          <ConclusionButton value='INTEROSEOANTERIOR2' title=' DE NERVIO INTERÓSEO ANTERIOR' displayText='INTERÓSEO ANTERIOR' /></div>
        {/* <div onClick={() => { setSelectedSide('ACCESORIO'); setStep('B12'); }}>
          <ConclusionButton value='ACCESORIO2' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div> */}
        <div onClick={() => { setSelectedSide('AXILAR2'); setStep('B12'); }}>
          <ConclusionButton value='AXILAR2' title=' DE NERVIO AXILAR' displayText='AXILAR' /></div>
        <div onClick={() => { setSelectedSide('MUSCULOCUTANEO2'); setStep('B12'); }}>
          <ConclusionButton value='MUSCULOCUTANEO2' title=' DE NERVIO MUSCULOCUTÁNEO' displayText='MUSCULOCUTÁNEO' /></div>
        <div onClick={() => { setSelectedSide('RADIAL2'); setStep('B12'); }}>
          <ConclusionButton value='RADIAL2' title=' DE NERVIO RADIAL' displayText='RADIAL' /></div>
        <div onClick={() => { setSelectedSide('RADIAL_SUPERFICIAL2'); setStep('B12'); }}>
          <ConclusionButton value='RADIAL_SUPERFICIAL2' title=' DE NERVIO RADIAL SUPERFICIAL' displayText='RADIAL SUPERFICIAL' /></div>
        <div onClick={() => { setSelectedSide('INTEROSEO_POSTERIOR2'); setStep('B12'); }}>
          <ConclusionButton value='INTEROSEO_POSTERIOR2' title=' DE NERVIO INTERÓSEO POSTERIOR' displayText='INTERÓSEO POSTERIOR' /></div>
        <div onClick={() => { setSelectedSide('SUPRAESCAPULAR2'); setStep('B12'); }}>
          <ConclusionButton value='SUPRAESCAPULAR2' title=' DE NERVIO SUPRAESCAPULAR' displayText='SUPRAESCAPULAR' /></div>
        <div onClick={() => { setSelectedSide('ULNAR2'); setStep('B12'); }}>
          <ConclusionButton value='ULNAR2' title=' DE NERVIO ULNAR' displayText='ULNAR' /></div>
        <div onClick={() => { setSelectedSide('DORSAL_CUTANEO2'); setStep('B12'); }}>
          <ConclusionButton value='DORSAL_CUTANEO2' title=' DE NERVIO DORSAL CUTÁNEO' displayText='DORSAL CUTÁNEO' /></div>
        {/* <div onClick={() => { setSelectedSide('FRENICO'); setStep('B1'); }}>
          <ConclusionButton value='FRENICO' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div> */}
        <div onClick={() => { setSelectedSide('TORACODORSAL2'); setStep('B12'); }}>
          <ConclusionButton value='TORACODORSAL2' title=' DE NERVIO TORACODORSAL' displayText='TORACODORSAL' /></div>
        <div onClick={() => { setSelectedSide('TORACICO_LARGO2'); setStep('B12'); }}>
          <ConclusionButton value='TORACICO_LARGO2' title=' DE NERVIO TORÁCICO LARGO' displayText='TORÁCICO LARGO' /></div>
      </Accordion>

      <Accordion title='CRANEALES' value='CRANEALES2' type='external'>
        <div onClick={() => { setSelectedSide('FRENICO2'); setStep('B12'); }}>
          <ConclusionButton value='FRENICO2' title=' DE NERVIO FRÉNICO' displayText='FRÉNICO' /></div>
        <div onClick={() => { setSelectedSide('ACCESORIO2'); setStep('B12'); }}>
          <ConclusionButton value='ACCESORIO2' title=' DE NERVIO ACCESORIO' displayText='ACCESORIO' /></div>
        <div onClick={() => { setSelectedSide('FACIAL2'); setStep('B12'); }}>
            <ConclusionButton value='FACIAL2' title=' DE NERVIO FACIAL' displayText='FACIAL' /></div>
      </Accordion>

      <Accordion title='MIEMBROS INFERIORES' value='NERVIOS INFERIORES2' type='external'>
        <div onClick={() => { setSelectedSide('CIATICO2'); setStep('B12'); }}>
          <ConclusionButton value='CIATICO2' title=' DE NERVIO CIÁTICO' displayText='CIÁTICO' /></div>
        <div onClick={() => { setSelectedSide('GLUTEO_INFERIOR'); setStep('B12'); }}>
          <ConclusionButton value='GLUTEO_INFERIOR2' title=' DE NERVIO GLÚTEO INFERIOR' displayText='GLÚTEO INFERIOR' /></div>
        <div onClick={() => { setSelectedSide('GLUTEO_MEDIO2'); setStep('B12'); }}>
          <ConclusionButton value='GLUTEO_MEDIO2' title=' DE NERVIO GLÚTEO SUPERIOR' displayText='GLÚTEO SUPERIOR' /></div>
        <div onClick={() => { setSelectedSide('FEMORAL2'); setStep('B12'); }}>
          <ConclusionButton value='FEMORAL2' title=' DE NERVIO FEMORAL' displayText='FEMORAL' /></div>
        <div onClick={() => { setSelectedSide('FEMOROCUTÁNEO_LATERAL2'); setStep('B12'); }}>
          <ConclusionButton value='FEMOROCUTÁNEO_LATERAL2' title=' DE NERVIO FEMOROCUTÁNEO LATERAL' displayText='FEMOROCUTÁNEO LATERAL' /></div>
        <div onClick={() => { setSelectedSide('SAFENO2'); setStep('B12'); }}>
          <ConclusionButton value='SAFENO2' title=' DE NERVIO SAFENO' displayText='SAFENO' /></div>
        <div onClick={() => { setSelectedSide('OBTURADOR2'); setStep('B12'); }}>
          <ConclusionButton value='OBTURADOR2' title=' DE NERVIO OBTURADOR' displayText='OBTURADOR' /></div>
        <div onClick={() => { setSelectedSide('NERVIO_PERONEO2'); setStep('B12'); }}>
          <ConclusionButton value='NERVIO_PERONEO2' title=' DE NERVIO PERONEO COMÚN' displayText='PERONEO COMÚN' /></div>
        <div onClick={() => { setSelectedSide('PERONEO_SUPERFICIAL2'); setStep('B12'); }}>
          <ConclusionButton value='PERONEO_SUPERFICIAL2' title=' DE NERVIO PERONEO SUPERFICIAL' displayText='PERONEO SUPERFICIAL' /></div>
        <div onClick={() => { setSelectedSide('PERONEO_PROFUNDO2'); setStep('B12'); }}>
          <ConclusionButton value='PERONEO_PROFUNDO2' title=' DE NERVIO PERONEO PROFUNDO' displayText='PERONEO PROFUNDO' /></div>
        <div onClick={() => { setSelectedSide('TIBIAL2'); setStep('B12'); }}>
          <ConclusionButton value='TIBIAL2' title=' DE NERVIO TIBIAL' displayText='TIBIAL' /></div>
        <div onClick={() => { setSelectedSide('SURAL2'); setStep('B12'); }}>
          <ConclusionButton value='SURAL2' title=' DE NERVIO SURAL' displayText='SURAL' /></div>
        <div onClick={() => { setSelectedSide('PLANTAR_MEDIAL2'); setStep('B12'); }}>
          <ConclusionButton value='PLANTAR_MEDIAL2' title=' DE NERVIO PLANTAR MEDIAL' displayText='PLANTAR MEDIAL' /></div>
        <div onClick={() => { setSelectedSide('PLANTAR_LATERAL2'); setStep('B12'); }}>
          <ConclusionButton value='PLANTAR_LATERAL2' title=' DE NERVIO PLANTAR LATERAL' displayText='PLANTAR LATERAL' /></div>
        <div onClick={() => { setSelectedSide('PUDENDO2'); setStep('B12'); }}>
          <ConclusionButton value='PUDENDO2' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
      </Accordion>

      <Accordion title='SACRO' value='SACRO2' type='external'>
        <div onClick={() => { setSelectedSide('CIATICO2'); setStep('B12'); }}>
          <ConclusionButton value='CIATICO2' title=' DE NERVIO CIÁTICO' displayText='CIÁTICO' /></div>
        <div onClick={() => { setSelectedSide('PUDENDO2'); setStep('B12'); }}>
          <ConclusionButton value='PUDENDO2' title=' DE NERVIO PUDENDO' displayText='PUDENDO' /></div>
      </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepB12 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
              removeConclusion('IZQUIERDO2')
              removeConclusion('DERECHO2')
              removeConclusion('BILATERAL2')
              removeConclusion('evolucion_aguda2');
              removeConclusion('evolucion_subaguda2');
              removeConclusion('evolucion_cronica2');
              removeConclusion('MEDIANO2');
              removeConclusion('INTEROSEOANTERIOR2');
              removeConclusion('ACCESORIO2');
              removeConclusion('AXILAR2');
              removeConclusion('MUSCULOCUTANEO2');
              removeConclusion('RADIAL2');
              removeConclusion('RADIAL_SUPERFICIAL2');
              removeConclusion('INTEROSEO_POSTERIOR2');
              removeConclusion('SUPRAESCAPULAR2');
              removeConclusion('ULNAR2');
              removeConclusion('DORSAL_CUTANEO2');
              removeConclusion('FRENICO2');
              removeConclusion('TORACODORSAL2');
              removeConclusion('TORACICO_LARGO2');
              removeConclusion('CIATICO2');
              removeConclusion('GLUTEO_INFERIOR2');
              removeConclusion('GLUTEO_MEDIO2');
              removeConclusion('FEMORAL2');
              removeConclusion('FEMOROCUTÁNEO_LATERAL2');
              removeConclusion('SAFENO2');
              removeConclusion('OBTURADOR2');
              removeConclusion('NERVIO_PERONEO2');
              removeConclusion('PERONEO_SUPERFICIAL2');
              removeConclusion('PERONEO_PROFUNDO2');
              removeConclusion('TIBIAL2');
              removeConclusion('SURAL2');
              removeConclusion('PLANTAR_MEDIAL2');
              removeConclusion('PLANTAR_LATERAL2');
              removeConclusion('PUDENDO2');
              removeConclusion('FACIAL2'); 
          setStep('B2'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Lado</StepTitle>
      <div onClick={() => setStep('C2')}>
        <ConclusionButton value='IZQUIERDO2' title=' IZQUIERDO,' displayText='IZQUIERDO' />
      </div>
      <div onClick={() => setStep('CL2')}>
        <ConclusionButton value='DERECHO2' title=' DERECHO,' displayText='DERECHO' />
      </div>
      <AccordionContainer>
        <InternalAccordionContainer>
          <Accordion title='BILATERIAL' value={'BILATERAL'} type='internal'>
            <div onClick={() => setStep('CG2')}>
              <ConclusionButton value='IZQUIERDO2' title=' BILATERAL CON PREDOMINIO DERECHO,' displayText={'PREDOMINIO DERECHO'} />
            </div>
            <div onClick={() => setStep('CGI2')}>
              <ConclusionButton value='IZQUIERDO2' title=' BILATERAL CON PREDOMINIO IZQUIERDO,' displayText={'PREDOMINIO IZQUIERDO'} />
            </div>
            {/* <div onClick={() => setStep('CG2')}>
              <ConclusionButton value='IZQUIERDO2' title=' BILATERAL,' displayText={'SIN PREDOMINIO'} />
            </div> */}
          </Accordion>
        </InternalAccordionContainer>
      </AccordionContainer>
    </div>
  );
};

const StepCG2 = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('IZQUIERDO2')
              removeConclusion('DERECHO2')
              removeConclusion('BILATERAL2')
              removeConclusion('focalizada2')
              removeConclusion('segmentaria2')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_COMPgeneralizada2`)

          setStep('B12'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CDD2')}>
        <ConclusionButton value='focalizada2' title=' focal a nivel ' displayText={'FOCALIZADA '} />
      </div>
      <div onClick={() => setStep('CDD2')}>
        <ConclusionButton value='segmentaria2' title=' EN SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada2`} title=' GENERALIZADA ' displayText={'GENERALIZADA'} />
      </div>
    </div>
  );
};

const StepCGI2 = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
            removeConclusion('IZQUIERDO2')
            removeConclusion('DERECHO2')
            removeConclusion('BILATERAL2')
            removeConclusion('focalizada2')
            removeConclusion('segmentaria2')
            removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
            removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
            removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
            removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
            removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
            removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
            removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
            removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
            removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
            removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
            removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
            
            removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
            removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
            removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
            removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
            removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
            removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
            removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
            removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
            removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
            removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

            removeConclusion(`${selectedSide}_COMPgeneralizada2`)

          setStep('B12'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CDI2')}>
        <ConclusionButton value='focalizada2' title=' focal a nivel ' displayText={'FOCALIZADA '} />
      </div>
      <div onClick={() => setStep('CDI2')}>
        <ConclusionButton value='segmentaria2' title=' EN SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_COMPgeneralizada`} title=' GENERALIZADA ' displayText={'GENERALIZADA'} />
      </div>
    </div>
  );
};

const StepC2 = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('focalizada2')
          removeConclusion('segmentaria2')
          // removeConclusion('car', 'cari1', 'car2', 'car3', 'car4', 'car5', 'car6', 'car7', 'car8', 'cari1', 'cari2', 'cari3', 'cari4', 'cari5', 'cari6', 'cari7', 'cari8')
          removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
          removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
          removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
          removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
          removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
          removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
          removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
          removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
          removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
          removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
          removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
          
          removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
          removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
          removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
          removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
          removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
          removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
          removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
          removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
          removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
          removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

          removeConclusion(`${selectedSide}_IZQgeneralizada2`)
          removeConclusion('IZQUIERDO2')
          removeConclusion('DERECHO2')
          removeConclusion('BILATERAL2') 
          setStep('B12'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='focalizada2' title=' focal a nivel ' displayText={'FOCALIZADA'} />
      </div>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='segmentaria2' title=' EN SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_IZQgeneralizada2`} title=' GENERALIZADA ' displayText={'GENERALIZADA'} />
      </div>
    </div>
  );
};

const StepCL2 = ({ setStep, selectedSide }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('focalizada2')
              removeConclusion('segmentaria2')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion(`${selectedSide}_DERgeneralizada2`)
              removeConclusion('IZQUIERDO2')
              removeConclusion('DERECHO2')
              removeConclusion('BILATERAL2') 
          setStep('B12'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Ubicación</StepTitle>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='focalizada2' title=' focal a nivel ' displayText={'FOCALIZADA'} />
      </div>
      <div onClick={() => setStep('CD2')}>
        <ConclusionButton value='segmentaria2' title=' EN SEGMENTO A NIVEL ' displayText={'SEGMENTARIA'} />
      </div>
      <div onClick={() => setStep('D2')}>
        <ConclusionButton value={`${selectedSide}_DERgeneralizada2`} title=' GENERALIZADA ' displayText='GENERALIZADA' />
      </div>
    </div>
  );
};

const StepCD2 = ({ setStep }) => {
  const { removeConclusion, setButtonsDisabled2, setbuttonsDisabledSegm2 } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('BILATERAL2')
              removeConclusion('focalizada2')
              removeConclusion('segmentaria2')
              removeConclusion('seguir2')
              removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
              removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
              removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
              removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
              removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
              removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
              removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
              removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
              removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
              removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
              removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
              
              removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
              removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
              removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
              removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
              removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
              removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
              removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
              removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
              removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
              removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

              removeConclusion('caar'), removeConclusion('caar1'),removeConclusion('caar2'),removeConclusion('caar3'), removeConclusion('caar4'), removeConclusion('caar5'), removeConclusion('caar6'), removeConclusion('caar7'),removeConclusion('caar8'),removeConclusion('caar9'),removeConclusion('caar10')
              removeConclusion('caar11'),removeConclusion('caar12'),removeConclusion('caar13'),removeConclusion('caar14'),removeConclusion('caar15'),removeConclusion('caar16'),removeConclusion('caar17'),removeConclusion('caar18'),removeConclusion('caar19'),removeConclusion('caar20')
              removeConclusion('caar21'),removeConclusion('caar22'),removeConclusion('caar23'),removeConclusion('caar24'),removeConclusion('caar25'),removeConclusion('caar26'),removeConclusion('caar27'),removeConclusion('caar28'),removeConclusion('caar29'),removeConclusion('caar30')
              removeConclusion('caar31'),removeConclusion('caar32'),removeConclusion('caar33'),removeConclusion('caar34'),removeConclusion('caar35'),removeConclusion('caar36'),removeConclusion('caar37'),removeConclusion('caar38'),removeConclusion('caar39'),removeConclusion('caar40')
              removeConclusion('caar41'),removeConclusion('caar42'),removeConclusion('caar43'),removeConclusion('caar44'),removeConclusion('caar45'),removeConclusion('caar46'),removeConclusion('caar47'),removeConclusion('caar48'),removeConclusion('caar49'),removeConclusion('caar50')
              removeConclusion('caar51'),removeConclusion('caar52'),removeConclusion('caar53'),removeConclusion('caar54'),removeConclusion('caar55'),removeConclusion('caar56'),removeConclusion('caar57'),removeConclusion('caar58'),removeConclusion('caar59'),removeConclusion('caar60')
              removeConclusion('caar61'),removeConclusion('caar62'),removeConclusion('caar63'),removeConclusion('caar64'), removeConclusion('caar65'),removeConclusion('caar66'),removeConclusion('caar67'),removeConclusion('caar68'),removeConclusion('caar69'),removeConclusion('caar70')
              removeConclusion('caar71'),removeConclusion('caar72'),removeConclusion('caar73'),removeConclusion('caar74'),removeConclusion('caar75'),removeConclusion('caar76'),removeConclusion('caar77'),removeConclusion('caar78'),removeConclusion('caar79'),removeConclusion('caar80')
              removeConclusion('caar81'),removeConclusion('caar82'),removeConclusion('caar83'),removeConclusion('caar84'),removeConclusion('caar85'),removeConclusion('caar86'),removeConclusion('caar87'),removeConclusion('caar88'),removeConclusion('caar89'),removeConclusion('caar90')
              removeConclusion('caar91'),removeConclusion('caar92'),removeConclusion('caar93'),removeConclusion('caar94'),removeConclusion('caar95'),removeConclusion('caar96'),removeConclusion('caar97'),removeConclusion('caar98'),removeConclusion('caar99'),removeConclusion('caar100')
              removeConclusion('caar101'),removeConclusion('caar102'),removeConclusion('caar103'),removeConclusion('caar104'),removeConclusion('caar105'),removeConclusion('caar106'),removeConclusion('caar107'),removeConclusion('caar108')
              
              removeConclusion('caarii'),removeConclusion('caarii1'),removeConclusion('caarii2'),removeConclusion('caarii3'),removeConclusion('caarii4'),removeConclusion('caarii5'),removeConclusion('caarii6'),removeConclusion('caarii7'),removeConclusion('caarii8'),removeConclusion('caarii9'),removeConclusion('caarii10')
              removeConclusion('caarii11'),removeConclusion('caarii12'),removeConclusion('caarii13'),removeConclusion('caarii14'),removeConclusion('caarii15'),removeConclusion('caarii16'),removeConclusion('caarii17'),removeConclusion('caarii18'),removeConclusion('caarii19'),removeConclusion('caarii20')
              removeConclusion('caarii21'),removeConclusion('caarii22'),removeConclusion('caarii23'),removeConclusion('caarii24'),removeConclusion('caarii25'),removeConclusion('caarii26'),removeConclusion('caarii27'),removeConclusion('caarii28'),removeConclusion('caarii29'),removeConclusion('caarii30')
              removeConclusion('caarii31'),removeConclusion('caarii32'),removeConclusion('caarii33'),removeConclusion('caarii34'),removeConclusion('caarii35'),removeConclusion('caarii36'),removeConclusion('caarii37'),removeConclusion('caarii38'),removeConclusion('caarii39'),removeConclusion('caarii40')
              removeConclusion('caarii41'),removeConclusion('caarii42'),removeConclusion('caarii43'),removeConclusion('caarii44'),removeConclusion('caarii45'),removeConclusion('caarii46'),removeConclusion('caarii47'),removeConclusion('caarii48'),removeConclusion('caarii49'),removeConclusion('caarii50')
              removeConclusion('caarii51'),removeConclusion('caarii52'),removeConclusion('caarii53'),removeConclusion('caarii54'),removeConclusion('caarii55'),removeConclusion('caarii56'),removeConclusion('caarii57'),removeConclusion('caarii58'),removeConclusion('caarii59'),removeConclusion('caarii60')
              removeConclusion('caarii61'),removeConclusion('caarii62'),removeConclusion('caarii63'),removeConclusion('caarii64'), removeConclusion('caarii65'),removeConclusion('caarii66'),removeConclusion('caarii67'),removeConclusion('caarii68'),removeConclusion('caarii69'),removeConclusion('caarii70')
              removeConclusion('caarii71'),removeConclusion('caarii72'),removeConclusion('caarii73'),removeConclusion('caarii74'),removeConclusion('caarii75'),removeConclusion('caarii76'),removeConclusion('caarii77'),removeConclusion('caarii78'),removeConclusion('caarii79'),removeConclusion('caarii80')
              removeConclusion('caarii81'),removeConclusion('caarii82'),removeConclusion('caarii83'),removeConclusion('caarii84'),removeConclusion('caarii85'),removeConclusion('caarii86'),removeConclusion('caarii87'),removeConclusion('caarii88'),removeConclusion('caarii89'),removeConclusion('caarii90')
              removeConclusion('caarii91'),removeConclusion('caarii92'),removeConclusion('caarii93'),removeConclusion('caarii94'),removeConclusion('caarii95'),removeConclusion('caarii96'),removeConclusion('caarii97'),removeConclusion('caarii98'),removeConclusion('caarii99'),removeConclusion('caarii100')
 
          setStep('C2'); }}
        onReset={() => window.location.reload()}
        onConfirm={() => { setButtonsDisabled2(true); setbuttonsDisabledSegm2(true); setStep('D2'); }}
      />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '90px 0 10px', textAlign: 'center' }}>
        Seleccionar el nivel de lesión con el puntero
      </p>
      <SiguienteBtn onClick={() => { setButtonsDisabled2(true); setbuttonsDisabledSegm2(true); setStep('D2'); }} />
    </div>
  );
};

const StepCDD2 = ({ setStep }) => {
  const { removeConclusion, setbuttonsDisabledBILT2, setbuttonsDisabledBITSeg2 } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('BILATERAL2')
          removeConclusion('focalizada2')
          removeConclusion('segmentaria2')
          removeConclusion('seguir2')
          removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
          removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
          removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
          removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
          removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
          removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
          removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
          removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
          removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
          removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
          removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
          
          removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
          removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
          removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
          removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
          removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
          removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
          removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
          removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
          removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
          removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

          removeConclusion('caar'), removeConclusion('caar1'),removeConclusion('caar2'),removeConclusion('caar3'), removeConclusion('caar4'), removeConclusion('caar5'), removeConclusion('caar6'), removeConclusion('caar7'),removeConclusion('caar8'),removeConclusion('caar9'),removeConclusion('caar10')
          removeConclusion('caar11'),removeConclusion('caar12'),removeConclusion('caar13'),removeConclusion('caar14'),removeConclusion('caar15'),removeConclusion('caar16'),removeConclusion('caar17'),removeConclusion('caar18'),removeConclusion('caar19'),removeConclusion('caar20')
          removeConclusion('caar21'),removeConclusion('caar22'),removeConclusion('caar23'),removeConclusion('caar24'),removeConclusion('caar25'),removeConclusion('caar26'),removeConclusion('caar27'),removeConclusion('caar28'),removeConclusion('caar29'),removeConclusion('caar30')
          removeConclusion('caar31'),removeConclusion('caar32'),removeConclusion('caar33'),removeConclusion('caar34'),removeConclusion('caar35'),removeConclusion('caar36'),removeConclusion('caar37'),removeConclusion('caar38'),removeConclusion('caar39'),removeConclusion('caar40')
          removeConclusion('caar41'),removeConclusion('caar42'),removeConclusion('caar43'),removeConclusion('caar44'),removeConclusion('caar45'),removeConclusion('caar46'),removeConclusion('caar47'),removeConclusion('caar48'),removeConclusion('caar49'),removeConclusion('caar50')
          removeConclusion('caar51'),removeConclusion('caar52'),removeConclusion('caar53'),removeConclusion('caar54'),removeConclusion('caar55'),removeConclusion('caar56'),removeConclusion('caar57'),removeConclusion('caar58'),removeConclusion('caar59'),removeConclusion('caar60')
          removeConclusion('caar61'),removeConclusion('caar62'),removeConclusion('caar63'),removeConclusion('caar64'), removeConclusion('caar65'),removeConclusion('caar66'),removeConclusion('caar67'),removeConclusion('caar68'),removeConclusion('caar69'),removeConclusion('caar70')
          removeConclusion('caar71'),removeConclusion('caar72'),removeConclusion('caar73'),removeConclusion('caar74'),removeConclusion('caar75'),removeConclusion('caar76'),removeConclusion('caar77'),removeConclusion('caar78'),removeConclusion('caar79'),removeConclusion('caar80')
          removeConclusion('caar81'),removeConclusion('caar82'),removeConclusion('caar83'),removeConclusion('caar84'),removeConclusion('caar85'),removeConclusion('caar86'),removeConclusion('caar87'),removeConclusion('caar88'),removeConclusion('caar89'),removeConclusion('caar90')
          removeConclusion('caar91'),removeConclusion('caar92'),removeConclusion('caar93'),removeConclusion('caar94'),removeConclusion('caar95'),removeConclusion('caar96'),removeConclusion('caar97'),removeConclusion('caar98'),removeConclusion('caar99'),removeConclusion('caar100')
          removeConclusion('caar101'),removeConclusion('caar102'),removeConclusion('caar103'),removeConclusion('caar104'),removeConclusion('caar105'),removeConclusion('caar106'),removeConclusion('caar107'),removeConclusion('caar108')
          
          removeConclusion('caarii'),removeConclusion('caarii1'),removeConclusion('caarii2'),removeConclusion('caarii3'),removeConclusion('caarii4'),removeConclusion('caarii5'),removeConclusion('caarii6'),removeConclusion('caarii7'),removeConclusion('caarii8'),removeConclusion('caarii9'),removeConclusion('caarii10')
          removeConclusion('caarii11'),removeConclusion('caarii12'),removeConclusion('caarii13'),removeConclusion('caarii14'),removeConclusion('caarii15'),removeConclusion('caarii16'),removeConclusion('caarii17'),removeConclusion('caarii18'),removeConclusion('caarii19'),removeConclusion('caarii20')
          removeConclusion('caarii21'),removeConclusion('caarii22'),removeConclusion('caarii23'),removeConclusion('caarii24'),removeConclusion('caarii25'),removeConclusion('caarii26'),removeConclusion('caarii27'),removeConclusion('caarii28'),removeConclusion('caarii29'),removeConclusion('caarii30')
          removeConclusion('caarii31'),removeConclusion('caarii32'),removeConclusion('caarii33'),removeConclusion('caarii34'),removeConclusion('caarii35'),removeConclusion('caarii36'),removeConclusion('caarii37'),removeConclusion('caarii38'),removeConclusion('caarii39'),removeConclusion('caarii40')
          removeConclusion('caarii41'),removeConclusion('caarii42'),removeConclusion('caarii43'),removeConclusion('caarii44'),removeConclusion('caarii45'),removeConclusion('caarii46'),removeConclusion('caarii47'),removeConclusion('caarii48'),removeConclusion('caarii49'),removeConclusion('caarii50')
          removeConclusion('caarii51'),removeConclusion('caarii52'),removeConclusion('caarii53'),removeConclusion('caarii54'),removeConclusion('caarii55'),removeConclusion('caarii56'),removeConclusion('caarii57'),removeConclusion('caarii58'),removeConclusion('caarii59'),removeConclusion('caarii60')
          removeConclusion('caarii61'),removeConclusion('caarii62'),removeConclusion('caarii63'),removeConclusion('caarii64'), removeConclusion('caarii65'),removeConclusion('caarii66'),removeConclusion('caarii67'),removeConclusion('caarii68'),removeConclusion('caarii69'),removeConclusion('caarii70')
          removeConclusion('caarii71'),removeConclusion('caarii72'),removeConclusion('caarii73'),removeConclusion('caarii74'),removeConclusion('caarii75'),removeConclusion('caarii76'),removeConclusion('caarii77'),removeConclusion('caarii78'),removeConclusion('caarii79'),removeConclusion('caarii80')
          removeConclusion('caarii81'),removeConclusion('caarii82'),removeConclusion('caarii83'),removeConclusion('caarii84'),removeConclusion('caarii85'),removeConclusion('caarii86'),removeConclusion('caarii87'),removeConclusion('caarii88'),removeConclusion('caarii89'),removeConclusion('caarii90')
          removeConclusion('caarii91'),removeConclusion('caarii92'),removeConclusion('caarii93'),removeConclusion('caarii94'),removeConclusion('caarii95'),removeConclusion('caarii96'),removeConclusion('caarii97'),removeConclusion('caarii98'),removeConclusion('caarii99'),removeConclusion('caarii100')

          setStep('CG2'); }}
        onReset={() => window.location.reload()}
        onConfirm={() => { setbuttonsDisabledBILT2(true); setbuttonsDisabledBITSeg2(true); setStep('D2'); }}
      />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '90px 0 10px', textAlign: 'center' }}>
        Seleccionar el nivel de lesión del lado derecho con el puntero
      </p>
      <SiguienteBtn onClick={() => { setbuttonsDisabledBILT2(true); setbuttonsDisabledBITSeg2(true); setStep('D2'); }} />
    </div>
  );
};

const StepCDI2 = ({ setStep }) => {
  const { removeConclusion, setButtonsDisabled, setbuttonsDisabledBILT2, setbuttonsDisabledBITSeg2 } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('BILATERAL2')
          removeConclusion('focalizada2')
          removeConclusion('segmentaria2')
          removeConclusion('seguir2')
          removeConclusion('car'), removeConclusion('car1'),removeConclusion('car2'),removeConclusion('car3'), removeConclusion('car4'), removeConclusion('car5'), removeConclusion('car6'), removeConclusion('car7'),removeConclusion('car8'),removeConclusion('car9'),removeConclusion('car10')
          removeConclusion('car11'),removeConclusion('car12'),removeConclusion('car13'),removeConclusion('car14'),removeConclusion('car15'),removeConclusion('car16'),removeConclusion('car17'),removeConclusion('car18'),removeConclusion('car19'),removeConclusion('car20')
          removeConclusion('car21'),removeConclusion('car22'),removeConclusion('car23'),removeConclusion('car24'),removeConclusion('car25'),removeConclusion('car26'),removeConclusion('car27'),removeConclusion('car28'),removeConclusion('car29'),removeConclusion('car30')
          removeConclusion('car31'),removeConclusion('car32'),removeConclusion('car33'),removeConclusion('car34'),removeConclusion('car35'),removeConclusion('car36'),removeConclusion('car37'),removeConclusion('car38'),removeConclusion('car39'),removeConclusion('car40')
          removeConclusion('car41'),removeConclusion('car42'),removeConclusion('car43'),removeConclusion('car44'),removeConclusion('car45'),removeConclusion('car46'),removeConclusion('car47'),removeConclusion('car48'),removeConclusion('car49'),removeConclusion('car50')
          removeConclusion('car51'),removeConclusion('car52'),removeConclusion('car53'),removeConclusion('car54'),removeConclusion('car55'),removeConclusion('car56'),removeConclusion('car57'),removeConclusion('car58'),removeConclusion('car59'),removeConclusion('car60')
          removeConclusion('car61'),removeConclusion('car62'),removeConclusion('car63'),removeConclusion('car64'), removeConclusion('car65'),removeConclusion('car66'),removeConclusion('car67'),removeConclusion('car68'),removeConclusion('car69'),removeConclusion('car70')
          removeConclusion('car71'),removeConclusion('car72'),removeConclusion('car73'),removeConclusion('car74'),removeConclusion('car75'),removeConclusion('car76'),removeConclusion('car77'),removeConclusion('car78'),removeConclusion('car79'),removeConclusion('car80')
          removeConclusion('car81'),removeConclusion('car82'),removeConclusion('car83'),removeConclusion('car84'),removeConclusion('car85'),removeConclusion('car86'),removeConclusion('car87'),removeConclusion('car88'),removeConclusion('car89'),removeConclusion('car90')
          removeConclusion('car91'),removeConclusion('car92'),removeConclusion('car93'),removeConclusion('car94'),removeConclusion('car95'),removeConclusion('car96'),removeConclusion('car97'),removeConclusion('car98'),removeConclusion('car99'),removeConclusion('car100')
          removeConclusion('car101'),removeConclusion('car102'),removeConclusion('car103'),removeConclusion('car104'),removeConclusion('car105'),removeConclusion('car106'),removeConclusion('car107'),removeConclusion('car108')
          
          removeConclusion('cari'),removeConclusion('cari1'),removeConclusion('cari2'),removeConclusion('cari3'),removeConclusion('cari4'),removeConclusion('cari5'),removeConclusion('cari6'),removeConclusion('cari7'),removeConclusion('cari8'),removeConclusion('cari9'),removeConclusion('cari10')
          removeConclusion('cari11'),removeConclusion('cari12'),removeConclusion('cari13'),removeConclusion('cari14'),removeConclusion('cari15'),removeConclusion('cari16'),removeConclusion('cari17'),removeConclusion('cari18'),removeConclusion('cari19'),removeConclusion('cari20')
          removeConclusion('cari21'),removeConclusion('cari22'),removeConclusion('cari23'),removeConclusion('cari24'),removeConclusion('cari25'),removeConclusion('cari26'),removeConclusion('cari27'),removeConclusion('cari28'),removeConclusion('cari29'),removeConclusion('cari30')
          removeConclusion('cari31'),removeConclusion('cari32'),removeConclusion('cari33'),removeConclusion('cari34'),removeConclusion('cari35'),removeConclusion('cari36'),removeConclusion('cari37'),removeConclusion('cari38'),removeConclusion('cari39'),removeConclusion('cari40')
          removeConclusion('cari41'),removeConclusion('cari42'),removeConclusion('cari43'),removeConclusion('cari44'),removeConclusion('cari45'),removeConclusion('cari46'),removeConclusion('cari47'),removeConclusion('cari48'),removeConclusion('cari49'),removeConclusion('cari50')
          removeConclusion('cari51'),removeConclusion('cari52'),removeConclusion('cari53'),removeConclusion('cari54'),removeConclusion('cari55'),removeConclusion('cari56'),removeConclusion('cari57'),removeConclusion('cari58'),removeConclusion('cari59'),removeConclusion('cari60')
          removeConclusion('cari61'),removeConclusion('cari62'),removeConclusion('cari63'),removeConclusion('cari64'), removeConclusion('cari65'),removeConclusion('cari66'),removeConclusion('cari67'),removeConclusion('cari68'),removeConclusion('cari69'),removeConclusion('cari70')
          removeConclusion('cari71'),removeConclusion('cari72'),removeConclusion('cari73'),removeConclusion('cari74'),removeConclusion('cari75'),removeConclusion('cari76'),removeConclusion('cari77'),removeConclusion('cari78'),removeConclusion('cari79'),removeConclusion('cari80')
          removeConclusion('cari81'),removeConclusion('cari82'),removeConclusion('cari83'),removeConclusion('cari84'),removeConclusion('cari85'),removeConclusion('cari86'),removeConclusion('cari87'),removeConclusion('cari88'),removeConclusion('cari89'),removeConclusion('cari90')
          removeConclusion('cari91'),removeConclusion('cari92'),removeConclusion('cari93'),removeConclusion('cari94'),removeConclusion('cari95'),removeConclusion('cari96'),removeConclusion('cari97'),removeConclusion('cari98'),removeConclusion('cari99'),removeConclusion('cari100')

          removeConclusion('caar'), removeConclusion('caar1'),removeConclusion('caar2'),removeConclusion('caar3'), removeConclusion('caar4'), removeConclusion('caar5'), removeConclusion('caar6'), removeConclusion('caar7'),removeConclusion('caar8'),removeConclusion('caar9'),removeConclusion('caar10')
          removeConclusion('caar11'),removeConclusion('caar12'),removeConclusion('caar13'),removeConclusion('caar14'),removeConclusion('caar15'),removeConclusion('caar16'),removeConclusion('caar17'),removeConclusion('caar18'),removeConclusion('caar19'),removeConclusion('caar20')
          removeConclusion('caar21'),removeConclusion('caar22'),removeConclusion('caar23'),removeConclusion('caar24'),removeConclusion('caar25'),removeConclusion('caar26'),removeConclusion('caar27'),removeConclusion('caar28'),removeConclusion('caar29'),removeConclusion('caar30')
          removeConclusion('caar31'),removeConclusion('caar32'),removeConclusion('caar33'),removeConclusion('caar34'),removeConclusion('caar35'),removeConclusion('caar36'),removeConclusion('caar37'),removeConclusion('caar38'),removeConclusion('caar39'),removeConclusion('caar40')
          removeConclusion('caar41'),removeConclusion('caar42'),removeConclusion('caar43'),removeConclusion('caar44'),removeConclusion('caar45'),removeConclusion('caar46'),removeConclusion('caar47'),removeConclusion('caar48'),removeConclusion('caar49'),removeConclusion('caar50')
          removeConclusion('caar51'),removeConclusion('caar52'),removeConclusion('caar53'),removeConclusion('caar54'),removeConclusion('caar55'),removeConclusion('caar56'),removeConclusion('caar57'),removeConclusion('caar58'),removeConclusion('caar59'),removeConclusion('caar60')
          removeConclusion('caar61'),removeConclusion('caar62'),removeConclusion('caar63'),removeConclusion('caar64'), removeConclusion('caar65'),removeConclusion('caar66'),removeConclusion('caar67'),removeConclusion('caar68'),removeConclusion('caar69'),removeConclusion('caar70')
          removeConclusion('caar71'),removeConclusion('caar72'),removeConclusion('caar73'),removeConclusion('caar74'),removeConclusion('caar75'),removeConclusion('caar76'),removeConclusion('caar77'),removeConclusion('caar78'),removeConclusion('caar79'),removeConclusion('caar80')
          removeConclusion('caar81'),removeConclusion('caar82'),removeConclusion('caar83'),removeConclusion('caar84'),removeConclusion('caar85'),removeConclusion('caar86'),removeConclusion('caar87'),removeConclusion('caar88'),removeConclusion('caar89'),removeConclusion('caar90')
          removeConclusion('caar91'),removeConclusion('caar92'),removeConclusion('caar93'),removeConclusion('caar94'),removeConclusion('caar95'),removeConclusion('caar96'),removeConclusion('caar97'),removeConclusion('caar98'),removeConclusion('caar99'),removeConclusion('caar100')
          removeConclusion('caar101'),removeConclusion('caar102'),removeConclusion('caar103'),removeConclusion('caar104'),removeConclusion('caar105'),removeConclusion('caar106'),removeConclusion('caar107'),removeConclusion('caar108')
          
          removeConclusion('caarii'),removeConclusion('caarii1'),removeConclusion('caarii2'),removeConclusion('caarii3'),removeConclusion('caarii4'),removeConclusion('caarii5'),removeConclusion('caarii6'),removeConclusion('caarii7'),removeConclusion('caarii8'),removeConclusion('caarii9'),removeConclusion('caarii10')
          removeConclusion('caarii11'),removeConclusion('caarii12'),removeConclusion('caarii13'),removeConclusion('caarii14'),removeConclusion('caarii15'),removeConclusion('caarii16'),removeConclusion('caarii17'),removeConclusion('caarii18'),removeConclusion('caarii19'),removeConclusion('caarii20')
          removeConclusion('caarii21'),removeConclusion('caarii22'),removeConclusion('caarii23'),removeConclusion('caarii24'),removeConclusion('caarii25'),removeConclusion('caarii26'),removeConclusion('caarii27'),removeConclusion('caarii28'),removeConclusion('caarii29'),removeConclusion('caarii30')
          removeConclusion('caarii31'),removeConclusion('caarii32'),removeConclusion('caarii33'),removeConclusion('caarii34'),removeConclusion('caarii35'),removeConclusion('caarii36'),removeConclusion('caarii37'),removeConclusion('caarii38'),removeConclusion('caarii39'),removeConclusion('caarii40')
          removeConclusion('caarii41'),removeConclusion('caarii42'),removeConclusion('caarii43'),removeConclusion('caarii44'),removeConclusion('caarii45'),removeConclusion('caarii46'),removeConclusion('caarii47'),removeConclusion('caarii48'),removeConclusion('caarii49'),removeConclusion('caarii50')
          removeConclusion('caarii51'),removeConclusion('caarii52'),removeConclusion('caarii53'),removeConclusion('caarii54'),removeConclusion('caarii55'),removeConclusion('caarii56'),removeConclusion('caarii57'),removeConclusion('caarii58'),removeConclusion('caarii59'),removeConclusion('caarii60')
          removeConclusion('caarii61'),removeConclusion('caarii62'),removeConclusion('caarii63'),removeConclusion('caarii64'), removeConclusion('caarii65'),removeConclusion('caarii66'),removeConclusion('caarii67'),removeConclusion('caarii68'),removeConclusion('caarii69'),removeConclusion('caarii70')
          removeConclusion('caarii71'),removeConclusion('caarii72'),removeConclusion('caarii73'),removeConclusion('caarii74'),removeConclusion('caarii75'),removeConclusion('caarii76'),removeConclusion('caarii77'),removeConclusion('caarii78'),removeConclusion('caarii79'),removeConclusion('caarii80')
          removeConclusion('caarii81'),removeConclusion('caarii82'),removeConclusion('caarii83'),removeConclusion('caarii84'),removeConclusion('caarii85'),removeConclusion('caarii86'),removeConclusion('caarii87'),removeConclusion('caarii88'),removeConclusion('caarii89'),removeConclusion('caarii90')
          removeConclusion('caarii91'),removeConclusion('caarii92'),removeConclusion('caarii93'),removeConclusion('caarii94'),removeConclusion('caarii95'),removeConclusion('caarii96'),removeConclusion('caarii97'),removeConclusion('caarii98'),removeConclusion('caarii99'),removeConclusion('caarii100')

          setStep('CGI2'); }}
        onReset={() => window.location.reload()}
        onConfirm={() => { setButtonsDisabled(true); setbuttonsDisabledBILT2(true); setbuttonsDisabledBITSeg2(true); setStep('D2'); }}
      />
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, margin: '90px 0 10px', textAlign: 'center' }}>
        Seleccionar el nivel de lesión del lado izquierdo con el puntero
      </p>
      <SiguienteBtn onClick={() => { setButtonsDisabled(true); setbuttonsDisabledBILT2(true); setbuttonsDisabledBITSeg2(true); setStep('D2'); }} />
    </div>
  );
};

const StepD2 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
          removeConclusion('SIN DENERVACIÓN ACTIVA2');
          removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
          removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
          removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
          removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
          removeConclusion('SIN DENERVACIÓN ACTIVA2');
          removeConclusion('RETARDO EN LA CONDUCCIÓN2');
          removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN2');
          removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN2');
          removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA2');
          removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA2');

          setStep('CD2'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Tipo</StepTitle>
      <AccordionContainer>
        <Accordion title='AXONAL COMPLETA' value='AXONAL COMPLETA2' type='external'>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)2'    title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DIFUSA (++++)'    displayText={' DENERVACIÓN DIFUSA (++++) '} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)2'  title=' TIPO AXONAL COMPLETA CON DENERVACIÓN ABUNDANTE (+++)'  displayText={'DENERVACIÓN ABUNDANTE (+++)'} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)2'  title=' TIPO AXONAL COMPLETA CON DENERVACIÓN PROGRESIVA (++)'  displayText={'DENERVACIÓN PROGRESIVA (++'} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)2'   title=' TIPO AXONAL COMPLETA CON DENERVACIÓN DISCRETA (+/+)'   displayText={'DENERVACIÓN DISCRETA (+/+'} />
          </div>
          <div onClick={() => setStep('F2')}>
            <ConclusionButton value='SIN DENERVACIÓN ACTIVA2' title=' TIPO AXONAL COMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} />
          </div>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion title='AXONAL INCOMPLETA' value='AXONAL INCOMPLETA2' type='external'>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN DIFUSA (++++)2'    title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DIFUSA (++++)'    displayText={' DENERVACIÓN DIFUSA (++++) '} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN ABUNDANTE (+++)2'  title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN ABUNDANTE (+++)'  displayText={'DENERVACIÓN ABUNDANTE (+++)'} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN PROGRESIVA (++)2'  title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN PROGRESIVA (++)'  displayText={'DENERVACIÓN PROGRESIVA (++'} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value='CON DENERVACIÓN DISCRETA (+/+)2'   title=' TIPO AXONAL INCOMPLETA CON DENERVACIÓN DISCRETA (+/+)'   displayText={'DENERVACIÓN DISCRETA (+/+'} />
          </div>
          <div onClick={() => setStep('F2')}>
            <ConclusionButton value='SIN DENERVACIÓN ACTIVA2' title=' TIPO AXONAL INCOMPLETA SIN DENERVACIÓN (-)' displayText={'SIN DENERVACIÓN'} />
          </div>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion title='DESMIELINIZANTE ' value='DESMIELINIZANTE2' type='external'>
          <div onClick={() => setStep('E12')}>
            <ConclusionButton value=' RETARDO EN LA CONDUCCIÓN 2'           title=' TIPO DESMIELIMIZANTE POR RETARDO EN LA CONDUCCIÓN '           displayText={'POR RETARDO EN LA CONDUCCIÓN '} />
          </div>
          <div onClick={() => setStep('E12')}>
            <ConclusionButton value=' BLOQUEO PARCIAL EN LA CONDUCCIÓN2'    title=' TIPO DESMIELIMIZANTE POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'    displayText={'POR BLOQUEO PARCIAL EN LA CONDUCCIÓN'} />
          </div>
          <div onClick={() => setStep('E12')}>
            <ConclusionButton value=' POR BLOQUEO COMPLETO EN LA CONDUCCIÓN2' title=' TIPO DESMIELIMIZANTE POR BLOQUEO COMPLETO EN LA CONDUCCIÓN' displayText={'POR BLOQUEO COMPLETO EN LA CONDUCCIÓN'} />
          </div>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion title='MIXTA' value='MIXTA' type='external'>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value=' TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA2'  title=' TIPO DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA '  displayText={'DESMIELINIZANTE CON PÉRDIDA AXONAL SECUNDARIA '} />
          </div>
          <div onClick={() => setStep('E2')}>
            <ConclusionButton value=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA2'  title=' TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA'  displayText={'  AXONAL CON DESMIELINIZACIÓN SECUNDARIA'} />
          </div>
        </Accordion>
      </AccordionContainer>
    </div>
  );
};

const StepE2 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
              removeConclusion(' MOTORAS2 ');
              removeConclusion(' SENSITIVAS2 ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTORA)2');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
              removeConclusion('SIN DENERVACIÓN ACTIVA2');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
              removeConclusion('SIN DENERVACIÓN ACTIVA2');
              removeConclusion('RETARDO EN LA CONDUCCIÓN2');
              removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN2');
              removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN2');
              removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA2');
              removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA2');

          setStep('D2'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Fibras</StepTitle>
      <div onClick={() => setStep('F2')}>
        <ConclusionButton value=' MOTORAS2' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} />
      </div>
      <div onClick={() => setStep('F2')}>
        <ConclusionButton value=' SENSITIVAS2' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
      </div>
      <div onClick={() => setStep('F2')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTORA)2' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTORA), ' displayText={' MIXTAS (SENSITIVO-MOTORA) '} />
      </div>
    </div>
  );
};

const StepE12 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => { 
              removeConclusion(' MOTORAS2 ');
              removeConclusion(' SENSITIVAS2 ');
              removeConclusion(' MIXTAS (SENSITIVO-MOTORA)2');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
              removeConclusion('SIN DENERVACIÓN ACTIVA2');
              removeConclusion('CON DENERVACIÓN DIFUSA (++++)2');
              removeConclusion('CON DENERVACIÓN ABUNDANTE (+++)2');
              removeConclusion('CON DENERVACIÓN PROGRESIVA (++)2');
              removeConclusion('CON DENERVACIÓN DISCRETA (+/+)2');
              removeConclusion('SIN DENERVACIÓN ACTIVA2');
              removeConclusion('RETARDO EN LA CONDUCCIÓN2');
              removeConclusion('BLOQUEO PARCIAL EN LA CONDUCCIÓN2');
              removeConclusion('POR BLOQUEO COMPLETO EN LA CONDUCCIÓN2');
              removeConclusion('TIPO DESMIELINIZANTE CON PERDIDA AXONAL SECUNDARIA2');
              removeConclusion('TIPO AXONAL CON DESMIELINIZACIÓN SECUNDARIA2');

          setStep('D'); }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Fibras</StepTitle>
      <div onClick={() => setStep('F12')}>
        <ConclusionButton value=' MOTORAS2' title=' DE FIBRAS MOTORAS, ' displayText={' MOTORAS'} />
      </div>
      <div onClick={() => setStep('F12')}>
        <ConclusionButton value=' SENSITIVAS2' title=' DE FIBRAS SENSITIVAS, ' displayText={' SENSITIVAS '} />
      </div>
      <div onClick={() => setStep('F12')}>
        <ConclusionButton value=' MIXTAS (SENSITIVO-MOTORA)2' title=' DE FIBRAS MIXTAS (SENSITIVO-MOTORA), ' displayText={' MIXTAS (SENSITIVO-MOTORA) '} />
      </div>
    </div>
  );
};

const StepF2 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => {
          removeConclusion(' LEVE (NEUROAPRAXIA)2'); removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)2');
          removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2');
          removeConclusion(' MOTORAS2 '); removeConclusion(' SENSITIVAS2 '); removeConclusion(' MIXTAS (SENSITIVO-MOTORA)2');
          setStep('E2');
        }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Intensidad</StepTitle>
      <div onClick={() => setStep('G2')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)2' title=' INTENSIDAD LEVE. ' displayText={' LEVE'} />
      </div>
      <div onClick={() => setStep('G2')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)2' title=' INTENSIDAD MODERADA. ' displayText={' MODERADA '} />
      </div>
      <div onClick={() => setStep('G2')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2' title=' INTENSIDAD SEVERA. ' displayText={' SEVERA '} />
      </div>
    </div>
  );
};

const StepF12 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => {
          removeConclusion(' LEVE (NEUROAPRAXIA)2'); removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)2');
          removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2');
          removeConclusion(' MOTORAS2 '); removeConclusion(' SENSITIVAS2 '); removeConclusion(' MIXTAS (SENSITIVO-MOTORA)2');
          setStep('E12');
        }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Intensidad</StepTitle>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' LEVE (NEUROAPRAXIA)2' title=' INTENSIDAD LEVE. ' displayText={' LEVE'} />
      </div>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' MODERADA (AXONOTMESIS INCOMPLETA)2' title=' INTENSIDAD MODERADA. ' displayText={' MODERADA '} />
      </div>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2' title=' INTENSIDAD SEVERA. ' displayText={' SEVERA '} />
      </div>
    </div>
  );
};

const StepG2 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => {
          removeConclusion(' CON REINERVACIÓN ACTIVA2 '); removeConclusion('  REINERVACIÓN ACTIVA2 ');
          removeConclusion(' LEVE (NEUROAPRAXIA)2'); removeConclusion(' MODERADA (AXONOTMESIS INCOMPLETA)2');
          removeConclusion(' SEVERA (AXONOTMESIS COMPLETA/NEUROTMESIS)2');
          setStep('F');
        }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Reinervación</StepTitle>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value=' CON REINERVACIÓN ACTIVA2' title=' REINERVACIÓN ACTIVA; ' displayText={'REINERVACIÓN ACTIVA'} />
      </div>
      <div onClick={() => setStep('H2')}>
        <ConclusionButton value='  REINERVACIÓN ACTIVA2' title=' REINERVACIÓN INACTIVA; ' displayText={'REINERVACIÓN INACTIVA'} />
      </div>
    </div>
  );
};

const StepH2 = ({ setStep }) => {
  const { removeConclusion } = useContext(ReportContext);
  return (
    <div>
      <NavRow
        onBack={() => {
          removeConclusion('completo2'); removeConclusion('parcial_funcional2');
          removeConclusion('pobre2'); removeConclusion('nulo2');
          removeConclusion(' CON REINERVACIÓN ACTIVA2 '); removeConclusion('  REINERVACIÓN ACTIVA2 ');
          setStep('G');
        }}
        onReset={() => window.location.reload()}
      />
      <StepTitle>Pronóstico</StepTitle>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='completo2' title='PRONÓSTICO DE RECUPERACIÓN COMPLETA.' displayText={'RECUPERACIÓN COMPLETA'} />
      </div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='parcial_funcional2' title='PRONÓSTICO DE RECUPERACIÓN PARCIAL FUNCIONAL.' displayText={'RECUPERACIÓN PARCIAL FUNCIONAL'} />
      </div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='pobre2' title='PRONÓSTICO DE RECUPERACIÓN POBRE NO FUNCIONAL.' displayText={'RECUPERACIÓN POBRE NO FUNCIONAL'} />
      </div>
      <div onClick={() => setStep('I')}>
        <ConclusionButton value='nulo2' title='PRONÓSTICO DE RECUPERACIÓN NULA.' displayText={'RECUPERACIÓN NULA'} />
      </div>
    </div>
  );
};

// ── Paso final: exportación ───────────────────────────────────────────────────
const CONCLUSION_OVERLAY_MAP = {
  'MEDIANO':         'MedianoImg',
  'INTEROSEOANTERIOR': 'InteroseoA',
  'ACCESORIO':       'Accesorio',
  'ANTEBRAQUIAL_CUTANEO': 'AntebraquialCutaneo',
  'AXILAR':           'Axilar',
  'MUSCULOCUTANEO':     'Antebraquiallat',
  'RADIAL_SUPERFICIAL': 'Radialsuper',
  'INTEROSEO_POSTERIOR': 'Interoseopos',
  'RADIAL':           'Radial',
  'SUPRAESCAPULAR':     'Supraescapular',
  'ULNAR':             'Ulnar',
  'DORSAL_CUTANEO':     'DorsalCutan',
  'FACIAL':            'Facial',
  'FRENICO':            'Frenico',
  'TORACICO_LARGO':     'Toracicolargo',
  'TORACODORSAL':       'Toracodorsal',
  'CIATICO':            'Ciatico',
  'GLUTEO_MEDIO':       'GluteoSup',
  'GLUTEO_INFERIOR':    'GluteoInf',
  'FEMORAL':            'Femoral',
  'SAFENO':             'Safeno',
  'FEMOROCUTÁNEO_LATERAL': 'FemoralCtn',
  'ILIOINGUINAL':       'Ilioiguinal',
  'OBTURADOR':          'Obturador',
  'NERVIO_PERONEO':     'Peroneo',
  'PERONEO_SUPERFICIAL': 'PeroneoS',
  'PERONEO_PROFUNDO':   'PeroneoP',
  'TIBIAL':             'Tibial',
  'SURAL':              'Sural',
  'PLANTAR_MEDIAL':     'PlantarMe',
  'PLANTAR_LATERAL':    'PlantarLa',
  'PUDENDO':            'Pudendo',

  'CiaticoR': 'CiaticoIzqge',
 // '${selectedSide}_IZQgeneralizada': 'CiaticoIzqge',

  'MED_IZQUIERDA':      'MedIzquierda',
  'MEDIANO_DERgeneralizada': 'MedDerecha',
  'INTEROSEO_ANTERIOR_DERgeneralizada': 'IntAntDegene',
  'INTEROSEO_POSTERIOR_DERgeneralizada': 'IntPostDegene',
  'ACCESORIO_DERgeneralizada': 'AccesorioDerge',
  'ANTEBRLATE_DERgeneralizada': 'AnteLateDerge',
  'ANTEBRMEDIAL_DERgeneralizada': 'AnteBraqDerge',
  'AXILAR_DERgeneralizada': 'AxilaDerge',
  'CIATICO_DERgeneralizada': 'CiaticoDerge',
  'FACIAL_DERgeneralizada': 'FacialDerge',
  'FEMORAL_DERgeneralizada': 'FemoralDerge',
  'FEMOROCUTANEO_DERgeneralizada': 'FemorocutaneoDerge',
  'FRENICO_DERgeneralizada': 'FrenicoDerge',
  'ILIO_DERgeneralizada': 'IlioinguinalDerge',
  'MUSCULOCUTANEO_DERgeneralizada': 'MusculocutaneoDerge',
  'OBTUUADOR_DERgeneralizada': 'ObturadorDerge',
  'PERONEO_DERgeneralizada': 'PeroneoDerge',
  'PUDENDO_DERgeneralizada': 'PudendoDerge',
  'RADIAL_DERgeneralizada': 'RadialDerge',
  'SUPRAESCAPULAR_DERgeneralizada': 'SupraescapularDerge',
  'TIBIAL_DERgeneralizada': 'TibialDerge',
  'TORACICO_DERgeneralizada': 'ToracicoDerge',
  'TORACODORSAL_DERgeneralizada': 'ToracodorsalDerge',
  'ULNAR_DERgeneralizada': 'UlnarDerge',

  'ACCESORIO_IZQgeneralizada': 'AccesorioIzqge',
  'ANTEBRLATE_IZQgeneralizada': 'AnteLateIzqge',
  'ANTEBRMEDIAL_IZQgeneralizada': 'AnteMedIzqge',
  'AXILAR_IZQgeneralizada': 'AxilaIzqge',
  'CIATICO_IZQgeneralizada': 'CiaticoIzqge',
  'FACIAL_IZQgeneralizada': 'FacialIzqge',
  'FEMORAL_IZQgeneralizada': 'FemoralIzqge',
  'FEMOROCUTANEO_IZQgeneralizada': 'FemorocutaneoIzqge',
  'FRENICO_IZQgeneralizada': 'FrenicoIzqge',
  'ILIO_IZQgeneralizada': 'IlioinguinalIzqge',
  'MUSCULOCUTANEO_IZQgeneralizada': 'MusculocutaneoIzqge',
  'OBTUUADOR_IZQgeneralizada': 'ObturadorIzqge',
  'PERONEO_IZQgeneralizada': 'PeroneoIzqge',
  'PUDENDO_IZQgeneralizada': 'PudendoIzqge',
  'RADIAL_IZQgeneralizada': 'RadialIzqge',
  'SUPRAESCAPULAR_IZQgeneralizada': 'SupraescapularIzqge',
  'TIBIAL_IZQgeneralizada': 'TibialIzqge',
  'TORACICO_IZQgeneralizada': 'ToracicoIzqge',
  'TORACODORSAL_IZQgeneralizada': 'ToracodorsalIzqge',
  'ULNAR_IZQgeneralizada': 'UlnarIzqge',

  'MEDIANO_COMPgeneralizada': 'MedianoCompgen',
  'INTEROSEOANTERIOR_COMPgeneralizada': 'InteroseoAnteriorCompgen',
  'ACCESORIO_COMPgeneralizada': 'AccesorioCompgen',
  'ANTEBRLATE_COMPgeneralizada': 'AnteLatelCompgen',
  'ANTEBRMEDIAL_COMPgeneralizada': 'AnteMedCompgen',
  'AXILAR_COMPgeneralizada': 'AxilarCompgen',
  'CIATICO_COMPgeneralizada': 'CiaticoCompgen',
  'FACIAL_COMPgeneralizada': 'FacialCompgen',
  'FEMORAL_COMPgeneralizada': 'FemoralCompgen',
  'FEMOROCUTANEO_COMPgeneralizada': 'FemorocutaneoCompgen',
  'FRENICO_COMPgeneralizada': 'FrenicoCompgen',
  'ILIO_COMPgeneralizada': 'IlioinguinalCompgen',
  'MUSCULOCUTANEO_COMPgeneralizada': 'MusculocutaneoCompgen',
  'OBTUUADOR_COMPgeneralizada': 'ObturadorCompgen',
  'PERONEO_COMPgeneralizada': 'PeroneoCompgen',
  'PUDENDO_COMPgeneralizada': 'PudendoCompgen',
  'RADIAL_COMPgeneralizada': 'RadialCompgen',
  'INTEROSEO_POSTERIOR_COMPgeneralizada': 'InteroseoPosteriorCompgen',
  'SAFENO_COMPgeneralizada': 'SafenoCompgen',
  'SUPRAESCAPULAR_COMPgeneralizada': 'SupraescapularCompgen',
  'TIBIAL_COMPgeneralizada': 'TibialCompgen',
  'SURAL_COMPgeneralizada': 'SuralCompgen',
  'PLANTAR_MEDIAL_COMPgeneralizada': 'PlantarMedialCompgen',
  'PLANTAR_LATERAL_COMPgeneralizada': 'PlantarLateralCompgen',
  'PERONEO_SUPERFICIAL_COMPgeneralizada': 'PeroneoSupCompgen',
  'PERONEO_PROFUNDO_COMPgeneralizada': 'PeroneoProfCompgen',
  'GLUTEO_INFERIOR_COMPgeneralizada': 'GluteoInfCompgen',
  'GLUTEO_MEDIO_COMPgeneralizada': 'GluteoMedCompgen',
  'TORACICO_COMPgeneralizada': 'ToracicoCompgen',
  'TORACODORSAL_COMPgeneralizada': 'ToracodorsalCompgen',
  'ULNAR_COMPgeneralizada': 'UlnarCompgen'







};

const StepI = ({ setStep, topLeftText, copyConclusions, figuras, setFiguras, activeTab, reportRef }) => {
  const { conclusions, removeConclusion } = useContext(ReportContext);

  const [imgLista, setImgLista]               = useState(null);
  const [comentarioLista, setComentarioLista] = useState('');
  const [showGaleria, setShowGaleria]         = useState(false);
  const [showComentario, setShowComentario]   = useState(false);
  const [comentarioTemp, setComentarioTemp]   = useState('');
  const [pdfOpen, setPdfOpen]                 = useState(false);
  const [showSimbolos, setShowSimbolos] = useState(false);

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

  const activeOv = useMemo(() => {
    const keys = new Set();
    for (const c of conclusions) {
      const baseVal = (c.value || '').replace(/\d+$/, '').trim();
      const key = CONCLUSION_OVERLAY_MAP[baseVal];
      if (key) keys.add(key);
    }
    return [...keys];
  }, [conclusions]);

  const agregarFigura = useCallback((tipo, src) => {
    if (!setFiguras) return;
    const DISPLAY = tipo === 'symbol' ? 48 : 80;
    const img = new window.Image();
    img.onload = () => {
      setFiguras(prev => [...prev, { id: Date.now() + Math.random(), src, tipo, x: 250, y: 300, nw: img.naturalWidth, nh: img.naturalHeight, dw: DISPLAY, dh: DISPLAY }]);
    };
    img.onerror = () => {
      setFiguras(prev => [...prev, { id: Date.now() + Math.random(), src, tipo, x: 250, y: 300, dw: DISPLAY, dh: DISPLAY }]);
    };
    img.src = src;
  }, [setFiguras]);

  return (
    <>
      <NavRow
        onBack={() => { removeConclusion(' '); setStep('H'); }}
        onReset={() => window.location.reload()}
        onPdf={() => setPdfOpen(true)}
      />
      {/* <StepTitle>Informe</StepTitle> */}

      {activeTab === 'reporte' && (
        <div style={{ marginBottom: 8 }}>
          <p style={{ color: '#FF994D', fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Agrega figuras al reporte (imagen)</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
            {/* Circular */}
            <label style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '14px 8px', borderRadius: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => { Array.from(e.target.files || []).forEach(f => agregarFigura('circle', URL.createObjectURL(f))); e.target.value = ''; }} />
            </label>
            {/* Cuadrada */}
            <label style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '14px 8px', borderRadius: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: 52, height: 52, borderRadius: 4, border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => { Array.from(e.target.files || []).forEach(f => agregarFigura('square', URL.createObjectURL(f))); e.target.value = ''; }} />
            </label>
          </div>
          {figuras && figuras.length > 0 && (
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, margin: '6px 0 0', fontStyle: 'italic' }}>
              {figuras.length} figura{figuras.length > 1 ? 's' : ''} en la lámina
            </p>
          )}
                        {/* ── Panel de símbolos ── */}
              <button
                onClick={() => setShowSimbolos(v => !v)}
                style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 12px', marginBottom: showSimbolos ? 0 : 4, borderRadius: showSimbolos ? '8px 8px 0 0' : 8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer', color:'rgba(255,255,255,0.75)', fontSize:12, fontWeight:600, marginTop: 12 }}>
                <span>Agregar símbolo</span>
                <span style={{ fontSize:10, opacity:0.6, transform: showSimbolos ? 'rotate(180deg)' : 'none', transition:'transform 0.2s', display:'inline-block' }}>▼</span>
              </button>

              {showSimbolos && (
                <div className="simbolos-scroll" style={{ border:'1px solid rgba(255,255,255,0.1)', borderTop:'none', borderRadius:'0 0 8px 8px', background:'rgba(255,255,255,0.03)', padding:'10px 10px 12px', marginBottom:4, maxHeight:420, overflowY:'auto', scrollbarWidth:'thin', scrollbarColor:'rgba(255,255,255,0.12) transparent' }}>
                  {SIMBOLOS.map(grupo => (
                    <div key={grupo.grupo} style={{ marginBottom:10 }}>
                      <p style={{ color:'rgba(255,255,255,0.35)', fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase', margin:'0 0 6px 0' }}>{grupo.grupo}</p>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:5 }}>
                        {grupo.items.map(sim => (
                          <button
                            key={sim.src}
                            title={sim.label}
                            onClick={() => agregarFigura('symbol', sim.src)}
                            style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, padding:'5px 4px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, transition:'background 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.background='rgba(249,115,22,0.2)'; e.currentTarget.style.borderColor='rgba(249,115,22,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={sim.src} alt={sim.label} draggable={false} style={{ width:32, height:32, objectFit:'contain' }} />
                            <span style={{ color:'rgba(255,255,255,0.4)', fontSize:8, textAlign:'center', lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'100%' }}>{sim.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          
        </div>
        
      )}


      {activeTab === 'lista' && (
        <div style={{ marginBottom: 8 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Tabla</p>
          <div onClick={() => setShowGaleria(true)} style={{ width: '100%', minHeight: 64, borderRadius: 10, border: '1.5px dashed rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.03)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {imgLista
              ? <img src={imgLista.src} alt="tabla" style={{ width: '100%', maxHeight: 90, objectFit: 'contain', borderRadius: 6 }} />
              : <>
                  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M3 9h18M3 15h18M9 3v18"/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Sin imagen seleccionada</span>
                </>
            }
          </div>
          {imgLista && (
            <button onClick={() => setImgLista(null)} style={{ width: '100%', padding: '5px 0', borderRadius: 8, marginTop: 6, background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>
              Quitar imagen
            </button>
          )}
          <button onClick={() => { setComentarioTemp(comentarioLista); setShowComentario(true); }} style={{ width: '100%', padding: '10px 0', borderRadius: 10, background: 'rgba(249,115,22,0.15)', border: '1px solid #f97316', cursor: 'pointer', color: '#f97316', fontWeight: 700, fontSize: 14, marginTop: 10 }}>
            {comentarioLista ? 'Editar comentario' : 'Agregar comentario'}
          </button>
          {comentarioLista && (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontStyle: 'italic', marginTop: 6, wordBreak: 'break-word', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
              {comentarioLista}
            </p>
          )}
        </div>
      )}

      <ExportBar
        nombrePaciente={topLeftText}
        textoReporte={copyConclusions}
        activeOv={activeOv}
        figuras={figuras || []}
        laminaSize={{ w: 570, h: 755, offsetX: 10, offsetY: 20 }}
        listaVisual={listaVisual}
        imgLista={imgLista}
        comentarioLista={comentarioLista}
        onBack={() => { removeConclusion(' '); setStep('H'); }}
        onReset={() => window.location.reload()}
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
        reportRef={reportRef}
      />

      {showGaleria && (
        <GaleriaTablas
          onSelect={src => { setImgLista({ src }); setShowGaleria(false); }}
          onClose={() => setShowGaleria(false)}
        />
      )}

      {showComentario && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10100, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 14, width: '100%', maxWidth: 400, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Comentario</p>
            <textarea value={comentarioTemp} onChange={e => setComentarioTemp(e.target.value)} rows={4} placeholder="Escribe un comentario..."
              style={{ width: '100%', boxSizing: 'border-box', background: '#222', border: '1px solid #444', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', resize: 'none' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => { setComentarioLista(comentarioTemp); setShowComentario(false); }}
                style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Guardar</button>
              <button onClick={() => setShowComentario(false)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 14, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleMultiStepForm;
