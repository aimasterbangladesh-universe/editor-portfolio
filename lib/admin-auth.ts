import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";

/**
 * Route handlers under /api/admin are NOT covered by middleware.ts, whose
 * matcher only lists page routes under /admin. Every admin API route must
 * therefore call this itself.
 */
export async function isAdminRequest(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
