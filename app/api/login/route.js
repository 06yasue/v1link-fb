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
      
      // PERBAIKAN FATAL: Wajib pakai await untuk Next.js versi terbaru!
      const cookieStore = await cookies();
      cookieStore.set('v1link_auth', 'authenticated', { 
        secure: true, 
        httpOnly: true, // Super aman
        path: '/',
        maxAge: 60 * 60 * 24 
      });
      
      return NextResponse.json({ success: true }, { status: 200 });
      
    } else {
      // Jika salah, tolak dengan pesan error
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
  } catch (error) {
    // Biar error aslinya kelihatan di log Vercel kalau masih bermasalah
    console.error("Login API Error:", error);
    return NextResponse.json({ message: 'Server crash: ' + error.message }, { status: 500 });
  }
}
