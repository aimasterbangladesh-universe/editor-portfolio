import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Senior video editor with 15+ years cutting news, documentary, corporate and short-form work.";

export const metadata: Metadata = {
  // Needed so relative social-image URLs resolve to absolute ones.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Yogesh Gonnade — Senior Video Editor",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Yogesh Gonnade — Senior Video Editor",
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "Yogesh Gonnade",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogesh Gonnade — Senior Video Editor",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${inter.variable} font-sans bg-background text-charcoal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
