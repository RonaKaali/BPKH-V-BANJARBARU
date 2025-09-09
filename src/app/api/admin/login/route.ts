
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    const { username, password } = await req.json();

    // IMPORTANT: Replace with a secure authentication mechanism
    if (username === 'admin' && password === 'password') {
        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
};
