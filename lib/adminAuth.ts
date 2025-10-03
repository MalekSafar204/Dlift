import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_auth';
const secret = process.env.ADMIN_COOKIE_SECRET || 'dev-secret-change-me';

function sign(raw: string) {
  return crypto.createHmac('sha256', secret).update(raw).digest('hex');
}

export function createSession(payload: any) {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString('base64url');
  const sig = sign(json);
  return `${b64}.${sig}`;
}

export function readSession(value: string | undefined | null) {
  if (!value) return null;
  const [b64, sig] = value.split('.');
  if (!b64 || !sig) return null;
  const json = Buffer.from(b64, 'base64url').toString('utf8');
  if (sign(json) !== sig) return null;
  try { return JSON.parse(json); } catch { return null; }
}

export async function requireAdminSession(): Promise<{ user: string } | null> {
  const store = await cookies();
  const c = store.get(COOKIE_NAME)?.value;
  const session = readSession(c);
  if (!session) return null;
  return session;
}

export async function setAdminCookie(user: string) {
  const value = createSession({ user, ts: Date.now() });
  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8 // 8 hours
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.set({ name: COOKIE_NAME, value: '', path: '/', maxAge: 0 });
}
