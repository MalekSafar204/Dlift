import { ReactNode } from 'react';
import { requireAdminSession } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function QuotesProtectedLayout({ children }: { children: ReactNode }) {
  const sess = await requireAdminSession();
  if (!sess) redirect('/admin/login');
  return (
    <div className="min-h-screen flex flex-col bg-[#EDEDED] text-[#5F6678]">
      <header className="px-4 py-3 flex items-center justify-between bg-[#172A4F] text-white shadow">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold tracking-wide">Admin</h1>
          <nav className="hidden sm:flex gap-4 text-sm">
            <Link className="hover:text-[#D7953F] transition-colors" href="/admin/quotes">Quotes</Link>
          </nav>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="px-3 py-1.5 rounded-md bg-[#D7953F] hover:opacity-90 transition text-white text-sm" type="submit">Logout</button>
        </form>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}