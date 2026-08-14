interface SectionHeadingProps {
  title: string;
  /** Editorial standfirst. One line, sets up the section in the site's voice. */
  kicker?: string;
}

/**
 * No section number.
 *
 * Each heading used to carry a zero-padded `01`/`02` in accent mono above the
 * title. Two problems. The sequence was a lie — shrinking the GitHub section
 * left it unnumbered between 05 and 06, so the count skipped a section the
 * reader could plainly see. And the numbers were never navigable: they
 * enumerated without indexing anything, while the command palette did the
 * actual wayfinding. A section's place on the page already tells you where you
 * are; the heading alone is enough.
 */
export const SectionHeading = ({ title, kicker }: SectionHeadingProps) => (
  <div className="border-primary-accent/40 flex flex-row items-center gap-4 border-b pb-4 md:flex-col md:items-start md:border-b-0 md:border-l-2 md:pb-0 md:pl-6">
    <h2 className="text-foreground text-xl font-black tracking-tight wrap-break-word uppercase md:text-2xl md:break-normal lg:text-3xl">
      {title}
    </h2>
    {/* Hidden on mobile, where the heading collapses to a single row and a
        second line of prose would crowd the content it introduces. */}
    {kicker && (
      <p className="text-muted-foreground hidden max-w-[28ch] text-sm/relaxed text-balance md:block">
        {kicker}
      </p>
    )}
  </div>
);
