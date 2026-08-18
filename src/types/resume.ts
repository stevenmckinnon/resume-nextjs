import { IconProps } from "@/components/icons";
import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBetterauth,
  SiCloudinary,
  SiPostgresql,
  SiVercel,
  SiShadcnui,
  SiClaude,
  SiSupabase,
} from "@icons-pack/react-simple-icons";

import type { JSX } from "react";

export const iconMap = {
  nextjs: SiNextdotjs,
  react: SiReact,
  javascript: SiJavascript,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  betterauth: SiBetterauth,
  cloudinary: SiCloudinary,
  postgresql: SiPostgresql,
  vercel: SiVercel,
  shadcn: SiShadcnui,
  claude: SiClaude,
  supabase: SiSupabase,
} as const;

export type SocialLink = {
  name: string;
  url: string;
  icon: React.ComponentType<IconProps>; // Use React.ComponentType for icon components
  navbar?: boolean;
};

export type Contact = {
  email: string;
  social: {
    [key: string]: SocialLink; // Index signature for dynamic social media keys
  };
};

export type WorkExperience = {
  company: string;
  href: string;
  badges?: string[]; // Or a more specific badge type if needed
  location?: string;
  title: string;
  logoUrl: string;
  start: string;
  end?: string; // Optional end date
  description?: string | string[];
  defaultExpanded?: boolean;
};

export type EducationItem = {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
  defaultExpanded: boolean;
};

export type ProjectLink = {
  type: string;
  href: string;
  icon: JSX.Element; // Use JSX.Element for the actual icon JSX
};

export type Skill = {
  name: string;
  icon?: React.ComponentType<IconProps>;
};

/**
 * The expanded view of a project, shown in a dialog rather than on its own
 * route. A side project is worth a few paragraphs, and a full page navigation
 * for a few paragraphs reads as an empty page however well it animates.
 *
 * Every field is optional. The dialog is worth opening without any of them,
 * because it shows the screenshot at a size where it can actually be read,
 * and each block renders only when its content exists — so a half-written
 * entry is a shorter dialog, not one full of empty headings.
 */
export type ProjectDetails = {
  /** One sentence under the title. The reason to keep reading. */
  standfirst?: string;
  /** e.g. "2025". Shown in the meta row. */
  year?: string;
  /** e.g. "Design and build". Shown in the meta row. */
  role?: string;
  /** Ordered prose. Heading plus one or more paragraphs. */
  sections?: { heading: string; body: string[] }[];
};

export type Project = {
  name: string;
  description: string;
  website: string;
  github: string;
  defaultExpanded: boolean;
  logoUrl?: string;
  icon?: string;
  tags?: (keyof typeof iconMap)[];
  image?: string;
  /**
   * Rendered as a live, interactive block instead of a screenshot tile, and
   * skipped by the tile grid so it doesn't appear twice. Only set this where a
   * real running demo exists — the flag decides layout, not just styling.
   */
  liveDemo?: boolean;
  /**
   * Extra prose for the project dialog. Absent is fine: every tile opens a
   * dialog regardless, since the enlarged screenshot is the baseline reason
   * to open one.
   */
  details?: ProjectDetails;
};

export type Resume = {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: Skill[];
  contact: Contact;
  work: WorkExperience[];
  education: EducationItem[];
  otherWork: WorkExperience[];
  projects: Project[];
};
