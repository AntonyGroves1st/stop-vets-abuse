import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TipTapRenderer } from "@/components/TipTapRenderer";
import { images } from "@/lib/images";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await prisma.story.findUnique({ where: { slug } });
  if (!story) return { title: "Investigation" };
  return {
    title: story.title,
    description: story.excerpt,
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await prisma.story.findUnique({ where: { slug } });
  if (!story || story.status !== "published") notFound();

  return (
    <article>
      <header className="relative min-h-[62vh] overflow-hidden bg-ink text-bone">
        {story.coverUrl && (
          <Image
            src={story.coverUrl}
            alt=""
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-4xl flex-col justify-end px-5 pb-14 pt-28 md:px-8">
          <p className="text-xs tracking-[0.2em] text-fog uppercase">
            {story.branch}
            {story.publishedAt ? ` · ${formatDate(story.publishedAt)}` : ""}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{story.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-fog">{story.excerpt}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <TipTapRenderer content={story.body} />
      </div>

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
        </div>
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-20">
          <p className="font-display text-3xl md:text-4xl">Donate to save another family today</p>
          <p className="mx-auto mt-4 max-w-xl text-fog">
            Independent investigations like this one need sustained funding — not press releases.
          </p>
          <Link
            href="/donate"
            className="donate-pulse mt-8 inline-block bg-copper px-6 py-3.5 text-sm font-semibold text-bone hover:bg-copper-hot"
          >
            Support this work
          </Link>
        </div>
      </section>
    </article>
  );
}
