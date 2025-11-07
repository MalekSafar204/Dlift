"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { sendQuoteReply, updateQuoteStatus } from "@/lib/quotesService";
import type { QuoteRequestRow, QuoteStatus } from "@/constants/types";
import DetailsModal from "./DetailsModal";
import ReplyModal from "./ReplyModal";

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
  const [searchCompany, setSearchCompany] = useState("");
  const [searchContact, setSearchContact] = useState("");
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
    const companyQ = searchCompany.trim().toLowerCase();
    const contactQ = searchContact.trim().toLowerCase();

    if (!companyQ && !contactQ) return base;

    return base.filter((r) => {
      const matchCompany =
        !companyQ || r.company?.toLowerCase().includes(companyQ);
      const matchContact =
        !contactQ ||
        r.contact_name?.toLowerCase().includes(contactQ) ||
        r.email?.toLowerCase().includes(contactQ);
      return matchCompany && matchContact;
    });
  }, [quotes, filter, searchCompany, searchContact]);

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
        <div className="md:ml-auto flex gap-2">
          <input
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            placeholder="Search by company..."
            className="border border-[#E2E1E1] rounded-lg px-3 py-2 text-sm w-full md:w-56 bg-white placeholder:text-[#9FA4AF] focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
          />
          <input
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
            placeholder="Search by name or email..."
            className="border border-[#E2E1E1] rounded-lg px-3 py-2 text-sm w-full md:w-56 bg-white placeholder:text-[#9FA4AF] focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="overflow-x-auto border border-[#E2E1E1] rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className=" text-left sticky top-0">
                <tr className="text-[#5F6678]">
                  <th className="px-2 py-2 font-medium text-center">Company</th>
                  <th className="px-2 py-2 font-medium text-center">
                    Representative
                  </th>
                  <th className="px-2 py-2 font-medium text-center">Email</th>
                  <th className="px-2 py-2 font-medium text-center">Phone</th>
                  <th className="px-2 py-2 font-medium text-center">
                    Crane Type
                  </th>
                  <th className="px-2 py-2 font-medium text-center">Model</th>
                  <th className="px-2 py-2 font-medium text-center">
                    Location
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    Work Type
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    Capacity Needed
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    Preferred Mfr
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    Start Date
                  </th>
                  <th className="px-2 py-2 font-medium text-center">
                    End Date
                  </th>
                  <th className="px-2 py-2 font-medium text-center">Created</th>
                  <th className="px-2 py-2 font-medium text-center">Notes</th>
                  <th className="px-2 py-2 font-medium text-center">Status</th>
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
                    <td className="px-3 py-2 text-center text-[#172A4F]">
                      {q.contact_name}
                    </td>
                    <td className="px-3 py-2 text-center text-[#5F6678]">
                      {q.email}
                    </td>
                    <td className="px-3 py-2 text-center">{q.phone || "—"}</td>
                    <td className="px-3 py-2 text-center">
                      {q.category_id?.toUpperCase() || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.model_id?.toUpperCase() || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.location || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.work_type || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.capacity_needed || "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {q.preferred_manufacturer || "—"}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {fmtDate(q.start_date)}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {fmtDate(q.end_date)}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {fmtDate(q.created_at)}
                    </td>
                    <td
                      className="px-3 py-2 text-center max-w-[240px] truncate"
                      title={q.notes || undefined}
                    >
                      {q.notes || "—"}
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
                        {/* <button
                          className="text-xs px-3 py-1.5 rounded-md bg-[#172A4F] text-white hover:opacity-90 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(q);
                            setShowDetailsModal(true);
                          }}
                        >
                          Details
                        </button> */}
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
        <DetailsModal
          quote={selected}
          onClose={() => setShowDetailsModal(false)}
          onReply={() => setShowReplyModal(true)}
        />
      )}

      {/* Reply Modal */}
      {showReplyModal && selected && (
        <ReplyModal
          quote={selected}
          sending={sending}
          onClose={() => setShowReplyModal(false)}
          onSubmit={sendReply}
        />
      )}
    </div>
  );
}
