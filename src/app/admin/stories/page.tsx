import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminStoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const stories = await prisma.story.findMany({
    where: status ? { status } : undefined,
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">Stories</h1>
          <p className="mt-1 text-slate">Create and publish investigations</p>
        </div>
        <Link
          href="/admin/stories/new"
          className="bg-ink px-4 py-2.5 text-sm font-medium text-bone hover:bg-slate"
        >
          New story
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-ink/10 bg-paper">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink/10 text-xs tracking-wide text-aluminum uppercase">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="border-b border-ink/5 hover:bg-bone/60">
                <td className="px-4 py-3">
                  <Link href={`/admin/stories/${story.id}`} className="font-medium text-ink hover:text-copper">
                    {story.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate">{story.branch}</td>
                <td className="px-4 py-3 text-slate">{story.status}</td>
                <td className="px-4 py-3 text-aluminum">{formatDate(story.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
