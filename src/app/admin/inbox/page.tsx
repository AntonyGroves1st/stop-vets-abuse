import { MarkReadButton } from "@/components/admin/MarkReadButton";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminInboxPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Support inbox</h1>
      <p className="mt-1 text-slate">Tips and contact submissions</p>
      <div className="mt-8 space-y-4">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className={`border bg-paper p-5 ${msg.read ? "border-ink/10 opacity-80" : "border-copper/40"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">
                  {msg.name}{" "}
                  <span className="font-normal text-aluminum">&lt;{msg.email}&gt;</span>
                </p>
                <p className="mt-1 text-xs text-aluminum">{formatDate(msg.createdAt)}</p>
                {msg.subject && <p className="mt-2 text-sm text-slate">Subject: {msg.subject}</p>}
              </div>
              {!msg.read && <MarkReadButton id={msg.id} />}
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate">{msg.message}</p>
          </article>
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-aluminum">Inbox is empty.</p>
        )}
      </div>
    </div>
  );
}
