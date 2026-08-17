import Link from "next/link";
import Markdown from "react-markdown";

import { Contact } from "@/components/contact";
import { GitHubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { LogDumperDemo } from "@/components/log-dumper-demo";
import BlurFade from "@/components/magicui/blur-fade";
import { OtherJob } from "@/components/other-job";
import { ProjectFeature } from "@/components/project-feature";
import { ProjectTile } from "@/components/project-tile";
import { ResumeCard } from "@/components/resume-card";
import { SectionHeading } from "@/components/section-heading";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { MapPin } from "lucide-react";

const Section = ({
  id,
  title,
  kicker,
  children,
  className,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`mb-24 grid grid-cols-1 gap-8 md:mb-32 md:grid-cols-[240px_1fr] md:gap-16 ${className} `}
  >
    <div className="h-fit md:sticky md:top-32">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading title={title} kicker={kicker} />
      </BlurFade>
    </div>
    <div className="flex flex-col gap-y-10">{children}</div>
  </section>
);

export default function Page() {
  const [featuredProject, ...rest] = DATA.projects ?? [];
  // Anything with a live demo is pulled out of the screenshot grid and given
  // its own block below it. A tile showing a PNG of a tool you can actually
  // run three inches further down is the weaker of the two.
  const supportingProjects = rest.filter((project) => !project.liveDemo);
  const liveProjects = rest.filter((project) => project.liveDemo);

  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-24">
        <Section
          id="about"
          title="About"
          kicker="Twelve years of front-end. Eight of them at the same bank."
        >
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-6">
              <div className="text-muted-foreground flex items-center gap-2">
                <MapPin className="size-4" />
                <Link
                  href={DATA.locationLink}
                  className="hover:text-primary-accent transition-colors hover:underline"
                >
                  {DATA.location}
                </Link>
              </div>
              {/* The summary is three paragraphs now. Preflight strips the
                  default <p> margin, so without this they run together as one
                  block and the deliberate pauses are lost. Capped to a
                  readable measure rather than the full column width. */}
              <div className="text-muted-foreground max-w-[62ch] space-y-5 text-lg/relaxed text-pretty">
                <Markdown>{DATA.summary}</Markdown>
              </div>
            </div>
          </BlurFade>
        </Section>

        <Section
          id="skills"
          title="Skills"
          kicker="What I reach for, and what I've actually shipped with."
        >
          <SkillsSection />
        </Section>

        <Section
          id="work"
          title="Experience"
          kicker="Five roles, three companies, one recurring theme."
        >
          {DATA.work.map((work, id) => (
            <BlurFade
              key={`${work.company}-${work.start}`}
              delay={BLUR_FADE_DELAY + id * 0.05}
            >
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
                index={id}
              />
            </BlurFade>
          ))}
        </Section>

        <Section
          id="education"
          title="Education"
          kicker="I studied games development and ended up in risk technology."
        >
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </Section>

        {/* Projects drops the 240px rail so the feature image gets the full
            column width. */}
        <section id="projects" className="mb-24 md:mb-32">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="border-primary-accent/40 mb-12 flex flex-col gap-2 border-l-2 pl-6 md:mb-20">
              <h2 className="text-foreground text-2xl font-black tracking-tight uppercase md:text-4xl lg:text-5xl">
                Projects
              </h2>
              <p className="text-muted-foreground max-w-md text-base/relaxed md:text-lg">
                Things I built because I wanted them to exist.
              </p>
            </div>
          </BlurFade>

          {/* One feature, then a grid. Five alternating image-and-text rows
              was the same move repeated five times, and it gave every project
              identical weight regardless of which one is worth looking at. */}
          {featuredProject && (
            <BlurFade delay={BLUR_FADE_DELAY}>
              <ProjectFeature project={featuredProject} />
            </BlurFade>
          )}

          {supportingProjects.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
              {supportingProjects.map((project) => (
                <BlurFade key={project.name} delay={BLUR_FADE_DELAY}>
                  <ProjectTile project={project} />
                </BlurFade>
              ))}
            </div>
          )}

          {liveProjects.length > 0 && (
            <div className="mt-16 md:mt-24">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <LogDumperDemo />
              </BlurFade>
            </div>
          )}
        </section>

        <GitHubActivity />
      </div>

      {/* Deliberately outside the 1200px column — this section runs edge to
          edge, which it cannot do from inside a max-width container. */}
      <OtherJob />

      <div className="mx-auto w-full max-w-[1200px] px-6 pb-24 md:px-12 lg:px-24">
        <Contact />
      </div>
    </>
  );
}
