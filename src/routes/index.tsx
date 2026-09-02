import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claim Forms" },
      {
        name: "description",
        content:
          "Air Shield and Baggage Shield claim forms.",
      },
      { property: "og:title", content: "Claim Forms" },
      {
        property: "og:description",
        content:
          "Air Shield and Baggage Shield claim forms.",
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
    <div className="gradient-wash flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
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
