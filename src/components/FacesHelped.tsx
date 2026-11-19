"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { images } from "@/lib/images";

const faces = [
  {
    name: "Kate",
    role: "Marine family",
    quote:
      "The complaint was 'resolved' on paper. At home, nothing was. The investigation finally named what we lived.",
    image: images.familyJoy,
  },
  {
    name: "Erin",
    role: "Army service member",
    quote:
      "Mental-health referrals sat in a queue while we counted the hours. Public scrutiny moved what private pleas could not.",
    image: images.hero,
  },
  {
    name: "Maria",
    role: "Army household",
    quote:
      "Retaliation looked like schedule changes and closed doors. Seeing the pattern published broke the isolation.",
    image: images.heroAlt,
  },
];

export function FacesHelped() {
  return (
    <section className="relative overflow-hidden ink-wash py-20 text-bone md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30 texture-linen" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brass-soft">Who we stand with</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Faces behind the FOIA numbers
            </h2>
          </div>
          <p className="max-w-sm text-sm text-fog">
            Composite portraits drawn from recurring patterns in our reporting — the people donations
            keep us able to defend in print.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {faces.map((face, i) => (
            <motion.article
              key={face.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="edge-frame-dark group overflow-hidden bg-ink-soft/80"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={face.image.src}
                  alt={face.image.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-3xl">{face.name}</p>
                  <p className="mt-1 font-condensed text-xs tracking-[0.2em] text-brass-soft uppercase">
                    {face.role}
                  </p>
                </div>
              </div>
              <blockquote className="border-t border-white/10 p-6 text-[0.95rem] leading-relaxed text-fog">
                “{face.quote}”
              </blockquote>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-white/10 bg-white/5 p-6 backdrop-blur-md md:flex-row md:items-center md:p-8">
          <div>
            <p className="font-display text-2xl md:text-3xl">
              Help more people like Kate, Erin &amp; Maria
            </p>
            <p className="mt-2 max-w-xl text-sm text-fog">
              Every gift funds the next investigation that command climate surveys will never write.
            </p>
          </div>
          <Link href="/donate" className="btn-copper donate-pulse shrink-0">
            Donate to save another family today
          </Link>
        </div>
      </div>
    </section>
  );
}
