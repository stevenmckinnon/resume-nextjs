import Link from "next/link";
import Markdown from "react-markdown";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { Download } from "lucide-react";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { SimpleCard } from "@/components/simple-card";
import { Hero } from "@/components/hero";
import { Contact } from "@/components/contact";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="max-w-2xl mx-auto flex flex-col gap-y-10 mt-12 px-6 md:px-0">
        <section id="location">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">Location</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
            <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              <Link href={DATA.locationLink}>{DATA.location}</Link>
            </p>
          </BlurFade>
        </section>
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <h2 className="text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map(({ name, icon: Icon }, id) => (
                <BlurFade key={name} delay={BLUR_FADE_DELAY * 7 + id * 0.05}>
                  <Badge>
                    {Icon && <Icon className="size-4 mr-2" />}
                    {name}
                  </Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <h2 className="text-xl font-bold">Work Experience</h2>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={`${work.company}-${work.start}`}
                delay={BLUR_FADE_DELAY * 9 + id * 0.05}
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
          </div>
        </section>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 11 + id * 0.05}
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
          </div>
        </section>
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <h2 className="text-xl font-bold">Projects</h2>
            </BlurFade>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA.projects?.map((project, id) => (
                <BlurFade
                  key={project.name}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    logoUrl={project.logoUrl}
                    altText={project.name}
                    title={project.name}
                    description={project.description}
                    website={project.website}
                    github={project.github}
                    icon={project.icon}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="other-work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <h2 className="text-xl font-bold">Other Work</h2>
            </BlurFade>
            {DATA.otherWork.map((work, id) => (
              <BlurFade
                key={`${work.company}-${work.start}`}
                delay={BLUR_FADE_DELAY * 14 + id * 0.05}
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
        </section>
        <section id="download-cv" className="mt-6">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7.8}>
              <div className="bg-muted/50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-lg font-medium">Download my full CV</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Want a complete overview of my experience and
                    qualifications? Download my detailed CV in PDF format.
                  </p>
                </div>
                <Button asChild className="gap-2 min-w-36">
                  <Link
                    href="/cv.pdf"
                    target="_blank"
                    download="Steve McKinnon CV.pdf"
                  >
                    <Download className="size-4" />
                    Download CV
                  </Link>
                </Button>
              </div>
            </BlurFade>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
