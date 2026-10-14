import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGrid from "@/components/PortfolioGrid";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/projects";

// Projects change whenever the admin panel is used, so this page is rendered
// per request instead of being baked in at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio — Yogesh Gonnade",
  description:
    "Selected video editing work across news, documentary, corporate and short-form projects.",
};

export default async function PortfolioPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  const projects = (data ?? []) as Project[];

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-dark-text">
            Portfolio
          </p>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Selected Work
          </h1>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-charcoal-light/80">
            A growing archive of edits across news, documentary, corporate and
            short-form projects.
          </p>

          {error ? (
            <p
              role="alert"
              className="mt-14 rounded-2xl border border-dashed border-charcoal/20 px-6 py-16 text-center text-charcoal-light/70"
            >
              Could not load projects right now. Please try again later.
            </p>
          ) : (
            <PortfolioGrid projects={projects} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
