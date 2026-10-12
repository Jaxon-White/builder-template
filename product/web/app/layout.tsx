import type { Metadata, Viewport } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { signOut } from "@/app/login/actions";
import { getUser } from "@/lib/auth";
import { isSampleData } from "@/lib/data";
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
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Only used to show the header; access itself is checked in lib/data and each page.
  const user = await getUser();

  return (
    <html lang="en" className={`${geistSans.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-10 border-b border-border bg-surface">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="font-serif text-xl font-semibold text-primary">
              Find Help
            </Link>
            {user && (
              <nav className="flex items-center gap-4 text-sm font-medium text-muted">
                <Link href="/resources" className="hover:text-foreground">
                  Resources
                </Link>
                {user.role === "upkeep" && (
                  <Link href="/upkeep" className="hover:text-foreground">
                    Upkeep
                  </Link>
                )}
              </nav>
            )}
          </div>
          {user && (
            <div className="mx-auto flex max-w-md items-center justify-between px-4 pb-2 text-xs text-muted">
              <span>
                Signed in as <span className="font-medium text-foreground">{user.name}</span>
              </span>
              <form action={signOut}>
                <button type="submit" className="underline hover:text-foreground">
                  Sign out
                </button>
              </form>
            </div>
          )}
        </header>

        {isSampleData && (
          <div className="bg-amber-50 px-4 py-1.5 text-center text-xs text-amber-900">
            Prototype · sample data, not real organizations
          </div>
        )}

        <main className="mx-auto w-full max-w-md flex-1 px-4 pb-10 pt-5">{children}</main>

        <footer className="border-t border-border bg-surface">
          <p className="mx-auto max-w-md px-4 py-4 text-sm text-muted">
            In danger right now? Call <a href="tel:911" className="font-semibold text-foreground underline">911</a>.
            Mental health crisis: call or text{" "}
            <a href="tel:988" className="font-semibold text-foreground underline">988</a>.
          </p>
          <p className="mx-auto max-w-md px-4 pb-4 text-xs text-muted">
            An independent project. Not an official website of The Church of Jesus Christ of
            Latter-day Saints.
          </p>
        </footer>
      </body>
    </html>
  );
}
