"use client";

import { Mail } from "lucide-react";
import { motion, type Variants } from "framer-motion";

// NOTE: email, location and availability below are PLACEHOLDERS.
// Replace them once the real contact details are provided.
const CONTACT = {
  email: "hello@yogeshgonnade.com",
  location: "Based in Noida, India",
  availability: "Available for remote projects worldwide",
};

const QUICK_LINKS = ["Home", "About", "Work", "Services", "Blog", "Contact"];

const SERVICES = [
  "News & Media Editing",
  "Documentary Editing",
  "Color Grading",
  "Short-Form Content",
  "Corporate Videos",
];

// lucide-react dropped brand logos, so LinkedIn/Instagram/YouTube are inlined
// as paths (Simple Icons, CC0). Email still uses the lucide icon.
const BRAND_PATHS: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

const SOCIALS = ["LinkedIn", "Instagram", "YouTube"];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headingClass =
  "text-sm font-semibold uppercase tracking-[0.15em] text-orange";
const linkClass = "text-sm text-white/70 transition-colors hover:text-orange";
const socialClass =
  "inline-flex text-white/70 transition-colors hover:text-orange";

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
      >
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={fadeUp}>
            <p className="font-heading text-xl font-bold text-white">
              Yogesh Gonnade
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Senior Video Editor crafting stories from raw footage for 15+
              years.
            </p>
            <ul className="mt-6 flex items-center gap-4">
              {SOCIALS.map((label) => (
                <li key={label}>
                  <a href="#" aria-label={label} className={socialClass}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={BRAND_PATHS[label]} />
                    </svg>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Email"
                  className={socialClass}
                >
                  <Mail size={20} />
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((label) => (
                <li key={label}>
                  <a href="#" className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((label) => (
                <li key={label}>
                  <a href="#" className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className={headingClass}>Get In Touch</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-orange"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.location}</li>
              <li>{CONTACT.availability}</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-block rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Hire Me
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center text-xs text-white/50 sm:flex-row sm:justify-between sm:text-left"
        >
          <p>&copy; 2026 Yogesh Gonnade. All rights reserved.</p>
          <p>Built with care.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
