import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Scale,
  FileText,
  Users,
  History,
  Settings,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoTag } from "@/components/status";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/changes", label: "Compliance changes", icon: Scale },
  { to: "/app/contracts", label: "Contracts", icon: FileText },
  { to: "/app/employees", label: "Employees", icon: Users },
  { to: "/app/audit", label: "Audit trail", icon: History },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const sidebar = (
    <div className="flex h-full flex-col border-r border-border bg-sidebar">
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" className="font-display text-lg tracking-tight text-ink">
          Meridian<span className="text-terracotta">.</span>
        </Link>
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 pb-4">
        <div className="rounded-md border border-border bg-card px-3 py-2.5">
          <p className="label-caps">Organisation</p>
          <p className="mt-1 text-sm font-medium text-ink">Northbeam Group</p>
          <p className="text-xs text-muted-foreground">6 entities · 14 countries</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-accent font-medium text-espresso"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-terracotta" : "")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-border px-5 py-4">
        <DemoTag />
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-xs font-semibold text-primary-foreground">
            PR
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">Priya Raman</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-terracotta"
        >
          Back to website <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between border-b border-border bg-sidebar px-4 py-3 lg:hidden">
        <Link to="/" className="font-display text-base text-ink">
          Meridian<span className="text-terracotta">.</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-ink/30"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute inset-y-0 left-0 w-72">{sidebar}</div>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[16rem_1fr]">
        <aside className="sticky top-0 hidden h-screen lg:block">{sidebar}</aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-card px-5 py-7 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          {eyebrow && <p className="label-caps">{eyebrow}</p>}
          <h1 className="mt-1.5 font-display text-2xl text-ink sm:text-[1.75rem]">{title}</h1>
          {description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
