import { turso } from "@/lib/turso";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { shortcode } = params;

    // 1. Baca identitas yang ngeklik (User-Agent)
    const userAgent = request.headers.get('user-agent') || '';

    // 2. Deteksi apakah itu Bot Sosmed atau bukan
    const isBot = /bot|facebook|externalhit|slurp|spider|crawler|whatsapp|telegram/i.test(userAgent);

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
      // JIKA BOT FB/WA YANG BACA: 
      let fakeUrl = data.fake_link;
      
      // Pastikan formatnya menjadi link utuh (https://...)
      if (!fakeUrl.startsWith('http')) {
        fakeUrl = 'https://' + fakeUrl;
      }
      
      // Lempar pakai format mutlak Next.js
      return NextResponse.redirect(new URL(fakeUrl));
      
    } else {
      // JIKA MANUSIA ASLI YANG KLIK:
      // Tambah jumlah klik di database
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link;
      
      if (!offerUrl.startsWith('http')) {
        offerUrl = 'https://' + offerUrl;
      }
      
      // Lempar ke Offer Link
      return NextResponse.redirect(new URL(offerUrl));
    }

  } catch (error) {
    // Jika masih ada yang salah, error-nya akan dicetak ke layar
    // biar gampang dilacak, bukan sekadar blank 500.
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
