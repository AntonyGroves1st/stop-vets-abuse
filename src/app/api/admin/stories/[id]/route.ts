import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(["draft", "published"]),
  branch: z.string().min(1),
  coverUrl: z.string().optional(),
  featured: z.boolean().optional(),
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
    const existing = await prisma.story.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const story = await prisma.story.update({
      where: { id },
      data: {
        title: data.title,
        slug: slugify(data.slug),
        excerpt: data.excerpt,
        body: data.body,
        status: data.status,
        branch: data.branch,
        coverUrl: data.coverUrl || null,
        featured: data.featured ?? false,
        publishedAt:
          data.status === "published"
            ? existing.publishedAt || new Date()
            : existing.publishedAt,
      },
    });
    return NextResponse.json(story);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid story data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not update story" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.story.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
