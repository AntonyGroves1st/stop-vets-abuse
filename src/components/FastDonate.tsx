"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

type Props = {
  amounts: number[];
  stripeReady: boolean;
  monthlyEnabled?: boolean;
};

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-6.7-4.35-9.33-8.1C.7 10.2 1.2 6.8 3.9 5.2c2.1-1.25 4.7-.7 6.1 1.15C11.4 4.5 14 3.95 16.1 5.2c2.7 1.6 3.2 5 1.23 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17 9h-1V7a4 4 0 10-8 0v2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2zm-6 0V7a2 2 0 114 0v2h-4z" />
    </svg>
  );
}

export function FastDonate({ amounts, stripeReady, monthlyEnabled = true }: Props) {
  const presets = amounts.slice(0, 4);
  const [amount, setAmount] = useState(presets[1] ?? presets[0] ?? 5000);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const selectedCents = useMemo(() => {
    if (custom) {
      const dollars = Number(custom);
      if (!Number.isFinite(dollars) || dollars < 1) return amount;
      return Math.round(dollars * 100);
    }
    return amount;
  }, [amount, custom]);

  async function checkoutStripe() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/donate/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedCents, frequency }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-md border-2 border-[#00d4ff] bg-[#000814]/88 p-5 shadow-[0_0_0_1px_rgba(0,212,255,0.35),0_0_36px_4px_rgba(0,212,255,0.35),0_24px_48px_-16px_rgba(0,0,0,0.75)] backdrop-blur-md md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-condensed text-[0.7rem] font-semibold tracking-[0.28em] text-[#00d4ff] uppercase">
            <span className="mr-1" aria-hidden>
              ★
            </span>
            Fast donate
          </p>
          <p className="mt-1 font-display text-2xl text-white">Save another family today</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#e60000]/70 bg-[#e60000]/25 px-2.5 py-1 font-condensed text-[0.65rem] tracking-[0.16em] text-white uppercase">
          <LockIcon className="h-3 w-3 text-[#e60000]" />
          Secure
        </span>
      </div>

      {monthlyEnabled && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFrequency("one_time")}
            className={`inline-flex items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-xs font-semibold tracking-wide transition ${
              frequency === "one_time"
                ? "bg-gradient-to-b from-[#ff2a2a] to-[#c40000] text-white shadow-[0_8px_24px_-8px_rgba(230,0,0,0.9)]"
                : "border border-white/25 bg-white/5 text-fog hover:bg-white/10"
            }`}
          >
            <HeartIcon className="h-3.5 w-3.5" />
            One-time
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`inline-flex items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-xs font-semibold tracking-wide transition ${
              frequency === "monthly"
                ? "bg-gradient-to-b from-[#ff2a2a] to-[#c40000] text-white shadow-[0_8px_24px_-8px_rgba(230,0,0,0.9)]"
                : "border border-white/25 bg-white/5 text-fog hover:bg-white/10"
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Monthly
          </button>
        </div>
      )}

      <div className="mt-4 grid grid-cols-4 gap-2">
        {presets.map((cents) => {
          const active = !custom && amount === cents;
          return (
            <button
              key={cents}
              type="button"
              onClick={() => {
                setAmount(cents);
                setCustom("");
              }}
              className={`rounded-sm px-1 py-3 text-sm font-bold transition ${
                active
                  ? "bg-white text-[#002868] shadow-[0_0_0_2px_#00d4ff,0_0_22px_2px_rgba(0,212,255,0.75)]"
                  : "border border-white/25 bg-[#0a1a33] text-white hover:border-[#00d4ff]/60"
              }`}
            >
              {formatCurrency(cents).replace(".00", "")}
            </button>
          );
        })}
      </div>

      <label className="mt-3 block">
        <span className="sr-only">Custom amount</span>
        <div className="flex items-center rounded-sm border border-white/25 bg-[#0a1a33] focus-within:border-[#00d4ff]">
          <span className="pl-3 text-sm text-aluminum">$</span>
          <input
            type="number"
            min={1}
            step={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Other amount"
            className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-aluminum"
          />
        </div>
      </label>

      <button
        type="button"
        onClick={checkoutStripe}
        disabled={loading || !stripeReady}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-b from-[#ff2a2a] to-[#b80000] px-4 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(230,0,0,0.85)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HeartIcon className="h-4 w-4" />
        {!stripeReady
          ? "Add Stripe keys to enable"
          : loading
            ? "Opening checkout…"
            : `Donate ${formatCurrency(selectedCents)}${frequency === "monthly" ? "/mo" : ""}`}
      </button>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-fog">
        <span>Card via Stripe · instant</span>
        <Link href="/donate" className="text-white underline-offset-2 hover:underline">
          More ways to give →
        </Link>
      </div>

      {message && <p className="mt-3 text-sm text-[#ff6b6b]">{message}</p>}
    </div>
  );
}
