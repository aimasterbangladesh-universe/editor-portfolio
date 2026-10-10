/**
 * Admin session tokens.
 *
 * The token is `<random id>.<expiry ms>.<HMAC-SHA256 signature>`. Signing it
 * means middleware can verify a cookie without any server-side session store:
 * an unsigned random token would be indistinguishable from one an attacker
 * simply typed in.
 *
 * Uses Web Crypto (not node:crypto) because middleware runs on the Edge
 * runtime, where the Node crypto module is unavailable.
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const encoder = new TextEncoder();

function getSigningSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "Missing ADMIN_SESSION_SECRET (or ADMIN_PASSWORD) — cannot sign admin sessions.",
    );
  }
  return secret;
}

function base64url(bytes: Uint8Array): string {
  let binary = "";
  // Indexed loop: tsconfig targets ES5, where for...of over a typed array
  // needs downlevelIteration.
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64url(new Uint8Array(signature));
}

/** Compares without leaking where two strings diverge. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const id = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const expiresAt = String(Date.now() + SESSION_MAX_AGE * 1000);
  const payload = `${id}.${expiresAt}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [id, expiresAt, signature] = parts;
  if (!timingSafeEqual(signature, await sign(`${id}.${expiresAt}`))) {
    return false;
  }

  // The expiry is inside the signed payload, so it cannot be edited by hand.
  const expiryMs = Number(expiresAt);
  return Number.isFinite(expiryMs) && Date.now() < expiryMs;
}
