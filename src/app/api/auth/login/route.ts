
import { getUsers } from '@/lib/data';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const users = await getUsers();

    const user = users.find(
      (u: {username: string, password: string}) => u.username === username && u.password === password
    );

    if (user) {
      // --- Buat JWT Token ---
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-super-secret-key-that-is-at-least-32-bytes-long' // Ganti dengan secret key yang kuat di .env.local
      );
      const alg = 'HS256';

      const token = await new jose.SignJWT({ username: user.username, role: 'admin' })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h') // Token berlaku selama 2 jam
        .setIssuedAt()
        .sign(secret);

      // --- Set cookie di browser --- 
      const cookieStore = await cookies();
      cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 2, // 2 jam
        path: '/',
      });

      return NextResponse.json({ message: 'Login berhasil' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 });
    }
  } catch (error) {
    console.error('[API_LOGIN_POST]', error);
    return NextResponse.json({ message: 'Terjadi kesalahan internal' }, { status: 500 });
  }
}
