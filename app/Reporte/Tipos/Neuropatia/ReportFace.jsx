'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ExportBar from './MenuBotones';
import { NERVE_BUTTONS } from './NervButtons';
import { NERVE_SEG_BUTTONS } from './NervSegButtons';
import './Style.css';

/* ─── Tablas ────────────────────────────────────────────────────────────────── */
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

/* ─── Overlays ──────────────────────────────────────────────────────────────── */
const OVERLAYS = {
  'MedianoImg':           '/NeuropatiaImg/NOMediano.png',
  'MedianoFlz':           '/NeuropatiaImg/MedianoFlz.png',
  'MedianoFIqz':          '/NeuropatiaImg/FocalMIzq.png',
  'FocalIzq':             '/NeuropatiaImg/AxilFcIzq.png',
  'Axilar':               '/NeuropatiaImg/Axilar.png',
  'InteroseoA':           '/NeuropatiaImg/InteroseoAnterior.png',
  'Musculocutáneo':       '/NeuropatiaImg/Musculocutaneo.png',
  'Radial':               '/NeuropatiaImg/Radial.png',
  'Radial superficial':   '/NeuropatiaImg/RadialSuperficial.png',
  'Interóseo posterior':  '/NeuropatiaImg/InteroseoP.png',
  'Supraescapular':       '/NeuropatiaImg/Supraescapular.png',
  'Ulnar':                '/NeuropatiaImg/Ulnar.png',
  'Dorsal cutáneo':       '/NeuropatiaImg/DorsalCutaneo.png',
  'Toracodorsal':         '/NeuropatiaImg/Toracodorsal.png',
  'Torácico largo':       '/NeuropatiaImg/ToracicoLargo.png',
  'Antebraquial medial':  '/NeuropatiaImg/Antebraquial.png',
  'Antebraquial lateral': '/NeuropatiaImg/Musculocutaneo.png',
  'Frenico':              '/NeuropatiaImg/Frenico.png',
  'Accesorio':            '/NeuropatiaImg/Accesorio.png',
  'Facial':               '/NeuropatiaImg/Facial.png',
  'GluteoInf':            '/NeuropatiaImg/GluteoSupIn.png',
  'GluteoSup':            '/NeuropatiaImg/GluteoMedio.png',
  'Femoral':              '/NeuropatiaImg/Femoral.png',
  'FemoralCtn':           '/NeuropatiaImg/Femorocutáneo.png',
  'Safeno':               '/NeuropatiaImg/Safeno.png',
  'Obturador':            '/NeuropatiaImg/Obturador.png',
  'Peroneo':              '/NeuropatiaImg/Peroneo.png',
  'PeroneoS':             '/NeuropatiaImg/PeroneoSu.png',
  'PeroneoP':             '/NeuropatiaImg/PeroneoPr.png',
  'Tibial':               '/NeuropatiaImg/Tibial.png',
  'Sural':                '/NeuropatiaImg/Sural.png',
  'PlantarMe':            '/NeuropatiaImg/PlantarMe.png',
  'PlantarLa':            '/NeuropatiaImg/PlantarLa.png',
  'Ilioiguinal':          '/NeuropatiaImg/Ilioinguinal.png',
  'Ciatico':              '/NeuropatiaImg/Ciatico.png',
  'Pudendo':              '/NeuropatiaImg/Pudendo.png',
};

/* ─── Árbol jerárquico exacto del móvil ────────────────────────────────────── */
// texto = para reporte  |  lista = para modo lista  |  img = ImgValue overlay
// next = nombre del siguiente step

// Pronóstico (con \n\n prefix — para Desmielinizante/Axonal completa)
const PRONOSTICO_DESM = [
  { n:'Recuperación completa',            t:'\n\nPronóstico de recuperación completa.',           l:'Recuperación completa' },
  { n:'Recuperación parcial funcional',   t:'\n\nPronóstico de recuperación parcial funcional.',  l:'Recuperación parcial funcional' },
  { n:'Recuperación Pobre no funcional',  t:'\n\nPronóstico de recuperación pobre no funcional.', l:'Recuperación Pobre no funcional' },
  { n:'Recuperación nula',                t:'\n\nPronóstico de recuperación nulo.',               l:'Recuperación nula' },
];
// Pronóstico sin \n\n (para Axonal con Reinervación)
const PRONOSTICO = [
  { n:'Recuperación completa',            t:' pronóstico de recuperación completa.',           l:'Recuperación completa' },
  { n:'Recuperación parcial funcional',   t:' pronóstico de recuperación parcial funcional.',  l:'Recuperación parcial funcional' },
  { n:'Recuperación Pobre no funcional',  t:' pronóstico de recuperación pobre no funcional.', l:'Recuperación Pobre no funcional' },
  { n:'Recuperación nula',                t:' pronóstico de recuperación nulo.',               l:'Recuperación nula' },
];

const REINERVACION = [
  { n:'Reinervación activa',   t:'\n\nReinervación activa;',   l:'Activa',   next:'Pronóstico' },
  { n:'Reinervación inactiva', t:'\n\nReinervación inactiva;', l:'Inactiva', next:'Pronóstico' },
];

const INTENSIDAD_DESM = [
  { n:'Leve',     t:' intensidad leve.',     l:'Leve',     next:'Pronóstico_Desm' },
  { n:'Moderada', t:' intensidad moderada.', l:'Moderada', next:'Pronóstico_Desm' },
  { n:'Severa',   t:' intensidad severa.',   l:'Severa',   next:'Pronóstico_Desm' },
];
const INTENSIDAD = [
  { n:'Leve',     t:' intensidad leve.',     l:'Leve',     next:'Reinervación' },
  { n:'Moderada', t:' intensidad moderada.', l:'Moderada', next:'Reinervación' },
  { n:'Severa',   t:' intensidad severa.',   l:'Severa',   next:'Reinervación' },
];
const INTENSIDAD_C = [
  { n:'Leve',     t:' intensidad leve.',     l:'Leve',     next:'Pronóstico_Desm' },
  { n:'Moderada', t:' intensidad moderada.', l:'Moderada', next:'Pronóstico_Desm' },
  { n:'Severa',   t:' intensidad severa.',   l:'Severa',   next:'Pronóstico_Desm' },
];

const FIBRAS = [
  { n:'Motoras',                    t:'en fibras motoras,',                    l:'Motoras',                    next:'Intensidad' },
  { n:'Sensitivas',                 t:'en fibras sensitivas,',                 l:'Sensitivas',                 next:'Intensidad' },
  { n:'Mixtas (Sensitivo-Motora)',  t:'en fibras mixtas (sensitivo-motora),',  l:'Mixtas (Sensitivo-Motora)',  next:'Intensidad' },
];
const FIBRAS_DESM = [
  { n:'Motoras',                    t:'para fibras motoras,',                    l:'Motoras',                    next:'Intensidad_Desm' },
  { n:'Sensitivas',                 t:'para fibras sensitivas,',                 l:'Sensitivas',                 next:'Intensidad_Desm' },
  { n:'Mixtas (Sensitivo-Motora)',  t:'para fibras mixtas (sensitivo-motora),',  l:'Mixtas (Sensitivo-Motora)',  next:'Intensidad_Desm' },
];

const MIXTA_F = [
  { n:'Desmielinizante-Axonal',   t:' de tipo desmielinizante con perdida axonal secundaria', l:'Primariamente desmielinizante con perdida axonal secundaria', next:'Fibras_Desm' },
  { n:'Axonal-Desmielinizante',   t:' de tipo axonal con desmielinizacón secundaria',         l:'Primariamente axonal con desmielinizacón secundaria',         next:'Fibras_Desm' },
];
const MIXTA_FB = [
  { n:'Desmielinizante-Axonal',   t:' de tipo desmielinizante con perdida axonal secundaria', l:'Primariamente desmielinizante con perdida axonal secundaria', next:'Intensidad_Desm' },
  { n:'Axonal-Desmielinizante',   t:' de tipo axonal con desmielinizacón secundaria',         l:'Primariamente axonal con desmielinizacón secundaria',         next:'Intensidad_Desm' },
];

const CONDICION_DESM_T = [
  { n:'Retardo en la conducción',          t:' por retardo en la conducción',          l:'con retardo en la conducción',          next:'Fibras_Desm' },
  { n:'Bloqueo parcial en la conducción',  t:' por bloqueo parcial en la conducción',  l:'con bloqueo parcial en la conducción',  next:'Fibras_Desm' },
  { n:'Bloqueo completo en la conducción', t:' por bloqueo completo en la conducción', l:'con bloqueo completo en la conducción', next:'Fibras_Desm' },
];
const CONDICION_DESM_TB = [
  { n:'Retardo en la conducción',          t:' por retardo en la conducción',          l:'con retardo en la conducción',          next:'Fibras_Desm' },
  { n:'Bloqueo parcial en la conducción',  t:' por bloqueo parcial en la conducción',  l:'con bloqueo parcial en la conducción',  next:'Fibras_Desm' },
  { n:'Bloqueo completo en la conducción', t:' por bloqueo completo en la conducción', l:'con bloqueo completo en la conducción', next:'Fibras_Desm' },
];
const CONDICION_DESM_TC = [
  { n:'Retardo en la conducción',          t:' por retardo en la conducción',          l:'con retardo en la conducción',          next:'Intensidad_C' },
  { n:'Bloqueo parcial en la conducción',  t:' por bloqueo parcial en la conducción',  l:'con bloqueo parcial en la conducción',  next:'Intensidad_C' },
  { n:'Bloqueo completo en la conducción', t:' por bloqueo completo en la conducción', l:'con bloqueo completo en la conducción', next:'Intensidad_C' },
];

const CONDICION_AX_COMPLETA = [
  { n:'Denervación Difusa (++++)',     t:' con denervación difusa (++++)',     l:'con denervación difusa (++++)',     next:'Fibras' },
  { n:'Denervación Abundante (+++)',   t:' con denervación abundante (+++)',   l:'con denervación abundante (+++)',   next:'Fibras' },
  { n:'Denervación Progresiva (++)',   t:' con denervación progresiva (++)',   l:'con denervación progresiva (++)',   next:'Fibras' },
  { n:'Denervación Discreta (+/+)',    t:' con denervación discreta (+/+)',    l:'con denervación discreta (+/+)',    next:'Fibras' },
  { n:'Sin denervación',              t:' sin denervación,',                  l:'sin denervación',                  next:'Fibras' },
];
const CONDICION_AX_COMPLETA_B = [
  { n:'Denervación Difusa (++++)',     t:' con denervación difusa (++++)',     l:'con denervación difusa (++++)',     next:'Intensidad' },
  { n:'Denervación Abundante (+++)',   t:' con denervación abundante (+++)',   l:'con denervación abundante (+++)',   next:'Intensidad' },
  { n:'Denervación Progresiva (++)',   t:' con denervación progresiva (++)',   l:'con denervación progresiva (++)',   next:'Intensidad' },
  { n:'Denervación Discreta (+/+)',    t:' con denervación discreta (+/+)',    l:'con denervación discreta (+/+)',    next:'Intensidad' },
  { n:'Sin denervación',              t:' sin denervación,',                  l:'sin denervación',                  next:'Intensidad' },
];
const CONDICION_AX_INCOMPLETA = [
  { n:'Denervación Difusa (++++)',     t:' con denervación difusa (++++)',     l:'con denervación difusa (++++)',     next:'Fibras' },
  { n:'Denervación Abundante (+++)',   t:' con denervación abundante (+++)',   l:'con denervación abundante (+++)',   next:'Fibras' },
  { n:'Denervación Progresiva (++)',   t:' con denervación progresiva (++)',   l:'con denervación progresiva (++)',   next:'Fibras' },
  { n:'Denervación Discreta (+/+)',    t:' con denervación discreta (+/+)',    l:'con denervación discreta (+/+)',    next:'Fibras' },
  { n:'Ausente',                      t:' sin denervación,',                  l:'Ausente',                          next:'Fibras' },
];
const CONDICION_AX_INCOMPLETA_B = [
  { n:'Denervación Difusa (++++)',     t:' con denervación difusa (++++)',     l:'con denervación difusa (++++)',     next:'Intensidad' },
  { n:'Denervación Abundante (+++)',   t:' con denervación abundante (+++)',   l:'con denervación abundante (+++)',   next:'Intensidad' },
  { n:'Denervación Progresiva (++)',   t:' con denervación progresiva (++)',   l:'con denervación progresiva (++)',   next:'Intensidad' },
  { n:'Denervación Discreta (+/+)',    t:' con denervación discreta (+/+)',    l:'con denervación discreta (+/+)',    next:'Intensidad' },
  { n:'Ausente',                      t:' sin denervación,',                  l:'Ausente',                          next:'Intensidad' },
];

// Tipo — 3 variantes según contexto (Lado simple, Lado Bilateral, solo Condición)
const TIPO = [
  { n:'Axonal completa',   t:'de tipo axonal completa',   l:'Axonal completa',   next:'Condicion_AxC' },
  { n:'Axonal incompleta', t:'de tipo axonal incompleta', l:'Axonal incompleta', next:'Condicion_AxI' },
  { n:'Desmielinizante',   t:'de tipo desmielinizante',   l:'Desmielinizante',   next:'Condicion_Desm_T' },
  { n:'Mixta',             t:'',                          l:'Mixta',             next:'Mixta_F' },
];
const TIPO_B = [
  { n:'Axonal completa',   t:'de tipo axonal completa',   l:'Axonal completa',   next:'Condicion_AxCB' },
  { n:'Axonal incompleta', t:'de tipo axonal incompleta', l:'Axonal incompleta', next:'Condicion_AxIB' },
  { n:'Desmielinizante',   t:'de tipo desmielinizante',   l:'Desmielinizante',   next:'Condicion_Desm_TC' },
  { n:'Mixta',             t:'',                          l:'Mixta',             next:'Mixta_FB' },
];
const TIPO_C = [
  { n:'Axonal completa',   t:'de tipo axonal completa',   l:'Axonal completa',   next:'Intensidad_C' },
  { n:'Axonal incompleta', t:'de tipo axonal incompleta', l:'Axonal incompleta', next:'Intensidad_C' },
  { n:'Desmielinizante',   t:'de tipo desmielinizante',   l:'Desmielinizante',   next:'Condicion_Desm_TB' },
  { n:'Mixta',             t:'',                          l:'Mixta',             next:'Mixta_FB' },
];

// Ubicación
const UBICACION = [
  { n:'Focalizada',   t:' focalizada a nivel',   next:'Tipo' },
  { n:'Segmentaria',  t:' segmentaria a nivel',  next:'Tipo' },
];

// Nervios principales por división
// btnKeys: { D: focalKey_derecho, I: focalKey_izq, Blt: focalKey_bilateral }
// Seg keys = focalKey + 'Sg'
const DIVISION_SUPERIORES = [
  { n:'Mediano',              t:'de nervio Mediano',              l:'Mediano',              img:'MedianoImg',         btnKeys:{ D:'BotónMediano',    I:'BotónMedianoIzq',    Blt:'BotónMedianoBtl' } },
  { n:'Interóseo anterior',   t:'de nervio Interóseo anterior',   l:'Interóseo anterior',   img:'InteroseoA',         btnKeys:{ D:'BtnIntAn',        I:'BtnIntAnIzq',        Blt:'BtnIntAnBlt' } },
  { n:'Axilar',               t:'de nervio Axilar',               l:'Axilar',               img:'Axilar',             btnKeys:{ D:'BtnAxl',          I:'BtnAxlIzq',          Blt:'BtnAxlBlt' } },
  { n:'Musculocutáneo',       t:'de nervio Musculocutáneo',       l:'Musculocutáneo',       img:'Musculocutáneo',     btnKeys:{ D:'BtnMctn',         I:'BtnMctnIzq',         Blt:'BtnMctnBlt' } },
  { n:'Radial',               t:'de nervio Radial',               l:'Radial',               img:'Radial',             btnKeys:{ D:'BtnRad',          I:'BtnRadIzq',          Blt:'BtnRadBlt' } },
  { n:'Radial superficial',   t:'de nervio Radial superficial',   l:'Radial superficial',   img:'Radial superficial', btnKeys:{ D:'BtnRads',         I:'BtnRadsIzq',         Blt:'BtnRadsBlt' } },
  { n:'Interóseo posterior',  t:'de nervio Interóseo posterior',  l:'Interóseo posterior',  img:'Interóseo posterior',btnKeys:{ D:'BtnInPs',         I:'BtnInPsIzq',         Blt:'BtnInPsBlt' } },
  { n:'Supraescapular',       t:'de nervio Supraescapular',       l:'Supraescapular',        img:'Supraescapular',     btnKeys:{ D:'BtnSpr',          I:'BtnSprIzq',          Blt:'BtnSprBlt' } },
  { n:'Ulnar',                t:'de nervio Ulnar',                l:'Ulnar',                img:'Ulnar',              btnKeys:{ D:'BtnUln',          I:'BtnUlnIzq',          Blt:'BtnUlnBlt' } },
  { n:'Dorsal cutáneo',       t:'de nervio Dorsal cutáneo',       l:'Dorsal cutáneo',        img:'Dorsal cutáneo',     btnKeys:{ D:'BtnDrc',          I:'BtnDrcIzq',          Blt:'BtnDrcBlt' } },
  { n:'Toracodorsal',         t:'de nervio Toracodorsal',         l:'Toracodorsal',          img:'Toracodorsal',       btnKeys:{ D:'BtnTorac',        I:'BtnToracIzq',        Blt:'BtnToracBlt' } },
  { n:'Torácico largo',       t:'de nervio Torácico largo',       l:'Torácico largo',        img:'Torácico largo',     btnKeys:{ D:'BtnTora',         I:'BtnToraIzq',         Blt:'BtnToraBlt' } },
  { n:'Antebraquial medial',  t:'de nervio Antebraquial medial',  l:'Antebraquial medial',   img:'Antebraquial medial',btnKeys:{ D:'BtnAntM',         I:'BtnAntMIzq',         Blt:'BtnAntMBlt' } },
  { n:'Antebraquial lateral', t:'de nervio Antebraquial lateral', l:'Antebraquial lateral',  img:'Antebraquial lateral',btnKeys:{ D:'BtnAntLr',       I:'BtnAntLrIzq',        Blt:'BtnAntLrBlt' } },
];
const DIVISION_CRANEALES = [
  { n:'Frénico',    t:'de nervio Frénico',    l:'Frénico',    img:'Frenico',   btnKeys:{ D:'BtnFrn',  I:'BtnFrnIzq',  Blt:'BtnFrnBlt' } },
  { n:'Accesorio',  t:'de nervio Accesorio',  l:'Accesorio',  img:'Accesorio', btnKeys:{ D:'BtnAcc',  I:'BtnAccIzq',  Blt:'BtnAccBlt' } },
  { n:'Facial',     t:'de nervio Facial',     l:'Facial',     img:'Facial',    btnKeys:{ D:'BtnFaci', I:'BtnFaciIzq', Blt:'BtnFaciBlt' } },
];
const DIVISION_INFERIORES = [
  { n:'Glúteo inferior',       t:'de nervio Glúteo inferior',       l:'Glúteo inferior',       img:'GluteoInf',   btnKeys:{ D:'BtnGltIn',   I:'BtnGltInIzq',   Blt:'BtnGltInBlt' } },
  { n:'Glúteo superior',       t:'de nervio Glúteo superior',       l:'Glúteo superior',       img:'GluteoSup',   btnKeys:{ D:'BtnGltSp',   I:'BtnGltSpIzq',   Blt:'BtnGltSpBlt' } },
  { n:'Femoral',               t:'de nervio Femoral',               l:'Femoral',               img:'Femoral',     btnKeys:{ D:'BtnFem',     I:'BtnFemIzq',     Blt:'BtnFemBlt' } },
  { n:'Femorocutáneo lateral', t:'de nervio Femorocutáneo lateral', l:'Femorocutáneo lateral', img:'FemoralCtn',  btnKeys:{ D:'BtnFemct',  I:'BtnFemctIzq',  Blt:'BtnFemctBlt' } },
  { n:'Safeno',                t:'de nervio Safeno',                l:'Safeno',                img:'Safeno',      btnKeys:{ D:'BtnSaf',     I:'BtnSafIzq',     Blt:'BtnSafBlt' } },
  { n:'Obturador',             t:'de nervio Obturador',             l:'Obturador',             img:'Obturador',   btnKeys:{ D:'BtnObt',     I:'BtnObtIzq',     Blt:'BtnObtBlt' } },
  { n:'Peroneo común',         t:'de nervio Peroneo común',         l:'Peroneo común',         img:'Peroneo',     btnKeys:{ D:'BtnPer',     I:'BtnPerIzq',     Blt:'BtnPerBlt' } },
  { n:'Peroneo superficial',   t:'de nervio Peroneo superficial',   l:'Peroneo superficial',   img:'PeroneoS',    btnKeys:{ D:'BtnPerSp',  I:'BtnPerSpIzq',  Blt:'BtnPerSpBlt' } },
  { n:'Peroneo profundo',      t:'de nervio Peroneo profundo',      l:'Peroneo profundo',      img:'PeroneoP',    btnKeys:{ D:'BtnPerPf',  I:'BtnPerPfIzq',  Blt:'BtnPerPfBlt' } },
  { n:'Tibial',                t:'de nervio Tibial',                l:'Tibial',                img:'Tibial',      btnKeys:{ D:'BtnTib',     I:'BtnTibIzq',     Blt:'BtnTibBlt' } },
  { n:'Sural',                 t:'de nervio Sural',                 l:'Sural',                 img:'Sural',       btnKeys:{ D:'BtnSur',     I:'BtnSurIzq',     Blt:'BtnSurBlt' } },
  { n:'Plantar medial',        t:'de nervio Plantar medial',        l:'Plantar medial',         img:'PlantarMe',   btnKeys:{ D:'BtnPlaMe',  I:'BtnPlaMeIzq',  Blt:'BtnPlaMeBlt' } },
  { n:'Plantar lateral',       t:'de nervio Plantar lateral',       l:'Plantar lateral',        img:'PlantarLa',   btnKeys:{ D:'BtnPlaLt',  I:'BtnPlaLtIzq',  Blt:'BtnPlaLtBlt' } },
  { n:'Ilioiguinal',           t:'de nervio Ilioiguinal',           l:'Ilioiguinal',            img:'Ilioiguinal', btnKeys:{ D:'BtnIlio',    I:'BtnIlioIzq',    Blt:'BtnIlioBlt' } },
];
const DIVISION_SACRO = [
  { n:'Ciático', t:'de nervio Ciático', l:'Ciático', img:'Ciatico', btnKeys:{ D:'BtnCia', I:'BtnCiaIzq', Blt:'BtnCiaBlt' } },
  { n:'Pudendo', t:'de nervio Pudendo', l:'Pudendo', img:'Pudendo', btnKeys:{ D:'BtnPud', I:'BtnPudIzq', Blt:'BtnPudBlt' } },
];

/* ─── helpers ───────────────────────────────────────────────────────────────── */
function limpiarTextoReporte(s) {
  if (!s) return '';
  return s.split('\n\n').map(parrafo => {
    let t = parrafo.replace(/[ \t]+/g, ' ').trim();
    t = t.replace(/\s+([.,;:])/g, '$1');
    if (!t) return '';
    t = t[0].toUpperCase() + t.slice(1);
    t = t.replace(/([.!?])\s+([a-záéíóúüñ])/g, (_, p, c) => `${p} ${c.toUpperCase()}`);
    if (!/[.!?]$/.test(t)) t += '.';
    return t;
  }).filter(Boolean).join('\n\n');
}

/* ─── UI primitivos ─────────────────────────────────────────────────────────── */
function StepTitle({ children }) {
  return <p style={{ color:'#f97316', fontSize:11, fontWeight:700, letterSpacing:2, marginBottom:10, marginTop:4, textTransform:'uppercase' }}>{children}</p>;
}
function CBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ display:'block', width:'100%', textAlign:'left', padding:'9px 14px', marginBottom:6, borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#fff', fontSize:13, fontWeight:500, cursor:'pointer', transition:'background 0.15s' }}
      onMouseEnter={e=>e.currentTarget.style.background='rgba(249,115,22,0.2)'}
      onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
      {label}
    </button>
  );
}
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

/* ─── GaleriaTablas ─────────────────────────────────────────────────────────── */
function GaleriaTablas({ onSelect, onClose }) {
  const [busqueda, setBusqueda] = useState('');
  const filtradas = TABLAS.filter(t => t.id.toLowerCase().includes(busqueda.toLowerCase()));
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10100, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#2a2a2a', borderRadius:14, width:'100%', maxWidth:480, maxHeight:'85vh', display:'flex', flexDirection:'column', border:'1px solid rgba(255,255,255,0.1)', overflow:'hidden' }}>
        <div style={{ padding:'18px 20px 12px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ color:'#fff', fontSize:17, fontWeight:700, margin:'0 0 12px', textAlign:'center' }}>Selecciona una imagen:</h3>
          <input type="text" value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar..." autoFocus style={{ width:'100%', boxSizing:'border-box', background:'#444', border:'none', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:14, outline:'none' }} />
        </div>
        <div style={{ flex:1, overflowY:'auto' }}>
          {filtradas.length===0 ? <p style={{ color:'rgba(255,255,255,0.4)', padding:20, textAlign:'center' }}>Sin resultados.</p>
            : filtradas.map((t,i) => (
              <button key={i} onClick={()=>onSelect(`${TABLAS_URL}/${t.file}`)} style={{ width:'100%', textAlign:'left', padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.07)', color:'#fff', fontSize:14, cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(249,115,22,0.12)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>{t.id}</button>
            ))}
        </div>
        <div style={{ padding:'12px 20px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onClose} style={{ width:'100%', padding:'11px 0', borderRadius:10, border:'none', background:'#f97316', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer' }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────────────── */
export default function ReportFace() {
  const { data: session } = useSession();
  const router = useRouter();

  /* ── State ── */
  const [step, setStep]               = useState('Evolución');
  const [conclusions, setConclusions] = useState([]);  // { value, title, lista }
  const [activeOv, setActiveOv]       = useState([]);
  const [ovHist, setOvHist]           = useState([]);
  const [activeTab, setActiveTab]     = useState('reporte');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [figuras, setFiguras]         = useState([]);
  const [imgLista, setImgLista]       = useState(null);
  const [comentarioLista, setComentarioLista] = useState('');
  const [showGaleria, setShowGaleria] = useState(false);
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [comentarioTemp, setComentarioTemp] = useState('');
  const [cropState, setCropState]     = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [editadoManual, setEditadoManual] = useState(false);
  const laminaRef = useRef(null);
  const [pdfOpen, setPdfOpen] = useState(false);

  // Context: qué Tipo variant usar tras Seleccionar
  // 'Tipo' | 'Tipo_B' | 'Tipo_C'
  const [tipoContexto, setTipoContexto] = useState('Tipo');
  // Texto de ubicación pendiente: se pushea cuando el usuario confirma en Seleccionar
  // { texto, lista, btnKey, segKey, selectedSeg } — selectedSeg = texto del punto clickeado
  const [ubicacionPendiente, setUbicacionPendiente] = useState(null);
  // btnKeys del nervio actual { D, I, Blt } — se actualiza al elegir nervio
  const [nerveBtnKeys, setNerveBtnKeys] = useState(null);
  // Botón activo del nervio: { focalKey, segKey }  basado en nervio × lado seleccionados
  const [nerveBtn, setNerveBtn] = useState(null);  // null = sin puntos de selección
  // activeTab controlado desde aquí para que Final lo use
  // (activeTab ya existe abajo como state)

  /* ── Overlay helpers ── */
  const addOverlays = useCallback((ids) => {
    setActiveOv(p => [...p, ...ids.filter(i => !p.includes(i))]);
    setOvHist(h => [...h, ids]);
  }, []);
  const removeLastOverlayGroup = useCallback(() => {
    setOvHist(h => {
      if (!h.length) return h;
      const last = h[h.length-1];
      setActiveOv(p => p.filter(k => !last.includes(k)));
      return h.slice(0,-1);
    });
  }, []);

  /* ── Conclusion helpers ── */
  const pushConclusion = useCallback((value, title, lista) =>
    setConclusions(prev => [...prev, { value, title, lista: lista ?? title }]), []);
  const popConclusion = useCallback((n=1) =>
    setConclusions(prev => prev.slice(0,-n)), []);
  const goBack1 = useCallback((toStep) => {
    popConclusion(1);
    removeLastOverlayGroup();
    setStep(toStep);
  }, [popConclusion, removeLastOverlayGroup]);

  /* ── Reset ── */
  const resetAll = useCallback(() => {
    setStep('Evolución'); setConclusions([]); setActiveOv([]); setOvHist([]);
    setActiveTab('reporte'); setFiguras([]); setImgLista(null);
    setComentarioLista(''); setTextoEditado(''); setEditadoManual(false);
    setTipoContexto('Tipo'); setUbicacionPendiente(null); setNerveBtn(null); setNerveBtnKeys(null);
  }, []);

  /* ── Texto reporte ── */
  const textoReporte = useMemo(() =>
    limpiarTextoReporte(conclusions.map(c => c.title).join('')),
    [conclusions]);

  const prevTextoRef = useRef('');
  if (!editadoManual && textoReporte !== prevTextoRef.current) {
    prevTextoRef.current = textoReporte;
    if (textoEditado !== textoReporte) setTextoEditado(textoReporte);
  }
  const textoFinal = editadoManual ? textoEditado : textoReporte;

  /* ── Lista visual ── */
  // En móvil: resumen = array de strings "Titulo - valor" ya formados
  // Lo replicamos con el campo lista de cada conclusión
  const listaVisual = useMemo(() => {
    const rows = [];
    const seen = new Set();
    for (const c of conclusions) {
      if (!c.lista || c.lista === '_') continue;
      // Si ya contiene " - " viene formado como "Titulo - valor"
      if (c.lista.includes(' - ')) {
        if (!seen.has(c.lista)) { rows.push({ raw: c.lista }); seen.add(c.lista); }
      } else {
        // Agrupa por value (titulo del step)
        const key = c.value;
        const existing = rows.find(r => r.key === key);
        if (existing) { existing.v += ' ' + c.lista.trim(); }
        else { rows.push({ key, k: c.value, v: c.lista.trim() }); }
      }
    }
    return rows.map(r => r.raw
      ? { k: r.raw.split(' - ')[0], v: r.raw.split(' - ').slice(1).join(' - ') }
      : { k: r.k, v: r.v }
    );
  }, [conclusions]);

  /* ── Figura drag ── */
  const dragRef = useState(() => ({ active:null, startX:0, startY:0, origX:0, origY:0 }))[0];
  const agregarFigura = useCallback((tipo, src) => {
    const SIZE=80;
    const rect=laminaRef.current?.getBoundingClientRect();
    const cx=rect?(rect.width/2-SIZE/2):60;
    const cy=rect?(rect.height/2-SIZE/2):60;
    setFiguras(p=>[...p,{ id:Date.now()+Math.random(), src, tipo, x:cx, y:cy }]);
  }, []);
  const eliminarFigura = useCallback((id)=>setFiguras(p=>p.filter(f=>f.id!==id)),[]);
  const moverFigura = useCallback((id,x,y)=>setFiguras(p=>p.map(f=>f.id===id?{...f,x,y}:f)),[]);
  const onFiguraMouseDown = useCallback((e, figura) => {
    e.preventDefault();
    dragRef.active=figura.id; dragRef.startX=e.clientX; dragRef.startY=e.clientY;
    dragRef.origX=figura.x; dragRef.origY=figura.y;
    const onMove=(ev)=>{
      if(!dragRef.active)return;
      const canvas=laminaRef.current;
      const maxX=canvas?canvas.clientWidth-80:9999;
      const maxY=canvas?canvas.clientHeight-80:9999;
      moverFigura(dragRef.active,
        Math.max(0,Math.min(dragRef.origX+(ev.clientX-dragRef.startX),maxX)),
        Math.max(0,Math.min(dragRef.origY+(ev.clientY-dragRef.startY),maxY)),
      );
    };
    const onUp=()=>{ dragRef.active=null; window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',onUp); };
    window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
  }, [dragRef, moverFigura, laminaRef]);

  /* ── Helpers de navegación para Lado → Ubicación ── */
  // Al seleccionar Lado, el contexto determina qué Tipo usar después de Ubicación
  const goLado = useCallback((texto, lista, isBilateral, toUbicacion) => {
    if (lista === '_') {
      // Bilateral: no pushear Lado aquí, va al paso Bilateral
    } else {
      pushConclusion('Lado', texto, lista);
    }
    addOverlays([]);
    setStep(toUbicacion);
  }, [pushConclusion, addOverlays]);

  /* ── STEP RENDERERS ── */
  const renderStep = () => {

    // ── Evolución (raíz)
    if (step === 'Evolución') return (
      <div>
        <StepTitle>Evolución</StepTitle>
        {[
          { n:'Neuropatía aguda',    t:'Neuropatía aguda',    l:'Evolucion - Neuropatía aguda' },
          { n:'Neuropatía subaguda', t:'Neuropatía subaguda', l:'Evolucion - Neuropatía subaguda' },
          { n:'Neuropatía crónica',  t:'Neuropatía crónica',  l:'Evolucion - Neuropatía crónica' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Evolución', op.t, op.l);
            addOverlays([]);
            setStep('División');
          }} />
        ))}
      </div>
    );

    // ── División (Miembros sup / Craneales / Miembros inf / Sacro)
    if (step === 'División') return (
      <div>
        <NavRow onBack={() => goBack1('Evolución')} onReset={resetAll} />
        <StepTitle>División</StepTitle>
        {[
          { n:'Miembros superiores', next:'Nervio_Sup' },
          { n:'Craneales',           next:'Nervio_Craneal' },
          { n:'Miembros inferiores', next:'Nervio_Inf' },
          { n:'Sacro',               next:'Nervio_Sacro' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('División', '', '_');
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Nervios por división
    const renderNervios = (lista, backStep) => (
      <div>
        <NavRow onBack={() => goBack1(backStep)} onReset={resetAll} />
        <StepTitle>Nervio</StepTitle>
        <div style={{ maxHeight:360, overflowY:'auto' }}>
          {lista.map(op => (
            <CBtn key={op.n} label={op.n} onClick={() => {
              pushConclusion('Nervio', op.t, op.n);
              addOverlays(op.img ? [op.img] : []);
              setNerveBtnKeys(op.btnKeys || null);
              setStep('Lado');
            }} />
          ))}
        </div>
      </div>
    );
    if (step === 'Nervio_Sup')    return renderNervios(DIVISION_SUPERIORES, 'División');
    if (step === 'Nervio_Craneal') return renderNervios(DIVISION_CRANEALES, 'División');
    if (step === 'Nervio_Inf')    return renderNervios(DIVISION_INFERIORES, 'División');
    if (step === 'Nervio_Sacro')  return renderNervios(DIVISION_SACRO, 'División');

    // ── Lado
    if (step === 'Lado') return (
      <div>
        <NavRow onBack={() => { goBack1('División'); removeLastOverlayGroup(); setStep('División'); }} onReset={resetAll} />
        <StepTitle>Lado</StepTitle>
        {[
          { n:'Izquierdo', t:' izquierdo,', l:'Izquierdo', bk:'I' },
          { n:'Derecho',   t:' derecho,',   l:'Derecho',   bk:'D' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Lado', op.t, op.l);
            addOverlays([]);
            setTipoContexto('Tipo');
            const fk = nerveBtnKeys?.[op.bk] || null;
            setNerveBtn(fk ? { focalKey: fk, segKey: fk + 'Sg' } : null);
            setStep('Ubicación');
          }} />
        ))}
        <CBtn label="Bilateral" onClick={() => {
          pushConclusion('Lado', ' bilateral', '_');
          addOverlays([]);
          setTipoContexto('Tipo_B');
          const fk = nerveBtnKeys?.['Blt'] || null;
          setNerveBtn(fk ? { focalKey: fk, segKey: fk + 'Sg' } : null);
          setStep('Bilateral');
        }} />
      </div>
    );

    // ── Bilateral (predominio)
    if (step === 'Bilateral') return (
      <div>
        <NavRow onBack={() => goBack1('Lado')} onReset={resetAll} />
        <StepTitle>Bilateral</StepTitle>
        {[
          { n:'Predominio derecho',    t:' con predominio derecho,',    l:'Lado - Bilateral predominio derecho' },
          { n:'Predominio izquierdo',  t:' con predominio izquierdo,',  l:'Lado - Bilateral predominio izquierdo' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Bilateral', op.t, op.l);
            addOverlays([]);
            setStep('Ubicación');
          }} />
        ))}
      </div>
    );

    // ── Ubicación
    if (step === 'Ubicación') return (
      <div>
        <NavRow onBack={() => {
          goBack1(tipoContexto === 'Tipo_B' ? 'Bilateral' : 'Lado');
        }} onReset={resetAll} />
        <StepTitle>Ubicación</StepTitle>
        {[
          { n:'Focalizada',  t:' focalizada a nivel', btnType:'focal' },
          { n:'Segmentaria', t:' segmentaria a nivel', btnType:'seg' },
        ].map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            setUbicacionPendiente({ texto: op.t, lista: op.n, btnType: op.btnType, selectedSeg: null });
            addOverlays([]);
            setStep('Seleccionar');
          }} />
        ))}
      </div>
    );

    // ── Seleccionar (el nervio ya está destacado en la lámina; puntos clickeables)
    if (step === 'Seleccionar') {
      const activeKey = nerveBtn
        ? (ubicacionPendiente?.btnType === 'seg' ? nerveBtn.segKey : nerveBtn.focalKey)
        : null;
      const dots = activeKey ? (NERVE_BUTTONS[activeKey] || null) : null;
      const selSeg = ubicacionPendiente?.selectedSeg || null;

      const handleSegClick = (dot) => {
        setUbicacionPendiente(prev => ({ ...prev, selectedSeg: dot.t }));
      };

      const handleConfirm = () => {
        if (ubicacionPendiente) {
          const textoFinalLoc = selSeg
            ? ubicacionPendiente.texto + ' ' + selSeg
            : ubicacionPendiente.texto;
          const listaFinalLoc = selSeg
            ? ubicacionPendiente.lista + ' ' + selSeg
            : ubicacionPendiente.lista;
          pushConclusion('Ubicación', textoFinalLoc, listaFinalLoc);
          setUbicacionPendiente(null);
        }
        setStep(tipoContexto);
      };

      return (
        <div>
          <NavRow onBack={() => {
            setUbicacionPendiente(null);
            setStep('Ubicación');
          }} onReset={resetAll} />
          <StepTitle>Seleccionar</StepTitle>
          {dots ? (
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:12, lineHeight:1.6, margin:'4px 0 10px' }}>
              Haz clic en un punto de la lámina para seleccionar el segmento afectado.
            </p>
          ) : (
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:12, lineHeight:1.6, margin:'4px 0 10px' }}>
              El nervio seleccionado aparece resaltado en la imagen.
            </p>
          )}
          {selSeg && (
            <div style={{ background:'rgba(249,115,22,0.15)', border:'1px solid rgba(249,115,22,0.4)', borderRadius:8, padding:'7px 12px', marginBottom:10 }}>
              <p style={{ color:'#f97316', fontSize:11, fontWeight:700, margin:'0 0 2px', textTransform:'uppercase', letterSpacing:1 }}>Segmento</p>
              <p style={{ color:'#fff', fontSize:12, margin:0 }}>{selSeg}</p>
            </div>
          )}
          <button
            onClick={handleConfirm}
            disabled={dots && !selSeg}
            style={{
              display:'block', width:'100%', padding:'10px 14px', marginBottom:6,
              borderRadius:8, border:'none',
              background: (dots && !selSeg) ? 'rgba(255,255,255,0.1)' : '#f97316',
              color: (dots && !selSeg) ? 'rgba(255,255,255,0.3)' : '#fff',
              fontSize:13, fontWeight:700, cursor: (dots && !selSeg) ? 'not-allowed' : 'pointer',
            }}
          >
            {dots ? (selSeg ? 'Confirmar selección' : 'Selecciona un punto primero') : 'Confirmar selección'}
          </button>

        </div>
      );
    }

    // ── Tipo (simple)
    if (step === 'Tipo') return (
      <div>
        <NavRow onBack={() => goBack1('Seleccionar')} onReset={resetAll} />
        <StepTitle>Tipo</StepTitle>
        {TIPO.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Tipo', op.t, `Tipo - ${op.l}`);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Tipo_B (bilateral)
    if (step === 'Tipo_B') return (
      <div>
        <NavRow onBack={() => goBack1('Seleccionar')} onReset={resetAll} />
        <StepTitle>Tipo</StepTitle>
        {TIPO_B.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Tipo', op.t, `Tipo - ${op.l}`);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Tipo_C (sin Fibras/Denerv/Reinervación — craneales puros)
    if (step === 'Tipo_C') return (
      <div>
        <NavRow onBack={() => goBack1('Seleccionar')} onReset={resetAll} />
        <StepTitle>Tipo</StepTitle>
        {TIPO_C.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Tipo', op.t, `Tipo - ${op.l}`);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Condiciones Axonal Completa
    if (step === 'Condicion_AxC') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_AX_COMPLETA.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Condicion_AxCB') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo_B')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_AX_COMPLETA_B.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Condiciones Axonal Incompleta
    if (step === 'Condicion_AxI') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_AX_INCOMPLETA.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Condicion_AxIB') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo_B')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_AX_INCOMPLETA_B.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Condición Desmielinizante
    if (step === 'Condicion_Desm_T') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_DESM_T.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Condicion_Desm_TB') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo_B')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_DESM_TB.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Condicion_Desm_TC') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo_B')} onReset={resetAll} />
        <StepTitle>Condición</StepTitle>
        {CONDICION_DESM_TC.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Condición', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Mixta
    if (step === 'Mixta_F') return (
      <div>
        <NavRow onBack={() => goBack1('Tipo')} onReset={resetAll} />
        <StepTitle>Mixta</StepTitle>
        {MIXTA_F.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Mixta', op.t, `Tipo - ${op.l}`);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Mixta_FB') return (
      <div>
        <NavRow onBack={() => goBack1(tipoContexto==='Tipo_B'?'Tipo_B':'Tipo_C')} onReset={resetAll} />
        <StepTitle>Mixta</StepTitle>
        {MIXTA_FB.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Mixta', op.t, `Tipo - ${op.l}`);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );

    // ── Fibras
    const renderFibras = (opciones, backStep) => (
      <div>
        <NavRow onBack={() => goBack1(backStep)} onReset={resetAll} />
        <StepTitle>Fibras</StepTitle>
        {opciones.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Fibras', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Fibras')      return renderFibras(FIBRAS, 'Condicion_AxC');
    if (step === 'Fibras_Desm') return renderFibras(FIBRAS_DESM, 'Condicion_Desm_T');

    // ── Intensidad
    const renderIntensidad = (opciones, backStep) => (
      <div>
        <NavRow onBack={() => goBack1(backStep)} onReset={resetAll} />
        <StepTitle>Intensidad</StepTitle>
        {opciones.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Intensidad', op.t, op.l);
            addOverlays([]);
            setStep(op.next);
          }} />
        ))}
      </div>
    );
    if (step === 'Intensidad')      return renderIntensidad(INTENSIDAD, 'Fibras');
    if (step === 'Intensidad_Desm') return renderIntensidad(INTENSIDAD_DESM, 'Fibras_Desm');
    if (step === 'Intensidad_C')    return renderIntensidad(INTENSIDAD_C, 'Tipo_C');

    // ── Reinervación
    if (step === 'Reinervación') return (
      <div>
        <NavRow onBack={() => goBack1('Intensidad')} onReset={resetAll} />
        <StepTitle>Reinervación</StepTitle>
        {REINERVACION.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Reinervación', op.t, `Reinervación - ${op.l}`);
            addOverlays([]);
            setStep('Pronóstico');
          }} />
        ))}
      </div>
    );

    // ── Pronóstico (con Reinervación — sin \n\n)
    if (step === 'Pronóstico') return (
      <div>
        <NavRow onBack={() => goBack1('Reinervación')} onReset={resetAll} />
        <StepTitle>Pronóstico</StepTitle>
        {PRONOSTICO.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Pronóstico', op.t, `Pronóstico - ${op.l}`);
            addOverlays([]);
            setStep('Final');
          }} />
        ))}
      </div>
    );

    // ── Pronóstico Desm (con \n\n)
    if (step === 'Pronóstico_Desm') return (
      <div>
        <NavRow onBack={() => goBack1('Intensidad_Desm')} onReset={resetAll} />
        <StepTitle>Pronóstico</StepTitle>
        {PRONOSTICO_DESM.map(op => (
          <CBtn key={op.n} label={op.n} onClick={() => {
            pushConclusion('Pronóstico', op.t, `Pronóstico - ${op.l}`);
            addOverlays([]);
            setStep('Final');
          }} />
        ))}
      </div>
    );

    // ── Final — menú + ExportBar (modal-only, triggered via isOpen)
    if (step === 'Final') {
      const goBackFinal = () => {
        const last = conclusions[conclusions.length-1];
        if (!last) { resetAll(); return; }
        popConclusion(1);
        removeLastOverlayGroup();
        setStep('Pronóstico');
      };
      return (
        <>
          <NavRow onBack={goBackFinal} onReset={resetAll} onPdf={() => setPdfOpen(true)} />
          <StepTitle>Informe</StepTitle>

          {activeTab === 'reporte' && (
            <div style={{ marginBottom: 8 }}>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginBottom:8 }}>Figuras en la lámina</p>
              <div style={{ display:'flex', gap:8 }}>
                {[['circle','Circular'],['square','Cuadrada']].map(([tipo,label]) => (
                  <button key={tipo} onClick={() => {
                    const input = document.createElement('input');
                    input.type='file'; input.accept='image/*';
                    input.onchange = e => {
                      const file = e.target.files[0]; if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => agregarFigura(tipo, ev.target.result);
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  }} style={{ flex:1, padding:'12px 6px', borderRadius:10, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.05)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                    <div style={{ width:32, height:32, borderRadius:tipo==='circle'?'50%':'6px', border:'2px solid rgba(255,255,255,0.4)', background:'transparent' }} />
                    <span style={{ color:'rgba(255,255,255,0.6)', fontSize:11 }}>{label}</span>
                  </button>
                ))}
              </div>
              {figuras.length > 0 && (
                <p style={{ color:'rgba(255,255,255,0.35)', fontSize:11, margin:'6px 0 0', fontStyle:'italic' }}>
                  {figuras.length} figura{figuras.length > 1 ? 's' : ''} en la lámina
                </p>
              )}
            </div>
          )}

          {activeTab === 'lista' && (
            <div style={{ marginBottom: 8 }}>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginBottom:8 }}>Imagen de tabla</p>
              <div onClick={() => setShowGaleria(true)} style={{ width:'100%', minHeight:64, borderRadius:10, border:'1.5px dashed rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.03)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6 }}>
                {imgLista
                  ? <img src={imgLista.src} alt="tabla" style={{ width:'100%', maxHeight:90, objectFit:'contain', borderRadius:6 }} />
                  : <>
                      <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M3 9h18M3 15h18M9 3v18"/></svg>
                      <span style={{ color:'rgba(255,255,255,0.3)', fontSize:12 }}>Sin imagen seleccionada</span>
                    </>
                }
              </div>
              {imgLista && (
                <button onClick={() => setImgLista(null)} style={{ width:'100%', padding:'5px 0', borderRadius:8, marginTop:6, background:'transparent', border:'1px solid rgba(239,68,68,0.4)', color:'#ef4444', fontSize:12, cursor:'pointer' }}>
                  Quitar imagen
                </button>
              )}
              <button onClick={() => { setComentarioTemp(comentarioLista); setShowComentarioModal(true); }} style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'rgba(249,115,22,0.15)', border:'1px solid #f97316', cursor:'pointer', color:'#f97316', fontWeight:700, fontSize:14, marginTop:10 }}>
                {comentarioLista ? 'Editar comentario' : 'Agregar comentario'}
              </button>
              {comentarioLista && (
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontStyle:'italic', marginTop:6 }}>
                  {comentarioLista.length > 80 ? comentarioLista.slice(0, 80) + '…' : comentarioLista}
                </p>
              )}
            </div>
          )}

          <ExportBar
            nombrePaciente={nombrePaciente}
            textoReporte={textoFinal}
            activeOv={activeOv}
            figuras={figuras}
            laminaSize={{ w: laminaRef.current?.clientWidth||690, h: laminaRef.current?.clientHeight||620 }}
            listaVisual={listaVisual}
            imgLista={imgLista}
            comentarioLista={comentarioLista}
            onBack={goBackFinal}
            onReset={resetAll}
            isOpen={pdfOpen}
            onClose={() => setPdfOpen(false)}
          />
        </>
      );
    }

    return null;
  };

  /* ── RENDER ── */
  return (
    <div style={{
      position: 'relative', zIndex: 1,
      background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh',
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
        {/* Izquierda: Regresar */}
        <div>
          <button
            onClick={() => router.push('/Reporte')}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', width:38, height:38, borderRadius:'50%', background:'#1C1C1C', border:'2px solid #c44900', cursor:'pointer', padding:8, transition:'background 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#c44900'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#1C1C1C'; }}
          >
            <img src="/assets/IconSVG/I_Crop.svg" alt="Regresar" style={{ width:18, height:18, filter:'invert(1)' }} />
          </button>
        </div>

        {/* Centro: nombre paciente */}
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

        <div />
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
            {/* Inner wrapper sized to the image — dots/overlays % are relative to this */}
            <div style={{ position: 'relative', width: '100%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/NeuropatiaImg/BP_Polineuropatia.png"
                alt="Neuropatía"
                draggable={false}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
              {activeOv.map(k => {
                const src = OVERLAYS[k];
                if (!src) return null;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" draggable={false}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                  />
                );
              })}

              {/* ── Hitboxes de selección (paso Seleccionar) ── */}
              {step === 'Seleccionar' && nerveBtn && (() => {
                const isSeg = ubicacionPendiente?.btnType === 'seg';
                const activeKey = isSeg ? nerveBtn.segKey : nerveBtn.focalKey;
                const dots = isSeg
                  ? (NERVE_SEG_BUTTONS[activeKey] || null)
                  : (NERVE_BUTTONS[activeKey] || null);
                if (!dots) return null;
                const selSeg = ubicacionPendiente?.selectedSeg || null;
                return dots.map((dot, i) => {
                  const isActive = selSeg === dot.t;
                  if (isSeg) {
                    // Segment bar: rotated rectangle, same visual as mobile
                    return (
                      <button
                        key={i}
                        title={dot.t}
                        onClick={() => setUbicacionPendiente(prev => ({
                          ...prev,
                          selectedSeg: prev.selectedSeg === dot.t ? null : dot.t,
                        }))}
                        style={{
                          position: 'absolute',
                          top: `${dot.top}%`,
                          left: `${dot.left}%`,
                          width: `${dot.w}%`,
                          height: `${dot.h}%`,
                          borderRadius: 2,
                          transform: `translate(-50%,-50%) rotate(${dot.r || 0}deg)`,
                          background: isActive ? '#ff4500' : 'rgba(255,165,0,0.18)',
                          border: isActive ? '1.5px solid #fff' : '1px solid rgba(255,165,0,0.4)',
                          cursor: 'pointer',
                          zIndex: 30,
                          padding: 0,
                          outline: 'none',
                          transition: 'background 0.12s',
                        }}
                      />
                    );
                  }
                  // Focal: circular dot
                  return (
                    <button
                      key={i}
                      title={dot.t}
                      onClick={() => setUbicacionPendiente(prev => ({
                        ...prev,
                        selectedSeg: prev.selectedSeg === dot.t ? null : dot.t,
                      }))}
                      style={{
                        position: 'absolute',
                        top: `${dot.top}%`,
                        left: `${dot.left}%`,
                        width: `${Math.max(dot.w, 2.5)}%`,
                        height: `${Math.max(dot.h, 2.5)}%`,
                        minWidth: 12, minHeight: 12,
                        borderRadius: dot.br !== undefined ? `${dot.br}%` : '50%',
                        transform: dot.r
                          ? `translate(-50%,-50%) rotate(${dot.r}deg)`
                          : 'translate(-50%,-50%)',
                        background: isActive ? '#ff4500' : 'transparent',
                        border: isActive ? '1.5px solid #fff' : 'none',
                        cursor: 'pointer',
                        zIndex: 30,
                        padding: 0,
                        outline: 'none',
                        transition: 'background 0.1s',
                      }}
                    />
                  );
                });
              })()}
            </div>{/* end image wrapper */}

            {figuras.map(f => (
              <div key={f.id}
                onMouseDown={(e) => onFiguraMouseDown(e, f)}
                style={{
                  position: 'absolute', left: f.x, top: f.y, zIndex: 20,
                  width: 80, height: 80, cursor: 'grab', userSelect: 'none',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt="" draggable={false} style={{
                  width: 80, height: 80, objectFit: 'cover',
                  borderRadius: f.tipo === 'circle' ? '50%' : 0,
                  border: '1.5px solid gray', display: 'block', pointerEvents: 'none',
                }} />
                <button onMouseDown={e => e.stopPropagation()} onClick={() => eliminarFigura(f.id)}
                  style={{
                    position: 'absolute', top: -10, right: -10,
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'red', border: 'none', cursor: 'pointer',
                    color: '#fff', fontSize: 11, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 22,
                  }}>✕</button>
                <button onMouseDown={e => e.stopPropagation()} onClick={() => setCropState({ id: f.id, src: f.src })}
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
            {[['reporte', 'Reporte'], ['lista', 'Lista']].map(([id, label]) => (
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
                : <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {listaVisual.map(({ k, v }, i) => (
                      <p key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: 0 }}>
                        <span style={{ color: '#f97316', fontWeight: 600 }}>{k}:</span> {v}
                      </p>
                    ))}
                  </div>
              }
              {comentarioLista && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontStyle: 'italic', marginTop: 6 }}>
                  💬 {comentarioLista.length > 100 ? comentarioLista.slice(0, 100) + '…' : comentarioLista}
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

      {/* ══ MODALES ══ */}
      {showGaleria && (
        <GaleriaTablas
          onSelect={src => { setImgLista({ src }); setShowGaleria(false); }}
          onClose={() => setShowGaleria(false)}
        />
      )}
      {showComentarioModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10300, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 14, width: '100%', maxWidth: 440, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 14px' }}>Comentario</h3>
            <textarea value={comentarioTemp} onChange={e => setComentarioTemp(e.target.value)} rows={5} placeholder="Escribe aquí tu comentario..."
              style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 9, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => { setComentarioLista(comentarioTemp); setShowComentarioModal(false); }} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Guardar</button>
              <button onClick={() => setShowComentarioModal(false)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 14, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {cropState && (
        <CropModal src={cropState.src}
          onConfirm={newSrc => { setFiguras(p => p.map(f => f.id === cropState.id ? { ...f, src: newSrc } : f)); setCropState(null); }}
          onClose={() => setCropState(null)} />
      )}
    </div>
  );
}
