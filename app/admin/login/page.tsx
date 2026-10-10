"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // refresh() lets middleware re-read the new cookie before navigating.
        router.replace("/admin");
        router.refresh();
        return;
      }

      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Login failed. Please try again.");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white">
            <Lock size={22} aria-hidden="true" />
          </span>

          <h1 className="mt-6 font-heading text-2xl font-bold text-charcoal">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-charcoal-light/70">
            Enter the admin password to manage projects and blog posts.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-charcoal"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "login-error" : undefined}
              className="mt-2 w-full rounded-lg border border-charcoal/15 bg-background px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal-light/40 focus:border-orange"
              placeholder="••••••••"
            />

            {error ? (
              <p
                id="login-error"
                role="alert"
                className="mt-3 text-sm font-medium text-orange-dark"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
