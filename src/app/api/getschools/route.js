import { pool } from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY created_at DESC");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch schools" }), { status: 500 });
  }
}
