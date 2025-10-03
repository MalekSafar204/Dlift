import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { requireAdminSession } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function PATCH(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!(await requireAdminSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let body: any = {};
  try { body = await _req.json(); } catch {}
  const status = body?.status;
  if (!['new','in_progress','closed'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const { data, error } = await supabaseServer.from('quote_requests').update({ status }).eq('id', id).select('id,status');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data: data?.[0] });
}
