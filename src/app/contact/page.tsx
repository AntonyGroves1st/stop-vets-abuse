import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { images } from "@/lib/images";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Send a Tip",
  description:
    "Secure tip intake for troops, veterans, and military families — confidential channels to build a public record.",
};

const SAFETY = [
  {
    title: "Immediate danger",
    body: "Call emergency services or a military/VA crisis line first. Journalism is not crisis response.",
    tone: "red" as const,
  },
  {
    title: "Use a personal device",
    body: "Do not tip from a government workstation, shared office machine, or monitored work email when risk is high.",
    tone: "navy" as const,
  },
  {
    title: "Classified material",
    body: "Never send classified or controlled materials. Describe the existence of a record; do not paste protected content.",
    tone: "navy" as const,
  },
];

const SEND = [
  "A dated timeline — when, where, which office, what was promised",
  "Names of decision-makers you can safely identify",
  "What documents exist (work orders, tickets, emails, medical routing)",
  "Who else knows — peers, spouses, counselors — without endangering them",
  "What you want the public record to accomplish",
];

const AVOID = [
  "Tips from a work device you do not control",
  "Dumping unredacted PII for children or unrelated third parties",
  "Classified, FOUO dumps, or operational details that endanger missions",
  "Rumors with no dates, places, or corroboration path",
  "Expecting us to act as your lawyer or crisis counselor",
];

const STEPS = [
  {
    n: "01",
    title: "You tip",
    body: "Submit through this intake with a timeline and what documents you can later share.",
  },
  {
    n: "02",
    title: "We triage",
    body: "Urgency, corroboration potential, and retaliation risk are assessed before the circle widens.",
  },
  {
    n: "03",
    title: "Document spine",
    body: "We prefer exhibits that can carry a story if a human source must step back.",
  },
  {
    n: "04",
    title: "Publish & stay",
    body: "When a story ships, follow-ups and sponsor pathways keep pressure alive past one headline.",
  },
];

const PATHWAYS = [
  { href: "/help/secure-tip-intake", label: "Secure tip intake brief", dek: "Full method page" },
  { href: "/help/whistleblower-defense", label: "Whistleblower defense", dek: "Retaliation patterns" },
  { href: "/help/investigative-reporting", label: "Investigative reporting", dek: "How files become public" },
  { href: "/sponsor", label: "Sponsor a family", dek: "Fund household follow-through" },
];

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[72vh] overflow-hidden bg-ink text-bone grain">
        <Image
          src={images.familyStruggle.src}
          alt={images.familyStruggle.alt}
          fill
          priority
          className="reveal-scale object-cover object-[center_35%] opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/55" />
        <div className="pointer-events-none absolute inset-5 usa-border-soft md:inset-10" />

        <div className="relative z-[2] mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
          <div className="inline-flex w-fit items-center gap-3 border border-white/15 bg-ink/40 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flag-red" />
            <span className="eyebrow text-fog">Secure tip line · Source-protected</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Tell us what command climate reports won&apos;t.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fog md:text-xl">
            Confidential intake for troops, veterans, spouses, and caregivers who need a public
            record — without becoming the next retaliation case study.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#tip-form" className="btn-copper donate-pulse">
              Open tip intake
            </a>
            <Link href="/help/secure-tip-intake" className="btn-ghost">
              Read the full tip brief
            </Link>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-bone backdrop-blur-sm transition hover:bg-white/10"
            >
              {settings.contactEmail}
            </a>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              ["Confidential", "Need-to-know desk access"],
              ["Document-first", "Stories that survive silence"],
              ["All branches", "No orphan tips"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-condensed text-[0.68rem] tracking-[0.2em] text-brass-soft uppercase">
                  {k}
                </p>
                <p className="mt-1 text-sm text-fog">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="usa-rule" />

      {/* SAFETY */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="eyebrow text-flag-red">Before you tip</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-flag-blue md:text-5xl">
            Safety is not optional. It is the first gate.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SAFETY.map((item) => (
              <article
                key={item.title}
                className={`border p-6 shadow-[var(--shadow-edge)] md:p-7 ${
                  item.tone === "red"
                    ? "border-flag-red/30 bg-flag-red text-bone"
                    : "border-flag-blue/10 bg-white"
                }`}
              >
                <p
                  className={`eyebrow ${item.tone === "red" ? "text-white/70" : "text-flag-red"}`}
                >
                  {item.tone === "red" ? "Stop · seek help" : "Desk rule"}
                </p>
                <h3
                  className={`mt-3 font-display text-2xl ${
                    item.tone === "red" ? "text-bone" : "text-flag-blue"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    item.tone === "red" ? "text-fog" : "text-slate"
                  }`}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO SEND */}
      <section className="relative overflow-hidden bg-bone">
        <div className="pointer-events-none absolute inset-0 texture-paper opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
          <div>
            <p className="eyebrow text-flag-red">What strengthens a tip</p>
            <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-4xl">
              Specificity beats volume.
            </h2>
            <ul className="mt-8 space-y-4">
              {SEND.map((line, i) => (
                <li
                  key={line}
                  className="flex gap-4 border-b border-flag-blue/10 pb-4 text-slate last:border-0"
                >
                  <span className="font-condensed text-[0.7rem] tracking-[0.2em] text-flag-red uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-flag-blue/15 bg-flag-blue p-8 text-bone shadow-[var(--shadow-lift)] md:p-10">
            <p className="eyebrow text-brass-soft">What to avoid</p>
            <h2 className="mt-3 font-display text-3xl">Do not burn yourself for a dump.</h2>
            <ul className="mt-8 space-y-4">
              {AVOID.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-fog">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flag-red" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/help/whistleblower-defense"
              className="mt-10 inline-flex border border-white/20 px-5 py-3 text-sm font-semibold text-bone transition hover:bg-white/10"
            >
              Read retaliation patterns →
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS + IMAGE */}
      <section className="relative overflow-hidden bg-ink text-bone">
        <Image
          src={images.hero.src}
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-flag-blue/80" />
        <div className="pointer-events-none absolute inset-6 usa-border-soft md:inset-12" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="eyebrow text-brass-soft">After you hit submit</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-5xl">
            Intake is the first act of investigation — not a mailbox.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <article key={s.n} className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <p className="font-condensed text-[0.7rem] tracking-[0.22em] text-flag-red uppercase">
                  {s.n}
                </p>
                <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FORM ZONE */}
      <section id="tip-form" className="scroll-mt-24 bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:px-8 md:py-24">
          <aside className="space-y-8 md:sticky md:top-28 md:self-start">
            <div>
              <p className="eyebrow text-flag-red">The desk is listening</p>
              <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-4xl">
                Build a tip that can survive scrutiny.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                Families and troops tip us because climate reports measure calm while households
                wait. Your job is a clear chronology. Our job is corroboration, legal harden, and —
                when the evidence holds — a public record.
              </p>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.fatherSon.src}
                alt={images.fatherSon.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-4 usa-border-soft" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-24 text-bone">
                <p className="font-display text-xl">The household is part of the force.</p>
                <p className="mt-2 text-sm text-fog">Spouses and caregivers tip here too.</p>
              </div>
            </div>

            <div className="border border-flag-blue/15 bg-white p-6 shadow-[var(--shadow-edge)]">
              <p className="eyebrow text-flag-blue">Direct desk</p>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-3 block font-display text-2xl text-flag-blue transition hover:text-flag-red"
              >
                {settings.contactEmail}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Independent journalism. Not affiliated with the Department of Defense. Not a
                substitute for IG, legal counsel, or emergency services.
              </p>
            </div>
          </aside>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section className="border-t border-flag-blue/10 bg-bone">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow text-flag-blue">Continue the desk</p>
          <h2 className="mt-3 font-display text-3xl text-flag-blue md:text-4xl">
            Tips sit inside a larger practice.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PATHWAYS.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="panel panel-hover flex h-full flex-col justify-between p-5"
                >
                  <span>
                    <span className="font-semibold text-flag-blue">{p.label}</span>
                    <span className="mt-2 block text-sm text-slate">{p.dek}</span>
                  </span>
                  <span className="mt-6 font-condensed text-[0.65rem] tracking-[0.2em] text-flag-red uppercase">
                    Open →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-ink text-bone">
        <Image
          src={images.familyWalk.src}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-flag-red/35" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
          <div className="max-w-xl">
            <p className="eyebrow text-brass-soft">Can&apos;t tip — but can fund the door</p>
            <p className="mt-3 font-display text-3xl md:text-4xl">
              Secure intake, legal review, and follow-through run on reader courage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/donate" className="btn-copper">
              Donate to the desk
            </Link>
            <Link href="/sponsor" className="btn-ghost">
              Sponsor a family
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
