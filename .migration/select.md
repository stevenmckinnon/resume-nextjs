# select

2026-07-12, merge (customized — three-way `git merge-file` with hand resolution of two structural conflicts), verdict: clean, unused in the app.

## Changed

- `src/components/ui/select.tsx` — diffed against the radix-luma golden and found real customizations: the project already implements a translucent popover manually (`bg-popover/70` + a `before:` backdrop-blur pseudo-element) predating the registry's later `cn-menu-target cn-menu-translucent` utility-class hooks (confirmed those classes are undefined anywhere in `globals.css`, so adding them would be inert — kept the project's working hand-written implementation instead), and swapped `IconPlaceholder` (a shadcn-docs-only component, not present in this project) for direct `lucide-react` icon imports (`ChevronDownIcon`, `CheckIcon`, `ChevronUpIcon`).
- Ran `git merge-file` with the radix golden as ancestor and the base golden as "theirs" (after preprocessing both to swap `IconPlaceholder` blocks for the equivalent lucide icons, so the merge would diff real content instead of the icon-abstraction noise). Two conflicts surfaced (the `Content`→`Positioner`/`Popup` restructure, and `ScrollUp/DownButton`→`ScrollUp/DownArrow` renames); hand-resolved by adopting the base golden's structure while keeping the project's translucent styling. Adopted other golden improvements found in the diff along the way: bare `const Select = SelectPrimitive.Root` re-export (no wrapper function/`data-slot`, sidesteps `SelectPrimitive.Root.Props`'s generic-type issue per `wrapper-shapes.md`), `SelectValue` gained `className` handling, `position` prop dropped in favor of `alignItemWithTrigger` (default `true`).
- `grep -n "radix-ui\|@radix-ui" src/components/ui/select.tsx` — clean.

## Left alone

Nothing else — `Select` has **zero consumers** in the app (`grep -rln "components/ui/select" src` outside `select.tsx` itself returns nothing) and no test file, so there was no call-site sweep or `position="popper"` rename needed.

## Behavior changes

None observable — no live usage to regress. If/when a consumer adopts `Select`, note the `position` prop is gone (`alignItemWithTrigger` replaces it, default `true` matches the old `item-aligned` default).

## Verify by hand

Not applicable — unused component, verified via typecheck (`npx tsc --noEmit`) and full production build only.
