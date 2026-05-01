// Mapeo exacto de nombres de cirugía → nombres de archivo en el backend
// Verificado contra los archivos reales en /monitoreopdfs/
export const NOMBRES_SIN_ESPACIOS = {
  // CERVICAL
  'Artroplastía Cervical':                          'ARTROPLASTÍACERVICAL',
  'Disectomía Cervical Anterior 2-3 Niveles':       'DISECTOMÍACERVICALANTERIOR2-3niveles',
  'Disectomía Cervical Anterior':                   'DISECTOMÍACERVICALANTERIOR',
  'Instrumentación Cervical Posterior':             'INSTRUMENTACIÓNCERVICALPOSTERIOR',
  'Laminectomía + Foraminotomía Cervical':          'LAMINECTOMIA+FORAMINOTOMIACERVICAL',
  'Corpectomía Cervical Anterior':                  'CORPECTOMIACERVICALANTERIOR',
  'Endoscopía Cervical Posterior':                  'ENDOSCOPIACERVICALPOSTERIOR',
  'Descompresión de la Unión Cráneo Cervical':      'DESCOMPRESIÓNDELAUNIÓNCRÁNEOCERVICAL',
  // CRANEAL
  'Resección de Meningioma Craneal':                            'RESECCIÓNDEMENINGIOMACRANEAL',
  'Resección de Meningioma Fosa Posterior Tentorial':           'RESECCIÓNDEMENINGIOMAFOSAPOSTERIORTENTORIAL',
  'Resección de Schwanoma Vestibular (Neurinoma del Acústico)': 'RESECCIÓNDESCHANOMAVESTIBULAR(NEURINOMADELACÚSTICO)',
  'Resección Endonasal de Adenoma Hipofisiario':                'RESECCIÓNENDONASALDEADENOMAHIPOFISIARIO',
  'Resección Endonasal de Craneofaringioma':                    'RESECCIÓNENDONASALDECRANEOFARINGIOMA',
  'Resección Frontal de Glioblastoma':                          'RESECCIÓNFRONTALDEGLIOBLASTOMA',
  'Resección Glioma Óptico Quiasmático':                        'RESECCIÓNGLIOMAÓPTICOQUIASMÁTICO',
  'Resección Microquirúrgica de Astrocitoma Cerebeloso':        'RESECCIÓNMICROQUIRÚRGICADEASTROCITOMACEREBELOSO',
  // LUMBAR
  'ALIF - Fusión Lumbar Intersomática Anterior':    'ALIF-FusiónlumbarIntersonamticaAnterior',
  'Descompresión Lumbar Mínimamente Invasiva':      'DESCOMPRESIÓNLUMBARMÍNIMAMENTEINVASIVA',
  'Instrumentación Lumbar':                         'INSTRUMENTACIÓNLUMBAR',
  'Instrumentación Percutánea Lumbar':              'INSTRUMENTACIÓNPERCUTÁNEALUMBAR',
  'Laminectomía + Foraminotomía Lumbar':            'LAMINECTOMÍA+FORAMINOTOMÍALUMBAR',
  'LLIF - Fusión Lumbar Intersomática Lateral':     'LLIF-FusiónlumbarintersomáticaLateral',
  'PLIF - Fusión Lumbar Intersomática Posterior':   'PLIF-FusiónlumbarIntersomáticaposterior',
  'Liberación Microquirúrgica de Medula Anclada':   'LIBERACIÓNMICROQUIRÚRGICADEMEDULAANCLADA',
  // OTROS
  'Exploración Neurólisis y Reparación Microquirúrgica de Plexo Lumbar': 'EXPLORACIÓNNEURÓLISISYREPARACIÓNMICROQUIRÚRGICADEPLEXOLUMBAR',
  'Instrumentación Posterior Toracolumbar con Corrección':                'INSTRUMENTACIÓNPOSTERIORTORACOLUMBARCONCORRECCIÓN',
  'Neurorrafia Microquirúrgica de Plexo Braquial':                        'NEURORRAFIAMICROQUIRÚRGICADEPLEXOBRAQUIAL',
  'Resección Microquirúrgia de Tumoración Intramedular':                  'RESECCIONMICROQUIRURGIADETUMORACIONINTRAMEDULAR',
  'Endarterectomía Carotídea':                                            'ENDARTERECTOMÍACAROTÍDEA',
  'Neurólisis de Nervio Periférico':                                      'NEURÓLISISDENERVIOPERIFÉRICO',
  'Neurorrafia Microquirúrgica de Nervio Periférico':                     'NEURORRAFIAMICROQUIRURGIADENERVIOPERIFERICO',
  'Tiroidectomía':                                                        'TIROIDECTOMÍA',
};

// Cirugías que solo tienen procedimiento (sin protocolo)
export const SOLO_PROCEDIMIENTO = new Set([
  'Endarterectomía Carotídea',
  'Neurólisis de Nervio Periférico',
  'Neurorrafia Microquirúrgica de Nervio Periférico',
  'Tiroidectomía',
]);

export const CERVICALES = [
  'Artroplastía Cervical',
  'Disectomía Cervical Anterior 2-3 Niveles',
  'Disectomía Cervical Anterior',
  'Instrumentación Cervical Posterior',
  'Laminectomía + Foraminotomía Cervical',
  'Corpectomía Cervical Anterior',
  'Endoscopía Cervical Posterior',
  'Descompresión de la Unión Cráneo Cervical',
];

export const LUMBARES = [
  'ALIF - Fusión Lumbar Intersomática Anterior',
  'Descompresión Lumbar Mínimamente Invasiva',
  'Instrumentación Lumbar',
  'Instrumentación Percutánea Lumbar',
  'Laminectomía + Foraminotomía Lumbar',
  'LLIF - Fusión Lumbar Intersomática Lateral',
  'PLIF - Fusión Lumbar Intersomática Posterior',
  'Liberación Microquirúrgica de Medula Anclada',
];

export const CRANEALES = [
  'Resección de Meningioma Craneal',
  'Resección de Meningioma Fosa Posterior Tentorial',
  'Resección de Schwanoma Vestibular (Neurinoma del Acústico)',
  'Resección Endonasal de Adenoma Hipofisiario',
  'Resección Endonasal de Craneofaringioma',
  'Resección Frontal de Glioblastoma',
  'Resección Glioma Óptico Quiasmático',
  'Resección Microquirúrgica de Astrocitoma Cerebeloso',
];

export const OTROS = [
  'Exploración Neurólisis y Reparación Microquirúrgica de Plexo Lumbar',
  'Instrumentación Posterior Toracolumbar con Corrección',
  'Neurorrafia Microquirúrgica de Plexo Braquial',
  'Resección Microquirúrgia de Tumoración Intramedular',
  'Endarterectomía Carotídea',
  'Neurólisis de Nervio Periférico',
  'Neurorrafia Microquirúrgica de Nervio Periférico',
  'Tiroidectomía',
];

export function getFolder(nombreCirugia) {
  if (CERVICALES.includes(nombreCirugia)) return 'CERVICAL';
  if (LUMBARES.includes(nombreCirugia))   return 'LUMBAR';
  if (CRANEALES.includes(nombreCirugia))  return 'CRANEAL';
  if (OTROS.includes(nombreCirugia))      return 'OTROS';
  return null;
}

// Retorna el path del PDF relativo al backend: /{folder}/{filename}
// Usado por el proxy API en Next.js
export function getPdfPath(nombreCirugia, tipo) {
  const folder = getFolder(nombreCirugia);
  if (!folder) return null;

  const nombreArchivo = NOMBRES_SIN_ESPACIOS[nombreCirugia] || nombreCirugia;
  const esOtros = folder === 'OTROS';

  if (tipo === 'modalidades') {
    if (esOtros) {
      return {
        combined: true,
        cervical: `/CERVICAL/Modalidades NF.pdf`,
        lumbar:   `/LUMBAR/Modalidades NF.pdf`,
      };
    }
    return `/${folder}/Modalidades NF.pdf`;
  }

  const suffix = tipo === 'protocolo' ? 'protocolo.pdf' : 'procedimiento.pdf';
  return `/${folder}/${nombreArchivo}${suffix}`;
}
