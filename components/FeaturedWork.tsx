"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { motion, useInView } from "framer-motion";

// PLACEHOLDER CARDS. These three entries are stand-ins so the layout can be
// built and reviewed now. Once the admin panel and Supabase are connected,
// this array is replaced by real projects (video thumbnail, title, category
// and a link to the project page) loaded from the database.
const PROJECTS = [
  { category: "News", title: "News Segment — Breaking Story" },
  { category: "Documentary", title: "Documentary Short Film" },
  { category: "Corporate", title: "Corporate Brand Film" },
];

export default function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="bg-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Featured Work
          </p>
          <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Selected Projects
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-white/70">
            A sample of recent edits across news, documentary, and branded
            content.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map(({ category, title }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
              // framer-motion owns `transform` on this element, so the hover
              // scale has to come from it rather than a CSS hover class.
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group"
            >
              <a href="#" className="block">
                <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-orange">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white transition-transform duration-300 group-hover:scale-110">
                    <Play size={22} fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                  {category}
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-white">
                  {title}
                </h3>
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
          className="mt-14 text-center"
        >
          <a
            href="#"
            className="inline-block rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-orange hover:bg-orange"
          >
            View All Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
