"use client";

import { useState } from "react";

export function FamilyFollowForm({
  familyId,
  familyName,
}: {
  familyId: string;
  familyName: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/sponsor/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyId,
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not subscribe");
      setStatus("done");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6 md:p-7">
      <p className="eyebrow text-copper">Sponsor newsletter</p>
      <h3 className="font-display text-2xl text-ink">
        Get the {familyName} diary in your inbox
      </h3>
      <p className="text-sm text-slate">
        Month-by-month support notes and the one-year-later letter — personal, not generic blast
        mail.
      </p>
      <label className="block text-sm">
        <span className="text-aluminum">Name</span>
        <input
          name="name"
          required
          className="mt-2 w-full border border-ink/15 bg-white px-3 py-2.5 outline-none focus:border-copper"
        />
      </label>
      <label className="block text-sm">
        <span className="text-aluminum">Email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full border border-ink/15 bg-white px-3 py-2.5 outline-none focus:border-copper"
        />
      </label>
      <button type="submit" disabled={status === "loading"} className="btn-copper w-full">
        {status === "loading" ? "Joining…" : "Follow this family’s diary"}
      </button>
      {status === "done" && (
        <p className="text-sm text-copper">You’re on the list — new diary entries will reach you.</p>
      )}
      {status === "error" && <p className="text-sm text-copper-deep">{error}</p>}
    </form>
  );
}
