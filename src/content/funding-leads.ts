export type FundingLeadCategory =
  | "gov"
  | "partner"
  | "big_money"
  | "family_direct"
  | "setup";

export type FundingLead = {
  id: string;
  category: FundingLeadCategory;
  name: string;
  org: string;
  why: string;
  action: string;
  url: string;
  amountHint?: string;
  priority: "now" | "high" | "watch";
};

export const fundingCategories: {
  id: FundingLeadCategory;
  label: string;
  blurb: string;
}[] = [
  {
    id: "setup",
    label: "Get grant-ready first",
    blurb:
      "Federal and foundation money expects a clean nonprofit stack. Knock these out before chasing seven-figure NOFOs.",
  },
  {
    id: "gov",
    label: ".Gov & federal grants",
    blurb:
      "VA and federal portals where nonprofits (and partners) pull real money for housing, suicide prevention, family support, and adaptive care.",
  },
  {
    id: "partner",
    label: "Partners who open doors",
    blurb:
      "Orgs, directories, and platforms that help charities find funders, match gifts, or co-apply on veteran family work.",
  },
  {
    id: "big_money",
    label: "Big funding lanes",
    blurb:
      "Corporate, DAF, community foundation, and campaign channels that move larger checks than one-off website donations.",
  },
  {
    id: "family_direct",
    label: "Direct help for families",
    blurb:
      "Fast paths households can use now while grant cycles crawl — caregiver aid, crisis funds, and VA benefits navigation.",
  },
];

export const fundingLeads: FundingLead[] = [
  // —— Setup ——
  {
    id: "sam-gov",
    category: "setup",
    name: "SAM.gov registration",
    org: "U.S. GSA",
    why: "Required Unique Entity ID before any federal grant award. No SAM = no .gov money.",
    action: "Create / renew entity registration and keep it Active.",
    url: "https://sam.gov/",
    priority: "now",
  },
  {
    id: "grants-gov-workspace",
    category: "setup",
    name: "Grants.gov Workspace",
    org: "Grants.gov",
    why: "Central federal application portal. Most VA NOFOs route through here or linked systems.",
    action: "Add org users, complete profiles, practice a Workspace package.",
    url: "https://www.grants.gov/",
    priority: "now",
  },
  {
    id: "candid-guidestar",
    category: "setup",
    name: "Candid / GuideStar profile",
    org: "Candid",
    why: "Funders and corporate CSR desks check transparency seals before cutting large gifts.",
    action: "Claim profile, upload Form 990s, chase Seal of Transparency.",
    url: "https://www.guidestar.org/",
    priority: "high",
  },
  {
    id: "irs-eo",
    category: "setup",
    name: "IRS Exempt Organizations",
    org: "IRS.gov",
    why: "Confirm 501(c)(3) determination letter is current — partners and .gov ask for it constantly.",
    action: "Download determination letter + EIN confirmation PDF into a grants folder.",
    url: "https://www.irs.gov/charities-non-profits",
    priority: "high",
  },

  // —— .Gov ——
  {
    id: "va-grants-hub",
    category: "gov",
    name: "VA Grants hub",
    org: "U.S. Department of Veterans Affairs",
    why: "Official map of VA competitive grants for community orgs serving veterans and families.",
    action: "Bookmark hub; set calendar alerts for new NOFOs.",
    url: "https://department.va.gov/grants/",
    amountHint: "Program-sized — often six to eight figures across awards",
    priority: "now",
  },
  {
    id: "ssvf",
    category: "gov",
    name: "Supportive Services for Veteran Families (SSVF)",
    org: "VA · Assistance Listing 64.033",
    why: "Flagship housing-stability grants for very low-income veteran families — prevention + rapid rehousing.",
    action: "Review current/next NOFO on Grants.gov; partner with an eligible nonprofit if you are not yet one.",
    url: "https://www.va.gov/homeless/ssvf/",
    amountHint: "FY cycles often hundreds of millions across awardees",
    priority: "now",
  },
  {
    id: "ssg-fox",
    category: "gov",
    name: "SSG Fox Suicide Prevention Grant Program",
    org: "VA Office of Suicide Prevention",
    why: "Community orgs get real dollars for non-clinical suicide prevention — critical for return-home pain.",
    action: "Watch VA News + Grants.gov for the next NOFO; new applicants often capped (e.g. ~$750k).",
    url: "https://www.va.gov/suicide_prevention/",
    amountHint: "Recent cycles ~$100M+ total; new awards often up to mid-six figures",
    priority: "high",
  },
  {
    id: "hud-vash",
    category: "gov",
    name: "HUD-VASH / homeless veterans continuum",
    org: "HUD + VA",
    why: "Housing vouchers + case management pathway; partner local PHAs and Continuums of Care.",
    action: "Contact local Continuum of Care / PHA about veteran family placements and referral MOUs.",
    url: "https://www.hud.gov/program_offices/public_indian_housing/programs/hcv/vash",
    priority: "high",
  },
  {
    id: "simpler-grants",
    category: "gov",
    name: "Simpler.Grants.gov opportunity search",
    org: "Grants.gov",
    why: "Cleaner search for open federal opportunities tagged veterans / families / housing / mental health.",
    action: "Search “veteran family”, “SSVF”, “suicide prevention”; save searches.",
    url: "https://simpler.grants.gov/",
    priority: "high",
  },
  {
    id: "sba-veterans",
    category: "gov",
    name: "SBA Office of Veterans Business Development",
    org: "U.S. Small Business Administration",
    why: "If families need income after discharge — veteran entrepreneurship + Boots to Business pipelines.",
    action: "Link families to local SBA VBOC; explore nonprofit partnership for workshops.",
    url: "https://www.sba.gov/about-sba/sba-locations/headquarters-offices/office-veterans-business-development",
    priority: "watch",
  },
  {
    id: "cfc",
    category: "gov",
    name: "Combined Federal Campaign (CFC)",
    org: "OPM",
    why: "Federal employee payroll giving — recurring gifts at scale once you are listed.",
    action: "Apply in the next CFC charity application window; keep EIN/GuideStar current.",
    url: "https://www.opm.gov/combined-federal-campaign/",
    priority: "watch",
  },
  {
    id: "military-onesource",
    category: "gov",
    name: "Military OneSource",
    org: "DoD",
    why: "Official DoD family support + financial counseling referrals you can route households into immediately.",
    action: "Add OneSource + Military Family Life Counseling contacts to family intake scripts.",
    url: "https://www.militaryonesource.mil/",
    priority: "high",
  },

  // —— Partners ——
  {
    id: "nvsos",
    category: "partner",
    name: "National Association of State Directors of Veterans Affairs",
    org: "NASDVA",
    why: "State veterans directors control state grant pots and know who funds caregiver / family programs locally.",
    action: "Find your state director; ask about state veteran family grants and MOUs.",
    url: "https://www.nasdva.us/",
    priority: "high",
  },
  {
    id: "community-foundations",
    category: "partner",
    name: "Community Foundation Locator",
    org: "Council on Foundations",
    why: "Local community foundations often run veteran, caregiver, and emergency assistance funds.",
    action: "Map foundations within 100 miles of sponsored families; request program officer intro.",
    url: "https://www.cof.org/page/community-foundation-locator",
    priority: "high",
  },
  {
    id: "foundation-directory",
    category: "partner",
    name: "Candid Foundation Directory",
    org: "Candid",
    why: "Best search for private foundations that already give to veterans, journalism, or family support.",
    action: "Filter: veterans + families + mental health + journalism; build a top-25 prospect list.",
    url: "https://candid.org/explore-issues/foundation-directory",
    amountHint: "Five- to seven-figure foundation gifts",
    priority: "now",
  },
  {
    id: "points-of-light",
    category: "partner",
    name: "Points of Light / corporate volunteer partners",
    org: "Points of Light",
    why: "Corporate volunteer + CSR intros that often precede sponsorship of family campaigns.",
    action: "Pitch a “sponsor a military family” employee engagement package.",
    url: "https://www.pointsoflight.org/",
    priority: "watch",
  },
  {
    id: "teamrubicon-model",
    category: "partner",
    name: "Veteran-serving nonprofit coalition partners",
    org: "Local Continuum of Care / VSOs",
    why: "SSVF and HUD money usually flows to experienced homeless/housing nonprofits — co-apply or subcontract.",
    action: "Identify 2–3 local SSVF grantees; propose journalism + family sponsorship add-on.",
    url: "https://www.va.gov/homeless/ssvf/index.asp",
    priority: "high",
  },
  {
    id: "give-an-hour",
    category: "partner",
    name: "Give an Hour / mental health partners",
    org: "Give an Hour",
    why: "Clinical volunteer networks reduce family mental-health cost while you raise cash for caregivers.",
    action: "Explore referral MOU for sponsored families waiting on VA appointments.",
    url: "https://giveanhour.org/",
    priority: "watch",
  },

  // —— Big money ——
  {
    id: "daf-fidelity",
    category: "big_money",
    name: "Donor-advised funds (Fidelity / Schwab / Vanguard)",
    org: "DAF sponsors",
    why: "Wealthy donors often give via DAF — list EIN clearly and accept DAF checks/ACH.",
    action: "Publish EIN + mailing instructions; add “recommend a DAF grant” CTA on donate page.",
    url: "https://www.fidelitycharitable.org/giving-account/granting.html",
    amountHint: "Often $5k–$100k+ per recommendation",
    priority: "high",
  },
  {
    id: "benevity",
    category: "big_money",
    name: "Benevity / corporate matching platforms",
    org: "Benevity · YourCause · CyberGrants",
    why: "Employees at Fortune 500s match gifts 1:1 or 2:1 once your charity is in their portal.",
    action: "Register org in major matching portals; tell donors “ask HR to match.”",
    url: "https://benevity.com/",
    priority: "high",
  },
  {
    id: "network-for-good",
    category: "big_money",
    name: "Network for Good / peer-to-peer campaigns",
    org: "Network for Good",
    why: "Run family-named campaigns with shareable pages for churches, units, and alumni clubs.",
    action: "Stand up peer-to-peer pages per sponsored family with monthly goals.",
    url: "https://www.networkforgood.com/",
    priority: "watch",
  },
  {
    id: "facebook-meta-tools",
    category: "big_money",
    name: "Meta nonprofit fundraising tools",
    org: "Meta",
    why: "Birthday / fundraiser traffic still moves five figures for emotional family stories when verified.",
    action: "Complete Meta nonprofit verification; enable fundraisers tied to family pages.",
    url: "https://www.facebook.com/business/nonprofit",
    priority: "watch",
  },
  {
    id: "state-veterans-trust",
    category: "big_money",
    name: "State Veterans Trust / Military Family Relief Funds",
    org: "State departments of veterans affairs",
    why: "Many states run emergency grants for rent, utilities, caregiver travel — underused by journalists’ partner charities.",
    action: "Build a one-pager per state where your 12 demo families live; submit applications with them.",
    url: "https://www.va.gov/find-locations/?facilityType=state_veterans_affairs",
    amountHint: "Often $500–$5,000 emergency awards; some larger annual pots",
    priority: "now",
  },
  {
    id: "corporate-csr",
    category: "big_money",
    name: "Defense / logistics / healthcare CSR desks",
    org: "Corporate foundations",
    why: "Employers near Wright-Patterson, Bragg, Pendleton, etc. fund local military family hardship.",
    action: "Target 10 employers within 50 miles of each family; request community grant guidelines.",
    url: "https://www.charitynavigator.org/",
    priority: "high",
  },

  // —— Family direct ——
  {
    id: "va-benefits",
    category: "family_direct",
    name: "VA benefits + caregiver support",
    org: "VA",
    why: "Disability, PCAFC caregiver stipend, and CHAMPVA can change household cash flow permanently.",
    action: "For every sponsored family, run a benefits checklist with an accredited VSO.",
    url: "https://www.va.gov/family-member-benefits/",
    priority: "now",
  },
  {
    id: "vso-accredited",
    category: "family_direct",
    name: "Accredited VSO claims help (DAV / American Legion / VFW)",
    org: "National VSOs",
    why: "Free accredited representation for claims — recovers money families leave on the table.",
    action: "Book claims appointments; never pay claim sharks.",
    url: "https://www.va.gov/vso/",
    priority: "now",
  },
  {
    id: "operationhomefront",
    category: "family_direct",
    name: "Operation Homefront critical financial assistance",
    org: "Operation Homefront",
    why: "Rent, utilities, food, repair — designed for military families in crisis.",
    action: "Add to family referral sheet; help complete applications.",
    url: "https://operationhomefront.org/",
    priority: "high",
  },
  {
    id: "usa-cares",
    category: "family_direct",
    name: "USA Cares emergency assistance",
    org: "USA Cares",
    why: "Post-9/11 focused emergency aid for veterans and families under financial stress.",
    action: "Submit when diary shows eviction / medical travel cliffs.",
    url: "https://usacares.org/",
    priority: "high",
  },
  {
    id: "tricare-mental",
    category: "family_direct",
    name: "TRICARE / Vet Centers / 988 Veterans",
    org: "DoD / VA / SAMHSA",
    why: "Return-home mental health and family counseling — cash alone does not stop the pain.",
    action: "Put 988 then Press 1, nearest Vet Center, and TRICARE behavioral health on every diary page.",
    url: "https://www.veteranscrisisline.net/",
    priority: "now",
  },
  {
    id: "legal-services",
    category: "family_direct",
    name: "Legal Services Corp / military legal aid",
    org: "LSC + ABA",
    why: "Eviction, custody, discharge upgrade, and benefits appeals need lawyers — grants fund clinics.",
    action: "Find LSC-funded clinics near each family; partner for tip follow-up.",
    url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
    priority: "watch",
  },
];

export type FundingPursuitStatus =
  | "new"
  | "watching"
  | "preparing"
  | "applied"
  | "won"
  | "passed";

export const pursuitStatuses: { id: FundingPursuitStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "watching", label: "Watching" },
  { id: "preparing", label: "Preparing" },
  { id: "applied", label: "Applied" },
  { id: "won", label: "Won / live" },
  { id: "passed", label: "Passed" },
];
