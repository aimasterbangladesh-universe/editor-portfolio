import type { Metadata } from "next";

// The contact page is a client component (it owns the mailto form state), and
// client components cannot export `metadata` — so it lives here instead.
export const metadata: Metadata = {
  title: "Contact — Yogesh Gonnade",
  description:
    "Get in touch about contract video editing for news, documentary, corporate and short-form work.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
