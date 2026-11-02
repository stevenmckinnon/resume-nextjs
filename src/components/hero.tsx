import { CareerTimeline } from "@/components/career-timeline";
import { LengthToggle } from "@/components/length-toggle";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { buildTimeline } from "@/lib/career";
import { Download } from "lucide-react";
import Link from "next/link";

// Module scope rather than inside the component, where a Date would make the
// route dynamic under Cache Components. "Now" is the month of the last build.
const TIMELINE = buildTimeline(new Date());

export const Hero = () => {
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="@container mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 pt-6 pb-10 md:min-h-[min(calc(100dvh-4rem),58rem)] md:gap-6 md:px-10 md:pt-4 md:pb-8"
    >
      <h1 className="hero-name">{DATA.name}</h1>

      <CareerTimeline
        timeline={TIMELINE}
        intro={
          <>
            <p className="text-foreground max-w-[32ch] text-2xl/snug font-semibold tracking-tight text-balance md:text-3xl/snug lg:text-[1.75rem]/snug">
              {DATA.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                nativeButton={false}
                className="active:scale-[0.96]"
                render={<Link href="#contact">Get in touch</Link>}
              />
              <Button
                variant="secondary"
                size="lg"
                nativeButton={false}
                className="group active:scale-[0.96]"
                render={
                  <a href="/api/cv" download="Steve McKinnon CV.pdf">
                    <Download
                      aria-hidden="true"
                      className="mr-2 size-4 transition-transform group-hover:-translate-y-0.5"
                    />
                    Download CV
                  </a>
                }
              />
              <LengthToggle className="lg:hidden" />
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <a
                href={`mailto:${DATA.contact.email}`}
                className="text-foreground hover:text-primary-accent inline-block py-0.5 font-semibold underline underline-offset-4 transition-colors"
              >
                {DATA.contact.email}
              </a>
              <span>{DATA.location}</span>
              <span className="-ml-2 flex items-center">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-accent flex size-9 items-center justify-center rounded-md transition-colors"
                  >
                    <social.icon aria-hidden="true" className="size-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </span>
            </div>
          </>
        }
      />
    </section>
  );
};
