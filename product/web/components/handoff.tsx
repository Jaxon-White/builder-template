"use client";

import { useState } from "react";
import { hasStreetAddress, mapsHref, telHref } from "@/lib/contact";
import { hoursLine } from "@/lib/hours";
import type { Resource } from "@/lib/types";

function summary(r: Resource) {
  const where = hasStreetAddress(r) ? `${r.address}, ${r.city}` : r.address;
  const lines = [r.name, `Phone: ${r.phone}`, `Where: ${where}`, `Hours: ${hoursLine(r)}`];
  if (r.website) lines.push(`Website: ${r.website}`);
  return lines.join("\n");
}

/** Call, directions, share and print: the things a leader does once they've found a place. */
export function Handoff({ resource, size = "md" }: { resource: Resource; size?: "md" | "lg" }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = summary(resource);
    if (navigator.share) {
      try {
        // No `title`: the text already starts with the name, and apps like Messages paste both.
        await navigator.share({ text });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const btn =
    size === "lg"
      ? "min-h-14 rounded-2xl text-base"
      : "min-h-11 rounded-xl text-sm";

  return (
    <div className="grid grid-cols-4 gap-2">
      <a
        href={telHref(resource.phone)}
        className={`${btn} flex items-center justify-center bg-primary font-semibold text-white hover:bg-primary-hover`}
      >
        Call
      </a>
      {hasStreetAddress(resource) ? (
        <a
          href={mapsHref(resource)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} flex items-center justify-center border border-border bg-surface font-semibold hover:border-primary`}
        >
          Directions
        </a>
      ) : (
        <span
          className={`${btn} flex items-center justify-center border border-border bg-surface px-1 text-center text-muted`}
          title={resource.address}
        >
          Call for location
        </span>
      )}
      <button
        type="button"
        onClick={share}
        className={`${btn} flex items-center justify-center border border-border bg-surface font-semibold hover:border-primary`}
      >
        {copied ? "Copied" : "Share"}
      </button>
      <a
        href={`/resources/${resource.id}/print`}
        target="_blank"
        rel="noopener"
        className={`${btn} flex items-center justify-center border border-border bg-surface font-semibold hover:border-primary`}
      >
        Print
      </a>
    </div>
  );
}
