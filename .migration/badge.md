# badge

2026-07-12, golden pair via CLI (direct URL fetch, pristine), verdict: clean migration to the `useRender` + `mergeProps` idiom.

## Changed

- `src/components/ui/badge.tsx` — pristine copy of the golden (only `cn` import alias differed). Replaced the manual `Slot.Root`/`asChild` idiom with `useRender` + `mergeProps` per the worked example in `universal-patterns.md` (Badge is a non-button polymorphic component, so it does NOT use the real Button primitive — that pattern is reserved for `button.tsx`). `data-slot="badge"` and `data-variant={variant}` are now supplied via `useRender`'s `state: { slot: "badge", variant }`, which auto-converts state keys to `data-*` attributes — verified this produces identical DOM output by running Badge.test.tsx.
- `grep -n "radix-ui\|@radix-ui" src/components/ui/badge.tsx` — clean.

## Left alone

No consumer (`resume-card.tsx`, `log-dumper/page.tsx`) uses `asChild` on Badge — confirmed via grep, no call-site changes needed.

## Behavior changes

None observed. Badge.test.tsx (5/5) passes unchanged, including class assertions for all variants.

## Verify by hand

- Resume card skill badges and the log-dumper page's outline badge render with correct styling (secondary/outline variants both exercised by existing tests and the live page).
