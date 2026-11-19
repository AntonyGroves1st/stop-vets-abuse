import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/PageEditor";
import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Edit: {page.title}</h1>
      <div className="mt-8">
        <PageEditor id={page.id} slug={page.slug} title={page.title} sections={page.sections} />
      </div>
    </div>
  );
}
