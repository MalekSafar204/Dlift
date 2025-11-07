"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError || !data.session) {
        setError(authError?.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Store tokens in cookies for server-side access
      await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
        }),
      });

      window.location.href = "/admin/quotes";
    } catch (err: any) {
      setError(err?.message || "Login failed");
      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-4 max-w-sm w-full bg-white border rounded p-6 shadow"
      onSubmit={handleSubmit}
    >
      <h1 className="text-lg font-semibold text-center">Admin Login</h1>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full border rounded px-3 py-2 text-sm"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full border rounded px-3 py-2 text-sm"
          required
          autoComplete="current-password"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded text-sm disabled:opacity-60"
        type="submit"
      >
        {loading ? "Authenticating..." : "Login"}
      </button>
    </form>
  );
}
