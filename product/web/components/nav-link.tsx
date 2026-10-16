"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** One side of the header switch; shows as the white pill while you're anywhere in its section. */
export function NavLink({ href, match, children }: { href: string; match: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = match.some((m) => (m === "/" ? pathname === "/" : pathname.startsWith(m)));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-8 items-center whitespace-nowrap rounded-full px-[9px] text-[13px] ${
        active ? "bg-white font-semibold text-primary shadow-sm" : "text-white/85 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
