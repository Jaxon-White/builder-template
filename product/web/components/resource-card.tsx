import Link from "next/link";
import { Handoff } from "@/components/handoff";
import { CATEGORY_LABELS, type Resource } from "@/lib/types";

export function OpenBadge({ open, always }: { open: boolean; always?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${open ? "text-open" : "text-closed"}`}
    >
      <span className={`h-2 w-2 rounded-full ${open ? "bg-open" : "bg-closed"}`} aria-hidden />
      {always ? "Open 24 hours" : open ? "Open now" : "Closed now"}
    </span>
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
          <OpenBadge open={openNow} always={r.open24h} />
        </div>
        <h3 className="text-lg font-semibold leading-snug">{r.name}</h3>
        {reasons && reasons.length > 0 ? (
          <p className="text-sm font-medium text-primary">{reasons.slice(0, 3).join(" · ")}</p>
        ) : (
          <p className="text-sm text-muted">{r.description}</p>
        )}
        <p className="text-sm text-muted">{r.hoursText}</p>
        <span className="text-sm font-medium text-primary underline underline-offset-2">Details</span>
      </Link>
      <Handoff resource={r} />
    </article>
  );
}
