import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Menarik data rahasia dari settingan Vercel
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;

    // Proses pencocokan
    if (email === envEmail && password === envPassword) {
      // Jika benar, berikan "Kunci Masuk" (Cookie) yang tahan 1 hari
      cookies().set('v1link_auth', 'authenticated', { 
        secure: true, 
        httpOnly: true, // Super aman, gak bisa dibajak Javascript browser
        path: '/',
        maxAge: 60 * 60 * 24 
      });
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // Jika salah, tolak dengan pesan error
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
