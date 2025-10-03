import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/adminAuth';

export default async function LoginPage() {
  if (await requireAdminSession()) redirect('/admin/quotes');
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form className="space-y-4 max-w-sm w-full bg-white border rounded p-6 shadow" onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const user = formData.get('user');
        const pass = formData.get('pass');
        const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ user, pass }) });
        if (res.ok) window.location.href = '/admin/quotes';
        else alert('Invalid credentials');
      }}>
        <h1 className="text-lg font-semibold text-center">Admin Login</h1>
        <div>
          <label className="block text-sm font-medium mb-1">User</label>
          <input name="user" className="w-full border rounded px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="pass" type="password" className="w-full border rounded px-3 py-2 text-sm" required />
        </div>
        <button className="w-full bg-black text-white py-2 rounded text-sm" type="submit">Login</button>
      </form>
    </div>
  );
}
