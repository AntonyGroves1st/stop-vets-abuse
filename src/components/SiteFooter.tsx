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

const FACES = [
  images.familyJoy,
  images.hero,
  images.fatherSon,
  images.familyWalk,
  images.elderCare,
  images.serviceFamily,
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
      {/* Face strip — proves this is a people desk, not a blank slab */}
      <div className="relative grid grid-cols-3 gap-px bg-flag-blue sm:grid-cols-6">
        {FACES.map((face) => (
          <div key={face.src} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={face.src}
              alt={face.alt}
              fill
              className="object-cover opacity-70 transition duration-500 hover:opacity-100 hover:scale-105"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-flag-blue/35" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-flag-blue" />
      </div>

      <div className="usa-rule" />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={images.familyWalk.src}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-flag-blue via-flag-blue/95 to-ink" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr_0.9fr] lg:gap-14">
            <div>
              <p className="eyebrow text-brass-soft">Independent desk</p>
              <Image
                src={images.brandBanner.src}
                alt={images.brandBanner.alt}
                width={520}
                height={150}
                className="mt-4 h-auto w-full max-w-md object-contain"
              />
              <p className="sr-only">{siteName}</p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-fog">{blurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/donate" className="btn-copper donate-pulse !bg-flag-red">
                  Donate to save another family today
                </Link>
                <Link
                  href="/sponsor"
                  className="border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-bone transition hover:bg-white/10"
                >
                  Sponsor a family
                </Link>
              </div>
            </div>

            <div>
              <p className="eyebrow text-brass-soft">Navigate</p>
              <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
                {FOOTER_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-fog transition hover:text-bone"
                    >
                      <span className="h-px w-3 bg-flag-red" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-7">
              <p className="eyebrow text-brass-soft">Tip line</p>
              <p className="mt-3 font-display text-2xl text-bone">Tell us what climate reports won&apos;t.</p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-4 block text-sm text-fog transition hover:text-bone"
              >
                {contactEmail}
              </a>
              <Link
                href="/contact"
                className="mt-6 inline-flex border border-white/25 px-4 py-2.5 text-sm font-semibold text-bone transition hover:bg-white/10"
              >
                Open secure tip intake →
              </Link>
              <p className="mt-6 text-xs leading-relaxed text-aluminum">
                Independent journalism. Not affiliated with the Department of Defense.
              </p>
            </div>
          </div>
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
