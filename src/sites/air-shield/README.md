# Air Shield — flight disruption claim form

Self-contained site folder. Everything this form needs lives here:

- `AirShieldForm.tsx` — the 3-step form (component + head metadata)
- `components/` — form kit (FormShell, Stepper, FileDropzone, PhoneInput, types)

The only external dependencies are shadcn primitives in `src/components/ui`
and the design tokens in `src/styles.css`. The route file
`src/routes/air-shield.tsx` is a thin wrapper.
