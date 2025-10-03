import 'server-only';

// Nodemailer is dynamically imported to avoid bundling issues with Turbopack / edge runtimes.
// This file must only run on the Node.js runtime.

let _transporter: any | null = null;

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM;

async function getTransporter() {
  if (!host || !user || !pass) {
    console.warn('[mailer] Missing SMTP env vars, email disabled');
    return null;
  }
  if (_transporter) return _transporter;
  const nodemailer = await import('nodemailer');
  _transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass }
  });
  return _transporter;
}

export async function sendReplyEmail(opts: { to: string; subject: string; html: string }) {
  const t = await getTransporter();
  if (!t || !from) return { ok: false, error: 'disabled' };
  try {
    const info = await t.sendMail({ from, to: opts.to, subject: opts.subject, html: opts.html });
    if (process.env.LOG_EMAILS === 'true') {
      console.log('[mailer] sent', info.messageId, 'to', opts.to);
    }
    return { ok: true, id: info.messageId };
  } catch (e: any) {
    console.error('[mailer] error', e);
    return { ok: false, error: e?.message };
  }
}
