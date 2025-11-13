"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "./ui/shadcn-io/particles";

export const Hero = () => {
  const { theme } = useTheme();
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar
  );

  return (
    <section id="hero" className="relative flex min-h-screen items-center">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        staticity={50}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        size={0.8}
      />
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="flex flex-col text-center items-center space-y-6">
          <BlurFade
            delay={BLUR_FADE_DELAY}
            className="h-full w-full flex items-center justify-center"
            animateOnLoad
          >
            <Image
              alt={DATA.name}
              src={DATA.avatarUrl}
              width={128}
              height={128}
              className="rounded-2xl border shadow-lg w-32 h-32 md:w-auto md:h-auto"
            />
          </BlurFade>
          <div className="flex items-center justify-center gap-2">
            {socials.map((social, id) => (
              <BlurFade
                key={social.name}
                delay={BLUR_FADE_DELAY + id * 0.2}
                animateOnLoad
              >
                <Link
                  href={social.url}
                  className="flex size-8 items-center justify-center rounded-full hover:bg-muted"
                  target="_blank"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 1.5} animateOnLoad>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Hi, I&apos;m {DATA.name}
            </h1>
          </BlurFade>
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="max-w-[600px] text-muted-foreground md:text-xl"
            text={DATA.description}
          />

          <div className="flex items-center justify-center gap-2">
            <BlurFade delay={BLUR_FADE_DELAY * 3} animateOnLoad>
              <Button asChild>
                <Link href="#contact">Let&apos;s Work Together</Link>
              </Button>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4} animateOnLoad>
              <Button asChild variant="outline">
                <Link href="#location">Learn More</Link>
              </Button>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};
