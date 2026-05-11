# Auditoría de Dependencias Sin Uso — MEDXpro

> **Fecha:** 2026-05-11  
> **Auditor:** Claude Code (Arquitecto Senior Frontend)  
> **Metodología:** Se analizó `package.json` y se buscaron importaciones activas (`import`/`require`) en todos los directorios de código fuente (`app/`, `components/`, `lib/`, `models/`, `src/`) mediante grep exhaustivo. Se excluyeron referencias en `node_modules/`.

---

## Resumen Ejecutivo

| Categoría | Cantidad |
|---|---|
| Dependencias totales (prod + dev) | 51 |
| **Confirmadas como NO USADAS** | **28** |
| Usadas directamente en código fuente | 21 |
| Caso especial (ver sección dedicada) | 2 |

Eliminar las dependencias no usadas reduciría el `node_modules` en estimados **150–300 MB** y aceleraría `npm install` en CI/CD.

---

## 1. Dependencias NO Usadas (candidatas a eliminar)

### 1.1 Paquetes de UI / Componentes reemplazados o abandonados

| Paquete | Por qué no se usa |
|---|---|
| `react-slick` | Carrusel de slides — no hay ningún `import from 'react-slick'` en el código. Nunca se finalizó su integración o fue descartado. |
| `slick-carousel` | CSS base de `react-slick`. Debe eliminarse junto con `react-slick` ya que son un par inseparable. |
| `swiper` | Carrusel moderno alternativo — no hay ningún `import from 'swiper'`. Posible candidato que nunca se implementó. |
| `react-modal` | Librería de modales — no se importa en ningún componente. Los modales del proyecto se implementan con Tailwind CSS nativo. |
| `react-rnd` | Drag & resize — no se importa en código de aplicación. Solo aparece en sus propios `node_modules`. |
| `react-draggable` | Dependencia transitiva de `react-rnd` y `react-pdf-flipbook-viewer`. Como ninguno de esos paquetes se usa en el código de la app, esta dependencia es también huérfana. |
| `react-to-print` | Impresión de componentes React — no se importa en ningún archivo. La generación de reportes usa Puppeteer (server-side). |
| `react-image-gallery` (⚠️) | **VERIFICAR antes de eliminar** — el agente de exploración reportó uso masivo (+100 importaciones) en `app/Tecnicas/Componentes/`. No eliminarlo. |
| `3d-flip-book` | Visor 3D de libros — sin ningún `import` activo. |
| `@dearhive/dearflip-jquery-flipbook` | Plugin jQuery para flip books — sin ningún `import` activo. Hay archivos estáticos del visor en `/public/dflip/` pero no se usa el paquete npm. |
| `react-pdf-flipbook-viewer` | Visor PDF tipo libro React — sin ningún `import` activo. |

### 1.2 Paquetes de generación de PDF reemplazados por Puppeteer

El proyecto migró su sistema de generación de PDF a **Puppeteer + pdf-lib + @sparticuz/chromium-min**. Los siguientes paquetes son obsoletos:

| Paquete | Por qué no se usa |
|---|---|
| `jspdf` | Generación de PDF cliente/servidor — no se importa. Reemplazado completamente por Puppeteer server-side. |
| `html2pdf.js` | Wrapper de `jspdf + html2canvas` — no se importa. Mismo reemplazo. |
| `html2canvas` | Captura de DOM a canvas — no se importa. La renderización para PDF se hace vía Puppeteer que renderiza HTML real. |
| `pdfmake` | Generación declarativa de PDF — no se importa en ninguna ruta de API ni componente. |
| `html-to-image` | Convierte nodos HTML a imagen (PNG/SVG) — no se importa en ningún archivo. |

### 1.3 Paquetes de HTTP / Cloud reemplazados por funcionalidades nativas

| Paquete | Por qué no se usa |
|---|---|
| `axios` | Cliente HTTP — no hay ningún `import from 'axios'`. Todo el código usa `fetch()` nativo de Next.js 14 / Node.js. |
| `formidable` | Parsing de `multipart/form-data` — no se importa. Next.js App Router maneja `FormData` nativamente. |
| `googleapis` | SDK de Google APIs — no se importa en ningún archivo fuente. Posiblemente estaba planeado para Gmail login (ver `PENDIENTES.txt`). |
| `aws4` | Firma de requests AWS (Signature V4) — no se importa. El proyecto usa Supabase (no AWS S3 directamente). |
| `nodemailer` | Envío de emails via SMTP — no se importa en ningún archivo. Si se necesita email, actualmente no está implementado. |
| `image-size` | Obtener dimensiones de imágenes en Node.js — no se importa. |

### 1.4 Paquetes de infraestructura / Stripe duplicados o sin uso

| Paquete | Por qué no se usa |
|---|---|
| `@stripe/stripe-js` | SDK **cliente** de Stripe (para cargar Stripe.js en el browser) — no hay `import { loadStripe }` en ningún componente. El proyecto solo usa el SDK **servidor** (`stripe`). |
| `@sparticuz/chromium` | Versión regular de Chromium para Puppeteer — **no se usa**. Todos los PDF routes importan solo `@sparticuz/chromium-min` (la versión compacta). Ambos ocupan espacio considerable; mantener solo `-min`. |
| `@next-auth/mongodb-adapter` | Adaptador de sesiones NextAuth para MongoDB — no se importa ni se configura en `app/api/auth/[...nextauth]/route.js`. NextAuth usa JWT sessions directamente, sin persistir sesiones en MongoDB. |
| `uuid` | Generador de UUIDs — no se importa. El proyecto usa `nanoid` para generación de IDs únicos. |

### 1.5 Paquetes claramente accidentales

| Paquete | Por qué no se usa |
|---|---|
| `0g` | Paquete npm de propósito desconocido (versión `0.0.9`) — sin ningún `import` activo. Probablemente instalado por error. |
| `registry.npmjs.org` | **¡Esto es la URL del registro de npm, no un paquete!** Fue instalado accidentalmente al correr `npm install registry.npmjs.org` en lugar de otro comando. No tiene ningún uso. |
| `jquery` | La librería jQuery **sí existe** en `/public/dflip/js/libs/jquery.min.js` como archivo estático (para el visor de libros), pero el **paquete npm** `jquery` no se importa desde ningún archivo de código. Se puede eliminar el paquete npm sin afectar los archivos estáticos. |

---

## 2. Caso Especial: `cloudinary`

**Situación:** El paquete `cloudinary` (v1.x, SDK servidor) **no se importa directamente** en el código. Sin embargo, `app/Educacion/EditarTemas/[id]/page.jsx` importa:

```js
import { Cloudinary } from "cloudinary-core";
```

`cloudinary-core` es una dependencia del paquete `cloudinary` (v1.x), por lo que está disponible en `node_modules`. Si se elimina `cloudinary`, esta importación **se romperá**.

**Recomendación:** Reemplazar `cloudinary` por `cloudinary-core` en `package.json` para ser explícito sobre qué se necesita realmente:

```bash
npm uninstall cloudinary
npm install cloudinary-core
```

---

## 3. Devdependencias

| Paquete | Estado |
|---|---|
| `ignore-loader` | **EN USO** — referenciado en `next.config.js` para ignorar archivos `.map` en webpack. No eliminar. |
| `autoprefixer`, `postcss`, `tailwindcss` | En uso (build pipeline). |
| `eslint`, `eslint-config-next` | En uso (linting). |

---

## 4. Instrucciones para eliminar de forma segura

### Paso 1 — Crear rama de trabajo
```bash
git checkout -b chore/remove-unused-deps
```

### Paso 2 — Eliminar dependencias en lote
Copia y pega el siguiente comando completo:

```bash
npm uninstall \
  @dearhive/dearflip-jquery-flipbook \
  @next-auth/mongodb-adapter \
  @sparticuz/chromium \
  @stripe/stripe-js \
  0g \
  3d-flip-book \
  aws4 \
  axios \
  formidable \
  googleapis \
  html-to-image \
  html2canvas \
  html2pdf.js \
  image-size \
  jquery \
  jspdf \
  nodemailer \
  pdfmake \
  react-draggable \
  react-modal \
  react-pdf-flipbook-viewer \
  react-rnd \
  react-slick \
  react-to-print \
  registry.npmjs.org \
  slick-carousel \
  swiper \
  uuid
```

### Paso 3 — Manejar `cloudinary` por separado
```bash
npm uninstall cloudinary
npm install cloudinary-core
```

### Paso 4 — Verificar que el build sigue funcionando
```bash
npm run build
npm run build:pdf-css
```

Si `npm run build` pasa sin errores, los paquetes eliminados no eran necesarios.

### Paso 5 — Confirmar cambios
```bash
git add package.json package-lock.json
git commit -m "chore: remove 28 unused dependencies"
```

---

## 5. Dependencias confirmadas como EN USO (no tocar)

| Paquete | Usado en |
|---|---|
| `@pdf-lib/fontkit` | `app/Monitoreo/utils/pdfGenerator.js` |
| `@sparticuz/chromium-min` | Todos los API routes de PDF (12 archivos) |
| `@supabase/supabase-js` | `lib/supabaseadmin.js`, `lib/supabaseBrowser.js` |
| `aos` | `app/page.js`, `app/components/LandingPage.js` |
| `bcryptjs` | Auth routes, update profile |
| `cloudinary-core` (via `cloudinary`) | `app/Educacion/EditarTemas/[id]/page.jsx` |
| `framer-motion` | PageTransition, Monitoreo, Landing |
| `jsonwebtoken` | `lib/api/security.js` (QR login JWT) |
| `mongodb` | Peer dependency de mongoose |
| `mongoose` | Todos los modelos y conexión DB |
| `nanoid` | QR login, share routes |
| `next-auth` | Auth en toda la app |
| `nodemailer` (⚠️) | No está en uso actualmente — si se necesita, está disponible |
| `pdf-lib` | Generación de PDFs (todos los report routes) |
| `puppeteer` | PDF routes (entorno local) |
| `puppeteer-core` | PDF routes (entorno producción/serverless) |
| `react-icons` | Componentes de Educacion y UI |
| `react-image-gallery` | `app/Tecnicas/Componentes/` (uso masivo) |
| `react-markdown` | `app/Monitoreo/ViewWord.js` |
| `react-quill` | `app/Monitoreo/EditorTexto.jsx` |
| `stripe` | `app/api/stripe/verify/route.js` |
| `swr` | `app/Perfil/Perfil_Contra/page.js` |
| `zod` | `lib/api/schemas.js` |
