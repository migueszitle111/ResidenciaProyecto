// Layout aislado para páginas de links compartidos (/s/[slug]).
// No incluye scripts de DearFlip ni providers de auth — solo HTML limpio
// para que los scrapers de WhatsApp/Facebook lean correctamente los meta OG.
export default function ShareLayout({ children }) {
  return children;
}
