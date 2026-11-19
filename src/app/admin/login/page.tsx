"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="text-xs tracking-[0.22em] text-aluminum uppercase">Back office</p>
      <h1 className="mt-3 font-display text-3xl text-bone">Sign in</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm text-fog">
          Email
          <input
            name="email"
            type="email"
            required
            defaultValue="admin@stopvetsabuse.org"
            className="mt-2 w-full border border-white/15 bg-ink-soft px-3 py-2.5 text-bone outline-none focus:border-copper"
          />
        </label>
        <label className="block text-sm text-fog">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full border border-white/15 bg-ink-soft px-3 py-2.5 text-bone outline-none focus:border-copper"
          />
        </label>
        {error && <p className="text-sm text-copper-hot">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-copper px-4 py-3 text-sm font-semibold text-bone hover:bg-copper-hot disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Enter admin"}
        </button>
      </form>
    </div>
  );
}
