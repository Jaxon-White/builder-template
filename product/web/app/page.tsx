import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/types";

export default function Home() {
  return (
    <div className="space-y-8">
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
              href={`/resources?category=${c}`}
              className="flex min-h-12 items-center rounded-xl border border-border bg-surface px-4 text-sm font-medium hover:border-primary"
            >
              {CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
