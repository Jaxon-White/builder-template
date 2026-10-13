"use client";

import { useState } from "react";
import type { Resource } from "@/lib/types";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function hasStreetAddress(r: Resource) {
  return /\d/.test(r.address);
}

function mapsHref(r: Resource) {
  const q = encodeURIComponent(`${r.address}, ${r.city}, UT`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function summary(r: Resource) {
  const where = hasStreetAddress(r) ? `${r.address}, ${r.city}` : r.address;
  return [r.name, `Phone: ${r.phone}`, `Where: ${where}`, `Hours: ${r.hoursText}`].join("\n");
}

/** Call, directions and share: the three things a leader does once they've found a place. */
export function Handoff({ resource, size = "md" }: { resource: Resource; size?: "md" | "lg" }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = summary(resource);
    if (navigator.share) {
      try {
        await navigator.share({ title: resource.name, text });
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
    <div className="grid grid-cols-3 gap-2">
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
    </div>
  );
}
