import { NextResponse, type NextRequest } from "next/server";

// Optimistic check only: no session cookie → go sign in. The cookie's signature and the
// user's role are verified on the server in lib/auth and lib/data, close to the data.
export default function proxy(req: NextRequest) {
  if (!req.cookies.has("fh_session")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
