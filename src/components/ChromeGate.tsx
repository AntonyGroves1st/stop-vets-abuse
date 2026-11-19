"use client";

import { usePathname } from "next/navigation";
import { HelplineBar } from "@/components/HelplineBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function ChromeGate({
  children,
  siteName,
  footerBlurb,
  contactEmail,
}: {
  children: React.ReactNode;
  siteName: string;
  footerBlurb: string;
  contactEmail: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <HelplineBar email={contactEmail} />
      <SiteHeader siteName={siteName} />
      <main>{children}</main>
      <SiteFooter siteName={siteName} blurb={footerBlurb} contactEmail={contactEmail} />
    </>
  );
}
