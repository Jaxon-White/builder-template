// Fields are kept flat (strings, booleans, string arrays) so each one maps to a single
// SharePoint list column: text, yes/no, or multi-choice.

// Church HQ's category list (decision 006). Labels match HQ's names.
export const CATEGORIES = [
  "addiction",
  "clothing-household",
  "disability",
  "domestic-violence",
  "education",
  "employment",
  "financial-assistance",
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
  "financial-assistance": "Financial Assistance",
  food: "Food",
  "homeless-services": "Homeless Services",
  housing: "Housing",
  "id-replacement": "ID Replacement",
  legal: "Legal",
  medical: "Medical/Dental/Vision",
  "mental-health": "Mental Health",
  reentry: "Reentry",
  seniors: "Seniors",
  transportation: "Transportation",
  utilities: "Utilities",
  veterans: "Veterans",
};

/** The app's earlier category keys, so old shared links still work. */
const LEGACY_CATEGORIES: Record<string, Category> = {
  shelter: "homeless-services",
  recovery: "addiction",
  documents: "id-replacement",
  clothing: "clothing-household",
};

/** A category key from a URL, with old keys mapped to new ones; null if unknown. */
export function toCategory(key: string): Category | null {
  const k = LEGACY_CATEGORIES[key] ?? key;
  return (CATEGORIES as readonly string[]).includes(k) ? (k as Category) : null;
}

// Who a resource is set up to serve. "everyone" means no restriction.
export const AUDIENCES = [
  "everyone",
  "men",
  "women",
  "families",
  "youth",
  "veterans",
  "abuse-survivors",
  "immigrants",
  /** Adults without children with them (alone or as a couple), e.g. a warming center. */
  "single-adults",
] as const;
export type Audience = (typeof AUDIENCES)[number];

export const AUDIENCE_LABELS: Record<Audience, string> = {
  everyone: "Everyone",
  men: "Men",
  women: "Women",
  families: "Families",
  youth: "Youth (under 25)",
  veterans: "Veterans",
  "abuse-survivors": "Abuse survivors",
  immigrants: "Immigrants & refugees",
  "single-adults": "Single adults and couples (no children)",
};

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
   * Short labels for what it offers and who it's for, searched on the Resources tab. HQ's
   * subcategory names where they fit ("Meals", "Food pantries"); from official pages like the
   * details below.
   */
  tags: string[];
  description: string;
  phone: string;
  address: string;
  city: string;
  /** e.g. "Utah County". Searchable. */
  county: string;
  /** Two-letter code, e.g. "UT". Searchable, along with the full name. */
  state: string;
  serves: Audience[];
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
  | "youth"
  | "immigrant"
  | "senior"
  /** Already approved for SSI or SSDI; many disability programs require it. */
  | "disability-approved"
  | "reentry";

/**
 * Groups asked about as a situation rather than a need. Picking one also searches the
 * programs built for that group (decision 006).
 */
export const SITUATION_CATEGORY: Partial<Record<Situation, Category>> = {
  veteran: "veterans",
  senior: "seniors",
  "disability-approved": "disability",
  reentry: "reentry",
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
