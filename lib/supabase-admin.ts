/**
 * ⚠️  SERVER-ONLY. NEVER import this file into a client component.
 *
 * This client uses the Supabase SERVICE ROLE key, which bypasses Row Level
 * Security entirely and can read and write every row in the database.
 *
 * If this module is ever pulled into a module graph marked "use client", the
 * key is inlined into the browser bundle and anyone can take full control of
 * the database. Import it only from Route Handlers, Server Actions, or Server
 * Components — never from a file with "use client" at the top, and never from
 * a module that such a file imports.
 */
import { createClient } from "@supabase/supabase-js";

// Belt-and-braces: if this module somehow reaches the browser, fail loudly
// rather than quietly handing out an all-powerful client.
if (typeof window !== "undefined") {
  throw new Error(
    "lib/supabase-admin.ts was imported in the browser. This module is server-only and exposes the service role key.",
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing Supabase admin environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    // No browser session to persist or refresh on the server.
    autoRefreshToken: false,
    persistSession: false,
  },
});
