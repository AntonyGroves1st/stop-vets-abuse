import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Thank you",
};

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; family?: string }>;
}) {
  const { provider, family: familySlug } = await searchParams;
  const family = familySlug
    ? await prisma.sponsoredFamily.findUnique({ where: { slug: familySlug } })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
      <p className="eyebrow text-copper">Gift received</p>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
        {family
          ? `Thank you — you’re standing with ${family.name}`
          : "Thank you — another family is closer to being heard."}
      </h1>
      <p className="mt-5 text-lg text-slate">
        Your {provider === "paypal" ? "PayPal" : "card"} donation helps keep independent military
        abuse journalism alive.
        {family
          ? " Follow their diary for support updates and the one-year-later letter."
          : " A receipt will come from the payment provider."}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {family ? (
          <Link href={`/sponsor/${family.slug}`} className="btn-copper">
            Open {family.name} diary
          </Link>
        ) : (
          <Link href="/sponsor" className="btn-copper">
            Sponsor a named family
          </Link>
        )}
        <Link href="/investigations" className="border border-ink/20 px-5 py-3 text-sm text-ink">
          Read investigations
        </Link>
      </div>
    </div>
  );
}
