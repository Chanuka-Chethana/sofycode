import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Sofycode – Case Studies & Portfolio",
  description: "Explore Sofycode's portfolio of enterprise solutions, AI platforms, and mobile apps. See real case studies including HireIntel (AI recruitment) and MoodBeats (AI music).",
  keywords: [
    "software portfolio",
    "case studies",
    "AI recruitment system",
    "mood-based music player",
    "custom software projects",
    "enterprise software examples",
    "Sri Lanka software portfolio",
  ],
  openGraph: {
    title: "Our Work | Sofycode – Case Studies & Portfolio",
    description: "Curated portfolio of enterprise software solutions, AI platforms, and mobile applications built by the Sofycode team.",
    url: "https://sofycode.com/work",
    siteName: "Sofycode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofycode Work – Portfolio & Case Studies",
    description: "Real enterprise software projects built by Sofycode — from AI recruitment systems to mood-based music players.",
  },
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
