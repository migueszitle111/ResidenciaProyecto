import puppeteerLib from "puppeteer";
import chromium from "@sparticuz/chromium";

const isDev = process.env.NODE_ENV !== "production";
const baseUrl = isDev
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_SITE_URL || "https://tudominio.com";
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
      expectedValue: 'lumbrosaca_multinivel', 
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
      expectedValue: 'lumbrosaca_multinivel', 
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
  ];
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
            height: 550px; /* ajusta para tu gusto */
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
    //   width: 20px;
    // height: 20px;
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
    // width: 70px;
    // height: 10px;
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
    // width: 210px;
    // height: 90px;
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
    z-index: 2;
  }
  .cuadro2-expanded {
    width: 98px;
    height: 92px;
    //  width: 68px;
    // height: 62px;
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
    //  width: 68px;
    // height: 62px;
    margin-top:  15px;
    margin-bottom: 15px;
    margin-left: 10px;
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
    // width: 210px;
    // height: 90px;
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
    //  width: 68px;
    // height: 62px;
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
    //  width: 68px;
    // height: 62px;
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
    width: 100px; /* Ajusta el ancho para que sea responsivo */
    height: 40px; /* Mantiene la proporción de la imagen */
    transition: transform 0.3s ease; /* Añade una transición suave para efectos */
    position: static;
    background-color: transparent;
    pointer-events: none;
    margin-top: 5px;
    z-index: 1;
    
  }
  
  .lineaImg-expanded {
    // width: 130px;
    width:100px;
    height: auto;
    position: static;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 55px;
    transform: scale(1.1); /* Escala la imagen un poco al expandir */
    z-index: 1;
  }
  
  .lineaImg2{
    width: 100px; /* Ajusta el ancho para que sea responsivo */
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
     // width: 130px;
    width:100px;
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
    // width: 40px; 
    // height: 40px;
     width: 10px; /* Tamaño inicial */
    height: 10px;
    background-color: transparent;
    transition: width 0.3s ease, height 0.3s ease; /* Transición suave */
      display: flex;              /* Para centrar en ambos ejes */
  align-items: center;
  justify-content: center;
  overflow: hidden;           /* Recorta cualquier exceso */
  }
  
  .dropArea2-expanded {
    //width: 88px; 
    //height: 92px;
    width: 68px;
    height: 62px;
    transition: width 0.3s ease, height 0.3s ease;
     max-width: 100%;    /* Que la imagen nunca sobrepase la dropArea */
  max-height: 100%;
  object-fit: contain; /* Ajuste sin deformar */
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
    margin-top: 10px;
    position: relative;
  }

  .image-wrapper {
    margin-top:15px;
    position: relative;
    width: 450px;  /* ajusta para tu gusto */
    height: 550px; /* ajusta para tu gusto */
    overflow: hidden;
    padding: 0px;
    // border: 1px solid #ccc;
    // background-color:blue;
  }

  .base-image {
  padding:0px;
  position: absolute;
  width: 450px;
  height: 550px;
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
    
// /* Cruz 1 a 4 izquierdo (originalmente top: 4.5%; left: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz1 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; left: 42.3%; }
// .cruz2 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; left: 41.5%; }
// .cruz3 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; left: 40.7%; }
// .cruz4 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; left: 40%; }

// /* Cruz 9 a 12 izquierdo (originalmente top: 6.3%; left: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz9  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; left: 42.3%; }
// .cruz10 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; left: 41.5%; }
// .cruz11 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; left: 40.7%; }
// .cruz12 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; left: 40%; }

// /* Cruz 17 a 20 izquierdo (originalmente top: 8%; left: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz17 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; left: 42.3%; }
// .cruz18 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; left: 41.5%; }
// .cruz19 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; left: 40.7%; }
// .cruz20 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; left: 40%; }

// /* Cruz 25 a 28 izquierdo (originalmente top: 9.8%; left: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz25 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; left: 42.3%; }
// .cruz26 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; left: 41.5%; }
// .cruz27 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; left: 40.7%; }
// .cruz28 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; left: 40%; }

// /* Cruz 33 a 36 izquierdo (originalmente top: 12.2%; left: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz33 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; left: 42.3%; }
// .cruz34 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; left: 41.5%; }
// .cruz35 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; left: 40.7%; }
// .cruz36 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; left: 40%; }

// /* Cruz 41 a 44 izquierdo (originalmente top: 14.5%; left: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz41 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; left: 42.3%; }
// .cruz42 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; left: 41.5%; }
// .cruz43 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; left: 40.7%; }
// .cruz44 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; left: 40%; }

/* Lumbar L1 lado Izquierdo (originalmente top: 47.8%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz97  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; left: 42%; }
.cruz98  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; left: 41.2%; }
.cruz99  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; left: 40.4%; }
.cruz100 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; left: 39.6%; }

/* Lumbar L2 lado Izquierdo (originalmente top: 51%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz49 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; left: 42%; }
.cruz50 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; left: 41.2%; }
.cruz51 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; left: 40.4%; }
.cruz52 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; left: 39.6%; }

/* Lumbar L3 lado Izquierdo (originalmente top: 54.5%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz57 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; left: 42%; }
.cruz58 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; left: 41.2%; }
.cruz59 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; left: 40.4%; }
.cruz60 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; left: 39.6%; }

/* Lumbar L4 lado Izquierdo (originalmente top: 57.8%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz65 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; left: 42%; }
.cruz66 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; left: 41.2%; }
.cruz67 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; left: 40.4%; }
.cruz68 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; left: 39.6%; }

/* Lumbar L5 lado Izquierdo (originalmente top: 61%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz73 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; left: 42%; }
.cruz74 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; left: 41.2%; }
.cruz75 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; left: 40.4%; }
.cruz76 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; left: 39.6%; }

/* Torácica S1 lado Izquierdo (originalmente top: 64.9%; left: 41%, 40.2%, 39.4%, 38.6%) */
.cruz81 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; left: 42%; }
.cruz82 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; left: 41.2%; }
.cruz83 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; left: 40.4%; }
.cruz84 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; left: 39.6%; }

/* Torácica S2 lado Izquierdo (originalmente top: 68%; left: 41.5%, 40.5%, 39.5%, 38.8%) */
.cruz89 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; left: 42.5%; }
.cruz90 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; left: 41.5%; }
.cruz91 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; left: 40.5%; }
.cruz92 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; left: 39.8%; }
/* Cruz 5 a 8 derecho (originalmente top: 4.5%; right: 41.3%, 40.5%, 39.7%, 39%) */
.cruz5 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; right: 42.3%; }
.cruz6 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; right: 41.5%; }
.cruz7 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; right: 40.7%; }
.cruz8 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 4.0%; right: 40%; }

// /* Cruz 13 a 16 derecho (originalmente top: 6.3%; right: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz13 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; right: 42.3%; }
// .cruz14 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; right: 41.5%; }
// .cruz15 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; right: 40.7%; }
// .cruz16 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 5.8%; right: 40%; }

// /* Cruz 21 a 24 derecho (originalmente top: 8%; right: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz21 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; right: 42.3%; }
// .cruz22 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; right: 41.5%; }
// .cruz23 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; right: 40.7%; }
// .cruz24 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 7.5%; right: 40%; }

// /* Cruz 29 a 32 derecho (originalmente top: 9.8%; right: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz29 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; right: 42.3%; }
// .cruz30 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; right: 41.5%; }
// .cruz31 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; right: 40.7%; }
// .cruz32 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 9.3%; right: 40%; }

// /* Cruz 37 a 40 derecho (originalmente top: 12.2%; right: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz37 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; right: 42.3%; }
// .cruz38 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; right: 41.5%; }
// .cruz39 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; right: 40.7%; }
// .cruz40 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.7%; right: 40%; }

// /* Cruz 45 a 48 derecho (originalmente top: 14.5%; right: 41.3%, 40.5%, 39.7%, 39%) */
// .cruz45 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; right: 42.3%; }
// .cruz46 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; right: 41.5%; }
// .cruz47 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; right: 40.7%; }
// .cruz48 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14%; right: 40%; }

/* Lumbar L1 lado derecho (originalmente top: 47.8%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz101 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; right: 42%; }
.cruz102 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; right: 41.2%; }
.cruz103 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; right: 40.4%; }
.cruz104 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 47.3%; right: 39.6%; }

/* Lumbar L2 lado derecho (originalmente top: 51%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz53 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; right: 42%; }
.cruz54 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; right: 41.2%; }
.cruz55 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; right: 40.4%; }
.cruz56 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 50.5%; right: 39.6%; }

/* Lumbar L3 lado derecho (originalmente top: 54.5%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz61 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; right: 42%; }
.cruz62 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; right: 41.2%; }
.cruz63 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; right: 40.4%; }
.cruz64 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 54%; right: 39.6%; }

/* Lumbar L4 lado derecho (originalmente top: 57.8%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz69 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; right: 42%; }
.cruz70 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; right: 41.2%; }
.cruz71 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; right: 40.4%; }
.cruz72 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 57.3%; right: 39.6%; }

/* Lumbar L5 lado derecho (originalmente top: 61%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz77 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; right: 42%; }
.cruz78 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; right: 41.2%; }
.cruz79 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; right: 40.4%; }
.cruz80 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 60.5%; right: 39.6%; }

/* Torácica S1 lado derecho (originalmente top: 64.9%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz85 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; right: 42%; }
.cruz86 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; right: 41.2%; }
.cruz87 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; right: 40.4%; }
.cruz88 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 64.4%; right: 39.6%; }

/* Torácica S2 lado derecho (originalmente top: 68%; right: 41%, 40.2%, 39.4%, 38.6%) */
.cruz93 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; right: 42%; }
.cruz94 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; right: 41.2%; }
.cruz95 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; right: 40.4%; }
.cruz96 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 67.5%; right: 39.6%; }
/* --- Izquierdas (Cervicales) --- */

/* Cruz 1 a 4 izquierdo */
.cruz1 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; left: 42.3%; }
.cruz2 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; left: 41.5%; }
.cruz3 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; left: 40.7%; }
.cruz4 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; left: 40%; }

/* Cruz 9 a 12 izquierdo */
.cruz9  { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; left: 42.3%; }
.cruz10 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; left: 41.5%; }
.cruz11 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; left: 40.7%; }
.cruz12 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; left: 40%; }

/* Cruz 17 a 20 izquierdo */
.cruz17 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; left: 42.3%; }
.cruz18 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; left: 41.5%; }
.cruz19 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; left: 40.7%; }
.cruz20 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; left: 40%; }

/* Cruz 25 a 28 izquierdo */
.cruz25 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; left: 42.3%; }
.cruz26 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; left: 41.5%; }
.cruz27 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; left: 40.7%; }
.cruz28 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; left: 40%; }

/* Cruz 33 a 36 izquierdo */
.cruz33 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; left: 42.3%; }
.cruz34 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; left: 41.5%; }
.cruz35 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; left: 40.7%; }
.cruz36 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; left: 40%; }

/* Cruz 41 a 44 izquierdo */
.cruz41 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; left: 42.3%; }
.cruz42 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; left: 41.5%; }
.cruz43 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; left: 40.7%; }
.cruz44 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; left: 40%; }

/* --- Derechas (Cervicales) --- */

/* Cruz 5 a 8 derecho */
.cruz5 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; right: 42.3%; }
.cruz6 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; right: 41.5%; }
.cruz7 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; right: 40.7%; }
.cruz8 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 6.5%; right: 40%; }

/* Cruz 13 a 16 derecho */
.cruz13 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; right: 42.3%; }
.cruz14 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; right: 41.5%; }
.cruz15 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; right: 40.7%; }
.cruz16 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 8.3%; right: 40%; }

/* Cruz 21 a 24 derecho */
.cruz21 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; right: 42.3%; }
.cruz22 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; right: 41.5%; }
.cruz23 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; right: 40.7%; }
.cruz24 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 10.0%; right: 40%; }

/* Cruz 29 a 32 derecho */
.cruz29 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; right: 42.3%; }
.cruz30 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; right: 41.5%; }
.cruz31 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; right: 40.7%; }
.cruz32 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 11.8%; right: 40%; }

/* Cruz 37 a 40 derecho */
.cruz37 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; right: 42.3%; }
.cruz38 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; right: 41.5%; }
.cruz39 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; right: 40.7%; }
.cruz40 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 14.2%; right: 40%; }

/* Cruz 45 a 48 derecho */
.cruz45 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; right: 42.3%; }
.cruz46 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; right: 41.5%; }
.cruz47 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; right: 40.7%; }
.cruz48 { z-index: 3; position: absolute; width: 80px; height: 20px; top: 16.5%; right: 40%; }
`;
  /**********************************************
   * E) Armado final del HTML
   **********************************************/
  const html = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <style>
      ${embeddedCSS}
    </style>
    <title>Reporte de Radiculopatía</title>
  </head>
  <body>
    <div class="page-container">
      <!-- HEADER con datos del usuario -->
      <!-- Texto Superior Izquierdo (si aplica) -->
      ${
        topLeftText
          ? `<div style="position:absolute;  margin-top: 54px;
            margin-left: 100px; color:black;  z-index: 999;">${topLeftText}</div>`
          : ""
      }
      <!-- Fila con las 2 imágenes (frontal y posterior) -->
      <div class="images-row">
        <!-- Imagen Frontal + Overlays + Dropped Items -->
        <div class="image-wrapper">
          <img class="base-image" src="/assets/RadiculopatiaImg/Columna/RA_Columna_1_FondoB.png" alt="Frontal" />
          ${overlayHtmlFront }
          ${droppedItems
            .map(
              (item) => `
                <div
                  style="
                    position: absolute;
                  left: ${item.x+43}px;
                        top:  ${item.y-10}px;"
                    z-index: 998;

                 "
                >
                  ${item.content}
                </div>
                `
            )
            .join("")}
        </div>
        <!-- Imagen Posterior + Overlays + Dropped Items -->
        <div class="image-wrapper">
          <img class="base-image" src="/assets/RadiculopatiaImg/Columna/RA_Columna_2_FondoB.png" alt="Posterior" />
          ${overlayHtmlBack}
          // Para canvas2 (posterior), restamos el ancho del canvas1 (por ejemplo, 450px)
${droppedItems
  .map(
    (item) => `
      <div
        style="
          position: absolute;
          left: ${item.x - 647}px;
          top: ${item.y-10}px;
          z-index: 998;
        "
      >
        ${item.content}
      </div>
    `
  )
  .join("")}

        </div>
      </div>
      <!-- Cruces (checkboxes marcados) -->
      ${crossesHtml}
      <!-- Conclusiones -->
      <div class="conclusion-box">
        ${finalConclusion || ''}
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
    const puppeteer = isDev ? puppeteerLib : require("puppeteer-core");
    const executablePath = isDev ? undefined : await chromium.executablePath;
    const browser = await puppeteer.launch({
      args: isDev ? [] : chromium.args,
      defaultViewport: isDev ? undefined : chromium.defaultViewport,
      executablePath,
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle2" });
    // Seteamos el HTML
    await page.setContent(html, { waitUntil: "networkidle2" });
    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 1,
       landscape: true, 
    });
    await browser.close();
    // Retornar el PDF
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="reporte-radiculopatia.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generando PDF:", error);
    return new Response("Error generando PDF: " + error.message, { status: 500 });
  }
}
