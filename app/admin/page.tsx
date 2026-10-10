"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectsPanel from "@/components/admin/ProjectsPanel";

type Tab = "projects" | "blog";

const TABS: { id: Tab; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog Posts" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-6">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
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

        <div
          role="tablist"
          aria-label="Admin sections"
          className="mt-8 flex gap-2 border-b border-charcoal/10"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === id
                  ? "border-orange text-orange"
                  : "border-transparent text-charcoal-light/60 hover:text-charcoal"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "projects" ? (
            <ProjectsPanel />
          ) : (
            <p className="rounded-2xl border border-dashed border-charcoal/20 px-6 py-12 text-center text-charcoal-light/60">
              Blog post management is coming next.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
