import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  // The login page itself must stay reachable, or this redirects forever.
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

// Only page routes under /admin are matched, so /api/admin/login and
// /api/admin/logout are never intercepted.
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
