# button

2026-08-20, golden pair via shadcn CLI, migrated the installed button wrapper to Base UI.

## Changed

- `components.json`: switched the shadcn style from `radix-mira` to `base-mira`.
- `src/components/ui/button.tsx`: regenerated with `@base-ui/react/button` and kept the existing variants and public component behavior.
- `src/components/ui/button-variants.ts`: moved the `buttonVariants` helper out of the component module so the repository Fast Refresh lint rule passes.
- `package.json` and `pnpm-lock.yaml`: removed the unused `radix-ui` dependency.
- Leftover scan: `grep -n "radix-ui\\|@radix-ui"` on migrated source files is clean.

## Left alone

- The starter application files and router setup were not reconstructed; the current workspace has no `src/routes` directory, which is unrelated to this primitive migration.
- No other UI wrappers were migrated because the current shadcn project metadata reports only `button` as installed.

## Behavior changes

- The button now uses the official Base UI button primitive instead of `radix-ui` Slot composition. Existing `variant`, `size`, class merging, and native button props remain supported.

## Verify by hand

- Render a default, outline, ghost, and link button and confirm their visual variants.
- Verify keyboard focus, disabled state, and icon sizing.
- Verify `Button` works as a normal native button and does not depend on Radix packages.

Full build note: the current workspace build is blocked before compilation because the configured TanStack Router plugin expects `src/routes`, which is absent in the current starter tree. Focused lint for both migrated button files passes.
