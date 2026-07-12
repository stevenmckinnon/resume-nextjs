# button

2026-07-12, golden pair via CLI (direct URL fetch, customized — preserved a hover-color tweak), verdict: clean migration to the real `@base-ui/react/button` primitive.

## Changed

- `src/components/ui/button.tsx` — diffed against the radix-luma golden and found one customization (secondary variant used `hover:bg-secondary/80` instead of the golden's `hover:bg-[color-mix(...)]`); preserved it. Replaced the `Slot`/`asChild` idiom with `import { Button as ButtonPrimitive } from "@base-ui/react/button"` per `wrapper-shapes.md` (Base UI ships a real Button primitive supporting `render` — no hand-rolled `useRender` wrapper needed). Dropped `data-variant`/`data-size` attributes to match the golden shape (verified unused by any CSS selector via `grep -n "data-variant\|data-size" src/`).
- Call sites converted `asChild` → `render`:
  - `src/app/log-dumper/page.tsx:184` — Button wrapping a `<Link>` (npm link), added `nativeButton={false}` (see below).
  - `src/components/hero.tsx:126,138` — two Buttons wrapping `<Link>`/`<a>` (Get in Touch, Download CV), both got `nativeButton={false}`.
- `nativeButton={false}` added to all three link-rendered Button sites above: Base UI's real Button primitive defaults `nativeButton: true` and warns in the console ("expected a native `<button>` ... Rendering a non-`<button>` removes native button semantics") when `render` swaps the tag to `<a>`/`<Link>`. Caught live via `read_console_messages` during browser verification, fixed, and reload confirmed the warning is gone.
- `grep -n "radix-ui\|@radix-ui" src/components/ui/button.tsx` — clean.

## Left alone

Nothing else touches Button; `contact.tsx`, `confetti.tsx`, and the "Send Another" button all use children (not `render`), so no `nativeButton` change needed there.

## Behavior changes

None functionally — `data-variant`/`data-size` removal is invisible (nothing selected on it). The `nativeButton={false}` addition is a correctness fix, not a behavior change (the rendered DOM was always `<a>`, just now without an accessibility console warning).

## Verify by hand

- Click "Get in Touch", "Download CV", and "View on npm" (log-dumper page) — all should navigate/download exactly as before, no console warnings.
- Tab to each button-styled link and press Enter — should activate like a link (not a button).
