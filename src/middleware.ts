// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/auth'];

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const pathname = nextUrl.pathname;

  const token = cookies.get('sessionToken')?.value;

  // 1. Acceso a rutas públicas
  const isPublic = PUBLIC_ROUTES.some(p => pathname === p || pathname.startsWith(`${p}/`));

  // 2. Si no hay token y no es pública → redirige a login
  if (!token && !isPublic) {
    const loginUrl = new URL('/auth', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Si hay token y accede a /auth → redirige a home
  if (token && pathname.startsWith('/auth')) {
    const homeUrl = new URL('/home', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 4. Permitir el resto
  return NextResponse.next();
}

// Matcher para excluir rutas públicas y técnicas
export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|auth|api|images|uploads|assets|public|static).*)',
    '/',              // explícitamente permitir /
    '/auth',          // permitir auth pero redirigir si ya tiene token
    '/auth/(.*)',     // incluir subrutas de /auth
  ]
};
