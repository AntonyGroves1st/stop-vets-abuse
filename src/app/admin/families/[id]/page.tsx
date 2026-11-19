import { notFound } from "next/navigation";
import { FamilyDiaryAdmin } from "@/components/admin/FamilyDiaryAdmin";
import { prisma } from "@/lib/prisma";

export default async function AdminFamilyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const family = await prisma.sponsoredFamily.findUnique({
    where: { id },
    include: {
      diary: { orderBy: { createdAt: "asc" } },
      followers: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!family) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">{family.name}</h1>
      <p className="mt-1 text-slate">
        Manage sponsor diary letters and newsletter followers
      </p>
      <div className="mt-8">
        <FamilyDiaryAdmin
          familyId={family.id}
          entries={family.diary}
          followers={family.followers}
        />
      </div>
    </div>
  );
}
