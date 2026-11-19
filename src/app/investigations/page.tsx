import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StoryCard } from "@/components/StoryCard";
import { images } from "@/lib/images";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Investigations",
};

export default async function InvestigationsPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const { branch } = await searchParams;
  const stories = await prisma.story.findMany({
    where: {
      status: "published",
      ...(branch ? { branch } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  const branches = await prisma.story.findMany({
    where: { status: "published" },
    select: { branch: true },
    distinct: ["branch"],
    orderBy: { branch: "asc" },
  });

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden bg-ink text-bone">
        <Image
          src={images.familyStruggle.src}
          alt={images.familyStruggle.alt}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative mx-auto flex min-h-[40vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="text-xs tracking-[0.22em] text-fog uppercase">The record</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Investigations</h1>
          <p className="mt-4 max-w-2xl text-lg text-fog">
            Documented patterns of abuse, negligence, and retaliation — published for the public,
            useful for families.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/investigations"
            className={`px-3 py-1.5 text-sm ${!branch ? "bg-ink text-bone" : "border border-ink/15 text-slate"}`}
          >
            All
          </Link>
          {branches.map((b) => (
            <Link
              key={b.branch}
              href={`/investigations?branch=${encodeURIComponent(b.branch)}`}
              className={`px-3 py-1.5 text-sm ${
                branch === b.branch ? "bg-ink text-bone" : "border border-ink/15 text-slate"
              }`}
            >
              {b.branch}
            </Link>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          {stories.map((story, index) => (
            <StoryCard key={story.id} {...story} index={index} />
          ))}
          {stories.length === 0 && (
            <p className="border-t border-ink/10 pt-8 text-slate">No published investigations yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
