import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { ROUTES } from '@/lib/routes';

const publicRoutes: string[] = [ROUTES.HOME];
const authRoutes: string[] = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const sessionCookie = getSessionCookie(request);

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // Protect private routes
  if (!isPublicRoute && !isAuthRoute && !sessionCookie) {
    const redirectUrl = new URL(
      ROUTES.SIGN_IN + '?redirect=' + encodeURIComponent(pathname),
      request.url,
    );
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
