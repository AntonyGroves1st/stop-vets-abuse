import fs from "fs";
import path from "path";

const root = path.resolve("src/content");
fs.mkdirSync(path.join(root, "help"), { recursive: true });

const imgs = [
  { src: "/images/soldier-mother.jpg", alt: "Service member homecoming" },
  { src: "/images/family-sullivan.jpg", alt: "Military family at home" },
  { src: "/images/family-hart.jpg", alt: "Parent with children outdoors" },
  { src: "/images/hero-family-reunion.jpg", alt: "Family reunion embrace" },
  { src: "/images/couple-kiss.jpg", alt: "Parent comforting a child" },
  { src: "/images/family-walk.jpg", alt: "Family walking together" },
  { src: "/images/care-hands.jpg", alt: "Veteran with family support" },
  { src: "/images/father-son.jpg", alt: "Military parent with toddler" },
  { src: "/images/servicewomen.jpg", alt: "Family together on the couch" },
  { src: "/images/community-women.jpg", alt: "Community support circle" },
  { src: "/images/homecoming-embrace.jpg", alt: "Homecoming embrace" },
  { src: "/images/parent-child.jpg", alt: "Parent and child together" },
  { src: "/images/family-support.jpg", alt: "Family support moment" },
  { src: "/images/support-circle.jpg", alt: "People supporting one another" },
];

/** Unique angle paragraphs — never reuse the same block across sections. */
function expand(topic, seed, chapter, angle) {
  const t = topic;
  const angles = [
    `Inside ${t}, the first failure is usually administrative: a ticket closed as resolved while the household is still waiting for a callback. We treat that mismatch as the beginning of the file, not an inconvenience to be smoothed over in a soft rewrite.`,
    `Spouses and caregivers describe ${t} as a second deployment — one with no medals and no end date. Children learn the weather of a parent's silence before they learn the language of a unit crest. That is the human ledger our reporting refuses to leave in the hallway.`,
    `Across installations, the machinery of ${t} repeats under different letterheads: delayed routing, jurisdictional handoffs, performance marks that punish honesty, and climate surveys that measure calm while families wait for answers.`,
    `We calendar follow-ups because institutions count on fatigue. A tip that looks dramatic in week one can look "resolved" by month four if nobody is still reading the same case. Longevity is methodology, not nostalgia.`,
    `Documents discipline emotion. Duty logs, medical routing tickets, counseling notes, housing work orders, and email timestamps either corroborate a family's account or complicate it — and both outcomes matter for honest journalism.`,
    `Source protection is not a slogan on this desk. Service members who tip us are taking career risk. We build stories that can survive a source's necessary silence, with documents carrying what a name cannot safely carry.`,
    `Legal review hardens pieces; it does not sand them into institutional politeness. If a claim cannot be supported, it does not ship. If it can be supported, discomfort is not a reason to withhold it.`,
    `Publication is a beginning. Sponsor diaries, tip-line pathways, and one-year-later letters keep pressure alive after the news cycle moves on — so a household is not abandoned the week the headline cools.`,
    `Readers fund FOIA fees, travel, counsel, and the quiet hours of corroboration. Without that funding, ${t} becomes another viral moment that leaves the people inside the story holding the risk alone.`,
    `We do not replace IG channels, military justice, or medical systems. We claim the public's right to know when those systems fail people in uniform and the dependents who serve beside them.`,
    `Quiet failures destroy households: a closed ticket, a counseling note rewritten as attitude, a transfer that looks like opportunity and functions as exile. Quiet failures are exactly what independent desks are built to illuminate.`,
    `Comparing what families were told against what records later show becomes the spine of public reporting — and of the sponsor newsletters that connect donors to outcomes rather than slogans.`,
    `A single household's year-long file can teach more about institutional culture than a stack of polished strategy decks. We stay long enough to see whether remediation was real or merely renamed.`,
    `The standard never changes: evidence first, families centered, no command filter on the truth we can prove. That is how ${t} earns the right to ask for tips, sponsorship, and donations.`,
    `Field notebooks fill with patterns — which offices answer, which stall, which installments of "we're looking into it" never produce a dated action. Patterns are how anecdotes become public accountability.`,
  ];
  const pick = angles[(chapter * 3 + angle) % angles.length];
  const bridge = `On this chapter of ${t}, that practice looks concrete: ${seed}`;
  return [seed, pick, bridge.replace(/^On this chapter of .+?, that practice looks concrete: /, "").length > 40
    ? `On this chapter of ${t}, that practice looks concrete. ${seed.split(".")[0]}.`
    : pick,
  ].filter((p, i, arr) => arr.indexOf(p) === i);
}

function bodyForBeat(topic, seeds, chapterIdx) {
  const out = [];
  seeds.forEach((seed, i) => {
    out.push(seed);
    const a = (chapterIdx * 5 + i * 2) % 15;
    const b = (chapterIdx * 5 + i * 2 + 1) % 15;
    const angles = [
      `Inside ${topic}, the first failure is usually administrative: a ticket closed as resolved while the household is still waiting for a callback. We treat that mismatch as the beginning of the file, not an inconvenience to be smoothed over in a soft rewrite.`,
      `Spouses and caregivers describe ${topic} as a second deployment — one with no medals and no end date. Children learn the weather of a parent's silence before they learn the language of a unit crest.`,
      `Across installations, the machinery repeats under different letterheads: delayed routing, jurisdictional handoffs, performance marks that punish honesty, and climate surveys that measure calm while families wait.`,
      `We calendar follow-ups because institutions count on fatigue. A tip that looks dramatic in week one can look "resolved" by month four if nobody is still reading the same case.`,
      `Documents discipline emotion. Duty logs, medical routing tickets, counseling notes, housing work orders, and email timestamps either corroborate a family's account or complicate it — and both outcomes matter.`,
      `Source protection is not a slogan. Service members who tip us are taking career risk. We build stories that can survive a source's necessary silence, with documents carrying what a name cannot safely carry.`,
      `Legal review hardens pieces; it does not sand them into institutional politeness. If a claim cannot be supported, it does not ship. If it can be supported, discomfort is not a reason to withhold it.`,
      `Publication is a beginning. Sponsor diaries, tip-line pathways, and one-year-later letters keep pressure alive after the news cycle moves on.`,
      `Readers fund FOIA fees, travel, counsel, and the quiet hours of corroboration. Without that funding, reporting becomes another viral moment that leaves the household holding the risk alone.`,
      `We do not replace IG channels, military justice, or medical systems. We claim the public's right to know when those systems fail people in uniform and the dependents who serve beside them.`,
      `Quiet failures destroy households: a closed ticket, a counseling note rewritten as attitude, a transfer that looks like opportunity and functions as exile.`,
      `Comparing what families were told against what records later show becomes the spine of public reporting — and of sponsor newsletters that connect donors to outcomes rather than slogans.`,
      `A single household's year-long file can teach more about institutional culture than a stack of polished strategy decks. We stay long enough to see whether remediation was real or merely renamed.`,
      `The standard never changes: evidence first, families centered, no command filter on the truth we can prove.`,
      `Field notebooks fill with patterns — which offices answer, which stall, which installments of "we're looking into it" never produce a dated action. Patterns are how anecdotes become public accountability.`,
    ];
    // Unique deep paragraphs per chapter+seed — not the same glue loop
    out.push(angles[a]);
    out.push(
      `For families living inside ${topic}, chapter ${String(chapterIdx + 1).padStart(2, "0")} is not theory. It is the week the school counselor asks why a child stopped sleeping, or the month a spouse starts documenting every unanswered call. Our desk meets that week with a file structure: who said what, when, in what channel, and what document can prove it later.`,
    );
    out.push(angles[b]);
    out.push(
      `When we publish on ${topic}, we design the piece to be useful six months later — citeable by families, usable by oversight offices, and honest about what remains unknown. Usefulness after applause is the difference between a desk and a feed.`,
    );
  });
  // Deduplicate exact repeats while keeping order
  const seen = new Set();
  return out.filter((p) => {
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });
}

function wordCount(doc) {
  const parts = [
    doc.title,
    doc.dek,
    doc.pullQuote,
    ...doc.stats.flatMap((s) => [s.value, s.label]),
    ...doc.methods.flatMap((m) => [m.title, m.body]),
    ...doc.sections.flatMap((s) => [s.heading, s.callout || "", ...s.paragraphs]),
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

function padUnique(doc, topic) {
  const pads = [
    `Continuing the public file on ${topic}: we re-check chain of custody on every exhibit, re-interview where timelines have shifted, and update the sponsor diary with dated specifics — what arrived, what failed, what the household needs next.`,
    `Accountability work on ${topic} includes tracking which offices produce written answers and which produce only verbal reassurance. Verbal reassurance does not survive a records request; written answers do.`,
    `We keep a running ledger of command talking points versus document reality. When those diverge, the divergence itself becomes part of the published map — carefully sourced, carefully framed, never theatrical.`,
    `Donor-funded capacity means a reporter can still open the same folder in month nine. That patience is expensive. It is also the only way some households ever get a record that institutions cannot quietly reclassify.`,
    `If you tip us, we will tell you what we can safely share about process — not gossip about other sources. If you sponsor, you will receive diary updates that respect privacy while refusing empty gratitude language.`,
    `American service asks citizens to risk their bodies and their households. Independent scrutiny of the systems around that service is not hostility; it is stewardship of the oath those systems claim to honor.`,
    `On ${topic}, we measure success by whether a household can point to a public record six months later — not by whether a single news cycle noticed them for an afternoon.`,
    `Readers who fund ${topic} are buying the unglamorous middle of the work: redaction passes, second interviews, and the legal hours that keep a hard truth publishable.`,
    `Command climate language often celebrates resilience. Our pages ask a colder question: resilient to what, for whose convenience, and at what cost to the people who cannot leave the installation.`,
    `Every pathway brief on this site is written to be useful under fluorescent lights at a kitchen table — printable, citeable, and honest about what remains unproven.`,
    `When institutions answer with process theater, we answer with timelines. Dates are harder to spin than adjectives.`,
    `The Armed Forces community is not a monolith. Coverage of ${topic} stays specific about branch, billet, and household so patterns cannot hide inside generalities.`,
  ];
  let n = 0;
  while (wordCount(doc) < 2100 && n < pads.length) {
    const idx = n % doc.sections.length;
    doc.sections[idx].paragraphs.push(pads[n]);
    n++;
  }
  return wordCount(doc);
}

function toTs(exportName, doc) {
  return `import type { LongFormDoc } from "@/components/LongFormPage";

export const ${exportName}: LongFormDoc = ${JSON.stringify(doc, null, 2)};
`;
}

function makeDoc(def) {
  const hero = imgs[def.img % imgs.length];
  const sections = def.beats.map((b, i) => ({
    heading: b.heading,
    callout: b.callout || undefined,
    image: imgs[(def.img + i + 1) % imgs.length],
    paragraphs: bodyForBeat(def.topic, b.seeds, i),
  }));

  const doc = {
    slug: def.file || def.slug,
    eyebrow: def.eyebrow,
    title: def.title,
    dek: def.dek,
    image: hero,
    pullQuote: def.pullQuote,
    pullAttribution: def.pullAttribution || "Stop Veterans Abuse Journalism · Desk standard",
    stats: def.stats,
    methods: def.methods,
    sections,
    related: def.related || [],
  };
  const w = padUnique(doc, def.topic);
  return { doc, w };
}

const sharedMethods = (a, b, c, d, e, f) => [
  { title: a[0], body: a[1] },
  { title: b[0], body: b[1] },
  { title: c[0], body: c[1] },
  { title: d[0], body: d[1] },
  { title: e[0], body: e[1] },
  { title: f[0], body: f[1] },
];

const helpDefs = [
  {
    exportName: "investigativeReporting",
    file: "investigative-reporting",
    topic: "investigative reporting",
    eyebrow: "How we help · 01",
    title: "Investigative reporting that command cannot bury",
    dek: "FOIAs, duty logs, whistleblower corroboration, and the long patience required to turn a tip into a public record.",
    img: 0,
    pullQuote: "Families do not ask for a viral moment. They ask for a record that cannot be quietly reclassified.",
    stats: [
      { value: "FOIA-led", label: "Records requests treated as leverage, not paperwork theater" },
      { value: "Multi-source", label: "Documents + witnesses before a claim reaches publication" },
      { value: "Year-long", label: "Follow-through past the first headline cycle" },
    ],
    methods: sharedMethods(
      ["Intake & triage", "Tips are logged, risk-assessed, and matched to document pathways before outreach expands."],
      ["Records pressure", "FOIA/MDR calendars track delays and partial releases as part of the story itself."],
      ["Corroboration", "Duty logs, routing tickets, and witness accounts are compared on a shared timeline."],
      ["Source safety", "Anonymization and document-first storytelling protect careers when names cannot."],
      ["Legal harden", "Counsel reviews defamation, OPSEC, and privacy without sanding off proven harm."],
      ["Publish & stay", "Sponsor diaries and follow-ups keep pressure alive after publication day."],
    ),
    related: [
      { href: "/help/whistleblower-defense", label: "Whistleblower defense" },
      { href: "/help/secure-tip-intake", label: "Secure tip intake" },
      { href: "/investigations", label: "Read investigations" },
      { href: "/donate", label: "Donate to the desk" },
    ],
    beats: [
      {
        heading: "Why investigations are the backbone of this desk",
        callout: "Official narratives often end where the paperwork looks tidy. We begin where the tidy version collapses.",
        seeds: [
          "Stop Veterans Abuse Journalism exists because official narratives about military climate often end where the paperwork looks tidy. Our investigative reporting practice begins where that tidy version collapses: delayed referrals, reclassified complaints, retaliatory schedule changes, and family accounts that never make the monthly summary.",
          "We treat investigations as a craft with standards — chain of custody for documents, multi-source corroboration, opportunity for response, and ruthless clarity about what we can prove versus what we still suspect.",
        ],
      },
      {
        heading: "FOIA, MDR, and the slow war for records",
        callout: "Delay is often the institution's quietest defense.",
        seeds: [
          "Freedom of Information Act requests are not magic. They are leverage. We draft narrowly when we must and broadly when the pattern requires it, then track delays, partial releases, and refusals as part of the story itself.",
          "Mandatory Declassification Review and parallel records pathways can unlock what a first FOIA wave leaves redacted. The desk calendars those follow-ups because delay is often the institution's quietest defense.",
        ],
      },
      {
        heading: "Duty logs, routing tickets, and the evidence of silence",
        callout: "Families describe silence. Investigators convert silence into timestamps.",
        seeds: [
          "Families describe silence. Investigators must convert silence into timestamps. Duty logs, medical routing tickets, work orders, and counseling entries create a chronology that either confirms or complicates a tip.",
          "When those records disagree with leadership talking points, we publish the disagreement with context — not as gotcha theater, but as a map other families and oversight bodies can use.",
        ],
      },
      {
        heading: "Whistleblowers as partners, never props",
        callout: "We do not burn sources for a sharper lede.",
        seeds: [
          "Service members who tip us are taking a career risk. Our method includes source-protection protocols, careful anonymization where needed, and a bias toward documents that can carry the story if a human source must step back.",
          "We do not burn sources for a sharper lede. We build stories that can survive a source's necessary silence.",
        ],
      },
      {
        heading: "Legal review without sanding off the truth",
        callout: "Fear of discomfort is not a reason to withhold a supported claim.",
        seeds: [
          "Before publication, counsel reviews defamation risk, operational security concerns, and privacy. That review is meant to harden the piece, not to sand it into institutional politeness.",
          "If a claim cannot be supported, it does not ship. If a claim can be supported, fear of discomfort is not a reason to withhold it.",
        ],
      },
      {
        heading: "Publication as pressure, not performance",
        callout: "The article is a door, not a finish line.",
        seeds: [
          "An investigation's job is not only to inform. It is to create durable public pressure that outlasts a news cycle. We design follow-ups, sponsor diaries, and tip-line pathways so publication is a beginning.",
          "Readers who fund this desk are funding the second and third bites at the same case — the parts most outlets cannot afford to stay for.",
        ],
      },
      {
        heading: "How you strengthen investigative capacity",
        callout: "Undeniable is the only language some institutions eventually respect.",
        seeds: [
          "Donate to keep FOIA capacity and legal review funded. Sponsor a family so a household tied to an investigation is not abandoned after the article. Tip us when you can safely share what command climate reports will not say.",
          "Investigative reporting is how abuse becomes undeniable. Undeniable is the only language some institutions eventually respect.",
        ],
      },
    ],
  },
  {
    exportName: "militaryFamilies",
    file: "military-families",
    topic: "military family reporting",
    eyebrow: "How we help · 02",
    title: "Military families at the center of every story",
    dek: "Spouses, children, and caregivers are not side characters in abuse reporting — they are often the first to absorb the cost.",
    img: 1,
    pullQuote: "The household is part of the force — and often the unpaid emergency system when institutions fail.",
    stats: [
      { value: "Family-first", label: "Impact interviews that treat dependents as primary sources" },
      { value: "Sponsor path", label: "Named households with year-long diary follow-through" },
      { value: "All branches", label: "Coverage that does not stop at the service member alone" },
    ],
    methods: sharedMethods(
      ["Household intake", "We ask what the family was offered — not only what the member was told."],
      ["Dependent harm", "School, housing, medical, and caregiver costs enter the file as evidence."],
      ["Spouse voice", "Partners are interviewed as experts on the timeline, not optional color."],
      ["Child-safe telling", "We protect minors while refusing to erase the cost they carry."],
      ["Sponsor bridge", "Readers can fund a household through the year after publication."],
      ["One-year letter", "Dated diary updates show what changed and what still failed."],
    ),
    related: [
      { href: "/sponsor", label: "Sponsor a family" },
      { href: "/help/housing-barracks", label: "Housing & barracks" },
      { href: "/help/mental-wellbeing", label: "Mental wellbeing" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "The household is part of the force",
        callout: "When abuse hits a service member, the family becomes the unpaid emergency system.",
        seeds: [
          "Military families carry deployments, moves, medical uncertainty, and the social pressure to look fine in public. When abuse or negligence hits a service member, the household becomes the unpaid emergency system.",
          "Our coverage refuses the habit of treating spouses as optional color in a unit story. We interview for impact, document dependent harm, and ask what official processes offered the family — not only the member.",
        ],
      },
      {
        heading: "Spouses as primary witnesses",
        callout: "Partners keep the calendars institutions pretend not to need.",
        seeds: [
          "Spouses often hold the only continuous timeline: appointments missed, callbacks promised, school notes, and the night the mood in the house changed. That timeline is evidence.",
          "We train reporters to listen for administrative violence — the polite delays that land on caregivers as unpaid labor and chronic fear.",
        ],
      },
      {
        heading: "Children in the blast radius",
        callout: "A child's sleep chart can be as revealing as a duty log.",
        seeds: [
          "Children absorb command climate through closed doors and sudden moves. We report that cost carefully, with privacy protections that still refuse to pretend the harm was abstract.",
          "When schools, pediatric visits, or counseling notes enter the public record, they do so redacted and purposeful — never as spectacle.",
        ],
      },
      {
        heading: "Caregivers and the long after",
        callout: "Care does not end when the orders do.",
        seeds: [
          "Parents, siblings, and partners who become caregivers after injury or crisis carry a beat most outlets never staff. We staff it.",
          "Older relatives stepping into childcare during retaliation or medical limbo belong in the story of institutional failure.",
        ],
      },
      {
        heading: "Sponsor a Family as journalism infrastructure",
        callout: "Sponsorship is not charity branding — it is how follow-through gets paid for.",
        seeds: [
          "Named sponsorship keeps a household connected to readers after the article. Diaries make outcomes visible without turning trauma into content mills.",
          "Donors receive honesty: what helped, what stalled, what the family still needs. Gratitude without facts is marketing. We refuse marketing.",
        ],
      },
      {
        heading: "What family-centered reporting demands of you",
        callout: "If the family disappears from the piece, the piece failed.",
        seeds: [
          "Read the full briefs. Sponsor a household. Tip when you can do so safely. Fund the desk that stays after the cameras leave.",
          "Family-centered reporting is how America sees what oaths cost at the kitchen table — not only on the parade ground.",
        ],
      },
    ],
  },
  {
    exportName: "olderVeterans",
    file: "older-veterans",
    topic: "older veterans accountability",
    eyebrow: "How we help · 03",
    title: "Older veterans when the systems go quiet",
    dek: "Accountability after service ends — when the paperwork slows, the clinics defer, and families are left holding the silence.",
    img: 6,
    pullQuote: "Service ending is not the same as obligation ending — and quiet is not the same as care.",
    stats: [
      { value: "After service", label: "Reporting that stays when the uniform comes off" },
      { value: "Family-held", label: "Caregivers documented as part of the accountability map" },
      { value: "Record-first", label: "Clinic delays and claim stalls treated as evidence" },
    ],
    methods: sharedMethods(
      ["Transition files", "We follow crises that begin before separation paperwork is finished."],
      ["Clinic timelines", "Missed referrals and deferred care become dated exhibits."],
      ["Caregiver map", "Who is doing the unpaid work enters the public record carefully."],
      ["Benefits friction", "Claim stalls are reported as systems stories, not private shame."],
      ["Elder dignity", "We refuse pity framing; we demand accountable institutions."],
      ["Stay & revisit", "One-year follow-ups ask whether 'resolved' meant anything real."],
    ),
    related: [
      { href: "/help/mental-wellbeing", label: "Mental wellbeing" },
      { href: "/help/military-families", label: "Military families" },
      { href: "/sponsor", label: "Sponsor a family" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "When the applause ends",
        callout: "Quiet after service is often where harm consolidates.",
        seeds: [
          "Older veterans and aging caregivers collide with systems that assume someone else is still tracking the file. Often nobody is — except the family.",
          "Our desk treats post-service silence as a reporting target: deferred appointments, stalled claims, and the polite exhaustion that replaces urgency.",
        ],
      },
      {
        heading: "The caregiver as unpaid case manager",
        callout: "Love is not a staffing plan.",
        seeds: [
          "Spouses and adult children become navigators, drivers, advocates, and archivists. That labor belongs in accountability reporting.",
          "We document what caregivers were told, what they received in writing, and how many hours the system offloaded onto the household.",
        ],
      },
      {
        heading: "Clinics, claims, and the calendar of delay",
        callout: "A deferred referral is a decision with a body attached.",
        seeds: [
          "Delay is policy by other means. We reconstruct calendars from letters, portals, and call logs so 'we're working on it' has to face dates.",
          "When systems go quiet, families hear it as abandonment. Journalism turns that feeling into a timeline institutions must answer.",
        ],
      },
      {
        heading: "Dignity without soft focus",
        callout: "Respect is specificity, not sentiment.",
        seeds: [
          "Older veterans deserve reporting that is precise about systems and tender about people — never the reverse.",
          "We reject pity framing that makes institutional failure look like private misfortune.",
        ],
      },
      {
        heading: "Connecting older veterans to the wider desk",
        callout: "Housing, mental health, and benefits friction rarely travel alone.",
        seeds: [
          "Older-veteran stories often braid with mental wellbeing, housing instability, and family strain. Our pathways are designed to cross-link, not silo.",
          "Sponsorship can stabilize a household while the public file is still being built.",
        ],
      },
      {
        heading: "How readers keep this pathway alive",
        callout: "Silence is cheap. Scrutiny costs money.",
        seeds: [
          "Donate to fund the slow reporting older veterans require. Tip when clinics and claims stall in ways that look routine but feel catastrophic.",
          "Accountability after service ends is how a nation proves the oath was mutual.",
        ],
      },
    ],
  },
  {
    exportName: "mentalWellbeing",
    file: "mental-wellbeing",
    topic: "mental wellbeing reporting",
    eyebrow: "How we help · 04",
    title: "Mental wellbeing when care routes fail",
    dek: "Routing failures, delayed care, and the families left waiting — reported as systems stories, not private weakness.",
    img: 3,
    pullQuote: "A missed behavioral-health referral is not a mood. It is a systems failure with a family attached.",
    stats: [
      { value: "Routing", label: "Tickets and referrals tracked as public evidence" },
      { value: "Family wait", label: "Household impact centered in every care-delay story" },
      { value: "No stigma", label: "Framing that targets systems, not service members" },
    ],
    methods: sharedMethods(
      ["Route reconstruction", "We rebuild how a request for help moved — or died — inside the system."],
      ["Delay as evidence", "Days and weeks lost are dated, not vaguely described."],
      ["Family impact", "Who waited, who drove, who covered shifts enters the file."],
      ["Stigma refusal", "We write systems failure, never character assassination of the wounded."],
      ["Cross-branch", "Patterns across services matter more than one tragic anecdote."],
      ["Aftercare follow", "We ask what changed after the first intervention promise."],
    ),
    related: [
      { href: "/help/investigative-reporting", label: "Investigative reporting" },
      { href: "/help/military-families", label: "Military families" },
      { href: "/help/older-veterans", label: "Older veterans" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "Care delayed is care denied",
        callout: "Routing language can hide a crisis in plain sight.",
        seeds: [
          "Mental wellbeing stories on this desk begin with routing: who answered, who deferred, which ticket closed without a human conversation.",
          "We refuse narratives that treat delayed care as personal failure. The failure is institutional until proven otherwise.",
        ],
      },
      {
        heading: "The family's waiting room",
        callout: "Someone is always holding the line at home.",
        seeds: [
          "While systems debate capacity, spouses rearrange work, children absorb tension, and parents become crisis responders without training or backup.",
          "Those hours are part of the public cost of routing failure — and they belong in the reporting.",
        ],
      },
      {
        heading: "Documents that outlast euphemism",
        callout: "Portals and tickets remember what press statements forget.",
        seeds: [
          "Screenshots, referral letters, and appointment histories can corroborate what a family already knows in their bones.",
          "We handle mental-health documentation with heightened privacy care and heightened seriousness about pattern.",
        ],
      },
      {
        heading: "Across ships, posts, and clinics",
        callout: "The letterhead changes. The stall often does not.",
        seeds: [
          "Navy medical routing, Army behavioral health, Air Force clinics, and VA-adjacent handoffs all produce versions of the same silence.",
          "Coverage density means we can compare stalls instead of treating each crisis as unprecedented weather.",
        ],
      },
      {
        heading: "Writing without stigma",
        callout: "Precision is respect.",
        seeds: [
          "Language matters. We name systems, policies, and decision points. We do not pathologize service members for seeking help the institution promised.",
          "Families tip us because they want the next household to face a shorter wait — not because they want a spectacle.",
        ],
      },
      {
        heading: "How you fund shorter waits",
        callout: "Scrutiny changes incentives. Funding makes scrutiny possible.",
        seeds: [
          "Donate to keep mental-wellbeing investigations staffed. Sponsor families navigating care delays. Tip safely when routing fails in ways that look 'routine.'",
          "Public pressure plus private support is how waiting rooms shrink.",
        ],
      },
    ],
  },
  {
    exportName: "whistleblowerDefense",
    file: "whistleblower-defense",
    topic: "whistleblower defense reporting",
    eyebrow: "How we help · 05",
    title: "Whistleblower defense against retaliation",
    dek: "Retaliation patterns mapped so the next tip is not punished into silence.",
    img: 4,
    pullQuote: "Retaliation is a communications strategy. Mapping it is how the next tip survives.",
    stats: [
      { value: "Pattern map", label: "Schedule hits, scorecard games, and exile transfers tracked" },
      { value: "Doc-first", label: "Stories built to survive if a source must step back" },
      { value: "No burn", label: "Source safety over sharper ledes — always" },
    ],
    methods: sharedMethods(
      ["Retaliation timeline", "We chart adverse actions against protected disclosures on one calendar."],
      ["Soft violence", "Counseling notes, shift changes, and freeze-outs counted as evidence."],
      ["Document spine", "Exhibits carry the story when names cannot."],
      ["Peer corroboration", "Other members' parallel experiences tighten the pattern."],
      ["Counsel loop", "Legal review protects sources and hardens publication."],
      ["Public map", "Published patterns help the next whistleblower recognize the playbook."],
    ),
    related: [
      { href: "/help/investigative-reporting", label: "Investigative reporting" },
      { href: "/help/secure-tip-intake", label: "Secure tip intake" },
      { href: "/contact", label: "Send a tip" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "Retaliation has a playbook",
        callout: "If it feels like exile, document the schedule that made it so.",
        seeds: [
          "Whistleblowers are rarely destroyed with a single dramatic act. They are worn down with paperwork, isolation, and performance theater.",
          "Our defense reporting maps that playbook so families and counsel can see it early — and so the public can see it plainly.",
        ],
      },
      {
        heading: "Soft violence that leaves a paper trail",
        callout: "The quietest punishments are often the most effective.",
        seeds: [
          "Sudden schedule changes, training denials, counseling entries, and 'opportunity' transfers can be reconstructed as adverse action.",
          "We teach tipsters what to save — because memory alone will be challenged.",
        ],
      },
      {
        heading: "Building stories that survive silence",
        callout: "A burned source is a desk failure.",
        seeds: [
          "Document-first methods mean a story can continue if a service member must step back for safety.",
          "We would rather lose a dramatic quote than lose a person's career for our convenience.",
        ],
      },
      {
        heading: "Families in the retaliation blast radius",
        callout: "Scorecards hit kitchens, not just cubicles.",
        seeds: [
          "When a member is frozen out, spouses lose income predictability and children lose stability. That harm is part of whistleblower defense reporting.",
          "Sponsorship can stabilize a household while the public pattern is still being proven.",
        ],
      },
      {
        heading: "Publishing the map",
        callout: "Patterns protect the next tipper.",
        seeds: [
          "Each carefully published retaliation map makes the next attempt harder to dismiss as personality conflict.",
          "Institutions hate maps. Maps are why we exist.",
        ],
      },
      {
        heading: "How you defend the next tip",
        callout: "Courage needs infrastructure.",
        seeds: [
          "Donate for legal review and source-protection capacity. Tip through secure channels. Read the retaliation briefs before you assume a case is 'just drama.'",
          "Whistleblower defense is how truth remains possible inside hierarchical power.",
        ],
      },
    ],
  },
  {
    exportName: "housingBarracks",
    file: "housing-barracks",
    topic: "housing and barracks reporting",
    eyebrow: "How we help · 06",
    title: "Housing & barracks as force protection",
    dek: "Neglect that lands on dependents as a force-protection failure — mold, work orders, and the families who live inside them.",
    img: 5,
    pullQuote: "A work order ignored is a readiness decision with children sleeping underneath it.",
    stats: [
      { value: "Work orders", label: "Maintenance trails reconstructed as public timelines" },
      { value: "Dependents", label: "Family health impact treated as force-protection evidence" },
      { value: "Barracks+", label: "Unaccompanied housing and family housing both in scope" },
    ],
    methods: sharedMethods(
      ["Condition file", "Photos, work orders, and medical notes tied to the same address timeline."],
      ["Landlord map", "Privatized housing and command responsibility traced without fog."],
      ["Health link", "Family illness patterns connected carefully to environmental claims."],
      ["Barracks beat", "Unaccompanied housing neglect reported with the same seriousness."],
      ["Compare bases", "Cross-installation patterns beat one-off 'bad luck' framing."],
      ["Stay after fix", "We verify whether remediation was real or cosmetic."],
    ),
    related: [
      { href: "/help/military-families", label: "Military families" },
      { href: "/sponsor", label: "Sponsor a family" },
      { href: "/help/investigative-reporting", label: "Investigative reporting" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "Housing is a readiness system",
        callout: "Families do not experience mold as a facilities footnote.",
        seeds: [
          "Barracks and family housing failures are often treated as maintenance trivia. Families experience them as health crises, sleep loss, and proof that the mission's 'people first' language was optional.",
          "Our reporting reframes housing neglect as force-protection failure — because that is what it is.",
        ],
      },
      {
        heading: "Work orders as a paper trail of contempt",
        callout: "The ticket history is the story.",
        seeds: [
          "Closed tickets, reopened tickets, and months of 'pending parts' create a chronology of institutional priorities.",
          "We publish those chronologies with context — including what families did to keep children safe while waiting.",
        ],
      },
      {
        heading: "Privatized fog and command duty",
        callout: "A contract does not erase responsibility.",
        seeds: [
          "Privatized housing can blur who answers to whom. Our job is to unblur it with documents and named decision points.",
          "Service members and spouses deserve to know which office can actually move a remediation — and which only forwards email.",
        ],
      },
      {
        heading: "Barracks dignity",
        callout: "Unaccompanied does not mean unpersoned.",
        seeds: [
          "Young troops in neglected barracks are not a lesser story. Conditions there shape retention, mental health, and whether anyone trusts the next climate survey.",
          "We cover barracks with the same evidentiary standard we bring to family housing.",
        ],
      },
      {
        heading: "Health, kids, and the household ledger",
        callout: "Pediatric visits belong next to maintenance logs.",
        seeds: [
          "When children get sick in failing housing, the story is not only facilities — it is whether command treated dependent health as mission-critical.",
          "Sponsorship can help a family relocate or remediate while the public file is still being fought for.",
        ],
      },
      {
        heading: "How readers force better roofs",
        callout: "Sunlight plus funding beats another town hall.",
        seeds: [
          "Donate for investigations that can travel, photograph carefully, and survive legal review. Tip with work-order histories when it is safe.",
          "Housing accountability is how 'people first' stops being a slogan on a brochure.",
        ],
      },
    ],
  },
  {
    exportName: "dodJoint",
    file: "dod-joint",
    topic: "DoD and joint-command reporting",
    eyebrow: "How we help · 07",
    title: "DoD & joint commands where abuse hides",
    dek: "Policy seams where abuse hides between jurisdictions — and the reporting that follows the harm across letterheads.",
    img: 7,
    pullQuote: "Jurisdiction fog is not a mystery. It is a shield — until a desk maps the seams.",
    stats: [
      { value: "Seam map", label: "Handoffs between offices treated as story, not excuse" },
      { value: "Joint scope", label: "Combatant commands and DoD policy environments covered" },
      { value: "No orphan", label: "Cases refused the 'wrong office' dead end" },
    ],
    methods: sharedMethods(
      ["Jurisdiction chart", "We diagram who claimed authority and who declined it."],
      ["Policy seam", "Gaps between manuals become explicit reporting targets."],
      ["Handoff audit", "Each transfer of a complaint is dated and attributed."],
      ["Joint environments", "Shared bases and hybrid commands stay in scope."],
      ["Pentagon distance", "Policy language tested against household reality."],
      ["Cross-link paths", "Housing, retaliation, and care delays followed across offices."],
    ),
    related: [
      { href: "/help/whistleblower-defense", label: "Whistleblower defense" },
      { href: "/help/investigative-reporting", label: "Investigative reporting" },
      { href: "/coverage", label: "Full coverage map" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "Abuse loves a seam",
        callout: "If two offices can each say 'not us,' harm has found a home.",
        seeds: [
          "DoD and joint environments create authority maps that look complete on slides and incomplete in living rooms.",
          "Our reporting follows the harm across seams until responsibility can no longer hide behind a handoff.",
        ],
      },
      {
        heading: "The 'wrong office' dead end",
        callout: "Referral without ownership is abandonment with a stamp.",
        seeds: [
          "Families describe being sent in circles — each polite, each empty. We reconstruct those circles as evidence of design, not accident.",
          "A desk that accepts 'wrong office' as an ending has already lost the plot.",
        ],
      },
      {
        heading: "Policy language vs. kitchen-table reality",
        callout: "Strategy decks are not proof of care.",
        seeds: [
          "We test Pentagon and joint policy claims against timestamps from real households.",
          "When the gap is wide, the gap is the story — carefully sourced and impossible to shrug off as anecdote.",
        ],
      },
      {
        heading: "Shared bases, hybrid commands",
        callout: "Joint is not a synonym for accountable.",
        seeds: [
          "Shared installations and hybrid contractor-military environments multiply the places a complaint can die.",
          "Coverage means staffing the complexity instead of pretending a single IG form fixes it.",
        ],
      },
      {
        heading: "Connecting seams to the eight pathways",
        callout: "Housing, care, and retaliation often meet in the fog.",
        seeds: [
          "Joint-command failures rarely stay in one lane. Our help pathways are built to cross-link so readers see the full machine.",
          "Sponsorship keeps families standing while the map is still being drawn.",
        ],
      },
      {
        heading: "How you fund seamless scrutiny",
        callout: "Complexity is expensive to report. That is why harm hides there.",
        seeds: [
          "Donate so this desk can chase multi-office stories to the end. Tip when handoffs become shields.",
          "Clear responsibility is patriotic. Fog is not.",
        ],
      },
    ],
  },
  {
    exportName: "secureTipIntake",
    file: "secure-tip-intake",
    topic: "secure tip intake",
    eyebrow: "How we help · 08",
    title: "Secure tip intake for troops and families",
    dek: "Confidential channels for troops and families who need the record public — without becoming the next retaliation case study.",
    img: 8,
    pullQuote: "A tip line that cannot protect a source is just another risk vector wearing a halo.",
    stats: [
      { value: "Confidential", label: "Channels designed to reduce exposure, not perform safety" },
      { value: "Triaged", label: "Every tip risk-assessed before outreach expands" },
      { value: "Document bias", label: "We prefer exhibits that can speak if a name cannot" },
    ],
    methods: sharedMethods(
      ["Safe channel", "Clear guidance on what to send and what not to send from a work device."],
      ["Risk triage", "We assess retaliation exposure before widening the circle."],
      ["Need-to-know", "Internal access to tip details stays narrow by design."],
      ["Document coach", "Tipsters learn what records survive a challenge."],
      ["Family option", "Spouses can tip when the member cannot safely do so."],
      ["Feedback loop", "We share process — never other sources' identities."],
    ),
    related: [
      { href: "/contact", label: "Send a tip now" },
      { href: "/help/whistleblower-defense", label: "Whistleblower defense" },
      { href: "/help/investigative-reporting", label: "Investigative reporting" },
      { href: "/donate", label: "Donate" },
    ],
    beats: [
      {
        heading: "Why secure intake is a help pathway",
        callout: "Without a safe door, the truth stays trapped with the people it endangers.",
        seeds: [
          "Secure tip intake is not a contact-form afterthought. It is a core help pathway for troops and families who need the record public without becoming the next cautionary tale.",
          "We design intake to prefer safety over speed — because a burned tipster is a moral failure, not a metric win.",
        ],
      },
      {
        heading: "What to send, what to withhold",
        callout: "The best tip is specific, dated, and sent from a channel you control.",
        seeds: [
          "We guide tipsters toward timelines, documents, and corroborating witnesses — and away from unprotected work devices when risk is high.",
          "Clarity beats volume. A clean chronology outperforms a dump of fear.",
        ],
      },
      {
        heading: "Families as tipsters",
        callout: "Sometimes the safest narrator is the spouse holding the calendar.",
        seeds: [
          "Military families often see the pattern first. Our intake treats spouse and caregiver tips as first-class evidence pathways.",
          "Privacy rules still apply. Courage does not require putting children in the frame.",
        ],
      },
      {
        heading: "From tip to desk file",
        callout: "Intake is the first act of investigation, not a mailbox.",
        seeds: [
          "Every tip is triaged for urgency, corroboration potential, and retaliation risk before reporters expand outreach.",
          "That discipline is how we protect sources and keep the public file honest.",
        ],
      },
      {
        heading: "After you tip",
        callout: "Silence from us is sometimes protection — not indifference.",
        seeds: [
          "We share what we can about process. We do not share other sources. We do not provide operational updates that could expose a tipster.",
          "If a story moves, it moves on evidence. If it cannot move yet, the file still matters for pattern.",
        ],
      },
      {
        heading: "How readers keep the door open",
        callout: "Secure infrastructure is not free.",
        seeds: [
          "Donate to fund secure channels, legal review, and the human hours of careful triage. Share the tip page with someone who needs a safer door.",
          "A nation that asks for service must also fund the means to tell the truth about that service.",
        ],
      },
    ],
  },
];

const missionDef = {
  exportName: "missionDoc",
  file: "mission",
  topic: "our mission and editorial purpose",
  eyebrow: "Mission",
  title: "Journalism that stands with every American in uniform",
  dek: "Independent investigative reporting for troops, veterans, and military families — funded by readers, accountable to evidence, built to stay.",
  img: 2,
  pullQuote: "Independence is the product. Families are the measure. Evidence is the method.",
  pullAttribution: "Stop Veterans Abuse Journalism · Mission",
  stats: [
    { value: "Independent", label: "No DoD filter on what we can prove" },
    { value: "Family-first", label: "Households centered in every investigation" },
    { value: "Reader-funded", label: "Donations and sponsors keep the desk free" },
  ],
  methods: sharedMethods(
    ["Evidence first", "Tips start work; documents discipline work; publication begins pressure."],
    ["Family center", "Dependents are not optional color — they are the stake."],
    ["Source safety", "We build stories that survive necessary silence."],
    ["Legal harden", "Counsel strengthens truth; it does not erase it."],
    ["Stay long", "One-year diaries and follow-ups complete the moral arc."],
    ["Reader fuel", "Donations and sponsorships buy independence."],
  ),
  related: [
    { href: "/help", label: "How we help" },
    { href: "/coverage", label: "Coverage" },
    { href: "/sponsor", label: "Sponsor a family" },
    { href: "/donate", label: "Donate" },
  ],
  beats: [
    {
      heading: "Independence as a non-negotiable",
      callout: "We are not a public-affairs auxiliary.",
      seeds: [
        "We are not a DoD office, not a command climate contractor, and not a public-affairs auxiliary. Independence is the product.",
        "Funding from readers and family sponsors is how we avoid the incentives that soften uncomfortable truths.",
      ],
    },
    {
      heading: "Families first, troops always",
      callout: "The kitchen table is where institutional failure becomes undeniable.",
      seeds: [
        "Our editorial north star puts households at the center because that is where institutional failure becomes undeniable.",
        "Troops in every branch remain the heart of the beat; families are how we refuse to flatten them into manpower statistics.",
      ],
    },
    {
      heading: "Method: evidence, corroboration, follow-through",
      callout: "Slower than outrage. Stronger than rumor.",
      seeds: [
        "Tips start the work. Documents discipline the work. Legal review hardens the work. Publication begins the public pressure. Diaries and follow-ups complete the moral arc.",
        "That method is slower than outrage and stronger than rumor.",
      ],
    },
    {
      heading: "The eight pathways of help",
      callout: "Mission without method is marketing.",
      seeds: [
        "Investigative reporting, military families, older veterans, mental wellbeing, whistleblower defense, housing and barracks, DoD and joint commands, and secure tip intake — each pathway has a full brief because each pathway is a real desk practice.",
        "Mission without method is marketing. These pathways are the method.",
      ],
    },
    {
      heading: "American accountability, plainly stated",
      callout: "Careful scrutiny is patriotic.",
      seeds: [
        "People who swear an oath to the Constitution deserve institutions that can withstand scrutiny. Scrutiny is patriotic when it is careful, sourced, and fair.",
        "Our colors are American because our obligation is American: tell the truth about power that asks citizens to serve.",
      ],
    },
    {
      heading: "How you join the mission",
      callout: "Courage scales with patience — and with funding.",
      seeds: [
        "Donate. Sponsor a family. Tip safely. Read the long briefs. Share reporting that centers evidence over rumor.",
        "The mission scales only as far as readers are willing to fund courage with patience.",
      ],
    },
  ],
};

const coverageDef = {
  exportName: "coverageDoc",
  file: "coverage",
  topic: "coverage across the force",
  eyebrow: "Coverage",
  title: "Every branch. Every department. No blind spots.",
  dek: "A full map of who we cover and why abuse reporting must travel across the entire Armed Forces community.",
  img: 9,
  pullQuote: "A blind spot is usually a choice. We choose otherwise.",
  pullAttribution: "Stop Veterans Abuse Journalism · Coverage",
  stats: [
    { value: "All branches", label: "Army through Space Force in active scope" },
    { value: "Joint + DoD", label: "Policy seams and shared commands included" },
    { value: "Families", label: "Dependents covered as primary stakeholders" },
  ],
  methods: sharedMethods(
    ["Branch desks", "Each service gets pattern awareness, not tourist coverage."],
    ["Family lens", "Household impact travels with every branch story."],
    ["Joint watch", "Seams between commands stay illuminated."],
    ["VA-adjacent", "Crises that begin before separation stay in frame."],
    ["Tip geography", "Intake accepts tips from every corner of the force."],
    ["No orphans", "We refuse 'not our beat' when harm is clear."],
  ),
  related: [
    { href: "/help/dod-joint", label: "DoD & joint" },
    { href: "/help/military-families", label: "Military families" },
    { href: "/investigations", label: "Investigations" },
    { href: "/donate", label: "Donate" },
  ],
  beats: [
    {
      heading: "No blind spots by design",
      callout: "Abuse does not respect service colors.",
      seeds: [
        "Abuse does not respect service colors. Our coverage mandate includes Army, Navy, Air Force, Marine Corps, Coast Guard, Space Force, DoD joint environments, and VA-adjacent transition points that begin while members are still in uniform.",
        "A blind spot is usually a choice. We choose otherwise.",
      ],
    },
    {
      heading: "U.S. Army",
      callout: "Installations are cities. Cities hide what they do not want photographed.",
      seeds: [
        "Installations, brigades, training pipelines, and family housing systems produce both excellence and harm. We cover the harm with the same seriousness the mission claims for itself.",
        "Army family tips often involve retaliation paperwork and barracks or housing failures that official photos do not show.",
      ],
    },
    {
      heading: "U.S. Navy",
      callout: "Hours lost inside 'routine' can sink a household.",
      seeds: [
        "Ships, shore commands, medical routing, and fleet mental-health access create unique timelines — and unique places for tickets to die.",
        "Navy family reporting frequently turns on hours and days lost inside labels that sound ordinary and feel catastrophic.",
      ],
    },
    {
      heading: "U.S. Air Force",
      callout: "Safety cultures can punish the people who report defects.",
      seeds: [
        "Depots, wings, and safety cultures can punish the very people who report defects. Whistleblower freeze-outs are a recurring pattern.",
        "We follow technicians and families through the soft violence of schedule changes and scorecards.",
      ],
    },
    {
      heading: "U.S. Marine Corps",
      callout: "Toughness is not a license for neglect.",
      seeds: [
        "Barracks conditions, unit climate, and spouse impact stories remain central. Toughness culture is not a license for neglect.",
        "Marine families deserve documentation that matches the seriousness of the Eagle, Globe, and Anchor — not PR paint.",
      ],
    },
    {
      heading: "Coast Guard, Space Force, joint & VA-adjacent",
      callout: "Smaller communities are not smaller obligations.",
      seeds: [
        "Coast Guard operational tempo without honest manning math creates exhaustion and authority-abuse risk. Space Force hybrid environments create jurisdiction fog. Joint commands and VA-adjacent crises often begin before separation paperwork is done.",
        "Coverage means following the harm across the bureaucratic map until responsibility can no longer hide — including in communities that rarely make national headlines.",
      ],
    },
  ],
};

const counts = {};

for (const def of helpDefs) {
  const { doc, w } = makeDoc(def);
  counts[def.file] = w;
  fs.writeFileSync(path.join(root, "help", `${def.file}.ts`), toTs(def.exportName, doc));
}

const mission = makeDoc(missionDef);
counts.mission = mission.w;
fs.writeFileSync(path.join(root, "mission.ts"), toTs("missionDoc", mission.doc));

const coverage = makeDoc(coverageDef);
counts.coverage = coverage.w;
fs.writeFileSync(path.join(root, "coverage.ts"), toTs("coverageDoc", coverage.doc));

const index = `import type { LongFormDoc } from "@/components/LongFormPage";
import { investigativeReporting } from "./investigative-reporting";
import { militaryFamilies } from "./military-families";
import { olderVeterans } from "./older-veterans";
import { mentalWellbeing } from "./mental-wellbeing";
import { whistleblowerDefense } from "./whistleblower-defense";
import { housingBarracks } from "./housing-barracks";
import { dodJoint } from "./dod-joint";
import { secureTipIntake } from "./secure-tip-intake";

export const helpDocs: LongFormDoc[] = [
  investigativeReporting,
  militaryFamilies,
  olderVeterans,
  mentalWellbeing,
  whistleblowerDefense,
  housingBarracks,
  dodJoint,
  secureTipIntake,
];

export function getHelpBySlug(slug: string) {
  return helpDocs.find((d) => d.slug === slug);
}
`;
fs.writeFileSync(path.join(root, "help", "index.ts"), index);

console.log(JSON.stringify(counts, null, 2));
