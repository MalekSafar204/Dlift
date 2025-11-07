import axios from "axios";
import type { QuoteRequestPayload } from "@/constants/types";

// Client-side HTTP function for public quote form (uses Next API route)
export async function createQuote(
  payload: QuoteRequestPayload
): Promise<{ id: string }> {
  const res = await axios.post("/api/quotes", payload);
  return res.data as { id: string };
}
