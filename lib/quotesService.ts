import axios from 'axios';
import type { QuoteRequestPayload } from '@/constants/types';
import type { QuoteRequestRow, QuoteStatus } from '@/constants/types';

// Client-side HTTP functions (use Next API routes)
export async function createQuote(payload: QuoteRequestPayload): Promise<{ id: string }> {
	const res = await axios.post('/api/quotes', payload);
	return res.data as { id: string };
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<{ ok: true; data?: any }>{
	const res = await axios.patch(`/api/quotes/${id}/status`, { status });
	return res.data as { ok: true; data?: any };
}

export async function sendQuoteReply(id: string, subject: string, message: string): Promise<{ ok: true; id: string }>{
	const res = await axios.post(`/api/quotes/${id}/reply`, { subject, message });
	return res.data as { ok: true; id: string };
}

// Server-side direct Supabase helpers. Use dynamic import to avoid bundling server-only code on the client.
export async function listQuotes(limit = 200): Promise<QuoteRequestRow[]> {
	const { supabaseServer } = await import('./supabaseServer');
	const { data, error } = await supabaseServer
		.from('quote_requests')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(limit);
	if (error) throw new Error(error.message);
	return data || [];
}

export async function getQuoteById(id: string): Promise<QuoteRequestRow | null> {
	const { supabaseServer } = await import('./supabaseServer');
	const { data, error } = await supabaseServer
		.from('quote_requests')
		.select('*')
		.eq('id', id)
		.single();
	if (error) return null;
	return (data as QuoteRequestRow) || null;
}

export async function deleteQuote(id: string): Promise<{ ok: boolean }>{
	const { supabaseServer } = await import('./supabaseServer');
	const { error } = await supabaseServer
		.from('quote_requests')
		.delete()
		.eq('id', id);
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
	const { supabaseServer } = await import('./supabaseServer');
	const { data, error } = await supabaseServer
		.from('quote_requests')
		.insert({ ...input, status: input.status ?? 'new' })
		.select()
		.single();
	if (error) throw new Error(error.message);
	return data as QuoteRequestRow;
}

// Server-side: update status
export async function updateQuoteStatusServer(id: string, status: QuoteStatus) {
	const { supabaseServer } = await import('./supabaseServer');
	const { data, error } = await supabaseServer
		.from('quote_requests')
		.update({ status })
		.eq('id', id)
		.select('id,status');
	if (error) throw new Error(error.message);
	return { ok: true as const, data: data?.[0] };
}

// Server-side: fetch minimal fields for reply email
export async function getQuoteHeaderForReply(id: string): Promise<Pick<QuoteRequestRow,'id'|'email'|'contact_name'|'company'> | null> {
	const { supabaseServer } = await import('./supabaseServer');
	const { data, error } = await supabaseServer
		.from('quote_requests')
		.select('id,email,contact_name,company')
		.eq('id', id)
		.single();
	if (error) return null;
	return data as any;
}
