"use client";
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Quote = any;

export default function QuotesDashboard({ initialQuotes }: { initialQuotes: Quote[] }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [showReply, setShowReply] = useState(false);
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState<'all'|'new'|'in_progress'|'closed'>('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ type: 'success'|'error'; msg: string } | null>(null);

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

  function flash(type: 'success'|'error', msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  function updateStatus(id: string, status: string) {
    const prev = quotes;
    setQuotes(q => q.map(r => r.id === id ? { ...r, status } : r));
    fetch(`/api/quotes/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      .then(async res => {
        if (!res.ok) {
          const j = await safeJson(res);
          throw new Error(j?.error || 'Failed to update status');
        }
        flash('success', 'Status updated');
      })
      .catch((e) => { setQuotes(prev); flash('error', e?.message || 'Failed to update status'); });
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
      flash('success', 'Reply sent');
    } else {
      const j = await safeJson(res);
      flash('error', j?.error || 'Failed to send');
    }
  }

  function safeJson(res: Response) {
    return res.text().then(t => { try { return JSON.parse(t); } catch { return null; } });
  }

  const counts = useMemo(() => ({
    total: quotes.length,
    newer: quotes.filter(q => q.status === 'new').length,
    progress: quotes.filter(q => q.status === 'in_progress').length,
    closed: quotes.filter(q => q.status === 'closed').length,
  }), [quotes]);

  const filtered = useMemo(() => {
    const base = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter(r => (
      r.company?.toLowerCase().includes(q) ||
      r.contact_name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.work_type?.toLowerCase().includes(q)
    ));
  }, [quotes, filter, search]);

  function StatusPill({ value }: { value: string }) {
    const map: Record<string, string> = {
      new: 'bg-gray-200 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-700',
      closed: 'bg-emerald-100 text-emerald-700'
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[value] || 'bg-gray-100 text-gray-700'}`}>{value}</span>;
  }

  function fmtDate(s: string) {
    if (!s) return '—';
    try { return new Date(s).toLocaleDateString(); } catch { return s; }
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Quotes</h2>
          <p className="text-sm text-gray-500">Manage incoming quote requests and reply to clients.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-2 bg-white border rounded-lg text-sm shadow-sm">Total <span className="font-semibold ml-1">{counts.total}</span></div>
          <div className="px-3 py-2 bg-white border rounded-lg text-sm shadow-sm">New <span className="font-semibold ml-1">{counts.newer}</span></div>
          <div className="px-3 py-2 bg-white border rounded-lg text-sm shadow-sm">In Progress <span className="font-semibold ml-1">{counts.progress}</span></div>
          <div className="px-3 py-2 bg-white border rounded-lg text-sm shadow-sm">Closed <span className="font-semibold ml-1">{counts.closed}</span></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex gap-2">
          {(['all','new','in_progress','closed'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-sm border ${filter===s ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>{s.replace('_',' ')}</button>
          ))}
        </div>
        <div className="md:ml-auto">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search company, contact, email..." className="border rounded-lg px-3 py-2 text-sm w-full md:w-80" />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left sticky top-0">
                <tr className="text-gray-600">
                  <th className="px-3 py-2 font-medium">Company</th>
                  <th className="px-3 py-2 font-medium">Contact</th>
                  <th className="px-3 py-2 font-medium">Capacity</th>
                  <th className="px-3 py-2 font-medium">Dates</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(q => (
                  <tr key={q.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 cursor-pointer" onClick={() => { setSelected(q); }}>{q.company}</td>
                    <td className="px-3 py-2">{q.contact_name} <span className="text-gray-400">/</span> <span className="text-gray-600">{q.email}</span></td>
                    <td className="px-3 py-2">{q.capacity_needed}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{fmtDate(q.start_date)} → {fmtDate(q.end_date)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <StatusPill value={q.status} />
                        <select className="text-xs border rounded px-1 py-0.5" value={q.status} onChange={e => updateStatus(q.id, e.target.value)}>
                          <option value="new">new</option>
                          <option value="in_progress">in_progress</option>
                          <option value="closed">closed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button className="text-blue-600 text-xs" onClick={() => { setSelected(q); setShowReply(true); }}>Reply</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">No matching quotes</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
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
                <p><b>Dates:</b> {fmtDate(selected.start_date)} → {fmtDate(selected.end_date)}</p>
                <p><b>Preferred Manufacturer:</b> {selected.preferred_manufacturer || '—'}</p>
                <p><b>Notes:</b> {selected.notes || '—'}</p>
                <button className="mt-2 text-blue-600" onClick={() => setShowReply(true)}>Reply</button>
              </div>
            ) : <p className="text-gray-500 text-xs">Select a quote…</p>}
          </div>

          {showReply && selected && (
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-medium mb-2 text-sm">Reply to {selected.contact_name}</h3>
              <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); sendReply(e.currentTarget); }}>
                <input name="subject" defaultValue={`Re: Quote Request – ${selected.company}`} className="w-full border rounded px-2 py-2 text-sm" required />
                <textarea name="message" rows={8} className="w-full border rounded px-2 py-2 text-sm" required placeholder={`Hi ${selected.contact_name},\n\nThanks for your request. Here's our initial feedback...\n\nBest regards,\nDlift Team`} />
                <div className="flex gap-2 justify-end">
                  <button type="button" className="text-gray-500 text-xs" onClick={() => setShowReply(false)}>Cancel</button>
                  <button disabled={sending} className="bg-black text-white text-xs px-3 py-1.5 rounded" type="submit">{sending ? 'Sending...' : 'Send'}</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-sm ${toast.type==='success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
