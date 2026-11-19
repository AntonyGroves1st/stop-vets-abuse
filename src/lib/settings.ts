import { prisma } from "./prisma";
import { parseJson } from "./utils";

export type DonateSettings = {
  headline: string;
  subcopy: string;
  amounts: number[];
  monthlyEnabled: boolean;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  contactEmail: string;
  footerBlurb: string;
  socialTwitter: string;
  socialFacebook: string;
  donate: DonateSettings;
};

export const defaultSettings: SiteSettings = {
  siteName: "Stop Veterans Abuse Journalism",
  tagline:
    "Independent reporting for every American in uniform — and the families who wait for them at home.",
  contactEmail: "tips@stopvetsabuse.org",
  footerBlurb:
    "We investigate systemic abuse across the U.S. Armed Forces and DoD departments — so another family does not face silence alone.",
  socialTwitter: "",
  socialFacebook: "",
  donate: {
    headline: "Donate to save another family today",
    subcopy:
      "Your gift funds field reporting, records requests, legal review, and direct support pathways for military families under pressure.",
    amounts: [2500, 5000, 10000, 25000],
    monthlyEnabled: true,
  },
};

export async function getSettings(): Promise<SiteSettings> {
  const rows = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return {
    siteName: map.siteName ?? defaultSettings.siteName,
    tagline: map.tagline ?? defaultSettings.tagline,
    contactEmail: map.contactEmail ?? defaultSettings.contactEmail,
    footerBlurb: map.footerBlurb ?? defaultSettings.footerBlurb,
    socialTwitter: map.socialTwitter ?? defaultSettings.socialTwitter,
    socialFacebook: map.socialFacebook ?? defaultSettings.socialFacebook,
    donate: parseJson(map.donate ?? "", defaultSettings.donate),
  };
}

export async function setSetting(key: string, value: string) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function saveSettings(settings: SiteSettings) {
  const entries: [string, string][] = [
    ["siteName", settings.siteName],
    ["tagline", settings.tagline],
    ["contactEmail", settings.contactEmail],
    ["footerBlurb", settings.footerBlurb],
    ["socialTwitter", settings.socialTwitter],
    ["socialFacebook", settings.socialFacebook],
    ["donate", JSON.stringify(settings.donate)],
  ];

  for (const [key, value] of entries) {
    await setSetting(key, value);
  }
}
