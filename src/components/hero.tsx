"use client";

import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
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
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 py-12 md:px-8 md:py-24 lg:px-16 lg:py-32"
    >
      <Particles
        className="absolute inset-0 -z-10"
        quantity={isAboveMd ? 200 : 100}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        vx={0.2}
        vy={0.2}
      />

      {/* Background large text element for depth */}
      <div className="font-display pointer-events-none absolute top-0 right-0 z-0 translate-x-[20%] -translate-y-[10%] text-[30vw] leading-none font-black tracking-tighter opacity-[0.04] select-none">
        SM
      </div>

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
              <motion.h1 className="font-display text-foreground text-5xl leading-[0.9] font-black tracking-tighter lg:text-6xl">
                <span className="from-foreground to-foreground/70 block bg-linear-to-b bg-clip-text whitespace-nowrap text-transparent">
                  {firstName.split("").map((char, i) => (
                    <motion.span
                      key={`${char}-${i}`}
                      variants={letterAnimation}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="text-primary block whitespace-nowrap">
                  {lastName.split("").map((char, i) => (
                    <motion.span
                      key={`${char}-${i}`}
                      variants={letterAnimation}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>
          </div>

          {/* Description */}
          <motion.div variants={letterAnimation} className="max-w-xl">
            <p className="text-muted-foreground border-primary text-xl leading-relaxed font-light md:border-l-2 md:pl-6 lg:text-2xl">
              {DATA.description}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={letterAnimation}
            className="flex flex-wrap justify-center gap-4 pt-4 md:justify-start"
          >
            <Button asChild size="lg" className="lg:h-14 lg:text-lg">
              <Link href="#contact">Work With Me</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="lg:h-14 lg:text-lg"
            >
              <Link href="#projects">View Projects</Link>
            </Button>
          </motion.div>

          {/* Socials - Horizontal list */}
          <motion.div
            variants={letterAnimation}
            className="flex items-center justify-center gap-4 pt-8 md:justify-start"
          >
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                className="group relative p-2 transition-transform hover:-translate-y-1"
              >
                <social.icon className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                  {social.name}
                </span>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Image / Visual Side */}
        <motion.div
          style={{ y, opacity, scale }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative order-1 mb-8 h-[260px] w-full transition-all duration-500 ease-out md:order-2 md:mb-0 md:h-[350px] md:w-full lg:order-2 lg:mb-0 lg:h-[600px] lg:w-full"
        >
          <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-full bg-linear-to-tr opacity-50 blur-[100px]" />
          <div className="border-border bg-card/50 relative mx-auto h-full w-full max-w-[260px] rotate-3 rounded-md border p-2 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:rotate-0 md:mx-0 md:max-w-none">
            <div className="relative h-full w-full overflow-hidden rounded-[10px] transition-all duration-500">
              <Image
                alt={DATA.name}
                src={DATA.avatarUrl}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Scanline overlay */}
              <div className="pointer-events-none inset-0 hidden bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20 md:absolute" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
