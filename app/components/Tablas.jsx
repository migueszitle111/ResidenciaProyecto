// GaleriaEmergente.jsx — versión JavaScript
import React, { useState, useEffect, useRef } from 'react';

const imagenesDemo = [
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN',                              src: '/assets/Tablas/LAMBERT_DESMIELINIZACION.png' },
  { id: 'CRITERIOS CIDP AANEM',                                                    src: '/assets/Tablas/CRITERIOS_CIDP_AANEM.png' },
  { id: 'CRITERIOS DE LAMBERT ESCLEROSIS LATERAL AMIOTRÓFICA',                     src: '/assets/Tablas/LAMBERT_ESCLEROSIS_LT.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (DOMINIO)',                                       src: '/assets/Tablas/CRITERIOS _AWAJI_2008_1.png' },
  { id: 'CRITERIOS DE AWAJI 2008 (CATEGORÍA)',                                     src: '/assets/Tablas/CRITERIOS _AWAJI_2008_2.png' },
  { id: 'COMPARACIÓN EL ESCORIAL / AWAJI 2008',                                   src: '/assets/Tablas/COMPARACION_ESCORIAL.png' },
  { id: 'CRITERIOS POLINEUROPATÍA DESMIELINIZANTE/AXONAL',                         src: '/assets/Tablas/POLINEUROPATIA_DESMIELINIZANTE.png' },
  { id: 'PATRONES DE DISTRIBUCIÓN EN POLINEUROPATÍA',                              src: '/assets/Tablas/DISTRIBUCION_POLI.png' },
  { id: 'CUANTIFICACIÓN DE POLINEUROPATÍAS',                                       src: '/assets/Tablas/CUANTIFICACION_POLI.png' },
  { id: 'HALLAZGOS ELECTROFISIOLÓGICOS EN RADICULOPATÍA',                          src: '/assets/Tablas/ELECTROFISIOLOGICOS_RADI.png' },
  { id: 'HALLAZGOS ELECTROFISIÓLOGICOS EVOLUTIVOS EN RADICULOPATÍA',               src: '/assets/Tablas/EVOLUTIVOS_RADI.png' },
  { id: 'HALLAZGOS NEUROGRÁFICOS EN MIOPATÍAS',                                    src: '/assets/Tablas/NEUROGRAFICO_MIO.png' },
  { id: 'HALLAZGOS MIOGRÁFICOS EN MIOPATÍAS',                                      src: '/assets/Tablas/MIOGRAFICOS_MIO.png' },
  { id: 'HALLAZGOS DIFERENCIALES POR TIPOS DE MIOPATÍAS',                          src: '/assets/Tablas/TIPOS_MIOPATIAS.png' },
  { id: 'COMPARACIÓN MIOPATÍA/RADICULOPATÍA/UNIÓN NEUROMUSCULAR',                  src: '/assets/Tablas/COMPARACION.png' },
  { id: 'SEVERIDAD EN MIOPATÍA',                                                   src: '/assets/Tablas/SEVERIDAD_MIO.png' },
  { id: 'GRAVEDAD POR DECREMENTO ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',          src: '/assets/Tablas/DECREMENTO_ELEC.png' },
  { id: 'GRAVEDAD POR SFEMG ELECTROFISIOLÓGICO EN MIASTENIA GRAVIS',               src: '/assets/Tablas/SFEMG_ELEC.png' },
  { id: 'COORRELACIÓN DE PRUEBAS ELECTROFISIOLOGICAS/DATOS CLÍNICOS EN MIASTENIA GRAVIS', src: '/assets/Tablas/PRUEBAS_ELEC.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS SOMATOSENSORIALES Y MOTORES', src: '/assets/Tablas/POTENCIALES_EVO.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS VISUALES',              src: '/assets/Tablas/POTENCIALES_VISUALES.png' },
  { id: 'CLASIFICACIÓN DE GRAVEDAD EN POTENCIALES EVOCADOS AUDITIVOS',             src: '/assets/Tablas/POTENCIALES_AUD.png' },
  { id: 'PRONÓSTICO ASOCIADO A POTENCIALES EVOCADOS',                              src: '/assets/Tablas/PRONOSTICO_ASOCIADO.png' },
  { id: 'SEVERIDAD POTENCIALES EVOCADOS MULTIMODALES',                             src: '/assets/Tablas/EVO_MULTIMODALES.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MS',                src: '/assets/Tablas/SOMATOSENSORIALES_MS.png' },
  { id: 'INTERPRETACIÓN POTENCIALES EVOCADOS SOMATOSENSORIALES MI',                src: '/assets/Tablas/SOMATOS_MI.png' },
  { id: 'MIOPATÍAS DISTALES',                                                      src: '/assets/Tablas/MIOPATIAS_DISTAL.png' },
  { id: 'SÍNDROMES DE LESIÓN COMBINADA A PARES CRANEALES',                         src: '/assets/Tablas/PARES_CRANEALES.png' },
  { id: 'PRONÓSTICO EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',            src: '/assets/Tablas/DEFICIT_AXONAL.png' },
  { id: 'EVOLUCION EN NERVIO FACIAL DE ACUERDO CON EL DÉFICIT AXONAL',             src: '/assets/Tablas/DEFICIT_AXONAL2.png' },
  { id: 'COORRELACIÓN DE TIEMPO DE EVOLUCIÓN EN PLEXOPATÍAS',                      src: '/assets/Tablas/EVOLUCION_PLEXO.png' },
  { id: 'PATRONES ELECTROFISIOLÓGICOS EN NEUROPATÍA',                              src: '/assets/Tablas/PATRONES_NEURO.png' },
  { id: 'CRITERIOS ELECTROFISIOLÓGICOS DE DESMIELINIZACIÓN',                       src: '/assets/Tablas/ELECTROFISIOLOGICOS_DES.png' },
  { id: 'CRITERIOS DIAGNÓSTICOS ELECTROFISIOLÓGICOS PARA AIDP',                    src: '/assets/Tablas/CRITERIOS_AIDP.png' },
  { id: 'DIFERENCIAS ELECTROFISIOLÓGICAS EN POLINEUROPATÍAS',                      src: '/assets/Tablas/DIFERENCIAS_POLI.png' },
  { id: 'AANEM CRITERIOS PARA NEUROPATÍAS POR ATRAPAMIENTO',                       src: '/assets/Tablas/ATRAPAMIENTO.png' },
  { id: 'CLASIFICACIÓN DE SEDDON Y SUNDERLAND',                                    src: '/assets/Tablas/Tabla38.png' },
  { id: 'POLINEUROPATÍAS DESMIELINIZANTES',                                         src: '/assets/Tablas/Tabla39.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – PADUA',                                    src: '/assets/Tablas/Tabla40.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – CANTERBURY',                               src: '/assets/Tablas/Tabla41.png' },
  { id: 'SÍNDROME DEL TÚNEL DEL CARPO – HIRANI',                                   src: '/assets/Tablas/Tabla42.png' },
  { id: 'CRITERIOS DE LAMBERT PARA DESMIELINIZACIÓN (2)',                           src: '/assets/Tablas/Tabla43.png' },
  { id: 'CRITERIOS CIDP AANEM (2)',                                                 src: '/assets/Tablas/Tabla44.png' },
];

const GaleriaEmergente = ({ visible, onImagenSeleccionada, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setSearchText('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [visible]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (visible) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [visible, onClose]);

  if (!visible) return null;

  const imagenesFiltradas = imagenesDemo.filter(img =>
    img.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.backdrop} onClick={onClose} />

      <div style={styles.sheet}>
        <div style={styles.header}>
          <h2 style={styles.titulo}>Selecciona una imagen</h2>
          <input
            ref={inputRef}
            style={styles.buscador}
            type="text"
            placeholder="Buscar tabla..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>

        <ul style={styles.lista}>
          {imagenesFiltradas.map((imagen, i) => (
            <li
              key={`${imagen.id}-${i}`}
              style={styles.item}
              onClick={() => onImagenSeleccionada(imagen.src)}
              onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {imagen.id}
            </li>
          ))}
          {imagenesFiltradas.length === 0 && (
            <li style={styles.sinResultados}>No se encontraron resultados.</li>
          )}
        </ul>

        <div style={styles.footer}>
          <span style={styles.contador}>
            {imagenesFiltradas.length} / {imagenesDemo.length} tablas
          </span>
          <button style={styles.botonCerrar} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    cursor: 'pointer',
  },
  sheet: {
    position: 'relative',
    zIndex: 10000,
    width: '90%',
    maxWidth: 600,
    height: '85vh',
    backgroundColor: '#fff',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  header: {
    padding: '16px 20px 12px',
    borderBottom: '1px solid #eee',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 10,
    color: '#111',
  },
  buscador: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    backgroundColor: '#f9f9f9',
  },
  lista: {
    flex: 1,
    overflowY: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
  },
  item: {
    padding: '12px 20px',
    fontSize: 14,
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    color: '#222',
  },
  sinResultados: {
    padding: '24px 20px',
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  footer: {
    padding: '12px 20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contador: {
    fontSize: 13,
    color: '#888',
  },
  botonCerrar: {
    padding: '8px 20px',
    backgroundColor: '#ff4500',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    cursor: 'pointer',
    fontWeight: 500,
  },
};

export default GaleriaEmergente;