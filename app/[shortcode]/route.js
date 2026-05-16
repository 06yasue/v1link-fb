import { turso } from "@/lib/turso";
import { NextResponse } from 'next/server';

// ==========================================
// KUNCI MUTLAK ANTI-CACHE VERCEL & FB
// ==========================================
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const shortcode = resolvedParams.shortcode;

    // 1. Baca identitas (User-Agent)
    const userAgent = request.headers.get('user-agent') || '';

    // 2. DETEKSI BOT YANG LEBIH SPESIFIK
    // (Dipersingkat agar tidak salah tangkap Browser Internal FB Biru)
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

    // BIKIN HEADER ANTI-CACHE UNTUK BROWSER
    const noCacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    };

    // ==========================================
    // LOGIKA CLOAKING
    // ==========================================

    if (isBot) {
      // BOT FB/WA -> Lempar ke Fake Link
      let fakeUrl = data.fake_link || 'google.com'; 
      if (!fakeUrl.startsWith('http')) {
        fakeUrl = 'https://' + fakeUrl;
      }
      
      // Tambahkan header Anti-Cache ke response
      return NextResponse.redirect(new URL(fakeUrl), { headers: noCacheHeaders });
      
    } else {
      // MANUSIA ASLI (Via FB Biru, FB Lite, dll) -> Lempar ke Offer Link
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      let offerUrl = data.offer_link || 'google.com';
      if (!offerUrl.startsWith('http')) {
        offerUrl = 'https://' + offerUrl;
      }
      
      // Tambahkan header Anti-Cache ke response
      return NextResponse.redirect(new URL(offerUrl), { headers: noCacheHeaders });
    }

  } catch (error) {
    console.error("System Error Route:", error);
    return new NextResponse("Server Crash: " + error.message, { status: 500 });
  }
}
