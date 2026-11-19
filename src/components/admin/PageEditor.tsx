"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseJson } from "@/lib/utils";

type Props = {
  id: string;
  slug: string;
  title: string;
  sections: string;
};

export function PageEditor({ id, slug, title: initialTitle, sections: raw }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [jsonText, setJsonText] = useState(() => {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      return raw;
    }
  });
  const [fields, setFields] = useState<Record<string, unknown>>(() => parseJson(raw, {}));
  const [mode, setMode] = useState<"fields" | "json">("fields");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const stringFields = Object.entries(fields).filter(
    ([, v]) => typeof v === "string" || typeof v === "number" || typeof v === "boolean",
  );

  async function save() {
    setSaving(true);
    setMessage("");
    let sections = fields;
    if (mode === "json") {
      try {
        sections = JSON.parse(jsonText);
      } catch {
        setSaving(false);
        setMessage("Invalid JSON");
        return;
      }
    }

    const res = await fetch(`/api/admin/pages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, sections: JSON.stringify(sections) }),
    });
    setSaving(false);
    if (!res.ok) {
      setMessage("Save failed");
      return;
    }
    setMessage("Saved — live on the public site");
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("fields")}
          className={`px-3 py-1.5 text-sm ${mode === "fields" ? "bg-ink text-bone" : "border border-ink/15"}`}
        >
          Form fields
        </button>
        <button
          type="button"
          onClick={() => {
            setJsonText(JSON.stringify(fields, null, 2));
            setMode("json");
          }}
          className={`px-3 py-1.5 text-sm ${mode === "json" ? "bg-ink text-bone" : "border border-ink/15"}`}
        >
          JSON / advanced
        </button>
        <span className="self-center text-xs text-aluminum">Public path: /{slug}</span>
      </div>

      <label className="block text-sm">
        <span className="text-aluminum">Page title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
        />
      </label>

      {mode === "fields" ? (
        <div className="space-y-4">
          {stringFields.map(([key, value]) => (
            <label key={key} className="block text-sm">
              <span className="text-aluminum">{key}</span>
              {typeof value === "boolean" ? (
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.checked }))}
                  className="mt-2 ml-3"
                />
              ) : String(value).length > 120 || key === "body" || key === "intro" ? (
                <textarea
                  value={String(value)}
                  rows={key === "body" ? 10 : 4}
                  onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                  className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 font-mono text-[13px] outline-none focus:border-copper"
                />
              ) : (
                <input
                  value={String(value)}
                  onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                  className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
                />
              )}
            </label>
          ))}
          {Object.keys(fields).some((k) => typeof fields[k] === "object") && (
            <p className="text-sm text-aluminum">
              Nested blocks (e.g. branch lists) are editable in JSON mode.
            </p>
          )}
        </div>
      ) : (
        <label className="block text-sm">
          <span className="text-aluminum">Sections JSON</span>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={22}
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 font-mono text-[13px] outline-none focus:border-copper"
          />
        </label>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-ink px-5 py-2.5 text-sm font-medium text-bone hover:bg-slate disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save page"}
        </button>
        {message && <span className="text-sm text-slate">{message}</span>}
      </div>
    </div>
  );
}
