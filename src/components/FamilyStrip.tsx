"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { images } from "@/lib/images";

const frames = [
  { ...images.familyJoy, caption: "Home is the mission after the mission" },
  { ...images.hero, caption: "Service members walking back through the door" },
  { ...images.familyCouch, caption: "What we fight to protect" },
  { ...images.familyWalk, caption: "Every branch. Every family. No exceptions." },
];

export function FamilyStrip() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 text-ink md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40 texture-linen" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-flag-red">The faces behind the FOIA</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-flag-blue md:text-5xl">
            Not equipment. Not aircraft. Families.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate md:text-lg">
            Every tip, every records request, every published investigation exists so another spouse,
            child, or veteran is not left negotiating abuse in silence.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {frames.map((frame, i) => (
            <motion.figure
              key={`${frame.src}-${frame.caption}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden border border-flag-blue/15 bg-white shadow-[var(--shadow-lift)]"
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm leading-snug text-bone md:text-[0.95rem]">
                {frame.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
