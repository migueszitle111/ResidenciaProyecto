// --------------------------- IMPORTS ---------------------------
import { NextResponse }        from 'next/server';           // sin “type”
import puppeteer               from 'puppeteer';             // Dev
import puppeteerCore           from 'puppeteer-core';        // Prod (λ)
import chromium                from '@sparticuz/chromium-min';

export const runtime = 'nodejs';          // ⚠️ va después de los imports
export const dynamic = 'force-dynamic';   // (opcional) evita caché de Vercel

// ---------------------------------------------------------------
const isDev  = process.env.NODE_ENV !== 'production';
const baseUrl = isDev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_URL;


// ───────────────────────── helpers ────────────────────────────
async function launchBrowser() {
  if (isDev) {
    // Puppeteer normal en local
    return puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  // Puppeteer‑core + Chromium empaquetado en Vercel
  const executablePath = await chromium.executablePath(
    'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
  );

  return puppeteerCore.launch({
    executablePath,
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });
}


/**
 * Construye el HTML final para exportar el PDF de radiculopatía.
 */
function buildHtml({
  finalConclusion = "",
  finalString = "",        // Cadena con todos los "values" (ej: c5_i, c6_d, etc.)
  userData = {},
  droppedItems= [],
  topLeftText = "",
  checkedLeft = {},
  checkedRight = {},
}) {
  // ——— 1) Definir rutas de base por defecto y para “sensitiva” ———
  const defaultBaseFront     = '/assets/RadiculopatiaImg/Columna/RA_Columna_1_FondoB.png';
  const defaultBaseBack      = '/assets/RadiculopatiaImg/Columna/RA_Columna_2_FondoB.png';
  const sensitivaBaseFront   = '/assets/RadiculopatiaImg/Columna/BASE ANTERIOR.png';
  const sensitivaBaseBack    = '/assets/RadiculopatiaImg/Columna/BASE POSTERIOR.png';

  // ——— 2) Detectar “radiculopatia_sensitiva” en la cadena de valores ———
  const isSensitiva = finalString
    .toLowerCase()
    .includes('radiculopatia_sensitiva');

  // ——— 3) Elegir la imagen base según corresponda ———
  const baseFront = isSensitiva ? sensitivaBaseFront : defaultBaseFront;
  const baseBack  = isSensitiva ? sensitivaBaseBack  : defaultBaseBack;

  // EJEMPLO de info del usuario
  const { name, lastname, cedula, email, especialidad, imageUrl } = userData;
  /**********************************************
   * A) MAPEO de cruces => dónde aparecen
   **********************************************/
 // 1) Mapea A1..A100 con su “src” y “className”
 const imageMapLeft = {
  A1: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz1'   },
  A2: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz2'   },
  A3: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz3'   },
  A4: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz4'   },

  A9: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz9'   },
  A10: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz10' },
  A11: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz11' },
  A12: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz12' },

  A17: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz17' },
  A18: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz18' },
  A19: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz19' },
  A20: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz20' },

  A25: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz25' },
  A26: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz26' },
  A27: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz27' },
  A28: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz28' },

  A33: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz33' },
  A34: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz34' },
  A35: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz35' },
  A36: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz36' },

  A41: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz41' },
  A42: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz42' },
  A43: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz43' },
  A44: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz44' },

  A97: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz97' },
  A98: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz98' },
  A99: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz99' },
  A100: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz100'},

  A49: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz49' },
  A50: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz50' },
  A51: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz51' },
  A52: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz52' },

  A57: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz57' },
  A58: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz58' },
  A59: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz59' },
  A60: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz60' },

  A65: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz65' },
  A66: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz66' },
  A67: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz67' },
  A68: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz68' },

  A73: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz73' },
  A74: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz74' },
  A75: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz75' },
  A76: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz76' },

  A81: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz81' },
  A82: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz82' },
  A83: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz83' },
  A84: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz84' },

  A89: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz89' },
  A90: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz90' },
  A91: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz91' },
  A92: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz92' },
};
const imageMapRight = {
  A5: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz5'   },
  A6: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz6'   },
  A7: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz7'   },
  A8: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz8'   },

  A13: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz13' },
  A14: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz14' },
  A15: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz15' },
  A16: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz16' },

  A21: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz21' },
  A22: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz22' },
  A23: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz23' },
  A24: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz24' },

  A29: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz29' },
  A30: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz30' },
  A31: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz31' },
  A32: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz32' },

  A37: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz37' },
  A38: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz38' },
  A39: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz39' },
  A40: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz40' },

  A45: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz45' },
  A46: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz46' },
  A47: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz47' },
  A48: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz48' },

  A101: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz101'},
  A102: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz102'},
  A103: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz103'},
  A104: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz104'},

  A53: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz53' },
  A54: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz54' },
  A55: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz55' },
  A56: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz56' },

  A61: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz61' },
  A62: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz62' },
  A63: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz63' },
  A64: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz64' },

  A69: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz69' },
  A70: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz70' },
  A71: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz71' },
  A72: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz72' },

  A77: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz77' },
  A78: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz78' },
  A79: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz79' },
  A80: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz80' },

  A85: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz85' },
  A86: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz86' },
  A87: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz87' },
  A88: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz88' },

  A93: { src: '/assets/Simbolos/S_Cruz 1.png', className: 'cruz93' },
  A94: { src: '/assets/Simbolos/S_Cruz 2.png', className: 'cruz94' },
  A95: { src: '/assets/Simbolos/S_Cruz 3.png', className: 'cruz95' },
  A96: { src: '/assets/Simbolos/S_Cruz 4.png', className: 'cruz96' },
};
  // Generar HTML de las cruces marcadas (lado izq y lado der)
  function getCrossesHtml() {
    let html = "";
    // Lado izquierdo
    for (const key of Object.keys(checkedLeft)) {
      if (checkedLeft[key]) {
        const data = imageMapLeft[key];
        if (data) {
          html += `<img src="${data.src}" alt="${key}" class="${data.className}" />\n`;
        }
      }
    }
    // Lado derecho
    for (const key of Object.keys(checkedRight)) {
      if (checkedRight[key]) {
        const data = imageMapRight[key];
        if (data) {
          html += `<img src="${data.src}" alt="${key}" class="${data.className}" />\n`;
        }
      }
    }
    return html;
  }
  const crossesHtml = getCrossesHtml();
  /**********************************************
   * B) MAPEO de overlays => según conclusiones
   **********************************************/
  // Se listan sólo algunas reglas de ejemplo (ajusta con lo que tengas):
  const frontRules = [
    {
      expectedValue: 'c5_i', 
      image: {
        src: '/assets/RadiculopatiaImg/C5 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c5_d', 
      image: {
        src: '/assets/RadiculopatiaImg/C5 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_i', 
      image: {
        src: '/assets/RadiculopatiaImg/C6 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_d', 
      image: {
        src: '/assets/RadiculopatiaImg/C6 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6s_i', 
      image: {
        src: '/assets/RadiculopatiaImg/C6-C7s anterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6s_d', 
      image: {
        src: '/assets/RadiculopatiaImg/C6-C7s anterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6s_bi', 
      image: [
        {
          src: '/assets/RadiculopatiaImg/C6-C7s anterior izquierdo.png',
          alt: 'Modelo',
        },
        {
          src: '/assets/RadiculopatiaImg/C6-C7s anterior derecho.png',
          alt: 'Modelo',
        }
      ]
    },
    {
      expectedValue: 'c7s_i', 
      image: {
        src: '/assets/RadiculopatiaImg/C6-C7s anterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7s_d', 
      image: {
        src: '/assets/RadiculopatiaImg/C6-C7s anterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7s_bi', 
      image: [
      {
        src: '/assets/RadiculopatiaImg/C6-C7s anterior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/RadiculopatiaImg/C6-C7s anterior derecho.png',
        alt: 'Modelo',
      }
    ],
    },
    {
      expectedValue: 'c7_i', 
      image: {
        src: '/assets/RadiculopatiaImg/C7 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7_d', 
      image: {
        src: '/assets/RadiculopatiaImg/C7 derecho anterior.png',
        alt: 'Modelo' 
      }
    },
    {
      expectedValue: 'c8_i', 
      image: {
        src: '/assets/RadiculopatiaImg/C8 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c8_d', 
      image: {
        src: '/assets/RadiculopatiaImg/C8 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1_i', 
      image: {
        src: '/assets/RadiculopatiaImg/T1 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1_d', 
      image: {
        src: '/assets/RadiculopatiaImg/T1 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l2_i', 
      image: {
        src: '/assets/RadiculopatiaImg/L1-L2 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l2_d', 
      image: {
        src: '/assets/RadiculopatiaImg/L1-L2 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l3_i', 
      image: {
        src: '/assets/RadiculopatiaImg/L1-L2 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l3_d', 
      image: {
        src: '/assets/RadiculopatiaImg/L1-L2 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l4_i', 
      image: {
        src: '/assets/RadiculopatiaImg/L3-L4 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l4_d', 
      image: {
        src: '/assets/RadiculopatiaImg/L3-L4 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l5_i', 
      image: {
        src: '/assets/RadiculopatiaImg/L5 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l5_d', 
      image: {
        src: '/assets/RadiculopatiaImg/L5 derecho anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1_i', 
      image: {
        src: '/assets/RadiculopatiaImg/S1 izquierdo anterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1_d', 
      image: {
        src: '/assets/RadiculopatiaImg/S1 derechoanterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1s_i', 
      image: {
        src: '/assets/RadiculopatiaImg/S1s anterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1s_d', 
      image: {
        src: '/assets/RadiculopatiaImg/S1s anterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1s_bi', 
      image:[ {
        src: '/assets/RadiculopatiaImg/S1s anterior izquierdo.png',
        alt: 'Modelo',
      },{
        src: '/assets/RadiculopatiaImg/S1s anterior derecho.png',
        alt: 'Modelo',
      }
    ],                        
    },
    {
      expectedValue: 'cervical_multinivel', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'cervical_multinivel2', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'lumbrosaca_multinivel', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Lumbar_I.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'lumbrosaca_multinivel2', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Lumbar_I.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'toracica_multinivel', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Toracica_I.png',
        alt: 'Modelo',
      }
    },

    {
      expectedValue: 'CERVICAL', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Cervical_I.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'LUMBOSACRO', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Lumbar_I.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'TORACICA', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Toracica_I.png',
        alt: 'Modelo',
      }
    },



  ];
  const backRules = [
    {
      expectedValue: 'c5_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C5-C6 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c5_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C5-C6 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c5_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_C5,C6.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C5-C6 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C5-C6 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_ds', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C5-C6 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_is', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C5-C6 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_C5-C6-C7.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C7 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C7 izquierdo posterior.png',
        alt: 'Modelo' 
      }
    },
    {
      expectedValue: 'c7_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_C7.png',
        alt: 'Modelo' 
      }
    },
    {
      expectedValue: 'c6s_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6s_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6s_bi', 
      image:[ {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior derecho.png',
        alt: 'Modelo',
      }
    ],
    },
    {
      expectedValue: 'c7s_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    
    {
      expectedValue: 'c7s_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7s_bi', 
      image:[{
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/RadiculopatiaPosteriorImg/C6s posterior derecho.png',
        alt: 'Modelo',
      }
    ],
    },
    {
      expectedValue: 'c8_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C8 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c8_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C8 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c8_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_C8-T1.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C8 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/C8 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_C8-T1.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l5_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/L5 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l5_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/L5 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'l5_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_L5.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/L5 S1 S2 derecho posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/L5 S1 S2 izquierdo posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1_b', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/RA_P_L5-S1-S2.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1s_i', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/s1s posterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1s_d', 
      image: {
        src: '/assets/RadiculopatiaPosteriorImg/s1s posterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 's1s_bi', 
      image: [{
        src: '/assets/RadiculopatiaPosteriorImg/s1s posterior izquierdo.png',
       alt: 'Modelo',
      },
    {
      src: '/assets/RadiculopatiaPosteriorImg/s1s posterior derecho.png',
      alt: 'Modelo',
    }
    ],
    },
    {
      expectedValue: 'cervical_multinivel', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'cervical_multinivel2', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'lumbrosaca_multinivel', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Lumbar_D.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'lumbrosaca_multinivel2', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Lumbar_D.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'toracica_multinivel', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Toracica_D.png',
        alt: 'Modelo',
      }
    },


    {
      expectedValue: 'CERVICAL', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Cervical_D.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'LUMBOSACRO', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Lumbar_D.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'TORACICA', 
      image: {
        src: '/assets/RadiculopatiaImg/Multinivel/Columna_Toracica_D.png',
        alt: 'Modelo',
      }
    },
  ];


  // C) Separar droppedItems en front y back
 //  **********************************************/
  const HALF_WIDTH = 450;

  // Arrays para cada vista
  const frontItems = [];
  const backItems  = [];

  for (const item of droppedItems) {
    if (item.x < HALF_WIDTH) {
      // Está en la mitad frontal
      frontItems.push({ ...item });
    } else {
      // Está en la mitad posterior; restamos 599 a X
      const localX = item.x - HALF_WIDTH;
      backItems.push({ ...item, x: localX });
    }
  }
  
    // Generar HTML de items frontales
// Si tus coordenadas ya vienen en pixeles no los multipliques por 450
const scaleFactorItems = 1; // ajuste este valor si es necesario (ej. 0.5, 0.8, etc.)

const droppedFrontHtml = frontItems.map((item) => {
  const width = item.width || 200;    // ajusta tamaños reales de tus imágenes
  const height = item.height || 200;
  return `
    <div data-item-id="${item.id}" style="
      position:absolute;
      left:${item.x+10}px;
      top:${item.y+17}px;
      width:${width}px;
      height:${height}px;
      transform: scale(${scaleFactorItems});
      transform-origin: top left;
      z-index: 99;">
      ${item.content}
    </div>`;
}).join("");

  
    // Generar HTML de items posteriores
    const droppedBackHtml = backItems
      .map((item) => {
        const width = item.width || 200;
        const height = item.height || 200;
        return `
          <div 
          data-item-id="${item.id}"
          style="
            position:absolute;
             left:${item.x+10}px;
             top:${item.y+20}px;
            width:${width}px;
      height:${height}px;
            transform: scale(${scaleFactorItems});
            transform-origin: top left;
            z-index: 99;
          ">
            ${item.content}
          </div>
        `;
      })
      .join("");
  
    // E) Overlays según las conclusiones
    function getOverlayHtml(rules) {
      const matched = [];
      const textLower = finalString.toLowerCase();
      for (const rule of rules) {
        if (textLower.includes(rule.expectedValue.toLowerCase())) {
          // Agregar la(s) imagen(es)
          if (Array.isArray(rule.image)) {
            matched.push(...rule.image);
          } else {
            matched.push(rule.image);
          }
        }
      }
      // Retorna <img> con posición absoluta
      return matched
        .map((img) => {
          return `
            <img
              src="${img.src}"
              alt=""
              style="
                position: absolute;
                top: 0; left: 0;
                width: 450px;
                height: 600px;
                object-fit: fill;
                z-index: 2;
              "
            />
          `;
        })
        .join("\n");
    }



  function getOverlayHtml(rules) {
    const matched = [];
    const textLower = finalString.toLowerCase();
    for (const rule of rules) {
      if (textLower.includes(rule.expectedValue.toLowerCase())) {
        // Agregar la(s) imagen(es)
        if (Array.isArray(rule.image)) {
          matched.push(...rule.image);
        } else {
          matched.push(rule.image);
        }
      }
    }
    // Retorna <img> con posición absoluta sobre la base (width 600, height 776, etc.)
    return matched.map((img) => {
      return `
        <img
          src="${img.src}"
          alt=""
          style="
            position: absolute;
            top: 0; left: 0;
            width: 450px;  /* ajusta para tu gusto */
            height: 600px; /* ajusta para tu gusto */
            object-fit: fill;
            z-index: 2;
          "
        />
      `;
    }).join('\n');
  }
  const overlayHtmlFront = getOverlayHtml(frontRules);
  const overlayHtmlBack  = getOverlayHtml(backRules);
  /**********************************************
  }
  /**********************************************
   * D) CSS embebido (estilos de tu PDF)
   **********************************************/
  const embeddedCSS = `

      .user-logo {
        position: absolute;
        top: 10px;
        right: 20px;
        width: 60px;
        height: 60px;
        opacity: 50%;
        border-radius: 0%;
        object-fit: cover;
        z-index: 9999;
      }

    .user-data {
  position: absolute;    /* importa que esté fuera del flujo */
  bottom: 30px;          /* distancia al borde inferior de la página */
  left: 50%;             /* para centrarlo horizontalmente */
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 10px;
  opacity: 0.5;
  align-items: center;
  justify-content: center;
  width: calc(100% - 40px); /* opcional, para que no ocupe toda la anchura */
  z-index: 1000;
}

      .user-data svg {
        margin-right: 4px;
      }
      .user-data > div {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }


 .DivPanel2 {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    background-color: rgba(255, 255, 255, 0.253);
    width: 90px;
    flex-grow: 1;
    margin: 2px;
    border-radius: 5px;
    transition: width 0.3s ease, z-index 0.3s ease; /* Transición suave también para z-index */
    position: relative;
  
  }
  
  .DivPanel2-expanded {
    width: 230px;
    z-index: 10; /* Asegura que el div expandido esté en la parte superior */
    position: relative;
    background-color: rgba(250, 250, 250, 0.678);
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
  }
  
  
  .DivPanel3 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.253);
    width: 90px;
    flex-grow: 1;
    margin: 2px;
    border-radius: 5px;
    transition: width 0.3s ease, z-index 0.3s ease; /* Transición suave también para z-index */
    position: relative;
  
  }
  
  .DivPanel3-expanded {
    width: 95px;
    z-index: 10; /* Asegura que el div expandido esté en la parte superior */
    position: relative;
    background-color: rgba(250, 250, 250, 0.678);
  }
  
  .DivPanel4{
    background-color: rgba(255, 255, 255, 0.253);
    width: 90px;
    flex-grow: 1;
    flex-basis: 200;
    margin: 2px;
    border-radius: 5px;
  }
  
  .DivPanel4-expanded{
    width: 230px;
    
  }
  
  
  .cuadroIMG {
    width: 50px;
    height: 50px;
    transition: width 0.3s ease, height 0.3s ease;
    background-color: transparent;
    position: relative;
    margin-left: 30px;
  }
  
  /* Cuando el elemento está siendo arrastrado (tamaño original) */
  .cuadroIMG-expanded {
    width: 50px;
    height: 50px;
    margin-left: 90px;
    
  }
  
  .cuadroIMG2 {
    width: 90px;
    height: 30px;
    transition: width 0.3s ease, height 0.3s ease;
    background-color: transparent;
    position: relative;
    margin-left: 10px;
  }
  
  /* Cuando el elemento está siendo arrastrado (tamaño original) */
  .cuadroIMG2-expanded {
    width: 90px;
    height: 30px;
    margin-left: 10px;
    
  }
  
  
  /*CSS del componete que se utiliza para arastrar imagnes*/
  .draggableDiv {
    transition: all 0.2s ease;
    position: absolute;
    z-index: 9999; /* Prueba */

  }
  
  .draggableDiv.expanded {
    transform: scale(1.1); /* Expande el tamaño del div mientras el clic está sostenido */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Añade sombra */
    background-color: rgba(0, 0, 0, 0.1); /* Fondo ligeramente oscuro */
    
  }

  
.cuadro {
    width: 50px;
    height: 50px;
    transition: width 0.3s ease, height 0.3s ease;
    background-color: transparent;
    margin: 10px;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    z-index: 1;
  }
  
  /* Cuando el elemento está siendo arrastrado (tamaño original) */
  .cuadro-expanded {
    width: 240px;
    height: 120px;
    margin-left: -10px;
    background-color: transparent;
    z-index: 1;
  }
  
  .cuadro2 {
    width: 40px;
    height: 40px;
    background-color: white;
    transition: width 0.3s ease, height 0.3s ease;
    border: 1px solid black; /* Borde opcional */
    position: absolute;
    margin-top: 5px;
    margin-bottom: 15px;
    margin-left: 40px;
    z-index: 1;
  }
  
  .cuadro2-expanded {
    width: 98px;
    height: 92px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 135px;
    z-index: 1;
  }
  
  
  .cuadro3 {
    width: 40px;
    height: 40px;
    background-color: white;
    transition: width 0.3s ease, height 0.3s ease;
    border: 1px solid black; /* Borde opcional */
    position: absolute;
    margin-top:  5px;
    margin-bottom: 15px;
    margin-left: 10px;
    z-index: 1;
  }
  
  .cuadro3-expanded {
    width: 98px;
    height: 92px;
    margin-top:  15px;
    margin-bottom: 15px;
    margin-left: 10px;
    z-index: 1;
  } 

   
  /* Selector de atributo para la imagen que termine en S_Linea 5.png */
img[src$="S_Linea 1.png"] {
    width: 110px;
    height: auto; /* Ajusta el ancho para que sea responsivo */
    position: static;
    margin-top: 5px;
    margin-bottom: 30px;
    margin-left: 55px;
    transform: scale(1.1); /* Escala la imagen un poco al expandir */
    z-index: 1;
}
  /* Selector de atributo para la imagen que termine en S_Linea 5.png */
img[src$="S_Linea 4.png"] {
    width: 110px;
    height: auto;
    position: static;
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 70px;
    transform: scale(1.1); /* Escala la imagen un poco al expandir */
    z-index: 1;
}

  
  /*Circulos donde se insertan las imagenes*/
  .circulo {
    width: 50px;
    height: 50px;
    transition: width 0.3s ease, height 0.3s ease;
    background-color: transparent;
    margin: 10px;
    margin-left: -5px;
    margin-top: 10px;
    display: flex;
    z-index: 1;
  }
  
  /* Cuando el elemento está siendo arrastrado (tamaño original) */
  .circulo-expanded {
    width: 240px;
    height: 120px;
    z-index: 1;
    
  }
  
  .circulo2 {
    width: 40px;
    height: 40px;
    background-color: white;
    transition: width 0.3s ease, height 0.3s ease;
    border: 1px solid black; /* Borde opcional */
    position: absolute;
    margin-top:  5px;
    margin-bottom: 15px;
    margin-left: 40px;
    border-radius: 100%;
    z-index: 1;
  }
  
  .circulo2-expanded {
    width: 98px;
    height: 92px;
    margin-top:  15px;
    margin-bottom: 15px;
    margin-left: 135px;
    z-index: 1;
  }
  
  .circulo2 > .dropArea2{
    border-radius: 100%;
    z-index: 1;
  }
  
  
  .circulo3 {
    width: 40px;
    height: 40px;
    background-color: white;
    transition: width 0.3s ease, height 0.3s ease;
    border: 1px solid black; /* Borde opcional */
    position: absolute;
    margin-top:  5px;
    margin-bottom: 15px;
    margin-left: 10px;
    border-radius: 100%;
    z-index: 1;
  }
  
  .circulo3-expanded {
    width: 98px;
    height: 92px;
    margin-top:  15px;
    margin-bottom: 15px;
    margin-left: 10px;
    z-index: 1;
  }
  
  .circulo3 > .dropArea2{
    border-radius: 100%;
    z-index: 1;
  }
  
  
  .lineaImg{
    width: 130px; /* Ajusta el ancho para que sea responsivo */
    height: 40px; /* Mantiene la proporción de la imagen */
    transition: transform 0.3s ease; /* Añade una transición suave para efectos */
    position: static;
    background-color: transparent;
    pointer-events: none;
    margin-top: 5px;
    z-index: 1;
    
  }
  
  .lineaImg-expanded {
    width: 130px;
    height: auto;
    position: static;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 55px;
    transform: scale(1.1); /* Escala la imagen un poco al expandir */
    z-index: 1;
  }
  
  .lineaImg2{
    width: 130px; /* Ajusta el ancho para que sea responsivo */
    height: 40px; /* Mantiene la proporción de la imagen */
    transition: transform 0.3s ease; /* Añade una transición suave para efectos */
    position: static;
    background-color: transparent;
    pointer-events: none;
    margin-top: 5px;
    margin-left: 35px;
    z-index: 1;
    
  }
  
  .lineaImg2-expanded {
    width: 130px;
    height: auto;
    position: static;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 60px;
    transform: scale(1.1); /* Escala la imagen un poco al expandir */
    z-index: 1;
  }
  
  
  .cruzImg{
    width: 90px; /* Ajusta el ancho para que sea responsivo */
    height: 25px; /* Mantiene la proporción de la imagen */
    position: static;
    background-color: transparent;
    pointer-events: none;
    align-items: center;
  }
  
  .PuntoRojo{
    width: 45px; /* Ajusta el ancho para que sea responsivo */
    height: 45px; /* Mantiene la proporción de la imagen */
    position: relative;
    background-color: transparent;
    pointer-events: none;
    margin: auto;
    padding-bottom: 10px;
  
  }
  
  .lineaImg4{
    width: 84px;
    height: 84px;
  }
  
  .dropArea2 {
    width: 40px; /* Tamaño inicial */
    height: 40px;
    background-color: transparent;
    transition: width 0.3s ease, height 0.3s ease; /* Transición suave */
  }
  
  .dropArea2-expanded {
    width: 88px; /* Mismo tamaño que cuadro2-expanded */
    height: 92px;
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  .lineaDv{
    background-color: black;
    border: solid 0.5px black;
    width:120px;
    height: 1px;
  }

  .containerImg {
    position: relative; /* Permite que Draggable funcione correctamente */
    width: 100%; /* O cualquier tamaño que necesites */
    height: 100%; /* O cualquier tamaño que necesites */
  }
  
  /* Estilos base (puedes pegar tu EstilosCruz.css, tus .wrapper, etc.) */
  body {
    margin: 0;
    padding: 0;
    font-family: "Quando", sans-serif;
    background-color: #ffffff;
    color: #000;

  }

  .page-container {
    width: 100%;
    height: 100%;
    /* Ajusta si quieres forzar A4, etc. */
    position: relative;
    overflow: hidden;
        margin-top: 40px; /* Ajusta el valor de px según lo que necesites */

  }

  .header-section {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #1c1c1c;
    color: white;
    font-size: 18px;
  }

  .user-info {
    margin-left: 20px;
  }

  .images-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    position: relative;
  }

  .image-wrapper {
    // margin-top:15px;
    position: relative;
    width: 450px;  /* ajusta para tu gusto */
    height: 600px; /* ajusta para tu gusto */
    padding: 0px;
    //  border: 1px solid #ccc;
    // background-color:blue;
    
  }

  .base-image {
  padding:0px;
  position: absolute;
  width: 450px;
  height: 600px;
  object-fit: fill; /* o fill si prefieres deformar */
  z-index: 1;
  }

  /* Conclusiones (textarea) */
  .conclusion-box {
    margin: 10px auto;
    width: 80%;
    min-height: 110px;
    // border: 1px solid #333;
    font-size: 14px;
    text-align: justify;
  }


  /* Ejemplo: cruces */
  ${/* Pegamos tus .cruz1, .cruz2, etc. aquí: */''}
  ${/* Si lo deseas más compacto, ajusta top/left. */''}
    
/* Lumbar L1 lado Izquierdo (originalmente top: 47.8%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz97  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; left: 42%; }
.cruz98  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; left: 41.2%; }
.cruz99  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; left: 40.4%; }
.cruz100 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; left: 39.6%; }

/* Lumbar L2 lado Izquierdo (originalmente top: 51%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz49 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; left: 42%; }
.cruz50 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; left: 41.2%; }
.cruz51 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; left: 40.4%; }
.cruz52 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; left: 39.6%; }

/* Lumbar L3 lado Izquierdo (originalmente top: 54.5%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz57 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; left: 42%; }
.cruz58 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; left: 41.2%; }
.cruz59 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; left: 40.4%; }
.cruz60 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; left: 39.6%; }

/* Lumbar L4 lado Izquierdo (originalmente top: 57.8%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz65 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; left: 42%; }
.cruz66 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; left: 41.2%; }
.cruz67 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; left: 40.4%; }
.cruz68 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; left: 39.6%; }

/* Lumbar L5 lado Izquierdo (originalmente top: 61%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz73 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; left: 42%; }
.cruz74 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; left: 41.2%; }
.cruz75 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; left: 40.4%; }
.cruz76 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; left: 39.6%; }

/* Torácica S1 lado Izquierdo (originalmente top: 64.9%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz81 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; left: 42%; }
.cruz82 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; left: 41.2%; }
.cruz83 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; left: 40.4%; }
.cruz84 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; left: 39.6%; }

/* Torácica S2 lado Izquierdo (originalmente top: 68%; left: 41.5%, 40.5%, 39.5%, 38.8%) */
.cruz89 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; left: 42.5%; }
.cruz90 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; left: 41.5%; }
.cruz91 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; left: 40.5%; }
.cruz92 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; left: 39.6%; }


// lumbares

/* Lumbar L1 lado derecho (originalmente top: 47.8%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz101 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; right: 42%; }
.cruz102 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; right: 41.2%; }
.cruz103 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; right: 40.4%; }
.cruz104 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50%; right: 39.6%; }

/* Lumbar L2 lado derecho (originalmente top: 51%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz53 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; right: 42%; }
.cruz54 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; right: 41.2%; }
.cruz55 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; right: 40.4%; }
.cruz56 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 53.5%; right: 39.6%; }

/* Lumbar L3 lado derecho (originalmente top: 54.5%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz61 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; right: 42%; }
.cruz62 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; right: 41.2%; }
.cruz63 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; right: 40.4%; }
.cruz64 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57%; right: 39.6%; }

/* Lumbar L4 lado derecho (originalmente top: 57.8%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz69 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; right: 42%; }
.cruz70 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; right: 41.2%; }
.cruz71 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; right: 40.4%; }
.cruz72 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.3%; right: 39.6%; }

/* Lumbar L5 lado derecho (originalmente top: 61%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz77 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; right: 42%; }
.cruz78 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; right: 41.2%; }
.cruz79 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; right: 40.4%; }
.cruz80 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 63.5%; right: 39.6%; }

/* Torácica S1 lado derecho (originalmente top: 64.9%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz85 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; right: 42%; }
.cruz86 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; right: 41.2%; }
.cruz87 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; right: 40.4%; }
.cruz88 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.4%; right: 39.6%; }

/* Torácica S2 lado derecho (originalmente top: 68%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz93 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; right: 42%; }
.cruz94 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; right: 41.2%; }
.cruz95 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; right: 40.4%; }
.cruz96 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 70.5%; right: 39.6%; }

/* --- Izquierdas (Cervicales) ----------------------------------------------------------------- */

/* Cruz 1 a 4 izquierdo */
.cruz1 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; left: 42.3%; }
.cruz2 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; left: 41.5%; }
.cruz3 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; left: 40.7%; }
.cruz4 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; left: 40%; }

/* Cruz 9 a 12 izquierdo */
.cruz9  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; left: 42.3%; }
.cruz10 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; left: 41.5%; }
.cruz11 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; left: 40.7%; }
.cruz12 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; left: 40%; }

/* Cruz 17 a 20 izquierdo */
.cruz17 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; left: 42.3%; }
.cruz18 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; left: 41.5%; }
.cruz19 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; left: 40.7%; }
.cruz20 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; left: 40%; }

/* Cruz 25 a 28 izquierdo */
.cruz25 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; left: 42.3%; }
.cruz26 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; left: 41.5%; }
.cruz27 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; left: 40.7%; }
.cruz28 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; left: 40%; }

/* Cruz 33 a 36 izquierdo */
.cruz33 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; left: 42.3%; }
.cruz34 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; left: 41.5%; }
.cruz35 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; left: 40.7%; }
.cruz36 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; left: 40%; }

/* Cruz 41 a 44 izquierdo */
.cruz41 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; left: 42.3%; }
.cruz42 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; left: 41.5%; }
.cruz43 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; left: 40.7%; }
.cruz44 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; left: 40%; }

/* --- Derechas (Cervicales) --- */

/* Cruz 5 a 8 derecho */
.cruz5 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; right: 42.3%; }
.cruz6 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; right: 41.5%; }
.cruz7 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; right: 40.7%; }
.cruz8 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 3.2%; right: 40%; }

/* Cruz 13 a 16 derecho */
.cruz13 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; right: 42.3%; }
.cruz14 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; right: 41.5%; }
.cruz15 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; right: 40.7%; }
.cruz16 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.4%; right: 40%; }

/* Cruz 21 a 24 derecho */
.cruz21 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; right: 42.3%; }
.cruz22 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; right: 41.5%; }
.cruz23 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; right: 40.7%; }
.cruz24 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.4%; right: 40%; }

/* Cruz 29 a 32 derecho */
.cruz29 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; right: 42.3%; }
.cruz30 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; right: 41.5%; }
.cruz31 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; right: 40.7%; }
.cruz32 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.4%; right: 40%; }

/* Cruz 37 a 40 derecho */
.cruz37 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; right: 42.3%; }
.cruz38 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; right: 41.5%; }
.cruz39 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; right: 40.7%; }
.cruz40 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.9%; right: 40%; }

/* Cruz 45 a 48 derecho */
.cruz45 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; right: 42.3%; }
.cruz46 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; right: 41.5%; }
.cruz47 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; right: 40.7%; }
.cruz48 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.6%; right: 40%; }




`;

  /**********************************************
   * E) Armado final del HTML
   **********************************************/
  const html = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
      <base href="${baseUrl}" />
    <style>
      ${embeddedCSS}
    </style>
    <title>Reporte de Radiculopatía</title>
  </head>
  <body>
  <!-- HEADER con datos del usuario -->
     <div 
  style="
    position: absolute;
    top: 20px;     /* Controlas la distancia desde el borde superior */
    left: 45px;   /* Controlas la distancia desde el borde izquierdo */
    color:black;  
    z-index: 999;
  "
>
  ${topLeftText}
</div>
${
  userData.imageUrl
    ? `<img class="user-logo" src="${userData.imageUrl}" alt="Logo Usuario" />`
    : ""
}
    <div class="page-container">
      <!-- Fila con las 2 imágenes (frontal y posterior) -->
      <div class="images-row">
        <!-- Imagen Frontal + Overlays -->
        <div class="image-wrapper">
          <img class="base-image" src="${baseFront}"  alt="Frontal" />
          ${overlayHtmlFront }
          ${droppedFrontHtml}
        

        </div>
        <!-- Imagen Posterior + Overlays -->
        <div class="image-wrapper">
          <img class="base-image" src="${baseBack}"  alt="Posterior" />
          ${overlayHtmlBack}
          ${droppedBackHtml}

          
        </div>
      </div>
      <!-- Cruces (checkboxes marcados) -->
  ${crossesHtml}
      <!-- Conclusiones -->
      <div class="conclusion-box">
        ${finalConclusion || ''}
      </div>
       <div class="user-data">
        ${
          userData.name
            ? `
              <div id="footerName">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Usuario"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                           1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                           0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>Dr. ${userData.name} ${userData.lastname ?? ""}</span>
              </div>
            `
            : ""
        }
        ${
          userData.email
            ? `
              <div id="footerEmail">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Email"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 
                           2v12c0 1.1.9 2 2 2h16c1.1 0 
                           2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
                           4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>${userData.email}</span>
              </div>
            `
            : ""
        }
        ${
          userData.especialidad
            ? `
              <div id="footerEspecialidad">
                <svg
                  version="1.1"
                  id="ICONOS"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 90 90"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-label="Especialidad"
                >
                  <path d="M45.12,61.02c0,0,0,
                           7.32-4.79,7.32h-8.68c-1.82,
                           0-3.29-1.47-3.29-3.29
                           c0,0-2.39-8.68-2.65-8.68l-2.88-1.21
                           c-1.57-0.66-2.31-2.46-1.66-4.03l4.8-9.65v-0.67
                           c0-11.9,9.65-21.55,21.55-21.55s21.55,9.65,21.55,21.55
                           c0,5.12-1.8,9.84-4.79,13.54v16.39"/>
                </svg>
                <span>${userData.especialidad}</span>
              </div>
            `
            : ""
        }
        ${
          userData.cedula
            ? `
              <div id="footerCedula">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Cédula"
                >
                  <path d="M20 2H4c-1.1 0-2 
                           .9-2 2v16c0 1.1.9 2 2 2h16c1.1 
                           0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 
                           2l-6 3.99L6 4h12z"/>
                </svg>
                <span>Cédula: ${userData.cedula}</span>
              </div>
            `
            : ""
        }
      </div>

    </div>
 


  </body>
  </html>
  `;
  return html;
}
/**
 * Handler principal para tu endpoint /api/pdf/generate-pdf/radiculopatia
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      finalConclusion = "",
      conclusiones = [],        // array {value, title}
      userData = {},
      droppedItems = [],
      topLeftText = "",
      checkedLeft = {},
      checkedRight = {},
    } = body;
    // Construir la cadena de "values" => c5_i, c5_d, lumbrosaca_multinivel, etc.
    const finalString = conclusiones.map((c) => c.value).join(" ");
    // Llamamos a buildHtml
    const html = buildHtml({
      finalConclusion,
      finalString,
      userData,
      droppedItems,
      topLeftText,
      checkedLeft,
      checkedRight,
    });
    // Generar PDF con puppeteer
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // 1) Carga tus assets públicos (para fuentes / imágenes externas)
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    
    await page.setViewport({
      width: 1200,   // A4 landscape width aproximado
      height: 600,  // A4 landscape height aproximado
      deviceScaleFactor: 1
    });
    
    // Seteamos el HTML
    await page.setContent(html, { waitUntil: 'networkidle0' });
    // Generar el PDF
    const pdf = await page.pdf({
      format: "A4",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      width: 1200,   // A4 landscape width aproximado
      height: 600,  // A4 landscape height aproximado
      scale: 1,
      landscape: true, 
    });
    
    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte.pdf',
      },
    });
  } catch (err) {
    console.error('Error generando PDF:', err);
    return NextResponse.json(
      { message: 'Error generando PDF' },
      { status: 500 },
    );
  }
}