import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const families = [
  {
    name: "The Sullivan Family",
    slug: "sullivan-family",
    branch: "Marines",
    location: "Camp Lejeune area, NC",
    headline: "Barracks neglect that became a children's health issue.",
    story:
      "Work orders outlived deployments. The Sullivans bought air filters out of pocket while official photos looked fine. Sponsorship funds housing documentation, dependent impact reporting, and year-long updates so donors stay tied to the humans — not just the mold counts.",
    imageUrl: "/images/family-sullivan.jpg",
    goalCents: 500000,
    raisedCents: 421000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "First sponsor letter — breathing room",
        body: "Gifts paid for independent air testing, temporary lodging assistance coordination, and photo documentation the unit could not bury. Our kids slept through the night, Kate wrote after week two.",
      },
      {
        monthLabel: "Month 3",
        kind: "update",
        title: "Newsletter: the work order that finally moved",
        body: "Public pressure plus records forced HVAC remediation. Sponsors received the before/after diary with the family's own words — gratitude without letting the system off the hook.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — from crisis to watchdogs",
        body: "The Sullivans are stable, mentoring two other barracks families into tip intake, and still appear in our annual follow-up. Your sponsorship bought a year of safety — and a network that keeps growing.",
      },
    ],
  },
  {
    name: "The Hartwell Family",
    slug: "hartwell-family",
    branch: "Army",
    location: "Fort Liberty area, NC",
    headline: "A homecoming surprise — and a tip that command tried to bury.",
    story:
      "After reporting unit retaliation, the Hartwells spent months without clear answers. Sponsorship funds source protection, legal review of their records trail, and continued desk coverage so their case cannot be quietly closed again.",
    imageUrl: "/images/soldier-mother.jpg",
    goalCents: 750000,
    raisedCents: 312500,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "First newsletter to sponsors — support lands",
        body: "Your gifts covered intake interviews, a secure tip workflow for two witnesses, and the first FOIA package. Erin told us someone finally wrote down what happened without asking them to soften it.",
      },
      {
        monthLabel: "Month 4",
        kind: "update",
        title: "Records move — and so does the household",
        body: "Redacted duty logs confirmed the reclassification pattern. With sponsor backing we added legal review and travel for a corroborating interview. The kids are back in a steadier routine while the case stays active.",
      },
      {
        monthLabel: "Month 8",
        kind: "update",
        title: "Mid-year desk letter to your sponsors",
        body: "We published the first public account of the paperwork gap. Donors received this diary note the same week: the Hartwells read every word before it went live.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — the diary you were promised",
        body: "Twelve months on, the Hartwells are housed stably, the retaliation trail is on the public record, and two additional families from the same installation have come forward.",
      },
    ],
  },
  {
    name: "The Morales Family",
    slug: "morales-family",
    branch: "Army",
    location: "Fort Cavazos area, TX",
    headline: "A buried complaint, a spouse left waiting, a toddler who learned the silence.",
    story:
      "After reporting unit retaliation, the Morales household spent months without clear answers. Sponsorship funds source protection, legal review of their records trail, and continued desk coverage so their case cannot be quietly closed again.",
    imageUrl: "/images/hero-family-reunion.jpg",
    goalCents: 600000,
    raisedCents: 188000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Sponsor welcome — what your gift bought this month",
        body: "We secured counseling referrals outside the broken loop, documented timestamps, and opened a protected channel for witnesses. Maria: someone finally believed the calendar, not the brochure.",
      },
      {
        monthLabel: "Month 6",
        kind: "update",
        title: "Halfway diary — pressure on the system",
        body: "Investigative charts comparing urgency tiers vs. real outcomes are in legal review. Sponsors got this update first: the family is safer day-to-day.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — still writing, still watching",
        body: "A year on, the household is steadier, and the published investigation is cited by other spouses in tip intake.",
      },
    ],
  },
  {
    name: "The Okonkwo Family",
    slug: "okonkwo-family",
    branch: "Navy",
    location: "Norfolk area, VA",
    headline: "Mental-health tickets that died in routine — a spouse keeping the calendar.",
    story:
      "A shore-command referral sat labeled routine while the household reorganized work, school, and sleep around unanswered calls. Sponsorship funds routing reconstruction, outside counseling bridge support, and a year of diary letters so donors see whether care actually arrived.",
    imageUrl: "/images/couple-kiss.jpg",
    goalCents: 550000,
    raisedCents: 241000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Bridge care while the ticket moves",
        body: "Sponsors funded a private counselor for six weeks and a complete printout of portal timestamps. Amara: someone finally treated our wait like evidence.",
      },
      {
        monthLabel: "Month 5",
        kind: "update",
        title: "Routing map enters legal review",
        body: "We matched routine labels against crisis flags in the family's notes. The kids are steadier; the public file is hardening.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — shorter waits for the next family",
        body: "The Okonkwos mentor two other Navy spouses through tip intake. Your sponsorship bought care and a map other households now use.",
      },
    ],
  },
  {
    name: "The Brennan Family",
    slug: "brennan-family",
    branch: "Air Force",
    location: "Tinker AFB area, OK",
    headline: "Depot whistleblowers frozen out — and a kitchen table that absorbed the hit.",
    story:
      "After flagging unsafe maintenance pressure, schedule changes and scorecard hits landed on the household. Sponsorship funds document-first retaliation mapping, legal harden, and family stability while the public pattern is proven.",
    imageUrl: "/images/family-hart.jpg",
    goalCents: 700000,
    raisedCents: 156000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Secure channel + first exhibit set",
        body: "Gifts covered encrypted intake for two peers and childcare during interview days. Dana wrote that they stopped feeling like they were crazy.",
      },
      {
        monthLabel: "Month 7",
        kind: "update",
        title: "Soft-violence timeline published in draft",
        body: "Sponsors saw the schedule-to-scorecard chart before it ran. The Brennans are housed stably while pressure stays on the depot.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — the playbook is public",
        body: "Three more technicians recognized their own freeze-out in the map. Your sponsorship turned one kitchen table into a pattern other families can cite.",
      },
    ],
  },
  {
    name: "The Nguyen Family",
    slug: "nguyen-family",
    branch: "Coast Guard",
    location: "Alameda area, CA",
    headline: "Cutter tempo without manning math — exhaustion that became authority abuse risk.",
    story:
      "Port-call patterns and crew diaries show a household carrying unpaid recovery between surges. Sponsorship funds records work on schedules, spouse impact interviews, and year-long follow-through so tempo is not blamed on individuals alone.",
    imageUrl: "/images/family-walk.jpg",
    goalCents: 480000,
    raisedCents: 92000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Rest window + schedule extract",
        body: "Sponsors paid for a short respite stay and notarized copies of the duty calendar the command preferred to keep informal.",
      },
      {
        monthLabel: "Month 4",
        kind: "update",
        title: "Tempo vs. manning chart for donors",
        body: "We published a redacted comparison for tipsters in the same district. The Nguyens report fewer panic weeks at home.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — still watching the roster",
        body: "The family is steadier; two additional cutter households tipped using their template. Sponsorship kept the door open.",
      },
    ],
  },
  {
    name: "The Castillo Family",
    slug: "castillo-family",
    branch: "Space Force",
    location: "Colorado Springs area, CO",
    headline: "Hybrid contractor command — a complaint with nowhere durable to land.",
    story:
      "Jurisdiction fog between corporate HR and military channels left the Castillos looping polite dead ends. Sponsorship funds seam-mapping, counsel review, and household support while responsibility is forced into the open.",
    imageUrl: "/images/father-son.jpg",
    goalCents: 650000,
    raisedCents: 205000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Two-letterhead file opened",
        body: "We logged every handoff with dates. Sponsors covered travel for a corroborating contractor interview off-site.",
      },
      {
        monthLabel: "Month 6",
        kind: "update",
        title: "Seam diagram shared with followers",
        body: "Donors received the not-us / not-us map the family lived. Day-to-day stress is down; the public file is up.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — fog thinned",
        body: "Named decision points are on the record. Another Space Force household used the Castillos' intake packet.",
      },
    ],
  },
  {
    name: "The Whitaker Family",
    slug: "whitaker-family",
    branch: "Army",
    location: "Joint Base Lewis-McChord area, WA",
    headline: "Privatized housing mold — pediatric visits next to closed work orders.",
    story:
      "The Whitakers' children kept getting sick while tickets flipped between contractor and command. Sponsorship funds environmental testing, medical-timeline corroboration, and relocation bridge support with a full year of donor diaries.",
    imageUrl: "/images/parent-child.jpg",
    goalCents: 800000,
    raisedCents: 534000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Hotel bridge + independent testing",
        body: "Sponsors pulled the kids out of the worst rooms while lab results and photo exhibits were locked for the file.",
      },
      {
        monthLabel: "Month 3",
        kind: "update",
        title: "Landlord fog starts to clear",
        body: "Named offices that could actually remediate — not just forward email. Followers got the ticket chronology the same week.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — a roof that holds",
        body: "The Whitakers are in stable housing and help other JBLM families tip with work-order packs.",
      },
    ],
  },
  {
    name: "The Patel Family",
    slug: "patel-family",
    branch: "Navy",
    location: "San Diego area, CA",
    headline: "A sailor's spouse documenting silence — hour by hour.",
    story:
      "Missed callbacks and rewritten appointment windows turned the Patels into unpaid case managers. Sponsorship funds timestamp reconstruction, secure tip coaching, and household relief while the routing failure becomes public.",
    imageUrl: "/images/servicewomen.jpg",
    goalCents: 520000,
    raisedCents: 118000,
    featured: false,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Calendar forensics begin",
        body: "Gifts paid for a research assistant to rebuild six months of portal screenshots into one exhibit. Priya: finally a third set of eyes.",
      },
      {
        monthLabel: "Month 6",
        kind: "update",
        title: "Halfway — pressure without spectacle",
        body: "Legal review cleared a careful public summary. The family reports fewer 2 a.m. spirals.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — the wait has a name",
        body: "Other San Diego spouses cite the Patel timeline in tip intake. Your sponsorship made the silence measurable.",
      },
    ],
  },
  {
    name: "The Brooks Family",
    slug: "brooks-family",
    branch: "Marines",
    location: "Camp Pendleton area, CA",
    headline: "Unaccompanied barracks neglect — and the parents who still showed up.",
    story:
      "A young Marine's parents drove hours with supplies while work orders stalled. Sponsorship funds barracks documentation, dignity reporting without pity framing, and follow-ups that ask whether remediation was real or cosmetic.",
    imageUrl: "/images/homecoming-embrace.jpg",
    goalCents: 450000,
    raisedCents: 276000,
    featured: false,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Photo file + HVAC push",
        body: "Sponsors funded gear and a notarized conditions log the unit could not shrug off as lifestyle.",
      },
      {
        monthLabel: "Month 5",
        kind: "update",
        title: "Remediation check — not PR paint",
        body: "We returned with meters and timestamps. Donors got honesty: what fixed, what did not.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — retention starts with a roof",
        body: "The Brooks parents still tip other families into intake. Sponsorship kept the beat alive past one viral post.",
      },
    ],
  },
  {
    name: "The Ellison Family",
    slug: "ellison-family",
    branch: "Air Force",
    location: "Wright-Patterson area, OH",
    headline: "Older veteran caregiver load — when clinics go quiet after the uniform comes off.",
    story:
      "An aging Air Force veteran and adult children colliding with deferred referrals and stalled claims. Sponsorship funds clinic-timeline reporting, caregiver relief hours, and a one-year diary that refuses pity framing.",
    imageUrl: "/images/care-hands.jpg",
    goalCents: 580000,
    raisedCents: 149000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Caregiver hours + portal archive",
        body: "Sponsors bought respite care and printed every deferred referral letter. Helen told us love is not a staffing plan.",
      },
      {
        monthLabel: "Month 8",
        kind: "update",
        title: "Quiet is no longer anonymous",
        body: "Dated exhibits forced written answers. The household sleeps more; the public file grew.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — dignity with dates",
        body: "The Ellisons still appear in our older-veterans brief. Sponsorship proved the oath was mutual for twelve months running.",
      },
    ],
  },
  {
    name: "The Romero Family",
    slug: "romero-family",
    branch: "DoD / Joint",
    location: "National Capital Region",
    headline: "Joint-command handoffs — wrong office as a strategy.",
    story:
      "A complaint bounced between joint offices until the Romeros stopped expecting ownership. Sponsorship funds jurisdiction charting, family stability, and published seam maps so the next household is not orphaned by letterhead.",
    imageUrl: "/images/community-women.jpg",
    goalCents: 720000,
    raisedCents: 88000,
    featured: true,
    diary: [
      {
        monthLabel: "Month 1",
        kind: "support",
        title: "Handoff ledger starts",
        body: "Every polite referral is now a dated line. Sponsors covered secure storage and a weekend of intake interviews.",
      },
      {
        monthLabel: "Month 4",
        kind: "update",
        title: "Seam map goes to followers first",
        body: "Donors saw the diagram before publication. The Romeros report the first week without a circular call.",
      },
      {
        monthLabel: "1 year later",
        kind: "year_later",
        title: "One year later — ownership has a name",
        body: "Two NCR families used the Romero packet to refuse wrong-office endings. Your sponsorship funded the map.",
      },
    ],
  },
];

async function main() {
  // Keep donations that aren't family-tagged; wipe family graph for a clean 12
  await prisma.familyFollower.deleteMany();
  await prisma.familyDiaryEntry.deleteMany();
  await prisma.donation.updateMany({ data: { familyId: null } });
  await prisma.sponsoredFamily.deleteMany();

  for (const family of families) {
    const { diary, ...data } = family;
    const created = await prisma.sponsoredFamily.create({
      data: { ...data, status: "open" },
    });
    for (const entry of diary) {
      await prisma.familyDiaryEntry.create({
        data: { ...entry, familyId: created.id, published: true },
      });
    }
  }

  const count = await prisma.sponsoredFamily.count();
  console.log(JSON.stringify({ families: count, slugs: families.map((f) => f.slug) }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
