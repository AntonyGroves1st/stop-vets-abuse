import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { helpDocs } from "@/content/help";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "How We Help",
};

export default function HelpIndexPage() {
  return (
    <>
      <section className="relative min-h-[42vh] overflow-hidden bg-ink text-bone grain">
        <Image
          src={images.familyJoy.src}
          alt={images.familyJoy.alt}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="pointer-events-none absolute inset-6 usa-border-soft md:inset-10" />
        <div className="relative z-[2] mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="eyebrow text-brass-soft">How we help</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            A full desk — not a single headline
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fog">
            Eight pathways. Full briefs on each. Read the work behind the grid.
          </p>
        </div>
      </section>
      <div className="usa-rule" />
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 md:px-8 md:py-20">
        {helpDocs.map((doc, i) => (
          <Link
            key={doc.slug}
            href={`/help/${doc.slug}`}
            className="panel panel-hover block p-6"
          >
            <span className="font-condensed text-[0.7rem] tracking-[0.22em] text-brass uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-3 font-display text-2xl text-flag-blue">{doc.title}</h2>
            <p className="mt-3 text-sm text-slate">{doc.dek}</p>
            <span className="mt-5 inline-block text-xs font-semibold text-flag-red">
              Read full brief →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
