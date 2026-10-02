import {
  CATEGORIES,
  type Category,
  type Gender,
  type Household,
  type IntakeAnswers,
  type Situation,
} from "@/lib/types";

// Intake answers travel in the URL (e.g. /matches?need=shelter,food&with=kids) so results are
// linkable and nothing about the person is stored anywhere.

type Params = Record<string, string | string[] | undefined>;

function list(v: string | string[] | undefined): string[] {
  const s = Array.isArray(v) ? v.join(",") : (v ?? "");
  return s.split(",").filter(Boolean);
}

const HOUSEHOLDS: Household[] = ["alone", "kids", "partner"];
const SITUATIONS: Situation[] = ["veteran", "abuse", "pets", "youth"];
const GENDERS: Gender[] = ["man", "woman"];

export function parseIntake(p: Params): IntakeAnswers {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const household = one(p.with) as Household;
  const gender = one(p.gender) as Gender;
  return {
    needs: list(p.need).filter((n): n is Category => (CATEGORIES as readonly string[]).includes(n)),
    household: HOUSEHOLDS.includes(household) ? household : null,
    situations: list(p.also).filter((s): s is Situation => SITUATIONS.includes(s as Situation)),
    gender: GENDERS.includes(gender) ? gender : null,
  };
}

export function intakeToQuery(a: IntakeAnswers): string {
  const q = new URLSearchParams();
  if (a.needs.length) q.set("need", a.needs.join(","));
  if (a.household) q.set("with", a.household);
  if (a.situations.length) q.set("also", a.situations.join(","));
  if (a.gender) q.set("gender", a.gender);
  return q.toString().replaceAll("%2C", ",");
}
