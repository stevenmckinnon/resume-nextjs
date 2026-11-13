import { WebMCP } from "@/components/webmcp";
import { Colophon } from "@/components/colophon";
import { CommandPaletteProvider } from "@/components/command-palette";
import { Mixer } from "@/components/mixer";
import { MotionProvider } from "@/components/motion-provider";
import { PrintCv } from "@/components/print-cv";
import { ThemeProvider } from "@/components/theme-provider";
import { ProjectDialogProvider } from "@/components/project-dialog";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { PAGE_LENGTH_SCRIPT } from "@/lib/page-length-script";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

// Self-hosted rather than through next/font/google, whose Turbopack loader
// intermittently failed both `next dev` and `next build` here with "queries have
// exactly one entry". Both are variable fonts, cut to the latin subset, under the
// SIL Open Font License. Archivo and Archivo Narrow are one family, so the body
// and the headings share their shapes and only the width changes.
//
// These deliberately do NOT claim the --font-sans / --font-mono names. Those are
// Tailwind theme tokens, and a token defined as `var(--font-sans)` that resolves
// against a property of the same name is a circular reference: the declaration
// is dropped and the typeface silently never applies. Keep the loader variables
// and the theme tokens on separate names, and map one to the other in
// globals.css.
const fontSans = localFont({
  src: "./fonts/Archivo-latin.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
});

const fontDisplay = localFont({
  src: "./fonts/ArchivoNarrow-latin.woff2",
  weight: "400 700",
  variable: "--font-archivo-narrow",
  display: "swap",
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
  },
  verification: {
    google: "",
    yandex: "",
  },
};

// Tells search engines and recruiting tools who this is without them having to
// read the page. Escaped as the Next.js JSON-LD guide advises.
const PERSON_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  email: `mailto:${DATA.contact.email}`,
  jobTitle: DATA.work[0]?.title,
  worksFor: { "@type": "Organization", name: DATA.work[0]?.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Glasgow",
    addressCountry: "GB",
  },
  knowsAbout: DATA.skills.map((skill) => skill.name),
  sameAs: Object.values(DATA.contact.social)
    .filter((social) => social.navbar)
    .map((social) => social.url),
}).replace(/</g, "\\u003c");

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
      className={cn(fontSans.variable, fontDisplay.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background selection:bg-primary selection:text-primary-foreground relative mx-auto min-h-dvh pb-14 font-sans antialiased md:pb-0">
        <script dangerouslySetInnerHTML={{ __html: PAGE_LENGTH_SCRIPT }} />
        {/* Controls that do nothing without a script should not be offered
            without one. The content they sit over is all there regardless. */}
        <noscript>
          <style>{`[data-needs-js]{display:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: PERSON_JSON_LD }}
        />
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <MotionProvider>
            <TooltipProvider delay={0}>
              <CommandPaletteProvider>
                <ProjectDialogProvider>
                  <a
                    href="#content"
                    className="focus:bg-background focus:text-foreground focus:border-border sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:border focus:px-4 focus:py-2 focus:shadow-lg"
                  >
                    Skip to content
                  </a>

                  <Mixer />
                  <main id="content" className="relative flex h-full flex-col">
                    {children}
                  </main>
                  <Colophon />
                  <PrintCv />
                  <Toaster />
                </ProjectDialogProvider>
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
