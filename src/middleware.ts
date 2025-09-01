import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const secret_jwt = process.env.JWT_SECRET;
  const { pathname } = req.nextUrl;

  // Jika tidak ada JWT_SECRET, middleware tidak bisa bekerja dengan aman.
  // Lewatkan saja semua request tanpa proteksi.
  if (!secret_jwt) {
    console.warn('Peringatan: JWT_SECRET tidak diatur. Middleware dinonaktifkan.');
    return NextResponse.next();
  }

  const secret = new TextEncoder().encode(secret_jwt);

  // Logika untuk melindungi halaman admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // Jika tidak ada token, redirect ke halaman login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verifikasi token
      await jose.jwtVerify(token, secret);
      // Jika token valid, lanjutkan ke halaman yang diminta
      return NextResponse.next();
    } catch (err) {
      // Jika token tidak valid (error verifikasi), redirect ke halaman login
      console.error('Token tidak valid:', err);
      // Hapus cookie yang tidak valid agar tidak terjadi loop redirect
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Logika untuk halaman login
  if (pathname.startsWith('/login')) {
    if (token) {
      try {
        await jose.jwtVerify(token, secret);
        // Jika token valid, redirect ke halaman admin karena sudah login
        return NextResponse.redirect(new URL('/admin', req.url));
      } catch (error) {
        // Jika token tidak valid, hapus cookie dan lanjutkan ke halaman login
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
    }
  }

  // Untuk path lainnya, lanjutkan saja
  return NextResponse.next();
}

// Menentukan path mana yang akan menggunakan middleware ini
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
