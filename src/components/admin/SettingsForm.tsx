"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteSettings } from "@/lib/settings";
import { formatCurrency } from "@/lib/utils";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initial);
  const [amountsText, setAmountsText] = useState(
    initial.donate.amounts.map((c) => (c / 100).toString()).join(", "),
  );
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const amounts = amountsText
      .split(",")
      .map((s) => Math.round(Number(s.trim()) * 100))
      .filter((n) => Number.isFinite(n) && n >= 100);

    const payload: SiteSettings = {
      ...settings,
      donate: {
        ...settings.donate,
        amounts: amounts.length ? amounts : settings.donate.amounts,
      },
    };

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      setMessage("Save failed");
      return;
    }
    setMessage("Settings saved");
    router.refresh();
  }

  return (
    <form onSubmit={save} className="max-w-3xl space-y-6">
      <section className="space-y-4 border border-ink/10 bg-paper p-5">
        <h2 className="font-display text-xl text-ink">Site identity</h2>
        {(
          [
            ["siteName", "Site name"],
            ["tagline", "Tagline"],
            ["contactEmail", "Contact email"],
            ["footerBlurb", "Footer blurb"],
            ["socialTwitter", "Twitter / X URL"],
            ["socialFacebook", "Facebook URL"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block text-sm">
            <span className="text-aluminum">{label}</span>
            {key === "footerBlurb" || key === "tagline" ? (
              <textarea
                value={settings[key]}
                onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                rows={3}
                className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
              />
            ) : (
              <input
                value={settings[key]}
                onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
              />
            )}
          </label>
        ))}
      </section>

      <section className="space-y-4 border border-ink/10 bg-paper p-5">
        <h2 className="font-display text-xl text-ink">Donate page</h2>
        <label className="block text-sm">
          <span className="text-aluminum">Headline</span>
          <input
            value={settings.donate.headline}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                donate: { ...s.donate, headline: e.target.value },
              }))
            }
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          />
        </label>
        <label className="block text-sm">
          <span className="text-aluminum">Subcopy</span>
          <textarea
            value={settings.donate.subcopy}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                donate: { ...s.donate, subcopy: e.target.value },
              }))
            }
            rows={4}
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          />
        </label>
        <label className="block text-sm">
          <span className="text-aluminum">Preset amounts (USD, comma-separated)</span>
          <input
            value={amountsText}
            onChange={(e) => setAmountsText(e.target.value)}
            className="mt-2 w-full border border-fog/70 bg-white px-3 py-2.5 outline-none focus:border-copper"
          />
          <span className="mt-1 block text-xs text-aluminum">
            Current: {settings.donate.amounts.map((a) => formatCurrency(a)).join(" · ")}
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate">
          <input
            type="checkbox"
            checked={settings.donate.monthlyEnabled}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                donate: { ...s.donate, monthlyEnabled: e.target.checked },
              }))
            }
          />
          Enable monthly giving (Stripe)
        </label>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-ink px-5 py-2.5 text-sm font-medium text-bone hover:bg-slate disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
        {message && <span className="text-sm text-slate">{message}</span>}
      </div>
    </form>
  );
}
