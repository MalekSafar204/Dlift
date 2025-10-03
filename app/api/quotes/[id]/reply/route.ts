import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { requireAdminSession } from '@/lib/adminAuth';
import { sendReplyEmail } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!(await requireAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let body: any = {};
  try { body = await req.json(); } catch {}
  const subject = body?.subject?.trim();
  const message = body?.message?.trim();
  if (!subject || !message) return NextResponse.json({ error: 'Missing subject or message' }, { status: 400 });

  const { data: quote, error } = await supabaseServer.from('quote_requests').select('id,email,contact_name,company').eq('id', params.id).single();
  if (error || !quote) return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
  if (!quote.email) return NextResponse.json({ error: 'Quote has no email' }, { status: 400 });

  const userHtml = `<p>${message.replace(/\n/g,'<br/>')}</p><hr/><p>Reference: ${quote.id}</p>`;
  const res = await sendReplyEmail({ to: quote.email, subject, html: userHtml });
  if (!res.ok) return NextResponse.json({ error: res.error || 'Send failed' }, { status: 500 });
  return NextResponse.json({ ok: true, id: res.id });
}
