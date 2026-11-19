import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FamilyFollowForm } from "@/components/FamilyFollowForm";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const family = await prisma.sponsoredFamily.findUnique({ where: { slug } });
  if (!family) return { title: "Sponsor a Family" };
  return { title: `Sponsor ${family.name}`, description: family.headline };
}

export default async function FamilySponsorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = await prisma.sponsoredFamily.findUnique({
    where: { slug },
    include: {
      diary: {
        where: { published: true },
        orderBy: { createdAt: "asc" },
      },
      _count: { select: { followers: true, donations: true } },
    },
  });
  if (!family) notFound();

  const pct = Math.min(100, Math.round((family.raisedCents / family.goalCents) * 100));

  return (
    <>
      <section className="relative min-h-[58vh] overflow-hidden bg-ink text-bone">
        <Image
          src={family.imageUrl}
          alt={family.name}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="eyebrow text-brass-soft">
            {family.branch} · {family.location}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{family.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-fog">{family.headline}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.9fr] md:px-8 md:py-20">
        <div>
          <p className="eyebrow text-copper">Their story</p>
          <p className="mt-4 text-lg leading-relaxed text-slate">{family.story}</p>

          <div className="mt-8 border border-ink/10 bg-paper p-5 shadow-[var(--shadow-edge)]">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-ink">
                {formatCurrency(family.raisedCents)} raised
              </span>
              <span className="text-aluminum">Goal {formatCurrency(family.goalCents)}</span>
            </div>
            <div className="h-2 overflow-hidden bg-ink/10">
              <div className="h-full bg-copper" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-xs text-aluminum">
              {family._count.donations} sponsorship gifts · {family._count.followers} diary
              followers
            </p>
          </div>

          <Link
            href={`/donate?family=${family.slug}`}
            className="btn-copper donate-pulse mt-8 inline-flex"
          >
            Sponsor {family.name} today
          </Link>

          <div className="mt-16">
            <p className="eyebrow text-copper">Family diary &amp; sponsor newsletters</p>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              What support looks like — month by month, then one year later
            </h2>
            <ol className="relative mt-10 space-y-0 border-l border-copper/40 pl-8">
              {family.diary.map((entry) => (
                <li key={entry.id} className="relative pb-12 last:pb-0">
                  <span
                    className={`absolute top-1 -left-[2.4rem] h-3 w-3 rounded-full ${
                      entry.kind === "year_later" ? "bg-brass ring-4 ring-brass/20" : "bg-copper"
                    }`}
                  />
                  <p className="font-condensed text-[0.7rem] tracking-[0.2em] text-brass uppercase">
                    {entry.monthLabel}
                    {entry.kind === "year_later" ? " · One year later" : ""}
                    {entry.kind === "support" ? " · Support landed" : ""}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{entry.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate">{entry.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-6 md:sticky md:top-28 md:self-start">
          <FamilyFollowForm familyId={family.id} familyName={family.name} />
          <div className="border border-ink/10 bg-ink p-6 text-bone shadow-[var(--shadow-deep)]">
            <p className="eyebrow text-brass-soft">How sponsorship works</p>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              <li>1. You sponsor this named family</li>
              <li>2. Your gift tags to their casework &amp; protection</li>
              <li>3. You follow their diary / newsletter updates</li>
              <li>4. At one year, you get the “what they’re doing now” letter</li>
            </ul>
            <Link
              href={`/donate?family=${family.slug}`}
              className="btn-copper mt-6 inline-flex w-full justify-center"
            >
              Give to {family.name.split(" ").slice(-1)[0]}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
