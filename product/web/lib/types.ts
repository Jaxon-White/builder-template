// Fields are kept flat (strings, booleans, string arrays) so each one maps to a single
// SharePoint list column: text, yes/no, or multi-choice.

export const CATEGORIES = [
  "shelter",
  "food",
  "medical",
  "mental-health",
  "recovery",
  "documents",
  "transportation",
  "clothing",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  shelter: "Shelter",
  food: "Food",
  medical: "Medical",
  "mental-health": "Mental health",
  recovery: "Addiction recovery",
  documents: "ID & documents",
  transportation: "Transportation",
  clothing: "Clothing & hygiene",
};

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
};

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type Day = (typeof DAYS)[number];

export type ResourceStatus = "active" | "closed" | "unreachable";

export type Resource = {
  id: string;
  /** Set by upkeep calls. Closed resources are hidden from the finder. */
  status: ResourceStatus;
  name: string;
  category: Category;
  alsoOffers: Category[];
  description: string;
  phone: string;
  address: string;
  city: string;
  serves: Audience[];
  eligibility: string;
  hoursText: string;
  /** False when listings disagree; the app says "Call for hours" instead of Open/Closed. */
  hoursKnown: boolean;
  open24h: boolean;
  openDays: Day[];
  /** "HH:MM", 24-hour, local time. If closesAt <= opensAt the hours run overnight. */
  opensAt: string;
  closesAt: string;
  walkIn: boolean;
  petsAllowed: boolean;
  free: boolean;
  /** ISO date someone last confirmed it by phone, or "" if never. */
  lastVerified: string;
  /** Where the details came from (URL), for anyone re-checking them. */
  source: string;
};

export type Household = "alone" | "kids" | "partner";
export type Situation = "veteran" | "abuse" | "pets" | "youth" | "immigrant";
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
  "hoursText",
  "opensAt",
  "closesAt",
  "openDays",
  "eligibility",
  "description",
] as const;
export type EditableField = (typeof EDITABLE_FIELDS)[number];
export type ResourceChanges = Partial<Pick<Resource, EditableField | "status" | "lastVerified" | "hoursKnown">>;
