import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME } from '@/app/shared/lib/auth/constants';
import { isValidAuthToken } from '@/app/shared/lib/auth/token';

const PUBLIC_ROUTES = ['/login', '/register'];
const PROTECTED_ROUTES = ['/home'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = isValidAuthToken(token);

  if (pathname === '/') {
    const destination = isAuthenticated ? '/home' : '/login';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

