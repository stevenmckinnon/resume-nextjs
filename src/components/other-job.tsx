import BlurFade from "@/components/magicui/blur-fade";
import { ParallaxImage } from "@/components/parallax-image";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";
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
  <p className="text-muted-foreground mt-3 font-mono text-xs tracking-wide">
    {children}
  </p>
);

/**
 * The one section that does not use the page's numbered-rail grid. It runs
 * edge to edge and sets its own rhythm — full-bleed, then type, then an
 * asymmetric pair, then full-bleed again. Everything above it is a column of
 * cards, so the break is the point: this is the part of the CV nobody else has.
 */
export const OtherJob = () => (
  <section id="other" className="mb-24 md:mb-32">
    {/* Opener — full-bleed, heading overlaid on the image rather than sitting
        in the 240px rail every other section uses. */}
    <BlurFade delay={BLUR_FADE_DELAY}>
      <figure className="border-border/50 relative border-y">
        {/* Taller on phones: the overlaid heading needs vertical room, and a
            21/9 crop at 375px leaves a letterbox with text on top of it. */}
        <ParallaxImage
          src="/wr-nxt-uk.jpg"
          alt="Steve McKinnon in the ring with a handheld broadcast camera at an NXT UK taping"
          className="aspect-3/4 w-full sm:aspect-video lg:aspect-21/9"
        />
        {/* Scrim sits over the parallax frame, not inside it, so it stays put
            while the photograph drifts underneath. */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

        <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-12 lg:p-16">
          <div className="mx-auto w-full max-w-[1200px]">
            <h2 className="text-3xl font-black tracking-tight text-balance text-white uppercase md:text-5xl lg:text-6xl">
              The Other Job
            </h2>
            <p className="mt-3 max-w-md text-base/relaxed text-white/90 md:text-lg">
              I shoot wrestling. Sometimes for WWE.
            </p>
          </div>
        </figcaption>
      </figure>
    </BlurFade>

    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-24">
      {/* The show names are the credit. Set as type rather than as captions,
          because two of the photos have no branding in frame to caption with.
          They need the label above them: without it this is five wrestling
          words in large type and no indication of what they are. */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="pt-12 md:pt-20">
          <h3 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
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
                <span className="text-foreground/90 text-xl font-black tracking-tight whitespace-nowrap uppercase md:text-3xl lg:text-4xl">
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
      </BlurFade>

      {/* Asymmetric pair — the only portrait image in the set anchors the left
          column, so the ratio does the work instead of a border. */}
      <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:pt-20">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
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
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex h-full flex-col justify-center gap-8">
            <p className="text-muted-foreground max-w-[46ch] text-lg/relaxed text-pretty md:text-xl/relaxed">
              Weekends and evenings I&apos;m on a broadcast camera. Live, no
              second take, and the director is in your ear the whole time.
            </p>

            <ul className="divide-border/50 divide-y">
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
                          className="decoration-primary hover:text-primary-accent underline-offset-4 transition-colors hover:underline"
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
                  <span className="text-muted-foreground shrink-0 font-mono text-xs">
                    {work.start} - {work.end ?? "Present"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>
      </div>
    </div>

    {/* Closer — the job rather than the show. */}
    <BlurFade delay={BLUR_FADE_DELAY * 5}>
      <figure className="border-border/50 mt-12 border-y md:mt-20">
        <ParallaxImage
          src="/wr-production.jpg"
          alt="The view from behind the production desk: banks of monitors and mixing gear facing the ring, with the crowd holding up coloured cards"
          className="aspect-4/3 w-full sm:aspect-video lg:aspect-21/9"
        />
      </figure>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-24">
        <Caption>Behind the production desk.</Caption>
      </div>
    </BlurFade>
  </section>
);
