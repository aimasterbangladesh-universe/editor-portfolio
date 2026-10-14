"use client";

import { motion } from "framer-motion";
import ServiceCards from "@/components/ServiceCards";

export default function Services() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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

        <div className="mt-14">
          <ServiceCards />
        </div>
      </div>
    </section>
  );
}
