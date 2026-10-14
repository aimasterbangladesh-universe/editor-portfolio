/** Absolute site origin. Set NEXT_PUBLIC_SITE_URL in the deploy environment. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
