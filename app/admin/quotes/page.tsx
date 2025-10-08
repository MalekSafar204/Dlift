import { listQuotes } from '@/lib/quotesService';
import QuotesDashboard from './quotesDashboard';


export const revalidate = 0;

export default async function QuotesPage() {
  const data = await listQuotes(200);
  return <QuotesDashboard initialQuotes={data} />;
}
