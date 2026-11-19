import { notFound } from "next/navigation";
import { StoryEditor } from "@/components/admin/StoryEditor";
import { prisma } from "@/lib/prisma";

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await prisma.story.findUnique({ where: { id } });
  if (!story) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Edit story</h1>
      <div className="mt-8">
        <StoryEditor
          initial={{
            id: story.id,
            title: story.title,
            slug: story.slug,
            excerpt: story.excerpt,
            body: story.body,
            status: story.status,
            branch: story.branch,
            coverUrl: story.coverUrl || "",
            featured: story.featured,
          }}
        />
      </div>
    </div>
  );
}
