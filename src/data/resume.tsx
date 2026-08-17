import { Icons } from "@/components/icons";
import { calculateYearsOfExperience } from "@/lib/utils";
import type { Resume } from "@/types/resume";
import {
  BriefcaseIcon,
  FolderKanbanIcon,
  HomeIcon,
  MailIcon,
} from "lucide-react";

export const DATA: Resume = {
  name: "Steve McKinnon",
  initials: "SM",
  url: "https://stevemckinnon.co.uk",
  location: "Glasgow, Scotland",
  locationLink: "https://www.google.com/maps/place/glasgow",
  description:
    "Senior Lead Front-End Engineer at JPMorgan Chase, building the UI foundations other teams ship on.",
  summary: `Front-end engineer for ${calculateYearsOfExperience(
    "2014-06-30",
  )}+ years, 8 of them at JPMorgan Chase.

I lead an 8-engineer team building Risk Technology's UI infrastructure: a pattern and component library on top of the firm's design system, plus BI tooling and application scaffolding. Twenty-plus internal applications ship on it.

I care most about the parts that are hard to retrofit later: accessibility, API design, and sensible defaults.`,
  avatarUrl: "/me.jpg",
  skills: [
    {
      name: "React",
      icon: Icons.react,
    },
    {
      name: "Next.js",
      icon: Icons.nextjs,
    },
    {
      name: "TypeScript",
      icon: Icons.typescript,
    },
    { name: "JavaScript", icon: Icons.javascript },
    { name: "HTML", icon: Icons.html },
    { name: "CSS/SCSS", icon: Icons.sass },
    { name: "TailwindCSS", icon: Icons.tailwindcss },
    { name: "GraphQL", icon: Icons.graphql },
    { name: "Storybook", icon: Icons.storybook },
    { name: "Figma", icon: Icons.figma },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#work", icon: BriefcaseIcon, label: "Experience" },
    { href: "#projects", icon: FolderKanbanIcon, label: "Projects" },
    { href: "#contact", icon: MailIcon, label: "Contact" },
  ],
  contact: {
    email: "hello@stevenmckinnon.co.uk",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/stevenmckinnon",
        icon: Icons.github,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/stevenmckinnon",
        icon: Icons.instagram,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/stevenmckinnon92/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/stevenmckinnon",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:hello@stevenmckinnon.co.uk",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "JP Morgan Chase",
      href: "https://jpmorgan.com",
      badges: [],
      location: "Glasgow, Scotland",
      title: "Senior Lead Front End Developer",
      logoUrl: "/jpm.png",
      start: "February 2024",
      description: [
        `I lead eight engineers. We build the component library and BI tooling that 20+ applications across the firm ship on.`,
        `Built the scaffolding that turns a new project's setup from weeks into days. Pre-approved patterns, no blank page.`,
        `UI lead for Risk Technology: I set the technology direction and argue for sensible defaults.`,
        `On the Risk Technology AI working group, setting the standards for how the area adopts and reuses AI.`,
        `Collapsed 10+ internal microsites into one documentation pipeline with a searchable index of components, AI skills, MCPs and APIs.`,
      ],
    },
    {
      company: "&Open",
      badges: [],
      href: "https://andopen.co",
      location: "Remote",
      title: "Lead Frontend Developer",
      logoUrl: "/andopen.png",
      start: "March 2022",
      end: "February 2024",
      description: [
        `Built the multi-tenant gifting platform companies use to send curated gifts to staff and clients. React and TypeScript.`,
        `Wrote the component library and hooks the whole application sits on. Tested and documented.`,
        `Shipped a recipient app and email system that restyles itself to each client's branding.`,
        `Worked directly with product and design to turn requirements into shipped features.`,
      ],
    },
    {
      company: "Evotix",
      href: "https://evotix.com/",
      badges: [],
      location: "Remote",
      title: "Senior Front End Developer",
      logoUrl: "/evotix.png",
      start: "January 2021",
      end: "March 2022",
      description: [
        `Built Evotix's next-generation health and safety application in React and TypeScript.`,
        `Wrote a JSON-to-form renderer so clients could configure complex forms without a developer.`,
        `Held it to accessibility and internationalisation standards from the start, not as a retrofit.`,
        `Paired with product and UX throughout to validate features against real customer needs.`,
      ],
    },
    {
      company: "JP Morgan Chase",
      href: "https://jpmorgan.com",
      badges: [],
      location: "Glasgow, Scotland",
      title: "Senior Front End Developer",
      logoUrl: "/jpm.png",
      start: "May 2019",
      end: "December 2020",
      description: [
        `Built an Electron and OpenFin desktop platform used by dev teams and end users across the firm.`,
        `Delivered multi-window layouts and client-side interop in TypeScript, React and Redux.`,
      ],
    },
    {
      company: "JP Morgan Chase",
      href: "https://jpmorgan.com",
      badges: [],
      location: "Glasgow, Scotland",
      title: "Frontend Developer",
      logoUrl: "/jpm.png",
      start: "June 2014",
      end: "May 2019",
      description: [
        `Built a GraphQL playground and a company news aggregator, running usability sessions to shape both.`,
        `Owned front-end design end to end: wireframes, proofs of concept, production.`,
        `Built the automated end-to-end suite in Selenium and BDD.`,
        `Went full-stack when it was needed: requirements, deployment pipelines, environment stability.`,
        `Ran Scrum delivery and trained new starts on front-end.`,
      ],
    },
  ],
  education: [
    {
      school: "Glasgow Caledonian University",
      href: "https://www.gcu.ac.uk/",
      degree: "Computer Games Software Development (BSc Honours)",
      logoUrl: "/gcu.png",
      start: "September 2010",
      end: "May 2014",
      defaultExpanded: false,
    },
  ],
  otherWork: [
    {
      company: "WWE",
      href: "https://wwe.com",
      title: "Camera Operator",
      logoUrl: "/wwe.png",
      start: "November 2021",
      defaultExpanded: false,
    },
    {
      company: "Insane Championship Wrestling",
      href: "https://www.insanewrestling.co.uk/",
      title: "Camera Operator",
      logoUrl: "/icw.png",
      start: "October 2020",
      defaultExpanded: false,
    },
    {
      company: "Steven McKinnon Photography",
      href: "https://stevenmckinnon.co.uk/",
      title: "Photographer",
      logoUrl: "/me.jpg",
      start: "January 2016",
      defaultExpanded: false,
    },
  ],
  projects: [
    {
      name: "Caley",
      description: `Invoicing app built with Next.js, Prisma, and Better Auth. Sends automated emails through Resend and tracks payments with real-time analytics.`,
      website: "https://caley.app",
      github: "https://github.com/stevenmckinnon/invoice-app",
      defaultExpanded: true,
      logoUrl: "/caley-logo.svg",
      tags: [
        "nextjs",
        "typescript",
        "tailwindcss",
        "betterauth",
        "postgresql",
        "vercel",
        "shadcn",
        "claude",
      ],
      image: "/caley-demo.png",
      // Only `standfirst` is filled in. `role`, `year` and `sections` need
      // writing rather than deriving; each block is skipped while its field is
      // absent, so the dialog is short right now rather than padded.
      details: {
        standfirst:
          "An invoicing app built on Next.js and Prisma. It issues invoices, chases them by email through Resend, and tracks what has actually been paid.",
      },
    },
    {
      name: "CareerWealth",
      description:
        "Plots career paths against projected earnings so you can see what each move is worth. Built with Next.js and TypeScript.",
      website: "https://careerwealth.dev",
      github: "https://github.com/stevenmckinnon/career-dashboard",
      defaultExpanded: true,
      tags: [
        "nextjs",
        "typescript",
        "tailwindcss",
        "supabase",
        "vercel",
        "shadcn",
        "claude",
      ],
      image: "/careerwealth.png",
    },
    {
      name: "Photography Portfolio",
      description: `My photography portfolio, built with Next.js and Tailwind CSS. Cloudinary handles optimised image delivery.`,
      website: "https://stevenmckinnon.co.uk",
      github: "https://github.com/stevenmckinnon/photography",
      defaultExpanded: true,
      tags: [
        "nextjs",
        "typescript",
        "tailwindcss",
        "cloudinary",
        "vercel",
        "shadcn",
      ],
      image: "/photography-demo.png",
    },
    {
      name: "Biosite",
      description: `Open-source link-in-bio tool built with Next.js. A lightweight alternative to the commercial services.`,
      website: "https://www.mckinnon.bio",
      github: "https://github.com/stevenmckinnon/biosite",
      defaultExpanded: true,
      tags: ["nextjs", "typescript", "tailwindcss", "vercel", "shadcn"],
      image: "/biosite-demo.png",
    },
    {
      name: "xray.",
      description: `A dev-time overlay that maps an element's computed styles back to your design tokens, and flags the values that only work in the theme you happen to be looking at.`,
      website: "https://xray-styles.vercel.app/",
      github: "https://github.com/stevenmckinnon/xray",
      defaultExpanded: true,
      tags: ["typescript"],
      image: "/xray-demo.png",
    },
    {
      name: "Log Dumper",
      description: `TypeScript library that captures user actions and errors in React apps, with a live DevTools panel and downloadable logs for debugging.`,
      website: "/log-dumper",
      github: "https://github.com/stevenmckinnon/log-dumper",
      defaultExpanded: true,
      tags: ["typescript"],
      image: "/logdumper-demo.png",
      liveDemo: true,
    },
  ],
} as const;
