import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Briefcase, Shield, ArrowRight, Clock, FileCheck, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claim Forms — File your flight or baggage claim" },
      {
        name: "description",
        content:
          "Fast, clear claim forms for flight disruption compensation and mishandled baggage. Get started in minutes.",
      },
      { property: "og:title", content: "Claim Forms — File your flight or baggage claim" },
      {
        property: "og:description",
        content:
          "Fast, clear claim forms for flight disruption compensation and mishandled baggage. Get started in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="gradient-wash min-h-screen">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Claim Forms
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo/20 bg-indigo-subtle px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo">
            <Shield className="h-3.5 w-3.5" />
            Simple, secure claims
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Get what you are owed from your airline.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Two clear claim paths. One straightforward process. File a flight disruption
            compensation claim or report mishandled baggage in minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Link
            to="/air-shield"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo/5 blur-2xl transition-all group-hover:bg-indigo/10" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-subtle text-indigo">
                <Plane className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
                Flight disruption claim
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Cancelled, delayed, or denied boarding. We assess your claim against applicable
                flight compensation rules and pursue it with the airline.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo">
                Start your claim
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/baggage-shield"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo/5 blur-2xl transition-all group-hover:bg-indigo/10" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-subtle text-indigo">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
                Mishandled baggage report
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Delayed, missing, or damaged luggage. Report the issue with the airline references
                and let us handle the rest.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo">
                Report your bag
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Clock className="h-6 w-6 text-indigo" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Takes minutes
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A guided, three-step form keeps everything clear and moving.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <FileCheck className="h-6 w-6 text-indigo" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Built-in checks
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Validation at every step helps you provide exactly what we need.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Shield className="h-6 w-6 text-indigo" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              No upfront fees
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We only collect a fee if your claim succeeds.
            </p>
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
