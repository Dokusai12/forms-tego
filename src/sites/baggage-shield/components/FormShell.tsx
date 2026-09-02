import { Mail, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface FormShellProps {
  eyebrow: string;
  title: string;
  description: string;
  supportHref?: string;
  children: ReactNode;
  sidebar?: ReactNode;
}

export function FormShell({
  eyebrow,
  title,
  description,
  supportHref = "#",
  children,
  sidebar,
}: FormShellProps) {
  return (
    <div className="gradient-wash min-h-screen">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            {eyebrow}
          </span>
          <a
            href={supportHref}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-16 xl:grid-cols-[1fr_32rem]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            {sidebar && <div className="mt-8 hidden lg:block">{sidebar}</div>}
          </div>

          <div className="relative">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo/5 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo/5 blur-3xl" />
            <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:rounded-3xl">
              {children}
            </div>
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

export function SidebarInfo({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">
        What you will need
      </h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
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
  );
}
