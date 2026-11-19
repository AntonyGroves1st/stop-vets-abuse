import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DonateForm } from "@/components/DonateForm";
import { WaysToGive } from "@/components/WaysToGive";
import { images } from "@/lib/images";
import { paypalConfigured } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { stripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Donate",
};

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ family?: string }>;
}) {
  const { family: familySlug } = await searchParams;
  const settings = await getSettings();
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const family = familySlug
    ? await prisma.sponsoredFamily.findUnique({ where: { slug: familySlug } })
    : null;

  return (
    <>
      <section className="relative min-h-[48vh] overflow-hidden bg-ink text-bone grain">
        <Image
          src={family?.imageUrl || images.familyWalk.src}
          alt={family?.name || images.familyWalk.alt}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="pointer-events-none absolute inset-6 usa-border-soft md:inset-10" />
        <div className="relative z-[2] mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="eyebrow text-brass-soft">
            {family ? `Sponsoring ${family.name}` : "Ways to donate"}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {family ? `Stand with ${family.name}` : settings.donate.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fog">
            {family
              ? "Your gift tags to this family’s casework — and unlocks their diary newsletters, including the one-year-later letter."
              : settings.donate.subcopy}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1fr_1.15fr] md:px-8 md:py-20">
        <div>
          <div className="relative mb-8 aspect-[4/3] overflow-hidden edge-frame">
            <Image
              src={family?.imageUrl || images.elderCare.src}
              alt={family?.name || images.elderCare.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
            {family
              ? family.headline
              : "Your gift funds reporting that command cannot bury."}
          </h2>
          {family ? (
            <p className="mt-6 text-slate">{family.story}</p>
          ) : (
            <ul className="mt-8 space-y-4">
              {[
                "Records requests, travel, and legal review for high-risk stories",
                "Source protection for troops, spouses, and caregivers",
                "Publishing across every branch and DoD department",
              ].map((line) => (
                <li
                  key={line}
                  className="border border-ink/10 bg-paper px-4 py-3 text-slate shadow-[var(--shadow-edge)]"
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 text-sm text-aluminum">
            {family ? (
              <>
                Want another household?{" "}
                <Link href="/sponsor" className="text-copper underline underline-offset-4">
                  Browse families
                </Link>
              </>
            ) : (
              <>
                Or{" "}
                <Link href="/sponsor" className="text-copper underline underline-offset-4">
                  sponsor a named family
                </Link>{" "}
                for a personal diary connection.
              </>
            )}
          </p>
        </div>

        <div className="panel p-6 md:p-8">
          <DonateForm
            amounts={settings.donate.amounts}
            headline={family ? `Sponsor ${family.name}` : "Make a donation online"}
            subcopy={
              family
                ? "Tagged sponsorship — follow their diary after you give."
                : "Your generosity keeps the tip line open and the next investigation funded."
            }
            monthlyEnabled={settings.donate.monthlyEnabled}
            stripeReady={stripeConfigured()}
            paypalClientId={paypalClientId.includes("replace_me") ? "" : paypalClientId}
            paypalReady={paypalConfigured() && !paypalClientId.includes("replace_me")}
            familySlug={family?.slug}
            familyName={family?.name}
          />
        </div>
      </div>

      <div className="border-t border-ink/10 bg-paper-deep">
        <WaysToGive />
      </div>
    </>
  );
}
