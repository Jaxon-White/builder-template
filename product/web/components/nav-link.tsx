"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Header tab that highlights while you're anywhere in its section. */
export function NavLink({ href, match, children }: { href: string; match: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = match.some((m) => (m === "/" ? pathname === "/" : pathname.startsWith(m)));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`whitespace-nowrap rounded-full px-2.5 py-1.5 ${active ? "bg-white/15 text-white" : "hover:text-white"}`}
    >
      {children}
    </Link>
  );
}
