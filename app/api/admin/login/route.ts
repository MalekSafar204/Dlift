import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { accessToken, refreshToken } = await req.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
    }

    const cookieStore = await cookies();

    // Store tokens in httpOnly cookies
    cookieStore.set("sb-access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    cookieStore.set("sb-refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
