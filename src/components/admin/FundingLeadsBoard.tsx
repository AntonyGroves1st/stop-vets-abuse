"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  fundingCategories,
  fundingLeads,
  pursuitStatuses,
  type FundingLead,
  type FundingLeadCategory,
  type FundingPursuitStatus,
} from "@/content/funding-leads";

type StatusRow = { status: FundingPursuitStatus; note?: string; updatedAt?: string };
type StatusMap = Record<string, StatusRow>;

const priorityStyle: Record<FundingLead["priority"], string> = {
  now: "bg-flag-red/15 text-flag-red",
  high: "bg-copper/15 text-copper",
  watch: "bg-ink/5 text-aluminum",
};

export function FundingLeadsBoard({ initialMap }: { initialMap: StatusMap }) {
  const [map, setMap] = useState<StatusMap>(initialMap);
  const [filter, setFilter] = useState<FundingLeadCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [pending, startTransition] = useTransition();
  const mapRef = useRef(map);
  const noteTimers = useRef<Record<string, number>>({});

  useEffect(() => {
    setMap(initialMap);
    mapRef.current = initialMap;
  }, [initialMap]);

  useEffect(() => {
    mapRef.current = map;
  }, [map]);

  useEffect(() => {
    return () => {
      Object.values(noteTimers.current).forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fundingLeads.filter((lead) => {
      if (filter !== "all" && lead.category !== filter) return false;
      if (!q) return true;
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.org.toLowerCase().includes(q) ||
        lead.why.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  function persist(next: StatusMap) {
    startTransition(async () => {
      await fetch("/api/admin/funding-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ map: next }),
      });
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 1600);
    });
  }

  function patchLead(id: string, patch: Partial<StatusRow>, debounceNote = false) {
    const next: StatusMap = {
      ...mapRef.current,
      [id]: {
        status: patch.status ?? mapRef.current[id]?.status ?? "new",
        note: patch.note ?? mapRef.current[id]?.note ?? "",
        updatedAt: new Date().toISOString(),
      },
    };
    mapRef.current = next;
    setMap(next);

    if (debounceNote) {
      if (noteTimers.current[id]) window.clearTimeout(noteTimers.current[id]);
      noteTimers.current[id] = window.setTimeout(() => persist(mapRef.current), 600);
      return;
    }
    persist(next);
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: fundingLeads.length };
    for (const cat of fundingCategories) {
      c[cat.id] = fundingLeads.filter((l) => l.category === cat.id).length;
    }
    return c;
  }, []);

  return (
    <div>
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-sm px-3 py-1.5 text-xs tracking-wide uppercase ${
              filter === "all" ? "bg-ink text-bone" : "border border-ink/15 text-slate"
            }`}
          >
            All ({counts.all})
          </button>
          {fundingCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-sm px-3 py-1.5 text-xs tracking-wide uppercase ${
                filter === cat.id ? "bg-ink text-bone" : "border border-ink/15 text-slate"
              }`}
            >
              {cat.label} ({counts[cat.id]})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {savedFlash && <span className="text-xs text-copper">Saved</span>}
          {pending && <span className="text-xs text-aluminum">Saving…</span>}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads…"
            className="w-full border border-ink/15 bg-paper px-3 py-2 text-sm lg:w-64"
          />
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {fundingCategories
          .filter((cat) => filter === "all" || filter === cat.id)
          .map((cat) => {
            const leads = visible.filter((l) => l.category === cat.id);
            if (leads.length === 0) return null;
            return (
              <section key={cat.id}>
                <h2 className="font-display text-2xl text-ink">{cat.label}</h2>
                <p className="mt-1 max-w-3xl text-sm text-slate">{cat.blurb}</p>
                <ul className="mt-4 space-y-3">
                  {leads.map((lead) => {
                    const row = map[lead.id] ?? { status: "new" as const, note: "" };
                    return (
                      <li
                        key={lead.id}
                        className="border border-ink/10 bg-paper p-4 md:p-5"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-xl text-ink">{lead.name}</h3>
                              <span
                                className={`rounded-sm px-2 py-0.5 text-[10px] tracking-wide uppercase ${priorityStyle[lead.priority]}`}
                              >
                                {lead.priority === "now"
                                  ? "Do now"
                                  : lead.priority === "high"
                                    ? "High"
                                    : "Watch"}
                              </span>
                            </div>
                            <p className="mt-1 text-xs tracking-wide text-aluminum uppercase">
                              {lead.org}
                            </p>
                            <p className="mt-3 text-sm text-slate">{lead.why}</p>
                            <p className="mt-2 text-sm text-ink">
                              <span className="text-aluminum">Next step: </span>
                              {lead.action}
                            </p>
                            {lead.amountHint && (
                              <p className="mt-2 text-xs text-copper">{lead.amountHint}</p>
                            )}
                            <a
                              href={lead.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-block text-sm font-medium text-flag-red hover:underline"
                            >
                              Open resource →
                            </a>
                          </div>
                          <div className="w-full shrink-0 space-y-2 lg:w-56">
                            <label className="block text-[10px] tracking-wide text-aluminum uppercase">
                              Pursuit status
                            </label>
                            <select
                              value={row.status}
                              onChange={(e) =>
                                patchLead(lead.id, {
                                  status: e.target.value as FundingPursuitStatus,
                                })
                              }
                              className="w-full border border-ink/15 bg-bone px-2 py-2 text-sm"
                            >
                              {pursuitStatuses.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                            <textarea
                              value={row.note ?? ""}
                              onChange={(e) =>
                                patchLead(lead.id, { note: e.target.value }, true)
                              }
                              rows={3}
                              placeholder="Contact, deadline, partner…"
                              className="w-full border border-ink/15 bg-bone px-2 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-sm text-aluminum">No leads match that filter.</p>
      )}
    </div>
  );
}
