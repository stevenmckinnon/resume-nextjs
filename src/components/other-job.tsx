import { ParallaxImage } from "@/components/parallax-image";
import { Reveal } from "@/components/reveal";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";

/** Shows Steve has worked on. Ordered by how widely they'd be recognised. */
const SHOWS = [
  "WrestleMania",
  "Royal Rumble",
  "Raw",
  "SmackDown",
  "Clash at the Castle",
  "Night of Champions",
  "Crown Jewel",
  "NXT",
];

const Caption = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground mt-3 text-sm">{children}</p>
);

/**
 * The source of the whole concept: the mixer, the tally and the timeline all
 * come from this job. It runs edge to edge and sets its own rhythm, full-bleed,
 * then type, then an asymmetric pair, then full-bleed again. The short version
 * keeps the credits and drops the photographs.
 */
export const OtherJob = () => (
  <section
    id="other"
    aria-labelledby="other-heading"
    className="short:mb-20 @container mb-24 md:mb-40"
  >
    {/* Opener — full-bleed, heading overlaid on the image rather than sitting
        in the 240px rail every other section uses. */}
    <Reveal className="short:hidden">
      <figure className="relative">
        {/* Taller on phones: the overlaid heading needs vertical room, and a
            21/9 crop at 375px leaves a letterbox with text on top of it. */}
        <ParallaxImage
          src="/wr-nxt-uk.jpg"
          alt="Steve McKinnon in the ring with a handheld broadcast camera at an NXT UK taping"
          className="aspect-3/4 w-full sm:aspect-video lg:aspect-21/9"
        />
        {/* A lower third, the way a broadcast names what is on screen. Solid,
            because a gradient scrim only ever guesses at the contrast of whatever
            part of the photograph drifts underneath it. */}
        <figcaption className="bg-background absolute inset-x-0 bottom-0 flex gap-4 p-5 md:inset-x-auto md:bottom-10 md:left-10 md:gap-5 md:p-8">
          <span aria-hidden="true" className="bg-tally w-1.5 shrink-0" />
          <div>
            <p
              aria-hidden="true"
              className="font-display text-foreground text-[clamp(2.75rem,7.5cqw,6rem)] leading-none font-bold tracking-[-0.025em]"
            >
              The other job
            </p>
            <p className="text-muted-foreground mt-3 text-base/relaxed md:text-lg">
              I shoot wrestling. Sometimes for WWE.
            </p>
          </div>
        </figcaption>
      </figure>
    </Reveal>

    <div className="@container mx-auto w-full max-w-[1440px] px-4 md:px-10">
      {/* One heading in the document at any length. It is only seen in the short
          version, where the photograph it sits on is gone; the full version
          shows the same words over the picture. */}
      <h2
        id="other-heading"
        className="short:not-sr-only font-display short:text-[clamp(3rem,9cqw,7.5rem)] short:leading-none short:font-bold short:tracking-[-0.025em] sr-only"
      >
        The other job
      </h2>
      {/* The show names are the credit. Set as type rather than as captions,
          because two of the photos have no branding in frame to caption with.
          They need the label above them: without it this is five wrestling
          words in large type and no indication of what they are. */}
      <Reveal>
        <div className="short:pt-4 pt-12 md:pt-20">
          <h3 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
            Shows I&apos;ve worked on
          </h3>
          <ul className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:mt-6 md:gap-x-6">
            {SHOWS.map((show, i) => (
              <li key={show} className="flex items-baseline gap-x-4 md:gap-x-6">
                {/* nowrap so a two-word show never splits across lines, and
                    tracking-tight rather than -tighter: at this size tighter
                    closes the space inside "Royal Rumble" until it reads as a
                    single word. */}
                {/* Sized for eight names, not five. At text-5xl the longer
                    list ran to four lines and outweighed the photography it
                    is meant to caption. */}
                <span className="text-foreground/90 font-display text-2xl font-bold whitespace-nowrap uppercase md:text-4xl lg:text-5xl">
                  {show}
                </span>
                {/* Trails its own name rather than leading the next one, so a
                    wrap ends a line with the slash instead of starting the
                    next line with one hanging in the margin. */}
                {i < SHOWS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-primary-accent/50 text-xl font-light md:text-3xl"
                  >
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Asymmetric pair — the only portrait image in the set anchors the left
          column, so the ratio does the work instead of a border. */}
      <div className="short:hidden grid grid-cols-1 gap-8 pt-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:pt-20">
        <Reveal>
          <figure>
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl">
              <Image
                src="/wr-camera.jpg"
                alt="Steve McKinnon operating a broadcast camera with a headset on, the live feed visible on the monitor and the crowd below"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="image-outline pointer-events-none absolute inset-0 rounded-2xl" />
            </div>
            <Caption>The monitor is what goes out.</Caption>
          </figure>
        </Reveal>

        <Reveal order={1}>
          <div className="flex h-full flex-col justify-center gap-8">
            <p className="text-muted-foreground max-w-[46ch] text-lg/relaxed text-pretty md:text-xl/relaxed">
              Weekends and evenings I&apos;m on a broadcast camera. Live, no
              second take, and the director is in your ear the whole time.
            </p>

            <ul className="flex flex-col gap-2">
              {DATA.otherWork.map((work) => (
                <li
                  key={`${work.company}-${work.start}`}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <h3 className="text-foreground font-bold">
                      {work.href ? (
                        <Link
                          href={work.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="decoration-primary hover:text-primary-accent inline-block py-0.5 underline-offset-4 transition-colors hover:underline"
                        >
                          {work.company}
                        </Link>
                      ) : (
                        work.company
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {work.title}
                    </p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
                    Since {work.start}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>

    {/* Closer — the job rather than the show. */}
    <Reveal className="short:hidden">
      <figure className="mt-12 md:mt-20">
        <ParallaxImage
          src="/wr-production.jpg"
          alt="The view from behind the production desk: banks of monitors and mixing gear facing the ring, with the crowd holding up coloured cards"
          className="aspect-4/3 w-full sm:aspect-video lg:aspect-21/9"
        />
      </figure>
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <Caption>Behind the production desk.</Caption>
      </div>
    </Reveal>
  </section>
);
