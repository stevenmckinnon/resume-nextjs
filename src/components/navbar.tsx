"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = (latestScrollY: number) => {
    if (typeof window !== "undefined") {
      if (latestScrollY > window.innerHeight * 0.6) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => checkVisibility(latest));

  useEffect(() => {
    checkVisibility(scrollY.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom"
        >
          <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-background/80 backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background/80"></div>
          <Dock className="pointer-events-auto relative z-50 mx-auto flex h-full min-h-full items-center rounded-full border border-white/20 bg-white/10 px-1 backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.1)] transform-gpu dark:border-gray-700/20 dark:bg-gray-900/10 dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]">
            {DATA.navbar.map((item) => (
              <DockIcon key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12",
                        "rounded-full bg-transparent hover:border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:backdrop-blur-sm dark:border-gray-700/10 dark:hover:bg-gray-800/10 dark:hover:border-gray-700/20"
                      )}
                    >
                      <item.icon className="size-4" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator
              orientation="vertical"
              className="h-full bg-white/20 dark:bg-gray-700/20"
            />
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <DockIcon key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.url}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full bg-transparent hover:border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:backdrop-blur-sm dark:border-gray-700/10 dark:hover:bg-gray-800/10 dark:hover:border-gray-700/20"
                        )}
                      >
                        <social.icon className="size-4" />
                        <span className="sr-only">{name}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
            <Separator
              orientation="vertical"
              className="h-full py-2 bg-white/20 dark:bg-gray-700/20"
            />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
