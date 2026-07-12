# separator

2026-07-12, golden pair via CLI (direct URL fetch, pristine), verdict: clean, with one flagged a11y behavior change.

## Changed

- `src/components/ui/separator.tsx` — pristine copy of the golden (only `cn` import alias differed). Swapped `import { Separator as SeparatorPrimitive } from "radix-ui"` for `import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"` (single-part primitive, now callable directly per `universal-patterns.md`). Dropped the `decorative` prop entirely (not in `SeparatorPrimitive.Props`) — confirmed no consumer passes it (`grep -n "decorative" src/`, no hits outside the old test file).
- `src/components/__tests__/Separator.test.tsx` — updated `screen.getByRole('none')` → `screen.getByRole('separator')` across all four tests, and deleted the "renders with decorative attribute" test (the prop no longer exists). Ran `pnpm vitest run src/components/__tests__/Separator.test.tsx` to confirm.
- `grep -n "radix-ui\|@radix-ui" src/components/ui/separator.tsx` — clean.

## Left alone

`src/components/navbar.tsx` and `src/app/log-dumper/page.tsx` both render `<Separator orientation="vertical" .../>` with only `orientation`/`className` — no changes needed at those call sites.

## Behavior changes

**Flagged, not patched:** Base UI's Separator has no `decorative` concept and is accessible by default — role changes from `"none"` (Radix's decorative default) to `"separator"` always. This is a real screen-reader-visible difference: assistive tech will now announce/expose these dividers as separators. Confirmed via a live render (`getByRole('separator')` finds it, `getByRole('none')` does not). Not treated as a bug — this is the Base UI target shape — but worth knowing if strict decorative-only semantics matter later.

## Verify by hand

- No visual check needed (identical classes/output); the only difference is in the accessibility tree, visible via a screen reader or the browser's a11y inspector.
