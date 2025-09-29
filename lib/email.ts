const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
const ADMIN = process.env.ADMIN_EMAIL || '';
const LOG_EMAILS = process.env.LOG_EMAILS === 'true';

type SendResult = { ok: boolean; status?: number; to: string; error?: string; id?: string };

async function sendEmail(opts: { to: string; subject: string; html: string }): Promise<SendResult> {
  if (!RESEND_API_KEY) {
    if (LOG_EMAILS) console.error('[email] RESEND_API_KEY missing; skipping send');
    return { ok: false, to: opts.to, error: 'missing_api_key' };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from: FROM, to: opts.to, subject: opts.subject, html: opts.html })
    });
    let body: any = null;
    try { body = await res.json(); } catch { /* ignore */ }
    const result: SendResult = {
      ok: res.ok,
      status: res.status,
      to: opts.to,
      id: body?.id,
      error: res.ok ? undefined : (body?.message || 'non_2xx')
    };
    if (LOG_EMAILS) {
      if (result.ok) console.log(`[email] Sent to ${opts.to} status=${res.status} id=${result.id}`);
      else console.error(`[email] FAILED to ${opts.to} status=${res.status} error=${result.error}`);
    }
    return result;
  } catch (e: any) {
    if (LOG_EMAILS) console.error('[email] Exception while sending', e);
    return { ok: false, to: opts.to, error: e?.message || 'exception' };
  }
}

export async function sendQuoteEmails(quote: any) {
  if (!RESEND_API_KEY) {
    if (LOG_EMAILS) console.error('[email] No RESEND_API_KEY; quote email notifications disabled');
    return;
  }
  const subject = `New Quote Request – ${quote.company}`;
  const adminHtml = `
    <h2>New Quote</h2>
    <p><b>Category:</b> ${quote.category_id}</p>
    <p><b>Model:</b> ${quote.model_id ?? '—'}</p>
    <p><b>Capacity Needed:</b> ${quote.capacity_needed ?? '—'}</p>
    <p><b>Dates:</b> ${quote.start_date} → ${quote.end_date}</p>
    <p><b>Location:</b> ${quote.location}</p>
    <p><b>Work Type:</b> ${quote.work_type}</p>
    <p><b>Contact:</b> ${quote.contact_name} – ${quote.phone} – ${quote.email}</p>
    <p><b>Preferred Manufacturer:</b> ${quote.preferred_manufacturer ?? '—'}</p>
    <p><b>Notes:</b> ${quote.notes ?? '—'}</p>
    <p><b>Ref:</b> ${quote.id}</p>
  `;

  const userHtml = `<p>Thanks, ${quote.contact_name}. We received your quote request.</p><p>Reference: <b>${quote.id}</b></p>`;

  const results = await Promise.all([
    ADMIN ? sendEmail({ to: ADMIN, subject, html: adminHtml }) : Promise.resolve({ ok: true, to: 'admin(suppressed)' }),
    quote.email ? sendEmail({ to: quote.email, subject: 'We received your quote request', html: userHtml }) : Promise.resolve({ ok: true, to: 'user(suppressed)' }),
  ]);

  if (LOG_EMAILS) {
    const summary = results.map(r => `${r.to}:${r.ok?'ok':'fail'}`).join(', ');
    console.log('[email] Summary:', summary);
  }
}
