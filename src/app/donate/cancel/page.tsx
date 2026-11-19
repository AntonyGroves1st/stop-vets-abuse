import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donation canceled",
};

export default function DonateCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
      <h1 className="font-display text-4xl text-ink">Checkout canceled</h1>
      <p className="mt-4 text-slate">No charge was made. You can return anytime.</p>
      <Link
        href="/donate"
        className="mt-8 inline-block bg-copper px-5 py-3 text-sm font-semibold text-bone"
      >
        Back to donate
      </Link>
    </div>
  );
}
