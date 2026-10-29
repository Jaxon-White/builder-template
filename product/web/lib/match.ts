import { isOpenNow, outOfSeason } from "@/lib/hours";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  SITUATION_CATEGORY,
  type Category,
  type Audience,
  type IntakeAnswers,
  type Resource,
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
  const groups = a.situations.map((s) => SITUATION_CATEGORY[s]).filter((c): c is Category => !!c);
  return [...new Set([...a.needs, ...groups])];
}

/** The groups this person belongs to, based on their answers. */
function audiencesFor(a: IntakeAnswers): Audience[] {
  const out: Audience[] = ["everyone"];
  if (a.gender === "man") out.push("men");
  if (a.gender === "woman") out.push("women");
  if (a.household === "kids") out.push("families");
  else out.push("single-adults");
  if (a.situations.includes("youth")) out.push("youth");
  if (a.situations.includes("veteran")) out.push("veterans");
  if (a.situations.includes("abuse")) out.push("abuse-survivors");
  if (a.situations.includes("immigrant")) out.push("immigrants");
  return out;
}

function isEligible(r: Resource, a: IntakeAnswers): boolean {
  const theirs = audiencesFor(a);
  if (r.serves.some((s) => theirs.includes(s))) return true;
  // Gender unknown: keep men-only / women-only places rather than hide a possible bed.
  if (a.gender === null && a.household !== "kids") {
    return r.serves.includes("men") || r.serves.includes("women");
  }
  return false;
}

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

    if (answers.situations.includes("abuse") && r.serves.includes("abuse-survivors")) {
      score += 3;
      reasons.unshift("Confidential help for abuse survivors");
    }
    const forVeterans = r.serves.includes("veterans") || offersFor(r, "veterans");
    if (answers.situations.includes("veteran") && forVeterans) {
      score += 2;
      reasons.push("For veterans");
    }
    if (answers.situations.includes("youth") && r.serves.includes("youth")) {
      score += 2;
      reasons.push("For young people");
    }
    if (answers.situations.includes("senior") && offersFor(r, "seniors")) {
      score += 2;
      reasons.push("For older adults");
    }
    if (answers.situations.includes("disability-approved") && offersFor(r, "disability")) {
      score += 2;
      reasons.push("For people approved for disability benefits");
    }
    if (answers.situations.includes("reentry") && offersFor(r, "reentry")) {
      score += 2;
      reasons.push("For people leaving jail or prison");
    }
    if (answers.situations.includes("immigrant") && r.serves.includes("immigrants")) {
      score += 2;
      reasons.push("For immigrants & refugees");
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
