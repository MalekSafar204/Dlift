import { ReactNode } from 'react';

// NOTE: This global admin layout has been neutralized (no auth) to stop redirect loops.
// Actual auth protection now lives in `app/admin/quotes/layout.tsx` for the protected area only.

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
