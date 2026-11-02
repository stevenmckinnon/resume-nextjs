import { DATA } from "@/data/resume";

const GROUPS = [...new Set(DATA.skills.map((skill) => skill.group))];

/**
 * Grouped as on the CV, and plain text on purpose. Each name is a word a
 * recruiter may be searching the page for, and the icons this used to carry
 * could only ever cover the half of the list with a logo to its name.
 */
export const SkillsSection = () => (
  <dl className="flex flex-col gap-4">
    {GROUPS.map((group) => (
      <div
        key={group}
        className="grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-[9.5rem_minmax(0,1fr)]"
      >
        <dt className="text-muted-foreground text-sm font-semibold">{group}</dt>
        <dd className="text-foreground text-base/snug">
          {DATA.skills
            .filter((skill) => skill.group === group)
            .map((skill) => skill.name)
            .join(", ")}
        </dd>
      </div>
    ))}
  </dl>
);
