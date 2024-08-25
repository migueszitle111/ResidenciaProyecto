// Importa el middleware por defecto de next-auth
export { default } from "next-auth/middleware";

// Configuración específica para el middleware
export const config = {
  // El matcher es una propiedad que define las rutas para las cuales se aplicará el middleware
  matcher: ["/Perfil", "/Perfil/Perfil_Actualizar", "/Perfil/Perfil_Contra"]
};
