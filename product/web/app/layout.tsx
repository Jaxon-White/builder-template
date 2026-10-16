import type { Metadata, Viewport } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { signOut } from "@/app/login/actions";
import { NavLink } from "@/components/nav-link";
import { getUser } from "@/lib/auth";
import { dataNotice } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resource Navigator",
  description: "Help church leaders find shelter, food and care for someone in need.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b3a5c",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Only used to show the header; access itself is checked in lib/data and each page.
  const user = await getUser();
  const isUpkeep = user?.role === "upkeep";
  const switchInHeader = Boolean(user) && !isUpkeep;
  const navSwitch = user && (
    <nav aria-label="Sections" className="flex w-max rounded-full bg-white/15 p-[3px] font-medium">
      {/* Upkeep volunteers' home is a chooser, so "Find help" goes straight to the questions. */}
      <NavLink
        href={isUpkeep ? "/intake" : "/"}
        match={isUpkeep ? ["/intake", "/matches"] : ["/", "/intake", "/matches"]}
      >
        Find help
      </NavLink>
      <NavLink href="/resources" match={["/resources"]}>
        Resources
      </NavLink>
      {isUpkeep && (
        <NavLink href="/upkeep" match={["/upkeep"]}>
          Upkeep
        </NavLink>
      )}
    </nav>
  );

  return (
    <html lang="en" className={`${geistSans.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-10 bg-primary text-white print:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-2 px-4 py-3">
            <Link
              href="/"
              className={`shrink-0 whitespace-nowrap font-serif font-semibold text-white ${
                switchInHeader ? "text-lg" : "text-xl"
              }`}
            >
              Resource Navigator
            </Link>
            {switchInHeader && navSwitch}
          </div>
          {/* Three tabs don't fit beside the title on a phone, so the switch gets its own row. */}
          {isUpkeep && <div className="mx-auto max-w-md px-4 pb-3">{navSwitch}</div>}
          {user && (
            <div className="mx-auto flex max-w-md items-center justify-between px-4 pb-2 text-xs text-white/75">
              <span>
                Signed in as <span className="font-medium text-white">{user.name}</span>
              </span>
              <form action={signOut}>
                <button type="submit" className="underline hover:text-white">
                  Sign out
                </button>
              </form>
            </div>
          )}
        </header>

        {dataNotice && (
          <div className="bg-amber-50 px-4 py-1.5 text-center text-xs text-amber-900 print:hidden">
            {dataNotice}
          </div>
        )}

        <main className="mx-auto w-full max-w-md flex-1 px-4 pb-10 pt-5 print:max-w-none print:p-0">{children}</main>

        <footer className="bg-primary text-white/80 print:hidden">
          <p className="mx-auto max-w-md px-4 py-4 text-sm">
            In danger right now? Call <a href="tel:911" className="font-semibold text-white underline">911</a>.
            Mental health crisis: call or text{" "}
            <a href="tel:988" className="font-semibold text-white underline">988</a>.
          </p>
          <p className="mx-auto max-w-md px-4 pb-4 text-xs text-white/65">
            An independent project. Not an official website of The Church of Jesus Christ of
            Latter-day Saints.
          </p>
        </footer>
      </body>
    </html>
  );
}
