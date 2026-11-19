"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

type StoryCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  branch: string;
  coverUrl?: string | null;
  publishedAt?: Date | string | null;
  index?: number;
};

export function StoryCard({
  title,
  slug,
  excerpt,
  branch,
  coverUrl,
  publishedAt,
  index = 0,
}: StoryCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group panel overflow-hidden !p-0"
    >
      <Link
        href={`/investigations/${slug}`}
        className="grid md:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-ink-soft md:aspect-auto md:min-h-[280px]">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate to-ink" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-60" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <div className="flex items-center gap-3 font-condensed text-[0.7rem] tracking-[0.18em] text-aluminum uppercase">
            <span className="text-copper">{branch}</span>
            {publishedAt && (
              <>
                <span aria-hidden>•</span>
                <time>{formatDate(publishedAt)}</time>
              </>
            )}
          </div>
          <h3 className="mt-4 font-display text-2xl leading-snug text-ink transition group-hover:text-copper md:text-[1.9rem]">
            {title}
          </h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-slate">{excerpt}</p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 border-b border-copper/40 pb-1 text-sm font-semibold tracking-wide text-copper transition group-hover:border-copper">
            Read investigation
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
