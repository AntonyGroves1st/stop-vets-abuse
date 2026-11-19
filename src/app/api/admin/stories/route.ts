import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(["draft", "published"]),
  branch: z.string().min(1),
  coverUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = schema.parse(await req.json());
    const slug = slugify(data.slug || data.title);
    const story = await prisma.story.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        body: data.body,
        status: data.status,
        branch: data.branch,
        coverUrl: data.coverUrl || null,
        featured: data.featured ?? false,
        publishedAt: data.status === "published" ? new Date() : null,
      },
    });
    return NextResponse.json(story);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid story data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not create story" }, { status: 500 });
  }
}
