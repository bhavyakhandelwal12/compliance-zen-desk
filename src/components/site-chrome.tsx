import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/app", label: "Product tour" },
  { to: "/demo", label: "Book a demo" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="font-display text-lg tracking-tight text-ink">
          Meridian<span className="text-terracotta">.</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Sign in
          </Link>
          <Link
            to="/demo"
            className="rounded-md bg-espresso px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <p className="font-display text-lg text-ink">
              Meridian<span className="text-terracotta">.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Employment compliance for companies that hire across borders.
            </p>
          </div>
          <FooterCol
            title="Product"
            items={[
              { to: "/how-it-works", label: "How it works" },
              { to: "/app", label: "Product tour" },
              { to: "/app/changes", label: "Compliance changes" },
              { to: "/app/contracts", label: "Contracts" },
            ]}
          />
          <FooterCol
            title="Workflow"
            items={[
              { to: "/app/employees", label: "Employee compliance" },
              { to: "/app/audit", label: "Audit trail" },
              { to: "/app/settings", label: "Settings" },
            ]}
          />
          <FooterCol title="Company" items={[{ to: "/demo", label: "Book a demo" }]} />
        </div>
        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          Meridian is a compliance workflow tool. It does not provide legal advice; every generated draft is
          prepared for human review.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="label-caps">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              to={i.to}
              className="text-sm text-muted-foreground transition-colors hover:text-terracotta"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
