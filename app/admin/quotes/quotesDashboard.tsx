"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { sendQuoteReply, updateQuoteStatus } from "@/lib/quotesService";
import type { QuoteRequestRow, QuoteStatus } from "@/constants/types";

type Quote = QuoteRequestRow;

export default function QuotesDashboard({
  initialQuotes,
}: {
  initialQuotes: Quote[];
}) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
    console.log("STATUS CHANGIN TO: ---->", status);
    updateQuoteStatus(id, status)
      .then(() => flash("success", "Status updated"))
      .catch((e: any) => {
        setQuotes(prev);
        flash(
          "error",
          e?.response?.data?.error || e?.message || "Failed to update status"
        );
      });
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
      setShowReplyModal(false);
      flash("success", "Reply sent");
    } catch (e: any) {
      setSending(false);
      flash(
        "error",
        e?.response?.data?.error || e?.message || "Failed to send"
      );
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
        {value.replace("_", " ")}
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

  // Accessibility: close modals with ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowDetailsModal(false);
        setShowReplyModal(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus management for reply modal
  const replyFirstFieldRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showReplyModal && replyFirstFieldRef.current) {
      replyFirstFieldRef.current.focus();
    }
  }, [showReplyModal]);

  return (
    <div className="space-y-6 py-8 px-5 relative">
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
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="overflow-x-auto border border-[#E2E1E1] rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#EDEDED] text-left sticky top-0">
                <tr className="text-[#5F6678]">
                  <th className="px-2 py-2 font-medium text-center">Company</th>
                  <th className="px-2 py-2 font-medium text-center">Representative</th>
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
                    className="border-t border-[#E2E1E1] hover:bg-[#9FA4AF]/10 cursor-pointer"
                    onClick={() => {
                      setSelected(q);
                      setShowDetailsModal(true);
                    }}
                  >
                    <td
                      className="px-3 py-2 text-center cursor-pointer text-[#172A4F]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(q);
                        setShowDetailsModal(true);
                      }}
                    >
                      {q.company}
                    </td>
                    <td
                      className="px-3 py-2 text-center cursor-pointer text-[#172A4F]"
                    >
                      {q.contact_name}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {/* {q.contact_name} <span className="text-[#9FA4AF]">/</span>{" "} */}
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
                      <div className="flex items-center gap-2 justify-center">
                        <StatusPill value={q.status} />
                        {/* <select
                          className="text-xs border border-[#E2E1E1] rounded px-1 py-0.5 bg-white"
                          value={q.status}
                          onChange={(e) =>{
                            console.log(e.target.value);
                            
                            // updateStatus(q.id, e.target.value as QuoteStatus)
                          }}
                        >
                          <option value="new">new</option>
                          <option value="in_review">in review</option>
                          <option value="closed">closed</option>
                        </select> */}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-xs px-3 py-1.5 rounded-md bg-[#172A4F] text-white hover:opacity-90 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(q);
                            setShowDetailsModal(true);
                          }}
                        >
                          Details
                        </button>
                        <button
                          className="text-xs px-3 py-1.5 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(q);
                            setShowReplyModal(true);
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2" />
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

      {/* Details Modal */}
      {showDetailsModal && selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-start md:items-center justify-center px-4 py-10"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDetailsModal(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg border border-[#E2E1E1] p-6 space-y-3 animate-fadeIn">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold text-[#172A4F]">
                Quote Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                aria-label="Close details"
                className="text-[#5F6678] hover:text-[#172A4F]"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div className="text-[#9FA4AF]">Quote ID</div>
              <div className="font-mono text-[11px]">{selected.id}</div>
              <div className="text-[#9FA4AF]">Received</div>
              <div>{fmtDate(selected.created_at)}</div>
              <div className="text-[#9FA4AF]">Company</div>
              <div>{selected.company}</div>
              <div className="text-[#9FA4AF]">Contact</div>
              <div>
                {selected.contact_name} / {selected.email}
              </div>
              <div className="text-[#9FA4AF]">Phone</div>
              <div>{selected.phone || "—"}</div>
              <div className="text-[#9FA4AF]">Location</div>
              <div>{selected.location || "—"}</div>
              <div className="text-[#9FA4AF]">Work Type</div>
              <div>{selected.work_type || "—"}</div>
              <div className="text-[#9FA4AF]">Category</div>
              <div>{selected.category_id || "—"}</div>
              <div className="text-[#9FA4AF]">Model</div>
              <div>{selected.model_id || "—"}</div>
              <div className="text-[#9FA4AF]">Capacity Needed</div>
              <div>{selected.capacity_needed || "—"}</div>
              <div className="text-[#9FA4AF]">Dates</div>
              <div>
                {fmtDate(selected.start_date)} → {fmtDate(selected.end_date)}
              </div>
              <div className="text-[#9FA4AF]">Preferred Mfr</div>
              <div>{selected.preferred_manufacturer || "—"}</div>
            </div>
            <div className="text-xs mt-2">
              <div className="text-[#9FA4AF] mb-1">Notes</div>
              <div className="whitespace-pre-wrap border rounded p-2 bg-[#F8F8F8] max-h-40 overflow-auto">
                {selected.notes || "—"}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                className="text-xs px-3 py-1.5 rounded-md bg-[#172A4F] text-white hover:opacity-90 transition"
                onClick={() => {
                  setShowDetailsModal(false);
                  setShowReplyModal(true);
                }}
              >
                Reply
              </button>
              <button
                className="text-xs px-3 py-1.5 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-10"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowReplyModal(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg border border-[#E2E1E1] p-6 space-y-4 animate-fadeIn">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-[#172A4F]">
                Reply to {selected.contact_name}
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                aria-label="Close reply"
                className="text-[#5F6678] hover:text-[#172A4F]"
              >
                ✕
              </button>
            </div>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendReply(e.currentTarget);
              }}
            >
              <input
                ref={replyFirstFieldRef}
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
                  onClick={() => setShowReplyModal(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={sending}
                  className="bg-[#D7953F] text-white text-xs px-3 py-1.5 rounded hover:opacity-90 transition disabled:opacity-60"
                  type="submit"
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
