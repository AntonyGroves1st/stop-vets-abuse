"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const links = [
  { href: "/sponsor", label: "Sponsor a Family" },
  { href: "/help", label: "How We Help" },
  { href: "/investigations", label: "Investigations" },
  { href: "/mission", label: "Mission" },
  { href: "/coverage", label: "Coverage" },
  { href: "/contact", label: "Tips" },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-all duration-300",
        scrolled
          ? "shadow-[0_12px_40px_-24px_rgba(10,31,68,0.4)] backdrop-blur-xl"
          : "",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="group min-w-0 shrink-0 transition hover:opacity-95"
          aria-label={siteName}
        >
          <Image
            src={`${images.brandBannerHeader.src}?v=3`}
            alt={images.brandBannerHeader.alt}
            width={1024}
            height={348}
            priority
            unoptimized
            className="h-14 w-auto max-w-[min(70vw,420px)] object-contain object-left md:h-16 md:max-w-[520px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative inline-flex h-10 items-center px-3 text-sm tracking-wide transition-colors",
                pathname.startsWith(link.href)
                  ? "text-flag-blue after:absolute after:right-3 after:bottom-1 after:left-3 after:h-[2px] after:bg-flag-red"
                  : "text-slate hover:text-flag-blue",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="btn-copper donate-pulse ml-3 !bg-flag-red !px-4 !py-2.5 text-xs"
          >
            Donate for families
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-flag-blue/20 bg-white shadow-[var(--shadow-edge)] lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={cn(
                "block h-px w-5 bg-flag-blue transition",
                open && "translate-y-1.5 rotate-45",
              )}
            />
            <span className={cn("block h-px w-5 bg-flag-blue transition", open && "opacity-0")} />
            <span
              className={cn(
                "block h-px w-5 bg-flag-blue transition",
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      {/* Single continuous accent — tricolor rule was reading as a broken/offset banner */}
      <div className="h-[3px] w-full bg-flag-red" />

      {open && (
        <div className="border-t border-flag-blue/10 bg-white px-5 py-5 shadow-[var(--shadow-lift)] lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-flag-blue/5 py-3 text-base text-slate"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="btn-copper mt-4 text-center !bg-flag-red"
            >
              Donate to save another family today
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
