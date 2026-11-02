"use client";

import { Reveal } from "@/components/reveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#01";

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      setIsGlitching(true);
      let iteration = 0;
      const maxIterations = text.length * 3;

      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (i < iteration / 3) return char;
              return GLITCH_CHARS[
                Math.floor(Math.random() * GLITCH_CHARS.length)
              ];
            })
            .join(""),
        );

        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplay(text);
          setIsGlitching(false);
          timeout = setTimeout(triggerGlitch, 3000 + Math.random() * 2000);
        }
      }, 40);
    };

    timeout = setTimeout(triggerGlitch, 1200);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <span
      className={
        isGlitching
          ? "text-primary-accent/80 transition-none"
          : "transition-colors duration-300"
      }
    >
      {display}
    </span>
  );
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-6">
      {/* Section label — mimics the site's section numbering */}
      <Reveal onLoad>
        <span className="text-primary-accent mb-6 block text-sm font-semibold">
          Error
        </span>
      </Reveal>

      <Reveal onLoad>
        <h1 className="font-display relative text-[clamp(7rem,25vw,16rem)] leading-none font-bold tracking-tighter select-none">
          <GlitchText text="404" />
        </h1>
      </Reveal>

      <Reveal onLoad>
        <div className="border-primary-accent/40 my-8 w-24 border-t" />
      </Reveal>

      <Reveal onLoad>
        <p className="text-muted-foreground max-w-sm text-center font-sans text-base/relaxed">
          This page doesn&apos;t exist. Or it did, and something went wrong.
          Either way, there&apos;s nothing to see here.
        </p>
      </Reveal>

      <Reveal onLoad>
        <motion.div
          whileHover={{ x: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="text-primary-accent hover:text-primary-accent/70 flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <span className="text-xs">←</span>
            Back to home
          </Link>
        </motion.div>
      </Reveal>
    </div>
  );
}
