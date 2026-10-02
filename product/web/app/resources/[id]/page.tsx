import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Handoff } from "@/components/handoff";
import { OpenBadge } from "@/components/resource-card";
import { resources } from "@/lib/data";
import { isOpenNow } from "@/lib/hours";
import { AUDIENCE_LABELS, CATEGORY_LABELS } from "@/lib/types";

export default async function ResourcePage({ params }: PageProps<"/resources/[id]">) {
  // "Open now" depends on the current time, so render on every request.
  await connection();
  const { id } = await params;
  const r = await resources.getResource(id);
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

      <Handoff resource={r} size="lg" />

      <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 text-sm">
            <dt className="font-medium text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <p className="text-xs text-muted">Last checked {r.lastVerified}. Call ahead to confirm.</p>

      <Link href="/resources" className="inline-block text-sm font-medium text-primary underline">
        ← All resources
      </Link>
    </div>
  );
}
