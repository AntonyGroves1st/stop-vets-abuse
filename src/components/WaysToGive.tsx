"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ways = [
  {
    title: "Give online",
    detail: "One-time or monthly — Stripe & PayPal. Immediate fuel for the desk.",
    href: "/donate",
    cta: "Donate now",
  },
  {
    title: "Give monthly",
    detail: "Sustain FOIAs, travel, and legal review so stories don’t die mid-chase.",
    href: "/donate",
    cta: "Start monthly",
  },
  {
    title: "Give in honor",
    detail: "Dedicate a gift to a service member, spouse, or family you stand with.",
    href: "/donate",
    cta: "Honor a family",
  },
  {
    title: "Sponsor a family",
    detail: "Pick a named household, fund their case, follow their year-long diary.",
    href: "/sponsor",
    cta: "Meet the families",
  },
];

export function WaysToGive() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-4 hairline" />
      <div className="mb-12 flex flex-col gap-4 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-copper">Ways to give</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Choose how you stand with families
          </h2>
        </div>
        <p className="max-w-md text-slate">
          Built like the best veteran charities: multiple doors in, one mission out — keep another
          family from facing abuse alone.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {ways.map((way, i) => (
          <motion.div
            key={way.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="panel panel-hover flex flex-col p-7 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl text-ink md:text-3xl">{way.title}</h3>
              <span className="font-condensed text-xs tracking-[0.2em] text-brass uppercase">
                0{i + 1}
              </span>
            </div>
            <p className="mt-4 flex-1 text-slate">{way.detail}</p>
            <Link
              href={way.href}
              className="mt-8 inline-flex w-fit items-center gap-2 border border-ink/15 bg-ink px-4 py-2.5 text-sm font-semibold text-bone transition hover:bg-slate"
            >
              {way.cta} →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
