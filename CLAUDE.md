@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm lint         # ESLint
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

To run a single test file:
```bash
pnpm vitest run src/components/__tests__/Button.test.tsx
```

## Environment Variables

The contact form API route (`/api/send`) requires:
- `RESEND_API_KEY` — Resend email service key (set in `.env.local`)

## Architecture

This is a **personal portfolio/resume site** built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

### Data Flow

All resume content lives in a single source of truth: **`src/data/resume.tsx`** — a `DATA` constant typed as `Resume` (see `src/types/resume.ts`). Updating personal info, work history, skills, education, projects, or nav links all happens here.

### Key Directories

- `src/app/` — Next.js App Router pages and API routes
  - `page.tsx` — Main portfolio page composed of `Section` blocks (About, Skills, Experience, Education, Projects, Other, Contact)
  - `layout.tsx` — Root layout with fonts (Manrope + Syne), metadata from `DATA`, theme provider, gradient background layers
  - `api/send/route.ts` — Contact form handler via Resend; uses `botid` for bot protection
  - `log-dumper/` — Dev utility page using `@stevenmckinnon/log-dumper`
- `src/components/` — All React components
  - `ui/` — shadcn/ui primitives (Avatar, Badge, Button, Card, Form, Input, etc.)
  - `magicui/` — Custom animation/visual components (BlurFade, Dock, Confetti, ScrollProgress, GradientOrbs, MagneticButton, TypingEffect, Particles)
  - Feature components: `hero.tsx`, `resume-card.tsx`, `project-card.tsx`, `skills-section.tsx`, `contact.tsx`, `navbar.tsx`, `spinnable-photo.tsx`
- `src/types/resume.ts` — TypeScript types for all resume data structures plus `iconMap` for project tech icons
- `src/lib/utils.ts` — `cn()` helper, `formatDate()`, `calculateYearsOfExperience()`, `BLUR_FADE_DELAY` constant
- `src/test/` — Vitest setup (`setup.ts`) and custom render utilities (`utils.tsx`)

### Styling

Tailwind CSS v4 with `@tailwindcss/postcss`. The `cn()` utility (clsx + tailwind-merge) is used throughout for conditional class composition. Fonts: `--font-sans` (Manrope) and `--font-mono` (Syne, used for section numbers/labels).

### Testing

Vitest with jsdom, `@testing-library/react`. Tests live in `src/**/__tests__/` co-located with their component directories. Path alias `@/` maps to `src/`.
