import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const authMiddleware = withAuth({
  pages: {
    signIn: '/Login', // o tu ruta de login personalizada
  },
});

const protectedRoutes = [
  '/Perfil',
  '/Perfil/Perfil_Actualizar',
  '/Perfil/Perfil_Contra',
];

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Redirige /blank a /api/blank
  if (pathname === '/blank') {
    const url = request.nextUrl.clone();
    url.pathname = '/api/blank';
    return NextResponse.rewrite(url);
  }

  // Aplica autenticación solo a rutas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    return authMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/blank', // necesario para interceptar esta ruta
    '/Perfil',
    '/Perfil/Perfil_Actualizar',
    '/Perfil/Perfil_Contra',
  ],
};
