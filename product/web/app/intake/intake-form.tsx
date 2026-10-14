"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { intakeToQuery } from "@/lib/intake";
import type { Category, Gender, Household, IntakeAnswers, Situation } from "@/lib/types";

type Option<T> = { value: T; label: string; hint?: string };

const NEEDS: Option<Category>[] = [
  { value: "shelter", label: "A place to sleep tonight" },
  { value: "food", label: "Food" },
  { value: "medical", label: "Medical care" },
  { value: "mental-health", label: "Mental health / someone to talk to" },
  { value: "recovery", label: "Drug or alcohol recovery" },
  { value: "documents", label: "Replacing ID or applying for benefits" },
  { value: "transportation", label: "A ride or bus pass" },
  { value: "clothing", label: "Clothes, a shower or laundry" },
];

const HOUSEHOLDS: Option<Household>[] = [
  { value: "alone", label: "On their own" },
  { value: "kids", label: "With children" },
  { value: "partner", label: "With a partner or spouse" },
];

const SITUATIONS: Option<Situation>[] = [
  { value: "abuse", label: "Fleeing abuse or violence" },
  { value: "veteran", label: "Veteran" },
  { value: "youth", label: "Under 25" },
  { value: "pets", label: "Has a pet with them" },
];

const GENDERS: Option<Gender>[] = [
  { value: "man", label: "Man" },
  { value: "woman", label: "Woman" },
];

const STEPS = 4;

export function IntakeForm({ offered }: { offered: Category[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({
    needs: [],
    household: null,
    situations: [],
    gender: null,
  });

  function toggle<T>(list: T[], v: T): T[] {
    return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  }

  function next() {
    if (step < STEPS - 1) setStep(step + 1);
    else router.push(`/matches?${intakeToQuery(answers)}`);
  }

  const canContinue = step !== 0 || answers.needs.length > 0;

  return (
    <div className="flex min-h-[70vh] flex-col">
      <div className="mb-6 flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS}`}>
        {Array.from({ length: STEPS }, (_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>

      <div className="flex-1">
        {step === 0 && (
          <Question title="What do they need most right now?" hint="Pick all that apply.">
            {NEEDS.filter((o) => offered.includes(o.value)).map((o) => (
              <Choice
                key={o.value}
                label={o.label}
                selected={answers.needs.includes(o.value)}
                multi
                onClick={() => setAnswers({ ...answers, needs: toggle(answers.needs, o.value) })}
              />
            ))}
          </Question>
        )}

        {step === 1 && (
          <Question title="Who is with them?">
            {HOUSEHOLDS.map((o) => (
              <Choice
                key={o.value}
                label={o.label}
                selected={answers.household === o.value}
                onClick={() => {
                  setAnswers({ ...answers, household: o.value });
                  setStep(step + 1);
                }}
              />
            ))}
          </Question>
        )}

        {step === 2 && (
          <Question title="Does any of this apply?" hint="Optional. Helps find places that specialize.">
            {SITUATIONS.map((o) => (
              <Choice
                key={o.value}
                label={o.label}
                selected={answers.situations.includes(o.value)}
                multi
                onClick={() => setAnswers({ ...answers, situations: toggle(answers.situations, o.value) })}
              />
            ))}
          </Question>
        )}

        {step === 3 && (
          <Question
            title="Are they a man or a woman?"
            hint="Optional. Some shelters only serve men or only serve women."
          >
            {GENDERS.map((o) => (
              <Choice
                key={o.value}
                label={o.label}
                selected={answers.gender === o.value}
                onClick={() => setAnswers({ ...answers, gender: answers.gender === o.value ? null : o.value })}
              />
            ))}
          </Question>
        )}
      </div>

      <div className="sticky bottom-0 -mx-4 mt-6 flex gap-3 bg-background px-4 py-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="min-h-14 rounded-2xl border border-border bg-surface px-5 font-medium"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={next}
          disabled={!canContinue}
          className="min-h-14 flex-1 rounded-2xl bg-primary px-6 text-lg font-semibold text-white disabled:opacity-40 hover:bg-primary-hover"
        >
          {step === STEPS - 1 ? "Show who can help" : step === 0 ? "Next" : "Next / skip"}
        </button>
      </div>
    </div>
  );
}

function Question({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="space-y-1">
        <span className="block text-2xl font-semibold leading-snug">{title}</span>
        {hint && <span className="block text-sm text-muted">{hint}</span>}
      </legend>
      <div className="space-y-2.5 pt-2">{children}</div>
    </fieldset>
  );
}

function Choice({
  label,
  selected,
  multi,
  onClick,
}: {
  label: string;
  selected: boolean;
  multi?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 text-left text-base font-medium transition-colors ${
        selected ? "border-primary bg-primary-soft" : "border-border bg-surface hover:border-muted"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 text-sm text-white ${
          multi ? "rounded-md" : "rounded-full"
        } ${selected ? "border-primary bg-primary" : "border-muted"}`}
      >
        {selected && "✓"}
      </span>
      {label}
    </button>
  );
}
