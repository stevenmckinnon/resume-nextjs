# avatar

2026-07-12, golden pair via CLI (direct URL fetch, pristine), verdict: clean, direct 1:1 mapping.

## Changed

- `src/components/ui/avatar.tsx` — pristine copy of the golden (only `cn` import alias differed). Swapped `import { Avatar as AvatarPrimitive } from "radix-ui"` for `import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"`. Updated `React.ComponentProps<typeof AvatarPrimitive.Root>` / `.Image` / `.Fallback` to the Base UI generated types (`AvatarPrimitive.Root.Props`, `.Image.Props`, `.Fallback.Props`) per `universal-patterns.md`'s type-mapping rule. `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` are plain `<div>`/`<span>` wrappers with no Radix dependency — untouched.
- `grep -n "radix-ui\|@radix-ui" src/components/ui/avatar.tsx` — clean.

## Left alone

`src/components/simple-card.tsx` and `src/components/resume-card.tsx` (the two consumers) don't use `delayMs` on `AvatarImage` (would have needed renaming to `delay` per `consumer-props.md`) — confirmed via grep, no changes needed.

## Behavior changes

None — Avatar is one of the "direct" mappings in the coverage matrix, no restructuring involved.

## Verify by hand

- Both card components render an avatar image with fallback initials; confirmed via `pnpm test` (Avatar.test.tsx, 5/5 passing, including the image-load-error → fallback test).
