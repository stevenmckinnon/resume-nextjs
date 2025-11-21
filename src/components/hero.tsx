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
    (social) => social.navbar
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
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden py-12 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16"
    >
      <Particles
        className="absolute inset-0 -z-10"
        quantity={isAboveMd ? 200 : 100}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        vx={0.2}
        vy={0.2}
      />

      {/* Background large text element for depth */}
      <div className="absolute right-0 top-0 opacity-[0.04] pointer-events-none select-none font-display font-black text-[30vw] leading-none tracking-tighter z-0 translate-x-[20%] -translate-y-[10%]">
        SM
      </div>

      <div className="z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
        <motion.div
          className="flex flex-col space-y-6 md:space-y-8 order-2 md:order-1 lg:order-1 items-center text-center md:items-start md:text-left"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {/* Name Heading */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.h1 className="font-display font-black text-5xl lg:text-6xl tracking-tighter leading-[0.9] text-foreground">
                <span className="block text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/70 whitespace-nowrap">
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
                <span className="block text-primary whitespace-nowrap">
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
            <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed md:border-l-2 border-primary md:pl-6">
              {DATA.description}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={letterAnimation}
            className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start"
          >
            <Button asChild size="lg" className="lg:h-14 lg:text-lg">
              <Link href="#contact">Work With Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="lg:h-14 lg:text-lg">
              <Link href="#projects">View Projects</Link>
            </Button>
          </motion.div>

          {/* Socials - Horizontal list */}
          <motion.div
            variants={letterAnimation}
            className="flex items-center gap-4 pt-8 justify-center md:justify-start"
          >
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                className="group relative p-2 hover:-translate-y-1 transition-transform"
              >
                <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
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
          className="relative h-[260px] w-full md:h-[350px] md:w-full lg:h-[600px] lg:w-full order-1 md:order-2 lg:order-2 mb-8 md:mb-0 lg:mb-0"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] opacity-50" />
          <div className="relative h-full w-full border border-border bg-card/50 backdrop-blur-sm p-2 rotate-3 hover:rotate-0 transition-all duration-500 ease-out shadow-2xl max-w-[260px] md:max-w-none mx-auto md:mx-0">
            <div className="relative h-full w-full overflow-hidden md:grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                alt={DATA.name}
                src={DATA.avatarUrl}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Scanline overlay */}
              <div className="hidden md:absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
