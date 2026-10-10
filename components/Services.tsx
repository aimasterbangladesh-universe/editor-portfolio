"use client";

import { useRef } from "react";
import {
  Building2,
  Clapperboard,
  Film,
  Palette,
  Scissors,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const SERVICES: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Clapperboard,
    title: "News & Media Editing",
    body: "Fast-turnaround editing for broadcast news, built for accuracy and pace under deadline pressure.",
  },
  {
    Icon: Film,
    title: "Documentary Editing",
    body: "Long-form storytelling that finds the narrative thread in hours of raw footage.",
  },
  {
    Icon: Palette,
    title: "Color Grading & Correction",
    body: "Cinematic color treatment that gives every frame mood and consistency.",
  },
  {
    Icon: Scissors,
    title: "Short-Form & Social Content",
    body: "Punchy, platform-ready edits for YouTube, Reels, and short-form audiences.",
  },
  {
    Icon: Building2,
    title: "Corporate & Promotional Videos",
    body: "Clean, professional edits for brand films, interviews, and promotional content.",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            What I Do
          </p>
          <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
            Services Built for Every Story
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-charcoal-light/80">
            From breaking news to branded content, every edit is crafted with
            precision and pace.
          </p>
        </motion.div>

        {/* 6-column track on desktop: each card spans 2, so the final row of
            two cards can be centred instead of leaving a gap on the right. */}
        <div
          ref={ref}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 [&>*:nth-child(4)]:lg:col-start-2"
        >
          {SERVICES.map(({ Icon, title, body }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              // framer-motion owns `transform` here, so the hover lift has to
              // come from it too; an inline style beats a CSS hover class.
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-2xl border border-charcoal/10 bg-white p-8 transition duration-300 hover:border-orange hover:shadow-lg lg:col-span-2"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-heading text-xl font-bold text-charcoal">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-light/75">
                {body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
