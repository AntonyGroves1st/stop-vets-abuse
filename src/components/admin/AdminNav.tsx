"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/stories", label: "Stories" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/families", label: "Families" },
  { href: "/admin/donations", label: "Donations" },
  { href: "/admin/inbox", label: "Inbox" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-white/10 bg-ink text-fog md:min-h-screen md:w-60 md:border-r md:border-b-0">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="font-display text-lg text-bone">SVAJ Admin</p>
        <p className="mt-1 text-xs text-aluminum">Back office</p>
      </div>
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto px-2 py-3 md:flex-col md:overflow-visible md:px-3">
        {links.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-sm px-3 py-2 text-sm transition",
                active ? "bg-white/10 text-bone" : "text-aluminum hover:bg-white/5 hover:text-bone",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link href="/" className="block px-3 py-2 text-sm text-aluminum hover:text-bone">
          View site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full px-3 py-2 text-left text-sm text-aluminum hover:text-bone"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
