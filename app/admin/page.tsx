"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-6">
        <h1 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          Admin Dashboard
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="shrink-0 rounded-full border-2 border-charcoal px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-background disabled:opacity-60"
        >
          {loggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>

      <p className="mx-auto mt-6 max-w-4xl text-charcoal-light/75">
        Project and blog management will be built here next.
      </p>
    </main>
  );
}
