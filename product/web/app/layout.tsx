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
  title: "Find Help",
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

  return (
    <html lang="en" className={`${geistSans.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-10 bg-primary text-white">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="shrink-0 whitespace-nowrap font-serif text-xl font-semibold text-white">
              Find Help
            </Link>
            {user && (
              <nav className="-mr-2 flex items-center text-sm font-medium text-white/80">
                {/* Upkeep volunteers' home is a chooser, so "Find help" goes straight to the questions. */}
                <NavLink
                  href={user.role === "upkeep" ? "/intake" : "/"}
                  match={user.role === "upkeep" ? ["/intake", "/matches"] : ["/", "/intake", "/matches"]}
                >
                  Find help
                </NavLink>
                <NavLink href="/resources" match={["/resources"]}>
                  Resources
                </NavLink>
                {user.role === "upkeep" && (
                  <NavLink href="/upkeep" match={["/upkeep"]}>
                    Upkeep
                  </NavLink>
                )}
              </nav>
            )}
          </div>
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
          <div className="bg-amber-50 px-4 py-1.5 text-center text-xs text-amber-900">
            {dataNotice}
          </div>
        )}

        <main className="mx-auto w-full max-w-md flex-1 px-4 pb-10 pt-5">{children}</main>

        <footer className="bg-primary text-white/80">
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
