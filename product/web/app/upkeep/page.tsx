import Link from "next/link";
import { getAllResourcesForUpkeep } from "@/lib/data";
import { checkedAgoText, daysSinceChecked, freshness, type Freshness } from "@/lib/freshness";
import type { Resource } from "@/lib/types";

type QueueStatus = Freshness | "unreachable" | "closed";

function queueStatus(r: Resource, now: Date): QueueStatus {
  if (r.status === "closed") return "closed";
  if (r.status === "unreachable") return "unreachable";
  return freshness(r, now);
}

// Most urgent first: unreachable places may be gone, then overdue, due, current, closed.
const ORDER: QueueStatus[] = ["unreachable", "overdue", "due", "current", "closed"];

const BADGES: Record<QueueStatus, { label: string; className: string }> = {
  unreachable: { label: "Couldn't reach", className: "bg-rose-100 text-rose-900" },
  overdue: { label: "Overdue", className: "bg-rose-100 text-rose-900" },
  due: { label: "Due", className: "bg-amber-100 text-amber-900" },
  current: { label: "Up to date", className: "bg-emerald-100 text-emerald-900" },
  closed: { label: "Closed", className: "bg-stone-200 text-stone-700" },
};

export default async function UpkeepPage({ searchParams }: PageProps<"/upkeep">) {
  const all = await getAllResourcesForUpkeep();
  const saved = (await searchParams).saved;
  const savedName = all.find((r) => r.id === saved)?.name;

  const now = new Date();
  const rows = all
    .map((r) => ({ r, status: queueStatus(r, now), days: daysSinceChecked(r, now) }))
    .sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status) || b.days - a.days);

  const count = (s: QueueStatus) => rows.filter((row) => row.status === s).length;
  const toCall = count("overdue") + count("due") + count("unreachable");

  return (
    <div className="space-y-5">
      {savedName && (
        <p role="status" className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900">
          Saved your call to {savedName}.
        </p>
      )}

      <Link
        href="/intake"
        className="flex items-center justify-between rounded-2xl bg-primary p-4 font-semibold text-white hover:bg-primary-hover"
      >
        <span>
          Helping someone right now?
          <span className="block text-sm font-normal text-white/80">Find shelter, food and care</span>
        </span>
        <span aria-hidden>→</span>
      </Link>

      <section className="space-y-1">
        <h1 className="text-2xl font-semibold">Monthly upkeep calls</h1>
        <p className="text-sm text-muted">
          Call each place about once a month to make sure it&apos;s still running.
        </p>
      </section>

      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat value={toCall} label="To call" strong />
        <Stat value={count("overdue") + count("unreachable")} label="Overdue / unreachable" />
        <Stat value={count("current")} label="Up to date" />
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {rows.map(({ r, status }) => (
          <li key={r.id}>
            <Link href={`/upkeep/${r.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-background">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{r.name}</p>
                <p className="text-sm text-muted">
                  {r.city} · {checkedAgoText(r, now)}
                </p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${BADGES[status].className}`}>
                {BADGES[status].label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ value, label, strong }: { value: number; label: string; strong?: boolean }) {
  return (
    <div className={`rounded-2xl border p-3 ${strong ? "border-primary bg-primary-soft" : "border-border bg-surface"}`}>
      <p className={`text-2xl font-semibold ${strong ? "text-primary" : ""}`}>{value}</p>
      <p className="text-xs leading-tight text-muted">{label}</p>
    </div>
  );
}
