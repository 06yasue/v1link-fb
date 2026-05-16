import { NextResponse } from 'next/server';

export function middleware(request) {
  
  const authCookie = request.cookies.get('v1link_auth');
  const { pathname } = request.nextUrl;

  
  const isProtectedPage = 
    pathname.startsWith('/link') || 
    pathname.startsWith('/list') || 
    pathname.startsWith('/generator');

  if (isProtectedPage) {
    // Jika mencoba masuk ke halaman rahasia tapi belum login (cookie kosong)
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Paksa lempar balik ke halaman login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Jika sudah login, izinkan lewat
  return NextResponse.next();
}

// 3. Konfigurasi Matcher agar middleware bekerja cepat hanya di rute tertentu
export const config = {
  matcher: [
    '/link/:path*',
    '/list/:path*',
    '/generator/:path*',
  ],
};
