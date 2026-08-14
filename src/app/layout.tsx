import { WebMCP } from "@/components/webmcp";
import { CommandPaletteProvider } from "@/components/command-palette";
import { GradientOrbs } from "@/components/magicui/gradient-orbs";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { MotionProvider } from "@/components/motion-provider";
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

// These deliberately do NOT claim the --font-sans / --font-mono names. Those are
// Tailwind theme tokens, and a token defined as `var(--font-sans)` that resolves
// against a property of the same name is a circular reference: the declaration
// is dropped and the typeface silently never applies. Keep the loader variables
// and the theme tokens on separate names, and map one to the other in
// globals.css.
const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
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
    // The font variables live on <html> rather than <body> so the
    // `html { @apply font-sans }` rule in globals.css can resolve them.
    <html
      lang="en"
      className={cn(fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background selection:bg-primary selection:text-primary-foreground relative mx-auto min-h-dvh pb-16 font-sans antialiased sm:pb-24">
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <MotionProvider>
            <TooltipProvider delay={0}>
            <CommandPaletteProvider>
              <a
                href="#content"
                className="focus:bg-background focus:text-foreground focus:border-border sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:border focus:px-4 focus:py-2 focus:shadow-lg"
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
              </CommandPaletteProvider>
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <WebMCP />
      </body>
    </html>
  );
}
