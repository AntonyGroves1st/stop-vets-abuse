import type { Metadata } from "next";
import Image from "next/image";
import { SponsorFamilies } from "@/components/SponsorFamilies";
import { images } from "@/lib/images";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Sponsor a Family",
};

export default async function SponsorPage() {
  const families = await prisma.sponsoredFamily.findMany({
    where: { status: "open" },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });

  return (
    <>
      <section className="relative min-h-[44vh] overflow-hidden bg-ink text-bone grain">
        <Image
          src={images.familyJoy.src}
          alt={images.familyJoy.alt}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="pointer-events-none absolute inset-4 border border-white/25 md:inset-8" />
        <div className="relative z-[2] mx-auto flex min-h-[44vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="eyebrow text-brass-soft">Personal connection</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Sponsor a family
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fog">
            Choose a named household. Fund their casework. Receive diary newsletters about the
            support they get — including what life looks like one year later.
          </p>
        </div>
      </section>

      <SponsorFamilies families={families} />
    </>
  );
}
