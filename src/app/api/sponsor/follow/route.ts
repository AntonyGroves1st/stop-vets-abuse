import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  familyId: z.string().min(1),
  name: z.string().min(1).max(120),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const family = await prisma.sponsoredFamily.findUnique({ where: { id: data.familyId } });
    if (!family) return NextResponse.json({ error: "Family not found" }, { status: 404 });

    await prisma.familyFollower.upsert({
      where: {
        familyId_email: {
          familyId: data.familyId,
          email: data.email.toLowerCase(),
        },
      },
      update: { name: data.name },
      create: {
        familyId: data.familyId,
        name: data.name,
        email: data.email.toLowerCase(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid details" }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
  }
}
