import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { isSampleData } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find Help",
  description: "Help church leaders find shelter, food and care for someone in need.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f5f5b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold text-primary">
              Find Help
            </Link>
            <Link href="/resources" className="text-sm font-medium text-muted hover:text-foreground">
              All resources
            </Link>
          </div>
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
        </footer>
      </body>
    </html>
  );
}
