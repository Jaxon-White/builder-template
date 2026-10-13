import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getAllResourcesForUpkeep } from "@/lib/data";
import { freshness } from "@/lib/freshness";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/types";

export default async function Home({ searchParams }: PageProps<"/">) {
  const user = await requireUser();
  const denied = (await searchParams).denied === "1";

  return (
    <div className="space-y-8">
      {denied && (
        <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          That page is only for upkeep volunteers.
        </p>
      )}
      {user.role === "upkeep" ? <UpkeepChoices /> : <OutreachHome />}
    </div>
  );
}

/** Upkeep volunteers do two jobs, so they pick one instead of landing in either. */
async function UpkeepChoices() {
  const all = await getAllResourcesForUpkeep();
  const toCall = all.filter(
    (r) => r.status === "unreachable" || (r.status !== "closed" && freshness(r) !== "current"),
  ).length;

  return (
    <>
      <section className="space-y-2 pt-2">
        <h1 className="text-3xl font-semibold leading-tight">What would you like to do?</h1>
      </section>

      <div className="space-y-3">
        <Choice
          href="/intake"
          primary
          title="Help someone right now"
          detail="Answer a few questions and find shelter, food and care"
        />
        <Choice
          href="/upkeep"
          title="Monthly upkeep calls"
          detail={
            toCall === 0
              ? "Everything is up to date"
              : `${toCall} ${toCall === 1 ? "place is" : "places are"} due for a call`
          }
        />
        <Choice href="/resources" title="Browse all resources" detail="Search and filter the full list" />
      </div>
    </>
  );
}

function Choice({ href, title, detail, primary }: { href: string; title: string; detail: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex min-h-20 items-center justify-between gap-4 rounded-2xl p-5 shadow-sm active:scale-[0.99] ${
        primary
          ? "bg-primary text-white hover:bg-primary-hover"
          : "border border-border bg-surface hover:border-primary"
      }`}
    >
      <span>
        <span className="block text-lg font-semibold">{title}</span>
        <span className={`block text-sm ${primary ? "text-white/80" : "text-muted"}`}>{detail}</span>
      </span>
      <span aria-hidden className="text-xl">
        →
      </span>
    </Link>
  );
}

function OutreachHome() {
  return (
    <>
      <section className="space-y-3 pt-2">
        <h1 className="text-3xl font-semibold leading-tight">Someone needs help right now?</h1>
        <p className="text-base text-muted">
          Answer a few quick questions and we&apos;ll show you who can help, with a number to call
          and directions to share.
        </p>
      </section>

      <Link
        href="/intake"
        className="flex min-h-16 items-center justify-center rounded-2xl bg-primary px-6 text-lg font-semibold text-white shadow-sm active:scale-[0.99] hover:bg-primary-hover"
      >
        Find help for someone
      </Link>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Or browse by need</h2>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/resources?category=${c}&near=1`}
              className="flex min-h-12 items-center rounded-xl border border-border bg-surface px-4 text-sm font-medium hover:border-primary"
            >
              {CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
