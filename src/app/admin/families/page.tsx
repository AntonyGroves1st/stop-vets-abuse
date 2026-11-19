import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function AdminFamiliesPage() {
  const families = await prisma.sponsoredFamily.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { diary: true, followers: true, donations: true } },
      diary: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Sponsored families</h1>
      <p className="mt-1 text-slate">
        Profiles, diary newsletters, and one-year-later letters for donor connection
      </p>

      <div className="mt-8 space-y-4">
        {families.map((family) => (
          <article key={family.id} className="border border-ink/10 bg-paper p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">{family.name}</h2>
                <p className="mt-1 text-sm text-aluminum">
                  {family.branch} · {family.location} · /sponsor/{family.slug}
                </p>
                <p className="mt-3 max-w-2xl text-sm text-slate">{family.headline}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold text-ink">
                  {formatCurrency(family.raisedCents)} / {formatCurrency(family.goalCents)}
                </p>
                <p className="mt-1 text-aluminum">
                  {family._count.donations} gifts · {family._count.followers} followers ·{" "}
                  {family._count.diary} diary entries
                </p>
              </div>
            </div>
            {family.diary[0] && (
              <p className="mt-4 border-t border-ink/10 pt-4 text-sm text-slate">
                Latest diary: <strong>{family.diary[0].monthLabel}</strong> — {family.diary[0].title}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/sponsor/${family.slug}`}
                className="border border-ink/15 px-3 py-1.5 text-xs text-slate hover:border-ink"
              >
                View public page
              </Link>
              <Link
                href={`/admin/families/${family.id}`}
                className="bg-ink px-3 py-1.5 text-xs text-bone"
              >
                Edit diary &amp; followers
              </Link>
            </div>
          </article>
        ))}
        {families.length === 0 && (
          <p className="text-sm text-aluminum">No families yet — run npm run db:seed</p>
        )}
      </div>
    </div>
  );
}
