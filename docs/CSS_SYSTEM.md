# WHISPERX Marketplace CSS System

## Runtime entry point

The application-wide stylesheet is `app/globals.css` and is imported once by `app/layout.tsx`.

It contains:

- Tailwind CSS v4 and `tw-animate-css` imports;
- light-mode design tokens in `:root`;
- dark-mode fallback tokens in `.dark`;
- Tailwind theme mappings in `@theme inline`;
- base focus, selection, body, and interaction rules;
- editorial utilities including `paper-grid`, `architectural-shadow`, `floating-shadow`, `signal-line`, `text-stroke`, and motion helpers;
- reduced-motion behavior.

## Validation

`scripts/validate-design-lock.mjs` validates the current light marketplace CSS system and supporting design JSON. It no longer checks removed legacy-only utilities.

## Usage

Routes and components should consume the shared tokens and utilities through Tailwind classes and CSS custom properties. Do not add a second global stylesheet or duplicate token set without a verified requirement.
