import { iconMap } from "@/types/resume";

/**
 * Plain mono text, no pills and no separator glyph.
 *
 * These were bordered chips once, which put roughly thirty boxes on the page
 * competing with the screenshots. The replacement used a middle dot between
 * every tag, which is its own problem: seven of them on one line reads as
 * decoration rather than punctuation. The flex gap separates them perfectly
 * well on its own.
 */
export const ProjectTags = ({
  tags,
  className,
}: {
  tags: (keyof typeof iconMap)[];
  className?: string;
}) => {
  if (!tags?.length) return null;

  return (
    <ul
      className={`text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs ${className ?? ""}`}
    >
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};
