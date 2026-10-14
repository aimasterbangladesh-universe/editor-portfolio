import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/ServiceCards";

export const metadata: Metadata = {
  title: "Services — Yogesh Gonnade",
  description:
    "Video editing services across news, documentary, color grading, short-form and corporate work.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-dark-text">
            What I Do
          </p>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Services Built for Every Story
          </h1>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-charcoal-light/80">
            From breaking news to branded content, every edit is crafted with
            precision and pace. Fifteen years of newsroom deadlines shape how
            every project is cut.
          </p>

          <div className="mt-14">
            <ServiceCards headingLevel="h2" />
          </div>

          <div className="mt-16 rounded-2xl border border-charcoal/10 bg-white p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
              Need something edited?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-charcoal-light/75">
              Available for contract work with media houses, content creators
              and production houses.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-orange-light"
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
