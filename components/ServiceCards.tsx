"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/lib/services";

/** Shared by the homepage Services section and the /services page. */
export default function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    // 6-column track on desktop: each card spans 2, so the final row of two
    // cards can be centred instead of leaving a gap on the right.
    <div
      ref={ref}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 [&>*:nth-child(4)]:lg:col-start-2"
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
  );
}
