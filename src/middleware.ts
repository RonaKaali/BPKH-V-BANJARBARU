
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('admin-session');

  const { pathname } = req.nextUrl;

  // Jika mencoba mengakses dasbor tanpa sesi, alihkan ke login
  if (pathname.startsWith('/admin/dashboard') && !sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Jika sudah login dan mencoba mengakses halaman login, alihkan ke dasbor
  if (pathname.startsWith('/admin/login') && sessionCookie) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

// Tentukan path mana yang akan menggunakan middleware ini
export const config = {
  matcher: ['/admin/dashboard', '/admin/login'],
};
