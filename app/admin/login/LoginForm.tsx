"use client";
import { useState } from 'react';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = formData.get('user');
    const pass = formData.get('pass');
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ user, pass }) });
      if (!res.ok) {
        setError('Invalid credentials');
        setLoading(false);
        return;
      }
      window.location.href = '/admin/quotes';
    } catch (err: any) {
      setError(err?.message || 'Login failed');
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4 max-w-sm w-full bg-white border rounded p-6 shadow" onSubmit={handleSubmit}>
      <h1 className="text-lg font-semibold text-center">Admin Login</h1>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="user">User</label>
        <input id="user" name="user" className="w-full border rounded px-3 py-2 text-sm" required autoComplete="username" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="pass">Password</label>
        <input id="pass" name="pass" type="password" className="w-full border rounded px-3 py-2 text-sm" required autoComplete="current-password" />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="w-full bg-black text-white py-2 rounded text-sm disabled:opacity-60" type="submit">
        {loading ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  );
}
