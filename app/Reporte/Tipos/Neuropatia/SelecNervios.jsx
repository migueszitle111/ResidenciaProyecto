
import { ReportContext } from '@/src/context';
import { useContext } from 'react';
import { NerviusButton } from '@/app/components/ReportTemplate/Conclusions/Botton-Nervius';

export function checkDivs(copyConclusions) {
  
  if (copyConclusions.includes('MEDIANO IZQUIERDA, FOCALIZADA') || copyConclusions.includes('MEDIANO IZQUIERDA, SEGMENTARIA') || copyConclusions.includes('MEDIANO IZQUIERDA, GENERALIZADA')) {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: '17.5%',
            left: '51.2%',
            width: '34px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(50deg)'// E // Cambia el color del círculo según lo desees

          }}
          className={`.dont-print-Nerviusgrande`}
        >
          <NerviusButton value='car' title='AXILAR,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '21.1%',
            left: '60.25%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20.8%',
            left: '53.9%',
            width: '34px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(70deg)'// E // Cambia el color del círculo según lo desees

          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO MEDIAL DE BRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '26.0%',
            left: '63.3%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO DISTAL DE BRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '27.45%',
            left: '64.3%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}>
          <NerviusButton value='car' title='LIGAMENTO STRUTHERS,' displayText=' ' />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '26.7%',
            left: '58.1%',
            width: '23px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(70deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '29.1%',
            left: '58.8%',
            width: '26px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(71deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '31.7%',
            left: '59.8%',
            width: '26px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(71deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '34.2%',
            left: '61.6%',
            width: '31px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '100%',
            transform: 'rotate(71deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='CARPO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '37.4%',
            left: '61.9%',
            width: '33px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '100%',
            transform: 'rotate(71deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='PALMA,' displayText=' ' />
        </div>
      </>
    );
  }
  if (copyConclusions.includes('MEDIANO DERECHA, FOCALIZADA,') || copyConclusions.includes('MEDIANO DERECHA, SEGMENTARIA,') || copyConclusions.includes('MEDIANO DERECHA, GENERALIZADA,')) {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: '17.5%',
            left: '42.9%',
            width: '34px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(310deg)'// E // Cambia el color del círculo según lo desees

          }}
          className={`.dont-print-Nerviusgrande`}
        >
          <NerviusButton value='car' title='AXILAR,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '21.1%',
            left: '36.9%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20.8%',
            left: '40.2%',
            width: '34px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(290deg)'// E // Cambia el color del círculo según lo desees

          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO MEDIAL DE BRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '26.0%',
            left: '34.2%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO DISTAL DE BRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '27.45%',
            left: '33.2%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='LIGAMENTO STRUTHERS,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '26.7%',
            left: '38.4%',
            width: '23px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(290deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '29.1%',
            left: '36.8%',
            width: '26px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(289deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '31.7%',
            left: '35.5%',
            width: '26px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '50%',
            transform: 'rotate(289deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '34.2%',
            left: '33.6%',
            width: '31px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '100%',
            transform: 'rotate(287deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='CARPO,' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '37.4%',
            left: '32.3%',
            width: '33px', // Ajusta el tamaño del círculo según lo necesites
            height: '100px', // Ajusta el tamaño del círculo según lo necesites
            borderRadius: '100%',
            transform: 'rotate(287deg)'// E // Cambia el color del círculo según lo desees
          }}
          className={`dont-print-Nervius`}
        >
          <NerviusButton value='car' title='PALMA,' displayText=' ' />
        </div>
      </>
    );

  }
  if (copyConclusions.includes('ACCESORIO IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('ACCESORIO IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('ACCESORIO IZQUIERDA, GENERALIZADA,')) {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: '14.0%',
            left: '49.9%',
            borderRadius: 100,

          }}
          className={`.dont-print-Nerviusgrande`}
        >
          <NerviusButton value='car' title='AXILAR,' displayText=' ' />
        </div>

      </>);

  }
  if (copyConclusions.includes('ACCESORIO DERECHA, FOCALIZADA,') || copyConclusions.includes('ACCESORIO DERECHA, SEGMENTARIA,') || copyConclusions.includes('ACCESORIO DERECHA, GENERALIZADA,')) {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: '14.0%',
            left: '46.9%',
            borderRadius: 100,

          }}
          className={`.dont-print-Nerviusgrande`}
        >
          <NerviusButton value='car' title='AXILAR,' displayText=' ' />
        </div>

      </>);

  }
  if (copyConclusions.includes('MUSCULOCUTÁNEO IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('MUSCULOCUTÁNEO IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('MUSCULOCUTÁNEO IZQUIERDA, GENERALIZADA,')) {
    return (<>
      <div
        style={{
          position: 'absolute',
          top: '16.8%',
          left: '50.0%',
          width: '39px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(45deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='APROXIMAL A SU EMERGENCIA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '18.9%',
          left: '53.7%',
          width: '33px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(55deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '21.2%',
          left: '55.3%',
          width: '36px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(67deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '24.6%',
          left: '57.2%',
          width: '42px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(70deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28.3%',
          left: '58.9%',
          width: '42px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(76deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' />
      </div>
    </>);

  }
  if (copyConclusions.includes('MUSCULOCUTÁNEO DERECHA, FOCALIZADA,') || copyConclusions.includes('MUSCULOCUTÁNEO DERECHA, SEGMENTARIA,') || copyConclusions.includes('MUSCULOCUTÁNEO DERECHA, GENERALIZADA,')) {
    return (<>
      <div
        style={{
          position: 'absolute',
          top: '16.8%',
          left: '43.0%',
          width: '39px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(320deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='APROXIMAL A SU EMERGENCIA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '18.9%',
          left: '40.7%',
          width: '33px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(307deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '21.2%',
          left: '38.3%',
          width: '36px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(296deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '24.5%',
          left: '35.7%',
          width: '42px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(290deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28.2%',
          left: '33.9%',
          width: '42px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(285deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' />
      </div>
    </>);

  }
  if (copyConclusions.includes('RADIAL DERECHA, FOCALIZADA,') || copyConclusions.includes('RADIAL DERECHA, SEGMENTARIA,') || copyConclusions.includes('RADIAL DERECHA, GENERALIZADA,')) {
    return (<>

      <div
        style={{
          position: 'absolute',
          top: '17.9%',
          left: '39.5%',
          width: '36px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(315deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='AXILA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '19.2%',
          left: '38.3%',
          width: '32px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(290deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '21.0%',
          left: '37.7%',
          width: '32px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CANAL DE TORSION,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '23.8%',
          left: '38.0%',
          width: '23px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CODO,' displayText=' ' />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '27.0%',
          left: '34.9%',
          width: '29.5px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(285deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30.7%',
          left: '31.9%',
          borderRadius: 100,
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30.8%',
          left: '32.5%',
          width: '47px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(285deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR,' displayText=' ' />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '30.0%',
          left: '35.9%',
          width: '47px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(275deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA,' displayText=' ' />
      </div>
    </>);

  }
  if (copyConclusions.includes('RADIAL IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('RADIAL IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('RADIAL IZQUIERDA, GENERALIZADA,')) {
    return (<>

      <div
        style={{
          position: 'absolute',
          top: '17.9%',
          left: '54.5%',
          width: '36px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(45deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='AXILA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '19.2%',
          left: '56.3%',
          width: '32px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(70deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '21.0%',
          left: '56.7%',
          width: '32px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(90deg)'

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CANAL DE TORSION,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '23.8%',
          left: '58.0%',
          width: '23px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(90deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CODO,' displayText=' ' />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '27.0%',
          left: '60.1%',
          width: '29.5px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(75deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30.7%',
          left: '65.4%',
          borderRadius: 100,
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30.8%',
          left: '59.5%',
          width: '47px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(75deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR,' displayText=' ' />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '30.0%',
          left: '55.9%',
          width: '47px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(85deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('SUPRAESCAPULAR IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('SUPRAESCAPULAR IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('SUPRAESCAPULAR IZQUIERDA, GENERALIZADA,')) {
    return (<>
      <div
        style={{
          position: 'absolute',
          top: '15.3%',
          left: '52.2%',
          borderRadius: 100,
          width: '23px',
          transform: 'rotate(40deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='INMEDIATO A SU EMERGENCIA, RAMA SUPRAESPINOSO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '16.3%',
          left: '55.5%',
          borderRadius: 100,
          width: '23px',
          transform: 'rotate(40deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='LIGAMENTO TRASVERSO, RAMA SUPRAESPINOSO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '18.8%',
          left: '53.7%',
          borderRadius: 100,
          width: '31px',
          transform: 'rotate(300deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='FOSA ESPINOGLENOIDEA, RAMA INFRAESPINOSO,' displayText=' ' />
      </div>

    </>);
  }
  if (copyConclusions.includes('SUPRAESCAPULAR DERECHA, FOCALIZADA,') || copyConclusions.includes('SUPRAESCAPULAR DERECHA, SEGMENTARIA,') || copyConclusions.includes('SUPRAESCAPULAR DERECHA, GENERALIZADA,')) {
    return (<>
      <div
        style={{
          position: 'absolute',
          top: '15.3%',
          left: '43.8%',
          borderRadius: 100,
          width: '23px',
          transform: 'rotate(330deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='INMEDIATO A SU EMERGENCIA, RAMA SUPRAESPINOSO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '16.3%',
          left: '40.5%',
          borderRadius: 100,
          width: '23px',
          transform: 'rotate(330deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='LIGAMENTO TRASVERSO, RAMA SUPRAESPINOSO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '18.8%',
          left: '40.5%',
          borderRadius: 100,
          width: '31px',
          transform: 'rotate(60deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='FOSA ESPINOGLENOIDEA, RAMA INFRAESPINOSO,' displayText=' ' />
      </div>

    </>);
  }
  if (copyConclusions.includes('ULNAR DERECHA, FOCALIZADA,') || copyConclusions.includes('ULNAR DERECHA, SEGMENTARIA,') || copyConclusions.includes('ULNAR DERECHA, GENERALIZADA,')) {
    return (<>
      <div
        style={{
          position: 'absolute',
          top: '18.4%',
          left: '42.9%',
          width: '27px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(310deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='AXILAR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '22.1%',
          left: '36.9%',
          width: '20px',
          borderRadius: '50%',
          transform: 'rotate(290deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '21.2%',
          left: '42.2%',
          width: '19px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(290deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '26.1%',
          left: '34.6%',
          borderRadius: 100,
          width: '24px',
          transform: 'rotate(290deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28.2%',
          left: '33.9%',
          borderRadius: 100,
          width: '18px',
          transform: 'rotate(290deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CODO/CANAL CUBITAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '29.9%',
          left: '33.4%',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28.9%',
          left: '38.5%',
          width: '26px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(285deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '31.9%',
          left: '37.5%',
          width: '28px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(289deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '34.6%',
          left: '35.6%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '100%',
          transform: 'rotate(290deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CARPO/CANAL DE GUYON,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '37.8%',
          left: '33.2%',
          width: '55px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '100%',
          transform: 'rotate(275deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='PALMA,' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('ULNAR IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('ULNAR IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('ULNAR IZQUIERDA, GENERALIZADA,')) {
    return (<>
      <div
        style={{
          position: 'absolute',
          top: '18.4%',
          left: '52.4%',
          width: '27px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(50deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='AXILAR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '22.1%',
          left: '59.9%',
          width: '20px',
          borderRadius: '50%',
          transform: 'rotate(55deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '21.2%',
          left: '54.7%',
          width: '19px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(70deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '26.1%',
          left: '61.6%',
          borderRadius: 100,
          width: '24px',
          transform: 'rotate(75deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE BRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28.2%',
          left: '62.9%',
          borderRadius: 100,
          width: '18px',
          transform: 'rotate(70deg)'
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CODO/CANAL CUBITAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '29.9%',
          left: '63.4%',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE ANTEBRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28.9%',
          left: '56.5%',
          width: '26px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(75deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO MEDIAL DE ANTEBRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '31.9%',
          left: '57.8%',
          width: '28px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(70deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE ANTEBRAZO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '34.6%',
          left: '59.6%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '100%',
          transform: 'rotate(70deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='CARPO/CANAL DE GUYON,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '37.8%',
          left: '58.2%',
          width: '55px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '100%',
          transform: 'rotate(85deg)'// E // Cambia el color del círculo según lo desees
        }}
        className={`dont-print-Nervius`}
      >
        <NerviusButton value='car' title='PALMA,' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('FRÉNICO IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('FRÉNICO IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('FRÉNICO IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '10.8%',
          left: '57.8%',
          width: '10px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PLEXO CERVICAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '12.4%',
          left: '43.8%',
          width: '21px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(90deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='SUPRACLAVICULAR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '15.3%',
          left: '42.8%',
          width: '37px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(90deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TORAX,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '18.1%',
          left: '57.8%',
          width: '15px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='DIAFRAGMA,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('FRÉNICO DERECHA, FOCALIZADA,') || copyConclusions.includes('FRÉNICO DERECHA, SEGMENTARIA,') || copyConclusions.includes('FRÉNICO DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '10.8%',
          left: '53.8%',
          width: '10px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PLEXO CERVICAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '12.4%',
          left: '52.8%',
          width: '21px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='SUPRACLAVICULAR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '15.3%',
          left: '50.8%',
          width: '37px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TORAX,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '18.1%',
          left: '52.8%',
          width: '15px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(270deg)'// E // Cambia el color del círculo según lo desees

        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='DIAFRAGMA,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TORACODORSAL IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('TORACODORSAL IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('TORACODORSAL IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '17.9%',
          left: '54.8%',
          width: '10px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='FOSA SUPRACLAVICULAR,' displayText=' ' />
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '19.5%',
          left: '55.8%',
          width: '15px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PECTORAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '15.7%',
          left: '62.2%',
          width: '25px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(247deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TORAX,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TORACODORSAL DERECHA, FOCALIZADA,') || copyConclusions.includes('TORACODORSAL DERECHA, SEGMENTARIA,') || copyConclusions.includes('TORACODORSAL DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '17.9%',
          left: '42.8%',
          width: '10px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='FOSA SUPRACLAVICULAR,' displayText=' ' />
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '19.5%',
          left: '41.8%',
          width: '15px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PECTORAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '15.7%',
          left: '33.2%',
          width: '25px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(112deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TORAX,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('CIATICO DERECHA, FOCALIZADA,') || copyConclusions.includes('CIATICO DERECHA, SEGMENTARIA,') || copyConclusions.includes('CIATICO DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '30.6%',
          left: '34.5%',
          width: '32px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(100deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30.3%',
          left: '38.3%',
          width: '20px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(100deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '33.8%',
          left: '34.3%',
          width: '31px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(100deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='EMERGENCIA PIRAMIDAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '37.8%',
          left: '32.5%',
          width: '41px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO PROXIMAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '41.5%',
          left: '32.9%',
          width: '31px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO MEDIO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '46.2%',
          left: '31.9%',
          width: '53px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(87deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO DISTAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50.9%',
          left: '32.8%',
          width: '45px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='HUECO POPLIEO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50.9%',
          left: '30.5%',
          width: '40px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='HUECO POPLIEO,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('CIATICO IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('CIATICO IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('CIATICO IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '30.6%',
          left: '59.5%',
          width: '32px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(260deg)'//280
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30.3%',
          left: '57.7%',
          width: '20px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(260deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='ESCOTADURA MAYOR DE LA PELVIS,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '33.8%',
          left: '60.3%',
          width: '31px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(260deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='EMERGENCIA PIRAMIDAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '37.8%',
          left: '60.5%',
          width: '41px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO PROXIMAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '41.5%',
          left: '61.9%',
          width: '31px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO MEDIO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '46.2%',
          left: '59.9%',
          width: '53px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(272deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO DISTAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50.9%',
          left: '59.8%',
          width: '45px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(270deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='HUECO POPLIEO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50.9%',
          left: '62.8%',
          width: '40px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(270deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='HUECO POPLIEO,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('FEMORAL DERECHA, FOCALIZADA,') || copyConclusions.includes('FEMORAL DERECHA, SEGMENTARIA,') || copyConclusions.includes('FEMORAL DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '28.5%',
          left: '34.5%',
          width: '38px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(60deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PROXIMAL A LIGAMENTO INGUINAL,' displayText=' ' />
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '32.7%',
          left: '32.4%',
          width: '35px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(100deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='LIGAMENTO INGUINAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '38.1%',
          left: '31.3%',
          width: '51px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(85deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO PROXIMAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '41.8%',
          left: '31.2%',
          width: '40px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO MEDIO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '44.5%',
          left: '35.8%',
          width: '33px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(62deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO MEDIO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '47.0%',
          left: '34.5%',
          width: '54px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(87deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO DISTAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '45.1%',
          left: '32.5%',
          width: '20px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO DISTAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '54.3%',
          left: '29.5%',
          width: '105px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(96deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='SAFENO,' displayText=' ' />
      </div>
      
    </>);
  }
  if (copyConclusions.includes('FEMORAL IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('FEMORAL IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('FEMORAL IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '28.5%',
          left: '59.5%',
          width: '38px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(250deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PROXIMAL A LIGAMENTO INGUINAL,' displayText=' ' />
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '32.7%',
          left: '61.4%',
          width: '35px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(260deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='LIGAMENTO INGUINAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '38.1%',
          left: '61.0%',
          width: '51px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(275deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO PROXIMAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '41.8%',
          left: '62.2%',
          width: '40px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO MEDIO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '44.5%',
          left: '58.5%',
          width: '33px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(300deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO MEDIO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '47.0%',
          left: '57.1%',
          width: '54px',// Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%',
          transform: 'rotate(275deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO DISTAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '45.1%',
          left: '51.5%',
          width: '20px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO TERCIO DISTAL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '54.3%',
          left: '53.5%',
          width: '105px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='SAFENO,' displayText=' ' />
      </div>
      
    </>);
  }
  if (copyConclusions.includes('OBTURADOR IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('OBTURADOR IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('OBTURADOR IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '29.6%',
          left: '58.6%',
          width: '62px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PROXIMAL A CANAL OBTURADOR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '34.9%',
          left: '60.8%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(275deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='CANAL OBTURADOR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '37.9%',
          left: '60.8%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(275deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO,' displayText=' ' />
      </div>
    
    </>);
  }
  if (copyConclusions.includes('OBTURADOR DERECHA, FOCALIZADA,') || copyConclusions.includes('OBTURADOR DERECHA, SEGMENTARIA,') || copyConclusions.includes('OBTURADOR DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '29.6%',
          left: '30.6%',
          width: '62px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PROXIMAL A CANAL OBTURADOR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '34.9%',
          left: '33.8%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(85deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='CANAL OBTURADOR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '37.9%',
          left: '34.8%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(85deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MUSLO,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('PERONEO IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('PERONEO IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('PERONEO IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '47.4%',
          left: '31.6%',
          width: '44px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='BIFURCACION EN HUECO POPLITEO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '49.8%',
          left: '32.5%',
          width: '25px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(110deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='CABEZA DE PERONE,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '53.6%',
          left: '30.8%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '57.2%',
          left: '30.6%',
          width: '34px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIO DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '61.5%',
          left: '30.6%',
          width: '45px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(85deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '63.3%',
          left: '32.5%',
          width: '27px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(110deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TOBILLO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.8%',
          left: '30.9%',
          width: '40px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(135deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PIE,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('PERONEO DERECHA, FOCALIZADA,') || copyConclusions.includes('PERONEO DERECHA, SEGMENTARIA,') || copyConclusions.includes('PERONEO DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '47.4%',
          left: '31.6%',
          width: '44px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='BIFURCACION EN HUECO POPLITEO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '49.8%',
          left: '32.5%',
          width: '25px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(110deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='CABEZA DE PERONE,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '53.6%',
          left: '30.8%',
          width: '30px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '57.2%',
          left: '30.6%',
          width: '34px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIO DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '61.5%',
          left: '30.6%',
          width: '45px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(85deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '63.3%',
          left: '32.5%',
          width: '27px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(110deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TOBILLO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.8%',
          left: '30.9%',
          width: '40px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(135deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='PIE,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TIBIAL DERECHA, FOCALIZADA,') || copyConclusions.includes('TIBIAL DERECHA, SEGMENTARIA,') || copyConclusions.includes('TIBIAL DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '48.1%',
          left: '31.6%',
          width: '65px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='BIFURCACION EN HUECO POPLITEO,' displayText=' ' />
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '53.2%',
          left: '32.8%',
          width: '37px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '57.1%',
          left: '32.4%',
          width: '33px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(90deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIO DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '61.1%',
          left: '30.0%',
          width: '54px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(95deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '62.3%',
          left: '33.9%',
          width: '40px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(87deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.7%',
          left: '31.9%',
          width: '24px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(100deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TOBILLO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.4%',
          left: '35.1%',
          width: '20px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(100deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TOBILLO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '65.9%',
          left: '34.5%',
          width: '23px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(110deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TUNEL DEL TARSO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.4%',
          left: '31.2%',
          width: '25px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(135deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TUNEL DEL TARSO,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TIBIAL IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('TIBIAL IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('TIBIAL IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '48.1%',
          left: '58.6%',
          width: '65px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='BIFURCACION EN HUECO POPLITEO,' displayText=' ' />
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '53.2%',
          left: '60.8%',
          width: '37px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO PROXIMAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '57.1%',
          left: '62.4%',
          width: '33px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(270deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO MEDIO DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '61.1%',
          left: '61.2%',
          width: '54px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(265deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '62.3%',
          left: '59.5%',
          width: '40px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(275deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TERCIO DISTAL DE PIERNA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.7%',
          left: '64.9%',
          width: '24px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(260deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TOBILLO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.4%',
          left: '61.1%',
          width: '20px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(260deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TOBILLO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '65.9%',
          left: '66.8%',
          width: '23px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(250deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TUNEL DEL TARSO,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '64.4%',
          left: '59.8%',
          width: '25px', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
          transform: 'rotate(225deg)'
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='TUNEL DEL TARSO,' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('PUDENDO IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('PUDENDO IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('PUDENDO IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '35.1%',
          left: '47.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='FORAMEN SACROL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '36.7%',
          left: '47.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='LIG. SACROESPINOSO/CANAL PUDENDO,' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('PUDENDO DERECHA, FOCALIZADA,') || copyConclusions.includes('PUDENDO DERECHA, SEGMENTARIA,') || copyConclusions.includes('PUDENDO DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '35.1%',
          left: '49.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='FORAMEN SACROL,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '36.7%',
          left: '50.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='LIG. SACROESPINOSO/CANAL PUDENDO,' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('FACIAL IZQUIERDA, FOCALIZADA,') || copyConclusions.includes('FACIAL IZQUIERDA, SEGMENTARIA,') || copyConclusions.includes('FACIAL IZQUIERDA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '7.7%',
          left: '53.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='DISTAL A FOSA ESTILOMASTOIDEA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '9.35%',
          left: '53.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MALAR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10.9%',
          left: '52.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MADICULAR,' displayText=' ' />
      </div>

    </>);
  }
  if (copyConclusions.includes('FACIAL DERECHA, FOCALIZADA,') || copyConclusions.includes('FACIAL DERECHA, SEGMENTARIA,') || copyConclusions.includes('FACIAL DERECHA, GENERALIZADA,')) {
    return (<>
    <div
        style={{
          position: 'absolute',
          top: '7.7%',
          left: '43.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='DISTAL A FOSA ESTILOMASTOIDEA,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '9.35%',
          left: '43.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MALAR,' displayText=' ' />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10.9%',
          left: '44.6%', // Ajusta el tamaño del círculo según lo necesites
          height: '100px', // Ajusta el tamaño del círculo según lo necesites
          borderRadius: '50%', 
        }}
        className={`.dont-print-Nerviusgrande`}
      >
        <NerviusButton value='car' title='MADICULAR,' displayText=' ' />
      </div>

    </>);
  }
  else {
    
    return null;
  }


}// aqui   FRÉNICO IZQUIERDA, FOCALIZADA,