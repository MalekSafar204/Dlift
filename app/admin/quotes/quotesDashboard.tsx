"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { sendQuoteReply, updateQuoteStatus } from '@/lib/quotesService';
import type { QuoteRequestRow, QuoteStatus } from "@/constants/types";

type Quote = QuoteRequestRow;

export default function QuotesDashboard({
  initialQuotes,
}: {
  initialQuotes: Quote[];
}) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [showReply, setShowReply] = useState(false);
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState<"all" | QuoteStatus>("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("quote_requests_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "quote_requests" },
        (payload) => {
          setQuotes((q) => [payload.new as Quote, ...q]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "quote_requests" },
        (payload) => {
          setQuotes((q) =>
            q.map((r) =>
              r.id === (payload.new as any).id ? (payload.new as Quote) : r
            )
          );
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function flash(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  function updateStatus(id: string, status: QuoteStatus) {
    const prev = quotes;
    setQuotes((q) => q.map((r) => (r.id === id ? { ...r, status } : r)));
    console.log("STATUS CHANGIN TO: ---->",status);
    updateQuoteStatus(id, status)
      .then(() => flash('success', 'Status updated'))
      .catch((e: any) => { setQuotes(prev); flash('error', e?.response?.data?.error || e?.message || 'Failed to update status'); });
  }

  async function sendReply(form: HTMLFormElement) {
    if (!selected) return;
    setSending(true);
    const fd = new FormData(form);
    const subject = fd.get("subject");
    const message = fd.get("message");
    try {
      await sendQuoteReply(selected.id, String(subject), String(message));
      setSending(false);
      setShowReply(false);
      flash('success', 'Reply sent');
    } catch (e: any) {
      setSending(false);
      flash('error', e?.response?.data?.error || e?.message || 'Failed to send');
    }
  }

  function safeJson(res: Response) {
    return res.text().then((t) => {
      try {
        return JSON.parse(t);
      } catch {
        return null;
      }
    });
  }

  const counts = useMemo(
    () => ({
      total: quotes.length,
      newer: quotes.filter((q) => q.status === "new").length,
      progress: quotes.filter((q) => q.status === "in_review").length,
      closed: quotes.filter((q) => q.status === "closed").length,
    }),
    [quotes]
  );

  const filtered = useMemo(() => {
    const base =
      filter === "all" ? quotes : quotes.filter((q) => q.status === filter);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (r) =>
        r.company?.toLowerCase().includes(q) ||
        r.contact_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.work_type?.toLowerCase().includes(q)
    );
  }, [quotes, filter, search]);

  function StatusPill({ value }: { value: QuoteStatus }) {
    const map: Record<string, string> = {
      new: "bg-gray-200 text-gray-800",
      in_progress: "bg-blue-100 text-blue-700",
      closed: "bg-emerald-100 text-emerald-700",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          map[value] || "bg-gray-100 text-gray-700"
        }`}
      >
        {value.replace("_"," ")}
      </span>
    );
  }

  function fmtDate(s?: string | null) {
    if (!s) return "—";
    try {
      return new Date(s).toLocaleDateString();
    } catch {
      return s;
    }
  }

  return (
    <div className="space-y-6 py-8 px-5">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#172A4F]">Quotes</h2>
          <p className="text-sm text-[#5F6678]">
            Manage incoming quote requests and reply to clients.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-2 bg-white border border-[#E2E1E1] rounded-lg text-sm shadow-sm">
            Total{" "}
            <span className="font-semibold text-[#172A4F] ml-1">
              {counts.total}
            </span>
          </div>
          <div className="px-3 py-2 bg-white border border-[#E2E1E1] rounded-lg text-sm shadow-sm">
            New{" "}
            <span className="font-semibold text-[#172A4F] ml-1">
              {counts.newer}
            </span>
          </div>
          <div className="px-3 py-2 bg-white border border-[#E2E1E1] rounded-lg text-sm shadow-sm">
            In Progress{" "}
            <span className="font-semibold text-[#172A4F] ml-1">
              {counts.progress}
            </span>
          </div>
          <div className="px-3 py-2 bg-white border border-[#E2E1E1] rounded-lg text-sm shadow-sm">
            Closed{" "}
            <span className="font-semibold text-[#172A4F] ml-1">
              {counts.closed}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex gap-2">
          {(["all", "new", "in_review", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                filter === s
                  ? "bg-[#172A4F] text-white border-[#172A4F]"
                  : "bg-white text-[#5F6678] border-[#E2E1E1] hover:bg-[#9FA4AF]/20"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="md:ml-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, contact, email..."
            className="border border-[#E2E1E1] rounded-lg px-3 py-2 text-sm w-full md:w-80 bg-white placeholder:text-[#9FA4AF] focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="overflow-x-auto border border-[#E2E1E1] rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#EDEDED] text-left sticky top-0">
                <tr className="text-[#5F6678]">
                  <th className="px-2 py-2 font-medium text-center">Company</th>
                  <th className="px-2 py-2 font-medium text-center">Contact</th>
                  <th className="px-2 py-2 font-medium text-center">
                    Crane Type
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    Description
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    Capacity
                  </th>
                  <th className="px-2 py-2 font-medium text-center">Dates</th>
                  <th className="px-2 py-2 font-medium text-center">Status</th>
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr
                    key={q.id}
                    className="border-t border-[#E2E1E1] hover:bg-[#9FA4AF]/10"
                  >
                    <td
                      className="px-3 py-2 text-center cursor-pointer text-[#172A4F]"
                      onClick={() => {
                        setSelected(q);
                      }}
                    >
                      {q.company}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.contact_name} <span className="text-[#9FA4AF]">/</span>{" "}
                      <span className="text-[#5F6678]">{q.email}</span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.category_id || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">{q.notes || "—"}</td>
                    <td className="px-3 py-2 text-center">
                      {q.capacity_needed || "—"}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {fmtDate(q.start_date)} → {fmtDate(q.end_date)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex items-center gap-2">
                        <StatusPill value={q.status} />
                        <select
                          className="text-xs border border-[#E2E1E1] rounded px-1 py-0.5 bg-white"
                          value={q.status}
                          onChange={(e) =>{
                            console.log(e.target.value);
                            
                            updateStatus(q.id, e.target.value as QuoteStatus)
                          }}
                        >
                          <option value="new">new</option>
                          <option value="in_review">in review</option>
                          <option value="closed">closed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        className="text-xs px-3 py-1.5 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition"
                        onClick={() => {
                          setSelected(q);
                          setShowReply(false);
                        }}
                      >
                        Select
                      </button>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        className="text-xs px-3 py-1.5 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition"
                        onClick={() => {
                          setSelected(q);
                          setShowReply(true);
                        }}
                      >
                        Reply
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[#5F6678]">
                      No matching quotes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="border border-[#E2E1E1] rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-medium mb-2 text-[#172A4F]">Details</h3>
            {selected ? (
              <div className="text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[#9FA4AF]">Quote ID</div>
                  <div className="font-mono text-[11px]">{selected.id}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[#9FA4AF]">Received</div>
                  <div>{fmtDate(selected.created_at)}</div>
                </div>
                <hr className="my-2" />
                <p>
                  <b className="text-[#172A4F]">Company:</b> {selected.company}
                </p>
                <p>
                  <b className="text-[#172A4F]">Contact:</b>{" "}
                  {selected.contact_name} / {selected.email}
                </p>
                <p>
                  <b className="text-[#172A4F]">Phone:</b>{" "}
                  {selected.phone || "—"}
                </p>
                <p>
                  <b className="text-[#172A4F]">Location:</b>{" "}
                  {selected.location || "—"}
                </p>
                <p>
                  <b className="text-[#172A4F]">Work Type:</b>{" "}
                  {selected.work_type || "—"}
                </p>
                <p>
                  <b className="text-[#172A4F]">Category:</b>{" "}
                  {selected.category_id || "—"}
                </p>
                <p>
                  <b className="text-[#172A4F]">Model:</b>{" "}
                  {selected.model_id || "—"}
                </p>
                <p>
                  <b className="text-[#172A4F]">Capacity:</b>{" "}
                  {selected.capacity_needed || "—"}
                </p>
                <p>
                  <b className="text-[#172A4F]">Dates:</b>{" "}
                  {fmtDate(selected.start_date)} → {fmtDate(selected.end_date)}
                </p>
                <p>
                  <b className="text-[#172A4F]">Preferred Manufacturer:</b>{" "}
                  {selected.preferred_manufacturer || "—"}
                </p>
                <div>
                  <div className="text-[#9FA4AF]">Notes</div>
                  <div className="whitespace-pre-wrap">
                    {selected.notes || "—"}
                  </div>
                </div>
                <button
                  className="mt-2 px-3 py-1.5 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition"
                  onClick={() => setShowReply(true)}
                >
                  Reply
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Select a quote…</p>
            )}
          </div>

          {showReply && selected && (
            <div className="border border-[#E2E1E1] rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-medium mb-2 text-sm text-[#172A4F]">
                Reply to {selected.contact_name}
              </h3>
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendReply(e.currentTarget);
                }}
              >
                <input
                  name="subject"
                  defaultValue={`Re: Quote Request – ${selected.company}`}
                  className="w-full border border-[#E2E1E1] rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
                  required
                />
                <textarea
                  name="message"
                  rows={8}
                  className="w-full border border-[#E2E1E1] rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
                  required
                  placeholder={`Hi ${selected.contact_name},\n\nThanks for your request. Here's our initial feedback...\n\nBest regards,\nDlift Team`}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="text-[#5F6678] text-xs hover:text-[#172A4F]"
                    onClick={() => setShowReply(false)}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={sending}
                    className="bg-[#D7953F] text-white text-xs px-3 py-1.5 rounded hover:opacity-90 transition disabled:opacity-60"
                    type="submit"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-sm ${
            toast.type === "success"
              ? "bg-[#172A4F] text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
