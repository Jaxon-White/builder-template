import { isOpenNow, outOfSeason } from "@/lib/hours";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  SITUATION_INFO,
  type Category,
  type ForGroup,
  type IntakeAnswers,
  type Resource,
  type Situation,
} from "@/lib/types";

export type Match = {
  resource: Resource;
  score: number;
  reasons: string[];
  openNow: boolean;
};

/**
 * Needs at least one resource covers, as its main category or something it also offers.
 * Only these are offered as choices, so nobody is promised help the app can't point to.
 */
export function categoriesOffered(all: Resource[]): Category[] {
  return CATEGORIES.filter((c) => all.some((r) => r.category === c || r.alsoOffers.includes(c)));
}

/** The needs picked, plus the programs for any group they belong to (veteran, older adult, …). */
export function searchedCategories(a: IntakeAnswers): Category[] {
  const groups = a.situations.map((s) => SITUATION_INFO[s].category).filter((c): c is Category => !!c);
  return [...new Set([...a.needs, ...groups])];
}

/** For groups intake can place someone in. Places restricted to any other group are never hidden. */
const ASKED_GROUPS: ForGroup[] = [
  "men",
  "women",
  "families",
  ...Object.values(SITUATION_INFO).flatMap((i) => (i.group ? [i.group] : [])),
];

/** The HQ For groups this person belongs to, based on their answers. */
function groupsFor(a: IntakeAnswers): ForGroup[] {
  const out: ForGroup[] = [];
  if (a.gender === "man") out.push("men");
  if (a.gender === "woman") out.push("women");
  if (a.household === "kids") out.push("families");
  for (const s of a.situations) {
    const g = SITUATION_INFO[s].group;
    if (g) out.push(g);
  }
  return out;
}

function isEligible(r: Resource, a: IntakeAnswers): boolean {
  if (r.noChildren && a.household === "kids") return false;
  if (r.serves.length === 0) return true;
  if (r.serves.some((g) => groupsFor(a).includes(g))) return true;
  // Intake doesn't ask about pregnancy, insurance, etc., so they might qualify; "Who qualifies" says.
  if (r.serves.some((g) => !ASKED_GROUPS.includes(g))) return true;
  // Gender unknown: keep men-only / women-only places rather than hide a possible bed.
  if (a.gender === null && a.household !== "kids") {
    return r.serves.includes("men") || r.serves.includes("women");
  }
  return false;
}

/** Why a place built for one of their situations came up. */
const SITUATION_REASONS: Partial<Record<Situation, string>> = {
  veteran: "For veterans",
  "under-18": "For children and youth",
  "young-adult": "For young adults",
  immigrant: "For immigrants & refugees",
  senior: "For older adults",
  "disability-approved": "For people with disabilities",
  reentry: "For people leaving jail or prison",
};

/**
 * Ranks resources for one person. Pure: takes plain data in and returns plain data, so it
 * works the same whether resources came from mock data or SharePoint.
 */
export function matchResources(
  answers: IntakeAnswers,
  all: Resource[],
  now = new Date(),
): Match[] {
  const matches: Match[] = [];
  const searched = searchedCategories(answers);
  const offersFor = (r: Resource, c: Category) => r.category === c || r.alsoOffers.includes(c);

  for (const r of all) {
    const primary = searched.includes(r.category);
    const secondary = r.alsoOffers.filter((c) => searched.includes(c));
    if (searched.length > 0 && !primary && secondary.length === 0) continue;
    if (!isEligible(r, answers)) continue;

    const reasons: string[] = [];
    let score = 0;

    if (primary) {
      // A bed tonight is the most time-sensitive need, so it outranks the others.
      score += r.category === "homeless-services" ? 4 : 3;
      reasons.push(CATEGORY_LABELS[r.category]);
    } else {
      score += 1.5;
      reasons.push(`Also offers ${secondary.map((c) => CATEGORY_LABELS[c].toLowerCase()).join(", ")}`);
    }

    const openNow = isOpenNow(r, now);
    if (r.open24h) {
      score += 1;
      reasons.push("Open 24 hours");
    } else if (openNow) {
      score += 1;
      reasons.push("Open now");
    }

    for (const sit of answers.situations) {
      const { group, category } = SITUATION_INFO[sit];
      const builtForThem = (group && r.serves.includes(group)) || (category && offersFor(r, category));
      if (!builtForThem) continue;
      if (sit === "abuse") {
        score += 3;
        reasons.unshift("Confidential help for abuse survivors");
      } else if (SITUATION_REASONS[sit]) {
        score += 2;
        reasons.push(SITUATION_REASONS[sit]);
      }
    }
    if (answers.household === "kids" && r.serves.includes("families")) {
      score += 1.5;
      reasons.push("Keeps families together");
    }
    if (answers.situations.includes("pets") && r.petsAllowed) {
      score += 1;
      reasons.push("Pets OK");
    }
    if (r.walkIn) {
      score += 0.5;
      reasons.push("Walk-in");
    }

    // A seasonal place that isn't open yet (or anymore) can't help tonight, so it goes last.
    if (outOfSeason(r, now)) {
      score -= 10;
      reasons.splice(1, reasons.length - 1, "Closed for the season");
    }

    matches.push({ resource: r, score, reasons, openNow });
  }

  return matches.sort((a, b) => b.score - a.score || a.resource.name.localeCompare(b.resource.name));
}
