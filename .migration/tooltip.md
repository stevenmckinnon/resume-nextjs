# tooltip

2026-07-12, golden pair via CLI (direct URL fetch, pristine), verdict: clean migration to the positioner model.

## Changed

- `src/components/ui/tooltip.tsx` — pristine copy of the golden (only `cn` import alias differed). Restructured per `universal-patterns.md`'s Portal/positioning model: `Portal > Content` → `Portal > Positioner > Popup`. `TooltipProvider`'s `delayDuration` → `delay`. `TooltipContent` now destructures and explicitly forwards `align`/`alignOffset`/`side`/`sideOffset` to `<Positioner>` (the "Pick means forward" rule — verified by reading the file back, all four props are destructured then passed, not left to fall through `...props` onto the wrong node). Arrow styling switched from `translate-x` two-side hooks to the golden's four-side (`inline-start`/`inline-end`/`left`/`right`) hooks with explicit per-side positioning.
- Call sites converted `asChild` → `render` on `TooltipTrigger`:
  - `src/components/navbar.tsx:59,87,113` — three triggers (nav icon links, social links, ModeToggle).
  - `src/components/mode-toggle.tsx:62` — the toggle button itself.
- `src/app/layout.tsx:113` and `src/test/utils.tsx:14` — `delayDuration={0}` → `delay={0}` on `TooltipProvider`.
- `src/components/__tests__/Tooltip.test.tsx` — the mock targeted `radix-ui`'s `Tooltip` namespace; retargeted to `@base-ui/react/tooltip`'s `Tooltip` namespace, added a `Positioner` mock part, renamed `Content` → `Popup` in the mock, added an `Arrow` stub. Updated the default-class assertion to the new `bg-foreground`/`text-background`/`rounded-xl` classes. 4/4 tests pass.
- `grep -n "radix-ui\|@radix-ui" src/components/ui/tooltip.tsx src/components/navbar.tsx src/components/mode-toggle.tsx src/test/utils.tsx src/app/layout.tsx` — clean.

## Left alone

`src/components/navbar.tsx:113-115` wraps `<ModeToggle />` in its OWN `<Tooltip><TooltipTrigger render={<ModeToggle />} /><TooltipContent><p>Theme</p></TooltipContent></Tooltip>`, while `ModeToggle` itself (`mode-toggle.tsx`) ALSO renders its own nested `Tooltip`/`TooltipTrigger`/`TooltipContent` ("Toggle theme"). This double-nesting predates the migration (pre-existing app quirk, not a Radix/Base UI concern) — left as-is, mechanically converted `asChild`→`render` in both places without touching the structure.

## Behavior changes

Default `sideOffset` changes from `0` (the project's prior customization) to `4` (the base-luma golden's new default) — adopted the golden's value since it's the intended target-registry shape, not drift. Visually this moves tooltips 4px further from their trigger than before.

## Verify by hand

- Hovered/checked the destructive toast trigger path and nav dock tooltips live in the browser (screenshot confirmed correct hover-card style rendering, no console errors on fresh reload).
- Tab through the nav dock icons and confirm each shows its tooltip on focus, not just hover.
