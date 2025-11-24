"use client";

import { MagneticButton } from "@/components/magicui/magnetic-button";
import { Particles } from "@/components/magicui/particles";
import { TypingEffect } from "@/components/magicui/typing-effect";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import useBreakpoints from "@/hooks/useBreakpoints";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export const Hero = () => {
  const { theme } = useTheme();
  const { isAboveMd } = useBreakpoints("md");
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Split name for styling
  const firstName = DATA.name.split(" ")[0].toUpperCase();
  const lastName = DATA.name.split(" ")[1].toUpperCase();

  const letterAnimation = {
    hidden: { y: 100, opacity: 0, rotateX: 90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const roles = [
    "Lead Frontend Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "TypeScript Expert",
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 py-12 md:px-8 md:py-24 lg:px-16 lg:py-32"
    >
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={isAboveMd ? 200 : 100}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        vx={0.2}
        vy={0.2}
      />

      {/* Background large text element for depth */}
      <div className="font-display pointer-events-none absolute top-0 right-0 z-0 translate-x-[20%] -translate-y-[10%] text-[30vw] leading-none font-black tracking-tighter opacity-[0.02] select-none dark:opacity-[0.04]">
        SM
      </div>

      {/* Decorative grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-primary)/3_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)/3_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-size-[4rem_4rem] dark:opacity-30" />

      <div className="z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-2 lg:gap-24">
        <motion.div
          className="order-2 flex flex-col items-center space-y-6 text-center md:order-1 md:items-start md:space-y-8 md:text-left lg:order-1"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {/* Name Heading */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.h1 className="font-display text-foreground text-5xl leading-[0.85] font-black tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="block">
                  {firstName.split("").map((char, i) => (
                    <motion.span
                      key={`first-${char}-${i}`}
                      variants={letterAnimation}
                      className="from-foreground to-foreground/70 inline-block bg-linear-to-b bg-clip-text text-transparent"
                      style={{ perspective: "1000px" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="text-primary block">
                  {lastName.split("").map((char, i) => (
                    <motion.span
                      key={`last-${char}-${i}`}
                      variants={letterAnimation}
                      className="inline-block"
                      style={{ perspective: "1000px" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>
          </div>

          {/* Typing Effect Role */}
          <motion.div
            variants={letterAnimation}
            className="flex h-[24px] items-center gap-3"
          >
            <div className="bg-primary/50 h-px w-8" />
            <TypingEffect
              texts={roles}
              className="text-muted-foreground font-mono text-sm tracking-widest uppercase md:text-base"
              typingSpeed={80}
              deletingSpeed={40}
              delayBetween={2500}
            />
          </motion.div>

          {/* Description */}
          <motion.div variants={letterAnimation} className="max-w-xl">
            <p className="text-muted-foreground border-primary/30 pl-6 text-lg leading-relaxed font-light md:text-xl lg:border-l-2 lg:text-2xl">
              {DATA.description}
            </p>
          </motion.div>

          {/* CTAs with Magnetic Effect */}
          <motion.div
            variants={letterAnimation}
            className="flex flex-wrap justify-center gap-4 pt-4 md:justify-start"
          >
            <MagneticButton strength={30}>
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden lg:h-14 lg:text-lg"
              >
                <Link href="#contact">
                  <span className="relative z-10">Work With Me</span>
                  <motion.div
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton strength={30}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group lg:h-14 lg:text-lg"
              >
                <Link href="/cv.pdf" target="_blank" download>
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  Download CV
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Socials - Horizontal list with hover effects */}
          <motion.div
            variants={letterAnimation}
            className="flex items-center justify-center gap-1 pt-8 md:justify-start"
          >
            {socials.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  className={cn(
                    "group relative flex items-center justify-center rounded-full p-3",
                    "text-muted-foreground transition-all duration-300",
                    "hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="sr-only">{social.name}</span>

                  {/* Tooltip */}
                  <span className="bg-card text-foreground pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 font-mono text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {social.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image / Visual Side */}
        <motion.div
          style={{ y, opacity, scale }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative order-1 mb-8 h-[280px] w-full transition-all duration-500 ease-out md:order-2 md:mb-0 md:h-[400px] md:w-full lg:order-2 lg:mb-0 lg:h-[600px] lg:w-full"
        >
          {/* Gradient glow */}
          <div className="from-primary/30 via-secondary/20 to-accent/20 absolute inset-0 rounded-full bg-linear-to-tr opacity-60 blur-[100px]" />

          {/* Main image container */}
          <div className="border-border bg-card/50 relative mx-auto h-full w-full max-w-[280px] rotate-3 rounded-2xl border-2 p-2 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:scale-105 hover:rotate-0 md:mx-0 md:max-w-none">
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                alt={DATA.name}
                src={DATA.avatarUrl}
                fill
                className="object-cover object-center"
                priority
              />

              {/* Overlay gradient */}
              <div className="from-background/80 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-40" />
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="border-border bg-card/90 absolute -right-4 bottom-1/4 hidden rounded-lg border px-4 py-2 shadow-xl backdrop-blur-sm md:block"
          >
            <p className="text-muted-foreground font-mono text-xs">Based in</p>
            <p className="font-display text-foreground font-bold">
              Glasgow, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
