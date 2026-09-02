import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Form preview index" },
      {
        name: "description",
        content:
          "Internal preview index for the two standalone claim forms. Each form is deployed as its own separate website.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Form preview index" },
      {
        property: "og:description",
        content: "Internal preview index for the two standalone claim forms.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-canvas-soft px-6 py-16">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Preview only
        </p>
        <h1 className="mt-2 text-xl font-semibold text-foreground">
          Two standalone forms
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Each form below belongs to its own separate website. This index exists
          only so both can be reviewed in the preview.
        </p>
        <div className="mt-6 space-y-2">
          <Link
            to="/air-shield"
            className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-indigo/40"
          >
            Flight disruption claim form
          </Link>
          <Link
            to="/baggage-shield"
            className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-indigo/40"
          >
            Mishandled baggage report form
          </Link>
        </div>
      </div>
    </div>
  );
}
