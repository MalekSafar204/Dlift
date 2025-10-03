import { supabaseServer } from '@/lib/supabaseServer';
import QuotesDashboard from './quotesDashboard';


export const revalidate = 0;

export default async function QuotesPage() {
  const { data, error } = await supabaseServer
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw error;
  return <QuotesDashboard initialQuotes={data || []} />;
}
