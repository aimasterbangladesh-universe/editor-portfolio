"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT, SOCIAL_LINKS } from "@/lib/site-info";

const inputClass =
  "mt-1 w-full rounded-lg border border-charcoal/15 bg-background px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-orange";
const labelClass = "block text-sm font-medium text-charcoal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  // No backend: this hands the message to the visitor's own mail client.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Portfolio enquiry from ${name || "the website"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Contact
          </p>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Let&apos;s Talk About Your Edit
          </h1>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-charcoal-light/80">
            Available for contract work with media houses, content creators and
            production houses.
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                    <Mail size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-charcoal">
                      Email
                    </span>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm text-charcoal-light/75 transition-colors hover:text-orange"
                    >
                      {CONTACT.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-charcoal">
                      Location
                    </span>
                    <span className="text-sm text-charcoal-light/75">
                      {CONTACT.location}
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                    <Globe size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-charcoal">
                      Availability
                    </span>
                    <span className="text-sm text-charcoal-light/75">
                      {CONTACT.availability}
                    </span>
                  </span>
                </li>
              </ul>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.15em] text-orange">
                Social
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="inline-block rounded-full border border-charcoal/15 px-5 py-2 text-sm font-semibold text-charcoal-light/75 transition-colors hover:border-orange hover:text-orange"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-charcoal/10 bg-white p-8"
            >
              <h2 className="font-heading text-xl font-bold text-charcoal">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-charcoal-light/70">
                This opens your own email app with the message ready to send.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Open in Email App
              </button>

              {opened ? (
                <p role="status" className="mt-4 text-sm text-charcoal-light/70">
                  Your email app should have opened. If nothing happened, write
                  to{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-medium text-orange"
                  >
                    {CONTACT.email}
                  </a>{" "}
                  directly.
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
