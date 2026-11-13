import { CareerTimeline } from "@/components/career-timeline";
import { LengthToggle } from "@/components/length-toggle";
import { DATA } from "@/data/resume";
import { buildTimeline } from "@/lib/career";
import Image from "next/image";
import Link from "next/link";

// Module scope rather than inside the component, where a Date would make the
// route dynamic under Cache Components. "Now" is the month of the last build.
const TIMELINE = buildTimeline(new Date());

const COLUMN = "mx-auto w-full max-w-[1440px] px-4 md:px-10";

/**
 * Name, then the picture nobody else applying for the job has, then the career
 * cut like an edit.
 *
 * On a phone the photograph is shown whole, at its own 3:2, so the camera stays
 * in frame as well as the face, and the lower third tucks under its bottom edge
 * rather than covering it. From the small breakpoint up there is room for both,
 * and the introduction sits in a lower third over the photograph, the way a
 * broadcast names what is on screen. Solid rather than a scrim, because a
 * gradient only guesses at the contrast of whatever part of the picture is
 * underneath it. It is inverted against the page in both themes, so it reads as
 * a caption card rather than as more of the page.
 */
export const Hero = () => {
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="flex w-full flex-col pb-14 md:pb-20"
    >
      <div className={`@container pt-6 md:pt-4 ${COLUMN}`}>
        <h1 className="hero-name">{DATA.name}</h1>
      </div>

      <div className="relative mt-3 md:mt-5">
        <div className="relative aspect-3/2 w-full sm:aspect-video md:aspect-auto md:h-[min(42rem,68dvh)]">
          <Image
            src="/timeline-icw.jpg"
            alt="Steve at the ring ropes with a broadcast camera on his shoulder and a headset on, under stage lights"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%] md:object-[50%_22%]"
          />
        </div>

        <div className="bg-foreground text-background relative mx-4 -mt-10 flex gap-4 p-5 sm:absolute sm:inset-x-4 sm:right-auto sm:bottom-4 sm:mx-0 sm:mt-0 sm:max-w-xl md:bottom-10 md:left-10 md:gap-5 md:p-8">
          <span
            aria-hidden="true"
            className="bg-primary w-1.5 shrink-0 md:w-2"
          />
          <div className="flex flex-col gap-4 md:gap-5">
            <p className="text-xl/snug font-semibold tracking-tight text-balance md:text-[1.75rem]/snug">
              {DATA.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <Link
                href="#contact"
                className="bg-background text-foreground focus-visible:outline-primary inline-flex h-12 items-center px-6 text-base font-bold transition-[opacity,scale] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.96] md:h-13 md:px-7 md:text-lg"
              >
                Get in touch
              </Link>
              <a
                href="/api/cv"
                download="Steve McKinnon CV.pdf"
                className="hover:decoration-primary focus-visible:outline-primary py-3 text-base font-bold underline decoration-2 underline-offset-[6px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:text-lg"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col gap-8 pt-5 md:gap-10 md:pt-6 ${COLUMN}`}>
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
                className="hover:text-primary-accent flex size-9 items-center justify-center transition-colors"
              >
                <social.icon aria-hidden="true" className="size-4" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </span>
          <LengthToggle className="ml-auto lg:hidden" />
        </div>

        <CareerTimeline timeline={TIMELINE} />
      </div>
    </section>
  );
};
