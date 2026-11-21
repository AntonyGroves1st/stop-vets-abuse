import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const [storyCount, draftCount, donationAgg, unreadTips, recentDonations, recentStories] =
    await Promise.all([
      prisma.story.count(),
      prisma.story.count({ where: { status: "draft" } }),
      prisma.donation.aggregate({
        _sum: { amount: true },
        _count: true,
        where: { status: "completed" },
      }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.donation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.story.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    ]);

  const cards = [
    { label: "Stories", value: String(storyCount), href: "/admin/stories" },
    { label: "Drafts", value: String(draftCount), href: "/admin/stories?status=draft" },
    {
      label: "Donations",
      value: formatCurrency(donationAgg._sum.amount ?? 0),
      href: "/admin/donations",
    },
    { label: "Unread tips", value: String(unreadTips), href: "/admin/inbox" },
    { label: "Funding leads", value: "Gov · partners", href: "/admin/funding" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Dashboard</h1>
      <p className="mt-2 text-slate">Editorial desk overview</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-ink/10 bg-paper p-5 transition hover:border-copper"
          >
            <p className="text-xs tracking-[0.16em] text-aluminum uppercase">{card.label}</p>
            <p className="mt-3 font-display text-3xl text-ink">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="border border-ink/10 bg-paper p-5">
          <h2 className="font-display text-xl text-ink">Recent donations</h2>
          <ul className="mt-4 space-y-3">
            {recentDonations.map((d) => (
              <li key={d.id} className="flex justify-between gap-3 text-sm border-b border-ink/5 pb-3">
                <span>
                  {d.provider} · {d.frequency}
                  <span className="block text-aluminum">{formatDate(d.createdAt)}</span>
                </span>
                <span className="font-medium">{formatCurrency(d.amount, d.currency)}</span>
              </li>
            ))}
            {recentDonations.length === 0 && (
              <li className="text-sm text-aluminum">No donations logged yet.</li>
            )}
          </ul>
        </section>

        <section className="border border-ink/10 bg-paper p-5">
          <h2 className="font-display text-xl text-ink">Recent stories</h2>
          <ul className="mt-4 space-y-3">
            {recentStories.map((s) => (
              <li key={s.id} className="border-b border-ink/5 pb-3 text-sm">
                <Link href={`/admin/stories/${s.id}`} className="text-ink hover:text-copper">
                  {s.title}
                </Link>
                <span className="mt-1 block text-aluminum">
                  {s.status} · {s.branch}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
