import Link from "next/link";
import { notFound } from "next/navigation";
import { Handoff } from "@/components/handoff";
import { CallAheadWarning, OpenBadge, VettedBadge } from "@/components/resource-card";
import { getResource } from "@/lib/data";
import { callAheadReason, checkedAgoText } from "@/lib/freshness";
import { hoursSummary, isOpenNow } from "@/lib/hours";
import { AUDIENCE_LABELS, CATEGORY_LABELS, STATE_NAMES } from "@/lib/types";

export default async function ResourcePage({ params }: PageProps<"/resources/[id]">) {
  const { id } = await params;
  const r = await getResource(id);
  if (!r) notFound();

  const facts: [string, React.ReactNode][] = [
    [
      "Hours",
      <>
        {hoursSummary(r)}
        {r.hoursNote && <span className="block pt-1 text-muted">{r.hoursNote}</span>}
      </>,
    ],
    ["Where", `${r.address}, ${r.city}`],
    ["County / State", `${r.county}, ${STATE_NAMES[r.state] ?? r.state}`],
    ["Phone", r.phone],
    ["Who it serves", r.serves.map((s) => AUDIENCE_LABELS[s]).join(", ")],
    ["Eligibility", r.eligibility],
    ["Walk-ins", r.walkIn ? "Yes" : "Call first"],
    ["Pets", r.petsAllowed ? "Allowed" : "Not allowed"],
    ["Cost", r.free ? "Free" : "Fees apply; see details or call"],
  ];
  if (r.alsoOffers.length) facts.push(["Also offers", r.alsoOffers.map((c) => CATEGORY_LABELS[c]).join(", ")]);

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          {CATEGORY_LABELS[r.category]} · {r.city}
        </span>
        <h1 className="text-2xl font-semibold leading-snug">{r.name}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <VettedBadge resource={r} detail />
          <OpenBadge open={isOpenNow(r)} always={r.open24h} unknown={!r.hoursKnown} />
        </div>
        <p className="text-base">{r.description}</p>
      </section>

      {r.status === "closed" ? (
        <p className="rounded-2xl bg-rose-50 p-4 text-sm font-medium text-rose-900">
          Marked closed on the last upkeep call. Don&apos;t send anyone here.
        </p>
      ) : (
        callAheadReason(r) && <CallAheadWarning reason={callAheadReason(r)!} />
      )}

      <Handoff resource={r} size="lg" />

      <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 text-sm">
            <dt className="font-medium text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        {r.website && (
          <div className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 text-sm">
            <dt className="font-medium text-muted">Website</dt>
            <dd className="min-w-0 break-words">
              <a href={r.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
                {r.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <section className="space-y-4 rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-lg font-semibold">Details for helping someone</h2>
        <Detail title="Who qualifies">
          {r.qualifiers.length > 0 && (
            <ul className="list-disc space-y-1 pl-5">
              {r.qualifiers.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          )}
        </Detail>
        <Detail title="How to apply">{r.howToApply}</Detail>
        <Detail title="What to bring">
          {r.whatToBring.length > 0 && (
            <ul className="list-disc space-y-1 pl-5">
              {r.whatToBring.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          )}
        </Detail>
        <Detail title="Languages">{r.languages}</Detail>
        <Detail title="Sources">
          {r.factSources.length > 0 && (
            <ul className="space-y-1">
              {r.factSources.map((u) => (
                <li key={u} className="min-w-0 break-words">
                  <a href={u} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {sourceLabel(u)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Detail>
        <p className="text-xs text-muted">
          Details come from each organization&apos;s own pages and can change. Confirm on the call.
        </p>
      </section>

      <p className="text-xs text-muted">
        {checkedAgoText(r)}
        {r.lastVerified && ` (${r.lastVerified})`}. Call ahead to confirm.
        {r.source && (
          <>
            {" "}
            <a href={r.source} target="_blank" rel="noopener noreferrer" className="underline">
              Where the contact info came from
            </a>
          </>
        )}
      </p>

      <Link href="/resources" className="inline-block text-sm font-medium text-primary underline">
        ← All resources
      </Link>
    </div>
  );
}

/** One detail section. Empty sections say "Call to ask" so missionaries know to ask on the call. */
function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  const empty = children === "" || children === false || children == null;
  return (
    <div className="space-y-1 text-sm">
      <h3 className="font-semibold">{title}</h3>
      {empty ? <p className="text-muted">Call to ask.</p> : <div>{children}</div>}
    </div>
  );
}

/** "jobs.utah.gov › foodstamps › requirements" instead of a long URL. */
function sourceLabel(url: string): string {
  const { hostname, pathname } = new URL(url);
  const parts = pathname
    .split("/")
    .filter(Boolean)
    .map((p) => decodeURIComponent(p).replace(/\.html?$/, "").replace(/[_-]+/g, " "))
    .slice(-2);
  return [hostname.replace(/^www\./, ""), ...parts].join(" › ");
}
