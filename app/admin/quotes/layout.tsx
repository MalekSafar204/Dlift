import { ReactNode } from "react";
import { requireAuth } from "@/lib/supabaseAuth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

export default async function QuotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuth();
  if (!user) redirect("/admin/login");
  return (
    <div className="min-h-screen flex flex-col bg-[#EDEDED] text-[#5F6678]">
      <AdminNavbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
