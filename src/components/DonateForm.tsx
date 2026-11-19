"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

type Props = {
  amounts: number[];
  headline: string;
  subcopy: string;
  monthlyEnabled: boolean;
  stripeReady: boolean;
  paypalClientId: string;
  paypalReady: boolean;
  familySlug?: string;
  familyName?: string;
};

export function DonateForm({
  amounts,
  headline,
  subcopy,
  monthlyEnabled,
  stripeReady,
  paypalClientId,
  paypalReady,
  familySlug,
  familyName,
}: Props) {
  const [amount, setAmount] = useState(amounts[1] ?? 5000);
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
        body: JSON.stringify({
          amount: selectedCents,
          frequency,
          familySlug: familySlug || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Stripe checkout failed");
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
    <div>
      <p className="eyebrow text-copper">Secure gift</p>
      <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">{headline}</h2>
      <p className="mt-4 text-slate">{subcopy}</p>
      {familyName && (
        <p className="mt-4 border border-copper/30 bg-copper/5 px-4 py-3 text-sm text-ink">
          Sponsoring <strong>{familyName}</strong> — your gift tags to their diary &amp; casework.
        </p>
      )}

      {monthlyEnabled && (
        <div className="mt-8 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFrequency("one_time")}
            className={`px-3 py-3 text-sm font-semibold shadow-[var(--shadow-edge)] transition ${
              frequency === "one_time"
                ? "bg-ink text-bone"
                : "border border-ink/15 bg-paper text-slate hover:border-ink/30"
            }`}
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`px-3 py-3 text-sm font-semibold shadow-[var(--shadow-edge)] transition ${
              frequency === "monthly"
                ? "bg-ink text-bone"
                : "border border-ink/15 bg-paper text-slate hover:border-ink/30"
            }`}
          >
            Monthly
          </button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {amounts.map((cents) => (
          <button
            key={cents}
            type="button"
            onClick={() => {
              setAmount(cents);
              setCustom("");
            }}
            className={`px-3 py-3.5 text-sm font-semibold transition ${
              !custom && amount === cents
                ? "bg-copper text-bone shadow-[var(--shadow-glow)]"
                : "border border-ink/15 bg-paper text-ink shadow-[var(--shadow-edge)] hover:border-copper"
            }`}
          >
            {formatCurrency(cents)}
          </button>
        ))}
      </div>

      <label className="mt-5 block text-sm">
        <span className="font-condensed tracking-[0.14em] text-aluminum uppercase">
          Custom amount (USD)
        </span>
        <input
          type="number"
          min={1}
          step={1}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Enter amount"
          className="mt-2 w-full border border-ink/15 bg-white px-3 py-3 shadow-[var(--shadow-edge)] outline-none transition focus:border-copper"
        />
      </label>

      <p className="mt-6 text-sm text-aluminum">
        Selected:{" "}
        <span className="font-semibold text-ink">{formatCurrency(selectedCents)}</span>
        {frequency === "monthly" ? " / month" : ""}
      </p>

      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={checkoutStripe}
          disabled={loading || !stripeReady}
          className="btn-copper donate-pulse w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {stripeReady
            ? loading
              ? "Redirecting to Stripe…"
              : familyName
                ? `Sponsor ${familyName} (Stripe)`
                : "Donate with card (Stripe)"
            : "Stripe keys needed — set STRIPE_SECRET_KEY"}
        </button>

        {paypalReady && paypalClientId && frequency === "one_time" ? (
          <PayPalScriptProvider
            options={{
              clientId: paypalClientId,
              currency: "USD",
              intent: "capture",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", color: "black", shape: "rect", label: "donate" }}
              createOrder={async () => {
                const res = await fetch("/api/donate/paypal/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ amount: selectedCents, familySlug }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "PayPal order failed");
                return data.id;
              }}
              onApprove={async (data) => {
                const res = await fetch("/api/donate/paypal/capture", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderID: data.orderID, familySlug }),
                });
                const result = await res.json();
                if (!res.ok) {
                  setMessage(result.error || "Capture failed");
                  return;
                }
                window.location.href = familySlug
                  ? `/donate/success?provider=paypal&family=${familySlug}`
                  : "/donate/success?provider=paypal";
              }}
              onError={() => setMessage("PayPal error — try again or use Stripe")}
            />
          </PayPalScriptProvider>
        ) : (
          <p className="text-xs text-aluminum">
            {frequency === "monthly"
              ? "Monthly giving is available via Stripe. PayPal supports one-time gifts here."
              : paypalReady
                ? null
                : "PayPal: add NEXT_PUBLIC_PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET to enable buttons."}
          </p>
        )}
      </div>

      {message && <p className="mt-4 text-sm text-copper-deep">{message}</p>}
    </div>
  );
}
