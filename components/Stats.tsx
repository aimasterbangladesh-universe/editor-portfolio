"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

type Stat = {
  label: string;
  /** Numeric stats count up; text-only stats just fade in. */
  value?: number;
  suffix?: string;
  text?: string;
};

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { text: "News Nation, News India, UCN", label: "Networks Worked With" },
  { value: 500, suffix: "+", label: "Projects Edited" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix: string;
  start: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (reduceMotion) {
      setDisplay(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [start, target, reduceMotion]);

  return (
    <>
      {/* The ticking number is decorative; screen readers get the final figure. */}
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {target}
        {suffix}
      </span>
    </>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-charcoal py-16 sm:py-20">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-6 md:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            className="text-center"
          >
            {stat.text ? (
              <p className="font-heading text-base font-bold leading-snug text-orange sm:text-lg">
                {stat.text}
              </p>
            ) : (
              <p className="font-heading text-4xl font-extrabold tabular-nums text-orange sm:text-5xl">
                <CountUp
                  target={stat.value ?? 0}
                  suffix={stat.suffix ?? ""}
                  start={inView}
                />
              </p>
            )}

            <p className="mt-2 text-sm font-medium text-white/70">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
