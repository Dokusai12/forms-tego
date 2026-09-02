# Tego-style claim forms: Air Shield + Baggage Shield

Rebuild both 3-step claim forms in this project with one shared design system, styled to match tego-group.com — front-end only, no backend.

## What I verified

- `airshieldco.com` serves a 3-step flight-compensation claim form; step 1 = first name, last name, email, booking reference, flight number, file upload (PDF/image, 10 MB, max 10 files), optional phone with country code, "Next".
- `baggage-shield.com` serves the same 3-step shell for delayed/missing luggage; step 1 = first name, last name, email, booking reference, flight number, upload booking confirmation, "Next", plus an intro note that the airline must be informed first and tracking details are required.
- Steps 2 and 3 only render after interaction, so their exact fields aren't captured yet. I'll walk both live forms through every step during the build and mirror the real fields; if anything is ambiguous I'll ask before inventing fields.
- `tego-group.com` is a dark, product-led fintech/infra site: high-contrast dark surfaces, restrained accent, tight modern sans typography, generous whitespace, soft-radius cards, subtle borders and elevation, dashboard/checkout UI mock cards.

## What gets built

Routes:
- `/` — brand switcher/landing linking to both forms (keeps the placeholder index replaced).
- `/air-shield` — flight disruption claim, 3 steps.
- `/baggage-shield` — delayed/missing baggage report, 3 steps.

Shared form kit (used by both, per-brand accent token):
- Stepper header with "Step X of 3", progress bar, step title + supporting line.
- Field primitives: labelled input, helper text, inline validation errors, phone input with country-code select, drag-and-drop file dropzone with file chips, size/count limits and clear errors.
- Card-based form shell on a dark Tego-style surface, sticky footer actions (Back / Next / Submit), review step summarising all answers with edit links, and a success confirmation state.
- Client-side validation (zod + react-hook-form), keyboard accessible, labelled controls, mobile-first responsive.
- No submission: final step shows a confirmation screen; a single `onSubmit` seam is left for wiring later.

Design system:
- Tego-derived tokens in `src/styles.css` (oklch): dark background, elevated card, muted borders, one accent per brand (Air Shield vs Baggage Shield), radius and shadow scale, modern sans type pairing.
- No hardcoded colour utilities; everything through semantic tokens.

## Technical notes

- TanStack Start file routes under `src/routes`; shared components in `src/components/claim/`.
- Step state held in a single form context per route; no persistence.
- Uploads stay in browser memory (previews + validation only) since there's no backend.
- Per-route `head()` metadata with unique titles/descriptions.

## Design step

Before building, I'll generate three rendered Tego-locked design directions for the form surface and let you pick one.
