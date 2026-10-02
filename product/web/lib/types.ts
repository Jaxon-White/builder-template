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
};

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type Day = (typeof DAYS)[number];

export type Resource = {
  id: string;
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
  open24h: boolean;
  openDays: Day[];
  /** "HH:MM", 24-hour, local time. If closesAt <= opensAt the hours run overnight. */
  opensAt: string;
  closesAt: string;
  walkIn: boolean;
  petsAllowed: boolean;
  free: boolean;
  /** ISO date the listing was last checked. */
  lastVerified: string;
};

export type Household = "alone" | "kids" | "partner";
export type Situation = "veteran" | "abuse" | "pets" | "youth";
export type Gender = "man" | "woman";

export type IntakeAnswers = {
  needs: Category[];
  household: Household | null;
  situations: Situation[];
  gender: Gender | null;
};
