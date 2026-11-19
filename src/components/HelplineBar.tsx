import Link from "next/link";

export function HelplineBar({ email }: { email: string }) {
  return (
    <div className="relative z-50 bg-flag-blue text-fog">
      <div className="usa-rule-thin" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-2.5 text-[0.78rem] md:px-8">
        <p className="font-condensed tracking-[0.14em] uppercase">
          <span className="text-white">Tip line</span>
          <span className="mx-2 text-brass-soft">·</span>
          <a href={`mailto:${email}`} className="text-fog transition hover:text-white">
            {email}
          </a>
          <span className="mx-2 hidden text-brass-soft sm:inline">·</span>
          <span className="hidden text-brass-soft sm:inline">Confidential · Source-protected</span>
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="font-condensed tracking-[0.16em] text-fog uppercase transition hover:text-white"
          >
            Send a tip
          </Link>
          <Link
            href="/donate"
            className="bg-flag-red px-3 py-1.5 font-condensed text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset] transition hover:bg-copper-hot"
          >
            Donate now
          </Link>
        </div>
      </div>
      <div className="usa-rule-thin" />
    </div>
  );
}
