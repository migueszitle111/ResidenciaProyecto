
import { NerviusButton } from '@/app/components/ReportTemplate/Conclusions/Botton-Nervius';

export function checkDivs(copyConclusions) {
  /* IZQUIERDO >   MEDIANO        FOCALIZADA A NIVEL DE SEMENTARIA, GENERALIZADA */
  if (copyConclusions.includes('MEDIANO IZQUIERDO, FOCALIZADA A NIVEL DE') || copyConclusions.includes('MEDIANO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('MEDIANO IZQUIERDO, GENERALIZADA,')) {
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
          <NerviusButton value='car' title='(AXILAR),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO MEDIAL DE BRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO DISTAL DE BRAZO),' displayText=' ' />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '27.45%',
            left: '64.3%',
            borderRadius: 100,
          }}
          className={`dont-print-Nervius`}>
          <NerviusButton value='car' title='(LIGAMENTO STRUTHERS),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO DISTAL DE ANTEBRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(CARPO),' displayText=' ' />
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
          <NerviusButton value='car' title='(PALMA),' displayText=' ' />
        </div>
      </>
    );
  }
  /* DEROCHO >  MEDIANO        FOCALIZADA A NIVEL DE SEMENTARIA, GENERALIZADA */
  if (copyConclusions.includes('MEDIANO DERECHO, FOCALIZADA A NIVEL DE') || copyConclusions.includes('MEDIANO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('MEDIANO DEROCHO, GENERALIZADA,')) {
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
          <NerviusButton value='car' title='(AXILAR),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO MEDIAL DE BRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO DISTAL DE BRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(LIGAMENTO STRUTHERS),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO),' displayText=' ' />
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
          <NerviusButton value='car' title='(TERCIO DISTAL DE ANTEBRAZO),' displayText=' ' />
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
  /* IZQUIERDO >  ACCESORIO        FOCALIZADA A NIVEL DE SEMENTARIA, GENERALIZADA */
  if (copyConclusions.includes('ACCESORIO IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('ACCESORIO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('ACCESORIO IZQUIERDO, GENERALIZADA,')) {
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
          <NerviusButton value='car' title='(AXILAR),' displayText=' ' />
        </div>

      </>);

  }
  /* DEROCHO >  ACCESORIO        FOCALIZADA A NIVEL DE SEMENTARIA, GENERALIZADA */
  if (copyConclusions.includes('ACCESORIO DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('ACCESORIO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('ACCESORIO DEROCHO, GENERALIZADA,')) {
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
          <NerviusButton value='car' title='(AXILAR),' displayText=' ' />
        </div>

      </>);

  }
  if (copyConclusions.includes('MUSCULOCUTÁNEO IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('MUSCULOCUTÁNEO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('MUSCULOCUTÁNEO IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(APROXIMAL A SU EMERGENCIA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO),' displayText=' ' />
      </div>
    </>);

  }
  if (copyConclusions.includes('MUSCULOCUTÁNEO DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('MUSCULOCUTÁNEO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('MUSCULOCUTÁNEO DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(APROXIMAL A SU EMERGENCIA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO),' displayText=' ' />
      </div>
    </>);

  }
  if (copyConclusions.includes('RADIAL DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('RADIAL DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('RADIAL DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(AXILA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CANAL DE TORSION),' displayText=' ' />
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
        <NerviusButton value='car' title='(CODO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA),' displayText=' ' />
      </div>
    </>);

  }
  if (copyConclusions.includes('RADIAL IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('RADIAL IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('RADIAL IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(AXILA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CANAL DE TORSION),' displayText=' ' />
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
        <NerviusButton value='car' title='(CODO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO, RAMA INTEROSEA POSTERIOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO, RAMA RADIAL SUPERFICIA),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('SUPRAESCAPULAR IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('SUPRAESCAPULAR IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('SUPRAESCAPULAR IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(INMEDIATO A SU EMERGENCIA, RAMA SUPRAESPINOSO),' displayText=' ' />
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
        <NerviusButton value='car' title='(LIGAMENTO TRASVERSO, RAMA SUPRAESPINOSO),' displayText=' ' />
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
        <NerviusButton value='car' title='(FOSA ESPINOGLENOIDEA, RAMA INFRAESPINOSO),' displayText=' ' />
      </div>

    </>);
  }
  if (copyConclusions.includes('SUPRAESCAPULAR DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('SUPRAESCAPULAR DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('SUPRAESCAPULAR DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(INMEDIATO A SU EMERGENCIA, RAMA SUPRAESPINOSO),' displayText=' ' />
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
        <NerviusButton value='car' title='(LIGAMENTO TRASVERSO, RAMA SUPRAESPINOSO),' displayText=' ' />
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
        <NerviusButton value='car' title='(FOSA ESPINOGLENOIDEA, RAMA INFRAESPINOSO),' displayText=' ' />
      </div>

    </>);
  }
  if (copyConclusions.includes('ULNAR DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('ULNAR DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('ULNAR DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(AXILAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CODO/CANAL CUBITAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE ANTEBRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CARPO/CANAL DE GUYON),' displayText=' ' />
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
        <NerviusButton value='car' title='(PALMA),' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('ULNAR IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('ULNAR IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('ULNAR IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(AXILAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE BRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CODO/CANAL CUBITAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE ANTEBRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIAL DE ANTEBRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE ANTEBRAZO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CARPO/CANAL DE GUYON),' displayText=' ' />
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
        <NerviusButton value='car' title='(PALMA),' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('FRÉNICO IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('FRÉNICO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('FRÉNICO IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(PLEXO CERVICAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(SUPRACLAVICULAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TORAX),' displayText=' ' />
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
        <NerviusButton value='car' title='(DIAFRAGMA),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('FRÉNICO DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('FRÉNICO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('FRÉNICO DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(PLEXO CERVICAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(SUPRACLAVICULAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(TORAX),' displayText=' ' />
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
        <NerviusButton value='car' title='(DIAFRAGMA),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TORACODORSAL IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('TORACODORSAL IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('TORACODORSAL IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(FOSA SUPRACLAVICULAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(PECTORAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(TORAX),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TORACODORSAL DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('TORACODORSAL DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('TORACODORSAL DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(FOSA SUPRACLAVICULAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(PECTORAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(TORAX),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('CIATICO DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('CIATICO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('CIATICO DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(ESCOTADURA MAYOR DE LA PELVIS),' displayText=' ' />
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
        <NerviusButton value='car' title='(ESCOTADURA MAYOR DE LA PELVIS),' displayText=' ' />
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
        <NerviusButton value='car' title='(EMERGENCIA PIRAMIDAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO PROXIMAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO MEDIO),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO DISTAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(HUECO POPLIEO),' displayText=' ' />
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
        <NerviusButton value='car' title='(HUECO POPLIEO),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('CIATICO IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('CIATICO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('CIATICO IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(ESCOTADURA MAYOR DE LA PELVIS),' displayText=' ' />
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
        <NerviusButton value='car' title='(ESCOTADURA MAYOR DE LA PELVIS),' displayText=' ' />
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
        <NerviusButton value='car' title='(EMERGENCIA PIRAMIDAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO PROXIMAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO MEDIO),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO DISTAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(HUECO POPLIEO),' displayText=' ' />
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
        <NerviusButton value='car' title='(HUECO POPLIEO),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('FEMORAL DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('FEMORAL DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('FEMORAL DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(PROXIMAL A LIGAMENTO INGUINAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(LIGAMENTO INGUINAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO PROXIMAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO MEDIO),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO MEDIO),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO DISTAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO DISTAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(SAFENO),' displayText=' ' />
      </div>
      
    </>);
  }
  if (copyConclusions.includes('FEMORAL IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('FEMORAL IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('FEMORAL IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(PROXIMAL A LIGAMENTO INGUINAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(LIGAMENTO INGUINAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO PROXIMAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO MEDIO),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO MEDIO),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO DISTAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO TERCIO DISTAL),' displayText=' ' />
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
        <NerviusButton value='car' title='(SAFENO),' displayText=' ' />
      </div>
      
    </>);
  }
  if (copyConclusions.includes('OBTURADOR IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('OBTURADOR IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('OBTURADOR IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(PROXIMAL A CANAL OBTURADOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(CANAL OBTURADOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO),' displayText=' ' />
      </div>
    
    </>);
  }
  if (copyConclusions.includes('OBTURADOR DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('OBTURADOR DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('OBTURADOR DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(PROXIMAL A CANAL OBTURADOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(CANAL OBTURADOR),' displayText=' ' />
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
        <NerviusButton value='car' title='(MUSLO),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('PERONEO IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('PERONEO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('PERONEO IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(BIFURCACION EN HUECO POPLITEO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CABEZA DE PERONE),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIO DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TOBILLO),' displayText=' ' />
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
        <NerviusButton value='car' title='(PIE),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('PERONEO DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('PERONEO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('PERONEO DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(BIFURCACION EN HUECO POPLITEO),' displayText=' ' />
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
        <NerviusButton value='car' title='(CABEZA DE PERONE),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIO DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TOBILLO),' displayText=' ' />
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
        <NerviusButton value='car' title='(PIE),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TIBIAL DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('TIBIAL DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('TIBIAL DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(BIFURCACION EN HUECO POPLITEO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIO DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TOBILLO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TOBILLO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TUNEL DEL TARSO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TUNEL DEL TARSO),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('TIBIAL IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('TIBIAL IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('TIBIAL IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(BIFURCACION EN HUECO POPLITEO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO PROXIMAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO MEDIO DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TERCIO DISTAL DE PIERNA),' displayText=' ' />
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
        <NerviusButton value='car' title='(TOBILLO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TOBILLO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TUNEL DEL TARSO),' displayText=' ' />
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
        <NerviusButton value='car' title='(TUNEL DEL TARSO),' displayText=' ' />
      </div>
    </>);
  }
  if (copyConclusions.includes('PUDENDO IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('PUDENDO IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('PUDENDO IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(FORAMEN SACROL),' displayText=' ' />
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
        <NerviusButton value='car' title='(LIG. SACROESPINOSO/CANAL PUDENDO),' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('PUDENDO DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('PUDENDO DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('PUDENDO DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(FORAMEN SACROL),' displayText=' ' />
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
        <NerviusButton value='car' title='(LIG. SACROESPINOSO/CANAL PUDENDO),' displayText=' ' />
      </div>


    </>);
  }
  if (copyConclusions.includes('FACIAL IZQUIERDO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('FACIAL IZQUIERDO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('FACIAL IZQUIERDO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(DISTAL A FOSA ESTILOMASTOIDEA),' displayText=' ' />
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
        <NerviusButton value='car' title='(MALAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(MADICULAR),' displayText=' ' />
      </div>

    </>);
  }
  if (copyConclusions.includes('FACIAL DEROCHO, FOCALIZADA A NIVEL DE ') || copyConclusions.includes('FACIAL DEROCHO, SEGMENTARIA A NIVEL DE ') || copyConclusions.includes('FACIAL DEROCHO, GENERALIZADA,')) {
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
        <NerviusButton value='car' title='(DISTAL A FOSA ESTILOMASTOIDEA),' displayText=' ' />
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
        <NerviusButton value='car' title='(MALAR),' displayText=' ' />
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
        <NerviusButton value='car' title='(MADICULAR),' displayText=' ' />
      </div>

    </>);
  }
  else {
    
    return null;
  }


}// aqui   FRÉNICO IZQUIERDO, FOCALIZADA A NIVEL DE 