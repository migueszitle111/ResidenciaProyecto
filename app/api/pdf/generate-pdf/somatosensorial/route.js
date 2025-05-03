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


function buildHtml({
  finalConclusion, // texto visible (títulos, etc.)
  finalString = "", // <-- valor por defecto para que no sea undefined
  userData,
  droppedItems,
  topLeftText,
}) 

{
  
// Chequeo de trigémino (usando finalString)
const defaultImage1 = "/assets/MioImg/MO_BASE_BLANCO_MOTORES.png";
const newImage1     = "/assets/MioImg/Base_Cerebro.png";

// Si finalString contiene la palabra "trigemino", ponemos newImage1
const isTrigeminoSelected = finalString.includes("trigemino");
const imageSrc1 = isTrigeminoSelected ? newImage1 : defaultImage1;

  // 1) Tus reglas de superposición con /assets/... en lugar de baseUrl
  const overlayRules = [
    {
      expectedValue: 'superior_derecho', 
     
        image: 
          {
            src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
            alt: 'Modelo',
          },
    },
    {
      expectedValue: 'superior_izquierdo', 
     
        image: 
          {
            src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
            alt: 'Modelo',
          },
    },

    {
      expectedValue: 'superior_bilateral', 
     
        image: [
          {
            src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
            alt: 'Modelo',
          },
          {
            src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
            alt: 'Modelo',
          }
        ]
    },
   


    {
      expectedValue: 'superior_bilateralindemne', 
     
        image: [
          {
            src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
            alt: 'Modelo',
          },
          {
            src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
            alt: 'Modelo',
          }
        ]
    },

    {
      expectedValue: 'superior_derechoindemne', 
     
        image: [
         
          {
            src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
            alt: 'Modelo',
          }
        ]
    },
    {
      expectedValue: 'superior_izquierdoindemne', 
     
        image: 
          {
            src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
            alt: 'Modelo',
          },
         
        
    },

               /*indemne*/
///////////////////////////c4di
{
expectedValue: 'bilateralc4di', 

image: [
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc4di',  
image: [
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc4di', 

image: 
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},

},
////////////////////////////////c5di
{
expectedValue: 'bilateralc5di', 

image: [
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc5di',  
image: [
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc5di', 

image: 
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},

},
///////////////////////////////////c6di
{
expectedValue: 'bilateralc6di', 

image: [
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc6di',  
image: [
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc6di', 

image: 
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},

},
////////////////////////////////////////////////////////////
{
expectedValue: 'bilateralc7di', 

image: [
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc7di',  
image: [
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc7di', 

image: 
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},

},
///////////////////////////////////////////c8di

{
expectedValue: 'bilateralc8di', 

image: [
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc8di',  
image: [
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc8di', 

image: 
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t1di
{
expectedValue: 'bilateralt1di', 

image: [
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot1di',  
image: [
{
src: '/assets/SomatosensorialImg/SUPERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot1di', 

image: 
{
src: '/assets/SomatosensorialImg/SUPERIORDERECHA.png',
alt: 'Modelo',
}, 
},
//////////////////////////////////////////////t2di
{
expectedValue: 'derechot2di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot2di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt2di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t3di
{
expectedValue: 'derechot3di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot3di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt3di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t4di
{
expectedValue: 'derechot4di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot4di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt4di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t5di
{
expectedValue: 'derechot5di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot5di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt5di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t6di
{
expectedValue: 'derechot6di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot6di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt6di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t7di
{
expectedValue: 'derechot7di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot7di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt7di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},

//////////////////////////////////////////////t8di
{
expectedValue: 'derechot8di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot8di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt8di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},

//////////////////////////////////////////////t9di
{
expectedValue: 'derechot9di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot9di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt9di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t10di
{
expectedValue: 'derechot10di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot10di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt10di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t11di
{
expectedValue: 'derechot11di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot11di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt11di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////t12di
{
expectedValue: 'derechot12di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdot12di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateralt12di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////l1di
{
expectedValue: 'derechotl1di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdol1di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterall1di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////l2di
{
expectedValue: 'derechol2di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdol2di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterall2di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////l3di
{
expectedValue: 'derechol3di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdol3di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterall3di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
////////////////////////////////////////////////l4di
{
expectedValue: 'derechol4di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdol4di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterall4di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
}, 
//////////////////////////////////////////////l5di
{
expectedValue: 'derechol5di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdol5di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterall5di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
//////////////////////////////////////////////s1di
{
expectedValue: 'derechos1di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdos1di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterals1di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},
/////////////////////////////////////////////////////////s2di
{
expectedValue: 'derechos2di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdos2di', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilaterals2di', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},


//alteradasdermatomas
/////////////////////////////////////////////////////////////////////////////c4da


{
expectedValue: 'derecho_der', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'izquierdo_der', 

image: 
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
},
{
expectedValue: 'bilateral_der', 

image: [
{
src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
alt: 'Modelo',
}
]
},






{
expectedValue: 'bilateralc4da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc4da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc4da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
},

},
////////////////////////////////c5da
{
expectedValue: 'bilateralc5da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc5da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc5da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
},

},
///////////////////////////////////c6da

{
expectedValue: 'bilateralc6da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc6da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc6da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
},

},
///////////////////////////////////////////////c7da
{
expectedValue: 'bilateralc7da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc7da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc7da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
},

},

////////////////////////////////////////////c8da
{
expectedValue: 'bilateralc8da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechoc8da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdoc8da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t1da
{
expectedValue: 'bilateralt1da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot1da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdasuperior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot1da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechasuperior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t2da
{
expectedValue: 'bilateralt2da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot2da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot2da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
///////////////////////////////////////////////t3da
{
expectedValue: 'bilateralt3da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot3da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot3da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t4da
{
expectedValue: 'bilateralt4da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot4da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot4da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t5da
{
expectedValue: 'bilateralt5da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot5da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot5da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t6da
{
expectedValue: 'bilateralt6da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot6da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot6da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t7da
{
expectedValue: 'bilateralt7da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot7da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot7da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t8da
{
expectedValue: 'bilateralt8da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot8da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot8da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
///////////////////////////////////////////////t9da
{
expectedValue: 'bilateralt9da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot9da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot9da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t10da
{
expectedValue: 'bilateralt10da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot10da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot10da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t11da
{
expectedValue: 'bilateralt11da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot11da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot11da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////t12da
{
expectedValue: 'bilateralt12da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechot12da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdot12da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////l1da
{
expectedValue: 'bilaterall1da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechol1da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdol1da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
///////////////////////////////////////////////l2da
{
expectedValue: 'bilaterall2da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechol2da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdol2da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////l3da
{
expectedValue: 'bilaterall3da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechol3da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdol3da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////l4da
{
expectedValue: 'bilaterall4da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechol4da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdol4da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},
},
//////////////////////////////////////////////l5da
{
expectedValue: 'bilaterall5da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechol5da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdol5da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}, 
},
//////////////////////////////////////////////s1da
{
expectedValue: 'bilaterals1da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechos1da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdos1da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},

},
//////////////////////////////////////////////s2da
{
expectedValue: 'bilaterals2da', 

image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'derechos2da',  
image: [
{
src: '/assets/SomatosensorialImg/Vía Afectada/alteradaizquierdainferior.png',
alt: 'Modelo',
}
]
},
{
expectedValue: 'izquierdos2da', 

image: 
{
src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/alteradaderechainferior.png',
alt: 'Modelo',
},
},
    //inferiores
    {
      expectedValue: 'inferior_derecho', 
     
        image: 
          {
            src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
            alt: 'Modelo',
          },
    },
    {
      expectedValue: 'inferior_izquierdo', 
     
        image: 
          {
            src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
            alt: 'Modelo',
          },
    },

    {
      expectedValue: 'inferior_bilateral', 
     
        image: [
          {
            src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
            alt: 'Modelo',
          },
          {
            src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
            alt: 'Modelo',
          }
        ]
    },
    {
      expectedValue: 'inferior_bilateralindemne', 
     
        image: [
          {
            src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
            alt: 'Modelo',
          },
          {
            src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
            alt: 'Modelo',
          }
        ]
    },

    {
      expectedValue: 'inferior_derechoindemne', 
     
        image: 
          
          {
            src: '/assets/SomatosensorialImg/INFERIORIZQUIERDA.png',
            alt: 'Modelo',
          }
        
    },
    {
      expectedValue: 'inferior_izquierdoindemne', 
     
        image: 
          {
            src: '/assets/SomatosensorialImg/INFERIORDERECHA.png',
            alt: 'Modelo',
          }
        
        
    },
//trigemino
{
expectedValue: 'derecho_trigeminoindemne',  

image: 
[

{

src: '/assets/MioImg/Base_Cerebro.png',
alt: 'Modelo',
},
{

src: '/assets/SomatosensorialImg/TRI_1.png',
alt: 'Modelo',
},

]
},

{
expectedValue: "izquierdo_trigeminoindemne",  

image: 
[
{
src: '/assets/MioImg/Base_Cerebro.png',
alt: 'Modelo',

},
{
src: '/assets/SomatosensorialImg/TRI_2.png',
alt: 'Modelo',
}

]
},

{
expectedValue: 'bilateral_trigeminoindemne', 
image: [
{
src: '/assets/MioImg/Base_Cerebro.png',
alt: 'Modelo',
},
{
src: '/assets/SomatosensorialImg/imagen_combinadaTRI.png',
alt: 'Modelo',
}
],
},
    {
      expectedValue: 'derecho_trigemino',  
     
        image: 
        [
    
          {
            
            src: '/assets/MioImg/Base_Cerebro.png',
            alt: 'Modelo',
          },
          {
            
            src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/TR_1.png',
            alt: 'Modelo',
          },
        
        ]
    },

    {
      expectedValue: "izquierdo_trigemino",  
     
        image: 
        [
           {
          src: '/assets/MioImg/Base_Cerebro.png',
          alt: 'Modelo',

           },
          {
            src: '/assets/SomatosensorialImg/Vía Afectada/TR_2.png',
            alt: 'Modelo',
          }
        
       ]
    },

    {
      expectedValue: 'bilateral_trigemino', 
      image: [
      {
        src: '/assets/MioImg/Base_Cerebro.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/imagen_combinadaTRI.png',
        alt: 'Modelo',
      }
    ],
    },

    {
      expectedValue: 'trigemino',  
     
        image: 
          {
            src: '/assets/MioImg/Base_Cerebro.png',
            alt: 'Modelo',
          },

        
        
       
    },

    /*cortical superior*/
    {
      expectedValue: 'izquierdocorticals', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CORTICAL D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechocorticals', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SUPERIOR CORTICAL I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralcorticals', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CORTICAL D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SUPERIOR CORTICAL I.png',
        alt: 'Modelo',
      }
    ],
    },
     /*subcortical superior*/
     {
      expectedValue: 'izquierdosubcorticals', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR SUBCORTICAL D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechosubcorticals', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SUPERIOR SUBCORTICAL I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralsubcorticals', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR SUBCORTICAL D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SUPERIOR SUBCORTICAL I.png',
        alt: 'Modelo',
      }
    ],
    },
     /*cervical superior*/
     {
      expectedValue: 'izquierdocervicals', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CERVICAL D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechocervicals', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SUPERIOR CERVICAL I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralcervicals', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SUPERIOR CERVICAL D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SUPERIOR CERVICAL I.png',
        alt: 'Modelo',
      }
    ],
    },
     /*periferico superior*/
     {
      expectedValue: 'izquierdoperifericos', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_6-D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechoperifericos', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SO_R_6.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralperifericos', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_6-D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SO_R_6.png',
        alt: 'Modelo',
      }
    ],
    },

    /*cortical inferior*/
    {
      expectedValue: 'izquierdocorticali', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR CORTICAL D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechocorticali', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR CORTICAL I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralcorticali', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR CORTICAL D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR CORTICAL I.png',
        alt: 'Modelo',
      }
    ],
    },
    /*subcortical inferior*/
    {
      expectedValue: 'izquierdosubcorticali', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR SUBCORTICAL D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechosubcorticali', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR SUBCORTICAL I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralsubcorticali', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR SUBCORTICAL D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR SUBCORTICAL I.png',
        alt: 'Modelo',
      }
    ],
    },

    /*cervical inferior*/


    /*toracico inferior*/
    {
      expectedValue: 'izquierdotoracicoi', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR TORACICO D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechotoracicoi', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR TORACICO I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateraltoracicoi', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR TORACICO D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR TORACICO I.png',
        alt: 'Modelo',
      }
    ],
    },

    /*lumbosacro inferior*/
    {
      expectedValue: 'izquierdolumbosacroi', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR LUMBAR D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derecholumbosacroi', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR LUMBAR I.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilaterallumbosacroi', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/INFERIOR LUMBAR D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/INFERIOR LUMBAR I.png',
        alt: 'Modelo',
      }
    ],
    },

    /*periferico inferior*/

    {
      expectedValue: 'izquierdoperifericoi', 
      image: 
        {
          src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_1-D.png',
          alt: 'Modelo',
        },
    },

    {
      expectedValue: 'derechoperifericoi', 
      image: 
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SO_R_1.png',
        alt: 'Modelo',
      }
      
    },
    {
      expectedValue: 'bilateralperifericoi', 
      image: [
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/Vía Derecha/SO_R_1-D.png',
        alt: 'Modelo',
      },
      {
        src: '/assets/SomatosensorialImg/Vía Afectada/SO_R_1.png',
        alt: 'Modelo',
      }
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
         <!-- Aquí se muestra la imagen base según trigemino o no: -->
        <img src="${imageSrc1}" alt="Imagen Base" />
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

    const browser = await launchBrowser();
    const page = await browser.newPage();

    // 1) Carga tus assets públicos (para fuentes / imágenes externas)
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    
    // Armamos la cadena final con value
    const finalString = conclusiones.map((cl) => cl.value).join(" ");

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

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // 3) Genera el PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 1,
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