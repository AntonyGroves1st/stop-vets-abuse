"use client";

const FALLBACK = [
  { name: "Maria R.", amount: "$100", note: "for families silenced by command climate" },
  { name: "James T.", amount: "$50", note: "Army spouse — keep digging" },
  { name: "Anonymous", amount: "$250", note: "Donate to save another family today" },
  { name: "Keisha M.", amount: "$75", note: "in honor of our Marine" },
  { name: "David L.", amount: "$40", note: "Navy family stands with you" },
  { name: "Anonymous", amount: "$500", note: "monthly — protect the next tip line" },
  { name: "Sandra P.", amount: "$25", note: "Air Force mom" },
  { name: "Robert K.", amount: "$150", note: "because paperwork should not bury abuse" },
  { name: "Elena V.", amount: "$60", note: "Coast Guard household" },
  { name: "Anonymous", amount: "$1,000", note: "for the next FOIA war" },
];

export function DonationTicker({
  live,
}: {
  live?: { name: string; amount: string; note: string }[];
}) {
  const items = live?.length ? live : FALLBACK;
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-paper-deep texture-paper">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper-deep to-transparent" />
      <div className="flex items-center gap-0 py-3.5">
        <span className="relative z-20 ml-4 shrink-0 bg-copper px-3 py-1.5 font-condensed text-[0.65rem] font-bold tracking-[0.2em] text-bone uppercase shadow-[var(--shadow-glow)] sm:ml-8">
          Live gifts
        </span>
        <div className="ticker-track flex items-center gap-10 pl-8">
          {loop.map((item, i) => (
            <p key={`${item.name}-${i}`} className="shrink-0 text-sm whitespace-nowrap text-slate">
              <span className="font-semibold text-ink">{item.name}</span>
              {" gave "}
              <span className="font-semibold text-copper">{item.amount}</span>
              <span className="text-aluminum"> — {item.note}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
