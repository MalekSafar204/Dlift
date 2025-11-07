import { ReactNode } from "react";

// Root admin layout: keep neutral to avoid login redirect loops.
// Each protected section (quotes, cranes) enforces auth in its own layout.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
