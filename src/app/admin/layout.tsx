import { getServerSession } from "next-auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { Providers } from "@/components/admin/Providers";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <Providers>
      {session ? (
        <div className="flex min-h-screen flex-col bg-bone-dim md:flex-row">
          <AdminNav />
          <div className="flex-1 overflow-auto p-5 md:p-8">{children}</div>
        </div>
      ) : (
        <div className="min-h-screen bg-ink">{children}</div>
      )}
    </Providers>
  );
}
