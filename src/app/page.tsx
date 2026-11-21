import Image from "next/image";
import Link from "next/link";
import { DonationTicker } from "@/components/DonationTicker";
import { FacesHelped } from "@/components/FacesHelped";
import { FamilyStrip } from "@/components/FamilyStrip";
import { FastDonate } from "@/components/FastDonate";
import { HelpGrid } from "@/components/HelpGrid";
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
          className="reveal-scale object-cover object-[72%_22%] opacity-75 md:object-[80%_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_35%,rgba(0,70,180,0.45),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-ink/92 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/50" />

        <div className="relative z-[2] mx-auto flex min-h-[94vh] max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-12 md:pb-16 lg:justify-center lg:pb-20">
          <div className="reveal max-w-2xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-flag-blue/75 px-3.5 py-1.5 shadow-[0_0_28px_-4px_rgba(61,124,255,0.7)] backdrop-blur-md">
              <span className="text-[0.65rem] text-flag-red" aria-hidden>
                ★
              </span>
              <span className="eyebrow text-[0.65rem] tracking-[0.22em] text-bone">
                For USA troops · Veterans · Every military family
              </span>
            </div>

            {/* High-contrast hero lockup (white wordmark) — header keeps original PNG */}
            <div className="mt-5 inline-block max-w-full rounded-sm shadow-[0_0_0_1px_rgba(61,124,255,0.45),0_0_48px_-8px_rgba(61,124,255,0.65),0_24px_48px_-16px_rgba(0,0,0,0.8)]">
              <Image
                src={images.brandBannerHero.src}
                alt={images.brandBannerHero.alt}
                width={920}
                height={314}
                priority
                className="h-auto w-full max-w-[40rem] object-contain"
              />
            </div>
            <h1 className="sr-only">{settings.siteName}</h1>

            <p className="mt-5 max-w-lg font-display text-xl italic leading-snug text-bone md:text-2xl">
              When the system fails a service member, a family{" "}
              <span className="relative inline-block">
                pays the price
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-flag-red via-flag-red to-transparent"
                  aria-hidden
                />
              </span>
              .
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/investigations"
                className="inline-flex items-center gap-2 bg-flag-red px-5 py-3 text-sm font-semibold text-bone shadow-[0_12px_32px_-10px_rgba(191,10,48,0.75)] transition hover:bg-copper-hot"
              >
                Read investigations
              </Link>
              <Link
                href="/sponsor"
                className="inline-flex items-center gap-2 border border-[#3d7cff]/60 bg-ink/55 px-5 py-3 text-sm font-semibold text-bone shadow-[0_0_24px_-8px_rgba(61,124,255,0.55)] backdrop-blur-sm transition hover:border-[#3d7cff] hover:bg-white/10"
              >
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
