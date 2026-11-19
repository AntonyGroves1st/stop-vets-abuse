import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { defaultSettings } from "../src/lib/settings";

const prisma = new PrismaClient();

const stories = [
  {
    title: "Buried Complaints: How One Brigade Buried Sexual Assault Reports",
    slug: "buried-complaints-brigade-assault-reports",
    excerpt:
      "Internal logs, whistleblower testimony, and FOIA releases show a pattern of reclassification that kept cases off command dashboards — and families in the dark.",
    branch: "Army",
    featured: true,
    coverUrl: "/images/soldier-mother.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "For three years, complaints filed inside a Continental U.S. brigade were quietly moved from assault channels into “leadership friction” folders. The paperwork still existed. The accountability did not.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Our review of redacted duty logs, combined with interviews from six service members and two spouses, maps how a reporting culture can be engineered to look calm on paper while families absorb the cost.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "What the records show" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Case identifiers appear, then vanish from monthly summaries. Supervisors describe “counseling complete.” Survivors describe months of unanswered callbacks. The gap between those two sentences is where abuse thrives.",
            },
          ],
        },
      ],
    }),
  },
  {
    title: "Deadly Delay: Mental Health Referrals That Never Cleared Port",
    slug: "deadly-delay-mental-health-referrals",
    excerpt:
      "Navy medical routing data and family interviews reveal wait times that stretched past crisis windows — with no escalation trigger when sailors went silent.",
    branch: "Navy",
    featured: true,
    coverUrl: "/images/family-sullivan.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A referral is not care. On multiple ships and shore commands, mental health tickets sat in transit queues long enough for families to lose contact with the people they were trying to save.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "The missing escalation" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Policy manuals describe urgency tiers. Practice depended on who was watching the inbox. We reconstruct how “routine” labels overrode risk flags — and what a real fail-safe would require.",
            },
          ],
        },
      ],
    }),
  },
  {
    title: "Whistleblower Freeze-Out at a Major Air Force Depot",
    slug: "whistleblower-freeze-out-air-force-depot",
    excerpt:
      "Technicians who flagged unsafe maintenance pressure say they were isolated, reassigned, and scored down — while defect rates quietly climbed.",
    branch: "Air Force",
    featured: true,
    coverUrl: "/images/family-hart.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Safety culture dies in small retaliations: a schedule change, a closed door, a performance mark that never cites the report that started it.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This investigation follows three depot technicians, their paper trail, and the defect metrics leadership preferred not to connect.",
            },
          ],
        },
      ],
    }),
  },
  {
    title: "Barracks Neglect and the Marine Families Paying for It",
    slug: "barracks-neglect-marine-families",
    excerpt:
      "Mold, broken HVAC, and ignored work orders are not lifestyle complaints — they are force-protection failures landing on spouses and children.",
    branch: "Marines",
    featured: false,
    coverUrl: "/images/hero-family-reunion.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We walked units where work-order timestamps outlived deployments. Families bought dehumidifiers out of pocket while official photos still showed freshly painted exteriors.",
            },
          ],
        },
      ],
    }),
  },
  {
    title: "Coast Guard Cutters, Short Crews, and Unreported Exhaustion",
    slug: "coast-guard-cutters-exhaustion",
    excerpt:
      "Operational tempo without honest manning math creates conditions where mistakes — and abuse of authority — become inevitable.",
    branch: "Coast Guard",
    featured: false,
    coverUrl: "/images/couple-kiss.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Crew diaries, schedule extracts, and port-call patterns show a service asked to do wartime work on peacetime staffing — then blamed individuals when systems cracked.",
            },
          ],
        },
      ],
    }),
  },
  {
    title: "Space Force Contractors and the Accountability Blind Spot",
    slug: "space-force-contractor-accountability",
    excerpt:
      "When mission-critical work sits with contractors, service members report abuse with nowhere durable to land. We map the seams.",
    branch: "Space Force",
    featured: false,
    coverUrl: "/images/community-women.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hybrid commands create hybrid silence. This piece traces how jurisdiction arguments become a shield — and how families get lost between corporate HR and military channels.",
            },
          ],
        },
      ],
    }),
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "ChangeMeNow!2026",
    12,
  );

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@stopvetsabuse.org" },
    update: { passwordHash, name: "Site Admin" },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@stopvetsabuse.org",
      name: "Site Admin",
      passwordHash,
    },
  });

  await prisma.siteSetting.deleteMany();
  await prisma.siteSetting.createMany({
    data: [
      { key: "siteName", value: defaultSettings.siteName },
      { key: "tagline", value: defaultSettings.tagline },
      { key: "contactEmail", value: defaultSettings.contactEmail },
      { key: "footerBlurb", value: defaultSettings.footerBlurb },
      { key: "socialTwitter", value: defaultSettings.socialTwitter },
      { key: "socialFacebook", value: defaultSettings.socialFacebook },
      { key: "donate", value: JSON.stringify(defaultSettings.donate) },
    ],
  });

  await prisma.story.deleteMany();
  for (const story of stories) {
    await prisma.story.create({
      data: {
        ...story,
        status: "published",
        publishedAt: new Date(),
      },
    });
  }

  await prisma.familyFollower.deleteMany();
  await prisma.familyDiaryEntry.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.sponsoredFamily.deleteMany();

  // Sponsored families (12 demos + diaries) are seeded by:
  //   node scripts/seed-12-families.mjs
  // (also chained from npm run db:seed)

  await prisma.page.deleteMany();
  await prisma.page.createMany({
    data: [
      {
        slug: "mission",
        title: "Our Mission",
        sections: JSON.stringify({
          eyebrow: "Why we exist",
          headline: "Journalism that stands with every American in uniform",
          body: `<p>Stop Veterans Abuse Journalism investigates systemic abuse, negligence, and retaliation across the U.S. Armed Forces and every Department of Defense component that touches service members and their families.</p><p>We publish what command climate surveys soften. We protect sources. We follow records until the story is undeniable — then we keep pressure on until families are safer.</p>`,
          ctaLabel: "Donate to save another family today",
          ctaHref: "/donate",
        }),
      },
      {
        slug: "coverage",
        title: "Coverage",
        sections: JSON.stringify({
          eyebrow: "Who we cover",
          headline: "Every branch. Every department. No blind spots.",
          intro:
            "Abuse does not respect service colors. Our reporting mandate includes the full force and the civilian machinery around it.",
          branches: [
            {
              name: "U.S. Army",
              detail: "Installations, brigades, training pipelines, and family housing systems.",
            },
            {
              name: "U.S. Navy",
              detail: "Ships, shore commands, medical routing, and fleet mental-health access.",
            },
            {
              name: "U.S. Air Force",
              detail: "Depots, wings, whistleblower retaliation, and safety culture failures.",
            },
            {
              name: "U.S. Marine Corps",
              detail: "Barracks conditions, unit climate, and spouse/caregiver impact.",
            },
            {
              name: "U.S. Coast Guard",
              detail: "Cutter ops tempo, manning gaps, and underreported exhaustion.",
            },
            {
              name: "U.S. Space Force",
              detail: "Hybrid contractor commands and accountability seams.",
            },
            {
              name: "DoD & Joint",
              detail: "Pentagon policy, IG pathways, and cross-service patterns.",
            },
            {
              name: "VA-adjacent",
              detail: "Transition failure points that begin while members are still in uniform.",
            },
          ],
        }),
      },
      {
        slug: "home",
        title: "Home",
        sections: JSON.stringify({
          heroHeadline:
            "When the system fails a service member, a family pays the price.",
          heroSupport:
            "Independent investigative journalism for U.S. troops, veterans’ families, and every department of the military that owes them better.",
          railTitle: "Investigations that put families first",
        }),
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
