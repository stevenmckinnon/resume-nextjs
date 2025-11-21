import Link from "next/link";
import Markdown from "react-markdown";

import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SimpleCard } from "@/components/simple-card";
import { Badge } from "@/components/ui/badge";
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
    className={`grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-16 mb-24 md:mb-32 ${className}`}
  >
    <div className="md:sticky md:top-32 h-fit">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 border-b md:border-b-0 md:border-l-4 border-primary/40 pb-4 md:pb-0 md:pl-8">
          <span className="text-sm font-mono text-primary tracking-widest uppercase opacity-70">
            {number}
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-black uppercase tracking-tight text-foreground break-words md:break-normal">
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
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <Section id="about" title="About" number="01">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="size-4" />
                <Link
                  href={DATA.locationLink}
                  className="hover:text-primary transition-colors hover:underline"
                >
                  {DATA.location}
                </Link>
              </div>
              <Markdown className="prose max-w-full text-lg text-muted-foreground dark:prose-invert leading-relaxed">
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </Section>

        <Section id="skills" title="Skills" number="02">
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map(({ name, icon: Icon }, id) => (
              <BlurFade key={name} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
                <Badge className="text-sm py-2 px-4">
                  {Icon && <Icon className="size-4 mr-2" />}
                  {name}
                </Badge>
              </BlurFade>
            ))}
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
