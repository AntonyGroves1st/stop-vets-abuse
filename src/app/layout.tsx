import type { Metadata } from "next";
import { Barlow_Condensed, Fraunces, Source_Sans_3 } from "next/font/google";
import { ChromeGate } from "@/components/ChromeGate";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: settings.siteName,
      template: `%s · ${settings.siteName}`,
    },
    description: settings.tagline,
    openGraph: {
      title: settings.siteName,
      description: settings.tagline,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${fraunces.variable} ${source.variable} ${barlow.variable}`}>
      <body className="min-h-screen font-sans texture-linen">
        <ScrollProgress />
        <ChromeGate
          siteName={settings.siteName}
          footerBlurb={settings.footerBlurb}
          contactEmail={settings.contactEmail}
        >
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}
