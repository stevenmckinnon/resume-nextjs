import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Editorial standfirst. One line, sets up the section in the site's voice. */
  kicker?: string;
  id?: string;
  className?: string;
}

/**
 * No section number and no rule beside it. Size does the work: the jump from
 * this to the body text is what tells you a new section has started, at any
 * width and with no ornament to maintain.
 */
export const SectionHeading = ({
  title,
  kicker,
  id,
  className,
}: SectionHeadingProps) => (
  <div className={cn("flex flex-col gap-3", className)}>
    <h2
      id={id}
      className="text-foreground font-display text-[clamp(3rem,9cqw,7.5rem)] leading-none font-bold tracking-[-0.025em]"
    >
      {title}
    </h2>
    {kicker && (
      <p className="text-muted-foreground max-w-[52ch] text-lg/relaxed text-pretty md:text-xl/relaxed">
        {kicker}
      </p>
    )}
  </div>
);
