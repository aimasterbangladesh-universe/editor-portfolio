import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail loudly at startup rather than letting `undefined` reach createClient,
// which would otherwise surface much later as a confusing network error.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    // Next patches global fetch and caches results in its Data Cache. Without
    // this, the first render of a page is cached and later admin edits never
    // appear — `export const dynamic = "force-dynamic"` does not cover these
    // requests, because supabase-js issues them itself.
    fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
  },
});
