"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutPreview() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <motion.div
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16"
      >
        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          {/* Offset orange frame sitting behind the image placeholder. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-orange sm:translate-x-4 sm:translate-y-4"
          />
          <div className="relative aspect-[4/5] w-full rounded-2xl bg-charcoal/10" />
        </motion.div>

        <div>
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-orange"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl lg:text-5xl"
          >
            15 Years of Turning Raw Footage Into Stories That Matter
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-pretty leading-relaxed text-charcoal-light/80"
          >
            I&apos;m a senior video editor with 15+ years in the news and media
            industry, cutting daily broadcast and long-form packages for News
            Nation, News India and UCN Cable Network. My work spans Premiere Pro,
            After Effects and Photoshop, with a particular focus on color grading
            and pacing that keeps an audience watching.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty leading-relaxed text-charcoal-light/80"
          >
            I now take on contract projects for media houses, content creators and
            production houses that need broadcast-grade editing without a
            full-time hire.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <a
              href="#"
              className="inline-block rounded-full border-2 border-charcoal px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-background"
            >
              Read Full Story
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
