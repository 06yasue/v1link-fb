import { turso } from "@/lib/turso";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { short_code, fake_link, offer_link } = body;

    await turso.execute({
      sql: "INSERT INTO links (short_code, fake_link, offer_link) VALUES (?, ?, ?)",
      args: [short_code, fake_link, offer_link]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
