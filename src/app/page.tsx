import Image from "next/image";
import Link from "next/link";
import { DonationTicker } from "@/components/DonationTicker";
import { FacesHelped } from "@/components/FacesHelped";
import { FamilyStrip } from "@/components/FamilyStrip";
import { FastDonate } from "@/components/FastDonate";
import { HelpGrid } from "@/components/HelpGrid";
import { HeroBrand } from "@/components/HeroBrand";
import { SponsorFamilies } from "@/components/SponsorFamilies";
import { StatCounters } from "@/components/StatCounters";
import { StoryCard } from "@/components/StoryCard";
import { WaysToGive } from "@/components/WaysToGive";
import { images } from "@/lib/images";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { stripeConfigured } from "@/lib/stripe";
import { formatCurrency, parseJson } from "@/lib/utils";

export default async function HomePage() {
  const [settings, homePage, stories, recentDonations, families] = await Promise.all([
    getSettings(),
    prisma.page.findUnique({ where: { slug: "home" } }),
    prisma.story.findMany({
      where: { status: "published" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: 4,
    }),
    prisma.donation.findMany({
      where: { status: "completed" },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.sponsoredFamily.findMany({
      where: { status: "open", featured: true },
      orderBy: { name: "asc" },
      take: 6,
    }),
  ]);

  const home = parseJson(homePage?.sections ?? "{}", {
    heroHeadline: "When the system fails a service member, a family pays the price.",
    heroSupport: settings.tagline,
    railTitle: "Investigations that put families first",
  });

  const ticker = recentDonations.map((d) => ({
    name: d.email ? d.email.split("@")[0] : "Supporter",
    amount: formatCurrency(d.amount, d.currency),
    note: d.frequency === "monthly" ? "monthly gift" : "one-time gift",
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[94vh] overflow-hidden bg-ink text-bone">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          className="reveal-scale object-cover object-[62%_18%] md:object-[68%_12%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent md:from-black/85 md:via-black/35 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/25" />

        <div className="relative z-[2] mx-auto flex min-h-[94vh] max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-12 md:pb-16 lg:justify-center lg:pb-20">
          <div className="reveal max-w-2xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00d4ff]/70 bg-[#000814]/80 px-3.5 py-1.5 shadow-[0_0_0_1px_rgba(0,212,255,0.35),0_0_28px_2px_rgba(0,212,255,0.45)] backdrop-blur-md">
              <span className="text-[0.7rem] text-[#e60000]" aria-hidden>
                ★
              </span>
              <span className="font-condensed text-[0.65rem] font-semibold tracking-[0.24em] text-white uppercase">
                For USA troops · Veterans · Every military family
              </span>
            </div>

            <HeroBrand siteName={settings.siteName} />

            <p className="mt-5 max-w-lg font-display text-xl italic leading-snug text-white md:text-2xl">
              When the system fails a service member, a family{" "}
              <span className="relative inline-block">
                pays the price
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#e60000] via-[#e60000] to-transparent"
                  aria-hidden
                />
              </span>
              .
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/investigations"
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#00d4ff] bg-gradient-to-b from-[#ff2a2a] to-[#b80000] px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_2px_rgba(0,212,255,0.35),0_10px_28px_-10px_rgba(230,0,0,0.8)] transition hover:brightness-110"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-1 13l6-6-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z" />
                </svg>
                Read investigations
              </Link>
              <Link
                href="/sponsor"
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#00d4ff] bg-[#000814]/75 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_2px_rgba(0,212,255,0.4)] backdrop-blur-sm transition hover:bg-[#001a33]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zm0 2c-2.7 0-8 1.3-8 4v2h10v-2c0-1.2.5-2.3 1.4-3.2C10.4 13.3 9.2 13 8 13zm8 0c-.4 0-.8 0-1.2.1 1.3.8 2.2 2 2.2 3.4V19h7v-2c0-2.7-5.3-4-8-4z" />
                </svg>
                Sponsor a family
              </Link>
            </div>
          </div>

          <div className="reveal reveal-delay-2 mt-8 max-w-md lg:mt-10">
            <FastDonate
              amounts={settings.donate.amounts}
              stripeReady={stripeConfigured()}
              monthlyEnabled={settings.donate.monthlyEnabled}
            />
          </div>
        </div>
      </section>

      <DonationTicker live={ticker} />
      <StatCounters />
      <HelpGrid />

      {/* Split editorial */}
      <section className="relative overflow-hidden">
        <div className="grid min-h-[78vh] lg:grid-cols-2">
          <div className="relative min-h-[52vh] lg:min-h-full">
            <Image
              src={images.familyStruggle.src}
              alt={images.familyStruggle.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-5 usa-border-soft" />
          </div>
          <div className="relative flex flex-col justify-center ink-wash px-8 py-16 text-bone md:px-14 md:py-24">
            <div className="pointer-events-none absolute inset-0 texture-linen opacity-30" />
            <div className="relative">
              <p className="eyebrow text-brass-soft">Why this exists</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">
                Abuse doesn&apos;t end at the gate. It follows families home.
              </h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-copper to-transparent" />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-fog md:text-lg">
                Behind every buried complaint is a partner waiting for a callback, a child absorbing
                the silence, a veteran deciding whether speaking up is worth the next retaliatory
                move. We publish so they are not alone in that room.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-fog">
                {[
                  "Command climate surveys soften what families already know",
                  "Retaliation often looks like paperwork, not headlines",
                  "Independent pressure is how buried cases resurface",
                ].map((line) => (
                  <li key={line} className="flex gap-3 border-l border-copper/50 pl-4">
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="/mission"
                className="mt-10 inline-flex w-fit items-center gap-2 border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-bone backdrop-blur transition hover:border-copper hover:text-copper-hot"
              >
                Read our mission →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FacesHelped />
      <SponsorFamilies families={families} />
      <FamilyStrip />

      {/* Investigations */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-ink/10 pb-6">
          <div>
            <p className="eyebrow text-copper">The record</p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">{home.railTitle}</h2>
          </div>
          <Link
            href="/investigations"
            className="hidden border border-ink/15 bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-edge)] transition hover:border-copper md:inline"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-10">
          {stories.map((story, index) => (
            <StoryCard key={story.id} {...story} index={index} />
          ))}
        </div>
      </section>

      <WaysToGive />

      {/* Full-bleed donate */}
      <section className="relative overflow-hidden text-bone">
        <div className="absolute inset-0">
          <Image
            src={images.familyJoy.src}
            alt={images.familyJoy.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="absolute inset-0 ink-wash opacity-70" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1.35fr_1fr] md:px-8 md:py-32">
          <div>
            <p className="eyebrow text-brass-soft">The ask</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              {settings.donate.headline}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-fog">{settings.donate.subcopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {settings.donate.amounts.map((cents) => (
                <Link
                  key={cents}
                  href="/donate"
                  className="border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:border-copper hover:bg-copper/20"
                >
                  {formatCurrency(cents)}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <Link href="/donate" className="btn-copper donate-pulse w-full py-4 text-center">
              Give now — protect another family
            </Link>
            <p className="text-center text-xs text-aluminum md:text-left">
              One-time or monthly · Stripe &amp; PayPal · Receipts from your provider
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
