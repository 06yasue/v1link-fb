import { turso } from "@/lib/turso";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const shortcode = resolvedParams.shortcode;

    // 1. Baca identitas yang ngeklik (User-Agent)
    const userAgent = request.headers.get('user-agent') || '';

    // 2. DETEKSI BOT YANG DIPERTAJAM (SANGAT PENTING)
    // Kita hapus kata "facebook" biasa agar manusia yang klik via aplikasi FB gak disangka bot.
    // Kita gunakan "facebookexternalhit" murni untuk mendeteksi bot perayap thumbnail FB.
    const isBot = /bot|crawler|spider|slurp|facebookexternalhit|facebookcatalog|whatsapp|telegram|twitterbot/i.test(userAgent);

    // 3. Cari data link di database Turso
    const result = await turso.execute({
      sql: "SELECT * FROM links WHERE short_code = ?",
      args: [shortcode] 
    });

    // Kalau link gak ada di database, lempar balik ke halaman utama
    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const data = result.rows[0];

    // ==========================================
    // LOGIKA CLOAKING (PEMISAHAN BOT & MANUSIA)
    // ==========================================

    if (isBot) {
      // JIKA BOT FB/WA YANG BACA (Untuk Thumbnail)
      let fakeUrl = data.fake_link || 'google.com'; 
      
      if (!fakeUrl.startsWith('http')) {
        fakeUrl = 'https://' + fakeUrl;
      }
      
      return NextResponse.redirect(new URL(fakeUrl));
      
    } else {
      // JIKA MANUSIA ASLI YANG KLIK (Baik via Browser atau Aplikasi FB/WA)
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link || 'google.com';
      
      if (!offerUrl.startsWith('http')) {
        offerUrl = 'https://' + offerUrl;
      }
      
      return NextResponse.redirect(new URL(offerUrl));
    }

  } catch (error) {
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
