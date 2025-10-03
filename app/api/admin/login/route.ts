import { NextResponse } from 'next/server';
import { setAdminCookie } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { user, pass } = await req.json().catch(() => ({}));
  if (user !== process.env.ADMIN_LOGIN_USER || pass !== process.env.ADMIN_LOGIN_PASS) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  await setAdminCookie(user);
  return NextResponse.json({ ok: true });
}
