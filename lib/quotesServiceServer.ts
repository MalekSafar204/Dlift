import "server-only";
import type { QuoteRequestRow, QuoteStatus } from "@/constants/types";
import { createAuthenticatedSupabaseClient } from "./supabaseAuth";

// Server-side direct Supabase helpers
export async function listQuotes(limit = 200): Promise<QuoteRequestRow[]> {
  const supabase = await createAuthenticatedSupabaseClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getQuoteById(
  id: string
): Promise<QuoteRequestRow | null> {
  const supabase = await createAuthenticatedSupabaseClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return (data as QuoteRequestRow) || null;
}

export async function deleteQuote(id: string): Promise<{ ok: boolean }> {
  const supabase = await createAuthenticatedSupabaseClient();

  const { error } = await supabase.from("quote_requests").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

// Server-side: create a quote record (expects normalized payload fields)
export async function createQuoteServer(input: {
  category_id: string;
  model_id: string | null;
  company: string;
  contact_name: string;
  phone: string;
  email: string;
  work_type: string;
  location: string;
  start_date: string;
  end_date: string;
  capacity_needed: string;
  preferred_manufacturer: string | null;
  notes: string | null;
  status?: QuoteStatus;
}): Promise<QuoteRequestRow> {
  const supabase = await createAuthenticatedSupabaseClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .insert({ ...input, status: input.status ?? "new" })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as QuoteRequestRow;
}

// Server-side: update status
export async function updateQuoteStatusServer(id: string, status: QuoteStatus) {
  const supabase = await createAuthenticatedSupabaseClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .update({ status })
    .eq("id", id)
    .select("id,status");
  if (error) throw new Error(error.message);
  return { ok: true as const, data: data?.[0] };
}

// Server-side: fetch minimal fields for reply email
export async function getQuoteHeaderForReply(
  id: string
): Promise<Pick<
  QuoteRequestRow,
  "id" | "email" | "contact_name" | "company"
> | null> {
  const supabase = await createAuthenticatedSupabaseClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .select("id,email,contact_name,company")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as any;
}
