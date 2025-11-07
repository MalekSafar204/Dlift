import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();

  // Clear auth cookies
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");

  return NextResponse.json({ ok: true });
}
