# label

2026-07-12, golden pair via CLI (direct URL fetch, pristine), verdict: clean 1:1 swap to a native `<label>`.

## Changed

- `src/components/ui/label.tsx` — was a pristine copy of the shadcn radix-luma golden (only the `cn` import alias differed). Replaced with the base-luma golden content verbatim: dropped the `LabelPrimitive.Root` import entirely, component now renders a plain `<label>` with the same classes. `grep -n "radix-ui\|@radix-ui" src/components/ui/label.tsx` — clean.
- `src/components/ui/form.tsx` — `FormLabel`'s ref/prop types (`React.ElementRef<typeof LabelPrimitive.Root>` / `React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>`) updated to `React.ComponentRef<"label">` / `React.ComponentPropsWithoutRef<"label">` since `Label` is no longer a Radix primitive. See [[form]].

## Left alone

Nothing — this was the simplest migration in the batch (no primitive parts, no positioner, no consumer prop changes).

## Behavior changes

None. `Label` never exposed Radix-specific props to consumers beyond standard HTML label attributes.

## Verify by hand

- Click any `<Label htmlFor="...">` in the contact form and confirm focus moves to the associated input (native `<label for>` behavior, unchanged).
