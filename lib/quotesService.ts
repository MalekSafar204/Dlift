import axios from "axios";
import type { QuoteRequestPayload, QuoteStatus } from "@/constants/types";

// Client-side HTTP functions (use Next API routes)
export async function createQuote(
  payload: QuoteRequestPayload
): Promise<{ id: string }> {
  const res = await axios.post("/api/quotes", payload);
  return res.data as { id: string };
}

export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus
): Promise<{ ok: true; data?: any }> {
  const res = await axios.patch(`/api/quotes/${id}/status`, { status });
  return res.data as { ok: true; data?: any };
}

export async function sendQuoteReply(
  id: string,
  subject: string,
  message: string
): Promise<{ ok: true; id: string }> {
  const res = await axios.post(`/api/quotes/${id}/reply`, { subject, message });
  return res.data as { ok: true; id: string };
}
