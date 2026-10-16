import Link from "next/link";
import { Handoff } from "@/components/handoff";
import { callAheadReason, checkedAgoText, isVetted, type CallAheadReason } from "@/lib/freshness";
import { hoursLine } from "@/lib/hours";
import { CATEGORY_LABELS, type Resource } from "@/lib/types";

export function OpenBadge({ open, always, unknown }: { open: boolean; always?: boolean; unknown?: boolean }) {
  if (unknown && !always) {
    return <span className="text-xs font-semibold text-muted">Call for hours</span>;
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${open ? "text-open" : "text-closed"}`}
    >
      <span className={`h-2 w-2 rounded-full ${open ? "bg-open" : "bg-closed"}`} aria-hidden />
      {always ? "Open 24 hours" : open ? "Open now" : "Closed now"}
    </span>
  );
}

/** Vetted = confirmed by phone recently (see isVetted). `detail` adds when it was checked. */
export function VettedBadge({ resource: r, detail }: { resource: Resource; detail?: boolean }) {
  const vetted = isVetted(r);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        vetted ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
      }`}
    >
      <span aria-hidden>{vetted ? "✓" : "!"}</span>
      {vetted ? "Vetted" : "Not vetted"}
      {detail && vetted && <span className="font-normal">· {checkedAgoText(r).toLowerCase()}</span>}
    </span>
  );
}

const CALL_AHEAD_TEXT: Record<CallAheadReason, string> = {
  unreachable: "Couldn't reach them on the last check.",
  unconfirmed: "Not confirmed by phone yet.",
  stale: "Not checked in over 2 months.",
};

export function CallAheadWarning({ reason }: { reason: CallAheadReason }) {
  return (
    <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">
      {CALL_AHEAD_TEXT[reason]} Call ahead before sending someone.
    </p>
  );
}

export function ResourceCard({
  resource: r,
  openNow,
  reasons,
}: {
  resource: Resource;
  openNow: boolean;
  reasons?: string[];
}) {
  return (
    <article className="space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <Link href={`/resources/${r.id}`} className="block space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {CATEGORY_LABELS[r.category]} · {r.city}
          </span>
          <span className="flex items-center gap-2">
            <VettedBadge resource={r} />
            <OpenBadge open={openNow} always={r.open24h} unknown={!r.hoursKnown} />
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">{r.name}</h3>
        {reasons && reasons.length > 0 ? (
          <p className="text-sm font-medium text-primary">{reasons.slice(0, 3).join(" · ")}</p>
        ) : (
          <p className="text-sm text-muted">{r.description}</p>
        )}
        <p className="text-sm text-muted">{hoursLine(r)}</p>
        {r.lastVerified && <p className="text-xs text-muted">{checkedAgoText(r)}</p>}
        <span className="text-sm font-medium text-primary underline underline-offset-2">Details</span>
      </Link>
      <CallAhead resource={r} />
      <Handoff resource={r} />
    </article>
  );
}

function CallAhead({ resource }: { resource: Resource }) {
  const reason = callAheadReason(resource);
  return reason ? <CallAheadWarning reason={reason} /> : null;
}
