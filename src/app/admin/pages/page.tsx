import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminPagesList() {
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Pages</h1>
      <p className="mt-1 text-slate">Edit mission, coverage, home blocks, and more</p>
      <div className="mt-8 space-y-3">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/${page.id}`}
            className="flex items-center justify-between border border-ink/10 bg-paper px-5 py-4 hover:border-copper"
          >
            <div>
              <p className="font-medium text-ink">{page.title}</p>
              <p className="text-sm text-aluminum">/{page.slug}</p>
            </div>
            <span className="text-xs text-aluminum">{formatDate(page.updatedAt)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
