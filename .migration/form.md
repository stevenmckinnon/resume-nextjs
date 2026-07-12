# form

2026-07-12, hand-transform (no golden pair exists — the current shadcn registry's "form" item is a stub with no `files`; the classic react-hook-form `FormField`/`FormItem`/`FormLabel`/`FormControl` API predates the newer Field/Fieldset split), verdict: clean, minimal-surface transform.

## Changed

- `src/components/ui/form.tsx` — this file's only Radix usage was for typing (`LabelPrimitive`, used solely for `React.ElementRef`/`React.ComponentPropsWithoutRef` on `FormLabel`) and `SlotPrimitive.Slot` (used unconditionally in `FormControl` to merge `id`/`aria-describedby`/`aria-invalid` onto whatever single child was passed — Radix's "always-Slot" idiom, not the `asChild`-boolean idiom).
  - `FormLabel`'s ref/prop types: `React.ElementRef<typeof LabelPrimitive.Root>` / `React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>` → `React.ComponentRef<"label">` / `React.ComponentPropsWithoutRef<"label">` (consistent with [[label]] now being a native element).
  - `FormControl`: replaced `SlotPrimitive.Slot` with `useRender({ render: children, ref, props: mergeProps(...) })` per the worked example in `universal-patterns.md`, adapted for the "always merge onto exactly one child" case rather than a conditional `asChild`. Cast the internal `id`/`aria-describedby`/`aria-invalid` object literal `as React.ComponentPropsWithRef<"div">` per the mandatory `mergeProps` pitfall (data-* / aria-* keys fail excess-property checking otherwise).
- Did **not** adopt the newer Field/Fieldset architecture — the app's `contact.tsx` uses the classic `FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage` API throughout, and rewriting to Field/Fieldset would be an unrelated architecture change, not a Radix→Base UI migration. Flagged for the user's awareness, not applied.
- `grep -n "radix-ui\|@radix-ui" src/components/ui/form.tsx` — clean.

## Left alone

`src/components/contact.tsx` — all four `<FormControl>` usages wrap exactly one child element (`<Input {...field} />`), consistent with the new `useRender`-based `FormControl`'s requirement. No call-site changes needed; Form.test.tsx's mocked `useFormField`/`useFormContext` continues to work unchanged.

## Behavior changes

None — `FormControl`'s external contract (single child, `id`/`aria-describedby`/`aria-invalid` injected) is preserved exactly; only the internal cloning mechanism changed from Radix's `Slot` to Base UI's `useRender`/`mergeProps`.

## Verify by hand

- Submit the contact form with an invalid email and confirm the input gets `aria-invalid`/`aria-describedby` wired correctly (screen reader or DOM inspector) — exercised implicitly by Form.test.tsx (8/8 passing) and the live browser submission test.
