import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { saveSettings } from "@/lib/settings";

const schema = z.object({
  siteName: z.string().min(1),
  tagline: z.string().min(1),
  contactEmail: z.string().email(),
  footerBlurb: z.string().min(1),
  socialTwitter: z.string(),
  socialFacebook: z.string(),
  donate: z.object({
    headline: z.string().min(1),
    subcopy: z.string().min(1),
    amounts: z.array(z.number().int().min(100)).min(1),
    monthlyEnabled: z.boolean(),
  }),
});

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = schema.parse(await req.json());
    await saveSettings(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid settings" }, { status: 400 });
  }
}
