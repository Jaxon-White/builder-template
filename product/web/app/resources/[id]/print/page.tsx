import { notFound } from "next/navigation";
import { getResource } from "@/lib/data";
import { hasStreetAddress, printableMapsLink } from "@/lib/contact";
import { checkedAgoText } from "@/lib/freshness";
import { hoursSummary } from "@/lib/hours";
import { STATE_NAMES } from "@/lib/types";
import { PrintOnLoad } from "./print-on-load";

/** A plain one-page sheet to hand to the person: how to reach the place and what to expect. */
export default async function PrintResourcePage({ params }: PageProps<"/resources/[id]/print">) {
  const { id } = await params;
  const r = await getResource(id);
  if (!r) notFound();

  const printed = new Date().toLocaleDateString("en-US", { timeZone: "America/Denver", dateStyle: "long" });
  const where = hasStreetAddress(r)
    ? `${r.address}, ${r.city}, ${STATE_NAMES[r.state] ?? r.state}`
    : `${r.address} (${r.city})`;

  return (
    <article className="space-y-4 text-[15px] leading-snug text-black">
      <PrintOnLoad />

      <header className="space-y-1 border-b border-black pb-3">
        <h1 className="text-2xl font-semibold">{r.name}</h1>
        <p>{r.description}</p>
      </header>

      <dl className="space-y-2">
        <Row label="Phone">
          <span className="text-lg font-semibold">{r.phone}</span>
        </Row>
        <Row label="Address">{where}</Row>
        {hasStreetAddress(r) && (
          <Row label="Directions">
            <span className="break-all">{printableMapsLink(r)}</span>
          </Row>
        )}
        <Row label="Hours">
          {hoursSummary(r)}
          {r.hoursNote && <span className="block">{r.hoursNote}</span>}
        </Row>
        {r.website && <Row label="Website">{r.website}</Row>}
      </dl>

      <Section title="Who qualifies" items={r.qualifiers} fallback={r.eligibility} />
      <Section title="How to apply" text={r.howToApply} />
      <Section title="What to bring" items={r.whatToBring} />
      {r.languages && <Section title="Languages" text={r.languages} />}

      <footer className="border-t border-black pt-2 text-xs">
        Printed {printed} from Resource Navigator. {checkedAgoText(r)}. Details can change, so call ahead
        to confirm.
      </footer>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-2">
      <dt className="font-semibold">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

function Section({ title, items, text, fallback }: { title: string; items?: string[]; text?: string; fallback?: string }) {
  const list = items ?? [];
  return (
    <section className="space-y-1">
      <h2 className="font-semibold">{title}</h2>
      {list.length > 0 ? (
        <ul className="list-disc space-y-0.5 pl-5">
          {list.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      ) : text ? (
        <p>{text}</p>
      ) : (
        <p>{fallback || "Call to ask."}</p>
      )}
    </section>
  );
}
