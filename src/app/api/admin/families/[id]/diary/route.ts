import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  monthLabel: z.string().min(1),
  kind: z.enum(["support", "update", "year_later"]),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const data = schema.parse(await req.json());
    const entry = await prisma.familyDiaryEntry.create({
      data: {
        familyId: id,
        title: data.title,
        body: data.body,
        monthLabel: data.monthLabel,
        kind: data.kind,
        published: true,
      },
    });
    return NextResponse.json(entry);
  } catch {
    return NextResponse.json({ error: "Invalid entry" }, { status: 400 });
  }
}
