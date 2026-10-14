import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";

export const metadata: Metadata = {
  title: "About — Yogesh Gonnade",
  description:
    "Senior video editor with 15+ years in the news and media industry, working across News Nation, News India and UCN Cable Network.",
};

const NETWORKS = [
  {
    name: "News Nation",
    role: "Daily broadcast news packages and breaking-story cutdowns.",
  },
  {
    name: "News India",
    role: "Bulletin edits and long-form current-affairs segments.",
  },
  {
    name: "UCN Cable Network",
    role: "Regional news production and studio package editing.",
  },
];

const TOOLS = [
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Adobe Photoshop",
  "Color Grading & Correction",
];

const SPECIALISMS = [
  "News & Media Editing",
  "Documentary Editing",
  "Short-Form & Social Content",
  "Corporate & Promotional Videos",
];

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-8">
      <h3 className="font-heading text-lg font-bold text-charcoal">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-charcoal-light/80"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-dark-text">
            About Me
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            15 Years of Turning Raw Footage Into Stories That Matter
          </h1>

          <div className="mt-12 grid gap-12 lg:grid-cols-[2fr,3fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              {/* Offset orange frame sitting behind the image placeholder. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-orange sm:translate-x-4 sm:translate-y-4"
              />
              <div className="relative aspect-[4/5] w-full rounded-2xl bg-charcoal/10" />
            </div>

            <div className="space-y-5 text-pretty leading-relaxed text-charcoal-light/80">
              <p>
                I&apos;m a senior video editor with 15+ years in the news and
                media industry, cutting daily broadcast and long-form packages
                for News Nation, News India and UCN Cable Network. My work spans
                Premiere Pro, After Effects and Photoshop, with a particular
                focus on color grading and pacing that keeps an audience
                watching.
              </p>
              <p>
                Most of that time has been spent against the clock. Newsroom
                editing teaches you to find the story quickly, protect accuracy
                under pressure, and deliver something broadcast-ready when the
                bulletin will not wait. That instinct carries into every other
                format I cut.
              </p>
              <p>
                I now take on contract projects for media houses, content
                creators and production houses that need broadcast-grade editing
                without a full-time hire — from single promos to ongoing
                editorial support.
              </p>
            </div>
          </div>
        </section>

        <Stats />

        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Where I&apos;ve Worked
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NETWORKS.map(({ name, role }) => (
              <div
                key={name}
                className="rounded-2xl border border-charcoal/10 bg-white p-8"
              >
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  {name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-light/75">
                  {role}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-20 font-heading text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Skills & Tools
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <List title="Tools" items={TOOLS} />
            <List title="Specialisms" items={SPECIALISMS} />
          </div>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/portfolio"
              className="rounded-full bg-orange px-8 py-3.5 text-center text-sm font-semibold text-charcoal transition-colors hover:bg-orange-light"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-charcoal px-8 py-3.5 text-center text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-background"
            >
              Get In Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
