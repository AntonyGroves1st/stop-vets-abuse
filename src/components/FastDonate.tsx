"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

type Props = {
  amounts: number[];
  stripeReady: boolean;
  monthlyEnabled?: boolean;
};

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
    <div className="w-full max-w-md border border-[#3d7cff]/55 bg-ink/70 p-5 shadow-[0_0_0_1px_rgba(61,124,255,0.25),0_0_40px_-12px_rgba(61,124,255,0.55),0_24px_48px_-20px_rgba(0,0,0,0.65)] backdrop-blur-md md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-flag-red">
            <span className="mr-1 text-flag-red" aria-hidden>
              ★
            </span>
            Fast donate
          </p>
          <p className="mt-1 font-display text-2xl text-bone">Save another family today</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 border border-flag-red/50 bg-flag-red/20 px-2 py-1 font-condensed text-[0.65rem] tracking-[0.16em] text-bone uppercase">
          Secure
        </span>
      </div>

      {monthlyEnabled && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          {(
            [
              ["one_time", "One-time"],
              ["monthly", "Monthly"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFrequency(value)}
              className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold tracking-wide transition ${
                frequency === value
                  ? "bg-flag-red text-bone shadow-[0_8px_24px_-8px_rgba(191,10,48,0.8)]"
                  : "border border-white/20 bg-white/5 text-fog hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
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
              className={`px-1 py-3 text-sm font-semibold transition ${
                active
                  ? "border border-[#3d7cff] bg-ink text-bone shadow-[0_0_0_1px_rgba(61,124,255,0.7),0_0_22px_-4px_rgba(61,124,255,0.9)]"
                  : "border border-white/20 bg-white/5 text-bone hover:border-white/40"
              }`}
            >
              {formatCurrency(cents).replace(".00", "")}
            </button>
          );
        })}
      </div>

      <label className="mt-3 block">
        <span className="sr-only">Custom amount</span>
        <div className="flex items-center border border-white/20 bg-white/5 focus-within:border-flag-red">
          <span className="pl-3 text-sm text-aluminum">$</span>
          <input
            type="number"
            min={1}
            step={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Other amount"
            className="w-full bg-transparent px-2 py-3 text-sm text-bone outline-none placeholder:text-aluminum"
          />
        </div>
      </label>

      <button
        type="button"
        onClick={checkoutStripe}
        disabled={loading || !stripeReady}
        className="btn-copper donate-pulse mt-5 w-full !bg-flag-red disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!stripeReady
          ? "Add Stripe keys to enable"
          : loading
            ? "Opening checkout…"
            : `Donate ${formatCurrency(selectedCents)}${frequency === "monthly" ? "/mo" : ""}`}
      </button>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-aluminum">
        <span>Card via Stripe · instant</span>
        <Link href="/donate" className="text-fog underline-offset-2 hover:text-bone hover:underline">
          More ways to give →
        </Link>
      </div>

      {message && <p className="mt-3 text-sm text-copper-hot">{message}</p>}
    </div>
  );
}
