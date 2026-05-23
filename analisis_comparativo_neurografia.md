# Análisis Comparativo: Neurografía — Web vs App Móvil

> **Fecha:** 2026-05-11  
> **Archivos auditados:**  
> - Web: `app/Tecnicas/Componentes/Neurografia/MenuGeneralT.js` + `MedianoMt/medianoMt.jsx` (representativo)  
> - App: `src/screens/Menus/Tecnicas/Neurografia.tsx` + `GaleriaT.tsx`

---

## 1. Resumen de Hallazgos

La Web tiene una implementación funcional con galería de imágenes (`react-image-gallery`), botones interactivos y tooltips textuales, pero sufre de tres deficiencias arquitectónicas críticas frente a la App:

1. **Posicionamiento de botones por CSS hardcodeado** — Cada nervio web usa clases CSS únicas (`.btnM1`, `.btnM2`...) con coordenadas absolutas en píxeles. La App usa coordenadas porcentuales (`x`, `y` en `%`) que escalan automáticamente a cualquier resolución. Esto hace que los botones web se desalineen en pantallas distintas al viewport de desarrollo.

2. **InfoBox sin identidad visual** — El tooltip web es un `<div>` genérico posicionado siempre en la misma esquina (`top: '10%', left: '24%'`). La App posiciona el InfoBox adaptándose al botón que lo disparó y añade un ícono circular (A=Activo, R=Referencia, E=Estimulación, T=Tierra) que identifica el tipo de punto anatómico.

3. **Ausencia del sistema de galería unificada (GaleriaT)** — La App tiene un componente `GaleriaT` reutilizable que recibe datos de cualquier nervio. La Web replica el mismo patrón de código en 34+ archivos `.jsx` separados, lo que hace muy costoso actualizar estilos o comportamientos globalmente.

---

## 2. Tabla de Elementos Presentes en App pero Ausentes/Deficientes en Web

| # | Elemento | Estado en App | Estado en Web | Impacto |
|---|----------|--------------|---------------|---------|
| 1 | **Posicionamiento % de botones** | Coordenadas `x`,`y` en `%` relativas a la imagen renderizada | Clases CSS con `position: absolute` en píxeles fijos | 🔴 Alto — botones desalineados en otras resoluciones |
| 2 | **Ícono de tipo en InfoBox** | Badge circular con imagen (A/R/E/T) al lado del tooltip | Sin ícono — texto plano | 🟠 Medio — pérdida de información visual clínica |
| 3 | **Posición adaptiva del InfoBox** | Calcula posición desde coordenadas del botón, evita salirse de pantalla | Siempre `top: ~10%, left: ~24%` fijo | 🟠 Medio — UX degradada, tooltip se superpone a zonas activas |
| 4 | **Zoom en popup de imagen** | `react-native-image-zoom-viewer` con pinch-to-zoom y swipe-to-close | `<img>` estático en modal sin zoom | 🟠 Medio — tablas de valores son pequeñas sin zoom |
| 5 | **Etiquetas de texto (`label`)** | Tipo de botón `label` coloca texto persistente sobre la imagen | No implementado | 🟠 Medio — títulos del nervio sobre la imagen ausentes en Web |
| 6 | **Estado activo en categoría del menú** | Categoría se vuelve naranja (`background: orange`) al abrirse | Sin cambio visual al abrir una categoría | 🟡 Bajo — feedback visual de qué categoría está abierta |
| 7 | **Chevron dinámico en categoría** | `▷` cerrado → `▽` abierto con animación (LayoutAnimation) | `›` estático siempre | 🟡 Bajo — navegabilidad del menú |
| 8 | **Overlay/backdrop en menú** | Semitransparente sobre el contenido; clic fuera cierra el menú | Sin backdrop; menú es sidebar fijo | 🟡 Bajo — en móvil web el menú cubre el contenido sin poder cerrarlo fácil |
| 9 | **Borde naranja en contenedor del menú** | `borderColor: 'orange', borderWidth: 1` | Sin borde | 🟡 Bajo — detalle estético de identidad de marca |
| 10 | **Bullet `●` en subcategorías** | `● Nombre del nervio` | Solo texto plano | 🟡 Bajo — jerarquía visual del menú |
| 11 | **Flechas de navegación entre imágenes** | Flechas `⟨`/`⟩` siempre visibles en los lados | `showNav={false}` en `react-image-gallery` — **flechas deshabilitadas** | 🟠 Medio — usuarios sin thumbnails visibles no saben que hay más imágenes |
| 12 | **Subcategoría seleccionada persiste en menú** | El ítem seleccionado queda resaltado en naranja aunque el menú se cierre | No hay estado persistente visible en el menú | 🟡 Bajo — orientación del usuario |
| 13 | **`Mediano (sensitivo)` sin datos en App** | En lista de categorías pero SIN entrada en `contenidoPorOpcion` | Tiene componente `<MedianoSt />` completo | ℹ️ Info — la App está incompleta en este nervio; Web lleva ventaja |
| 14 | **Tipo de botón `infoImage`** | Tipo híbrido: muestra info textual + puede expandir imagen secundaria | No implementado | 🟡 Bajo — versión más rica de tooltip |
| 15 | **Galería unificada reutilizable** | Un solo `GaleriaT` + diccionario de datos por nervio | 34 archivos `.jsx` independientes con código repetido | 🔴 Alto — mantenibilidad crítica |

---

## 3. Recomendaciones Técnicas

### 3.1 Migrar a un sistema de botones basado en porcentajes

**Problema:** Los botones CSS del Web usan `position: absolute` con píxeles. Cuando cambia el tamaño del contenedor de la imagen, los botones no siguen.

**Solución en Next.js:**
```jsx
// Ejemplo de botón con posición dinámica
const overlayButtons = [
  { x: 53, y: 47, text: '', type: 'info', infoText: 'MUÑECA. 8 cm proximal...' }
];

// En render, sobre la imagen:
<div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
  <img src={currentImage} style={{ width: '100%', display: 'block' }} ref={imageRef} />
  {overlayButtons.map((btn, i) => (
    <button
      key={i}
      onClick={() => handleClick(btn)}
      style={{
        position: 'absolute',
        left: `${btn.x}%`,
        top: `${btn.y}%`,
        width: `${btn.width ?? 5}%`,
        height: `${btn.height ?? 8}%`,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    />
  ))}
</div>
```

**Librería recomendada:** No es necesaria; CSS puro con `position: absolute` + `left: X%` / `top: Y%` es suficiente y replica exactamente la lógica de la App.

---

### 3.2 InfoBox con posición adaptativa e ícono de tipo

**Solución:** Calcular la posición del tooltip en función del botón que lo dispara, igual que la App:

```jsx
const handleButtonClick = (btn, buttonRef) => {
  const rect = buttonRef.current.getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();
  
  // Calcular posición relativa al contenedor
  const top = ((rect.top - containerRect.top) / containerRect.height) * 100;
  const left = ((rect.left - containerRect.left) / containerRect.width) * 100;
  
  setInfoBox({ visible: true, text: btn.infoText, top, left, iconType: btn.infoBoxImage });
};
```

Los íconos de tipo (`BotonA`, `BotonR`, `BotonE`, `BotonT`) ya existen en `/public/assets/tecnicas/Info/` (o equivalente). El badge circular replica con Tailwind: `rounded-full w-10 h-10 absolute -left-5`.

---

### 3.3 Zoom en popup de imágenes (tablas y gráficas)

**Librería recomendada:** `yet-another-react-lightbox` (ligera, mantenida, sin dependencias pesadas):

```bash
npm install yet-another-react-lightbox
```

```jsx
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

<Lightbox
  open={modalVisible}
  close={() => setModalVisible(false)}
  slides={[{ src: extraImage }]}
  plugins={[Zoom]}
/>
```

**Alternativa:** `react-medium-image-zoom` (más minimalista, click-to-zoom in-place).

---

### 3.4 Componente `GaleriaWeb` unificado (refactor arquitectónico)

Crear un componente equivalente a `GaleriaT.tsx` pero para Next.js que consuma un diccionario de datos:

```
app/Tecnicas/Componentes/Neurografia/
  GaleriaWeb.jsx          ← Nuevo componente unificado
  dataNeurografia.js      ← Diccionario con imágenes + botones de todos los nervios
  MenuGeneralT.js         ← Solo pasa datos a GaleriaWeb
```

Esto elimina los 34 archivos `.jsx` duplicados y centraliza la lógica de:
- Renderizado de imágenes con overlay
- InfoBox con posición adaptativa
- Modal con zoom
- Etiquetas de texto sobre imagen

---

### 3.5 Mejoras de menú en Tailwind CSS

| Elemento App | Equivalente Tailwind |
|---|---|
| `categoriaSeleccionada: { backgroundColor: 'orange' }` | `data-open:bg-orange-500` o toggle de clase `bg-orange-500` |
| `borderColor: 'orange', borderWidth: 1` en menú | `border border-orange-500` en el `<div>` del menú |
| `▷`/`▽` dinámico | `{isOpen ? '▽' : '▷'}` en JSX |
| `subcategoriaSeleccionada: { color: '#eb9800ff' }` | `text-orange-400` |
| Bullet `●` en subcategorías | Añadir `● ` en el texto del botón |
| Overlay backdrop | `<div className="fixed inset-0 bg-black/50 z-10" onClick={closeMenu} />` |
| Menú como overlay flotante (no sidebar) | `absolute top-14 left-2 z-20` en el contenedor del menú |

---

## 4. Plan de Acción Sugerido (Paso a Paso)

### Fase 1 — Corrección crítica de posicionamiento (1-2 días)
1. Crear `GaleriaWeb.jsx` con sistema de overlay de botones en porcentajes.
2. Migrar `dataNeurografia.js` usando la estructura `contenidoPorOpcion` de la App como referencia (los datos de coordenadas `x`,`y` ya existen en la App — copiarlos).
3. Probar con `Mediano (motor)` como caso piloto.

### Fase 2 — InfoBox mejorado (1 día)
4. Añadir posición adaptativa al tooltip (cálculo desde `getBoundingClientRect`).
5. Añadir badge circular con los íconos de tipo (A/R/E/T) al lado del InfoBox.

### Fase 3 — Zoom en popup de imágenes (½ día)
6. Instalar `yet-another-react-lightbox` con plugin Zoom.
7. Reemplazar el `<div className="modal-gallery">` actual por el Lightbox.

### Fase 4 — Etiquetas de texto sobre imágenes (½ día)
8. Añadir soporte para el tipo `label` en `GaleriaWeb.jsx` (texto con `pointerEvents: none`).

### Fase 5 — Migración de nervios restantes (2-3 días)
9. Migrar los 34 nervios al diccionario `dataNeurografia.js`, usando los datos de `Neurografia.tsx` como fuente de coordenadas.
10. Eliminar los 34 archivos `.jsx` individuales (o mantenerlos en paralelo durante la migración).
11. Añadir datos para `Mediano (sensitivo)` en la App (actualmente falta en `contenidoPorOpcion`).

### Fase 6 — Mejoras de menú (½ día)
12. Aplicar estado activo naranja en categorías abiertas.
13. Añadir chevron dinámico `▷`/`▽`.
14. Añadir `border border-orange-500` al contenedor del menú.
15. Añadir overlay/backdrop con `fixed inset-0 bg-black/50` y `onClick` para cerrar.
16. Habilitar flechas de navegación en `react-image-gallery` (cambiar `showNav={false}` → `true`).

---

## Apéndice: Diferencias de datos entre Web y App

| Nervio | En Web | En App (menú) | En App (datos) |
|---|---|---|---|
| Mediano (motor) | ✅ | ✅ | ✅ |
| **Mediano (sensitivo)** | ✅ | ✅ | ❌ Sin datos |
| Ulnar (motor) | ✅ | ✅ | ✅ |
| Ulnar (sensitivo) | ✅ | ✅ | ✅ |
| Radial (motor) | ✅ | ✅ | ✅ |
| Radial (sensitivo) | ✅ | ✅ | ✅ |
| Antebraquial cutáneo lateral | ✅ | ✅ | ✅ |
| Antebraquial cutáneo medial | ✅ | ✅ | ✅ |
| Antebraquial cutáneo posterior | ✅ | ✅ | ✅ |
| Axilar | ✅ | ✅ | ✅ |
| Musculocutáneo | ✅ | ✅ | ✅ |
| Supraescapular | ✅ | ✅ | ✅ |
| Escapular dorsal | ✅ | ✅ | ✅ |
| Torácico largo | ✅ | ✅ | ✅ |
| Toracodorsal | ✅ | ✅ | ✅ |
| Frénico | ✅ | ✅ | ✅ |
| Espinal accesorio | ✅ | ✅ | ✅ |
| Supraclavicular | ✅ | ✅ | ✅ |
| Auricular mayor | ✅ | ✅ | ✅ |
| Occipital mayor | ✅ | ✅ | ✅ |
| Facial | ✅ | ✅ | ✅ |
| Trigémino | ✅ | ✅ | ✅ |
| Peroneo | ✅ | ✅ | ✅ |
| Peroneo superficial | ✅ | ✅ | ✅ |
| Peroneo profundo | ✅ | ✅ | ✅ |
| Tibial | ✅ | ✅ | ✅ |
| Sural | ✅ | ✅ | ✅ |
| Plantar | ✅ | ✅ | ✅ |
| Femoral | ✅ | ✅ | ✅ |
| Safeno | ✅ | ✅ | ✅ |
| Femorocutáneo lateral | ✅ | ✅ | ✅ |
| Cutáneo femoral | ✅ | ✅ | ✅ |
| Ciático | ✅ | ✅ | ✅ |
| Pudendo | ✅ | ✅ | ✅ |
| Dorsal del pene | ✅ | ✅ | ✅ |

**Total:** 35 nervios en menú de ambas plataformas. App tiene 34 entradas con datos (falta Mediano sensitivo). Web tiene los 35 con componente propio.

---

## 5. Filosofía de Adaptación: Mejorar la Web sin Reescribirla

> La Web ya funciona. El objetivo no es clonar la App sino elevar la calidad donde el costo es bajo y el beneficio es real.

### Qué mantener tal como está

| Elemento web | Por qué no tocarlo |
|---|---|
| `react-image-gallery` con thumbnails | La App no tiene thumbnails; en desktop son una ventaja real |
| 34 archivos `.jsx` individuales por nervio | Refactorizarlos a un componente unificado toma semanas sin ganancia visible para el usuario |
| Estructura sidebar (no overlay flotante) | En pantallas grandes el sidebar es más cómodo que un overlay |
| Lógica del buscador con autocompletado | Funciona igual que en la App |

### Qué adaptar (bajo costo, alto impacto)

**Ya aplicados** en `MenuGeneralT.js`:
- Backdrop semitransparente al abrir el menú
- Borde naranja en el contenedor del menú
- Categoría activa se vuelve naranja
- Chevron dinámico `▷` / `▽`
- Bullet `●` y color `text-gray-300` / `text-orange-400` en subcategorías

**Pendiente — flechas de navegación (34 archivos, `showNav={false}` → `true`):**  
Sin flechas visibles, un usuario desktop que no vea los thumbnails no sabe que hay más imágenes por nervio. Es un `false` → `true` con Find & Replace global.

**Pendiente — íconos de tipo (A/R/E/T) en el InfoBox:**  
En la App cada tooltip muestra un badge circular que identifica el tipo de punto anatómico: **A**ctivo, **R**eferencia, **E**stimulación, **T**ierra. En la Web el tooltip es texto plano sin identidad visual.

Los assets ya existen en la App (`S_A.png`, `S_R.png`, `S_E.png`, `S_T.png`) y solo necesitan copiarse a `/public/assets/tecnicas/Info/` en el proyecto web. La implementación requiere dos cambios en cada componente de nervio:

1. Añadir un 4° parámetro `iconType` a `handleButtonClick`:
```jsx
// Antes:
onClick={() => handleButtonClick('CODO. Fosa antecubital...', { top: '10%', left: '24%' })}

// Después (se indica qué tipo es cada botón):
onClick={() => handleButtonClick('CODO. Fosa antecubital...', { top: '10%', left: '24%' }, 'text-boxMs', 'E')}
```

2. Guardar el tipo en estado y renderizar el badge junto al texto del InfoBox:
```jsx
const [textBoxIcon, setTextBoxIcon] = useState(null);

// En handleButtonClick:
setTextBoxIcon(iconType ?? null);

// En el render del tooltip:
{textBoxVisible && (
    <div className={`text-boxMs ${textBoxClass}`} style={{ top: textBoxPosition.top, left: textBoxPosition.left }}>
        {textBoxIcon && (
            <img
                src={`/assets/tecnicas/Info/S_${textBoxIcon}.png`}
                alt={textBoxIcon}
                style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }}
            />
        )}
        {textBoxContent}
    </div>
)}
```

**Coste total:** copiar 4 PNGs + editar `handleButtonClick` y el render del tooltip en los 34 componentes (cambio mecánico, no arquitectónico).

### Qué no replicar de la App

| Elemento de la App | Por qué omitirlo en Web |
|---|---|
| `Orientation.lockToLandscape` | El navegador no expone API fiable de bloqueo de orientación |
| `Vibration.vibrate(50)` en botones | No aplica a interacciones con mouse/teclado |
| Posicionamiento `%` de botones (migración completa) | Requiere reescribir los 34 componentes; la ganancia solo se nota en resoluciones muy atípicas |
| Menú como overlay flotante en lugar de sidebar | En desktop el sidebar es más cómodo; el overlay solo mejora experiencia móvil |
