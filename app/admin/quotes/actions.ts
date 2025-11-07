"use server";

import { updateQuoteStatusServer } from "@/lib/quotesServiceServer";
import { sendReplyEmail } from "@/lib/mailer";
import { getQuoteHeaderForReply } from "@/lib/quotesServiceServer";
import type { QuoteStatus } from "@/constants/types";

export async function updateQuoteStatusAction(id: string, status: QuoteStatus) {
  try {
    await updateQuoteStatusServer(id, status);
    return { ok: true as const };
  } catch (error: any) {
    return {
      ok: false as const,
      error: error?.message || "Failed to update status",
    };
  }
}

export async function sendQuoteReplyAction(
  id: string,
  subject: string,
  message: string
) {
  try {
    const quote = await getQuoteHeaderForReply(id);
    if (!quote) {
      return { ok: false as const, error: "Quote not found" };
    }
    if (!quote.email) {
      return { ok: false as const, error: "Quote has no email" };
    }

    const userHtml = `<p>${message.replace(
      /\n/g,
      "<br/>"
    )}</p><hr/><p>Reference: ${quote.id}</p>`;
    const res = await sendReplyEmail({
      to: quote.email,
      subject,
      html: userHtml,
    });

    if (!res.ok) {
      return { ok: false as const, error: res.error || "Send failed" };
    }

    return { ok: true as const, id: res.id };
  } catch (error: any) {
    return {
      ok: false as const,
      error: error?.message || "Failed to send reply",
    };
  }
}
