// Fields are kept flat (strings, booleans, string arrays) so each one maps to a single
// SharePoint list column: text, yes/no, or multi-choice.

// Church HQ's category list (decisions 006 and 007, revised 29 Oct 2026). Labels match HQ's
// names; subcategories and definitions are in lib/subcategories.ts.
export const CATEGORIES = [
  "addiction",
  "clothing-household",
  "disability",
  "domestic-violence",
  "education",
  "employment",
  "food",
  "homeless-services",
  "housing",
  "id-replacement",
  "legal",
  "medical",
  "mental-health",
  "reentry",
  "seniors",
  "transportation",
  "utilities",
  "veterans",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  addiction: "Addiction",
  "clothing-household": "Clothing/Household",
  disability: "Disability",
  "domestic-violence": "Domestic Violence",
  education: "Education",
  employment: "Employment",
  food: "Food",
  "homeless-services": "Homeless Services",
  housing: "Housing",
  "id-replacement": "ID Replacement",
  legal: "Legal and Tax Help",
  medical: "Medical/Dental/Vision",
  "mental-health": "Mental Health",
  reentry: "Reentry",
  seniors: "Seniors",
  transportation: "Transportation",
  utilities: "Utilities, Phone, Internet",
  veterans: "Veterans",
};

/** The app's earlier category keys, so old shared links still work. */
const LEGACY_CATEGORIES: Record<string, Category> = {
  shelter: "homeless-services",
  recovery: "addiction",
  documents: "id-replacement",
  clothing: "clothing-household",
  // Dropped by HQ on 29 Oct 2026 (decision 007); bill help is under Utilities now.
  "financial-assistance": "utilities",
};

/** A category key from a URL, with old keys mapped to new ones; null if unknown. */
export function toCategory(key: string): Category | null {
  const k = LEGACY_CATEGORIES[key] ?? key;
  return (CATEGORIES as readonly string[]).includes(k) ? (k as Category) : null;
}

// Church HQ's 16 "For groups" (decision 007). A place lists a group only when its program is
// restricted to or built for that group; an empty list means open to everyone.
export const FOR_GROUPS = [
  "children-youth",
  "disability",
  "families",
  "immigrants",
  "medically-vulnerable",
  "men",
  "native-americans",
  "criminal-record",
  "pregnant",
  "seniors",
  "single-parents",
  "students",
  "uninsured",
  "veterans",
  "women",
  "young-adults",
] as const;
export type ForGroup = (typeof FOR_GROUPS)[number];

/** HQ's name for each group and who belongs to it. */
export const FOR_GROUP_INFO: Record<ForGroup, { label: string; who: string }> = {
  "children-youth": { label: "Children and youth", who: "Under 18." },
  disability: {
    label: "Individual with disability",
    who: "A person with a physical, mental, intellectual, or developmental disability.",
  },
  families: { label: "Families with minor children", who: "Parents or guardians with minor children living with them." },
  immigrants: {
    label: "Immigrants, refugees, and non-English speaking",
    who: "People born in another country, including refugees and asylees, or people more comfortable using a language other than English.",
  },
  "medically-vulnerable": { label: "Medically vulnerable", who: "People too ill or frail for an ordinary shelter or the street." },
  men: { label: "Men", who: "Programs restricted or specifically targeted to men." },
  "native-americans": { label: "Native Americans", who: "Members or descendants of tribes and pueblos." },
  "criminal-record": {
    label: "People with a criminal record",
    who: "People with a criminal record, whether recently released or not.",
  },
  pregnant: { label: "Pregnant or postpartum", who: "People who are pregnant or within the program-defined postpartum period." },
  seniors: { label: "Seniors", who: "Older adults; each program sets its own age requirement." },
  "single-parents": { label: "Single parents", who: "Parents raising children without another parent in the household." },
  students: { label: "Students", who: "People enrolled in school, college, or an eligible training program." },
  uninsured: { label: "Uninsured", who: "People without health insurance." },
  veterans: {
    label: "Veterans",
    who: "People who served in the U.S. military and, when the program allows, their families.",
  },
  women: { label: "Women", who: "Programs restricted or specifically targeted to women." },
  "young-adults": { label: "Young adults", who: "Ages 18 to 24." },
};

/** The app's earlier group keys, so old shared links still work. */
const LEGACY_GROUPS: Record<string, ForGroup> = { youth: "young-adults" };

/** A group key from a URL, with old keys mapped to new ones; null if unknown. */
export function toForGroup(key: string): ForGroup | null {
  const k = LEGACY_GROUPS[key] ?? key;
  return (FOR_GROUPS as readonly string[]).includes(k) ? (k as ForGroup) : null;
}

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type Day = (typeof DAYS)[number];

/** One text field per day so each maps to a SharePoint column: "hoursMon", "hoursTue", … */
export type DayHoursField = `hours${Day}`;
export const DAY_HOURS_FIELDS = DAYS.map((d) => `hours${d}` as DayHoursField);

export type ResourceStatus = "active" | "closed" | "unreachable";

export type Resource = DailyHours & {
  id: string;
  /** Set by upkeep calls. Closed resources are hidden from the finder. */
  status: ResourceStatus;
  name: string;
  category: Category;
  alsoOffers: Category[];
  /**
   * HQ subcategories it offers, by HQ's exact name ("Meals", "Food pantries"), from its own
   * categories. Only names in lib/subcategories.ts; from official pages like the details below.
   */
  subcategories: string[];
  /** Other short labels searched on the Resources tab ("Spanish", "Sliding fee"). */
  tags: string[];
  description: string;
  phone: string;
  address: string;
  city: string;
  /** e.g. "Utah County". Searchable. */
  county: string;
  /** Two-letter code, e.g. "UT". Searchable, along with the full name. */
  state: string;
  /** HQ For groups the program is restricted to; empty = open to everyone. */
  serves: ForGroup[];
  /**
   * App-only (decision 007): turns away people with children, so it's hidden from them.
   * HQ has no group for this.
   */
  noChildren?: boolean;
  /** One-line summary of who qualifies; the full list is `qualifiers`. */
  eligibility: string;
  // Details missionaries need on a call (decision 005: each from an official page in
  // `factSources`; empty when no official page says it, and the app shows "Call to ask").
  /** Who qualifies, one requirement per item. */
  qualifiers: string[];
  howToApply: string;
  whatToBring: string[];
  /** Languages offered beyond English, e.g. a Spanish helpline. */
  languages: string;
  /** The official pages the details above came from. */
  factSources: string[];
  /** Optional extra detail times can't say, shown under the hours ("Walk-ins first come, first served"). */
  hoursNote: string;
  /** False when listings disagree; the app says "Call for hours" instead of Open/Closed. */
  hoursKnown: boolean;
  open24h: boolean;
  /**
   * For seasonal places: the first and last day it opens, "YYYY-MM-DD" ("" = all year).
   * For overnight hours, the last day is the last night it opens (it closes the next morning).
   */
  seasonStart: string;
  seasonEnd: string;
  walkIn: boolean;
  petsAllowed: boolean;
  free: boolean;
  /** ISO date someone last confirmed it by phone, or "" if never. */
  lastVerified: string;
  /** The place's own website, shared with the person needing help, or "" if none. */
  website: string;
  /** Where the details came from (URL), for anyone re-checking them. */
  source: string;
};

/**
 * Each day's hours as "HH:MM-HH:MM" (24-hour, local time), or "" when closed that day.
 * If the closing time is at or before the opening time, the hours run overnight into the next day.
 */
export type DailyHours = Record<DayHoursField, string>;

export type Household = "alone" | "kids" | "partner";
export type Situation =
  | "veteran"
  | "abuse"
  | "pets"
  | "under-18"
  | "young-adult"
  | "immigrant"
  | "senior"
  /** Already approved for SSI or SSDI; many disability programs require it. */
  | "disability-approved"
  | "reentry";

/** The app's earlier situation keys, so old shared links still work. */
export const LEGACY_SITUATIONS: Record<string, Situation> = { youth: "young-adult" };

/**
 * What each situation means for matching: the HQ For group it puts the person in, and the
 * category of programs built for them, which picking it also searches (decisions 006, 007).
 */
export const SITUATION_INFO: Record<Situation, { group?: ForGroup; category?: Category }> = {
  veteran: { group: "veterans", category: "veterans" },
  abuse: { category: "domestic-violence" },
  pets: {},
  "under-18": { group: "children-youth" },
  "young-adult": { group: "young-adults" },
  immigrant: { group: "immigrants" },
  senior: { group: "seniors", category: "seniors" },
  "disability-approved": { group: "disability", category: "disability" },
  reentry: { group: "criminal-record", category: "reentry" },
};
export type Gender = "man" | "woman";

export type IntakeAnswers = {
  needs: Category[];
  household: Household | null;
  situations: Situation[];
  gender: Gender | null;
};

export type CheckOutcome = "running" | "closed" | "unreachable";

export const OUTCOME_LABELS: Record<CheckOutcome, string> = {
  running: "Still running",
  closed: "Closed",
  unreachable: "Couldn't reach",
};

/** One upkeep call. Maps to a row in a "Check Log" SharePoint list. */
export type CheckLog = {
  id: string;
  resourceId: string;
  /** ISO timestamp. */
  at: string;
  by: string;
  outcome: CheckOutcome;
  note: string;
  changedFields: string[];
};

/** Fields an upkeep person can correct during a call. */
export const EDITABLE_FIELDS = [
  "phone",
  "address",
  "city",
  ...DAY_HOURS_FIELDS,
  "hoursNote",
  "eligibility",
  "qualifiers",
  "howToApply",
  "whatToBring",
  "tags",
  "languages",
  "description",
  "website",
] as const;
export type EditableField = (typeof EDITABLE_FIELDS)[number];
export type ResourceChanges = Partial<Pick<Resource, EditableField | "status" | "lastVerified" | "hoursKnown">>;

/** Full state names so "Utah" finds places stored as "UT". Add states as places outside Utah are added. */
export const STATE_NAMES: Record<string, string> = { UT: "Utah" };
