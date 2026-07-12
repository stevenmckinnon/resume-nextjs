import { WebMCP } from "@/components/webmcp";
import { GradientOrbs } from "@/components/magicui/gradient-orbs";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";

import "./globals.css";

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = Syne({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Glasgow",
    "Scotland",
    "Web Development",
    "Software Engineer",
    "Steve McKinnon",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        alt: DATA.name,
      },
    ],
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
    creator: "@stevenmckinnon",
    images: ["/me.jpg"],
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `bg-background selection:bg-primary selection:text-primary-foreground relative mx-auto min-h-dvh pb-16 font-sans antialiased sm:pb-24`,
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <TooltipProvider delay={0}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:bg-background focus:text-foreground focus:border-border focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:border focus:px-4 focus:py-2 focus:shadow-lg"
            >
              Skip to content
            </a>

            {/* Background layers */}
            <div className="bg-background fixed inset-0 -z-10 size-full" />
            <GradientOrbs />
            <div className="pointer-events-none fixed inset-0 -z-10 size-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[24px_24px]" />

            <ScrollProgress className="top-0 z-50" />
            <main id="content" className="relative flex h-full flex-col">
              {children}
            </main>
            <Navbar />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <WebMCP />
      </body>
    </html>
  );
}
