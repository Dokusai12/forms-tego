import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claim Forms — Design Showcase" },
      {
        name: "description",
        content:
          "Preview the redesigned Air Shield and Baggage Shield claim forms.",
      },
      { property: "og:title", content: "Claim Forms — Design Showcase" },
      {
        property: "og:description",
        content:
          "Preview the redesigned Air Shield and Baggage Shield claim forms.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const forms = [
  {
    to: "/air-shield" as const,
    eyebrow: "Air Shield",
    title: "Flight disruption claim",
    description:
      "Request compensation for cancellations, delays, denied boarding, or missed connections.",
  },
  {
    to: "/baggage-shield" as const,
    eyebrow: "Baggage Shield",
    title: "Mishandled baggage report",
    description:
      "Report delayed, damaged, or missing luggage and provide payout details.",
  },
];

function Index() {
  return (
    <div className="gradient-wash min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-16 xl:grid-cols-[1fr_32rem]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo">
              Design showcase
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Two claim forms, one preview.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Select a form below to walk through the redesigned experience. Both are
              fully interactive — no backend is connected yet.
            </p>

            <div className="mt-8 hidden rounded-2xl border border-border bg-card p-6 lg:block">
              <h3 className="font-display text-lg font-semibold text-foreground">
                What is included
              </h3>
              <ul className="mt-4 space-y-4">
                {[
                  {
                    label: "Air Shield",
                    value: "3-step flight disruption compensation claim.",
                  },
                  {
                    label: "Baggage Shield",
                    value: "3-step mishandled baggage report.",
                  },
                  {
                    label: "Demo mode",
                    value: "Submissions stay in the browser for now.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-subtle text-indigo">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative space-y-4">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo/5 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo/5 blur-3xl" />

            {forms.map((form) => (
              <Link
                key={form.to}
                to={form.to}
                className="group relative block rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-indigo/40 sm:p-8 lg:rounded-3xl"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo">
                  {form.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">
                  {form.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {form.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo">
                  Open form
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/60 bg-background/80 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:gap-1 sm:px-6 lg:px-8">
          <a href="#" className="hover:text-foreground hover:underline">
            Terms and Conditions
          </a>
          <span className="hidden sm:inline">·</span>
          <a href="#" className="hover:text-foreground hover:underline">
            Privacy Policy
          </a>
          <span className="hidden sm:inline">·</span>
          <a href="#" className="hover:text-foreground hover:underline">
            Complaints Process
          </a>
        </div>
      </footer>
    </div>
  );
}
