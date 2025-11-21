import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";

import "./globals.css";

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
      <head>
        <meta name="theme-color" content="var(--background)" />
      </head>

      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased mx-auto pb-16 sm:pb-24 selection:bg-primary selection:text-primary-foreground",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <div className="fixed inset-0 -z-10 h-full w-full bg-background" />
            <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <ScrollProgress className="top-0 z-50" />
            <main id="content" className="flex flex-col h-full relative">
              {children}
            </main>
            <Navbar />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
