import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { getFinderResources } from "@/lib/data";
import { milesFromProvo, NEARBY_RADIUS_MILES, distanceText } from "@/lib/geo";
import { isOpenNow } from "@/lib/hours";
import {
  AUDIENCE_LABELS,
  CATEGORY_LABELS,
  SHOWN_CATEGORIES,
  type Audience,
  type Category,
} from "@/lib/types";

const SERVES_FILTERS: Audience[] = ["families", "men", "women", "youth", "veterans"];

type Filters = { q: string; category: string; open: string; serves: string; near: string };

function hrefWith(current: Filters, change: Partial<Filters>) {
  const next = { ...current, ...change };
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) q.set(k, v);
  const s = q.toString();
  return s ? `/resources?${s}` : "/resources";
}

export default async function ResourcesPage({ searchParams }: PageProps<"/resources">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const f: Filters = {
    q: one(sp.q),
    category: one(sp.category),
    open: one(sp.open),
    serves: one(sp.serves),
    near: one(sp.near),
  };

  const now = new Date();
  const query = f.q.trim().toLowerCase();
  const matching = (await getFinderResources())
    .map((r) => ({ r, open: isOpenNow(r, now), miles: milesFromProvo(r) }))
    .filter(({ r, open }) => {
      if (f.category && r.category !== f.category && !r.alsoOffers.includes(f.category as Category)) return false;
      if (f.open && !open) return false;
      if (f.serves && !r.serves.includes(f.serves as Audience) && !r.serves.includes("everyone")) return false;
      if (query) {
        const haystack = [r.name, r.description, r.city, CATEGORY_LABELS[r.category], r.eligibility]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

  // Browse by need (near=1): keep places within the radius, plus the confidential-address place
  // (no coordinates) labeled as such. Nearest first, unknown distance last.
  const nearMode = f.near === "1";
  const results = (
    nearMode
      ? matching
          .filter(({ miles }) => miles === null || miles <= NEARBY_RADIUS_MILES)
          .sort(
            (a, b) =>
              (a.miles ?? Infinity) - (b.miles ?? Infinity) || a.r.name.localeCompare(b.r.name),
          )
      : matching.sort((a, b) => Number(b.open) - Number(a.open) || a.r.name.localeCompare(b.r.name))
  ).map(({ r, open, miles }) => ({
    r,
    open,
    distanceLabel: !nearMode
      ? undefined
      : miles !== null
        ? distanceText(miles)
        : r.address.toLowerCase().includes("confidential")
          ? "Location confidential. Call first."
          : undefined,
  }));

  const hasFilters = Boolean(f.q || f.category || f.open || f.serves || f.near);
  const outsideCount = nearMode ? matching.length - results.length : 0;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All resources</h1>

      <form action="/resources" role="search" className="flex gap-2">
        {f.category && <input type="hidden" name="category" value={f.category} />}
        {f.open && <input type="hidden" name="open" value={f.open} />}
        {f.serves && <input type="hidden" name="serves" value={f.serves} />}
        {f.near && <input type="hidden" name="near" value={f.near} />}
        <input
          type="search"
          name="q"
          defaultValue={f.q}
          placeholder="Search by name, city or need"
          aria-label="Search resources"
          className="min-h-12 flex-1 rounded-xl border border-border bg-surface px-4 text-base outline-none focus:border-primary"
        />
        <button type="submit" className="min-h-12 rounded-xl bg-primary px-4 font-semibold text-white">
          Search
        </button>
      </form>

      <ChipRow label="Need">
        {SHOWN_CATEGORIES.map((c) => (
          <Chip key={c} href={hrefWith(f, { category: f.category === c ? "" : c })} active={f.category === c}>
            {CATEGORY_LABELS[c]}
          </Chip>
        ))}
      </ChipRow>

      <ChipRow label="Serves">
        <Chip href={hrefWith(f, { open: f.open ? "" : "1" })} active={Boolean(f.open)}>
          Open now
        </Chip>
        {SERVES_FILTERS.map((a) => (
          <Chip key={a} href={hrefWith(f, { serves: f.serves === a ? "" : a })} active={f.serves === a}>
            {AUDIENCE_LABELS[a]}
          </Chip>
        ))}
      </ChipRow>

      {nearMode && (
        <p className="rounded-xl bg-surface px-4 py-3 text-sm text-muted">
          Showing places within {NEARBY_RADIUS_MILES} miles of Provo city center, nearest first.{" "}
          <Link href={hrefWith(f, { near: "" })} className="font-medium text-primary underline">
            Show places farther away
          </Link>
        </p>
      )}

      <div className="flex items-center justify-between pt-1 text-sm text-muted">
        <span>
          {results.length} {results.length === 1 ? "result" : "results"}
          {nearMode && outsideCount > 0 ? ` (${outsideCount} farther away not shown)` : ""}
        </span>
        {hasFilters && (
          <Link href="/resources" className="font-medium text-primary underline">
            Clear filters
          </Link>
        )}
      </div>

      {results.length === 0 ? (
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5">
          <p>
            {nearMode
              ? `Nothing within ${NEARBY_RADIUS_MILES} miles of Provo city center for this need.`
              : "Nothing matches these filters."}
          </p>
          {nearMode && (
            <Link href={hrefWith(f, { near: "" })} className="font-medium text-primary underline">
              Show places farther away
            </Link>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {results.map(({ r, open, distanceLabel }) => (
            <li key={r.id}>
              <ResourceCard resource={r} openNow={open} distanceLabel={distanceLabel} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]" aria-label={label}>
      <div className="flex w-max gap-2">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`flex min-h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium ${
        active ? "border-primary bg-primary text-white" : "border-border bg-surface hover:border-primary"
      }`}
    >
      {children}
    </Link>
  );
}
