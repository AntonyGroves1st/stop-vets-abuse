import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(1),
  sections: z.string().min(2),
});

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const data = schema.parse(await req.json());
    JSON.parse(data.sections);
    const page = await prisma.page.update({
      where: { id },
      data: { title: data.title, sections: data.sections },
    });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Invalid page data" }, { status: 400 });
  }
}
