import { ProjectLinks } from "@/components/project-links";
import type { Project } from "@/types/resume";

/**
 * Smaller builds as a list, one row each, no screenshots.
 *
 * With eight projects, an image tile for every one gave a link-in-bio tool
 * the same weight as an app on the App Store. Products keep the images; these
 * get a name, a line and their links, which is all they need. A new side
 * project lands here by default, so the image grid stops growing.
 */
export const ProjectIndex = ({ projects }: { projects: Project[] }) => {
  if (!projects.length) return null;

  return (
    <div>
      <h3 className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
        Smaller builds
      </h3>
      <ul className="border-border/60 mt-4 border-t">
        {projects.map((project) => (
          <li
            key={project.name}
            className="border-border/60 grid grid-cols-1 gap-x-10 gap-y-3 border-b py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-start"
          >
            {/* Platform sits under the name, not beside it. Beside it, a name
                that wraps ("Photography Portfolio") shoved the label to the
                far edge of the column. */}
            <div className="flex flex-col gap-1">
              <span className="text-foreground font-display text-xl/tight font-bold tracking-tight text-balance">
                {project.name}
              </span>
              {project.platform && (
                <span className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                  {project.platform}
                </span>
              )}
            </div>
            <p className="text-muted-foreground max-w-[60ch] text-sm/relaxed text-pretty">
              {project.description}
            </p>
            <ProjectLinks project={project} className="md:justify-end" />
          </li>
        ))}
      </ul>
    </div>
  );
};
