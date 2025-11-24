import Link from "next/link";
import Markdown from "react-markdown";

import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
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
  number: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`mb-24 grid grid-cols-1 gap-8 md:mb-32 md:grid-cols-[300px_1fr] md:gap-16 ${className}`}
  >
    <div className="h-fit md:sticky md:top-32">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="border-primary/40 flex flex-row items-center gap-4 border-b pb-4 md:flex-col md:items-start md:border-b-0 md:border-l-4 md:pb-0 md:pl-8">
          <span className="text-primary font-mono text-sm tracking-widest uppercase opacity-70">
            {number}
          </span>
          <h2 className="font-display text-foreground text-xl font-black tracking-tight break-words uppercase md:text-2xl md:break-normal lg:text-3xl">
            {title}
          </h2>
        </div>
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
        <Section id="about" title="About" number="01">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground mb-4 flex items-center gap-2">
                <MapPin className="size-4" />
                <Link
                  href={DATA.locationLink}
                  className="hover:text-primary transition-colors hover:underline"
                >
                  {DATA.location}
                </Link>
              </div>
              <Markdown className="prose text-muted-foreground dark:prose-invert max-w-full text-lg leading-relaxed">
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </Section>

        <Section id="skills" title="Skills" number="02">
          <SkillsSection />
        </Section>

        <Section id="work" title="Experience" number="03">
          {DATA.work.map((work, id) => (
            <BlurFade
              key={`${work.company}-${work.start}`}
              delay={BLUR_FADE_DELAY * 4 + id * 0.05}
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

        <Section id="education" title="Education" number="04">
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 5 + id * 0.05}
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

        <Section id="projects" title="Projects" number="05">
          <div className="grid grid-cols-1 gap-8">
            {DATA.projects?.map((project, id) => (
              <BlurFade
                key={project.name}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
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

        <Section id="other" title="Other" number="06">
          <div className="flex flex-col gap-4">
            {DATA.otherWork.map((work, id) => (
              <BlurFade
                key={`${work.company}-${work.start}`}
                delay={BLUR_FADE_DELAY * 7 + id * 0.05}
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

        <div className="mt-24">
          <Contact />
        </div>
      </div>
    </>
  );
}
