import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

const FOOTER_LINKS = [
  { href: "/sponsor", label: "Sponsor a Family" },
  { href: "/help", label: "How We Help" },
  { href: "/investigations", label: "Investigations" },
  { href: "/mission", label: "Mission" },
  { href: "/coverage", label: "Coverage" },
  { href: "/contact", label: "Send a tip" },
  { href: "/donate", label: "Ways to donate" },
] as const;

export function SiteFooter({
  siteName,
  blurb,
  contactEmail,
}: {
  siteName: string;
  blurb: string;
  contactEmail: string;
}) {
  return (
    <footer className="relative mt-0 bg-flag-blue text-fog">
      <div className="usa-rule" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <Image
          src={images.familyWalk.src}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 ink-wash opacity-95" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <p className="font-display text-3xl leading-snug text-bone">{siteName}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-aluminum">{blurb}</p>
          <Link href="/donate" className="btn-copper donate-pulse mt-8 inline-flex">
            Donate to save another family today
          </Link>
        </div>
        <div>
          <p className="eyebrow text-brass-soft">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm">
            {FOOTER_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-bone">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-brass-soft">Desk</p>
          <p className="mt-5 text-sm text-aluminum">Tips &amp; contact</p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-2 block text-bone transition hover:text-copper-hot"
          >
            {contactEmail}
          </a>
          <p className="mt-6 text-xs leading-relaxed text-aluminum">
            Independent journalism. Not affiliated with the Department of Defense.
          </p>
        </div>
      </div>
      <div
        className="relative border-t border-white/10 px-5 py-5 text-center font-condensed text-[0.7rem] tracking-[0.18em] text-aluminum uppercase md:px-8"
        suppressHydrationWarning
      >
        © 2026 {siteName} · Reporting in the public interest
      </div>
      <div className="usa-rule" />
    </footer>
  );
}
