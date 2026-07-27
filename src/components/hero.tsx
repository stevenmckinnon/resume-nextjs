"use client";

import { SpinnablePhoto } from "@/components/spinnable-photo";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { type Variants, motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export const Hero = () => {
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  // Scroll-linked parallax for image
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Split name for styling
  const [firstName, lastName] = DATA.name.toUpperCase().split(" ");

  // One entrance step. Chunks are staggered by the container below, so the
  // sequence reads name → role → actions → socials rather than letter-by-letter.
  const chunk: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.6, bounce: 0 },
    },
  };

  const stack: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden py-20 md:py-24"
    >
      {/* Oversized initials, purely decorative depth */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 translate-x-[20%] -translate-y-[10%] text-[30vw] leading-none font-black tracking-tighter opacity-[0.02] select-none dark:opacity-[0.04]">
        {DATA.initials}
      </div>

      <div className="z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12 lg:px-24">
        <motion.div
          className="order-2 flex flex-col items-start space-y-8 text-left md:order-1"
          variants={stack}
          initial="hidden"
          animate="visible"
        >
          {/* Name */}
          <motion.h1
            variants={chunk}
            aria-label={DATA.name}
            className="text-foreground text-5xl leading-[0.85] font-black tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span
              className="from-foreground to-foreground/70 block bg-linear-to-b bg-clip-text text-transparent"
              aria-hidden="true"
            >
              {firstName}
            </span>
            <span className="text-primary block" aria-hidden="true">
              {lastName}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={chunk}
            className="border-primary/30 text-muted-foreground max-w-xl border-l-2 pl-6 text-lg/relaxed font-light md:text-xl lg:text-2xl"
          >
            {DATA.description}
          </motion.p>

          {/* Actions */}
          <motion.div variants={chunk} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              nativeButton={false}
              className="active:scale-[0.96] lg:h-14 lg:text-lg"
              render={<Link href="#contact">Get in touch</Link>}
            />

            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="group active:scale-[0.96] lg:h-14 lg:text-lg"
              render={
                <a href="/api/cv" download="Steve McKinnon CV.pdf">
                  <Download className="mr-2 size-4 transition-transform group-hover:-translate-y-0.5" />
                  Download CV
                </a>
              }
            />
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={chunk}
            className="-ml-3 flex items-center gap-1"
          >
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative flex items-center justify-center rounded-full p-3",
                  "text-muted-foreground transition-colors duration-150",
                  "hover:bg-primary/10 hover:text-primary",
                )}
              >
                <social.icon className="size-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Photo with drag-to-spin */}
        <SpinnablePhoto
          src={DATA.avatarUrl}
          alt={DATA.name}
          parallax={{ y, opacity, scale }}
        />
      </div>
    </section>
  );
};
