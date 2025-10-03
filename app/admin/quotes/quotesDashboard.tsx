"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Quote = any;

export default function QuotesDashboard({ initialQuotes }: { initialQuotes: Quote[] }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [showReply, setShowReply] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel('quote_requests_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'quote_requests' }, (payload) => {
        setQuotes(q => [payload.new as Quote, ...q]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'quote_requests' }, (payload) => {
        setQuotes(q => q.map(r => r.id === (payload.new as any).id ? payload.new as Quote : r));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  function updateStatus(id: string, status: string) {
    const prev = quotes;
    setQuotes(q => q.map(r => r.id === id ? { ...r, status } : r));
    fetch(`/api/quotes/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      .then(res => { if (!res.ok) throw new Error(); })
      .catch(() => setQuotes(prev));
  }

  async function sendReply(form: HTMLFormElement) {
    if (!selected) return;
    setSending(true);
    const fd = new FormData(form);
    const subject = fd.get('subject');
    const message = fd.get('message');
    const res = await fetch(`/api/quotes/${selected.id}/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, message }) });
    setSending(false);
    if (res.ok) {
      setShowReply(false);
      alert('Reply sent');
    } else {
      alert('Failed to send');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Quotes ({quotes.length})</h2>
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-3 py-2">Company</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Capacity</th>
                <th className="px-3 py-2">Dates</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 cursor-pointer" onClick={() => { setSelected(q); }}>{q.company}</td>
                  <td className="px-3 py-2">{q.category_id}</td>
                  <td className="px-3 py-2">{q.capacity_needed}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{q.start_date} → {q.end_date}</td>
                  <td className="px-3 py-2">
                    <select className="text-xs border rounded px-1 py-0.5" value={q.status} onChange={e => updateStatus(q.id, e.target.value)}>
                      <option value="new">new</option>
                      <option value="in_progress">in_progress</option>
                      <option value="closed">closed</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-blue-600 text-xs" onClick={() => { setSelected(q); setShowReply(true); }}>Reply</button>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr><td colSpan={6} className="text-center py-6 text-gray-500">No quotes yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-4">
        <div className="border rounded p-4 bg-white">
          <h3 className="font-medium mb-2">Details</h3>
          {selected ? (
            <div className="text-xs space-y-1">
              <p><b>Company:</b> {selected.company}</p>
              <p><b>Contact:</b> {selected.contact_name} / {selected.email}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Category:</b> {selected.category_id}</p>
              <p><b>Model:</b> {selected.model_id || '—'}</p>
              <p><b>Capacity:</b> {selected.capacity_needed}</p>
              <p><b>Location:</b> {selected.location}</p>
              <p><b>Work Type:</b> {selected.work_type}</p>
              <p><b>Dates:</b> {selected.start_date} → {selected.end_date}</p>
              <p><b>Preferred Manufacturer:</b> {selected.preferred_manufacturer || '—'}</p>
              <p><b>Notes:</b> {selected.notes || '—'}</p>
              <button className="mt-2 text-blue-600" onClick={() => setShowReply(true)}>Reply</button>
            </div>
          ) : <p className="text-gray-500 text-xs">Select a quote…</p>}
        </div>
        {showReply && selected && (
          <div className="border rounded p-4 bg-white">
            <h3 className="font-medium mb-2 text-sm">Reply to {selected.contact_name}</h3>
            <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); sendReply(e.currentTarget); }}>
              <input name="subject" defaultValue={`Re: Quote Request – ${selected.company}`} className="w-full border rounded px-2 py-1 text-xs" required />
              <textarea name="message" rows={6} className="w-full border rounded px-2 py-1 text-xs" required placeholder="Write your message..." />
              <div className="flex gap-2 justify-end">
                <button type="button" className="text-gray-500 text-xs" onClick={() => setShowReply(false)}>Cancel</button>
                <button disabled={sending} className="bg-black text-white text-xs px-3 py-1 rounded" type="submit">{sending ? 'Sending...' : 'Send'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
