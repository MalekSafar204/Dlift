import { useEffect, useRef } from "react";
import type { QuoteRequestRow } from "@/constants/types";

interface ReplyModalProps {
  quote: QuoteRequestRow;
  sending: boolean;
  onClose: () => void;
  onSubmit: (form: HTMLFormElement) => void;
}

export default function ReplyModal({
  quote,
  sending,
  onClose,
  onSubmit,
}: ReplyModalProps) {
  const replyFirstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (replyFirstFieldRef.current) {
      replyFirstFieldRef.current.focus();
    }
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-10"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg border border-[#E2E1E1] p-8 space-y-5 animate-fadeIn">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-semibold text-[#172A4F]">
            Reply to {quote.contact_name}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close reply"
            className="text-[#5F6678] hover:text-[#172A4F] text-xl"
          >
            ✕
          </button>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e.currentTarget);
          }}
        >
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-[#172A4F] mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              ref={replyFirstFieldRef}
              name="subject"
              defaultValue={`Re: Quote Request – ${quote.company}`}
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#172A4F] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={10}
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              required
              placeholder={`Hi ${quote.contact_name},\n\nThanks for your request. Here's our initial feedback...\n\nBest regards,\nDlift Team`}
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              className="text-sm px-4 py-2 text-[#5F6678] hover:text-[#172A4F] font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              disabled={sending}
              className="bg-[#D7953F] text-white text-sm px-5 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60 font-medium"
              type="submit"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
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
