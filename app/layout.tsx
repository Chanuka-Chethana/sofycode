import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sofycode | Custom Software Development Agency",
    template: "%s | Sofycode",
  },
  description: "We build secure, scalable custom software that grows with your business — from MVP to enterprise-grade platforms. Specializing in full-stack, AI/ML, cloud-native & mobile development.",
  keywords: [
    "custom software development",
    "software development agency",
    "web application development",
    "AI integration",
    "mobile app development",
    "cloud-native architecture",
    "Sri Lanka software company",
    "full-stack development",
    "Next.js development",
    "React development",
  ],
  authors: [{ name: "Sofycode" }],
  creator: "Sofycode",
  publisher: "Sofycode",
  metadataBase: new URL("https://sofycode.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sofycode.com",
    siteName: "Sofycode",
    title: "Sofycode | Custom Software Development Agency",
    description: "We build secure, scalable custom software that grows with your business — from MVP to enterprise-grade platforms.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sofycode – Custom Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofycode | Custom Software Development Agency",
    description: "We build secure, scalable custom software that grows with your business.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon-icon.png",
    shortcut: "/favicon-icon.png",
    apple: "/favicon-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-50 min-h-screen flex flex-col font-sans transition-colors duration-300 overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
