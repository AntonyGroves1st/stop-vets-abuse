import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({ orderBy: { createdAt: "desc" } });
  const total = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Donations</h1>
      <p className="mt-1 text-slate">
        Completed total: <strong>{formatCurrency(total)}</strong> · {donations.length} records
      </p>

      <div className="mt-8 overflow-x-auto border border-ink/10 bg-paper">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-ink/10 text-xs tracking-wide text-aluminum uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-b border-ink/5">
                <td className="px-4 py-3 text-aluminum">{formatDate(d.createdAt)}</td>
                <td className="px-4 py-3">{d.provider}</td>
                <td className="px-4 py-3 font-medium">{formatCurrency(d.amount, d.currency)}</td>
                <td className="px-4 py-3">{d.frequency}</td>
                <td className="px-4 py-3">{d.status}</td>
                <td className="px-4 py-3 text-slate">{d.email || "—"}</td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-aluminum">
                  No donations yet. Stripe webhooks and PayPal captures appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
