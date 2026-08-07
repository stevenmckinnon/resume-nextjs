import Link from "next/link";
import Markdown from "react-markdown";

import { Contact } from "@/components/contact";
import { GitHubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SectionHeading } from "@/components/section-heading";
import { SimpleCard } from "@/components/simple-card";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { MapPin } from "lucide-react";

const Section = ({
  id,
  title,
  number,
  children,
  className,
}: {
  id: string;
  title: string;
  number: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`mb-24 grid grid-cols-1 gap-8 md:mb-32 md:grid-cols-[240px_1fr] md:gap-16 ${className} `}
  >
    <div className="h-fit md:sticky md:top-32">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading title={title} number={number} />
      </BlurFade>
    </div>
    <div className="flex flex-col gap-y-10">{children}</div>
  </section>
);

export default function Page() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-24 md:px-12 lg:px-24">
        <Section id="about" title="About" number={1}>
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
              <div className="text-muted-foreground max-w-full text-lg/relaxed">
                <Markdown>{DATA.summary}</Markdown>
              </div>
            </div>
          </BlurFade>
        </Section>

        <Section id="skills" title="Skills" number={2}>
          <SkillsSection />
        </Section>

        <Section id="work" title="Experience" number={3}>
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

        <Section id="education" title="Education" number={4}>
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

        <Section id="projects" title="Projects" number={5}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {DATA.projects?.map((project, id) => (
              <BlurFade key={project.name} delay={BLUR_FADE_DELAY + id * 0.05}>
                <ProjectCard
                  title={project.name}
                  description={project.description}
                  website={project.website}
                  github={project.github}
                  tags={project.tags ?? []}
                  image={project.image}
                />
              </BlurFade>
            ))}
          </div>
        </Section>

        <Section id="github" title="GitHub" number={6}>
          <GitHubActivity />
        </Section>

        <Section id="other" title="Beyond Code" number={7}>
          <div className="flex flex-col gap-4">
            {DATA.otherWork.map((work, id) => (
              <BlurFade
                key={`${work.company}-${work.start}`}
                delay={BLUR_FADE_DELAY + id * 0.05}
              >
                <SimpleCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                />
              </BlurFade>
            ))}
          </div>
        </Section>

        <Contact number={8} />
      </div>
    </>
  );
}
