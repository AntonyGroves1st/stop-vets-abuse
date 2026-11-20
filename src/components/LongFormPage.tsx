import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type LongFormSection = {
  heading: string;
  paragraphs: string[];
  image?: { src: string; alt: string };
  callout?: string;
};

export type LongFormDoc = {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  image: { src: string; alt: string };
  pullQuote: string;
  pullAttribution?: string;
  stats: { value: string; label: string }[];
  methods: { title: string; body: string }[];
  sections: LongFormSection[];
  related?: { href: string; label: string }[];
};

function ChapterMark({ n }: { n: number }) {
  return (
    <span className="font-condensed text-[0.68rem] tracking-[0.28em] text-flag-red uppercase">
      Chapter {String(n).padStart(2, "0")}
    </span>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5 text-lg leading-[1.75] text-slate md:text-[1.125rem]">
      {paragraphs.map((p, i) => (
        <p
          key={`p-${i}`}
          className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-flag-blue md:first-letter:text-6xl" : undefined}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export function LongFormPage({ doc }: { doc: LongFormDoc }) {
  const mid = Math.ceil(doc.sections.length / 2);

  return (
    <>
      {/* ZONE 1 — Hero */}
      <section className="relative min-h-[78vh] overflow-hidden bg-ink text-bone grain">
        <Image
          src={doc.image.src}
          alt={doc.image.alt}
          fill
          priority
          className="reveal-scale object-cover object-[center_30%] opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        <div className="pointer-events-none absolute inset-4 border border-white/25 md:inset-8" />

        <div className="relative z-[2] mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-8 pb-14 pt-32 md:px-14 md:pb-20">
          <p className="reveal eyebrow text-brass-soft">{doc.eyebrow}</p>
          <h1 className="reveal reveal-delay-1 mt-4 max-w-4xl font-display text-4xl leading-[1.15] font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {doc.title}
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-lg text-fog md:text-xl">
            {doc.dek}
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
            <Link href="/donate" className="btn-copper donate-pulse">
              Donate to save another family today
            </Link>
            <Link href="/contact" className="btn-ghost">
              Send a secure tip
            </Link>
            <Link
              href="/sponsor"
              className="border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-bone backdrop-blur-sm transition hover:bg-white/10"
            >
              Sponsor a family
            </Link>
          </div>
        </div>
      </section>

      <div className="usa-rule" />

      {/* ZONE 2 — Chapter map */}
      <nav className="border-b border-flag-blue/10 bg-paper-deep/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-4 md:px-8">
          {doc.sections.map((s, i) => (
            <a
              key={`toc-${i}`}
              href={`#chapter-${i + 1}`}
              className="shrink-0 border border-flag-blue/10 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-flag-blue transition hover:border-flag-red/40 hover:text-flag-red"
            >
              <span className="mr-2 font-condensed text-flag-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.heading}
            </a>
          ))}
        </div>
      </nav>

      {/* ZONE 3 — Lead + stats rail */}
      <section className="relative overflow-hidden bg-bone">
        <div className="pointer-events-none absolute inset-0 texture-paper opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.35fr_0.65fr] md:px-8 md:py-24">
          <div>
            <ChapterMark n={1} />
            <h2
              id="chapter-1"
              className="mt-3 scroll-mt-28 font-display text-3xl text-flag-blue md:text-5xl"
            >
              {doc.sections[0]?.heading}
            </h2>
            <div className="mt-8">
              <Prose paragraphs={doc.sections[0]?.paragraphs ?? []} />
            </div>
          </div>
          <aside className="space-y-6 md:pt-10">
            <div className="border border-flag-blue/15 bg-flag-blue p-6 text-bone shadow-[var(--shadow-lift)] md:p-8">
              <p className="eyebrow text-brass-soft">Desk markers</p>
              <ul className="mt-6 space-y-6">
                {doc.stats.map((stat) => (
                  <li key={stat.label} className="border-t border-white/15 pt-5 first:border-0 first:pt-0">
                    <p className="font-display text-3xl text-bone md:text-4xl">{stat.value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-fog">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-flag-red/25 bg-white p-6 shadow-[var(--shadow-edge)]">
              <p className="eyebrow text-flag-red">Stand with families</p>
              <p className="mt-3 font-display text-2xl text-flag-blue">Fund the next file</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Tip lines, FOIA fees, legal review, and one-year sponsor diaries all run on reader
                courage — not command budgets.
              </p>
              <Link href="/donate" className="btn-copper mt-5 inline-flex !bg-flag-red">
                Donate now
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ZONE 4 — Pull quote band */}
      <section className="relative overflow-hidden bg-ink text-bone">
        <div className="absolute inset-0 ink-wash opacity-90" />
        <div className="pointer-events-none absolute inset-4 border border-white/20 md:inset-10" />
        <div className="relative mx-auto max-w-5xl px-8 py-20 text-center md:px-14 md:py-28">
          <p className="font-condensed text-[0.7rem] tracking-[0.3em] text-brass-soft uppercase">
            From the desk
          </p>
          <blockquote className="mt-8 font-display text-3xl leading-snug md:text-5xl md:leading-[1.15]">
            “{doc.pullQuote}”
          </blockquote>
          {doc.pullAttribution && (
            <p className="mt-8 text-sm tracking-wide text-aluminum">{doc.pullAttribution}</p>
          )}
        </div>
      </section>

      {/* ZONE 5 — Method cards */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-flag-red">How the desk works</p>
            <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-5xl">
              Method before mythology
            </h2>
            <p className="mt-4 text-lg text-slate">
              Every brief on this site is a practice, not a slogan. These are the moves we repeat
              until a household has a public record it can stand on.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {doc.methods.map((m, i) => (
              <article
                key={`method-${i}`}
                className="group relative overflow-hidden border border-flag-blue/10 bg-white p-6 shadow-[var(--shadow-edge)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] md:p-7"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-flag-red/10 to-transparent" />
                <p className="font-condensed text-[0.7rem] tracking-[0.22em] text-flag-red uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl text-flag-blue">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 6+ — Alternating chapter compositions */}
      {doc.sections.slice(1).map((section, idx) => {
        const n = idx + 2;
        const mode = idx % 4;
        const image = section.image ?? doc.image;
        const showMidCta = n === mid + 1;

        let chapter: ReactNode;

        if (mode === 0) {
          chapter = (
            <section
              id={`chapter-${n}`}
              className="scroll-mt-24 border-t border-flag-blue/10 bg-bone"
            >
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
                <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-4 usa-border-soft" />
                </div>
                <div>
                  <ChapterMark n={n} />
                  <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-5xl">
                    {section.heading}
                  </h2>
                  {section.callout && (
                    <p className="mt-6 border-l-2 border-flag-red pl-5 font-display text-xl text-flag-blue italic md:text-2xl">
                      {section.callout}
                    </p>
                  )}
                  <div className="mt-8">
                    <Prose paragraphs={section.paragraphs} />
                  </div>
                </div>
              </div>
            </section>
          );
        } else if (mode === 1) {
          chapter = (
            <section
              id={`chapter-${n}`}
              className="scroll-mt-24 relative overflow-hidden bg-flag-blue text-bone"
            >
              <div className="absolute inset-0 opacity-20">
                <Image src={image.src} alt="" fill className="object-cover" sizes="100vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-flag-blue via-flag-blue/95 to-ink" />
              <div className="relative mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
                <ChapterMark n={n} />
                <h2 className="mt-3 font-display text-3xl md:text-5xl">{section.heading}</h2>
                {section.callout && (
                  <p className="mt-6 font-display text-2xl text-brass-soft italic">{section.callout}</p>
                )}
                <div className="mt-10 space-y-5 text-lg leading-[1.75] text-fog">
                  {section.paragraphs.map((p, i) => (
                    <p key={`ch-${n}-p-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          );
        } else if (mode === 2) {
          chapter = (
            <section
              id={`chapter-${n}`}
              className="scroll-mt-24 bg-paper-deep"
            >
              <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-8 md:py-24">
                <div className="md:sticky md:top-28">
                  <ChapterMark n={n} />
                  <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-4xl">
                    {section.heading}
                  </h2>
                  {section.callout && (
                    <div className="mt-8 border border-flag-red/20 bg-white p-5 shadow-[var(--shadow-edge)]">
                      <p className="eyebrow text-flag-red">Field note</p>
                      <p className="mt-3 font-display text-xl text-flag-blue">{section.callout}</p>
                    </div>
                  )}
                  <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden md:block">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                </div>
                <div>
                  <Prose paragraphs={section.paragraphs} />
                </div>
              </div>
            </section>
          );
        } else {
          chapter = (
            <section
              id={`chapter-${n}`}
              className="scroll-mt-24 border-y border-flag-blue/10 bg-bone"
            >
              <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
                <div className="flex items-center gap-4">
                  <ChapterMark n={n} />
                  <div className="h-px flex-1 bg-gradient-to-r from-flag-red/50 via-flag-blue/20 to-transparent" />
                </div>
                <h2 className="mt-4 font-display text-3xl text-flag-blue md:text-5xl">
                  {section.heading}
                </h2>
                {section.callout && (
                  <p className="mt-6 rounded-sm bg-flag-red/5 px-5 py-4 text-base font-medium text-flag-blue">
                    {section.callout}
                  </p>
                )}
                <div className="mt-8">
                  <Prose paragraphs={section.paragraphs} />
                </div>
              </div>
            </section>
          );
        }

        return (
          <div key={`zone-${n}`}>
            {chapter}
            {showMidCta && (
              <section className="relative overflow-hidden bg-ink text-bone">
                <Image
                  src={doc.image.src}
                  alt=""
                  fill
                  className="object-cover opacity-30"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-flag-red/40" />
                <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
                  <div className="max-w-xl">
                    <p className="eyebrow text-brass-soft">Still reading? Stay useful.</p>
                    <p className="mt-3 font-display text-3xl md:text-4xl">
                      A family is waiting on the other side of this brief.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/sponsor" className="btn-copper">
                      Sponsor a family
                    </Link>
                    <Link href="/donate" className="btn-ghost">
                      Donate to the desk
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </div>
        );
      })}

      {/* ZONE — Closing CTA */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="relative overflow-hidden border border-flag-blue/15 bg-white shadow-[var(--shadow-lift)]">
            <div className="usa-rule" />
            <div className="grid md:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 md:p-12">
                <p className="eyebrow text-flag-red">Take action</p>
                <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-5xl">
                  Donate to save another family today
                </h2>
                <p className="mt-4 max-w-xl text-lg text-slate">
                  Long-form desks only exist when readers fund tip lines, FOIAs, legal review, and
                  year-long sponsor diaries. Evidence without follow-through is just another
                  headline that leaves the household holding the risk.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/donate" className="btn-copper !bg-flag-red">
                    Donate now
                  </Link>
                  <Link
                    href="/sponsor"
                    className="border border-flag-blue/20 bg-white px-5 py-3 text-sm font-semibold text-flag-blue"
                  >
                    Sponsor a family
                  </Link>
                  <Link
                    href="/contact"
                    className="border border-flag-blue/20 bg-white px-5 py-3 text-sm font-semibold text-flag-blue"
                  >
                    Send a tip
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[240px] md:min-h-full">
                <Image
                  src={doc.image.src}
                  alt={doc.image.alt}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-flag-blue/25" />
              </div>
            </div>
            <div className="usa-rule" />
          </div>

          {doc.related && doc.related.length > 0 && (
            <nav className="mt-16">
              <p className="eyebrow text-flag-blue">Continue the desk</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {doc.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="panel panel-hover flex h-full items-end p-5 text-sm font-semibold text-flag-blue"
                    >
                      <span>
                        {r.label}
                        <span className="mt-2 block font-condensed text-[0.65rem] tracking-[0.2em] text-flag-red uppercase">
                          Read →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
