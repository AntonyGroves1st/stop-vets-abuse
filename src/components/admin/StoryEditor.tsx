"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RichEditor } from "@/components/admin/RichEditor";
import { slugify } from "@/lib/utils";

const BRANCHES = [
  "Army",
  "Navy",
  "Air Force",
  "Marines",
  "Coast Guard",
  "Space Force",
  "DoD",
  "VA-adjacent",
];

type StoryData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: string;
  branch: string;
  coverUrl: string;
  featured: boolean;
};

export function StoryEditor({ initial }: { initial?: Partial<StoryData> }) {
  const router = useRouter();
  const [data, setData] = useState<StoryData>({
    id: initial?.id,
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    body: initial?.body || JSON.stringify({ type: "doc", content: [{ type: "paragraph" }] }),
    status: initial?.status || "draft",
    branch: initial?.branch || "Army",
    coverUrl: initial?.coverUrl || "",
    featured: initial?.featured || false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch(data.id ? `/api/admin/stories/${data.id}` : "/api/admin/stories", {
      method: data.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) {
      setMessage(json.error || "Save failed");
      return;
    }
    setMessage("Saved");
    if (!data.id) {
      router.push(`/admin/stories/${json.id}`);
      router.refresh();
    } else {
      router.refresh();
    }
  }

  async function remove() {
    if (!data.id || !confirm("Delete this story?")) return;
    await fetch(`/api/admin/stories/${data.id}`, { method: "DELETE" });
    router.push("/admin/stories");
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm">
          <span className="text-aluminum">Title</span>
          <input
            value={data.title}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                title: e.target.value,
                slug: d.id ? d.slug : slugify(e.target.value),
              }))
            }
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          />
        </label>
        <label className="block text-sm">
          <span className="text-aluminum">Slug</span>
          <input
            value={data.slug}
            onChange={(e) => setData((d) => ({ ...d, slug: slugify(e.target.value) }))}
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-aluminum">Excerpt</span>
        <textarea
          value={data.excerpt}
          onChange={(e) => setData((d) => ({ ...d, excerpt: e.target.value }))}
          rows={3}
          className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="block text-sm">
          <span className="text-aluminum">Branch</span>
          <select
            value={data.branch}
            onChange={(e) => setData((d) => ({ ...d, branch: e.target.value }))}
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          >
            {BRANCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-aluminum">Status</span>
          <select
            value={data.status}
            onChange={(e) => setData((d) => ({ ...d, status: e.target.value }))}
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
        <label className="mt-7 flex items-center gap-2 text-sm text-slate">
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(e) => setData((d) => ({ ...d, featured: e.target.checked }))}
          />
          Featured on home
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-aluminum">Cover image URL</span>
        <input
          value={data.coverUrl}
          onChange={(e) => setData((d) => ({ ...d, coverUrl: e.target.value }))}
          placeholder="https://… or /uploads/…"
          className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
        />
      </label>

      <div>
        <p className="mb-2 text-sm text-aluminum">Body</p>
        <RichEditor value={data.body} onChange={(body) => setData((d) => ({ ...d, body }))} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-ink px-5 py-2.5 text-sm font-medium text-bone hover:bg-slate disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save story"}
        </button>
        {data.id && (
          <button
            type="button"
            onClick={remove}
            className="border border-copper/40 px-5 py-2.5 text-sm text-copper-deep"
          >
            Delete
          </button>
        )}
        {message && <span className="self-center text-sm text-slate">{message}</span>}
      </div>
    </div>
  );
}
