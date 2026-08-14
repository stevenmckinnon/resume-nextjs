"use client";

import {
  useCommandPalette,
  useShortcutLabel,
} from "@/components/command-palette";
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
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const commandPalette = useCommandPalette();
  const shortcutLabel = useShortcutLabel();

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
          <div className="bg-background/80 dark:bg-background/80 fixed inset-x-0 bottom-0 h-16 w-full backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>
          {/* Themed tokens, not hardcoded white. This used to be
              `bg-white/10 border-white/20`, which in light mode is a white
              surface with a white edge on a white page — the dock had no
              boundary at all and was held together purely by its drop shadow.
              Elevation now comes from --shadow-lg rather than a hand-rolled
              rgba stack. */}
          <Dock className="border-border bg-background/70 pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center rounded-full border px-1 shadow-lg backdrop-blur-xl">
            {DATA.navbar.map((item) => (
              <DockIcon key={item.href}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12",
                          "hover:bg-muted/80 rounded-full bg-transparent transition-colors duration-300",
                        )}
                      >
                        <item.icon className="size-4" />
                        <span className="sr-only">{item.label}</span>
                      </Link>
                    }
                  />
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator
              orientation="vertical"
              className="bg-border h-full"
            />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      onClick={commandPalette.open}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "hover:bg-muted/80 size-12 cursor-pointer rounded-full bg-transparent transition-colors duration-300",
                      )}
                    >
                      <SearchIcon className="size-4" />
                      <span className="sr-only">Open command palette</span>
                    </button>
                  }
                />
                <TooltipContent>
                  <p>Search · {shortcutLabel}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
            <Separator
              orientation="vertical"
              className="bg-border hidden h-full sm:block"
            />
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <DockIcon key={name} className="hidden sm:flex">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Link
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "hover:bg-muted/80 size-12 rounded-full bg-transparent transition-colors duration-300",
                          )}
                        >
                          <social.icon className="size-4" />
                          <span className="sr-only">{name}</span>
                        </Link>
                      }
                    />
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
            <Separator
              orientation="vertical"
              className="bg-border h-full py-2"
            />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger render={<ModeToggle />} />
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
