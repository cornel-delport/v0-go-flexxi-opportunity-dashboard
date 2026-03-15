import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authAdmin as auth } from '@/lib/firebase/admin';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of public routes
  const publicRoutes = ['/login', '/api/auth/signin', '/api/auth/signout'];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    await auth.verifySessionCookie(session, true);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
