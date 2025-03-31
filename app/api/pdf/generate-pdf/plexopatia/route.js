import puppeteerLib from "puppeteer";
import chromium from "@sparticuz/chromium";

const isDev = process.env.NODE_ENV !== "production";

// Ajusta el puerto si tu Next corre en otro (por ejemplo 3001)
const baseUrl = isDev
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_SITE_URL || "https://tudominio.com";

function buildHtml({
  finalConclusion, // texto visible (títulos, etc.)
  finalString,     // texto para detectar overlays
  userData,
  droppedItems,
  topLeftText,
}) {
  // 1) Tus reglas de superposición con /assets/... en lugar de baseUrl
  const overlayRules = [
  
    {
      expectedValue: 'pre_total', 
      image: {
        src: '/assets/PlexoImg/PLE_T superior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c5s', 
      image: {
        src: '/assets/PlexoImg/PLE_T superior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6s', 
      image: {
        src: '/assets/PlexoImg/PLE_T superior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7m',
      image: {
        src: '/assets/PlexoImg/PLE_T. Medio.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c8f',
      image: {
        src: '/assets/PlexoImg/PLE_T. inferior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1f',
      image: {
        src: '/assets/PlexoImg/PLE_T. inferior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'post_total',
      image: {
        src: '/assets/PlexoImg/PLE_T superior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'sup',
      image: {
        src: '/assets/PlexoImg/PLE_T superior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'medio',
      image: {
        src: '/assets/PlexoImg/PLE_T. Medio.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'inf',
      image: {
        src: '/assets/PlexoImg/PLE_T. inferior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'divi',
      image: {
        src: '/assets/PlexoImg/PLE_Cordon Posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'lateral',
      image: {
        src: '/assets/PlexoImg/PLE_Lateral.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'posterior',
      image: {
        src: '/assets/PlexoImg/PLE_Cordon Posterior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'medial',
      image: {
        src: '/assets/PlexoImg/PLE_Cordon Medial.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'salida',
      image: {
        src: '/assets/PlexoImg/PLE_T. Inferior.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'preganglionar_total',
      image: {
        src: '/assets/PlexoImg/PLE_P. Lumbosacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L2',
      image: {
        src: '/assets/PlexoImg/PLE_P. Lumbar.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L3',
      image: {
        src: '/assets/PlexoImg/PLE_P. Lumbar.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L4',
      image: {
        src: '/assets/PlexoImg/PLE_T. Lumbosacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L5',
      image: {
        src: '/assets/PlexoImg/PLE_T. Lumbosacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'S1',
      image: {
        src: '/assets/PlexoImg/PLE_P. Sacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'S2',
      image: {
        src: '/assets/PlexoImg/PLE_P. Sacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'postganglionar_total',
      image: {
        src: '/assets/PlexoImg/PLE_P. Lumbosacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'ilihipogastrico_e_ilinguinal',
      image: {
        src: '/assets/PlexoImg/NO_Ilioinguinal-genitofemoral.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'genitocrural_y_femorocutáneo_lateral',
      image: {
        src: '/assets/PlexoImg/NO_Femorocutáneo femoral.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_lumbar',
      image: {
        src: '/assets/PlexoImg/PLE_P. Lumbar.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_lumbosacro',
      image: {
        src: '/assets/PlexoImg/PLE_T. Lumbosacro.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_sacro',
      image: {
        src: '/assets/PlexoImg/PLE_P. Sacro.png',
        alt: 'Modelo',
      }
    },

    {
      expectedValue: 'plexo_pudendo',
      image: [
      {
        src: '/assets/PlexoImg/Plexo pudendo derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Plexo pudendo izquierdo.png',
        alt: 'Modelo',
      },
    ],
    },


    {
      expectedValue: 'pre_totald', 
      image: {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c5sd', 
      image: {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6sd', 
      image: {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7md',
      image: {
        src: '/assets/PlexoImg/Tronco medio derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c8fd',
      image: {
        src: '/assets/PlexoImg/Tronco inferior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1fd',
      image: {
        src: '/assets/PlexoImg/Tronco inferior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'post_totald',
      image: {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'supd',
      image: {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'mediod',
      image: {
        src: '/assets/PlexoImg/Tronco medio derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'infd',
      image: {
        src: '/assets/PlexoImg/Tronco inferior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'divid',
      image: {
        src: '/assets/PlexoImg/Cordon lateral derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'laterald',
      image: {
        src: '/assets/PlexoImg/Cordon lateral derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'posteriord',
      image: {
        src: '/assets/PlexoImg/Cordon posterior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'mediald',
      image: {
        src: '/assets/PlexoImg/Cordon medial derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'salidad',
      image: {
        src: '/assets/PlexoImg/Tronco inferior derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'preganglionar_totald',
      image: {
        src: '/assets/PlexoImg/Plexo lumbosacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L2d',
      image: {
        src: '/assets/PlexoImg/Plexo lumbar derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L3d',
      image: {
        src: '/assets/PlexoImg/Plexo lumbar derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L4d',
      image: {
        src: '/assets/PlexoImg/Tronco lumbosacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L5d',
      image: {
        src: '/assets/PlexoImg/Tronco lumbosacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'S1d',
      image: {
        src: '/assets/PlexoImg/Plexo sacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'S2d',
      image: {
        src: '/assets/PlexoImg/Plexo sacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'postganglionar_totald',
      image: {
        src: '/assets/PlexoImg/Plexo lumbosacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'ilihipogastrico_e_ilinguinald',
      image: {
        src: '/assets/PlexoImg/ILIOHIPOGASTRICO DERECHO.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'genitocrural_y_femorocutáneo_laterald',
      image: {
        src: '/assets/PlexoImg/FEMOROCUTANEO DERECHO.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_lumbard',
      image: {
        src: '/assets/PlexoImg/Plexo lumbar derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_lumbosacrod',
      image: {
        src: '/assets/PlexoImg/Tronco lumbosacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_sacrod',
      image: {
        src: '/assets/PlexoImg/Plexo sacro derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_pudendod',
      image: {
        src: '/assets/PlexoImg/Plexo pudendo derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'pre_totali', 
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c5si', 
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c6si', 
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c7mi',
      image: {
        src: '/assets/PlexoImg/Tronco medio izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'c8fi',
      image: {
        src: '/assets/PlexoImg/Tronco inferior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 't1fi',
      image: {
        src: '/assets/PlexoImg/Tronco inferior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'post_totali',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'supi',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'medioi',
      image: {
        src: '/assets/PlexoImg/Tronco medio izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'infi',
      image: {
        src: '/assets/PlexoImg/Tronco inferior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'divii',
      image: {
        src: '/assets/PlexoImg/Cordon lateral izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'laterali',
      image: {
        src: '/assets/PlexoImg/Cordon lateral izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'posteriori',
      image: {
        src: '/assets/PlexoImg/Cordon posterior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'mediali',
      image: {
        src: '/assets/PlexoImg/Cordon medial izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'salidai',
      image: {
        src: '/assets/PlexoImg/Tronco inferior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'preganglionar_totali',
      image: {
        src: '/assets/PlexoImg/Plexo lumbosacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L2i',
      image: {
        src: '/assets/PlexoImg/Plexo lumbar izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L3i',
      image: {
        src: '/assets/PlexoImg/Plexo lumbar izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L4i',
      image: {
        src: '/assets/PlexoImg/Tronco lumbosacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'L5i',
      image: {
        src: '/assets/PlexoImg/Tronco lumbosacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'S1i',
      image: {
        src: '/assets/PlexoImg/Plexo sacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'S2i',
      image: {
        src: '/assets/PlexoImg/Plexo sacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'postganglionar_totali',
      image: {
        src: '/assets/PlexoImg/Plexo lumbosacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'ilihipogastrico_e_ilinguinali',
      image: {
        src: '/assets/PlexoImg/ILIOHIPOGASTRICO IZQUIERDO.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'genitocrural_y_femorocutáneo_laterali',
      image: {
        src: '/assets/PlexoImg/FEMOROCUTANEO IZQUIERDO.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_lumbari',
      image: {
        src: '/assets/PlexoImg/Plexo lumbar izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_lumbosacroi',
      image: {
        src: '/assets/PlexoImg/Tronco lumbosacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_sacroi',
      image: {
        src: '/assets/PlexoImg/Plexo sacro izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'plexo_pudendoi',
      image: {
        src: '/assets/PlexoImg/Plexo pudendo izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'uid',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'mid',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'umd',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'umid',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'uii',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'mii',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'umi',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'umii',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'ui',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'mi',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'um',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'umi',
      image: {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'izquierda_C',
      image: {
        src: '/assets/PlexoImg/Plexo cervical izquierdo.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'derecha_C',
      image: {
        src: '/assets/PlexoImg/Plexo cervical derecho.png',
        alt: 'Modelo',
      }
    },
    {
      expectedValue: 'bilateral_C',
      image: {
        src: '/assets/PlexoImg/PLEXO CERVICAL BILATERAL.png',
        alt: 'Modelo',
      }
    },

    {
      expectedValue: 'troncosD',
      image: [
      {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco medio derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco inferior derecho.png',
        alt: 'Modelo',
      }
    ],
    },

    {
      expectedValue: 'troncosI',
      image: [
      {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco medio izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco inferior izquierdo.png',
        alt: 'Modelo',
      }
    ],
    },

    {
      expectedValue: 'troncosB',
      image: [
      {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco medio derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco inferior derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco medio izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco inferior izquierdo.png',
        alt: 'Modelo',
      }
    ],
    },


    {
      expectedValue: 'CordonI',
      image: [
      {
        src: '/assets/PlexoImg/Cordon lateral izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon posterior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon medial izquierdo.png',
        alt: 'Modelo',
      }
    ],
    },
    
    {
      expectedValue: 'CordonD',
      image: [
      {
        src: '/assets/PlexoImg/Cordon lateral derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon posterior derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon medial derecho.png',
        alt: 'Modelo',
      }
    ],
    },

    {
      expectedValue: 'CordonB',
      image: [
      {
        src: '/assets/PlexoImg/Cordon lateral derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon posterior derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon medial derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon lateral izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon posterior izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Cordon medial izquierdo.png',
        alt: 'Modelo',
      }
    ],
    },

    
    {
      expectedValue: 'pre_totalN',
      image: [
      {
        src: '/assets/PlexoImg/PLE_T superior.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco superior derecho.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Tronco superior izquierdo.png',
        alt: 'Modelo',
      }
    ],
    },

    {
      expectedValue: 'pre_Sacroi',
      image: [
      {
        src: '/assets/PlexoImg/Tronco lumbosacro izquierdo.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/PlexoImg/Plexo pudendo izquierdo.png',
        alt: 'Modelo',
      },
    ],
    },
  ];

  // 2) Buscamos coincidencias con finalString
  const matchedImages = [];
  const conclusionLower = finalString.toLowerCase();

  for (const rule of overlayRules) {
    if (conclusionLower.includes(rule.expectedValue.toLowerCase())) {
      if (Array.isArray(rule.image)) {
        matchedImages.push(...rule.image);
      } else {
        matchedImages.push(rule.image);
      }
    }
  }

  // 3) Generar HTML de las imágenes superpuestas
  const overlayHtml = matchedImages
    .map(
      (img) => `
      <img
        src="${img.src}"
        alt="${img.alt}"
        style="
          position:absolute;
          top:0;
          left:0;
          width:600px;
          height:776px;
          object-fit:contain;"
      />
    `
    )
    .join("");

  // CSS embebido
   // CSS embebido (tu DinamicImagesMenu, etc.)
   const menuCss = `
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
    z-index: 2;
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
  `;


  return `
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reporte</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: transparent;
      }
      .container {
        width: 700px;
        height: 800px;
        margin: 10px auto;
        position: relative;
        align-items: center;
      }
      .user-logo {
        position: absolute;
        top: 10px;
        right: 20px;
        width: 60px;
        height: 60px;
        opacity: 50%;
        border-radius: 0%;
        object-fit: cover;
      }
      .paciente-name {
        margin-top: 54px;
        margin-left: 100px;
      }
      .image-container {
        position: relative;
      }
      .image-stack {
        position: relative;
        width: 600px;
        height: 776px;
        margin: 0 auto;
      }
      .image-stack img {
        position: absolute;
        left: 0; 
        top: 0;
        width: 600px;
        height: 776px;
        object-fit: contain;
      }
      #conclusionDiv {
        margin-top: 2px;
        padding: 12px;
        font-size: 14px;
        line-height: 1.4;
        text-align: justify;
      }
      .user-data {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        font-size: 10px;
        opacity: 50%;
        margin-top: 110px;
        align-items: center;
        justify-content: center;
      }
      .user-data svg {
        margin-right: 4px;
      }
      .user-data > div {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      /* Inyectamos el CSS extra */
      ${menuCss}
    </style>
  </head>
  <body>
    ${
      userData.imageUrl
        ? `<img class="user-logo" src="${userData.imageUrl}" alt="Logo Usuario" />`
        : ""
    }
    <div class="paciente-name">
      ${topLeftText ?? ""}
    </div>
    <div class="container">
      <!-- droppedItems con posicion:absolute -->
      <div class="image-container">
        ${droppedItems
          .map(
            (item) => `
              <div
                style="
                  position: absolute;
                  left: ${item.x + 43}px;
                  top: ${item.y - 10}px;
                "
              >
                ${item.content}
              </div>
            `
          )
          .join("")}
      </div>
      <!-- Bloque "image-stack" con la imagen base y overlays -->
      <div class="image-stack">
        <img src="/assets/PlexoImg/BP_Plexopatia.png" alt="Imagen Base" />
        ${overlayHtml}
      </div>
      <div id="conclusionDiv">
        ${finalConclusion}
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
                <span>${userData.name} ${userData.lastname ?? ""}</span>
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
}

// Aquí el endpoint que genera el PDF
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      finalConclusion = "", // texto visible
      conclusiones = [],    // array con { title, value }
      userData = {},
      droppedItems = [],
      topLeftText = "",
    } = body;

    const isDev = process.env.NODE_ENV !== "production";
    const puppeteer = isDev ? puppeteerLib : require("puppeteer-core");
    const executablePath = isDev ? undefined : await chromium.executablePath;

    const browser = await puppeteer.launch({
      args: isDev ? [] : chromium.args,
      defaultViewport: isDev ? undefined : chromium.defaultViewport,
      executablePath,
      headless: true,
    });

    // Armamos la cadena final con value
    const finalString = conclusiones.map((cl) => cl.value).join(" ");
    const page = await browser.newPage();

    // Función para sanitizar (opcional)
    const sanitizeText = (text) => {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const sanitizedFinalConclusion = sanitizeText(finalConclusion);
    const sanitizedFinalString = sanitizeText(finalString);

    // Construimos el HTML
    const html = buildHtml({
      finalConclusion: sanitizedFinalConclusion,
      finalString: sanitizedFinalString,
      userData,
      droppedItems,
      topLeftText,
    });

    // 1) Entramos a tu sitio para que /assets/... se sirva
    await page.goto(baseUrl, { waitUntil: "networkidle2" });

    // 2) Luego inyectamos el HTML
    await page.setContent(html, { waitUntil: "networkidle2" });

    // 3) Generamos PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 1,
    });

    await browser.close();

    // Respondemos con el PDF
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="reporte.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generando PDF:", error);
    return new Response("Error generando PDF: " + error.message, {
      status: 500,
    });
  }
}
