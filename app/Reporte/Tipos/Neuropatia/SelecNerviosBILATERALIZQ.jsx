import React, { useState } from 'react';
import { NerviusButtonBILATERALIZQ } from '@/app/components/ReportTemplate/Conclusions/Botton-NerviusBILATERALIZQ';

export function checkDivsBILATERALIZQ(copyConclusions) {

  if ( copyConclusions.includes('AXILAR BILATERAL CON PREDOMINIO DERECHO') &&
  copyConclusions.includes('FOCALIZADA A NIVEL DEL ESPACIO CUADRANGULAR') ) {
    return (
      <>
        <div style={{ position: 'absolute', top: '18.9%', left: '58.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='INMEDIATO A SU EMERGENCIA,' displayText=' ' additionalInfo="INMEDIATO A SU EMERGENCIA," /></div>
        <div style={{ position: 'absolute', top: '19.1%', left: '60.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='DEL ESPACIO CUADRANGULAR prueba' displayText=' ' additionalInfo="Aquí se muestra más información cuando haces clic." /></div>
        <div style={{ position: 'absolute', top: '19.3%', left: '61.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' additionalInfo="Aquí se muestra más información cuando haces clic." /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '62.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' additionalInfo="Aquí se muestra más información cuando haces clic." /></div>
        <div style={{ position: 'absolute', top: '18.3%', left: '62.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='DE SU DIVICION TERMINAL,' displayText=' ' additionalInfo="Aquí se muestra más información cuando haces clic." /></div>
        <div style={{ position: 'absolute', top: '17.5%', left: '62.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='DE SU DIVICION TERMINAL,' displayText=' ' additionalInfo="Aquí se muestra más información cuando haces clic." /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '64.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='DE SU DIVICION TERMINAL,' displayText=' ' additionalInfo="Aquí se muestra más información cuando haces clic." /></div>
          </>);

  }

  if (copyConclusions.includes('AXILAR BILATERAL CON PREDOMINIO DERECHO, FOCALIZADA A NIVEL DEL ESPACIO CUADRANGULAR2, ')) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '18.9%', left: '58.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.1%', left: '60.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='DEL ESPACIO CUANDRANGULAR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.3%', left: '61.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '62.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '18.3%', left: '62.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari12' title='DE SU DIVICION TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '17.5%', left: '62.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari13' title='DE SU DIVICION TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '64.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari14' title='DE SU DIVICION TERMINAL,' displayText=' ' /></div>
      </>);




  }
  // Segunda etapa

  // Si no se cumple ninguna condición
  return null;
}