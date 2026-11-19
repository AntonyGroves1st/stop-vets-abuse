"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const help = [
  {
    title: "Investigative reporting",
    detail: "FOIAs, duty logs, and whistleblower corroboration across every branch.",
    href: "/help/investigative-reporting",
  },
  {
    title: "Military families",
    detail: "Stories that center spouses, children, and caregivers — not just units.",
    href: "/help/military-families",
  },
  {
    title: "Older veterans",
    detail: "Accountability after service ends — when systems go quiet.",
    href: "/help/older-veterans",
  },
  {
    title: "Mental wellbeing",
    detail: "Routing failures, delayed care, and the families left waiting.",
    href: "/help/mental-wellbeing",
  },
  {
    title: "Whistleblower defense",
    detail: "Retaliation patterns mapped so the next tip isn’t punished into silence.",
    href: "/help/whistleblower-defense",
  },
  {
    title: "Housing & barracks",
    detail: "Neglect that lands on dependents as a force-protection failure.",
    href: "/help/housing-barracks",
  },
  {
    title: "DoD & joint commands",
    detail: "Policy seams where abuse hides between jurisdictions.",
    href: "/help/dod-joint",
  },
  {
    title: "Secure tip intake",
    detail: "Confidential channels for troops and families who need the record public.",
    href: "/help/secure-tip-intake",
  },
];

export function HelpGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-flag-red">How we help</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.08] text-flag-blue md:text-5xl">
            A full desk — not a single headline
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate md:text-base">
          Eight full briefs — each a deep page. Click any card for the complete desk report.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {help.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
          >
            <Link href={item.href} className="panel panel-hover group block h-full p-6 md:p-7">
              <span className="font-condensed text-[0.7rem] tracking-[0.22em] text-brass uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug text-flag-blue transition group-hover:text-flag-red">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{item.detail}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-flag-red">
                Read full page
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/help"
          className="inline-flex border border-flag-blue/20 bg-white px-5 py-3 text-sm font-semibold text-flag-blue shadow-[var(--shadow-edge)]"
        >
          View all how-we-help briefs
        </Link>
      </div>
    </section>
  );
}
