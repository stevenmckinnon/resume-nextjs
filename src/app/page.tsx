import { Contact } from "@/components/contact";
import { GitHubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { LogDumperDemo } from "@/components/log-dumper-demo";
import { OtherJob } from "@/components/other-job";
import { ProjectFeature } from "@/components/project-feature";
import { ProjectTile } from "@/components/project-tile";
import { Reveal } from "@/components/reveal";
import { Rundown } from "@/components/rundown";
import { SectionHeading } from "@/components/section-heading";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/resume";

const Column = ({ children }: { children: React.ReactNode }) => (
  <div className="@container mx-auto w-full max-w-[1440px] px-4 md:px-10">
    {children}
  </div>
);

export default function Page() {
  const [featuredProject, ...rest] = DATA.projects ?? [];
  // Anything with a live demo is pulled out of the screenshot grid and given
  // its own block below it. A tile showing a PNG of a tool you can actually
  // run three inches further down is the weaker of the two.
  const supportingProjects = rest.filter((project) => !project.liveDemo);
  const liveProjects = rest.filter((project) => project.liveDemo);
  const [lead, ...paragraphs] = DATA.summary.split("\n\n");

  return (
    <>
      <Hero />

      <Column>
        <section
          id="about"
          aria-labelledby="about-heading"
          className="short:mb-20 mb-24 flex flex-col gap-10 md:mb-40"
        >
          <Reveal>
            <SectionHeading id="about-heading" title="About" />
          </Reveal>

          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <Reveal className="flex flex-col gap-5 lg:col-span-6">
              <p className="text-foreground text-2xl/snug font-semibold tracking-tight text-balance md:text-3xl/snug">
                {lead}
              </p>
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-muted-foreground max-w-[60ch] text-lg/relaxed text-pretty ${index > 0 ? "short:hidden" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal
              order={1}
              className="flex scroll-mt-24 flex-col gap-6 lg:col-span-6"
            >
              <section id="skills" aria-labelledby="skills-heading">
                <h3
                  id="skills-heading"
                  className="text-foreground font-display mb-5 text-3xl font-bold tracking-tight md:text-4xl"
                >
                  Skills
                </h3>
                <SkillsSection />
              </section>
            </Reveal>
          </div>

          <Reveal order={2}>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
              {DATA.highlights.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="text-muted-foreground max-w-[26ch] text-base/snug">
                    {label}
                  </dt>
                  <dd className="text-foreground font-display order-first text-[clamp(3.5rem,9cqw,7.5rem)] leading-none font-bold tracking-[-0.025em] tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="short:mb-20 mb-24 flex flex-col gap-10 md:mb-40"
        >
          <Reveal>
            <SectionHeading
              id="work-heading"
              title="Experience"
              kicker="Five roles, three companies, one recurring theme: the UI foundations other people build on."
            />
          </Reveal>

          <Rundown />

          <Reveal>
            <section
              id="education"
              aria-labelledby="education-heading"
              className="flex scroll-mt-24 flex-col gap-1 px-5 md:px-8"
            >
              <h3
                id="education-heading"
                className="text-muted-foreground text-base font-semibold"
              >
                Education
              </h3>
              {DATA.education.map((education) => (
                <p
                  key={education.school}
                  className="text-foreground text-lg/snug"
                >
                  {education.degree},{" "}
                  <a
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-accent font-semibold underline-offset-4 transition-colors hover:underline"
                  >
                    {education.school}
                  </a>
                  . {education.start} to {education.end}.
                </p>
              ))}
            </section>
          </Reveal>
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="short:mb-20 mb-24 md:mb-40"
        >
          <Reveal>
            <SectionHeading
              id="projects-heading"
              title="Projects"
              kicker="Things I built because I wanted them to exist."
              className="short:mb-8 mb-10 md:mb-16"
            />
          </Reveal>

          {/* The short version flattens the feature and the grid into one list
              of names and sentences, with the pictures gone. */}
          <div className="short:grid short:grid-cols-1 short:gap-x-8 short:gap-y-6 short:md:grid-cols-2 short:lg:grid-cols-3">
            {featuredProject && (
              <Reveal>
                <ProjectFeature project={featuredProject} />
              </Reveal>
            )}

            <div className="short:contents mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
              {supportingProjects.map((project, index) => (
                <Reveal key={project.name} order={index % 2}>
                  <ProjectTile project={project} />
                </Reveal>
              ))}
            </div>

            {liveProjects.map((project) => (
              <div key={project.name} className="short:block hidden">
                <ProjectTile project={project} />
              </div>
            ))}
          </div>

          {liveProjects.length > 0 && (
            <div className="short:hidden mt-16 md:mt-24">
              <Reveal>
                <LogDumperDemo />
              </Reveal>
            </div>
          )}
        </section>

        <GitHubActivity />
      </Column>

      {/* Deliberately outside the column: this section runs edge to edge, which
          it cannot do from inside a max-width container. */}
      <OtherJob />

      <Column>
        <Contact />
      </Column>
    </>
  );
}
