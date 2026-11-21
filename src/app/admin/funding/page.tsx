import { FundingLeadsBoard } from "@/components/admin/FundingLeadsBoard";
import { fundingLeads } from "@/content/funding-leads";
import { prisma } from "@/lib/prisma";
import { parseJson } from "@/lib/utils";
import type { FundingPursuitStatus } from "@/content/funding-leads";

type StatusMap = Record<
  string,
  { status: FundingPursuitStatus; note?: string; updatedAt?: string }
>;

export default async function AdminFundingPage() {
  let initialMap: StatusMap = {};
  try {
    const row = await prisma.siteSetting.findUnique({
      where: { key: "fundingLeadStatus" },
    });
    initialMap = parseJson<StatusMap>(row?.value ?? "", {});
  } catch {
    initialMap = {};
  }

  const active = Object.values(initialMap).filter((r) =>
    ["watching", "preparing", "applied"].includes(r.status),
  ).length;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Funding leads</h1>
      <p className="mt-2 max-w-3xl text-slate">
        .Gov grants, charity partners, big-check lanes, and direct family aid — so
        sponsored households are not stuck waiting on website donations alone. Track
        pursuit status as you chase each lead.
      </p>
      <p className="mt-3 text-sm text-aluminum">
        {fundingLeads.length} curated leads · {active} in motion
      </p>

      <div className="mt-6 border border-copper/30 bg-copper/5 p-4 text-sm text-slate">
        <p className="font-medium text-ink">Playbook (short)</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Finish <strong>Get grant-ready</strong> (SAM.gov + Grants.gov + GuideStar).</li>
          <li>Partner with an eligible nonprofit for SSVF / HUD-VASH if you are not yet 501(c)(3) grant-ready.</li>
          <li>Stack <strong>family-direct</strong> aid this week while federal cycles run.</li>
          <li>Pitch community foundations + DAFs + corporate match for the 12 families in parallel.</li>
        </ol>
      </div>

      <FundingLeadsBoard initialMap={initialMap} />
    </div>
  );
}
