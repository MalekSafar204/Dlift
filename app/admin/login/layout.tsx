import { ReactNode } from "react";

// Login page doesn't need auth protection
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
