import { ReactNode } from 'react';
import { requireAdminSession } from '@/lib/adminAuth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const sess = await requireAdminSession();
  if (!sess) redirect('/admin/login');
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-2 flex items-center gap-4 bg-gray-50">
        <h1 className="font-semibold">Admin</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin/quotes">Quotes</Link>
          <form action="/api/admin/logout" method="post">
            <button className="text-red-600" type="submit">Logout</button>
          </form>
        </nav>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
