"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Entry = {
  id: string;
  title: string;
  body: string;
  monthLabel: string;
  kind: string;
};

export function FamilyDiaryAdmin({
  familyId,
  entries,
  followers,
}: {
  familyId: string;
  entries: Entry[];
  followers: { id: string; name: string; email: string }[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    body: "",
    monthLabel: "Month 1",
    kind: "update",
  });

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch(`/api/admin/families/${familyId}/diary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      setMessage("Could not add entry");
      return;
    }
    setForm({ title: "", body: "", monthLabel: "Month 1", kind: "update" });
    setMessage("Diary entry published — followers will see it on the family page");
    router.refresh();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-xl text-ink">Diary / newsletter entries</h2>
        <ul className="mt-4 space-y-4">
          {entries.map((entry) => (
            <li key={entry.id} className="border border-ink/10 bg-paper p-4 text-sm">
              <p className="text-xs tracking-wide text-aluminum uppercase">
                {entry.monthLabel} · {entry.kind}
              </p>
              <p className="mt-1 font-medium text-ink">{entry.title}</p>
              <p className="mt-2 text-slate">{entry.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        <form onSubmit={addEntry} className="space-y-4 border border-ink/10 bg-paper p-5">
          <h2 className="font-display text-xl text-ink">Add diary letter</h2>
          <label className="block text-sm">
            Month label
            <input
              value={form.monthLabel}
              onChange={(e) => setForm((f) => ({ ...f, monthLabel: e.target.value }))}
              className="mt-2 w-full border border-fog/70 px-3 py-2"
              placeholder="1 year later"
            />
          </label>
          <label className="block text-sm">
            Kind
            <select
              value={form.kind}
              onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))}
              className="mt-2 w-full border border-fog/70 px-3 py-2"
            >
              <option value="support">support</option>
              <option value="update">update</option>
              <option value="year_later">year_later</option>
            </select>
          </label>
          <label className="block text-sm">
            Title
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              className="mt-2 w-full border border-fog/70 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Body
            <textarea
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              required
              rows={5}
              className="mt-2 w-full border border-fog/70 px-3 py-2"
            />
          </label>
          <button type="submit" disabled={saving} className="bg-ink px-4 py-2 text-sm text-bone">
            {saving ? "Publishing…" : "Publish to family diary"}
          </button>
          {message && <p className="text-sm text-slate">{message}</p>}
        </form>

        <div className="border border-ink/10 bg-paper p-5">
          <h2 className="font-display text-xl text-ink">Diary followers</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {followers.map((f) => (
              <li key={f.id} className="flex justify-between gap-3 border-b border-ink/5 pb-2">
                <span>{f.name}</span>
                <span className="text-aluminum">{f.email}</span>
              </li>
            ))}
            {followers.length === 0 && (
              <li className="text-aluminum">No followers yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
