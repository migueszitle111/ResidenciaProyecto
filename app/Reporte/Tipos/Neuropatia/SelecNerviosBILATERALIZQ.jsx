import React, { useState } from 'react';
import { NerviusButtonBILATERALIZQ } from '@/app/components/ReportTemplate/Conclusions/Botton-NerviusBILATERALIZQ';

export function checkDivsBILATERALIZQ(copyConclusions) {

  if (
    copyConclusions.includes('MEDIANO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL ESPACIO CUADRANGULAR', 'SUPRACLAVICULAR,',
      'DE AXILA,', 'DEL TERCIO MEDIAL DE BRAZO,', 'DEL TERCIO PROXIMAL DE ANTEBRAZO,', 'DEL TERCIO DISTAL DE BRAZO,', 'PRONADOR REDONDO,', 'DEL CARPO,',
      'LIGAMENTO STRUTHERS,', 'DEL CODO,', 'DE PALMA,', 'DE DEDOS II-III,']
      .some(term => copyConclusions.includes(term))) {
    return (
      <>
        <div style={{ position: 'absolute', top: '17.6%', left: '50.5%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.4%', left: '52.0%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.6%', left: '53.4%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.8%', left: '54.7%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari4' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '18.0%', left: '56.0%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari5' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '14.4%', left: '50.2%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari6' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '14.6%', left: '51.4%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari7' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '15.1%', left: '52.6%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari8' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '15.6%', left: '53.9%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari9' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '16.1%', left: '55.0%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari10' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '16.6%', left: '56.1%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari11' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.4%', left: '56.9%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari12' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>



        <div style={{ position: 'absolute', top: '18.2%', left: '57.2%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari13' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '18.9%', left: '58.1%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari14' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '19.5%', left: '58.9%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari15' title='/DE AXILA,' displayText=' ' />  </div>
        <div style={{ position: 'absolute', top: '20.2%', left: '59.6%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari16' title='/DE AXILA,' displayText=' ' />  </div>

        <div style={{ position: 'absolute', top: '21.1%', left: '60.25%', borderRadius: 100, }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '21.9%', left: '61.2%', borderRadius: 100, }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '22.6%', left: '61.9%', borderRadius: '50%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '23.4%', left: '62.5%', borderRadius: '50%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '24.2%', left: '63.1%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '25%', left: '63.4%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '25.8%', left: '63.8%', borderRadius: 100, }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '26.5%', left: '64.2%', borderRadius: 100, }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO DISTAL DE BRAZO,' displayText=' ' /></div>


        <div style={{ position: 'absolute', top: '27.2%', left: '64.5%', borderRadius: 100, }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO DISTAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '27.9%', left: '64.8%', borderRadius: 100, }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari26' title='/LIGAMENTO STRUTHERS,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '28.6%', left: '65.2%', borderRadius: '50%' }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari27' title='/LIGAMENTO STRUTHERS,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '29.4%', left: '65.5%', borderRadius: '50%' }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL CODO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '30.2%', left: '65.8%', borderRadius: '50%' }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>


        <div style={{ position: 'absolute', top: '30.9%', left: '66.2%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '31.7%', left: '66.6%', borderRadius: '50%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari31' title='/PRONADOR REDONDO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '32.4%', left: '66.7%', bosrderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari32' title='/PRONADOR REDONDO,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '33.1%', left: '67.1%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari33' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.8%', left: '67.3%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari34' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.1%', left: '67.1%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari35' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.5%', left: '67.5%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari36' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.3%', left: '67.9%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari37' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>


        <div style={{ position: 'absolute', top: '36.0%', left: '68.2%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari38' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.8%', left: '68.6%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari39' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.6%', left: '69.2%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari40' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.3%', left: '69.3%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari41' title='/DEL CARPO,' displayText=' ' /></div>



        <div style={{ position: 'absolute', top: '38.9%', left: '70.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari42' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '39.5%', left: '70.9%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari43' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '40.3%', left: '71.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari44' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.1%', left: '71.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari45' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.9%', left: '72.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari46' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '42.6%', left: '72.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari47' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '43.4%', left: '73.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari48' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '44.2%', left: '73.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari49' title='/DE DEDOS II-III,' displayText=' ' /> </div>
  

        <div style={{ position: 'absolute', top: '41.1%', left: '70.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari50' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.9%', left: '70.9%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari51' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '42.6%', left: '71.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari52' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '43.4%', left: '71.3%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari53' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '44.2%', left: '71.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari54' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '45.0%', left: '71.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari55' title='/DE DEDOS II-III,' displayText=' ' /> </div>


        <div style={{ position: 'absolute', top: '39.3%', left: '69.3%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari56' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '40.1%', left: '69.6%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari57' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.1%', left: '69.6%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari58' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.9%', left: '69.7%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari59' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '42.6%', left: '69.7%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari60' title='/DE DEDOS II-III,' displayText=' ' /> </div>

        <div style={{ position: 'absolute', top: '43.4%', left: '69.7%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari61' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '44.2%', left: '69.6%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari62' title='/DE DEDOS II-III,' displayText=' ' /> </div>



      </>);

  }
  /*<div style={{ position: 'absolute', top: '45.0%', left: '69.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari63' title='/DE DEDOS II-III,' displayText=' ' /> </div>
  */
  if (
    copyConclusions.includes('MEDIANO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL ESPACIO CUADRANGULAR', 'SUPRACLAVICULAR,',
      'DE AXILA,', 'DEL TERCIO MEDIAL DE BRAZO,', 'DEL TERCIO PROXIMAL DE ANTEBRAZO,', 'DEL TERCIO PROXIMAL DE BRAZO,', 'DEL TERCIO DISTAL DE BRAZO,', 'PRONADOR REDONDO,', 'DEL CARPO,',
      'LIGAMENTO STRUTHERS,', 'DEL CODO,', 'DE PALMA,', 'DE DEDOS II-III,'].some(term => copyConclusions.includes(term))) {
    return (
      <>
        <div style={{ position: 'absolute', top: '17.6%', left: '48.0%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.4%', left: '46.6%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.6%', left: '45.3%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.8%', left: '43.8%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari4' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '18.0%', left: '42.6%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari5' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '14.4%', left: '48.6%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari6' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '14.6%', left: '47.4%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari7' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '15.1%', left: '46.2%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari8' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '15.6%', left: '45.0%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari9' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '16.1%', left: '43.8%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari10' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '16.6%', left: '42.8%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari11' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '17.4%', left: '42.0%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari12' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>



        <div style={{ position: 'absolute', top: '18.2%', left: '41.4%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari13' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '18.9%', left: '40.5%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari14' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '19.5%', left: '39.7%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari15' title='/DE AXILA,' displayText=' ' />  </div>
        <div style={{ position: 'absolute', top: '20.2%', left: '38.9%', borderRadius: '50%' }}
          className={`.dont-print-Nerviusgrande`}> <NerviusButtonBILATERALIZQ value='cari16' title='/DE AXILA,' displayText=' ' />  </div>

        <div style={{ position: 'absolute', top: '21.1%', left: '38.0%', borderRadius: 100, }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '21.9%', left: '37.4%', borderRadius: 100, }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '22.6%', left: '36.7%', borderRadius: '50%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '23.4%', left: '36.1%', borderRadius: '50%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '24.2%', left: '35.5%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '25%', left: '35.1%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO MEDIAL DE BRAZO,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '25.8%', left: '34.8%', borderRadius: 100, }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '26.5%', left: '34.5%', borderRadius: 100, }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO DISTAL DE BRAZO,' displayText=' ' /></div>


        <div style={{ position: 'absolute', top: '27.2%', left: '34.2%', borderRadius: 100, }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO DISTAL DE BRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '27.9%', left: '33.8%', borderRadius: 100, }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari26' title='/LIGAMENTO STRUTHERS,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '28.6%', left: '33.6%', borderRadius: '50%' }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari27' title='/LIGAMENTO STRUTHERS,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '29.4%', left: '33.2%', borderRadius: '50%' }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL CODO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '30.2%', left: '32.8%', borderRadius: '50%' }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>


        <div style={{ position: 'absolute', top: '30.9%', left: '32.4%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '31.7%', left: '32.2%', borderRadius: '50%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari31' title='/PRONADOR REDONDO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '32.4%', left: '31.7%', bosrderRadius: '50%', }}
          className={`dont-print-Nervius`}  ><NerviusButtonBILATERALIZQ value='cari32' title='/PRONADOR REDONDO,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '33.1%', left: '31.4%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari33' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.8%', left: '31.1%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari34' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.5%', left: '30.8%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari35' title='/DEL TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.3%', left: '30.5%', borderRadius: '50%', }}
          className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari36' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>


        <div style={{ position: 'absolute', top: '36.0%', left: '30.1%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari37' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.8%', left: '29.6%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari38' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.6%', left: '29.2%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari39' title='/DEL TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.3%', left: '29.2%', }}
          className={`dont-print-Nervius`} ><NerviusButtonBILATERALIZQ value='cari40' title='/DEL CARPO,' displayText=' ' /></div>



        <div style={{ position: 'absolute', top: '38.9%', left: '28.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari41' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '39.5%', left: '27.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari42' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '40.3%', left: '27.2%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari43' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.1%', left: '26.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari44' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.9%', left: '26.3%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari45' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '42.6%', left: '25.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari46' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '43.4%', left: '25.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari47' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '44.2%', left: '25.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari48' title='/DE DEDOS II-III,' displayText=' ' /> </div>


        <div style={{ position: 'absolute', top: '41.1%', left: '28.2%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari49' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.9%', left: '27.9%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari50' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '42.6%', left: '27.5%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari51' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '43.4%', left: '27.2%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari52' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '44.2%', left: '27.0%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari53' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '45.0%', left: '26.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari54' title='/DE DEDOS II-III,' displayText=' ' /> </div>


        <div style={{ position: 'absolute', top: '39.3%', left: '29.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari55' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '40.1%', left: '28.9%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari56' title='/DEL CARPO,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.1%', left: '29.2%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari57' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '41.9%', left: '29.1%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari58' title='/DE PALMA,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '42.6%', left: '29.0%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari59' title='/DE DEDOS II-III,' displayText=' ' /> </div>

        <div style={{ position: 'absolute', top: '43.4%', left: '28.8%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari60' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '44.2%', left: '28.9%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari61' title='/DE DEDOS II-III,' displayText=' ' /> </div>
        <div style={{ position: 'absolute', top: '45.0%', left: '28.7%', }}
          className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari62' title='/DE DEDOS II-III,' displayText=' ' /> </div>


      </>);

  }

  if (copyConclusions.includes('INTEROSEO ANTERIOR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO MEDIO DEL ANTEBRAZO,', , 'DEL TERCIO DISTAL DEL ANTEBRAZO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '32.4%', left: '32.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.2%', left: '32.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.0%', left: '31.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.7%', left: '31.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.4%', left: '30.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.1%', left: '29.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.8%', left: '28.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.5%', left: '28.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
      </>);

  }
  if (copyConclusions.includes('INTEROSEO ANTERIOR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO MEDIO DEL ANTEBRAZO,', 'DEL TERCIO DISTAL DEL ANTEBRAZO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '32.4%', left: '66.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.2%', left: '66.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.0%', left: '67.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.7%', left: '67.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.4%', left: '68.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.1%', left: '69.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.8%', left: '69.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.5%', left: '70.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>



      </>);

  }

  if (copyConclusions.includes('ACCESORIO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TRIANGULO POSTERIOR DEL CUELLO,', 'DEL FORAMEN YUGULAR,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '14.5%', left: '47.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TRIANGULO POSTERIOR DEL CUELLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '14.0%', left: '48.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL FORAMEN YUGULAR,' displayText=' ' /></div>




      </>);
  }
  if (copyConclusions.includes('ACCESORIO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TRIANGULO POSTERIOR DEL CUELLO,', 'DEL FORAMEN YUGULAR,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '14.5%', left: '51.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TRIANGULO POSTERIOR DEL CUELLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '14.0%', left: '50.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL FORAMEN YUGULAR,' displayText=' ' /></div>
      </>);
  }

  if (copyConclusions.includes('AXILAR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL ESPACIO CUANDRANGULAR,', 'MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,', 'DE SU DIVICION TERMINAL,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '18.9%', left: '39.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.1%', left: '38.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL ESPACIO CUANDRANGULAR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.3%', left: '37.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '36.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '18.3%', left: '36.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DE SU DIVICION TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '17.5%', left: '36.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DE SU DIVICION TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '34.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DE SU DIVICION TERMINAL,' displayText=' ' /></div>
      </>);
  }
  if (copyConclusions.includes('AXILAR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL ESPACIO CUANDRANGULAR,', 'MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,', 'DE SU DIVICION TERMINAL,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '18.9%', left: '58.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.1%', left: '60.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL ESPACIO CUANDRANGULAR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.3%', left: '61.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '62.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/MEDIAL AL CUELLO QUIRURGICO DEL HUMERO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '18.3%', left: '62.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DE SU DIVICION TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '17.5%', left: '62.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DE SU DIVICION TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.0%', left: '64.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DE SU DIVICION TERMINAL,' displayText=' ' /></div>
      </>);
  }

  if (copyConclusions.includes('MUSCULOCUTÁNEO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['SUPRACLAVICULAR,', 'INFRACLAVICULAR,', 'DE AXILA,', 'DEL TERCIO PROXIMAL DE BRAZO,', 'DEL TERCIO DISTAL DEL BRAZO,', 'DEL CODO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '15.9%', left: '48.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.9%', left: '47.0%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.1%', left: '45.6%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.6%', left: '44.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.1%', left: '43.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.7%', left: '42.4%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.3%', left: '41.5%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.9%', left: '40.5%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.3%', left: '39.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/INFRACLAVICULAR,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '20.0%', left: '38.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari10' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.7%', left: '37.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari11' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '21.2%', left: '36.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari12' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '21.8%', left: '35.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari13' title='/DE AXILA,' displayText=' ' /></div>



      <div style={{ position: 'absolute', top: '22.6%', left: '35.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari14' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '23.3%', left: '34.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari15' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '24.1%', left: '34.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '24.8%', left: '34.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '25.5%', left: '33.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '26.3%', left: '33.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '27.1%', left: '32.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '27.8%', left: '32.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '28.6%', left: '31.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari22' title='/DEL CODO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '29.4%', left: '31.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari23' title='/DEL CODO,' displayText=' ' /></div>



      <div style={{ position: 'absolute', top: '30.2%', left: '31.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.0%', left: '30.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.8%', left: '30.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '32.6%', left: '30.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.4%', left: '30.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>

    </>);
  }

  if (copyConclusions.includes('MUSCULOCUTÁNEO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['SUPRACLAVICULAR,', 'INFRACLAVICULAR,', 'DE AXILA,', 'DEL TERCIO PROXIMAL DE BRAZO,', 'DEL TERCIO DISTAL DEL BRAZO,', 'DEL CODO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '15.9%', left: '50.6%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.9%', left: '52.0%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.1%', left: '53.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.6%', left: '54.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.1%', left: '55.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.7%', left: '56.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.3%', left: '57.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.9%', left: '58.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.3%', left: '59.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/INFRACLAVICULAR,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '20.0%', left: '60.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari10' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.7%', left: '61.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari11' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '21.2%', left: '62.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari12' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '21.8%', left: '62.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari13' title='/DE AXILA,' displayText=' ' /></div>



      <div style={{ position: 'absolute', top: '22.6%', left: '63.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari14' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '23.3%', left: '63.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari15' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '24.1%', left: '64.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '24.8%', left: '64.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '25.5%', left: '65.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '26.3%', left: '65.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '27.1%', left: '65.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '27.8%', left: '66.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '28.6%', left: '66.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari23' title='/DEL CODO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '29.4%', left: '67.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari24' title='/DEL CODO,' displayText=' ' /></div>



      <div style={{ position: 'absolute', top: '30.2%', left: '67.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.0%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.8%', left: '68.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '32.6%', left: '68.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.4%', left: '68.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>


    </>);

  }

  if (copyConclusions.includes('RADIAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['SUPRACLAVICULAR,', 'INMEDIATO A SU EMERGENCIA,', 'DE AXILA,', 'DEL TERCIO PROXIMAL DE BRAZO,', 'CANAL DE TORSION,',
      'DEL TERCIO DISTAL DEL BRAZO,', 'DEL CODO,', 'DEL TERCIO PROXIMAL DEL ANTEBRAZO,', 'DEL TERCIO MEDIO DEL ANTEBRAZO,',
      'DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL TERCIO MEDIO DEL ANTEBRAZO,',].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '14.5%', left: '50.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari1' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.2%', left: '50.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari2' title='/SUPRACLAVICULAR,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '15.0%', left: '52.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari3' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.5%', left: '53.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari4' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.9%', left: '54.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari5' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.5%', left: '55.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari6' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.9%', left: '56.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari7' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.4%', left: '57.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari8' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.9%', left: '58.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari9' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '18.3%', left: '59.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari10' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.9%', left: '60.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari11' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.4%', left: '61.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari12' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.0%', left: '62.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari13' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.6%', left: '63.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari14' title='/DE AXILA,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '21.3%', left: '64.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '22.0%', left: '64.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '22.8%', left: '65.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '23.6%', left: '65.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari18' title='/CANAL DE TORSION,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '24.5%', left: '65.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari19' title='/CANAL DE TORSION,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '25.3%', left: '65.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari20' title='/CANAL DE TORSION,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '26.1%', left: '65.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '26.9%', left: '65.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '27.8%', left: '65.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '28.6%', left: '66.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari24' title='/DEL CODO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '29.3%', left: '66.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL CODO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '29.9%', left: '67.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '30.7%', left: '67.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.5%', left: '67.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '30.7%', left: '66.6%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.5%', left: '66.6%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '32.3%', left: '68.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari31' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.0%', left: '68.5%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari32' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.7%', left: '69.0%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari33' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '34.5%', left: '69.4%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari34' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '35.3%', left: '69.9%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari35' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '36.1%', left: '70.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari36' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '32.3%', left: '66.6%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari37' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.1%', left: '66.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari38' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.9%', left: '66.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari39' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '34.7%', left: '66.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari40' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '35.5%', left: '66.7%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari41' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>

    </>);
  }
  if (copyConclusions.includes('RADIAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['SUPRACLAVICULAR,', 'INMEDIATO A SU EMERGENCIA,', 'DE AXILA,', 'DEL TERCIO PROXIMAL DE BRAZO,', 'CANAL DE TORSION,',
      'DEL TERCIO DISTAL DEL BRAZO,', 'DEL CODO,', 'DEL TERCIO PROXIMAL DEL ANTEBRAZO,', 'DEL TERCIO MEDIO DEL ANTEBRAZO,',
      'DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL TERCIO MEDIO DEL ANTEBRAZO,',].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '14.5%', left: '48.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari1' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.2%', left: '48.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari2' title='/SUPRACLAVICULAR,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '15.0%', left: '47.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari3' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.5%', left: '45.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari4' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.9%', left: '44.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari5' title='/SUPRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.5%', left: '43.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari6' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.9%', left: '41.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari7' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.4%', left: '40.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari8' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.9%', left: '39.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari9' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.3%', left: '38.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari10' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.9%', left: '37.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari11' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.4%', left: '36.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari12' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.0%', left: '35.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari13' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.6%', left: '34.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari14' title='/DE AXILA,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '21.3%', left: '34.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '22.0%', left: '34.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '22.8%', left: '33.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '23.6%', left: '33.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari18' title='/CANAL DE TORSION,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '24.5%', left: '33.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari19' title='/CANAL DE TORSION,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '25.3%', left: '33.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari20' title='/CANAL DE TORSION,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '26.1%', left: '33.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '26.9%', left: '32.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '27.8%', left: '32.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '28.6%', left: '32.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari24' title='/DEL CODO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '29.3%', left: '32.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL CODO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '29.9%', left: '31.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '30.7%', left: '31.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.5%', left: '30.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '30.7%', left: '32.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '31.5%', left: '32.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '32.3%', left: '30.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari31' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.0%', left: '30.0%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari32' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.7%', left: '29.5%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari33' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '34.5%', left: '29.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari34' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '35.3%', left: '28.9%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari35' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '36.1%', left: '28.5%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari36' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '32.3%', left: '32.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari37' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.1%', left: '32.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari38' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.9%', left: '32.4%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari39' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '34.7%', left: '32.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari40' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '35.5%', left: '32.0%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari41' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>


    </>);

  }


  if (copyConclusions.includes('RADIAL SUPERFICIAL BILATERAL CON PREDOMINIO DERECHO, FOCALIZADA A NIVEL') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL CARPO,', 'DEL DORSO DE LA MANO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '35.9%', left: '69.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.6%', left: '70.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.4%', left: '70.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.2%', left: '71.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.9%', left: '71.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.6%', left: '72.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.2%', left: '72.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.4%', left: '72.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.8%', left: '71.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.4%', left: '70.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '41.0%', left: '69.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
      </>);

  }
  if (copyConclusions.includes('RADIAL SUPERFICIAL BILATERAL CON PREDOMINIO IZQUIERDO, FOCALIZADA A NIVEL') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL CARPO,', 'DEL DORSO DE LA MANO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '35.9%', left: '29.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.6%', left: '28.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.4%', left: '28.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.2%', left: '27.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.9%', left: '26.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.6%', left: '26.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.2%', left: '25.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.4%', left: '26.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.8%', left: '27.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.4%', left: '28.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '41.0%', left: '28.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL DORSO DE LA MANO,' displayText=' ' /></div>
      </>);

  }

  if (copyConclusions.includes('INTEROSEO POSTERIOR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO PROXIMAL DEL ANTEBRAZO,', 'DEL TERCIO DISTAL DEL ANTEBRAZO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '30.2%', left: '67.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '31.0%', left: '67.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '31.8%', left: '66.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '32.6%', left: '66.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.4%', left: '66.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.2%', left: '66.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.0%', left: '66.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.8%', left: '67.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.2%', left: '68.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.5%', left: '69.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.0%', left: '70.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
      </>);

  }
  if (copyConclusions.includes('INTEROSEO POSTERIOR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO PROXIMAL DEL ANTEBRAZO,', 'DEL TERCIO DISTAL DEL ANTEBRAZO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '30.2%', left: '31.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '31.0%', left: '31.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '31.8%', left: '32.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '32.6%', left: '32.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '33.4%', left: '32.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.2%', left: '32.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO PROXIMAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.0%', left: '32.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.8%', left: '31.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.2%', left: '30.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.5%', left: '29.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.3%', left: '28.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
      </>);

  }
  if (copyConclusions.includes('DORSAL CUTANEO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO MEDIO DEL ANTEBRAZO,', 'DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL CARPO,', 'DE PALMA,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '34.2%', left: '64.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.0%', left: '65.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.8%', left: '65.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.6%', left: '66.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.4%', left: '67.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.2%', left: '67.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.0%', left: '68.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.8%', left: '68.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.6%', left: '69.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DE PALMA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '41.4%', left: '69.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DE PALMA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '42.2%', left: '69.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DE PALMA,' displayText=' ' /></div>
      </>);

  }

  if (copyConclusions.includes('DORSAL CUTANEO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO MEDIO DEL ANTEBRAZO,', 'DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL CARPO,', 'DE PALMA,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '34.2%', left: '33.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.0%', left: '33.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.8%', left: '32.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.6%', left: '32.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '37.4%', left: '31.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '38.2%', left: '31.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.0%', left: '30.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '39.8%', left: '30.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL CARPO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '40.6%', left: '29.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DE PALMA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '41.4%', left: '29.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DE PALMA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '42.2%', left: '29.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DE PALMA,' displayText=' ' /></div>


      </>);

  }


  if (copyConclusions.includes('SUPRAESCAPULAR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA', 'INMEDIATO A SU EMERGENCIA,', 'DE LA ESCOTADURA ESCAPULAR/LTS,', 'DE LA ESCOTADURA ESPINOGLENOIDEA/LTS,',
      'DE LA FOSA INFRAESCAPULAR,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '15.2%', left: '48.0%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '14.4%', left: '48.0%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.0%', left: '46.7%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '15.3%', left: '45.7%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari4' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.8%', left: '44.5%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari5' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '16.2%', left: '43.3%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari6' title='/DE LA ESCOTADURA ESCAPULAR/LTS,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.6%', left: '42.3%', borderRadius: 100, }}
        className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari7' title='/DE LA ESCOTADURA ESCAPULAR/LTS,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.1%', left: '41.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari8' title='/DE LA ESCOTADURA ESPINOGLENOIDEA/LTS,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '17.8%', left: '41.7%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DE LA ESCOTADURA ESPINOGLENOIDEA/LTS,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.5%', left: '42.5%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DE LA FOSA INFRAESCAPULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.3%', left: '43.0%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DE LA FOSA INFRAESCAPULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.1%', left: '43.5%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DE LA FOSA INFRAESCAPULAR,' displayText=' ' /></div>


    </>);
  }
  if (copyConclusions.includes('SUPRAESCAPULAR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA', 'INMEDIATO A SU EMERGENCIA,', 'DE LA ESCOTADURA ESCAPULAR/LTS,', 'DE LA ESCOTADURA ESPINOGLENOIDEA/LTS,',
      'DE LA FOSA INFRAESCAPULAR,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '15.2%', left: '50.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '14.4%', left: '50.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.0%', left: '51.6%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '15.3%', left: '52.7%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari4' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '15.8%', left: '53.9%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari5' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '16.2%', left: '55.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`}><NerviusButtonBILATERALIZQ value='cari6' title='/DE LA ESCOTADURA ESCAPULAR/LTS,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '16.6%', left: '56.3%', borderRadius: 100, }}
        className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari7' title='/DE LA ESCOTADURA ESCAPULAR/LTS,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.1%', left: '57.4%', borderRadius: 100, }}
        className={`dont-print-Nervius`}> <NerviusButtonBILATERALIZQ value='cari8' title='/DE LA ESCOTADURA ESPINOGLENOIDEA/LTS,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '17.8%', left: '56.7%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DE LA ESCOTADURA ESPINOGLENOIDEA/LTS,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.5%', left: '56.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DE LA FOSA INFRAESCAPULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.3%', left: '55.5%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DE LA FOSA INFRAESCAPULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.1%', left: '55.2%', borderRadius: 100, }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DE LA FOSA INFRAESCAPULAR,' displayText=' ' /></div>

    </>);
  }


  if (copyConclusions.includes('ULNAR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INFRACLAVICULAR,', 'DE AXILA,', 'DEL TERCIO PROXIMAL DEL BARZO,', 'DEL TERCIO MEDIAL DEL BRAZO,',
      'DEL TERCIO DISTAL DEL BRAZO,', 'DEL CODO/CANAL CUBITAL,', 'DEL TERCIO PROXIMAL DE ANTEBRAZO,', 'DEL TERCIO MEDIO DEL ANTEBRAZO,',
      'DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL CARPO/CANAL DE GUYON,', 'DE PALMA,', 'DE DEDOS IV-V,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '17.5%', left: '50.8%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.5%', left: '52.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.6%', left: '53.6%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.9%', left: '54.8%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.4%', left: '56.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.9%', left: '57.4%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DE AXILA,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '19.4%', left: '58.5%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.1%', left: '59.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.8%', left: '59.9%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO PROXIMAL DEL BRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '21.5%', left: '60.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '22.2%', left: '60.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '22.9%', left: '60.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO PROXIMAL DE BRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '23.6%', left: '61.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO MEDIAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '24.4%', left: '61.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL TERCIO MEDIAL DEL BRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '25.1%', left: '62.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '25.9%', left: '62.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '26.7%', left: '62.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '27.5%', left: '63.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '28.3%', left: '63.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL CODO/CANAL CUBITAL,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '29.1%', left: '63.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL CODO/CANAL CUBITAL,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '29.9%', left: '64.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '30.7%', left: '64.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '31.5%', left: '64.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '32.3%', left: '64.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.1%', left: '65.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '33.9%', left: '65.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '34.7%', left: '65.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.5%', left: '65.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.2%', left: '66.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '37.1%', left: '66.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.9%', left: '67.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '38.7%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL CARPO/CANAL DE GUYON,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '39.5%', left: '68.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DEL CARPO/CANAL DE GUYON,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.2%', left: '68.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.0%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.8%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari36' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.5%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari37' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.3%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari38' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.1%', left: '68.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari39' title='/DE DEDOS IV-V,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '41.8%', left: '69.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari40' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.5%', left: '69.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari41' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.3%', left: '69.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari42' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.1%', left: '69.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari43' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.9%', left: '69.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari44' title='/DE DEDOS IV-V,' displayText=' ' /> </div>


    </>);
  }
  if (copyConclusions.includes('ULNAR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INFRACLAVICULAR,', 'DE AXILA,', 'DEL TERCIO PROXIMAL DE BRAZO,', 'DEL TERCIO MEDIAL DEL BRAZO,',
      'DEL TERCIO DISTAL DEL BRAZO,', 'DEL CODO/CANAL CUBITAL,', 'DEL TERCIO PROXIMAL DE ANTEBRAZO,', 'DEL TERCIO MEDIO DEL ANTEBRAZO,',
      'DEL TERCIO DISTAL DEL ANTEBRAZO,', 'DEL CARPO/CANAL DE GUYON,', 'DE PALMA,', 'DE DEDOS IV-V,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '17.5%', left: '47.6%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.5%', left: '46.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.6%', left: '44.8%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '17.9%', left: '43.4%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/INFRACLAVICULAR,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.4%', left: '42.2%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '18.9%', left: '40.9%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '19.4%', left: '39.9%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.1%', left: '39.3%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DE AXILA,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '20.8%', left: '38.8%', borderRadius: '50%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO PROXIMAL DEL BARZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '21.5%', left: '38.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO PROXIMAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '22.2%', left: '37.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO PROXIMAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '22.9%', left: '37.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO PROXIMAL DEL BRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '23.6%', left: '37.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO MEDIAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '24.4%', left: '36.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL TERCIO MEDIAL DEL BRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '25.1%', left: '36.3%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO MEDIAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '25.9%', left: '35.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '26.7%', left: '35.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '27.5%', left: '35.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO DISTAL DEL BRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '28.3%', left: '35.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL CODO/CANAL CUBITAL,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '29.1%', left: '34.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL CODO/CANAL CUBITAL,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '29.9%', left: '34.4%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '30.7%', left: '34.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '31.5%', left: '34.0%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '32.3%', left: '33.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '33.1%', left: '33.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '33.9%', left: '33.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '34.7%', left: '32.9%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.5%', left: '32.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO MEDIO DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.2%', left: '32.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '37.1%', left: '31.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.9%', left: '31.2%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO DISTAL DEL ANTEBRAZO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '38.7%', left: '30.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL CARPO/CANAL DE GUYON,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '39.5%', left: '30.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL CARPO/CANAL DE GUYON,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.2%', left: '30.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.0%', left: '30.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.8%', left: '30.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.5%', left: '30.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari36' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.3%', left: '30.6%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari37' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.1%', left: '30.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari38' title='/DE DEDOS IV-V,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '41.8%', left: '29.5%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari40' title='/DE PALMA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.5%', left: '29.1%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari41' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.3%', left: '28.8%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari42' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.1%', left: '28.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari43' title='/DE DEDOS IV-V,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.9%', left: '28.7%', borderRadius: '50%', }}
        className={`dont-print-Nervius`} > <NerviusButtonBILATERALIZQ value='cari44' title='/DE DEDOS IV-V,' displayText=' ' /> </div>



    </>);
  }


  if (copyConclusions.includes('FRÉNICO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL PLEXO CERVICAL,', 'SUPRACLAVICULAR,', 'DEL TORAX,', 'DEL DIAFRAGMA,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '14.8%', left: '48.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL PLEXO CERVICAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '15.5%', left: '47.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL PLEXO CERVICAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '16.3%', left: '47.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '17.1%', left: '46.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '17.8%', left: '46.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '18.6%', left: '46.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '19.4%', left: '46.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '20.1%', left: '46.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '20.9%', left: '46.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '21.7%', left: '46.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL TORAX,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '22.6%', left: '46.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL DIAFRAGMA,' displayText=' ' /> </div>


      
    </>);
  }
  if (copyConclusions.includes('FRÉNICO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL PLEXO CERVICAL,', 'SUPRACLAVICULAR,', 'DEL TORAX,', 'DEL DIAFRAGMA,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '14.8%', left: '50.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL PLEXO CERVICAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '15.5%', left: '51.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL PLEXO CERVICAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '16.3%', left: '51.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '17.1%', left: '52.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '17.8%', left: '52.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/SUPRACLAVICULAR,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '18.6%', left: '52.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '19.4%', left: '52.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '20.1%', left: '52.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '20.9%', left: '52.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL TORAX,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '21.7%', left: '52.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL TORAX,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '22.6%', left: '52.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL DIAFRAGMA,' displayText=' ' /> </div>


    

    </>);
  }
  if (copyConclusions.includes('TORACODORSAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA DE AXILA,', 'TORACICO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '18.0%', left: '55.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '18.8%', left: '55.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.6%', left: '55.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '20.4%', left: '56.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/TORACICO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '21.2%', left: '56.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/TORACICO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '22.0%', left: '57.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/TORACICO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '22.8%', left: '57.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/TORACICO,' displayText=' ' /></div>



      </>);

  }
  if (copyConclusions.includes('TORACODORSAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA DE AXILA,', 'TORACICO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '18.0%', left: '43.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '18.8%', left: '43.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '19.6%', left: '42.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '20.4%', left: '42.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/TORACICO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '21.2%', left: '42.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/TORACICO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '22.0%', left: '41.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/TORACICO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '22.8%', left: '41.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/TORACICO,' displayText=' ' /></div>

      </>);

  }

  if (copyConclusions.includes('TORÁCICO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA DE AXILA,', 'TORACICO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '17.9%', left: '43.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '18.7%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '19.5%', left: '42.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '20.3%', left: '41.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/TORACICO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '21.0%', left: '41.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '21.8%', left: '41.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '22.6%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '23.4%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '24.2%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '25.0%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '25.8%', left: '41.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/TORACICO,' displayText=' ' /> </div>




    </>);
  }

  if (copyConclusions.includes('TORÁCICO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA DE AXILA,', 'TORACICO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '17.9%', left: '55.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '18.7%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '19.5%', left: '56.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA DE AXILA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '20.3%', left: '56.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/TORACICO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '21.0%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '21.8%', left: '57.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '22.6%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '23.4%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '24.2%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '25.0%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/TORACICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '25.8%', left: '57.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/TORACICO,' displayText=' ' /> </div>


    </>);
  }

  if (copyConclusions.includes('CIATICO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DE LA ESCOTADURA MAYOR DE LA PELVIS,', 'EMERGENCIA PIRAMIDAL,', 'DEL PLIEGUE GLUTEO,', 'DEL MUSLO TERCIO PROXIMAL,',
      'DEL MUSLO TERCIO PROXIMAL', 'DEL MUSLO TERCIO DISTAL,', 'DEL HUECO POPLIEO,',].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>


      <div style={{ position: 'absolute', top: '34.5%', left: '53.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.2%', left: '53.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.0%', left: '52.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.3%', left: '54.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.0%', left: '53.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.4%', left: '55.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.2%', left: '55.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/EMERGENCIA PIRAMIDAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '38.0%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari8' title='/EMERGENCIA PIRAMIDAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '38.8%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL PLIEGUE GLUTEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '39.6%', left: '56.3%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL PLIEGUE GLUTEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.4%', left: '56.5%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '41.2%', left: '56.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.0%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.7%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.5%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.3%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>


      <div style={{ position: 'absolute', top: '45.1%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '45.9%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.7%', left: '56.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.5%', left: '56.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '48.3%', left: '56.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '49.1%', left: '56.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.0%', left: '56.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.8%', left: '56.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.7%', left: '55.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.6%', left: '56.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.5%', left: '55.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.4%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.3%', left: '55.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.2%', left: '57.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.1%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>


      <div style={{ position: 'absolute', top: '54.0%', left: '57.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.9%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.8%', left: '58.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.7%', left: '56.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.6%', left: '58.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari36' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.5%', left: '56.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari37' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '56.4%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari38' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '56.3%', left: '56.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari39' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.2%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari40' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.1%', left: '56.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari41' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.8%', left: '57.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari42' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>


    </>);
  }
  if (copyConclusions.includes('CIATICO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DE LA ESCOTADURA MAYOR DE LA PELVIS,', 'EMERGENCIA PIRAMIDAL,', 'DEL PLIEGUE GLUTEO,', 'DEL MUSLO TERCIO PROXIMAL,',
      'DEL MUSLO TERCIO PROXIMAL', 'DEL MUSLO TERCIO DISTAL,', 'DEL HUECO POPLIEO,',].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>



      <div style={{ position: 'absolute', top: '34.5%', left: '44.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.2%', left: '45.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.0%', left: '45.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.3%', left: '44.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.0%', left: '44.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.4%', left: '43.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DE LA ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.2%', left: '43.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/EMERGENCIA PIRAMIDAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '38.0%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari8' title='/EMERGENCIA PIRAMIDAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '38.8%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL PLIEGUE GLUTEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '39.6%', left: '42.6%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL PLIEGUE GLUTEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.4%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`}  > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '41.2%', left: '42.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.0%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.7%', left: '41.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.5%', left: '41.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.3%', left: '41.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>


      <div style={{ position: 'absolute', top: '45.1%', left: '41.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '45.9%', left: '41.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.7%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.5%', left: '42.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '48.3%', left: '42.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '49.1%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.0%', left: '42.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.8%', left: '43.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.7%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.6%', left: '43.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.5%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.4%', left: '43.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.3%', left: '41.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.2%', left: '43.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.1%', left: '41.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>


      <div style={{ position: 'absolute', top: '54.0%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.9%', left: '41.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.8%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.7%', left: '40.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.6%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari36' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.5%', left: '40.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari37' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '56.4%', left: '42.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari38' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '56.3%', left: '40.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari39' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.2%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari40' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.1%', left: '39.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari41' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.8%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari42' title='/DEL HUECO POPLIEO,' displayText=' ' /> </div>


    </>);
  }

  if (copyConclusions.includes('GLUTEO INFERIOR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL FORAMEN MAYOR,', 'DEL PIRIFORME,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '34.0%', left: '52.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.7%', left: '52.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.2%', left: '52.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.8%', left: '53.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.6%', left: '53.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.4%', left: '53.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '36.2%', left: '54.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL PIRIFORME,' displayText=' ' /></div>


          


      </>);
  }
  if (copyConclusions.includes('GLUTEO INFERIOR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL FORAMEN MAYOR,', 'DEL PIRIFORME,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '34.0%', left: '45.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.7%', left: '46.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.2%', left: '46.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.8%', left: '45.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.6%', left: '45.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.4%', left: '44.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '36.2%', left: '44.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL PIRIFORME,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '36.8%', left: '43.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL PIRIFORME,' displayText=' ' /></div>

      </>);

  }

  if (copyConclusions.includes('GLUTEO SUPERIOR BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL FORAMEN MAYOR,', 'ATRAVES DEL PIRIFORME,', 'SU RAMA TERMINAL,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '34.0%', left: '45.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.7%', left: '46.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.5%', left: '44.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.0%', left: '43.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.3%', left: '42.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/ATRAVES DEL PIRIFORME,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.7%', left: '41.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/SU RAMA TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.5%', left: '40.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/SU RAMA TERMINAL,' displayText=' ' /></div>

      </>);

  }
  if (copyConclusions.includes('GLUTEO SUPERIOR BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'DEL FORAMEN MAYOR,', 'ATRAVES DEL PIRIFORME,', 'SU RAMA TERMINAL,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '34.0%', left: '53.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.7%', left: '53.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '34.5%', left: '54.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.0%', left: '55.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL FORAMEN MAYOR,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.3%', left: '56.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/ATRAVES DEL PIRIFORME,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '35.7%', left: '57.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/SU RAMA TERMINAL,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '36.5%', left: '58.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/SU RAMA TERMINAL,' displayText=' ' /></div>

      </>);

  }

  if (copyConclusions.includes('FEMORAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'ARRIBA DEL LIGAMENTO INGUINAL,', 'DEL LIGAMENTO INGUINAL,', 'DEBAJO DEL LIGAMENTO INGUINAL,',
      'DEL MUSLO TERCIO PROXIMAL,', 'DEL MUSLO TERCIO PROXIMAL', 'DEL MUSLO TERCIO DISTAL,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '33.0%', left: '54.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '33.7%', left: '55.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '34.4%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/ARRIBA DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '36.0%', left: '56.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/ARRIBA DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '36.8%', left: '56.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.6%', left: '57.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '38.4%', left: '57.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEBAJO DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '39.2%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEBAJO DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '40.0%', left: '58.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.8%', left: '58.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.6%', left: '58.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.4%', left: '58.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.2%', left: '58.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.0%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '44.8%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '45.6%', left: '58.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.4%', left: '58.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.2%', left: '58.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.0%', left: '57.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.8%', left: '57.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '48.6%', left: '57.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '48.0%', left: '59.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '45.5%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.2%', left: '56.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.9%', left: '55.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.7%', left: '54.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '48.5%', left: '54.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '49.3%', left: '53.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.1%', left: '53.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.9%', left: '53.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.7%', left: '53.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.5%', left: '53.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.3%', left: '53.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.0%', left: '54.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.8%', left: '54.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>



    </>);
  }
  if (copyConclusions.includes('FEMORAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['INMEDIATO A SU EMERGENCIA,', 'ARRIBA DEL LIGAMENTO INGUINAL,', 'DEL LIGAMENTO INGUINAL,', 'DEBAJO DEL LIGAMENTO INGUINAL,',
      'DEL MUSLO TERCIO PROXIMAL,', 'DEL MUSLO TERCIO PROXIMAL', 'DEL MUSLO TERCIO DISTAL,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '33.0%', left: '44.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '33.7%', left: '43.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/INMEDIATO A SU EMERGENCIA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '34.4%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/ARRIBA DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.0%', left: '41.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/ARRIBA DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '36.8%', left: '41.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.6%', left: '41.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '38.4%', left: '41.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEBAJO DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '39.2%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEBAJO DEL LIGAMENTO INGUINAL,' displayText=' ' /> </div>


      <div style={{ position: 'absolute', top: '40.0%', left: '40.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.8%', left: '40.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.6%', left: '40.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.4%', left: '40.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.2%', left: '40.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '44.0%', left: '40.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL MUSLO TERCIO PROXIMAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '44.8%', left: '41.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>



      <div style={{ position: 'absolute', top: '45.5%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.2%', left: '42.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '46.9%', left: '43.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '47.7%', left: '44.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '48.5%', left: '44.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL MUSLO TERCIO PROXIMAL' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '49.3%', left: '45.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.1%', left: '45.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.9%', left: '45.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.7%', left: '45.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.5%', left: '45.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.3%', left: '45.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.0%', left: '44.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.8%', left: '44.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL MUSLO TERCIO DISTAL,' displayText=' ' /> </div>




    </>);
  }

  if (copyConclusions.includes('SAFENO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO DISTAL DEL MUSLO,', 'DE RODILLA,', 'DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,', 'DEL TERCIO DISTAL DE LA PIERNA,',
      'DEL TOBILLO,', 'DEL DORSO DEL PIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '53.4%', left: '53.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '54.2%', left: '53.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '55.0%', left: '54.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '55.8%', left: '54.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '56.6%', left: '54.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '57.4%', left: '54.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '58.2%', left: '54.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.0%', left: '55.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.8%', left: '54.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.8%', left: '55.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '60.6%', left: '55.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '60.6%', left: '55.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '61.4%', left: '55.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '61.9%', left: '55.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari14' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '62.2%', left: '55.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '62.7%', left: '56.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '63.0%', left: '55.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '63.8%', left: '55.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '64.6%', left: '55.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '65.4%', left: '55.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '66.2%', left: '55.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.0%', left: '56.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.8%', left: '56.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '68.6%', left: '56.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari24' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '69.4%', left: '57.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '70.2%', left: '57.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari26' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.0%', left: '58.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari27' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.8%', left: '58.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '72.6%', left: '59.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL ANTEPIE,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '72.2%', left: '60.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari30' title='/DEL ANTEPIE,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '73.2%', left: '60.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari31' title='/DEL ANTEPIE,' displayText=' ' /></div>

      </>);
  }
  if (copyConclusions.includes('SAFENO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO DISTAL DEL MUSLO,', 'DE RODILLA,', 'DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,', 'DEL TERCIO DISTAL DE LA PIERNA,',
      'DEL TOBILLO,', 'DEL DORSO DEL PIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '53.4%', left: '45.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '54.2%', left: '44.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '55.0%', left: '44.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '55.8%', left: '44.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '56.6%', left: '43.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '57.4%', left: '43.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DE RODILLA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '58.2%', left: '43.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.0%', left: '43.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.8%', left: '42.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.8%', left: '43.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '60.6%', left: '42.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '60.6%', left: '43.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '61.4%', left: '43.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '61.9%', left: '42.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari14' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '62.2%', left: '43.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '62.7%', left: '42.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '63.0%', left: '43.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '63.8%', left: '43.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '64.6%', left: '43.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '65.4%', left: '42.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '66.2%', left: '42.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.0%', left: '42.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.8%', left: '42.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '68.6%', left: '41.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari24' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '69.4%', left: '41.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari25' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '70.2%', left: '41.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari26' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.0%', left: '40.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari27' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.8%', left: '40.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari28' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '72.6%', left: '39.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari29' title='/DEL ANTEPIE,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '72.2%', left: '39.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari30' title='/DEL ANTEPIE,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '73.2%', left: '38.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari31' title='/DEL ANTEPIE,' displayText=' ' /></div>

      </>);

  }

  if (copyConclusions.includes('OBTURADOR2 BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['PROXIMAL A CANAL OBTURADOR,', 'CANAL OBTURADOR,', 'MUSLO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '31.6%', left: '43.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '32.3%', left: '42.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '33.1%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '33.9%', left: '41.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '34.7%', left: '41.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.5%', left: '41.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.3%', left: '41.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.1%', left: '41.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.9%', left: '42.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '38.7%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '39.4%', left: '42.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.2%', left: '42.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/CANAL OBTURADOR,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '41.0%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.8%', left: '43.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.4%', left: '43.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.1%', left: '43.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/MUSLO,' displayText=' ' /> </div>

    </>);
  }

  if (copyConclusions.includes('OBTURADOR2 BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['PROXIMAL A CANAL OBTURADOR,', 'CANAL OBTURADOR,', 'MUSLO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '31.6%', left: '55.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '32.3%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '33.1%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '33.9%', left: '57.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '34.7%', left: '57.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '35.5%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.3%', left: '56.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.1%', left: '56.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.9%', left: '56.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/PROXIMAL A CANAL OBTURADOR,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '38.7%', left: '56.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '39.4%', left: '56.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/CANAL OBTURADOR,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '40.2%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/CANAL OBTURADOR,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '41.0%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '41.8%', left: '55.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '42.4%', left: '55.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '43.1%', left: '55.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/MUSLO,' displayText=' ' /> </div>

    </>);
  }

  if (copyConclusions.includes('PERONEO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL HUECO POPLITEO,', 'DE CABEZA DE PERONE,', 'DEL TERCIO PROXIMAL DE PIERNA,', , 'DEL TERCIO MEDIO DE PIERNA,',
      'DEL TERCIO DISTAL DE PIERNA,', 'DEL TOBILLO,', 'PIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '50.0%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.8%', left: '56.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.6%', left: '56.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.4%', left: '56.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.2%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.0%', left: '57.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '54.8%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='DE CABEZA DE PERONE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.6%', left: '58.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='DE CABEZA DE PERONE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '56.4%', left: '58.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='DE CABEZA DE PERONE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.2%', left: '59.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='DE CABEZA DE PERONE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '58.0%', left: '59.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '58.8%', left: '59.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '59.6%', left: '60.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '59.6%', left: '58.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '60.4%', left: '60.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '60.4%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '61.2%', left: '60.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '61.2%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '62.0%', left: '60.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.0%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '62.8%', left: '60.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.8%', left: '58.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '63.6%', left: '60.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '63.6%', left: '58.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '64.4%', left: '59.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '64.4%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '65.2%', left: '59.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '65.2%', left: '58.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.0%', left: '58.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.8%', left: '58.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.8%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '67.6%', left: '58.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '67.6%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '68.4%', left: '58.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '68.4%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '69.2%', left: '58.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari36' title='DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '69.2%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari37' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.0%', left: '58.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari38' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.8%', left: '58.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari39' title='DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.8%', left: '59.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari40' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.6%', left: '58.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari41' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.6%', left: '58.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari42' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.6%', left: '59.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari43' title='PIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.4%', left: '58.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari44' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.4%', left: '59.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari45' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.4%', left: '60.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari46' title='PIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '73.2%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari47' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.2%', left: '59.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari48' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.0%', left: '61.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari49' title='PIE,' displayText=' ' /> </div>
    </>);
  }

  if (copyConclusions.includes('PERONEO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL HUECO POPLITEO,', 'DE CABEZA DE PERONE,', 'DEL TERCIO PROXIMAL DE PIERNA,', , 'DEL TERCIO MEDIO DE PIERNA,',
      'DEL TERCIO DISTAL DE PIERNA,', 'DEL TOBILLO,', 'PIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '52.4%', left: '41.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.2%', left: '41.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.0%', left: '41.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '54.8%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.6%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='DE CABEZA DE PERONE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '56.4%', left: '40.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='DE CABEZA DE PERONE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.2%', left: '39.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='DE CUELLO DE PERONE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '58.0%', left: '39.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '58.8%', left: '39.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '59.6%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '59.6%', left: '38.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='DEL TERCIO PROXIMAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '60.4%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '60.4%', left: '38.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '61.2%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '61.2%', left: '38.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '62.0%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.0%', left: '38.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '62.8%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.8%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '63.6%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '63.6%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='DEL TERCIO MEDIO DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '64.4%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '64.4%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '65.2%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '65.2%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.0%', left: '39.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.8%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.8%', left: '40.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '67.6%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '67.6%', left: '40.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='DEL TERCIO DISTAL DE PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '68.4%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '68.4%', left: '40.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '69.2%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '69.2%', left: '40.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.0%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.8%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari36' title='DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.8%', left: '39.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari37' title='DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.6%', left: '40.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari38' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.6%', left: '39.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari39' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.6%', left: '38.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari40' title='PIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.4%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari41' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.4%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari42' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.4%', left: '37.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari43' title='PIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '73.2%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari44' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.2%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari45' title='PIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.0%', left: '36.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari46' title='PIE,' displayText=' ' /> </div>


    </>);
  }

  if (copyConclusions.includes('PERONEO SUPERFICIAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,', 'DEL TERCIO DISTAL DE LA PIERNA,', 'DEL TOBILLO,',
      'DEL DORSO DEL PIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '59.0%', left: '59.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.8%', left: '59.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '60.6%', left: '59.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '61.4%', left: '60.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '62.2%', left: '60.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '63.0%', left: '59.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '63.8%', left: '59.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '64.6%', left: '59.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '65.4%', left: '59.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '66.2%', left: '59.1%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.0%', left: '58.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.8%', left: '58.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '68.6%', left: '58.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '69.4%', left: '58.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari14' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '70.2%', left: '58.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari15' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.0%', left: '59.3%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.8%', left: '60.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL ANTEPIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '72.4%', left: '61.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari18' title='/DEL ANTEPIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '72.8%', left: '62.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari19' title='/DEL ANTEPIE,' displayText=' ' /></div>

      </>);
  }
  if (copyConclusions.includes('PERONEO SUPERFICIAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,', 'DEL TERCIO DISTAL DE LA PIERNA,', 'DEL TOBILLO,',
      'DEL DORSO DEL PIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (
      <>
        <div style={{ position: 'absolute', top: '59.0%', left: '38.9%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '59.8%', left: '38.7%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '60.6%', left: '38.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '61.4%', left: '38.5%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '62.2%', left: '38.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '63.0%', left: '38.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '63.8%', left: '38.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '64.6%', left: '39.0%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /></div>

        <div style={{ position: 'absolute', top: '65.4%', left: '39.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '66.2%', left: '39.6%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.0%', left: '39.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '67.8%', left: '40.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '68.6%', left: '40.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '69.4%', left: '40.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari14' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '70.2%', left: '39.8%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari15' title='/DEL TOBILLO,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.0%', left: '39.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari16' title='/DEL DORSO DEL PIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '71.8%', left: '38.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari17' title='/DEL ANTEPIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '72.4%', left: '37.4%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari18' title='/DEL ANTEPIE,' displayText=' ' /></div>
        <div style={{ position: 'absolute', top: '72.8%', left: '36.2%', borderRadius: 100, }}
          className={`.dont-print-Nerviusgrande`}><NerviusButtonBILATERALIZQ value='cari19' title='/DEL ANTEPIE,' displayText=' ' /></div>

      </>);

  }

  if (copyConclusions.includes('TIBIAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO DISTAL DEL MUSLO,', 'DEL HUECO POPLITEO,', 'DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,',
      'DEL TERCIO DISTAL DE LA PIERNA,', 'DEL TOBILLO,', 'DEL TARSO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '50.1%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.9%', left: '55.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.7%', left: '55.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.5%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.3%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.1%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.9%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.7%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '56.5%', left: '56.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.3%', left: '56.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '58.1%', left: '56.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '58.9%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '59.7%', left: '57.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '60.5%', left: '57.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '61.3%', left: '57.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.1%', left: '57.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.9%', left: '57.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '63.7%', left: '57.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '63.7%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '64.5%', left: '56.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '64.5%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '65.3%', left: '56.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '65.3%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.1%', left: '56.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.1%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.9%', left: '56.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.9%', left: '58.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '67.7%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '67.7%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '68.5%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '68.5%', left: '58.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '69.3%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '69.3%', left: '59.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.1%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.1%', left: '59.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.9%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari36' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.9%', left: '59.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari37' title='/DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.7%', left: '55.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari38' title='/DEL TARSO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.4%', left: '60.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari39' title='/DEL TARSO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.9%', left: '61.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari40' title='/DEL TARSO,' displayText=' ' /> </div>


    </>);
  }
  if (copyConclusions.includes('TIBIAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO DISTAL DEL MUSLO,', 'DEL HUECO POPLITEO,', 'DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,',
      'DEL TERCIO DISTAL DE LA PIERNA,', 'DEL TOBILLO,', 'DEL TARSO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '50.1%', left: '42.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '50.9%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '51.7%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '52.5%', left: '43.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '53.3%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.1%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO DISTAL DEL MUSLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '54.9%', left: '42.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '55.7%', left: '42.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '56.5%', left: '42.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '57.3%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL HUECO POPLITEO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '58.1%', left: '41.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '58.9%', left: '41.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '59.7%', left: '41.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '60.5%', left: '41.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '61.3%', left: '41.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.1%', left: '41.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.9%', left: '41.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '63.7%', left: '41.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '63.7%', left: '41.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '64.5%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari20' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '64.5%', left: '41.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari21' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>



      <div style={{ position: 'absolute', top: '65.3%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari22' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '65.3%', left: '42.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari23' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.1%', left: '40.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari24' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.1%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari25' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '66.9%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari26' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.9%', left: '42.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari27' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '67.7%', left: '40.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari28' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '67.7%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari29' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '68.5%', left: '39.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari30' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '68.5%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari31' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '69.3%', left: '39.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari32' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '69.3%', left: '43.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari33' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.1%', left: '39.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari34' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.1%', left: '43.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari35' title='/DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '70.9%', left: '38.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari36' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.9%', left: '43.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari37' title='/DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.7%', left: '37.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari38' title='/DEL TARSO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.6%', left: '42.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari39' title='/DEL TARSO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.9%', left: '36.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari40' title='/DEL TARSO,' displayText=' ' /> </div>
    </>);
  }

  if (copyConclusions.includes('SURAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,', 'DEL TERCIO DISTAL DE LA PIERNA,', 'DEL TOBILLO,',
      'DEL RETROPIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '59.7%', left: '57.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '60.6%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '61.5%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.4%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '63.3%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '64.2%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '65.1%', left: '57.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.0%', left: '57.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.9%', left: '58.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '67.8%', left: '58.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '68.7%', left: '58.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '69.6%', left: '59.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.5%', left: '59.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.2%', left: '60.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.7%', left: '61.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.5%', left: '61.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL ANTEPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.5%', left: '63.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.3%', left: '62.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL ANTEPIE,' displayText=' ' /> </div>

    </>);
  }
  if (copyConclusions.includes('SURAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TERCIO PROXIMAL DE LA PIERNA,', 'DEL TERCIO MEDIO DE LA PIERNA,', 'DEL TERCIO DISTAL DE LA PIERNA,', 'DEL TOBILLO,',
      'DEL RETROPIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '59.7%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '60.6%', left: '41.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '61.5%', left: '41.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL TERCIO PROXIMAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '62.4%', left: '41.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '63.3%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '64.2%', left: '40.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '65.1%', left: '40.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL TERCIO MEDIO DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.0%', left: '40.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '66.9%', left: '40.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '67.8%', left: '40.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '68.7%', left: '39.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL TERCIO DISTAL DE LA PIERNA,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '69.6%', left: '39.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '70.5%', left: '39.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/DEL TOBILLO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '71.2%', left: '38.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.7%', left: '37.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.5%', left: '35.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/DEL ANTEPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.5%', left: '36.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.3%', left: '36.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/DEL ANTEPIE,' displayText=' ' /> </div>


    </>);
  }

  if (copyConclusions.includes('PLANTAR LATERAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TOBILLO,', 'DEL RETROPIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '70.6%', left: '55.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.3%', left: '56.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.0%', left: '57.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.3%', left: '58.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.3%', left: '59.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.2%', left: '60.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.5%', left: '63.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.5%', left: '62.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.3%', left: '61.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL ANTEPIE,' displayText=' ' /> </div>


    </>);
  }
  if (copyConclusions.includes('PLANTAR LATERAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TOBILLO,', 'DEL RETROPIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '70.6%', left: '42.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.3%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.0%', left: '41.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.3%', left: '40.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.3%', left: '38.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.2%', left: '37.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.5%', left: '35.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.5%', left: '36.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.3%', left: '36.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL ANTEPIE,' displayText=' ' /> </div>

        

    </>);
  }

  if (copyConclusions.includes('PLANTAR MEDIAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TOBILLO,', 'DEL RETROPIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '70.6%', left: '55.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.5%', left: '56.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.3%', left: '56.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.6%', left: '58.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.9%', left: '59.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.5%', left: '60.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '74.2%', left: '61.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL ANTEPIE,' displayText=' ' /> </div>
    </>);
  }
  if (copyConclusions.includes('PLANTAR MEDIAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL TOBILLO,', 'DEL RETROPIE,', 'DEL ANTEPIE,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '70.6%', left: '42.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL TOBILLO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '71.5%', left: '42.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.3%', left: '42.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL RETROPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '72.6%', left: '40.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL RETROPIE,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '72.9%', left: '39.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '73.5%', left: '38.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL ANTEPIE,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '74.2%', left: '37.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL ANTEPIE,' displayText=' ' /> </div>

    </>);
  }

  if (copyConclusions.includes('PUDENDO BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL FORAMEN CIATICO,', 'DEL CANAL PUDENDO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '36.1%', left: '49.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DEL FORAMEN CIATICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.7%', left: '50.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/DEL FORAMEN CIATICO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '37.0%', left: '49.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/DEL FORAMEN CIATICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.9%', left: '49.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari' title='/DEL CANAL PUDENDO,' displayText=' ' /> </div>

    </>);
  }
  if (copyConclusions.includes('PUDENDO BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['DEL FORAMEN CIATICO,', 'DEL CANAL PUDENDO,'].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>

      <div style={{ position: 'absolute', top: '36.1%', left: '48.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DEL FORAMEN CIATICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '36.7%', left: '47.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DEL FORAMEN CIATICO,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '37.0%', left: '48.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DEL FORAMEN CIATICO,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '37.9%', left: '48.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DEL CANAL PUDENDO,' displayText=' ' /> </div>

    </>);
  }

  if (copyConclusions.includes('FACIAL BILATERAL CON PREDOMINIO IZQUIERDO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['RAMA TEMPOROFACIAL,', 'INTRAPETROSO,', 'DEL FORAMEN ESTILOMASTOIDEO,', 'RAMA CERVICOFACIAL,',].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '5.2%', left: '46.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/DE RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '5.9%', left: '45.7%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/DE RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '5.8%', left: '47.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/DE RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '5.8%', left: '47.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/DE RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '6.6%', left: '44.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/DE RAMA TEMPOROFACIAL,' displayText=' ' /> </div>



      <div style={{ position: 'absolute', top: '8.5%', left: '48.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/INTRAPETROSO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '8.5%', left: '47.1%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/INTRAPETROSO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '8.3%', left: '45.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/INTRAPETROSO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '8.6%', left: '44.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL FORAMEN ESTILOMASTOIDEO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '9.2%', left: '44.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL FORAMEN ESTILOMASTOIDEO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.0%', left: '44.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL FORAMEN ESTILOMASTOIDEO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.6%', left: '45.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '9.5%', left: '45.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.0%', left: '46.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.1%', left: '47.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '11.2%', left: '45.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/RAMA CERVICOFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '11.5%', left: '46.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/RAMA CERVICOFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '11.7%', left: '48.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari19' title='/RAMA CERVICOFACIAL,' displayText=' ' /> </div>

    </>);
  }
  if (copyConclusions.includes('FACIAL BILATERAL CON PREDOMINIO DERECHO') &&
    copyConclusions.includes('FOCALIZADA A NIVEL') &&
    ['RAMA TEMPOROFACIAL,', 'INTRAPETROSO,', 'DEL FORAMEN ESTILOMASTOIDEO,', 'RAMA CERVICOFACIAL,',].some(term => copyConclusions.includes(term))) {// FALTA VERIFICAR
    return (<>
      <div style={{ position: 'absolute', top: '5.2%', left: '52.2%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari1' title='/RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '5.9%', left: '53.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari2' title='/RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '5.8%', left: '51.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari3' title='/RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '5.8%', left: '51.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari4' title='/RAMA TEMPOROFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '6.6%', left: '53.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari5' title='/RAMA TEMPOROFACIAL,' displayText=' ' /> </div>

      <div style={{ position: 'absolute', top: '8.5%', left: '50.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari6' title='/INTRAPETROSO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '8.5%', left: '51.4%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari7' title='/INTRAPETROSO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '8.3%', left: '52.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari8' title='/INTRAPETROSO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '8.6%', left: '54.0%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari9' title='/DEL FORAMEN ESTILOMASTOIDEO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '9.2%', left: '54.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari10' title='/DEL FORAMEN ESTILOMASTOIDEO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.0%', left: '54.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari11' title='/DEL FORAMEN ESTILOMASTOIDEO,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.6%', left: '53.8%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari12' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>

      <div style={{ position: 'absolute', top: '9.5%', left: '53.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari13' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.0%', left: '52.5%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari14' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>
      <div style={{ position: 'absolute', top: '10.1%', left: '51.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari15' title='/RAMA CERVICOFACIAL,' displayText=' ' /></div>


      <div style={{ position: 'absolute', top: '11.2%', left: '52.9%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari16' title='/RAMA CERVICOFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '11.5%', left: '51.6%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari17' title='/RAMA CERVICOFACIAL,' displayText=' ' /> </div>
      <div style={{ position: 'absolute', top: '11.7%', left: '50.3%', }}
        className={`.dont-print-Nerviusgrande`} > <NerviusButtonBILATERALIZQ value='cari18' title='/RAMA CERVICOFACIAL,' displayText=' ' /> </div>

    </>);
  }


  // Segunda etapa

  // Si no se cumple ninguna condición
  return null;
}