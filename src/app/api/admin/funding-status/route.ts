import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseJson } from "@/lib/utils";
import type { FundingPursuitStatus } from "@/content/funding-leads";

const KEY = "fundingLeadStatus";

const schema = z.record(
  z.string(),
  z.object({
    status: z.enum(["new", "watching", "preparing", "applied", "won", "passed"]),
    note: z.string().max(2000).optional(),
    updatedAt: z.string().optional(),
  }),
);

export type FundingStatusMap = Record<
  string,
  { status: FundingPursuitStatus; note?: string; updatedAt?: string }
>;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: KEY } });
    const map = parseJson<FundingStatusMap>(row?.value ?? "", {});
    return NextResponse.json({ map });
  } catch {
    return NextResponse.json({ map: {} });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const map = schema.parse(body.map ?? body) as FundingStatusMap;
    await prisma.siteSetting.upsert({
      where: { key: KEY },
      update: { value: JSON.stringify(map) },
      create: { key: KEY, value: JSON.stringify(map) },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid status map" }, { status: 400 });
  }
}
