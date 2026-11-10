import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";
import { getFinderResources } from "@/lib/data";
import { isOpenNow } from "@/lib/hours";
import { categoriesOffered } from "@/lib/match";
import { searchWords } from "@/lib/search";
import { CATEGORY_COVERS, SUBCATEGORIES } from "@/lib/subcategories";
import {
  CATEGORY_LABELS,
  FOR_GROUP_INFO,
  FOR_GROUPS,
  STATE_NAMES,
  toCategory,
  toForGroup,
  type Category,
  type ForGroup,
} from "@/lib/types";

type Filters = { q: string; category: string; sub: string; open: string; serves: string };

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
    category: toCategory(one(sp.category)) ?? "",
    sub: "",
    open: one(sp.open),
    serves: toForGroup(one(sp.serves)) ?? "",
  };
  const active = f.category as Category;
  // A subcategory only counts inside its category (HQ reuses some names, like "Meals").
  if (f.category && SUBCATEGORIES[active].some((s) => s.name === one(sp.sub))) f.sub = one(sp.sub);

  const now = new Date();
  // Every word has to match somewhere, so "food utah county" finds food places in Utah County.
  const words = searchWords(f.q);
  const all = await getFinderResources();
  // Keep an active filter visible even if nothing offers it any more, so it can be cleared.
  const offered = categoriesOffered(all);
  const needChips = f.category && !offered.includes(active) ? [...offered, active] : offered;
  const inCategory = all.filter((r) => r.category === active || r.alsoOffers.includes(active));
  const subChips = f.category
    ? SUBCATEGORIES[active].filter((s) => s.name === f.sub || inCategory.some((r) => r.subcategories.includes(s.name)))
    : [];
  const subInfo = subChips.find((s) => s.name === f.sub);
  // Only groups some place is restricted to; everywhere else is open to all of them.
  const groupChips = FOR_GROUPS.filter((g) => g === f.serves || all.some((r) => r.serves.includes(g)));
  const results = all
    .map((r) => ({ r, open: isOpenNow(r, now) }))
    .filter(({ r, open }) => {
      if (f.category && r.category !== f.category && !r.alsoOffers.includes(f.category as Category)) return false;
      if (f.sub && !r.subcategories.includes(f.sub)) return false;
      if (f.open && !open) return false;
      if (f.serves) {
        if (r.serves.length > 0 && !r.serves.includes(f.serves as ForGroup)) return false;
        if (f.serves === "families" && r.noChildren) return false;
      }
      if (words.length) {
        const haystack = [
          r.name,
          r.description,
          r.address,
          r.city,
          r.county,
          r.state,
          STATE_NAMES[r.state] ?? "",
          CATEGORY_LABELS[r.category],
          ...r.alsoOffers.map((c) => CATEGORY_LABELS[c]),
          ...r.subcategories,
          ...r.tags,
          r.eligibility,
        ]
          .join(" ")
          .toLowerCase();
        if (!words.every((w) => haystack.includes(w))) return false;
      }
      return true;
    })
    .sort((a, b) => Number(b.open) - Number(a.open) || a.r.name.localeCompare(b.r.name));

  const hasFilters = Boolean(f.q || f.category || f.sub || f.open || f.serves);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All resources</h1>

      <form action="/resources" role="search" className="flex gap-2">
        {f.category && <input type="hidden" name="category" value={f.category} />}
        {f.sub && <input type="hidden" name="sub" value={f.sub} />}
        {f.open && <input type="hidden" name="open" value={f.open} />}
        {f.serves && <input type="hidden" name="serves" value={f.serves} />}
        <input
          type="search"
          name="q"
          defaultValue={f.q}
          placeholder="Search by name, city, county, state or need"
          aria-label="Search resources"
          className="min-h-12 flex-1 rounded-xl border border-border bg-surface px-4 text-base outline-none focus:border-primary"
        />
        <button type="submit" className="min-h-12 rounded-xl bg-primary px-4 font-semibold text-white">
          Search
        </button>
      </form>

      <ChipRow label="Need">
        {needChips.map((c) => (
          <Chip key={c} href={hrefWith(f, { category: f.category === c ? "" : c, sub: "" })} active={f.category === c}>
            {CATEGORY_LABELS[c]}
          </Chip>
        ))}
      </ChipRow>

      {f.category && (
        <div className="space-y-2">
          <p className="text-sm text-muted">
            <span className="font-semibold text-foreground">{CATEGORY_LABELS[active]}:</span> {CATEGORY_COVERS[active]}
          </p>
          {subChips.length > 0 && (
            <ChipRow label="Kind of help">
              {subChips.map((s) => (
                <Chip
                  key={s.name}
                  href={hrefWith(f, { sub: f.sub === s.name ? "" : s.name })}
                  active={f.sub === s.name}
                  title={s.definition}
                >
                  {s.name}
                </Chip>
              ))}
            </ChipRow>
          )}
          {subInfo && (
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">{subInfo.name}:</span> {subInfo.definition}
            </p>
          )}
        </div>
      )}

      <ChipRow label="For">
        <Chip href={hrefWith(f, { open: f.open ? "" : "1" })} active={Boolean(f.open)}>
          Open now
        </Chip>
        {groupChips.map((g) => (
          <Chip
            key={g}
            href={hrefWith(f, { serves: f.serves === g ? "" : g })}
            active={f.serves === g}
            title={FOR_GROUP_INFO[g].who}
          >
            {FOR_GROUP_INFO[g].label}
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

      {results.length === 0 && (
        <p className="rounded-2xl border border-border bg-surface p-4 text-sm">
          No place in the app matches yet. For other options, call{" "}
          <a href="tel:211" className="font-semibold text-primary underline">
            211
          </a>
          .
        </p>
      )}

      <ul className="space-y-3">
        {results.map(({ r, open }) => (
          <li key={r.id}>
            <ResourceCard resource={r} openNow={open} matchTerms={words} />
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

function Chip({
  href,
  active,
  title,
  children,
}: {
  href: string;
  active: boolean;
  /** Shown on hover: HQ's definition. */
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      title={title}
      aria-current={active ? "true" : undefined}
      className={`flex min-h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium ${
        active ? "border-primary bg-primary text-white" : "border-border bg-surface hover:border-primary"
      }`}
    >
      {children}
    </Link>
  );
}
