import { CopyEndpoint } from "@/components/copy-endpoint";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import Link from "next/link";

const SOURCE_URL = "https://github.com/stevenmckinnon/resume-nextjs";

/**
 * Every entry here has to be checkable against the repo. A colophon that
 * describes a nicer site than the one it sits on is worse than no colophon,
 * because the reader is a front-end engineer and can open devtools.
 */
const ENTRIES: { term: string; detail: React.ReactNode }[] = [
  {
    term: "Typefaces",
    detail:
      "Archivo Narrow for the name and headings, set large. Manrope for everything you read.",
  },
  {
    term: "Colour",
    detail:
      "OKLCH throughout. The one accent is a tally light: it marks what is live, and little else.",
  },
  {
    term: "Length",
    detail:
      "Full or short, as a view transition over one data attribute. Add ?view=short to a link to send the short one.",
  },
  {
    term: "Motion",
    detail:
      "Entrances run on CSS view timelines, so nothing waits on JavaScript to become visible. Reduced motion is honoured everywhere.",
  },
  {
    term: "Built with",
    detail: "Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.",
  },
  {
    term: "Keyboard and paper",
    detail:
      "The timeline is a native range input. Keys 1 to 5 cut between sections, and can be turned off in the palette. Printing gives an A4 CV.",
  },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-muted-foreground text-base font-semibold">{children}</h2>
);

/**
 * The closer. A magazine ends by telling you how it was made, and for a
 * front-end portfolio that page is the strongest thing on offer: the site is
 * the work sample, so naming the decisions is the difference between having
 * taste and demonstrating it.
 *
 * The MCP endpoint leads because it is the one item here a visitor cannot
 * discover any other way.
 */
export const Colophon = () => (
  <footer className="bg-muted/30 short:hidden relative">
    {/* Three stacked full-width blocks, no heading rail.

        This used to mirror the page's 240px-rail section grid, but that rail
        only works when the thing standing in it is a 24px bold heading heavy
        enough to anchor a column. Holding a 12px mono kicker instead, it left
        roughly 230px of empty space beside one small word and shunted every
        line of the footer to the right of centre. */}
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-4 py-16 md:gap-16 md:px-10 md:py-24">
      {/* Lead item. This is a working MCP server and nothing else on the page
          hints at it, so it gets the heading and the interaction. It sits
          outside the colophon rather than under its label: the endpoint is not
          a note about how the site was made, it is a thing you can use. */}
      <div className="flex flex-col gap-4">
        <h2 className="text-foreground font-display max-w-[20ch] text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
          This page is also an MCP server
        </h2>
        <p className="text-muted-foreground max-w-[58ch] text-base/relaxed text-pretty">
          Point an agent at the endpoint and it can read my profile, experience,
          skills, projects and contact details as five typed tools. No scraping,
          no PDF parsing.
        </p>
        <CopyEndpoint value={`${DATA.url}/mcp`} className="mt-1 max-w-md" />
      </div>

      <div className="flex flex-col gap-5">
        <Eyebrow>Colophon</Eyebrow>
        {/* Three columns across the full width. Each entry is two short lines,
            so at one or two columns the list ran long enough to outweigh the
            MCP block above it. */}
        <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map(({ term, detail }) => (
            <div key={term} className="flex flex-col gap-1.5 py-4">
              <dt className="text-muted-foreground text-sm font-semibold">
                {term}
              </dt>
              <dd className="text-foreground/90 text-sm/relaxed text-pretty">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="text-muted-foreground flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          {DATA.name}. Written and rewritten in {DATA.location}.
        </p>
        <Link
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-accent flex w-fit items-center gap-2 py-0.5 font-semibold transition-colors"
        >
          <Icons.github className="size-4" />
          Source for this site
        </Link>
      </div>
    </div>
  </footer>
);
