"use client";

import { useState } from "react";
import { DAYS, type DailyHours, type Day } from "@/lib/types";

type Row = { closed: boolean; opens: string; closes: string };

function toRow(value: string): Row {
  const [opens, closes] = value.split("-");
  return value ? { closed: false, opens, closes } : { closed: true, opens: "09:00", closes: "17:00" };
}

/**
 * One row per day: opening and closing time, or Closed. Submitted as open-Mon (checked when open),
 * opens-Mon and closes-Mon; the save action turns them back into "HH:MM-HH:MM".
 */
export function DailyHoursFields({ hours }: { hours: DailyHours }) {
  const [rows, setRows] = useState<Record<Day, Row>>(
    () => Object.fromEntries(DAYS.map((d) => [d, toRow(hours[`hours${d}`])])) as Record<Day, Row>,
  );
  const firstOpen = (["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as Day[]).find((d) => !rows[d].closed);

  function update(day: Day, change: Partial<Row>) {
    setRows({ ...rows, [day]: { ...rows[day], ...change } });
  }

  function copyToOpenDays() {
    if (!firstOpen) return;
    const { opens, closes } = rows[firstOpen];
    setRows(
      Object.fromEntries(DAYS.map((d) => [d, rows[d].closed ? rows[d] : { ...rows[d], opens, closes }])) as Record<
        Day,
        Row
      >,
    );
  }

  const time =
    "min-h-11 w-full min-w-0 rounded-xl border border-border bg-surface px-2 text-base outline-none focus:border-primary";

  return (
    <fieldset className="space-y-2">
      <legend className="pb-1.5 text-sm font-medium text-muted">
        Hours each day <span className="font-normal">(tap a day to mark it open or closed)</span>
      </legend>
      {DAYS.map((d) => (
        <div key={d} className="grid grid-cols-[3.25rem_1fr_1fr] items-center gap-2">
          <label className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-border text-sm font-semibold has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white">
            <input
              type="checkbox"
              name={`open-${d}`}
              checked={!rows[d].closed}
              onChange={(e) => update(d, { closed: !e.target.checked })}
              className="sr-only"
            />
            {d}
          </label>
          {rows[d].closed ? (
            <span className="col-span-2 text-sm text-muted">Closed</span>
          ) : (
            <>
              <input
                type="time"
                name={`opens-${d}`}
                value={rows[d].opens}
                onChange={(e) => update(d, { opens: e.target.value })}
                aria-label={`${d} opens`}
                className={time}
              />
              <input
                type="time"
                name={`closes-${d}`}
                value={rows[d].closes}
                onChange={(e) => update(d, { closes: e.target.value })}
                aria-label={`${d} closes`}
                className={time}
              />
            </>
          )}
        </div>
      ))}
      {firstOpen && (
        <button
          type="button"
          onClick={copyToOpenDays}
          className="min-h-10 rounded-xl border border-primary bg-primary-soft px-3 text-sm font-semibold text-primary"
        >
          Copy {firstOpen}&apos;s hours to all open days
        </button>
      )}
    </fieldset>
  );
}
