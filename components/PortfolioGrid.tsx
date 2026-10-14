"use client";

import { useState } from "react";
import Image from "next/image";
import { Film } from "lucide-react";
import { PROJECT_CATEGORIES, type Project } from "@/lib/projects";

const FILTERS = ["All", ...PROJECT_CATEGORIES] as const;

function Thumbnail({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5">
      {project.thumbnail_url ? (
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-charcoal-light/25">
          <Film size={40} aria-hidden="true" />
        </div>
      )}

      {project.is_featured ? (
        <span className="absolute left-3 top-3 rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-white">
          Featured
        </span>
      ) : null}
    </div>
  );
}

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <Thumbnail project={project} />
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
        {project.category}
      </p>
      <h2 className="mt-2 font-heading text-lg font-bold text-charcoal">
        {project.title}
      </h2>
      {project.description ? (
        <p className="mt-2 text-sm leading-relaxed text-charcoal-light/75">
          {project.description}
        </p>
      ) : null}
    </>
  );
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const visible =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  if (projects.length === 0) {
    return (
      <p className="mt-14 rounded-2xl border border-dashed border-charcoal/20 px-6 py-16 text-center text-charcoal-light/60">
        No projects yet.
      </p>
    );
  }

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              activeFilter === filter
                ? "border-orange bg-orange text-white"
                : "border-charcoal/15 text-charcoal-light/75 hover:border-orange hover:text-orange"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-charcoal/20 px-6 py-16 text-center text-charcoal-light/60">
          No projects in “{activeFilter}” yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) =>
            project.video_url ? (
              <a
                key={project.id}
                href={project.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-orange"
              >
                <CardBody project={project} />
              </a>
            ) : (
              // No video to open, so this card is deliberately not a link.
              <article key={project.id}>
                <CardBody project={project} />
              </article>
            ),
          )}
        </div>
      )}
    </>
  );
}
