"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function mark() {
    setLoading(true);
    await fetch(`/api/admin/inbox/${id}`, { method: "PATCH" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={mark}
      disabled={loading}
      className="border border-ink/15 px-3 py-1.5 text-xs text-slate hover:border-ink"
    >
      {loading ? "…" : "Mark read"}
    </button>
  );
}
