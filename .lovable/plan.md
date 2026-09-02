# Tego-style claim forms: Air Shield + Baggage Shield

Rebuild both 3-step claim forms in this project with one shared design system that borrows the clean, product-led visual language of tego-group.com, but with no visible Tego branding — front-end only, no backend.

## Design reference

Studied tego-group.com's rendered homepage and contact page as the visual reference. The design direction for this project borrows that language but strips out any Tego names, logos or product references.

- **Light theme.** Near-white canvas with a very soft lavender/blue gradient wash bleeding in from the page edges.
- **Ink and accent.** Near-black ink for headings and primary buttons; a single saturated indigo-blue for accent CTAs, eyebrow labels, links and chart bars. Pale indigo tints for chips, icon tiles and active nav states. Green only for positive deltas.
- **Typography.** Large geometric sans headings, tight tracking, heavy weight, sentence case ending in a full stop. Body copy is mid-grey, comfortable line height. Small semibold field labels.
- **Buttons.** Full pill radius, solid black or solid indigo, right chevron affordance.
- **Cards.** ~20–24px radius, 1px hairline border, near-white/faint-grey fill, almost no shadow. Nested inner cards for stats.
- **Bento grid reference.** Unequal-size tiles, each carrying a category chip, title, one-line description and a miniature product UI mock rather than an icon.
- **Contact form reference.** Two-column split: left is eyebrow + big headline + supporting copy + a contact tile; right is the form in a bordered soft-fill card, stacked full-width fields, tall inputs with light borders and grey placeholders, one full-width black pill submit, and a small reassurance line under it.

## What I checked on the two form sites

- `airshieldco.com`: 3-step flight compensation claim. Step 1 = first name, last name, email (+ helper), booking reference (+ helper), flight number, file upload (drag/drop, PDF/image, 10 MB, max 10 files), optional phone with country-code select, "Next".
- `baggage-shield.com`: same 3-step shell for delayed/missing baggage, with an intro note that the airline must be informed first and tracking details are needed. Step 1 = first name, last name, email, booking reference, flight number, upload booking confirmation, "Next".
- Steps 2 and 3 only render after interaction. I'll drive both live forms through every step during the build and mirror the real fields exactly; if a field's intent is ambiguous I'll ask rather than invent it.

## What gets built

Routes:
- `/` — Tego-styled landing that replaces the placeholder: hero headline, and a **bento grid** with two tiles (Air Shield, Baggage Shield), each carrying a category chip, one-line description and a miniature preview of its form.
- `/air-shield` — flight disruption claim, 3 steps.
- `/baggage-shield` — delayed/missing baggage report, 3 steps.

Form layout, matching the Tego contact pattern:
- Two-column on desktop: left rail holds the eyebrow, big headline, the intro/eligibility copy, a "what you'll need" list and a support-contact tile; right holds the form card. Single column on mobile with the rail collapsed above.
- Form card: hairline border, soft fill, 24px radius, generous padding.
- Step header inside the card: "Step X of 3" with a slim segmented progress bar, step title, supporting line.
- Fields: small semibold labels, tall light-bordered inputs, grey placeholders, helper text under the field, inline error state in red with the border tinted.
- File dropzone styled as a dashed hairline tile with a pale indigo icon square, uploaded files shown as removable chips with size, plus size/count validation.
- Phone field: country-code select fused to the input.
- Footer: black pill primary ("Next" / "Submit claim") with right chevron, ghost "Back", reassurance line under the button.
- Step 3 is a review summary of every answer with per-section edit links, then a confirmation success card with a reference-style header.

Design system:
- Tego-derived tokens in `src/styles.css` (oklch): canvas, gradient wash, ink, muted text, hairline border, card fill, indigo accent + pale tint, success green, pill and card radii.
- Per-brand accent variable so Air Shield and Baggage Shield differ subtly while sharing the same system.
- Type: a geometric sans matching Tego's feel, loaded via `<link>` in the root route.
- All colour through semantic tokens — no hardcoded colour utilities.

## Technical notes

- TanStack Start file routes in `src/routes`; shared form kit in `src/components/claim/` (stepper, field, dropzone, phone input, form card, review list).
- Step state in one form context per route via react-hook-form + zod; no persistence, no storage.
- Uploads stay in browser memory for preview and validation only; a single `onSubmit` seam is left for wiring later.
- Per-route `head()` metadata with unique titles and descriptions.

## Design step

Before building I'll generate three rendered design directions for the form surface, with the reference palette, typography and card language locked, varying only composition, density and hierarchy — then build the one you pick. No Tego branding will appear in the final UI.
