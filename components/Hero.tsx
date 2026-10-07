"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Only transform/opacity are animated, so the blobs stay on the compositor.
  const blob = (duration: number, x: number, y: number) =>
    reduceMotion
      ? undefined
      : {
          x: [0, x, 0],
          y: [0, y, 0],
          scale: [1, 1.1, 1],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          animate={blob(14, 30, -40)}
          className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-orange/10 blur-3xl sm:h-96 sm:w-96"
        />
        <motion.div
          animate={blob(18, -40, 30)}
          className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-orange-light/10 blur-3xl sm:h-80 sm:w-80"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-4xl px-6 py-24 text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="text-balance font-heading text-4xl font-extrabold leading-tight tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
        >
          Crafting Stories Through{" "}
          <span className="text-orange">the Edit</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-charcoal-light/80 sm:text-lg"
        >
          Video editor with 15+ years shaping news and media stories — turning
          raw footage into sharp, broadcast-ready narratives that hold an
          audience.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#"
            className="w-full rounded-full bg-orange px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-dark sm:w-auto"
          >
            View My Work
          </a>
          <a
            href="#"
            className="w-full rounded-full border-2 border-charcoal px-8 py-3.5 text-center text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-background sm:w-auto"
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
