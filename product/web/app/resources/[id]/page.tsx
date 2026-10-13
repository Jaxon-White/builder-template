import Link from "next/link";
import { notFound } from "next/navigation";
import { Handoff } from "@/components/handoff";
import { CallAheadWarning, OpenBadge } from "@/components/resource-card";
import { getResource } from "@/lib/data";
import { checkedAgoText, needsCallAhead } from "@/lib/freshness";
import { isOpenNow } from "@/lib/hours";
import { AUDIENCE_LABELS, CATEGORY_LABELS } from "@/lib/types";

export default async function ResourcePage({ params }: PageProps<"/resources/[id]">) {
  const { id } = await params;
  const r = await getResource(id);
  if (!r) notFound();

  const facts: [string, string][] = [
    ["Hours", r.hoursText],
    ["Where", `${r.address}, ${r.city}`],
    ["Phone", r.phone],
    ["Who it serves", r.serves.map((s) => AUDIENCE_LABELS[s]).join(", ")],
    ["Eligibility", r.eligibility],
    ["Walk-ins", r.walkIn ? "Yes" : "Call first"],
    ["Pets", r.petsAllowed ? "Allowed" : "Not allowed"],
    ["Cost", r.free ? "Free" : "Low cost / sliding scale"],
  ];
  if (r.alsoOffers.length) facts.push(["Also offers", r.alsoOffers.map((c) => CATEGORY_LABELS[c]).join(", ")]);

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          {CATEGORY_LABELS[r.category]} · {r.city}
        </span>
        <h1 className="text-2xl font-semibold leading-snug">{r.name}</h1>
        <OpenBadge open={isOpenNow(r)} always={r.open24h} />
        <p className="text-base">{r.description}</p>
      </section>

      {r.status === "closed" ? (
        <p className="rounded-2xl bg-rose-50 p-4 text-sm font-medium text-rose-900">
          Marked closed on the last upkeep call. Don&apos;t send anyone here.
        </p>
      ) : (
        needsCallAhead(r) && <CallAheadWarning unreachable={r.status === "unreachable"} />
      )}

      <Handoff resource={r} size="lg" />

      <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 text-sm">
            <dt className="font-medium text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <p className="text-xs text-muted">
        {checkedAgoText(r)} ({r.lastVerified}). Call ahead to confirm.
      </p>

      <Link href="/resources" className="inline-block text-sm font-medium text-primary underline">
        ← All resources
      </Link>
    </div>
  );
}
