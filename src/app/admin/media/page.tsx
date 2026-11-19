import { MediaUploader } from "@/components/admin/MediaUploader";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Media</h1>
      <p className="mt-1 text-slate">Upload images for stories and pages</p>
      <div className="mt-8">
        <MediaUploader />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <figure key={item.id} className="border border-ink/10 bg-paper p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.alt} className="aspect-video w-full object-cover" />
            <figcaption className="mt-3 text-xs text-aluminum">
              <p className="truncate text-ink">{item.filename}</p>
              <p className="mt-1 break-all">{item.url}</p>
              <p className="mt-1">{formatDate(item.createdAt)}</p>
            </figcaption>
          </figure>
        ))}
        {media.length === 0 && <p className="text-sm text-aluminum">No uploads yet.</p>}
      </div>
    </div>
  );
}
