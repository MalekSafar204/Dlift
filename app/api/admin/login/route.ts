import { NextResponse } from 'next/server';
import { setAdminCookie } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { user, pass } = await req.json().catch(() => ({}));
  console.log('Login attempt for user:', user, pass);
  
  if (user !== "admin" || pass !== "admin123") {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  await setAdminCookie(user);
  return NextResponse.json({ ok: true });
}
