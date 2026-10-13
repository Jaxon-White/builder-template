import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { getFinderResources } from "@/lib/data";
import { parseIntake } from "@/lib/intake";
import { matchResources } from "@/lib/match";
import { CATEGORY_LABELS } from "@/lib/types";

export default async function MatchesPage({ searchParams }: PageProps<"/matches">) {
  const answers = parseIntake(await searchParams);
  const matches = matchResources(answers, await getFinderResources());
  const needsText = answers.needs.map((n) => CATEGORY_LABELS[n].toLowerCase()).join(", ");

  return (
    <div className="space-y-5">
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {matches.length === 0
            ? "No close matches"
            : `${matches.length} ${matches.length === 1 ? "place" : "places"} can help`}
        </h1>
        {needsText && <p className="text-sm text-muted">For: {needsText}. Best fit first.</p>}
        <Link href="/intake" className="inline-block pt-1 text-sm font-medium text-primary underline">
          Change answers
        </Link>
      </section>

      {answers.situations.includes("abuse") && (
        <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-900">
          If they are in immediate danger, call <a href="tel:911" className="font-semibold underline">911</a>.
          Abuse shelters keep their location private, so call them first.
        </p>
      )}

      {answers.needs.includes("shelter") &&
        !matches.some((m) => m.resource.category === "shelter") && <NoShelterHelp />}

      {matches.length === 0 ? (
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5">
          <p>Nothing matched every answer. Try fewer needs, or browse everything.</p>
          <Link href="/resources" className="font-medium text-primary underline">
            Browse all resources
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {matches.map((m) => (
            <li key={m.resource.id}>
              <ResourceCard resource={m.resource} openNow={m.openNow} reasons={m.reasons} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Utah County has no year-round general homeless shelter, so a "place to sleep" search usually
 * finds nothing. Say so plainly and point to the real options.
 */
function NoShelterHelp() {
  return (
    <section className="space-y-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
      <h2 className="text-base font-semibold">No year-round shelter in Utah County</h2>
      <p>For a place to sleep tonight, try:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <a href="tel:211" className="font-semibold underline">
            Call 211
          </a>{" "}
          for current emergency options.
        </li>
        <li>
          <a href="tel:8013738200" className="font-semibold underline">
            Community Action Services, (801) 373-8200
          </a>
          : ask about emergency help for tonight.
        </li>
        <li>In winter (roughly mid-November to early March), the county runs an overnight warming center. 211 has the current location.</li>
      </ul>
    </section>
  );
}
