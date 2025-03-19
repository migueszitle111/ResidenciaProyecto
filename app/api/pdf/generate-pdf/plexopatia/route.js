//
//
import puppeteerLib from 'puppeteer';
import chromium from '@sparticuz/chromium';

const isDev = process.env.NODE_ENV !== 'production';
// Ajusta esto a tu dominio en producción. En dev, asume 'http://localhost:3000'
const baseUrl = isDev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com';

/**
 * Inserta aquí tus "reglas" tal como las tenías en ConclusionCanvasV.
 * Cada regla tendrá { expectedValue, image }, e incluso position si deseas
 * renderizarlas en coordenadas específicas.
 */
const pdfRules = [
  {
    expectedValue: 'pre_total', 
    image: {
      src: 'PlexoImg/PLE_T superior.png',
      alt: 'Modelo',
      position: { top: '120px', left: '220px', width: '50px' } // <--- EXACTO

    }
  },
  {
    expectedValue: 'c5s', 
    image: {
      src: 'PlexoImg/PLE_T superior.png',
      alt: 'Modelo',
      position: { top: '120px', left: '220px', width: '50px' } // <--- EXACTO

    }
  },
  {
    expectedValue: 'c6s', 
    image: {
      src: 'PlexoImg/PLE_T superior.png',
      alt: 'Modelo',
      position: { top: '120px', left: '220px', width: '50px' } // <--- EXACTO

    }
  },
  {
    expectedValue: 'c7m',
    image: {
      src: 'PlexoImg/PLE_T. Medio.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c8f',
    image: {
      src: 'PlexoImg/PLE_T. inferior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 't1f',
    image: {
      src: 'PlexoImg/PLE_T. inferior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'post_total',
    image: {
      src: 'PlexoImg/PLE_T superior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'sup',
    image: {
      src: 'PlexoImg/PLE_T superior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'medio',
    image: {
      src: 'PlexoImg/PLE_T. Medio.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'inf',
    image: {
      src: 'PlexoImg/PLE_T. inferior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'divi',
    image: {
      src: 'PlexoImg/PLE_Cordon Posterior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'lateral',
    image: {
      src: 'PlexoImg/PLE_Lateral.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'posterior',
    image: {
      src: 'PlexoImg/PLE_Cordon Posterior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'medial',
    image: {
      src: 'PlexoImg/PLE_Cordon Medial.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'salida',
    image: {
      src: 'PlexoImg/PLE_T. Inferior.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'preganglionar_total',
    image: {
      src: 'PlexoImg/PLE_P. Lumbosacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L2',
    image: {
      src: 'PlexoImg/PLE_P. Lumbar.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L3',
    image: {
      src: 'PlexoImg/PLE_P. Lumbar.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L4',
    image: {
      src: 'PlexoImg/PLE_T. Lumbosacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L5',
    image: {
      src: 'PlexoImg/PLE_T. Lumbosacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'S1',
    image: {
      src: 'PlexoImg/PLE_P. Sacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'S2',
    image: {
      src: 'PlexoImg/PLE_P. Sacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'postganglionar_total',
    image: {
      src: 'PlexoImg/PLE_P. Lumbosacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'ilihipogastrico_e_ilinguinal',
    image: {
      src: 'PlexoImg/NO_Ilioinguinal-genitofemoral.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'genitocrural_y_femorocutáneo_lateral',
    image: {
      src: 'PlexoImg/NO_Femorocutáneo femoral.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_lumbar',
    image: {
      src: 'PlexoImg/PLE_P. Lumbar.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_lumbosacro',
    image: {
      src: 'PlexoImg/PLE_T. Lumbosacro.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_sacro',
    image: {
      src: 'PlexoImg/PLE_P. Sacro.png',
      alt: 'Modelo',
    }
  },

  {
    expectedValue: 'plexo_pudendo',
    image: [
    {
      src: 'PlexoImg/Plexo pudendo derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Plexo pudendo izquierdo.png',
      alt: 'Modelo',
    },
  ],
  },


  {
    expectedValue: 'pre_totald', 
    image: {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c5sd', 
    image: {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c6sd', 
    image: {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c7md',
    image: {
      src: 'PlexoImg/Tronco medio derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c8fd',
    image: {
      src: 'PlexoImg/Tronco inferior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 't1fd',
    image: {
      src: 'PlexoImg/Tronco inferior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'post_totald',
    image: {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'supd',
    image: {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'mediod',
    image: {
      src: 'PlexoImg/Tronco medio derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'infd',
    image: {
      src: 'PlexoImg/Tronco inferior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'divid',
    image: {
      src: 'PlexoImg/Cordon lateral derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'laterald',
    image: {
      src: 'PlexoImg/Cordon lateral derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'posteriord',
    image: {
      src: 'PlexoImg/Cordon posterior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'mediald',
    image: {
      src: 'PlexoImg/Cordon medial derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'salidad',
    image: {
      src: 'PlexoImg/Tronco inferior derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'preganglionar_totald',
    image: {
      src: 'PlexoImg/Plexo lumbosacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L2d',
    image: {
      src: 'PlexoImg/Plexo lumbar derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L3d',
    image: {
      src: 'PlexoImg/Plexo lumbar derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L4d',
    image: {
      src: 'PlexoImg/Tronco lumbosacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L5d',
    image: {
      src: 'PlexoImg/Tronco lumbosacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'S1d',
    image: {
      src: 'PlexoImg/Plexo sacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'S2d',
    image: {
      src: 'PlexoImg/Plexo sacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'postganglionar_totald',
    image: {
      src: 'PlexoImg/Plexo lumbosacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'ilihipogastrico_e_ilinguinald',
    image: {
      src: 'PlexoImg/ILIOHIPOGASTRICO DERECHO.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'genitocrural_y_femorocutáneo_laterald',
    image: {
      src: 'PlexoImg/FEMOROCUTANEO DERECHO.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_lumbard',
    image: {
      src: 'PlexoImg/Plexo lumbar derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_lumbosacrod',
    image: {
      src: 'PlexoImg/Tronco lumbosacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_sacrod',
    image: {
      src: 'PlexoImg/Plexo sacro derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_pudendod',
    image: {
      src: 'PlexoImg/Plexo pudendo derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'pre_totali', 
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c5si', 
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c6si', 
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c7mi',
    image: {
      src: 'PlexoImg/Tronco medio izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'c8fi',
    image: {
      src: 'PlexoImg/Tronco inferior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 't1fi',
    image: {
      src: 'PlexoImg/Tronco inferior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'post_totali',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'supi',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'medioi',
    image: {
      src: 'PlexoImg/Tronco medio izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'infi',
    image: {
      src: 'PlexoImg/Tronco inferior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'divii',
    image: {
      src: 'PlexoImg/Cordon lateral izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'laterali',
    image: {
      src: 'PlexoImg/Cordon lateral izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'posteriori',
    image: {
      src: 'PlexoImg/Cordon posterior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'mediali',
    image: {
      src: 'PlexoImg/Cordon medial izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'salidai',
    image: {
      src: 'PlexoImg/Tronco inferior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'preganglionar_totali',
    image: {
      src: 'PlexoImg/Plexo lumbosacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L2i',
    image: {
      src: 'PlexoImg/Plexo lumbar izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L3i',
    image: {
      src: 'PlexoImg/Plexo lumbar izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L4i',
    image: {
      src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'L5i',
    image: {
      src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'S1i',
    image: {
      src: 'PlexoImg/Plexo sacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'S2i',
    image: {
      src: 'PlexoImg/Plexo sacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'postganglionar_totali',
    image: {
      src: 'PlexoImg/Plexo lumbosacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'ilihipogastrico_e_ilinguinali',
    image: {
      src: 'PlexoImg/ILIOHIPOGASTRICO IZQUIERDO.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'genitocrural_y_femorocutáneo_laterali',
    image: {
      src: 'PlexoImg/FEMOROCUTANEO IZQUIERDO.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_lumbari',
    image: {
      src: 'PlexoImg/Plexo lumbar izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_lumbosacroi',
    image: {
      src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_sacroi',
    image: {
      src: 'PlexoImg/Plexo sacro izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'plexo_pudendoi',
    image: {
      src: 'PlexoImg/Plexo pudendo izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'uid',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'mid',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'umd',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'umid',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'uii',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'mii',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'umi',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'umii',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'ui',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'mi',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'um',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'umi',
    image: {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'izquierda_C',
    image: {
      src: 'PlexoImg/Plexo cervical izquierdo.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'derecha_C',
    image: {
      src: 'PlexoImg/Plexo cervical derecho.png',
      alt: 'Modelo',
    }
  },
  {
    expectedValue: 'bilateral_C',
    image: {
      src: 'PlexoImg/PLEXO CERVICAL BILATERAL.png',
      alt: 'Modelo',
    }
  },

  {
    expectedValue: 'troncosD',
    image: [
    {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco medio derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco inferior derecho.png',
      alt: 'Modelo',
    }
  ],
  },

  {
    expectedValue: 'troncosI',
    image: [
    {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco medio izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco inferior izquierdo.png',
      alt: 'Modelo',
    }
  ],
  },

  {
    expectedValue: 'troncosB',
    image: [
    {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco medio derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco inferior derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco medio izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco inferior izquierdo.png',
      alt: 'Modelo',
    }
  ],
  },


  {
    expectedValue: 'CordonI',
    image: [
    {
      src: 'PlexoImg/Cordon lateral izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon posterior izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon medial izquierdo.png',
      alt: 'Modelo',
    }
  ],
  },
  
  {
    expectedValue: 'CordonD',
    image: [
    {
      src: 'PlexoImg/Cordon lateral derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon posterior derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon medial derecho.png',
      alt: 'Modelo',
    }
  ],
  },

  {
    expectedValue: 'CordonB',
    image: [
    {
      src: 'PlexoImg/Cordon lateral derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon posterior derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon medial derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon lateral izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon posterior izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Cordon medial izquierdo.png',
      alt: 'Modelo',
    }
  ],
  },

  
  {
    expectedValue: 'pre_totalN',
    image: [
    {
      src: 'PlexoImg/PLE_T superior.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco superior derecho.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Tronco superior izquierdo.png',
      alt: 'Modelo',
    }
  ],
  },

  {
    expectedValue: 'pre_Sacroi',
    image: [
    {
      src: 'PlexoImg/Tronco lumbosacro izquierdo.png',
      alt: 'Modelo',
    },
    {
      src: 'PlexoImg/Plexo pudendo izquierdo.png',
      alt: 'Modelo',
    },
  ],
  },
  
];

/**
 * Construye el HTML final que Puppeteer convertirá en PDF.
 *  - finalConclusion: string "ya formateado"
 *  - conclusiones: array con { value, title }
 *  - userData: info de usuario
 *  - droppedItems: elementos que arrastraste
 *  - topLeftText: texto superior
 */
function buildHtml({
  finalConclusion,
  conclusiones,
  userData,
  droppedItems,
  topLeftText
}) {
  // 1) Generar HTML para superponer imágenes
  //    si la conclusión (conclusion.value) coincide con expectedValue
  let overlaysHtml = '';

  pdfRules.forEach((rule) => {
    const found = conclusiones.some((c) => c.value === rule.expectedValue);
    if (found) {
      // Por simplicidad, lo inyectamos con position: absolute y un size genérico
      // Si cada una lleva su posición, agrégala como rule.position.top, rule.position.left
      if (Array.isArray(rule.image)) {
        // En caso de que haya un array de imágenes
        rule.image.forEach((img) => {
          overlaysHtml += `
            <img
              src="assets/${img.src}"
              alt="${img.alt}"
              style="
                position:absolute;
                top:50px; left:100px;
                width:80px;
                height:auto;
              "
            />
          `;
        });
      } else {
        overlaysHtml += `
          <img
            src="assets/${rule.image.src}"
            alt="${rule.image.alt}"
            style="
              position:absolute;
              top:50px; left:100px;
              width:80px;
              height:auto;
            "
          />
        `;
      }
    }
  });

  // 2) CSS base
  const menuCss = `
    /* EJEMPLO DE TU CSS... */
    .container {
      width: 700px;
      height: 800px;
      margin: 10px auto;
      position: relative;
      align-items: center;
    }
    .image-stack {
      position: relative;
      width: 600px;
      height: 776px;
      margin: 0 auto; /* si quieres centrar en la hoja */
    }
    .image-stack img {
      position: absolute;
      left: 0; top: 0;
      width: 600px;
      height: 776px;
      object-fit: contain;
    }
    #conclusionDiv {
      margin-top: 2px;
      padding: 12px;
      font-size: 14px;
      line-height: 1.4;
    }
    .user-logo {
      position: absolute;
      top: 10px;
      right: 20px;
      width: 60px;
      height: 60px;
      opacity: 50%;
      object-fit: cover;
    }
    /* etc. tu CSS... */
  `;

  // 3) Construimos el HTML completo
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Reporte</title>
        <style>${menuCss}</style>
      </head>
      <body>
        ${
          userData.imageUrl
            ? `<img class="user-logo" src="${userData.imageUrl}" alt="Logo Usuario"/>`
            : ''
        }

        <div style="margin-top: 40px; margin-left: 60px;">
          ${topLeftText ?? ''}
        </div>

        <div class="container">
          <!-- droppedItems con posicion:absolute -->
          <div class="image-container" style="position:relative;">
            ${droppedItems
              .map(
                (item) => `
                <div
                  style="
                    position: absolute;
                    left: ${item.x}px; 
                    top: ${item.y}px;
                  "
                >
                  ${item.content}
                </div>`
              )
              .join('')}
          </div>

          <!-- Bloque "image-stack" con la imagen base y overlays -->
          <div class="image-stack">
            <img
              src="assets/UnionMuscularIMG/BP_UnionMuscular.png"
              alt="Unión Neuromuscular Base"
            />
            ${overlaysHtml}
          </div>

          <div id="conclusionDiv">${finalConclusion}</div>

          <!-- Datos usuario -->
          <div class="user-data" style="font-size:10px; opacity: 0.5; margin-top:30px;">
            ${
              userData.name
                ? `<div> <strong>Usuario:</strong> ${userData.name} ${userData.lastname ?? ''}</div>`
                : ''
            }
            ${
              userData.email
                ? `<div> <strong>Email:</strong> ${userData.email}</div>`
                : ''
            }
            ${
              userData.especialidad
                ? `<div> <strong>Especialidad:</strong> ${userData.especialidad}</div>`
                : ''
            }
            ${
              userData.cedula
                ? `<div> <strong>Cédula:</strong> ${userData.cedula}</div>`
                : ''
            }
          </div>
        </div>
      </body>
    </html>
  `;
}

// Ruta principal para POST
export async function POST(req) {
  try {
    const body = await req.json();
    // Asegúrate que desde front-end envíes 'conclusiones' como array
    // y 'finalConclusion' como string
    const {
      finalConclusion = '',
      conclusiones = [],
      userData = {},
      droppedItems = [],
      topLeftText = ''
    } = body;

    const puppeteer = isDev ? puppeteerLib : require('puppeteer-core');
    const executablePath = isDev ? undefined : await chromium.executablePath;

    const browser = await puppeteer.launch({
      args: isDev ? [] : chromium.args,
      defaultViewport: isDev ? undefined : chromium.defaultViewport,
      executablePath,
      headless: true
    });

    const page = await browser.newPage();

    // 1) Construimos el HTML
    const html = buildHtml({
      finalConclusion,
      conclusiones,
      userData,
      droppedItems,
      topLeftText
    });

    // 2) Seteamos el contenido y navegamos
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.setContent(html, { waitUntil: 'networkidle2' });

    // 3) Generamos PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 1
    });

    await browser.close();

    // 4) Retornamos la respuesta PDF
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte.pdf"'
      }
    });
  } catch (error) {
    console.error('Error generando PDF:', error);
    return new Response('Error generando PDF: ' + error.message, { status: 500 });
  }
}
