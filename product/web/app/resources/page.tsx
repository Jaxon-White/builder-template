import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { getFinderResources } from "@/lib/data";
import { isOpenNow } from "@/lib/hours";
import {
  AUDIENCE_LABELS,
  CATEGORIES,
  CATEGORY_LABELS,
  type Audience,
  type Category,
} from "@/lib/types";

const SERVES_FILTERS: Audience[] = ["families", "men", "women", "youth", "veterans"];

type Filters = { q: string; category: string; open: string; serves: string };

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
  const f: Filters = { q: one(sp.q), category: one(sp.category), open: one(sp.open), serves: one(sp.serves) };

  const now = new Date();
  const query = f.q.trim().toLowerCase();
  const results = (await getFinderResources())
    .map((r) => ({ r, open: isOpenNow(r, now) }))
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
    })
    .sort((a, b) => Number(b.open) - Number(a.open) || a.r.name.localeCompare(b.r.name));

  const hasFilters = Boolean(f.q || f.category || f.open || f.serves);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All resources</h1>

      <form action="/resources" role="search" className="flex gap-2">
        {f.category && <input type="hidden" name="category" value={f.category} />}
        {f.open && <input type="hidden" name="open" value={f.open} />}
        {f.serves && <input type="hidden" name="serves" value={f.serves} />}
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
        {CATEGORIES.map((c) => (
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

      <div className="flex items-center justify-between pt-1 text-sm text-muted">
        <span>
          {results.length} {results.length === 1 ? "result" : "results"}
        </span>
        {hasFilters && (
          <Link href="/resources" className="font-medium text-primary underline">
            Clear filters
          </Link>
        )}
      </div>

      <ul className="space-y-3">
        {results.map(({ r, open }) => (
          <li key={r.id}>
            <ResourceCard resource={r} openNow={open} />
          </li>
        ))}
      </ul>
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
