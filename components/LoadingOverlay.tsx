import React from "react";

interface LoadingOverlayProps {
  darken?: boolean; // keep for future styling variants
  iconSrc?: string;
  alt?: string;
}

export default function LoadingOverlay({
  darken = true,
  iconSrc = "/logos/noBack.png",
  alt = "Loading",
}: LoadingOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 ${darken ? "bg-black/70" : "bg-black/50"} flex items-center justify-center`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center">
        <img src={iconSrc} alt={alt} className="h-24 w-auto drop-shadow-lg" />
        <div className="mt-6 h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
