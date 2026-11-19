"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export type FamilyCard = {
  id: string;
  name: string;
  slug: string;
  branch: string;
  location: string;
  headline: string;
  imageUrl: string;
  goalCents: number;
  raisedCents: number;
};

export function SponsorFamilies({ families }: { families: FamilyCard[] }) {
  if (!families.length) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-copper">Sponsor a family</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-ink md:text-5xl">
            Pick a family. Fund their fight. Read their diary for a year.
          </h2>
        </div>
        <p className="max-w-md text-slate">
          Not a faceless fund. You sponsor by name, get newsletter-style updates on the support they
          receive, and a one-year-later diary that keeps the bond personal.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {families.map((family, i) => {
          const pct = Math.min(100, Math.round((family.raisedCents / family.goalCents) * 100));
          return (
            <motion.article
              key={family.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="panel panel-hover flex h-full flex-col overflow-hidden !p-0"
            >
              <Link href={`/sponsor/${family.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={family.imageUrl}
                    alt={family.name}
                    fill
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-bone">
                    <p className="font-condensed text-[0.7rem] tracking-[0.2em] text-brass-soft uppercase">
                      {family.branch} · {family.location}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{family.name}</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-sm leading-relaxed text-slate">{family.headline}</p>
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs text-aluminum">
                      <span>{formatCurrency(family.raisedCents)} raised</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden bg-ink/10">
                      <div className="h-full bg-copper" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="mt-6 inline-flex text-sm font-semibold text-copper">
                    Meet {family.name.split(" ")[1] || "them"} &amp; read the diary →
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/sponsor"
          className="inline-flex border border-ink/15 bg-paper px-5 py-3 text-sm font-semibold text-ink shadow-[var(--shadow-edge)] transition hover:border-copper"
        >
          See all families to sponsor
        </Link>
      </div>
    </section>
  );
}
