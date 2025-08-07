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
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background/80 backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background/80"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.1)] transform-gpu dark:bg-gray-900/10 dark:border-gray-700/20 dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12",
                    "rounded-full bg-transparent border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm dark:border-gray-700/10 dark:hover:bg-gray-800/10 dark:hover:border-gray-700/20"
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
                      "size-12 rounded-full bg-transparent border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm dark:border-gray-700/10 dark:hover:bg-gray-800/10 dark:hover:border-gray-700/20"
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
    </div>
  );
}
