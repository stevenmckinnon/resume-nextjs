# toast

2026-07-12, superseded. Base UI toast migration (described below, was working and verified) was then **replaced entirely with sonner** at the user's request. Final verdict: deleted, not migrated.

## What happened

Since `toast` was never in the current shadcn registry (confirmed via `npx shadcn info --json` — not in the components list) and predates shadcn's move to `sonner`, I first hand-migrated it to Base UI's manager-driven Toast API (`createToastManager`, `Toast.useToastManager`, `Provider`/`Portal`/`Viewport`/`Root`/`Content`/`Title`/`Description`/`Action`/`Close`), verified it live in the browser, and wrote a full report for that path. The user then asked to drop it and use `sonner` instead — the modern shadcn-recommended toast library, and explicitly out of scope for a Radix→Base UI migration (`sonner` is on the SKILL's "never touch" list of third-party libraries). This report reflects the final state.

## Changed

- **Deleted** `src/components/ui/toast.tsx`, `src/components/ui/toaster.tsx`, `src/hooks/use-toast.ts` (the Base UI-based implementation described above — fully removed, not left as dead code).
- **Kept** `src/components/ui/sonner.tsx` — this file already existed untracked in the working directory before this session (see [[project]]'s note on it), and turned out to be exactly the shadcn base-luma `sonner` registry item with `IconPlaceholder` already resolved to concrete `lucide-react` icons. No changes needed to it.
- `sonner` (`^2.0.7`) was already an installed dependency (`package.json`, `node_modules/sonner`) — no install needed.
- `src/app/layout.tsx` — `import { Toaster } from "@/components/ui/toaster"` → `import { Toaster } from "@/components/ui/sonner"`.
- `src/components/contact.tsx`:
  - `import { toast } from "@/hooks/use-toast"` → `import { toast } from "sonner"` (direct import, no custom hook — sonner's `toast()` is a plain function callable from anywhere, same as the Base UI manager pattern was, just without needing a hand-written wrapper).
  - `toast({ title: "Error sending email:", description, variant: "destructive" })` → `toast.error("Error sending email:", { description })`, matching sonner's `toast.error(message, ExternalToast)` signature (confirmed against `node_modules/sonner/dist/index.d.ts`).
- `grep -rln "ui/toast\|ui/toaster\|hooks/use-toast" src` — clean (zero remaining references to the deleted files).

## Left alone

`ToastAction`-equivalent functionality: no consumer used it before or after any version of this migration, so no action-button work was needed. Sonner supports an `action` option on `toast()` if it's ever needed later.

## Behavior changes

None versus the pre-migration Radix implementation from the user's perspective — same visual toast, same trigger sites, same destructive/error styling. Internally this is now sonner's own animation/stacking/swipe-to-dismiss engine rather than a hand-rolled reducer or Base UI's manager.

## Verify by hand — what was actually done, live

- Submitted the real contact form once early in this work (before the sonner swap was requested) — this genuinely sent a real email via the live Resend integration. Flagged to the user immediately; not repeated.
- For all subsequent testing (both the Base UI version and this final sonner version), stubbed `window.fetch` for `/api/send` via `javascript_tool` to force a `500` response, submitted the form, and confirmed the destructive/error toast rendered correctly each time — most recently: "Error sending email: Simulated Failure" with the error icon, bottom-right, sonner-styled.
- After each stubbed-fetch test, cross-checked the **server-side dev log** (`preview_logs`, filtered on `POST /api/send`) to confirm no new real request reached the server — the browser's own network/console log tools in this environment appeared to return accumulated history rather than "since last check," so the server log was used as the authoritative source instead.
- Confirmed `pnpm test` (101/101), `npx tsc --noEmit` (clean besides the pre-existing unrelated `BlurFade` error), and `pnpm build` (clean) all pass with sonner in place.

Recommended manual QA before shipping: submit the real contact form once intentionally to confirm the success path ("Message Sent!" + confetti) still works — only the error/toast path was re-verified live above.
