import type { QuoteRequestRow } from "@/constants/types";

interface DetailsModalProps {
  quote: QuoteRequestRow;
  onClose: () => void;
  onReply: () => void;
}

function fmtDate(s?: string | null) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString();
  } catch {
    return s;
  }
}

export default function DetailsModal({
  quote,
  onClose,
  onReply,
}: DetailsModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-40 flex items-start md:items-center justify-center px-4 py-10"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg border border-[#E2E1E1] p-8 space-y-4 animate-fadeIn">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-semibold text-[#172A4F]">
            Quote Details
          </h3>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="text-[#5F6678] hover:text-[#172A4F] text-xl"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-base">
          <div className="text-[#9FA4AF] font-medium">Quote ID</div>
          <div className="font-mono text-sm">{quote.id}</div>
          <div className="text-[#9FA4AF] font-medium">Received</div>
          <div className="text-[#172A4F]">{fmtDate(quote.created_at)}</div>
          <div className="text-[#9FA4AF] font-medium">Company</div>
          <div className="text-[#172A4F] font-semibold">{quote.company}</div>
          <div className="text-[#9FA4AF] font-medium">Contact</div>
          <div className="text-[#172A4F]">
            {quote.contact_name} / {quote.email}
          </div>
          <div className="text-[#9FA4AF] font-medium">Phone</div>
          <div className="text-[#172A4F]">{quote.phone || "—"}</div>
          <div className="text-[#9FA4AF] font-medium">Location</div>
          <div className="text-[#172A4F]">{quote.location || "—"}</div>
          <div className="text-[#9FA4AF] font-medium">Work Type</div>
          <div className="text-[#172A4F]">{quote.work_type || "—"}</div>
          <div className="text-[#9FA4AF] font-medium">Category</div>
          <div className="text-[#172A4F]">{quote.category_id || "—"}</div>
          <div className="text-[#9FA4AF] font-medium">Model</div>
          <div className="text-[#172A4F]">{quote.model_id || "—"}</div>
          <div className="text-[#9FA4AF] font-medium">Capacity Needed</div>
          <div className="text-[#172A4F]">{quote.capacity_needed || "—"}</div>
          <div className="text-[#9FA4AF] font-medium">Dates</div>
          <div className="text-[#172A4F]">
            {fmtDate(quote.start_date)} → {fmtDate(quote.end_date)}
          </div>
          <div className="text-[#9FA4AF] font-medium">Preferred Mfr</div>
          <div className="text-[#172A4F]">
            {quote.preferred_manufacturer || "—"}
          </div>
        </div>
        <div className="text-base mt-4">
          <div className="text-[#9FA4AF] font-medium mb-2">Notes</div>
          <div className="whitespace-pre-wrap border rounded-lg p-4 bg-[#F8F8F8] max-h-48 overflow-auto text-[#172A4F]">
            {quote.notes || "—"}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            className="text-sm px-4 py-2 rounded-md bg-[#172A4F] text-white hover:opacity-90 transition font-medium"
            onClick={() => {
              onClose();
              onReply();
            }}
          >
            Reply
          </button>
          <button
            className="text-sm px-4 py-2 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

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
