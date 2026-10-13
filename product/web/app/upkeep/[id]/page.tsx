import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllResourcesForUpkeep, getChecks } from "@/lib/data";
import { checkedAgoText } from "@/lib/freshness";
import { DAYS, OUTCOME_LABELS, type CheckOutcome } from "@/lib/types";
import { recordCheck } from "../actions";

const OUTCOME_HINTS: Record<CheckOutcome, string> = {
  running: "Marks it checked today",
  closed: "Hides it from leaders",
  unreachable: "Leaders see a 'call ahead' warning",
};

const FIELD_LABELS: Record<string, string> = {
  phone: "phone",
  address: "address",
  city: "city",
  hoursText: "hours",
  opensAt: "opening time",
  closesAt: "closing time",
  openDays: "open days",
  eligibility: "eligibility",
  description: "description",
};

export default async function RecordCallPage({ params, searchParams }: PageProps<"/upkeep/[id]">) {
  const { id } = await params;
  // Upkeep-only read: this also enforces the role.
  const r = (await getAllResourcesForUpkeep()).find((x) => x.id === id);
  if (!r) notFound();
  const checks = await getChecks(id);
  const missingOutcome = (await searchParams).error === "outcome";

  const input =
    "min-h-12 w-full rounded-xl border border-border bg-surface px-3 text-base outline-none focus:border-primary";

  return (
    <div className="space-y-6">
      <Link href="/upkeep" className="text-sm font-medium text-primary underline">
        ← Call list
      </Link>

      <section className="space-y-1">
        <h1 className="text-2xl font-semibold leading-snug">{r.name}</h1>
        <p className="text-sm text-muted">
          {r.city} · {checkedAgoText(r)}
        </p>
      </section>

      <a
        href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}
        className="flex min-h-14 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white hover:bg-primary-hover"
      >
        Call {r.phone}
      </a>

      <form action={recordCheck.bind(null, r.id)} className="space-y-6">
        <fieldset className="space-y-2">
          <legend className="pb-2 text-lg font-semibold">How did the call go?</legend>
          {missingOutcome && <p className="text-sm font-medium text-rose-700">Pick one to save.</p>}
          {(Object.keys(OUTCOME_LABELS) as CheckOutcome[]).map((o) => (
            <label
              key={o}
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 border-border bg-surface px-4 has-[:checked]:border-primary has-[:checked]:bg-primary-soft"
            >
              <input type="radio" name="outcome" value={o} required className="h-5 w-5 accent-[var(--primary)]" />
              <span>
                <span className="block font-medium">{OUTCOME_LABELS[o]}</span>
                <span className="block text-xs text-muted">{OUTCOME_HINTS[o]}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <details className="rounded-2xl border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-3 font-semibold">Fix details (hours, phone…)</summary>
          <div className="space-y-4 px-4 pb-4">
            <Field label="Phone">
              <input name="phone" defaultValue={r.phone} inputMode="tel" className={input} />
            </Field>
            <Field label="Address">
              <input name="address" defaultValue={r.address} className={input} />
            </Field>
            <Field label="City">
              <input name="city" defaultValue={r.city} className={input} />
            </Field>
            <Field label="Hours (as leaders will read it)">
              <input name="hoursText" defaultValue={r.hoursText} className={input} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Opens">
                <input type="time" name="opensAt" defaultValue={r.opensAt} className={input} />
              </Field>
              <Field label="Closes">
                <input type="time" name="closesAt" defaultValue={r.closesAt} className={input} />
              </Field>
            </div>
            <fieldset>
              <legend className="pb-1.5 text-sm font-medium text-muted">Open days</legend>
              <div className="flex flex-wrap gap-1.5">
                {DAYS.map((d) => (
                  <label
                    key={d}
                    className="flex min-h-10 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-border px-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white"
                  >
                    <input type="checkbox" name="openDays" value={d} defaultChecked={r.openDays.includes(d)} className="sr-only" />
                    {d}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field label="Eligibility">
              <textarea name="eligibility" defaultValue={r.eligibility} rows={2} className={`${input} py-2`} />
            </Field>
            <Field label="Description">
              <textarea name="description" defaultValue={r.description} rows={3} className={`${input} py-2`} />
            </Field>
          </div>
        </details>

        <Field label="Note (optional)">
          <textarea
            name="note"
            rows={3}
            placeholder="e.g. Beds usually full on weekends"
            className={`${input} py-2`}
          />
        </Field>

        <button
          type="submit"
          className="min-h-14 w-full rounded-2xl bg-primary text-lg font-semibold text-white hover:bg-primary-hover"
        >
          Save call
        </button>
      </form>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Call history</h2>
        {checks.length === 0 ? (
          <p className="text-sm text-muted">No calls recorded yet.</p>
        ) : (
          <ul className="space-y-2">
            {checks.map((c) => (
              <li key={c.id} className="rounded-2xl border border-border bg-surface p-3 text-sm">
                <p className="font-medium">
                  {OUTCOME_LABELS[c.outcome]} ·{" "}
                  <span className="font-normal text-muted">
                    {new Date(c.at).toLocaleString("en-US", {
                      timeZone: "America/Denver",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    by {c.by}
                  </span>
                </p>
                {c.changedFields.length > 0 && (
                  <p className="text-muted">Updated {c.changedFields.map((f) => FIELD_LABELS[f] ?? f).join(", ")}</p>
                )}
                {c.note && <p className="pt-1">&ldquo;{c.note}&rdquo;</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
