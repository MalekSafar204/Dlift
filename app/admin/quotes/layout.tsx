import { ReactNode } from "react";
import { requireAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

export default async function QuotesProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sess = await requireAdminSession();
  if (!sess) redirect("/admin/login");
  return (
    <div className="min-h-screen flex flex-col bg-[#EDEDED] text-[#5F6678]">
      <AdminNavbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
