import { turso } from "@/lib/turso";
import { NextResponse } from "next/server";

// Mengambil semua data
export async function GET() {
  try {
    const result = await turso.execute("SELECT * FROM links ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Mengedit Offer Link
export async function PUT(req) {
  try {
    const { id, offer_link } = await req.json();
    await turso.execute({
      sql: "UPDATE links SET offer_link = ? WHERE id = ?",
      args: [offer_link, id]
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Menghapus Link
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await turso.execute({
      sql: "DELETE FROM links WHERE id = ?",
      args: [id]
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
