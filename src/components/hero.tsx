"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { Particles } from "@/components/magicui/particles";
import useBreakpoints from "@/hooks/useBreakpoints";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const { theme } = useTheme();
  const { isAboveMd } = useBreakpoints("md");
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar
  );

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start center", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const ctaTilt = useTransform(scrollYProgress, [0, 1], [0, 6]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden py-16 sm:py-24"
    >
      <Particles
        className="absolute inset-0"
        quantity={isAboveMd ? 100 : 50}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        size={0.8}
      />
      <div className="mx-auto w-full max-w-3xl px-6">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center"
        >
          <motion.div style={{ scale: avatarScale, y: avatarY }}>
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="flex h-full w-full items-center justify-center"
              animateOnLoad
            >
              <Image
                alt={DATA.name}
                src={DATA.avatarUrl}
                width={128}
                height={128}
                className="h-32 w-32 rounded-2xl border shadow-lg transition-all duration-500 md:h-auto md:w-auto"
              />
            </BlurFade>
          </motion.div>
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

          <motion.div style={{ rotateX: ctaTilt, transformPerspective: 800 }}>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
