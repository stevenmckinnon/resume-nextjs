"use client";

import type { IconProps } from "@/components/icons";
import { DATA } from "@/data/resume";
import { toggleTheme } from "@/lib/theme-transition";
import { cn } from "@/lib/utils";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";
import {
  ActivityIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CompassIcon,
  CopyIcon,
  DownloadIcon,
  FolderKanbanIcon,
  GraduationCapIcon,
  MailIcon,
  MoonIcon,
  SearchIcon,
  SparklesIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";
import { toast } from "sonner";

export type Command = {
  /** Stable id, also used as the Autocomplete item key. */
  value: string;
  label: string;
  /** Extra search terms that never appear on screen. */
  keywords?: string;
  icon: ComponentType<IconProps>;
  /** Trailing text, e.g. the email address behind "Copy email". */
  hint?: string;
  /** Id of a section to scroll to once the dialog has finished closing. */
  scrollTo?: string;
  /** Link commands render as real anchors so middle/⌘-click still work. */
  href?: string;
  external?: boolean;
  download?: string;
  /** Side effect for everything else. Runs before the dialog closes. */
  run?: () => void;
};

export type CommandGroup = {
  value: string;
  items: Command[];
};

const SECTION_COMMANDS: Command[] = [
  {
    value: "about",
    label: "About",
    keywords: "summary intro bio who",
    icon: UserIcon,
    scrollTo: "about",
  },
  {
    value: "skills",
    label: "Skills",
    keywords: "tech stack technologies react typescript tailwind",
    icon: SparklesIcon,
    scrollTo: "skills",
  },
  {
    value: "work",
    label: "Experience",
    keywords: "work jobs career history employment roles",
    icon: BriefcaseIcon,
    scrollTo: "work",
  },
  {
    value: "education",
    label: "Education",
    keywords: "university degree study qualifications",
    icon: GraduationCapIcon,
    scrollTo: "education",
  },
  {
    value: "projects",
    label: "Projects",
    keywords: "side projects portfolio builds",
    icon: FolderKanbanIcon,
    scrollTo: "projects",
  },
  {
    value: "github",
    label: "GitHub activity",
    keywords: "contributions commits open source streak",
    icon: ActivityIcon,
    scrollTo: "github",
  },
  {
    value: "other",
    label: "The Other Job",
    keywords:
      "beyond code other interests outside hobbies wwe wrestling camera photography",
    icon: CompassIcon,
    scrollTo: "other",
  },
  {
    value: "contact",
    label: "Contact",
    keywords: "email hire hiring message get in touch",
    icon: MailIcon,
    scrollTo: "contact",
  },
];

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(DATA.contact.email);
    toast.success("Email copied", { description: DATA.contact.email });
  } catch {
    toast.error("Couldn't copy the email", {
      description: DATA.contact.email,
    });
  }
}

export function buildCommandGroups({
  resolvedTheme,
  setTheme,
}: {
  resolvedTheme: string | undefined;
  setTheme: (theme: string) => void;
}): CommandGroup[] {
  const isDark = resolvedTheme === "dark";

  const actions: Command[] = [
    {
      value: "download-cv",
      label: "Download CV",
      keywords: "resume pdf cv download",
      icon: DownloadIcon,
      hint: "PDF",
      href: "/api/cv",
      download: "Steve McKinnon CV.pdf",
    },
    {
      value: "copy-email",
      label: "Copy email address",
      keywords: "mail contact clipboard",
      icon: CopyIcon,
      hint: DATA.contact.email,
      run: () => void copyEmail(),
    },
    {
      value: "toggle-theme",
      label: isDark ? "Switch to light mode" : "Switch to dark mode",
      keywords: "theme dark light appearance colour color",
      icon: isDark ? SunIcon : MoonIcon,
      run: () => toggleTheme(resolvedTheme, setTheme),
    },
  ];

  const elsewhere: Command[] = Object.values(DATA.contact.social)
    .filter((social) => social.navbar)
    .map((social) => ({
      value: `social-${social.name}`,
      label: social.name,
      keywords: `profile link ${social.name}`,
      icon: social.icon,
      href: social.url,
      external: true,
    }));

  return [
    { value: "Jump to", items: SECTION_COMMANDS },
    { value: "Actions", items: actions },
    { value: "Elsewhere", items: elsewhere },
  ];
}

/** Every whitespace-separated token has to appear in the label or keywords. */
export function matchesQuery(command: Command, query: string) {
  const haystack = `${command.label} ${command.keywords ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${id}`);
}

const CommandPaletteContext = createContext<{ open: () => void } | null>(null);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>",
    );
  }
  return context;
}

const noopSubscribe = () => () => {};

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere. The server can't know which,
 *  so it renders the Apple label and the client corrects it during hydration. */
export function useShortcutLabel() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "⌘K",
  );
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="border-border/60 bg-muted/60 text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-sm border px-1 font-mono text-[10px] leading-none">
    {children}
  </kbd>
);

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pendingScroll = useRef<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const groups = useMemo(
    () => buildCommandGroups({ resolvedTheme, setTheme }),
    [resolvedTheme, setTheme],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return;
      if (!event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      setOpen((previous) => !previous);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const api = useMemo(() => ({ open: () => setOpen(true) }), []);

  // Everything that closes the palette — Esc, an outside click, ⌘K again, or
  // running a command — lands here once the exit animation has finished and
  // the popup is unmounted, so this is the one place that has to clean up.
  const handleOpenChangeComplete = useCallback((isOpen: boolean) => {
    if (isOpen) return;

    // The query is reset after unmount so the list never visibly repopulates.
    setQuery("");

    // Scrolling has to wait too: while the dialog is open the document scroll
    // is locked, so scrollIntoView would go nowhere.
    const id = pendingScroll.current;
    pendingScroll.current = null;
    if (id) scrollToSection(id);
  }, []);

  const activate = useCallback((command: Command) => {
    if (command.scrollTo) {
      pendingScroll.current = command.scrollTo;
    } else {
      command.run?.();
    }
    setOpen(false);
  }, []);

  return (
    <CommandPaletteContext.Provider value={api}>
      {children}

      <Dialog.Root
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={handleOpenChangeComplete}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-background/60 fixed inset-0 z-50 backdrop-blur-[2px] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Viewport className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden px-4 pt-[12vh] pb-4">
            <Dialog.Popup className="border-border/60 bg-popover/95 text-popover-foreground relative flex max-h-[min(30rem,calc(100dvh-16vh))] w-full max-w-lg flex-col overflow-hidden rounded-xl border shadow-2xl backdrop-blur-xl transition-[translate,scale,opacity] duration-150 ease-out data-ending-style:-translate-y-2 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
              <Dialog.Title className="sr-only">Command palette</Dialog.Title>

              <Autocomplete.Root
                open
                inline
                items={groups}
                value={query}
                onValueChange={setQuery}
                filter={(item, itemQuery) =>
                  matchesQuery(item as Command, itemQuery)
                }
                autoHighlight="always"
                keepHighlight
              >
                <div className="border-border/60 flex items-center gap-3 border-b px-4">
                  <SearchIcon className="text-muted-foreground size-4 shrink-0" />
                  <Autocomplete.Input
                    className="placeholder:text-muted-foreground h-12 w-full bg-transparent text-base outline-none md:text-sm"
                    placeholder="Jump to a section, grab the CV…"
                    aria-label="Search commands"
                  />
                </div>

                <ScrollArea.Root className="relative flex min-h-0 flex-[0_1_auto] overflow-hidden">
                  <ScrollArea.Viewport className="min-h-0 flex-1 scroll-py-[0.375rem] overscroll-contain p-1.5">
                    <ScrollArea.Content style={{ minWidth: "100%" }}>
                      <Autocomplete.Empty>
                        <p className="text-muted-foreground px-3 py-6 text-sm">
                          Nothing matches that. Try “experience”, “CV” or
                          “GitHub”.
                        </p>
                      </Autocomplete.Empty>

                      <Autocomplete.List>
                        {(group: CommandGroup) => (
                          <Autocomplete.Group
                            key={group.value}
                            items={group.items}
                            className="not-last:mb-1"
                          >
                            <Autocomplete.GroupLabel className="text-muted-foreground flex h-8 items-center px-3 font-mono text-[10px] tracking-widest uppercase select-none">
                              {group.value}
                            </Autocomplete.GroupLabel>
                            <Autocomplete.Collection>
                              {(command: Command) => (
                                <CommandItem
                                  key={command.value}
                                  command={command}
                                  onActivate={activate}
                                />
                              )}
                            </Autocomplete.Collection>
                          </Autocomplete.Group>
                        )}
                      </Autocomplete.List>
                    </ScrollArea.Content>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar className="flex w-1.5 justify-center py-1.5">
                    <ScrollArea.Thumb className="bg-border w-1 rounded-full" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>

                <div className="border-border/60 text-muted-foreground flex items-center justify-end gap-4 border-t px-4 py-2.5 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Kbd>↵</Kbd>
                    Open
                  </span>
                  <span className="hidden items-center gap-1.5 sm:flex">
                    <Kbd>Esc</Kbd>
                    Close
                  </span>
                </div>
              </Autocomplete.Root>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandPaletteContext.Provider>
  );
}

function CommandItem({
  command,
  onActivate,
}: {
  command: Command;
  onActivate: (command: Command) => void;
}) {
  const Icon = command.icon;

  const anchor = command.href ? (
    <a
      href={command.href}
      download={command.download}
      target={command.external ? "_blank" : undefined}
      rel={command.external ? "noopener noreferrer" : undefined}
    />
  ) : undefined;

  return (
    <Autocomplete.Item
      value={command}
      onClick={() => onActivate(command)}
      render={anchor}
      className={cn(
        "group flex min-h-10 cursor-default items-center gap-3 rounded-md px-3 text-sm no-underline outline-none select-none",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground scroll-my-[0.375rem]",
      )}
    >
      {/* The brand icons carry their own <title>, which would otherwise be
          announced on top of the label. */}
      <Icon
        aria-hidden
        className="text-muted-foreground group-data-highlighted:text-primary-accent size-4 shrink-0 transition-colors"
      />
      <span className="min-w-0 flex-1 truncate">{command.label}</span>
      {command.hint && (
        <span className="text-muted-foreground hidden shrink-0 truncate text-xs sm:block">
          {command.hint}
        </span>
      )}
      {command.external && (
        <ArrowUpRightIcon className="text-muted-foreground size-3.5 shrink-0" />
      )}
    </Autocomplete.Item>
  );
}
