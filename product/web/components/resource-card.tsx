import Link from "next/link";
import { Handoff } from "@/components/handoff";
import { callAheadReason, checkedAgoText, type CallAheadReason } from "@/lib/freshness";
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
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {CATEGORY_LABELS[r.category]} · {r.city}
          </span>
          <OpenBadge open={openNow} always={r.open24h} unknown={!r.hoursKnown} />
        </div>
        <h3 className="text-lg font-semibold leading-snug">{r.name}</h3>
        {reasons && reasons.length > 0 ? (
          <p className="text-sm font-medium text-primary">{reasons.slice(0, 3).join(" · ")}</p>
        ) : (
          <p className="text-sm text-muted">{r.description}</p>
        )}
        <p className="text-sm text-muted">{r.hoursText}</p>
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
