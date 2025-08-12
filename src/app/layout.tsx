import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY, cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { AuroraText } from "@/components/magicui/aurora-text";

const fontSans = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
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
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <ScrollProgress className="top-0" />
            <main className="flex flex-col h-full space-y-10">
              <section id="hero">
                <div className="mx-auto w-full max-w-2xl space-y-8">
                  <div className="gap-2 flex justify-between">
                    <div className="flex-col flex flex-1 space-y-1.5">
                      <BlurFade delay={BLUR_FADE_DELAY}>
                        <h1 className="flex items-center text-4xl sm:text-5xl xl:text-6xl/none font-nok">
                          Hi, I&apos;m&nbsp;
                          <AuroraText className="pr-[1px] pl-[1px]">
                            {DATA.name.split(" ")[0]}
                          </AuroraText>{" "}
                          <span className="ml-2 sm:ml-2.5 text-xl sm:text-3xl xl:text-4xl/none">
                            👋
                          </span>
                        </h1>
                      </BlurFade>
                      <BlurFadeText
                        className="max-w-[600px] md:text-xl"
                        delay={BLUR_FADE_DELAY}
                        text={DATA.description}
                      />
                    </div>
                    <BlurFade delay={BLUR_FADE_DELAY}>
                      <Avatar className="size-28 border">
                        <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                        <AvatarFallback>{DATA.initials}</AvatarFallback>
                      </Avatar>
                    </BlurFade>
                  </div>
                </div>
              </section>
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
